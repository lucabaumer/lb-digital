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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
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
  {
    nr: "01",
    title: "Individuelle Gestaltung",
    text: "Kein Template, kein Baukasten. Jede Website wird von Grund auf für Ihr Unternehmen entwickelt — mit Ihren Farben, Ihrer Botschaft und Ihrer Zielgruppe im Mittelpunkt. Das Ergebnis ist eine digitale Visitenkarte, die sich von der Masse abhebt und Ihre Marke authentisch darstellt.",
  },
  {
    nr: "02",
    title: "Next.js & React",
    text: "Wir setzen auf die modernste Webtechnologie: Next.js mit React. Das bedeutet blitzschnelle Ladezeiten, statisches Rendering für maximale SEO-Performance und eine Architektur, die mit Ihrem Unternehmen mitwächst. Keine veraltete PHP-Basis, keine Sicherheitslücken durch Plugins.",
  },
  {
    nr: "03",
    title: "Mobile First",
    text: "Über 70 % Ihrer Besucher kommen vom Smartphone. Deshalb gestalten wir jede Website zunächst für mobile Geräte und erweitern das Design dann für Tablet und Desktop. Das Ergebnis: ein nahtloses Erlebnis auf jedem Bildschirm — ohne Kompromisse bei Design oder Geschwindigkeit.",
  },
  {
    nr: "04",
    title: "SEO von Grund auf",
    text: "Technisch sauberer Code, optimierte Ladezeiten, strukturierte Daten (JSON-LD Schema) und korrekte Heading-Hierarchien — damit Google Ihre Seite von Anfang an versteht und korrekt einordnet. SEO beginnt nicht nach dem Launch, sondern bei der ersten Zeile Code.",
  },
  {
    nr: "05",
    title: "Lighthouse 95+",
    text: "Googles Lighthouse-Tool bewertet Ihre Website in vier Kategorien: Performance, Accessibility, Best Practices und SEO. Wir liefern in allen Kategorien Scores von 95 oder höher — messbar, transparent und nachweislich besser als die meisten Template-basierten Konkurrenten.",
  },
  {
    nr: "06",
    title: "Persönliche Betreuung",
    text: "Kein Ticketsystem, kein anonymer Account-Manager. Sie arbeiten direkt mit dem Entwickler zusammen — von der ersten Idee über das Design bis zum Launch und darüber hinaus. Schnelle Kommunikation, klare Antworten, persönliche Verantwortung für Ihr Projekt.",
  },
];

const prozess = [
  { nr: "01", title: "Erstgespräch", text: "In einem kostenlosen, unverbindlichen Gespräch lernen wir Ihr Unternehmen kennen. Wir fragen nach Ihren Zielen, Ihrer Zielgruppe und Ihren Vorstellungen. Am Ende wissen wir, was Ihre Website leisten muss — und Sie wissen, was Sie von uns erwarten können." },
  { nr: "02", title: "Konzept & Design", text: "Wir entwickeln ein Konzept mit Sitemap, Wireframes und Design-Richtung. Sie erhalten konkrete Entwürfe, keine leeren Versprechen. Erst wenn Sie mit der Richtung zufrieden sind, beginnen wir mit der Umsetzung. Revisionen sind einkalkuliert." },
  { nr: "03", title: "Entwicklung", text: "Die technische Umsetzung erfolgt mit Next.js und modernen Web-Standards. Sie erhalten regelmäßige Updates und können den Fortschritt live verfolgen. Kein Projekt verschwindet wochenlang in einer Black Box — Transparenz ist Standard." },
  { nr: "04", title: "Review & Optimierung", text: "Vor dem Launch testen wir Ihre Website auf allen Geräten und Browsern. Wir überprüfen Ladezeiten, SEO-Konfiguration, Lighthouse-Score und Barrierefreiheit. Erst wenn alle Werte stimmen, gehen wir live." },
  { nr: "05", title: "Launch & Support", text: "Deployment, Domain-Konfiguration, SSL-Zertifikat und Sitemap-Einreichung bei Google — alles aus einer Hand. Nach dem Launch stehen wir für Fragen und Anpassungen bereit. Kein fertiges Produkt, das Sie danach allein lässt." },
];

