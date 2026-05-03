"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const leistungen = [
  {
    title: "Individuelle Gestaltung",
    text: "Kein Template, kein Baukasten — jede Website wird von Grund auf für Ihr Unternehmen in Furtwangen entwickelt. Mit Ihren Farben, Ihrer Botschaft und Ihrer Zielgruppe im Mittelpunkt. Das Ergebnis ist eine digitale Visitenkarte, die sich von der Masse abhebt und Ihre Marke authentisch darstellt.",
  },
  {
    title: "Next.js & React",
    text: "Wir setzen auf Next.js mit React — die Technologie hinter Unternehmen wie Vercel und Notion. Das bedeutet blitzschnelle Ladezeiten unter einer Sekunde, statisches Rendering für maximale SEO-Performance und eine Architektur, die mit Ihrem Unternehmen mitwächst.",
  },
  {
    title: "Mobile First",
    text: "Über 70 % Ihrer Besucher kommen vom Smartphone — besonders im ländlichen Schwarzwald-Raum, wo Menschen unterwegs suchen. Wir gestalten zuerst für mobile Geräte und erweitern dann für Tablet und Desktop. Nahtloses Erlebnis auf jedem Bildschirm.",
  },
  {
    title: "SEO-Optimiert von Grund auf",
    text: "Technisch sauberer Code, strukturierte Daten (JSON-LD Schema), optimierte Ladezeiten und korrekte Heading-Hierarchien — damit Google Ihre Seite aus Furtwangen von Anfang an versteht und in den Suchergebnissen richtig platziert.",
  },
  {
    title: "Lighthouse 95+",
    text: "Googles Lighthouse-Tool bewertet Websites in Performance, Accessibility, Best Practices und SEO. Wir liefern in allen Kategorien 95 oder höher — messbar, transparent und nachweislich besser als Template-basierte Konkurrenten.",
  },
  {
    title: "Persönliche Betreuung",
    text: "Kein Ticketsystem, kein anonymer Account-Manager. Sie arbeiten direkt mit dem Entwickler zusammen — von der ersten Idee bis zum Launch und darüber hinaus. Schnelle Kommunikation und persönliche Verantwortung für Ihr Projekt.",
  },
];

const prozess = [
  {
    nr: "01",
    title: "Erstgespräch",
    text: "In einem kostenlosen, unverbindlichen Gespräch lernen wir Ihr Unternehmen kennen. Wir fragen nach Ihren Zielen, Ihrer Zielgruppe und Ihren Vorstellungen. Am Ende wissen wir, was Ihre Website leisten muss — und Sie wissen, was Sie von uns erwarten können.",
  },
  {
    nr: "02",
    title: "Konzept & Design",
    text: "Wir entwickeln ein Konzept mit Sitemap, Wireframes und Design-Richtung. Sie erhalten konkrete Entwürfe, keine leeren Versprechen. Erst wenn Sie mit der Richtung zufrieden sind, beginnen wir mit der Umsetzung. Revisionen sind einkalkuliert.",
  },
  {
    nr: "03",
    title: "Entwicklung",
    text: "Die technische Umsetzung erfolgt mit Next.js und modernen Web-Standards. Sie erhalten regelmäßige Updates und können den Fortschritt live verfolgen. Kein Projekt verschwindet wochenlang in einer Black Box — Transparenz ist Standard.",
  },
  {
    nr: "04",
    title: "Review & Optimierung",
    text: "Vor dem Launch testen wir Ihre Website auf allen Geräten und Browsern. Ladezeiten, SEO-Konfiguration, Lighthouse-Score und Barrierefreiheit — erst wenn alle Werte stimmen, gehen wir live.",
  },
  {
    nr: "05",
    title: "Launch & Support",
    text: "Deployment, Domain-Konfiguration, SSL-Zertifikat und Sitemap-Einreichung bei Google — alles aus einer Hand. Nach dem Launch stehen wir für Fragen und Anpassungen bereit.",
  },
];

