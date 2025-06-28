import fm from 'front-matter';
import { marked } from 'marked';

import type { Post } from '../types/Post';
import { authors } from './authors';

interface FrontMatterAttributes {
  title: string;
  date: string;
  authorId: string;
  imageUrl: string;
  excerpt: string;
  tags?: string[]; // tagsはオプショナル
}

export async function getPosts(): Promise<Post[]> {
  const files = import.meta.glob('../posts/*.md', { as: 'raw' });

  const posts = await Promise.all(
    Object.entries(files).map(async ([path, loader]) => {
      const id = path.split('/').pop()?.replace('.md', '') || '';
      const rawContent = await loader();
      const { attributes, body } = fm<FrontMatterAttributes>(rawContent);
      const htmlContent = marked(body) as string;
      const author = authors[attributes.authorId];

      if (!author) {
        throw new Error(`Author with id "${attributes.authorId}" not found.`);
      }

      return {
        id,
        ...attributes,
        author,
        tags: attributes.tags || [], // tagsがなければ空配列
        link: `/blog/${id}`,
        content: htmlContent,
      };
    })
  );

  // 日付の降順でソート
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
// Force Vite to re-process this file
