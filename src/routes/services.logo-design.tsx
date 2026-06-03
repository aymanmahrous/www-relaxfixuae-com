import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

const BASE = "https://www.relaxfixuae.com";
const URL = `${BASE}/services/logo-design`;
const TITLE = "تصميم لوقو وهوية بصرية | شعارات احترافية في الإمارات";
const DESC = "تصميم شعار وهوية بصرية كاملة لشركتك في الإمارات. لوقو فريد، دليل هوية، ألوان، خطوط، وكروت أعمال. تسليم خلال 3-5 أيام.";

export const Route = createFileRoute("/services/logo-design")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "تصميم لوقو, تصميم شعار, هوية بصرية, تصميم لوجو دبي, logo design UAE, branding Dubai" },
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
        name: "تصميم لوقو وهوية بصرية",
        provider: { "@type": "Organization", name: "Relax Fix UAE", url: BASE },
        areaServed: "AE",
        description: DESC,
        offers: { "@type": "Offer", priceCurrency: "AED", price: "499" },
      }),
    }],
  }),
  component: () => (
    <LandingPage
      h1="تصميم لوقو وهوية بصرية احترافية"
      subtitle="شعار يميز علامتك التجارية ويبني الثقة من أول نظرة"
      intro="نصمم لك لوقو فريد وهوية بصرية متكاملة تعكس قيم شركتك وتجذب جمهورك المستهدف. نخدم رواد الأعمال والشركات الناشئة في دبي وأبوظبي والشارقة وجميع إمارات الدولة."
      features={[
        "3 مفاهيم تصميم مختلفة للاختيار منها",
        "تعديلات غير محدودة حتى الرضا التام",
        "ملفات بجميع الصيغ (AI, SVG, PNG, PDF)",
        "نسخ ملونة وأبيض/أسود للوقو",
        "دليل هوية بصرية كامل (Brand Guidelines)",
        "ملكية فكرية كاملة لك بعد التسليم",
      ]}
      packages={[
        { name: "أساسي", price: "499 د.إ", items: ["3 مفاهيم لوقو", "تعديلين", "ملفات نهائية AI + PNG", "نسخ ملونة وأبيض"] },
        { name: "هوية كاملة", price: "1299 د.إ", items: ["لوقو + دليل هوية", "ألوان + خطوط", "كرت أعمال + ورق رسمي", "قوالب سوشيال ميديا"] },
        { name: "بريميوم", price: "2999 د.إ", items: ["كل ما سبق", "تصميم بكج المنتج", "تطبيقات على المتجر", "دعم مستمر 3 أشهر"] },
      ]}
      faqs={[
        { q: "كم يستغرق تصميم اللوقو؟", a: "أول 3 مفاهيم خلال 48 ساعة، والتسليم النهائي خلال 3-5 أيام عمل." },
        { q: "ماذا لو لم يعجبني التصميم؟", a: "نقدم تعديلات غير محدودة حتى رضاك التام. الدفعة الأولى مستردة إذا لم تعجبك المفاهيم الأولى." },
        { q: "هل أحصل على ملفات قابلة للتعديل؟", a: "نعم، تستلم ملف Adobe Illustrator (AI) و SVG قابلين للتعديل بالكامل." },
        { q: "هل التصميم حصري لي؟", a: "نعم 100%، التصميم ملكك بالكامل ولن يُستخدم لأي عميل آخر." },
      ]}
      ctaMessage="مرحباً، أريد تصميم لوقو لشركتي"
    />
  ),
});
