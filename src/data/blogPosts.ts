import fm from 'front-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  highlight: function(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a language prefix
} as any);

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
      console.log("Generated HTML for post:", htmlContent); // デバッグ用
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

  // 日付の降順でソート（yyyy年mm月dd日形式に対応）
  return posts.sort((a, b) => {
    const dateB = new Date(b.date.replace(/年|月/g, '-').replace(/日/g, ''));
    const dateA = new Date(a.date.replace(/年|月/g, '-').replace(/日/g, ''));
    return dateB.getTime() - dateA.getTime();
  });
}
// Force Vite to re-process this file
