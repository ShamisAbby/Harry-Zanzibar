import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, MapPin, Star, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { TourCard } from "@/components/tours/tour-card";
import { BookingForm } from "@/components/tours/booking-form";
import { TourMap } from "@/components/tours/tour-map";
import { getTour } from "@/lib/tours";
import { breadcrumbJsonLd } from "@/lib/schema";
import { siteConfig } from "@/config/site";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

async function loadTour(slug: string) {
  try {
    return await getTour(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await loadTour(slug);
  if (!tour) return {};

  return {
    title: tour.title,
    description: tour.excerpt,
    alternates: {
      canonical: `/sansibar-touren/${tour.slug}`,
    },
    openGraph: {
      title: tour.title,
      description: tour.excerpt,
      type: "website",
      images: tour.gallery[0] ? [tour.gallery[0].url] : undefined,
    },
  };
}

const dayLabels: Record<string, string> = {
  mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So",
};

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = await loadTour(slug);

  if (!tour) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.excerpt,
    touristType: "Leisure",
    offers: {
      "@type": "Offer",
      price: tour.priceFrom,
      priceCurrency: tour.currency,
    },
    aggregateRating: tour.reviewCount
      ? {
          "@type": "AggregateRating",
          ratingValue: tour.rating,
          reviewCount: tour.reviewCount,
        }
      : undefined,
  };

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Sansibar Touren", url: `${siteConfig.url}/sansibar-touren` },
    { name: tour.title, url: `${siteConfig.url}/sansibar-touren/${tour.slug}` },
  ]);

  const faqLd = tour.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tour.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <div className="pb-24 pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      {/* Gallery */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="py-4 text-sm text-muted-foreground">
          <Link href="/sansibar-touren" className="hover:text-primary">Sansibar Touren</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{tour.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2">
          {tour.gallery.length > 0 ? (
            tour.gallery.slice(0, 5).map((item, i) => (
              <div
                key={item.url}
                className={`relative aspect-[4/3] ${i === 0 ? "sm:col-span-2 sm:row-span-2 sm:aspect-auto" : ""}`}
              >
                <Image src={item.url} alt={item.label} fill className="object-cover" />
              </div>
            ))
          ) : (
            <PlaceholderImage
              label={tour.title}
              tone={tour.category === "multi-day" ? "sunset" : "ocean"}
              className="aspect-[16/9] sm:col-span-4 sm:row-span-2 sm:aspect-auto"
            />
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{tour.category === "multi-day" ? "Mehrtagestour" : "Tagesausflug"}</Badge>
            {tour.reviewCount > 0 && (
              <div className="flex items-center gap-1 text-[#F2C66D]">
                <Star className="size-4" fill="currentColor" strokeWidth={0} />
                <span className="text-sm font-medium text-foreground">
                  {tour.rating.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">({tour.reviewCount} Bewertungen)</span>
              </div>
            )}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">{tour.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{tour.excerpt}</p>

          <div className="mt-6 flex flex-wrap gap-6 border-y border-border/60 py-5 text-sm">
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-primary" /> {tour.durationLabel}
            </span>
            {tour.location.name && (
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> {tour.location.name}
              </span>
            )}
          </div>

          {tour.highlights.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold">Highlights</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tour.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#2F855A]" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-heading text-xl font-semibold">Über diese Tour</h2>
            <div
              className="prose prose-neutral mt-4 max-w-none text-sm leading-relaxed [&_p]:mb-4"
              dangerouslySetInnerHTML={{ __html: tour.description }}
            />
          </div>

          {(tour.included.length > 0 || tour.excluded.length > 0) && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {tour.included.length > 0 && (
                <div>
                  <h3 className="font-heading font-semibold">Inklusive</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {tour.included.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-[#2F855A]" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tour.excluded.length > 0 && (
                <div>
                  <h3 className="font-heading font-semibold">Exklusive</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {tour.excluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-muted-foreground">
                        <X className="mt-0.5 size-4 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {tour.availableDays.length > 0 && (
            <div className="mt-8">
              <h3 className="font-heading font-semibold">Verfügbarkeit</h3>
              <div className="mt-3 flex gap-2">
                {Object.entries(dayLabels).map(([key, label]) => (
                  <span
                    key={key}
                    className={`flex size-9 items-center justify-center rounded-full text-xs font-medium ${
                      tour.availableDays.includes(key)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground/50"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
              {tour.availabilityNote && (
                <p className="mt-3 text-sm text-muted-foreground">{tour.availabilityNote}</p>
              )}
            </div>
          )}

          {tour.location.latitude && tour.location.longitude && (
            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold">Lage</h2>
              <div className="mt-4">
                <TourMap
                  latitude={tour.location.latitude}
                  longitude={tour.location.longitude}
                  locationName={tour.location.name}
                />
              </div>
            </div>
          )}

          {tour.faqs.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold">Häufige Fragen</h2>
              <Accordion className="mt-4">
                {tour.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {tour.reviews.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold">Bewertungen</h2>
              <div className="mt-4 space-y-4">
                {tour.reviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-border/60 p-5">
                    <div className="flex items-center gap-1 text-[#F2C66D]">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="mt-2 text-sm">&bdquo;{review.comment}&ldquo;</p>
                    <p className="mt-3 text-xs font-medium text-muted-foreground">
                      {review.name}
                      {review.origin ? ` · ${review.origin}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <p className="text-sm text-muted-foreground">Preis pro Person ab</p>
              <p className="mt-1 font-heading text-3xl font-semibold text-primary">
                {tour.priceFrom}€
              </p>
            </div>
            <BookingForm tourId={tour.id} tourTitle={tour.title} />
          </div>
        </div>
      </div>

      {tour.relatedTours.length > 0 && (
        <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold">Das könnte Ihnen auch gefallen</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {tour.relatedTours.map((related) => (
              <TourCard key={related.id} tour={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
