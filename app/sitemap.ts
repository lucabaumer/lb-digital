import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lb-digital.agency";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified: "2026-04-01",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/projekte/immobilien`,
      lastModified: "2026-04-01",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/projekte/kanzlei`,
      lastModified: "2026-04-01",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/projekte/steuerberatung`,
      lastModified: "2026-04-01",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/impressum`,
      lastModified: "2026-04-01",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/datenschutz`,
      lastModified: "2026-04-01",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
