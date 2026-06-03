import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";
import { ImageIcon, Wand2, Film, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixel & Reel — Design posts and edit videos" },
      { name: "description", content: "All-in-one creative studio for social posts, image design, and pro video editing." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const services = [
    { icon: ImageIcon, t: t("s1_t"), d: t("s1_d") },
    { icon: Wand2, t: t("s2_t"), d: t("s2_d") },
    { icon: Film, t: t("s3_t"), d: t("s3_d") },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.95_0.05_265)_0%,transparent_70%)]" />
          <div className="mx-auto max-w-6xl px-4 py-24 text-center">
            <span className="inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {t("hero_kicker")}
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              {t("hero_title")}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("hero_sub")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/design" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                {t("cta_start")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link to="/video" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent">
                {t("cta_video")}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">{t("services_title")}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, t: title, d }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        {t("footer")}
      </footer>
    </div>
  );
}
