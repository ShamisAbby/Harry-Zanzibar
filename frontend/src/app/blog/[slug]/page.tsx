import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd } from "@/lib/schema";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

async function loadPost(slug: string) {
  try {
    return await getBlogPost(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.image ? [post.image] : undefined,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await loadPost(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: post.image ?? undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
  ]);

  const faqLd = post.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <article className="pb-24 pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav className="py-4 text-sm text-muted-foreground">
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        {post.category && (
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {post.category}
          </span>
        )}
        <h1 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          {post.readingMinutes} Min. Lesezeit
          <span>·</span>
          {new Date(post.publishedAt).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          {post.image ? (
            <Image src={post.image} alt={post.imageLabel} fill className="object-cover" />
          ) : (
            <PlaceholderImage label={post.imageLabel} tone="palm" className="size-full" />
          )}
        </div>

        <div
          className="prose prose-neutral mt-10 max-w-none text-base leading-relaxed [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-xl font-semibold">Häufige Fragen</h2>
            <Accordion className="mt-4">
              {post.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        <div className="mt-12 rounded-2xl bg-primary/10 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold">
            Bereit für Ihre eigene Sansibar-Reise?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Lassen Sie sich von Harry persönlich beraten und finden Sie die perfekte Tour.
          </p>
          <Button render={<Link href="/sansibar-touren" />} nativeButton={false} className="mt-5 rounded-full px-8">
            Touren entdecken
          </Button>
        </div>
      </div>

      {post.relatedPosts.length > 0 && (
        <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold">Weitere Artikel</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {post.relatedPosts.map((related) => (
              <BlogPostCard key={related.id} post={related} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
