import type { Metadata } from "next";
import WebdesignContent from "./Content";

export const metadata: Metadata = {
  title: "Webdesign Freiburg – Individuelle Websites von LB Digital",
  description:
    "Professionelles Webdesign in Freiburg im Breisgau. LB Digital entwickelt maßgeschneiderte Websites für Handwerker und Unternehmen – schnell, modern, SEO-ready. Ab 1.500 €.",
  alternates: {
    canonical: "https://www.lb-digital.agency/webdesign-freiburg",
  },
  openGraph: {
    title: "Webdesign Freiburg – LB Digital",
    description:
      "Individuelle Websites für Betriebe in Freiburg. Kein Baukasten, kein Template – maßgeschneidert, Lighthouse 95+, in 4 Wochen live.",
    url: "https://www.lb-digital.agency/webdesign-freiburg",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Webdesign Freiburg",
  description:
    "Individuelle Next.js-Websites für Handwerker und Unternehmen in Freiburg im Breisgau. Mobile-first, Lighthouse 95+, kein Template.",
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
  serviceType: "Webdesign & Webentwicklung",
  url: "https://www.lb-digital.agency/webdesign-freiburg",
  offers: {
    "@type": "Offer",
    price: "1500",
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: "1500",
      priceCurrency: "EUR",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Startseite",
      item: "https://www.lb-digital.agency",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Webdesign Freiburg",
      item: "https://www.lb-digital.agency/webdesign-freiburg",
    },
  ],
};

export default function WebdesignFreiburgPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <WebdesignContent />
    </>
  );
}
