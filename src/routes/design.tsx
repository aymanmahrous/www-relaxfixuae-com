import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";
import { useCredits } from "@/lib/credits";
import { generatePostImages, generateCaption } from "@/lib/ai.functions";
import { useSettings, waUrl, tgUrl } from "@/lib/settings";
import { Sparkles, Download, Loader2, Wand2, Copy, MessageCircle, Send, Gift } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "AI Post Designer — Relax Fix UAE" },
      { name: "description", content: "Generate 4 ready-to-publish social media designs in seconds with AI. Arabic and English captions, multiple styles and aspect ratios for UAE brands." },
      { property: "og:title", content: "AI Post Designer — Relax Fix UAE" },
      { property: "og:description", content: "Type your idea and get 4 pro designs plus bilingual captions in seconds." },
      { property: "og:url", content: "https://www.relaxfixuae.com/design" },
    ],
    links: [
      { rel: "canonical", href: "https://www.relaxfixuae.com/design" },
    ],
  }),
  component: DesignPage,
});

const STYLES = ["modern", "luxury", "playful", "minimal", "retro", "cyberpunk"];
const RATIOS = ["1:1", "9:16", "16:9", "4:5"] as const;
const TONES = ["energetic", "luxury", "friendly", "professional", "urgent"];

type Img = { url: string; style: string };

