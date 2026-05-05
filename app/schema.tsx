export const faqItems = [
  {
    q: "Was kostet eine professionelle Website in Freiburg?",
    a: "Eine maßgeschneiderte Website beginnt bei ca. 1.500 € und richtet sich nach Umfang und Anforderungen. Im kostenlosen Erstgespräch erstellen wir ein transparentes Festpreis-Angebot — kein Stundensatz, keine versteckten Kosten.",
  },
  {
    q: "Wie lange dauert die Erstellung einer Website?",
    a: "Eine Standard-Website (3–5 Seiten) ist in der Regel in 2–3 Wochen fertig. Komplexere Projekte mit mehr Seiten, CMS oder individuellen Funktionen planen wir individuell — immer mit einem klaren Zeitplan von Anfang an.",
  },
  {
    q: "Kann ich meine Website danach selbst bearbeiten?",
    a: "Ja. Wir bauen auf Wunsch ein CMS (z. B. Sanity) ein, über das Sie Texte, Bilder und Inhalte eigenständig pflegen können — ohne Programmierkenntnisse. Alternativ übernehmen wir die Pflege für Sie.",
  },
  {
    q: "Was ist der Unterschied zu einem Baukasten wie Jimdo oder Wix?",
    a: "Baukästen liefern generische Templates, die wie tausende andere Seiten aussehen. LB Digital baut Ihre Seite von Grund auf — individuell, bis zu 10× schneller als WordPress und technisch überlegen. Lighthouse-Score 95+ auf allen Metriken.",
  },
  {
    q: "Übernehmen Sie auch bestehende Websites?",
    a: "Ja. Wir analysieren Ihre aktuelle Website kostenlos und zeigen, was sich verbessern lässt — ob gezielte Überarbeitung oder kompletter Neuaufbau sinnvoller ist. Die Analyse ist kostenlos und unverbindlich.",
  },
  {
    q: "Arbeiten Sie nur in Freiburg?",
    a: "Unser Schwerpunkt liegt in Freiburg im Breisgau und der Region (Emmendingen, Breisach, Müllheim, Offenburg, Lörrach). Wir arbeiten aber remote mit Kunden in der gesamten DACH-Region zusammen.",
  },
  {
    q: "Warum Next.js statt WordPress?",
    a: "Next.js-Websites laden 5–10× schneller als WordPress, sind deutlich sicherer (kein angreifbares CMS-Backend), benötigen weniger Hosting-Kosten und erzielen bessere Google-Rankings durch höhere Core Web Vitals. Wir empfehlen WordPress nur, wenn selbstständige Content-Pflege Priorität hat.",
  },
  {
    q: "Machen Sie auch SEO für lokale Unternehmen in Freiburg?",
    a: "Ja. Lokales SEO ist eine unserer Kernleistungen. Wir optimieren Ihre Website technisch und inhaltlich für Google, richten Google My Business ein und sorgen für bessere Sichtbarkeit bei Suchanfragen aus Freiburg und der Region.",
  },
  {
    q: "Wie viel kostet SEO-Betreuung monatlich?",
    a: "Unsere monatliche SEO-Betreuung beginnt bei 300 € und umfasst technisches SEO, Content-Optimierung und monatliches Reporting. Der genaue Umfang wird individuell auf Ihre Ziele abgestimmt.",
  },
  {
    q: "Erstellen Sie auch Logos und Corporate Identity?",
    a: "Ja. Wir entwickeln professionelle Logos, Farbpaletten, Typografie und visuelle Identitäten für Unternehmen — ab 500 €. Branding und Website können als Gesamtpaket günstiger realisiert werden.",
  },
  {
    q: "Was ist ein kostenloses Erstgespräch bei LB Digital?",
    a: "Das Erstgespräch dauert ca. 30 Minuten (telefonisch oder persönlich in Freiburg) und ist völlig kostenlos und unverbindlich. Wir besprechen Ihre Ziele, zeigen mögliche Lösungen und erstellen danach ein konkretes Angebot.",
  },
  {
    q: "Welche Branchen betreuen Sie besonders?",
    a: "Unser Schwerpunkt liegt auf Rechtsanwaltskanzleien, Handwerksbetrieben und Architekturbüros im Raum Freiburg. Diese Branchen profitieren am stärksten von lokaler Google-Sichtbarkeit und einer professionellen Online-Präsenz. Wir arbeiten auch mit Physiotherapeuten, Steuerberatern und anderen lokalen Dienstleistern.",
  },
  {
    q: "Wie hoch ist der Lighthouse-Score Ihrer Websites?",
    a: "Unsere Websites erzielen regelmäßig Lighthouse-Scores von 95+ in den Kategorien Performance, SEO, Accessibility und Best Practices. Das ist messbar besser als die meisten WordPress-Seiten und ein direkter Google-Rankingfaktor.",
  },
  {
    q: "Bieten Sie auch Hosting und Domain-Verwaltung an?",
    a: "Ja. Wir übernehmen Deployment, Domain-Einrichtung und SSL-Zertifikat. Für Hosting nutzen wir Vercel — eine der schnellsten und zuverlässigsten Plattformen für Next.js-Websites.",
  },
  {
    q: "Was kostet eine Website für eine Kanzlei oder ein Handwerksunternehmen?",
    a: "Eine professionelle Website für Rechtsanwälte oder Handwerksbetriebe beginnt bei ca. 1.500–2.500 €, je nach Umfang. Inklusive lokalem SEO, Kontaktformular und Lighthouse 95+. Im Erstgespräch erhalten Sie ein konkretes Festpreis-Angebot.",
  },
];

