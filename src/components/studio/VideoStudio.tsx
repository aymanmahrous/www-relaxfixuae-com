import { useState } from "react";
import { getVideoCreditCost } from "../../lib/credits";

type Duration = 8 | 15 | 30;
type Aspect = "9:16" | "16:9" | "1:1";
type Provider = "kling" | "runway" | "hailuo";
type Style =
  | "Cinematic"
  | "Luxury UAE"
  | "Realistic"
  | "Arabic Cultural"
  | "Dynamic";

const UAE_TEMPLATES = [
  {
    id: "real_estate",
    title: "جولة عقارية فاخرة",
    prompt:
      "Real estate property tour in Dubai Marina, cinematic drone shots, interior walkthrough, luxury vibe, Arabic overlay text.",
  },
  {
    id: "hotel_resort",
    title: "فندق ومنتجع في الإمارات",
    prompt:
      "Hotel & resort promo in Ras Al Khaimah, sunrise beach shots, pool, spa, family-friendly, Arabic/English captions.",
  },
  {
    id: "restaurant_opening",
    title: "افتتاح مطعم جديد",
    prompt:
      "Restaurant opening in Downtown Dubai, close-up food shots, chef in action, crowd, dynamic transitions, Arabic calligraphy.",
  },
  {
    id: "ramadan_eid",
    title: "عروض رمضان وعيد",
    prompt:
      "Ramadan & Eid offers, lanterns, crescent moon, family gathering, warm lighting, Arabic typography, gold accents.",
  },
  {
    id: "luxury_brand",
    title: "عرض علامة تجارية فاخرة",
    prompt:
      "Luxury brand showcase, product close-ups, slow motion, black & gold palette, Arabic luxury aesthetic.",
  },
];

