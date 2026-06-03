import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

const BASE = "https://www.relaxfixuae.com";
const URL = `${BASE}/services/ads-design`;
const TITLE = "تصميم اعلانات ممولة | حملات اعلانية احترافية في الإمارات";
const DESC = "تصميم اعلانات ممولة لجوجل وميتا وسناب وتيك توك. تصميم يحول المشاهدات لمبيعات حقيقية في السوق الإماراتي والخليجي.";

export const Route = createFileRoute("/services/ads-design")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "تصميم اعلانات, اعلانات ممولة, جوجل ادز, ميتا ادز, سناب شات اعلانات, تيك توك اعلانات الامارات" },
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
        name: "تصميم اعلانات ممولة",
        provider: { "@type": "Organization", name: "Relax Fix UAE", url: BASE },
        areaServed: "AE",
        description: DESC,
        offers: { "@type": "Offer", priceCurrency: "AED", price: "399" },
      }),
    }],
  }),
  component: () => (
    <LandingPage
      h1="تصميم اعلانات ممولة تحقق مبيعات"
      subtitle="إعلانات مدروسة لـ جوجل، ميتا، سناب، تيك توك"
      intro="نصمم لك إعلانات ممولة احترافية تجذب الجمهور المستهدف وتحول المشاهدات إلى مبيعات حقيقية. خبرة في السوق الإماراتي والخليجي مع فهم عميق لسلوك المستهلك المحلي."
      features={[
        "تصاميم مخصصة لكل منصة وجمهور",
        "نصوص اعلانية تحفز على الشراء (Copywriting)",
        "اختبار A/B لاختيار الافضل اداءً",
        "تحليل المنافسين والسوق",
        "أحجام جاهزة لكل المنصات",
        "تحسين مستمر بناءً على البيانات",
      ]}
      packages={[
        { name: "اعلان واحد", price: "399 د.إ", items: ["3 نسخ تصميم", "3 نصوص اعلانية", "أحجام لكل المنصات", "تعديل واحد"] },
        { name: "حملة شهرية", price: "1199 د.إ", items: ["10 تصاميم متنوعة", "اختبار A/B", "تحليل أسبوعي", "تحسين مستمر"] },
        { name: "ادارة كاملة", price: "2499 د.إ", items: ["تصميم + ادارة الحملة", "ادارة الميزانية", "تقارير مفصلة", "استشارات تسويقية"] },
      ]}
      faqs={[
        { q: "هل تديرون الحملة الاعلانية؟", a: "نعم، باقة الادارة الكاملة تشمل اعداد الحملة، استهداف الجمهور، ومتابعة الاداء يومياً." },
        { q: "كم ميزانية اعلانية أحتاج؟", a: "ننصح بـ 1000 د.إ شهرياً كحد أدنى لنتائج ملموسة، لكن نعمل مع جميع الميزانيات." },
        { q: "ما هي أفضل منصة لمشروعي؟", a: "نقدم استشارة مجانية لتحديد المنصة الأنسب حسب طبيعة منتجك وجمهورك المستهدف." },
        { q: "كم تستغرق المدة لرؤية نتائج؟", a: "أول مؤشرات الأداء خلال 3-5 أيام، النتائج المستقرة خلال 2-3 أسابيع." },
      ]}
      ctaMessage="مرحباً، أريد تصميم وإدارة حملة اعلانية"
    />
  ),
});
