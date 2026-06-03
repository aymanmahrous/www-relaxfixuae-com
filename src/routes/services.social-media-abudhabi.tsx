import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

const BASE = "https://www.relaxfixuae.com";
const URL = `${BASE}/services/social-media-abudhabi`;
const TITLE = "تصميم سوشيال ميديا أبوظبي | منشورات احترافية للشركات";
const DESC = "خدمة تصميم سوشيال ميديا في أبوظبي: منشورات انستقرام، ريلز، تيك توك. تصاميم احترافية بأسعار تنافسية وتسليم سريع.";

export const Route = createFileRoute("/services/social-media-abudhabi")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "تصميم سوشيال ميديا ابوظبي, تصميم منشورات ابوظبي, social media Abu Dhabi, ادارة سوشيال ميديا ابوظبي" },
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
        name: "تصميم سوشيال ميديا - أبوظبي",
        provider: { "@type": "Organization", name: "Relax Fix UAE", url: BASE },
        areaServed: { "@type": "City", name: "Abu Dhabi" },
        description: DESC,
        offers: { "@type": "Offer", priceCurrency: "AED", price: "299" },
      }),
    }],
  }),
  component: () => (
    <LandingPage
      h1="تصميم سوشيال ميديا في أبوظبي"
      subtitle="منشورات احترافية تجذب جمهور العاصمة وترفع مبيعاتك"
      intro="استوديو إبداعي يخدم الشركات والمشاريع في أبوظبي بتصاميم سوشيال ميديا مميزة. نفهم سوق العاصمة ونصمم محتوى يتحدث بلغة جمهورك المستهدف."
      features={[
        "تصاميم تناسب ذوق جمهور أبوظبي",
        "محتوى بالعربية الفصحى والخليجية",
        "هاشتاقات محلية مدروسة",
        "تسليم سريع خلال 24 ساعة",
        "تعديلات غير محدودة",
        "أحجام لكل المنصات",
      ]}
      packages={[
        { name: "البداية", price: "299 د.إ", items: ["10 منشورات شهرياً", "نصوص باللغتين", "هاشتاقات", "تعديل واحد"] },
        { name: "النمو", price: "699 د.إ", items: ["25 منشور + 5 ريلز", "خطة محتوى", "تعديلات غير محدودة"] },
        { name: "احترافي", price: "1499 د.إ", items: ["50 منشور + 10 ريلز", "ادارة كاملة", "تقارير شهرية"] },
      ]}
      faqs={[
        { q: "هل تخدمون شركات في أبوظبي؟", a: "نعم، نخدم جميع الشركات والمشاريع في العاصمة وضواحيها بشكل احترافي عن بُعد." },
        { q: "كم يستغرق التسليم؟", a: "أول تصميم خلال 4 ساعات، الباقة الكاملة خلال 24-48 ساعة." },
        { q: "هل يمكن الدفع بالتقسيط؟", a: "نعم، نوفر خيارات دفع مرنة للباقات الشهرية." },
        { q: "هل المحتوى حصري لي؟", a: "نعم، كل التصاميم والنصوص حصرية لعلامتك التجارية." },
      ]}
      ctaMessage="مرحباً، أريد تصميم سوشيال ميديا لمشروعي في أبوظبي"
    />
  ),
});
