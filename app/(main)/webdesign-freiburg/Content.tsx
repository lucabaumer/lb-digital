"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowBtn } from "@/components/ui/ArrowBtn";

const ease = [0.22, 1, 0.36, 1] as const;

const leistungen = [
  {
    nr: "01",
    title: "Kein Template. Kein Baukasten.",
    text: "Jede Website wird von Grund auf für Ihren Betrieb entwickelt — nicht zusammengeklickt. Das sieht man, und Ihre Kunden spüren es.",
  },
  {
    nr: "02",
    title: "Lädt in unter 1 Sekunde",
    text: "Lighthouse 95+ auf allen Metriken. Schnelle Websites ranken besser, springen weniger ab — und bringen mehr Anfragen.",
  },
  {
    nr: "03",
    title: "Mobile First",
    text: "Über 70 % Ihrer Besucher kommen vom Smartphone. Wir gestalten zuerst für mobile Geräte — nicht als Nachgedanke.",
  },
  {
    nr: "04",
    title: "SEO direkt eingebaut",
    text: "Strukturierte Daten, lokale Keywords, Core Web Vitals — Google versteht Ihre Seite vom ersten Tag. Kein SEO-Plugin, das eh keiner pflegt.",
  },
  {
    nr: "05",
    title: "DSGVO & Impressum",
    text: "Alles rechtlich korrekt eingebaut — Impressum, Datenschutz, Cookie-Banner. Ohne Extrakosten, ohne Diskussion.",
  },
  {
    nr: "06",
    title: "Direkter Kontakt",
    text: "Kein Ticketsystem, kein anonymer Account-Manager. Sie erreichen den Entwickler direkt — und bekommen echte Antworten.",
  },
];

const prozess = [
  {
    nr: "01",
    title: "Erstgespräch",
    text: "Wir verstehen Ihren Betrieb, Ihre Zielgruppe und was Ihre Website leisten soll.",
    duration: "30 Min.",
  },
  {
    nr: "02",
    title: "Konzept",
    text: "Sitemap, Design-Richtung, Textstrategie — fertig und abgestimmt innerhalb einer Woche.",
    duration: "1 Woche",
  },
  {
    nr: "03",
    title: "Entwicklung",
    text: "Pixel-perfekte Umsetzung. Sie sehen täglich Fortschritt — kein Black-Box-Prozess.",
    duration: "2–3 Wochen",
  },
  {
    nr: "04",
    title: "Launch",
    text: "Domain, Hosting, SSL, Google-Anmeldung — wir kümmern uns um alles. Sie gehen live.",
    duration: "1 Tag",
  },
];

