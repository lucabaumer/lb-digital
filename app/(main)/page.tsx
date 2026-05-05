import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import { faqItems } from "@/app/schema";

export const metadata: Metadata = {
  title: "Webdesign Freiburg – LB Digital | Kanzleien, Handwerker & Architekten",
  description:
    "Webdesign Freiburg für Rechtsanwälte, Handwerker und Architekten: Individuelle Next.js-Websites & lokales SEO, die neue Mandanten und Aufträge bringen. Kein Template — Lighthouse 95+.",
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
import ServicesSection from "@/components/sections/ServicesSection";
import WorkSection from "@/components/sections/WorkSection";
import WhySection from "@/components/sections/WhySection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
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
      <SectionReveal><WhySection /></SectionReveal>
      <SectionReveal><ProcessSection /></SectionReveal>
      <SectionReveal><FAQSection /></SectionReveal>
      <CTASection />
    </>
  );
}
