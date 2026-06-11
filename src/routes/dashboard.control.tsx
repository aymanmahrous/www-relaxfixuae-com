import { useState } from "react";

type LangKey = "en" | "ar";
type ThemeKey = "dark" | "luxury" | "minimal";

type SectionVisibility = {
  hero: boolean;
  services: boolean;
  cta: boolean;
  badges: boolean;
};

type ServiceItem = {
  id: number;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
};

const TEXT = {
  en: {
    dashboard: "Control Panel",
    theme: "Theme",
    language: "Language",
    sections: "Sections visibility",
    heroTitle: "Hero title",
    heroSubtitle: "Hero subtitle",
    services: "Services",
    addService: "Add service",
    remove: "Remove",
    serviceTitleEn: "Service title (EN)",
    serviceTitleAr: "Service title (AR)",
    serviceDescEn: "Service description (EN)",
    serviceDescAr: "Service description (AR)",
    showBadges: "Show trust badges",
  },
  ar: {
    dashboard: "لوحة التحكم",
    theme: "الثيم",
    language: "اللغة",
    sections: "إظهار / إخفاء الأقسام",
    heroTitle: "العنوان الرئيسي",
    heroSubtitle: "الوصف الرئيسي",
    services: "الخدمات",
    addService: "إضافة خدمة",
    remove: "حذف",
    serviceTitleEn: "عنوان الخدمة (إنجليزي)",
    serviceTitleAr: "عنوان الخدمة (عربي)",
    serviceDescEn: "وصف الخدمة (إنجليزي)",
    serviceDescAr: "وصف الخدمة (عربي)",
    showBadges: "إظهار شارات الثقة",
  },
};

export default function DashboardControl() {
  const [lang, setLang] = useState<LangKey>("en");
  const [theme, setTheme] = useState<ThemeKey>("dark");

  const [sections, setSections] = useState<SectionVisibility>({
    hero: true,
    services: true,
    cta: true,
    badges: true,
  });

  const [heroTitle, setHeroTitle] = useState({
    en: "Premium creative campaigns that look like a top agency.",
    ar: "حملات دعائية راقية بإحساس وكالة محترفة.",
  });

  const [heroSubtitle, setHeroSubtitle] = useState({
    en: "Branding, ads, social media and visuals designed with a Pixel Reel–style experience.",
    ar: "تصميمات سوشيال ميديا، إعلانات، وهوية بصرية بأسلوب Pixel Reel.",
  });

  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: 1,
      titleEn: "Full Brand Identity",
      titleAr: "هوية بصرية كاملة",
      descEn: "Logo, colors, typography and brand system.",
      descAr: "شعار، ألوان، خطوط، ونظام هوية.",
    },
  ]);

  const t = TEXT[lang];

  const addService = () => {
    setServices((prev) => [
      ...prev,
      {
        id: Date.now(),
        titleEn: "New service",
        titleAr: "خدمة جديدة",
        descEn: "Describe this service.",
        descAr: "اكتب وصف الخدمة.",
      },
    ]);
  };

  const removeService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Panel */}
      <aside className="w-[340px] border-r border-slate-800 p-4 space-y-4">
        <h2 className="text-lg font-bold">{t.dashboard}</h2>

        {/* Theme */}
        <div>
          <p className="text-xs text-slate-400 mb-1">{t.theme}</p>
          <div className="flex gap-2">
            {(["dark", "luxury", "minimal"] as ThemeKey[]).map((th) => (
              <button
                key={th}
                onClick={() => setTheme(th)}
                className={`px-3 py-1 rounded border ${
                  theme === th
                    ? "border-blue-500 text-blue-300"
                    : "border-slate-700 text-slate-300"
                }`}
              >
                {th}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <p className="text-xs text-slate-400 mb-1">{t.language}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded border ${
                lang === "en"
                  ? "border-blue-500 text-blue-300"
                  : "border-slate-700 text-slate-300"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ar")}
              className={`px-3 py-1 rounded border ${
                lang === "ar"
                  ? "border-blue-500 text-blue-300"
                  : "border-slate-700 text-slate-300"
              }`}
            >
              AR
            </button>
          </div>
        </div>

        {/* Sections */}
        <div>
          <p className="text-xs text-slate-400 mb-1">{t.sections}</p>
          {Object.entries(sections).map(([key, value]) => (
            <label
              key={key}
              className="flex justify-between items-center text-sm mb-1"
            >
              <span>{key}</span>
              <button
                onClick={() =>
                  setSections((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                className={`w-10 h-5 rounded-full flex items-center px-1 ${
                  value ? "bg-blue-500" : "bg-slate-700"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transform ${
                    value ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </label>
          ))}
        </div>

        {/* Hero Title */}
        <div>
          <p className="text-xs text-slate-400 mb-1">{t.heroTitle}</p>
          <textarea
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs"
            value={heroTitle[lang]}
            onChange={(e) =>
              setHeroTitle((prev) => ({ ...prev, [lang]: e.target.value }))
            }
          />
        </div>

        {/* Hero Subtitle */}
        <div>
          <p className="text-xs text-slate-400 mb-1">{t.heroSubtitle}</p>
          <textarea
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs"
            value={heroSubtitle[lang]}
            onChange={(e) =>
              setHeroSubtitle((prev) => ({ ...prev, [lang]: e.target.value }))
            }
          />
        </div>

        {/* Services */}
        <div>
          <p className="text-xs text-slate-400 mb-1">{t.services}</p>
          <button
            onClick={addService}
            className="px-3 py-1 bg-blue-600 rounded text-xs mb-2"
          >
            {t.addService}
          </button>

          {services.map((s) => (
            <div
              key={s.id}
              className="border border-slate-700 p-2 rounded mb-2 space-y-1"
            >
              <input
                className="w-full bg-slate-900 border border-slate-700 p-1 rounded text-xs"
                value={s.titleEn}
                onChange={(e) =>
                  setServices((prev) =>
                    prev.map((x) =>
                      x.id === s.id ? { ...x, titleEn: e.target.value } : x
                    )
                  )
                }
                placeholder={t.serviceTitleEn}
              />
              <input
                className="w-full bg-slate-900 border border-slate-700 p-1 rounded text-xs"
                value={s.titleAr}
                onChange={(e) =>
                  setServices((prev) =>
                    prev.map((x) =>
                      x.id === s.id ? { ...x, titleAr: e.target.value } : x
                    )
                  )
                }
                placeholder={t.serviceTitleAr}
              />
              <textarea
                className="w-full bg-slate-900 border border-slate-700 p-1 rounded text-xs"
                value={s.descEn}
                onChange={(e) =>
                  setServices((prev) =>
                    prev.map((x) =>
                      x.id === s.id ? { ...x, descEn: e.target.value } : x
                    )
                  )
                }
                placeholder={t.serviceDescEn}
              />
              <textarea
                className="w-full bg-slate-900 border border-slate-700 p-1 rounded text-xs"
                value={s.descAr}
                onChange={(e) =>
                  setServices((prev) =>
                    prev.map((x) =>
                      x.id === s.id ? { ...x, descAr: e.target.value } : x
                    )
                  )
                }
                placeholder={t.serviceDescAr}
              />

              <button
                onClick={() => removeService(s.id)}
                className="text-red-400 text-xs"
              >
                {t.remove}
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Preview */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">Live Preview</h1>
        <p className="text-slate-400 text-sm">
          كل تغيير تعمله في لوحة التحكم يظهر هنا مباشرة.
        </p>
      </main>
    </div>
  );
}
