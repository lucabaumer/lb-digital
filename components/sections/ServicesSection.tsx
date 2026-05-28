"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
      "Ob Handwerksbetrieb, Gastronomiebetrieb oder lokales Unternehmen: Wer online nicht professionell wirkt, verliert den Auftrag noch vor dem ersten Gespräch. Wir bauen Websites, die Vertrauen schaffen — schnell, sauber, in Next.js.",
    benefits: [
      "Maßgeschneidert für Ihre Marke und Zielgruppe",
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
      "Handwerker, Gastronom oder lokaler Dienstleister in Freiburg — lokale Google-Sichtbarkeit entscheidet, ob der Anruf bei Ihnen oder der Konkurrenz landet. Wir sorgen dafür, dass Sie gefunden werden.",
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

function ServiceCard({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease }}
      className="relative rounded-2xl p-8 flex flex-col gap-6 cursor-default"
      style={{ flex: "0 0 300px", minWidth: "300px", background: service.bg, border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Accent glow top-right */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${service.accent}22 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
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
          style={{ fontSize: "clamp(24px, 2.5vw, 34px)" }}
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
              transition={{ duration: 0.4, delay: index * 0.15 + 0.35 + i * 0.07, ease }}
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

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="leistungen" ref={sectionRef} className="section-py relative" style={{ background: "#0A1628" }}>
      {/* Scroll-driven top border line */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-px"
        aria-hidden="true"
      >
        <div style={{ height: "1px", background: "linear-gradient(to right, #1264F1, #4B8BFF, transparent)" }} />
      </motion.div>

      <div className="container-xl" ref={ref}>

        {/* Headline */}
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
            style={{ fontSize: "clamp(32px, 6.5vw, 80px)", color: "#F0EDE8" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease }}
          >
            Drei Dinge.{" "}
            <span className="text-gradient">Richtig gemacht.</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-base leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            Viele Agenturen machen alles. Wir machen drei Dinge — und die besser als die meisten.
          </motion.p>
        </motion.div>

      </div>

      {/* Cards — horizontal scroll, 3 side by side when space allows */}
      <div
        className="px-6 md:px-10"
        style={{ maxWidth: "1200px", marginInline: "auto" }}
      >
        <div
          className="flex gap-5 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((s, i) => (
            <div
              key={s.id}
              className="relative"
              style={{
                flex: "1 1 300px",
                minWidth: "300px",
                scrollSnapAlign: "start",
              }}
            >
              <ServiceCard service={s} index={i} inView={inView} />
              <ScrollLine inView={inView} delay={0.4 + i * 0.15} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
