"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  { label: "Design",       path: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  { label: "Entwicklung",  path: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { label: "SEO",          path: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { label: "Performance",  path: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "Beratung",     path: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { label: "Launch",       path: "M5 3l14 9-14 9V3z" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function IntroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "#F9FAFB" }}>
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* ── Left: dark card with animated rocket ── */}
          <motion.div
            className="rounded-2xl p-8 lg:p-10 flex flex-col gap-6 overflow-hidden relative"
            style={{ background: "#111318", minHeight: "360px" }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease }}
          >
            {/* Subtle grid bg */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10">
              <h2
                className="font-display font-bold text-white leading-tight mb-4"
                style={{ fontSize: "clamp(22px, 2.8vw, 32px)" }}
              >
                Steigern Sie Ihre Sichtbarkeit<br />und gewinnen Sie mehr Kunden.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Wer online nicht gefunden wird, überlässt der Konkurrenz wertvolle Marktanteile.
                LB Digital baut Ihnen eine Website, die rankt und Besucher in Anfragen verwandelt.
              </p>
            </div>

            {/* Animated rocket */}
            <div className="relative z-10 flex justify-center mt-auto pt-4">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Rocket flame */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  animate={{ scaleY: [1, 1.4, 0.8, 1.2, 1], opacity: [0.7, 1, 0.6, 1, 0.7] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  style={{ transformOrigin: "top" }}
                >
                  <svg width="20" height="28" viewBox="0 0 20 28" fill="none" aria-hidden="true">
                    <path d="M10 0 C10 0 4 12 4 20 L10 28 L16 20 C16 12 10 0 10 0Z" fill="url(#flame)" opacity="0.9"/>
                    <defs>
                      <linearGradient id="flame" x1="10" y1="0" x2="10" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F59E0B"/>
                        <stop offset="1" stopColor="#EF4444" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Rocket body */}
                <svg width="64" height="88" viewBox="0 0 64 88" fill="none" aria-hidden="true">
                  <path d="M32 4C32 4 12 24 12 52L22 58L32 52L42 58L52 52C52 24 32 4 32 4Z" fill="white" opacity="0.85"/>
                  <path d="M22 58L16 76L32 68L48 76L42 58" fill="white" opacity="0.45"/>
                  <circle cx="32" cy="34" r="9" fill="#1D4ED8"/>
                  <circle cx="32" cy="34" r="5" fill="#3B82F6" opacity="0.6"/>
                  <path d="M12 52L2 58L12 64" fill="white" opacity="0.35"/>
                  <path d="M52 52L62 58L52 64" fill="white" opacity="0.35"/>
                </svg>
              </motion.div>

              {/* Particle dots around rocket */}
              {[
                { x: -28, y: -8, delay: 0 },
                { x: 30, y: 4, delay: 0.5 },
                { x: -20, y: 20, delay: 1 },
                { x: 24, y: 24, delay: 1.5 },
                { x: -8, y: 36, delay: 0.8 },
                { x: 12, y: 40, delay: 0.3 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: i % 2 === 0 ? 4 : 2,
                    height: i % 2 === 0 ? 4 : 2,
                    background: "rgba(255,255,255,0.3)",
                    left: `calc(50% + ${dot.x}px)`,
                    top: `calc(50% + ${dot.y}px)`,
                  }}
                  animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-6">

            {/* Blue pillars card */}
            <motion.div
              className="rounded-2xl p-8"
              style={{ background: "#1D4ED8" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease }}
            >
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
                {pillars.map((p, i) => (
                  <motion.div
                    key={p.label}
                    className="flex flex-col items-center gap-2.5"
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.22 + i * 0.07, ease }}
                    whileHover={{ scale: 1.12, y: -2 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                      whileHover={{ background: "rgba(255,255,255,0.25)" }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={p.path} />
                      </svg>
                    </motion.div>
                    <span className="text-xs font-medium text-white/80 text-center leading-tight">
                      {p.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description card */}
            <motion.div
              className="rounded-2xl p-8"
              style={{ background: "#fff", border: "1px solid #E5E7EB" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease }}
            >
              <h3
                className="font-display font-bold mb-3 leading-snug"
                style={{ fontSize: "20px", color: "#0D0D0D" }}
              >
                Webagentur in Freiburg
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                Das Angebot an digitalen Möglichkeiten ist riesig. Wir helfen Ihnen, die
                richtigen Maßnahmen zu finden — von der individuellen Website bis zur
                lokalen SEO-Strategie, die Ihre Kunden in Freiburg erreicht.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
