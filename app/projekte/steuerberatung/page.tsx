"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────
// Design System · Extreme Neon Fintech
// Tief-Schwarz × Neon-Cyan × Monospace
// ─────────────────────────────────────────────────────────────────────
const C = {
  bg:    "#040407",
  panel: "#08080F",
  cyan:  "#00EEFF",
  cyanA: "rgba(0,238,255,0.15)",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.38)",
  dim:   "rgba(255,255,255,0.10)",
  line:  "rgba(0,238,255,0.12)",
};
const MONO = "'Courier New', 'Lucida Console', monospace";
const SANS = "var(--font-inter, system-ui, sans-serif)";
const ease = [0.16, 1, 0.3, 1] as const;

// ─── Matrix rain columns ──────────────────────────────────────────────
const RAIN = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i / 18) * 100 + 1}%`,
  delay: i * 0.22,
  duration: 3.5 + (i % 5) * 1.1,
  chars: ["€", "%", "§", "4", "8", "2", "0", "1", "9", "3", "7", "5", "€", "%"],
}));


// ─── Magnetic button ─────────────────────────────────────────────────
function MagneticButton({ children, href, primary }: { children: ReactNode; href: string; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.38,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.38,
    });
  }, [isMobile]);

  const onLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: primary ? "16px 44px" : "14px 36px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        cursor: "pointer",
        fontFamily: MONO,
        transition: "box-shadow 0.3s, background 0.2s",
        ...(primary
          ? {
              background: C.cyan,
              color: C.bg,
              boxShadow: hovered
                ? `0 0 60px rgba(0,238,255,0.7), 0 0 120px rgba(0,238,255,0.3)`
                : `0 0 30px rgba(0,238,255,0.4)`,
            }
          : {
              background: "transparent",
              color: C.white,
              border: `1px solid rgba(0,238,255,0.3)`,
              boxShadow: hovered ? `inset 0 0 30px rgba(0,238,255,0.08), 0 0 20px rgba(0,238,255,0.15)` : "none",
            }),
      }}
    >
      {children}
    </motion.a>
  );
}

// ─── 3D Tilt card ────────────────────────────────────────────────────
function TiltCard({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -16, y: (px - 0.5) * 16 });
    setGlow({ x: px * 100, y: py * 100 });
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      style={{ transformStyle: "preserve-3d", position: "relative", overflow: "hidden", ...style }}
    >
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(0,238,255,0.12) 0%, transparent 55%)`,
          transition: "background 0.08s",
        }}
      />
      {children}
    </motion.div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────
