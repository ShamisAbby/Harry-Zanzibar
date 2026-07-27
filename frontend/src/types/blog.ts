export interface BlogPostFaq {
  question: string;
  answer: string;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  categorySlug: string | null;
  readingMinutes: number;
  publishedAt: string;
  image: string | null;
  imageLabel: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
  faqs: BlogPostFaq[];
  metaTitle: string | null;
  metaDescription: string | null;
  relatedPosts: BlogPostSummary[];
}
