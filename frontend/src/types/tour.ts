export type TourCategoryType = "day-trip" | "multi-day";

export interface TourSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: TourCategoryType;
  categoryName: string;
  durationLabel: string;
  priceFrom: number;
  currency: "EUR" | "USD";
  rating: number;
  reviewCount: number;
  image: string | null;
  imageLabel: string;
  highlights: string[];
}

export interface TourFaq {
  question: string;
  answer: string;
}

export interface TourReview {
  id: string;
  name: string;
  origin: string | null;
  rating: number;
  comment: string;
  source: "website" | "google" | "tripadvisor";
  createdAt: string | null;
}

export interface TourGalleryItem {
  url: string;
  thumbUrl: string;
  label: string;
}

export interface TourDetail extends Omit<TourSummary, "image" | "imageLabel"> {
  description: string;
  categorySlug: string;
  durationDays: number | null;
  included: string[];
  excluded: string[];
  faqs: TourFaq[];
  availableDays: string[];
  availabilityNote: string | null;
  location: {
    name: string | null;
    latitude: number | null;
    longitude: number | null;
  };
  gallery: TourGalleryItem[];
  videos: { url: string; label: string }[];
  reviews: TourReview[];
  relatedTours: TourSummary[];
}

export interface TourCategory {
  id: string;
  name: string;
  slug: string;
  type: TourCategoryType;
  description: string | null;
  tourCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    total: number;
    perPage: number;
  };
}
