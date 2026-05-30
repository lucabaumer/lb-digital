"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#1264F1";

const services = [
  {
    id: "starter",
    number: "01",
    title: "Starter",
    hook: "Kein verpasster Anruf. Mehr Google Reviews. Ab Tag 1.",
    description:
      "Das Fundament für jeden Handwerksbetrieb. Verpasste Anrufe kosten bares Geld — dieses System holt sie automatisch zurück.",
    benefits: [
      "Website (3 Seiten) — fertig in 2–3 Tagen",
      "Missed-Call SMS: automatische Rückmeldung in 60 Sekunden",
      "Google Review Automation nach jedem abgeschlossenen Auftrag",
    ],
    href: "#kontakt",
    linkLabel: "Paket anfragen",
    pricing: { monthly: "150 €/Monat", once: "ab 800 €" },
  },
  {
    id: "growth",
    number: "02",
    title: "Growth",
    hook: "Kein Angebot bleibt mehr unbeantwortet.",
    description:
      "Für Betriebe die wachsen wollen. Automatisches Followup, Terminbuchung direkt auf der Website und alle Nachrichten an einem Ort.",
    benefits: [
      "Alles aus Starter — plus Terminbuchungs-System",
      "Angebots-Followup: automatische SMS nach 3, 7 und 14 Tagen",
      "Unified Inbox: SMS, Email & Messenger in einem Dashboard",
    ],
    href: "#kontakt",
    linkLabel: "Paket anfragen",
    pricing: { monthly: "250 €/Monat", once: "ab 1.500 €" },
  },
  {
    id: "pro",
    number: "03",
    title: "Pro",
    hook: "Ihr Betrieb akquiriert — auch wenn Sie schlafen.",
    description:
      "Vollautomatisch. KI nimmt Anrufe entgegen, bucht Termine und reaktiviert alte Leads. Für Betriebe die maximales Wachstum wollen.",
    benefits: [
      "Alles aus Growth — plus AI Chatbot auf der Website (24/7)",
      "Voice AI: nimmt Anrufe entgegen, bucht Termine automatisch",
      "Social Media Planung (8 Posts/Monat) + Reaktivierungs-Kampagnen",
    ],
    href: "#kontakt",
    linkLabel: "Paket anfragen",
    pricing: { monthly: "450 €/Monat", once: "ab 2.500 €" },
  },
];

function SpotlightCard({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [angle, setAngle] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return;
    const cx = e.clientX; const cy = e.clientY;
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const r = cardRef.current.getBoundingClientRect();
        const dx = cx - (r.left + r.width / 2);
        const dy = cy - (r.top + r.height / 2);
        setAngle(((Math.atan2(dy, dx) * 180 / Math.PI) + 90 + 360) % 360);
      }
      rafRef.current = null;
    });
  }, []);

  const borderGrad = angle !== null
    ? `conic-gradient(from ${angle - 35}deg at 50% 50%, transparent 0deg, rgba(18,100,241,0.6) 35deg, rgba(18,100,241,0.9) 70deg, rgba(18,100,241,0.6) 105deg, transparent 110deg, transparent 360deg)`
    : "none";

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-2xl cursor-default"
      style={{ padding: "32px", flex: "0 0 300px", minWidth: "300px" }}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.14, ease }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setAngle(null); }}
    >
      {/* Spotlight border */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: borderGrad, zIndex: 0, pointerEvents: "none" }}
      />
      {/* Static border */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, borderRadius: "inherit", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)", zIndex: 0, pointerEvents: "none" }}
      />
      {/* Inner mask — 1px gap reveals gradient border */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 1, borderRadius: "calc(1rem - 1px)", background: "#0B1526", zIndex: 1, pointerEvents: "none" }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>

        {/* Logo + number */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Image
            src="/logo.png/Photoroom_20260401_150804.png"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            quality={85}
            sizes="32px"
            style={{ width: "32px", height: "32px", objectFit: "contain", flexShrink: 0, filter: "brightness(0) invert(1)" }}
          />
          <span
            style={{
              fontSize: "11px", fontFamily: "var(--font-bricolage)", fontWeight: 800,
              letterSpacing: "-0.02em", color: "rgba(255,255,255,0.08)", lineHeight: 1,
            }}
          >
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-white leading-tight"
          style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}
        >
          {service.title}
        </h3>

        {/* Hook */}
        <p style={{ fontSize: "13px", fontWeight: 600, fontStyle: "italic", lineHeight: 1.5, color: ACCENT }}>
          &ldquo;{service.hook}&rdquo;
        </p>

        {/* Description */}
        <p style={{ fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.45)", margin: 0 }}>
          {service.description}
        </p>

        {/* Benefits */}
        <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto", paddingTop: "4px" }}>
          {service.benefits.map((b, i) => (
            <motion.li
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px" }}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 + index * 0.14 + i * 0.07, ease }}
            >
              <span
                style={{
                  width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0,
                  background: `${ACCENT}18`, border: `1px solid ${ACCENT}40`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px",
                }}
                aria-hidden="true"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{b}</span>
            </motion.li>
          ))}
        </ul>

        {/* Pricing */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: ACCENT }}>{service.pricing.monthly}</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{service.pricing.once} einmalig</span>
        </div>

        {/* Link */}
        <Link
          href={service.href}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: ACCENT, textDecoration: "none", marginTop: "4px" }}
        >
          {service.linkLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headlineY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="leistungen"
      ref={sectionRef}
      className="relative"
      style={{ background: "#07101F", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "clamp(48px, 7vw, 96px) 0" }}
    >
      {/* Scroll-driven top accent line */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-px"
        aria-hidden="true"
      >
        <div style={{ height: "1px", background: `linear-gradient(to right, ${ACCENT}, rgba(18,100,241,0.3), transparent)` }} />
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
            className="font-display font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(32px, 6vw, 72px)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease }}
          >
            Drei Pakete.{" "}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>Monatlich kündbar.</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-base leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            Einmalige Setup-Gebühr, dann monatlich kündbar. Erster Monat kostenlos — erst zahlen wenn Sie Ergebnisse sehen.
          </motion.p>
        </motion.div>

      </div>

      {/* Cards — horizontal scroll, 3 side by side when space allows */}
      <div className="px-6 md:px-10" style={{ maxWidth: "1200px", marginInline: "auto" }}>
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
              style={{ flex: "1 1 300px", minWidth: "300px", scrollSnapAlign: "start" }}
            >
              <SpotlightCard service={s} index={i} inView={inView} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
