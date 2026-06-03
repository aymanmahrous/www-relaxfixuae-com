import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useSettings, waUrl } from "@/lib/settings";
import { X, Gift, MessageCircle, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "exit_popup_dismissed_v1";
const PROMO_CODE = "VIP20";
const DISCOUNT = 20;

export function ExitIntentPopup() {
  const { lang } = useI18n();
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    };

    // Desktop: exit intent (mouse to top)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    // Mobile fallback: after 25 seconds of engagement
    const timer = window.setTimeout(show, 25000);

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.clearTimeout(timer);
    };
  }, []);

  if (!open) return null;

  const ar = lang === "ar";
  const brand = ar ? settings.brandAr : settings.brandEn;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      toast.success(ar ? "تم نسخ الكود!" : "Code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const waMsg = ar
    ? `مرحباً ${brand}، أريد استخدام كود الخصم ${PROMO_CODE} للحصول على ${DISCOUNT}% خصم.`
    : `Hi ${brand}, I'd like to use code ${PROMO_CODE} for ${DISCOUNT}% off.`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-brand-amber/40 bg-gradient-to-br from-card via-card to-brand-pink/10 p-8 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground"
          aria-label={ar ? "إغلاق" : "Close"}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-pink/30 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-brand-purple/30 blur-3xl" />

        <div className="relative text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-black shadow-lg">
            <Gift className="h-8 w-8" />
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-amber">
            {ar ? "عرض خاص لك فقط" : "Special offer just for you"}
          </p>

          <h2 id="exit-popup-title" className="mt-2 text-3xl font-bold leading-tight">
            {ar ? (
              <>احصل على <span className="text-gradient">{DISCOUNT}% خصم</span> الآن</>
            ) : (
              <>Get <span className="text-gradient">{DISCOUNT}% OFF</span> today</>
            )}
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            {ar
              ? "لا تغادر بدون عرضك! استخدم الكود التالي على طلبك الأول."
              : "Don't leave empty-handed! Use this code on your first order."}
          </p>

          <button
            onClick={copyCode}
            className="mt-5 flex w-full items-center justify-between gap-2 rounded-2xl border-2 border-dashed border-brand-amber bg-brand-amber/10 px-5 py-4 transition hover:bg-brand-amber/20"
          >
            <span className="text-2xl font-black tracking-widest text-brand-amber">{PROMO_CODE}</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? (ar ? "تم النسخ" : "Copied") : (ar ? "نسخ" : "Copy")}
            </span>
          </button>

          <a
            href={waUrl(settings.whatsapp, waMsg)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" />
            {ar ? "استخدم الخصم عبر واتساب" : "Claim discount on WhatsApp"}
          </a>

          <button
            onClick={() => setOpen(false)}
            className="mt-3 text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            {ar ? "لا، شكراً — لا أريد التوفير" : "No thanks, I'll pay full price"}
          </button>
        </div>
      </div>
    </div>
  );
}
