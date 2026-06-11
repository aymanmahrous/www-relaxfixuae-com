import { useState, useEffect } from "react";

type LangKey = "en" | "ar";

const TEXT = {
  en: {
    offerLabel: "🔥 Limited Offer — 30% OFF your first project",
    offerCode: "Use code RELAX30",
    offerButton: "Claim now →",
    heroTitle: "Premium creative campaigns that look like a top agency.",
    heroSubtitle:
      "Branding, ads, social media and visuals designed with a Pixel Reel–style experience.",
    heroBadge: "Creative Studio • Abu Dhabi",
    primaryCta: "Start a project",
    secondaryCta: "View services",
    notifText: "Client from Abu Dhabi ordered a full brand package · 7 min ago",
    servicesTitle: "Creative services",
    ctaTitle: "Ready to launch a premium campaign?",
    ctaSubtitle:
      "Send us a WhatsApp message and we’ll reply in minutes with ideas, pricing and next steps.",
    ctaButton: "Contact via WhatsApp",
    footerLeft: "© " + new Date().getFullYear() + " RelaxFix UAE Studio",
    footerRight: "Pixel Reel Pro experience • Built for clients",
    globeLabel: "EN / AR",
  },
  ar: {
    offerLabel: "🔥 عرض محدود — خصم 30% على أول مشروع",
    offerCode: "استخدم كود RELAX30",
    offerButton: "احصل على العرض الآن →",
    heroTitle: "حملات دعائية راقية بإحساس وكالة محترفة.",
    heroSubtitle:
      "تصميمات سوشيال ميديا، إعلانات، وهوية بصرية بأسلوب Pixel Reel.",
    heroBadge: "استوديو إبداعي • أبوظبي",
    primaryCta: "ابدأ مشروعك الآن",
    secondaryCta: "عرض الخدمات",
    notifText: "عميل من أبوظبي طلب باقة هوية كاملة · قبل 7 دقائق",
    servicesTitle: "الخدمات الإبداعية",
    ctaTitle: "جاهز تطلق حملة دعائية راقية؟",
    ctaSubtitle:
      "أرسل لنا رسالة واتساب وسنرد عليك خلال دقائق بأفكار وأسعار وخطوات واضحة.",
    ctaButton: "تواصل عبر واتساب",
    footerLeft: "© " + new Date().getFullYear() + " RelaxFix UAE Studio",
    footerRight: "تجربة Pixel Reel Pro • مصممة لجذب العملاء",
    globeLabel: "AR / EN",
  },
};

const SERVICES = [
  {
    en: "Full Brand Identity",
    ar: "هوية بصرية كاملة",
    descEn: "Logo, colors, typography and brand system for your business.",
    descAr: "شعار، ألوان، خطوط، ونظام هوية متكامل لنشاطك.",
  },
  {
    en: "Social Media Content",
    ar: "محتوى سوشيال ميديا",
    descEn: "High-converting posts, stories and ad creatives.",
    descAr: "منشورات، ستوري، وتصاميم إعلانية جاهزة للنشر.",
  },
  {
    en: "Ad Campaign Visuals",
    ar: "تصاميم حملات إعلانية",
    descEn: "Static and video creatives for Meta, TikTok and more.",
    descAr: "تصاميم ثابتة وفيديو لحملات فيسبوك، إنستغرام، وتيك توك.",
  },
  {
    en: "Landing Page Design",
    ar: "تصميم صفحات هبوط",
    descEn: "Conversion-focused landing pages for your offers.",
    descAr: "صفحات هبوط مركزة على التحويل لعروضك وخدماتك.",
  },
  {
    en: "Video Editing & Reels",
    ar: "مونتاج فيديو وريلز",
    descEn: "Short-form edits that keep people watching.",
    descAr: "مونتاج فيديوهات قصيرة وريلز تجذب الانتباه.",
  },
  {
    en: "Presentation & Pitch Decks",
    ar: "عروض تقديمية احترافية",
    descEn: "Clean, modern decks for investors and clients.",
    descAr: "عروض تقديمية حديثة وواضحة للمستثمرين والعملاء.",
  },
];

