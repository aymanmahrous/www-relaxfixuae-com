import { useState } from "react";

type Model = "flux" | "sdxl" | "hailuo" | "realistic";
type Ratio = "1:1" | "9:16" | "16:9";

const UAE_TEMPLATES = [
  {
    id: "restaurant",
    title: "مطعم – صور أكل فاخرة",
    prompt:
      "Ultra realistic food photography, Arabic restaurant in Dubai, premium lighting, golden tones, steam, close-up shot, Arabic style plating.",
  },
  {
    id: "real_estate",
    title: "عقارات – فيلا فاخرة",
    prompt:
      "Luxury villa in Abu Dhabi, sunset lighting, modern architecture, palm trees, cinematic HDR, Arabic luxury aesthetic.",
  },
  {
    id: "perfume",
    title: "عطور – إعلان احترافي",
    prompt:
      "Luxury Arabic perfume bottle, black and gold theme, dramatic lighting, smoke, reflective surface, premium commercial photography.",
  },
  {
    id: "ramadan",
    title: "رمضان – تصميم عربي",
    prompt:
      "Ramadan lanterns, crescent moon, golden Arabic patterns, warm lighting, elegant Islamic background.",
  },
];

export function ImageStudio() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<Model>("flux");
  const [ratio, setRatio] = useState<Ratio>("1:1");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);
    setProgress(0);

    for (let p = 10; p <= 100; p += 10) {
      setProgress(p);
      await new Promise((r) => setTimeout(r, 200));
    }

    const fakeImage =
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800";

    setPreview(fakeImage);
    setLoading(false);
  }

  return (
    <div className="space-y-4 mt-4 text-xs">
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-4">
        <div className="text-[11px] text-[var(--text-muted)] mb-1">
          Image Generation • نموذج:
        </div>
        <div className="text-sm font-semibold text-[var(--accent-gold)]">
          {model === "flux"
            ? "Flux Pro"
            : model === "sdxl"
            ? "Stable Diffusion XL"
            : model === "hailuo"
            ? "Hailuo Minimax"
            : "Realistic Vision"}
        </div>
      </div>

      <div className="grid md:grid-cols-[1.3fr,0.9fr] gap-6">
        <div className="space-y-3">
          <label className="text-[11px] text-[var(--text-muted)]">
            وصف الصورة
          </label>
          <textarea
            className="w-full min-h-[120px] bg-black/40 border border-[var(--border-subtle)] rounded-xl px-3 py-2"
            placeholder="مثال: صورة احترافية لطبق طعام عربي بإضاءة سينمائية..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-[var(--text-muted)]">
                النموذج
              </span>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value as Model)}
                className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-lg px-3 py-2"
              >
                <option value="flux">Flux Pro</option>
                <option value="sdxl">Stable Diffusion XL</option>
                <option value="hailuo">Hailuo Minimax</option>
                <option value="realistic">Realistic Vision</option>
              </select>
            </div>

            <div>
              <span className="text-[11px] text-[var(--text-muted)]">
                الأبعاد
              </span>
              <select
                value={ratio}
                onChange={(e) => setRatio(e.target.value as Ratio)}
                className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-lg px-3 py-2"
              >
                <option value="1:1">1:1</option>
                <option value="9:16">9:16</option>
                <option value="16:9">16:9</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-[11px] text-[var(--text-muted)] mb-1">
              قوالب جاهزة:
            </div>
            <div className="flex flex-wrap gap-2">
              {UAE_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPrompt(t.prompt)}
                  className="px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-black/40 hover:border-[var(--accent-cyan)]"
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="px-4 py-2 rounded-full bg-[var(--accent-gold)] text-black font-medium"
          >
            {loading ? "جاري التوليد..." : "توليد صورة الآن"}
          </button>
        </div>

        <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-3 space-y-3">
          <div className="text-[11px] text-[var(--text-muted)]">المعاينة</div>

          {loading && (
            <div className="space-y-2">
              <div className="h-1.5 rounded-full bg-black/60 overflow-hidden">
                <div
                  className="h-full bg-[var(--accent-gold)] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-[11px] text-[var(--text-muted)]">
                جاري التوليد… {progress}%
              </div>
            </div>
          )}

          <div className="aspect-square rounded-xl bg-black/60 border border-white/5 flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-[11px] text-[var(--text-muted)]">
                سيتم عرض الصورة هنا بعد التوليد.
              </span>
            )}
          </div>

          {preview && (
            <div className="flex flex-wrap gap-2">
              <a
                href={preview}
                download
                className="px-3 py-1.5 rounded-full bg-[var(--accent-gold)] text-black"
              >
                تنزيل
              </a>
              <button
                onClick={generate}
                className="px-3 py-1.5 rounded-full border border-[var(--accent-gold)] text-[var(--accent-gold)]"
              >
                توليد نسخة أخرى
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
