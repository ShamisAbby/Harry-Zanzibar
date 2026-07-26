import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBookingByReference } from "@/lib/bookings";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Buchungsstatus",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ ref?: string }>;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-[#F2C66D]",
    title: "Anfrage eingegangen",
    text: "Harry meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.",
  },
  confirmed: {
    icon: CheckCircle2,
    color: "text-[#2F855A]",
    title: "Buchung bestätigt",
    text: "Wir freuen uns auf Sie! Sie erhalten alle Details auch per E-Mail.",
  },
  cancelled: {
    icon: XCircle,
    color: "text-destructive",
    title: "Buchung storniert",
    text: "Diese Buchung wurde storniert. Bei Fragen kontaktieren Sie uns gerne.",
  },
  completed: {
    icon: CheckCircle2,
    color: "text-primary",
    title: "Reise abgeschlossen",
    text: "Wir hoffen, Sie hatten eine wundervolle Zeit auf Sansibar!",
  },
} as const;

export default async function BuchungBestaetigungPage({ searchParams }: PageProps) {
  const { ref } = await searchParams;
  const booking = ref
    ? await getBookingByReference(ref).catch(() => null)
    : null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-lg rounded-2xl border border-border/60 bg-card p-8 text-center">
        {!booking ? (
          <>
            <HelpCircle className="mx-auto size-12 text-muted-foreground" />
            <h1 className="mt-4 font-heading text-2xl font-semibold">
              Buchung nicht gefunden
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Wir konnten unter dieser Referenz keine Buchung finden. Bitte prüfen Sie den
              Link aus Ihrer Bestätigungs-E-Mail.
            </p>
          </>
        ) : (
          (() => {
            const config = statusConfig[booking.status];
            const Icon = config.icon;
            return (
              <>
                <Icon className={`mx-auto size-12 ${config.color}`} />
                <h1 className="mt-4 font-heading text-2xl font-semibold">{config.title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{config.text}</p>

                <div className="mt-6 space-y-2 rounded-xl bg-muted p-5 text-left text-sm">
                  <p>
                    <span className="text-muted-foreground">Referenz:</span>{" "}
                    <strong>{booking.reference}</strong>
                  </p>
                  {booking.tourTitle && (
                    <p>
                      <span className="text-muted-foreground">Tour:</span> {booking.tourTitle}
                    </p>
                  )}
                  {booking.preferredDate && (
                    <p>
                      <span className="text-muted-foreground">Datum:</span>{" "}
                      {new Date(booking.preferredDate).toLocaleDateString("de-DE")}
                    </p>
                  )}
                  {booking.travelersCount && (
                    <p>
                      <span className="text-muted-foreground">Personen:</span>{" "}
                      {booking.travelersCount}
                    </p>
                  )}
                </div>
              </>
            );
          })()
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button render={<Link href="/sansibar-touren" />} nativeButton={false} className="rounded-full">
            Weitere Touren entdecken
          </Button>
          <Button
            render={
              <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" />
            }
            nativeButton={false}
            variant="outline"
            className="rounded-full"
          >
            WhatsApp Kontakt
          </Button>
        </div>
      </div>
    </div>
  );
}
