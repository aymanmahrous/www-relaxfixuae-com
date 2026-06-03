import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Service = { id: string; icon: string; titleEn: string; titleAr: string; descEn: string; descAr: string };
export type Plan = { id: string; nameEn: string; nameAr: string; price: string; priceId?: string; popular: boolean; featuresEn: string[]; featuresAr: string[] };
export type AddOn = { id: string; nameEn: string; nameAr: string; price: string; priceId?: string; icon: string };
export type Testimonial = { id: string; name: string; role: string; avatar?: string; quoteEn: string; quoteAr: string; rating: number };
export type Partner = { id: string; name: string; logoUrl?: string };
export type Offer = {
  enabled: boolean;
  titleEn: string;
  titleAr: string;
  code: string;
  discount: number;
  expiresAt?: string;
};
export type Settings = {
  brandEn: string;
  brandAr: string;
  builtBy: string;
  whatsapp: string;
  telegram: string;
  email: string;
  whatsappFab: boolean;
  gaId: string;
  metaPixelId: string;
  welcomeCredits: number;
  accent: string;
  uiScale: number;
  defaultStyle: string;
  defaultRatio: "1:1" | "9:16" | "16:9" | "4:5";
  offer: Offer;
  services: Service[];
  plans: Plan[];
  addons: AddOn[];
  testimonials: Testimonial[];
  partners: Partner[];
};


