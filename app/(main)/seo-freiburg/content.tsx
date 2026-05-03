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
    title: "Lokales SEO",
    text: "Wir optimieren Ihre Website gezielt für Suchanfragen aus Freiburg und der Region — damit Kunden Sie finden, bevor sie zur Konkurrenz gehen. Lokales SEO umfasst Google My Business, lokale Keywords, NAP-Konsistenz und regionale Backlinks. Für Unternehmen, deren Kunden in der Nähe sind, ist lokales SEO der wichtigste Hebel.",
  },
  {
    title: "Google My Business",
    text: "Ihr Google Business Profile ist für lokale Suchen oft wichtiger als Ihre eigene Website. Wir optimieren Ihr Profil vollständig: Kategorien, Beschreibung, Öffnungszeiten, Fotos, Bewertungsmanagement und Posts. Ein vollständig gepflegtes GBP kann Ihre lokale Sichtbarkeit innerhalb weniger Wochen deutlich verbessern.",
  },
  {
    title: "Technisches SEO",
    text: "Ladezeiten, Core Web Vitals, strukturierte Daten (JSON-LD Schema), XML-Sitemap, robots.txt, kanonische URLs und interne Verlinkung — die technische Basis, ohne die kein Ranking möglich ist. Viele Websites scheitern nicht an schlechten Inhalten, sondern an technischen Fehlern, die Google das Crawlen erschweren.",
  },
  {
    title: "On-Page Optimierung",
    text: "Title Tags, Meta Descriptions, Heading-Hierarchien (H1–H3), Keyword-Dichte, Bild-Alt-Texte und interne Verlinkung — jede Seite wird für ihren Ziel-Suchbegriff optimiert. On-Page SEO ist der Bereich, bei dem kleine Änderungen große Wirkung haben können.",
  },
  {
    title: "Content-Strategie",
    text: "Wir analysieren, welche Keywords Ihre Zielkunden in Freiburg verwenden, welche Inhalte auf Ihrer Website fehlen und welche Themen Ranking-Potenzial haben. Das Ergebnis ist ein konkreter Content-Plan — keine abstrakte Strategie, sondern umsetzbare Maßnahmen mit messbarem Effekt.",
  },
  {
    title: "Transparentes Reporting",
    text: "Monatliche Reports mit Rankings, organischem Traffic und Conversion-Daten. Sie sehen genau, welche Keywords gewonnen wurden, wie sich der Traffic entwickelt und was Ihr SEO-Budget konkret bringt. Keine Black Box, keine Agentur-Floskeln — nur messbare Ergebnisse.",
  },
];

const prozess = [
  {
    nr: "01",
    title: "SEO-Analyse",
    text: "Wir analysieren Ihre aktuelle Website kostenlos: technische Fehler, fehlende Inhalte, verpasste Keywords und Wettbewerber-Gaps. Am Ende wissen wir, wo Sie stehen und was konkret getan werden muss. Kein pauschales Paket, sondern individuelle Diagnose.",
  },
  {
    nr: "02",
    title: "Technischer Fix",
    text: "Alle technischen Fehler werden zuerst behoben: Ladezeiten, fehlendes Schema, kaputte Links, fehlende Meta-Tags, falsche Canonical-URLs. Ohne saubere technische Basis bringen inhaltliche Maßnahmen nur begrenzte Wirkung.",
  },
  {
    nr: "03",
    title: "On-Page Optimierung",
    text: "Jede wichtige Seite wird für ihr Primär-Keyword optimiert: Title Tag, Meta Description, H1, strukturierte Daten, interne Verlinkung. Gleichzeitig bauen wir fehlende Inhaltsseiten auf — FAQ-Seiten, Service-Seiten, Stadtseiten.",
  },
  {
    nr: "04",
    title: "Lokale Sichtbarkeit",
    text: "Google Business Profile optimieren, Citations aufbauen (gelbeseiten.de, Das Örtliche, Yelp), NAP-Konsistenz sicherstellen und aktiv Bewertungen einholen. Lokales SEO ist oft der schnellste Weg zu messbaren Ergebnissen.",
  },
  {
    nr: "05",
    title: "Monitoring & Reporting",
    text: "Wir verfolgen Rankings, Traffic und Conversions mit Google Search Console und Analytics. Monatliche Reports zeigen, was gewonnen wurde und was als nächstes kommt. SEO ist ein Prozess — kein einmaliger Eingriff.",
  },
];

