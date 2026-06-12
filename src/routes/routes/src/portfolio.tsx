export function PortfolioPage() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold text-[var(--accent-gold)]">
        Portfolio
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Case 1 — Al Mawakib */}
        <div className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] p-4 space-y-3">
          <img
            src="https://i.ibb.co/your-link-1.jpg"
            alt="Al Mawakib"
            className="rounded-lg w-full h-48 object-cover"
          />
          <h2 className="text-lg font-semibold">Al Mawakib</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Social Media Design — حملات تنظيف وضيافة، محتوى ثنائي اللغة
            (عربي/إنجليزي).
          </p>
          <a
            href="https://wa.me/971588259848"
            className="inline-block px-3 py-1.5 rounded-full bg-[var(--accent-gold)] text-black text-xs"
          >
            تواصل عبر واتساب
          </a>
        </div>

        {/* Case 2 — Relax Fix UAE */}
        <div className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] p-4 space-y-3">
          <img
            src="https://i.ibb.co/your-link-2.jpg"
            alt="Relax Fix UAE"
            className="rounded-lg w-full h-48 object-cover"
          />
          <h2 className="text-lg font-semibold">Relax Fix UAE</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Brand Identity + Ad Campaign — شعار الدرع، حملات تكييف وتنظيف،
            إعلانات مكافحة الحشرات، نسخ عربية قوية.
          </p>
          <a
            href="https://wa.me/971588259848"
            className="inline-block px-3 py-1.5 rounded-full bg-[var(--accent-gold)] text-black text-xs"
          >
            تواصل عبر واتساب
          </a>
        </div>

        {/* Case 3 — Almasa Beauty */}
        <div className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] p-4 space-y-3">
          <img
            src="https://i.ibb.co/your-link-3.jpg"
            alt="Almasa Beauty"
            className="rounded-lg w-full h-48 object-cover"
          />
          <h2 className="text-lg font-semibold">Almasa Beauty</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Branding + Packaging + Typography — خطوط عربية، 3 مجموعات
            تغليف، عرض فاخر.
          </p>
          <a
            href="https://wa.me/971588259848"
            className="inline-block px-3 py-1.5 rounded-full bg-[var(--accent-gold)] text-black text-xs"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
