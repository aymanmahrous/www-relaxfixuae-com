import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useSettings, type Service, type Plan } from "@/lib/settings";
import { THEME_PRESETS } from "@/lib/themes";
import { useAuth, signOut } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus, Trash2, RotateCcw, Save, Settings as Cog, ShoppingCart, Users, Image as ImageIcon,
  MessageSquare, ShieldAlert, Upload, Eye, EyeOff, BarChart3, Sparkles, Search, Bell,
  LogOut, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, DollarSign, CreditCard,
  Activity, ArrowUpRight, Menu, Home, FileText, Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Control Center" }] }),
  component: AdminPage,
});

type Tab =
  | "overview" | "analytics" | "orders" | "subscriptions" | "leads"
  | "portfolio" | "customers" | "settings";

const STYLES = ["modern", "luxury", "playful", "minimal", "retro", "cyberpunk"];
const ICONS = ["ImageIcon", "PenTool", "Film", "Sparkles", "Megaphone", "Camera", "Package", "TrendingUp"];
const input = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-pink transition";

function AdminPage() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [bootstrapping, setBootstrapping] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  async function claimAdmin() {
    if (!user) return;
    setBootstrapping(true);
    const { count } = await supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin");
    if ((count ?? 0) === 0) {
      const { error } = await supabase.from("user_roles").insert({ user_id: user.id, role: "admin" });
      if (!error) { toast.success(lang === "ar" ? "تم منحك صلاحيات المشرف" : "You are now admin"); window.location.reload(); }
      else toast.error(error.message);
    } else {
      toast.error(lang === "ar" ? "يوجد مشرف بالفعل" : "An admin already exists");
    }
    setBootstrapping(false);
  }

  if (loading || !user) {
    return <div className="grid min-h-screen place-items-center bg-background"><Sparkles className="h-6 w-6 animate-pulse text-brand-pink" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <main className="mx-auto max-w-md px-4 py-20 text-center">
          <ShieldAlert className="mx-auto h-16 w-16 text-brand-amber" />
          <h1 className="mt-4 text-2xl font-bold">{lang === "ar" ? "غير مصرّح" : "Not authorized"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ar" ? "هذه الصفحة للمشرفين فقط. إذا كنت مالك التطبيق، اضغط الزر أدناه."
              : "Admin-only page. If you're the owner, claim admin access below."}
          </p>
          <button onClick={claimAdmin} disabled={bootstrapping}
            className="mt-6 rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold text-black disabled:opacity-50">
            {bootstrapping ? "…" : lang === "ar" ? "احصل على صلاحيات المشرف" : "Claim admin access"}
          </button>
          <Link to="/dashboard" className="mt-4 block text-xs text-muted-foreground hover:text-foreground">
            ← {lang === "ar" ? "لوحتي" : "My dashboard"}
          </Link>
        </main>
      </div>
    );
  }

  const navGroups: { label: string; items: { id: Tab; icon: any; label: string }[] }[] = [
    {
      label: lang === "ar" ? "نظرة عامة" : "Overview",
      items: [
        { id: "overview", icon: Home, label: lang === "ar" ? "اللوحة الرئيسية" : "Dashboard" },
        { id: "analytics", icon: BarChart3, label: lang === "ar" ? "التحليلات" : "Analytics" },
      ],
    },
    {
      label: lang === "ar" ? "المبيعات" : "Commerce",
      items: [
        { id: "orders", icon: ShoppingCart, label: lang === "ar" ? "الطلبات" : "Orders" },
        { id: "subscriptions", icon: CreditCard, label: lang === "ar" ? "الاشتراكات" : "Subscriptions" },
        { id: "leads", icon: MessageSquare, label: lang === "ar" ? "العملاء المحتملون" : "Leads" },
      ],
    },
    {
      label: lang === "ar" ? "المحتوى" : "Content",
      items: [
        { id: "portfolio", icon: ImageIcon, label: lang === "ar" ? "معرض الأعمال" : "Portfolio" },
        { id: "customers", icon: Users, label: lang === "ar" ? "العملاء" : "Customers" },
      ],
    },
    {
      label: lang === "ar" ? "النظام" : "System",
      items: [{ id: "settings", icon: Cog, label: lang === "ar" ? "الإعدادات" : "Settings" }],
    },
  ];

  const currentTab = navGroups.flatMap(g => g.items).find(i => i.id === tab);

  return (
    <div className="flex min-h-screen bg-[hsl(var(--background))] text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 z-40 flex flex-col border-r border-border bg-card/80 backdrop-blur-xl transition-all duration-300 lg:sticky lg:top-0 lg:h-screen
          ${collapsed ? "lg:w-[72px]" : "lg:w-64"}
          ${mobileOpen ? "left-0 w-64" : "-left-64 w-64"} lg:left-0`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand text-black shadow-lg shadow-brand-pink/20">
            <Sparkles className="h-4 w-4" />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-bold tracking-tight">Control Center</div>
              <div className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">Pixel & Reel</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((g, gi) => (
            <div key={gi} className="mb-5">
              {!collapsed && (
                <div className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{g.label}</div>
              )}
              <div className="space-y-0.5">
                {g.items.map(item => {
                  const Icon = item.icon;
                  const active = tab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setTab(item.id); setMobileOpen(false); }}
                      title={collapsed ? item.label : undefined}
                      className={`group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition
                        ${active
                          ? "bg-gradient-to-r from-brand-pink/20 to-brand-amber/10 text-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${active ? "text-brand-pink" : ""}`} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {active && !collapsed && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-pink shadow-[0_0_8px_hsl(var(--brand-pink))]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <div className={`flex items-center gap-2 rounded-lg p-2 ${collapsed ? "justify-center" : ""}`}>
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-pink to-brand-amber text-xs font-bold text-black">
              {(user.email?.[0] || "A").toUpperCase()}
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold">{user.email}</div>
                  <div className="text-[10px] text-brand-pink">Admin</div>
                </div>
                <button onClick={() => signOut().then(() => navigate({ to: "/" }))}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground" title="Sign out">
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
          <button onClick={() => setCollapsed(c => !c)}
            className="mt-2 hidden w-full items-center justify-center gap-1 rounded-md py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-foreground lg:flex">
            {collapsed ? <ChevronRight className="h-3 w-3" /> : <><ChevronLeft className="h-3 w-3" /> Collapse</>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-6">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden rounded-lg p-2 hover:bg-accent"><Menu className="h-5 w-5" /></button>
          <div>
            <h1 className="text-lg font-bold tracking-tight">{currentTab?.label}</h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {lang === "ar" ? "تحكم كامل في كل شيء" : "Full control over everything"}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={lang === "ar" ? "بحث…" : "Search…"}
                className="w-64 rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-pink" />
            </div>
            <button className="relative rounded-lg border border-border bg-background p-2 hover:bg-accent">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-pink" />
            </button>
            <Link to="/" className="hidden rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold hover:bg-accent md:inline-block">
              {lang === "ar" ? "← الموقع" : "← Site"}
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8">
          {tab === "overview" && <OverviewTab onNav={setTab} />}
          {tab === "analytics" && <AnalyticsTab />}
          {tab === "orders" && <OrdersTab search={search} />}
          {tab === "subscriptions" && <SubscriptionsTab />}
          {tab === "leads" && <LeadsTab search={search} />}
          {tab === "portfolio" && <PortfolioTab />}
          {tab === "customers" && <CustomersTab search={search} />}
          {tab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

/* ============== OVERVIEW ============== */
function OverviewTab({ onNav }: { onNav: (t: Tab) => void }) {
  const { lang } = useI18n();
  const [data, setData] = useState<{ orders: any[]; leads: any[]; subs: number; customers: number; portfolio: number }>({
    orders: [], leads: [], subs: 0, customers: 0, portfolio: 0,
  });

  useEffect(() => {
    Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
    ]).then(([o, l, s, c, p]) => {
      setData({
        orders: o.data || [],
        leads: l.data || [],
        subs: s.count ?? 0,
        customers: c.count ?? 0,
        portfolio: p.count ?? 0,
      });
    });
  }, []);

  const revenue = data.orders.filter(x => x.status === "paid").reduce((a, x) => a + (x.amount_cents || 0), 0);
  const pendingOrders = data.orders.filter(x => x.status === "pending").length;
  const newLeads = data.leads.filter(l => l.status === "new").length;

  // 30-day revenue chart
  const chartData = useMemo(() => {
    const days: { date: string; revenue: number; orders: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key.slice(5), revenue: 0, orders: 0 });
    }
    data.orders.forEach(o => {
      const k = new Date(o.created_at).toISOString().slice(5, 10);
      const day = days.find(d => d.date === k);
      if (day) { day.orders++; if (o.status === "paid") day.revenue += (o.amount_cents || 0) / 100; }
    });
    return days;
  }, [data.orders]);

  const statusBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    data.orders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data.orders]);

  const COLORS = ["hsl(330 84% 60%)", "hsl(43 96% 56%)", "hsl(142 71% 45%)", "hsl(217 91% 60%)", "hsl(271 81% 65%)", "hsl(0 84% 60%)"];

  const stats = [
    { label: lang === "ar" ? "إجمالي الإيرادات" : "Revenue", value: `$${(revenue / 100).toLocaleString()}`, icon: DollarSign, trend: "+12%", up: true, accent: "from-emerald-500/20 to-emerald-500/5", ring: "ring-emerald-500/20" },
    { label: lang === "ar" ? "الطلبات" : "Orders", value: data.orders.length, icon: ShoppingCart, trend: `${pendingOrders} pending`, up: true, accent: "from-brand-pink/20 to-brand-pink/5", ring: "ring-brand-pink/20" },
    { label: lang === "ar" ? "الاشتراكات النشطة" : "Active subs", value: data.subs, icon: CreditCard, trend: "MRR", up: true, accent: "from-brand-amber/20 to-brand-amber/5", ring: "ring-brand-amber/20" },
    { label: lang === "ar" ? "عملاء جدد" : "New leads", value: newLeads, icon: Activity, trend: `${data.leads.length} total`, up: true, accent: "from-blue-500/20 to-blue-500/5", ring: "ring-blue-500/20" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero greeting */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-pink/10 via-card to-brand-amber/10 p-6">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-pink/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-amber/20 blur-3xl" />
        <div className="relative">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-pink">{lang === "ar" ? "أهلاً بعودتك" : "Welcome back"}</div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{lang === "ar" ? "إليك ما يحدث اليوم 👋" : "Here's what's happening today 👋"}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <QuickAction icon={Zap} label={lang === "ar" ? "إضافة عمل" : "Add work"} onClick={() => onNav("portfolio")} />
            <QuickAction icon={MessageSquare} label={lang === "ar" ? "مراجعة العملاء" : "Review leads"} onClick={() => onNav("leads")} />
            <QuickAction icon={Cog} label={lang === "ar" ? "الإعدادات" : "Settings"} onClick={() => onNav("settings")} />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${s.accent} p-5 ring-1 ${s.ring} transition hover:-translate-y-0.5 hover:shadow-xl`}>
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-background/60 backdrop-blur">
                <s.icon className="h-5 w-5" />
              </div>
              <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${s.up ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {s.trend}
              </div>
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight">{s.value}</div>
            <div className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold">{lang === "ar" ? "الإيرادات — آخر 30 يوم" : "Revenue — last 30 days"}</h3>
              <p className="text-xs text-muted-foreground">{lang === "ar" ? "الطلبات المدفوعة" : "Paid orders only"}</p>
            </div>
            <span className="text-2xl font-bold text-gradient">${(revenue / 100).toFixed(2)}</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(330 84% 60%)" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="hsl(330 84% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(330 84% 60%)" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-4 font-bold">{lang === "ar" ? "حالات الطلبات" : "Order status"}</h3>
          {statusBreakdown.length === 0 ? (
            <div className="grid h-[240px] place-items-center text-sm text-muted-foreground">{lang === "ar" ? "لا توجد بيانات" : "No data"}</div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={statusBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={2}>
                  {statusBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentList
          title={lang === "ar" ? "أحدث الطلبات" : "Recent orders"}
          items={data.orders.slice(0, 5).map(o => ({
            id: o.id,
            title: o.customer_email || o.customer_name || "Anonymous",
            sub: o.service_summary || o.price_id,
            right: `$${(o.amount_cents / 100).toFixed(2)}`,
            badge: o.status,
          }))}
          onAll={() => onNav("orders")}
          empty={lang === "ar" ? "لا توجد طلبات بعد" : "No orders yet"}
        />
        <RecentList
          title={lang === "ar" ? "أحدث العملاء المحتملين" : "Recent leads"}
          items={data.leads.slice(0, 5).map(l => ({
            id: l.id,
            title: l.name || l.contact,
            sub: l.service || l.message?.slice(0, 50) || "—",
            right: new Date(l.created_at).toLocaleDateString(),
            badge: l.status,
          }))}
          onAll={() => onNav("leads")}
          empty={lang === "ar" ? "لا يوجد عملاء بعد" : "No leads yet"}
        />
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold backdrop-blur hover:bg-accent">
      <Icon className="h-3 w-3" /> {label}
    </button>
  );
}

function RecentList({ title, items, onAll, empty }: { title: string; items: any[]; onAll: () => void; empty: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold">{title}</h3>
        <button onClick={onAll} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-pink hover:underline">
          View all <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
      {items.length === 0 ? (
        <div className="grid h-32 place-items-center text-sm text-muted-foreground">{empty}</div>
      ) : (
        <div className="space-y-2">
          {items.map(it => (
            <div key={it.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-background/50 p-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{it.title}</div>
                <div className="truncate text-xs text-muted-foreground">{it.sub}</div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-sm font-bold">{it.right}</span>
                <Badge value={it.badge} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Badge({ value }: { value: string }) {
  const map: Record<string, string> = {
    paid: "bg-emerald-500/20 text-emerald-400",
    new: "bg-blue-500/20 text-blue-400",
    pending: "bg-brand-amber/20 text-brand-amber",
    contacted: "bg-violet-500/20 text-violet-400",
    won: "bg-emerald-500/20 text-emerald-400",
    lost: "bg-rose-500/20 text-rose-400",
    refunded: "bg-rose-500/20 text-rose-400",
    cancelled: "bg-rose-500/20 text-rose-400",
    delivered: "bg-emerald-500/20 text-emerald-400",
    in_progress: "bg-blue-500/20 text-blue-400",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${map[value] || "bg-muted text-muted-foreground"}`}>{value}</span>;
}

