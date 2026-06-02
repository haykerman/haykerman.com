import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Project } from './types';

const projectsDir = path.join(process.cwd(), 'content/projects');

export function getProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];

  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(projectsDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.mdx$/, '');

      return {
        slug,
        title: data.title ?? slug,
        status: data.status ?? 'in-development',
        description: data.description ?? '',
        why: data.why ?? '',
        tech: Array.isArray(data.tech) ? data.tech : [],
        links: data.links ?? {},
        content,
      } satisfies Project;
    });
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
