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

async function processPost(path: string, loader: () => Promise<string>): Promise<Post> {
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
}

export async function getPosts(): Promise<Post[]> {
  const files = import.meta.glob('../posts/*.md', { as: 'raw' });

  const postsData = await Promise.all(
    Object.entries(files).map(([path, loader]) => processPost(path, loader))
  );

  // 'hidden'タグを持つ投稿を除外
  const visiblePosts = postsData.filter(post => !post.tags.includes('hidden'));

  // 日付の降順でソート（yyyy年mm月dd日形式に対応）
  return visiblePosts.sort((a, b) => {
    const dateB = new Date(b.date.replace(/年|月/g, '-').replace(/日/g, ''));
    const dateA = new Date(a.date.replace(/年|月/g, '-').replace(/日/g, ''));
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    // Viteの動的インポート機能を利用して、指定されたIDのMarkdownファイルを取得
    const loader = (await import(/* @vite-ignore */ `../posts/${id}.md?raw`)).default;
    // processPostを呼び出して投稿データを処理
    const post = await processPost(`../posts/${id}.md`, async () => loader);
    return post;
  } catch (error) {
    // エラーが発生した場合はコンソールに出力し、nullを返す
    console.error(`Error fetching post with id "${id}":`, error);
    return null;
  }
}

// Force Vite to re-process this file