import HeroSection from "@/components/sections/HeroSection";
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
