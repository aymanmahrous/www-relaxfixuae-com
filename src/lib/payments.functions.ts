import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from "@/lib/stripe.server";

function getEnv(): StripeEnv {
  // Default to sandbox for dev; webhooks set env via ?env=...
  return (process.env.PAYMENTS_LIVE_WEBHOOK_SECRET ? "live" : "sandbox") as StripeEnv;
}

type CheckoutResult = { url: string } | { error: string };

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({
      priceId: z.string().min(1).max(100),
      quantity: z.number().int().min(1).max(100).optional(),
      returnUrl: z.string().url(),
      serviceSummary: z.string().max(500).optional(),
      userId: z.string().uuid().optional(),
      customerEmail: z.string().email().optional(),
    }).parse(data),
  )
  .handler(async ({ data }): Promise<CheckoutResult> => {
    try {
      const env = getEnv();
      const stripe = createStripeClient(env);
      const prices = await stripe.prices.list({ lookup_keys: [data.priceId], expand: ["data.product"] });
      const price = prices.data[0];
      if (!price) return { error: `Price not found: ${data.priceId}` };
      const isRecurring = !!price.recurring;
      const product = price.product as any;
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: price.id, quantity: data.quantity || 1 }],
        mode: isRecurring ? "subscription" : "payment",
        success_url: `${data.returnUrl}?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${data.returnUrl}?status=cancelled`,
        ...(data.customerEmail ? { customer_email: data.customerEmail } : {}),
        metadata: {
          userId: data.userId || "",
          price_id: data.priceId,
          product_id: product?.id || "",
          service_summary: data.serviceSummary || "",
        },
        ...(isRecurring && data.userId
          ? { subscription_data: { metadata: { userId: data.userId } } }
          : {}),
      });
      return { url: session.url! };
    } catch (error) {
      console.error("Stripe checkout error:", error);
      return { error: getStripeErrorMessage(error) };
    }
  });
