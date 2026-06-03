import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

const BASE = "https://www.relaxfixuae.com";
const URL = `${BASE}/services/social-media-sharjah`;
const TITLE = "تصميم سوشيال ميديا الشارقة | منشورات احترافية بأسعار مميزة";
const DESC = "خدمة تصميم سوشيال ميديا في الشارقة وعجمان: منشورات انستقرام، ريلز، تيك توك بأسعار تنافسية وجودة عالية.";

export const Route = createFileRoute("/services/social-media-sharjah")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "تصميم سوشيال ميديا الشارقة, تصميم منشورات عجمان, social media Sharjah, ادارة حسابات الشارقة" },
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
        name: "تصميم سوشيال ميديا - الشارقة",
        provider: { "@type": "Organization", name: "Relax Fix UAE", url: BASE },
        areaServed: { "@type": "City", name: "Sharjah" },
        description: DESC,
        offers: { "@type": "Offer", priceCurrency: "AED", price: "249" },
      }),
    }],
  }),
  component: () => (
    <LandingPage
      h1="تصميم سوشيال ميديا في الشارقة"
      subtitle="تصاميم احترافية للمشاريع الناشئة في الشارقة وعجمان"
      intro="نقدم خدمات تصميم سوشيال ميديا للشركات الصغيرة والمتوسطة في الشارقة وعجمان بأسعار مدروسة تناسب ميزانية المشاريع الناشئة دون التضحية بالجودة."
      features={[
        "أسعار تنافسية للمشاريع الناشئة",
        "تصاميم بجودة احترافية",
        "محتوى باللغتين العربية والإنجليزية",
        "تسليم خلال 24 ساعة",
        "تعديلات غير محدودة",
        "دعم فني سريع",
      ]}
      packages={[
        { name: "البداية", price: "249 د.إ", items: ["10 منشورات", "نصوص باللغتين", "هاشتاقات", "تعديل واحد"] },
        { name: "النمو", price: "599 د.إ", items: ["25 منشور + 5 ريلز", "خطة محتوى", "تعديلات غير محدودة"] },
        { name: "احترافي", price: "1299 د.إ", items: ["50 منشور + 10 ريلز", "ادارة كاملة", "تقارير شهرية"] },
      ]}
      faqs={[
        { q: "هل خدماتكم تناسب المشاريع الصغيرة؟", a: "نعم، باقاتنا مصممة خصيصاً للمشاريع الناشئة والمتوسطة في الشارقة." },
        { q: "هل تخدمون عجمان أم الشارقة فقط؟", a: "نخدم الشارقة، عجمان، أم القيوين، وكل إمارات الدولة عن بُعد." },
        { q: "كم سعر التصميم الواحد؟", a: "ابتداءً من 25 د.إ للتصميم الواحد، والباقات أوفر بكثير." },
        { q: "هل أحصل على ملفات أصلية؟", a: "نعم، تستلم ملفات PSD/Figma + PNG/JPG جاهزة للنشر." },
      ]}
      ctaMessage="مرحباً، أريد تصميم سوشيال ميديا لمشروعي في الشارقة"
    />
  ),
});
