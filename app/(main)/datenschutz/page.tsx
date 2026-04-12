import Link from "next/link";

export const metadata = {
  title: "Datenschutz – LB Digital",
};

export default function DatenschutzPage() {
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
          Datenschutzerklärung
        </h1>

        <div className="text-[#6B7280] space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              1. Datenschutz auf einen Blick
            </h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              2. Verantwortlicher
            </h2>
            <p>
              Luca Baumer · LB Digital · hallo@lb-digital.agency
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              3. Datenerfassung auf dieser Website
            </h2>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Wenn Sie uns über das Kontaktformular
              kontaktieren, werden Ihre Angaben (Name, E-Mail-Adresse,
              Nachricht) zur Bearbeitung der Anfrage und für den Fall von
              Anschlussfragen gespeichert. Diese Daten geben wir nicht ohne
              Ihre Einwilligung weiter.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              4. Ihre Rechte
            </h2>
            <p>
              Sie haben das Recht auf Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger und den
              Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung,
              Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren
              Fragen zum Thema Datenschutz können Sie sich jederzeit unter der
              im Impressum angegebenen Adresse an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              5. E-Mail-Dienste
            </h2>
            <p>
              Für den Versand von Kontaktformular-Nachrichten nutzen wir den
              Dienst Resend (Resend Inc., 2261 Market Street #5039, San
              Francisco, CA 94114, USA). Übermittelte Daten (Name, E-Mail-Adresse,
              Nachricht) werden ausschließlich zur Beantwortung Ihrer Anfrage
              verwendet und nicht an Dritte weitergegeben. Rechtsgrundlage:
              Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              6. Google Analytics
            </h2>
            <p>
              Diese Website nutzt Google Analytics 4 (Google Ireland Limited,
              Gordon House, Barrow Street, Dublin 4, Irland). Google Analytics
              verwendet Cookies, um die Nutzung der Website zu analysieren.
              Die durch den Cookie erzeugten Informationen werden in der Regel
              an einen Server von Google in den USA übertragen und dort gespeichert.
              Die Nutzung von Google Analytics erfolgt nur mit Ihrer ausdrücklichen
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre
              Einwilligung jederzeit widerrufen, indem Sie Ihren Browser-Cache
              leeren und die Seite neu laden — der Consent-Banner erscheint dann
              erneut. Weitere Informationen:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4F46E5] hover:underline"
              >
                policies.google.com/privacy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              7. Hosting
            </h2>
            <p>
              Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133,
              Covina, CA 91723, USA) gehostet. Beim Aufruf der Website werden
              automatisch Serverlogfiles erfasst (IP-Adresse, Browsertyp,
              Betriebssystem, Referrer-URL, Datum und Uhrzeit). Diese Daten
              sind technisch notwendig und werden nicht mit anderen
              Datenquellen zusammengeführt. Rechtsgrundlage: Art. 6 Abs. 1
              lit. f DSGVO. Vercel ist nach dem EU-US Data Privacy Framework
              zertifiziert.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wide mb-2">
              8. Beschwerderecht
            </h2>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
              über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
              Zuständige Aufsichtsbehörde für Baden-Württemberg:{" "}
              <a
                href="https://www.baden-wuerttemberg.datenschutz.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4F46E5] hover:underline"
              >
                Landesbeauftragter für Datenschutz und Informationsfreiheit Baden-Württemberg
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
