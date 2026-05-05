"use client";

import { motion, useInView, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { useRef, MouseEvent, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    id: "webdesign",
    number: "01",
    title: "Webdesign &\nEntwicklung",
    hook: "Ihre nächsten Kunden googeln Sie — bevor sie anrufen.",
    description:
      "Ob Kanzlei, Handwerksbetrieb oder Architekturbüro: Wer online nicht professionell wirkt, verliert den Auftrag noch vor dem ersten Gespräch. Wir bauen Websites, die Vertrauen schaffen — schnell, sauber, in Next.js.",
    benefits: [
      "Kein Template. Kein Baukasten. Nur Ihre Marke.",
      "Lädt in unter 1 Sekunde — Lighthouse 95+",
      "Mobile-first, barrierefrei, DSGVO-konform",
      "Direkte Kommunikation — kein Projektmanager",
    ],
    accent: "#1264F1",
    bg: "#0F172A",
    href: "/webdesign-freiburg",
    linkLabel: "Webdesign Freiburg",
  },
  {
    id: "branding",
    number: "02",
    title: "Logo &\nBranding",
    hook: "Ihr Logo ist das Erste, was Kunden sehen — und das Letzte, was sie vergessen.",
    description:
      "Wir gestalten Logos und visuelle Identitäten, die zu Ihrem Unternehmen passen, professionell wirken und auf jeder Fläche funktionieren — von der Website bis zur Visitenkarte.",
    benefits: [
      "Individuelles Logo-Design — kein Generator",
      "Corporate Identity: Farben, Schriften, Stil",
      "Alle Formate: SVG, PNG, PDF — druckfertig",
      "Unbegrenzte Revisionen bis es passt",
    ],
    accent: "#F59E0B",
    bg: "#13101F",
    href: "/kontakt",
    linkLabel: "Branding anfragen",
  },
  {
    id: "seo",
    number: "03",
    title: "SEO &\nSichtbarkeit",
    hook: "Wer nicht auf Seite 1 bei Google steht, existiert für neue Kunden nicht.",
    description:
      "Rechtsanwalt, Handwerker oder Architekt in Freiburg — lokale Google-Sichtbarkeit entscheidet, ob der Anruf bei Ihnen oder der Konkurrenz landet. Wir sorgen dafür, dass Sie gefunden werden.",
    benefits: [
      "Lokal sichtbar: Google Maps, My Business, lokale Keywords",
      "Technisches SEO direkt beim Bau integriert",
      "Strukturierte Daten & Core Web Vitals",
      "Transparente Reports — keine leeren Versprechen",
    ],
    accent: "#10B981",
    bg: "#07101F",
    href: "/seo-freiburg",
    linkLabel: "SEO Freiburg",
  },
];

