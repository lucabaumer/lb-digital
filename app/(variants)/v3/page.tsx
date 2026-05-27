"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Space_Grotesk, Nunito_Sans } from "next/font/google";
import ContactModal from "@/components/ui/ContactModal";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-v3-display", display: "swap" });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-v3-body", display: "swap" });

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#07101F",
  card: "#0D1828",
  accent: "#1264F1",
  amber: "#F59E0B",
  textMuted: "rgba(255,255,255,0.55)",
  textSubtle: "rgba(255,255,255,0.35)",
  border: "rgba(255,255,255,0.08)",
  borderHover: "rgba(255,255,255,0.14)",
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.7, ease } },
};

// ─── Helper Components ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: C.amber,
        fontFamily: "var(--font-v3-display)",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: C.amber,
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

function useReveal(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once: true, margin: margin as any });
  return { ref, isInView };
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#leistungen", label: "Leistungen" },
    { href: "#prozess", label: "Prozess" },
    { href: "#preise", label: "Preise" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
          background: scrolled ? "rgba(7,16,31,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 20px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              fontFamily: "var(--font-v3-display)",
              fontSize: "20px",
              fontWeight: 800,
              color: "#fff",
              textDecoration: "none",
              letterSpacing: "-0.04em",
            }}
          >
            LB<span style={{ color: C.amber }}>.</span>Digital
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-v3-body)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              >
                {link.label}
              </a>
            ))}
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(245,158,11,0.45)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: C.amber,
                color: C.bg,
                border: "none",
                borderRadius: "999px",
                padding: "10px 22px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: "pointer",
                fontFamily: "var(--font-v3-display)",
              }}
            >
              Gespräch starten
            </motion.button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "#fff",
              display: "none",
            }}
            className="show-mobile"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {mobileOpen ? (
                <path d="M2 2l18 18M20 2L2 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(7,16,31,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: `1px solid ${C.border}`,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-v3-body)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                }}
              >
                {link.label}
              </a>
            ))}
            <motion.button
              onClick={() => { setMobileOpen(false); onOpenModal(); }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: C.amber,
                color: C.bg,
                border: "none",
                borderRadius: "999px",
                padding: "14px 24px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                marginTop: "12px",
                fontFamily: "var(--font-v3-display)",
              }}
            >
              Gespräch starten
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const metrics = [
    { value: "95+", label: "Lighthouse Score" },
    { value: "< 1s", label: "Ladezeit" },
    { value: "14 Tage", label: "bis live" },
    { value: "ab 1.500€", label: "Festpreis" },
  ];

  const pills = ["Next.js", "Lighthouse 95+", "Kein Template", "2-3 Wochen"];

  return (
    <section
      ref={containerRef}
      style={{
        background: C.bg,
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Background glow with parallax */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          right: "-10%",
          top: "40%",
          y: yParallax,
          width: "clamp(400px, 50vw, 700px)",
          height: "clamp(400px, 50vw, 700px)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(18,100,241,0.13) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 20px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "60px",
          position: "relative",
        }}
        className="hero-grid"
      >
        {/* Left: Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ display: "flex", flexDirection: "column", gap: "28px" }}
        >
          {/* Eyebrow */}
          <motion.div variants={staggerItem}>
            <SectionLabel>Webagentur · Freiburg im Breisgau</SectionLabel>
          </motion.div>

          {/* Headline */}
          <motion.div variants={staggerItem} style={{ overflow: "hidden" }}>
            <h1
              style={{
                fontFamily: "var(--font-v3-display)",
                fontSize: "clamp(52px, 8vw, 110px)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: "#fff",
                margin: 0,
              }}
            >
              <span style={{ display: "block" }}>Websites</span>
              <span style={{ display: "block" }}>
                die{" "}
                <span
                  style={{
                    background: `linear-gradient(135deg, #fff 30%, ${C.accent} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  wirken.
                </span>
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(36px, 5vw, 72px)",
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 700,
                  marginTop: "8px",
                }}
              >
                In Freiburg gebaut.
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-v3-body)",
              fontSize: "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.7,
              color: C.textMuted,
              maxWidth: "520px",
              margin: 0,
            }}
          >
            Individuelle Next.js-Websites für Handwerker, Gastronomie und lokale Unternehmen. Lighthouse 95+, in 2-3 Wochen live.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            variants={staggerItem}
            style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
          >
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(245,158,11,0.45)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: C.amber,
                color: C.bg,
                border: "none",
                borderRadius: "999px",
                padding: "15px 30px",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                cursor: "pointer",
                fontFamily: "var(--font-v3-display)",
                boxShadow: "0 4px 24px rgba(245,158,11,0.35)",
              }}
            >
              Kostenloses Gespräch
            </motion.button>
            <motion.a
              href="tel:+491785881195"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px",
                padding: "15px 24px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                fontFamily: "var(--font-v3-body)",
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2.5C2 2.5 3 1 4.5 1c.5 0 1 .3 1.3.8L7.2 4c.3.5.2 1.1-.2 1.5L6 6.5s.6 1.4 1.5 2.5S10 11 10 11l1-.8c.4-.3 1-.4 1.5-.2l2.2 1.4c.5.3.8.8.8 1.3 0 1.5-1.5 2.5-1.5 2.5-6 1.8-12-7-11-12.5z" fill="rgba(255,255,255,0.6)" />
              </svg>
              0178 5881195
            </motion.a>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            variants={staggerItem}
            style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
          >
            {pills.map((pill) => (
              <span
                key={pill}
                style={{
                  fontFamily: "var(--font-v3-body)",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.45)",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${C.border}`,
                  borderRadius: "999px",
                  padding: "5px 12px",
                  letterSpacing: "0.03em",
                }}
              >
                {pill}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Metric Bento Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {metrics.map((metric, i) => (
            <MetricCard key={i} value={metric.value} label={metric.label} index={i} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 58% 42% !important;
            gap: 40px !important;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}

function MetricCard({ value, label, index }: { value: string; label: string; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(18,100,241,0.3)" : C.border}`,
        borderRadius: "16px",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        cursor: "default",
        transition: "border-color 0.2s",
        boxShadow: hovered ? "0 0 24px rgba(18,100,241,0.12)" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        willChange: "transform",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-v3-display)",
          fontSize: "clamp(26px, 3.5vw, 40px)",
          fontWeight: 800,
          color: C.accent,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-v3-body)",
          fontSize: "13px",
          color: C.textMuted,
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Warum Wir Section ────────────────────────────────────────────────────────
function WarumWirSection() {
  const { ref, isInView } = useReveal();

  const advantages = [
    {
      number: "01",
      title: "Direkte Kommunikation",
      description:
        "Keine Projektmanager, kein Ticketsystem, kein Warteschleife. Sie sprechen direkt mit dem Entwickler, der Ihre Website baut. Antwortzeit: unter 4 Stunden.",
      detail: "Persönlicher Ansprechpartner · kein Zwischenhändler",
    },
    {
      number: "02",
      title: "Kein Template",
      description:
        "Jede Website wird von Grund auf entwickelt. Kein Baukastensystem, kein Wix-Klon. Ergebnis: eine Seite, die Ihr Unternehmen wirklich darstellt.",
      detail: "Next.js · Maßarbeit · einzigartig",
    },
    {
      number: "03",
      title: "Schnell online — 2-3 Wochen",
      description:
        "Von der ersten E-Mail bis zum Go-live in 14-21 Tagen. Kein monatelanger Prozess, kein wochenlages Warten auf Feedback-Runden.",
      detail: "Klarer Zeitplan · schnelle Entscheidungen",
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: C.bg,
        padding: "clamp(80px, 12vw, 140px) 0",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ marginBottom: "64px" }}
        >
          <motion.div variants={staggerItem} style={{ marginBottom: "16px" }}>
            <SectionLabel>Warum LB Digital</SectionLabel>
          </motion.div>
          <motion.h2
            variants={clipReveal}
            style={{
              fontFamily: "var(--font-v3-display)",
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
              maxWidth: "600px",
            }}
          >
            Was uns von einer Webseite aus dem Baukasten unterscheidet
          </motion.h2>
        </motion.div>

        {/* Asymmetric Layout: Large left block + 2 stacked right */}
        <div
          className="warum-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}
        >
          {/* Large feature card — index 0 */}
          <WarumCard advantage={advantages[0]} large isInView={isInView} delay={0} />
          {/* Right column — indices 1, 2 */}
          <div className="warum-right" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <WarumCard advantage={advantages[1]} isInView={isInView} delay={0.1} />
            <WarumCard advantage={advantages[2]} isInView={isInView} delay={0.18} />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .warum-grid {
            grid-template-columns: 1.5fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function WarumCard({
  advantage,
  large = false,
  isInView,
  delay,
}: {
  advantage: { number: string; title: string; description: string; detail: string };
  large?: boolean;
  isInView: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.97 }}
      transition={{ duration: 0.55, ease, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.card,
        border: `1px solid ${hovered ? C.borderHover : C.border}`,
        borderRadius: "20px",
        padding: large ? "40px 36px" : "28px 28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: large ? "28px" : "20px",
        minHeight: large ? "320px" : "auto",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: hovered ? "0 8px 40px rgba(0,0,0,0.25)" : "none",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background number */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "24px",
          bottom: "16px",
          fontFamily: "var(--font-v3-display)",
          fontSize: large ? "120px" : "80px",
          fontWeight: 900,
          color: "rgba(18,100,241,0.06)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {advantage.number}
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: large ? "14px" : "10px" }}>
        <span
          style={{
            fontFamily: "var(--font-v3-display)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.accent,
          }}
        >
          {advantage.number}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-v3-display)",
            fontSize: large ? "clamp(22px, 2.5vw, 30px)" : "clamp(18px, 2vw, 22px)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {advantage.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-v3-body)",
            fontSize: large ? "15px" : "14px",
            color: C.textMuted,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {advantage.description}
        </p>
      </div>

      <span
        style={{
          fontFamily: "var(--font-v3-body)",
          fontSize: "12px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.04em",
        }}
      >
        {advantage.detail}
      </span>
    </motion.div>
  );
}

// ─── Leistungen Section ───────────────────────────────────────────────────────
function LeistungenSection({ onOpenModal }: { onOpenModal: () => void }) {
  const { ref, isInView } = useReveal();

  const services = [
    {
      number: "01",
      title: "Webdesign & Entwicklung",
      benefit: "Mehr Anfragen durch eine Website, die Ihre Kunden wirklich anspricht",
      description:
        "Ihre neue Website ist kein Template und kein Baukastenprojekt. Sie wird in Next.js entwickelt — schnell, sicher und suchmaschinenoptimiert von Anfang an.",
      features: [
        "Next.js — Lighthouse 95+ garantiert",
        "Mobile-First, jede Bildschirmgröße",
        "Kontaktformular & Anruf-Integration",
        "Technisches SEO eingebaut",
      ],
    },
    {
      number: "02",
      title: "Logo & Branding",
      benefit: "Ein Auftritt, der sofort Vertrauen weckt — noch vor dem ersten Gespräch",
      description:
        "Logo, Farbwelt, Typografie — alles aus einer Hand. Ihre Marke bekommt eine klare visuelle Sprache, die auf allen Kanälen funktioniert.",
      features: ["Wordmark + Bildmarke", "Farbpalette & Typografie", "Visitenkarte & Briefpapier"],
    },
    {
      number: "03",
      title: "SEO & lokale Sichtbarkeit",
      benefit: "Gefunden werden von Menschen in Freiburg, die genau jetzt suchen",
      description:
        "Local SEO bringt Sie in die Google-Ergebnisse, wenn jemand in Ihrer Stadt sucht. Google My Business, lokale Keywords, strukturierte Daten.",
      features: ["Google My Business Optimierung", "Lokale Keyword-Strategie", "Schema.org Markup", "Monatliches Reporting"],
    },
  ];

  return (
    <section
      id="leistungen"
      ref={ref}
      style={{
        background: C.bg,
        padding: "clamp(80px, 12vw, 140px) 0",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ marginBottom: "64px" }}
        >
          <motion.div variants={staggerItem} style={{ marginBottom: "16px" }}>
            <SectionLabel>Leistungen</SectionLabel>
          </motion.div>
          <motion.h2
            variants={clipReveal}
            style={{
              fontFamily: "var(--font-v3-display)",
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Was Sie davon haben
          </motion.h2>
        </motion.div>

        {/* Asymmetric Grid: Large left + 2 right */}
        <div
          className="leistungen-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}
        >
          {/* Large primary card */}
          <LeistungCard service={services[0]} large isInView={isInView} delay={0} onCta={onOpenModal} />
          {/* Right stack */}
          <div className="leistungen-right" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <LeistungCard service={services[1]} isInView={isInView} delay={0.1} />
            <LeistungCard service={services[2]} isInView={isInView} delay={0.18} />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .leistungen-grid {
            grid-template-columns: 1.4fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function LeistungCard({
  service,
  large = false,
  isInView,
  delay,
  onCta,
}: {
  service: { number: string; title: string; benefit: string; description: string; features: string[] };
  large?: boolean;
  isInView: boolean;
  delay: number;
  onCta?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.97 }}
      transition={{ duration: 0.55, ease, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: large ? "rgba(18,100,241,0.06)" : C.card,
        border: `1px solid ${hovered ? (large ? "rgba(18,100,241,0.3)" : C.borderHover) : large ? "rgba(18,100,241,0.15)" : C.border}`,
        borderRadius: "20px",
        padding: large ? "40px 36px" : "28px 28px",
        display: "flex",
        flexDirection: "column",
        gap: large ? "24px" : "16px",
        minHeight: large ? "380px" : "auto",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: hovered ? "0 8px 40px rgba(0,0,0,0.2)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "var(--font-v3-display)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.accent,
          }}
        >
          {service.number}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: large ? "12px" : "8px" }}>
        <h3
          style={{
            fontFamily: "var(--font-v3-display)",
            fontSize: large ? "clamp(22px, 2.8vw, 32px)" : "clamp(18px, 2vw, 22px)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-v3-body)",
            fontSize: large ? "15px" : "13px",
            fontWeight: 600,
            color: C.amber,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {service.benefit}
        </p>
        {large && (
          <p
            style={{
              fontFamily: "var(--font-v3-body)",
              fontSize: "15px",
              color: C.textMuted,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {service.description}
          </p>
        )}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
        {service.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-v3-body)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <path d="M2 7l3.5 3.5L12 3.5" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {large && onCta && (
        <motion.button
          onClick={onCta}
          whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(245,158,11,0.4)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: C.amber,
            color: C.bg,
            border: "none",
            borderRadius: "999px",
            padding: "13px 26px",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            cursor: "pointer",
            fontFamily: "var(--font-v3-display)",
            alignSelf: "flex-start",
            marginTop: "auto",
          }}
        >
          Projekt anfragen
        </motion.button>
      )}
    </motion.div>
  );
}

// ─── Prozess Section ──────────────────────────────────────────────────────────
function ProzessSection() {
  const { ref, isInView } = useReveal();

  const steps = [
    {
      number: "01",
      title: "Kennenlernen",
      description: "Wir reden 20 Minuten. Was haben Sie, was brauchen Sie, was wollen Ihre Kunden?",
      duration: "1-2 Tage",
    },
    {
      number: "02",
      title: "Konzept & Design",
      description: "Ich entwickle ein maßgeschneidertes Design-Konzept. Sie geben Feedback, ich verfeinere.",
      duration: "3-5 Tage",
    },
    {
      number: "03",
      title: "Entwicklung",
      description: "Die Website wird in Next.js gebaut. Jeden Tag sehen Sie den Fortschritt.",
      duration: "5-10 Tage",
    },
    {
      number: "04",
      title: "Launch & Betreuung",
      description: "Go-live, Einweisung, Hosting-Setup. Ich bin danach noch für Sie da.",
      duration: "Laufend",
    },
  ];

  return (
    <section
      id="prozess"
      ref={ref}
      style={{
        background: C.card,
        padding: "clamp(80px, 12vw, 140px) 0",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ marginBottom: "64px" }}
        >
          <motion.div variants={staggerItem} style={{ marginBottom: "16px" }}>
            <SectionLabel>Ablauf</SectionLabel>
          </motion.div>
          <motion.h2
            variants={clipReveal}
            style={{
              fontFamily: "var(--font-v3-display)",
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Von der ersten E-Mail bis Go-live
          </motion.h2>
        </motion.div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div
          className="prozess-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2px",
          }}
        >
          {steps.map((step, i) => (
            <ProzessStep key={i} step={step} index={i} isInView={isInView} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .prozess-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProzessStep({
  step,
  index,
  isInView,
  isLast,
}: {
  step: { number: string; title: string; description: string; duration: string };
  index: number;
  isInView: boolean;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease, delay: index * 0.1 }}
      style={{
        padding: "32px 24px",
        position: "relative",
        borderRight: isLast ? "none" : `1px solid ${C.border}`,
      }}
      className="prozess-step"
    >
      {/* Large background number */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontFamily: "var(--font-v3-display)",
          fontSize: "72px",
          fontWeight: 900,
          color: `rgba(18,100,241,0.08)`,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {step.number}
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            background: "rgba(18,100,241,0.12)",
            border: "1px solid rgba(18,100,241,0.25)",
            borderRadius: "10px",
            fontFamily: "var(--font-v3-display)",
            fontSize: "13px",
            fontWeight: 700,
            color: C.accent,
          }}
        >
          {step.number}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-v3-display)",
            fontSize: "18px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {step.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-v3-body)",
            fontSize: "14px",
            color: C.textMuted,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {step.description}
        </p>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "999px",
            padding: "4px 12px",
            fontFamily: "var(--font-v3-body)",
            fontSize: "11px",
            fontWeight: 700,
            color: C.amber,
            letterSpacing: "0.04em",
            alignSelf: "flex-start",
          }}
        >
          {step.duration}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Preise Section ───────────────────────────────────────────────────────────
function PreiseSection({ onOpenModal }: { onOpenModal: () => void }) {
  const { ref, isInView } = useReveal();

  return (
    <section
      id="preise"
      ref={ref}
      style={{
        background: C.bg,
        padding: "clamp(80px, 12vw, 140px) 0",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ marginBottom: "64px" }}
        >
          <motion.div variants={staggerItem} style={{ marginBottom: "16px" }}>
            <SectionLabel>Investition</SectionLabel>
          </motion.div>
          <motion.h2
            variants={clipReveal}
            style={{
              fontFamily: "var(--font-v3-display)",
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Was es kostet.{" "}
            <span style={{ color: C.textMuted }}>Keine Überraschungen.</span>
          </motion.h2>
        </motion.div>

        {/* 2 Cards + text CTA */}
        <div
          className="preise-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", maxWidth: "860px" }}
        >
          {/* Landingpage */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, ease, delay: 0 }}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: "20px",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-v3-display)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.textSubtle,
                  margin: "0 0 10px",
                }}
              >
                Einstieg
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-v3-display)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  margin: "0 0 8px",
                }}
              >
                Landingpage
              </h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-v3-display)",
                    fontSize: "44px",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  ab 1.000€
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-v3-body)",
                  fontSize: "14px",
                  color: C.textMuted,
                  margin: "10px 0 0",
                  lineHeight: 1.6,
                }}
              >
                Eine starke Seite, die ein klares Ziel verfolgt: Anfragen generieren.
              </p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {["1 Seite, 5-7 Sektionen", "Next.js, Mobile-First", "Kontaktformular", "Technisches SEO", "1 Woche Lieferzeit"].map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-v3-body)",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2 7l3.5 3.5L12 3.5" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px",
                padding: "13px 26px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: "pointer",
                fontFamily: "var(--font-v3-display)",
                transition: "border-color 0.15s, background 0.15s",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Anfragen
            </motion.button>
          </motion.div>

          {/* Business Website — highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
            style={{
              background: C.card,
              border: `2px solid ${C.amber}`,
              borderRadius: "20px",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Beliebt badge */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: C.amber,
                color: C.bg,
                borderRadius: "999px",
                padding: "4px 12px",
                fontFamily: "var(--font-v3-display)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Beliebt
            </div>

            <div>
              <p
                style={{
                  fontFamily: "var(--font-v3-display)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.amber,
                  margin: "0 0 10px",
                }}
              >
                Komplett
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-v3-display)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  margin: "0 0 8px",
                }}
              >
                Business-Website
              </h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-v3-display)",
                    fontSize: "44px",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  ab 3.000€
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-v3-body)",
                  fontSize: "14px",
                  color: C.textMuted,
                  margin: "10px 0 0",
                  lineHeight: 1.6,
                }}
              >
                Alles, was ein lokales Unternehmen braucht, um online Kunden zu gewinnen.
              </p>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Mehrere Seiten + Blog optional",
                "Next.js, Lighthouse 95+",
                "Logo & CI (auf Wunsch)",
                "Local SEO vollständig",
                "Google My Business",
                "2-3 Wochen Lieferzeit",
                "3 Monate Support inklusive",
              ].map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-v3-body)",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2 7l3.5 3.5L12 3.5" stroke={C.amber} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(245,158,11,0.45)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: C.amber,
                color: C.bg,
                border: "none",
                borderRadius: "999px",
                padding: "14px 28px",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: "pointer",
                fontFamily: "var(--font-v3-display)",
                boxShadow: "0 4px 24px rgba(245,158,11,0.35)",
                alignSelf: "flex-start",
              }}
            >
              Gespräch starten
            </motion.button>
          </motion.div>
        </div>

        {/* Individualproject text CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          style={{
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-v3-body)",
              fontSize: "14px",
              color: C.textMuted,
            }}
          >
            Individualprojekt? Andere Anforderungen?
          </span>
          <button
            onClick={onOpenModal}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontFamily: "var(--font-v3-body)",
              fontSize: "14px",
              fontWeight: 700,
              color: C.amber,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Wir machen ein Angebot.
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 700px) {
          .preise-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection() {
  const { ref, isInView } = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Warum bringt meine aktuelle Website keine Anfragen?",
      answer:
        "Meistens liegt es an drei Dingen: zu langsam (über 3 Sekunden Ladezeit), kein klares Angebot sichtbar, oder kein einfacher nächster Schritt. Besucher entscheiden in 5 Sekunden. Eine Website, die nicht sofort überzeugt, erzeugt keine Anfragen — egal wie hübsch sie ist.",
    },
    {
      question: "Wie lange dauert die Erstellung?",
      answer:
        "Eine Landingpage ist in ca. 7-10 Tagen fertig. Eine vollständige Business-Website dauert 14-21 Tage. Voraussetzung: Sie liefern Inhalte und Feedback innerhalb von 24 Stunden. Ich halte den Zeitplan ein.",
    },
    {
      question: "Was kostet eine professionelle Website?",
      answer:
        "Eine Landingpage startet ab 1.000 €, eine vollständige Business-Website ab 3.000 €. Das ist ein Festpreis — kein Stundensatz, keine Überraschungen auf der Rechnung. Optional: monatliche Betreuung ab 150 €/Monat.",
    },
    {
      question: "Kann ich die Website später selbst bearbeiten?",
      answer:
        "Ja. Ich baue ein einfaches Content-Management-System ein, wenn Sie das möchten. Alternativ: kleine Änderungen erledige ich auf Anfrage schnell und unkompliziert. Die meisten Kunden bevorzugen das — spart Zeit.",
    },
    {
      question: "Was ist der Unterschied zu Wix oder Jimdo?",
      answer:
        "Wix und Jimdo sind Baukästen: template-basiert, langsam, SEO-technisch limitiert. Meine Websites sind in Next.js gebaut — das schnellste Web-Framework, das es gibt. Lighthouse 95+, individuelle Gestaltung, kein anderes Unternehmen hat dieselbe Seite.",
    },
    {
      question: "Was passiert nach dem Launch?",
      answer:
        "Ich bin nicht weg. Ich biete optionale monatliche Betreuung: Änderungen, SEO-Monitoring, Performance-Updates. Sie können mich aber auch einfach bei Bedarf kontaktieren — ohne Abo-Zwang.",
    },
  ];

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        background: C.card,
        padding: "clamp(80px, 12vw, 140px) 0",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        <div className="faq-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "60px" }}>
          {/* Left: heading */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} style={{ marginBottom: "16px" }}>
              <SectionLabel>FAQ</SectionLabel>
            </motion.div>
            <motion.h2
              variants={clipReveal}
              style={{
                fontFamily: "var(--font-v3-display)",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                margin: "0 0 20px",
              }}
            >
              Häufig gestellte Fragen
            </motion.h2>
            <motion.p
              variants={staggerItem}
              style={{
                fontFamily: "var(--font-v3-body)",
                fontSize: "15px",
                color: C.textMuted,
                lineHeight: 1.7,
                margin: 0,
                maxWidth: "320px",
              }}
            >
              Alles, was Sie wissen sollten, bevor wir sprechen.
            </motion.p>
          </motion.div>

          {/* Right: Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .faq-layout {
            grid-template-columns: 1fr 1.6fr !important;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease, delay: index * 0.07 }}
      style={{
        borderBottom: `1px solid ${C.border}`,
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "22px 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-v3-display)",
            fontSize: "clamp(14px, 1.6vw, 17px)",
            fontWeight: 600,
            color: isOpen ? "#fff" : "rgba(255,255,255,0.8)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            transition: "color 0.15s",
          }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease }}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: isOpen ? C.accent : "rgba(255,255,255,0.06)",
            border: `1px solid ${isOpen ? C.accent : C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "var(--font-v3-body)",
                fontSize: "15px",
                color: C.textMuted,
                lineHeight: 1.75,
                margin: "0 0 24px",
                paddingRight: "44px",
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Kontakt CTA Section ──────────────────────────────────────────────────────
function KontaktSection({ onOpenModal }: { onOpenModal: () => void }) {
  const { ref, isInView } = useReveal();

  return (
    <section
      ref={ref}
      style={{
        background: C.bg,
        padding: "clamp(80px, 12vw, 140px) 0",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ marginBottom: "56px", textAlign: "center" }}
        >
          <motion.div variants={staggerItem} style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
            <SectionLabel>Starten</SectionLabel>
          </motion.div>
          <motion.h2
            variants={clipReveal}
            style={{
              fontFamily: "var(--font-v3-display)",
              fontSize: "clamp(32px, 4.5vw, 60px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Drei Wege, wie Sie starten können
          </motion.h2>
        </motion.div>

        {/* Contact Options */}
        <div
          className="kontakt-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}
        >
          {/* Primary — Rückruf */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, ease, delay: 0 }}
          >
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.01, boxShadow: "0 12px 48px rgba(245,158,11,0.3)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                background: `linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.06) 100%)`,
                border: `1px solid rgba(245,158,11,0.35)`,
                borderRadius: "20px",
                padding: "40px 36px",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  background: "rgba(245,158,11,0.15)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  borderRadius: "12px",
                  color: C.amber,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2.5 3.5C2.5 3.5 4 2 5.5 2c.6 0 1.2.4 1.6 1L9 5.5c.4.6.3 1.4-.3 1.9L7.5 8.5S8.3 10.2 9.5 11.5 13 14 13 14l1.3-1c.5-.4 1.2-.5 1.9-.3L18.5 14.4c.6.4 1 1 1 1.6 0 1.8-1.8 3-1.8 3C11.5 21 2 11.5 2.5 3.5z" fill="currentColor" />
                </svg>
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-v3-display)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    margin: "0 0 6px",
                  }}
                >
                  Rückruf anfordern
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-v3-body)",
                    fontSize: "14px",
                    color: C.textMuted,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  Hinterlassen Sie Ihre Telefonnummer — ich rufe innerhalb von 24 Stunden zurück. Kostenlos, unverbindlich.
                </p>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: C.amber,
                  color: C.bg,
                  borderRadius: "999px",
                  padding: "10px 22px",
                  fontFamily: "var(--font-v3-display)",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  alignSelf: "flex-start",
                }}
              >
                Jetzt anfragen
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Secondary row */}
          <div
            className="kontakt-secondary"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}
          >
            {/* Phone */}
            <motion.a
              href="tel:+491785881195"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                background: "transparent",
                border: `1px solid ${C.border}`,
                borderRadius: "20px",
                padding: "28px 28px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.borderHover)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${C.border}`,
                  borderRadius: "10px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2.5 3.5C2.5 3.5 4 2 5.5 2c.6 0 1.2.4 1.6 1L9 5.5c.4.6.3 1.4-.3 1.9L7.5 8.5S8.3 10.2 9.5 11.5 13 14 13 14l1.3-1c.5-.4 1.2-.5 1.9-.3L18.5 14.4c.6.4 1 1 1 1.6 0 1.8-1.8 3-1.8 3C11.5 21 2 11.5 2.5 3.5z" fill="currentColor" />
                </svg>
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-v3-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 4px",
                  }}
                >
                  Direkt anrufen
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-v3-body)",
                    fontSize: "14px",
                    color: C.textMuted,
                    margin: 0,
                  }}
                >
                  0178 5881195
                </p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:hallo@lb-digital.agency"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.18 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                background: "transparent",
                border: `1px solid ${C.border}`,
                borderRadius: "20px",
                padding: "28px 28px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.borderHover)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${C.border}`,
                  borderRadius: "10px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="3.5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 6l8 5.5L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-v3-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 4px",
                  }}
                >
                  E-Mail schreiben
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-v3-body)",
                    fontSize: "14px",
                    color: C.textMuted,
                    margin: 0,
                  }}
                >
                  hallo@lb-digital.agency
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .kontakt-grid {
            grid-template-columns: 1.3fr 1fr !important;
          }
          .kontakt-secondary {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <footer
      style={{
        background: "#040C1A",
        borderTop: `1px solid ${C.border}`,
        padding: "60px 0 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Top row */}
        <div
          className="footer-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px", marginBottom: "48px" }}
        >
          {/* Logo + tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span
              style={{
                fontFamily: "var(--font-v3-display)",
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.04em",
              }}
            >
              LB<span style={{ color: C.amber }}>.</span>Digital
            </span>
            <p
              style={{
                fontFamily: "var(--font-v3-body)",
                fontSize: "14px",
                color: C.textMuted,
                lineHeight: 1.7,
                margin: 0,
                maxWidth: "260px",
              }}
            >
              Webdesign & SEO aus Freiburg im Breisgau.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-v3-display)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                margin: "0 0 16px",
              }}
            >
              Navigation
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["#leistungen", "#prozess", "#preise", "#faq"].map((href, i) => {
                const labels = ["Leistungen", "Prozess", "Preise", "FAQ"];
                return (
                  <a
                    key={href}
                    href={href}
                    style={{
                      fontFamily: "var(--font-v3-body)",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {labels[i]}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-v3-display)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                margin: "0 0 16px",
              }}
            >
              Kontakt
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="tel:+491785881195"
                style={{
                  fontFamily: "var(--font-v3-body)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                0178 5881195
              </a>
              <a
                href="mailto:hallo@lb-digital.agency"
                style={{
                  fontFamily: "var(--font-v3-body)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                hallo@lb-digital.agency
              </a>
              <span
                style={{
                  fontFamily: "var(--font-v3-body)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Freiburg im Breisgau
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-v3-body)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © 2025 LB Digital. Alle Rechte vorbehalten.
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            <a
              href="/impressum"
              style={{
                fontFamily: "var(--font-v3-body)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.25)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              style={{
                fontFamily: "var(--font-v3-body)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.25)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
            >
              Datenschutz
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function V3Page() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`${spaceGrotesk.variable} ${nunitoSans.variable}`}
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: "var(--font-v3-body)",
        color: "#fff",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <HeroSection onOpenModal={() => setModalOpen(true)} />
      <WarumWirSection />
      <LeistungenSection onOpenModal={() => setModalOpen(true)} />
      <ProzessSection />
      <PreiseSection onOpenModal={() => setModalOpen(true)} />
      <FAQSection />
      <KontaktSection onOpenModal={() => setModalOpen(true)} />
      <Footer onOpenModal={() => setModalOpen(true)} />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
