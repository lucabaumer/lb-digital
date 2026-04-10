import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkSection from "@/components/sections/WorkSection";
import AboutSection from "@/components/sections/AboutSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TechSection from "@/components/sections/TechSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionReveal><ServicesSection /></SectionReveal>
      <SectionReveal><WorkSection /></SectionReveal>
      <SectionReveal margin="-20px"><MarqueeSection /></SectionReveal>
      <SectionReveal><AboutSection /></SectionReveal>
      <SectionReveal><ProcessSection /></SectionReveal>
      <SectionReveal><TechSection /></SectionReveal>
      <SectionReveal><CTASection /></SectionReveal>
      <SectionReveal><FAQSection /></SectionReveal>
    </>
  );
}
