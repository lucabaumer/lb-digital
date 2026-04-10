export interface Project {
  id: string;
  client: string;
  category: string;
  description: string;
  result: string;
  tags: string[];
  bg: string;
  year: string;
  href?: string; // Link zur Demo-Seite (optional)
}

export const projects: Project[] = [
  {
    id: "mueller-immobilien",
    client: "Müller Immobilien",
    category: "Immobilien",
    description: "Editorial Luxury-Website mit Horizontal-Scroll Listings & Parallax Hero",
    result: "+340% Anfragen",
    tags: ["Next.js", "Framer Motion", "Editorial Design"],
    bg: "#1a2d1c",
    year: "2025",
    href: "/projekte/immobilien",
  },
  {
    id: "wagner-kanzlei",
    client: "Wagner & Partner Rechtsanwälte",
    category: "Rechtsanwälte",
    description: "Institutional Power-Website mit kinetic Typography & Accordion-Rechtsgebieten",
    result: "2× mehr Mandate",
    tags: ["Next.js", "Framer Motion", "Typografie"],
    bg: "#0a0a0a",
    year: "2025",
    href: "/projekte/kanzlei",
  },
  {
    id: "hoffmann-steuerberatung",
    client: "Hoffmann Steuerberatung",
    category: "Steuerberatung",
    description: "Fintech-Design mit animierten Zahlen, Ghost-Typografie & Prozess-Timeline",
    result: "+180% Erstgespräche",
    tags: ["Next.js", "Framer Motion", "Fintech Design"],
    bg: "#1E1B4B",
    year: "2025",
    href: "/projekte/steuerberatung",
  },
];