const faqData = [
  { q: "Was kostet eine professionelle Website in Freiburg?", a: "Eine professionelle Website bei LB Digital beginnt bei 1.000 € für eine einfache Landingpage. Für eine vollständige Business-Website mit mehreren Unterseiten, Kontaktformular und SEO-Grundoptimierung liegt der Preis in der Regel zwischen 3.000 und 6.000 €. Der genaue Preis hängt von Umfang, Funktionen und Designaufwand ab. Sie erhalten immer ein detailliertes Angebot vorab — keine versteckten Kosten, keine Überraschungen nach dem Launch." },
  { q: "Wie lange dauert die Erstellung einer Website?", a: "Eine einfache Landingpage ist in 2–3 Wochen fertig. Eine vollständige Business-Website mit mehreren Unterseiten dauert in der Regel 4–8 Wochen. Der größte Zeitfaktor ist dabei oft die Bereitstellung von Inhalten und Feedback durch den Kunden — nicht die technische Entwicklung. Nach dem Erstgespräch erhalten Sie eine realistische Zeitplanung für Ihr Projekt." },
  { q: "Was ist der Unterschied zwischen einem Baukasten und einer individuellen Website?", a: "Baukästen wie Wix, Jimdo oder Squarespace bieten vorgefertigte Templates, die Sie selbst befüllen. Das ist günstig und schnell — aber erkauft durch Kompromisse: langsamere Ladezeiten, eingeschränkte Gestaltungsmöglichkeiten, monatliche Abokosten und schlechtere SEO-Performance. Eine individuelle Website mit Next.js ist schneller, besser auf Google optimiert und zu 100 % auf Ihre Marke zugeschnitten — ohne monatliche Lizenzgebühren." },
  { q: "Warum Next.js statt WordPress für mein Unternehmen in Freiburg?", a: "WordPress ist das meistgenutzte CMS der Welt — und gleichzeitig das meistgehackte. Ständige Plugin-Updates, Sicherheitslücken und Kompatibilitätsprobleme sind bei WordPress alltäglich. Next.js hingegen generiert statische HTML-Dateien, die blitzschnell ausgeliefert werden und keine angreifbare Datenbankstruktur haben. Das Ergebnis: bessere Ladezeiten, höhere Sicherheit und von Beginn an bessere Rankingchancen bei Google." },
  { q: "Ist meine Website auch auf dem Smartphone optimiert?", a: "Ja — wir arbeiten nach dem Mobile First-Prinzip. Das bedeutet, wir gestalten die mobile Version zuerst und erweitern das Design dann für Tablet und Desktop. Über 70 % aller Website-Besucher kommen heute vom Smartphone. Google bewertet Websites primär nach ihrer mobilen Version (Mobile First Indexing). Eine nicht-mobile-optimierte Website ist 2026 schlicht keine Option mehr." },
  { q: "Kümmern Sie sich auch um Hosting und Domain?", a: "Ja. Wir übernehmen das Deployment auf Vercel — einem der schnellsten globalen Edge-Networks. Die Domain können Sie selbst registrieren (z.B. über IONOS oder Hetzner) oder wir erledigen das für Sie. Wir richten SSL-Zertifikat, DNS-Konfiguration und alle technischen Details ein, sodass Ihre Website vom ersten Tag an sicher und erreichbar ist." },
  { q: "Kann ich die Website später selbst bearbeiten?", a: "Das kommt auf Ihre Anforderungen an. Wenn Sie Texte und Bilder selbst pflegen möchten, integrieren wir ein Headless CMS wie Sanity oder Contentful. Damit können Sie Inhalte über eine benutzerfreundliche Oberfläche bearbeiten, ohne Code anfassen zu müssen. Wenn Sie Änderungen lieber uns überlassen möchten, bieten wir auch Support-Pakete für regelmäßige Aktualisierungen an." },
  { q: "Was ist SEO und ist es bei der Website inklusive?", a: "SEO (Suchmaschinenoptimierung) umfasst alle Maßnahmen, die dazu beitragen, dass Ihre Website bei Google möglichst weit oben erscheint. Bei jeder Website von LB Digital ist technisches SEO inklusive: saubere URL-Struktur, optimierte Meta-Tags, strukturierte Daten (JSON-LD Schema), Lighthouse-optimierte Ladezeiten und korrekte Heading-Hierarchien. Kontinuierliche SEO-Betreuung mit Keyword-Strategie und Content ist ein separates Leistungspaket." },
  { q: "Wie unterscheidet sich LB Digital von anderen Webdesign-Agenturen in Freiburg?", a: "Die meisten Agenturen in Freiburg arbeiten mit WordPress-Templates oder setzen auf veraltete Technologien. LB Digital entwickelt ausschließlich mit Next.js und React — der gleichen Technologie, die Unternehmen wie Vercel, Notion und Linear nutzen. Sie arbeiten direkt mit dem Entwickler zusammen, kein Mittelsmann, kein Projektmanager-Filter. Das bedeutet schnellere Kommunikation, weniger Missverständnisse und ein Endprodukt, das wirklich Ihren Anforderungen entspricht." },
  { q: "Was brauche ich von meiner Seite um zu starten?", a: "Für den Start benötigen wir: eine grobe Vorstellung, was die Website leisten soll (Ziele, Zielgruppe, Wettbewerber), vorhandene Markenmaterialien wie Logo, Farben oder Fonts (falls vorhanden), und Texte oder Stichpunkte zu Ihren Leistungen. Haben Sie noch kein Logo oder kein klares Branding? Kein Problem — wir können auch dabei helfen oder entsprechende Empfehlungen geben." },
  { q: "Bieten Sie Wartung und Support nach dem Launch an?", a: "Ja. Nach dem Launch stehen wir für technischen Support, Inhaltsaktualisierungen und Anpassungen bereit. Wir bieten flexible Support-Pakete an — von der reinen Bereitschaft für Notfälle bis hin zu regelmäßiger Betreuung mit monatlichen Updates und Performance-Monitoring. Details dazu besprechen wir individuell nach Ihren Anforderungen." },
  { q: "Was ist ein Lighthouse Score und warum ist er wichtig?", a: "Google Lighthouse ist ein kostenloses Analyse-Tool, das Websites in vier Kategorien bewertet: Performance (Ladegeschwindigkeit), Accessibility (Barrierefreiheit), Best Practices (Sicherheit und Code-Qualität) und SEO. Scores gehen von 0 bis 100. Websites mit niedrigen Performance-Scores werden von Google schlechter eingestuft, da Nutzererfahrung ein direkter Rankingfaktor ist. Unsere Websites erreichen durchgehend 95+ in allen Kategorien." },
  { q: "Was ist der Unterschied zwischen einer Landingpage und einer Business-Website?", a: "Eine Landingpage ist eine einzelne, fokussierte Seite mit einem klaren Ziel — z.B. Kontaktanfragen oder Newsletter-Anmeldungen. Sie eignet sich für Kampagnen oder als erste Online-Präsenz. Eine Business-Website umfasst mehrere Unterseiten (Startseite, Leistungen, Über uns, Kontakt) und bietet Besuchern ein vollständiges Bild Ihres Unternehmens. Für die meisten Unternehmen in Freiburg ist eine Business-Website die richtige Wahl." },
  { q: "Wie wirkt sich die Website-Geschwindigkeit auf mein Google-Ranking aus?", a: "Seit 2021 sind die Core Web Vitals — Googles Messgrößen für Ladezeit, Interaktivität und visuelle Stabilität — offizieller Rankingfaktor. Websites, die diese Werte nicht erfüllen, werden systematisch schlechter eingestuft als schnellere Konkurrenten. Eine Website, die in 3 Sekunden lädt, hat gegenüber einer Website, die in unter 1 Sekunde lädt, einen messbaren Ranking-Nachteil — unabhängig vom Inhalt." },
  { q: "Arbeiten Sie auch mit Kunden außerhalb von Freiburg zusammen?", a: "Ja, absolut. Unser physischer Standort ist Freiburg im Breisgau, aber wir arbeiten mit Kunden aus der gesamten Region — Schwarzwald, Breisgau, Ortenau, Bodensee — sowie deutschlandweit. Die gesamte Zusammenarbeit läuft digital: Erstgespräch per Video-Call, Feedback über geteilte Dokumente, Präsentation per Bildschirmübertragung. Kein persönliches Treffen notwendig." },
  { q: "Brauche ich eine neue Website oder reicht eine Überarbeitung?", a: "Das hängt vom Zustand Ihrer aktuellen Website ab. Wenn die technische Basis veraltet ist (z.B. altes WordPress ohne Updates), die Ladezeiten schlecht sind oder das Design grundlegend nicht mehr zur Marke passt, ist ein Neubau oft sinnvoller als eine Überarbeitung. Wir schauen uns Ihre aktuelle Seite kostenlos an und geben eine ehrliche Einschätzung — ohne Verkaufsdruck." },
  { q: "Was bedeutet Mobile First und warum ist das wichtig?", a: "Mobile First bedeutet, dass wir beim Design mit der kleinsten Bildschirmgröße beginnen — dem Smartphone — und das Layout dann für größere Bildschirme erweitern. Google verwendet seit 2019 ausschließlich die mobile Version einer Website für das Ranking (Mobile First Indexing). Wer keine durchdachte mobile Darstellung hat, verliert sichtbar Ranking-Punkte gegenüber mobil-optimierten Konkurrenten." },
  { q: "Was passiert, wenn ich mit meiner Website nicht zufrieden bin?", a: "Wir arbeiten iterativ und mit regelmäßigem Feedback. Revisionen sind in jedem Projekt einkalkuliert. Bevor wir live gehen, haben Sie ausreichend Gelegenheit, Änderungen einzubringen. Grundlegende Anpassungen nach dem Launch werden fair abgerechnet — ohne versteckte Gebühren. Unser Ziel ist Ihre Zufriedenheit, nicht ein möglichst schneller Abschluss." },
];

