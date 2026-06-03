import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";
import { useSettings, type Service, type Plan } from "@/lib/settings";
import { THEME_PRESETS } from "@/lib/themes";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, RotateCcw, Save, Settings as Cog, ShoppingCart, Users, Image as ImageIcon, MessageSquare, ShieldAlert, Upload, Eye, EyeOff, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Control Panel — Pixel & Reel" }] }),
  component: AdminPage,
});

type Tab = "overview" | "orders" | "leads" | "portfolio" | "customers" | "settings";

const ICONS = ["ImageIcon", "PenTool", "Film", "Sparkles", "Megaphone", "Camera", "Package", "TrendingUp"];
const STYLES = ["modern", "luxury", "playful", "minimal", "retro", "cyberpunk"];
const input = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-pink";

function AdminPage() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [bootstrapping, setBootstrapping] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  // Allow the very first user to claim admin (bootstrap)
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

  if (loading || !user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-md px-4 py-20 text-center">
          <ShieldAlert className="mx-auto h-16 w-16 text-brand-amber" />
          <h1 className="mt-4 text-2xl font-bold">{lang === "ar" ? "غير مصرّح" : "Not authorized"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ar" ? "هذه الصفحة للمشرفين فقط. إذا كنت مالك التطبيق، اضغط الزر أدناه للحصول على الصلاحيات (مرة واحدة فقط)."
              : "This page is admin-only. If you're the owner, claim admin access once below."}
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

  const tabs: { id: Tab; icon: any; label: string }[] = [
    { id: "overview", icon: BarChart3, label: lang === "ar" ? "نظرة عامة" : "Overview" },
    { id: "orders", icon: ShoppingCart, label: lang === "ar" ? "الطلبات" : "Orders" },
    { id: "leads", icon: MessageSquare, label: lang === "ar" ? "العملاء المحتملون" : "Leads" },
    { id: "portfolio", icon: ImageIcon, label: lang === "ar" ? "معرض الأعمال" : "Portfolio" },
    { id: "customers", icon: Users, label: lang === "ar" ? "العملاء" : "Customers" },
    { id: "settings", icon: Cog, label: lang === "ar" ? "الإعدادات" : "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-gradient">{lang === "ar" ? "لوحة التحكم الكاملة" : "Full Control Panel"}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{lang === "ar" ? "إدارة كاملة لكل شيء في التطبيق" : "Full control over everything in your app"}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-1 rounded-2xl border border-border bg-card p-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${tab === t.id ? "bg-gradient-brand text-black" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
              <t.icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "overview" && <OverviewTab />}
          {tab === "orders" && <OrdersTab />}
          {tab === "leads" && <LeadsTab />}
          {tab === "portfolio" && <PortfolioTab />}
          {tab === "customers" && <CustomersTab />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}

/* ===========  OVERVIEW =========== */
function OverviewTab() {
  const { lang } = useI18n();
  const [stats, setStats] = useState({ orders: 0, revenue: 0, leads: 0, subs: 0, customers: 0, portfolio: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("orders").select("amount_cents,status", { count: "exact" }),
      supabase.from("leads").select("id", { count: "exact", head: true }),
      supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
    ]).then(([o, l, s, c, p]) => {
      const revenue = (o.data || []).filter((x: any) => x.status === "paid").reduce((a: number, x: any) => a + (x.amount_cents || 0), 0);
      setStats({ orders: o.count ?? 0, revenue, leads: l.count ?? 0, subs: s.count ?? 0, customers: c.count ?? 0, portfolio: p.count ?? 0 });
    });
  }, []);

  const cards = [
    { label: lang === "ar" ? "إجمالي الإيرادات" : "Total revenue", value: `$${(stats.revenue / 100).toFixed(2)}`, color: "from-emerald-500/20 to-emerald-500/5" },
    { label: lang === "ar" ? "الطلبات" : "Orders", value: stats.orders, color: "from-brand-pink/20 to-brand-pink/5" },
    { label: lang === "ar" ? "الاشتراكات النشطة" : "Active subs", value: stats.subs, color: "from-brand-amber/20 to-brand-amber/5" },
    { label: lang === "ar" ? "العملاء المحتملون" : "Leads", value: stats.leads, color: "from-blue-500/20 to-blue-500/5" },
    { label: lang === "ar" ? "العملاء المسجّلون" : "Customers", value: stats.customers, color: "from-violet-500/20 to-violet-500/5" },
    { label: lang === "ar" ? "أعمال المعرض" : "Portfolio items", value: stats.portfolio, color: "from-orange-500/20 to-orange-500/5" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <div key={i} className={`rounded-2xl border border-border bg-gradient-to-br ${c.color} p-5`}>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
          <div className="mt-2 text-3xl font-bold">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ===========  ORDERS =========== */
function OrdersTab() {
  const { lang } = useI18n();
  const [orders, setOrders] = useState<any[]>([]);

  async function load() {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(200);
    setOrders(data || []);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    toast.success("Updated"); load();
  }
  async function del(id: string) {
    if (!confirm("Delete?")) return;
    await supabase.from("orders").delete().eq("id", id); load();
  }

  if (orders.length === 0) return <Empty msg={lang === "ar" ? "لا توجد طلبات بعد" : "No orders yet"} />;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
          <tr><Th>Date</Th><Th>Customer</Th><Th>Product</Th><Th>Amount</Th><Th>Status</Th><Th>Actions</Th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t border-border">
              <Td>{new Date(o.created_at).toLocaleDateString()}</Td>
              <Td>{o.customer_email || o.customer_name || "—"}</Td>
              <Td>{o.service_summary || o.price_id}</Td>
              <Td>${(o.amount_cents / 100).toFixed(2)}</Td>
              <Td>
                <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="rounded border border-border bg-background px-2 py-1 text-xs">
                  {["pending", "paid", "in_progress", "delivered", "refunded", "cancelled"].map(s => <option key={s}>{s}</option>)}
                </select>
              </Td>
              <Td><button onClick={() => del(o.id)} className="text-rose-400 hover:text-rose-300"><Trash2 className="h-3.5 w-3.5" /></button></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===========  LEADS =========== */
function LeadsTab() {
  const { lang } = useI18n();
  const [leads, setLeads] = useState<any[]>([]);
  async function load() {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200);
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

  if (leads.length === 0) return <Empty msg={lang === "ar" ? "لا يوجد عملاء محتملون بعد" : "No leads yet"} />;

  return (
    <div className="space-y-2">
      {leads.map(l => (
        <div key={l.id} className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="font-semibold">{l.name || "—"} · <span className="text-brand-amber">{l.contact}</span></div>
              {l.service && <div className="text-xs text-muted-foreground">{l.service}</div>}
              {l.message && <p className="mt-2 text-sm">{l.message}</p>}
              <div className="mt-1 text-[10px] uppercase text-muted-foreground">{new Date(l.created_at).toLocaleString()} · {l.source}</div>
            </div>
            <div className="flex gap-2">
              <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)}
                className="rounded border border-border bg-background px-2 py-1 text-xs">
                {["new", "contacted", "won", "lost"].map(s => <option key={s}>{s}</option>)}
              </select>
              <button onClick={() => del(l.id)} className="rounded-lg border border-rose-400/30 px-2 py-1 text-rose-400 hover:bg-rose-400/10"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===========  PORTFOLIO CRUD =========== */
function PortfolioTab() {
  const { lang } = useI18n();
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title_en: "", title_ar: "", description_en: "", description_ar: "", category: "design", media_type: "image" });

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
        ...form,
        media_url: pub.publicUrl,
        media_type: file.type.startsWith("video") ? "video" : "image",
        published: true,
      });
      if (error) throw error;
      toast.success("Added");
      setForm({ title_en: "", title_ar: "", description_en: "", description_ar: "", category: "design", media_type: "image" });
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
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-3 font-bold">{lang === "ar" ? "إضافة عمل جديد" : "Add new work"}</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <input className={input} placeholder="Title (EN)" value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
          <input className={input} dir="rtl" placeholder="العنوان" value={form.title_ar} onChange={e => setForm({ ...form, title_ar: e.target.value })} />
          <input className={input} placeholder="Description (EN)" value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} />
          <input className={input} dir="rtl" placeholder="الوصف" value={form.description_ar} onChange={e => setForm({ ...form, description_ar: e.target.value })} />
          <select className={input} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {["design", "video", "branding", "social", "motion"].map(c => <option key={c}>{c}</option>)}
          </select>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-3 py-2 text-sm font-semibold hover:bg-accent">
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : (lang === "ar" ? "ارفع صورة أو فيديو" : "Upload image / video")}
            <input type="file" accept="image/*,video/*" disabled={uploading} onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>

      {items.length === 0 ? <Empty msg={lang === "ar" ? "لا توجد أعمال" : "No items"} /> : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(it => (
            <div key={it.id} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-square bg-muted">
                {it.media_type === "video"
                  ? <video src={it.media_url} className="h-full w-full object-cover" />
                  : <img src={it.media_url} className="h-full w-full object-cover" />}
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm">{it.title_en}</div>
                <div className="text-xs text-muted-foreground">{it.category}</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => togglePublished(it.id, it.published)} className="flex-1 rounded-lg border border-border bg-background px-2 py-1 text-xs hover:bg-accent">
                    {it.published ? <><Eye className="inline h-3 w-3" /> Published</> : <><EyeOff className="inline h-3 w-3" /> Hidden</>}
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

/* ===========  CUSTOMERS =========== */
function CustomersTab() {
  const { lang } = useI18n();
  const [customers, setCustomers] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(200).then(({ data }) => setCustomers(data || []));
  }, []);
  if (customers.length === 0) return <Empty msg={lang === "ar" ? "لا يوجد عملاء بعد" : "No customers yet"} />;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
          <tr><Th>Name</Th><Th>Phone</Th><Th>Joined</Th></tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id} className="border-t border-border">
              <Td>{c.display_name || "—"}</Td>
              <Td>{c.phone || "—"}</Td>
              <Td>{new Date(c.created_at).toLocaleDateString()}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===========  SETTINGS (config) =========== */
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
              {lang === "ar" ? "إظهار الزر العائم" : "Show floating chat button"}
            </label>
          </Field>
        </div>
      </Section>

      <Section title={lang === "ar" ? "التتبع والإعلانات (Analytics)" : "Tracking & ads"}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Google Analytics ID (G-XXXX)">
            <input className={input} placeholder="G-XXXXXXXXXX" value={settings.gaId} onChange={e => update({ gaId: e.target.value })} />
          </Field>
          <Field label="Meta Pixel ID (Facebook/Instagram)">
            <input className={input} placeholder="1234567890" value={settings.metaPixelId} onChange={e => update({ metaPixelId: e.target.value })} />
          </Field>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {lang === "ar" ? "اتركها فارغة لتعطيل التتبع. تُحقن تلقائياً في جميع الصفحات." : "Leave empty to disable. Injected automatically on every page."}
        </p>
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
          <Field label={lang === "ar" ? "تاريخ انتهاء العرض (عدّاد تنازلي)" : "Offer expires at (countdown)"}>
            <input type="datetime-local" className={input}
              value={settings.offer.expiresAt ? new Date(settings.offer.expiresAt).toISOString().slice(0, 16) : ""}
              onChange={e => update({ offer: { ...settings.offer, expiresAt: e.target.value ? new Date(e.target.value).toISOString() : undefined } })} />
          </Field>
        </div>
      </Section>

      <Section title={lang === "ar" ? "🎨 قوالب جاهزة (نقرة واحدة)" : "🎨 Theme presets (one-click)"}>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {THEME_PRESETS.map(p => (
            <button key={p.id}
              onClick={() => { update({ accent: p.accent, uiScale: p.uiScale, defaultStyle: p.defaultStyle }); toast.success(lang === "ar" ? `تم تطبيق: ${p.nameAr}` : `Applied: ${p.nameEn}`); }}
              className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 text-start transition hover:-translate-y-0.5 hover:border-brand-pink/50">
              <span className="h-10 w-10 shrink-0 rounded-lg border border-border" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}90)` }} />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{lang === "ar" ? p.nameAr : p.nameEn}</div>
                <div className="truncate text-[10px] text-muted-foreground">{p.accent} · {p.defaultStyle}</div>
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
                <input className={input} placeholder="Description (EN)" value={s.descEn} onChange={e => patchService(s.id, { descEn: e.target.value })} />
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
                <input className={input} placeholder="Stripe priceId (lookup key)" value={p.priceId || ""} onChange={e => patchPlan(p.id, { priceId: e.target.value })} />
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

/* ===  helpers === */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-5"><h2 className="mb-4 text-lg font-bold text-gradient">{title}</h2>{children}</div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>;
}
function Th({ children }: { children: React.ReactNode }) { return <th className="px-3 py-2 text-left font-semibold">{children}</th>; }
function Td({ children }: { children: React.ReactNode }) { return <td className="px-3 py-2">{children}</td>; }
function Empty({ msg }: { msg: string }) { return <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center text-muted-foreground">{msg}</div>; }
