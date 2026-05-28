"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const C = {
  bg:      "#070503",
  panel:   "#0E0A07",
  accent:  "#F97316",
  accentD: "rgba(249,115,22,0.15)",
  white:   "#FFFFFF",
  muted:   "rgba(255,255,255,0.45)",
  dim:     "rgba(255,255,255,0.12)",
  line:    "rgba(249,115,22,0.1)",
};

const ease = [0.22, 1, 0.36, 1] as const;

const leistungen = [
  { n: "01", t: "Dachdeckerei", d: "Neueindeckung, Dachsanierung & Dachreparatur. Alle Materialien: Ziegel, Blech, Schiefer, Bitumen.", icon: "▲" },
  { n: "02", t: "Fassadenbau",  d: "Wärmedämmverbundsysteme, Klinkerriemchen, Putzfassaden. Energieeffizient & dauerhaft.", icon: "◼" },
  { n: "03", t: "Sanierung",    d: "Energetische Sanierung, Instandsetzung und Modernisierung — für Wohn- und Gewerbegebäude.", icon: "◈" },
];

const stats = [
  { v: "45+",    l: "Jahre Erfahrung" },
  { v: "1.200+", l: "Projekte abgeschlossen" },
  { v: "4.9★",   l: "Google-Bewertung" },
  { v: "48 h",   l: "Reaktionszeit" },
];

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

