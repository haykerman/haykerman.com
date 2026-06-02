import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('renders hero with name', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /hayk martirosyan/i })).toBeVisible();
  });

  test('has navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /projects/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /writing/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /now/i }).first()).toBeVisible();
  });

  test('status block shows location', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Yerevan, Armenia')).toBeVisible();
  });
});

test.describe('Blog', () => {
  test('blog index renders', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: /thinking out loud/i })).toBeVisible();
  });

  test('blog post renders from slug', async ({ page }) => {
    await page.goto('/blog/open-cycles');
    await expect(page.getByRole('heading', { name: /open cycles/i })).toBeVisible();
  });
});

test.describe('Projects', () => {
  test('projects page renders', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: /what i.m building/i })).toBeVisible();
  });

  test('darack project card is visible', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('article').filter({ hasText: 'Darack' }).first()).toBeVisible();
  });
});

test.describe('Now page', () => {
  test('renders with last updated timestamp', async ({ page }) => {
    await page.goto('/now');
    await expect(page.getByText(/last updated/i)).toBeVisible();
  });
});

test.describe('Contact', () => {
  test('shows twitter link', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('link', { name: /@TheHaykerman/i })).toBeVisible();
  });
});

test.describe('RSS feed', () => {
  test('returns XML content', async ({ request }) => {
    const response = await request.get('/feed.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<?xml');
    expect(body).toContain('<rss');
    expect(body).toContain('Hayk Martirosyan');
  });
});

test.describe('Navigation', () => {
  test('navigates from home to contact', async ({ page }) => {
    await page.goto('/');
    // On mobile viewports the desktop nav is hidden; open the hamburger first.
    const hamburger = page.getByRole('button', { name: /open menu/i });
    if (await hamburger.isVisible()) {
      await hamburger.click();
    }
    await page.getByRole('link', { name: /contact/i }).first().click();
    await expect(page).toHaveURL('/contact');
  });

  test('mobile menu opens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();
    await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
  });
});
