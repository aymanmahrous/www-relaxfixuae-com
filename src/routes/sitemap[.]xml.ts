import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ARTICLES } from "@/lib/blog";

const BASE_URL = "https://www.relaxfixuae.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          { path: "/services/social-media-dubai", changefreq: "weekly", priority: "0.9" },
          { path: "/services/social-media-abudhabi", changefreq: "weekly", priority: "0.9" },
          { path: "/services/social-media-sharjah", changefreq: "weekly", priority: "0.9" },
          { path: "/services/logo-design", changefreq: "weekly", priority: "0.9" },
          { path: "/services/motion-graphics", changefreq: "weekly", priority: "0.9" },
          { path: "/services/ads-design", changefreq: "weekly", priority: "0.9" },
          { path: "/services/branding-agency-uae", changefreq: "weekly", priority: "0.9" },
          { path: "/portfolio", changefreq: "weekly", priority: "0.8" },
          { path: "/design", changefreq: "weekly", priority: "0.7" },
          { path: "/video", changefreq: "weekly", priority: "0.7" },
          { path: "/blog", changefreq: "daily", priority: "0.8", lastmod: today },
        ];

        const articleEntries: SitemapEntry[] = ARTICLES.map((a) => ({
          path: `/blog/${a.slug}`,
          changefreq: "monthly",
          priority: "0.7",
          lastmod: a.date,
        }));

        const entries = [...staticEntries, ...articleEntries];
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
