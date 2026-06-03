import { useEffect, useState } from "react";

export function Countdown({ to, lang }: { to: string; lang: "ar" | "en" }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return null;
  const ms = Math.max(0, new Date(to).getTime() - now);
  if (!ms || isNaN(ms)) return null;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  const labels = lang === "ar" ? ["ي", "س", "د", "ث"] : ["d", "h", "m", "s"];
  const parts = [d, h, m, s];
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 font-mono text-[11px] font-bold tracking-tight text-brand-amber">
      {parts.map((p, i) => (
        <span key={i}>
          {String(p).padStart(2, "0")}
          <span className="opacity-60">{labels[i]}</span>
          {i < 3 && <span className="mx-0.5 opacity-40">:</span>}
        </span>
      ))}
    </span>
  );
}
