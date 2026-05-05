import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import { MotionConfig } from "framer-motion";
import LenisProvider from "@/components/providers/LenisProvider";
import SchemaOrg from "./schema";
import CookieBanner from "@/components/ui/CookieBanner";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lb-digital.agency"),
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: "/favicon.ico",
  },
  title: {
    default: "LB Digital – Webdesign & SEO Agentur Freiburg",
    template: "%s | LB Digital",
  },
  description:
    "Individuelle Websites und lokale SEO-Optimierung für Unternehmen in Freiburg. Kein Template, kein Baukasten — maßgeschneidert für Ihre Marke.",
  keywords: [
    "Webdesign Freiburg",
    "Webagentur Freiburg",
    "SEO Freiburg",
    "Website erstellen Freiburg",
    "Webentwicklung Freiburg",
    "Next.js Agentur",
    "Webdesign Breisgau",
    "lokales SEO Freiburg",
  ],
  authors: [{ name: "Luca Baumer", url: "https://www.lb-digital.agency" }],
  creator: "LB Digital",
  publisher: "LB Digital",
  openGraph: {
    title: "LB Digital – Webdesign & SEO Agentur Freiburg",
    description:
      "Individuelle Websites und lokale SEO-Optimierung für Unternehmen in Freiburg. Kein Template, kein Baukasten.",
    url: "https://www.lb-digital.agency",
    siteName: "LB Digital",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LB Digital – Webdesign & SEO Agentur Freiburg",
    description:
      "Individuelle Websites und lokale SEO-Optimierung für Unternehmen in Freiburg.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${jakarta.variable} ${bricolage.variable}`}>
      <body className="min-h-screen flex flex-col">
        <SchemaOrg />
        {GA_ID && (
          <>
            <Script id="ga4-consent-default" strategy="beforeInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied'});`}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
        <MotionConfig reducedMotion="user">
          <LenisProvider>
            {children}
          </LenisProvider>
        </MotionConfig>
        <CookieBanner />
      </body>
    </html>
  );
}
