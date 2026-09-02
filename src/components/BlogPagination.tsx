'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/posts';

const POSTS_PER_PAGE = 12;

interface BlogPaginationProps {
  posts: BlogPost[];
}

export function BlogPagination({ posts }: BlogPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = useMemo(() => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-10">
      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {paginatedPosts.map((post) => (
          <article
            key={post.slug}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <div className="flex-1 p-5 md:p-6 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge
                  variant="secondary"
                  className="uppercase tracking-wider text-[10px] font-bold bg-primary/10 text-primary border-primary/20"
                >
                  {post.category}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {post.date}
                </span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-headline mb-2 leading-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group/link"
              >
                Read article
                <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2" aria-label="Blog pagination">
          {/* Prev */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Page numbers (hidden on small screens) */}
          <div className="hidden sm:flex items-center gap-1">
            {pageNumbers.map((page, i) =>
              page === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 text-slate-400 text-sm">
                  ···
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`inline-flex items-center justify-center h-10 min-w-[40px] px-3 rounded-xl text-sm font-medium transition-all ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-primary'
                  }`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Mobile: current / total */}
          <span className="sm:hidden text-sm text-muted-foreground font-medium px-2">
            {currentPage} / {totalPages}
          </span>

          {/* Next */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-all"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}

      {/* Post count */}
      <p className="text-center text-xs text-muted-foreground">
        Showing {((currentPage - 1) * POSTS_PER_PAGE) + 1}–{Math.min(currentPage * POSTS_PER_PAGE, posts.length)} of{' '}
        {posts.length} reflections
      </p>
    </div>
  );
}