function DesignPage() {
  const { t, lang } = useI18n();
  const { settings } = useSettings();
  const { credits, spend } = useCredits();
  const genImages = useServerFn(generatePostImages);
  const genCaption = useServerFn(generateCaption);

  const [brief, setBrief] = useState("");
  const [style, setStyle] = useState("modern");
  const [ratio, setRatio] = useState<(typeof RATIOS)[number]>("1:1");
  const [tone, setTone] = useState("energetic");
  const [busy, setBusy] = useState(false);
  const [images, setImages] = useState<Img[]>([]);
  const [caption, setCaption] = useState<any>(null);
  const [capBusy, setCapBusy] = useState(false);

  async function handleGenerate() {
    if (!brief.trim()) {
      toast.error(lang === "ar" ? "اكتب فكرة المنشور أولاً" : "Write your post idea first");
      return;
    }
    if (credits < 1) {
      toast.error(t("out_of_credits"));
      return;
    }
    setBusy(true);
    setImages([]);
    try {
      const res = await genImages({ data: { prompt: brief, style, ratio, count: 4 } });
      setImages(res.images);
      spend(1);
      toast.success(lang === "ar" ? "تم! اختر تصميمك" : "Done! Pick your favorite");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleCaption() {
    if (!brief.trim()) return;
    setCapBusy(true);
    try {
      const res = await genCaption({ data: { brief, tone } });
      setCaption(res);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed");
    } finally {
      setCapBusy(false);
    }
  }

  function download(url: string, i: number) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `pixelreel-${Date.now()}-${i + 1}.png`;
    a.click();
  }

  async function shareWA() {
    const { shareDesignMessage } = await import("@/lib/orderMessage");
    window.open(waUrl(settings.whatsapp, shareDesignMessage(settings, lang, brief, style, ratio)), "_blank");
  }

  async function shareTG() {
    const { shareDesignMessage } = await import("@/lib/orderMessage");
    window.open(tgUrl(settings.telegram, shareDesignMessage(settings, lang, brief, style, ratio)), "_blank");
  }

  function copyText(s: string) {
    navigator.clipboard.writeText(s);
    toast.success(t("d_copied"));
  }

  const aspectClass =
    ratio === "1:1" ? "aspect-square" : ratio === "9:16" ? "aspect-[9/16]" : ratio === "16:9" ? "aspect-video" : "aspect-[4/5]";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-gradient">{t("designer_title")}</span>
            </h1>
            <p className="mt-2 text-muted-foreground">{t("designer_sub")}</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-brand-amber/40 bg-card/60 px-4 py-2 text-sm">
            <Gift className="h-4 w-4 text-brand-amber" />
            <span className="font-bold text-brand-amber">{credits}</span>
            <span className="text-muted-foreground">{t("credits_left")}</span>
          </div>
        </div>

        {/* Form */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("d_brief")}</span>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder={t("d_brief_ph")}
                rows={4}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-pink"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("d_style")}</span>
                <select value={style} onChange={(e) => setStyle(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("d_ratio")}</span>
                <select value={ratio} onChange={(e) => setRatio(e.target.value as any)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  {RATIOS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </label>
            </div>

            <button
              onClick={handleGenerate}
              disabled={busy || credits < 1}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-bold text-black glow transition hover:opacity-90 disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {busy ? t("d_generating") : t("d_generate")}
            </button>

            {/* Caption */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("d_caption")}</span>
                <select aria-label={lang === "ar" ? "نبرة التعليق" : "Caption tone"} value={tone} onChange={(e) => setTone(e.target.value)} className="rounded-md border border-border bg-background px-2 py-1 text-xs">
                  {TONES.map((tn) => <option key={tn} value={tn}>{tn}</option>)}
                </select>
              </div>
              <button
                onClick={handleCaption}
                disabled={capBusy || !brief.trim()}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent disabled:opacity-50"
              >
                {capBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {t("d_gen_caption")}
              </button>
              {caption && (
                <div className="mt-3 space-y-3 text-sm">
                  {(["en", "ar"] as const).map((k) => caption[k] && (
                    <div key={k} className="rounded-lg border border-border bg-background p-3">
                      <div className="mb-1 text-[10px] font-bold uppercase text-brand-amber">{k}</div>
                      <p className="font-semibold">{caption[k].headline}</p>
                      <p className="mt-1 text-muted-foreground">{caption[k].body}</p>
                      <p className="mt-1 text-xs text-brand-pink">{(caption[k].hashtags || []).map((h: string) => `#${h.replace(/^#/, "")}`).join(" ")}</p>
                      <button onClick={() => copyText(`${caption[k].headline}\n\n${caption[k].body}\n\n${caption[k].cta}\n\n${(caption[k].hashtags||[]).map((h:string)=>`#${h.replace(/^#/, "")}`).join(" ")}`)} className="mt-2 inline-flex items-center gap-1 text-xs text-brand-pink hover:underline">
                        <Copy className="h-3 w-3" /> {t("d_copy")}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div>
            {images.length === 0 && !busy && (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 p-10 text-center">
                <Sparkles className="h-10 w-10 text-brand-pink" />
                <p className="mt-4 max-w-sm text-muted-foreground">
                  {lang === "ar" ? "اكتب فكرتك واضغط إنشاء — سترى 4 تصاميم احترافية جاهزة." : "Write your idea and hit generate — you'll get 4 pro designs in seconds."}
                </p>
              </div>
            )}
            {busy && (
              <div className={`grid gap-4 ${ratio === "16:9" ? "" : "grid-cols-2"}`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`${aspectClass} animate-pulse rounded-2xl bg-card`} />
                ))}
              </div>
            )}
            {images.length > 0 && (
              <div className={`grid gap-4 ${ratio === "16:9" ? "" : "grid-cols-2"}`}>
                {images.map((img, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl border border-border bg-card">
                    <div className={aspectClass}>
                      <img src={img.url} alt={`AI generated social design ${i + 1} in ${style} style`} className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1 bg-gradient-to-t from-black/90 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                      <button onClick={() => download(img.url, i)} className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-black hover:bg-white/90">
                        <Download className="h-3 w-3" /> {t("d_download")}
                      </button>
                      <button onClick={() => shareWA()} className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-2.5 py-1 text-[11px] font-bold text-black">
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </button>
                      <button onClick={shareTG} className="inline-flex items-center gap-1 rounded-full bg-[#229ED9] px-2.5 py-1 text-[11px] font-bold text-white">
                        <Send className="h-3 w-3" /> Telegram
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