/* ============== ANALYTICS ============== */
function AnalyticsTab() {
  const { lang } = useI18n();
  const [orders, setOrders] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(1000),
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(1000),
    ]).then(([o, l]) => { setOrders(o.data || []); setLeads(l.data || []); });
  }, []);

  const monthly = useMemo(() => {
    const map: Record<string, { month: string; revenue: number; orders: number; leads: number }> = {};
    const months: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i);
      const key = d.toLocaleString("en", { month: "short" });
      months.push(key); map[key] = { month: key, revenue: 0, orders: 0, leads: 0 };
    }
    orders.forEach(o => {
      const k = new Date(o.created_at).toLocaleString("en", { month: "short" });
      if (map[k]) { map[k].orders++; if (o.status === "paid") map[k].revenue += (o.amount_cents || 0) / 100; }
    });
    leads.forEach(l => {
      const k = new Date(l.created_at).toLocaleString("en", { month: "short" });
      if (map[k]) map[k].leads++;
    });
    return months.map(m => map[m]);
  }, [orders, leads]);

  const sources = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach(l => { const k = l.source || "website"; counts[k] = (counts[k] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const conversion = leads.length > 0 ? ((leads.filter(l => l.status === "won").length / leads.length) * 100).toFixed(1) : "0";
  const avgOrder = orders.filter(o => o.status === "paid").length > 0
    ? (orders.filter(o => o.status === "paid").reduce((a, o) => a + o.amount_cents, 0) / orders.filter(o => o.status === "paid").length / 100).toFixed(2)
    : "0";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <KPICard label={lang === "ar" ? "معدل التحويل" : "Conversion rate"} value={`${conversion}%`} icon={TrendingUp} />
        <KPICard label={lang === "ar" ? "متوسط الطلب" : "Avg order value"} value={`$${avgOrder}`} icon={DollarSign} />
        <KPICard label={lang === "ar" ? "إجمالي العملاء" : "Total leads"} value={leads.length} icon={Activity} />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 font-bold">{lang === "ar" ? "الأداء الشهري (6 شهور)" : "Monthly performance (6 mo)"}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="revenue" fill="hsl(330 84% 60%)" name="Revenue $" radius={[6, 6, 0, 0]} />
            <Bar dataKey="orders" fill="hsl(43 96% 56%)" name="Orders" radius={[6, 6, 0, 0]} />
            <Bar dataKey="leads" fill="hsl(217 91% 60%)" name="Leads" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 font-bold">{lang === "ar" ? "مصادر العملاء" : "Lead sources"}</h3>
        {sources.length === 0
          ? <div className="grid h-40 place-items-center text-sm text-muted-foreground">{lang === "ar" ? "لا توجد بيانات" : "No data"}</div>
          : <ResponsiveContainer width="100%" height={240}>
              <BarChart data={sources} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={100} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="hsl(330 84% 60%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>}
      </div>
    </div>
  );
}

function KPICard({ label, value, icon: Icon }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-brand-pink" />
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

/* ============== ORDERS ============== */
function OrdersTab({ search }: { search: string }) {
  const { lang } = useI18n();
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");

  async function load() {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(500);
    setOrders(data || []);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Updated"); load(); }
  }
  async function del(id: string) {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  }

  const filtered = orders
    .filter(o => filter === "all" || o.status === filter)
    .filter(o => !search || [o.customer_email, o.customer_name, o.service_summary, o.price_id].some(x => x?.toLowerCase().includes(search.toLowerCase())));

  const statuses = ["all", "pending", "paid", "in_progress", "delivered", "refunded", "cancelled"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${filter === s ? "bg-gradient-brand text-black" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>
            {s} {s !== "all" && <span className="ml-1 opacity-60">({orders.filter(o => o.status === s).length})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? <Empty msg={lang === "ar" ? "لا توجد طلبات" : "No orders"} /> : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr><Th>Date</Th><Th>Customer</Th><Th>Product</Th><Th>Amount</Th><Th>Status</Th><Th></Th></tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="border-t border-border hover:bg-muted/20">
                  <Td>{new Date(o.created_at).toLocaleDateString()}</Td>
                  <Td className="font-medium">{o.customer_email || o.customer_name || "—"}</Td>
                  <Td className="text-muted-foreground">{o.service_summary || o.price_id}</Td>
                  <Td className="font-bold">${(o.amount_cents / 100).toFixed(2)}</Td>
                  <Td>
                    <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="rounded border border-border bg-background px-2 py-1 text-xs">
                      {["pending", "paid", "in_progress", "delivered", "refunded", "cancelled"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </Td>
                  <Td><button onClick={() => del(o.id)} className="rounded p-1 text-rose-400 hover:bg-rose-400/10"><Trash2 className="h-3.5 w-3.5" /></button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ============== SUBSCRIPTIONS ============== */
function SubscriptionsTab() {
  const { lang } = useI18n();
  const [subs, setSubs] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("subscriptions").select("*").order("created_at", { ascending: false }).limit(500).then(({ data }) => setSubs(data || []));
  }, []);

  if (subs.length === 0) return <Empty msg={lang === "ar" ? "لا توجد اشتراكات بعد" : "No subscriptions yet"} />;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
          <tr><Th>Started</Th><Th>Customer</Th><Th>Plan</Th><Th>Status</Th><Th>Period end</Th><Th>Env</Th></tr>
        </thead>
        <tbody>
          {subs.map(s => (
            <tr key={s.id} className="border-t border-border hover:bg-muted/20">
              <Td>{new Date(s.created_at).toLocaleDateString()}</Td>
              <Td className="font-mono text-xs">{s.user_id?.slice(0, 8)}…</Td>
              <Td>{s.price_id}</Td>
              <Td><Badge value={s.status} /></Td>
              <Td>{s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : "—"}</Td>
              <Td><span className="rounded bg-muted px-2 py-0.5 text-[10px]">{s.environment}</span></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============== LEADS ============== */
function LeadsTab({ search }: { search: string }) {
  const { lang } = useI18n();
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  async function load() {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(500);
    setLeads(data || []);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from("leads").update({ status }).eq("id", id); load();
  }
  async function del(id: string) {
    if (!confirm("Delete?")) return;
    await supabase.from("leads").delete().eq("id", id); load();
  }

  const filtered = leads
    .filter(l => filter === "all" || l.status === filter)
    .filter(l => !search || [l.name, l.contact, l.service, l.message].some(x => x?.toLowerCase().includes(search.toLowerCase())));

  const statuses = ["all", "new", "contacted", "won", "lost"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${filter === s ? "bg-gradient-brand text-black" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>
            {s} {s !== "all" && <span className="ml-1 opacity-60">({leads.filter(l => l.status === s).length})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? <Empty msg={lang === "ar" ? "لا يوجد عملاء" : "No leads"} /> : (
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map(l => (
            <div key={l.id} className="rounded-2xl border border-border bg-card p-4 transition hover:border-brand-pink/40">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-bold">{l.name || "—"}</div>
                    <Badge value={l.status} />
                  </div>
                  <a href={l.contact.includes("@") ? `mailto:${l.contact}` : `https://wa.me/${l.contact.replace(/\D/g, "")}`}
                    className="text-xs text-brand-amber hover:underline">{l.contact}</a>
                  {l.service && <div className="mt-1 text-xs text-muted-foreground">{l.service}</div>}
                  {l.message && <p className="mt-2 text-sm">{l.message}</p>}
                  <div className="mt-2 text-[10px] uppercase text-muted-foreground">{new Date(l.created_at).toLocaleString()} · {l.source}</div>
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)}
                    className="rounded border border-border bg-background px-2 py-1 text-xs">
                    {["new", "contacted", "won", "lost"].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <button onClick={() => del(l.id)} className="rounded border border-rose-400/30 px-2 py-1 text-rose-400 hover:bg-rose-400/10"><Trash2 className="mx-auto h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============== PORTFOLIO ============== */
function PortfolioTab() {
  const { lang } = useI18n();
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title_en: "", title_ar: "", description_en: "", description_ar: "", category: "design" });

  async function load() {
    const { data } = await supabase.from("portfolio_items").select("*").order("display_order").order("created_at", { ascending: false });
    setItems(data || []);
  }
  useEffect(() => { load(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    if (!form.title_en) { toast.error("Add title first"); return; }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("portfolio").upload(path, file);
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("portfolio").getPublicUrl(path);
      const { error } = await supabase.from("portfolio_items").insert({
        ...form, media_url: pub.publicUrl,
        media_type: file.type.startsWith("video") ? "video" : "image", published: true,
      });
      if (error) throw error;
      toast.success("Added");
      setForm({ title_en: "", title_ar: "", description_en: "", description_ar: "", category: "design" });
      load();
    } catch (err: any) { toast.error(err.message); }
    finally { setUploading(false); e.target.value = ""; }
  }

  async function togglePublished(id: string, published: boolean) {
    await supabase.from("portfolio_items").update({ published: !published }).eq("id", id); load();
  }
  async function del(id: string) {
    if (!confirm("Delete?")) return;
    await supabase.from("portfolio_items").delete().eq("id", id); load();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 font-bold">{lang === "ar" ? "إضافة عمل جديد" : "Add new work"}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className={input} placeholder="Title (EN)" value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
          <input className={input} dir="rtl" placeholder="العنوان" value={form.title_ar} onChange={e => setForm({ ...form, title_ar: e.target.value })} />
          <input className={input} placeholder="Description (EN)" value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} />
          <input className={input} dir="rtl" placeholder="الوصف" value={form.description_ar} onChange={e => setForm({ ...form, description_ar: e.target.value })} />
          <select className={input} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {["design", "video", "branding", "social", "motion"].map(c => <option key={c}>{c}</option>)}
          </select>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-pink/40 bg-brand-pink/5 px-3 py-2 text-sm font-semibold hover:bg-brand-pink/10">
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : (lang === "ar" ? "ارفع صورة أو فيديو" : "Upload image/video")}
            <input type="file" accept="image/*,video/*" disabled={uploading} onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>

      {items.length === 0 ? <Empty msg={lang === "ar" ? "لا توجد أعمال" : "No items"} /> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(it => (
            <div key={it.id} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-square bg-muted">
                {it.media_type === "video"
                  ? <video src={it.media_url} className="h-full w-full object-cover" />
                  : <img src={it.media_url} className="h-full w-full object-cover transition group-hover:scale-105" />}
              </div>
              <div className="p-3">
                <div className="truncate text-sm font-semibold">{it.title_en}</div>
                <div className="text-xs text-muted-foreground">{it.category}</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => togglePublished(it.id, it.published)} className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-background px-2 py-1 text-xs hover:bg-accent">
                    {it.published ? <><Eye className="h-3 w-3" /> Live</> : <><EyeOff className="h-3 w-3" /> Hidden</>}
                  </button>
                  <button onClick={() => del(it.id)} className="rounded-lg border border-rose-400/30 px-2 py-1 text-rose-400 hover:bg-rose-400/10"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============== CUSTOMERS ============== */
function CustomersTab({ search }: { search: string }) {
  const { lang } = useI18n();
  const [customers, setCustomers] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(500).then(({ data }) => setCustomers(data || []));
  }, []);
  const filtered = customers.filter(c => !search || [c.display_name, c.phone].some(x => x?.toLowerCase().includes(search.toLowerCase())));

  if (filtered.length === 0) return <Empty msg={lang === "ar" ? "لا يوجد عملاء" : "No customers"} />;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map(c => (
        <div key={c.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-pink to-brand-amber text-lg font-bold text-black">
            {(c.display_name?.[0] || "?").toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold">{c.display_name || "—"}</div>
            <div className="truncate text-xs text-muted-foreground">{c.phone || "No phone"}</div>
            <div className="text-[10px] uppercase text-muted-foreground">Joined {new Date(c.created_at).toLocaleDateString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============== SETTINGS ============== */
function SettingsTab() {
  const { lang } = useI18n();
  const { settings, update, reset } = useSettings();

  function patchService(id: string, p: Partial<Service>) { update({ services: settings.services.map(s => s.id === id ? { ...s, ...p } : s) }); }
  function addService() { update({ services: [...settings.services, { id: `s${Date.now()}`, icon: "Sparkles", titleEn: "New", titleAr: "جديد", descEn: "", descAr: "" }] }); }
  function deleteService(id: string) { update({ services: settings.services.filter(s => s.id !== id) }); }
  function patchPlan(id: string, p: Partial<Plan>) { update({ plans: settings.plans.map(pl => pl.id === id ? { ...pl, ...p } : pl) }); }
  function addPlan() { update({ plans: [...settings.plans, { id: `p${Date.now()}`, nameEn: "New", nameAr: "جديد", price: "$0", popular: false, featuresEn: [], featuresAr: [] }] }); }
  function deletePlan(id: string) { update({ plans: settings.plans.filter(p => p.id !== id) }); }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-end gap-2">
        <button onClick={() => { if (confirm("Reset?")) { reset(); toast.success("Reset"); } }}
          className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button onClick={() => toast.success(lang === "ar" ? "محفوظ" : "Saved")}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-bold text-black">
          <Save className="h-4 w-4" /> Save
        </button>
      </div>

      <Section title={lang === "ar" ? "العلامة التجارية والاتصال" : "Brand & contact"}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Brand (EN)"><input className={input} value={settings.brandEn} onChange={e => update({ brandEn: e.target.value })} /></Field>
          <Field label="العلامة"><input className={input} dir="rtl" value={settings.brandAr} onChange={e => update({ brandAr: e.target.value })} /></Field>
          <Field label="Built by"><input className={input} value={settings.builtBy} onChange={e => update({ builtBy: e.target.value })} /></Field>
          <Field label="Email"><input className={input} value={settings.email} onChange={e => update({ email: e.target.value })} /></Field>
          <Field label="WhatsApp"><input className={input} placeholder="971588259848" value={settings.whatsapp} onChange={e => update({ whatsapp: e.target.value })} /></Field>
          <Field label="Telegram"><input className={input} value={settings.telegram} onChange={e => update({ telegram: e.target.value })} /></Field>
          <Field label="WhatsApp floating button">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={settings.whatsappFab} onChange={e => update({ whatsappFab: e.target.checked })} />
              {lang === "ar" ? "إظهار الزر العائم" : "Show floating button"}
            </label>
          </Field>
        </div>
      </Section>

      <Section title={lang === "ar" ? "التتبع والإعلانات" : "Tracking & ads"}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Google Analytics ID"><input className={input} placeholder="G-XXXXXXXXXX" value={settings.gaId} onChange={e => update({ gaId: e.target.value })} /></Field>
          <Field label="Meta Pixel ID"><input className={input} placeholder="1234567890" value={settings.metaPixelId} onChange={e => update({ metaPixelId: e.target.value })} /></Field>
        </div>
      </Section>

      <Section title={lang === "ar" ? "المظهر" : "Appearance"}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Accent color">
            <div className="flex items-center gap-2">
              <input type="color" value={settings.accent} onChange={e => update({ accent: e.target.value })} className="h-10 w-14 rounded-lg border border-border bg-background" />
              <input className={input} value={settings.accent} onChange={e => update({ accent: e.target.value })} />
            </div>
          </Field>
          <Field label={`UI scale (${Math.round(settings.uiScale * 100)}%)`}>
            <input type="range" min={0.85} max={1.25} step={0.05} value={settings.uiScale} onChange={e => update({ uiScale: parseFloat(e.target.value) })} className="mt-3 w-full accent-brand-pink" />
          </Field>
          <Field label="Welcome credits">
            <input type="number" min={0} max={50} className={input} value={settings.welcomeCredits} onChange={e => update({ welcomeCredits: parseInt(e.target.value, 10) || 0 })} />
          </Field>
          <Field label="Default style">
            <select className={input} value={settings.defaultStyle} onChange={e => update({ defaultStyle: e.target.value })}>
              {STYLES.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Default ratio">
            <select className={input} value={settings.defaultRatio} onChange={e => update({ defaultRatio: e.target.value as any })}>
              {["1:1", "9:16", "16:9", "4:5"].map(r => <option key={r}>{r}</option>)}
            </select>
          </Field>
        </div>
      </Section>

      <Section title={lang === "ar" ? "العرض الترويجي" : "Promo banner"}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Enabled">
            <label className="mt-2 inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={settings.offer.enabled} onChange={e => update({ offer: { ...settings.offer, enabled: e.target.checked } })} />
              {settings.offer.enabled ? "Visible" : "Hidden"}
            </label>
          </Field>
          <Field label="Code"><input className={input} value={settings.offer.code} onChange={e => update({ offer: { ...settings.offer, code: e.target.value } })} /></Field>
          <Field label="Title (EN)"><input className={input} value={settings.offer.titleEn} onChange={e => update({ offer: { ...settings.offer, titleEn: e.target.value } })} /></Field>
          <Field label="العنوان"><input className={input} dir="rtl" value={settings.offer.titleAr} onChange={e => update({ offer: { ...settings.offer, titleAr: e.target.value } })} /></Field>
          <Field label="Discount %"><input type="number" min={0} max={100} className={input} value={settings.offer.discount} onChange={e => update({ offer: { ...settings.offer, discount: parseInt(e.target.value, 10) || 0 } })} /></Field>
          <Field label={lang === "ar" ? "ينتهي في" : "Expires at"}>
            <input type="datetime-local" className={input}
              value={settings.offer.expiresAt ? new Date(settings.offer.expiresAt).toISOString().slice(0, 16) : ""}
              onChange={e => update({ offer: { ...settings.offer, expiresAt: e.target.value ? new Date(e.target.value).toISOString() : undefined } })} />
          </Field>
        </div>
      </Section>

      <Section title={lang === "ar" ? "🎨 قوالب جاهزة" : "🎨 Theme presets"}>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {THEME_PRESETS.map(p => (
            <button key={p.id}
              onClick={() => { update({ accent: p.accent, uiScale: p.uiScale, defaultStyle: p.defaultStyle }); toast.success(lang === "ar" ? `تم: ${p.nameAr}` : `Applied: ${p.nameEn}`); }}
              className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 text-start transition hover:-translate-y-0.5 hover:border-brand-pink/50">
              <span className="h-10 w-10 shrink-0 rounded-lg border border-border" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}90)` }} />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{lang === "ar" ? p.nameAr : p.nameEn}</div>
                <div className="truncate text-[10px] text-muted-foreground">{p.accent}</div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section title={lang === "ar" ? "الخدمات" : "Services"}>
        <div className="space-y-3">
          {settings.services.map(s => (
            <div key={s.id} className="rounded-xl border border-border bg-background p-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <input className={input} placeholder="Title (EN)" value={s.titleEn} onChange={e => patchService(s.id, { titleEn: e.target.value })} />
                <input className={input} dir="rtl" placeholder="العنوان" value={s.titleAr} onChange={e => patchService(s.id, { titleAr: e.target.value })} />
                <input className={input} placeholder="Desc (EN)" value={s.descEn} onChange={e => patchService(s.id, { descEn: e.target.value })} />
                <input className={input} dir="rtl" placeholder="الوصف" value={s.descAr} onChange={e => patchService(s.id, { descAr: e.target.value })} />
                <select className={input} value={s.icon} onChange={e => patchService(s.id, { icon: e.target.value })}>
                  {ICONS.map(i => <option key={i}>{i}</option>)}
                </select>
                <button onClick={() => deleteService(s.id)} className="inline-flex w-fit items-center gap-1 rounded-lg border border-destructive/40 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
          <button onClick={addService} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">
            <Plus className="h-4 w-4" /> Add service
          </button>
        </div>
      </Section>

      <Section title={lang === "ar" ? "الباقات" : "Plans"}>
        <div className="space-y-3">
          {settings.plans.map(p => (
            <div key={p.id} className="rounded-xl border border-border bg-background p-3">
              <div className="grid gap-2 sm:grid-cols-3">
                <input className={input} placeholder="Name (EN)" value={p.nameEn} onChange={e => patchPlan(p.id, { nameEn: e.target.value })} />
                <input className={input} dir="rtl" placeholder="الاسم" value={p.nameAr} onChange={e => patchPlan(p.id, { nameAr: e.target.value })} />
                <input className={input} placeholder="Price" value={p.price} onChange={e => patchPlan(p.id, { price: e.target.value })} />
                <input className={input} placeholder="Stripe priceId" value={p.priceId || ""} onChange={e => patchPlan(p.id, { priceId: e.target.value })} />
                <textarea rows={3} className={input} placeholder="Features (EN)" value={p.featuresEn.join("\n")} onChange={e => patchPlan(p.id, { featuresEn: e.target.value.split("\n").filter(Boolean) })} />
                <textarea rows={3} dir="rtl" className={input} placeholder="المزايا" value={p.featuresAr.join("\n")} onChange={e => patchPlan(p.id, { featuresAr: e.target.value.split("\n").filter(Boolean) })} />
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={p.popular} onChange={e => patchPlan(p.id, { popular: e.target.checked })} /> Popular
                </label>
                <button onClick={() => deletePlan(p.id)} className="inline-flex w-fit items-center gap-1 rounded-lg border border-destructive/40 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
          <button onClick={addPlan} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">
            <Plus className="h-4 w-4" /> Add plan
          </button>
        </div>
      </Section>
    </div>
  );
}

/* === helpers === */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-5"><h2 className="mb-4 text-lg font-bold text-gradient">{title}</h2>{children}</div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>;
}
function Th({ children }: { children?: React.ReactNode }) { return <th className="px-4 py-3 text-left font-semibold">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <td className={`px-4 py-3 ${className}`}>{children}</td>; }
function Empty({ msg }: { msg: string }) {
  return <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card/30 p-16 text-center text-muted-foreground">
    <FileText className="mb-3 h-10 w-10 opacity-40" />
    <div>{msg}</div>
  </div>;
}
