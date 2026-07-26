"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/tours/tour-card";
import { demoTours } from "@/data/demo-tours";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const filters = [
  { key: "all", label: "Alle Erlebnisse" },
  { key: "day-trip", label: "Tagesausflüge" },
  { key: "multi-day", label: "Mehrtagestouren" },
] as const;

export function FeaturedTours() {
  const [active, setActive] = useState<(typeof filters)[number]["key"]>("all");
  const containerRef = useScrollReveal<HTMLDivElement>("[data-reveal]");

  const tours =
    active === "all" ? demoTours : demoTours.filter((tour) => tour.category === active);

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

        <div className="mt-12 text-center">
          <Button
            render={<Link href="/sansibar-touren" />}
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