function TiltCard({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-120, 120], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-120, 120], [-6, 6]), { stiffness: 200, damping: 20 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: index * 0.18, ease }}
      className="rounded-2xl p-8 lg:p-10 flex flex-col gap-6 cursor-default"
      whileHover={{ scale: 1.012 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Card background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: service.bg,
          border: `1px solid rgba(255,255,255,0.07)`,
          zIndex: 0,
        }}
      />
      {/* Accent glow top-right */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${service.accent}22 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
          zIndex: 0,
        }}
      />

      {/* Ghost number background */}
      <div
        className="absolute bottom-4 right-6 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontSize: "120px",
          fontFamily: "var(--font-bricolage)",
          fontWeight: 800,
          lineHeight: 1,
          color: "rgba(255,255,255,0.04)",
          letterSpacing: "-0.05em",
          zIndex: 0,
        }}
      >
        {service.number}
      </div>

      <div className="relative z-10 flex flex-col gap-6 h-full">
        {/* Logo mark + accent line */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png/Photoroom_20260401_150804.png"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            quality={85}
            sizes="32px"
            className="w-8 h-8 object-contain flex-shrink-0"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <div className="h-px flex-1" style={{ background: `${service.accent}40` }} />
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-white leading-tight whitespace-pre-line"
          style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
        >
          {service.title}
        </h3>

        {/* Hook */}
        <p
          className="text-sm font-semibold leading-snug italic"
          style={{ color: service.accent }}
        >
          "{service.hook}"
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          {service.description}
        </p>

        {/* Benefits */}
        <ul className="flex flex-col gap-2.5 mt-auto pt-2">
          {service.benefits.map((b, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-sm"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.18 + 0.35 + i * 0.07, ease }}
            >
              <span
                className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: `${service.accent}20`, border: `1px solid ${service.accent}60` }}
                aria-hidden="true"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke={service.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ color: "rgba(255,255,255,0.65)" }}>{b}</span>
            </motion.li>
          ))}
        </ul>

        {service.href && (
          <Link
            href={service.href}
            className="mt-2 inline-flex items-center gap-2 text-xs font-semibold tracking-wide"
            style={{ color: service.accent, textDecoration: "none" }}
          >
            {service.linkLabel}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// Scroll-driven number counter that animates as section enters viewport
function ScrollLine({ inView, delay = 0 }: { inView: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "left", height: "1px", background: "linear-gradient(to right, #1264F1, transparent)" }}
      className="absolute bottom-0 left-0 right-0"
    />
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Subtle parallax on the headline block
  const headlineY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="leistungen" ref={sectionRef} className="section-py relative" style={{ background: "#fff" }}>
      {/* Scroll-driven top border line */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-px"
        aria-hidden="true"
      >
        <div style={{ height: "1px", background: "linear-gradient(to right, #1264F1, #4B8BFF, transparent)" }} />
      </motion.div>

      <div className="container-xl" ref={ref}>

        {/* Headline with subtle parallax */}
        <motion.div className="mb-16 max-w-3xl" style={{ y: headlineY }}>
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
          >
            Was wir tun
          </motion.p>
          <motion.h2
            className="font-display font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(32px, 6.5vw, 80px)", color: "#0D0D0D" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease }}
          >
            Drei Dinge.{" "}
            <span className="text-gradient">Richtig gemacht.</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-base leading-relaxed max-w-xl"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            Viele Agenturen machen alles. Wir machen drei Dinge — und die besser als die meisten.
          </motion.p>
        </motion.div>

        {/* Cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            {services.map((s, i) => (
              <div
                key={s.id}
                className="relative flex-shrink-0"
                style={{ width: "78vw", maxWidth: "320px", scrollSnapAlign: "start" }}
              >
                <TiltCard service={s} index={i} inView={inView} />
                <ScrollLine inView={inView} delay={0.4 + i * 0.18} />
              </div>
            ))}
          </div>

          {/* Arrows + dots */}
          <div className="flex items-center justify-between mt-5 px-1">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Karte ${i + 1}`}
                  style={{
                    width: activeIndex === i ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "99px",
                    background: activeIndex === i ? "#1264F1" : "#D1D5DB",
                    border: "none",
                    padding: 0,
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                aria-label="Vorherige Karte"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: "1px solid #E5E7EB",
                  background: activeIndex === 0 ? "#F9FAFB" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: activeIndex === 0 ? "not-allowed" : "pointer",
                  opacity: activeIndex === 0 ? 0.4 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo(Math.min(services.length - 1, activeIndex + 1))}
                disabled={activeIndex === services.length - 1}
                aria-label="Nächste Karte"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: "1px solid #E5E7EB",
                  background: activeIndex === services.length - 1 ? "#F9FAFB" : "#1264F1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: activeIndex === services.length - 1 ? "not-allowed" : "pointer",
                  opacity: activeIndex === services.length - 1 ? 0.4 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke={activeIndex === services.length - 1 ? "#0D0D0D" : "#fff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetric grid — 1 wide card left, 2 stacked right */}
        <div
          className="hidden lg:grid gap-6 relative"
          style={{ gridTemplateColumns: "1.4fr 1fr" }}
        >
          <div className="relative">
            <TiltCard service={services[0]} index={0} inView={inView} />
            <ScrollLine inView={inView} delay={0.4} />
          </div>
          <div className="flex flex-col gap-6">
            {services.slice(1).map((s, i) => (
              <div key={s.id} className="relative flex-1">
                <TiltCard service={s} index={i + 1} inView={inView} />
                <ScrollLine inView={inView} delay={0.4 + (i + 1) * 0.18} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
