"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const usps = [
  {
    num: "01",
    title: "Schnelle Lieferung",
    body: "Von Briefing bis Launch in 2–4 Wochen. Kein endloses Hin-und-Her, keine monatelangen Wartezeiten.",
  },
  {
    num: "02",
    title: "Alles aus einer Hand",
    body: "Design, Entwicklung, Texte, SEO, Hosting — ein Ansprechpartner, kein Koordinationsaufwand.",
  },
  {
    num: "03",
    title: "Jedes Projekt ist ein Unikat",
    body: "Kein Template, kein Copy-Paste. Ihr Auftritt ist so einzigartig wie Ihr Unternehmen.",
  },
  {
    num: "04",
    title: "Messbare Ergebnisse",
    body: "Wir optimieren auf Anfragen und Sichtbarkeit. Zahlen statt Versprechen.",
  },
];

function UspItem({ usp, index }: { usp: (typeof usps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex gap-6 group">
      {/* Left: accent line + number */}
      <div className="flex flex-col items-center gap-0 flex-shrink-0 pt-1">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
          className="w-0.5 h-14 bg-[#4F46E5] mb-3"
        />
        <span
          className="text-[11px] font-bold text-[#4F46E5] tracking-[0.05em]"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {usp.num}
        </span>
      </div>

      {/* Right: content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="pb-10 last:pb-0 flex-1"
      >
        <h3
          className="font-bold mb-2 text-lg"
          style={{ fontFamily: "var(--font-bricolage)", color: "#F2F0ED" }}
        >
          {usp.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#8A8680" }}>{usp.body}</p>
      </motion.div>
    </div>
  );
}

export default function WhySection() {
  return (
    <section id="warum" className="section-py" style={{ background: "#0F1014" }}>
      <div className="container-xl">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-12 lg:gap-20 items-start">
          {/* ── Left: Heading ─────────────────── */}
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6">
              <span className="accent-line" />
              Warum LB Digital
            </p>
            <h2
              className="font-display font-bold leading-tight mb-6"
              style={{
                fontFamily: "var(--font-bricolage)",
                fontSize: "clamp(32px, 4.5vw, 52px)",
                color: "#F2F0ED",
              }}
            >
              Wir bauen keine
              <br />
              Templates.
              <br />
              <em className="not-italic text-gradient">Wir bauen Ergebnisse.</em>
            </h2>
            <p className="leading-relaxed max-w-sm" style={{ color: "#8A8680" }}>
              Vier Gründe warum Unternehmen sich für LB Digital entscheiden —
              und gerne zurückkommen.
            </p>
          </div>

          {/* ── Right: USPs ───────────────────── */}
          <div className="mt-4 lg:mt-0">
            {usps.map((usp, i) => (
              <UspItem key={usp.num} usp={usp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
