"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────
// Design System · Institutionelle Macht
// Warmes Anthrazit × Blutrot × Platin-Weiß × Serif
// ─────────────────────────────────────────────────────────────────────
const C = {
  bg:    "#0A0907",
  bgAlt: "#100E0C",
  card:  "#141210",
  red:   "#C41E1E",
  redG:  "rgba(196,30,30,0.12)",
  white: "#FAFAF8",
  muted: "rgba(250,250,248,0.42)",
  dim:   "rgba(250,250,248,0.14)",
  line:  "rgba(250,250,248,0.08)",
  lineR: "rgba(196,30,30,0.22)",
};
const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS  = "var(--font-inter, system-ui, sans-serif)";
const ease  = [0.22, 1, 0.36, 1] as const;

// ─── Marquee items ────────────────────────────────────────────────────
const MARQUEE = [
  "Immobilienrecht", "Erbrecht", "Familienrecht",
  "Gesellschaftsrecht", "Vertragsrecht", "Arbeitsrecht",
  "Immobilienrecht", "Erbrecht", "Familienrecht",
  "Gesellschaftsrecht", "Vertragsrecht", "Arbeitsrecht",
];

// ─── Headline words for clip reveal ──────────────────────────────────
const H_LINE1 = ["Ihr", "Problem."];
const H_LINE2 = ["Unsere", "Stärke."];

// ─── useIsMobile ──────────────────────────────────────────────────────
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

