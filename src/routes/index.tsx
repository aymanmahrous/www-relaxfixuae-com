import { PortfolioPage } from "./portfolio";
import { useState } from "react";

type ThemeKey = "proskill" | "luxury" | "minimal";

type SiteSettings = {
  theme: ThemeKey;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  accentColor: string;
  showIcons: boolean;
};

const THEMES: Record<ThemeKey, Partial<SiteSettings>> = {
  proskill: {
    primaryColor: "#0f172a", // أزرق غامق
    accentColor: "#2563eb", // أزرق
    heroTitle: "Premium Digital-Like Home Services in Abu Dhabi",
    heroSubtitle:
      "Organized, modern, and fast home services experience that feels like a top digital agency.",
  },
  luxury: {
    primaryColor: "#1a1a1a",
    accentColor: "#d4af37", // ذهبي
    heroTitle: "Luxury Creative Studio in UAE",
    heroSubtitle: "Elegant branding, design, and campaigns with premium touch.",
  },
  minimal: {
    primaryColor: "#ffffff",
    accentColor: "#000000",
    heroTitle: "Minimalist Design Studio",
    heroSubtitle: "Clean, simple, and effective creative solutions.",
  },
};

// تعريف المسارات
export const ROUTES = [
  {
    path: "/",
    component: () => <div>Home Page</div>,
  },
  {
    path: "/portfolio",
    component: PortfolioPage,
  },
  // باقي الصفحات بنفس الشكل
];
