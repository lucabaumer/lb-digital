import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lb-digital.agency";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-04-20");
  const projectDate = new Date("2026-01-01");

  return [
    // Core pages
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/webdesign-freiburg`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/seo-freiburg`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Referenzprojekte
    { url: `${base}/projekte/immobilien`, lastModified: projectDate, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/projekte/kanzlei`, lastModified: projectDate, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/projekte/steuerberatung`, lastModified: projectDate, changeFrequency: "yearly", priority: 0.6 },
  ];
}
