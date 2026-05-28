"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#F97316";

// ─── Hero-Vorschau: sieht aus wie eine echte Website ──────────────

function HandwerkHero() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>

      {/* Hintergrundtextur */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(45deg, ${ACCENT}05 0px, ${ACCENT}05 1px, transparent 1px, transparent 10px)`,
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 60% 55% at 65% 40%, rgba(249,115,22,0.12) 0%, transparent 70%)`,
      }} />

      {/* Mini-Nav */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(7,5,3,0.7)", backdropFilter: "blur(8px)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "20px", height: "20px", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "7px", fontWeight: 900, color: "#070503", letterSpacing: "-0.02em" }}>BS</span>
          </div>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Baumeister Söhne GmbH</span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "7px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>LEISTUNGEN</span>
          <div style={{ background: ACCENT, padding: "4px 10px" }}>
            <span style={{ fontSize: "7px", fontWeight: 700, color: "#070503", letterSpacing: "0.06em" }}>ANFRAGEN</span>
          </div>
        </div>
      </div>

      {/* Hero-Inhalt */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, padding: "28px 24px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

        <div>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <div style={{ width: "20px", height: "1.5px", background: ACCENT }} />
            <span style={{ fontSize: "7px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>
              Seit 1978 · Freiburg im Breisgau
            </span>
          </div>

          {/* Headline */}
          <div style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em", color: "#FFFFFF" }}>
            Qualität,
          </div>
          <div style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em", color: ACCENT, marginBottom: "14px" }}>
            die hält.
          </div>

          {/* Sub */}
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: "0 0 20px", maxWidth: "340px" }}>
            Dachdeckerei & Fassadenbau für Privat und Gewerbe. Über 1.200 abgeschlossene Projekte in der Region.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <div style={{ background: "#FFFFFF", padding: "8px 16px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "8px", fontWeight: 700, color: "#070503", letterSpacing: "0.04em" }}>Kostenlos anfragen</span>
              <span style={{ fontSize: "8px", color: "#070503" }}>→</span>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.15)", padding: "8px 14px" }}>
              <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>Leistungen</span>
            </div>
          </div>
        </div>

        {/* Trust */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", gap: "2px" }}>
            {[0,1,2,3,4].map(i => (
              <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill={ACCENT}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
            ))}
          </div>
          <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>
            <span style={{ color: "#fff", fontWeight: 700 }}>4.9</span> · 127 Google-Bewertungen
          </span>
          <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.15)" }}>·</span>
          <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }}>Familienbetrieb seit <span style={{ color: "#fff", fontWeight: 700 }}>1978</span></span>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────

export default function WorkSection() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="projekte"
      ref={ref}
      style={{
        background: "#070C17",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "clamp(64px, 9vw, 120px) max(5vw, 32px)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{ marginBottom: "48px", maxWidth: "640px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <div style={{ width: "28px", height: "1px", background: "#3B82F6" }} />
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3B82F6" }}>
            Referenzprojekte
          </span>
        </div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#FFFFFF", margin: 0 }}>
          Unsere Arbeit —{" "}
          <span style={{ color: "rgba(255,255,255,0.28)" }}>für sich selbst sprechend.</span>
        </h2>
      </motion.div>

      {/* Karte */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.12, ease }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ maxWidth: "780px" }}
      >
        <Link href="/projekte/handwerk" style={{ textDecoration: "none", display: "block" }}>
          <motion.div
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              height: "clamp(380px, 52vh, 540px)",
              background: "#090704",
              border: `1px solid ${hovered ? ACCENT + "55" : "rgba(255,255,255,0.08)"}`,
              boxShadow: hovered
                ? `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${ACCENT}22`
                : "0 8px 40px rgba(0,0,0,0.5)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            <HandwerkHero />

            {/* Demo-Badge */}
            <div style={{
              position: "absolute", top: "52px", left: "14px",
              fontSize: "7px", fontWeight: 700, letterSpacing: "0.1em",
              padding: "3px 8px",
              background: `${ACCENT}20`, color: ACCENT,
              border: `1px solid ${ACCENT}30`,
              borderRadius: "3px",
            }}>
              DEMO-DESIGN
            </div>

            {/* Hover-Pfeil */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute", bottom: "20px", right: "20px",
                width: "36px", height: "36px", borderRadius: "50%",
                background: ACCENT,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Karten-Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px", padding: "0 4px" }}
          >
            <div>
              <p style={{ fontSize: "14px", fontWeight: 800, color: "#FFFFFF", margin: "0 0 2px", letterSpacing: "-0.01em" }}>
                Baumeister Söhne GmbH
              </p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
                Dachdeckerei & Fassadenbau · Freiburg
              </p>
            </div>
            <span style={{ fontSize: "11px", color: hovered ? ACCENT : "rgba(255,255,255,0.25)", transition: "color 0.2s", fontWeight: 600 }}>
              Demo ansehen →
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
