import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post } from './types';

const postsDir = path.join(process.cwd(), 'content/blog');

let postsCache: Post[] | null = null;

export function getPosts(): Post[] {
  if (postsCache) return postsCache;

  if (!fs.existsSync(postsDir)) return [];

  const result = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.mdx$/, '');
      const rt = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? (data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)) : new Date().toISOString().slice(0, 10),
        description: data.description ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingTime: Math.max(1, Math.ceil(rt.minutes)),
        content,
      } satisfies Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  postsCache = result;
  return postsCache;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
