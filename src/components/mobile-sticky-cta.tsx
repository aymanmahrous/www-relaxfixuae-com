import { useI18n } from "@/lib/i18n";
import { useSettings, waUrl } from "@/lib/settings";
import { MessageCircle, Send } from "lucide-react";

export function MobileStickyCTA() {
  const { lang } = useI18n();
  const { settings } = useSettings();
  const ar = lang === "ar";
  const brand = ar ? settings.brandAr : settings.brandEn;
  const msg = ar
    ? `مرحباً ${brand}، أريد طلب عرض سعر مجاني.`
    : `Hi ${brand}, I'd like a free quote.`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 sm:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-md gap-2 border-t border-border bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur">
        <a
          href={waUrl(settings.whatsapp, msg)}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-bold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          {ar ? "واتساب" : "WhatsApp"}
        </a>
        <a
          href="#contact"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-brand py-3 text-sm font-bold text-black"
        >
          <Send className="h-4 w-4" />
          {ar ? "عرض سعر مجاني" : "Free quote"}
        </a>
      </div>
    </div>
  );
}
