import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, verifyWebhook } from "@/lib/stripe.server";

let _supabase: any = null;
function getSupabase(): any {
  if (!_supabase) {
    _supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _supabase;
}

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  const userId = session.metadata?.userId || null;
  const supabase = getSupabase();
  const customerEmail = session.customer_details?.email || session.customer_email || null;
  const customerName = session.customer_details?.name || null;
  const productName = session.metadata?.product_name || session.metadata?.price_id || "Order";
  const amount = ((session.amount_total || 0) / 100).toFixed(2);
  const currency = (session.currency || "aed").toUpperCase();

  await supabase.from("orders").upsert(
    {
      user_id: userId,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent || null,
      price_id: session.metadata?.price_id || "",
      product_id: session.metadata?.product_id || null,
      amount_cents: session.amount_total || 0,
      currency: session.currency || "aed",
      status: "paid",
      customer_email: customerEmail,
      customer_name: customerName,
      service_summary: session.metadata?.service_summary || null,
      environment: env,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_session_id" },
  );

  // Enqueue order confirmation email (best-effort)
  if (customerEmail) {
    try {
      const html = `
        <!doctype html>
        <html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0a0a0a;color:#fff;padding:24px">
          <div style="max-width:560px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;padding:28px">
            <h1 style="margin:0 0 12px;font-size:22px">شكراً لطلبك! / Thanks for your order</h1>
            <p style="color:#bbb;margin:0 0 18px">مرحباً ${customerName || ""}، استلمنا دفعتك بنجاح.</p>
            <table style="width:100%;border-collapse:collapse;margin:16px 0;color:#eee">
              <tr><td style="padding:8px;border-bottom:1px solid #222"><b>المنتج / Product</b></td><td style="padding:8px;border-bottom:1px solid #222">${productName}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #222"><b>المبلغ / Amount</b></td><td style="padding:8px;border-bottom:1px solid #222">${amount} ${currency}</td></tr>
              <tr><td style="padding:8px"><b>رقم الطلب / Order ID</b></td><td style="padding:8px">${session.id.slice(-12)}</td></tr>
            </table>
            <p style="color:#bbb">سنبدأ العمل على طلبك خلال 24 ساعة وسنتواصل معك على واتساب.</p>
            <p style="color:#666;font-size:12px;margin-top:24px">Pixel & Reel · UAE</p>
          </div>
        </body></html>`;
      const text = `Thanks for your order!\nProduct: ${productName}\nAmount: ${amount} ${currency}\nOrder ID: ${session.id}`;
      await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: `order_${session.id}`,
          to: customerEmail,
          subject: `تأكيد طلبك - ${productName}`,
          html,
          text,
          label: "order_confirmation",
          purpose: "transactional",
          sender_domain: "notify.www.relaxfixuae.com",
          from: "orders@notify.www.relaxfixuae.com",
          queued_at: new Date().toISOString(),
        },
      });
    } catch (e) {
      console.error("Failed to enqueue confirmation email:", e);
    }
  }
}

async function handleSubscriptionUpsert(subscription: any, env: StripeEnv) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;
  const item = subscription.items?.data?.[0];
  const priceId = item?.price?.lookup_key || item?.price?.metadata?.lovable_external_id || item?.price?.id;
  const productId = item?.price?.product;
  const periodStart = item?.current_period_start ?? subscription.current_period_start;
  const periodEnd = item?.current_period_end ?? subscription.current_period_end;
  await getSupabase().from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      product_id: productId,
      price_id: priceId,
      status: subscription.status,
      current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      environment: env,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );
}

async function handleSubscriptionDeleted(subscription: any, env: StripeEnv) {
  await getSupabase()
    .from("subscriptions")
    .update({ status: "canceled", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscription.id)
    .eq("environment", env);
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object, env);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
      await handleSubscriptionUpsert(event.data.object, env);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object, env);
      break;
    default:
      console.log("Unhandled event:", event.type);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          return Response.json({ received: true, ignored: "invalid env" });
        }
        try {
          await handleWebhook(request, rawEnv as StripeEnv);
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
