import { describe, it, expect, beforeAll } from 'vitest';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const FIXTURE_DIR = join(process.cwd(), 'content/projects');

describe('getProjects()', () => {
  beforeAll(() => {
    mkdirSync(FIXTURE_DIR, { recursive: true });
    writeFileSync(
      join(FIXTURE_DIR, 'test-project.mdx'),
      `---
title: Test Project
status: live
description: A test project
why: I needed to test
tech: [React, TypeScript]
links:
  github: https://github.com/test
---

Content here.
`
    );
  });

  it('returns an array of projects', async () => {
    const { getProjects } = await import('@/lib/projects');
    const projects = getProjects();
    expect(Array.isArray(projects)).toBe(true);
  });

  it('parses required fields', async () => {
    const { getProjects } = await import('@/lib/projects');
    const project = getProjects().find((p) => p.slug === 'test-project');
    expect(project).toBeDefined();
    expect(project?.title).toBe('Test Project');
    expect(project?.status).toBe('live');
    expect(project?.tech).toContain('React');
  });

  it('returns slug derived from filename', async () => {
    const { getProjects } = await import('@/lib/projects');
    const slugs = getProjects().map((p) => p.slug);
    expect(slugs).toContain('test-project');
  });
});
