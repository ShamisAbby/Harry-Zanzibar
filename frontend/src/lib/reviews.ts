import { api } from "@/lib/api";

export interface PublicReview {
  id: string;
  name: string;
  origin: string | null;
  rating: number;
  comment: string;
  source: "website" | "google" | "tripadvisor";
  tourTitle: string | null;
  tourSlug: string | null;
  createdAt: string;
}

export async function getReviews(perPage = 20): Promise<PublicReview[]> {
  const { data } = await api.get<{ data: PublicReview[] }>("/v1/reviews", {
    params: { per_page: perPage },
  });
  return data.data;
}
