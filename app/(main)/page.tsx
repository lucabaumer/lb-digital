import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import { faqItems } from "@/app/schema";

export const metadata: Metadata = {
  title: "Webdesign Freiburg – LB Digital | Individuelle Websites & SEO",
  description:
    "Webdesign Freiburg: Individuelle Next.js-Websites & lokales SEO für Unternehmen in Freiburg und der Region. Kein Template, kein Baukasten — Lighthouse 95+, schnell, maßgeschneidert.",
  alternates: {
    canonical: "https://www.lb-digital.agency",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};
import MarqueeSection from "@/components/sections/MarqueeSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkSection from "@/components/sections/WorkSection";
import WhySection from "@/components/sections/WhySection";
import ProcessSection from "@/components/sections/ProcessSection";
import TechSection from "@/components/sections/TechSection";
import FAQSection from "@/components/sections/FAQSection";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <SectionReveal><ServicesSection /></SectionReveal>
      <SectionReveal><WorkSection /></SectionReveal>
      <SectionReveal margin="-20px"><MarqueeSection /></SectionReveal>
      <SectionReveal><WhySection /></SectionReveal>
      <SectionReveal><ProcessSection /></SectionReveal>
      <SectionReveal><TechSection /></SectionReveal>
      <SectionReveal><FAQSection /></SectionReveal>
    </>
  );
}
