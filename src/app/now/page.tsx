import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { getMDXComponents } from '@/components/mdx-components';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Hayk is focused on right now.',
};

export default function NowPage() {
  const raw = readFileSync(join(process.cwd(), 'content/now.mdx'), 'utf-8');
  const { data, content } = matter(raw);

  const updatedAt = data.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="max-w-2xl">
        <div className="mb-16">
          <span
            className="font-mono text-xs tracking-widest uppercase mb-4 block"
            style={{ color: 'var(--color-muted)' }}
          >
            now
          </span>
          <h1
            className="leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-text)',
            }}
          >
            What I&apos;m doing now
          </h1>
          {updatedAt && (
            <time
              dateTime={String(data.updatedAt)}
              className="font-mono text-xs"
              style={{ color: 'var(--color-muted)' }}
            >
              Last updated: {updatedAt}
            </time>
          )}
        </div>

        <div className="prose">
          <MDXRemote source={content} components={getMDXComponents()} />
        </div>

        <p
          className="mt-12 font-mono text-xs"
          style={{ color: 'var(--color-muted)' }}
        >
          This is a{' '}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: 'var(--color-muted)' }}
          >
            /now page
          </a>
          . Updated whenever things change.
        </p>
      </div>
    </div>
  );
}
