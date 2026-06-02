import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjects, getProject } from '@/lib/projects';
import { getMDXComponents } from '@/components/mdx-components';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const STATUS_LABELS: Record<typeof project.status, string> = {
    live: 'live',
    'in-development': 'in development',
    archived: 'archived',
    paused: 'paused',
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-10">
          <span
            className="font-mono text-xs mb-2 block"
            style={{ color: 'var(--color-accent)' }}
          >
            [{STATUS_LABELS[project.status]}]
          </span>
          <h1
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-text)',
            }}
          >
            {project.title}
          </h1>
          <p className="mb-6" style={{ color: 'var(--color-muted)' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-2 py-0.5 rounded border"
                style={{ color: 'var(--color-muted)', borderColor: 'var(--color-border)' }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {project.links.appStore && (
              <a
                href={project.links.appStore}
                className="font-mono text-xs underline underline-offset-2"
                style={{ color: 'var(--color-accent)' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                app store →
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                className="font-mono text-xs underline underline-offset-2"
                style={{ color: 'var(--color-muted)' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                github →
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                className="font-mono text-xs underline underline-offset-2"
                style={{ color: 'var(--color-muted)' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                live →
              </a>
            )}
          </div>
        </div>

        {/* MDX content */}
        {project.content.trim() && (
          <div
            className="border-t pt-10"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <MDXRemote source={project.content} components={getMDXComponents()} />
          </div>
        )}
      </div>
    </div>
  );
}
