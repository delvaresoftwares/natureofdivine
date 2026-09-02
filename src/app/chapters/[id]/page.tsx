import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Lock } from "lucide-react";
import { allChapters } from "@/lib/data";
import { BOOK, SITE, SCHEMA } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return allChapters.map((chapter) => ({ id: chapter.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const chapter = allChapters.find((c) => c.id === id);
  if (!chapter) return {};

  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || "https://natureofthedivine.com";

  return {
    title: `Chapter ${chapter.number}: ${chapter.title} | Nature of the Divine`,
    description: `${chapter.tagline} — Chapter ${chapter.number} of Nature of the Divine, the spiritual philosophy book by ${SITE.author}. Explore ${chapter.title.toLowerCase()}, consciousness, meditation, and the soul journey.`,
    alternates: {
      canonical: `/chapters/${chapter.id}`,
    },
    openGraph: {
      title: `Chapter ${chapter.number}: ${chapter.title} | Nature of the Divine`,
      description: chapter.tagline,
      url: `/chapters/${chapter.id}`,
      type: "article",
    },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { id } = await params;
  const chapter = allChapters.find((c) => c.id === id);
  if (!chapter) notFound();

  const currentIndex = allChapters.findIndex((c) => c.id === id);
  const prevChapter = allChapters[currentIndex - 1];
  const nextChapter = allChapters[currentIndex + 1];

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Chapter ${chapter.number}: ${chapter.title}`,
    description: chapter.tagline,
    articleSection: "Book Chapter",
    inLanguage: "en",
    author: { "@type": "Person", name: SITE.author },
    publisher: { "@type": "Organization", name: SCHEMA.publisher },
    isPartOf: { "@type": "Book", name: BOOK.title },
  };

  return (
    <div className="bg-[#fdfbf7] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />

      {/* Header */}
      <section className="py-14 md:py-20 border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/chapters" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> All chapters
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-headline font-bold text-lg">
              {chapter.number}
            </div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">
              Chapter {chapter.number} of {BOOK.title}
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline mb-4">{chapter.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{chapter.tagline}</p>
          {chapter.locked && (
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Lock className="h-4 w-4" /> Full chapter available in the book
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="prose prose-slate max-w-none">
            <MarkdownRenderer content={chapter.body} />
          </div>

          {/* CTA */}
          <div className="mt-14 bg-slate-900 text-white rounded-2xl p-8 md:p-10 text-center">
            <BookOpen className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-headline mb-3">
              {chapter.locked ? "Read the full chapter" : "Continue the journey"}
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
              This glimpse is only the beginning. In {BOOK.title}, {SITE.author} unfolds each theme into a complete, practical path to inner peace and spiritual awakening.
            </p>
            <Button size="lg" className="rounded-full px-8 h-13 font-bold" asChild>
              <Link href="/checkout?variant=paperback">Buy the Book <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Prev / next */}
          <nav className="mt-10 flex flex-col sm:flex-row gap-4">
            {prevChapter ? (
              <Link
                href={`/chapters/${prevChapter.id}`}
                className="flex-1 group rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-all"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </span>
                <span className="mt-1 block font-headline group-hover:text-primary transition-colors">Chapter {prevChapter.number}: {prevChapter.title}</span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextChapter ? (
              <Link
                href={`/chapters/${nextChapter.id}`}
                className="flex-1 group rounded-2xl border border-slate-200 bg-white p-5 text-right hover:shadow-md transition-all"
              >
                <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1 block font-headline group-hover:text-primary transition-colors">Chapter {nextChapter.number}: {nextChapter.title}</span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>
        </div>
      </section>
    </div>
  );
}
