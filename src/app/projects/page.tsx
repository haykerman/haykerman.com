import type { Metadata } from 'next';
import { getProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/project-card';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things Hayk is building — shipped and in progress.',
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-16">
        <span
          className="font-mono text-xs tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--color-muted)' }}
        >
          projects
        </span>
        <h1
          className="leading-tight mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-text)',
          }}
        >
          What I&apos;m building
        </h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: '50ch' }}>
          Everything here — shipped or in progress. The point is showing what I&apos;m working on,
          not just what&apos;s finished.
        </p>
      </div>

      {projects.length === 0 ? (
        <p style={{ color: 'var(--color-muted)' }}>Projects coming soon.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
