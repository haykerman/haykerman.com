import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/posts';
import { getProjects } from '@/lib/projects';

const SITE_URL = 'https://haykerman.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projects = getProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticPages = [
    { url: SITE_URL, priority: 1.0 },
    { url: `${SITE_URL}/about`, priority: 0.9 },
    { url: `${SITE_URL}/projects`, priority: 0.8 },
    { url: `${SITE_URL}/apps`, priority: 0.8 },
    { url: `${SITE_URL}/blog`, priority: 0.8 },
    { url: `${SITE_URL}/now`, priority: 0.7 },
    { url: `${SITE_URL}/contact`, priority: 0.6 },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
  }));

  return [...staticPages, ...posts, ...projects];
}
