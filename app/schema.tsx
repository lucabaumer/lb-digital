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
    sameAs: [base],
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
