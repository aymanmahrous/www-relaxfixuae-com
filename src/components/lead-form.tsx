import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { useSettings, waUrl } from "@/lib/settings";
import { toast } from "sonner";
import { Send, MessageCircle, Loader2 } from "lucide-react";

export function LeadForm() {
  const { lang } = useI18n();
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: "", contact: "", service: "", message: "" });
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.contact.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("leads").insert({ ...form, source: "website" });
    if (error) toast.error(error.message);
    else {
      toast.success(lang === "ar" ? "تم استلام طلبك! سنتواصل معك قريباً." : "Got it! We'll be in touch shortly.");
      setForm({ name: "", contact: "", service: "", message: "" });
    }
    setBusy(false);
  }

  const SERVICES = lang === "ar"
    ? ["تصميم منشورات", "شعار وهوية", "مونتاج فيديو", "ريلز", "إعلان كامل", "تصوير منتجات", "أخرى"]
    : ["Social posts", "Logo & identity", "Video editing", "Reels", "Full ad campaign", "Product photography", "Other"];

  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-20">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-brand-pink/5 p-8 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {lang === "ar" ? "اطلب عرض سعر مجاني" : "Get a free quote"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ar" ? "أخبرنا عن مشروعك وسنرد عليك خلال ساعات." : "Tell us about your project — we respond within hours."}
          </p>
        </div>
        <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-2">
          <label htmlFor="lead-name" className="sr-only">{lang === "ar" ? "الاسم" : "Your name"}</label>
          <input id="lead-name" name="name" autoComplete="name" className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-pink"
            placeholder={lang === "ar" ? "الاسم" : "Your name"} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <label htmlFor="lead-contact" className="sr-only">{lang === "ar" ? "واتساب / بريد / تليجرام" : "WhatsApp / Email / Telegram"}</label>
          <input id="lead-contact" name="contact" required minLength={3} className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-pink"
            placeholder={lang === "ar" ? "واتساب / بريد / تليجرام" : "WhatsApp / Email / Telegram"} value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
          <label htmlFor="lead-service" className="sr-only">{lang === "ar" ? "اختر الخدمة" : "Select a service"}</label>
          <select id="lead-service" name="service" className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-pink sm:col-span-2"
            value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
            <option value="">{lang === "ar" ? "اختر الخدمة" : "Select a service"}</option>
            {SERVICES.map(s => <option key={s}>{s}</option>)}
          </select>
          <label htmlFor="lead-message" className="sr-only">{lang === "ar" ? "اشرح فكرتك (اختياري)" : "Tell us about your project (optional)"}</label>
          <textarea id="lead-message" name="message" rows={4} className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-pink sm:col-span-2"
            placeholder={lang === "ar" ? "اشرح فكرتك (اختياري)" : "Tell us about your project (optional)"} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          <div className="grid gap-2 sm:col-span-2 sm:grid-cols-2">
            <button type="submit" disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold text-black disabled:opacity-50">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {lang === "ar" ? "إرسال الطلب" : "Send request"}
            </button>
            <a href={waUrl(settings.whatsapp, `${form.name ? form.name + " — " : ""}${form.service ? form.service + " — " : ""}${form.message || ""}`)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-bold hover:bg-accent">
              <MessageCircle className="h-4 w-4" /> {lang === "ar" ? "أرسل عبر واتساب" : "Send via WhatsApp"}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
