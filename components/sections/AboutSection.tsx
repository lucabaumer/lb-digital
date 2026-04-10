"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import page from "@/data/page.json";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ueber-uns" ref={ref} className="section-py" style={{ background: "#F9FAFB" }}>
      <div className="container-xl">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: headline + body */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-4">{page.about.eyebrow}</p>
            <h2
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(44px, 6.5vw, 80px)", color: "#0D0D0D" }}
            >
              {page.about.headline}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#6B7280", maxWidth: "480px" }}>
              {page.about.body}
            </p>
          </motion.div>

          {/* Right: USP list */}
          <div className="flex flex-col gap-8">
            {page.about.usps.map((usp, i) => (
              <motion.div
                key={usp.number}
                className="flex gap-5"
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="font-display font-bold flex-shrink-0 leading-none pt-1"
                  style={{ fontSize: "13px", color: "#1D4ED8", letterSpacing: "0.05em" }}
                >
                  {usp.number}
                </span>
                <div>
                  <h3
                    className="font-display font-bold mb-1.5"
                    style={{ fontSize: "17px", color: "#0D0D0D" }}
                  >
                    {usp.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {usp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
