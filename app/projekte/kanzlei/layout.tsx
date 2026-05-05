import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wagner & Partner Rechtsanwälte Freiburg – Fachanwälte für Ihr Recht",
  description:
    "Kompetente Rechtsberatung in Freiburg im Breisgau. Arbeitsrecht, Familienrecht, Erbrecht & Gesellschaftsrecht. Erstes Beratungsgespräch kostenlos.",
  keywords: [
    "Rechtsanwalt Freiburg",
    "Anwalt Freiburg",
    "Kanzlei Freiburg",
    "Arbeitsrecht Freiburg",
    "Familienrecht Freiburg",
    "Erbrecht Freiburg",
    "Rechtsberatung Freiburg Breisgau",
  ],
  openGraph: {
    title: "Wagner & Partner Rechtsanwälte Freiburg",
    description:
      "Fachanwälte in Freiburg für Arbeitsrecht, Familienrecht und Erbrecht. Persönliche Beratung, transparente Kosten.",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.lb-digital.agency/projekte/kanzlei",
  },
};

export default function KanzleiLayout({
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
      { "@type": "ListItem", position: 3, name: "Wagner & Partner Kanzlei", item: "https://www.lb-digital.agency/projekte/kanzlei" },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Wagner & Partner Rechtsanwälte Freiburg",
    description: "Fachanwälte für Arbeitsrecht, Familienrecht und Erbrecht in Freiburg im Breisgau.",
    url: "https://www.wagner-partner-freiburg.de",
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
