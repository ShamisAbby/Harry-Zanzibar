export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  quote: string;
  rating: number;
  tourTitle?: string;
  avatar?: string;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readingTime: string;
  publishedAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}
