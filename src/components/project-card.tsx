import type { Project } from '@/lib/types';

const STATUS_LABELS: Record<Project['status'], string> = {
  live: 'live',
  'in-development': 'in development',
  archived: 'archived',
  paused: 'paused',
};

const STATUS_COLORS: Record<Project['status'], string> = {
  live: 'var(--color-accent)',
  'in-development': '#6b9bcc',
  archived: 'var(--color-muted)',
  paused: 'var(--color-muted)',
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="border rounded p-6"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-text)' }}>
          {project.title}
        </h2>
        <span
          className="font-mono text-xs shrink-0 mt-1"
          style={{ color: STATUS_COLORS[project.status] }}
          aria-label={`Status: ${STATUS_LABELS[project.status]}`}
        >
          [{STATUS_LABELS[project.status]}]
        </span>
      </div>

      {/* Description */}
      <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {project.description}
      </p>

      {/* Why */}
      <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
        {project.why}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-4">
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

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        {project.links.appStore && (
          <a
            href={project.links.appStore}
            className="font-mono text-xs underline underline-offset-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-accent)' }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on App Store`}
          >
            app store →
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            className="font-mono text-xs underline underline-offset-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-muted)' }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
          >
            github →
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            className="font-mono text-xs underline underline-offset-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-muted)' }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live site`}
          >
            live →
          </a>
        )}
        {project.links.writeup && (
          <a
            href={project.links.writeup}
            className="font-mono text-xs underline underline-offset-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-muted)' }}
          >
            read more →
          </a>
        )}
      </div>
    </article>
  );
}
