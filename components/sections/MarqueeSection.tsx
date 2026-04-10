"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  { text: "Webdesign Freiburg", accent: false },
  { text: "★", accent: true },
  { text: "Next.js Entwicklung", accent: false },
  { text: "★", accent: true },
  { text: "Lokales SEO", accent: false },
  { text: "★", accent: true },
  { text: "Core Web Vitals", accent: false },
  { text: "★", accent: true },
  { text: "DSGVO-konform", accent: false },
  { text: "★", accent: true },
  { text: "Kein Template", accent: false },
  { text: "★", accent: true },
];

const stats = [
  { value: "< 2s", label: "Ladezeit", sub: "Lighthouse optimiert" },
  { value: "100%", label: "Individuell", sub: "Kein Baukasten, kein Template" },
  { value: "2–3W", label: "Umsetzung", sub: "Von Briefing bis Launch" },
  { value: "24h", label: "Antwortzeit", sub: "Direkte Kommunikation" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function MarqueeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ background: "#0A1628", overflow: "hidden" }}>

      {/* ── Marquee strip ── */}
      <div className="py-5 border-y" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="flex" style={{ animation: "marquee 28s linear infinite" }}>
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-6 text-sm font-semibold tracking-wide whitespace-nowrap"
              style={{
                color: item.accent ? "#3B82F6" : "rgba(255,255,255,0.4)",
                fontSize: item.accent ? "10px" : "13px",
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats grid ── */}
      <div className="container-xl py-20 lg:py-28">
        <motion.h2
          className="font-display font-bold text-white text-center mb-16"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease }}
        >
          Was Sie von uns erwarten können.
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="rounded-2xl p-6 lg:p-8 text-center flex flex-col gap-2 relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease }}
              whileHover={{
                background: "rgba(59,130,246,0.08)",
                borderColor: "rgba(59,130,246,0.3)",
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              {/* Glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              />

              <motion.span
                className="font-display font-bold text-white block"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1 }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {s.value}
              </motion.span>

              <span
                className="font-display font-semibold text-sm"
                style={{ color: "#3B82F6" }}
              >
                {s.label}
              </span>

              <span className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.35)" }}>
                {s.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Second marquee (reversed, slower) ── */}
      <div className="pb-2 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div
          className="flex py-4"
          style={{ animation: "marquee 40s linear infinite reverse" }}
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-6 whitespace-nowrap"
              style={{
                color: item.accent ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
