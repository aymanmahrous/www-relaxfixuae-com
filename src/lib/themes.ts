// Pre-built visual themes — one-click apply from Admin Panel
export type ThemePreset = {
  id: string;
  nameEn: string;
  nameAr: string;
  accent: string;
  uiScale: number;
  defaultStyle: string;
};

export const THEME_PRESETS: ThemePreset[] = [
  { id: "neon",      nameEn: "Neon Pink",   nameAr: "نيون وردي",  accent: "#ec4899", uiScale: 1,    defaultStyle: "modern" },
  { id: "luxury",    nameEn: "Luxury Gold", nameAr: "فخامة ذهبية", accent: "#d4af37", uiScale: 1,    defaultStyle: "luxury" },
  { id: "cyber",     nameEn: "Cyber Cyan",  nameAr: "سايبر سماوي", accent: "#06b6d4", uiScale: 1,    defaultStyle: "cyberpunk" },
  { id: "editorial", nameEn: "Editorial",   nameAr: "تحريري",      accent: "#f97316", uiScale: 0.95, defaultStyle: "minimal" },
  { id: "playful",   nameEn: "Playful Lime",nameAr: "حيوي ليموني", accent: "#84cc16", uiScale: 1.05, defaultStyle: "playful" },
];
