import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useSettings, waUrl } from "@/lib/settings";
import { useAuth, signOut } from "@/hooks/use-auth";
import { Languages, Sparkles, MessageCircle, Settings, User, LogIn, Menu, X } from "lucide-react";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const { settings } = useSettings();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const brand = lang === "ar" ? settings.brandAr : settings.brandEn;

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-black">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>{brand}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link to="/" className="text-muted-foreground transition hover:text-foreground">
            {t("nav_home")}
          </Link>
          <div className="group relative">
            <a href="/#services" className="text-muted-foreground transition hover:text-foreground">
              {t("nav_services")}
            </a>
            <div className="invisible absolute top-full left-1/2 z-50 mt-2 w-64 -translate-x-1/2 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
              <Link to="/services/social-media-dubai" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">
                {lang === "ar" ? "تصميم سوشيال ميديا - دبي" : "Social Media Design — Dubai"}
              </Link>
              <Link to="/services/logo-design" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">
                {lang === "ar" ? "تصميم لوقو وهوية بصرية" : "Logo & Branding"}
              </Link>
              <Link to="/services/motion-graphics" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">
                {lang === "ar" ? "موشن جرافيك وفيديو" : "Motion Graphics"}
              </Link>
              <Link to="/services/ads-design" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">
                {lang === "ar" ? "تصميم اعلانات ممولة" : "Paid Ads Design"}
              </Link>
              <Link to="/services/social-media-abudhabi" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">
                {lang === "ar" ? "سوشيال ميديا - أبوظبي" : "Social Media — Abu Dhabi"}
              </Link>
              <Link to="/services/social-media-sharjah" className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">
                {lang === "ar" ? "سوشيال ميديا - الشارقة" : "Social Media — Sharjah"}
              </Link>
            </div>
          </div>
          <Link to="/portfolio" className="text-muted-foreground transition hover:text-foreground">
            {lang === "ar" ? "أعمالنا" : "Portfolio"}
          </Link>
          <Link to="/blog" className="text-muted-foreground transition hover:text-foreground">
            {lang === "ar" ? "المدونة" : "Blog"}
          </Link>
          <a href="/#pricing" className="text-muted-foreground transition hover:text-foreground">
            {t("nav_pricing")}
          </a>
          <Link to="/design" className="text-muted-foreground transition hover:text-foreground">
            {t("designer_title")}
          </Link>
          <Link to="/video" className="text-muted-foreground transition hover:text-foreground">
            {t("video_title")}
          </Link>
          {isAdmin && (
            <Link to="/admin" className="inline-flex items-center gap-1 text-brand-amber transition hover:text-foreground">
              <Settings className="h-3.5 w-3.5" />
              {t("admin")}
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="group inline-flex h-9 items-center gap-1 rounded-full border border-border bg-card/70 p-1 text-xs font-bold shadow-lg shadow-black/20 backdrop-blur transition hover:border-brand-pink/50"
            aria-label={t("switch_lang")}
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-muted-foreground transition group-hover:text-foreground">
              <Languages className="h-3.5 w-3.5" />
            </span>
            <span className="grid h-7 min-w-9 place-items-center rounded-full bg-gradient-brand px-2 text-black">
              {lang === "ar" ? "EN" : "AR"}
            </span>
          </button>
          {user ? (
            <Link to="/dashboard" className="hidden items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-semibold hover:bg-accent sm:inline-flex">
              <User className="h-3.5 w-3.5" /> {lang === "ar" ? "حسابي" : "Account"}
            </Link>
          ) : (
            <Link to="/auth" className="hidden items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-semibold hover:bg-accent sm:inline-flex">
              <LogIn className="h-3.5 w-3.5" /> {lang === "ar" ? "دخول" : "Sign in"}
            </Link>
          )}
          <a
            href={waUrl(settings.whatsapp, t("cta_order"))}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 rounded-full bg-gradient-brand px-4 py-1.5 text-xs font-bold text-black hover:opacity-90 sm:inline-flex"
          >
            <MessageCircle className="h-3.5 w-3.5" /> {t("cta_order")}
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-base">
            <Link to="/" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{t("nav_home")}</Link>
            <a href="/#services" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{t("nav_services")}</a>
            <Link to="/services/social-media-dubai" onClick={close} className="rounded-lg px-3 py-3 pl-6 text-sm text-muted-foreground hover:bg-accent">{lang === "ar" ? "سوشيال ميديا - دبي" : "Social Media — Dubai"}</Link>
            <Link to="/services/logo-design" onClick={close} className="rounded-lg px-3 py-3 pl-6 text-sm text-muted-foreground hover:bg-accent">{lang === "ar" ? "لوقو وهوية" : "Logo & Branding"}</Link>
            <Link to="/services/motion-graphics" onClick={close} className="rounded-lg px-3 py-3 pl-6 text-sm text-muted-foreground hover:bg-accent">{lang === "ar" ? "موشن جرافيك" : "Motion Graphics"}</Link>
            <Link to="/services/ads-design" onClick={close} className="rounded-lg px-3 py-3 pl-6 text-sm text-muted-foreground hover:bg-accent">{lang === "ar" ? "إعلانات ممولة" : "Paid Ads"}</Link>
            <Link to="/portfolio" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{lang === "ar" ? "أعمالنا" : "Portfolio"}</Link>
            <Link to="/blog" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{lang === "ar" ? "المدونة" : "Blog"}</Link>
            <a href="/#pricing" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{t("nav_pricing")}</a>
            <Link to="/about" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{lang === "ar" ? "من نحن" : "About"}</Link>
            <Link to="/contact" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{lang === "ar" ? "تواصل" : "Contact"}</Link>
            <Link to="/design" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{t("designer_title")}</Link>
            <Link to="/video" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{t("video_title")}</Link>
            {user ? (
              <Link to="/dashboard" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{lang === "ar" ? "حسابي" : "Account"}</Link>
            ) : (
              <Link to="/auth" onClick={close} className="rounded-lg px-3 py-3 hover:bg-accent">{lang === "ar" ? "دخول" : "Sign in"}</Link>
            )}
            {isAdmin && (
              <Link to="/admin" onClick={close} className="rounded-lg px-3 py-3 text-brand-amber hover:bg-accent">{t("admin")}</Link>
            )}
            <a
              href={waUrl(settings.whatsapp, t("cta_order"))}
              target="_blank"
              rel="noreferrer"
              onClick={close}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-4 py-3 text-base font-bold text-black"
            >
              <MessageCircle className="h-4 w-4" /> {t("cta_order")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
