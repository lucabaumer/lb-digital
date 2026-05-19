"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  { label: "Lighthouse 95+", icon: "⚡" },
  { label: "2–3 Wochen Lieferzeit", icon: "📅" },
  { label: "Keine Templates", icon: "✦" },
  { label: "Direkte Kommunikation", icon: "↗" },
  { label: "DSGVO-konform", icon: "✓" },
];

export default function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <section
      ref={ref}
      aria-label="Vertrauenssignale"
      style={{
        background: "#07101F",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "18px 0",
      }}
    >
      <div className="container-xl">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-between">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-2"
            >
              <span
                style={{ color: "var(--color-accent)", fontSize: "13px", lineHeight: 1 }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
