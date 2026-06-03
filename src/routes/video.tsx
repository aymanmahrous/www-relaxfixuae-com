import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";
import { Upload, Play, Scissors, Download, Sparkles, Film, Zap, MessageCircle } from "lucide-react";
import { useSettings, waUrl } from "@/lib/settings";
import { videoRequestMessage } from "@/lib/orderMessage";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Video Studio — Relax Fix UAE" },
      { name: "description", content: "Upload, trim, and request professional video edits, reels, and montages. AI-assisted video production for UAE brands in Arabic and English." },
      { property: "og:title", content: "Video Studio — Relax Fix UAE" },
      { property: "og:description", content: "Trim your clip and request a pro reel, montage, or social cut from our team." },
      { property: "og:url", content: "https://www.relaxfixuae.com/video" },
    ],
    links: [
      { rel: "canonical", href: "https://www.relaxfixuae.com/video" },
    ],
  }),
  component: VideoPage,
});

function VideoPage() {
  const { t, lang } = useI18n();
  const { settings } = useSettings();
  const [url, setUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);

  function onFile(f: File) {
    const u = URL.createObjectURL(f);
    setUrl(u);
    setName(f.name);
  }

  function onLoaded() {
    const d = ref.current?.duration ?? 0;
    setDuration(d);
    setStart(0);
    setEnd(d);
  }

  function preview() {
    if (!ref.current) return;
    ref.current.currentTime = start;
    ref.current.play();
    const tick = () => {
      if (!ref.current) return;
      if (ref.current.currentTime >= end) ref.current.pause();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function downloadOriginal() {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = name || "video.mp4";
    a.click();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">{t("video_title")}</span>
        </h1>
        <p className="mt-2 text-muted-foreground">{t("video_sub")}</p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          {!url ? (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-background/40 p-12 text-center hover:border-brand-pink">
              <Upload className="h-8 w-8 text-brand-pink" />
              <span className="font-semibold">{t("v_upload")}</span>
              <span className="text-xs text-muted-foreground">{t("v_no_file")}</span>
              <input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
            </label>
          ) : (
            <div className="space-y-4">
              <video ref={ref} src={url} controls onLoadedMetadata={onLoaded} className="w-full rounded-xl bg-black" />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("v_start")}</span>
                  <input type="range" min={0} max={duration} step={0.1} value={start} onChange={(e) => setStart(Math.min(parseFloat(e.target.value), end))} className="mt-2 w-full accent-brand-pink" />
                  <span className="text-xs text-muted-foreground">{start.toFixed(1)}s</span>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("v_end")}</span>
                  <input type="range" min={0} max={duration} step={0.1} value={end} onChange={(e) => setEnd(Math.max(parseFloat(e.target.value), start))} className="mt-2 w-full accent-brand-pink" />
                  <span className="text-xs text-muted-foreground">{end.toFixed(1)}s</span>
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={preview} className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-bold text-black"><Play className="h-4 w-4" />{t("v_preview")}</button>
                <button onClick={downloadOriginal} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"><Download className="h-4 w-4" />{t("v_export")}</button>
              </div>

              <div className="rounded-2xl border border-brand-pink/30 bg-gradient-to-br from-brand-purple/10 to-brand-pink/10 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-amber">
                  <Sparkles className="h-4 w-4" /> {t("v_ai_kicker")}
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {([
                    { kind: "trim" as const, icon: Scissors, label: t("v_request_trim") },
                    { kind: "montage" as const, icon: Film, label: t("v_request_montage") },
                    { kind: "reel" as const, icon: Zap, label: t("v_request_reel") },
                  ]).map(({ kind, icon: Icon, label }) => (
                    <a key={kind}
                      href={waUrl(settings.whatsapp, videoRequestMessage(settings, lang, { fileName: name, duration, start, end, kind }))}
                      target="_blank" rel="noreferrer"
                      className="group flex items-center gap-2 rounded-xl border border-border bg-card/60 p-3 text-sm font-semibold hover:border-brand-pink hover:bg-accent">
                      <Icon className="h-4 w-4 text-brand-pink" />
                      <span className="flex-1">{label}</span>
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    </a>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {lang === "ar"
                    ? `سيتم إرسال تفاصيل الفيديو (الاسم والمدة والقص) تلقائياً مع الطلب إلى ${settings.builtBy}.`
                    : `Your video details (name, duration, cut) will be sent automatically with the request to ${settings.builtBy}.`}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