const faqItems = [
  {
    q: "Was kostet SEO-Optimierung in Freiburg?",
    a: "SEO-Betreuung bei LB Digital beginnt bei 300 € pro Monat für lokale SEO-Grundbetreuung (technisches SEO, GMB-Pflege, monatliches Reporting). Umfangreichere Pakete mit Content-Erstellung, Linkaufbau und Keyword-Strategie liegen zwischen 500 und 1.500 € monatlich. Für ein einmaliges SEO-Audit und technischen Fix ohne laufende Betreuung bieten wir Projektpreise ab 800 €. In einem kostenlosen Erstgespräch analysieren wir Ihre aktuelle Situation und erstellen ein passendes Angebot.",
  },
  {
    q: "Wie lange dauert es bis ich bei Google oben stehe?",
    a: "SEO ist kein Sprint, sondern ein Marathon. Erste sichtbare Verbesserungen bei Long-Tail-Keywords (weniger umkämpfte Suchbegriffe) sind oft nach 4–8 Wochen erkennbar. Für kompetitive Keywords in Freiburg wie 'Zahnarzt Freiburg' oder 'Steuerberater Freiburg' sollten Sie mit 3–6 Monaten rechnen, bis deutliche Ranking-Verbesserungen eintreten. Lokales SEO über Google My Business kann deutlich schneller Wirkung zeigen — innerhalb weniger Wochen.",
  },
  {
    q: "Was ist lokales SEO und warum brauche ich es?",
    a: "Lokales SEO umfasst alle Maßnahmen, die dazu beitragen, dass Ihr Unternehmen bei geografisch relevanten Suchanfragen gefunden wird — also wenn jemand 'Friseur Freiburg' oder 'Elektriker in der Nähe' sucht. Für Unternehmen mit lokalem Kundenstamm ist lokales SEO oft wichtiger als klassisches SEO. Es umfasst Google Business Profile, NAP-Konsistenz, lokale Keywords auf der Website, Citations und Bewertungsmanagement.",
  },
  {
    q: "Was ist der Unterschied zwischen SEO und Google Ads?",
    a: "Google Ads (bezahlte Anzeigen) bringen sofortige Sichtbarkeit — aber nur solange Sie zahlen. Hören Sie auf, zahlen Sie Anzeigen, verschwindet auch die Sichtbarkeit. SEO (organische Optimierung) braucht länger, aber die Ergebnisse sind nachhaltig. Eine gut optimierte Seite rankt weiterhin, auch wenn Sie die aktive SEO-Arbeit reduzieren. Langfristig ist SEO kostengünstiger pro gewonnenem Kunden — der Cost-per-Click bei Google Ads für lokale Dienstleistungen in Freiburg liegt oft bei 2–8 € pro Klick.",
  },
  {
    q: "Was ist Google My Business und warum ist es so wichtig?",
    a: "Google My Business (heute: Google Business Profile) ist das kostenlose Unternehmensprofil, das in der lokalen Google-Suche und auf Google Maps erscheint. Für lokale Suchanfragen ist es oft wichtiger als die eigene Website. Wenn jemand 'Bäckerei Freiburg' sucht, erscheint zuerst das Local Pack mit drei Google Business Einträgen — wer hier nicht auftaucht, wird in vielen Fällen gar nicht wahrgenommen. Ein vollständig optimiertes Profil mit Fotos, Bewertungen und regelmäßigen Posts ist der schnellste Hebel für lokale Sichtbarkeit.",
  },
  {
    q: "Wie wichtig sind Google-Bewertungen für mein Ranking?",
    a: "Sehr wichtig — besonders für lokales SEO. Google verwendet die Anzahl, Aktualität und durchschnittliche Bewertung als Rankingfaktor im Local Pack (die drei Unternehmen, die in der lokalen Suche erscheinen). Unternehmen mit 50+ Bewertungen und 4,5 Sternen ranken systematisch besser als solche mit 5 Bewertungen und 4,0 Sternen. Wir entwickeln für unsere Kunden Strategien, um aktiv mehr Bewertungen zu generieren — ohne gegen Googles Richtlinien zu verstoßen.",
  },
  {
    q: "Was sind Core Web Vitals und warum zählen sie für Google?",
    a: "Core Web Vitals sind drei Messgrößen, die Google seit 2021 als offiziellen Rankingfaktor verwendet: LCP (Largest Contentful Paint) misst die Ladezeit des größten sichtbaren Elements, INP (Interaction to Next Paint) misst die Reaktionsgeschwindigkeit auf Nutzeraktionen, und CLS (Cumulative Layout Shift) misst visuelle Stabilität. Websites, die diese Werte nicht erfüllen (LCP unter 2,5s, INP unter 200ms, CLS unter 0,1), werden von Google systematisch schlechter eingestuft.",
  },
  {
    q: "Was ist der Unterschied zwischen lokaler SEO und überregionaler SEO?",
    a: "Lokales SEO zielt auf geografisch begrenzte Suchanfragen ab — 'Steuerberater Freiburg', 'Klempner in der Nähe'. Überregionale SEO zielt auf Begriffe ohne Ortsangabe — 'Steuerberater für Freelancer', 'günstige Buchhaltungssoftware'. Für die meisten lokalen Unternehmen in Freiburg ist lokales SEO das wichtigere und oft auch günstigere Ziel, weil der Wettbewerb regional begrenzt ist.",
  },
  {
    q: "Wie messen Sie den Erfolg von SEO?",
    a: "Wir messen SEO-Erfolg anhand von drei Kernmetriken: Keyword-Rankings (welche Position nehmen Sie für welche Suchbegriffe ein?), organischer Traffic (wie viele Besucher kommen über Google?), und Conversions (wie viele dieser Besucher werden zu Anfragen oder Kunden?). Alle Daten werden mit Google Search Console und Google Analytics 4 erfasst und monatlich reportiert. Wir definieren zu Beginn gemeinsam, welche Ziele für Ihr Unternehmen realistisch sind.",
  },
  {
    q: "Was ist SEO-Duplicate Content und wie vermeiden wir ihn?",
    a: "Duplicate Content bedeutet, dass identischer oder sehr ähnlicher Text auf mehreren URLs Ihrer Website existiert. Google weiß nicht, welche Seite indexiert werden soll, und stuft beide ab. Typische Ursachen: www vs. non-www Varianten, URL-Parameter, ähnliche Service-Seiten mit nahezu gleichem Text. Wir beheben das durch korrekte Canonical-Tags, 301-Weiterleitungen und inhaltliche Differenzierung der Seiten.",
  },
  {
    q: "Was ist ein Google Knowledge Panel?",
    a: "Ein Knowledge Panel ist das Info-Feld rechts in den Google-Suchergebnissen, das Informationen über ein Unternehmen oder eine Person zeigt. Für Unternehmen in Freiburg entsteht es in der Regel automatisch, wenn Sie ein vollständiges Google Business Profile haben und gut strukturierte Daten (Schema.org Organization-Markup) auf Ihrer Website implementiert sind. Es signalisiert Google, dass Ihr Unternehmen real und vertrauenswürdig ist.",
  },
  {
    q: "Kann ich SEO selbst machen oder brauche ich eine Agentur?",
    a: "Grundlegendes SEO können Sie selbst lernen und umsetzen — Google Search Console einrichten, Meta-Tags optimieren, regelmäßig Inhalte publizieren. Für technisches SEO (Schema-Markup, Core Web Vitals, Crawl-Budget-Optimierung) und Linkaufbau ist Fachkenntnis sinnvoll. Eine Agentur macht Sinn, wenn Sie schnell voranschreiten wollen, keine Zeit für SEO haben oder sich in einem kompetitiven Markt befinden. Wir bieten auch Workshops an, in denen wir Ihnen die Basics beibringen.",
  },
  {
    q: "Was passiert wenn ich SEO aufhöre zu betreiben?",
    a: "Gut aufgebaute Seiten verlieren ihre Rankings nicht sofort — organisches SEO hat eine gewisse Trägheit. Aber: Konkurrenten, die aktiv weiter optimieren, holen auf. Neue Inhalte Ihrer Wettbewerber können Ihre Positionen verdrängen. Technische Probleme, die unbehandelt bleiben, können Rankings langsam erodieren. Grundsätzlich gilt: SEO ist ein kontinuierlicher Prozess. Wer aufhört, verliert seinen Vorsprung — langsam, aber sicher.",
  },
  {
    q: "Was ist der Unterschied zwischen On-Page und Off-Page SEO?",
    a: "On-Page SEO umfasst alles, was auf Ihrer Website selbst optimiert werden kann: Title Tags, Meta Descriptions, Inhalte, technische Struktur, interne Verlinkung, Ladezeiten. Off-Page SEO umfasst Signale von außen: Backlinks (andere Websites, die auf Sie verlinken), Mentions in Online-Medien, Google Business Profile, Citations in Verzeichnissen und Social Signals. Beide Bereiche sind wichtig — aber für lokale Unternehmen in Freiburg hat On-Page SEO und lokales Off-Page SEO (Citations, GMB) Vorrang.",
  },
  {
    q: "Wie wichtig ist Content für SEO?",
    a: "Content ist der Kern von SEO. Google kann nur ranken, was es verstehen kann. Seiten mit dünnem Inhalt (unter 500 Wörter) ranken für kompetitive Keywords selten. Unsere Service-Seiten für Kunden haben 3.500–4.500 Wörter, detaillierte FAQ-Sektionen und vollständige Schema-Daten — das ist deutlich mehr als die meisten lokalen Konkurrenten bieten. Mehr relevanter Content bedeutet mehr Keywords, für die Google Sie zeigt.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO Freiburg",
  description: "Lokale Suchmaschinenoptimierung für Unternehmen in Freiburg im Breisgau. Mehr Google-Sichtbarkeit, mehr Anfragen aus der Region.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://www.lb-digital.agency/#business",
    name: "LB Digital",
    url: "https://www.lb-digital.agency",
  },
  areaServed: { "@type": "City", name: "Freiburg im Breisgau" },
  serviceType: "Suchmaschinenoptimierung (SEO)",
  url: "https://www.lb-digital.agency/seo-freiburg",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    priceSpecification: { "@type": "PriceSpecification", minPrice: "300", priceCurrency: "EUR" },
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
    { "@type": "ListItem", position: 2, name: "SEO Freiburg", item: "https://www.lb-digital.agency/seo-freiburg" },
  ],
};

