import type { Metadata } from "next";
import { TourListing } from "@/components/tours/tour-listing";

export const metadata: Metadata = {
  title: "Sansibar Touren & Ausflüge",
  description:
    "Alle Sansibar Touren im Überblick: Tagesausflüge und Mehrtagestouren, persönlich geführt von Ihrem deutschsprachigen Guide Harry.",
  alternates: { canonical: "/sansibar-touren" },
};

export default function SansibarTourenPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Sansibar Touren
          </span>
          <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
            Finden Sie Ihre perfekte Sansibar-Erfahrung
          </h1>
          <p className="mt-4 text-muted-foreground">
            Von kompakten Tagesausflügen bis zu individuell geplanten Mehrtagesreisen –
            durchsuchen Sie unser komplettes Angebot an persönlich geführten Touren.
          </p>
        </div>

        <div className="mt-12">
          <TourListing />
        </div>
      </div>
    </div>
  );
}
