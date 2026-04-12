"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { techStack } from "@/data/tech-stack";

export default function TechSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section-py relative overflow-hidden" style={{ background: "#07080C" }}>
      {/* Subtle animated gradient sweep */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 20% 50%, #4F46E5 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 50%, #1E1B4B 0%, transparent 60%)",
        }}
      />

      <div className="container-xl relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-6"
              style={{ color: "#818CF8" }}
            >
              <span className="inline-block w-8 h-0.5 bg-[#818CF8] rounded-full" />
              Technologie
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold leading-tight mb-5 text-white"
              style={{
                fontFamily: "var(--font-bricolage)",
                fontSize: "clamp(28px, 4vw, 44px)",
              }}
            >
              Wir arbeiten mit den
              <span className="text-[#818CF8]"> besten Werkzeugen</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-[#6B7280] leading-relaxed"
            >
              Moderne Technologien die heute Standard sind — und morgen noch
              funktionieren.
            </motion.p>
          </div>

          {/* Right: tag grid */}
          <div className="grid sm:grid-cols-2 gap-8">
            {techStack.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + ci * 0.08 }}
              >
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4B5563] mb-4">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.tools.map((tool) => (
                    <motion.span
                      key={tool}
                      onHoverStart={() => setHovered(tool)}
                      onHoverEnd={() => setHovered(null)}
                      animate={
                        hovered === tool
                          ? { borderColor: "#818CF8", color: "#A5B4FC", backgroundColor: "rgba(79,70,229,0.12)" }
                          : { borderColor: "rgba(255,255,255,0.08)", color: "#6B7280", backgroundColor: "rgba(79,70,229,0)" }
                      }
                      transition={{ duration: 0.18 }}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border cursor-default"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
