import { StudioTabs } from "../components/studio/StudioTabs";

export default function StudioPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Pixel & Reel — Creative Studio
        </h1>

        <p className="text-[var(--text-muted)] text-sm md:text-base max-w-2xl mx-auto">
          نصنع هويات بصرية، إعلانات، محتوى مرئي، وصور وفيديوهات مدعومة بالذكاء الاصطناعي.
          <br />
          نساعد العلامات التجارية على الظهور بشكل احترافي وجذاب.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="#portfolio"
            className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition"
          >
            عرض أعمالنا
          </a>

          <a
            href="#contact"
            className="px-6 py-2 border border-yellow-500 text-yellow-500 font-semibold rounded-md hover:bg-yellow-500 hover:text-black transition"
          >
            تواصل معنا
          </a>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="mb-20">
        <h2 className="text-2xl font-bold mb-3">من نحن</h2>
        <p className="text-[var(--text-muted)] text-sm leading-6">
          Pixel & Reel هو استوديو تصميم وإبداع بصري متخصص في صناعة الهويات البصرية،
          الإعلانات، المحتوى المرئي، والتصميم المدعوم بالذكاء الاصطناعي.  
          نعمل على تحويل الأفكار إلى أعمال فنية قوية تساعد العلامات التجارية على النمو
          والظهور بشكل احترافي.
        </p>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="mb-20">
        <h2 className="text-2xl font-bold mb-3">خدماتنا</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <div className="p-5 border border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">الهويات البصرية</h3>
            <p className="text-[var(--text-muted)] text-sm">
              تصميم شعارات، ألوان، خطوط، أدلة استخدام، وبناء هوية كاملة للعلامة التجارية.
            </p>
          </div>

          <div className="p-5 border border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">الإعلانات</h3>
            <p className="text-[var(--text-muted)] text-sm">
              تصميم إعلانات سوشيال ميديا، حملات تسويقية، وإعلانات فيديو احترافية.
            </p>
          </div>

          <div className="p-5 border border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">تصميم السوشيال ميديا</h3>
            <p className="text-[var(--text-muted)] text-sm">
              تصميم محتوى يومي، قوالب، بوستات، ستوري، وبناء هوية رقمية كاملة.
            </p>
          </div>

          <div className="p-5 border border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">AI Studio</h3>
            <p className="text-[var(--text-muted)] text-sm">
              إنشاء صور وفيديوهات احترافية خلال ثوانٍ باستخدام الذكاء الاصطناعي.
            </p>
          </div>

        </div>
      </section>

      {/* ================= AI STUDIO SECTION ================= */}
      <section id="ai" className="mb-20">
        <h2 className="text-2xl font-bold mb-3">AI Studio</h2>
        <p className="text-[var(--text-muted)] text-sm mb-6">
          اختر نوع المحتوى الذي تريد إنشاءه — صور، فيديو، أو محتوى تسويقي.
        </p>

        <StudioTabs />
      </section>

      {/* ================= PORTFOLIO SECTION ================= */}
      <section id="portfolio" className="mb-20">
        <h2 className="text-2xl font-bold mb-3">أعمالنا</h2>

        <p className="text-[var(--text-muted)] text-sm mb-6">
          مجموعة من أعمال Pixel & Reel في الهوية البصرية، الإعلانات، والتصميم الإبداعي.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Branding Projects</h3>
            <p className="text-[var(--text-muted)] text-sm">
              شعارات، هويات، أدلة استخدام.
            </p>
          </div>

          <div className="p-4 border border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Advertising</h3>
            <p className="text-[var(--text-muted)] text-sm">
              حملات تسويقية وإعلانات سوشيال ميديا.
            </p>
          </div>

          <div className="p-4 border border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">AI Generated Content</h3>
            <p className="text-[var(--text-muted)] text-sm">
              صور وفيديوهات مدعومة بالذكاء الاصطناعي.
            </p>
          </div>

          <div className="p-4 border border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Social Media Design</h3>
            <p className="text-[var(--text-muted)] text-sm">
              تصميم محتوى احترافي للمنصات الرقمية.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="mb-20">
        <h2 className="text-2xl font-bold mb-3">تواصل معنا</h2>

        <p className="text-[var(--text-muted)] text-sm mb-4">
          يسعدنا التواصل معك — احصل على عرض سعر أو استشارة مجانية.
        </p>

        <div className="space-y-2 text-sm">
          <p>📧 Email: contact@pixelandreel.com</p>
          <p>📱 WhatsApp: +971588259848</p>
          <p>🌐 Website: www.relaxfixuae.com</p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-20 text-center text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} Pixel & Reel Studio — All Rights Reserved.
      </footer>
    </div>
  );
}
