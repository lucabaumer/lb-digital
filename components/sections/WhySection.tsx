"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const usps = [
  {
    num: "01",
    title: "Schnelle Lieferung",
    short: "2–4 Wochen",
    detail: "Kein endloses Hin-und-Her. Von Briefing bis Launch in 2–4 Wochen.",
  },
  {
    num: "02",
    title: "Alles aus einer Hand",
    short: "Design, Dev, SEO",
    detail: "Ein Ansprechpartner für alles — kein Koordinationsaufwand zwischen Gewerken.",
  },
  {
    num: "03",
    title: "Kein Template. Nie.",
    short: "Ihr Unikat",
    detail: "Jede Website wird von Grund auf für Sie gebaut — nicht für alle.",
  },
  {
    num: "04",
    title: "Messbare Ergebnisse",
    short: "Anfragen. Nicht nur Besucher.",
    detail: "Wir optimieren auf neue Kunden — nicht auf Klicks, die nichts bringen.",
  },
];

function UspRow({ usp, index, inView }: { usp: (typeof usps)[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.12 + index * 0.07, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative border-t cursor-default select-none"
      style={{
        borderColor: hovered ? "rgba(18,100,241,0.25)" : "rgba(255,255,255,0.07)",
        transition: "border-color 0.3s ease",
      }}
    >
      <div className="py-6 lg:py-7 flex items-start gap-5 lg:gap-10">
        {/* Number */}
        <span
          className="text-[11px] font-mono tracking-widest flex-shrink-0 pt-1.5"
          style={{
            color: hovered ? "var(--color-accent)" : "rgba(255,255,255,0.18)",
            transition: "color 0.25s ease",
            minWidth: "2rem",
          }}
        >
          {usp.num}
        </span>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-8">
            <h3
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(20px, 2.8vw, 38px)",
                color: hovered ? "var(--color-accent)" : "#F0EDE8",
                transition: "color 0.25s ease",
              }}
            >
              {usp.title}
            </h3>
            <span
              className="text-sm font-medium flex-shrink-0 sm:text-right"
              style={{
                color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.22)",
                transition: "color 0.25s ease",
              }}
            >
              {usp.short}
            </span>
          </div>

          {/* Detail — slides in on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="text-sm leading-relaxed mt-2 max-w-lg"
                style={{ color: "rgba(255,255,255,0.32)" }}
              >
                {usp.detail}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="warum" className="section-py" style={{ background: "#07101F" }}>
      <div className="container-xl" ref={ref}>

        {/* Headline block */}
        <div className="mb-14 lg:mb-20">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Warum LB Digital
          </motion.p>
          <motion.h2
            className="font-display font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(28px, 4.5vw, 58px)", color: "#F0EDE8" }}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.07, ease: EASE }}
          >
            Wir bauen keine Templates.{" "}
            <span style={{ color: "rgba(255,255,255,0.25)" }}>Wir bauen Ergebnisse.</span>
          </motion.h2>
        </div>

        {/* Editorial USP rows */}
        <div>
          {usps.map((usp, i) => (
            <UspRow key={usp.num} usp={usp} index={i} inView={inView} />
          ))}
          {/* Bottom border */}
          <div
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            aria-hidden="true"
          />
        </div>

      </div>
    </section>
  );
}