const technologie = [
  {
    title: "Geschwindigkeit als Rankingfaktor",
    text: "Google bewertet die Ladegeschwindigkeit über die Core Web Vitals. WordPress-Websites mit Plugins erreichen oft 3–8 Sekunden Ladezeit. Unsere Next.js-Websites laden in unter einer Sekunde — ein direkter Vorteil für Ihr Ranking bei Google, auch in Furtwangen.",
  },
  {
    title: "Kein WordPress, kein Sicherheitsproblem",
    text: "WordPress ist das meistgehackte CMS der Welt. Ständige Plugin-Updates, Sicherheitslücken und Kompatibilitätsprobleme. Next.js-Websites haben keine Plugins, keine Datenbank-Angriffsfläche und werden als statische Dateien ausgeliefert — technisch nahezu unangreifbar.",
  },
  {
    title: "Vercel Hosting — weltweit schnell",
    text: "Wir hosten auf Vercel, dem globalen Edge-Network. Ihre Website wird vom nächstgelegenen Rechenzentrum ausgeliefert — egal ob Ihr Besucher in Furtwangen, Villingen oder weltweit ist. Minimale Latenz, maximale Geschwindigkeit.",
  },
];

const faqItems = [
  {
    q: "Was kostet eine professionelle Website in Furtwangen?",
    a: "Eine professionelle Website bei LB Digital beginnt bei 1.000 € für eine einfache Landingpage. Für eine vollständige Business-Website mit mehreren Unterseiten, Kontaktformular und SEO-Grundoptimierung liegt der Preis zwischen 3.000 und 6.000 €. Der genaue Preis hängt von Umfang, Funktionen und Designaufwand ab. Sie erhalten immer ein detailliertes Angebot vorab — keine versteckten Kosten, keine Überraschungen nach dem Launch.",
  },
  {
    q: "Wie lange dauert die Erstellung einer Website?",
    a: "Eine einfache Landingpage ist in 2–3 Wochen fertig. Eine vollständige Business-Website mit mehreren Unterseiten dauert in der Regel 4–8 Wochen. Der größte Zeitfaktor ist die Bereitstellung von Inhalten und Feedback durch den Kunden. Nach dem Erstgespräch erhalten Sie eine realistische Zeitplanung für Ihr Projekt.",
  },
  {
    q: "Kommen Sie für ein persönliches Gespräch nach Furtwangen?",
    a: "Unser Büro ist in Freiburg im Breisgau, rund 50 km von Furtwangen entfernt. Für Erstgespräche und Präsentationen nutzen wir Video-Calls — das spart beiden Seiten Zeit und ermöglicht trotzdem eine persönliche Zusammenarbeit. Bei Bedarf sind persönliche Treffen nach Absprache möglich.",
  },
  {
    q: "Warum braucht mein Unternehmen in Furtwangen eine professionelle Website?",
    a: "Furtwangen ist ein starker Wirtschaftsstandort — mit der Hochschule Furtwangen University, etablierten Mittelstandsbetrieben und einem wachsenden Tourismussektor. Kunden suchen Dienstleister und Produkte zuerst online. Wer bei Google nicht gefunden wird, verliert Anfragen an Konkurrenten in der Region. Eine professionelle, schnelle Website ist heute der Grundstein jeder erfolgreichen lokalen Geschäftspräsenz.",
  },
  {
    q: "Was ist der Unterschied zwischen einem Baukasten und einer individuellen Website?",
    a: "Baukästen wie Wix, Jimdo oder Squarespace bieten vorgefertigte Templates. Das ist günstig und schnell — aber erkauft durch Kompromisse: langsamere Ladezeiten, eingeschränkte Gestaltungsmöglichkeiten, monatliche Abokosten und schlechtere SEO-Performance. Eine individuelle Website mit Next.js ist schneller, besser auf Google optimiert und zu 100 % auf Ihre Marke zugeschnitten — ohne monatliche Lizenzgebühren.",
  },
  {
    q: "Warum Next.js statt WordPress?",
    a: "WordPress ist das meistgenutzte CMS der Welt — und gleichzeitig das meistgehackte. Ständige Plugin-Updates, Sicherheitslücken und Kompatibilitätsprobleme sind alltäglich. Next.js generiert statische HTML-Dateien, die blitzschnell ausgeliefert werden und keine angreifbare Datenbankstruktur haben. Das Ergebnis: bessere Ladezeiten, höhere Sicherheit und von Beginn an bessere Rankingchancen bei Google.",
  },
  {
    q: "Ist meine Website auch auf dem Smartphone optimiert?",
    a: "Ja — wir arbeiten nach dem Mobile First-Prinzip. Die mobile Version wird zuerst gestaltet, dann für Tablet und Desktop erweitert. Über 70 % aller Website-Besucher kommen heute vom Smartphone. Google bewertet Websites primär nach ihrer mobilen Version (Mobile First Indexing). Eine nicht-mobile-optimierte Website verliert messbar Ranking-Punkte.",
  },
  {
    q: "Kümmern Sie sich auch um Hosting und Domain?",
    a: "Ja. Wir übernehmen das Deployment auf Vercel — einem der schnellsten globalen Edge-Networks. Die Domain können Sie selbst registrieren oder wir erledigen das für Sie. Wir richten SSL-Zertifikat, DNS-Konfiguration und alle technischen Details ein, sodass Ihre Website vom ersten Tag an sicher und erreichbar ist.",
  },
  {
    q: "Kann ich die Website später selbst bearbeiten?",
    a: "Das kommt auf Ihre Anforderungen an. Wenn Sie Texte und Bilder selbst pflegen möchten, integrieren wir ein Headless CMS wie Sanity oder Contentful. Damit können Sie Inhalte über eine benutzerfreundliche Oberfläche bearbeiten, ohne Code anfassen zu müssen. Wenn Sie Änderungen lieber uns überlassen möchten, bieten wir Support-Pakete an.",
  },
  {
    q: "Was ist SEO und ist es bei der Website inklusive?",
    a: "SEO (Suchmaschinenoptimierung) umfasst alle Maßnahmen, damit Ihre Website bei Google möglichst weit oben erscheint. Bei jeder Website von LB Digital ist technisches SEO inklusive: saubere URL-Struktur, optimierte Meta-Tags, strukturierte Daten (JSON-LD Schema), Lighthouse-optimierte Ladezeiten und korrekte Heading-Hierarchien. Kontinuierliche SEO-Betreuung mit Keyword-Strategie und Content ist ein separates Leistungspaket.",
  },
  {
    q: "Wie unterscheidet sich LB Digital von anderen Webdesign-Agenturen?",
    a: "Die meisten Agenturen arbeiten mit WordPress-Templates oder veralteten Technologien. LB Digital entwickelt ausschließlich mit Next.js und React. Sie arbeiten direkt mit dem Entwickler zusammen — kein Mittelsmann, kein Projektmanager-Filter. Schnellere Kommunikation, weniger Missverständnisse und ein Endprodukt, das wirklich Ihren Anforderungen entspricht.",
  },
  {
    q: "Was brauche ich um zu starten?",
    a: "Für den Start benötigen wir: eine grobe Vorstellung, was die Website leisten soll (Ziele, Zielgruppe), vorhandene Markenmaterialien wie Logo, Farben oder Fonts (falls vorhanden), und Stichpunkte zu Ihren Leistungen. Haben Sie noch kein Logo oder kein klares Branding? Kein Problem — wir können auch dabei helfen.",
  },
  {
    q: "Bieten Sie Wartung und Support nach dem Launch an?",
    a: "Ja. Nach dem Launch stehen wir für technischen Support, Inhaltsaktualisierungen und Anpassungen bereit. Wir bieten flexible Support-Pakete an — von der reinen Bereitschaft für Notfälle bis hin zu regelmäßiger Betreuung mit monatlichen Updates und Performance-Monitoring.",
  },
  {
    q: "Was ist ein Lighthouse Score und warum ist er wichtig?",
    a: "Google Lighthouse bewertet Websites in vier Kategorien: Performance (Ladegeschwindigkeit), Accessibility (Barrierefreiheit), Best Practices (Sicherheit und Code-Qualität) und SEO. Scores gehen von 0 bis 100. Websites mit niedrigen Performance-Scores werden von Google schlechter eingestuft, da Nutzererfahrung ein direkter Rankingfaktor ist. Unsere Websites erreichen 95+ in allen Kategorien.",
  },
  {
    q: "Was ist der Unterschied zwischen einer Landingpage und einer Business-Website?",
    a: "Eine Landingpage ist eine einzelne, fokussierte Seite mit einem klaren Ziel — z.B. Kontaktanfragen. Sie eignet sich als erste Online-Präsenz oder für Kampagnen. Eine Business-Website umfasst mehrere Unterseiten (Startseite, Leistungen, Über uns, Kontakt) und bietet Besuchern ein vollständiges Bild Ihres Unternehmens. Für die meisten Unternehmen in Furtwangen ist eine Business-Website die richtige Wahl.",
  },
  {
    q: "Wie wirkt sich die Website-Geschwindigkeit auf mein Google-Ranking aus?",
    a: "Seit 2021 sind die Core Web Vitals offizieller Rankingfaktor bei Google. Websites, die diese Werte nicht erfüllen, werden systematisch schlechter eingestuft. Eine Website mit 3 Sekunden Ladezeit hat gegenüber einer Website mit unter 1 Sekunde einen messbaren Ranking-Nachteil — unabhängig vom Inhalt. Schnelle Websites gewinnen in der organischen Suche.",
  },
  {
    q: "Brauche ich eine neue Website oder reicht eine Überarbeitung?",
    a: "Das hängt vom Zustand Ihrer aktuellen Website ab. Wenn die technische Basis veraltet ist, die Ladezeiten schlecht sind oder das Design grundlegend nicht mehr zur Marke passt, ist ein Neubau oft sinnvoller als eine Überarbeitung. Wir schauen uns Ihre aktuelle Seite kostenlos an und geben eine ehrliche Einschätzung — ohne Verkaufsdruck.",
  },
  {
    q: "Was passiert, wenn ich mit meiner Website nicht zufrieden bin?",
    a: "Wir arbeiten iterativ und mit regelmäßigem Feedback. Revisionen sind in jedem Projekt einkalkuliert. Bevor wir live gehen, haben Sie ausreichend Gelegenheit, Änderungen einzubringen. Grundlegende Anpassungen nach dem Launch werden fair abgerechnet — ohne versteckte Gebühren. Unser Ziel ist Ihre Zufriedenheit.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Webdesign Furtwangen",
  description: "Individuelle Next.js-Websites für Unternehmen in Furtwangen im Schwarzwald. Mobile-first, Lighthouse 95+, kein Template.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://www.lb-digital.agency/#business",
    name: "LB Digital",
    url: "https://www.lb-digital.agency",
  },
  areaServed: { "@type": "City", name: "Furtwangen im Schwarzwald" },
  serviceType: "Webdesign & Webentwicklung",
  url: "https://www.lb-digital.agency/webdesign-furtwangen",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    priceSpecification: { "@type": "PriceSpecification", minPrice: "1000", priceCurrency: "EUR" },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
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
    { "@type": "ListItem", position: 2, name: "Webdesign Furtwangen", item: "https://www.lb-digital.agency/webdesign-furtwangen" },
  ],
};

