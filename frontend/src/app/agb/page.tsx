import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen für Buchungen bei Harry Sansibar.",
  robots: { index: false, follow: true },
};

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen" updatedAt="Juli 2026">
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle Buchungen von Touren,
        Ausflügen und Reiseleistungen über {siteConfig.name}.
      </p>

      <h2>2. Buchung und Anfrage</h2>
      <p>
        Eine Buchungsanfrage über unsere Website stellt ein unverbindliches Angebot dar.
        Der Vertrag kommt erst mit unserer persönlichen Bestätigung (per E-Mail oder
        WhatsApp) zustande.
      </p>

      <h2>3. Zahlung</h2>
      <p>
        Sofern nicht anders vereinbart, erfolgt die Zahlung vor Ort in bar oder per
        Überweisung gemäß den in der Buchungsbestätigung genannten Konditionen.
      </p>

      <h2>4. Stornierung</h2>
      <p>
        Stornierungen sind bis 24 Stunden vor Tourbeginn kostenfrei möglich, sofern nicht
        anders in der individuellen Buchungsbestätigung angegeben.
      </p>

      <h2>5. Haftung</h2>
      <p>
        Die Teilnahme an Touren erfolgt auf eigene Verantwortung. Wir empfehlen den
        Abschluss einer Reise- und Unfallversicherung für Ihren Aufenthalt.
      </p>

      <h2>6. Anwendbares Recht</h2>
      <p>Es gilt das Recht der Vereinigten Republik Tansania.</p>

      <p className="mt-8 text-xs text-muted-foreground">
        Hinweis: Diese Vorlage ersetzt keine individuelle Rechtsberatung und sollte vor
        Veröffentlichung geprüft und an die tatsächlichen Geschäftsbedingungen angepasst
        werden.
      </p>
    </LegalPage>
  );
}
