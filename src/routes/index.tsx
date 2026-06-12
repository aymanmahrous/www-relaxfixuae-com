import { PortfolioPage } from "./portfolio";

import { useState } from "react";

type ThemeKey = "proskill" | "luxury" | "minimal";

type SiteSettings = {
  theme: ThemeKey;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  accentColor: string;
  showIcons: boolean;
};

const THEMES: Record<ThemeKey, Partial<SiteSettings>> = {
  proskill: {
    primaryColor: "#0f172a", // أزرق غامق
    accentColor: "#2563eb", // أزرق
    heroTitle: "Premium Digital-Like Home Services in Abu Dhabi",
    heroSubtitle:
      "Organized, modern, and fast home services experience that feels like a top digital agency.",
  },
  luxury: {
    primaryColor: "#050816", // أسود فاخر
    accentColor: "#facc15", // ذهبي
    heroTitle: "Luxury Home Maintenance for VIP Clients",
    heroSubtitle:
      "Discreet, high-end, and reliable services tailored for premium properties in Abu Dhabi.",
  },
  minimal: {
    primaryColor: "#ffffff",
    accentColor: "#111827",
    heroTitle: "Simple. Fast. Reliable Home Services.",
    heroSubtitle:
      "Clean, minimal, and focused experience that gets customers to contact you in seconds.",
  },
};

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings>({
    theme: "proskill",
    heroTitle: THEMES.proskill.heroTitle!,
    heroSubtitle: THEMES.proskill.heroSubtitle!,
    primaryColor: THEMES.proskill.primaryColor!,
    accentColor: THEMES.proskill.accentColor!,
    showIcons: true,
  });

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const applyTheme = (theme: ThemeKey) => {
    const t = THEMES[theme];
    setSettings((prev) => ({
      ...prev,
      theme,
      heroTitle: t.heroTitle ?? prev.heroTitle,
      heroSubtitle: t.heroSubtitle ?? prev.heroSubtitle,
      primaryColor: t.primaryColor ?? prev.primaryColor,
      accentColor: t.accentColor ?? prev.accentColor,
    }));
  };

  const bgClass =
    settings.theme === "luxury"
      ? "bg-[#050816] text-white"
      : settings.theme === "proskill"
      ? "bg-slate-950 text-white"
      : "bg-white text-slate-900";

  const cardClass =
    settings.theme === "minimal"
      ? "bg-white border border-slate-200 shadow-sm"
      : "bg-slate-900/60 border border-slate-800 shadow-lg";

  return (
    <div className={`${bgClass} min-h-screen`}>
      {/* Top bar */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: settings.accentColor }}
          >
            R
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm md:text-base">
              RelaxFix UAE
            </span>
            <span className="text-[11px] md:text-xs text-slate-400">
              Home Services • Abu Dhabi
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setIsPanelOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs md:text-sm border border-slate-700 text-slate-200 hover:bg-slate-800 transition"
          >
            Dashboard
          </button>
          <a
            href="https://wa.me/971501234567"
            className="px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold text-white"
            style={{ background: settings.accentColor }}
          >
            تواصل الآن
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 md:px-8 py-10 md:py-16 flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 space-y-4 md:space-y-6">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-slate-400">
            Home Services • Abu Dhabi
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {settings.heroTitle}
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl">
            {settings.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href="https://wa.me/971501234567"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: settings.accentColor }}
            >
              احجز خدمة الآن
            </a>
            <a
              href="#services"
              className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-600 text-slate-200 hover:bg-slate-900/60 transition"
            >
              استكشف الخدمات
            </a>
          </div>
          {settings.showIcons && (
            <div className="flex flex-wrap gap-3 mt-6 items-center text-xs text-slate-400">
              <span className="text-[11px] uppercase tracking-[0.2em]">
                Trusted by
              </span>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded-full bg-slate-900/70 border border-slate-700">
                  AC • Cleaning
                </span>
                <span className="px-2 py-1 rounded-full bg-slate-900/70 border border-slate-700">
                  Plumbing
                </span>
                <span className="px-2 py-1 rounded-full bg-slate-900/70 border border-slate-700">
                  Electrical
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 w-full md:w-auto">
          <div
            className={`${cardClass} rounded-2xl p-5 md:p-6 flex flex-col gap-4`}
          >
            <p className="text-xs text-slate-400">Next-Gen Home Services</p>
            <h2 className="text-lg md:text-xl font-semibold">
              Organized like a digital agency,
              <br /> executed like a pro technician.
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              Clear communication, fast response, and modern experience for
              every service request.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="rounded-xl border border-slate-700/70 p-3">
                <p className="text-slate-400 mb-1">Response Time</p>
                <p className="font-semibold text-white">Under 30 minutes</p>
              </div>
              <div className="rounded-xl border border-slate-700/70 p-3">
                <p className="text-slate-400 mb-1">Coverage</p>
                <p className="font-semibold text-white">All Abu Dhabi</p>
              </div>
              <div className="rounded-xl border border-slate-700/70 p-3">
                <p className="text-slate-400 mb-1">Customer Rating</p>
                <p className="font-semibold text-white">4.9 / 5.0</p>
              </div>
              <div className="rounded-xl border border-slate-700/70 p-3">
                <p className="text-slate-400 mb-1">Support</p>
                <p className="font-semibold text-white">24 / 7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 md:px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "AC Repair & Maintenance",
              desc: "Fast, professional AC services to keep your home cool all year.",
            },
            {
              title: "Deep Cleaning",
              desc: "Full home cleaning with attention to every detail.",
            },
            {
              title: "Plumbing & Leaks",
              desc: "Quick fixes for leaks, clogs, and plumbing issues.",
            },
            {
              title: "Electrical Work",
              desc: "Safe and certified electrical maintenance and installations.",
            },
            {
              title: "Painting & Finishing",
              desc: "High-quality painting for apartments, villas, and offices.",
            },
            {
              title: "Pest Control",
              desc: "Safe and effective pest control solutions.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className={`${cardClass} rounded-xl p-4 md:p-5 flex flex-col gap-2`}
            >
              <h3 className="font-semibold text-sm md:text-base">
                {service.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-400">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-4 md:px-8 py-10 md:py-14 text-center"
        style={{ background: settings.accentColor }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Ready to book your next service?
        </h2>
        <p className="text-sm md:text-base text-white/80 mb-5">
          Send us a WhatsApp message and we&apos;ll respond in minutes.
        </p>
        <a
          href="https://wa.me/971501234567"
          className="inline-block px-6 py-2.5 rounded-lg bg-white text-sm md:text-base font-semibold"
          style={{ color: settings.accentColor }}
        >
          تواصل عبر واتساب الآن
        </a>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-5 text-xs md:text-sm text-slate-500 flex justify-between items-center">
        <span>© {new Date().getFullYear()} RelaxFix UAE</span>
        <span>Built for speed • Optimized for clients</span>
      </footer>

      {/* Dashboard Panel */}
      {isPanelOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-[320px] md:w-[380px] h-full bg-slate-950 border-l border-slate-800 p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold text-slate-100">
                Site Dashboard
              </h2>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="text-slate-400 text-xs hover:text-slate-200"
              >
                Close
              </button>
            </div>

            {/* Theme selector */}
            <div className="space-y-2">
              <p className="text-xs text-slate-400">Theme</p>
              <div className="flex gap-2">
                {(["proskill", "luxury", "minimal"] as ThemeKey[]).map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => applyTheme(t)}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-xs border ${
                        settings.theme === t
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-slate-700 text-slate-300 hover:bg-slate-900"
                      }`}
                    >
                      {t === "proskill"
                        ? "ProSkill"
                        : t === "luxury"
                        ? "Luxury"
                        : "Minimal"}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Hero title */}
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Hero Title</p>
              <textarea
                className="w-full h-16 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 p-2"
                value={settings.heroTitle}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    heroTitle: e.target.value,
                  }))
                }
              />
            </div>

            {/* Hero subtitle */}
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Hero Subtitle</p>
              <textarea
                className="w-full h-16 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 p-2"
                value={settings.heroSubtitle}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    heroSubtitle: e.target.value,
                  }))
                }
              />
            </div>

            {/* Toggle icons */}
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-slate-400">
                Show trusted icons
              </span>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    showIcons: !prev.showIcons,
                  }))
                }
                className={`w-10 h-5 rounded-full flex items-center px-1 ${
                  settings.showIcons ? "bg-blue-500" : "bg-slate-700"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transform transition ${
                    settings.showIcons ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              هذا مجرد Dashboard مبدئي داخل نفس الملف. لاحقًا نقدر نربطه
              بقاعدة بيانات ونخليه كامل مثل SaaS.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
