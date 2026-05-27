"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#1264F1";

const services = [
  {
    id: "fundament",
    number: "01",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Fundament",
    hook: "Damit kein Kunde mehr zweifelt, ob Sie seriös sind.",
    description:
      "Viele Betriebe verlieren Aufträge — nicht weil sie schlechte Arbeit leisten, sondern weil ihre Website das Gegenteil vermittelt. Das ändern wir.",
    benefits: [
      "Individuelle Website — kein Template, kein Baukasten",
      "Mobile & Tablet optimiert, DSGVO-konform",
      "Monatlicher Bericht über Besucher & Anfragen",
    ],
    href: "#kontakt",
    linkLabel: "Paket anfragen",
    pricing: { monthly: "99 €/Monat", once: "ab 790 €" },
  },
  {
    id: "sichtbarkeit",
    number: "02",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "Sichtbarkeit",
    hook: "Damit neue Kunden Sie finden — bevor sie wissen, dass Sie existieren.",
    description:
      "Wer in Freiburg nach Ihrer Leistung sucht, soll auf Sie stoßen — nicht auf die Konkurrenz.",
    benefits: [
      "Alles aus Fundament",
      "Lokale Google-Optimierung & Google My Business",
      "Mehrere Leistungsseiten für Ihre Angebote",
    ],
    href: "#kontakt",
    linkLabel: "Paket anfragen",
    pricing: { monthly: "179 €/Monat", once: "ab 1.490 €" },
  },
  {
    id: "vollstaendig",
    number: "03",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: "Vollständig",
    hook: "Damit Ihr gesamtes Angebot online sichtbar ist — für jede Leistung.",
    description:
      "Für Betriebe die nicht nur eine Seite wollen, sondern eine vollständige digitale Präsenz — mit Strategie.",
    benefits: [
      "Alles aus Sichtbarkeit",
      "Landingpages pro Leistung & Stadtteil",
      "Detailliertes monatliches Reporting",
    ],
    href: "#kontakt",
    linkLabel: "Paket anfragen",
    pricing: { monthly: "299 €/Monat", once: "ab 2.490 €" },
  },
];

function SpotlightCard({
  service,
  index,
  inView,
  wide = false,
}: {
  service: typeof services[0];
  index: number;
  inView: boolean;
  wide?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);
  const [angle, setAngle] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return;
    const cx = e.clientX; const cy = e.clientY;
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const r = cardRef.current.getBoundingClientRect();
        const dx = cx - (r.left + r.width  / 2);
        const dy = cy - (r.top  + r.height / 2);
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
      style={{ padding: wide ? "40px" : "32px" }}
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

        {/* Icon + number */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              width: "44px", height: "44px", borderRadius: "10px",
              background: `${ACCENT}18`, color: ACCENT,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${ACCENT}25`,
              transition: "background 0.25s, border-color 0.25s",
            }}
            className="group-hover:bg-[rgba(18,100,241,0.25)] group-hover:border-[rgba(18,100,241,0.4)]"
          >
            {service.icon}
          </div>
          <span
            style={{
              fontSize: "11px", fontFamily: "var(--font-bricolage)", fontWeight: 800,
              letterSpacing: "-0.02em", color: "rgba(255,255,255,0.08)",
              lineHeight: 1,
            }}
          >
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-white leading-tight whitespace-pre-line"
          style={{ fontSize: wide ? "clamp(26px, 2.8vw, 38px)" : "clamp(22px, 2.2vw, 30px)" }}
        >
          {service.title}
        </h3>

        {/* Hook */}
        <p
          style={{
            fontSize: "13px", fontWeight: 600, fontStyle: "italic", lineHeight: 1.5,
            color: ACCENT,
          }}
        >
          &ldquo;{service.hook}&rdquo;
        </p>

        {/* Description — only on wide card */}
        {wide && (
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.45)", margin: 0 }}>
            {service.description}
          </p>
        )}

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
            <span style={{ color: "rgba(255,255,255,0.2)" }}>Transparent bepreist.</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-base leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            Sie entscheiden wie Sie zahlen — monatlich oder als Festbetrag. Erster Monat kostenlos, monatlich kündbar.
          </motion.p>
        </motion.div>

        {/* Cards — asymmetric: wide left, 2 stacked right */}
        <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns: "1.45fr 1fr" }}>
          <SpotlightCard service={services[0]} index={0} inView={inView} wide />
          <div className="flex flex-col gap-4">
            {services.slice(1).map((s, i) => (
              <SpotlightCard key={s.id} service={s} index={i + 1} inView={inView} />
            ))}
          </div>
        </div>

        {/* Mobile — vertical stack */}
        <div className="flex flex-col gap-4 lg:hidden">
          {services.map((s, i) => (
            <SpotlightCard key={s.id} service={s} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}
