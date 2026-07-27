import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description: "Informationen zur Verwendung von Cookies auf dieser Website.",
  robots: { index: false, follow: true },
};

export default function CookieRichtliniePage() {
  return (
    <LegalPage title="Cookie-Richtlinie" updatedAt="Juli 2026">
      <h2>Was sind Cookies?</h2>
      <p>
        Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie
        unsere Website besuchen. Sie helfen uns, die Website funktionsfähig zu halten und
        Ihre Erfahrung zu verbessern.
      </p>

      <h2>Welche Cookies verwenden wir?</h2>
      <ul>
        <li>
          <strong>Notwendige Cookies:</strong> Erforderlich für grundlegende
          Website-Funktionen (z. B. Spracheinstellungen, Cookie-Einwilligung).
        </li>
        <li>
          <strong>Analyse-Cookies:</strong> Helfen uns zu verstehen, wie Besucher unsere
          Website nutzen (z. B. Google Analytics), nur mit Ihrer Einwilligung aktiv.
        </li>
        <li>
          <strong>Marketing-Cookies:</strong> Werden für Werbezwecke verwendet (z. B. Meta
          Pixel, Google Ads), nur mit Ihrer Einwilligung aktiv.
        </li>
      </ul>

      <h2>Cookie-Einwilligung verwalten</h2>
      <p>
        Beim ersten Besuch unserer Website können Sie auswählen, welche Cookie-Kategorien
        Sie zulassen möchten. Sie können Ihre Einwilligung jederzeit über die
        Cookie-Einstellungen in der Fußzeile widerrufen oder anpassen.
      </p>
    </LegalPage>
  );
}
