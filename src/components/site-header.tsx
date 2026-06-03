import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Languages, Sparkles } from "lucide-react";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>{t("brand")}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/" className="text-muted-foreground hover:text-foreground">{t("nav_home")}</Link>
          <Link to="/design" className="text-muted-foreground hover:text-foreground">{t("nav_design")}</Link>
          <Link to="/video" className="text-muted-foreground hover:text-foreground">{t("nav_video")}</Link>
        </nav>
        <button
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
        >
          <Languages className="h-4 w-4" />
          {t("switch_lang")}
        </button>
      </div>
    </header>
  );
}
