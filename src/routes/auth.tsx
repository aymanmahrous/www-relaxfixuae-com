import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Pixel & Reel" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [loading, user, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success(lang === "ar" ? "تم التسجيل! تحقق من بريدك." : "Account created! Check your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(lang === "ar" ? "أهلاً بعودتك!" : "Welcome back!");
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      toast.error(err.message || "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-10">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-black">
              <Sparkles className="h-4 w-4" />
            </span>
            <h1 className="text-xl font-bold">
              {mode === "signin"
                ? lang === "ar" ? "تسجيل الدخول" : "Sign in"
                : lang === "ar" ? "إنشاء حساب" : "Create account"}
            </h1>
          </div>
          <button
            type="button"
            onClick={async () => {
              try {
                await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/dashboard` });
              } catch (err: any) {
                toast.error(err?.message || "Google sign-in failed");
              }
            }}
            className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold hover:bg-accent"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            {lang === "ar" ? "متابعة بحساب Google" : "Continue with Google"}
          </button>
          <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            {lang === "ar" ? "أو" : "or"}
            <div className="h-px flex-1 bg-border" />
          </div>
          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <input
                type="text"
                placeholder={lang === "ar" ? "الاسم" : "Full name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-pink"
              />
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-pink"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                minLength={6}
                placeholder={lang === "ar" ? "كلمة السر" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-pink"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand px-4 py-3 text-sm font-bold text-black hover:opacity-90 disabled:opacity-50"
            >
              {busy ? "…" : mode === "signin" ? (lang === "ar" ? "دخول" : "Sign in") : (lang === "ar" ? "تسجيل" : "Sign up")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signin"
              ? lang === "ar" ? "ليس لديك حساب؟ أنشئ واحداً" : "No account? Create one"
              : lang === "ar" ? "لديك حساب؟ سجّل دخول" : "Have an account? Sign in"}
          </button>
          <Link to="/" className="mt-2 block text-center text-xs text-muted-foreground hover:text-foreground">
            ← {lang === "ar" ? "الرجوع للرئيسية" : "Back to home"}
          </Link>
        </div>
      </main>
    </div>
  );
}
