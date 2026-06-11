export default function PortfolioPage() {
  const projects = [
    {
      title: "Brand Identity – Luxury Gold",
      desc: "Full branding system including logo, colors, typography and social kit.",
      img: "https://via.placeholder.com/600x400",
    },
    {
      title: "Social Media Campaign – Abu Dhabi",
      desc: "High‑conversion posts, reels and ad creatives for a local business.",
      img: "https://via.placeholder.com/600x400",
    },
    {
      title: "Motion Graphics – Promo Video",
      desc: "Animated promo video with transitions, typography and sound design.",
      img: "https://via.placeholder.com/600x400",
    },
    {
      title: "Logo Design – Modern Minimal",
      desc: "Clean, modern logo with scalable vector system and brand rules.",
      img: "https://via.placeholder.com/600x400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">Portfolio</h1>
        <a
          href="/"
          className="text-sm text-yellow-300 hover:text-yellow-200 transition"
        >
          ← Back to Home
        </a>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-xl bg-[#0b1020] border border-slate-800 overflow-hidden shadow-xl shadow-black/40"
            >
              <img src={p.img} alt={p.title} className="w-full h-56 object-cover" />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-yellow-300">
                  {p.title}
                </h3>
                <p className="text-slate-300 text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="px-6 py-5 text-xs text-slate-500 border-t border-slate-800">
        © {new Date().getFullYear()} RelaxFix UAE Studio — Portfolio
      </footer>
    </div>
  );
}
