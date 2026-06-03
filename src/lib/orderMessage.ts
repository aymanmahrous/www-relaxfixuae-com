import type { Lang } from "./i18n";
import type { Settings, Service, Plan } from "./settings";

const NL = "\n";

function header(brand: string, lang: Lang) {
  return lang === "ar"
    ? `🎨 طلب جديد من موقع ${brand}`
    : `🎨 New request via ${brand}`;
}

function footerSig(s: Settings, lang: Lang) {
  return lang === "ar"
    ? `${NL}— ${NL}🧑‍💻 ${s.builtBy} · ${s.brandAr}`
    : `${NL}— ${NL}🧑‍💻 ${s.builtBy} · ${s.brandEn}`;
}

/** Generic enquiry */
export function genericMessage(s: Settings, lang: Lang, topic?: string) {
  const lines = [
    header(lang === "ar" ? s.brandAr : s.brandEn, lang),
    lang === "ar" ? "السلام عليكم 👋" : "Hi there 👋",
    lang === "ar"
      ? `أرغب في الاستفسار${topic ? ` عن: ${topic}` : ""}.`
      : `I'd like to ask${topic ? ` about: ${topic}` : ""}.`,
    lang === "ar" ? "هل يمكن تزويدي بالتفاصيل وعرض السعر؟ شكراً." : "Could you share details and a quote? Thanks!",
    footerSig(s, lang),
  ];
  return lines.join(NL);
}

/** Service-specific message — lists what's included */
export function serviceMessage(s: Settings, lang: Lang, srv: Service) {
  const title = lang === "ar" ? srv.titleAr : srv.titleEn;
  const desc = lang === "ar" ? srv.descAr : srv.descEn;
  const lines = [
    header(lang === "ar" ? s.brandAr : s.brandEn, lang),
    lang === "ar" ? `📌 الخدمة المطلوبة: *${title}*` : `📌 Service: *${title}*`,
    lang === "ar" ? `📝 الوصف: ${desc}` : `📝 Description: ${desc}`,
    "",
    lang === "ar" ? "✅ ما سأحصل عليه:" : "✅ What I'll get:",
    ...includesFor(srv.id, lang).map((x) => `   • ${x}`),
    "",
    lang === "ar" ? "أرجو إرسال عرض السعر والمدة 🙏" : "Please send me a quote and timeline 🙏",
    footerSig(s, lang),
  ];
  return lines.join(NL);
}

/** Plan-specific message */
export function planMessage(s: Settings, lang: Lang, plan: Plan) {
  const name = lang === "ar" ? plan.nameAr : plan.nameEn;
  const features = lang === "ar" ? plan.featuresAr : plan.featuresEn;
  const lines = [
    header(lang === "ar" ? s.brandAr : s.brandEn, lang),
    lang === "ar" ? `💼 الباقة المختارة: *${name}*` : `💼 Selected plan: *${name}*`,
    lang === "ar" ? `💵 السعر: ${plan.price} / شهرياً` : `💵 Price: ${plan.price} / month`,
    "",
    lang === "ar" ? "📦 ما تتضمنه الباقة:" : "📦 Plan includes:",
    ...features.map((f) => `   ✓ ${f}`),
    "",
    lang === "ar" ? "أريد البدء فوراً، ما هي خطوات الدفع؟" : "I'd like to start now — how do I pay?",
    footerSig(s, lang),
  ];
  return lines.join(NL);
}

/** When sharing an AI-generated design */
export function shareDesignMessage(s: Settings, lang: Lang, brief: string, style: string, ratio: string) {
  const lines = [
    header(lang === "ar" ? s.brandAr : s.brandEn, lang),
    lang === "ar" ? "✨ صمّمتُ هذا المنشور باستخدام الذكاء الاصطناعي على موقعكم:" : "✨ Generated this design with your AI studio:",
    "",
    lang === "ar" ? `💡 الفكرة: ${brief}` : `💡 Brief: ${brief}`,
    lang === "ar" ? `🎨 النمط: ${style} · 📐 المقاس: ${ratio}` : `🎨 Style: ${style} · 📐 Ratio: ${ratio}`,
    "",
    lang === "ar" ? "أحتاج نسخة احترافية نهائية + كابشن + جدولة نشر. ما السعر؟" : "I'd like a polished final + caption + scheduling. What's the price?",
    footerSig(s, lang),
  ];
  return lines.join(NL);
}

