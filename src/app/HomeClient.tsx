'use client';

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/actions";
import { BOOK, HOME, HOME_FAQ, synopsis, authorBio, buyLinks, sampleChapters } from "@/lib/constants";
import { BookImage } from "@/components/BookImage";
import {
  Sparkles,
  ArrowRight,
  Star,
  Truck,
  BookOpen,
  ShieldCheck,
  ScrollText,
  Feather,
  Quote,
  HelpCircle,
} from "lucide-react";
import type { SampleChapter } from "@/lib/definitions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FEATURE_ICONS: Record<string, typeof Star> = {
  star: Star,
  truck: Truck,
  shield: ShieldCheck,
};

function ChapterCard({ chapter, index }: { chapter: SampleChapter; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-headline font-bold text-lg shrink-0">
          {chapter.number}
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Chapter {chapter.number}</p>
          <h3 className="font-headline text-lg leading-tight">{chapter.title}</h3>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{chapter.content}</p>
    </motion.div>
  );
}

export function HomeClient({ initialChapters }: { initialChapters: SampleChapter[] }) {
  useEffect(() => {
    trackEvent('page_view', { sessionId: crypto.randomUUID() });
  }, []);

  const chapters = initialChapters.length > 0 ? initialChapters : sampleChapters;

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-900">
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="relative">
            {/* Book thumbnail — top-right corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="absolute top-0 right-0 w-24 sm:w-32 md:w-40 lg:w-44 xl:w-48 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-white"
            >
              <BookImage
                src={BOOK.coverImage}
                alt={BOOK.title}
                fill
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
            </motion.div>

            {/* Details fill the remaining space */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative max-w-4xl text-left pr-28 sm:pr-36 md:pr-44 lg:pr-52 xl:pr-60 pb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                <Sparkles className="h-4 w-4" /> {HOME.hero.badge}
              </div>
              <h1 className="text-4xl md:text-6xl font-headline leading-tight mb-6">
                {HOME.hero.headlineTop} <span className="text-primary italic">{HOME.hero.headlineHighlight}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                {HOME.hero.paragraph}{" "}
                <span className="font-semibold text-slate-700">{HOME.hero.byline}</span>.
              </p>
              <div className="flex flex-wrap items-center justify-start gap-4">
                <Button size="lg" className="rounded-full px-8 h-14 font-bold text-base shadow-xl shadow-primary/20" asChild>
                  <Link href="/checkout?variant=paperback" onClick={() => trackEvent('click_buy_button')}>{HOME.hero.buyButton} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 font-bold text-base bg-white/50 backdrop-blur" asChild>
                  <Link href="#synopsis">{HOME.hero.exploreButton}</Link>
                </Button>
              </div>

              {/* Price */}
              <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="text-3xl md:text-4xl font-headline font-bold text-slate-900">₹{BOOK.price}</span>
                <span className="text-sm text-muted-foreground">{HOME.hero.priceSuffix}</span>
              </div>

              <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
                {HOME.hero.features.map(feature => {
                  const Icon = FEATURE_ICONS[feature.icon] || Star;
                  return (
                    <span key={feature.icon} className="flex items-center gap-2">
                      {feature.icon === 'star' ? (
                        <Icon className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ) : (
                        <Icon className={feature.icon === 'truck' ? 'h-4 w-4 text-primary' : 'h-4 w-4 text-emerald-500'} />
                      )}
                      {feature.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUOTE BAND */}
      <section className="bg-slate-900 text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Quote className="h-10 w-10 text-primary/60 mx-auto mb-6" />
          <p className="text-2xl md:text-3xl font-garamond italic leading-relaxed">
            {HOME.quote}
          </p>
        </div>
      </section>

      {/* SYNOPSIS */}
      <section id="synopsis" className="scroll-mt-24 py-20 md:py-24 border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              <ScrollText className="h-4 w-4" /> {HOME.synopsis.label}
            </div>
            <h2 className="text-3xl md:text-5xl font-headline">{HOME.synopsis.heading}</h2>
          </div>
          <article
            className="text-slate-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: synopsis }}
          />
        </div>
      </section>

      {/* CHAPTERS */}
      <section id="chapters" className="scroll-mt-24 py-20 md:py-24 border-b border-slate-200 bg-[#fdfbf7]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              <BookOpen className="h-4 w-4" /> {HOME.chapters.label}
            </div>
            <h2 className="text-3xl md:text-5xl font-headline mb-4">{HOME.chapters.heading}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {HOME.chapters.subtext}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapters.map((chapter, index) => (
              <ChapterCard key={chapter.id || chapter.number} chapter={chapter} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section id="author" className="scroll-mt-24 py-20 md:py-24 border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              <Feather className="h-4 w-4" /> {HOME.author.label}
            </div>
            <h2 className="text-3xl md:text-5xl font-headline">{HOME.author.heading}</h2>
          </div>
          <article
            className="text-slate-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: authorBio }}
          />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 py-20 md:py-24 border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              <HelpCircle className="h-4 w-4" /> Frequently asked
            </div>
            <h2 className="text-3xl md:text-5xl font-headline mb-4">Questions about the book</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything the thinking seeker usually wants to know before beginning the soul journey.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {HOME_FAQ.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-headline text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* BUY */}
      <section id="buy" className="scroll-mt-24 bg-slate-900 py-20 md:py-24 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000&auto=format&fit=crop"
            alt="Books"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-2xl">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-headline mb-6">{HOME.buy.heading}</h2>
          <p className="text-slate-400 mb-10 text-lg leading-relaxed">
            {HOME.buy.subtext}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button size="lg" className="rounded-full px-10 h-14 font-bold text-lg shadow-xl shadow-primary/20" asChild>
              <Link href="/checkout?variant=paperback" onClick={() => trackEvent('click_buy_button')}>{HOME.buy.buyNow} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 font-bold text-lg bg-transparent border-white/40 text-white hover:bg-white hover:text-black hover:border-white transition-colors" asChild>
              <Link href="/#chapters">{HOME.buy.sample}</Link>
            </Button>
          </div>

          {buyLinks.filter(link => link.visible).length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs text-slate-400 uppercase tracking-widest mr-2">{HOME.buy.alsoOn}</span>
              {buyLinks.filter(link => link.visible).map(link => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}