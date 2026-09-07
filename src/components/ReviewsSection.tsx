import Link from "next/link";
import { BadgeCheck, ExternalLink, Quote, Star } from "lucide-react";
import { EXTERNAL_REVIEWS, PLATFORM_RATINGS } from "@/lib/reviews-data";
import type { ReviewPlatform } from "@/lib/reviews-data";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: ReviewPlatform }) {
  const color = platform === "Amazon" ? "bg-[#FF9900]/10 text-[#B5651D] border-[#FF9900]/30" : "bg-sky-500/10 text-sky-700 border-sky-500/30";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${color}`}>
      {platform}
    </span>
  );
}

export function ReviewsSection() {
  const ratings = ["Amazon", "Flipkart"] as ReviewPlatform[];

  return (
    <section id="reviews" className="scroll-mt-24 py-20 md:py-24 border-b border-slate-200 bg-[#fdfbf7]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <Quote className="h-4 w-4" /> Reader Reviews
          </div>
          <h2 className="text-3xl md:text-5xl font-headline mb-4">Rated 5/5 by readers on Amazon &amp; Flipkart</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Honest words from genuine readers who began their soul journey with the book.
          </p>
        </div>

        {/* Platform ratings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {ratings.map((platform) => {
            const { rating, count, url } = PLATFORM_RATINGS[platform];
            return (
              <Link
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <PlatformBadge platform={platform} />
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-headline font-bold">{rating.toFixed(1)}</span>
                  <div>
                    <Stars rating={rating} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on {count} rating{count === 1 ? "" : "s"} on {platform}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXTERNAL_REVIEWS.map((review) => (
            <figure
              key={review.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <Stars rating={review.rating} />
                <PlatformBadge platform={review.platform} />
              </div>
              <blockquote className="text-slate-600 leading-relaxed text-sm flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-slate-100">
                <p className="font-headline font-bold text-sm">{review.title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <p className="text-sm text-muted-foreground">{review.name}</p>
                  {review.verified && (
                    <BadgeCheck className="h-4 w-4 text-emerald-500" aria-label="Verified purchase" />
                  )}
                  {review.date && (
                    <span className="text-xs text-muted-foreground/70">· {review.date}</span>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-muted-foreground">
          Read every review on{" "}
          <Link
            href={PLATFORM_RATINGS.Amazon.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline"
          >
            Amazon
          </Link>{" "}
          or{" "}
          <Link
            href={PLATFORM_RATINGS.Flipkart.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline"
          >
            Flipkart
          </Link>
          .
        </p>
      </div>
    </section>
  );
}