export function VideoStudio() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState<Duration>(8);
  const [aspect, setAspect] = useState<Aspect>("9:16");
  const [provider, setProvider] = useState<Provider>("kling");
  const [style, setStyle] = useState<Style>("Luxury UAE");
  const [motionStrength, setMotionStrength] = useState("Medium");
  const [cameraMovement, setCameraMovement] = useState("Smooth pans");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const credits = getVideoCreditCost(duration, provider);

  async function enhancePrompt() {
    if (!prompt.trim()) return;
    setPrompt(
      `Cinematic ${style} UAE commercial, ${prompt}, smooth camera, ${cameraMovement}, motion: ${motionStrength}, 4K, professional lighting, Arabic & English overlays.`
    );
  }

  async function generateVideo() {
    if (!prompt.trim()) return;

    setLoading(true);
    setProgress(0);

    for (let p = 10; p <= 100; p += 10) {
      setProgress(p);
      await new Promise((r) => setTimeout(r, 250));
    }

    const fakeUrl =
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4";

    setPreviewUrl(fakeUrl);
    setLoading(false);
  }

  return (
    <div className="space-y-4 mt-4 text-xs">
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-4 flex flex-wrap justify-between gap-3">
        <div>
          <div className="text-[11px] text-[var(--text-muted)]">
            Video Reels & Ads •{" "}
            <span className="text-[var(--accent-gold)]">
              {provider === "kling"
                ? "Kling AI 2.0"
                : provider === "runway"
                ? "Runway Gen-3"
                : "Hailuo Minimax"}
            </span>
          </div>
          <div className="text-[11px] text-[var(--text-muted)]">
            {duration} ثانية • {aspect} • {style}
          </div>
        </div>

        <div className="text-right">
          <div className="text-[11px] text-[var(--text-muted)]">التكلفة:</div>
          <div className="text-sm font-semibold text-[var(--accent-gold)]">
            {credits} كريدت
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[1.3fr,0.9fr] gap-6">
        <div className="space-y-3">
          <label className="text-[11px] text-[var(--text-muted)]">
            وصف الفيديو
          </label>
          <textarea
            className="w-full min-h-[120px] bg-black/40 border border-[var(--border-subtle)] rounded-xl px-3 py-2"
            placeholder="مثال: إعلان فيديو لمطعم في دبي بإضاءة سينمائية..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={enhancePrompt}
            className="text-[11px] text-[var(--accent-cyan)] underline"
          >
            تحسين البرومبت تلقائياً
          </button>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-[var(--text-muted)]">
                المدة
              </span>
              <div className="flex gap-2 mt-1 flex-wrap">
                {[8, 15, 30].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d as Duration)}
                    className={`px-3 py-1.5 rounded-full border ${
                      duration === d
                        ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]/10"
                        : "border-[var(--border-subtle)]"
                    }`}
                  >
                    {d} ثانية
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] text-[var(--text-muted)]">
                الأبعاد
              </span>
              <div className="flex gap-2 mt-1 flex-wrap">
                {["9:16", "16:9", "1:1"].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAspect(a as Aspect)}
                    className={`px-3 py-1.5 rounded-full border ${
                      aspect === a
                        ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10"
                        : "border-[var(--border-subtle)]"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-[var(--text-muted)]">
                الموديل
              </span>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as Provider)}
                className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-lg px-3 py-2"
              >
                <option value="kling">Kling AI 2.0</option>
                <option value="runway">Runway Gen-3</option>
                <option value="hailuo">Hailuo Minimax</option>
              </select>
            </div>

            <div>
              <span className="text-[11px] text-[var(--text-muted)]">
                الأسلوب
              </span>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as Style)}
                className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-lg px-3 py-2"
              >
                <option>Cinematic</option>
                <option>Luxury UAE</option>
                <option>Realistic</option>
                <option>Arabic Cultural</option>
                <option>Dynamic</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-[var(--text-muted)]">
                قوة الحركة
              </span>
              <select
                value={motionStrength}
                onChange={(e) => setMotionStrength(e.target.value)}
                className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-lg px-3 py-2"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <span className="text-[11px] text-[var(--text-muted)]">
                حركة الكاميرا
              </span>
              <select
                value={cameraMovement}
                onChange={(e) => setCameraMovement(e.target.value)}
                className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-lg px-3 py-2"
              >
                <option>Smooth pans</option>
                <option>Handheld dynamic</option>
                <option>Drone aerial</option>
                <option>Static subtle zoom</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-[11px] text-[var(--text-muted)] mb-1">
              قوالب جاهزة للسوق الإماراتي:
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

          <div className="flex justify-between items-center pt-3">
            <div className="text-[11px] text-[var(--text-muted)]">
              التكلفة:{" "}
              <span className="text-[var(--accent-gold)]">{credits}</span> كريدت
            </div>

            <button
              onClick={generateVideo}
              disabled={loading}
              className="px-4 py-2 rounded-full bg-[var(--accent-gold)] text-black font-medium"
            >
              {loading ? "جاري التوليد..." : "توليد فيديو الآن"}
            </button>
          </div>
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

          <div className="aspect-video rounded-xl bg-black/60 border border-white/5 flex items-center justify-center">
            {previewUrl ? (
              <video
                src={previewUrl}
                controls
                className="w-full h-full rounded-xl"
              />
            ) : (
              <span className="text-[11px] text-[var(--text-muted)]">
                سيتم عرض الفيديو هنا بعد التوليد.
              </span>
            )}
          </div>

          {previewUrl && (
            <div className="flex flex-wrap gap-2">
              <a
                href={previewUrl}
                download
                className="px-3 py-1.5 rounded-full bg-[var(--accent-gold)] text-black"
              >
                تنزيل
              </a>
              <button
                onClick={generateVideo}
                className="px-3 py-1.5 rounded-full border border-[var(--accent-gold)] text-[var(--accent-gold)]"
              >
                توليد نسخة أخرى
              </button>
              <button className="px-3 py-1.5 rounded-full border border-[var(--border-subtle)]">
                إضافة إلى مشروع
              </button>
              <button className="px-3 py-1.5 rounded-full border border-[var(--border-subtle)]">
                مشاركة
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
