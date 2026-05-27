"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowBtn } from "@/components/ui/ArrowBtn";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { zahl: "93 %", text: "aller Online-Erfahrungen beginnen mit einer Suchmaschine" },
  { zahl: "75 %", text: "der Nutzer klicken nie auf Seite 2 — wer dort ist, existiert nicht" },
  { zahl: "46 %", text: "aller Google-Suchen haben lokalen Bezug" },
];

const leistungen = [
  {
    nr: "01",
    title: "Google My Business",
    text: "Ihr GMB-Profil ist das mächtigste kostenlose Tool für lokale Sichtbarkeit. Wir richten es vollständig ein und optimieren Kategorien, Fotos und Beschreibung.",
  },
  {
    nr: "02",
    title: "Lokales SEO",
    text: "Wir optimieren Ihre Website gezielt für Suchanfragen aus Freiburg und Umgebung — damit Kunden Sie finden, bevor sie zur Konkurrenz gehen.",
  },
  {
    nr: "03",
    title: "Technisches SEO",
    text: "Ladezeiten, Core Web Vitals, strukturierte Daten, Sitemap — die technische Basis, ohne die kein Ranking möglich ist. Direkt beim Bau integriert.",
  },
  {
    nr: "04",
    title: "On-Page Optimierung",
    text: "Title Tags, Meta Descriptions, H1-Struktur, interne Verlinkung — jede Seite wird gezielt für ihren Ziel-Suchbegriff optimiert.",
  },
  {
    nr: "05",
    title: "Content-Strategie",
    text: "Wir zeigen Ihnen, welche Inhalte Google erwartet und welche Keywords echtes Potenzial haben — konkret, messbar, ohne leere Versprechen.",
  },
  {
    nr: "06",
    title: "Monatliches Reporting",
    text: "Jeden Monat ein Bericht mit Rankings, Traffic und Anfragen. Sie sehen genau was passiert — kein Agentur-Blabla, nur echte Zahlen.",
  },
];

export default function SEOContent() {
  const statsRef = useRef(null);
  const leistungenRef = useRef(null);
  const whyRef = useRef(null);
  const ctaRef = useRef(null);

  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const leistungenInView = useInView(leistungenRef, { once: true, margin: "-60px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });
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
            background: "radial-gradient(ellipse 60% 55% at 25% 50%, rgba(16,185,129,0.1) 0%, rgba(29,78,216,0.12) 40%, transparent 70%)",
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
            SEO Freiburg
          </motion.p>

          <motion.h1
            className="font-display font-extrabold leading-[1.05] tracking-tight text-white mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 76px)", maxWidth: "860px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            Wenn Ihre Kunden googeln —{" "}
            <span style={{ color: "#3B82F6" }}>werden sie Sie finden?</span>
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
            LB Digital macht Freiburger Betriebe bei Google sichtbar. Technisch sauber, inhaltlich stark, lokal ausgerichtet — damit Anfragen kommen, nicht zufällig, sondern systematisch.
          </motion.p>

          <motion.p
            className="mb-10 text-sm"
            style={{ color: "rgba(255,255,255,0.35)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            Lokales SEO · Google My Business · Technisches SEO · Monatliche Reports
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mb-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32, ease }}
          >
            <ArrowBtn href="#kontakt" variant="primary">
              Kostenlose SEO-Analyse
            </ArrowBtn>
            <ArrowBtn href="/webdesign-freiburg" variant="ghost-light">
              Webdesign ansehen
            </ArrowBtn>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            aria-hidden
          >
            {["Lokales SEO", "Google Maps", "Core Web Vitals", "Schema.org", "Transparente Reports"].map((pill) => (
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

      {/* ── Stats ── */}
      <section
        ref={statsRef}
        style={{
          background: "#1D4ED8",
          padding: "clamp(60px, 8vw, 100px) 0",
        }}
      >
        <div className="container-xl">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12, ease }}
              >
                <p
                  className="font-display font-bold mb-2"
                  style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "#fff", lineHeight: 1 }}
                >
                  {s.zahl}
                </p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
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
            <p className="eyebrow mb-4">Was wir tun</p>
            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              SEO das wirklich{" "}
              <span className="text-gradient">Ergebnisse liefert.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Kein schwarzes Loch für Ihr Budget. Jede Maßnahme ist nachvollziehbar — und messbar.
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
                    <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
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

      {/* ── Warum LB Digital ── */}
      <section
        ref={whyRef}
        className="section-py"
        style={{ background: "#0A1628", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={whyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease }}
            >
              <p className="eyebrow mb-5">Warum LB Digital</p>
              <h2
                className="font-display font-bold text-white leading-tight mb-6"
                style={{ fontSize: "clamp(26px, 3.5vw, 46px)" }}
              >
                SEO aus Freiburg —{" "}
                <span style={{ color: "#3B82F6" }}>nicht von irgendwo.</span>
              </h2>
              <p className="mb-5 leading-relaxed" style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                Wir kennen den Freiburger Markt. Wir wissen wie Ihre Kunden suchen, welche Konkurrenten stark sind und wo die Chancen liegen — lokal und regional.
              </p>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                Keine anonyme Agentur mit 50 Kunden. Sie sprechen direkt mit dem SEO-Experten — schnell, klar, ohne Umwege.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Lokales Know-how", text: "Freiburg & 30 km Umkreis" },
                { title: "Direkter Ansprechpartner", text: "Kein Mittelsmann" },
                { title: "Messbare Ergebnisse", text: "Rankings & Anfragen" },
                { title: "Alles aus einer Hand", text: "Web + SEO + Reporting" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="card-dark p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                  whileHover={{
                    borderColor: "rgba(59,130,246,0.25)",
                    y: -3,
                    transition: { duration: 0.2 },
                  }}
                >
                  <p
                    className="font-display font-bold text-white mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    {item.title}
                  </p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
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
                Kostenlose SEO-Analyse —{" "}
                <span style={{ color: "#3B82F6" }}>unverbindlich anfragen.</span>
              </h2>
              <p
                className="mb-10"
                style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}
              >
                Wir analysieren Ihre aktuelle Sichtbarkeit und zeigen konkret, wo Potenzial liegt — kostenlos, transparent, ohne Agentur-Pitch.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <ArrowBtn href="#kontakt" variant="primary">
                  Analyse anfragen
                </ArrowBtn>
                <ArrowBtn href="/webdesign-freiburg" variant="ghost-light">
                  Webdesign ansehen
                </ArrowBtn>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
