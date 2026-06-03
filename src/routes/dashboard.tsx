import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { useAuth, signOut } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { createPortalSession } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe-client";
import { toast } from "sonner";
import { LogOut, Package, CreditCard, ShieldCheck, ArrowRight, Settings } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Relax Fix UAE" },
      { name: "description", content: "Manage your Relax Fix UAE account, view your orders, track active subscriptions, and update billing details — all in one place." },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "canonical", href: "https://www.relaxfixuae.com/dashboard" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data || []));
    supabase.from("subscriptions").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setSubs(data || []));
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{lang === "ar" ? "حسابي" : "My Account"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Link to="/admin" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-bold text-black">
                <ShieldCheck className="h-4 w-4" /> {lang === "ar" ? "لوحة الإدارة" : "Admin Panel"}
              </Link>
            )}
            <button onClick={() => { signOut(); navigate({ to: "/" }); }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">
              <LogOut className="h-4 w-4" /> {lang === "ar" ? "خروج" : "Sign out"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label={lang === "ar" ? "الطلبات" : "Orders"} value={orders.length} />
          <Stat label={lang === "ar" ? "الاشتراكات" : "Subscriptions"} value={subs.filter(s => s.status === "active").length} />
          <Stat label={lang === "ar" ? "أُنفق ($)" : "Spent ($)"} value={(orders.reduce((a, o) => a + (o.amount_cents || 0), 0) / 100).toFixed(2)} />
        </div>

        <Section title={lang === "ar" ? "اشتراكاتي" : "My Subscriptions"}>
          {subs.length === 0 ? <Empty msg={lang === "ar" ? "لا توجد اشتراكات" : "No subscriptions yet"} />
            : <>
                {subs.map((s) => (
                  <Row key={s.id} title={s.price_id} sub={s.status} extra={s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : ""} />
                ))}
                <ManagePortalButton />
              </>}
        </Section>

        <Section title={lang === "ar" ? "طلباتي" : "My Orders"}>
          {orders.length === 0 ? <Empty msg={lang === "ar" ? "لا توجد طلبات بعد" : "No orders yet"} />
            : orders.map((o) => (
              <Row key={o.id} title={o.service_summary || o.price_id} sub={`${(o.amount_cents/100).toFixed(2)} ${o.currency?.toUpperCase()}`} extra={o.status} />
            ))}
        </Section>

        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          {lang === "ar" ? "تصفّح الخدمات" : "Browse services"} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
function Row({ title, sub, extra }: { title: string; sub: string; extra?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card p-4">
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      {extra && <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold">{extra}</span>}
    </div>
  );
}
function Empty({ msg }: { msg: string }) {
  return <div className="rounded-xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">{msg}</div>;
}

function ManagePortalButton() {
  const { lang } = useI18n();
  const [busy, setBusy] = useState(false);
  const portal = useServerFn(createPortalSession);
  async function open() {
    setBusy(true);
    try {
      const res = await portal({
        data: {
          environment: getStripeEnvironment(),
          returnUrl: `${window.location.origin}/dashboard`,
        },
      });
      if ("error" in res) throw new Error(res.error);
      window.open(res.url, "_blank");
    } catch (e: any) {
      toast.error(e.message || "Failed to open portal");
    } finally {
      setBusy(false);
    }
  }
  return (
    <button onClick={open} disabled={busy}
      className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent disabled:opacity-50">
      <Settings className="h-4 w-4" /> {lang === "ar" ? "إدارة الاشتراك" : "Manage subscription"}
    </button>
  );
}

