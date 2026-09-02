'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ScrollText, Search, ShoppingBag, Feather } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BOTTOM_NAV } from '@/lib/constants';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (pathname: string) => boolean;
}

export function MobileBottomNav() {
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: '/', label: BOTTOM_NAV.home, icon: Home, match: p => p === '/' },
    { href: '/chapters', label: BOTTOM_NAV.chapter, icon: ScrollText, match: p => p.startsWith('/chapters') },
    { href: '/blog', label: BOTTOM_NAV.blog, icon: Feather, match: p => p.startsWith('/blog') },
    {
      href: '/track',
      label: BOTTOM_NAV.track,
      icon: Search,
      match: p => p.startsWith('/track') || p.startsWith('/ticket'),
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="grid h-16 grid-cols-5">
        {items.map(item => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors',
                active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}

        <Link
          href="/checkout?variant=paperback"
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-primary-foreground"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span>{BOTTOM_NAV.buyNow}</span>
        </Link>
      </div>
    </nav>
  );
}
