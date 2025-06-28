
import type { Author } from './Author';

export interface Post {
  id: string;
  title: string;
  date: string;
  author: Author;
  excerpt: string;
  imageUrl: string;
  link: string;
  content: string;
  tags: string[];
}

