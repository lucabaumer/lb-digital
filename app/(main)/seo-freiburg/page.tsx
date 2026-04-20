import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Freiburg – Lokale Suchmaschinenoptimierung von LB Digital",
  description:
    "SEO-Agentur aus Freiburg im Breisgau. LB Digital optimiert Ihre Website für Google – mehr Sichtbarkeit, mehr Anfragen, mehr Kunden aus Freiburg und der Region.",
  alternates: {
    canonical: "https://www.lb-digital.agency/seo-freiburg",
  },
  openGraph: {
    title: "SEO Freiburg – LB Digital",
    description:
      "Lokale SEO-Optimierung für Unternehmen in Freiburg. Mehr Sichtbarkeit bei Google, mehr Kunden aus der Region.",
    url: "https://www.lb-digital.agency/seo-freiburg",
  },
};

const leistungen = [
  {
    title: "Lokales SEO",
    text: "Wir optimieren Ihre Website gezielt für Suchanfragen aus Freiburg und der Region — damit Kunden Sie finden, bevor sie zur Konkurrenz gehen.",
  },
  {
    title: "Google My Business",
    text: "Vollständige Optimierung Ihres GMB-Profils: Kategorien, Beschreibung, Fotos, Bewertungen — für bessere Sichtbarkeit in der lokalen Suche.",
  },
  {
    title: "Technisches SEO",
    text: "Ladezeiten, Core Web Vitals, strukturierte Daten, Sitemap und robots.txt — die technische Basis, ohne die kein Ranking möglich ist.",
  },
  {
    title: "On-Page Optimierung",
    text: "Title Tags, Meta Descriptions, Überschriften, interne Verlinkung — jede Seite wird für ihren Ziel-Suchbegriff optimiert.",
  },
  {
    title: "Content-Strategie",
    text: "Wir zeigen Ihnen, welche Inhalte fehlen und welche Keywords Potenzial haben — konkret, messbar, ohne Agentur-Blabla.",
  },
  {
    title: "Transparentes Reporting",
    text: "Monatliche Reports mit Rankings, Traffic und Conversions. Sie sehen genau, was Ihr SEO-Budget bringt.",
  },
];

const fakten = [
  { zahl: "93 %", text: "aller Online-Erfahrungen beginnen mit einer Suchmaschine" },
  { zahl: "75 %", text: "der Nutzer klicken nie auf Seite 2" },
  { zahl: "46 %", text: "aller Google-Suchen haben lokalen Bezug" },
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
  areaServed: {
    "@type": "City",
    name: "Freiburg im Breisgau",
  },
  serviceType: "Suchmaschinenoptimierung (SEO)",
  url: "https://www.lb-digital.agency/seo-freiburg",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.lb-digital.agency" },
    { "@type": "ListItem", position: 2, name: "SEO Freiburg", item: "https://www.lb-digital.agency/seo-freiburg" },
  ],
};

export default function SEOFreiburgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section
        style={{ background: "#fff", paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}
      >
        <div className="container-xl">
          <p className="eyebrow mb-5" style={{ color: "#4F46E5" }}>
            SEO Freiburg
          </p>
          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", color: "#0D0D0D", maxWidth: "820px" }}
          >
            Mehr Kunden aus{" "}
            <span style={{ color: "#4F46E5" }}>Freiburg</span>{" "}
            durch bessere Google-Rankings.
          </h1>
          <p
            className="mb-10 leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "#6B7280", maxWidth: "600px" }}
          >
            LB Digital optimiert Ihre Website für Google — technisch sauber, inhaltlich stark,
            lokal ausgerichtet. Damit Sie gefunden werden, wenn potenzielle Kunden in Freiburg suchen.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#kontakt"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white transition-all duration-200"
              style={{ background: "#4F46E5", fontSize: "15px" }}
            >
              Kostenlose SEO-Analyse
            </Link>
            <Link
              href="/webdesign-freiburg"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-all duration-200"
              style={{ background: "#F3F4F6", color: "#0D0D0D", fontSize: "15px" }}
            >
              Webdesign ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Fakten */}
      <section style={{ background: "#4F46E5", paddingTop: "clamp(50px, 6vw, 80px)", paddingBottom: "clamp(50px, 6vw, 80px)" }}>
        <div className="container-xl">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {fakten.map((f, i) => (
              <div key={i}>
                <p
                  className="font-display font-bold mb-2"
                  style={{ fontSize: "clamp(36px, 4vw, 52px)", color: "#fff" }}
                >
                  {f.zahl}
                </p>
                <p style={{ fontSize: "15px", color: "#C7D2FE" }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section style={{ background: "#F9FAFB", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Leistungen</p>
          <h2
            className="font-display font-bold mb-12"
            style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D" }}
          >
            Was wir für Ihr Ranking tun
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leistungen.map((l, i) => (
              <div
                key={i}
                className="rounded-2xl p-7"
                style={{ background: "#fff", border: "1px solid #E5E7EB" }}
              >
                <h3
                  className="font-display font-semibold mb-3"
                  style={{ fontSize: "17px", color: "#0D0D0D" }}
                >
                  {l.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.7" }}>{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warum LB Digital */}
      <section style={{ background: "#fff", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Warum LB Digital</p>
              <h2
                className="font-display font-bold mb-6"
                style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D" }}
              >
                SEO aus Freiburg — nicht von irgendwo.
              </h2>
              <p className="mb-4" style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                Wir kennen den Freiburger Markt. Wir wissen, wie Ihre Kunden suchen, welche
                Konkurrenten stark sind und wo die Chancen liegen — lokal und regional.
              </p>
              <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8" }}>
                Keine Agentur mit 50 Kunden und anonymen Account-Managern. Sie sprechen direkt
                mit dem SEO-Experten — schnelle Kommunikation, klare Ergebnisse.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Lokales Know-how", text: "Freiburg & Region" },
                { title: "Direkte Kommunikation", text: "Kein Mittelsmann" },
                { title: "Messbare Ergebnisse", text: "Rankings & Traffic" },
                { title: "Alles aus einer Hand", text: "Web + SEO + Content" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6"
                  style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}
                >
                  <p className="font-semibold mb-1" style={{ fontSize: "15px", color: "#0D0D0D" }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: "13px", color: "#6B7280" }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0D0D0D", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl text-center">
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "#fff" }}
          >
            Kostenlose SEO-Analyse anfragen
          </h2>
          <p className="mb-8" style={{ fontSize: "17px", color: "#9CA3AF" }}>
            Wir analysieren Ihre aktuelle Sichtbarkeit und zeigen konkrete Potenziale — kostenlos und unverbindlich.
          </p>
          <Link
            href="/#kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white"
            style={{ background: "#4F46E5", fontSize: "16px" }}
          >
            Jetzt Analyse anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
