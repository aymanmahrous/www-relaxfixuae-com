import { useState } from "react";

type Tone =
  | "Luxury"
  | "Friendly"
  | "Professional"
  | "Emirati"
  | "Bold"
  | "Minimal";

export function BrandVoice() {
  const [brand, setBrand] = useState("");
  const [tone, setTone] = useState<Tone>("Emirati");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  async function generate() {
    if (!brand.trim()) return;

    setLoading(true);
    setProgress(0);

    for (let p = 10; p <= 100; p += 10) {
      setProgress(p);
      await new Promise((r) => setTimeout(r, 150));
    }

    const output = `🎤 **Brand Voice – نبرة صوت العلامة التجارية**

اسم العلامة: **${brand}**
الأسلوب المختار: **${tone}**

---

## 🎯 تعريف نبرة الصوت:
${tone === "Luxury" ? "فاخرة، راقية، تعتمد على كلمات قوية ولمسات ذهبية." : ""}
${tone === "Friendly" ? "ودودة، بسيطة، قريبة من الجمهور." : ""}
${tone === "Professional" ? "احترافية، مباشرة، واضحة، تعتمد على الثقة." : ""}
${tone === "Emirati" ? "أسلوب إماراتي أصيل، كلمات محلية، دفء ولهجة قريبة." : ""}
${tone === "Bold" ? "جريئة، قوية، مؤثرة، تعتمد على رسائل قصيرة وحادة." : ""}
${tone === "Minimal" ? "هادئة، بسيطة، كلمات قليلة ومعنى كبير." : ""}

---

## 📝 مثال بوست جاهز:
${tone === "Emirati"
        ? "نقدّم لكم تجربة مختلفة… جودة، ثقة، وتميّز إماراتي أصيل."
        : "Experience a new level of quality and excellence with our brand."
      }

---

## 🗣️ كلمات مفتاحية مقترحة:
- جودة  
- ثقة  
- تميّز  
- هوية  
- احترافية  
- إبداع  

---

## 📄 وصف قصير للعلامة:
${brand} تقدم خدمات عالية الجودة بأسلوب ${tone} يلامس الجمهور ويعكس شخصية العلامة التجارية بشكل واضح وقوي.
`;

    setResult(output);
    setLoading(false);
  }

  return (
    <div className="space-y-4 mt-4 text-xs">
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-4">
        <div className="text-[11px] text-[var(--text-muted)] mb-1">
          Brand Voice AI • نبرة صوت العلامة التجارية
        </div>
        <div className="text-sm font-semibold text-[var(--accent-gold)]">
          توليد هوية صوتية كاملة للعلامة
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[11px] text-[var(--text-muted)]">
          اسم العلامة التجارية
        </label>
        <input
          className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-xl px-3 py-2"
          placeholder="مثال: Relax Fix UAE"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <div>
          <span className="text-[11px] text-[var(--text-muted)]">
            الأسلوب (Tone)
          </span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
            className="w-full bg-black/40 border border-[var(--border-subtle)] rounded-lg px-3 py-2 mt-1"
          >
            <option value="Luxury">Luxury</option>
            <option value="Friendly">Friendly</option>
            <option value="Professional">Professional</option>
            <option value="Emirati">Emirati</option>
            <option value="Bold">Bold</option>
            <option value="Minimal">Minimal</option>
          </select>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="px-4 py-2 rounded-full bg-[var(--accent-gold)] text-black font-medium"
        >
          {loading ? "جاري التوليد..." : "توليد نبرة الصوت"}
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
            سيتم عرض نبرة الصوت هنا بعد التوليد.
          </span>
        )}
      </div>
    </div>
  );
}
