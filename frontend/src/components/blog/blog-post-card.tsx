import Image from "next/image";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Badge } from "@/components/ui/badge";
import type { BlogPostSummary } from "@/types/blog";

export function BlogPostCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageLabel}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage
            label={post.imageLabel}
            tone="palm"
            className="size-full transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {post.category && (
          <Badge className="absolute left-3 top-3 bg-white/90 text-foreground hover:bg-white/90">
            {post.category}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <p className="mt-4 text-xs text-muted-foreground">{post.readingMinutes} Min. Lesezeit</p>
      </div>
    </Link>
  );
}
