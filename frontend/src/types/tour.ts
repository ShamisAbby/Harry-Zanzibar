export type TourCategory = "day-trip" | "multi-day";

export interface TourSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: TourCategory;
  durationLabel: string;
  priceFrom: number;
  currency: "EUR" | "USD";
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
}
