import {
  BOOK,
  synopsis as synopsisContent,
  authorBio as authorBioContent,
  sampleChapters as sampleChaptersContent,
  allChapters as allChaptersContent,
  buyLinks as buyLinksContent,
  BLOG as BLOGContent,
} from './constants';
import type { SampleChapter } from './definitions';
import { bookBlogs } from './posts';
import type { BlogPost } from './posts';
import { generalBlogsA } from './posts-general-a';
import { generalBlogsB } from './posts-general-b';
import { generalBlogsC } from './posts-general-c';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  category: 'Spiritual Philosophy';
}

export const books: Book[] = [
  {
    ...BOOK,
    category: 'Spiritual Philosophy',
  },
];

export const synopsis = synopsisContent;
export const authorBio = authorBioContent;
export const sampleChapters: SampleChapter[] = sampleChaptersContent;
export const allChapters = allChaptersContent;
export const buyLinks = buyLinksContent;
export const BLOG = BLOGContent;
export const blogPosts: BlogPost[] = [
  ...bookBlogs,
  ...generalBlogsA,
  ...generalBlogsB,
  ...generalBlogsC,
];

export type Chapter = (typeof allChaptersContent)[number];
