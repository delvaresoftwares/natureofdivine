import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Feather } from "lucide-react";
import { blogPosts, BLOG } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogSidebar } from "@/components/BlogSidebar";
import { BuyBookSection } from "@/components/BuyBookSection";

export const metadata: Metadata = {
  title: "Blog & Reflections | Nature of the Divine",
  description:
    "Join the conversation on meditation, consciousness, spiritual awakening, and the soul journey. Reflections and articles by Alfas B, author of Nature of the Divine.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Reflections | Nature of the Divine",
    description:
      "Articles and reflections on meditation, mindfulness, consciousness, and spiritual awakening by Alfas B.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="bg-[#fdfbf7] text-slate-900">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Feather className="h-4 w-4" /> {BLOG.title}
          </div>
          <h1 className="text-4xl md:text-5xl font-headline mb-4">{BLOG.title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {BLOG.tagline}
          </p>
        </div>
      </section>

      {/* Blog posts + sidebar */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-headline">All reflections</h2>
              <span className="text-sm text-muted-foreground">{blogPosts.length} articles</span>
            </div>
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-6 md:p-7">
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">
                      {post.category}
                    </Badge>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-headline mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}

            {/* Newsletter CTA */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-headline mb-4">Reflections, delivered gently</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Join the circle of quiet seekers. No noise — just honest reflections on meditation, consciousness, and the soul journey, written by {SITE.author}.
              </p>
              <Button size="lg" className="rounded-full px-10 h-14 font-bold text-lg shadow-xl shadow-primary/20" asChild>
                <Link href="/checkout?variant=paperback">Begin with the Book <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>

            {/* Buy the book (mobile fallback) */}
            <div className="lg:hidden">
              <BuyBookSection />
            </div>
          </div>

          <BlogSidebar />
        </div>
      </section>
    </div>
  );
}
