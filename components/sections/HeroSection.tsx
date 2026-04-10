"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import page from "@/data/page.json";

const { hero } = page;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Video parallax: moves up slower than scroll
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Content fades + drifts up slightly as hero leaves viewport
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex items-center overflow-hidden"
      style={{
        background: "#0A1628",
        minHeight: "100svh",
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 20% 50%, rgba(29,78,216,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── Video (parallax layer) ── */}
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
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ animation: "glow-pulse 4s ease-in-out infinite", opacity: 0.7 }}
        >
          <source src="/assets/hero.webm" type="video/webm" />
        </video>

        {/* Mobile: full dark overlay so video is just subtle bg */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "rgba(10,22,40,0.82)" }}
        />

        {/* Desktop: right-side gradient so text never overlaps video */}
        <div
          className="absolute inset-y-0 right-0 hidden lg:block"
          style={{
            width: "48%",
            background:
              "linear-gradient(to right, transparent 0%, rgba(10,22,40,0.85) 30%, #0A1628 70%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #0A1628)" }}
        />
      </motion.div>

      {/* ── Content (drifts up + fades as hero scrolls out) ── */}
      <motion.div
        className="container-xl relative z-10 w-full"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Mobile: centered | Desktop: right column */}
        <div className="flex justify-end">
          <div className="w-full lg:w-1/2 pt-28 pb-20 text-left lg:text-left">

            {/* Eyebrow */}
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              {hero.eyebrow}
            </motion.p>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              className="font-display font-extrabold leading-[1.05] tracking-tight text-white mb-5"
              style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {hero.headline_line1}{" "}
              <span style={{ color: "#3B82F6" }}>{hero.headline_line2}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="font-medium leading-relaxed mb-3"
              style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(15px, 1.8vw, 19px)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              {hero.subheadline}
            </motion.p>

            <motion.p
              className="text-base mb-10"
              style={{ color: "rgba(255,255,255,0.45)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {hero.body}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
            >
              <Link href="#kontakt" className="btn-primary">
                › {hero.cta_primary}
              </Link>
              <Link href="#leistungen" className="btn-ghost-light">
                {hero.cta_secondary}
              </Link>
            </motion.div>

            {/* Pillars */}
            <motion.div
              className="flex flex-wrap items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.42 }}
              aria-hidden="true"
            >
              {hero.pillars.map((pill) => (
                <span
                  key={pill}
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {pill}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Bottom cut */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
    </section>
  );
}
