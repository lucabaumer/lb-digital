"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#1264F1";

const features = [
  { n: "01", t: "In 2–3 Wochen live", d: "Kein monatelanger Prozess. Briefing, Design, Entwicklung, Launch — mit klarem Zeitplan, der eingehalten wird." },
  { n: "02", t: "Lighthouse Score 95+ garantiert", d: "Schnell, mobiloptimiert, barrierefrei. Google bewertet Ihre Seite besser — mehr organische Besucher ohne Mehrkosten." },
  { n: "03", t: "Lokales SEO ab Tag 1", d: "Google My Business Optimierung, lokale Schlüsselwörter, strukturierte Daten — damit Kunden in Ihrer Region Sie finden." },
  { n: "04", t: "Ein Ansprechpartner, kein Puffer", d: "Sie sprechen direkt mit dem Entwickler. Kein Projektmanager dazwischen, keine versteckten Kosten, keine Missverständnisse." },
];

const stats = [
  { v: "95+",  l: "Lighthouse Score",   s: "Performance · SEO · Accessibility" },
  { v: "<1s",  l: "Ladezeit",           s: "Next.js · Vercel Edge Network" },
  { v: "2–3W", l: "Von Anfrage zu Live", s: "Klarer Zeitplan, kein Warten" },
];

const trades = [
  "Elektriker", "Dachdecker", "Maler", "Sanitär & Heizung", "Schreiner",
  "Fliesenleger", "Gerüstbauer", "Zimmermann", "Gartenbau", "Kfz-Werkstatt",
  "Trockenbauer", "Schweißer",
];

export default function TestimonialsSection() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      id="warum-handwerker"
      style={{ background: "#07101F", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "clamp(64px,9vw,120px) 0" }}
    >
      <div className="container-xl">

        {/* ── Header ── */}
        <div style={{ maxWidth: "760px", marginBottom: "clamp(48px, 7vw, 80px)" }}>
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Für Handwerksbetriebe in Freiburg & Region
          </motion.p>
          <motion.h2
            className="font-display font-bold leading-[1.03] tracking-tight text-white"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "20px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.07, ease: EASE }}
          >
            Mehr Aufträge.{" "}
            <span style={{ color: "rgba(255,255,255,0.22)" }}>Weniger Leerläufe.</span>
          </motion.h2>
          <motion.p
            style={{ fontSize: "clamp(15px, 1.6vw, 17px)", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, maxWidth: "640px" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
          >
            Dachdecker, Elektriker, Maler oder Heizungsbauer — für Handwerksbetriebe in Freiburg ist die Website der erste
            Eindruck, den ein potenzieller Kunde bekommt. Eine langsame oder nicht auffindbare Seite kostet täglich Aufträge.
            Wir bauen Websites, die technisch einwandfrei sind, lokal gefunden werden und konkrete Anfragen generieren.
          </motion.p>
        </div>

        {/* ── 2-Col: Features + Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }} className="lg:grid-cols-[1fr_320px]">

          {/* Feature-List */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {features.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                style={{
                  display: "flex", gap: "24px", alignItems: "flex-start",
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.1em", color: ACCENT, minWidth: "28px", paddingTop: "4px", flexShrink: 0 }}>
                  {f.n}
                </span>
                <div>
                  <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "6px", lineHeight: 1.2 }}>
                    {f.t}
                  </p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0 }}>
                    {f.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats-Spalte */}
          <div ref={statsRef} style={{ display: "flex", flexDirection: "column", gap: "0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, x: 16 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p
                  className="font-display font-extrabold leading-none"
                  style={{ fontSize: "clamp(44px, 5vw, 60px)", color: ACCENT, letterSpacing: "-0.03em", marginBottom: "8px" }}
                >
                  {s.v}
                </p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>{s.l}</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", lineHeight: 1.5 }}>{s.s}</p>
              </motion.div>
            ))}

            {/* Monatlich kündbar Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={statsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
              style={{ paddingTop: "24px" }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "10px 16px",
                border: `1px solid ${ACCENT}30`,
                background: `${ACCENT}0A`,
              }}>
                <div style={{ width: "6px", height: "6px", background: "#22C55E", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                  Erster Monat kostenlos · monatlich kündbar
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Branchen-SEO-Block ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          style={{ marginTop: "clamp(48px, 6vw, 72px)", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "16px" }}>
            Branchen
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {trades.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.04, ease: EASE }}
                style={{
                  fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.4)",
                  padding: "6px 14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  letterSpacing: "0.01em",
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
          <p style={{ marginTop: "16px", fontSize: "12px", color: "rgba(255,255,255,0.2)", lineHeight: 1.6, maxWidth: "600px" }}>
            Webdesign für Handwerksbetriebe in Freiburg, Breisgau-Hochschwarzwald und dem gesamten Südbaden.
            Individuelle Websites für Elektriker, Dachdecker, Maler, Sanitär- und Heizungsbetriebe sowie alle
            weiteren Gewerke — schnell, lokal sichtbar, konversionsstark.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
