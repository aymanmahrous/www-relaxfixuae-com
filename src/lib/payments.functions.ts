import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from "@/lib/stripe.server";

type CheckoutResult = { clientSecret: string } | { error: string };
type PortalResult = { url: string } | { error: string };

async function resolveOrCreateCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  options: { email?: string; userId?: string },
): Promise<string> {
  if (options.userId && !/^[a-zA-Z0-9_-]+$/.test(options.userId)) {
    throw new Error("Invalid userId");
  }
  if (options.userId) {
    const found = await stripe.customers.search({
      query: `metadata['userId']:'${options.userId}'`,
      limit: 1,
    });
    if (found.data.length) return found.data[0].id;
  }
  if (options.email) {
    const existing = await stripe.customers.list({ email: options.email, limit: 1 });
    if (existing.data.length) {
      const customer = existing.data[0];
      if (options.userId && customer.metadata?.userId !== options.userId) {
        await stripe.customers.update(customer.id, {
          metadata: { ...customer.metadata, userId: options.userId },
        });
      }
      return customer.id;
    }
  }
  const created = await stripe.customers.create({
    ...(options.email && { email: options.email }),
    ...(options.userId && { metadata: { userId: options.userId } }),
  });
  return created.id;
}

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({
      priceId: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_-]+$/),
      quantity: z.number().int().min(1).max(100).optional(),
      returnUrl: z.string().url(),
      serviceSummary: z.string().max(500).optional(),
      userId: z.string().uuid().optional(),
      customerEmail: z.string().email().optional(),
      environment: z.enum(["sandbox", "live"]),
    }).parse(data),
  )
  .handler(async ({ data }): Promise<CheckoutResult> => {
    try {
      const env: StripeEnv = data.environment;
      const stripe = createStripeClient(env);
      const prices = await stripe.prices.list({ lookup_keys: [data.priceId], expand: ["data.product"] });
      const price = prices.data[0];
      if (!price) return { error: `Price not found: ${data.priceId}` };
      const isRecurring = !!price.recurring;
      const product = price.product as any;

      const customerId = (data.customerEmail || data.userId)
        ? await resolveOrCreateCustomer(stripe, { email: data.customerEmail, userId: data.userId })
        : undefined;

      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: price.id, quantity: data.quantity || 1 }],
        mode: isRecurring ? "subscription" : "payment",
        ui_mode: "embedded_page",
        return_url: `${data.returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
        ...(customerId && { customer: customerId }),
        ...(!isRecurring && {
          payment_intent_data: { description: product?.name || data.priceId },
        }),
        metadata: {
          userId: data.userId || "",
          price_id: data.priceId,
          product_id: product?.id || "",
          product_name: product?.name || "",
          service_summary: data.serviceSummary || "",
        },
        ...(isRecurring && data.userId
          ? { subscription_data: { metadata: { userId: data.userId } } }
          : {}),
      });
      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      console.error("Stripe checkout error:", error);
      return { error: getStripeErrorMessage(error) };
    }
  });

export const createPortalSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({
      returnUrl: z.string().url().optional(),
      environment: z.enum(["sandbox", "live"]),
    }).parse(data),
  )
  .handler(async ({ data, context }): Promise<PortalResult> => {
    try {
      const { supabase, userId } = context as any;
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("stripe_customer_id")
        .eq("user_id", userId)
        .eq("environment", data.environment)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!sub?.stripe_customer_id) return { error: "No subscription found" };
      const stripe = createStripeClient(data.environment);
      const portal = await stripe.billingPortal.sessions.create({
        customer: sub.stripe_customer_id,
        ...(data.returnUrl && { return_url: data.returnUrl }),
      });
      return { url: portal.url };
    } catch (error) {
      console.error("Portal error:", error);
      return { error: getStripeErrorMessage(error) };
    }
  });
