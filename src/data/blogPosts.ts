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
import type { Author } from '../types/Author';
import { authors } from './authors';

interface FrontMatterAttributes {
  title: string;
  date: string;
  authorId: string;
  imageUrl?: string;
  excerpt: string;
  tags?: string[]; // tagsはオプショナル
}

// ---- 新実装: import.meta.glob を統一利用し、ビルド後も確実にバンドルへ含める ----

const postFileLoaders = import.meta.glob('../posts/*.md', { as: 'raw' });

function pathToId(path: string): string {
  return path.split('/').pop()?.replace('.md', '') || '';
}

const authorCache: Record<string, Author> = {};

async function getAuthorById(authorId: string): Promise<Author> {
  if (authorCache[authorId]) {
    return authorCache[authorId];
  }

  const author = authors[authorId];

  if (!author) {
    // 未知の著者のためのフォールバック
    console.warn(`Author with id "${authorId}" not found. Using a default author.`);
    const defaultAuthor: Author = {
      id: authorId,
      name: '不明な著者',
      bio: '',
      avatarUrl: '',
    };
    authorCache[authorId] = defaultAuthor;
    return defaultAuthor;
  }

  authorCache[authorId] = author;
  return author;
}

async function processPost(path: string, loader: () => Promise<string>): Promise<Post> {
  const id = pathToId(path);
  const rawContent = await loader();
  const { attributes, body } = fm<FrontMatterAttributes>(rawContent);
  const htmlContent = marked(body) as string;

  if (!attributes.authorId) {
    throw new Error(`Post with path "${path}" is missing the "authorId" attribute in its front-matter.`);
  }

  const author = await getAuthorById(attributes.authorId);

  return {
    id,
    ...attributes,
    imageUrl: attributes.imageUrl || '',
    author,
    tags: attributes.tags || [],
    link: `/blog/${id}`,
    content: htmlContent,
  };
}

let cachedPosts: Post[] | null = null;

export async function getPosts(): Promise<Post[]> {
  if (cachedPosts) return cachedPosts;

  const postsData = await Promise.all(
    Object.entries(postFileLoaders).map(([path, loader]) => processPost(path, loader as () => Promise<string>))
  );

  const visiblePosts = postsData.filter(post => !post.tags.includes('hidden'));
  cachedPosts = visiblePosts.sort((a, b) => {
    const dateB = new Date(b.date.replace(/年|月/g, '-').replace(/日/g, ''));
    const dateA = new Date(a.date.replace(/年|月/g, '-').replace(/日/g, ''));
    return dateB.getTime() - dateA.getTime();
  });
  return cachedPosts;
}

export async function getPostById(id: string): Promise<Post | null> {
  // まずキャッシュ済みならそこから
  if (cachedPosts) {
    const found = cachedPosts.find(p => p.id === id);
    if (found) return found;
  }
  // 未キャッシュなら対象ファイルを特定して個別ロード
  const entry = Object.entries(postFileLoaders).find(([path]) => path.endsWith(`/${id}.md`));
  if (!entry) return null;
  try {
    const [path, loader] = entry;
    const post = await processPost(path, loader as () => Promise<string>);
    // キャッシュへ追加
    if (cachedPosts) cachedPosts = [...cachedPosts, post];
    return post;
  } catch (e) {
    console.error(`Error processing post ${id}:`, e);
    return null;
  }
}

// (再ビルド強制用途のダミーエクスポート防止コメント)