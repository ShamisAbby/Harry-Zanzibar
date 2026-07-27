import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Harry direkt: per Formular, WhatsApp, Telefon oder E-Mail – für Fragen zu Touren, Buchungen oder individuellen Reiseplänen.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Kontakt
          </span>
          <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
            Sprechen Sie mit Harry
          </h1>
          <p className="mt-4 text-muted-foreground">
            Haben Sie Fragen zu einer Tour, möchten Sie eine individuelle Reise planen oder
            einfach mehr über Sansibar erfahren? Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="font-heading font-semibold">Kontaktdaten</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  Nungwi, Sansibar, Tansania
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-primary" />
                  <a href={`tel:+${siteConfig.whatsappNumber}`} className="hover:text-primary">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0 text-primary" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="size-4 shrink-0 text-primary" />
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    WhatsApp-Chat starten
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="flex items-center gap-2 font-heading font-semibold">
                <Clock className="size-4 text-primary" /> Erreichbarkeit
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Täglich von 8:00 – 20:00 Uhr (Ostafrikanische Zeit).
                <br />
                Bei dringenden Anliegen während einer laufenden Tour erreichen Sie uns
                jederzeit per WhatsApp.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/60">
              <iframe
                title="Standort Nungwi, Sansibar"
                src="https://www.openstreetmap.org/export/embed.html?bbox=39.24,-5.76,39.32,-5.70&marker=-5.7269,39.2925&layer=mapnik"
                className="h-56 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
