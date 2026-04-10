"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import page from "@/data/page.json";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" ref={ref} className="section-py" style={{ background: "#fff" }}>
      <div className="container-xl">

        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left: sticky label */}
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <p className="eyebrow mb-4">{page.faq.eyebrow}</p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(26px, 3.5vw, 42px)", color: "#0D0D0D" }}
            >
              {page.faq.headline}
            </h2>
          </motion.div>

          {/* Right: accordion */}
          <div>
            {page.faq.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  style={{ borderBottom: "1px solid #E5E7EB" }}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span
                    className="font-medium text-base leading-snug"
                    style={{ color: "#0D0D0D" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200"
                    style={{
                      borderColor: open === i ? "#1D4ED8" : "#D1D5DB",
                      background: open === i ? "#1D4ED8" : "transparent",
                      transform: open === i ? "rotate(45deg)" : "none",
                    }}
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke={open === i ? "#fff" : "#6B7280"} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="text-sm leading-relaxed pb-5 pt-3"
                        style={{ color: "#6B7280" }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
