import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

const BASE = "https://www.relaxfixuae.com";
const URL = `${BASE}/services/motion-graphics`;
const TITLE = "موشن جرافيك واعلانات فيديو | تصميم فيديوهات احترافية الإمارات";
const DESC = "خدمة موشن جرافيك واعلانات فيديو احترافية في الإمارات. ريلز، تيك توك، اعلانات يوتيوب، فيديوهات تعريفية للشركات.";

export const Route = createFileRoute("/services/motion-graphics")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "موشن جرافيك, تصميم فيديو, اعلان فيديو, ريلز انستقرام, تيك توك ادز, motion graphics Dubai" },
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
        name: "موشن جرافيك واعلانات فيديو",
        provider: { "@type": "Organization", name: "Relax Fix UAE", url: BASE },
        areaServed: "AE",
        description: DESC,
        offers: { "@type": "Offer", priceCurrency: "AED", price: "599" },
      }),
    }],
  }),
  component: () => (
    <LandingPage
      h1="موشن جرافيك واعلانات فيديو"
      subtitle="فيديوهات تجذب الانتباه وتحقق مبيعات حقيقية"
      intro="ننتج فيديوهات موشن جرافيك واعلانات احترافية لمنصات السوشيال ميديا والاعلانات الممولة. من ريلز انستقرام والتيك توك حتى الاعلانات التلفزيونية والفيديوهات التعريفية للشركات."
      features={[
        "سيناريو واخراج احترافي",
        "تعليق صوتي بالعربية والإنجليزية",
        "موسيقى ومؤثرات صوتية مرخصة",
        "تصميم بجودة 4K للاعلانات الكبيرة",
        "متوافق مع جميع المنصات (انستقرام، تيك توك، يوتيوب)",
        "تسليم سريع خلال 3-7 أيام",
      ]}
      packages={[
        { name: "ريل قصير", price: "599 د.إ", items: ["فيديو 15-30 ثانية", "موشن جرافيك", "موسيقى مرخصة", "تعديل واحد"] },
        { name: "اعلان احترافي", price: "1499 د.إ", items: ["فيديو 30-60 ثانية", "سيناريو + تعليق صوتي", "مؤثرات متقدمة", "تعديلات غير محدودة"] },
        { name: "حملة كاملة", price: "3999 د.إ", items: ["5 فيديوهات للحملة", "نسخ متعددة الأحجام", "تحليل الاداء", "ادارة الحملة الاعلانية"] },
      ]}
      faqs={[
        { q: "كم مدة انتاج الفيديو؟", a: "ريل قصير 3 أيام، اعلان احترافي 5-7 أيام، الحملة الكاملة 10-14 يوم." },
        { q: "هل تكتبون السيناريو؟", a: "نعم، فريق كتابة محترف يصيغ لك سيناريو مدروس يحقق هدفك التسويقي." },
        { q: "هل التعليق الصوتي بصوت احترافي؟", a: "نعم، نتعامل مع معلقين صوتيين محترفين باللهجة الإماراتية والخليجية والعربية الفصحى." },
        { q: "هل تساعدون في النشر على الاعلانات الممولة؟", a: "نعم، الباقة الكاملة تشمل إدارة حملات Meta وTikTok وYouTube Ads." },
      ]}
      ctaMessage="مرحباً، أريد فيديو موشن جرافيك لمشروعي"
    />
  ),
});
