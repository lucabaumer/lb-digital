import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KERN Elektrotechnik Freiburg – Ihr Elektriker seit 1987",
  description:
    "Elektroinstallation, Smart Home und Photovoltaik in Freiburg. Meisterbetrieb seit 1987, 24/7 Notdienst, über 1.800 Projekte.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.lb-digital.agency/projekte/kern-elektro",
  },
};

export default function KernElektroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
