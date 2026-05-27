import type { Metadata } from "next";
import SEOContent from "./Content";

export const metadata: Metadata = {
  title: "SEO Freiburg – Lokale Suchmaschinenoptimierung von LB Digital",
  description:
    "SEO-Agentur aus Freiburg im Breisgau. LB Digital macht Ihren Betrieb bei Google sichtbar — mehr Anfragen, weniger Abhängigkeit von Empfehlungen. Kostenlose Analyse.",
  alternates: {
    canonical: "https://www.lb-digital.agency/seo-freiburg",
  },
  openGraph: {
    title: "SEO Freiburg – LB Digital",
    description:
      "Lokale SEO-Optimierung für Betriebe in Freiburg. Mehr Google-Sichtbarkeit, mehr Kunden aus der Region — messbar und transparent.",
    url: "https://www.lb-digital.agency/seo-freiburg",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO Freiburg",
  description:
    "Lokale Suchmaschinenoptimierung für Betriebe in Freiburg im Breisgau. Mehr Google-Sichtbarkeit, mehr Anfragen aus der Region.",
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Startseite",
      item: "https://www.lb-digital.agency",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "SEO Freiburg",
      item: "https://www.lb-digital.agency/seo-freiburg",
    },
  ],
};

export default function SEOFreiburgPage() {
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
      <SEOContent />
    </>
  );
}
