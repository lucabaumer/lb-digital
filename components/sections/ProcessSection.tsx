"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import page from "@/data/page.json";

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-py"
      style={{ background: "#111318" }}
    >
      <div className="container-xl">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">{page.process.eyebrow}</p>
          <h2
            className="font-display font-bold leading-tight text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {page.process.headline}
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {page.process.steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="card-dark p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -6,
                boxShadow: "0 0 32px rgba(29,78,216,0.25)",
                borderColor: "rgba(29,78,216,0.4)",
                transition: { duration: 0.25 },
              }}
            >
              {/* Number */}
              <span
                className="font-display font-bold"
                style={{ fontSize: "40px", color: "rgba(255,255,255,0.08)", lineHeight: 1 }}
              >
                {step.number}
              </span>

              {/* Duration badge */}
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full self-start"
                style={{
                  background: "rgba(29,78,216,0.2)",
                  color: "#60A5FA",
                  border: "1px solid rgba(29,78,216,0.3)",
                }}
              >
                {step.duration}
              </span>

              <h3
                className="font-display font-bold text-white"
                style={{ fontSize: "18px", lineHeight: 1.3 }}
              >
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
