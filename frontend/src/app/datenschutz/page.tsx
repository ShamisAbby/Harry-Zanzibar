import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung gemäß DSGVO.",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" updatedAt="Juli 2026">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        {siteConfig.name}, E-Mail: {siteConfig.email}
      </p>

      <h2>2. Erhebung und Verarbeitung von Daten</h2>
      <p>
        Wir verarbeiten personenbezogene Daten, die Sie uns über Kontakt-, Buchungs- oder
        Newsletter-Formulare freiwillig zur Verfügung stellen, ausschließlich zum Zweck der
        Bearbeitung Ihrer Anfrage bzw. Buchung.
      </p>

      <h2>3. Cookies</h2>
      <p>
        Diese Website verwendet Cookies, um grundlegende Funktionen zu ermöglichen und, mit
        Ihrer Einwilligung, Analyse- und Marketing-Cookies (z. B. Google Analytics, Meta
        Pixel). Details finden Sie in unserer{" "}
        <a href="/cookie-richtlinie">Cookie-Richtlinie</a>.
      </p>

      <h2>4. Google Analytics & Marketing-Tools</h2>
      <p>
        Sofern Sie Ihre Einwilligung erteilt haben, nutzen wir Analyse- und
        Marketing-Dienste (z. B. Google Analytics 4, Google Ads, Meta Pixel, Microsoft
        Clarity), um unser Angebot zu verbessern und relevante Werbung auszuspielen. Diese
        Dienste können Daten auf Servern außerhalb der EU verarbeiten.
      </p>

      <h2>5. Ihre Rechte</h2>
      <p>
        Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und
        Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie ein
        Widerspruchsrecht gegen die Verarbeitung. Wenden Sie sich hierzu an{" "}
        {siteConfig.email}.
      </p>

      <h2>6. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke
        erforderlich ist oder gesetzliche Aufbewahrungspflichten dies vorschreiben.
      </p>

      <p className="mt-8 text-xs text-muted-foreground">
        Hinweis: Diese Vorlage ersetzt keine individuelle Rechtsberatung. Bitte durch eine
        auf DSGVO spezialisierte Rechtsberatung prüfen und an die tatsächlich eingesetzten
        Dienste anpassen lassen.
      </p>
    </LegalPage>
  );
}
