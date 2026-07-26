import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Badge } from "@/components/ui/badge";
import type { TourSummary } from "@/types/tour";

export function TourCard({ tour }: { tour: TourSummary }) {
  return (
    <Link
      href={`/sansibar-touren/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.imageLabel}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage
            label={tour.imageLabel}
            tone={tour.category === "multi-day" ? "sunset" : "ocean"}
            className="size-full transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <Badge className="absolute left-3 top-3 bg-white/90 text-foreground hover:bg-white/90">
          {tour.category === "multi-day" ? "Mehrtagestour" : "Tagesausflug"}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-[#F2C66D]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-3.5"
              fill={i < Math.round(tour.rating) ? "currentColor" : "none"}
              strokeWidth={i < Math.round(tour.rating) ? 0 : 1.5}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            {tour.rating.toFixed(1)} ({tour.reviewCount})
          </span>
        </div>

        <h3 className="mt-3 font-heading text-lg font-semibold transition-colors group-hover:text-primary">
          {tour.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {tour.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {tour.durationLabel}
          </span>
          <span className="font-heading text-lg font-semibold text-primary">
            ab {tour.priceFrom}€
          </span>
        </div>
      </div>
    </Link>
  );
}
