import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

export const dict = {
  brand: { en: "Pixel & Reel", ar: "بكسل آند ريل" },
  nav_home: { en: "Home", ar: "الرئيسية" },
  nav_design: { en: "Post Designer", ar: "مصمم المنشورات" },
  nav_video: { en: "Video Editor", ar: "محرر الفيديو" },
  nav_services: { en: "Services", ar: "الخدمات" },
  cta_start: { en: "Start Creating", ar: "ابدأ التصميم" },
  cta_video: { en: "Open Video Editor", ar: "افتح محرر الفيديو" },
  hero_kicker: { en: "Creative Studio", ar: "استوديو إبداعي" },
  hero_title: { en: "Design posts and edit videos like a pro studio.", ar: "صمّم منشورات واصنع فيديوهات باحترافية استوديو." },
  hero_sub: { en: "An all-in-one workspace for social ads, branded graphics, and pro-grade video cut, merge, and montage.", ar: "مساحة عمل متكاملة للإعلانات الاجتماعية والتصاميم الاحترافية وقص ودمج ومونتاج الفيديو." },
  services_title: { en: "What we build", ar: "ما نقدمه" },
  s1_t: { en: "Post Designer", ar: "مصمم المنشورات" },
  s1_d: { en: "Templates, text layers, brand colors, and instant export for Instagram, X, and TikTok.", ar: "قوالب وطبقات نصية وألوان العلامة وتصدير فوري لإنستغرام وتويتر وتيك توك." },
  s2_t: { en: "Image Design", ar: "تصميم الصور" },
  s2_d: { en: "AI-assisted layouts, smart cropping, filters, and high-resolution exports.", ar: "تخطيطات بمساعدة الذكاء الاصطناعي وقص ذكي وفلاتر وتصدير عالي الدقة." },
  s3_t: { en: "Video Editor", ar: "محرر الفيديو" },
  s3_d: { en: "Cut, trim, merge clips, add music, transitions, and captions on a timeline.", ar: "قص ودمج المقاطع وإضافة الموسيقى والانتقالات والترجمة على خط زمني." },
  coming_soon: { en: "Coming soon", ar: "قريباً" },
  designer_title: { en: "Post Designer", ar: "مصمم المنشورات" },
  designer_sub: { en: "Pick a template and start designing. Full canvas editor coming soon.", ar: "اختر قالباً وابدأ التصميم. محرر اللوحة الكامل قادم قريباً." },
  video_title: { en: "Video Editor", ar: "محرر الفيديو" },
  video_sub: { en: "Cut, merge, and montage your videos. Pro timeline editor coming soon.", ar: "قص ودمج ومونتاج الفيديوهات. محرر الخط الزمني الاحترافي قريباً." },
  footer: { en: "Built for creators.", ar: "صُمم للمبدعين." },
  switch_lang: { en: "العربية", ar: "English" },
} satisfies Dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string; dir: "ltr" | "rtl" };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang)) || "en";
    setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: keyof typeof dict) => dict[k][lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  return <I18nCtx.Provider value={{ lang, setLang, t, dir }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