// ─── Counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "", active }: { to: number; suffix?: string; active: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = to / 70;
    const t = setInterval(() => {
      cur += step;
      if (cur >= to) { setV(to); clearInterval(t); }
      else setV(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [active, to]);
  return <>{v.toLocaleString("de-DE")}{suffix}</>;
}

// ─── Gradient border card (21.dev inspired) ───────────────────────────
function GlowCard({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: C.card,
        border: `1px solid ${hover ? C.lineR : C.line}`,
        transition: "border-color 0.3s",
        ...style,
      }}
    >
      {hover && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle 180px at ${pos.x}px ${pos.y}px, rgba(196,30,30,0.09) 0%, transparent 70%)`,
        }} />
      )}
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────
const gebiete = [
  { n: "01", t: "Immobilienrecht", d: "Kauf, Verkauf, WEG-Recht, Mietstreitigkeiten, Baurecht. Vollumfängliche Vertretung vom Vertragsentwurf bis zum Prozess." },
  { n: "02", t: "Erbrecht", d: "Testament, Erbauseinandersetzung, Pflichtteilsansprüche, Nachlassverwaltung. Diskret. Präzise." },
  { n: "03", t: "Familienrecht", d: "Scheidung, Sorgerecht, Unterhalt, Zugewinnausgleich. Mit Erfahrung und ohne Eskalation." },
  { n: "04", t: "Gesellschaftsrecht", d: "GmbH-Gründung, Gesellschaftervereinbarungen, M&A, Umstrukturierungen und Liquidation." },
  { n: "05", t: "Vertragsrecht", d: "Vertragsgestaltung, Prüfung und Verhandlung. Keine Formulare — individuelle Lösungen." },
  { n: "06", t: "Arbeitsrecht", d: "Kündigung, Abfindung, Betriebsrat, Arbeitszeugnis. Für Arbeitgeber und Arbeitnehmer." },
];

const situations = [
  "Sie erhalten eine Kündigung?",
  "Ein Erbschaftsstreit belastet die Familie?",
  "Ein Vertragspartner hält sich nicht an Absprachen?",
  "Sie kaufen oder verkaufen eine Immobilie?",
  "Eine Trennung steht bevor?",
  "Das Finanzamt prüft Ihr Unternehmen?",
];

const team = [
  { name: "Dr. Thomas Wagner", role: "Gründungspartner · Immobilienrecht", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85" },
  { name: "Katrin Bauer", role: "Partnerin · Familien & Erbrecht", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85" },
  { name: "Michael Hoffmann", role: "Associate · Gesellschaftsrecht", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=85" },
];

// ─────────────────────────────────────────────────────────────────────
export default function KanzleiPage() {
  const mobile = useIsMobile();

  // Cursor spotlight
  const heroRef   = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState({ x: -999, y: -999 });
  const onHeroMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const statsRef   = useRef<HTMLElement>(null);
  const situRef    = useRef<HTMLElement>(null);
  const gebietRef  = useRef<HTMLElement>(null);
  const teamRef    = useRef<HTMLElement>(null);
  const ctaRef     = useRef<HTMLElement>(null);

  const statsInView  = useInView(statsRef,  { once: true, margin: "-60px" });
  const situInView   = useInView(situRef,   { once: true, margin: "-80px" });
  const gebietInView = useInView(gebietRef, { once: true, margin: "-80px" });
  const teamInView   = useInView(teamRef,   { once: true, margin: "-80px" });
  const ctaInView    = useInView(ctaRef,    { once: true, margin: "-80px" });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 80]);

  const P = mobile ? "24px" : "56px";

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: SANS, overflowX: "hidden" }}>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <header>
        <nav
          aria-label="Hauptnavigation"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: `20px ${P}`,
            background: "rgba(10,9,7,0.88)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.white, fontFamily: SERIF }}>
                Wagner <span style={{ color: C.red }}>&</span> Partner
              </div>
              <div style={{ fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: C.dim, marginTop: "4px" }}>
                Rechtsanwälte · Freiburg
              </div>
            </div>
          </motion.div>

          {!mobile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ display: "flex", gap: "36px", alignItems: "center" }}
            >
              {["Rechtsgebiete", "Team", "Kontakt"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  style={{ fontSize: "11px", color: C.muted, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                >{l}</a>
              ))}
              <a href="#kontakt" style={{
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                color: C.bg, background: C.red, padding: "9px 22px", textDecoration: "none",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >Erstgespräch</a>
              <Link href="/" style={{ fontSize: "10px", color: C.dim, textDecoration: "none" }}>← LB Digital</Link>
            </motion.div>
          )}
        </nav>
      </header>

      <main>
        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          aria-label="Willkommensbereich"
          onMouseMove={onHeroMove}
          style={{ minHeight: "100svh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}
        >
          {/* Background photo */}
          <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
            <Image
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=75"
              alt="Kanzlei Wagner & Partner – Rechtsanwälte in Freiburg im Breisgau"
              fill
              priority
              quality={80}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
          </motion.div>

          {/* Dark overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(110deg, rgba(10,9,7,0.97) 0%, rgba(10,9,7,0.88) 50%, rgba(10,9,7,0.55) 100%)",
          }} />

          {/* Cursor spotlight — 21.dev style */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
            background: `radial-gradient(circle 380px at ${cursor.x}px ${cursor.y}px, rgba(196,30,30,0.07) 0%, transparent 70%)`,
            transition: "background 0.04s",
          }} />

          {/* Red accent line left */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            style={{
              position: "absolute", left: P, top: "15%", bottom: "15%",
              width: "2px", background: C.red,
              boxShadow: `0 0 20px rgba(196,30,30,0.5)`,
              transformOrigin: "top", zIndex: 4,
            }}
          />

          <div style={{ position: "relative", zIndex: 10, width: "100%", padding: `120px ${P} 80px` }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "48px" }}
            >
              <div style={{ width: "24px", height: "1px", background: C.red }} />
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: C.red }}>
                Rechtsanwälte · Freiburg · Gegründet 1989
              </span>
            </motion.div>

            {/* Headline — word-by-word clip reveal */}
            <h1 style={{ margin: "0 0 36px", fontFamily: SERIF, lineHeight: 0.95 }}>
              {[H_LINE1, H_LINE2].map((line, li) => (
                <div key={li} style={{ display: "block", overflow: "hidden" }}>
                  {line.map((word, wi) => (
                    <motion.span
                      key={wi}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ duration: 1.0, delay: 0.6 + li * 0.28 + wi * 0.14, ease }}
                      style={{
                        display: "inline-block",
                        marginRight: "0.22em",
                        fontSize: mobile ? "clamp(52px, 14vw, 72px)" : "clamp(72px, 10vw, 130px)",
                        fontWeight: 300,
                        letterSpacing: "-0.03em",
                        color: wi === 1 && li === 0 ? C.red : C.white,
                        textShadow: wi === 1 && li === 0 ? `0 0 60px rgba(196,30,30,0.4)` : "none",
                        fontStyle: li === 1 ? "italic" : "normal",
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease }}
              style={{ fontSize: mobile ? "15px" : "17px", color: C.muted, lineHeight: 1.75, maxWidth: "500px", marginBottom: "48px" }}
            >
              Ob Erbstreit, Kündigung oder Immobilientransaktion — wir setzen Ihr Recht durch.
              Das erste Gespräch ist <strong style={{ color: C.white }}>kostenlos und unverbindlich</strong>.
              Antwort innerhalb von 24 Stunden.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.55, ease }}
              style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}
            >
              <a href="#kontakt" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: C.red, color: C.white,
                padding: mobile ? "14px 28px" : "16px 44px",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", textDecoration: "none",
                boxShadow: "0 0 40px rgba(196,30,30,0.35)",
                transition: "box-shadow 0.3s, opacity 0.2s",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 0 70px rgba(196,30,30,0.6)";
                  e.currentTarget.style.opacity = "0.92";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(196,30,30,0.35)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Jetzt kostenlos beraten lassen →
              </a>
              <a href="tel:+4976112345678" style={{
                fontSize: "13px", color: C.muted, textDecoration: "none",
                letterSpacing: "0.04em", transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >
                +49 761 123 456–0
              </a>
            </motion.div>

            {/* Trust bar bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
              style={{
                marginTop: "72px",
                display: "flex", gap: mobile ? "28px" : "48px",
                paddingTop: "32px",
                borderTop: `1px solid ${C.line}`,
              }}
            >
              {[
                { val: "35+", lab: "Jahre Erfahrung" },
                { val: "2.400+", lab: "Betreute Mandate" },
                { val: "98%", lab: "Erfolgsquote" },
                { val: "0 €", lab: "Erstgespräch" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: mobile ? "20px" : "26px", fontWeight: 900, color: C.red, letterSpacing: "-0.03em", fontFamily: SERIF }}>{s.val}</div>
                  <div style={{ fontSize: "10px", color: C.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "4px" }}>{s.lab}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ MARQUEE ═══════════════════════════════════════════════ */}
        <div aria-hidden="true" style={{
          background: C.red, overflow: "hidden", padding: "14px 0",
          borderTop: `1px solid rgba(196,30,30,0.4)`,
        }}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ display: "flex", gap: "0", whiteSpace: "nowrap" }}
          >
            {MARQUEE.map((item, i) => (
              <span key={i} style={{
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.85)",
                padding: "0 32px",
              }}>
                {item}
                <span style={{ marginLeft: "32px", opacity: 0.5 }}>·</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ══ SITUATIONS — Lead trigger ═════════════════════════════ */}
        <section ref={situRef} style={{ padding: mobile ? "80px 24px" : "100px 56px", background: C.bgAlt }}>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "64px", alignItems: "center" }}>

            <div>
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={situInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease }}
                style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}
              >
                <div style={{ width: "24px", height: "1px", background: C.red }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: C.red }}>Wir helfen bei</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={situInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                style={{ fontSize: mobile ? "clamp(32px, 9vw, 48px)" : "clamp(40px, 5vw, 64px)", fontWeight: 300, fontFamily: SERIF, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "24px" }}
              >
                Stehen Sie vor einer
                <em style={{ fontStyle: "italic", color: C.red }}> rechtlichen Herausforderung?</em>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={situInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ fontSize: "15px", color: C.muted, lineHeight: 1.8, maxWidth: "440px", marginBottom: "36px" }}
              >
                Jeder rechtliche Fall ist einzigartig — und jeder verdient eine individuelle, kompetente Lösung.
                Seit 1989 vertreten wir Mandanten in Freiburg und dem gesamten Breisgau.
              </motion.p>
              <motion.a
                initial={{ opacity: 0 }}
                animate={situInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                href="#kontakt"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: C.red, textDecoration: "none", borderBottom: `1px solid ${C.red}`,
                  paddingBottom: "4px", transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Kostenloses Erstgespräch anfragen →
              </motion.a>
            </div>

            {/* Situations list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {situations.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={situInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease }}
                  style={{
                    display: "flex", alignItems: "center", gap: "20px",
                    padding: "18px 0",
                    borderBottom: `1px solid ${C.line}`,
                    cursor: "default",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", background: C.red, borderRadius: "50%", flexShrink: 0, boxShadow: `0 0 8px ${C.red}` }} />
                  <span style={{ fontSize: mobile ? "14px" : "16px", color: C.muted, lineHeight: 1.4 }}>{s}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════════════════ */}
        <section ref={statsRef} style={{
          background: C.bg,
          borderTop: `1px solid ${C.line}`,
          borderBottom: `1px solid ${C.line}`,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "1px", background: C.line }}>
            {[
              { to: 35,   suffix: "+",  label: "Jahre Erfahrung"      },
              { to: 2400, suffix: "+",  label: "Betreute Mandate"     },
              { to: 98,   suffix: "%",  label: "Erfolgsquote"         },
              { to: 0,    suffix: " €", label: "Erstgespräch"         },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1, type: "spring", stiffness: 100 }}
                style={{ background: C.bg, padding: mobile ? "40px 20px" : "56px 40px", textAlign: "center" }}
              >
                <div style={{
                  fontSize: mobile ? "clamp(36px, 10vw, 52px)" : "clamp(44px, 5vw, 72px)",
                  fontWeight: 900, fontFamily: SERIF,
                  color: C.white, letterSpacing: "-0.04em", lineHeight: 1,
                }}>
                  {s.to === 0 ? "0 €" : <Counter to={s.to} suffix={s.suffix} active={statsInView} />}
                </div>
                <div style={{ fontSize: "10px", color: C.dim, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "12px" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ RECHTSGEBIETE — Hover reveal grid ════════════════════ */}
        <section ref={gebietRef} id="rechtsgebiete" style={{ padding: mobile ? "80px 24px" : "120px 56px", background: C.bgAlt }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={gebietInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "72px" }}
          >
            <div style={{ width: "28px", height: "1px", background: C.red }} />
            <h2 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.red, margin: 0 }}>
              Rechtsgebiete
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: "1px", background: C.line }}>
            {gebiete.map((g, i) => (
              <motion.div
                key={g.n}
                initial={{ opacity: 0, y: 48 }}
                animate={gebietInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.09, ease }}
              >
                <GlowCard style={{ padding: "40px 36px", height: "100%" }}>
                  <div style={{ fontSize: "10px", color: C.red, letterSpacing: "0.2em", marginBottom: "20px", fontWeight: 600 }}>{g.n}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "16px", lineHeight: 1.2, fontFamily: SERIF }}>{g.t}</h3>
                  <p style={{ fontSize: "14px", color: C.muted, lineHeight: 1.75 }}>{g.d}</p>
                  <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <a href="#kontakt" style={{
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em",
                      textTransform: "uppercase", color: C.red, textDecoration: "none",
                      borderBottom: `1px solid rgba(196,30,30,0.3)`, paddingBottom: "2px",
                      transition: "border-color 0.2s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = C.red)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(196,30,30,0.3)")}
                    >
                      Beratung anfragen →
                    </a>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ TEAM ══════════════════════════════════════════════════ */}
        <section ref={teamRef} id="team" style={{ padding: mobile ? "80px 24px" : "120px 56px", background: C.bg }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "72px" }}
          >
            <div style={{ width: "28px", height: "1px", background: C.red }} />
            <h2 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.red, margin: 0 }}>
              Das Team
            </h2>
          </motion.div>

          <div style={{ display: "flex", gap: "0", paddingRight: mobile ? "0" : "56px", flexDirection: mobile ? "column" : "row" }}>
            {team.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease }}
                style={{
                  flex: mobile ? "none" : (i === 0 ? "0 0 42%" : "0 0 29%"),
                  paddingRight: mobile ? "0" : "32px",
                  marginBottom: mobile ? "40px" : "0",
                  paddingTop: mobile ? "0" : (i === 1 ? "48px" : i === 2 ? "96px" : "0"),
                }}
              >
                <div style={{ position: "relative", overflow: "hidden", marginBottom: "20px", aspectRatio: i === 0 ? "3/4" : "2/3" }}>
                  <Image src={t.img} alt={`${t.name} – Rechtsanwalt bei Wagner & Partner Freiburg`} fill quality={75} sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", filter: "grayscale(20%)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(10,9,7,0.75) 100%)" }} />
                  {/* Red bottom accent */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: C.red }} />
                </div>
                <h3 style={{ fontSize: i === 0 ? "18px" : "15px", fontWeight: 700, color: C.white, letterSpacing: "-0.01em", marginBottom: "6px", fontFamily: SERIF }}>{t.name}</h3>
                <p style={{ fontSize: "11px", color: C.dim, letterSpacing: "0.08em" }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ CTA — Lead section ════════════════════════════════════ */}
        <section ref={ctaRef} id="kontakt" style={{ background: C.bgAlt, borderTop: `1px solid ${C.line}`, padding: mobile ? "80px 24px" : "120px 56px", position: "relative", overflow: "hidden" }}>

          {/* Red glow */}
          <motion.div aria-hidden="true"
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 7, repeat: Infinity }}
            style={{
              position: "absolute", top: "50%", right: "10%",
              transform: "translate(0, -50%)",
              width: "500px", height: "500px", borderRadius: "50%",
              background: `radial-gradient(circle, ${C.red} 0%, transparent 70%)`,
              filter: "blur(80px)", pointerEvents: "none",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr auto", gap: "80px", alignItems: "start" }}
          >
            <div>
              <h2 style={{
                fontSize: mobile ? "clamp(40px, 12vw, 56px)" : "clamp(52px, 6vw, 88px)",
                fontWeight: 300, fontFamily: SERIF, letterSpacing: "-0.03em",
                lineHeight: 1.0, marginBottom: "20px",
              }}>
                Ihr Fall —<br />
                <em style={{ fontStyle: "italic", color: C.red }}>kostenlos geprüft.</em>
              </h2>
              <div style={{ width: "48px", height: "2px", background: C.red, marginBottom: "28px" }} />
              <p style={{ fontSize: "16px", color: C.muted, lineHeight: 1.8, maxWidth: "440px" }}>
                Das erste Gespräch ist kostenlos, unverbindlich und vollständig vertraulich.
                Wir hören zu — bevor wir handeln.
              </p>
            </div>

            <div style={{ minWidth: mobile ? "auto" : "300px" }}>
              <a href="tel:+4976112345678" style={{
                display: "flex", flexDirection: "column", gap: "6px",
                background: C.red, color: C.white, padding: "32px 36px",
                textDecoration: "none",
                boxShadow: "0 0 60px rgba(196,30,30,0.3)",
                transition: "box-shadow 0.3s",
              }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 100px rgba(196,30,30,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 60px rgba(196,30,30,0.3)")}
              >
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7 }}>Direkt anrufen</span>
                <span style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.02em", fontFamily: SERIF }}>+49 761 123 456–0</span>
              </a>

              <a href="mailto:kontakt@wagner-partner.de" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", color: C.muted,
                padding: "18px 36px", fontSize: "13px",
                textDecoration: "none",
                border: `1px solid ${C.line}`, borderTop: "none",
                transition: "background 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.color = C.white; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}
              >
                kontakt@wagner-partner.de
              </a>

              <p style={{ fontSize: "11px", color: C.dim, marginTop: "20px", lineHeight: 1.7 }}>
                Kanzlei Wagner & Partner<br />
                Bertoldstraße 14 · 79098 Freiburg
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer style={{
        background: C.bg, borderTop: `1px solid ${C.line}`,
        padding: `20px ${P}`,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px",
      }}>
        <span style={{ fontSize: "11px", color: C.dim, letterSpacing: "0.08em" }}>
          © 2026 Wagner & Partner Rechtsanwälte · Freiburg im Breisgau
        </span>
        <Link href="/" style={{ fontSize: "10px", color: C.dim, textDecoration: "none" }}>Demo von LB Digital</Link>
      </footer>

    </div>
  );
}
