import { api } from "@/lib/api";
import type {
  PaginatedResponse,
  TourCategory,
  TourDetail,
  TourSummary,
} from "@/types/tour";

export interface TourFilters {
  q?: string;
  category?: string;
  type?: "day-trip" | "multi-day";
  priceMin?: number;
  priceMax?: number;
  ratingMin?: number;
  featured?: boolean;
  sort?: "featured" | "price_asc" | "price_desc" | "rating_desc";
  perPage?: number;
}

function toQueryParams(filters: TourFilters) {
  return {
    q: filters.q,
    category: filters.category,
    type: filters.type,
    price_min: filters.priceMin,
    price_max: filters.priceMax,
    rating_min: filters.ratingMin,
    featured: filters.featured,
    sort: filters.sort,
    per_page: filters.perPage,
  };
}

export async function getTours(
  filters: TourFilters = {}
): Promise<PaginatedResponse<TourSummary>> {
  const { data } = await api.get<PaginatedResponse<TourSummary>>("/v1/tours", {
    params: toQueryParams(filters),
  });
  return data;
}

export async function getTour(slug: string): Promise<TourDetail> {
  const { data } = await api.get<{ data: TourDetail }>(`/v1/tours/${slug}`);
  return data.data;
}

export async function getTourCategories(): Promise<TourCategory[]> {
  const { data } = await api.get<{ data: TourCategory[] }>("/v1/tour-categories");
  return data.data;
}