export default function WebdesignFurtwangenContent() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section style={{ background: "#fff", paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-5" style={{ color: "#4F46E5" }}>Webdesign Furtwangen</p>
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(36px, 5.5vw, 72px)", color: "#0D0D0D", maxWidth: "820px" }}
            >
              Webdesign{" "}
              <span style={{ color: "#4F46E5" }}>Furtwangen</span>{" "}
              — individuell, schnell, wirkungsvoll.
            </h1>
            <p className="mb-4 leading-relaxed" style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "#6B7280", maxWidth: "640px" }}>
              LB Digital entwickelt individuelle Websites für Unternehmen in Furtwangen im Schwarzwald.
              Modern, blitzschnell und auf Ihre Zielgruppe ausgerichtet — kein Baukasten, kein Template.
            </p>
            <p className="mb-10 leading-relaxed" style={{ fontSize: "clamp(15px, 1.3vw, 18px)", color: "#6B7280", maxWidth: "600px" }}>
              Von der Hochschule Furtwangen bis zum regionalen Mittelstand — wir bauen Websites, die in
              der Google-Suche gefunden werden und Besucher in Kunden verwandeln.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#kontakt"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white transition-all duration-200"
                style={{ background: "#4F46E5", fontSize: "15px" }}
              >
                Kostenloses Erstgespräch
              </Link>
              <Link
                href="/#projekte"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-all duration-200"
                style={{ background: "#F3F4F6", color: "#0D0D0D", fontSize: "15px" }}
              >
                Projekte ansehen
              </Link>
            </div>
          </Section>
        </div>
      </section>

      {/* Stats-Banner */}
      <section style={{ background: "#4F46E5", paddingTop: "clamp(50px, 6vw, 80px)", paddingBottom: "clamp(50px, 6vw, 80px)" }}>
        <div className="container-xl">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "95+", label: "Lighthouse Score", sub: "in allen Kategorien messbar" },
              { value: "< 1s", label: "Ladezeit", sub: "auf Desktop und Mobile" },
              { value: "100%", label: "Individuell", sub: "kein Template, kein Baukasten" },
            ].map((m, i) => (
              <div key={i}>
                <p className="font-display font-bold mb-2" style={{ fontSize: "clamp(36px, 4vw, 52px)", color: "#fff" }}>{m.value}</p>
                <p className="font-semibold mb-1" style={{ fontSize: "16px", color: "#C7D2FE" }}>{m.label}</p>
                <p style={{ fontSize: "13px", color: "#A5B4FC" }}>{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section style={{ background: "#F9FAFB", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Leistungen</p>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D" }}>
              Was Sie von uns bekommen
            </h2>
            <p className="mb-12" style={{ fontSize: "16px", color: "#6B7280", maxWidth: "560px" }}>
              Kein Standardpaket. Jede Leistung ist auf Ihr Projekt in Furtwangen zugeschnitten — mit dem
              Ziel, Ihre Website zum besten Online-Auftritt in Ihrer Branche zu machen.
            </p>
          </Section>
          <StaggerSection className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leistungen.map((l, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl p-7" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <h3 className="font-display font-semibold mb-3" style={{ fontSize: "17px", color: "#0D0D0D" }}>{l.title}</h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.75" }}>{l.text}</p>
              </motion.div>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* Warum Furtwangen */}
      <section style={{ background: "#fff", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Lokales Know-how</p>
            <h2 className="font-display font-bold mb-8" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D", maxWidth: "700px" }}>
              Webdesign in Furtwangen im Schwarzwald — was das bedeutet
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="flex flex-col gap-6">
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Furtwangen im Schwarzwald ist mehr als eine Kleinstadt im Hochschwarzwald. Mit der Hochschule
                  Furtwangen University (HFU) — einer der renommiertesten Hochschulen für angewandte Wissenschaften
                  in Deutschland — ist Furtwangen ein echter Technologiestandort. Rund 5.000 Studierende in
                  Informatik, Wirtschaftsinformatik, Medizintechnik und Maschinenbau sorgen für ein digital-affines
                  Umfeld, das moderne Unternehmensauftritte erwartet.
                </p>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Die Region ist geprägt von einer starken industriellen Tradition: Furtwangen war einst das
                  Zentrum der deutschen Uhrenindustrie — heute zeugt das Deutsche Uhrenmuseum davon. Dieser
                  Geist der Präzision und Qualität spiegelt sich im regionalen Mittelstand wider: Präzisionsfertigung,
                  Medizintechnik und Technologieunternehmen sind hier zuhause. Diese Betriebe brauchen digitale
                  Präsenzen, die dem eigenen Qualitätsanspruch gerecht werden.
                </p>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Hinzu kommt der Tourismus: Furtwangen liegt mitten im Hochschwarzwald und ist Ausgangspunkt
                  für Wanderungen, Skigebiete und Naturerlebnisse. Hotels, Ferienwohnungen, Restaurants und
                  Freizeitbetriebe konkurrieren täglich um Buchungen — und werden über Google gefunden oder eben
                  nicht. Eine professionelle, schnelle Website ist für diese Betriebe kein Nice-to-have, sondern
                  direkter Umsatzhebel.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Für Unternehmen in Furtwangen gilt: Der lokale Wettbewerb ist real, aber überschaubar. Während
                  in Freiburg Dutzende Agenturen und Betriebe um jeden Google-Platz kämpfen, gibt es in Furtwangen
                  noch echte Chancen für Unternehmen, die online professionell aufgestellt sind. Wer jetzt
                  investiert, sichert sich Sichtbarkeit, bevor die Konkurrenz nachzieht.
                </p>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Als Agentur aus Freiburg — nur 50 km entfernt — kennen wir die Region. Wir entwickeln keine
                  generischen Websites für irgendeinen Markt, sondern maßgeschneiderte Lösungen für Unternehmen
                  im Schwarzwald und Breisgau-Hochschwarzwald.
                </p>
                <div className="rounded-2xl p-6 grid grid-cols-2 gap-4" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                  {[
                    { label: "HFU-Standort", value: "Technologie & Innovation" },
                    { label: "Mittelstand", value: "Präzision & Qualität" },
                    { label: "Tourismus", value: "Hochschwarzwald" },
                    { label: "Aus Freiburg", value: "50 km Entfernung" },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="font-semibold mb-1" style={{ fontSize: "14px", color: "#0D0D0D" }}>{item.label}</p>
                      <p style={{ fontSize: "13px", color: "#6B7280" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Prozess */}
      <section style={{ background: "#F9FAFB", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Ablauf</p>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D" }}>
              So entsteht Ihre Website
            </h2>
            <p className="mb-12" style={{ fontSize: "16px", color: "#6B7280", maxWidth: "560px" }}>
              Kein Blackbox-Prozess. Jeder Schritt ist transparent, jede Entscheidung wird gemeinsam getroffen.
            </p>
          </Section>
          <StaggerSection className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {prozess.map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col gap-3">
                <span className="font-display font-bold" style={{ fontSize: "40px", color: "#E5E7EB" }}>{p.nr}</span>
                <h3 className="font-display font-semibold" style={{ fontSize: "17px", color: "#0D0D0D" }}>{p.title}</h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.75" }}>{p.text}</p>
              </motion.div>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* Technologie */}
      <section style={{ background: "#fff", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Technologie</p>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D", maxWidth: "680px" }}>
              Warum Next.js — und nicht WordPress
            </h2>
            <p className="mb-12" style={{ fontSize: "16px", color: "#6B7280", maxWidth: "580px" }}>
              Die Wahl der Technologie entscheidet über Ladezeiten, Sicherheit und Ranking — konkret und messbar.
            </p>
          </Section>
          <StaggerSection className="grid lg:grid-cols-3 gap-6">
            {technologie.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl p-7" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                <h3 className="font-display font-semibold mb-3" style={{ fontSize: "17px", color: "#0D0D0D" }}>{t.title}</h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.75" }}>{t.text}</p>
              </motion.div>
            ))}
          </StaggerSection>
          <Section>
            <div className="mt-8 rounded-2xl p-8 grid sm:grid-cols-3 gap-8 text-center" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
              {[
                { label: "WordPress (Ø)", value: "3–8s", sub: "Ladezeit mit Plugins" },
                { label: "Wix / Jimdo", value: "2–5s", sub: "Ladezeit Baukasten" },
                { label: "LB Digital (Next.js)", value: "< 1s", sub: "Ladezeit unserer Websites" },
              ].map((row, i) => (
                <div key={i}>
                  <p className="font-display font-bold mb-1" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: i === 2 ? "#4F46E5" : "#9CA3AF" }}>
                    {row.value}
                  </p>
                  <p className="font-semibold" style={{ fontSize: "14px", color: "#0D0D0D" }}>{row.label}</p>
                  <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{row.sub}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Ergebnisse */}
      <section style={{ background: "#F9FAFB", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Qualität</p>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D" }}>
              Was messbare Qualität bedeutet
            </h2>
            <p className="mb-12" style={{ fontSize: "16px", color: "#6B7280", maxWidth: "580px" }}>
              Diese drei Werte bestimmen, wie Google Ihre Website einordnet und wie Besucher sie wahrnehmen.
            </p>
          </Section>
          <StaggerSection className="grid sm:grid-cols-3 gap-6">
            {[
              { value: "95+", label: "Lighthouse Score", text: "Googles offizielle Qualitätsbewertung für Performance, Accessibility, Best Practices und SEO. Unsere Websites erreichen 95 oder höher in allen Kategorien." },
              { value: "< 1s", label: "Ladezeit", text: "53 % der mobilen Nutzer verlassen eine Seite, wenn sie länger als 3 Sekunden lädt. Unsere Websites laden deutlich unter einer Sekunde." },
              { value: "100%", label: "Individuell", text: "Kein vorgefertigtes Template. Jede Website wird von Grund auf für Ihr Unternehmen entwickelt — einzigartig und auf Ihre Zielgruppe ausgerichtet." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl p-7" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <p className="font-display font-bold mb-2" style={{ fontSize: "clamp(36px, 4vw, 48px)", color: "#4F46E5" }}>{item.value}</p>
                <h3 className="font-display font-semibold mb-3" style={{ fontSize: "17px", color: "#0D0D0D" }}>{item.label}</h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.75" }}>{item.text}</p>
              </motion.div>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* Preise */}
      <section style={{ background: "#fff", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Preise</p>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D" }}>
              Was kostet eine Website in Furtwangen?
            </h2>
            <p className="mb-10" style={{ fontSize: "16px", color: "#6B7280", maxWidth: "580px", lineHeight: "1.8" }}>
              Transparenz ist für uns selbstverständlich. Keine versteckten Kosten, keine monatlichen
              Lizenzgebühren. Hier ist, was Sie erwarten können:
            </p>
          </Section>
          <StaggerSection className="grid sm:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: "Landingpage",
                price: "ab 1.000 €",
                text: "Eine fokussierte, einzelne Seite mit klarem Ziel. Ideal als erste Online-Präsenz oder für Kampagnen. Inklusive Kontaktformular, Mobile Optimierung und Basis-SEO.",
              },
              {
                title: "Business-Website",
                price: "3.000 – 6.000 €",
                text: "Vollständige Website mit Startseite, Leistungsseiten, Über uns und Kontakt. Inklusive Lighthouse-Optimierung, vollständiges SEO-Setup mit strukturierten Daten, individuellem Design und Deployment.",
              },
            ].map((pkg, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl p-8" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                <h3 className="font-display font-semibold mb-2" style={{ fontSize: "20px", color: "#0D0D0D" }}>{pkg.title}</h3>
                <p className="font-display font-bold mb-4" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#4F46E5" }}>{pkg.price}</p>
                <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: "1.75" }}>{pkg.text}</p>
              </motion.div>
            ))}
          </StaggerSection>
          <Link href="/#kontakt" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white" style={{ background: "#4F46E5", fontSize: "15px" }}>
            Angebot anfragen
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#F9FAFB", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>FAQ</p>
            <h2 className="font-display font-bold mb-12" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D", maxWidth: "700px" }}>
              Häufig gestellte Fragen zum Webdesign in Furtwangen
            </h2>
          </Section>
          <StaggerSection className="flex flex-col gap-0">
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="py-7" style={{ borderBottom: "1px solid #E5E7EB" }}>
                <h3 className="font-display font-semibold mb-3" style={{ fontSize: "clamp(16px, 1.3vw, 18px)", color: "#0D0D0D" }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: "1.8", maxWidth: "780px" }}>{item.a}</p>
              </motion.div>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* Interne Verlinkung */}
      <section style={{ background: "#fff", paddingTop: "clamp(40px, 5vw, 60px)", paddingBottom: "clamp(40px, 5vw, 60px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Weitere Leistungen</p>
            <h2 className="font-display font-bold mb-8" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#0D0D0D" }}>
              Mehr als nur Webdesign
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/webdesign-freiburg" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200" style={{ background: "#F9FAFB", color: "#0D0D0D", border: "1px solid #E5E7EB", fontSize: "14px" }}>
                Webdesign Freiburg
              </Link>
              <Link href="/seo-freiburg" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200" style={{ background: "#F9FAFB", color: "#0D0D0D", border: "1px solid #E5E7EB", fontSize: "14px" }}>
                SEO Freiburg
              </Link>
            </div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0D0D0D", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl text-center">
          <Section>
            <h2 className="font-display font-bold mb-5" style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "#fff" }}>
              Bereit für Ihre neue Website in Furtwangen?
            </h2>
            <p className="mb-8" style={{ fontSize: "17px", color: "#9CA3AF", maxWidth: "520px", margin: "0 auto 2rem" }}>
              Kostenloses Erstgespräch — kein Verkaufsdruck, keine Verpflichtung. Wir schauen uns Ihre
              Situation an und sagen Ihnen ehrlich, was sinnvoll ist.
            </p>
            <Link href="/#kontakt" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white" style={{ background: "#4F46E5", fontSize: "16px" }}>
              Jetzt Gespräch vereinbaren
            </Link>
          </Section>
        </div>
      </section>
    </>
  );
}