const DEFAULTS: Settings = {
  brandEn: "Pixel & Reel",
  brandAr: "بكسل آند ريل",
  builtBy: "Ayman Mahrous",
  whatsapp: "971588259848",
  telegram: "7895113378",
  email: "ayman@pixelreel.studio",
  whatsappFab: true,
  gaId: "",
  metaPixelId: "",
  welcomeCredits: 5,
  accent: "#ec4899",
  uiScale: 1,
  defaultStyle: "modern",
  defaultRatio: "1:1",
  offer: {
    enabled: true,
    titleEn: "🔥 New Year Launch — 30% OFF first project + Free AI captions",
    titleAr: "🔥 عرض الإطلاق — خصم 30% على أول مشروع + كابشن AI مجاناً",
    code: "AYMAN30",
    discount: 30,
    expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
  },
  addons: [
    { id: "a1", icon: "Sparkles",  nameEn: "Extra Reel Video",     nameAr: "ريل فيديو إضافي",  price: "55 AED",  priceId: "addon_reel" },
    { id: "a2", icon: "PenTool",   nameEn: "Express Logo (24h)",   nameAr: "شعار سريع (24س)",  price: "109 AED", priceId: "addon_logo_express" },
    { id: "a3", icon: "Megaphone", nameEn: "AI Captions Pack ×20", nameAr: "20 كابشن بالذكاء", price: "19 AED",  priceId: "addon_captions" },
    { id: "a4", icon: "ImageIcon", nameEn: "Story Templates ×10",  nameAr: "10 قوالب ستوري",   price: "45 AED",  priceId: "addon_stories" },
  ],
  services: [
    { id: "s1", icon: "ImageIcon", titleEn: "Social Media Posts", titleAr: "منشورات السوشيال ميديا", descEn: "Scroll-stopping designs for Instagram, TikTok, X & Snap.", descAr: "تصاميم تُوقف التمرير لإنستغرام وتيك توك وإكس وسناب شات." },
    { id: "s2", icon: "PenTool", titleEn: "Logo & Brand Identity", titleAr: "الشعار والهوية البصرية", descEn: "Memorable logos, color systems, and full guidelines.", descAr: "شعارات لا تُنسى، أنظمة ألوان، ودليل هوية متكامل." },
    { id: "s3", icon: "Film", titleEn: "Video Editing & Montage", titleAr: "مونتاج وتحرير الفيديو", descEn: "Cut, merge, color grade, music & sound design.", descAr: "قص ودمج وتدرّج لوني وموسيقى وتصميم صوتي." },
    { id: "s4", icon: "Sparkles", titleEn: "Motion Graphics", titleAr: "موشن جرافيك", descEn: "Animated logos, explainers & 3D motion.", descAr: "شعارات متحركة، فيديوهات تعريفية، وموشن ثلاثي الأبعاد." },
    { id: "s5", icon: "Megaphone", titleEn: "Ad Campaigns", titleAr: "الحملات الإعلانية", descEn: "End-to-end creative for Meta, TikTok & Google Ads.", descAr: "إبداع متكامل لإعلانات ميتا وتيك توك وجوجل." },
    { id: "s6", icon: "Camera", titleEn: "Product Photography", titleAr: "تصوير المنتجات", descEn: "Studio-grade shots & AI-powered retouching.", descAr: "تصوير بجودة الاستوديو ومعالجة بالذكاء الاصطناعي." },
    { id: "s7", icon: "Package", titleEn: "Print & Packaging", titleAr: "الطباعة والتغليف", descEn: "Business cards, menus, brochures & box design.", descAr: "بطاقات أعمال، قوائم طعام، كتيبات، وتصميم العلب." },
    { id: "s8", icon: "TrendingUp", titleEn: "Social Media Management", titleAr: "إدارة السوشيال ميديا", descEn: "Content planning, posting & growth strategy.", descAr: "تخطيط المحتوى، النشر، واستراتيجية النمو." },
  ],
  plans: [
    { id: "p1", nameEn: "Starter", nameAr: "الباقة المبتدئة", price: "179 AED", priceId: "starter_onetime", popular: false,
      featuresEn: ["10 social posts", "1 logo concept", "48h delivery", "Email support"],
      featuresAr: ["10 منشورات سوشيال", "تصميم شعار واحد", "تسليم خلال 48 ساعة", "دعم عبر البريد"] },
    { id: "p2", nameEn: "Pro", nameAr: "الباقة الاحترافية", price: "729 AED/mo", priceId: "pro_monthly", popular: true,
      featuresEn: ["30 social posts + stories", "Full brand identity", "5 video reels / month", "Priority delivery"],
      featuresAr: ["30 منشوراً + ستوريز", "هوية بصرية متكاملة", "5 فيديوهات ريلز شهرياً", "تسليم بأولوية"] },
    { id: "p3", nameEn: "Studio", nameAr: "باقة الاستوديو", price: "1,799 AED/mo", priceId: "studio_monthly", popular: false,
      featuresEn: ["Unlimited designs", "Full video production", "Dedicated art director", "24/7 support"],
      featuresAr: ["تصاميم بلا حدود", "إنتاج فيديو متكامل", "مدير فني مخصص", "دعم على مدار الساعة"] },
  ],
  testimonials: [
    { id: "t1", name: "Sara A.", role: "Founder, Bloom Café", rating: 5,
      quoteEn: "The reels they made tripled our Instagram reach in two weeks.",
      quoteAr: "الفيديوهات اللي عملوها ضاعفت وصولنا على إنستغرام 3 مرات في أسبوعين." },
    { id: "t2", name: "Khalid M.", role: "CEO, NovaTech", rating: 5,
      quoteEn: "Best branding investment we made. Delivered ahead of schedule.",
      quoteAr: "أفضل استثمار في الهوية قمنا به. سلّموا قبل الموعد." },
    { id: "t3", name: "Layla H.", role: "Marketing Lead, Oasis", rating: 5,
      quoteEn: "Pixel-perfect designs and crystal-clear communication.",
      quoteAr: "تصاميم بدقة عالية وتواصل واضح جداً." },
  ],
  partners: [
    { id: "pa1", name: "Bloom Café" },
    { id: "pa2", name: "NovaTech" },
    { id: "pa3", name: "Oasis" },
    { id: "pa4", name: "Aurora" },
    { id: "pa5", name: "Helix" },
    { id: "pa6", name: "Vertex" },
  ],
};

const KEY = "pr_settings_v2";

const Ctx = createContext<{
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  reset: () => void;
} | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--primary", settings.accent);
    root.style.setProperty("--ring", settings.accent);
    root.style.setProperty("--brand-pink", settings.accent);
    root.style.fontSize = `${settings.uiScale * 100}%`;
  }, [settings.accent, settings.uiScale]);

  const update = (patch: Partial<Settings>) => {
    setSettings((s) => {
      const next = { ...s, ...patch };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const reset = () => {
    localStorage.removeItem(KEY);
    setSettings(DEFAULTS);
  };

  return <Ctx.Provider value={{ settings, update, reset }}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSettings must be inside SettingsProvider");
  return c;
}

export function waUrl(phone: string, text?: string) {
  const num = phone.replace(/\D/g, "");
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
export function tgUrl(handle: string, text?: string) {
  const clean = handle.replace(/^@/, "").trim();
  // If looks like an ID/number, use phone-style link, otherwise username
  const base = /^\+?\d{5,}$/.test(clean) ? `https://t.me/+${clean.replace(/^\+/, "")}` : `https://t.me/${clean}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
