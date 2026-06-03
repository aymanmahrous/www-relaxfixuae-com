import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";
import { Scissors, Combine, Music, Type } from "lucide-react";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Video Editor — Pixel & Reel" },
      { name: "description", content: "Cut, merge, and montage videos professionally." },
    ],
  }),
  component: VideoPage,
});

function VideoPage() {
  const { t } = useI18n();
  const tools = [
    { icon: Scissors, label: { en: "Cut & Trim", ar: "قص واقتطاع" } },
    { icon: Combine, label: { en: "Merge Clips", ar: "دمج المقاطع" } },
    { icon: Music, label: { en: "Add Audio", ar: "إضافة صوت" } },
    { icon: Type, label: { en: "Captions", ar: "ترجمة" } },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("video_title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("video_sub")}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(({ icon: Icon, label }) => (
            <div key={label.en} className="rounded-xl border border-border bg-card p-5">
              <Icon className="h-6 w-6 text-primary" />
              <p className="mt-3 font-medium">{useI18n().lang === "ar" ? label.ar : label.en}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("coming_soon")}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
          <div className="aspect-video bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="border-t border-border p-4 text-sm text-muted-foreground">Timeline · {t("coming_soon")}</div>
        </div>
      </main>
    </div>
  );
}
