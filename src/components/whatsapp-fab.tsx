import { useSettings, waUrl } from "@/lib/settings";
import { useI18n } from "@/lib/i18n";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const { settings } = useSettings();
  const { lang } = useI18n();
  if (!settings.whatsappFab || !settings.whatsapp) return null;
  const msg = lang === "ar"
    ? `مرحباً ${settings.brandAr}، أريد الاستفسار عن خدماتكم.`
    : `Hi ${settings.brandEn}, I'd like to ask about your services.`;
  return (
    <a
      href={waUrl(settings.whatsapp, msg)}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition hover:scale-110 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
