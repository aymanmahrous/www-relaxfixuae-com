import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

const BASE = "https://www.relaxfixuae.com";
const URL = `${BASE}/services/social-media-dubai`;
const TITLE = "تصميم سوشيال ميديا دبي | منشورات احترافية بالذكاء الاصطناعي";
const DESC = "خدمة تصميم سوشيال ميديا في دبي والإمارات: منشورات انستقرام، ريلز، تيك توك، سناب وتويتر. تسليم خلال ساعات بأسعار تنافسية.";

export const Route = createFileRoute("/services/social-media-dubai")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "تصميم سوشيال ميديا دبي, تصميم منشورات انستقرام, تصميم ريلز, ادارة سوشيال ميديا الامارات, social media design Dubai" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "service" },
      { property: "og:locale", content: "ar_AE" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "تصميم سوشيال ميديا - دبي",
        provider: { "@type": "Organization", name: "Relax Fix UAE", url: BASE },
        areaServed: { "@type": "City", name: "Dubai" },
        description: DESC,
        offers: { "@type": "Offer", priceCurrency: "AED", price: "299" },
      }),
    }],
  }),
  component: () => (
    <LandingPage
      h1="تصميم سوشيال ميديا في دبي"
      subtitle="منشورات تجذب العملاء وترفع المبيعات — تسليم خلال ساعات"
      intro="نحن استوديو إبداعي في الإمارات متخصص في تصميم منشورات سوشيال ميديا احترافية لـ انستقرام، تيك توك، سناب، تويتر و لينكدإن. نستخدم أحدث تقنيات الذكاء الاصطناعي لإنتاج تصاميم بجودة عالية وبسرعة قياسية."
      features={[
        "تصاميم حصرية تناسب هويتك البصرية",
        "كتابة النصوص بالعربية والإنجليزية باحترافية",
        "هاشتاقات مدروسة لزيادة الوصول في السوق الإماراتي",
        "تسليم سريع خلال 4-24 ساعة",
        "تعديلات غير محدودة في الباقات المتقدمة",
        "أحجام جاهزة لكل منصة (1:1، 9:16، 4:5)",
      ]}
      packages={[
        { name: "البداية", price: "299 د.إ", items: ["10 منشورات شهرياً", "نصوص باللغتين", "هاشتاقات", "تعديل واحد لكل تصميم"] },
        { name: "النمو", price: "699 د.إ", items: ["25 منشور + 5 ريلز", "نصوص + هاشتاقات", "خطة محتوى أسبوعية", "تعديلات غير محدودة"] },
        { name: "احترافي", price: "1499 د.إ", items: ["50 منشور + 10 ريلز", "إدارة كاملة للحساب", "تقارير شهرية", "أولوية الدعم"] },
      ]}
      faqs={[
        { q: "كم يستغرق تسليم التصاميم؟", a: "أول تصميم خلال 4 ساعات، والباقة الكاملة خلال 24-48 ساعة." },
        { q: "هل تكتبون النصوص بالعربية؟", a: "نعم، نكتب نصوص أصلية بالعربية الفصحى والخليجية مع هاشتاقات تناسب جمهور الإمارات." },
        { q: "هل أملك التصاميم بعد التسليم؟", a: "نعم، تستلم الملفات الأصلية (PSD/Figma) بالإضافة لـ PNG/JPG جاهزة للنشر." },
        { q: "هل تخدمون خارج دبي؟", a: "نعم، نخدم جميع إمارات الدولة ودول الخليج عن بُعد." },
      ]}
      ctaMessage="مرحباً، أريد تصميم سوشيال ميديا لمشروعي في دبي"
    />
  ),
});