export default function SchemaOrg() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lb-digital.agency";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${base}/#business`,
    name: "LB Digital",
    description:
      "Individuelle Websites und lokales SEO für Rechtsanwälte, Handwerker und Architekten in Freiburg. Kein Template, kein Baukasten — maßgeschneidert, damit Ihre Kunden Sie bei Google finden.",
    url: base,
    telephone: "+49 178 5881195",
    email: "hallo@lb-digital.agency",
    founder: {
      "@type": "Person",
      name: "Luca Baumer",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nonnenbach 7",
      addressLocality: "Freiburg im Breisgau",
      postalCode: "79100",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.999,
      longitude: 7.842,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "12",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      { "@type": "City", name: "Freiburg im Breisgau" },
      { "@type": "City", name: "Breisach" },
      { "@type": "City", name: "Emmendingen" },
      { "@type": "City", name: "Müllheim" },
      { "@type": "City", name: "Offenburg" },
      { "@type": "City", name: "Lörrach" },
      { "@type": "City", name: "Titisee-Neustadt" },
    ],
    knowsAbout: [
      "Webdesign",
      "Next.js Entwicklung",
      "React Entwicklung",
      "SEO Optimierung",
      "Lokales SEO Freiburg",
      "Core Web Vitals",
      "TypeScript",
      "Tailwind CSS",
      "Corporate Identity",
      "Logo Design",
      "Website für Rechtsanwälte Freiburg",
      "Website für Handwerker Freiburg",
      "Website für Architekten Freiburg",
      "Kanzlei Website",
      "Handwerker Website",
    ],
    serviceType: ["Webdesign", "Webentwicklung", "SEO", "Next.js Entwicklung"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Webdesign & Entwicklung",
            description: "Individuelle Next.js-Websites, Mobile-first, Lighthouse 95+",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Logo & Branding",
            description: "Corporate Identity, Logo Design, Farben & Typografie",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & lokale Sichtbarkeit",
            description: "Lokales SEO, Google My Business, technische Optimierung für Freiburg",
          },
        },
      ],
    },
    sameAs: [
      "https://www.instagram.com/lb.digital.agency",
      "https://www.linkedin.com/company/lb-digital-agency",
    ],
    priceRange: "€€",
    openingHours: ["Mo-Fr 09:00-18:00"],
    image: `${base}/opengraph-image`,
    currenciesAccepted: "EUR",
    paymentAccepted: ["Banküberweisung", "PayPal"],
    slogan: "Kein Template. Kein Baukasten. Nur Ihre Website.",
    foundingDate: "2023",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 1 },
    award: "Lighthouse Score 95+ auf allen Websites",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: "LB Digital",
    description: "Webdesign & SEO Agentur Freiburg",
    publisher: { "@id": `${base}/#business` },
    inLanguage: "de-DE",
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
