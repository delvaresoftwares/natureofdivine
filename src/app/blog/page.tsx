import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Feather } from "lucide-react";
import { blogPosts, BLOG } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { BlogSidebar } from "@/components/BlogSidebar";
import { BuyBookSection } from "@/components/BuyBookSection";
import { BlogPagination } from "@/components/BlogPagination";

export const metadata: Metadata = {
  title: "Blog & Reflections | Nature of the Divine",
  description:
    "Join the conversation on meditation, consciousness, spiritual awakening, and the soul journey. Reflections and articles by Alfas B, author of Nature of the Divine.",
  keywords: [
    "spiritual blog", "meditation reflections", "consciousness articles", "soul journey blog",
    "spiritual awakening", "Nature of the Divine", "Alfas B", "mindfulness blog",
    "inner peace articles", "meditation practice"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Reflections | Nature of the Divine",
    description:
      "Articles and reflections on meditation, mindfulness, consciousness, and spiritual awakening by Alfas B.",
    url: "/blog",
    type: "website",
    siteName: "Nature of the Divine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Reflections | Nature of the Divine",
    description:
      "Articles and reflections on meditation, mindfulness, consciousness, and spiritual awakening by Alfas B.",
  },
};

export default function BlogPage() {
  return (
    <div className="bg-[#fdfbf7] text-slate-900">
      {/* Header */}
      <section className="py-14 md:py-20 border-b border-slate-200/60 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Feather className="h-4 w-4" /> {BLOG.title}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline mb-4 tracking-tight">
            {BLOG.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {BLOG.tagline}
          </p>
        </div>
      </section>

      {/* Blog posts + sidebar */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row gap-10">
          {/* Main column */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <h2 className="text-xl md:text-2xl font-headline">All reflections</h2>
              <span className="text-xs text-muted-foreground font-medium">{blogPosts.length} articles</span>
            </div>

            <BlogPagination posts={blogPosts} />

            {/* Newsletter CTA */}
            <div className="mt-14 bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-headline mb-4">Reflections, delivered gently</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Join the circle of quiet seekers. No noise — just honest reflections on meditation, consciousness, and the soul journey, written by {SITE.author}.
              </p>
              <Button
                size="lg"
                className="rounded-full px-10 h-14 font-bold text-lg shadow-xl shadow-primary/20"
                asChild
              >
                <Link href="/checkout?variant=paperback">
                  Begin with the Book <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Buy the book (mobile fallback) */}
            <div className="mt-10 lg:hidden">
              <BuyBookSection />
            </div>
          </div>

          <BlogSidebar />
        </div>
      </section>
    </div>
  );
}
