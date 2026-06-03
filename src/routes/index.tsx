import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";
import { useSettings, waUrl, tgUrl } from "@/lib/settings";
import heroBg from "@/assets/hero-bg.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import {
  ArrowRight, ImageIcon, PenTool, Film, Sparkles, Megaphone, Camera,
  Package, TrendingUp, Check, Star, MessageCircle, Mail, Play, Send, Gift, Wand2,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixel & Reel — AI Creative Studio for Design & Video" },
      { name: "description", content: "AI-powered creative studio: social posts, brand identity, ads, motion graphics, and pro video editing. Arabic & English. Built by Ayman Mahrous." },
      { property: "og:title", content: "Pixel & Reel — AI Creative Studio" },
      { property: "og:description", content: "Design that sells. Video that captivates." },
      { property: "og:image", content: heroBg },
    ],
  }),
  component: Index,
});

const ICONS: Record<string, LucideIcon> = { ImageIcon, PenTool, Film, Sparkles, Megaphone, Camera, Package, TrendingUp };

const works = [
  { src: work1, tag: "Social" },
  { src: work2, tag: "Video" },
  { src: work3, tag: "Branding" },
  { src: work4, tag: "Motion" },
];

const testimonials = [
  { quote: "t1", name: "t1_name" },
  { quote: "t2", name: "t2_name" },
  { quote: "t3", name: "t3_name" },
] as const;

function Index() {
  const { t, lang } = useI18n();
  const { settings } = useSettings();
  const brand = lang === "ar" ? settings.brandAr : settings.brandEn;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={heroBg} alt="" width={1920} height={1080} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-brand-pink/30 blur-3xl animate-float-slow" />
        <div className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand-purple/30 blur-3xl animate-float-slow" />

        <div className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:pt-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-amber" />
            {t("hero_kicker")}
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            <span className="block">{t("hero_title_1")}</span>
            <span className="block text-gradient">{t("hero_title_2")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{t("hero_sub")}</p>

          <div className="mx-auto mt-8 inline-flex max-w-md items-center gap-3 rounded-2xl border border-brand-amber/40 bg-gradient-to-r from-brand-amber/15 via-brand-pink/10 to-brand-purple/15 px-4 py-3 text-start">
            <Gift className="h-6 w-6 shrink-0 text-brand-amber" />
            <div className="text-sm">
              <p className="font-bold">{t("welcome_credit_title")}</p>
              <p className="text-xs text-muted-foreground">
                {lang === "ar"
                  ? `لديك ${settings.welcomeCredits} محاولات مجانية بالذكاء الاصطناعي — جرّب الاستوديو الآن.`
                  : `You have ${settings.welcomeCredits} free AI generations on us — try the studio now.`}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/design" className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-black glow transition-transform hover:scale-105">
              <Wand2 className="h-4 w-4" /> {t("try_free")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-card">
              <Play className="h-4 w-4" /> {t("cta_portfolio")}
            </a>
          </div>

          <div className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { v: "500+", k: "stat_projects" },
              { v: "120+", k: "stat_clients" },
              { v: "8", k: "stat_years" },
              { v: "4.9★", k: "stat_rating" },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-3xl font-bold text-gradient sm:text-4xl">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t(s.k as never)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">{t("services_kicker")}</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t("services_title")}</h2>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {settings.services.map((srv) => {
            const Icon = ICONS[srv.icon] ?? Sparkles;
            const title = lang === "ar" ? srv.titleAr : srv.titleEn;
            const desc = lang === "ar" ? srv.descAr : srv.descEn;
            return (
              <a
                key={srv.id}
                href={waUrl(settings.whatsapp, `${lang === "ar" ? "أرغب في خدمة" : "I'd like:"} ${title}`)}
                target="_blank" rel="noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-pink/50 hover:bg-accent"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-5 text-lg font-semibold">{title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{desc}</p>
              </a>
            );
          })}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="border-y border-border bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">{t("work_kicker")}</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t("work_title")}</h2>
            </div>
            <Link to="/design" className="inline-flex items-center gap-1 text-sm font-medium text-brand-pink hover:underline">
              {t("try_free")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {works.map((w, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl border border-border">
                <img src={w.src} alt={w.tag} width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">{w.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">{t("pricing_kicker")}</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t("pricing_title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("pricing_sub")}</p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {settings.plans.map((p) => {
            const name = lang === "ar" ? p.nameAr : p.nameEn;
            const features = lang === "ar" ? p.featuresAr : p.featuresEn;
            return (
              <div key={p.id} className={`relative rounded-2xl border p-8 ${p.popular ? "border-brand-pink/60 bg-gradient-to-b from-brand-pink/10 to-card glow" : "border-border bg-card"}`}>
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-black">
                    {t("popular")}
                  </span>
                )}
                <h3 className="text-lg font-semibold">{name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{t("per_month")}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 space-y-2">
                  <a href={waUrl(settings.whatsapp, `${lang === "ar" ? "أريد باقة" : "I want the"} ${name} (${p.price})`)} target="_blank" rel="noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                      p.popular ? "bg-gradient-brand text-black hover:opacity-90" : "border border-border bg-background hover:bg-accent"
                    }`}>
                    <MessageCircle className="h-4 w-4" /> {t("pay_wa")}
                  </a>
                  <a href={tgUrl(settings.telegram, `${lang === "ar" ? "أريد باقة" : "I want the"} ${name} (${p.price})`)} target="_blank" rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-semibold hover:bg-accent">
                    <Send className="h-3.5 w-3.5" /> {t("pay_tg")}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-border bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">{t("testi_kicker")}</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t("testi_title")}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((q) => (
              <div key={q.quote} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5 text-brand-amber">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-base leading-relaxed">"{t(q.quote)}"</p>
                <p className="mt-4 text-sm text-muted-foreground">{t(q.name)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-5xl px-4 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-brand-pink/40 bg-gradient-to-br from-brand-purple/20 via-brand-pink/10 to-brand-amber/10 p-10 text-center sm:p-16">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-pink/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-brand-purple/30 blur-3xl" />
          <h2 className="relative text-3xl font-bold sm:text-5xl">{t("cta_title")}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">{t("cta_sub")}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a href={waUrl(settings.whatsapp, lang === "ar" ? "أرغب في طلب مشروع" : "I'd like to start a project")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-black glow hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> {t("cta_whatsapp")}
            </a>
            <a href={tgUrl(settings.telegram, lang === "ar" ? "أرغب في طلب مشروع" : "I'd like to start a project")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
              <Send className="h-4 w-4" /> Telegram
            </a>
            <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-accent">
              <Mail className="h-4 w-4" /> {t("cta_email")}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-brand-pink" />
            {brand}
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {brand}. {t("footer_rights")} · {t("built_by")} <span className="font-semibold text-gradient">{settings.builtBy}</span>
          </p>
        </div>
      </footer>

      <a
        href={waUrl(settings.whatsapp, lang === "ar" ? "مرحباً، أرغب في الاستفسار" : "Hi, I'd like to ask about your services")}
        target="_blank" rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-black shadow-2xl shadow-black/40 transition hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
