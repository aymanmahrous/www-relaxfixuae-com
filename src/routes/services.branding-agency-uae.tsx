// AUDIT-ADD: 2026-06-10 - TASK 2 branding agency page
import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

const BASE = "https://www.relaxfixuae.com";
const URL_ = `${BASE}/services/branding-agency-uae`;
const TITLE = "وكالة هوية بصرية وبراندينج في الإمارات | Branding Agency UAE";
const DESC = "وكالة براندينج متخصصة في بناء هويات بصرية كاملة للشركات في الإمارات. من البحث والاستراتيجية حتى التصميم والإطلاق. أكثر من 200 علامة تجارية ناجحة.";

export const Route = createFileRoute("/services/branding-agency-uae")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "وكالة براندينج, branding agency UAE, هوية بصرية, براندينج دبي, brand identity Dubai" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL_ },
      { property: "og:type", content: "service" },
      { property: "og:locale", content: "ar_AE" },
    ],
    links: [{ rel: "canonical", href: URL_ }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "وكالة براندينج وهوية بصرية",
          serviceType: "Branding Agency",
          provider: { "@type": "Organization", name: "Relax Fix UAE", url: BASE },
          areaServed: { "@type": "Country", name: "AE" },
          description: DESC,
          offers: { "@type": "Offer", priceCurrency: "AED", price: "2999" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "كم تستغرق عملية البراندينج الكاملة؟", acceptedAnswer: { "@type": "Answer", text: "بين 3-6 أسابيع حسب حجم المشروع. نبدأ بورشة استراتيجية، ثم 3 مفاهيم، ثم التطوير والتسليم." } },
            { "@type": "Question", name: "ما الذي يميز وكالتكم عن غيرها في دبي؟", acceptedAnswer: { "@type": "Answer", text: "ندمج الذكاء الاصطناعي مع خبرة مصممين بشريين، فننتج جودة أعلى بسرعة أكبر وأسعار أقل من الوكالات التقليدية." } },
            { "@type": "Question", name: "هل تشمل الخدمة دليل هوية كامل؟", acceptedAnswer: { "@type": "Answer", text: "نعم، نسلم دليل هوية بصرية (Brand Guidelines) PDF يحتوي على الألوان، الخطوط، استخدامات اللوقو، والصور." } },
            { "@type": "Question", name: "ما هي تكلفة البراندينج الكامل؟", acceptedAnswer: { "@type": "Answer", text: "تبدأ من 2999 د.إ لباقة البراندينج الأساسية، وحتى 9999 د.إ للباقة الشاملة مع تصاميم سوشيال ميديا وموقع." } },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "الرئيسية", item: BASE },
            { "@type": "ListItem", position: 2, name: "الخدمات", item: `${BASE}/#services` },
            { "@type": "ListItem", position: 3, name: "وكالة براندينج", item: URL_ },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <LandingPage
      h1="وكالة براندينج وهوية بصرية في الإمارات"
      subtitle="من الفكرة إلى الإطلاق — هوية كاملة تبني الثقة وتزيد المبيعات"
      intro="نحن وكالة براندينج متخصصة في بناء هويات بصرية كاملة للشركات الناشئة والمؤسسات في الإمارات. نقدم استراتيجية، تصميم، ودليل هوية شامل لضمان حضور بصري قوي ومنسجم عبر كل القنوات. أكثر من 200 علامة تجارية اختارتنا لبناء هويتها."
      features={[
        "ورشة استراتيجية لتحديد شخصية البراند",
        "بحث سوق ومنافسين في الإمارات",
        "3 مفاهيم لوقو احترافية",
        "نظام ألوان وخطوط متكامل",
        "دليل هوية بصرية PDF (50+ صفحة)",
        "تطبيقات على كرت أعمال، أوراق، توقيع بريد",
        "قوالب سوشيال ميديا (10 قوالب)",
        "ملفات Source قابلة للتعديل (AI, PSD, Figma)",
        "حقوق ملكية فكرية كاملة",
        "دعم 3 أشهر بعد التسليم",
      ]}
      packages={[
        { name: "أساسي", price: "2999 د.إ", items: ["لوقو + دليل هوية", "ألوان وخطوط", "كرت أعمال", "تسليم خلال 3 أسابيع"] },
        { name: "احترافي", price: "5999 د.إ", items: ["كل الأساسي", "قوالب سوشيال ميديا", "أوراق رسمية + فواتير", "بريد رسمي + توقيع", "تسليم خلال 4 أسابيع"] },
        { name: "شامل", price: "9999 د.إ", items: ["كل الاحترافي", "تصميم بكج المنتج", "موقع لاندنج بيج", "فيديو تعريفي 30 ثانية", "دعم 6 أشهر"] },
      ]}
      faqs={[
        { q: "كم تستغرق عملية البراندينج الكاملة؟", a: "بين 3-6 أسابيع حسب حجم المشروع. نبدأ بورشة استراتيجية، ثم 3 مفاهيم، ثم التطوير والتسليم." },
        { q: "ما الذي يميز وكالتكم عن غيرها في دبي؟", a: "ندمج الذكاء الاصطناعي مع خبرة مصممين بشريين، فننتج جودة أعلى بسرعة أكبر وأسعار أقل من الوكالات التقليدية." },
        { q: "هل تشمل الخدمة دليل هوية كامل؟", a: "نعم، نسلم دليل هوية بصرية PDF يحتوي على الألوان، الخطوط، استخدامات اللوقو، والصور." },
        { q: "ما هي تكلفة البراندينج الكامل؟", a: "تبدأ من 2999 د.إ لباقة البراندينج الأساسية، وحتى 9999 د.إ للباقة الشاملة." },
        { q: "هل تخدمون شركات خارج دبي؟", a: "نعم، نخدم جميع إمارات الدولة وكذلك السعودية والكويت والبحرين عن بُعد." },
      ]}
      ctaMessage="مرحباً، أريد بناء هوية بصرية كاملة لشركتي"
    />
  ),
});
