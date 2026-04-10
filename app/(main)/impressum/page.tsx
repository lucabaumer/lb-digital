import Link from "next/link";

export const metadata = {
  title: "Impressum – LB Digital",
};

export default function ImpressumPage() {
  return (
    <div className="section-py">
      <div className="container-xl max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11.5 7h-9M5.5 3.5L2 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Zurück zur Startseite
        </Link>

        <h1
          className="font-bold text-[#0A0A0A] mb-8"
          style={{ fontFamily: "var(--font-bricolage)", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          Impressum
        </h1>

        <div className="prose prose-sm max-w-none text-[#6B7280] space-y-6">
          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              Luca Baumer<br />
              LB Digital<br />
              Freiburg im Breisgau, Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              Kontakt
            </h2>
            <p>
              Telefon:{" "}
              <a href="tel:+4917858811195" className="text-[#4F46E5] hover:underline">
                +49 178 5881195
              </a>
              <br />
              E-Mail:{" "}
              <a href="mailto:hallo@lb-digital.agency" className="text-[#4F46E5] hover:underline">
                hallo@lb-digital.agency
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              Haftung für Inhalte
            </h2>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
