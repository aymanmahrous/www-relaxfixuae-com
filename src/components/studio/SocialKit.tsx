import { useState } from "react";

type Tone = "Luxury" | "Friendly" | "Professional" | "Emirati" | "Funny";
type Language = "ar" | "en";

export function SocialKit() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("Emirati");
  const [lang, setLang] = useState<Language>("ar");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  async function generate() {
    if (!topic.trim()) return;

    setLoading(true);
    setProgress(0);

    for (let p = 10; p <= 100; p += 10) {
      setProgress(p);
      await new Promise((r) => setTimeout(r, 150));
    }

    const output =
      lang === "ar"
        ? `📌 منشور جاهز:\n\n${topic}\n\n✨ بأسلوب: ${tone}\n\n📄 كابتشن:\nاستمتعوا معنا بعرض مميز وفريد من نوعه! لا تفوتوا الفرصة.\n\n#الإمارات #عروض #دبي #أبوظبي`
        : `📌 Ready Post:\n\n${topic}\n\n✨ Tone: ${tone}\n\n📄 Caption:\nEnjoy our exclusive and premium offer! Don’t miss out.\n\n#UAE #Dubai #Offers`;

    setResult(output);
    setLoading(false);
  }

  return (
    <div className="space-y-4 mt-4 text-xs">
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-4">
        <div className="text-[11px] text-[var(--text-muted)] mb-1">
          Social Media Kit • منشورات جاهزة
        </div>
        <div className="text-sm font-semibold text-[var(--accent-gold)]">
          توليد بوست + كابتشن + هاشتاقات
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[11px] text-[var(--text-muted)]">
          موضوع البوست
        </label>
        <textarea
          className="w-full min-h-[120px] bg-black/40 border border-[var(--border-subtle)] rounded-xl px-3 py-2"
          placeholder="مثال: عرض خاص على تنظيف المكيفات في أبوظبي..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[11px] text-[var(--text-muted)]">
              الأسلوب (Tone)
            </span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-lg px-3 py-2"
            >
              <option value="Luxury">Luxury</option>
              <option value="Friendly">Friendly</option>
              <option value="Professional">Professional</option>
              <option value="Emirati">Emirati</option>
              <option value="Funny">Funny</option>
            </select>
          </div>

          <div>
            <span className="text-[11px] text-[var(--text-muted)]">
              اللغة
            </span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-lg px-3 py-2"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="px-4 py-2 rounded-full bg-[var(--accent-gold)] text-black font-medium"
        >
          {loading ? "جاري التوليد..." : "توليد منشور الآن"}
        </button>
      </div>

      <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3">
        <div className="text-[11px] text-[var(--text-muted)]">النتيجة</div>

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

        {result ? (
          <pre className="whitespace-pre-wrap text-[11px] leading-relaxed">
            {result}
          </pre>
        ) : (
          <span className="text-[11px] text-[var(--text-muted)]">
            سيتم عرض المنشور هنا بعد التوليد.
          </span>
        )}
      </div>
    </div>
  );
}
