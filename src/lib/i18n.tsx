import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

export const dict = {
  brand: { en: "Pixel & Reel", ar: "بكسل آند ريل" },
  tagline: { en: "Creative Studio", ar: "استوديو إبداعي" },

  nav_home: { en: "Home", ar: "الرئيسية" },
  nav_services: { en: "Services", ar: "الخدمات" },
  nav_work: { en: "Work", ar: "أعمالنا" },
  nav_pricing: { en: "Pricing", ar: "الأسعار" },
  nav_design: { en: "Design", ar: "تصميم" },
  nav_video: { en: "Video", ar: "فيديو" },
  nav_contact: { en: "Contact", ar: "تواصل" },
  switch_lang: { en: "العربية", ar: "English" },

  hero_kicker: { en: "Award-winning creative studio", ar: "استوديو إبداعي حائز على جوائز" },
  hero_title_1: { en: "Design that sells.", ar: "تصاميم تبيع." },
  hero_title_2: { en: "Video that captivates.", ar: "فيديوهات تأسر." },
  hero_sub: {
    en: "We craft social posts, brand identities, ads, and pro video edits that turn scrolls into sales — in Arabic & English.",
    ar: "نصمم منشورات السوشيال والهويات التجارية والإعلانات ومونتاج الفيديو الاحترافي لنحول التصفح إلى مبيعات — بالعربية والإنجليزية.",
  },
  cta_order: { en: "Order a Project", ar: "اطلب مشروعك" },
  cta_portfolio: { en: "View Portfolio", ar: "شاهد الأعمال" },

  stat_projects: { en: "Projects delivered", ar: "مشروع منفّذ" },
  stat_clients: { en: "Happy clients", ar: "عميل سعيد" },
  stat_years: { en: "Years experience", ar: "سنوات خبرة" },
  stat_rating: { en: "Average rating", ar: "متوسط التقييم" },

  services_kicker: { en: "What we do", ar: "ما نقدمه" },
  services_title: { en: "Everything your brand needs", ar: "كل ما تحتاجه علامتك" },

  s_post_t: { en: "Social Media Posts", ar: "منشورات السوشيال ميديا" },
  s_post_d: { en: "Scroll-stopping designs for Instagram, TikTok, X & Snap.", ar: "تصاميم توقف التمرير لإنستغرام وتيك توك وتويتر وسناب." },
  s_logo_t: { en: "Logo & Brand Identity", ar: "الشعار والهوية البصرية" },
  s_logo_d: { en: "Memorable logos, color systems, and full guidelines.", ar: "شعارات لا تُنسى وأنظمة ألوان ودليل هوية كامل." },
  s_video_t: { en: "Video Editing & Montage", ar: "مونتاج وتحرير الفيديو" },
  s_video_d: { en: "Cut, merge, color grade, music & sound design.", ar: "قص ودمج وتدرج لوني وموسيقى وتصميم صوتي." },
  s_motion_t: { en: "Motion Graphics", ar: "موشن جرافيك" },
  s_motion_d: { en: "Animated logos, explainers & 3D motion.", ar: "شعارات متحركة وفيديوهات تعريفية وموشن ثلاثي الأبعاد." },
  s_ads_t: { en: "Ad Campaigns", ar: "حملات إعلانية" },
  s_ads_d: { en: "End-to-end creative for Meta, TikTok & Google Ads.", ar: "إبداع متكامل لإعلانات ميتا وتيك توك وجوجل." },
  s_photo_t: { en: "Product Photography", ar: "تصوير المنتجات" },
  s_photo_d: { en: "Studio-grade shots & AI-powered retouching.", ar: "تصوير بجودة الاستوديو ومعالجة بالذكاء الاصطناعي." },
  s_print_t: { en: "Print & Packaging", ar: "الطباعة والتغليف" },
  s_print_d: { en: "Business cards, menus, brochures & box design.", ar: "بطاقات أعمال ومنيوهات وكتيبات وتصميم العلب." },
  s_smm_t: { en: "Social Media Management", ar: "إدارة السوشيال ميديا" },
  s_smm_d: { en: "Content planning, posting & growth strategy.", ar: "تخطيط محتوى ونشر واستراتيجية نمو." },

  work_kicker: { en: "Selected work", ar: "أعمال مختارة" },
  work_title: { en: "Recent projects we're proud of", ar: "أحدث مشاريعنا التي نفخر بها" },

  pricing_kicker: { en: "Simple pricing", ar: "أسعار بسيطة" },
  pricing_title: { en: "Plans that grow with you", ar: "باقات تنمو معك" },
  pricing_sub: { en: "Pay once or subscribe. Cancel anytime.", ar: "ادفع مرة أو اشترك. إلغاء في أي وقت." },

  plan_starter: { en: "Starter", ar: "المبتدئ" },
  plan_pro: { en: "Pro", ar: "الاحترافي" },
  plan_studio: { en: "Studio", ar: "الاستوديو" },
  popular: { en: "Most popular", ar: "الأكثر طلباً" },
  per_month: { en: "/month", ar: "/شهرياً" },

  starter_f1: { en: "10 social posts", ar: "10 منشورات سوشيال" },
  starter_f2: { en: "1 logo concept", ar: "تصميم شعار واحد" },
  starter_f3: { en: "48h delivery", ar: "تسليم خلال 48 ساعة" },
  starter_f4: { en: "Email support", ar: "دعم عبر البريد" },

  pro_f1: { en: "30 social posts + stories", ar: "30 منشور + ستوريز" },
  pro_f2: { en: "Full brand identity", ar: "هوية بصرية كاملة" },
  pro_f3: { en: "5 video reels / month", ar: "5 فيديوهات ريلز شهرياً" },
  pro_f4: { en: "Priority delivery", ar: "تسليم بأولوية" },

  studio_f1: { en: "Unlimited designs", ar: "تصاميم غير محدودة" },
  studio_f2: { en: "Full video production", ar: "إنتاج فيديو متكامل" },
  studio_f3: { en: "Dedicated art director", ar: "مدير فني مخصص" },
  studio_f4: { en: "24/7 support", ar: "دعم على مدار الساعة" },

  choose_plan: { en: "Choose Plan", ar: "اختر الباقة" },

  testi_kicker: { en: "Loved by brands", ar: "تثق بنا العلامات" },
  testi_title: { en: "What our clients say", ar: "ماذا يقول عملاؤنا" },
  t1: { en: "Sales jumped 3x after they redesigned our ads. Worth every riyal.", ar: "تضاعفت مبيعاتنا ثلاثة أضعاف بعد إعادة تصميم إعلاناتنا. يستحقّون كل ريال." },
  t1_name: { en: "Sara A. — Boutique Owner", ar: "سارة أ. — صاحبة بوتيك" },
  t2: { en: "The video montage they made for our launch went viral on TikTok.", ar: "الفيديو الذي صنعوه لإطلاق منتجنا انتشر بشكل واسع على تيك توك." },
  t2_name: { en: "Khalid M. — Restaurant Founder", ar: "خالد م. — مؤسس مطعم" },
  t3: { en: "Best brand identity team I've worked with in years. Truly creative.", ar: "أفضل فريق هوية بصرية تعاملت معه منذ سنوات. إبداع حقيقي." },
  t3_name: { en: "Layla H. — Tech Startup CEO", ar: "ليلى ح. — مديرة شركة ناشئة" },

  cta_title: { en: "Ready to make something amazing?", ar: "جاهز تصنع شيئاً مذهلاً؟" },
  cta_sub: { en: "Tell us about your project and get a free quote within 24 hours.", ar: "أخبرنا عن مشروعك واحصل على عرض سعر مجاني خلال 24 ساعة." },
  cta_whatsapp: { en: "Chat on WhatsApp", ar: "تواصل عبر واتساب" },
  cta_email: { en: "Send Brief", ar: "أرسل التفاصيل" },

  footer_rights: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },

  coming_soon: { en: "Coming soon", ar: "قريباً" },
  designer_title: { en: "AI Post Designer", ar: "مصمم المنشورات بالذكاء الاصطناعي" },
  designer_sub: { en: "Describe your idea — get 4 ready-to-publish designs in seconds.", ar: "اكتب فكرتك واحصل على 4 تصاميم جاهزة للنشر خلال ثوانٍ." },
  video_title: { en: "Video Studio", ar: "استوديو الفيديو" },
  video_sub: { en: "Upload, trim, and export clips for social.", ar: "ارفع وقص وصدّر مقاطعك للسوشيال." },

  d_brief: { en: "Describe your post", ar: "صف منشورك" },
  d_brief_ph: { en: "e.g. Friday 30% off Arabic coffee, warm cozy vibe", ar: "مثال: خصم الجمعة 30% على القهوة العربية بأجواء دافئة" },
  d_style: { en: "Style", ar: "النمط" },
  d_ratio: { en: "Format", ar: "المقاس" },
  d_tone: { en: "Tone", ar: "النبرة" },
  d_generate: { en: "Generate 4 designs", ar: "أنشئ 4 تصاميم" },
  d_generating: { en: "Creating your designs…", ar: "جاري إنشاء تصاميمك…" },
  d_download: { en: "Download", ar: "تنزيل" },
  d_share_wa: { en: "Share WhatsApp", ar: "شارك واتساب" },
  d_share_tg: { en: "Share Telegram", ar: "شارك تليجرام" },
  d_caption: { en: "AI Caption & Hashtags", ar: "كابشن وهاشتاجات AI" },
  d_gen_caption: { en: "Generate caption", ar: "اكتب الكابشن" },
  d_copy: { en: "Copy", ar: "نسخ" },
  d_copied: { en: "Copied!", ar: "تم النسخ!" },

  credits_left: { en: "credits left", ar: "رصيد متبقي" },
  welcome_credit_title: { en: "Welcome gift", ar: "هدية ترحيب" },
  welcome_credit_sub: { en: "5 free AI generations on us — try the studio now.", ar: "لديك 5 محاولات مجانية — جرب الاستوديو الآن." },
  out_of_credits: { en: "Out of credits. Contact us on WhatsApp to top up.", ar: "نفد رصيدك. تواصل عبر واتساب للشحن." },
  try_free: { en: "Try free now", ar: "جرب مجاناً الآن" },

  v_upload: { en: "Upload video", ar: "ارفع فيديو" },
  v_start: { en: "Start (s)", ar: "البداية (ث)" },
  v_end: { en: "End (s)", ar: "النهاية (ث)" },
  v_preview: { en: "Preview trim", ar: "معاينة القص" },
  v_export: { en: "Download original", ar: "حمّل الأصلي" },
  v_no_file: { en: "No file selected", ar: "لم يتم اختيار ملف" },

  pay_wa: { en: "Order on WhatsApp", ar: "اطلب عبر واتساب" },
  pay_tg: { en: "Order on Telegram", ar: "اطلب عبر تليجرام" },

  built_by: { en: "Built by", ar: "تصميم وتطوير" },

  // Admin panel
  admin: { en: "Admin", ar: "لوحة التحكم" },
  admin_title: { en: "Control Panel", ar: "لوحة التحكم الكاملة" },
  admin_sub: { en: "Edit anything live — brand, contacts, services, pricing, theme.", ar: "عدّل أي شيء مباشرة — العلامة، التواصل، الخدمات، الأسعار، والنمط." },
  a_brand: { en: "Brand & Contact", ar: "العلامة وبيانات التواصل" },
  a_brand_en: { en: "Brand name (EN)", ar: "اسم العلامة (إنجليزي)" },
  a_brand_ar: { en: "Brand name (AR)", ar: "اسم العلامة (عربي)" },
  a_built_by: { en: "Built by (signature)", ar: "توقيع المطوّر" },
  a_whatsapp: { en: "WhatsApp number", ar: "رقم واتساب" },
  a_telegram: { en: "Telegram (username or number)", ar: "تليجرام (اسم المستخدم أو رقم)" },
  a_email: { en: "Email", ar: "البريد الإلكتروني" },
  a_appearance: { en: "Appearance", ar: "المظهر" },
  a_accent: { en: "Accent color", ar: "اللون المميّز" },
  a_scale: { en: "UI size", ar: "حجم الواجهة" },
  a_smaller: { en: "Smaller", ar: "أصغر" },
  a_larger: { en: "Larger", ar: "أكبر" },
  a_defaults: { en: "Studio defaults", ar: "إعدادات الاستوديو" },
  a_def_style: { en: "Default style", ar: "النمط الافتراضي" },
  a_def_ratio: { en: "Default format", ar: "المقاس الافتراضي" },
  a_welcome: { en: "Welcome credits", ar: "رصيد الترحيب" },
  a_services: { en: "Services", ar: "الخدمات" },
  a_plans: { en: "Pricing plans", ar: "باقات الأسعار" },
  a_add: { en: "Add new", ar: "إضافة جديد" },
  a_delete: { en: "Delete", ar: "حذف" },
  a_save: { en: "Save changes", ar: "حفظ التغييرات" },
  a_saved: { en: "Saved", ar: "تم الحفظ" },
  a_reset: { en: "Reset all to defaults", ar: "إعادة تعيين كل شيء" },
  a_title_en: { en: "Title (EN)", ar: "العنوان (إنجليزي)" },
  a_title_ar: { en: "Title (AR)", ar: "العنوان (عربي)" },
  a_desc_en: { en: "Description (EN)", ar: "الوصف (إنجليزي)" },
  a_desc_ar: { en: "Description (AR)", ar: "الوصف (عربي)" },
  a_icon: { en: "Icon", ar: "الأيقونة" },
  a_price: { en: "Price", ar: "السعر" },
  a_popular: { en: "Most popular", ar: "الأكثر طلباً" },
  a_features_en: { en: "Features (EN, one per line)", ar: "المزايا (إنجليزي، كل ميزة في سطر)" },
  a_features_ar: { en: "Features (AR, one per line)", ar: "المزايا (عربي، كل ميزة في سطر)" },
};

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
