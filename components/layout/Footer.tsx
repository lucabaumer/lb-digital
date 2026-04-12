import Link from "next/link";
import Image from "next/image";
import page from "@/data/page.json";

export default function Footer() {
  const { nav, footer } = page;

  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #E5E7EB" }}>
      <div className="container-xl py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.png/Photoroom_20260401_150502.png"
              alt="LB Digital – Webdesign & SEO Agentur Freiburg"
              width={480}
              height={120}
              quality={90}
              sizes="(max-width: 768px) 200px, 240px"
              className="h-16 md:h-20 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              {footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#9CA3AF" }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B7280] hover:text-[#0D0D0D] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#9CA3AF" }}>
              Leistungen
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {page.services.map((s) => (
                <li key={s.id}>
                  <Link
                    href="#leistungen"
                    className="text-sm text-[#6B7280] hover:text-[#0D0D0D] transition-colors duration-150"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#9CA3AF" }}>
              Kontakt
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${footer.phone}`}
                className="text-sm text-[#6B7280] hover:text-[#0D0D0D] transition-colors duration-150"
              >
                T: {footer.phone}
              </a>
              <a
                href={`mailto:${footer.email}`}
                className="text-sm text-[#6B7280] hover:text-[#0D0D0D] transition-colors duration-150"
              >
                E: {footer.email}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8"
          style={{ borderTop: "1px solid #E5E7EB" }}
        >
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            {footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/impressum" className="text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
