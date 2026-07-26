"use client";

import Link from "next/link";
import { Palmtree, Sailboat, Shell, Sun, Fish, Building2 } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const galleryItems = [
  { label: "Kendwa Sandbank", tone: "sand", icon: Sun },
  { label: "Traditionelle Dhau", tone: "ocean", icon: Sailboat },
  { label: "Korallenriff bei Mnemba", tone: "palm", icon: Fish },
  { label: "Stone Town Architektur", tone: "sunset", icon: Building2 },
  { label: "Palmen bei Paje", tone: "palm", icon: Palmtree },
  { label: "Muscheln am Strand", tone: "sand", icon: Shell },
] as const;

export function Gallery() {
  const containerRef = useScrollReveal<HTMLDivElement>("[data-reveal]");

  return (
    <section className="bg-[#FAF7F2] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Impressionen
            </span>
            <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
              Sansibar in Bildern
            </h2>
          </div>
          <Link
            href="/galerie"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Ganze Galerie ansehen →
          </Link>
        </div>

        <div
          ref={containerRef}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {galleryItems.map((item, i) => (
            <div
              key={item.label}
              data-reveal
              className={`group overflow-hidden rounded-2xl ${
                i === 0 || i === 3 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div className="relative aspect-square w-full transition-transform duration-500 group-hover:scale-105">
                <PlaceholderImage
                  label={item.label}
                  tone={item.tone}
                  icon={item.icon}
                  className="size-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
