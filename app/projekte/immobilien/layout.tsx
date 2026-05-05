import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Müller Immobilien Freiburg – Luxusimmobilien & Diskrete Beratung",
  description:
    "Ihr Immobilienmakler in Freiburg im Breisgau. Penthouse, Villa, Stadtloft — Thomas Müller bewertet Ihr Objekt kostenlos in 48 Stunden. Seit 1998 vor Ort.",
  keywords: [
    "Immobilienmakler Freiburg",
    "Immobilien Freiburg kaufen",
    "Haus verkaufen Freiburg",
    "Wohnung verkaufen Freiburg",
    "Luxusimmobilien Freiburg",
    "Immobilienbewertung Freiburg kostenlos",
    "Makler Freiburg Breisgau",
  ],
  openGraph: {
    title: "Müller Immobilien Freiburg – Luxusimmobilien & Diskrete Beratung",
    description:
      "Diskrete Immobilienvermittlung in Freiburg. Kostenlose Marktwertermittlung in 48 Stunden.",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.lb-digital.agency/projekte/immobilien",
  },
};

export default function ImmobilienLayout({
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
      { "@type": "ListItem", position: 3, name: "Müller Immobilien", item: "https://www.lb-digital.agency/projekte/immobilien" },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Müller Immobilien Freiburg",
    description: "Diskreter Immobilienmakler in Freiburg im Breisgau seit 1998.",
    url: "https://www.mueller-immobilien-freiburg.de",
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
