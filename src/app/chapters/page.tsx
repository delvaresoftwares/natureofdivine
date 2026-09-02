import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Lock } from "lucide-react";
import { allChapters } from "@/lib/data";
import { BOOK, SITE, SCHEMA } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Chapters | Nature of the Divine by Alfas B",
  description:
    "Explore the chapters of Nature of the Divine, the spiritual philosophy book by Alfas B. Read full chapter overviews on God, consciousness, the soul journey, meditation, and spiritual awakening.",
  alternates: {
    canonical: "/chapters",
  },
  openGraph: {
    title: "Chapters | Nature of the Divine by Alfas B",
    description:
      "Read the full chapter guide to Nature of the Divine — the spiritual philosophy book on consciousness, the soul journey, and inner peace.",
    url: "/chapters",
    type: "website",
  },
};

export default function ChaptersPage() {
  return (
    <div className="bg-[#fdfbf7] text-slate-900">
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <BookOpen className="h-4 w-4" /> Inside the book
          </div>
          <h1 className="text-4xl md:text-5xl font-headline mb-4">The Chapters of</h1>
          <p className="text-3xl md:text-4xl font-headline text-primary italic mb-6">Nature of the Divine</p>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            A guide to the soul journey — from the first quiet question to the lightness of alignment with the divine. Each chapter explores an essential theme of spiritual awakening: consciousness, meditation, divine intelligence, and inner peace.
          </p>
        </div>
      </section>

      {/* Chapter list */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-6">
            {allChapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.id}`}
                className="group block bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-headline font-bold text-lg shrink-0">
                    {chapter.number}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      Chapter {chapter.number}
                    </p>
                    <h2 className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
                      {chapter.title}
                    </h2>
                  </div>
                  {chapter.locked ? (
                    <Lock className="h-5 w-5 text-muted-foreground/50" />
                  ) : (
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                  {chapter.tagline}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-headline mb-4">Ready to read the full book?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
              These chapter overviews only hint at the journey. In the book, each theme unfolds into practical reflection and meditation for your own spiritual awakening.
            </p>
            <Button size="lg" className="rounded-full px-10 h-14 font-bold text-lg shadow-xl shadow-primary/20" asChild>
              <Link href="/checkout?variant=paperback">
                Buy {BOOK.title} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