// ── Schema ────────────────────────────────────────────────────────────────────

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Webdesign Freiburg",
  description: "Professionelles Webdesign in Freiburg im Breisgau. Individuelle Websites mit Next.js — schnell, mobil optimiert und für Google optimiert.",
  provider: {
    "@type": "LocalBusiness",
    name: "LB Digital",
    url: "https://www.lb-digital.agency",
    address: { "@type": "PostalAddress", addressLocality: "Freiburg im Breisgau", addressCountry: "DE" },
  },
  areaServed: { "@type": "City", name: "Freiburg im Breisgau" },
  offers: { "@type": "Offer", priceCurrency: "EUR", price: "1000", priceSpecification: { "@type": "PriceSpecification", minPrice: "1000", maxPrice: "6000" } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.lb-digital.agency" },
    { "@type": "ListItem", position: 2, name: "Webdesign Freiburg", item: "https://www.lb-digital.agency/webdesign-freiburg" },
  ],
};

// ── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        aria-expanded={open}
      >
        <span className="flex gap-4 items-start">
          <span style={{ color: ACCENT, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", minWidth: "28px", paddingTop: "2px", opacity: 0.7 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-white leading-snug" style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}>{q}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="flex-shrink-0 mt-1"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 pl-11 leading-relaxed" style={{ color: "rgba(255,255,255,0.58)", fontSize: "clamp(14px, 1.4vw, 15px)" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function WebdesignFreiburgContent() {
  const { openModal } = useContactModal();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        aria-labelledby="wf-heading"
        className="relative flex items-center overflow-hidden"
        style={{ background: BG, minHeight: "100dvh" }}
      >
        {/* Radial glow */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ y: glowY }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 65% 60% at 15% 55%, rgba(18,100,241,0.18) 0%, transparent 65%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 40% 40% at 85% 30%, rgba(18,100,241,0.08) 0%, transparent 60%)",
          }} />
        </motion.div>

        {/* Grid texture */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        <motion.div
          className="container-xl relative z-10 w-full"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="pt-32 pb-20 md:pt-40 md:pb-28 max-w-3xl">
            {/* Breadcrumb */}
            <motion.nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <Link href="/" className="text-xs hover:opacity-100 transition-opacity" style={{ color: "rgba(255,255,255,0.35)" }}>Startseite</Link>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px" }}>›</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Webdesign Freiburg</span>
            </motion.nav>

            {/* Eyebrow */}
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              Webdesign · Freiburg im Breisgau
            </motion.p>

            {/* Headline */}
            <motion.h1
              id="wf-heading"
              className="font-display font-extrabold leading-[1.04] tracking-tight text-white mb-6"
              style={{ fontSize: "clamp(38px, 6vw, 80px)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
            >
              Websites, die in{" "}
              <span style={{ color: ACCENT }}>Freiburg</span>
              {" "}und darüber hinaus überzeugen.
            </motion.h1>

            <motion.p
              className="mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(16px, 1.8vw, 20px)", maxWidth: "580px" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38, ease: EASE }}
            >
              LB Digital entwickelt individuelle Websites für Unternehmen in Freiburg im Breisgau. Modern, schnell und auf Ihre Zielgruppe ausgerichtet — kein Baukasten, kein Template, kein Mittelsmann.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.52, ease: EASE }}
            >
              <ArrowBtn href="#kontakt" variant="primary">Kostenloses Erstgespräch</ArrowBtn>
              <ArrowBtn href="#leistungen" variant="ghost-light">Leistungen ansehen</ArrowBtn>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              aria-hidden="true"
            >
              {["Lighthouse 95+", "Next.js", "Ladezeit <1s", "Kein Template", "Direkt zum Entwickler"].map((pill) => (
                <span key={pill} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </section>

      {/* ── Stats Banner ─────────────────────────────────────────────────── */}
      <section aria-label="Kennzahlen" style={{ background: ACCENT }}>
        <div className="container-xl py-10">
          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "95+", label: "Lighthouse Score" },
              { value: "<1s", label: "Ladezeit" },
              { value: "100%", label: "Individuell" },
              { value: "0€", label: "Erstgespräch" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <p className="font-display font-extrabold text-white leading-none mb-1" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>{stat.value}</p>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{stat.label}</p>
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
              Was eine professionelle Website leisten muss
            </h2>
          </Reveal>

          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {leistungen.map((item) => (
              <motion.div
                key={item.nr}
                variants={fadeUp}
                className="group p-8 transition-colors duration-300"
                style={{ background: BG2 }}
                whileHover={{ background: "#0F1E35" }}
              >
                <span className="font-display font-bold text-sm mb-4 block" style={{ color: ACCENT }}>{item.nr}</span>
                <h3 className="font-display font-bold text-white mb-3 leading-snug" style={{ fontSize: "clamp(17px, 1.8vw, 20px)" }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>{item.text}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Lokaler Freiburg Content ──────────────────────────────────────── */}
      <section aria-labelledby="freiburg-heading" style={{ background: BG }}>
        <div className="container-xl py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="eyebrow mb-3">Lokale Expertise</p>
              <h2 id="freiburg-heading" className="font-display font-extrabold text-white leading-tight mb-6" style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}>
                Webdesign, das den Freiburger Markt kennt
              </h2>
              <div className="space-y-4" style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(14px, 1.5vw, 16px)", lineHeight: "1.75" }}>
                <p>
                  Freiburg im Breisgau ist mehr als eine Universitätsstadt mit hoher Lebensqualität. Es ist ein wirtschaftlich aktiver Standort mit über 230.000 Einwohnern, einer der größten Universitäten Deutschlands und einer wachsenden Startup-Szene. Die Nähe zur Schweiz und zu Frankreich macht Freiburg zu einem echten Dreiländereck — mit internationaler Ausrichtung und starkem Mittelstand.
                </p>
                <p>
                  Als Webdesign-Agentur aus Freiburg kennen wir die lokale Konkurrenz, die typischen Branchen und die Erwartungen Ihrer Zielgruppe. Ob Rechtsanwaltskanzlei in der Innenstadt, Handwerksbetrieb im Breisgau, Gastronomiebetrieb nahe dem Münster oder Dienstleister im Dreisamtal — wir verstehen, wie Ihre Kunden suchen und was sie überzeugt.
                </p>
                <p>
                  Tourismus, Medizin, Recht, Handwerk, Architektur und Hochschule — Freiburgs Wirtschaft ist vielfältig. Genau diese Vielfalt spiegelt sich in den Websites wider, die wir entwickeln: jedes Projekt ist auf seinen spezifischen Markt zugeschnitten, nicht auf eine generische Vorlage gepresst.
                </p>
              </div>
            </Reveal>

            <StaggerReveal className="grid grid-cols-2 gap-4">
              {[
                { value: "230.000+", label: "Einwohner Freiburg" },
                { value: "3", label: "Länder im Einzugsgebiet" },
                { value: "70%+", label: "Mobile Besucher" },
                { value: "3,5s", label: "Ø WordPress Ladezeit" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="p-6 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p className="font-display font-extrabold text-white mb-1" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: ACCENT }}>{item.value}</p>
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
            <p className="eyebrow mb-3">Ablauf</p>
            <h2 id="prozess-heading" className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              Von der Idee zur fertigen Website
            </h2>
          </Reveal>

          <div className="space-y-0" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "0" }}>
            {prozess.map((step, i) => (
              <Reveal key={step.nr} delay={i * 0.08}>
                <div className="flex gap-8 pb-12 relative pl-8" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
                  {/* Step dot */}
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: ACCENT, border: "3px solid #0A1628" }} aria-hidden="true" />
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

      {/* ── Technologie ──────────────────────────────────────────────────── */}
      <section aria-labelledby="tech-heading" style={{ background: BG }}>
        <div className="container-xl py-24 md:py-32">
          <Reveal className="mb-16">
            <p className="eyebrow mb-3">Technologie</p>
            <h2 id="tech-heading" className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)", maxWidth: "600px" }}>
              Warum Next.js — und warum nicht WordPress
            </h2>
          </Reveal>

          {/* Comparison table */}
          <Reveal className="mb-16 overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>Kriterium</th>
                  <th className="py-3 px-4 font-bold text-center" style={{ color: ACCENT, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>LB Digital / Next.js</th>
                  <th className="py-3 px-4 font-medium text-center" style={{ color: "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>WordPress</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Ladezeit", "< 1 Sekunde", "3–8 Sekunden"],
                  ["Lighthouse Score", "95–100", "40–70"],
                  ["Sicherheit", "Keine Angriffsfläche", "Meistgehacktes CMS"],
                  ["Monatliche Kosten", "Keine Abo-Gebühren", "Plugins + Hosting"],
                  ["SEO-Performance", "Technisch optimal", "Plugin-abhängig"],
                  ["Design-Freiheit", "100 % individuell", "Template-gebunden"],
                ].map(([label, lb, wp], i) => (
                  <tr key={label} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                    <td className="py-3 px-4 font-medium" style={{ color: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{label}</td>
                    <td className="py-3 px-4 text-center font-semibold" style={{ color: "#34D399", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>✓ {lb}</td>
                    <td className="py-3 px-4 text-center" style={{ color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>✗ {wp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <StaggerReveal className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Geschwindigkeit als Rankingfaktor", text: "Google bewertet Ladegeschwindigkeit über die Core Web Vitals. WordPress erreicht oft 3–8 Sekunden. Unsere Next.js-Websites laden in unter einer Sekunde — das ist saubere Architektur ohne unnötigen Overhead." },
              { title: "Kein WordPress, kein Sicherheitsproblem", text: "WordPress ist das meistgehackte CMS der Welt. Ständige Plugin-Updates, Sicherheitslücken und Kompatibilitätsprobleme kosten Zeit und Nerven. Next.js hat keine Plugins, keine Datenbank-Angriffsfläche." },
              { title: "Vercel Edge Network", text: "Wir hosten auf Vercel, dem globalen Edge-Network. Ihre Website wird von Rechenzentren rund um den Globus ausgeliefert — immer vom nächstgelegenen Standort. Für Besucher in Freiburg: minimale Latenz, maximale Geschwindigkeit." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="p-6 rounded-lg"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h3 className="font-display font-bold text-white mb-3 leading-snug" style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{item.text}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Ergebnisse / Zahlen ───────────────────────────────────────────── */}
      <section aria-labelledby="ergebnisse-heading" style={{ background: BG2 }}>
        <div className="container-xl py-24 md:py-32">
          <Reveal className="mb-16 text-center">
            <p className="eyebrow mb-3">Messbare Qualität</p>
            <h2 id="ergebnisse-heading" className="font-display font-extrabold text-white leading-tight mx-auto" style={{ fontSize: "clamp(28px, 4vw, 52px)", maxWidth: "540px" }}>
              Was unsere Websites technisch leisten
            </h2>
          </Reveal>

          <StaggerReveal className="grid md:grid-cols-3 gap-6">
            {[
              {
                value: "95+",
                label: "Lighthouse Score",
                desc: "In allen vier Kategorien: Performance, Accessibility, Best Practices und SEO. Messbar, transparent, nachweislich besser als Template-Websites.",
                icon: "⚡",
              },
              {
                value: "<1s",
                label: "Ladezeit",
                desc: "Unsere Websites laden in unter einer Sekunde. Das ist kein Marketing-Versprechen, sondern das direkte Ergebnis sauberer Next.js-Architektur und statischem Rendering.",
                icon: "🚀",
              },
              {
                value: "100%",
                label: "Individuell",
                desc: "Kein Template, das angepasst wurde. Jede Zeile Code ist auf Ihr Unternehmen zugeschnitten — vom Design über die Inhalte bis zur technischen Architektur.",
                icon: "✦",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="p-8 rounded-lg text-center"
                style={{ background: "rgba(18,100,241,0.06)", border: "1px solid rgba(18,100,241,0.15)" }}
              >
                <p className="text-3xl mb-4" aria-hidden="true">{item.icon}</p>
                <p className="font-display font-extrabold text-white mb-1" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: ACCENT }}>{item.value}</p>
                <p className="font-bold text-white mb-3" style={{ fontSize: "clamp(14px, 1.5vw, 16px)" }}>{item.label}</p>
                <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{item.desc}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Preise ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="preise-heading" style={{ background: BG }}>
        <div className="container-xl py-24 md:py-32">
          <Reveal className="mb-16">
            <p className="eyebrow mb-3">Transparente Preise</p>
            <h2 id="preise-heading" className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              Keine versteckten Kosten
            </h2>
            <p className="mt-4" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "520px", fontSize: "clamp(14px, 1.5vw, 16px)" }}>
              Sie erhalten immer ein detailliertes Angebot vorab. Kein Stundensatz-Roulette, keine Überraschungsrechnung nach dem Launch.
            </p>
          </Reveal>

          <StaggerReveal className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Landingpage",
                price: "ab 1.000 €",
                desc: "Einzelne, fokussierte Seite mit klarem Ziel. Ideal als erste Online-Präsenz oder für gezielte Kampagnen.",
                features: ["1 Seite, vollständig responsive", "Kontaktformular", "SEO-Grundoptimierung", "Lighthouse 95+", "Deployment auf Vercel"],
                cta: "Landingpage anfragen",
                highlight: false,
              },
              {
                name: "Business-Website",
                price: "3.000–6.000 €",
                desc: "Vollständige Website mit mehreren Unterseiten. Das richtige Fundament für Ihr Unternehmen.",
                features: ["Startseite + Unterseiten", "Individuelles Design-System", "Vollständiges SEO-Setup", "Schema-Markup (JSON-LD)", "Headless CMS optional"],
                cta: "Business-Website anfragen",
                highlight: true,
              },
              {
                name: "Individualprojekt",
                price: "Auf Anfrage",
                desc: "Komplexe Anforderungen, besondere Funktionen oder ein großes Projekt? Wir machen ein individuelles Angebot.",
                features: ["Individuelle Architektur", "API-Integrationen", "E-Commerce / Portale", "Laufende Betreuung", "SLA nach Vereinbarung"],
                cta: "Projekt besprechen",
                highlight: false,
              },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className="p-8 rounded-lg flex flex-col"
                style={{
                  background: plan.highlight ? "rgba(18,100,241,0.1)" : "rgba(255,255,255,0.03)",
                  border: plan.highlight ? `1px solid ${ACCENT}` : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {plan.highlight && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full mb-4 self-start" style={{ background: ACCENT, color: "#fff" }}>Beliebt</span>
                )}
                <h3 className="font-display font-bold text-white mb-1" style={{ fontSize: "clamp(17px, 1.8vw, 20px)" }}>{plan.name}</h3>
                <p className="font-display font-extrabold mb-3" style={{ color: ACCENT, fontSize: "clamp(22px, 2.5vw, 30px)" }}>{plan.price}</p>
                <p className="mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{plan.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <span style={{ color: "#34D399", flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openModal}
                  className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 text-center"
                  style={{
                    background: plan.highlight ? ACCENT : "rgba(255,255,255,0.07)",
                    color: "#fff",
                    border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
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
              Häufige Fragen zu Webdesign in Freiburg
            </h2>
          </Reveal>

          <StaggerReveal>
            {faqData.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Interne Links ────────────────────────────────────────────────── */}
      <section aria-label="Weitere Leistungen" style={{ background: BG }}>
        <div className="container-xl py-16">
          <Reveal>
            <p className="text-sm font-medium mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>Weitere Leistungen von LB Digital</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/seo-freiburg" className="group flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span className="group-hover:translate-x-1 transition-transform" style={{ color: ACCENT }}>→</span>
                SEO Freiburg – Lokale Suchmaschinenoptimierung
              </Link>
              <Link href="/webdesign-furtwangen" className="group flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span className="group-hover:translate-x-1 transition-transform" style={{ color: ACCENT }}>→</span>
                Webdesign Furtwangen
              </Link>
              <Link href="/handwerker" className="group flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
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
              Ihr Unternehmen verdient eine Website, die wirkt.
            </h2>
            <p className="mb-10 mx-auto" style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(15px, 1.6vw, 18px)", maxWidth: "480px" }}>
              Kostenloses Erstgespräch — unverbindlich, ohne Verkaufsdruck. Wir schauen uns Ihre aktuelle Situation an und zeigen Ihnen ehrlich, was möglich ist.
            </p>
            <ArrowBtn href="#kontakt" variant="primary">Jetzt Gespräch vereinbaren</ArrowBtn>
          </Reveal>
        </div>
      </section>
    </>
  );
}
