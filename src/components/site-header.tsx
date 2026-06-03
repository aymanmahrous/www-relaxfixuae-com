import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Languages, Sparkles } from "lucide-react";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-black">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>{t("brand")}</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link to="/" className="text-muted-foreground transition hover:text-foreground">{t("nav_home")}</Link>
          <a href="/#services" className="text-muted-foreground transition hover:text-foreground">{t("nav_services")}</a>
          <a href="/#work" className="text-muted-foreground transition hover:text-foreground">{t("nav_work")}</a>
          <a href="/#pricing" className="text-muted-foreground transition hover:text-foreground">{t("nav_pricing")}</a>
          <Link to="/design" className="text-muted-foreground transition hover:text-foreground">{t("nav_design")}</Link>
          <Link to="/video" className="text-muted-foreground transition hover:text-foreground">{t("nav_video")}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium backdrop-blur hover:bg-accent"
          >
            <Languages className="h-3.5 w-3.5" />
            {t("switch_lang")}
          </button>
          <a href="/#contact" className="hidden rounded-full bg-gradient-brand px-4 py-1.5 text-xs font-bold text-black hover:opacity-90 sm:inline-flex">
            {t("cta_order")}
          </a>
        </div>
      </div>
    </header>
  );
}
