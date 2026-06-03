import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createCheckoutSession } from "@/lib/payments.functions";
import { useAuth } from "@/hooks/use-auth";
import { CreditCard, Loader2 } from "lucide-react";
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
  const { user } = useAuth();
  const checkout = useServerFn(createCheckoutSession);

  async function go() {
    setBusy(true);
    try {
      const res = await checkout({
        data: {
          priceId,
          returnUrl: `${window.location.origin}/checkout/return`,
          serviceSummary,
          userId: user?.id,
          customerEmail: user?.email,
        },
      });
      if ("error" in res) throw new Error(res.error);
      window.location.href = res.url;
    } catch (e: any) {
      toast.error(e.message || "Checkout failed");
      setBusy(false);
    }
  }

  return (
    <button
      onClick={go}
      disabled={busy}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:opacity-50 ${className}`}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
      {label}
    </button>
  );
}
