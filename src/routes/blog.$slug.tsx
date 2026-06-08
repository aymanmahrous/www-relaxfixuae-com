import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ARTICLES, getArticle } from "@/lib/blog";
import { SiteHeader } from "@/components/site-header";

const BASE = "https://www.relaxfixuae.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article not found" }] };
    const url = `${BASE}/blog/${a.slug}`;
    return {
      meta: [
        { title: `${a.title} | Relax Fix UAE` },
        { name: "description", content: a.description },
        { name: "keywords", content: a.keywords },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "ar_AE" },
        { property: "article:published_time", content: a.date },
        { property: "article:section", content: a.category },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: a.title,
          description: a.description,
          datePublished: a.date,
          dateModified: a.date,
          inLanguage: "ar-AE",
          author: { "@type": "Organization", name: "Relax Fix UAE" },
          publisher: {
            "@type": "Organization",
            name: "Relax Fix UAE",
            url: BASE,
          },
          mainEntityOfPage: url,
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-3xl font-bold">المقال غير موجود</h1>
        <Link to="/blog" className="mt-4 inline-block text-brand-pink">العودة للمدونة</Link>
      </div>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-foreground">المدونة</Link>
        </nav>
        <article>
          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-accent px-2 py-0.5">{article.category}</span>
            <span>{article.readMin} دقائق قراءة</span>
            <span>{article.date}</span>
          </div>
          <h1 className="bg-gradient-brand bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>
          <div
            className="prose prose-invert mt-8 max-w-none [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pr-6 [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-foreground/90 [&_strong]:text-brand-pink [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pr-6"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </article>

        <aside className="mt-16 border-t border-border pt-8">
          <h3 className="mb-4 text-xl font-bold">اقرأ أيضاً</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                to="/blog/$slug"
                params={{ slug: a.slug }}
                className="rounded-xl border border-border bg-card/60 p-4 transition hover:border-brand-pink/60"
              >
                <span className="text-xs text-muted-foreground">{a.category}</span>
                <h4 className="mt-2 font-semibold leading-snug">{a.title}</h4>
              </Link>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
