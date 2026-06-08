import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from "@/lib/stripe.server";

/**
 * Resolve the authenticated user id from the request's Authorization header.
 * Returns null for unauthenticated/guest checkout. The client-supplied userId
 * is ignored — only the verified session id is trusted.
 */
async function getAuthenticatedUserId(): Promise<string | null> {
  try {
    const req = getRequest();
    const authHeader = req?.headers?.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;
    const token = authHeader.slice(7);
    if (!token) return null;
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return null;
    const sb = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    });
    const { data, error } = await sb.auth.getClaims(token);
    if (error || !data?.claims?.sub) return null;
    return data.claims.sub as string;
  } catch {
    return null;
  }
}

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

      // SECURITY: bind userId to the verified session, ignore client-supplied userId.
      // Recurring (subscription) flows REQUIRE an authenticated session so we can
      // attribute the subscription to a real user via webhook metadata.
      const sessionUserId = await getAuthenticatedUserId();
      if (isRecurring && !sessionUserId) {
        return { error: "Sign in required to subscribe" };
      }
      const verifiedUserId = sessionUserId ?? undefined;

      const customerId = (data.customerEmail || verifiedUserId)
        ? await resolveOrCreateCustomer(stripe, { email: data.customerEmail, userId: verifiedUserId })
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
          userId: verifiedUserId || "",
          price_id: data.priceId,
          product_id: product?.id || "",
          product_name: product?.name || "",
          service_summary: data.serviceSummary || "",
        },
        ...(isRecurring && verifiedUserId
          ? { subscription_data: { metadata: { userId: verifiedUserId } } }
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
