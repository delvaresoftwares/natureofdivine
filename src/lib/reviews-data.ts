export type ReviewPlatform = 'Amazon' | 'Flipkart';

export type ExternalReview = {
  id: string;
  platform: ReviewPlatform;
  name: string;
  rating: number;
  title: string;
  text: string;
  date?: string;
  verified?: boolean;
};

export const REVIEW_LINKS = {
  amazon: 'https://amzn.in/d/iPmewQL',
  flipkart: 'https://www.flipkart.com/nature-divine-align/p/itm2433ecc20ab88?pid=9789334306514',
} as const;

export const PLATFORM_RATINGS: Record<ReviewPlatform, { rating: number; count: number; url: string }> = {
  Amazon: { rating: 5.0, count: 3, url: REVIEW_LINKS.amazon },
  Flipkart: { rating: 5.0, count: 8, url: REVIEW_LINKS.flipkart },
};

export const EXTERNAL_REVIEWS: ExternalReview[] = [
  {
    id: 'amazon-badar',
    platform: 'Amazon',
    name: 'Badar Ebrahim',
    rating: 5,
    title: 'Peaceful and thoughtful about God',
    text: 'A simple, heartfelt book that makes you search and align with life and the divine. The writing inspires us to stay calm while submitting to your soul.',
    date: '30 October 2025',
    verified: true,
  },
  {
    id: 'amazon-suhail',
    platform: 'Amazon',
    name: 'Suhail A.',
    rating: 5,
    title: 'Really Helpful',
    text: 'Nature of the Divine is a thought-provoking exploration of spirituality that challenges conventional beliefs with deep insight and clarity. A beautifully written book that invites reflection and offers a fresh perspective on the connection between humanity and the divine.',
    date: '26 July 2025',
    verified: true,
  },
  {
    id: 'amazon-michel',
    platform: 'Amazon',
    name: 'Michel',
    rating: 5,
    title: 'Read it, Loved it. Now I am aligned with the nature of the divine.',
    text: 'A life changing book. It really opened my higher self. Truly a guide for anyone seeking growth and personal development.',
    date: '26 July 2025',
    verified: true,
  },
];