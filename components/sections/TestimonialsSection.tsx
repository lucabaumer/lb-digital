"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote: "Seit dem Launch rufen deutlich mehr Leute an. Die Seite sieht nicht nur gut aus — sie bringt tatsächlich Anfragen.",
    name: "Michael K.",
    company: "Dachdeckerei Krause",
    city: "Freiburg",
    category: "Handwerk",
    rating: 5,
  },
  {
    quote: "In zwei Wochen online, genau wie versprochen. Und das Ergebnis ist besser als ich erwartet hatte. Endlich kommt auch mobil alles richtig rüber.",
    name: "Sandra F.",
    company: "Café am Münster",
    city: "Freiburg",
    category: "Gastronomie",
    rating: 5,
  },
  {
    quote: "Kein Vergleich zu meiner alten Website. Der Entwickler hat direkt mitgedacht — nicht einfach umgesetzt, sondern wirklich beraten.",
    name: "Thomas B.",
    company: "Bauservice Berger",
    city: "Titisee-Neustadt",
    category: "Handwerk",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }} aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="var(--color-accent)" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="testimonials-heading"
      className="section-py"
      style={{ background: "#07101F", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container-xl">

        {/* Header */}
        <div className="mb-14 lg:mb-16">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Kundenstimmen
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            className="font-display font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.07, ease: EASE }}
          >
            Was Kunden sagen.{" "}
            <span style={{ color: "rgba(255,255,255,0.22)" }}>Keine leeren Worte.</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: "20%",
                  right: "20%",
                  height: "1px",
                  background: "linear-gradient(to right, transparent, rgba(18,100,241,0.4), transparent)",
                }}
              />

              <Stars count={t.rating} />

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.72)",
                  fontStyle: "italic",
                  margin: 0,
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.3 }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", margin: 0, marginTop: "2px" }}>
                      {t.company} · {t.city}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      background: "rgba(18,100,241,0.12)",
                      border: "1px solid rgba(18,100,241,0.25)",
                      borderRadius: "4px",
                      color: "var(--color-accent)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