function Counter({ to, prefix = "", suffix = "", active }: { to: number; prefix?: string; suffix?: string; active: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = to / 60;
    const t = setInterval(() => {
      cur += step;
      if (cur >= to) { setV(to); clearInterval(t); }
      else setV(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [active, to]);
  return <>{prefix}{v.toLocaleString("de-DE")}{suffix}</>;
}

const leistungen = [
  { n: "01", t: "Jahresabschluss & Bilanz", d: "Präzise Bilanzierung. Fristgerecht. Steueroptimiert. Für GmbH, UG, GbR und Freiberufler.", benefit: "Ihr Abschluss ist keine Pflichtübung — er ist ein Steuerungsinstrument." },
  { n: "02", t: "Lohn & Gehalt", d: "Monatliche Lohnabrechnung, Sozialversicherungsmeldungen und Jahresausgleich aus einer Hand.", benefit: "Keine Fehler, keine Nachzahlungen, kein Stress." },
  { n: "03", t: "Steuerplanung", d: "Wir denken drei Schritte voraus. Legale Gestaltung für Unternehmer und Privatpersonen.", benefit: "Wer plant, zahlt weniger. Ø € 8.200 Ersparnis pro Jahr." },
  { n: "04", t: "GmbH-Gründung", d: "Vom Gesellschaftsvertrag bis zum Handelsregistereintrag. Mit steuerlichem Optimierungskonzept.", benefit: "Die richtige Struktur von Anfang an spart Zehntausende." },
  { n: "05", t: "Betriebsprüfung", d: "Wir begleiten Sie durch jede Prüfung. Vorbereitung, Kommunikation, Abwehr unberechtigter Forderungen.", benefit: "Mit uns an Ihrer Seite haben Prüfer keine leichte Zeit." },
];

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

// ─────────────────────────────────────────────────────────────────────
export default function SteuerberatungPage() {
  const mobile = useIsMobile();

  const heroRef  = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const leistRef = useRef<HTMLElement>(null);
  const ctaRef   = useRef<HTMLElement>(null);

  const heroInView  = useInView(heroRef,  { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const leistInView = useInView(leistRef, { once: true, margin: "-80px" });
  const ctaInView   = useInView(ctaRef,   { once: true, margin: "-80px" });

  const { scrollY } = useScroll();
  const scanY = useTransform(scrollY, [0, 900], ["-5%", "110%"]);

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: SANS, overflowX: "hidden" }}>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: mobile ? "0 24px" : "0 48px",
        background: "rgba(4,4,7,0.88)",
        backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${C.line}`,
      }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <motion.div
              animate={{ boxShadow: [`0 0 0px ${C.cyan}`, `0 0 14px ${C.cyan}`, `0 0 0px ${C.cyan}`] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ width: "8px", height: "8px", background: C.cyan, borderRadius: "50%", flexShrink: 0 }}
            />
            <span style={{ fontSize: mobile ? "12px" : "13px", fontWeight: 700, letterSpacing: "-0.01em", fontFamily: MONO }}>
              Hoffmann Steuerberatung
            </span>
          </div>
        </motion.div>
        <div style={{ display: "flex", gap: mobile ? "16px" : "32px", alignItems: "center" }}>
          {!mobile && ["Leistungen", "Kontakt"].map((l, i) => (
            <motion.a key={l} href={`#${l.toLowerCase()}`}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{ fontSize: "10px", color: C.muted, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: MONO, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.cyan)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >{l}</motion.a>
          ))}
          <Link href="/" style={{ fontSize: "10px", color: C.dim, textDecoration: "none", fontFamily: MONO }}>← LB Digital</Link>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ minHeight: "100svh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>

        {/* Matrix number rain */}
        {RAIN.map(col => (
          <div key={col.id} aria-hidden="true" style={{
            position: "absolute", left: col.left, top: 0, bottom: 0,
            overflow: "hidden", width: "22px", pointerEvents: "none", zIndex: 1,
          }}>
            <motion.div
              animate={{ y: ["-100%", "120%"] }}
              transition={{ duration: col.duration, delay: col.delay, repeat: Infinity, ease: "linear" }}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {col.chars.map((ch, i) => (
                <span key={i} style={{
                  fontSize: "11px", fontFamily: MONO, fontWeight: 700, userSelect: "none",
                  color: i === 0
                    ? C.cyan
                    : `rgba(0,238,255,${0.02 + (1 - i / col.chars.length) * 0.07})`,
                  textShadow: i === 0 ? `0 0 10px ${C.cyan}` : "none",
                }}>{ch}</span>
              ))}
            </motion.div>
          </div>
        ))}

        {/* Horizontal scan line */}
        <motion.div aria-hidden="true" style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          background: `linear-gradient(to right, transparent 0%, ${C.cyan} 40%, ${C.cyan} 60%, transparent 100%)`,
          boxShadow: `0 0 24px ${C.cyan}, 0 0 60px rgba(0,238,255,0.3)`,
          y: scanY, zIndex: 2, pointerEvents: "none",
        }} />

        {/* Grid */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
        }} />

        {/* Glow orb right */}
        <motion.div aria-hidden="true"
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "10%", right: "10%",
            width: "600px", height: "600px", borderRadius: "50%",
            background: `radial-gradient(circle, rgba(0,238,255,0.14) 0%, transparent 70%)`,
            filter: "blur(50px)", pointerEvents: "none", zIndex: 1,
          }}
        />

        <div style={{ position: "relative", zIndex: 10, width: "100%", padding: mobile ? "110px 24px 80px" : "140px 56px 100px" }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px" }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ width: "40px", height: "1px", background: C.cyan, boxShadow: `0 0 8px ${C.cyan}`, transformOrigin: "left" }}
            />
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: C.cyan, fontFamily: MONO }}>
              Steuerberatung · Freiburg · Seit 2009
            </span>
          </motion.div>

          {/* Scramble headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            style={{
              fontSize: mobile ? "clamp(48px, 14vw, 72px)" : "clamp(56px, 10vw, 140px)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
              color: C.white,
              margin: "0 0 36px",
              fontFamily: MONO,
            }}
          >
            Weniger<br />
            <span style={{ color: C.cyan, textShadow: `0 0 80px rgba(0,238,255,0.6), 0 0 160px rgba(0,238,255,0.2)` }}>
              Steuern.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            style={{ fontSize: mobile ? "15px" : "16px", color: C.muted, lineHeight: 1.75, maxWidth: "460px", marginBottom: "48px" }}
          >
            Unsere Mandanten sparen im Schnitt{" "}
            <strong style={{ color: C.white }}>€ 8.200 pro Jahr</strong>.
            Kostenloses Erstgespräch — Antwort innerhalb von 24 Stunden.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.55 }}
            style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}
          >
            <MagneticButton href="#kontakt" primary>
              Erstgespräch vereinbaren →
            </MagneticButton>
            <MagneticButton href="#leistungen">
              Leistungen ansehen
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            style={{ position: "absolute", bottom: "40px", left: mobile ? "24px" : "56px", display: "flex", alignItems: "center", gap: "12px" }}
          >
            <motion.div
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "1px", height: "48px", background: `linear-gradient(to bottom, ${C.cyan}, transparent)`, transformOrigin: "top", boxShadow: `0 0 6px ${C.cyan}` }}
            />
            <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: C.muted, textTransform: "uppercase", fontFamily: MONO }}>Scroll</span>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════════ */}
      <section ref={statsRef} style={{
        background: C.panel,
        borderTop: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        padding: mobile ? "40px 0" : "64px 56px",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "1px", background: C.line }}>
          {[
            { n: 8200,  prefix: "€ ", suffix: "",    label: "Ø Ersparnis p.a." },
            { n: 340,   prefix: "",   suffix: "+",   label: "Aktive Mandate" },
            { n: 15,    prefix: "",   suffix: " J.", label: "Erfahrung" },
            { n: 24,    prefix: "",   suffix: " h",  label: "Erstgespräch-Antwort" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 120 }}
              style={{ background: C.panel, padding: mobile ? "28px 16px" : "44px 32px", textAlign: "center" }}
            >
              <div style={{
                fontSize: mobile ? "clamp(28px, 8vw, 40px)" : "clamp(38px, 4.5vw, 62px)",
                fontWeight: 900,
                fontFamily: MONO,
                color: C.cyan,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                textShadow: `0 0 40px rgba(0,238,255,0.5)`,
              }}>
                <Counter to={s.n} prefix={s.prefix} suffix={s.suffix} active={statsInView} />
              </div>
              <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "12px", fontFamily: MONO }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ LEISTUNGEN ════════════════════════════════════════════ */}
      <section ref={leistRef} id="leistungen" style={{ padding: mobile ? "80px 24px" : "120px 56px", background: C.bg }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={leistInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "80px" }}
        >
          <div style={{ width: "32px", height: "1px", background: C.cyan, boxShadow: `0 0 8px ${C.cyan}` }} />
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: C.cyan, fontFamily: MONO }}>
            Leistungen
          </span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: C.line }}>
          {leistungen.map((l, i) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, y: 70, rotateX: -18 }}
              animate={leistInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.12, ease }}
              style={{ perspective: "900px" }}
            >
              <TiltCard style={{ background: C.panel, padding: mobile ? "28px 24px" : "40px 36px", height: "100%" }}>
                <div style={{ fontSize: "11px", color: C.cyan, letterSpacing: "0.2em", marginBottom: "22px", fontFamily: MONO }}>
                  {l.n}
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "14px", lineHeight: 1.25 }}>
                  {l.t}
                </h3>
                <p style={{ fontSize: "14px", color: C.muted, lineHeight: 1.7, marginBottom: "24px" }}>
                  {l.d}
                </p>
                <div style={{
                  fontSize: "12px", color: C.cyan,
                  borderLeft: `2px solid ${C.cyan}`,
                  boxShadow: `-4px 0 12px rgba(0,238,255,0.2)`,
                  paddingLeft: "14px", lineHeight: 1.6,
                  fontFamily: MONO,
                }}>
                  {l.benefit}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════ */}
      <section ref={ctaRef} id="kontakt" style={{ padding: mobile ? "80px 24px" : "140px 56px", background: C.panel, position: "relative", overflow: "hidden" }}>

        {/* Grid background */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        {/* Pulsing orb center */}
        <motion.div aria-hidden="true"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px", height: "700px", borderRadius: "50%",
            background: `radial-gradient(circle, rgba(0,238,255,0.1) 0%, transparent 65%)`,
            filter: "blur(60px)", pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ position: "relative", zIndex: 2, maxWidth: "760px", margin: "0 auto", textAlign: "center" }}
        >
          <motion.div
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: C.cyan, marginBottom: "28px", fontFamily: MONO }}
          >
            ◆ Kostenloses Erstgespräch
          </motion.div>

          <h2 style={{
            fontSize: mobile ? "clamp(36px, 10vw, 52px)" : "clamp(40px, 6vw, 88px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            marginBottom: "28px",
            fontFamily: MONO,
          }}>
            Wie viel zahlen Sie{" "}
            <span style={{ color: C.cyan, textShadow: `0 0 60px rgba(0,238,255,0.6)` }}>
              zu viel?
            </span>
          </h2>

          <p style={{ fontSize: "16px", color: C.muted, lineHeight: 1.75, marginBottom: "56px", maxWidth: "540px", margin: "0 auto 56px" }}>
            Wir analysieren Ihre Steuerlast kostenfrei. Innerhalb von 24 Stunden wissen Sie, wo Optimierungspotenzial liegt — ohne Verpflichtung.
          </p>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <MagneticButton href="mailto:info@hoffmann-steuer.de" primary>
              Jetzt Termin anfragen →
            </MagneticButton>
            <MagneticButton href="tel:+4976198765432">
              +49 761 987 654–32
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer style={{
        background: C.bg,
        borderTop: `1px solid ${C.line}`,
        padding: mobile ? "20px 24px" : "28px 56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        <span style={{ fontSize: "11px", color: C.dim, letterSpacing: "0.05em", fontFamily: MONO }}>
          © 2025 Hoffmann Steuerberatung GmbH · Freiburg im Breisgau
        </span>
        <Link href="/" style={{ fontSize: "10px", color: C.dim, textDecoration: "none", fontFamily: MONO }}>
          ← Zurück zu LB Digital
        </Link>
      </footer>

    </div>
  );
}
