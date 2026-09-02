import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Check, ShoppingBag } from "lucide-react";
import { BOOK, buyLinks, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function BuyBookSection({ compact = false }: { compact?: boolean }) {
  return (
    <div className="bg-slate-900 text-white rounded-2xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
          <BookOpen className="h-4 w-4" /> Buy the Book
        </div>
        <h3 className="text-2xl font-headline mb-3">Buy {BOOK.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          {compact
            ? "Every reflection here grows from the same soil as Alfas B's book."
            : `Every article you read here grows from the same soil as ${SITE.author}'s book — a complete, practical path to inner peace and spiritual awakening.`}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <Button
            size="lg"
            className="rounded-full font-bold bg-primary hover:bg-primary/90"
            asChild
          >
            <Link href="/checkout?variant=paperback">
              <ShoppingBag className="mr-2 h-4 w-4" /> Buy the Book <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full font-bold bg-transparent border-white/40 text-white hover:bg-white hover:text-black"
            asChild
          >
            <Link href="/chapters">Explore the Chapters</Link>
          </Button>
        </div>

        {!compact && (
          <>
            <div className="flex items-center gap-4 py-4 border-t border-white/10">
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md shadow-lg">
                <Image
                  src={BOOK.coverImage}
                  alt={BOOK.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-headline font-bold">{BOOK.title}</p>
                <p className="text-sm text-slate-400">by {SITE.author}</p>
                <p className="text-sm text-primary font-semibold mt-1">
                  {BOOK.currency} {BOOK.price.toLocaleString()} · Paperback
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              {buyLinks
                .filter((l) => l.visible)
                .map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Check className="h-4 w-4 text-primary" /> Buy on {link.name}
                  </a>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
