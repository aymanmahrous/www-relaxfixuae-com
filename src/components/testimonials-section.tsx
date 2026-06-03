import { useSettings } from "@/lib/settings";
import { useI18n } from "@/lib/i18n";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const { settings } = useSettings();
  const { lang } = useI18n();
  const items = settings.testimonials || [];
  const partners = settings.partners || [];
  if (!items.length && !partners.length) return null;

  return (
    <section className="border-t border-border bg-gradient-to-b from-background to-card/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {items.length > 0 && (
          <>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                {lang === "ar" ? "ماذا يقول عملاؤنا" : "What clients say"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "ar" ? "نتائج حقيقية لأعمال حقيقية" : "Real results for real businesses"}
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {items.map((t) => (
                <div
                  key={t.id}
                  className="relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur transition hover:border-brand-pink/40 hover:shadow-lg hover:shadow-brand-pink/10"
                >
                  <Quote className="absolute right-4 top-4 h-7 w-7 text-brand-pink/20" />
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-amber text-brand-amber" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-foreground/90">
                    "{lang === "ar" ? t.quoteAr : t.quoteEn}"
                  </p>
                  <div className="flex items-center gap-3">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-black">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {partners.length > 0 && (
          <div className="mt-14">
            <p className="mb-5 text-center text-xs uppercase tracking-widest text-muted-foreground">
              {lang === "ar" ? "موثوق من قبل" : "Trusted by"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-70">
              {partners.map((p) =>
                p.logoUrl ? (
                  <img key={p.id} src={p.logoUrl} alt={p.name} className="h-8 w-auto grayscale transition hover:grayscale-0" />
                ) : (
                  <span key={p.id} className="text-base font-bold tracking-tight text-muted-foreground transition hover:text-foreground">
                    {p.name}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
