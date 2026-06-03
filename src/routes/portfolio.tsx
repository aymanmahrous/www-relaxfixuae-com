import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { useSettings, waUrl } from "@/lib/settings";
import { MessageCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Relax Fix UAE" },
      { name: "description", content: "Selected creative work from Relax Fix UAE: brand identity, social media posts, motion graphics, and professional video edits for UAE brands." },
      { property: "og:title", content: "Portfolio — Relax Fix UAE" },
      { property: "og:description", content: "Branding, social, video, and motion samples from our UAE creative studio." },
      { property: "og:url", content: "https://www.relaxfixuae.com/portfolio" },
    ],
    links: [
      { rel: "canonical", href: "https://www.relaxfixuae.com/portfolio" },
    ],
  }),
  component: PortfolioPage,
});

const CATS = [
  { key: "all", en: "All", ar: "الكل" },
  { key: "design", en: "Design", ar: "تصميم" },
  { key: "video", en: "Video", ar: "فيديو" },
  { key: "branding", en: "Branding", ar: "هوية" },
  { key: "social", en: "Social", ar: "سوشيال" },
];

function PortfolioPage() {
  const { lang } = useI18n();
  const { settings } = useSettings();
  const [items, setItems] = useState<any[]>([]);
  const [cat, setCat] = useState("all");

  useEffect(() => {
    supabase.from("portfolio_items").select("*").eq("published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems(data || []));
  }, []);

  const filtered = cat === "all" ? items : items.filter(i => i.category === cat);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">
            <Sparkles className="mr-1 inline h-3 w-3" /> {lang === "ar" ? "أعمالنا" : "Our Work"}
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {lang === "ar" ? "ابداع 2026 — معرض الأعمال" : "Creative 2026 — Portfolio"}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {lang === "ar" ? "كل ما تحتاجه للدعاية — من الشعار إلى الفيديو والمنشورات." : "Everything you need for advertising — from logo to video to posts."}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATS.map(c => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${cat === c.key ? "bg-gradient-brand text-black" : "border border-border bg-card hover:bg-accent"}`}>
              {lang === "ar" ? c.ar : c.en}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center text-muted-foreground">
            {lang === "ar" ? "سيتم إضافة الأعمال قريباً — تواصل معنا لمشاهدة عينات." : "Portfolio coming soon — contact us to see samples."}
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(item => {
              const title = lang === "ar" ? (item.title_ar || item.title_en) : item.title_en;
              const desc = lang === "ar" ? (item.description_ar || item.description_en) : item.description_en;
              return (
                <div key={item.id} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-brand-pink/50">
                  <div className="aspect-square overflow-hidden bg-muted">
                    {item.media_type === "video" ? (
                      <video src={item.media_url} controls className="h-full w-full object-cover" />
                    ) : (
                      <img src={item.media_url} alt={title} className="h-full w-full object-cover transition group-hover:scale-105" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs uppercase text-brand-amber">{item.category}</div>
                    <h2 className="mt-1 font-semibold">{title}</h2>
                    {desc && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <a href={waUrl(settings.whatsapp, lang === "ar" ? "أعجبتني أعمالكم وأريد مشروعاً مشابهاً" : "I loved your work and want a similar project")}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold text-black hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> {lang === "ar" ? "اطلب مشروعاً مشابهاً" : "Request similar project"}
          </a>
        </div>
      </main>
    </div>
  );
}