export default function MarketingPixelReelPro() {
  const [lang, setLang] = useState<LangKey>("en");
  const [showNotif, setShowNotif] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotif(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  const t = TEXT[lang];
  const isArabic = lang === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <div
      className="min-h-screen bg-[#050816] text-white flex flex-col"
      dir={dir}
    >
      {/* Offer Bar */}
      <div className="w-full border-b border-yellow-500/20 bg-[#0b1020]">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <span className="font-semibold text-yellow-400">
              {t.offerLabel}
            </span>
            <span className="text-slate-300">{t.offerCode}</span>
          </div>
          <button className="text-xs md:text-sm font-semibold text-yellow-300 hover:text-yellow-200">
            {t.offerButton}
          </button>
        </div>
      </div>

      {/* Top bar */}
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center text-black font-bold text-xl">
            R
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm md:text-base">
              RelaxFix UAE Studio
            </span>
            <span className="text-[11px] md:text-xs text-slate-400">
              Creative & Ads • Abu Dhabi
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs md:text-sm border border-slate-700 text-slate-200 hover:bg-slate-800 transition"
          >
            <span>🌍</span>
            <span>{t.globeLabel}</span>
          </button>
          <a
            href="https://wa.me/971501234567"
            className="px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-black bg-yellow-400 hover:bg-yellow-300 transition"
          >
            {t.primaryCta}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-slate-400">
              {t.heroBadge}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                {t.heroTitle}
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-xl">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://wa.me/971501234567"
                className="px-4 py-2 rounded-full text-sm font-semibold text-black bg-yellow-400 hover:bg-yellow-300 transition"
              >
                {t.primaryCta}
              </a>
              <a
                href="#services"
                className="px-4 py-2 rounded-full text-sm font-semibold border border-slate-600 text-slate-200 hover:bg-slate-900/60 transition"
              >
                {t.secondaryCta}
              </a>
            </div>

            {showNotif && (
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#0b1020] border border-slate-700 text-[11px] md:text-xs text-slate-300 shadow-lg shadow-black/40">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>{t.notifText}</span>
              </div>
            )}
          </div>

          <div className="space-y-4 md:space-y-5">
            <div className="rounded-2xl bg-[#0b1020] border border-slate-800 p-5 md:p-6 shadow-xl shadow-black/50">
              <p className="text-xs text-slate-400 mb-2">
                Pixel Reel Pro Experience
              </p>
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                Visuals that sell,
                <br /> campaigns that feel premium.
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mb-4">
                From brand identity to social content and ads, everything is
                designed to look like a top-tier creative studio.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                <div className="rounded-xl border border-slate-700/70 p-3">
                  <p className="text-slate-400 mb-1">Delivery</p>
                  <p className="font-semibold text-yellow-300">
                    3–5 business days
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700/70 p-3">
                  <p className="text-slate-400 mb-1">Formats</p>
                  <p className="font-semibold text-yellow-300">
                    Social, ads, print
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700/70 p-3">
                  <p className="text-slate-400 mb-1">Revisions</p>
                  <p className="font-semibold text-yellow-300">
                    Up to 3 rounds
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700/70 p-3">
                  <p className="text-slate-400 mb-1">Support</p>
                  <p className="font-semibold text-yellow-300">
                    WhatsApp + Email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="max-w-5xl mx-auto px-4 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {TEXT[lang].servicesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map((service) => (
              <div
                key={service.en}
                className="rounded-xl bg-[#0b1020] border border-slate-800 p-4 md:p-5 flex flex-col gap-2"
              >
                <h3 className="font-semibold text-sm md:text-base text-yellow-200">
                  {lang === "en" ? service.en : service.ar}
                </h3>
                <p className="text-xs md:text-sm text-slate-300">
                  {lang === "en" ? service.descEn : service.descAr}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500">
          <div className="max-w-5xl mx-auto px-4 py-10 md:py-14 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
              {t.ctaTitle}
            </h2>
            <p className="text-sm md:text-base text-black/80 mb-5 max-w-2xl mx-auto">
              {t.ctaSubtitle}
            </p>
            <a
              href="https://wa.me/971501234567"
              className="inline-block px-6 py-2.5 rounded-full bg-black text-sm md:text-base font-semibold text-yellow-300 hover:bg-slate-900 transition"
            >
              {t.ctaButton}
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-5 text-xs md:text-sm text-slate-400 flex justify-between items-center">
        <span>{t.footerLeft}</span>
        <span>{t.footerRight}</span>
      </footer>
    </div>
  );
}
