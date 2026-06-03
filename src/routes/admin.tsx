import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useI18n } from "@/lib/i18n";
import { useSettings, type Service, type Plan } from "@/lib/settings";
import { Plus, Trash2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Control Panel — Pixel & Reel" }] }),
  component: AdminPage,
});

const ICONS = ["ImageIcon", "PenTool", "Film", "Sparkles", "Megaphone", "Camera", "Package", "TrendingUp"];
const STYLES = ["modern", "luxury", "playful", "minimal", "retro", "cyberpunk"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-4 text-lg font-bold text-gradient">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const input = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-pink";

function AdminPage() {
  const { t, lang } = useI18n();
  const { settings, update, reset } = useSettings();

  function patchService(id: string, p: Partial<Service>) {
    update({ services: settings.services.map((s) => (s.id === id ? { ...s, ...p } : s)) });
  }
  function addService() {
    update({
      services: [
        ...settings.services,
        { id: `s${Date.now()}`, icon: "Sparkles", titleEn: "New service", titleAr: "خدمة جديدة", descEn: "", descAr: "" },
      ],
    });
  }
  function deleteService(id: string) {
    update({ services: settings.services.filter((s) => s.id !== id) });
  }

  function patchPlan(id: string, p: Partial<Plan>) {
    update({ plans: settings.plans.map((pl) => (pl.id === id ? { ...pl, ...p } : pl)) });
  }
  function addPlan() {
    update({
      plans: [
        ...settings.plans,
        { id: `p${Date.now()}`, nameEn: "New plan", nameAr: "باقة جديدة", price: "$0", popular: false, featuresEn: [], featuresAr: [] },
      ],
    });
  }
  function deletePlan(id: string) {
    update({ plans: settings.plans.filter((p) => p.id !== id) });
  }

  function done() {
    toast.success(t("a_saved"));
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-gradient">{t("admin_title")}</span>
            </h1>
            <p className="mt-2 text-muted-foreground">{t("admin_sub")}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { if (confirm(lang === "ar" ? "هل أنت متأكد من إعادة التعيين؟" : "Reset all settings?")) { reset(); toast.success(t("a_saved")); } }}
              className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-background px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10">
              <RotateCcw className="h-4 w-4" /> {t("a_reset")}
            </button>
            <button onClick={done} className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-bold text-black">
              <Save className="h-4 w-4" /> {t("a_save")}
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <Section title={t("a_brand")}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={t("a_brand_en")}><input className={input} value={settings.brandEn} onChange={(e) => update({ brandEn: e.target.value })} /></Field>
              <Field label={t("a_brand_ar")}><input className={input} dir="rtl" value={settings.brandAr} onChange={(e) => update({ brandAr: e.target.value })} /></Field>
              <Field label={t("a_built_by")}><input className={input} value={settings.builtBy} onChange={(e) => update({ builtBy: e.target.value })} /></Field>
              <Field label={t("a_email")}><input className={input} value={settings.email} onChange={(e) => update({ email: e.target.value })} /></Field>
              <Field label={t("a_whatsapp")}><input className={input} placeholder="971588259848" value={settings.whatsapp} onChange={(e) => update({ whatsapp: e.target.value })} /></Field>
              <Field label={t("a_telegram")}><input className={input} placeholder="username or +971..." value={settings.telegram} onChange={(e) => update({ telegram: e.target.value })} /></Field>
            </div>
          </Section>

          <Section title={t("a_appearance")}>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label={t("a_accent")}>
                <div className="flex items-center gap-2">
                  <input type="color" value={settings.accent} onChange={(e) => update({ accent: e.target.value })} className="h-10 w-14 rounded-lg border border-border bg-background" />
                  <input className={input} value={settings.accent} onChange={(e) => update({ accent: e.target.value })} />
                </div>
              </Field>
              <Field label={`${t("a_scale")} (${Math.round(settings.uiScale * 100)}%)`}>
                <input type="range" min={0.85} max={1.25} step={0.05} value={settings.uiScale} onChange={(e) => update({ uiScale: parseFloat(e.target.value) })} className="mt-3 w-full accent-brand-pink" />
                <div className="flex justify-between text-xs text-muted-foreground"><span>{t("a_smaller")}</span><span>{t("a_larger")}</span></div>
              </Field>
              <Field label={t("a_welcome")}>
                <input type="number" min={0} max={50} className={input} value={settings.welcomeCredits} onChange={(e) => update({ welcomeCredits: parseInt(e.target.value, 10) || 0 })} />
              </Field>
            </div>
          </Section>

          <Section title={t("a_defaults")}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={t("a_def_style")}>
                <select className={input} value={settings.defaultStyle} onChange={(e) => update({ defaultStyle: e.target.value })}>
                  {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label={t("a_def_ratio")}>
                <select className={input} value={settings.defaultRatio} onChange={(e) => update({ defaultRatio: e.target.value as any })}>
                  {["1:1", "9:16", "16:9", "4:5"].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
            </div>
          </Section>

          <Section title={t("a_offer")}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={t("a_offer_on")}>
                <label className="mt-2 inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={settings.offer.enabled} onChange={(e) => update({ offer: { ...settings.offer, enabled: e.target.checked } })} />
                  {settings.offer.enabled ? (lang === "ar" ? "ظاهر" : "Visible") : (lang === "ar" ? "مخفي" : "Hidden")}
                </label>
              </Field>
              <Field label={t("a_offer_code")}><input className={input} value={settings.offer.code} onChange={(e) => update({ offer: { ...settings.offer, code: e.target.value } })} /></Field>
              <Field label={t("a_offer_title_en")}><input className={input} value={settings.offer.titleEn} onChange={(e) => update({ offer: { ...settings.offer, titleEn: e.target.value } })} /></Field>
              <Field label={t("a_offer_title_ar")}><input dir="rtl" className={input} value={settings.offer.titleAr} onChange={(e) => update({ offer: { ...settings.offer, titleAr: e.target.value } })} /></Field>
              <Field label={t("a_offer_discount")}><input type="number" min={0} max={100} className={input} value={settings.offer.discount} onChange={(e) => update({ offer: { ...settings.offer, discount: parseInt(e.target.value, 10) || 0 } })} /></Field>
            </div>
          </Section>

          <Section title={t("a_services")}>
            <div className="space-y-3">
              {settings.services.map((s) => (
                <div key={s.id} className="rounded-xl border border-border bg-background p-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Field label={t("a_title_en")}><input className={input} value={s.titleEn} onChange={(e) => patchService(s.id, { titleEn: e.target.value })} /></Field>
                    <Field label={t("a_title_ar")}><input dir="rtl" className={input} value={s.titleAr} onChange={(e) => patchService(s.id, { titleAr: e.target.value })} /></Field>
                    <Field label={t("a_desc_en")}><input className={input} value={s.descEn} onChange={(e) => patchService(s.id, { descEn: e.target.value })} /></Field>
                    <Field label={t("a_desc_ar")}><input dir="rtl" className={input} value={s.descAr} onChange={(e) => patchService(s.id, { descAr: e.target.value })} /></Field>
                    <Field label={t("a_icon")}>
                      <select className={input} value={s.icon} onChange={(e) => patchService(s.id, { icon: e.target.value })}>
                        {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </Field>
                    <div className="flex items-end">
                      <button onClick={() => deleteService(s.id)} className="inline-flex items-center gap-1 rounded-lg border border-destructive/40 bg-background px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-3.5 w-3.5" /> {t("a_delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addService} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">
                <Plus className="h-4 w-4" /> {t("a_add")}
              </button>
            </div>
          </Section>

          <Section title={t("a_plans")}>
            <div className="space-y-3">
              {settings.plans.map((p) => (
                <div key={p.id} className="rounded-xl border border-border bg-background p-3">
                  <div className="grid gap-2 sm:grid-cols-3">
                    <Field label={t("a_title_en")}><input className={input} value={p.nameEn} onChange={(e) => patchPlan(p.id, { nameEn: e.target.value })} /></Field>
                    <Field label={t("a_title_ar")}><input dir="rtl" className={input} value={p.nameAr} onChange={(e) => patchPlan(p.id, { nameAr: e.target.value })} /></Field>
                    <Field label={t("a_price")}><input className={input} value={p.price} onChange={(e) => patchPlan(p.id, { price: e.target.value })} /></Field>
                    <Field label={t("a_features_en")}>
                      <textarea rows={4} className={input} value={p.featuresEn.join("\n")} onChange={(e) => patchPlan(p.id, { featuresEn: e.target.value.split("\n").filter(Boolean) })} />
                    </Field>
                    <Field label={t("a_features_ar")}>
                      <textarea dir="rtl" rows={4} className={input} value={p.featuresAr.join("\n")} onChange={(e) => patchPlan(p.id, { featuresAr: e.target.value.split("\n").filter(Boolean) })} />
                    </Field>
                    <div className="flex flex-col gap-2">
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={p.popular} onChange={(e) => patchPlan(p.id, { popular: e.target.checked })} />
                        {t("a_popular")}
                      </label>
                      <button onClick={() => deletePlan(p.id)} className="inline-flex w-fit items-center gap-1 rounded-lg border border-destructive/40 bg-background px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-3.5 w-3.5" /> {t("a_delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addPlan} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">
                <Plus className="h-4 w-4" /> {t("a_add")}
              </button>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}
