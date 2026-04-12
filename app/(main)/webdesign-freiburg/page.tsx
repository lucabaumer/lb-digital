import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Webdesign Freiburg – Individuelle Websites von LB Digital",
  description:
    "Professionelles Webdesign in Freiburg im Breisgau. LB Digital entwickelt maßgeschneiderte Websites mit Next.js – schnell, modern und auf Ihre Zielgruppe ausgerichtet.",
  alternates: {
    canonical: "https://www.lb-digital.agency/webdesign-freiburg",
  },
  openGraph: {
    title: "Webdesign Freiburg – LB Digital",
    description:
      "Individuelle Websites für Unternehmen in Freiburg. Kein Baukasten, kein Template – maßgeschneidert für Ihre Marke.",
    url: "https://www.lb-digital.agency/webdesign-freiburg",
  },
};

const leistungen = [
  {
    title: "Individuelle Gestaltung",
    text: "Keine Templates, keine Baukästen. Jede Website wird von Grund auf für Ihr Unternehmen und Ihre Zielgruppe entwickelt.",
  },
  {
    title: "Next.js & React",
    text: "Modernste Technologie für maximale Geschwindigkeit. Ihre Website lädt in unter einer Sekunde – ein entscheidender Rankingfaktor bei Google.",
  },
  {
    title: "Mobile First",
    text: "Über 70 % aller Besucher kommen vom Smartphone. Wir gestalten zuerst für mobile Geräte, dann für Desktop.",
  },
  {
    title: "SEO-optimiert",
    text: "Technisch sauberer Code, optimierte Ladezeiten und strukturierte Daten – damit Google Ihre Seite von Anfang an versteht.",
  },
  {
    title: "Lighthouse 95+",
    text: "Performance, Accessibility, Best Practices und SEO – alle Scores im grünen Bereich, messbar und transparent.",
  },
  {
    title: "Persönliche Betreuung",
    text: "Kein Ticketsystem, kein Call-Center. Sie arbeiten direkt mit dem Entwickler zusammen – von der ersten Idee bis zum Launch.",
  },
];

const prozess = [
  { nr: "01", title: "Erstgespräch", text: "Kostenlos, unverbindlich. Wir verstehen Ihre Ziele." },
  { nr: "02", title: "Konzept", text: "Sitemap, Wireframes und Design-Richtung in einer Woche." },
  { nr: "03", title: "Entwicklung", text: "Pixel-perfekte Umsetzung mit täglichem Fortschritt." },
  { nr: "04", title: "Launch", text: "Deployment, Domain, SSL – alles aus einer Hand." },
];

export default function WebdesignFreiburgPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ background: "#fff", paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}
      >
        <div className="container-xl">
          <p
            className="eyebrow mb-5"
            style={{ color: "#4F46E5" }}
          >
            Webdesign Freiburg
          </p>
          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", color: "#0D0D0D", maxWidth: "820px" }}
          >
            Websites, die in{" "}
            <span style={{ color: "#4F46E5" }}>Freiburg</span>{" "}
            und darüber hinaus überzeugen.
          </h1>
          <p
            className="mb-10 leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "#6B7280", maxWidth: "600px" }}
          >
            LB Digital entwickelt individuelle Websites für Unternehmen in Freiburg im Breisgau.
            Modern, schnell und auf Ihre Zielgruppe ausgerichtet — kein Baukasten, kein Template.
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
            Was Sie von uns bekommen
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

      {/* Prozess */}
      <section style={{ background: "#fff", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Ablauf</p>
          <h2
            className="font-display font-bold mb-12"
            style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D" }}
          >
            So entsteht Ihre Website
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prozess.map((p, i) => (
              <div key={i} className="flex flex-col gap-3">
                <span
                  className="font-display font-bold"
                  style={{ fontSize: "40px", color: "#E5E7EB" }}
                >
                  {p.nr}
                </span>
                <h3
                  className="font-display font-semibold"
                  style={{ fontSize: "17px", color: "#0D0D0D" }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.7" }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preise */}
      <section style={{ background: "#F9FAFB", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl">
          <p className="eyebrow mb-4" style={{ color: "#4F46E5" }}>Preise</p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#0D0D0D" }}
          >
            Transparente Kosten
          </h2>
          <p className="mb-12" style={{ fontSize: "16px", color: "#6B7280", maxWidth: "560px" }}>
            Eine professionelle Website in Freiburg beginnt bei ca. 1.500 €. Der genaue Preis hängt
            von Umfang und Anforderungen ab — Sie erhalten immer ein fixes Angebot vorab.
          </p>
          <Link
            href="/#kontakt"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white"
            style={{ background: "#4F46E5", fontSize: "15px" }}
          >
            Angebot anfragen
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0D0D0D", paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="container-xl text-center">
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "#fff" }}
          >
            Bereit für Ihre neue Website?
          </h2>
          <p className="mb-8" style={{ fontSize: "17px", color: "#9CA3AF" }}>
            Kostenloses Erstgespräch — kein Verkaufsdruck, keine Verpflichtung.
          </p>
          <Link
            href="/#kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white"
            style={{ background: "#4F46E5", fontSize: "16px" }}
          >
            Jetzt Gespräch vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
