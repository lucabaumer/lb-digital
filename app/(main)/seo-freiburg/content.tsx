"use client";

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowBtn } from "@/components/ui/ArrowBtn";
import { useContactModal } from "@/components/ui/ContactModalProvider";

const EASE = [0.22, 1, 0.36, 1] as const;
const BG = "#07101F";
const BG2 = "#0A1628";
const ACCENT = "#1264F1";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: EASE, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const leistungen = [
  { nr: "01", title: "Lokales SEO", text: "Wir optimieren Ihre Website gezielt für Suchanfragen aus Freiburg und der Region — damit Kunden Sie finden, bevor sie zur Konkurrenz gehen. Lokales SEO umfasst Google My Business, lokale Keywords, NAP-Konsistenz und regionale Backlinks. Für Unternehmen, deren Kunden in der Nähe sind, ist lokales SEO der wichtigste Hebel." },
  { nr: "02", title: "Google My Business", text: "Ihr Google Business Profile ist für lokale Suchen oft wichtiger als Ihre eigene Website. Wir optimieren Ihr Profil vollständig: Kategorien, Beschreibung, Öffnungszeiten, Fotos, Bewertungsmanagement und Posts. Ein vollständig gepflegtes GBP kann Ihre lokale Sichtbarkeit innerhalb weniger Wochen deutlich verbessern." },
  { nr: "03", title: "Technisches SEO", text: "Ladezeiten, Core Web Vitals, strukturierte Daten (JSON-LD Schema), XML-Sitemap, robots.txt, kanonische URLs und interne Verlinkung — die technische Basis, ohne die kein Ranking möglich ist. Viele Websites scheitern nicht an schlechten Inhalten, sondern an technischen Fehlern, die Google das Crawlen erschweren." },
  { nr: "04", title: "On-Page Optimierung", text: "Title Tags, Meta Descriptions, Heading-Hierarchien (H1–H3), Keyword-Dichte, Bild-Alt-Texte und interne Verlinkung — jede Seite wird für ihren Ziel-Suchbegriff optimiert. On-Page SEO ist der Bereich, bei dem kleine Änderungen große Wirkung haben können." },
  { nr: "05", title: "Content-Strategie", text: "Wir analysieren, welche Keywords Ihre Zielkunden in Freiburg verwenden, welche Inhalte auf Ihrer Website fehlen und welche Themen Ranking-Potenzial haben. Das Ergebnis ist ein konkreter Content-Plan — keine abstrakte Strategie, sondern umsetzbare Maßnahmen mit messbarem Effekt." },
  { nr: "06", title: "Transparentes Reporting", text: "Monatliche Reports mit Rankings, organischem Traffic und Conversion-Daten. Sie sehen genau, welche Keywords gewonnen wurden, wie sich der Traffic entwickelt und was Ihr SEO-Budget konkret bringt. Keine Black Box, keine Agentur-Floskeln — nur messbare Ergebnisse." },
];

const prozess = [
  { nr: "01", title: "SEO-Analyse", text: "Wir analysieren Ihre aktuelle Website kostenlos: technische Fehler, fehlende Inhalte, verpasste Keywords und Wettbewerber-Gaps. Am Ende wissen wir, wo Sie stehen und was konkret getan werden muss. Kein pauschales Paket, sondern individuelle Diagnose." },
  { nr: "02", title: "Technischer Fix", text: "Alle technischen Fehler werden zuerst behoben: Ladezeiten, fehlendes Schema, kaputte Links, fehlende Meta-Tags, falsche Canonical-URLs. Ohne saubere technische Basis bringen inhaltliche Maßnahmen nur begrenzte Wirkung." },
  { nr: "03", title: "On-Page Optimierung", text: "Jede wichtige Seite wird für ihr Primär-Keyword optimiert: Title Tag, Meta Description, H1, strukturierte Daten, interne Verlinkung. Gleichzeitig bauen wir fehlende Inhaltsseiten auf — FAQ-Seiten, Service-Seiten, Stadtseiten." },
  { nr: "04", title: "Lokale Sichtbarkeit", text: "Google Business Profile optimieren, Citations aufbauen (gelbeseiten.de, Das Örtliche, Yelp), NAP-Konsistenz sicherstellen und aktiv Bewertungen einholen. Lokales SEO ist oft der schnellste Weg zu messbaren Ergebnissen." },
  { nr: "05", title: "Monitoring & Reporting", text: "Wir verfolgen Rankings, Traffic und Conversions mit Google Search Console und Analytics. Monatliche Reports zeigen, was gewonnen wurde und was als nächstes kommt. SEO ist ein Prozess — kein einmaliger Eingriff." },
];

