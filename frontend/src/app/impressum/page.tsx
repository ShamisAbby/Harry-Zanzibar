import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG.",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <p>
        <strong>
          [PLATZHALTER – bitte durch die tatsächliche Firmierung ersetzen]
        </strong>
        <br />
        Harry Deutscher Reiseleiter Sansibar
        <br />
        [Straße, Hausnummer]
        <br />
        Nungwi, Sansibar, Tansania
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: {siteConfig.phoneDisplay}
        <br />
        E-Mail: {siteConfig.email}
      </p>

      <h2>Vertreten durch</h2>
      <p>[Name der verantwortlichen Person / Geschäftsführung]</p>

      <h2>Umsatzsteuer-ID / Geschäftsregister</h2>
      <p>
        [Falls zutreffend: Umsatzsteuer-Identifikationsnummer bzw. tansanische
        Gewerbe-/Handelsregisternummer einfügen]
      </p>

      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>[Name, Anschrift wie oben]</p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
        bereit. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <p className="mt-8 text-xs text-muted-foreground">
        Hinweis: Diese Seite enthält Platzhalter, die vor Veröffentlichung durch die
        rechtlich korrekten Angaben des Unternehmens ersetzt werden müssen.
      </p>
    </LegalPage>
  );
}
