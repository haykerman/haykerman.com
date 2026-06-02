import type { Metadata } from 'next';
import { getPosts } from '@/lib/posts';
import { PostCard } from '@/components/post-card';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Long-form thinking on building, engineering, and everything adjacent.',
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-16">
        <span
          className="font-mono text-xs tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--color-muted)' }}
        >
          writing
        </span>
        <h1
          className="leading-tight mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-text)',
          }}
        >
          Thinking out loud
        </h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: '50ch' }}>
          No schedule, no SEO, no content machine — just things worth writing down.
        </p>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: 'var(--color-muted)' }}>First post coming soon.</p>
      ) : (
        <div className="flex flex-col" style={{ borderTop: '1px solid var(--color-border)' }}>
          {posts.map((post) => (
            <div
              key={post.slug}
              className="py-8"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