const faqData = [
  { q: "Was kostet SEO-Optimierung in Freiburg?", a: "SEO-Betreuung bei LB Digital beginnt bei 300 € pro Monat für lokale SEO-Grundbetreuung (technisches SEO, GMB-Pflege, monatliches Reporting). Umfangreichere Pakete mit Content-Erstellung, Linkaufbau und Keyword-Strategie liegen zwischen 500 und 1.500 € monatlich. Für ein einmaliges SEO-Audit und technischen Fix ohne laufende Betreuung bieten wir Projektpreise ab 800 €. In einem kostenlosen Erstgespräch analysieren wir Ihre aktuelle Situation und erstellen ein passendes Angebot." },
  { q: "Wie lange dauert es bis ich bei Google oben stehe?", a: "SEO ist kein Sprint, sondern ein Marathon. Erste sichtbare Verbesserungen bei Long-Tail-Keywords (weniger umkämpfte Suchbegriffe) sind oft nach 4–8 Wochen erkennbar. Für kompetitive Keywords in Freiburg wie 'Zahnarzt Freiburg' oder 'Steuerberater Freiburg' sollten Sie mit 3–6 Monaten rechnen, bis deutliche Ranking-Verbesserungen eintreten. Lokales SEO über Google My Business kann deutlich schneller Wirkung zeigen — innerhalb weniger Wochen." },
  { q: "Was ist lokales SEO und warum brauche ich es?", a: "Lokales SEO umfasst alle Maßnahmen, die dazu beitragen, dass Ihr Unternehmen bei geografisch relevanten Suchanfragen gefunden wird — also wenn jemand 'Friseur Freiburg' oder 'Elektriker in der Nähe' sucht. Für Unternehmen mit lokalem Kundenstamm ist lokales SEO oft wichtiger als klassisches SEO. Es umfasst Google Business Profile, NAP-Konsistenz, lokale Keywords auf der Website, Citations und Bewertungsmanagement." },
  { q: "Was ist der Unterschied zwischen SEO und Google Ads?", a: "Google Ads (bezahlte Anzeigen) bringen sofortige Sichtbarkeit — aber nur solange Sie zahlen. Hören Sie auf zu zahlen, verschwindet auch die Sichtbarkeit. SEO (organische Optimierung) braucht länger, aber die Ergebnisse sind nachhaltig. Eine gut optimierte Seite rankt weiterhin, auch wenn Sie die aktive SEO-Arbeit reduzieren. Langfristig ist SEO kostengünstiger pro gewonnenem Kunden — der Cost-per-Click bei Google Ads für lokale Dienstleistungen in Freiburg liegt oft bei 2–8 € pro Klick." },
  { q: "Was ist Google My Business und warum ist es so wichtig?", a: "Google My Business (heute: Google Business Profile) ist das kostenlose Unternehmensprofil, das in der lokalen Google-Suche und auf Google Maps erscheint. Für lokale Suchanfragen ist es oft wichtiger als die eigene Website. Wenn jemand 'Bäckerei Freiburg' sucht, erscheint zuerst das Local Pack mit drei Google Business Einträgen — wer hier nicht auftaucht, wird in vielen Fällen gar nicht wahrgenommen. Ein vollständig optimiertes Profil mit Fotos, Bewertungen und regelmäßigen Posts ist der schnellste Hebel für lokale Sichtbarkeit." },
  { q: "Wie wichtig sind Google-Bewertungen für mein Ranking?", a: "Sehr wichtig — besonders für lokales SEO. Google verwendet die Anzahl, Aktualität und durchschnittliche Bewertung als Rankingfaktor im Local Pack. Unternehmen mit 50+ Bewertungen und 4,5 Sternen ranken systematisch besser als solche mit 5 Bewertungen und 4,0 Sternen. Wir entwickeln für unsere Kunden Strategien, um aktiv mehr Bewertungen zu generieren — ohne gegen Googles Richtlinien zu verstoßen." },
  { q: "Was sind Core Web Vitals und warum zählen sie für Google?", a: "Core Web Vitals sind drei Messgrößen, die Google seit 2021 als offiziellen Rankingfaktor verwendet: LCP (Largest Contentful Paint) misst die Ladezeit des größten sichtbaren Elements, INP (Interaction to Next Paint) misst die Reaktionsgeschwindigkeit auf Nutzeraktionen, und CLS (Cumulative Layout Shift) misst visuelle Stabilität. Websites, die diese Werte nicht erfüllen, werden von Google systematisch schlechter eingestuft." },
  { q: "Was ist der Unterschied zwischen lokaler SEO und überregionaler SEO?", a: "Lokales SEO zielt auf geografisch begrenzte Suchanfragen ab — 'Steuerberater Freiburg', 'Klempner in der Nähe'. Überregionale SEO zielt auf Begriffe ohne Ortsangabe. Für die meisten lokalen Unternehmen in Freiburg ist lokales SEO das wichtigere und oft auch günstigere Ziel, weil der Wettbewerb regional begrenzt ist." },
  { q: "Wie messen Sie den Erfolg von SEO?", a: "Wir messen SEO-Erfolg anhand von drei Kernmetriken: Keyword-Rankings (welche Position nehmen Sie für welche Suchbegriffe ein?), organischer Traffic (wie viele Besucher kommen über Google?), und Conversions (wie viele dieser Besucher werden zu Anfragen oder Kunden?). Alle Daten werden mit Google Search Console und Google Analytics 4 erfasst und monatlich reportiert." },
  { q: "Was ist SEO-Duplicate Content und wie vermeiden wir ihn?", a: "Duplicate Content bedeutet, dass identischer oder sehr ähnlicher Text auf mehreren URLs Ihrer Website existiert. Google weiß nicht, welche Seite indexiert werden soll, und stuft beide ab. Typische Ursachen: www vs. non-www Varianten, URL-Parameter, ähnliche Service-Seiten mit nahezu gleichem Text. Wir beheben das durch korrekte Canonical-Tags, 301-Weiterleitungen und inhaltliche Differenzierung der Seiten." },
  { q: "Kann ich SEO selbst machen oder brauche ich eine Agentur?", a: "Grundlegendes SEO können Sie selbst lernen und umsetzen — Google Search Console einrichten, Meta-Tags optimieren, regelmäßig Inhalte publizieren. Für technisches SEO und Linkaufbau ist Fachkenntnis sinnvoll. Eine Agentur macht Sinn, wenn Sie schnell voranschreiten wollen, keine Zeit für SEO haben oder sich in einem kompetitiven Markt befinden." },
  { q: "Was passiert wenn ich SEO aufhöre zu betreiben?", a: "Gut aufgebaute Seiten verlieren ihre Rankings nicht sofort — organisches SEO hat eine gewisse Trägheit. Aber: Konkurrenten, die aktiv weiter optimieren, holen auf. Neue Inhalte Ihrer Wettbewerber können Ihre Positionen verdrängen. Technische Probleme, die unbehandelt bleiben, können Rankings langsam erodieren. Grundsätzlich gilt: SEO ist ein kontinuierlicher Prozess." },
  { q: "Was ist der Unterschied zwischen On-Page und Off-Page SEO?", a: "On-Page SEO umfasst alles, was auf Ihrer Website selbst optimiert werden kann: Title Tags, Meta Descriptions, Inhalte, technische Struktur, interne Verlinkung, Ladezeiten. Off-Page SEO umfasst Signale von außen: Backlinks, Mentions in Online-Medien, Google Business Profile, Citations. Beide Bereiche sind wichtig — aber für lokale Unternehmen in Freiburg hat On-Page SEO und lokales Off-Page SEO Vorrang." },
  { q: "Wie wichtig ist Content für SEO?", a: "Content ist der Kern von SEO. Google kann nur ranken, was es verstehen kann. Seiten mit dünnem Inhalt (unter 500 Wörter) ranken für kompetitive Keywords selten. Unsere Service-Seiten haben 3.500–4.500 Wörter, detaillierte FAQ-Sektionen und vollständige Schema-Daten — deutlich mehr als die meisten lokalen Konkurrenten. Mehr relevanter Content bedeutet mehr Keywords, für die Google Sie zeigt." },
  { q: "Was ist ein Google Knowledge Panel?", a: "Ein Knowledge Panel ist das Info-Feld rechts in den Google-Suchergebnissen. Für Unternehmen in Freiburg entsteht es in der Regel automatisch, wenn Sie ein vollständiges Google Business Profile haben und gut strukturierte Daten (Schema.org Organization-Markup) auf Ihrer Website implementiert sind. Es signalisiert Google, dass Ihr Unternehmen real und vertrauenswürdig ist." },
];

