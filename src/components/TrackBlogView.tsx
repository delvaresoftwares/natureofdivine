'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/actions';

export function TrackBlogView({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent('click_blog', { slug });
  }, [slug]);
  return null;
}
