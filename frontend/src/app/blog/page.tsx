import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog – Reisetipps für Sansibar",
  description:
    "Reisetipps, Insider-Wissen und praktische Informationen für Ihre Sansibar-Reise – von Harry, Ihrem deutschsprachigen Guide vor Ort.",
  alternates: { canonical: "/blog" },
};

// Blog content changes infrequently; ISR avoids hitting the API on every request.
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPosts({ perPage: 24 })
    .then((res) => res.data)
    .catch(() => []);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Blog
          </span>
          <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
            Reisetipps & Insider-Wissen
          </h1>
          <p className="mt-4 text-muted-foreground">
            Alles, was Sie für Ihre Sansibar-Reise wissen sollten – von der besten Reisezeit
            bis zu den schönsten Stränden der Insel.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 text-muted-foreground">
            Bald finden Sie hier unsere ersten Reiseartikel.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
