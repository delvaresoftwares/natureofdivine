import Link from "next/link";
import { Feather, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { BuyBookSection } from "@/components/BuyBookSection";

export function BlogSidebar({ currentSlug }: { currentSlug?: string }) {
  const bookReflections = blogPosts.filter((p) => (p as { isBookReflection?: boolean }).isBookReflection);
  const generalPosts = blogPosts.filter((p) => !(p as { isBookReflection?: boolean }).isBookReflection);

  const recent = [...blogPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 8);

  return (
    <aside className="hidden lg:block w-72 shrink-0 space-y-8">
      <BuyBookSection compact />

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
                  currentSlug === post.slug ? "text-primary font-semibold" : "text-slate-700"
                }`}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
          <Feather className="h-4 w-4" /> From the Book
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Chapter-by-chapter reflections quoting the actual text of <em>Nature of the Divine</em>.
        </p>
        <ul className="space-y-3">
          {bookReflections.slice(0, 8).map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className={`text-sm leading-snug hover:text-primary transition-colors ${
                  currentSlug === post.slug ? "text-primary font-semibold" : "text-slate-700"
                }`}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {generalPosts.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
            Explore {generalPosts.length}+ More Articles
          </div>
          <p className="text-sm text-muted-foreground">Browse the full library of reflections and guides.</p>
        </div>
      )}
    </aside>
  );
}
