import Link from "next/link";
import { CornerDownRight, Feather, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { BuyBookSection } from "@/components/BuyBookSection";

export function BlogSidebar({ currentSlug }: { currentSlug?: string }) {
  const bookReflections = blogPosts.filter(
    (p) => (p as { isBookReflection?: boolean }).isBookReflection
  );
  const generalPosts = blogPosts.filter(
    (p) => !(p as { isBookReflection?: boolean }).isBookReflection
  );

  const recent = [...blogPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  return (
    <aside className="w-full lg:w-72 lg:shrink-0 space-y-8">
      <BuyBookSection compact />

      {/* Recent Reflections — shown on all screens */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
          <Sparkles className="h-4 w-4" /> Recent Reflections
        </div>
        <ul className="space-y-3">
          {recent.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className={`text-sm leading-snug hover:text-primary transition-colors ${
                  currentSlug === post.slug
                    ? "text-primary font-semibold"
                    : "text-slate-700"
                }`}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* From the Book reflections */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
          <Feather className="h-4 w-4" /> From the Book
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Chapter-by-chapter reflections quoting the actual text of{" "}
          <em>Nature of the Divine</em>.
        </p>
        <ul className="space-y-3">
          {bookReflections.slice(0, 6).map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className={`text-sm leading-snug hover:text-primary transition-colors ${
                  currentSlug === post.slug
                    ? "text-primary font-semibold"
                    : "text-slate-700"
                }`}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/blog"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary"
        >
          View all <CornerDownRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {generalPosts.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
            Explore {generalPosts.length}+ More Articles
          </div>
          <p className="text-sm text-muted-foreground">
            Browse the full library of reflections and guides in the main column.
          </p>
        </div>
      )}
    </aside>
  );
}
