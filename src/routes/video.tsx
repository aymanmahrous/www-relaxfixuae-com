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
      { name: "description", content: "Upload, trim, and request professional video edits, reels, and montages." },
    ],
  }),
  component: VideoPage,
});

// ----------------------
// CSS Animations
// ----------------------
const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const slideUp = "animate-[slideUp_0.8s_ease-out]";
const glow = "shadow-[0_0_25px_rgba(255,0,128,0.4)]";

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
    <div className="min-h-screen bg-[#05050a] text-white">
      <SiteHeader />

      {/* ---------------------- HERO ---------------------- */}
      <section className={`px-6 py-20 text-center ${fadeIn}`}>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
            Video Editing Studio
          </span>
        </h1>
        <p className="mt-4 text-slate-300 max-w-xl mx-auto">
          احترافية في المونتاج، الريلز، القص، وتحسين الفيديوهات للسوشيال ميديا.
        </p>
      </section>

      {/* ---------------------- SERVICES ---------------------- */}
      <section className="px-6 max-w-6xl mx-auto py-10">
        <h2 className={`text-2xl font-bold mb-6 ${slideUp}`}>خدمات الفيديو</h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Film, label: "Montage" },
            { icon: Zap, label: "Reels Editing" },
            { icon: Sparkles, label: "Promo Video" },
            { icon: Scissors, label: "Trim & Cut" },
            { icon: Film, label: "Logo Reveal" },
            { icon: Zap, label: "TikTok Optimization" },
          ].map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className={`rounded-xl bg-[#0b0b15] border border-pink-500/20 p-5 hover:border-pink-500/40 transition ${fadeIn}`}
            >
              <Icon className="h-6 w-6 text-pink-400 mb-3" />
              <p className="font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------- VIDEO TOOL ---------------------- */}
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className={`rounded-2xl border border-pink-500/20 bg-[#0b0b15] p-6 ${glow} ${fadeIn}`}>
          {!url ? (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-pink-500/40 bg-black/20 p-12 text-center hover:border-pink-400 transition">
              <Upload className="h-8 w-8 text-pink-400" />
              <span className="font-semibold">ارفع فيديو</span>
              <input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
            </label>
          ) : (
            <div className="space-y-6">
              <video ref={ref} src={url} controls onLoadedMetadata={onLoaded} className="w-full rounded-xl bg-black" />

              {/* Ranges */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-xs text-slate-400">Start</span>
                  <input type="range" min={0} max={duration} step={0.1} value={start} onChange={(e) => setStart(Math.min(parseFloat(e.target.value), end))} className="w-full accent-pink-500" />
                </label>
                <label>
                  <span className="text-xs text-slate-400">End</span>
                  <input type="range" min={0} max={duration} step={0.1} value={end} onChange={(e) => setEnd(Math.max(parseFloat(e.target.value), start))} className="w-full accent-pink-500" />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <button onClick={preview} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-bold text-black">
                  <Play className="h-4 w-4" /> Preview
                </button>
                <button onClick={downloadOriginal} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-black px-4 py-2 text-sm font-semibold">
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>

              {/* WhatsApp Requests */}
              <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-300">
                  <Sparkles className="h-4 w-4" /> AI Video Request
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  {[
                    { kind: "trim", icon: Scissors, label: "Trim Video" },
                    { kind: "montage", icon: Film, label: "Montage" },
                    { kind: "reel", icon: Zap, label: "Reel Edit" },
                  ].map(({ kind, icon: Icon, label }) => (
                    <a
                      key={kind}
                      href={waUrl(settings.whatsapp, videoRequestMessage(settings, lang, { fileName: name, duration, start, end, kind }))}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 rounded-xl border border-slate-700 bg-black/40 p-3 text-sm font-semibold hover:border-pink-500 hover:bg-black/60 transition"
                    >
                      <Icon className="h-4 w-4 text-pink-400" />
                      <span className="flex-1">{label}</span>
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
