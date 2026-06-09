// AUDIT-ADD: 2026-06-10 - TASK 1 contact page
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSettings, waUrl } from "@/lib/settings";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const BASE = "https://www.relaxfixuae.com";
const URL_ = `${BASE}/contact`;
const TITLE = "تواصل معنا | Relax Fix UAE — استوديو تصميم في دبي";
const DESC = "تواصل مع فريق Relax Fix UAE عبر الواتساب أو النموذج. رد خلال ساعة في أوقات العمل. مقرنا دبي، نخدم الإمارات والخليج.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL_ },
      { property: "og:locale", content: "ar_AE" },
    ],
    links: [{ rel: "canonical", href: URL_ }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Relax Fix UAE",
          url: BASE,
          telephone: "+971-50-000-0000",
          email: "hello@relaxfixuae.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Business Bay",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
          openingHours: "Su-Th 09:00-18:00",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "الرئيسية", item: BASE },
            { "@type": "ListItem", position: 2, name: "تواصل", item: URL_ },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { settings } = useSettings();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", email: "", service: "", budget: "", message: "" });

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    const msg = `مرحباً، اسمي ${data.name}\nالبريد: ${data.email}\nالخدمة: ${data.service}\nالميزانية: ${data.budget}\n\n${data.message}`;
    window.open(waUrl(settings.whatsapp, msg), "_blank");
    toast.success("تم فتح الواتساب لإرسال طلبك");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">تواصل معنا</span>
        </nav>

        <header className="text-center">
          <h1 className="bg-gradient-brand bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            تواصل معنا
          </h1>
          <p className="mt-4 text-muted-foreground">
            رد خلال ساعة في أوقات العمل (الأحد - الخميس، 9 صباحاً - 6 مساءً)
          </p>
        </header>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card/60 p-6">
            <h2 className="mb-4 text-xl font-bold">طلب عرض سعر — الخطوة {step} من 3</h2>
            <div className="mb-6 flex gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? "bg-gradient-brand" : "bg-border"}`} />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-3">
                <Input placeholder="الاسم" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} maxLength={100} />
                <Input placeholder="البريد الإلكتروني" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} maxLength={255} />
                <Button onClick={next} disabled={!data.name || !data.email} className="w-full">التالي</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={data.service} onChange={(e) => setData({ ...data, service: e.target.value })}>
                  <option value="">اختر الخدمة</option>
                  <option>تصميم سوشيال ميديا</option>
                  <option>لوقو وهوية بصرية</option>
                  <option>موشن جرافيك</option>
                  <option>إعلانات ممولة</option>
                  <option>أخرى</option>
                </select>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={data.budget} onChange={(e) => setData({ ...data, budget: e.target.value })}>
                  <option value="">الميزانية المتوقعة</option>
                  <option>أقل من 1000 د.إ</option>
                  <option>1000 - 3000 د.إ</option>
                  <option>3000 - 10000 د.إ</option>
                  <option>أكثر من 10000 د.إ</option>
                </select>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={back} className="flex-1">السابق</Button>
                  <Button onClick={next} disabled={!data.service || !data.budget} className="flex-1">التالي</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <Textarea placeholder="اكتب تفاصيل مشروعك..." value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} maxLength={1000} rows={5} />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={back} className="flex-1">السابق</Button>
                  <Button onClick={submit} className="flex-1 bg-gradient-brand text-black">
                    <MessageCircle className="ml-2 h-4 w-4" /> إرسال عبر واتساب
                  </Button>
                </div>
              </div>
            )}
          </section>

          <section className="space-y-4">
            <a href={waUrl(settings.whatsapp, "مرحباً")} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-4 transition hover:border-brand-pink/60">
              <MessageCircle className="h-6 w-6 text-brand-pink" />
              <div>
                <div className="font-bold">واتساب</div>
                <div className="text-sm text-muted-foreground">رد فوري</div>
              </div>
            </a>
            <a href="mailto:hello@relaxfixuae.com" className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-4 transition hover:border-brand-pink/60">
              <Mail className="h-6 w-6 text-brand-pink" />
              <div>
                <div className="font-bold">البريد الإلكتروني</div>
                <div className="text-sm text-muted-foreground">hello@relaxfixuae.com</div>
              </div>
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-4">
              <Phone className="h-6 w-6 text-brand-pink" />
              <div>
                <div className="font-bold">الهاتف</div>
                <div className="text-sm text-muted-foreground">+971 50 000 0000</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-4">
              <MapPin className="h-6 w-6 text-brand-pink" />
              <div>
                <div className="font-bold">العنوان</div>
                <div className="text-sm text-muted-foreground">Business Bay, Dubai, UAE</div>
              </div>
            </div>

            <iframe
              title="Relax Fix UAE Location"
              src="https://www.google.com/maps?q=Business+Bay+Dubai&output=embed"
              className="h-56 w-full rounded-xl border border-border"
              loading="lazy"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
