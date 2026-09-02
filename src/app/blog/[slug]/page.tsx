import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Feather } from "lucide-react";
import { blogPosts, allChapters } from "@/lib/data";
import { BOOK, SITE, SCHEMA } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogSidebar } from "@/components/BlogSidebar";
import { BuyBookSection } from "@/components/BuyBookSection";
import { TrackBlogView } from "@/components/TrackBlogView";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || "https://natureofthedivine.com";

  return {
    title: `${post.title} | Nature of the Divine Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Nature of the Divine`,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      images: [{ url: post.coverImage, alt: post.title }],
      siteName: "Nature of the Divine",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedChapters = allChapters.slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    isPartOf: { "@type": "Blog", name: "Reflections on the Divine" },
    author: { "@type": "Person", name: SITE.author },
    publisher: { "@type": "Organization", name: SCHEMA.publisher },
    articleSection: post.category,
    inLanguage: "en",
  };

  return (
    <div className="bg-[#fdfbf7] text-slate-900">
      <TrackBlogView slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header */}
      <section className="py-12 md:py-16 border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> All reflections
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
            <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">
              {post.category}
            </Badge>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>By {SITE.author}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline leading-tight">{post.title}</h1>
        </div>
      </section>

      {/* Hero image */}
      <div className="relative aspect-[21/9] w-full">
        <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
      </div>

      {/* Body */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0 max-w-2xl mx-auto lg:mx-0 w-full">
            <div className="prose prose-slate max-w-none">
              <MarkdownRenderer content={post.body} />
            </div>

            {/* CTA */}
            <div className="mt-14 bg-slate-900 text-white rounded-2xl p-8 md:p-10">
              <Feather className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl font-headline mb-3">Deeper than an article</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Every reflection here grows from the same soil as {SITE.author}&apos;s book. In {BOOK.title}, these themes unfold into a complete, practical path to inner peace and spiritual awakening.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="rounded-full font-bold" asChild>
                  <Link href="/checkout?variant=paperback">Buy the Book <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full font-bold bg-transparent border-white/40 text-white hover:bg-white hover:text-black" asChild>
                  <Link href="/chapters">Explore the Chapters</Link>
                </Button>
              </div>
            </div>

            {/* Related chapters */}
            <div className="mt-12">
              <h2 className="text-xl font-headline mb-4">Related chapters from the book</h2>
              <div className="space-y-3">
                {relatedChapters.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/chapters/${chapter.id}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md transition-all"
                  >
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-headline font-bold text-sm shrink-0">
                      {chapter.number}
                    </div>
                    <span className="font-headline group-hover:text-primary transition-colors">{chapter.title}</span>
                    <ArrowRight className="ml-auto h-4 w-4 text-primary" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Buy the book (mobile fallback) */}
            <div className="mt-12 lg:hidden">
              <BuyBookSection />
            </div>
          </div>

          <BlogSidebar currentSlug={slug} />
        </div>
      </section>
    </div>
  );
}
