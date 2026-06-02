import { describe, it, expect, beforeAll } from 'vitest';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const FIXTURE_DIR = join(process.cwd(), 'content/blog');

describe('getPosts()', () => {
  beforeAll(() => {
    mkdirSync(FIXTURE_DIR, { recursive: true });
    writeFileSync(
      join(FIXTURE_DIR, 'test-post.mdx'),
      `---
title: Test Post
date: 2026-01-15
description: A test blog post
tags: [testing, vitest]
---

This is the test post content. It has enough words to calculate reading time accurately in a unit test.
`
    );
    writeFileSync(
      join(FIXTURE_DIR, 'older-post.mdx'),
      `---
title: Older Post
date: 2025-12-01
description: An older post
tags: [old]
---

Older content.
`
    );
  });

  it('returns an array of posts', async () => {
    const { getPosts } = await import('@/lib/posts');
    const posts = getPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  it('parses required fields', async () => {
    const { getPosts } = await import('@/lib/posts');
    const post = getPosts().find((p) => p.slug === 'test-post');
    expect(post).toBeDefined();
    expect(post?.title).toBe('Test Post');
    expect(post?.date).toBe('2026-01-15');
    expect(post?.tags).toContain('testing');
  });

  it('returns posts sorted newest first', async () => {
    const { getPosts } = await import('@/lib/posts');
    const posts = getPosts();
    const dates = posts.map((p) => new Date(p.date).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });

  it('calculates reading time as a positive integer', async () => {
    const { getPosts } = await import('@/lib/posts');
    const post = getPosts().find((p) => p.slug === 'test-post');
    expect(post?.readingTime).toBeGreaterThan(0);
    expect(Number.isInteger(post?.readingTime)).toBe(true);
  });
});
