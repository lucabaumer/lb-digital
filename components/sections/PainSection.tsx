"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import page from "@/data/page.json";

const ease = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#1264F1";

const icons = [
  // Phone missed
  <svg key="phone" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/><line x1="23" y1="1" x2="17" y2="7"/><line x1="17" y1="1" x2="23" y2="7"/></svg>,
  // File
  <svg key="file" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  // Star
  <svg key="star" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  // Inbox
  <svg key="inbox" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
  // Clock
  <svg key="clock" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
];

export default function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { pain } = page;

  return (
    <section
      ref={ref}
      style={{
        background: "#060D1A",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "clamp(48px, 7vw, 96px) 0",
      }}
    >
      <div className="container-xl">

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease }}
          >
            {pain.eyebrow}
          </motion.p>
          <motion.h2
            className="font-display font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease }}
          >
            {pain.headline}
          </motion.h2>
        </div>

        {/* Pain items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pain.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.09, ease }}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(220,38,38,0.1)",
                  border: "1px solid rgba(220,38,38,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#F87171",
                  flexShrink: 0,
                }}
              >
                {icons[i]}
              </div>

              {/* Title */}
              <h3
                className="font-display font-bold text-white"
                style={{ fontSize: "16px", lineHeight: 1.35 }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.38)",
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}

          {/* Final card — solution teaser */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + pain.items.length * 0.09, ease }}
            style={{
              background: `linear-gradient(135deg, ${ACCENT}18 0%, rgba(255,255,255,0.02) 100%)`,
              border: `1px solid ${ACCENT}30`,
              borderRadius: "16px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${ACCENT}20`,
                border: `1px solid ${ACCENT}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ACCENT,
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            <div>
              <h3
                className="font-display font-bold text-white mb-2"
                style={{ fontSize: "16px", lineHeight: 1.35 }}
              >
                Es gibt eine Lösung.
              </h3>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                Ein System das alle diese Probleme automatisch löst — während du auf der Baustelle bist.
              </p>
            </div>

            <a
              href="#leistungen"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: ACCENT,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                letterSpacing: "0.02em",
              }}
            >
              Pakete ansehen
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
