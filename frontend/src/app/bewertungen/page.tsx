import type { Metadata } from "next";
import Link from "next/link";
import { Quote, Star } from "lucide-react";
import { getReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Bewertungen",
  description:
    "Echte Bewertungen unserer Gäste – lesen Sie, wie andere Reisende ihre Sansibar-Touren mit Harry erlebt haben.",
  alternates: { canonical: "/bewertungen" },
};

export default async function BewertungenPage() {
  const reviews = await getReviews(30).catch(() => []);
  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "4.9";

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Bewertungen
          </span>
          <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
            Was unsere Gäste sagen
          </h1>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex text-[#F2C66D]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="font-heading text-lg font-semibold">{average}/5</span>
            <span className="text-sm text-muted-foreground">({reviews.length}+ Bewertungen)</span>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="mt-12 text-muted-foreground">
            Bald finden Sie hier die ersten Gästebewertungen.
          </p>
        ) : (
          <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {reviews.map((review) => (
              <figure
                key={review.id}
                className="mb-6 break-inside-avoid rounded-2xl border border-border/60 bg-card p-6"
              >
                <Quote className="size-6 text-primary/30" />
                <div className="mt-2 flex text-[#F2C66D]">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
                  „{review.comment}“
                </blockquote>
                <figcaption className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{review.name}</span>
                  {review.origin ? ` · ${review.origin}` : ""}
                  {review.tourSlug && review.tourTitle && (
                    <>
                      {" · "}
                      <Link href={`/sansibar-touren/${review.tourSlug}`} className="hover:text-primary">
                        {review.tourTitle}
                      </Link>
                    </>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
