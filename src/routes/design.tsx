import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Post Designer — Pixel & Reel" },
      { name: "description", content: "Design social posts and branded images." },
    ],
  }),
  component: DesignPage,
});

function DesignPage() {
  const { t } = useI18n();
  const templates = ["1:1 Square", "9:16 Story", "16:9 Banner", "4:5 Portrait", "Ad Carousel", "Quote Card"];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("designer_title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("designer_sub")}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((name) => (
            <div key={name} className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/5 to-transparent transition-transform group-hover:scale-[1.02]" />
              <div className="flex items-center justify-between p-4">
                <span className="font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{t("coming_soon")}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
