export interface Step {
  number: string;
  title: string;
  description: string;
  duration: string;
}

export const steps: Step[] = [
  {
    number: "01",
    title: "Briefing & Strategie",
    description:
      "Kostenloses Erstgespräch — wir verstehen Ihr Geschäft, Ihre Zielgruppe und Ihre Ziele. Kein Verkaufsgespräch, sondern ehrliche Beratung.",
    duration: "1–2 Tage",
  },
  {
    number: "02",
    title: "Design & Konzept",
    description:
      "Wir entwickeln ein maßgeschneidertes Design-Konzept. Sie geben Feedback, wir feinen ab — bis es wirklich passt.",
    duration: "3–5 Tage",
  },
  {
    number: "03",
    title: "Entwicklung",
    description:
      "Technische Umsetzung in Next.js — schnell, sauber, performant. Mit regelmäßigen Updates und direktem Kontakt.",
    duration: "5–10 Tage",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "Go-live, SEO-Setup und Übergabe. Danach stehen wir als Partner bereit — für Updates, Fragen und Weiterentwicklung.",
    duration: "Fortlaufend",
  },
];
