import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SiteHeader } from "@/components/SiteHeader";
import { Sparkles, Palette, Video, BarChart3, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const SERVICES = [
  {
    title: "تصميم سوشيال ميديا AI",
    desc: "تصاميم احترافية مولدة بالذكاء الاصطناعي لانستجرام وتيك توك",
    price: "يبدأ من 500 درهم",
    icon: <Palette className="h-10 w-10" />,
  },
  {
    title: "إدارة حسابات ذكية",
    desc: "نشر تلقائي، رد AI على التعليقات، تحليلات فورية",
    price: "2000 درهم/شهر",
    icon: <Zap className="h-10 w-10" />,
  },
  {
    title: "موشن جرافيك AI",
    desc: "فيديوهات إعلانية قصيرة بجودة 4K خلال 24 ساعة",
    price: "800 درهم",
    icon: <Video className="h-10 w-10" />,
  },
  {
    title: "إعلانات ممولة AI",
    desc: "استهداف ذكي + A/B Testing تلقائي + أفضل ROI",
    price: "1500 درهم/شهر",
    icon: <BarChart3 className="h-10 w-10" />,
  },
];

function HomePage() {
  return (
    <div dir="rtl" className="font-[Cairo] bg-slate-950 text-white">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-semibold">Powered by AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Creative Studio AI
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            نصمم، ننتج، وندير محتواك بالذكاء الاصطناعي. 10x أسرع، 5x أرخص، جودة بريميوم
          </p>
          <a href="#contact" className="bg-white text-purple-700 px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/20 inline-flex items-center gap-2">
            <Zap className="h-5 w-5" />
            ابدأ مشروعك مجاناً
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            خدمات AI Studio
          </h2>
          <p className="text-gray-400 text-lg">
            كل ما تحتاجه لبناء براند قوي على السوشيال ميديا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="group relative bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-3xl transition-all duration-500" />
              <div className="relative">
                <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{service.desc}</p>
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  {service.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LeadForm />
      <WhatsAppFab />
    </div>
  );
}
