import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getTours } from "@/lib/tours";
import { getBlogPosts } from "@/lib/blog";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/ueber-harry", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/sansibar-touren", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/sansibar-touren/tagesausfluege", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/sansibar-touren/mehrtagestouren", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/galerie", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/bewertungen", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/kontakt", priority: 0.6, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, posts] = await Promise.all([
    getTours({ perPage: 50 }).then((res) => res.data).catch(() => []),
    getBlogPosts({ perPage: 50 }).then((res) => res.data).catch(() => []),
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...tours.map((tour) => ({
      url: `${siteConfig.url}/sansibar-touren/${tour.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
