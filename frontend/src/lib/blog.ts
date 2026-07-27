import { api } from "@/lib/api";
import type { PaginatedResponse } from "@/types/tour";
import type { BlogPostDetail, BlogPostSummary } from "@/types/blog";

export interface BlogFilters {
  q?: string;
  category?: string;
  perPage?: number;
}

export async function getBlogPosts(
  filters: BlogFilters = {}
): Promise<PaginatedResponse<BlogPostSummary>> {
  const { data } = await api.get<PaginatedResponse<BlogPostSummary>>("/v1/blog", {
    params: { q: filters.q, category: filters.category, per_page: filters.perPage },
  });
  return data;
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail> {
  const { data } = await api.get<{ data: BlogPostDetail }>(`/v1/blog/${slug}`);
  return data.data;
}
