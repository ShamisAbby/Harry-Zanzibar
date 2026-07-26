"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TourCard } from "@/components/tours/tour-card";
import { getTours } from "@/lib/tours";
import type { TourCategoryType, TourSummary } from "@/types/tour";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const filters: { key: TourCategoryType | "all"; label: string }[] = [
  { key: "all", label: "Alle Erlebnisse" },
  { key: "day-trip", label: "Tagesausflüge" },
  { key: "multi-day", label: "Mehrtagestouren" },
];

export function FeaturedTours() {
  const [active, setActive] = useState<(typeof filters)[number]["key"]>("all");
  const [tours, setTours] = useState<TourSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useScrollReveal<HTMLDivElement>("[data-reveal]");

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(false);

    getTours({ type: active === "all" ? undefined : active, perPage: 6, sort: "featured" })
      .then((res) => {
        if (!cancelled) setTours(res.data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Erlebnisse
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            Unsere beliebtesten Touren & Ausflüge
          </h2>
          <p className="mt-4 text-muted-foreground">
            Von entspannten Halbtagesausflügen bis zu individuell geplanten Mehrtagesreisen –
            jede Tour wird persönlich von Harry geführt.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActive(filter.key)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                active === filter.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {error ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Touren konnten momentan nicht geladen werden. Bitte versuchen Sie es später erneut.
          </p>
        ) : isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div
            ref={containerRef}
            key={active}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {tours.map((tour) => (
              <div key={tour.id} data-reveal>
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            render={<Link href="/sansibar-touren" />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="rounded-full px-8"
          >
            Alle Touren ansehen
          </Button>
        </div>
      </div>
    </section>
  );
}
