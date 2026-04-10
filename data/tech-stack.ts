export interface TechCategory {
  category: string;
  tools: string[];
}

export const techStack: TechCategory[] = [
  {
    category: "Frontend",
    tools: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion"],
  },
  {
    category: "Performance & Tools",
    tools: ["Lighthouse", "Core Web Vitals", "Vercel Edge", "Cloudflare CDN", "WebP / AVIF"],
  },
  {
    category: "Backend & Daten",
    tools: ["Supabase", "PostgreSQL", "Resend", "REST APIs", "Webhooks"],
  },
  {
    category: "Marketing & SEO",
    tools: ["Google Analytics 4", "Search Console", "Schema.org", "Google My Business", "Ahrefs"],
  },
];
