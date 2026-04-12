const faqItems = [
  {
    q: "Was kostet eine professionelle Website?",
    a: "Eine maßgeschneiderte Website beginnt bei ca. 1.500 € und richtet sich nach Umfang und Anforderungen. Im Erstgespräch erstellen wir ein transparentes Angebot ohne versteckte Kosten.",
  },
  {
    q: "Wie lange dauert die Erstellung?",
    a: "Eine Standard-Website ist in der Regel in 2–3 Wochen fertig. Komplexere Projekte planen wir individuell — immer mit einem klaren Zeitplan von Anfang an.",
  },
  {
    q: "Kann ich meine Website danach selbst bearbeiten?",
    a: "Ja. Wir bauen auf Wunsch ein CMS ein, über das Sie Texte, Bilder und Inhalte eigenständig pflegen können — ohne Programmierkenntnisse.",
  },
  {
    q: "Was ist der Unterschied zu einem Baukasten wie Jimdo?",
    a: "Baukästen liefern generische Templates, die wie tausend andere Seiten aussehen. Wir bauen Ihre Seite von Grund auf — individuell, schneller und technisch überlegen.",
  },
  {
    q: "Übernehmen Sie auch bestehende Websites?",
    a: "Ja. Wir analysieren Ihre aktuelle Website kostenlos und zeigen, was sich verbessern lässt — ob Überarbeitung oder kompletter Neuaufbau sinnvoller ist.",
  },
  {
    q: "Arbeiten Sie nur in Freiburg?",
    a: "Unser Schwerpunkt liegt in Freiburg und der Region, wir arbeiten aber remote mit Kunden in der gesamten DACH-Region zusammen.",
  },
];

export default function SchemaOrg() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lb-digital.agency";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#business`,
    name: "LB Digital",
    description:
      "Individuelle Websites und lokale SEO-Optimierung für Unternehmen in Freiburg. Kein Template, kein Baukasten — maßgeschneidert für Ihre Marke.",
    url: base,
    telephone: "+49 178 5881195",
    email: "hallo@lb-digital.agency",
    founder: {
      "@type": "Person",
      name: "Luca Baumer",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Freiburg im Breisgau",
      postalCode: "79100",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.999,
      longitude: 7.842,
    },
    areaServed: {
      "@type": "City",
      name: "Freiburg im Breisgau",
    },
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
      base,
      "https://www.instagram.com/lb.digital.agency",
      "https://www.linkedin.com/company/lb-digital-agency",
    ],
    priceRange: "€€",
    openingHours: "Mo-Fr 09:00-18:00",
    image: `${base}/opengraph-image`,
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
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
