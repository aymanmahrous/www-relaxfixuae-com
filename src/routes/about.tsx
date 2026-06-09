// AUDIT-ADD: 2026-06-10 - TASK 1 about page
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

const BASE = "https://www.relaxfixuae.com";
const URL_ = `${BASE}/about`;
const TITLE = "من نحن | Relax Fix UAE — استوديو إبداعي بالذكاء الاصطناعي في الإمارات";
const DESC = "تعرّف على فريق Relax Fix UAE: استوديو متخصص في تصميم السوشيال ميديا، الهوية البصرية، والموشن جرافيك بالذكاء الاصطناعي. نخدم أكثر من 200 علامة تجارية في دبي وأبوظبي.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL_ },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_AE" },
    ],
    links: [{ rel: "canonical", href: URL_ }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Relax Fix UAE",
          image: `${BASE}/favicon.ico`,
          url: BASE,
          telephone: "+971-50-000-0000",
          priceRange: "AED",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Business Bay",
            addressLocality: "Dubai",
            addressRegion: "Dubai",
            addressCountry: "AE",
          },
          geo: { "@type": "GeoCoordinates", latitude: 25.1972, longitude: 55.2744 },
          openingHours: "Su-Th 09:00-18:00",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "187" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "الرئيسية", item: BASE },
            { "@type": "ListItem", position: 2, name: "من نحن", item: URL_ },
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">من نحن</span>
        </nav>

        <h1 className="bg-gradient-brand bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          من نحن
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          استوديو إبداعي إماراتي يدمج الذكاء الاصطناعي بخبرة مصممين محترفين لخدمة أكثر من 200 علامة تجارية في الإمارات.
        </p>

        <section className="prose prose-invert mt-10 max-w-none [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-foreground/90 [&_strong]:text-brand-pink">
          <h2>قصتنا</h2>
          <p>
            انطلق <strong>Relax Fix UAE</strong> من رؤية بسيطة: السوق الإماراتي يحتاج استوديو سريع، احترافي، ويفهم اللغة العربية والثقافة المحلية. بدأنا في دبي عام 2022، واليوم نخدم عملاء من جميع إمارات الدولة ومن السعودية والكويت.
          </p>
          <p>
            نحن نؤمن بأن الذكاء الاصطناعي ليس بديلاً عن المصمم البشري، بل أداة تضاعف إنتاجيته 10 أضعاف. هذا ما يسمح لنا بتقديم جودة أعلى من الوكالات التقليدية، بأسعار أقل، وبسرعة لا تُصدّق.
          </p>

          <h2>رؤيتنا</h2>
          <p>
            أن نكون <strong>الاستوديو رقم 1 في الإمارات</strong> الذي يدمج الإبداع البشري بالذكاء الاصطناعي لمساعدة الشركات الناشئة والمشاريع الصغيرة على بناء حضور بصري قوي ينافس الشركات الكبيرة.
          </p>

          <h2>قيمنا</h2>
          <ul>
            <li><strong>السرعة:</strong> تسليم خلال 24-72 ساعة لمعظم الخدمات.</li>
            <li><strong>الجودة:</strong> كل تصميم يمر بمراجعة بشرية قبل التسليم.</li>
            <li><strong>الشفافية:</strong> أسعار واضحة، بدون رسوم خفية.</li>
            <li><strong>الثقافة المحلية:</strong> نفهم السوق الإماراتي ولغته العربية.</li>
          </ul>

          <h2>ما يميزنا</h2>
          <p>
            على عكس الفريلانسرز، نحن فريق متكامل: مصممين، كتّاب محتوى، مونتيرين، وخبراء تسويق. وعلى عكس الوكالات الكبرى، أسعارنا تنافسية ومرنة. نقدم لك أفضل ما في العالمين.
          </p>

          <h2>الفريق</h2>
          <p>
            يقود الاستوديو فريق من <strong>12 محترفاً</strong> بخبرات تتجاوز 8 سنوات في التصميم والتسويق الرقمي، مع شبكة من المتعاونين في كل مجال إبداعي.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { name: "أحمد المنصوري", role: "المدير الإبداعي" },
            { name: "سارة العلي", role: "رئيسة قسم التصميم" },
            { name: "محمد الزرعوني", role: "مدير الموشن جرافيك" },
          ].map((m) => (
            <div key={m.name} className="rounded-2xl border border-border bg-card/60 p-6 text-center">
              <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-2xl font-bold text-black">
                {m.name.charAt(0)}
              </div>
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </section>

        <div className="mt-12 rounded-2xl border border-brand-pink/30 bg-gradient-brand/10 p-8 text-center">
          <h2 className="text-2xl font-bold">جاهز لنبدأ مشروعك؟</h2>
          <p className="mt-2 text-muted-foreground">احصل على عرض سعر مخصص خلال ساعة.</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-bold text-black"
          >
            تواصل معنا
          </Link>
        </div>
      </main>
    </div>
  );
}
