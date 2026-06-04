"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#1264F1";

const features = [
  { n: "01", t: "Missed-Call SMS in 60 Sekunden", d: "Jeder verpasste Anruf bekommt automatisch eine SMS. Der Kunde fühlt sich gehört — Sie verpassen keinen Auftrag mehr." },
  { n: "02", t: "Google Reviews auf Autopilot", d: "Nach jedem abgeschlossenen Auftrag geht automatisch eine Bewertungsanfrage raus. Mehr Reviews ohne einen Finger zu rühren." },
  { n: "03", t: "Angebots-Followup ohne Aufwand", d: "Kein Auftrag zurück? Das System schreibt automatisch nach 3, 7 und 14 Tagen. Manuell unmöglich — automatisch einfach." },
  { n: "04", t: "Alles an einem Ort", d: "SMS, E-Mail, Website-Anfragen — alle Kundenkontakte in einem Dashboard. Kein Zettelchaos, keine vergessenen Leads." },
];

const stats = [
  { v: "60%",  l: "Anrufe unbeantwortet",  s: "Branchendurchschnitt — bei Ihnen: 0%" },
  { v: "5★",   l: "Reviews in 30 Tagen",   s: "Garantiert oder kein Cent" },
  { v: "24/7", l: "Vollautomatisch",        s: "Läuft während Sie auf der Baustelle sind" },
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
            Vollautomatisch — keine Handarbeit nötig
          </motion.p>
          <motion.h2
            className="font-display font-bold leading-[1.03] tracking-tight text-white"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "20px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.07, ease: EASE }}
          >
            Wie das System{" "}
            <span style={{ color: "rgba(255,255,255,0.22)" }}>für Sie arbeitet.</span>
          </motion.h2>
          <motion.p
            style={{ fontSize: "clamp(15px, 1.6vw, 17px)", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, maxWidth: "640px" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
          >
            Dachdecker, Elektriker oder Heizungsbauer — Sie sind den ganzen Tag auf der Baustelle. Leads kommen rein,
            Anrufe werden verpasst, Angebote bleiben unbeantwortet. Ein System das das automatisch übernimmt,
            zahlt sich ab dem ersten geretteten Auftrag aus.
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
                  7-Tage Gratis-Test · kein Risiko
                </span>
              </div>
            </motion.div>
          </div>
        </div>


      </div>
    </section>
  );
}
