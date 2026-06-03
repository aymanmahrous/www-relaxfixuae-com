import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { CheckoutButton } from "@/components/checkout-button";
import { LeadForm } from "@/components/lead-form";
import { TestimonialsSection } from "@/components/testimonials-section";
import { useI18n } from "@/lib/i18n";
import { useSettings, waUrl, tgUrl } from "@/lib/settings";
import { useCredits } from "@/lib/credits";
import { generatePostImages } from "@/lib/ai.functions";
import { genericMessage, serviceMessage, planMessage, promoMessage, shareDesignMessage } from "@/lib/orderMessage";
import { Countdown } from "@/components/countdown";
import heroBg from "@/assets/hero-bg.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import {
  ArrowRight, ImageIcon, PenTool, Film, Sparkles, Megaphone, Camera,
  Package, TrendingUp, Check, Star, MessageCircle, Mail, Play, Send, Gift, Wand2,
  Loader2, MessageSquare, Palette, Send as Send2, Rocket, ChevronDown, Tag,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Relax Fix UAE — استوديو إبداعي بالذكاء الاصطناعي في الإمارات" },
      { name: "description", content: "خدمات تصميم سوشيال ميديا، هوية بصرية، إعلانات، وفيديو احترافي بالذكاء الاصطناعي. خدمة عربية وإنجليزية في دبي وأبوظبي والإمارات." },
      { property: "og:title", content: "Relax Fix UAE — Creative AI Studio" },
      { property: "og:description", content: "تصميم يبيع. فيديو يأسر. مدعوم بالذكاء الاصطناعي." },
      { property: "og:url", content: "https://www.relaxfixuae.com/" },
      { property: "og:image", content: heroBg },
    ],
    links: [
      { rel: "canonical", href: "https://www.relaxfixuae.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Relax Fix UAE",
          url: "https://www.relaxfixuae.com",
          logo: "https://www.relaxfixuae.com/favicon.ico",
          areaServed: "AE",
          address: { "@type": "PostalAddress", addressCountry: "AE" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Relax Fix UAE",
          url: "https://www.relaxfixuae.com",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { q: "How fast is delivery?", a: "Most posts are delivered within hours. Full brand identities within 3–5 days." },
            { q: "Do you provide source files?", a: "Yes — Figma, PSD, AI, plus optimized PNG/JPG/MP4." },
            { q: "Can I use AI generations commercially?", a: "Absolutely. Everything generated here is yours to publish and monetize." },
            { q: "What if I don't like the result?", a: "Unlimited revisions on Pro & Studio plans. Money-back on first delivery if not happy." },
            { q: "Do you write Arabic content?", a: "Yes — native Arabic copywriting, hashtags, and culturally-tuned visuals." },
          ].map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const ICONS: Record<string, LucideIcon> = { ImageIcon, PenTool, Film, Sparkles, Megaphone, Camera, Package, TrendingUp };

const works = [
  { src: work1, tag: "Social", alt: "Social media post design sample" },
  { src: work2, tag: "Video", alt: "Promotional video edit sample" },
  { src: work3, tag: "Branding", alt: "Brand identity and logo design sample" },
  { src: work4, tag: "Motion", alt: "Motion graphics animation sample" },
];

const testimonials = [
  { quote: "t1", name: "t1_name" },
  { quote: "t2", name: "t2_name" },
  { quote: "t3", name: "t3_name" },
] as const;

const faqs = [
  ["faq_q1", "faq_a1"],
  ["faq_q2", "faq_a2"],
  ["faq_q3", "faq_a3"],
  ["faq_q4", "faq_a4"],
  ["faq_q5", "faq_a5"],
] as const;

const steps = [
  { icon: MessageSquare, t: "step1_t", d: "step1_d" },
  { icon: Palette, t: "step2_t", d: "step2_d" },
  { icon: Send2, t: "step3_t", d: "step3_d" },
  { icon: Rocket, t: "step4_t", d: "step4_d" },
];

function Index() {
  const { t, lang } = useI18n();
  const { settings } = useSettings();
  const { credits, spend } = useCredits();
  const brand = lang === "ar" ? settings.brandAr : settings.brandEn;
  const offer = settings.offer;

  // Live AI demo state
  const genImages = useServerFn(generatePostImages);
  const [demoBrief, setDemoBrief] = useState("");
  const [demoBusy, setDemoBusy] = useState(false);
  const [demoImg, setDemoImg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  async function runDemo(brief?: string) {
    const b = (brief ?? demoBrief).trim();
    if (!b) { toast.error(lang === "ar" ? "اكتب فكرة أولاً" : "Type an idea first"); return; }
    if (credits < 1) { toast.error(t("out_of_credits")); return; }
    setDemoBrief(b);
    setDemoBusy(true);
    setDemoImg(null);
    try {
      const res = await genImages({ data: { prompt: b, style: settings.defaultStyle, ratio: settings.defaultRatio, count: 1 } });
      setDemoImg(res.images[0]?.url ?? null);
      spend(1);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed");
    } finally {
      setDemoBusy(false);
    }
  }

  const examples = [t("demo_ex_1"), t("demo_ex_2"), t("demo_ex_3"), t("demo_ex_4")];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* OFFER BANNER */}
      {offer.enabled && (
        <a
          href={waUrl(settings.whatsapp, promoMessage(settings, lang, offer.code, offer.discount))}
          target="_blank" rel="noreferrer"
          className="block border-b border-brand-amber/40 bg-gradient-to-r from-brand-amber/20 via-brand-pink/20 to-brand-purple/20 px-4 py-2.5 text-center text-sm font-medium hover:opacity-90"
        >
          <span className="inline-flex flex-wrap items-center justify-center gap-2">
            <Tag className="h-4 w-4 text-brand-amber" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-amber">{t("promo_prefix")}</span>
            <span>·</span>
            <span>{lang === "ar" ? offer.titleAr : offer.titleEn}</span>
            <span className="rounded-full bg-black/40 px-2 py-0.5 text-xs font-bold text-brand-amber">{offer.code}</span>
            {offer.expiresAt && <Countdown to={offer.expiresAt} lang={lang} />}
            <span className="inline-flex items-center gap-1 font-semibold text-brand-pink">{t("promo_cta")} <ArrowRight className="h-3 w-3 rtl:rotate-180" /></span>
          </span>
        </a>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={heroBg} alt="" width={1920} height={1080} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-brand-pink/30 blur-3xl animate-float-slow" />
        <div className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand-purple/30 blur-3xl animate-float-slow" />

        <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:pt-24 text-center">
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
                  ? `لديك ${credits} محاولات مجانية بالذكاء الاصطناعي — جرّب الاستوديو الآن.`
                  : `You have ${credits} free AI generations on us — try the studio now.`}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#demo" className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-black glow transition-transform hover:scale-105">
              <Wand2 className="h-4 w-4" /> {t("try_free")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
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

      {/* LIVE AI DEMO */}
      <section id="demo" className="mx-auto max-w-6xl px-4 py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">{t("demo_kicker")}</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t("demo_title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("demo_sub")}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("demo_examples")}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <button key={i} onClick={() => runDemo(ex)} disabled={demoBusy}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium hover:border-brand-pink hover:bg-accent disabled:opacity-50">
                  {ex}
                </button>
              ))}
            </div>
            <textarea
              value={demoBrief}
              onChange={(e) => setDemoBrief(e.target.value)}
              placeholder={t("demo_placeholder")}
              rows={3}
              className="mt-4 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-pink"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => runDemo()}
                disabled={demoBusy}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-bold text-black glow disabled:opacity-50"
              >
                {demoBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                {demoBusy ? t("demo_btn_busy") : t("demo_btn")}
              </button>
              <Link to="/design" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold hover:bg-accent">
                {t("demo_open_studio")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {lang === "ar" ? `الرصيد المتبقّي: ${credits} محاولة` : `Credits remaining: ${credits}`}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-purple/20 via-card to-brand-pink/10">
            {!demoImg && !demoBusy && (
              <div className="flex aspect-square items-center justify-center p-10 text-center">
                <div>
                  <Sparkles className="mx-auto h-12 w-12 text-brand-pink" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    {lang === "ar" ? "هنا ستظهر معاينة الذكاء الاصطناعي الخاصّة بك" : "Your AI preview will appear here"}
                  </p>
                </div>
              </div>
            )}
            {demoBusy && (
              <div className="flex aspect-square items-center justify-center">
                <div className="text-center">
                  <Loader2 className="mx-auto h-10 w-10 animate-spin text-brand-pink" />
                  <p className="mt-3 text-sm text-muted-foreground">{t("demo_btn_busy")}</p>
                </div>
              </div>
            )}
            {demoImg && (
              <>
                <img src={demoImg} alt="AI preview" className="aspect-square w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4">
                  <a href={waUrl(settings.whatsapp, shareDesignMessage(settings, lang, demoBrief, settings.defaultStyle, settings.defaultRatio))} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-bold text-black">
                    <MessageCircle className="h-3.5 w-3.5" /> {t("demo_share")}
                  </a>
                  <a href={demoImg} download={`pixelreel-${Date.now()}.png`} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black">
                    <ArrowRight className="h-3.5 w-3.5" /> {t("d_download")}
                  </a>
                  <Link to="/design" className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                    {t("demo_open_studio")}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-border bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">{t("services_kicker")}</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t("services_title")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">{t("services_sub")}</p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {settings.services.map((srv) => {
              const Icon = ICONS[srv.icon] ?? Sparkles;
              const title = lang === "ar" ? srv.titleAr : srv.titleEn;
              const desc = lang === "ar" ? srv.descAr : srv.descEn;
              return (
                <a
                  key={srv.id}
                  href={waUrl(settings.whatsapp, serviceMessage(settings, lang, srv))}
                  target="_blank" rel="noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-pink/50 hover:bg-accent"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-black">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-5 text-lg font-semibold">{title}</h3>
                  <p className="relative mt-2 text-sm text-muted-foreground">{desc}</p>
                  <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-pink">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {lang === "ar" ? "اطلب الآن عبر واتساب" : "Order on WhatsApp"}
                    <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADD-ONS — boost AOV */}
      {settings.addons?.length > 0 && (
        <section className="border-b border-border bg-background py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">
                  {lang === "ar" ? "إضافات سريعة" : "Quick add-ons"}
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {lang === "ar" ? "أضف لمسة احترافية لمشروعك" : "Power-up your project"}
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                {lang === "ar" ? "تسليم خلال 24-48 ساعة" : "Delivered in 24-48h"}
              </span>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {settings.addons.map((a) => {
                const Icon = ICONS[a.icon] ?? Sparkles;
                const name = lang === "ar" ? a.nameAr : a.nameEn;
                return (
                  <a
                    key={a.id}
                    href={waUrl(settings.whatsapp, genericMessage(settings, lang, `${lang === "ar" ? "إضافة" : "Add-on"}: ${name} — ${a.price}`))}
                    target="_blank" rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-brand-pink/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-black">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{name}</div>
                        <div className="text-xs text-brand-amber font-bold">{a.price}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground rtl:rotate-180 group-hover:text-brand-pink" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}



      {/* PROCESS */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">{t("process_kicker")}</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t("process_title")}</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="absolute -top-3 left-6 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-black">0{i + 1}</span>
              <s.icon className="h-7 w-7 text-brand-pink" />
              <h3 className="mt-4 text-lg font-semibold">{t(s.t as never)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(s.d as never)}</p>
            </div>
          ))}
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
                <img src={w.src} alt={w.alt} width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
                  {p.priceId && (
                    <CheckoutButton
                      priceId={p.priceId}
                      label={lang === "ar" ? "ادفع ببطاقة الآن" : "Pay with card"}
                      serviceSummary={name}
                      className={p.popular ? "bg-gradient-brand text-black hover:opacity-90" : "bg-foreground text-background hover:opacity-90"}
                    />
                  )}
                  <a href={waUrl(settings.whatsapp, planMessage(settings, lang, p))} target="_blank" rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-semibold hover:bg-accent">
                    <MessageCircle className="h-3.5 w-3.5" /> {t("pay_wa")}
                  </a>
                  <a href={tgUrl(settings.telegram, planMessage(settings, lang, p))} target="_blank" rel="noreferrer"
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

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">{t("faq_kicker")}</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t("faq_title")}</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map(([qk, ak], i) => {
            const open = openFaq === i;
            return (
              <div key={qk} className={`overflow-hidden rounded-2xl border bg-card transition ${open ? "border-brand-pink/60" : "border-border"}`}>
                <button onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-3 p-5 text-start">
                  <span className="font-semibold">{t(qk as never)}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-brand-pink transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground">{t(ak as never)}</p>}
              </div>
            );
          })}
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
            <a href={waUrl(settings.whatsapp, genericMessage(settings, lang))} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-black glow hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> {t("cta_whatsapp")}
            </a>
            <a href={tgUrl(settings.telegram, genericMessage(settings, lang))} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
              <Send className="h-4 w-4" /> Telegram
            </a>
            <a href={`mailto:${settings.email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(genericMessage(settings, lang))}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-accent">
              <Mail className="h-4 w-4" /> {t("cta_email")}
            </a>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <LeadForm />




      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-brand-pink" />
            {brand}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {brand}. {t("footer_rights")} · {t("built_by")} <span className="font-semibold text-gradient">{settings.builtBy}</span> · 2026
          </p>
        </div>
      </footer>

      <a
        href={waUrl(settings.whatsapp, genericMessage(settings, lang))}
        target="_blank" rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-black shadow-2xl shadow-black/40 transition hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
