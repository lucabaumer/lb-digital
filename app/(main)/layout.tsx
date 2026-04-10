import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <a
        href="#hauptinhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#1D4ED8] focus:text-white focus:text-sm focus:font-medium"
      >
        Zum Hauptinhalt springen
      </a>
      <Navbar />
      <main id="hauptinhalt" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