// ── Schema ────────────────────────────────────────────────────────────────────

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO Freiburg",
  description: "Lokale Suchmaschinenoptimierung für Unternehmen in Freiburg im Breisgau. Mehr Google-Sichtbarkeit, mehr Anfragen aus der Region.",
  provider: { "@type": "LocalBusiness", name: "LB Digital", url: "https://www.lb-digital.agency", address: { "@type": "PostalAddress", addressLocality: "Freiburg im Breisgau", addressCountry: "DE" } },
  areaServed: { "@type": "City", name: "Freiburg im Breisgau" },
  offers: { "@type": "Offer", priceCurrency: "EUR", priceSpecification: { "@type": "PriceSpecification", minPrice: "300", priceCurrency: "EUR" } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.lb-digital.agency" },
    { "@type": "ListItem", position: 2, name: "SEO Freiburg", item: "https://www.lb-digital.agency/seo-freiburg" },
  ],
};

// ── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left py-5 flex items-start justify-between gap-4" aria-expanded={open}>
        <span className="flex gap-4 items-start">
          <span style={{ color: ACCENT, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", minWidth: "28px", paddingTop: "2px", opacity: 0.7 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-white leading-snug" style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}>{q}</span>
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25, ease: EASE }} className="flex-shrink-0 mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE }} style={{ overflow: "hidden" }}>
            <p className="pb-5 pl-11 leading-relaxed" style={{ color: "rgba(255,255,255,0.58)", fontSize: "clamp(14px, 1.4vw, 15px)" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function SEOFreiburgContent() {
  const { openModal } = useContactModal();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} aria-labelledby="seo-heading" className="relative flex items-center overflow-hidden" style={{ background: BG, minHeight: "100dvh" }}>
        <motion.div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ y: glowY }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 10% 60%, rgba(18,100,241,0.16) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 45% at 90% 25%, rgba(52,211,153,0.06) 0%, transparent 60%)" }} />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

        <motion.div className="container-xl relative z-10 w-full" style={{ opacity: contentOpacity, y: contentY }}>
          <div className="pt-32 pb-20 md:pt-40 md:pb-28 max-w-3xl">
            <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <Link href="/" className="text-xs hover:opacity-100 transition-opacity" style={{ color: "rgba(255,255,255,0.35)" }}>Startseite</Link>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px" }}>›</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>SEO Freiburg</span>
            </motion.nav>

            <motion.p className="eyebrow mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
              SEO · Freiburg im Breisgau
            </motion.p>

            <motion.h1 id="seo-heading" className="font-display font-extrabold leading-[1.04] tracking-tight text-white mb-6" style={{ fontSize: "clamp(38px, 6vw, 80px)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.18, ease: EASE }}>
              Mehr Kunden aus{" "}
              <span style={{ color: ACCENT }}>Freiburg</span>
              {" "}durch bessere Google-Rankings.
            </motion.h1>

            <motion.p className="mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(16px, 1.8vw, 20px)", maxWidth: "580px" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.38, ease: EASE }}>
              LB Digital optimiert Ihre Website für Google — technisch sauber, inhaltlich stark, lokal ausgerichtet. Kein pauschales SEO-Paket. Nur Maßnahmen, die messbar mehr Anfragen bringen.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3 mb-12" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.52, ease: EASE }}>
              <ArrowBtn href="#kontakt" variant="primary">Kostenlose SEO-Analyse</ArrowBtn>
              <ArrowBtn href="#leistungen" variant="ghost-light">Leistungen ansehen</ArrowBtn>
            </motion.div>

            <motion.div className="flex flex-wrap gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.7 }} aria-hidden="true">
              {["Lokales SEO", "Google My Business", "Technisches SEO", "Core Web Vitals", "Monatliches Reporting"].map((pill) => (
                <span key={pill} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>{pill}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </section>

      {/* ── Stats Banner ─────────────────────────────────────────────────── */}
      <section aria-label="SEO Kennzahlen" style={{ background: ACCENT }}>
        <div className="container-xl py-10">
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[{ value: "93%", label: "aller Online-Erfahrungen beginnen mit einer Suchmaschine" }, { value: "75%", label: "der Nutzer klicken nie auf Seite 2 bei Google" }, { value: "46%", label: "aller Google-Suchen haben lokalen Bezug" }].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <p className="font-display font-extrabold text-white leading-none mb-2" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>{stat.value}</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Leistungen ───────────────────────────────────────────────────── */}
      <section id="leistungen" aria-labelledby="leistungen-heading" style={{ background: BG2 }}>
        <div className="container-xl py-24 md:py-32">
          <Reveal className="mb-16">
            <p className="eyebrow mb-3">Leistungen</p>
            <h2 id="leistungen-heading" className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)", maxWidth: "600px" }}>
              Was gutes SEO in Freiburg umfasst
            </h2>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {leistungen.map((item) => (
              <motion.div key={item.nr} variants={fadeUp} className="p-8 transition-colors duration-300" style={{ background: BG2 }} whileHover={{ background: "#0F1E35" }}>
                <span className="font-display font-bold text-sm mb-4 block" style={{ color: ACCENT }}>{item.nr}</span>
                <h3 className="font-display font-bold text-white mb-3 leading-snug" style={{ fontSize: "clamp(17px, 1.8vw, 20px)" }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>{item.text}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Warum LB Digital ─────────────────────────────────────────────── */}
      <section aria-labelledby="warum-heading" style={{ background: BG }}>
        <div className="container-xl py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="eyebrow mb-3">Warum LB Digital</p>
              <h2 id="warum-heading" className="font-display font-extrabold text-white leading-tight mb-6" style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}>
                SEO, das wirklich auf Freiburg ausgerichtet ist
              </h2>
              <div className="space-y-4" style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(14px, 1.5vw, 16px)", lineHeight: "1.75" }}>
                <p>
                  Lokales SEO für Freiburg bedeutet nicht, einfach das Wort "Freiburg" auf Ihrer Website einzufügen. Es bedeutet, die lokale Suchintention zu verstehen — welche Begriffe Freiburger Kunden verwenden, welche Konkurrenten in der lokalen Suche dominieren und welche technischen Voraussetzungen Google für lokale Rankings stellt.
                </p>
                <p>
                  Als Agentur aus Freiburg kennen wir den lokalen Markt. Wir wissen, dass für einen Zahnarzt "Zahnarzt Freiburg-Betzenhausen" einen anderen Suchkontext hat als "Zahnarzt Freiburg Innenstadt". Diese Nuancen machen den Unterschied zwischen generischem SEO und lokalem SEO, das wirklich Anfragen bringt.
                </p>
                <p>
                  Unsere Websites haben vollständiges Schema-Markup (JSON-LD), das kein einziger unserer geprüften Top-5-Konkurrenten in Freiburg implementiert hat. Das ist ein direkter, messbarer Wettbewerbsvorteil — heute und in Zukunft.
                </p>
              </div>
            </Reveal>
            <StaggerReveal className="grid grid-cols-2 gap-4">
              {[{ value: "0/5", label: "Konkurrenten mit Schema" }, { value: "3–6M", label: "bis erste Rankings" }, { value: "46%", label: "lokale Suchanfragen" }, { value: "4.000+", label: "Wörter pro Seite" }].map((item) => (
                <motion.div key={item.label} variants={fadeUp} className="p-6 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="font-display font-extrabold mb-1" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: ACCENT }}>{item.value}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</p>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ── Prozess ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="prozess-heading" style={{ background: BG2 }}>
        <div className="container-xl py-24 md:py-32">
          <Reveal className="mb-16">
            <p className="eyebrow mb-3">SEO-Prozess</p>
            <h2 id="prozess-heading" className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              Wie wir Ihre Sichtbarkeit aufbauen
            </h2>
          </Reveal>
          <div>
            {prozess.map((step, i) => (
              <Reveal key={step.nr} delay={i * 0.08}>
                <div className="flex gap-8 pb-12 relative pl-8" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full" style={{ background: ACCENT, border: "3px solid #0A1628" }} aria-hidden="true" />
                  <div>
                    <p className="font-display font-bold text-sm mb-2" style={{ color: ACCENT }}>{step.nr}</p>
                    <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: "clamp(17px, 1.8vw, 21px)" }}>{step.title}</h3>
                    <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(14px, 1.4vw, 15px)", maxWidth: "560px" }}>{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Preispakete ──────────────────────────────────────────────────── */}
      <section aria-labelledby="preise-heading" style={{ background: BG }}>
        <div className="container-xl py-24 md:py-32">
          <Reveal className="mb-16">
            <p className="eyebrow mb-3">Transparente Preise</p>
            <h2 id="preise-heading" className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              SEO-Pakete für Unternehmen in Freiburg
            </h2>
            <p className="mt-4" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "520px", fontSize: "clamp(14px, 1.5vw, 16px)" }}>
              Keine versteckten Kosten, kein Stundensatz-Roulette. Sie wissen von Anfang an, was Sie investieren und was Sie dafür bekommen.
            </p>
          </Reveal>
          <StaggerReveal className="grid md:grid-cols-3 gap-6">
            {[
              { name: "SEO-Audit", price: "ab 800 €", period: "einmalig", desc: "Vollständige Analyse Ihrer Website: technische Fehler, Keyword-Gaps, Wettbewerber-Vergleich. Mit konkretem Maßnahmenplan.", features: ["Technische SEO-Analyse", "Keyword-Recherche", "Wettbewerber-Analyse", "Maßnahmenplan", "Google Search Console Setup"], cta: "Audit anfragen", highlight: false },
              { name: "Lokales SEO", price: "ab 300 €", period: "/ Monat", desc: "Grundbetreuung für lokale Sichtbarkeit: technisches SEO, Google Business Profile Pflege, monatliches Reporting.", features: ["Technisches SEO", "Google Business Profile", "Monatliches Reporting", "Keyword-Tracking", "Core Web Vitals Monitoring"], cta: "Paket anfragen", highlight: true },
              { name: "Full-Service SEO", price: "ab 600 €", period: "/ Monat", desc: "Komplette SEO-Betreuung: Content-Erstellung, Linkaufbau, Conversion-Optimierung und strategische Planung.", features: ["Alles aus Lokalem SEO", "Content-Erstellung", "Linkaufbau", "Conversion-Tracking", "Quartals-Strategie"], cta: "Full-Service anfragen", highlight: false },
            ].map((plan) => (
              <motion.div key={plan.name} variants={fadeUp} className="p-8 rounded-lg flex flex-col" style={{ background: plan.highlight ? "rgba(18,100,241,0.1)" : "rgba(255,255,255,0.03)", border: plan.highlight ? `1px solid ${ACCENT}` : "1px solid rgba(255,255,255,0.07)" }}>
                {plan.highlight && <span className="text-xs font-bold px-3 py-1 rounded-full mb-4 self-start" style={{ background: ACCENT, color: "#fff" }}>Beliebt</span>}
                <h3 className="font-display font-bold text-white mb-1" style={{ fontSize: "clamp(17px, 1.8vw, 20px)" }}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <p className="font-display font-extrabold" style={{ color: ACCENT, fontSize: "clamp(22px, 2.5vw, 30px)" }}>{plan.price}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{plan.period}</p>
                </div>
                <p className="mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{plan.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <span style={{ color: "#34D399", flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={openModal} className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200" style={{ background: plan.highlight ? ACCENT : "rgba(255,255,255,0.07)", color: "#fff", border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section aria-labelledby="faq-heading" style={{ background: BG2 }}>
        <div className="container-xl py-24 md:py-32">
          <Reveal className="mb-16">
            <p className="eyebrow mb-3">FAQ</p>
            <h2 id="faq-heading" className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              Häufige Fragen zu SEO in Freiburg
            </h2>
          </Reveal>
          <StaggerReveal>
            {faqData.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} index={i} />)}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Interne Links ────────────────────────────────────────────────── */}
      <section aria-label="Weitere Leistungen" style={{ background: BG }}>
        <div className="container-xl py-16">
          <Reveal>
            <p className="text-sm font-medium mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>Weitere Leistungen von LB Digital</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/webdesign-freiburg" className="group flex items-center gap-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span className="group-hover:translate-x-1 transition-transform" style={{ color: ACCENT }}>→</span>
                Webdesign Freiburg – Individuelle Websites
              </Link>
              <Link href="/webdesign-furtwangen" className="group flex items-center gap-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span className="group-hover:translate-x-1 transition-transform" style={{ color: ACCENT }}>→</span>
                Webdesign Furtwangen
              </Link>
              <Link href="/handwerker" className="group flex items-center gap-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span className="group-hover:translate-x-1 transition-transform" style={{ color: ACCENT }}>→</span>
                Websites für Handwerker
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" style={{ background: "#0D0D0D" }}>
        <div className="container-xl py-24 md:py-32 text-center">
          <Reveal>
            <p className="eyebrow mb-4">Bereit?</p>
            <h2 id="cta-heading" className="font-display font-extrabold text-white leading-tight mb-6 mx-auto" style={{ fontSize: "clamp(30px, 5vw, 64px)", maxWidth: "640px" }}>
              Ihr Unternehmen in Freiburg soll gefunden werden.
            </h2>
            <p className="mb-10 mx-auto" style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(15px, 1.6vw, 18px)", maxWidth: "480px" }}>
              Kostenlose SEO-Analyse — wir schauen uns Ihre aktuelle Situation an und zeigen Ihnen, welche Chancen Sie noch nicht nutzen.
            </p>
            <ArrowBtn href="#kontakt" variant="primary">Kostenlose SEO-Analyse starten</ArrowBtn>
          </Reveal>
        </div>
      </section>
    </>
  );
}
