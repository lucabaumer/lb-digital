"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import page from "@/data/page.json";
import { useContactModal } from "@/components/ui/ContactModalProvider";

const { hero, footer } = page;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useContactModal();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY   = useTransform(scrollYProgress, [0, 1], ["0%",  "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%",  "10%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex items-end overflow-hidden"
      style={{ background: "#07101F", minHeight: "100dvh" }}
    >

      {/* ── Video background ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ y: videoY }}
      >
        <video
          autoPlay muted loop playsInline disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.45 }}
        >
          <source src="/assets/hero.mp4"  type="video/mp4" />
          <source src="/assets/hero.webm" type="video/webm" />
        </video>

        {/* Gradient: bottom fade + slight left vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to top, #07101F 0%, rgba(7,16,31,0.75) 30%, rgba(7,16,31,0.4) 70%, transparent 100%)",
              "linear-gradient(to right, rgba(7,16,31,0.55) 0%, transparent 60%)",
            ].join(", "),
          }}
        />

        {/* Subtle blue accent left-side glow */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 65% 80% at 0% 55%, rgba(18,100,241,0.18) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        className="container-xl relative z-10 w-full"
        style={{ y: contentY, opacity, paddingBottom: "clamp(64px, 8vw, 120px)", paddingTop: "120px" }}
      >

        {/* Eyebrow */}
        <motion.p
          className="eyebrow mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
        >
          {hero.eyebrow}
        </motion.p>

        {/* Headline — the whole thing is one typographic statement */}
        <h1
          id="hero-heading"
          className="font-display font-extrabold text-white leading-[0.92] tracking-tight mb-8 lg:mb-10"
          style={{ fontSize: "clamp(56px, 10.5vw, 148px)" }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: "40%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
          >
            {hero.headline_line1}
          </motion.span>
          <motion.span
            className="block"
            style={{ color: "var(--color-accent)" }}
            initial={{ opacity: 0, y: "40%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: EASE }}
          >
            {hero.headline_line2}
          </motion.span>
        </h1>

        {/* Subheadline + divider */}
        <motion.div
          className="mb-10 lg:mb-12 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.48, ease: EASE }}
        >
          <div
            aria-hidden
            style={{ height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "24px", maxWidth: "320px" }}
          />
          <p
            className="font-medium leading-snug text-white/70"
            style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
          >
            {hero.subheadline}
          </p>
        </motion.div>

        {/* CTAs — phone first (Principle 5: lowest friction for local KMU) */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.62, ease: EASE }}
        >
          {/* Primary: direct call — amber exclusive CTA, highest conversion for local businesses */}
          <a
            href={`tel:+49${footer.phone.replace(/^0/, "")}`}
            className="btn-cta"
            style={{ fontSize: "15px", padding: "16px 32px", gap: "10px" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.15 3.38 2 2 0 0 1 3.12 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
            </svg>
            {footer.phone}
          </a>

          {/* Secondary: open contact modal */}
          <button
            onClick={openModal}
            className="btn-ghost-light"
            style={{ fontSize: "15px", padding: "16px 28px" }}
          >
            {hero.cta_primary}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </motion.div>

      </motion.div>

      {/* Bottom section divider */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
    </section>
  );
}
