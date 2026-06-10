import { StudioTabs } from "../components/studio/StudioTabs";

export default function StudioPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* HERO SECTION */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-3 text-white">
          Pixel & Reel — AI Studio
        </h1>

        <p className="text-[var(--text-muted)] text-sm md:text-base max-w-xl mx-auto">
          أنشئ فيديوهات وصور احترافية خلال ثوانٍ — مدعوم بالذكاء الاصطناعي.
          <br />
          صُمّم هذا الاستوديو ليمنحك قوة الإبداع بدون تعقيد.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="#tools"
            className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition"
          >
            جرّب الأدوات
          </a>

          <a
            href="#contact"
            className="px-6 py-2 border border-yellow-500 text-yellow-500 font-semibold rounded-md hover:bg-yellow-500 hover:text-black transition"
          >
            تواصل معنا
          </a>
        </div>
      </section>

      {/* AI TOOLS SECTION */}
      <div id="tools" className="mt-10">
        <h2 className="text-xl font-bold mb-2">AI Tools</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          اختر نوع المحتوى الذي تريد إنشاءه — صور، فيديو، أو محتوى تسويقي.
        </p>

        <StudioTabs />
      </div>

      {/* FOOTER */}
      <footer className="mt-20 text-center text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} Pixel & Reel Studio — All Rights Reserved.
      </footer>
    </div>
  );
}
