import { SiteHeader } from "@/components/site-header";
import { LeadForm } from "@/components/lead-form";
import { useSettings, waUrl } from "@/lib/settings";
import { Link } from "@tanstack/react-router";
import { Check, MessageCircle, Star, ArrowLeft } from "lucide-react";

export type LandingProps = {
  h1: string;
  subtitle: string;
  intro: string;
  features: string[];
  packages: { name: string; price: string; items: string[] }[];
  faqs: { q: string; a: string }[];
  ctaMessage: string;
};

export function LandingPage(p: LandingProps) {
  const { settings } = useSettings();
  const wa = waUrl(settings.whatsapp, p.ctaMessage);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-brand-pink/10 via-background to-background py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-pink/30 bg-brand-pink/10 px-4 py-1.5 text-sm font-medium text-brand-pink">
            <Star className="h-4 w-4" /> خدمة احترافية في الإمارات
          </div>
          <h1 className="bg-gradient-brand bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
            {p.h1}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">{p.subtitle}</p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/80">{p.intro}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-base font-bold text-white shadow-lg shadow-brand-pink/30 transition hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" /> اطلب عرض سعر الآن
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" /> الرئيسية
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-3xl font-bold">لماذا تختار خدمتنا؟</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {p.features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-pink/15 text-brand-pink">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-base text-foreground/90">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="border-y border-border/50 bg-muted/20 py-14 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-3xl font-bold">باقات الأسعار</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {p.packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl border p-6 ${
                  i === 1
                    ? "border-brand-pink bg-gradient-to-b from-brand-pink/10 to-transparent shadow-xl shadow-brand-pink/20"
                    : "border-border/60 bg-card/50"
                }`}
              >
                {i === 1 && (
                  <div className="absolute -top-3 right-1/2 translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-white">
                    الأكثر طلباً
                  </div>
                )}
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <div className="mt-2 text-3xl font-extrabold text-brand-pink">{pkg.price}</div>
                <ul className="mt-5 space-y-2">
                  {pkg.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" /> {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={waUrl(settings.whatsapp, `أريد باقة ${pkg.name} — ${p.h1}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 font-bold text-background transition hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" /> اطلب الآن
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold">الأسئلة الشائعة</h2>
          <div className="space-y-3">
            {p.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border/60 bg-card/50 p-4 transition open:bg-card"
              >
                <summary className="cursor-pointer list-none font-semibold text-foreground">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="border-t border-border/50 bg-gradient-to-b from-background to-brand-pink/5 py-14 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="mb-2 text-center text-3xl font-bold">احصل على عرض سعر مجاني</h2>
          <p className="mb-6 text-center text-muted-foreground">
            اتركلنا بياناتك وسنتواصل معك خلال أقل من ساعة
          </p>
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-xl">
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