export default function WebdesignContent() {
  const leistungenRef = useRef(null);
  const prozessRef = useRef(null);
  const ctaRef = useRef(null);

  const leistungenInView = useInView(leistungenRef, { once: true, margin: "-60px" });
  const prozessInView = useInView(prozessRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: "#0A1628",
          minHeight: "92svh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "clamp(110px, 14vw, 160px)",
          paddingBottom: "clamp(80px, 10vw, 120px)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 60% 55% at 25% 50%, rgba(29,78,216,0.16) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container-xl relative z-10 w-full">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            Webdesign Freiburg
          </motion.p>

          <motion.h1
            className="font-display font-extrabold leading-[1.05] tracking-tight text-white mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 76px)", maxWidth: "860px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            Websites die ranken, vertrauen schaffen —{" "}
            <span style={{ color: "#3B82F6" }}>und Aufträge bringen.</span>
          </motion.h1>

          <motion.p
            className="mb-3 leading-relaxed font-medium"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "clamp(15px, 1.8vw, 19px)",
              maxWidth: "580px",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease }}
          >
            LB Digital baut individuelle Websites für Handwerker, Dienstleister und Unternehmen in Freiburg. Kein Baukasten, kein Template — maßgeschneidert für Ihren Betrieb.
          </motion.p>

          <motion.p
            className="mb-10 text-sm"
            style={{ color: "rgba(255,255,255,0.35)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            Ab 1.500 € · In 3–4 Wochen live · Persönliche Betreuung aus Freiburg
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mb-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32, ease }}
          >
            <ArrowBtn href="#kontakt" variant="primary">
              Kostenloses Erstgespräch
            </ArrowBtn>
            <ArrowBtn href="/#projekte" variant="ghost-light">
              Projekte ansehen
            </ArrowBtn>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            aria-hidden
          >
            {["Next.js", "Lighthouse 95+", "Mobile First", "DSGVO-konform", "SEO ready"].map((pill) => (
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
      </section>

      {/* ── Leistungen ── */}
      <section
        ref={leistungenRef}
        className="section-py"
        style={{ background: "#111318" }}
      >
        <div className="container-xl">
          <motion.div
            className="mb-14 max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={leistungenInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <p className="eyebrow mb-4">Was Sie bekommen</p>
            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Premium-Webdesign —{" "}
              <span className="text-gradient">keine Kompromisse.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Wir machen keine generischen Websites. Jede Entscheidung — Farbe, Text, Struktur — hat einen Grund.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {leistungen.map((l, i) => (
              <motion.div
                key={l.nr}
                className="card-dark p-7 flex flex-col gap-4 relative overflow-hidden"
                initial={{ opacity: 0, y: 32 }}
                animate={leistungenInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                whileHover={{
                  borderColor: "rgba(59,130,246,0.3)",
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                <span
                  aria-hidden
                  className="absolute bottom-3 right-4 font-display font-bold select-none pointer-events-none"
                  style={{ fontSize: "80px", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
                >
                  {l.nr}
                </span>

                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.25)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>

                <h3
                  className="font-display font-bold text-white"
                  style={{ fontSize: "16px", lineHeight: 1.35 }}
                >
                  {l.title}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                  {l.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prozess ── */}
      <section
        ref={prozessRef}
        className="section-py"
        style={{ background: "#0A1628", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container-xl">
          <motion.div
            className="mb-14 max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={prozessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <p className="eyebrow mb-4">Ablauf</p>
            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Von der Idee zum Launch —{" "}
              <span style={{ color: "#3B82F6" }}>in 4 Wochen.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {prozess.map((step, i) => (
              <motion.div
                key={step.nr}
                className="card-dark p-6 flex flex-col gap-4"
                initial={{ opacity: 0, y: 28 }}
                animate={prozessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 0 32px rgba(29,78,216,0.2)",
                  borderColor: "rgba(29,78,216,0.35)",
                  transition: { duration: 0.25 },
                }}
              >
                <span
                  className="font-display font-bold"
                  style={{ fontSize: "40px", color: "rgba(255,255,255,0.07)", lineHeight: 1 }}
                >
                  {step.nr}
                </span>
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
                  style={{ fontSize: "17px", lineHeight: 1.3 }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        ref={ctaRef}
        className="section-py"
        style={{ background: "#111318", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container-xl">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
            >
              <p className="eyebrow mb-5 justify-center">Jetzt starten</p>
              <h2
                className="font-display font-bold text-white mb-5"
                style={{ fontSize: "clamp(28px, 4vw, 54px)", lineHeight: 1.08 }}
              >
                Bereit für eine Website,{" "}
                <span style={{ color: "#3B82F6" }}>die wirklich arbeitet?</span>
              </h2>
              <p
                className="mb-10"
                style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}
              >
                Kostenloses Erstgespräch — kein Verkaufsdruck, keine Verpflichtung. Wir schauen gemeinsam, ob wir zusammenpassen.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <ArrowBtn href="#kontakt" variant="primary">
                  Kostenloses Gespräch buchen
                </ArrowBtn>
                <ArrowBtn href="/seo-freiburg" variant="ghost-light">
                  SEO Freiburg ansehen
                </ArrowBtn>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
