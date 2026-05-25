"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import page from "@/data/page.json";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#1264F1";

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-py"
      style={{ background: "#0A1628", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container-xl">

        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="eyebrow mb-4">{page.process.eyebrow}</p>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
          >
            {page.process.headline}
          </h2>
        </motion.div>

        {/* ── Desktop: horizontal timeline ── */}
        <div className="hidden lg:flex gap-0">
          {page.process.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.12, ease: EASE }}
              style={{
                flex: 1,
                paddingRight: i < page.process.steps.length - 1 ? "32px" : 0,
                borderTop: `1px solid ${i === 0 ? ACCENT : "rgba(255,255,255,0.1)"}`,
                paddingTop: "32px",
              }}
            >
              {/* Step number + duration */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: i === 0 ? ACCENT : "rgba(255,255,255,0.22)",
                  }}
                >
                  {step.number}
                </motion.span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: ACCENT,
                    background: "rgba(18,100,241,0.08)",
                    border: "1px solid rgba(18,100,241,0.2)",
                    borderRadius: "99px",
                    padding: "2px 9px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.duration}
                </span>
              </div>

              <h3
                className="font-display font-bold text-white"
                style={{ fontSize: "18px", lineHeight: 1.3, marginBottom: "10px" }}
              >
                {step.title}
              </h3>

              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile: vertical numbered list ── */}
        <div className="lg:hidden">
          {page.process.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
              style={{
                display: "flex",
                gap: "20px",
                paddingBottom: i < page.process.steps.length - 1 ? "36px" : 0,
              }}
            >
              {/* Number + vertical connector */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(18,100,241,0.08)",
                    border: `1px solid rgba(18,100,241,0.3)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: ACCENT,
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </div>
                {i < page.process.steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      width: "1px",
                      background: "rgba(255,255,255,0.07)",
                      marginTop: "8px",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingTop: "7px", paddingBottom: "8px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <h3
                    className="font-display font-bold text-white"
                    style={{ fontSize: "17px", lineHeight: 1.2 }}
                  >
                    {step.title}
                  </h3>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: ACCENT,
                      background: "rgba(18,100,241,0.08)",
                      border: "1px solid rgba(18,100,241,0.2)",
                      borderRadius: "99px",
                      padding: "2px 8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.duration}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
