import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES } from "@/lib/blog";
import { SiteHeader } from "@/components/site-header";

const BASE = "https://www.relaxfixuae.com";
const URL_ = `${BASE}/blog`;
const TITLE = "المدونة | نصائح تصميم، سوشيال ميديا، وتسويق رقمي في الإمارات";
const DESC = "مقالات احترافية عن تصميم السوشيال ميديا، الهوية البصرية، الإعلانات الممولة، والـ SEO للسوق الإماراتي.";

export const Route = createFileRoute("/blog")({
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
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "مدونة Relax Fix UAE",
        url: URL_,
        blogPost: ARTICLES.map((a) => ({
          "@type": "BlogPosting",
          headline: a.title,
          datePublished: a.date,
          url: `${BASE}/blog/${a.slug}`,
          description: a.description,
        })),
      }),
    }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <header className="mb-12 text-center">
          <h1 className="bg-gradient-brand bg-clip-text text-4xl font-bold text-transparent md:text-5xl">المدونة</h1>
          <p className="mt-4 text-muted-foreground">نصائح وأدلة عملية لتنمية مشروعك في الإمارات</p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              to="/blog/$slug"
              params={{ slug: a.slug }}
              className="group rounded-2xl border border-border bg-card/60 p-6 transition hover:border-brand-pink/60 hover:bg-card"
            >
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-accent px-2 py-0.5">{a.category}</span>
                <span>{a.readMin} دقائق قراءة</span>
              </div>
              <h2 className="text-xl font-bold leading-snug text-foreground transition group-hover:text-brand-pink">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-pink">اقرأ المزيد ←</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
