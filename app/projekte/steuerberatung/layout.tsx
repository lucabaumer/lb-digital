import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hoffmann Steuerberatung Freiburg – Weniger Steuern, mehr Klarheit",
  description:
    "Ihr Steuerberater in Freiburg im Breisgau. Einkommensteuererklärung, Unternehmensberatung & Jahresabschluss. Erstgespräch kostenlos und unverbindlich.",
  keywords: [
    "Steuerberater Freiburg",
    "Steuerberatung Freiburg",
    "Steuererklärung Freiburg",
    "Jahresabschluss Freiburg",
    "Unternehmenssteuer Freiburg",
    "Steuerberatung Breisgau",
    "Finanzberater Freiburg",
  ],
  openGraph: {
    title: "Hoffmann Steuerberatung Freiburg – Weniger Steuern, mehr Klarheit",
    description:
      "Professionelle Steuerberatung in Freiburg. Einkommensteuer, Unternehmensberatung, Jahresabschluss — persönlich und digital.",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.lb-digital.agency/projekte/steuerberatung",
  },
};

export default function SteuerberatungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "LB Digital", item: "https://www.lb-digital.agency" },
      { "@type": "ListItem", position: 2, name: "Referenzprojekte", item: "https://www.lb-digital.agency/#projekte" },
      { "@type": "ListItem", position: 3, name: "Hoffmann Steuerberatung", item: "https://www.lb-digital.agency/projekte/steuerberatung" },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "Hoffmann Steuerberatung Freiburg",
    description: "Professionelle Steuerberatung in Freiburg für Privatpersonen und Unternehmen.",
    url: "https://www.hoffmann-steuerberatung-freiburg.de",
    address: { "@type": "PostalAddress", addressLocality: "Freiburg im Breisgau", addressCountry: "DE" },
    areaServed: { "@type": "City", name: "Freiburg im Breisgau" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      {children}
    </>
  );
}
