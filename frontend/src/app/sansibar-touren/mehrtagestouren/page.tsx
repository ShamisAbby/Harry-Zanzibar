import type { Metadata } from "next";
import { TourListing } from "@/components/tours/tour-listing";

export const metadata: Metadata = {
  title: "Sansibar Mehrtagestouren",
  description:
    "Individuell geplante Mehrtagesreisen auf Sansibar – private Strandvillen, persönliche Betreuung und maßgeschneiderte Erlebnisse.",
  alternates: { canonical: "/sansibar-touren/mehrtagestouren" },
};

export default function MehrtagestourenPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Mehrtagestouren
          </span>
          <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
            Tiefer eintauchen in Sansibar
          </h1>
          <p className="mt-4 text-muted-foreground">
            Für alle, die mehr Zeit mitbringen: individuell geplante Reisen, persönlich
            begleitet von Harry, von der Ankunft bis zur Abreise.
          </p>
        </div>

        <div className="mt-12">
          <TourListing fixedType="multi-day" />
        </div>
      </div>
    </div>
  );
}
