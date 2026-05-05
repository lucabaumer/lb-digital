"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import page from "@/data/page.json";
import { ArrowBtn } from "@/components/ui/ArrowBtn";

const { hero } = page;

const EASE = [0.22, 1, 0.36, 1] as const;

// Split-text animation variants
const line1Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const line2Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};
const wordVariants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.82, ease: EASE },
  },
};

function SplitLine({
  text,
  variants,
  accent,
}: {
  text: string;
  variants: typeof line1Variants;
  accent?: boolean;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={variants}
      initial="hidden"
      animate="visible"
      style={{ display: "block" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            variants={wordVariants}
            style={{
              display: "inline-block",
              color: accent ? "var(--color-accent)" : "inherit",
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex items-center overflow-hidden"
      style={{
        background: "#07101F",
        minHeight: "100dvh",
      }}
    >
      {/* Radial glow desktop — left accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 20% 50%, rgba(18,100,241,0.16) 0%, transparent 70%)",
        }}
      />

      {/* Radial glow mobile — bright centered lightbulb effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          background: [
            "radial-gradient(ellipse 90% 55% at 50% 50%, rgba(18,100,241,0.36) 0%, transparent 60%)",
            "radial-gradient(ellipse 55% 35% at 50% 48%, rgba(60,110,255,0.28) 0%, transparent 55%)",
            "radial-gradient(ellipse 30% 20% at 50% 46%, rgba(147,197,253,0.15) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      {/* Video parallax */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ y: videoY }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ animation: "glow-pulse 4s ease-in-out infinite", opacity: 0.75 }}
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
          <source src="/assets/hero.webm" type="video/webm" />
        </video>

        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "rgba(7,16,31,0.55)" }}
        />
        <div
          className="absolute inset-y-0 right-0 hidden lg:block"
          style={{
            width: "48%",
            background:
              "linear-gradient(to right, transparent 0%, rgba(7,16,31,0.85) 30%, #07101F 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #07101F)" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container-xl relative z-10 w-full"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex justify-end">
          <div className="w-full lg:w-1/2 pt-24 md:pt-28 pb-16 md:pb-20 text-left">

            {/* Eyebrow */}
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              {hero.eyebrow}
            </motion.p>

            {/* Headline — split text */}
            <h1
              id="hero-heading"
              className="font-display font-extrabold leading-[1.04] tracking-tight text-white mb-5"
              style={{ fontSize: "clamp(32px, 5.5vw, 76px)" }}
            >
              <SplitLine text={hero.headline_line1} variants={line1Variants} />
              <SplitLine text={hero.headline_line2} variants={line2Variants} accent />
            </h1>

            {/* Subheadline */}
            <motion.p
              className="font-medium leading-relaxed mb-3"
              style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(15px, 1.8vw, 19px)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
            >
              {hero.subheadline}
            </motion.p>

            <motion.p
              className="text-base mb-10"
              style={{ color: "rgba(255,255,255,0.4)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.85 }}
            >
              {hero.body}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.95, ease: EASE }}
            >
              <ArrowBtn href="#kontakt" variant="primary">
                {hero.cta_primary}
              </ArrowBtn>
              <ArrowBtn href="#leistungen" variant="ghost-light">
                {hero.cta_secondary}
              </ArrowBtn>
            </motion.div>

            {/* Pillars */}
            <motion.div
              className="flex flex-wrap items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.1 }}
              aria-hidden="true"
            >
              {hero.pillars.map((pill) => (
                <span
                  key={pill}
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {pill}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
    </section>
  );
}
