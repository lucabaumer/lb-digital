import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baumeister Söhne GmbH Freiburg – Dachdeckerei & Fassadenbau",
  description:
    "Dachdeckerei und Fassadenbau in Freiburg im Breisgau. Seit 1978 stehen wir für Qualität, die hält. Kostenlos anfragen — schnelle Rückmeldung.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.lb-digital.agency/projekte/handwerk",
  },
};

export default function HandwerkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
