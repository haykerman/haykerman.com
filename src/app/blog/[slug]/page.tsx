import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPosts, getPost } from '@/lib/posts';
import { getMDXComponents } from '@/components/mdx-components';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <article className="max-w-2xl">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <time
              dateTime={post.date}
              className="font-mono text-xs"
              style={{ color: 'var(--color-muted)' }}
            >
              {formattedDate}
            </time>
            <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
              · {post.readingTime} min read
            </span>
          </div>
          <h1
            className="leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: 'var(--color-text)',
            }}
          >
            {post.title}
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>{post.description}</p>
        </header>

        {/* Body */}
        <div
          className="border-t pt-10"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <MDXRemote source={post.content} components={getMDXComponents()} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div
            className="flex flex-wrap gap-2 border-t pt-8 mt-12"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs"
                style={{ color: 'var(--color-muted)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