export default function HandwerkPage() {
  const mobile = useIsMobile();
  const heroRef   = useRef<HTMLElement>(null);
  const leistRef  = useRef<HTMLElement>(null);
  const statsRef  = useRef<HTMLElement>(null);
  const ctaRef    = useRef<HTMLElement>(null);
  const heroInView  = useInView(heroRef,  { once: true, margin: "-80px" });
  const leistInView = useInView(leistRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const ctaInView   = useInView(ctaRef,   { once: true, margin: "-60px" });

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: "var(--font-inter, system-ui, sans-serif)", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: mobile ? "0 20px" : "0 48px",
        background: "rgba(7,5,3,0.9)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.line}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "28px", height: "28px", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 900, color: "#070503", letterSpacing: "-0.02em" }}>BS</span>
          </div>
          <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "-0.02em" }}>Baumeister Söhne GmbH</span>
        </div>
        <div style={{ display: "flex", gap: mobile ? "12px" : "28px", alignItems: "center" }}>
          {!mobile && (
            <a href="#leistungen" style={{ fontSize: "11px", color: C.muted, textDecoration: "none", letterSpacing: "0.08em" }}>Leistungen</a>
          )}
          <a href="#kontakt" style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none",
            background: C.accent, color: "#070503", padding: "8px 18px",
          }}>
            Anfragen
          </a>
          <Link href="/#projekte" style={{ fontSize: "10px", color: C.dim, textDecoration: "none" }}>← LB Digital</Link>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: "100svh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "60px" }}>

        {/* Textured background */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `repeating-linear-gradient(45deg, ${C.accent}04 0px, ${C.accent}04 1px, transparent 1px, transparent 12px)`,
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse 70% 60% at 60% 40%, ${C.accentD} 0%, transparent 70%)`,
        }} />

        {/* Big background number */}
        <motion.div
          aria-hidden
          style={{ position: "absolute", right: mobile ? "-20px" : "0", top: "50%", translateY: "-50%", y: parallaxY, zIndex: 0 }}
        >
          <span style={{
            fontSize: mobile ? "220px" : "360px", fontWeight: 900, lineHeight: 1,
            color: `${C.accent}06`, letterSpacing: "-0.06em", userSelect: "none",
            display: "block",
          }}>
            1978
          </span>
        </motion.div>

        <div style={{ position: "relative", zIndex: 2, padding: mobile ? "80px 24px 60px" : "120px max(6vw, 48px) 80px", maxWidth: "1100px" }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease }}
            style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}
          >
            <div style={{ width: "32px", height: "2px", background: C.accent }} />
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent }}>
              Demo-Design · LB Digital
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            style={{
              fontSize: mobile ? "clamp(48px, 12vw, 72px)" : "clamp(64px, 8vw, 104px)",
              fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em", margin: "0 0 24px",
            }}
          >
            Qualität,<br />
            <span style={{ color: C.accent }}>die hält.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            style={{ fontSize: mobile ? "16px" : "19px", color: C.muted, lineHeight: 1.65, maxWidth: "520px", margin: "0 0 40px" }}
          >
            Dachdeckerei & Fassadenbau in Freiburg und der Region. Familienbetrieb seit 1978 — über 1.200 abgeschlossene Projekte.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.34, ease }}
            style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}
          >
            <a href="#kontakt" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: C.white, color: "#070503",
              padding: mobile ? "14px 28px" : "16px 36px",
              fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em",
              textDecoration: "none",
            }}>
              Kostenlos anfragen
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="#leistungen" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              border: `1px solid rgba(255,255,255,0.16)`, color: C.muted,
              padding: mobile ? "14px 24px" : "16px 32px",
              fontSize: "13px", fontWeight: 600, textDecoration: "none",
            }}>
              Leistungen
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ marginTop: "56px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}
          >
            <div style={{ display: "flex", gap: "3px" }}>
              {[0,1,2,3,4].map(i => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={C.accent}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
              ))}
            </div>
            <span style={{ fontSize: "12px", color: C.muted }}>
              <strong style={{ color: C.white }}>4.9</strong> · 127 Google-Bewertungen
            </span>
            <span style={{ fontSize: "10px", color: C.dim }}>·</span>
            <span style={{ fontSize: "12px", color: C.muted }}>Familienbetrieb seit <strong style={{ color: C.white }}>1978</strong></span>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{
        background: C.panel, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`,
        padding: "48px max(6vw, 48px)",
        display: "grid", gridTemplateColumns: `repeat(${mobile ? 2 : 4}, 1fr)`, gap: "32px",
      }}>
        {stats.map((s, i) => (
          <motion.div key={s.l}
            initial={{ opacity: 0, y: 16 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
          >
            <div style={{ fontSize: mobile ? "28px" : "36px", fontWeight: 900, letterSpacing: "-0.03em", color: C.accent }}>{s.v}</div>
            <div style={{ fontSize: "12px", color: C.muted, marginTop: "4px", lineHeight: 1.5 }}>{s.l}</div>
          </motion.div>
        ))}
      </section>

      {/* LEISTUNGEN */}
      <section id="leistungen" ref={leistRef} style={{ padding: `clamp(60px, 8vw, 100px) max(6vw, 48px)` }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={leistInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: "48px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ width: "28px", height: "2px", background: C.accent }} />
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent }}>Leistungen</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0 }}>
            Was wir für Sie tun.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: "20px" }}>
          {leistungen.map((l, i) => (
            <motion.div key={l.n}
              initial={{ opacity: 0, y: 32 }}
              animate={leistInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.1, ease }}
              style={{
                background: C.panel, border: `1px solid rgba(255,255,255,0.07)`,
                padding: "28px", position: "relative", overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "20px", right: "20px", fontSize: "9px", color: C.accent, fontWeight: 800, letterSpacing: "0.1em" }}>{l.n}</div>
              <div style={{ fontSize: "24px", marginBottom: "16px", color: C.accent }}>{l.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 12px" }}>{l.t}</h3>
              <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.7, margin: 0 }}>{l.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" ref={ctaRef} style={{
        background: C.panel, borderTop: `1px solid ${C.line}`,
        padding: `clamp(60px, 8vw, 100px) max(6vw, 48px)`,
        textAlign: mobile ? "left" : "center",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "8px", height: "8px", background: C.accent }} />
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent }}>Anfrage</span>
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.04em", margin: "0 auto 16px", maxWidth: "640px" }}>
            Projekt besprechen?
          </h2>
          <p style={{ fontSize: "16px", color: C.muted, margin: "0 auto 40px", maxWidth: "480px", lineHeight: 1.65 }}>
            Rufen Sie uns an oder schreiben Sie uns — wir melden uns innerhalb von 48 Stunden.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: mobile ? "flex-start" : "center", flexWrap: "wrap" }}>
            <a href="tel:+497612345678" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: C.white, color: "#070503",
              padding: "16px 36px", fontSize: "13px", fontWeight: 700, textDecoration: "none",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 7.44 7.44l1.42-1.42a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92"/></svg>
              0761 – 123 456 78
            </a>
            <a href="mailto:info@baumeister-soehne.de" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              border: `1px solid rgba(255,255,255,0.16)`, color: C.muted,
              padding: "16px 32px", fontSize: "13px", fontWeight: 600, textDecoration: "none",
            }}>
              Per E-Mail anfragen
            </a>
          </div>

          <div style={{ marginTop: "48px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 20px", border: `1px solid ${C.line}` }}>
            <div style={{ width: "6px", height: "6px", background: "#22C55E", borderRadius: "50%" }} />
            <span style={{ fontSize: "11px", color: C.muted }}>Demo-Projekt von <strong style={{ color: C.white }}>LB Digital</strong> — Ihre Website? <Link href="/#kontakt" style={{ color: C.accent, textDecoration: "none" }}>Jetzt anfragen.</Link></span>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
