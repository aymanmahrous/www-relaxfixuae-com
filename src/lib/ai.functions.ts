import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";

function key() {
  const k = process.env.LOVABLE_API_KEY;
  if (!k) throw new Error("LOVABLE_API_KEY missing");
  return k;
}

/** Generate N post-image variants from a single brief. Returns base64 PNGs. */
export const generatePostImages = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      prompt: z.string().min(3).max(800),
      style: z.string().min(1).max(60).default("modern"),
      ratio: z.enum(["1:1", "9:16", "16:9", "4:5"]).default("1:1"),
      count: z.number().min(1).max(4).default(4),
    }),
  )
  .handler(async ({ data }) => {
    const styles = [
      "minimal modern editorial",
      "bold vibrant pop with neon gradients",
      "luxury dark gold elegant",
      "playful 3D bubbly colorful",
    ];
    const ratioHint = {
      "1:1": "square 1:1 social post",
      "9:16": "vertical 9:16 story / reel",
      "16:9": "horizontal 16:9 banner",
      "4:5": "portrait 4:5 instagram post",
    }[data.ratio];

    const results = await Promise.all(
      Array.from({ length: data.count }).map(async (_, i) => {
        const variant = styles[i % styles.length];
        const fullPrompt = `Create a professional social media ${ratioHint}. Theme: ${data.prompt}. Visual style: ${data.style}, ${variant}. Include tasteful typography space, high contrast, premium advertising quality, no watermark.`;
        const res = await fetch(`${GATEWAY}/images/generations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key(),
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            messages: [{ role: "user", content: fullPrompt }],
            modalities: ["image", "text"],
            stream: false,
          }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Image gen failed [${res.status}]: ${text.slice(0, 200)}`);
        }
        const json = await res.json();
        // Response shape: { choices: [{ message: { images: [{ image_url: { url: "data:image/png;base64,..." }}]}}]}
        const url: string | undefined =
          json?.choices?.[0]?.message?.images?.[0]?.image_url?.url ??
          (json?.data?.[0]?.b64_json ? `data:image/png;base64,${json.data[0].b64_json}` : undefined);
        if (!url) throw new Error("No image returned");
        return { url, style: variant };
      }),
    );
    return { images: results };
  });

/** Generate ad copy + hashtags in Arabic + English. */
export const generateCaption = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      brief: z.string().min(3).max(600),
      tone: z.string().min(1).max(40).default("energetic"),
    }),
  )
  .handler(async ({ data }) => {
    const res = await fetch(`${GATEWAY}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key(),
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are a senior ad copywriter. Return strict JSON: {\"en\":{\"headline\":\"\",\"body\":\"\",\"cta\":\"\",\"hashtags\":[]},\"ar\":{\"headline\":\"\",\"body\":\"\",\"cta\":\"\",\"hashtags\":[]}}. Keep bodies under 220 chars. 6 hashtags each.",
          },
          {
            role: "user",
            content: `Brief: ${data.brief}\nTone: ${data.tone}\nReturn JSON only.`,
          },
        ],
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Caption failed [${res.status}]: ${text.slice(0, 200)}`);
    }
    const json = await res.json();
    const raw: string = json?.choices?.[0]?.message?.content ?? "{}";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      return { en: { headline: "", body: cleaned, cta: "", hashtags: [] }, ar: { headline: "", body: "", cta: "", hashtags: [] } };
    }
  });
