import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/checkout/return")({
  head: () => ({ meta: [{ title: "Checkout — Pixel & Reel" }] }),
  component: ReturnPage,
});

function ReturnPage() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("session_id");
    setSessionId(sid);
    setOk(params.get("status") === "success" || !!sid);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (ok) {
      const t = setTimeout(() => navigate({ to: "/dashboard" }), 3500);
      return () => clearTimeout(t);
    }
  }, [ok, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col items-center justify-center px-4 text-center">
        {!mounted ? (
          <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
        ) : ok ? (
          <>
            <CheckCircle2 className="h-16 w-16 text-emerald-400" />
            <h1 className="mt-4 text-2xl font-bold">{lang === "ar" ? "تمّ الدفع بنجاح" : "Payment successful"}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "ar" ? "استلمنا تأكيد الدفع، نحوّلك إلى لوحتك الآن…" : "Payment confirmed, redirecting to your dashboard…"}
            </p>
            {sessionId && (
              <p className="mt-3 text-xs text-muted-foreground">
                {lang === "ar" ? "رقم العملية:" : "Session:"} {sessionId.slice(-12)}
              </p>
            )}
          </>
        ) : (
          <>
            <XCircle className="h-16 w-16 text-rose-400" />
            <h1 className="mt-4 text-2xl font-bold">{lang === "ar" ? "تم الإلغاء" : "Payment cancelled"}</h1>
            <button onClick={() => navigate({ to: "/" })}
              className="mt-6 rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold text-black">
              {lang === "ar" ? "العودة للرئيسية" : "Back home"}
            </button>
          </>
        )}
      </main>
    </div>
  );
}
