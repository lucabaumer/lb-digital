export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

export const services: Service[] = [
  {
    id: "webdesign",
    title: "Website Design & Entwicklung",
    description:
      "Individuelle, schnelle Websites die Vertrauen schaffen und Besucher in Kunden verwandeln. Maßgeschneidert für Ihr Unternehmen — kein Template, kein Baukasten.",
    tags: ["Next.js", "TypeScript", "Mobile-First", "Responsive"],
    icon: "monitor",
  },
  {
    id: "branding",
    title: "Logo & Branding",
    description:
      "Ihr Logo ist das Erste, was Kunden sehen — und das Letzte, was sie vergessen. Wir gestalten Logos und visuelle Identitäten, die zu Ihrem Unternehmen passen und professionell wirken.",
    tags: ["Logo Design", "Corporate Identity", "Farben & Typografie", "SVG & PNG"],
    icon: "pen-tool",
  },
  {
    id: "performance",
    title: "Performance & Technik",
    description:
      "Blitzschnelle Ladezeiten, sauberer Code und technische Exzellenz. Ihre Website wird auf Core Web Vitals optimiert und übertrifft die Konkurrenz.",
    tags: ["Core Web Vitals", "Lighthouse 100", "CDN", "Optimierung"],
    icon: "zap",
  },
  {
    id: "leads",
    title: "Lead-Generierung",
    description:
      "Strategisch platzierte Kontaktpunkte, optimierte Formulare und Funnels — damit Interessenten nicht nur scrollen, sondern anfragen.",
    tags: ["Conversion", "Landingpages", "A/B-Tests", "Formulare"],
    icon: "target",
  },
  {
    id: "seo",
    title: "SEO & Sichtbarkeit",
    description:
      "Technisches SEO, lokale Optimierung und strukturierte Daten — damit Ihre Kunden Sie bei Google finden, bevor sie zur Konkurrenz gehen.",
    tags: ["On-Page SEO", "Local SEO", "Schema.org", "Google My Business"],
    icon: "search",
  },
  {
    id: "support",
    title: "Support & Wartung",
    description:
      "Laufende Betreuung, regelmäßige Updates und ein direkter Ansprechpartner. Damit Ihre Website immer läuft — auch wenn Sie es nicht tun.",
    tags: ["Monitoring", "Updates", "Support", "Reports"],
    icon: "headphones",
  },
];
