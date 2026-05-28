"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;
const O = "#F97316";

const HERO_IMG = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80&auto=format&fit=crop";

// ─── Vorschau: sieht 1:1 aus wie der echte Kern-Elektro-Hero ──────

function KernElektroPreview() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>

      {/* Hintergrundfoto */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMG}
        alt=""
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
      />
      {/* Overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(5,5,10,0.93) 0%, rgba(5,5,10,0.55) 50%, rgba(5,5,10,0.18) 100%)",
      }} />

      {/* Mini-Nav */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "13px 20px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "20px", height: "20px", background: O, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="9" height="9" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span style={{ fontSize: "9px", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>
            KERN <span style={{ fontWeight: 400, opacity: 0.5 }}>Elektrotechnik</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {["Leistungen", "Projekte"].map(l => (
            <span key={l} style={{ fontSize: "7px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>{l}</span>
          ))}
          <div style={{ background: O, padding: "4px 10px" }}>
            <span style={{ fontSize: "7px", fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>Notdienst 24/7</span>
          </div>
        </div>
      </div>

      {/* Hero-Content — unten */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 20px 20px", zIndex: 2 }}>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <div style={{ width: "22px", height: "1.5px", background: O }} />
          <span style={{ fontSize: "7px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: O }}>
            Meisterbetrieb · Freiburg seit 1987
          </span>
        </div>

        {/* Headline */}
        <div style={{ fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: 800, lineHeight: 0.97, letterSpacing: "-0.035em", color: "#fff", marginBottom: "14px" }}>
          Ihr Elektriker<br /><span style={{ color: O }}>in Freiburg.</span>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          <div style={{ background: O, padding: "8px 16px" }}>
            <span style={{ fontSize: "8px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>Kostenloses Erstgespräch →</span>
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "8px 14px" }}>
            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.6)" }}>Leistungen</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "24px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}>
          {[["37+", "Jahre"], ["1800+", "Projekte"], ["24/7", "Notdienst"], ["4.9★", "Google"]].map(([n, l], i) => (
            <div key={i}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{n}</div>
              <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.38)", marginTop: "2px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────

export default function WorkSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
        <Link href="/projekte/kern-elektro" style={{ textDecoration: "none", display: "block" }}>
          <motion.div
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            style={{
              position: "relative",
              overflow: "hidden",
              height: "clamp(400px, 55vh, 560px)",
              background: "#05050A",
              border: `1px solid ${hovered ? O + "55" : "rgba(255,255,255,0.08)"}`,
              boxShadow: hovered
                ? `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${O}22`
                : "0 8px 40px rgba(0,0,0,0.5)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            <KernElektroPreview />

            {/* Hover-Pfeil */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute", bottom: "20px", right: "20px",
                width: "36px", height: "36px", borderRadius: "50%",
                background: O, display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 10,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                KERN Elektrotechnik
              </p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
                Elektroinstallation · Freiburg im Breisgau
              </p>
            </div>
            <span style={{ fontSize: "11px", color: hovered ? O : "rgba(255,255,255,0.25)", transition: "color 0.2s", fontWeight: 600 }}>
              Website ansehen →
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
