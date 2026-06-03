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

  // Promo banner
  promo_prefix: { en: "Limited time", ar: "عرض محدود" },
  promo_cta: { en: "Claim now", ar: "احصل عليه الآن" },

  hero_kicker: { en: "AI Creative Studio · 2026 Edition", ar: "استوديو إبداعي بالذكاء الاصطناعي · إصدار 2026" },
  hero_title_1: { en: "Design that sells.", ar: "تصميمٌ يبيع." },
  hero_title_2: { en: "Video that captivates.", ar: "فيديوهات تأسر القلوب." },
  hero_sub: {
    en: "Generate professional social posts, logos, ads and pro video edits in seconds — powered by AI. Arabic & English.",
    ar: "أنشئ منشورات احترافية وشعارات وإعلانات ومونتاج فيديو خلال ثوانٍ — مدعومٌ بالذكاء الاصطناعي. عربي وإنجليزي.",
  },
  cta_order: { en: "Order a Project", ar: "اطلب مشروعك" },
  cta_portfolio: { en: "View Portfolio", ar: "شاهد الأعمال" },
  cta_whatsapp: { en: "Chat on WhatsApp", ar: "تواصل عبر واتساب" },
  cta_email: { en: "Send Brief", ar: "أرسل التفاصيل" },

  stat_projects: { en: "Projects delivered", ar: "مشروعاً منفّذاً" },
  stat_clients: { en: "Happy clients", ar: "عميلاً سعيداً" },
  stat_years: { en: "Years experience", ar: "سنوات خبرة" },
  stat_rating: { en: "Average rating", ar: "متوسط التقييم" },

  // Live AI Demo
  demo_kicker: { en: "Try the AI · Live", ar: "جرّب الذكاء الاصطناعي · مباشر" },
  demo_title: { en: "Type an idea → watch us design it", ar: "اكتب فكرة → شاهدنا نُصمّمها" },
  demo_sub: { en: "Real AI generation right here, no signup required.", ar: "توليد حقيقي بالذكاء الاصطناعي هنا مباشرة، بدون تسجيل." },
  demo_examples: { en: "Try an example:", ar: "جرّب مثالاً:" },
  demo_ex_1: { en: "Logo for a luxury coffee brand", ar: "شعار لعلامة قهوة فاخرة" },
  demo_ex_2: { en: "Friday 30% off cosmetics post", ar: "منشور خصم الجمعة 30% لمستحضرات تجميل" },
  demo_ex_3: { en: "Real-estate property ad", ar: "إعلان عقاري لعقار سكني" },
  demo_ex_4: { en: "Restaurant menu launch", ar: "إطلاق منيو مطعم" },
  demo_placeholder: { en: "Describe what you want to design…", ar: "صف ما تريد تصميمه…" },
  demo_btn: { en: "Generate preview", ar: "أنشئ معاينة" },
  demo_btn_busy: { en: "Generating…", ar: "جارٍ التوليد…" },
  demo_open_studio: { en: "Open full AI Studio", ar: "افتح الاستوديو الكامل" },
  demo_share: { en: "Send to WhatsApp", ar: "أرسل إلى واتساب" },

  services_kicker: { en: "What we do", ar: "ما نقدّمه" },
  services_title: { en: "Everything your brand needs", ar: "كلّ ما تحتاجه علامتك التجارية" },
  services_sub: { en: "Tap any service → start a WhatsApp chat with full details.", ar: "اضغط أي خدمة → ابدأ محادثة واتساب بكامل التفاصيل." },

  // Process
  process_kicker: { en: "How it works", ar: "كيف نعمل" },
  process_title: { en: "From idea to publish in 4 steps", ar: "من الفكرة إلى النشر في 4 خطوات" },
  step1_t: { en: "Send your brief", ar: "أرسل فكرتك" },
  step1_d: { en: "WhatsApp us — voice note or text, in any language.", ar: "راسلنا عبر واتساب — صوت أو نص، بأي لغة." },
  step2_t: { en: "We design with AI + human eye", ar: "نُصمّم بالذكاء الاصطناعي + لمسة بشرية" },
  step2_d: { en: "You get multiple variants within hours, not days.", ar: "ستحصل على عدة خيارات خلال ساعات، لا أيام." },
  step3_t: { en: "Pick & polish", ar: "اختر وعدّل" },
  step3_d: { en: "Choose your favorite, request unlimited tweaks.", ar: "اختر المفضّل واطلب التعديلات بلا حدود." },
  step4_t: { en: "Publish & grow", ar: "انشر وانطلق" },
  step4_d: { en: "Final files + scheduling + ad-ready exports.", ar: "ملفات نهائية + جدولة + نسخ جاهزة للإعلانات." },

  work_kicker: { en: "Selected work", ar: "أعمال مختارة" },
  work_title: { en: "Recent projects we're proud of", ar: "أحدث مشاريعنا التي نفخر بها" },

  pricing_kicker: { en: "Simple pricing", ar: "أسعار شفّافة" },
  pricing_title: { en: "Plans that grow with you", ar: "باقات تنمو معك" },
  pricing_sub: { en: "Pay once or subscribe. Cancel anytime. No hidden fees.", ar: "ادفع مرة أو اشترك. ألغِ في أي وقت. بدون رسوم خفيّة." },
  popular: { en: "Most popular", ar: "الأكثر طلباً" },
  per_month: { en: "/month", ar: "/شهرياً" },

  // FAQ
  faq_kicker: { en: "FAQ", ar: "الأسئلة الشائعة" },
  faq_title: { en: "Questions clients ask us", ar: "أسئلة يطرحها عملاؤنا" },
  faq_q1: { en: "How fast is delivery?", ar: "كم تستغرق مدة التسليم؟" },
  faq_a1: { en: "Most posts are delivered within hours. Full brand identities within 3–5 days.", ar: "معظم المنشورات تُسلَّم خلال ساعات، والهوية البصرية الكاملة خلال 3–5 أيام." },
  faq_q2: { en: "Do you provide source files?", ar: "هل تُسلّمون الملفات الأصلية؟" },
  faq_a2: { en: "Yes — Figma, PSD, AI, plus optimized PNG/JPG/MP4.", ar: "نعم — Figma وPSD وAI، بالإضافة إلى PNG/JPG/MP4 محسّنة." },
  faq_q3: { en: "Can I use AI generations commercially?", ar: "هل يمكن استخدام تصاميم الذكاء الاصطناعي تجارياً؟" },
  faq_a3: { en: "Absolutely. Everything generated here is yours to publish and monetize.", ar: "بالتأكيد. كلّ ما تُنتجه هنا ملكٌ لك لنشره والربح منه." },
  faq_q4: { en: "What if I don't like the result?", ar: "ماذا لو لم يعجبني الناتج؟" },
  faq_a4: { en: "Unlimited revisions on Pro & Studio plans. Money-back on first delivery if not happy.", ar: "تعديلات بلا حدود في باقات Pro وStudio، واسترداد كامل للمبلغ على أول تسليم إن لم تكن راضياً." },
  faq_q5: { en: "Do you write Arabic content?", ar: "هل تكتبون محتوى عربياً؟" },
  faq_a5: { en: "Yes — native Arabic copywriting, hashtags, and culturally-tuned visuals.", ar: "نعم — نصوص عربية أصيلة، هاشتاجات، وتصاميم متوافقة مع الثقافة." },

  testi_kicker: { en: "Loved by brands", ar: "تثق بنا العلامات" },
  testi_title: { en: "What our clients say", ar: "ماذا يقول عملاؤنا" },
  t1: { en: "Sales jumped 3x after they redesigned our ads. Worth every riyal.", ar: "تضاعفت مبيعاتنا ثلاث مرات بعد إعادة تصميم إعلاناتنا. يستحقّون كلّ ريال." },
  t1_name: { en: "Sara A. — Boutique Owner", ar: "سارة أ. — صاحبة بوتيك" },
  t2: { en: "The video montage they made for our launch went viral on TikTok.", ar: "المونتاج الذي صنعوه لإطلاقنا انتشر كالنار في الهشيم على تيك توك." },
  t2_name: { en: "Khalid M. — Restaurant Founder", ar: "خالد م. — مؤسّس مطعم" },
  t3: { en: "Best brand identity team I've worked with in years. Truly creative.", ar: "أفضل فريق هوية بصرية تعاملتُ معه منذ سنوات. إبداعٌ حقيقي." },
  t3_name: { en: "Layla H. — Tech Startup CEO", ar: "ليلى ح. — مديرة شركة ناشئة" },

  cta_title: { en: "Ready to make something amazing?", ar: "جاهز لصنع شيءٍ مذهل؟" },
  cta_sub: { en: "Tell us about your project and get a free quote within 24 hours.", ar: "أخبرنا عن مشروعك واحصل على عرض سعر مجاني خلال 24 ساعة." },

  footer_rights: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  built_by: { en: "Crafted with ❤️ by", ar: "صُمّم بحبّ ❤️ بواسطة" },

  // Designer
  coming_soon: { en: "Coming soon", ar: "قريباً" },
  designer_title: { en: "AI Post Designer", ar: "مصمم المنشورات بالذكاء الاصطناعي" },
  designer_sub: { en: "Describe your idea — get 4 ready-to-publish designs in seconds.", ar: "اكتب فكرتك واحصل على 4 تصاميم جاهزة للنشر خلال ثوانٍ." },
  video_title: { en: "AI Video Studio", ar: "استوديو الفيديو بالذكاء الاصطناعي" },
  video_sub: { en: "Upload, trim, preview — then we montage it professionally.", ar: "ارفع، قُصّ، عاين — ثم نُنفّذ لك المونتاج الاحترافي." },

  d_brief: { en: "Describe your post", ar: "صف منشورك" },
  d_brief_ph: { en: "e.g. Friday 30% off Arabic coffee, warm cozy vibe", ar: "مثال: خصم الجمعة 30% على القهوة العربية بأجواء دافئة ومُريحة" },
  d_style: { en: "Style", ar: "النمط" },
  d_ratio: { en: "Format", ar: "المقاس" },
  d_tone: { en: "Tone", ar: "النبرة" },
  d_generate: { en: "Generate 4 designs", ar: "أنشئ 4 تصاميم" },
  d_generating: { en: "Creating your designs…", ar: "جارٍ إنشاء تصاميمك…" },
  d_download: { en: "Download", ar: "تنزيل" },
  d_share_wa: { en: "Send to WhatsApp", ar: "أرسل إلى واتساب" },
  d_share_tg: { en: "Send to Telegram", ar: "أرسل إلى تليجرام" },
  d_caption: { en: "AI Caption & Hashtags", ar: "كابشن وهاشتاجات بالذكاء الاصطناعي" },
  d_gen_caption: { en: "Generate caption", ar: "اكتب الكابشن" },
  d_copy: { en: "Copy", ar: "نسخ" },
  d_copied: { en: "Copied!", ar: "تم النسخ!" },

  credits_left: { en: "credits left", ar: "محاولة متبقّية" },
  welcome_credit_title: { en: "🎁 Welcome gift", ar: "🎁 هديّة الترحيب" },
  welcome_credit_sub: { en: "Free AI generations on us — try the studio now.", ar: "محاولات مجانية بالذكاء الاصطناعي — جرّب الاستوديو الآن." },
  out_of_credits: { en: "Out of credits. Contact us on WhatsApp to top up.", ar: "نفد رصيدك المجاني. تواصل عبر واتساب لشحن الرصيد." },
  try_free: { en: "Try free now", ar: "جرّب مجاناً الآن" },

  v_upload: { en: "Upload video", ar: "ارفع فيديو" },
  v_start: { en: "Start (s)", ar: "البداية (ث)" },
  v_end: { en: "End (s)", ar: "النهاية (ث)" },
  v_preview: { en: "Preview trim", ar: "معاينة القص" },
  v_export: { en: "Download original", ar: "نزّل الأصلي" },
  v_no_file: { en: "No file selected", ar: "لم يتم اختيار ملف" },
  v_request_montage: { en: "Request pro montage", ar: "اطلب مونتاج احترافي" },
  v_request_reel: { en: "Make this a viral Reel", ar: "اصنع منه ريلز فيروسي" },
  v_request_trim: { en: "Polish & deliver", ar: "تلميع وتسليم" },
  v_ai_kicker: { en: "AI Video Services", ar: "خدمات الفيديو بالذكاء الاصطناعي" },

  pay_wa: { en: "Order on WhatsApp", ar: "اطلب عبر واتساب" },
  pay_tg: { en: "Order on Telegram", ar: "اطلب عبر تليجرام" },

  // Admin panel
  admin: { en: "Admin", ar: "لوحة التحكم" },
  admin_title: { en: "Control Panel", ar: "لوحة التحكم الكاملة" },
  admin_sub: { en: "Edit anything live — brand, contacts, services, pricing, offers, theme.", ar: "عدّل أيّ شيء مباشرة — العلامة، التواصل، الخدمات، الأسعار، العروض، والمظهر." },
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
  a_offer: { en: "Promo offer", ar: "العرض الترويجي" },
  a_offer_on: { en: "Show banner", ar: "إظهار الشريط" },
  a_offer_title_en: { en: "Offer title (EN)", ar: "عنوان العرض (إنجليزي)" },
  a_offer_title_ar: { en: "Offer title (AR)", ar: "عنوان العرض (عربي)" },
  a_offer_code: { en: "Promo code", ar: "كود الخصم" },
  a_offer_discount: { en: "Discount (%)", ar: "نسبة الخصم (%)" },
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
