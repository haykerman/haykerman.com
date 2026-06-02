import Link from 'next/link';
import type { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="group block"
        aria-label={`Read: ${post.title}`}
      >
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <h2
            className="transition-opacity group-hover:opacity-80"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text)' }}
          >
            {post.title}
          </h2>
          <time
            dateTime={post.date}
            className="font-mono text-xs shrink-0"
            style={{ color: 'var(--color-muted)' }}
          >
            {formattedDate}
          </time>
        </div>
        <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-muted)' }}>
          {post.description}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
            {post.readingTime} min read
          </span>
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs"
              style={{ color: 'var(--color-muted)' }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