export default function SEOFreiburgContent() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section style={{ background: "#fff", paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-5" style={{ color: "#4F46E5" }}>SEO Freiburg</p>
            <h1 className="font-display font-bold leading-tight mb-6" style={{ fontSize: "clamp(36px, 5.5vw, 72px)", color: "#0D0D0D", maxWidth: "820px" }}>
              Mehr Kunden aus{" "}
              <span style={{ color: "#4F46E5" }}>Freiburg</span>{" "}
              durch bessere Google-Rankings.
            </h1>
            <p className="mb-4 leading-relaxed" style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "#6B7280", maxWidth: "640px" }}>
              LB Digital optimiert Ihre Website für Google — technisch sauber, inhaltlich stark,
              lokal ausgerichtet. Damit Sie gefunden werden, wenn potenzielle Kunden in Freiburg suchen.
            </p>
            <p className="mb-10 leading-relaxed" style={{ fontSize: "clamp(15px, 1.3vw, 18px)", color: "#6B7280", maxWidth: "600px" }}>
              Kein pauschales SEO-Paket. Wir analysieren Ihre Situation, identifizieren echte Chancen
              und setzen Maßnahmen um, die messbar mehr Anfragen bringen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#kontakt" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white transition-all duration-200" style={{ background: "#4F46E5", fontSize: "15px" }}>
                Kostenlose SEO-Analyse
              </Link>
              <Link href="/webdesign-freiburg" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-all duration-200" style={{ background: "#F3F4F6", color: "#0D0D0D", fontSize: "15px" }}>
                Webdesign ansehen
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
              { zahl: "93 %", text: "aller Online-Erfahrungen beginnen mit einer Suchmaschine" },
              { zahl: "75 %", text: "der Nutzer klicken nie auf Seite 2 der Google-Ergebnisse" },
              { zahl: "46 %", text: "aller Google-Suchen haben lokalen Bezug" },
            ].map((f, i) => (
              <div key={i}>
                <p className="font-display font-bold mb-2" style={{ fontSize: "clamp(36px, 4vw, 52px)", color: "#fff" }}>{f.zahl}</p>
                <p style={{ fontSize: "15px", color: "#C7D2FE" }}>{f.text}</p>
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
              Was wir für Ihr Ranking tun
            </h2>
            <p className="mb-12" style={{ fontSize: "16px", color: "#6B7280", maxWidth: "560px" }}>
              SEO ist kein Einmal-Eingriff. Es ist ein kontinuierlicher Prozess aus technischer Optimierung,
              inhaltlichem Ausbau und lokalem Linkaufbau.
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

      {/* Warum SEO in Freiburg */}
      <section style={{ background: "#fff", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Lokales Know-how</p>
            <h2 className="font-display font-bold mb-8" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D", maxWidth: "700px" }}>
              SEO in Freiburg im Breisgau — was das bedeutet
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="flex flex-col gap-6">
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Freiburg im Breisgau ist ein stark umkämpfter lokaler Markt. Mit über 230.000 Einwohnern,
                  zwei Universitäten und einem breiten Mittelstand konkurrieren Hunderte von Unternehmen um
                  dieselben Google-Plätze. Für Branchen wie Zahnmedizin, Steuerberatung, Immobilien, Handwerk
                  und Gastronomie ist die erste Seite bei Google ein entscheidender Wachstumsfaktor.
                </p>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  46 % aller Google-Suchen haben lokalen Bezug. Wenn jemand in Freiburg nach einem Dienstleister
                  sucht, erscheinen zuerst Google-Maps-Einträge (Local Pack) und dann organische Suchergebnisse.
                  Wer in beiden Bereichen nicht präsent ist, verliert täglich potenzielle Kunden an Konkurrenten,
                  die online besser aufgestellt sind.
                </p>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Als Agentur aus Freiburg kennen wir den lokalen Markt. Wir wissen, welche Keywords Ihre
                  Zielkunden verwenden, welche Konkurrenten stark sind und wo die echten Chancen liegen.
                  Kein generisches SEO aus dem Standardpaket — sondern eine Strategie, die auf Freiburg
                  und Ihre Branche zugeschnitten ist.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Der Freiburger Markt hat eine Besonderheit: viele Branchen sind noch weit davon entfernt,
                  ihr SEO-Potenzial auszuschöpfen. Viele lokale Unternehmen haben WordPress-Websites mit
                  schlechten Ladezeiten, fehlendem Schema-Markup und dünnem Content. Das schafft echte
                  Chancen für Unternehmen, die bereit sind, in professionelle Optimierung zu investieren.
                </p>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Freiburg ist außerdem Universitätsstadt — ein junges, digital-affines Publikum, das
                  Dienstleister fast ausschließlich online findet. Wer hier in Google-Rankings investiert,
                  erschließt sich eine Zielgruppe, die bereit ist, lokal einzukaufen — wenn sie die richtigen
                  Unternehmen findet.
                </p>
                <div className="rounded-2xl p-6 grid grid-cols-2 gap-4" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                  {[
                    { label: "Lokaler Markt", value: "Freiburg & Region" },
                    { label: "Direkte Kommunikation", value: "Kein Mittelsmann" },
                    { label: "Messbare Ergebnisse", value: "Rankings & Traffic" },
                    { label: "Alles aus einer Hand", value: "Web + SEO + Content" },
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
              Unser SEO-Prozess
            </h2>
            <p className="mb-12" style={{ fontSize: "16px", color: "#6B7280", maxWidth: "560px" }}>
              Keine Black Box. Jeder Schritt ist nachvollziehbar, jede Maßnahme begründet.
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

      {/* Warum LB Digital */}
      <section style={{ background: "#fff", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Warum LB Digital</p>
            <h2 className="font-display font-bold mb-8" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D", maxWidth: "680px" }}>
              SEO aus Freiburg — nicht von irgendwo.
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col gap-5">
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Viele SEO-Agenturen betreuen Kunden bundesweit aus Call-Centern heraus. Sie bekommen
                  monatliche Reports, die Sie nicht verstehen, und sehen kaum messbare Ergebnisse.
                  LB Digital arbeitet anders: direkt, persönlich, mit klaren Zielen.
                </p>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Wir sind in Freiburg verwurzelt und kennen den lokalen Markt. Wir wissen, welche
                  Konkurrenten in Ihrer Branche stark sind, welche Keywords tatsächlich Traffic bringen
                  und welche Maßnahmen das größte Potenzial haben. Kein generisches Standardpaket —
                  sondern Strategie, die auf Ihr Unternehmen passt.
                </p>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                  Ein weiterer Vorteil: Wir entwickeln auch Websites. Das bedeutet, wir können technische
                  SEO-Probleme nicht nur identifizieren, sondern direkt beheben — ohne dass Sie eine
                  zweite Agentur beauftragen müssen. Web + SEO aus einer Hand.
                </p>
              </div>
              <StaggerSection className="grid grid-cols-2 gap-4">
                {[
                  { title: "Lokales Know-how", text: "Freiburg & Region" },
                  { title: "Direkte Kommunikation", text: "Kein Mittelsmann" },
                  { title: "Messbare Ergebnisse", text: "Rankings & Traffic" },
                  { title: "Web + SEO", text: "Alles aus einer Hand" },
                  { title: "Kein Standardpaket", text: "Individuelle Strategie" },
                  { title: "Monatliches Reporting", text: "Transparent & klar" },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="rounded-2xl p-5" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                    <p className="font-semibold mb-1" style={{ fontSize: "14px", color: "#0D0D0D" }}>{item.title}</p>
                    <p style={{ fontSize: "13px", color: "#6B7280" }}>{item.text}</p>
                  </motion.div>
                ))}
              </StaggerSection>
            </div>
          </Section>
        </div>
      </section>

      {/* Preise */}
      <section style={{ background: "#F9FAFB", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Preise</p>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D" }}>
              Was kostet SEO in Freiburg?
            </h2>
            <p className="mb-10" style={{ fontSize: "16px", color: "#6B7280", maxWidth: "580px", lineHeight: "1.8" }}>
              Transparente Preise ohne versteckte Kosten. SEO-Betreuung ist immer langfristig angelegt —
              kurzfristige Maßnahmen bringen selten nachhaltige Ergebnisse.
            </p>
          </Section>
          <StaggerSection className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { title: "SEO-Audit", price: "ab 800 €", text: "Einmalige Analyse: technische Fehler, fehlende Inhalte, Keyword-Gaps, Wettbewerber-Analyse. Mit konkretem Maßnahmenplan. Keine laufende Betreuung — für Unternehmen, die selbst umsetzen wollen." },
              { title: "Lokales SEO", price: "ab 300 € / Monat", text: "Technisches SEO, Google Business Profile Optimierung, Citations aufbauen, monatliches Reporting. Für lokale Unternehmen, die in Freiburg gefunden werden wollen." },
              { title: "Full-Service SEO", price: "ab 600 € / Monat", text: "Alles aus Lokales SEO plus Content-Erstellung, aktiver Linkaufbau, Keyword-Strategie und umfassendes Reporting. Für Unternehmen mit ambitionierten Wachstumszielen." },
            ].map((pkg, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl p-8" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
                <h3 className="font-display font-semibold mb-2" style={{ fontSize: "18px", color: "#0D0D0D" }}>{pkg.title}</h3>
                <p className="font-display font-bold mb-4" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", color: "#4F46E5" }}>{pkg.price}</p>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.75" }}>{pkg.text}</p>
              </motion.div>
            ))}
          </StaggerSection>
          <Link href="/#kontakt" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white" style={{ background: "#4F46E5", fontSize: "15px" }}>
            Kostenlose SEO-Analyse anfragen
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fff", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>FAQ</p>
            <h2 className="font-display font-bold mb-12" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D", maxWidth: "700px" }}>
              Häufig gestellte Fragen zur SEO-Optimierung in Freiburg
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
      <section style={{ background: "#F9FAFB", paddingTop: "clamp(40px, 5vw, 60px)", paddingBottom: "clamp(40px, 5vw, 60px)" }}>
        <div className="container-xl">
          <Section>
            <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Weitere Leistungen</p>
            <h2 className="font-display font-bold mb-8" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#0D0D0D" }}>
              SEO beginnt bei der Website
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/webdesign-freiburg" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200" style={{ background: "#fff", color: "#0D0D0D", border: "1px solid #E5E7EB", fontSize: "14px" }}>
                Webdesign Freiburg
              </Link>
              <Link href="/webdesign-furtwangen" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200" style={{ background: "#fff", color: "#0D0D0D", border: "1px solid #E5E7EB", fontSize: "14px" }}>
                Webdesign Furtwangen
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
              Kostenlose SEO-Analyse anfragen
            </h2>
            <p className="mb-8" style={{ fontSize: "17px", color: "#9CA3AF", maxWidth: "520px", margin: "0 auto 2rem" }}>
              Wir analysieren Ihre aktuelle Sichtbarkeit und zeigen konkrete Potenziale — kostenlos
              und unverbindlich. Kein Verkaufsdruck, nur ehrliche Einschätzung.
            </p>
            <Link href="/#kontakt" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white" style={{ background: "#4F46E5", fontSize: "16px" }}>
              Jetzt Analyse anfragen
            </Link>
          </Section>
        </div>
      </section>
    </>
  );
}
