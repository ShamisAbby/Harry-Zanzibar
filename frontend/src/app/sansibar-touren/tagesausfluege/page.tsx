import type { Metadata } from "next";
import { TourListing } from "@/components/tours/tour-listing";

export const metadata: Metadata = {
  title: "Sansibar Tagesausflüge",
  description:
    "Alle Sansibar Tagesausflüge im Überblick: Safari Blue, Mnemba Island, Stone Town und mehr – persönlich geführt auf Deutsch.",
};

export default function TagesausfluegePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Tagesausflüge
          </span>
          <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
            Sansibar an einem Tag erleben
          </h1>
          <p className="mt-4 text-muted-foreground">
            Kompakte, unvergessliche Erlebnisse – ideal, wenn Ihre Zeit begrenzt ist, aber Ihr
            Entdeckerdrang groß.
          </p>
        </div>

        <div className="mt-12">
          <TourListing fixedType="day-trip" />
        </div>
      </div>
    </div>
  );
}