/** Video request (AI cut/montage) */
export function videoRequestMessage(s: Settings, lang: Lang, opts: { fileName?: string; duration?: number; start?: number; end?: number; kind?: "trim" | "montage" | "reel" }) {
  const k = opts.kind ?? "montage";
  const kindLabel: Record<string, { en: string; ar: string }> = {
    trim: { en: "Trim & polish", ar: "قص واحتراف" },
    montage: { en: "Full montage (multi-clip + music + FX)", ar: "مونتاج كامل (دمج + موسيقى + مؤثرات)" },
    reel: { en: "Short Reel / TikTok", ar: "ريلز / تيك توك قصير" },
  };
  const lines = [
    header(lang === "ar" ? s.brandAr : s.brandEn, lang),
    lang === "ar" ? `🎬 خدمة الفيديو المطلوبة: *${kindLabel[k].ar}*` : `🎬 Video service: *${kindLabel[k].en}*`,
    opts.fileName ? (lang === "ar" ? `📁 الملف: ${opts.fileName}` : `📁 File: ${opts.fileName}`) : "",
    opts.duration ? (lang === "ar" ? `⏱ المدة الأصلية: ${opts.duration.toFixed(1)} ثانية` : `⏱ Source duration: ${opts.duration.toFixed(1)}s`) : "",
    opts.start != null && opts.end != null
      ? (lang === "ar" ? `✂️ المقطع المطلوب: من ${opts.start.toFixed(1)} إلى ${opts.end.toFixed(1)} ثانية` : `✂️ Cut: ${opts.start.toFixed(1)}s → ${opts.end.toFixed(1)}s`)
      : "",
    "",
    lang === "ar"
      ? "أحتاج تسليم احترافي بجودة عالية، مع تصحيح ألوان وصوت نظيف. ما هو السعر والمدة؟"
      : "Need a polished delivery with color grade and clean audio. What's the price & timeline?",
    footerSig(s, lang),
  ].filter(Boolean);
  return lines.join(NL);
}

/** Promo claim message */
export function promoMessage(s: Settings, lang: Lang, code: string, discount: number) {
  const lines = [
    header(lang === "ar" ? s.brandAr : s.brandEn, lang),
    lang === "ar" ? `🎁 أرغب في استخدام كود الخصم: *${code}* (${discount}%)` : `🎁 I want to use promo code: *${code}* (${discount}% off)`,
    lang === "ar" ? "ما هي الخدمات المتاحة بالعرض؟" : "Which services qualify for the offer?",
    footerSig(s, lang),
  ];
  return lines.join(NL);
}

/** Service "includes" list — looked up by service id, falls back to generic */
function includesFor(id: string, lang: Lang): string[] {
  const map: Record<string, { en: string[]; ar: string[] }> = {
    s1: {
      en: ["10 scroll-stopping designs", "Source files (PSD/Figma)", "Optimized for IG, TikTok, X, Snap", "2 free revision rounds"],
      ar: ["10 تصاميم تُوقف التمرير", "الملفات المفتوحة (PSD/Figma)", "محسّنة لإنستغرام وتيك توك وإكس وسناب", "جولتا تعديل مجانيتان"],
    },
    s2: {
      en: ["3 logo concepts", "Color palette + typography", "Brand guidelines PDF", "All formats (SVG, PNG, AI)"],
      ar: ["3 تصاميم شعار مقترحة", "لوحة ألوان + خطوط", "دليل الهوية البصرية PDF", "جميع الصيغ (SVG, PNG, AI)"],
    },
    s3: {
      en: ["Pro cut & merge", "Color grading", "Music + sound design", "Captions in AR/EN", "Up to 60s reel"],
      ar: ["قص ودمج احترافي", "تدرّج لوني", "موسيقى وتصميم صوتي", "ترجمة عربي/إنجليزي", "ريلز حتى 60 ثانية"],
    },
    s4: {
      en: ["Animated logo intro", "Explainer animation", "3D motion polish", "MP4 + transparent MOV"],
      ar: ["شعار متحرك", "فيديو تعريفي", "موشن ثلاثي الأبعاد", "MP4 + MOV شفاف"],
    },
    s5: {
      en: ["Meta + TikTok + Google creatives", "Hook-first copywriting", "A/B variants", "Launch checklist"],
      ar: ["إعلانات لميتا + تيك توك + جوجل", "نصوص جذّابة من اللحظة الأولى", "نسخ متعدّدة للاختبار", "قائمة فحص للإطلاق"],
    },
    s6: {
      en: ["Studio-grade product shots", "AI retouching", "10 final photos", "Background removal"],
      ar: ["تصوير منتجات بجودة الاستوديو", "معالجة بالذكاء الاصطناعي", "10 صور نهائية", "إزالة الخلفية"],
    },
    s7: {
      en: ["Business cards / menus / brochures", "Packaging dielines", "Print-ready PDF", "Free 1 design revision"],
      ar: ["بطاقات أعمال / منيوهات / كتيبات", "تصميم العلب الجاهز للقص", "ملف PDF جاهز للطباعة", "تعديل مجاني واحد"],
    },
    s8: {
      en: ["Monthly content calendar", "Daily posting", "Community replies", "Monthly growth report"],
      ar: ["خطة محتوى شهرية", "نشر يومي", "الرد على التعليقات", "تقرير نمو شهري"],
    },
  };
  return (map[id]?.[lang]) ?? (lang === "ar"
    ? ["تسليم احترافي", "ملفات أصلية", "تعديلات مجانية"]
    : ["Professional delivery", "Source files", "Free revisions"]);
}
