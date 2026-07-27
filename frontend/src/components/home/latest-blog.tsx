import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getBlogPosts } from "@/lib/blog";

export async function LatestBlog() {
  const posts = await getBlogPosts({ perPage: 3 })
    .then((res) => res.data)
    .catch(() => []);

  if (posts.length === 0) return null;

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Vom Blog
            </span>
            <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
              Reisetipps & Insider-Wissen
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Alle Artikel <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
