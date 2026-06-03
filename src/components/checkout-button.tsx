import { useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { createCheckoutSession } from "@/lib/payments.functions";
import { useAuth } from "@/hooks/use-auth";
import { getStripe, getStripeEnvironment } from "@/lib/stripe-client";
import { CreditCard, Loader2, X } from "lucide-react";
import { toast } from "sonner";

export function CheckoutButton({
  priceId,
  label,
  serviceSummary,
  className = "",
}: {
  priceId: string;
  label: string;
  serviceSummary?: string;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { user } = useAuth();
  const checkout = useServerFn(createCheckoutSession);

  const fetchClientSecret = useCallback(async (): Promise<string> => {
    const environment = getStripeEnvironment();
    const res = await checkout({
      data: {
        priceId,
        returnUrl: `${window.location.origin}/checkout/return`,
        serviceSummary,
        userId: user?.id,
        customerEmail: user?.email,
        environment,
      },
    });
    if ("error" in res) throw new Error(res.error);
    if (!res.clientSecret) throw new Error("No client secret returned");
    return res.clientSecret;
  }, [priceId, serviceSummary, user, checkout]);

  async function go() {
    setBusy(true);
    try {
      const secret = await fetchClientSecret();
      setClientSecret(secret);
      setOpen(true);
    } catch (e: any) {
      toast.error(e.message || "Checkout failed");
    } finally {
      setBusy(false);
    }
  }

  function close() {
    setOpen(false);
    setClientSecret(null);
  }

  return (
    <>
      <button
        onClick={go}
        disabled={busy}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:opacity-50 ${className}`}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
        {label}
      </button>

      {open && clientSecret && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <button
              onClick={close}
              className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-2xl">
              <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret: async () => clientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
