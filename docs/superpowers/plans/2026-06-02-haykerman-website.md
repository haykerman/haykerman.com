# haykerman.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build haykerman.com — a dark terminal-aesthetic personal site for Hayk Martirosyan with home, about, projects, apps, blog, now, and contact sections, deployed to Vercel.

**Architecture:** Next.js 15 App Router with filesystem MDX content. All pages statically generated at build time. No CMS — content lives in `/content/**/*.mdx` files authored directly. Blog posts and project write-ups are MDX files parsed with `gray-matter` and rendered via `next-mdx-remote/rsc`.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, `next-mdx-remote` v5, `gray-matter`, `reading-time`, Vitest, Playwright, Vercel.

---

## File Structure

```
haykerman.com/
├── content/
│   ├── blog/
│   │   ├── building-in-public-with-ai.mdx
│   │   ├── open-cycles.mdx
│   │   └── six-years-remote.mdx
│   ├── projects/
│   │   ├── darack.mdx
│   │   ├── bycycle.mdx
│   │   ├── silly-city.mdx
│   │   ├── silly-quiz.mdx
│   │   ├── prompt-coach.mdx
│   │   └── ai-dev-workflow.mdx
│   └── now.mdx
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout, fonts, grain, cursor
│   │   ├── page.tsx                 # Home / hero
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── apps/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── now/page.tsx
│   │   ├── contact/page.tsx
│   │   └── feed.xml/route.ts        # RSS feed
│   ├── components/
│   │   ├── nav.tsx                  # Top navigation bar
│   │   ├── footer.tsx
│   │   ├── custom-cursor.tsx        # Terminal cursor following pointer
│   │   ├── typewriter.tsx           # Hero typewriter effect
│   │   ├── status-block.tsx         # Terminal status widget on home
│   │   ├── project-card.tsx
│   │   ├── app-card.tsx
│   │   ├── post-card.tsx
│   │   └── mdx-components.tsx       # Custom MDX element overrides
│   ├── lib/
│   │   ├── types.ts                 # Shared TypeScript interfaces
│   │   ├── projects.ts              # Filesystem project content loader
│   │   └── posts.ts                 # Filesystem blog post loader
│   └── styles/
│       └── globals.css              # Tailwind v4 + design tokens + grain
├── tests/
│   ├── unit/
│   │   ├── posts.test.ts
│   │   └── projects.test.ts
│   └── e2e/
│       └── smoke.spec.ts
├── public/
│   └── robots.txt
├── next.config.ts
├── postcss.config.mjs
└── vitest.config.ts
```

---

## Task 1: Scaffold & Dependencies

**Files:**
- Create: `package.json` (via scaffold)
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `.env.local`

- [ ] **Step 1: Scaffold Next.js project**

Run from `/Users/haykerman/Projects/haykerman`:

```bash
npx create-next-app@latest . \
  --typescript \
  --eslint \
  --tailwind \
  --src-dir \
  --app \
  --import-alias "@/*" \
  --yes
```

Expected output: project files created, `node_modules` installed.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install next-mdx-remote gray-matter reading-time
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @playwright/test
```

- [ ] **Step 3: Replace next.config.ts**

Replace the generated file:

```typescript
import type { NextConfig } from 'next';

const config: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: false,
  },
};

export default config;
```

- [ ] **Step 4: Configure PostCSS for Tailwind v4**

Replace `postcss.config.mjs`:

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

- [ ] **Step 5: Create Vitest config**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 6: Create content directory structure**

```bash
mkdir -p content/blog content/projects
touch content/now.mdx
```

- [ ] **Step 7: Create tests directory structure**

```bash
mkdir -p tests/unit tests/e2e
```

- [ ] **Step 8: Add scripts to package.json**

Add to the `"scripts"` section in `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:e2e": "playwright test"
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with dependencies"
```

---

## Task 2: Design System — Tokens, Fonts, Grain

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `src/app/layout.tsx` (font imports)

- [ ] **Step 1: Write failing test for design token presence**

Create `tests/unit/design-tokens.test.ts`:

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Design tokens', () => {
  const css = readFileSync(join(process.cwd(), 'src/styles/globals.css'), 'utf-8');

  it('defines background color token', () => {
    expect(css).toContain('--color-bg');
  });

  it('defines accent color token', () => {
    expect(css).toContain('--color-accent');
  });

  it('defines display font token', () => {
    expect(css).toContain('--font-display');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/unit/design-tokens.test.ts
```

Expected: FAIL (file exists but doesn't contain tokens yet)

- [ ] **Step 3: Replace globals.css with full design system**

Delete the generated content and write:

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-bg: #0e0e0e;
  --color-surface: #141414;
  --color-border: #1e1e1e;
  --color-text: #e8e4dc;
  --color-muted: #5a5a5a;
  --color-accent: #d4a843;

  /* Typography */
  --font-display: 'DM Serif Display', serif;
  --font-body: 'IBM Plex Sans', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* Spacing scale */
  --spacing-section: 5rem;
}

/* Base resets */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  cursor: none;
}

/* Hide default cursor globally — CustomCursor replaces it */
* {
  cursor: none !important;
}

/* Grain texture overlay — CSS-only, no JS */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.028;
  pointer-events: none;
  z-index: 9997;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border);
}

/* Prose base for blog/about content */
.prose {
  max-width: 68ch;
  line-height: 1.75;
}

.prose h1,
.prose h2,
.prose h3 {
  font-family: var(--font-display);
  color: var(--color-text);
  margin-top: 2em;
  margin-bottom: 0.5em;
}

.prose h2 { font-size: 1.5rem; }
.prose h3 { font-size: 1.2rem; }

.prose p {
  margin-bottom: 1.25em;
  color: var(--color-text);
}

.prose a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.prose a:hover {
  opacity: 0.8;
}

.prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--color-surface);
  padding: 0.125em 0.375em;
  border-radius: 3px;
  border: 1px solid var(--color-border);
}

.prose pre {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1.25rem;
  overflow-x: auto;
  margin: 1.5em 0;
}

.prose pre code {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.875rem;
}

.prose blockquote {
  border-left: 2px solid var(--color-accent);
  padding-left: 1.25rem;
  margin-left: 0;
  color: var(--color-muted);
  font-style: italic;
}

.prose ul,
.prose ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25em;
}

.prose li {
  margin-bottom: 0.375em;
}

.prose hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2.5em 0;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/unit/design-tokens.test.ts
```

Expected: PASS

- [ ] **Step 5: Update root layout.tsx with fonts**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { DM_Serif_Display, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Hayk Martirosyan',
    template: '%s — Hayk Martirosyan',
  },
  description: 'Engineer. Builder. Thinking out loud. Based in Yerevan.',
  metadataBase: new URL('https://haykerman.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://haykerman.com',
    siteName: 'Hayk Martirosyan',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@TheHaykerman',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Delete generated boilerplate**

```bash
rm -f src/app/page.tsx
find public -name "*.svg" -delete
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML response, no crash.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: design system — tokens, fonts, grain texture"
```

---

## Task 3: Navigation & Root Layout Structure

**Files:**
- Create: `src/components/nav.tsx`
- Create: `src/components/footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create Nav component**

Create `src/components/nav.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/projects', label: 'projects' },
  { href: '/apps', label: 'apps' },
  { href: '/blog', label: 'writing' },
  { href: '/now', label: 'now' },
  { href: '/contact', label: 'contact' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <nav
        className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-text)' }}
          aria-label="Hayk Martirosyan — home"
        >
          hm<span style={{ color: 'var(--color-accent)' }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="font-mono text-xs tracking-wider uppercase transition-colors"
                  style={{
                    color: active ? 'var(--color-accent)' : 'var(--color-muted)',
                  }}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-mono text-xs"
          style={{ color: 'var(--color-muted)' }}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? '[ close ]' : '[ menu ]'}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-6 py-8 flex flex-col gap-6"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)',
          }}
        >
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className="font-mono text-sm tracking-wider uppercase"
                style={{ color: active ? 'var(--color-accent)' : 'var(--color-text)' }}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create Footer component**

Create `src/components/footer.tsx`:

```tsx
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div
        className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <span
          className="font-mono text-xs"
          style={{ color: 'var(--color-muted)' }}
        >
          © {year} Hayk Martirosyan
        </span>
        <div className="flex items-center gap-6">
          {[
            { href: 'https://x.com/TheHaykerman', label: 'x / twitter' },
            { href: 'https://github.com/haykerman', label: 'github' },
            { href: 'https://linkedin.com/in/haykerman', label: 'linkedin' },
            { href: '/feed.xml', label: 'rss' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-xs transition-colors hover:opacity-80"
              style={{ color: 'var(--color-muted)' }}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Add Nav and Footer to root layout**

Update `src/app/layout.tsx` — add Nav and Footer around children:

```tsx
import type { Metadata } from 'next';
import { DM_Serif_Display, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import '@/styles/globals.css';

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Hayk Martirosyan',
    template: '%s — Hayk Martirosyan',
  },
  description: 'Engineer. Builder. Thinking out loud. Based in Yerevan.',
  metadataBase: new URL('https://haykerman.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://haykerman.com',
    siteName: 'Hayk Martirosyan',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@TheHaykerman',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <Nav />
        <main id="main-content" className="pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: nav bar and footer with active link state"
```

---

## Task 4: Custom Cursor

**Files:**
- Create: `src/components/custom-cursor.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create CustomCursor component**

Create `src/components/custom-cursor.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let rafId: number;

    const onMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
        el.style.opacity = '1';
      });
    };

    const onLeave = () => {
      el.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <span
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '-100px',
        top: '-100px',
        transform: 'translate(-50%, -60%)',
        pointerEvents: 'none',
        zIndex: 9999,
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
        color: 'var(--color-accent)',
        opacity: 0,
        userSelect: 'none',
        animation: 'cursor-blink 1s step-end infinite',
      }}
    >
      _
    </span>
  );
}
```

- [ ] **Step 2: Add cursor blink keyframe to globals.css**

Append to `src/styles/globals.css`:

```css
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

- [ ] **Step 3: Add CustomCursor to layout body**

In `src/app/layout.tsx`, add `<CustomCursor />` as the first child of `<body>`:

```tsx
import { CustomCursor } from '@/components/custom-cursor';

// Inside <body>:
<body>
  <CustomCursor />
  <Nav />
  <main id="main-content" className="pt-14">
    {children}
  </main>
  <Footer />
</body>
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: custom terminal cursor replaces native pointer"
```

---

## Task 5: Home Page

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/typewriter.tsx`
- Create: `src/components/status-block.tsx`

- [ ] **Step 1: Create Typewriter component**

Create `src/components/typewriter.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
}

export function Typewriter({ text, delay = 45 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span aria-label={text} role="text">
      <span aria-hidden="true">{displayed}</span>
      {!done && (
        <span
          aria-hidden="true"
          style={{
            color: 'var(--color-accent)',
            animation: 'cursor-blink 1s step-end infinite',
          }}
        >
          _
        </span>
      )}
    </span>
  );
}
```

- [ ] **Step 2: Create StatusBlock component**

Create `src/components/status-block.tsx`:

```tsx
interface StatusItem {
  key: string;
  value: string;
}

const STATUS: StatusItem[] = [
  { key: 'status', value: 'building ByeCycle' },
  { key: 'location', value: 'Yerevan, Armenia' },
  { key: 'open to', value: 'contracts / collabs' },
];

export function StatusBlock() {
  return (
    <div
      className="inline-block border rounded px-4 py-3"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
      role="region"
      aria-label="Current status"
    >
      <pre
        className="text-xs leading-relaxed m-0"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
      >
        {STATUS.map(({ key, value }) => {
          const padding = ' '.repeat(Math.max(0, 8 - key.length));
          return (
            <div key={key}>
              <span style={{ color: 'var(--color-muted)' }}>{key}</span>
              {padding}
              <span>{'  '}</span>
              <span style={{ color: 'var(--color-text)' }}>{value}</span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
```

- [ ] **Step 3: Create Home page**

Create `src/app/page.tsx`:

```tsx
import Link from 'next/link';
import { Typewriter } from '@/components/typewriter';
import { StatusBlock } from '@/components/status-block';

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      {/* Hero */}
      <section aria-labelledby="hero-name" className="mb-20">
        <h1
          id="hero-name"
          className="mb-4 leading-none tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-text)',
          }}
        >
          <Typewriter text="Hayk Martirosyan" delay={60} />
        </h1>

        <p
          className="mb-8 text-sm tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
        >
          engineer. builder. thinking out loud.
        </p>

        <p
          className="max-w-xl leading-relaxed mb-10"
          style={{ color: 'var(--color-muted)' }}
        >
          9 years building software. 6 at{' '}
          <a
            href="https://tidepoolabs.com"
            className="underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: 'var(--color-text)' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tidepool Labs
          </a>
          . Now building for myself. I make things that reduce friction so attention goes back to
          what matters.
        </p>

        <StatusBlock />
      </section>

      {/* Quick links */}
      <nav aria-label="Section links" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/projects', label: 'projects', desc: 'what I\'m building' },
          { href: '/apps', label: 'apps', desc: 'shipped to the App Store' },
          { href: '/blog', label: 'writing', desc: 'long-form thinking' },
          { href: '/now', label: 'now', desc: 'what\'s happening' },
        ].map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="border rounded p-4 transition-colors group"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <div
              className="font-mono text-xs tracking-widest uppercase mb-1 transition-colors"
              style={{ color: 'var(--color-accent)' }}
            >
              {label} →
            </div>
            <div className="text-xs" style={{ color: 'var(--color-muted)' }}>
              {desc}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

- [ ] **Step 4: Verify page renders**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | grep -i "hayk"
kill %1
```

Expected: HTML contains "Hayk Martirosyan".

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: home page with hero, typewriter, status block, and nav links"
```

---

## Task 6: About Page

**Files:**
- Create: `src/app/about/page.tsx`

Note: The PRD explicitly states no AI-generated copy. This task scaffolds the structure with clear `[REPLACE: ...]` markers. Hayk fills in the prose.

- [ ] **Step 1: Create About page**

Create `src/app/about/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Engineer, builder, maker. Based in Yerevan.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-16">
          <span
            className="font-mono text-xs tracking-widest uppercase mb-4 block"
            style={{ color: 'var(--color-muted)' }}
          >
            about
          </span>
          <h1
            className="leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-text)',
            }}
          >
            Hayk Martirosyan
          </h1>
        </div>

        {/* The work */}
        <section aria-labelledby="section-work" className="mb-12">
          <h2
            id="section-work"
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            the work
          </h2>
          <div className="prose">
            {/* [REPLACE: 2–3 paragraphs about your 9 years of full-stack work, 6 years at Tidepool Labs, technical leadership, stack. Direct voice, no buzzwords.] */}
            <p style={{ color: 'var(--color-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>
              [Copy to be written by Hayk]
            </p>
          </div>
        </section>

        {/* The builder */}
        <section aria-labelledby="section-builder" className="mb-12">
          <h2
            id="section-builder"
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            the builder
          </h2>
          <div className="prose">
            {/* [REPLACE: Kayoon Studio, Darack, ByeCycle, the pattern behind what you build — things that reduce friction.] */}
            <p style={{ color: 'var(--color-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>
              [Copy to be written by Hayk]
            </p>
          </div>
        </section>

        {/* The person */}
        <section aria-labelledby="section-person" className="mb-12">
          <h2
            id="section-person"
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            the person
          </h2>
          <div className="prose">
            {/* [REPLACE: Yerevan, guitar (acoustic, learning electric), film/anime analytical lens, how you think, the human details.] */}
            <p style={{ color: 'var(--color-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>
              [Copy to be written by Hayk]
            </p>
          </div>
        </section>

        {/* Currently */}
        <section aria-labelledby="section-currently">
          <h2
            id="section-currently"
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            currently
          </h2>
          <p style={{ color: 'var(--color-muted)' }}>
            See the{' '}
            <Link
              href="/now"
              className="underline underline-offset-2"
              style={{ color: 'var(--color-text)' }}
            >
              /now page
            </Link>{' '}
            for what I'm focused on right now.
          </p>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: about page structure — awaiting copy from Hayk"
```

---

## Task 7: Content Types & Shared Lib

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/projects.ts`
- Create: `src/lib/posts.ts`
- Create: `tests/unit/projects.test.ts`
- Create: `tests/unit/posts.test.ts`

- [ ] **Step 1: Create shared types**

Create `src/lib/types.ts`:

```typescript
export interface Project {
  slug: string;
  title: string;
  status: 'live' | 'in-development' | 'archived' | 'paused';
  description: string;
  why: string;
  tech: string[];
  links: {
    github?: string;
    live?: string;
    appStore?: string;
    writeup?: string;
  };
  content: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
  content: string;
}
```

- [ ] **Step 2: Write failing tests for projects loader**

Create `tests/unit/projects.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
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
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npx vitest run tests/unit/projects.test.ts
```

Expected: FAIL (module `@/lib/projects` does not exist)

- [ ] **Step 4: Create projects loader**

Create `src/lib/projects.ts`:

```typescript
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
```

- [ ] **Step 5: Run projects test to verify it passes**

```bash
npx vitest run tests/unit/projects.test.ts
```

Expected: PASS

- [ ] **Step 6: Write failing tests for posts loader**

Create `tests/unit/posts.test.ts`:

```typescript
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
```

- [ ] **Step 7: Run test to verify it fails**

```bash
npx vitest run tests/unit/posts.test.ts
```

Expected: FAIL (module `@/lib/posts` does not exist)

- [ ] **Step 8: Create posts loader**

Create `src/lib/posts.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post } from './types';

const postsDir = path.join(process.cwd(), 'content/blog');

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];

  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.mdx$/, '');
      const rt = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? String(data.date) : '',
        description: data.description ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingTime: Math.max(1, Math.ceil(rt.minutes)),
        content,
      } satisfies Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
```

- [ ] **Step 9: Run all unit tests**

```bash
npx vitest run
```

Expected: all PASS

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: content loaders for projects and posts with unit tests"
```

---

## Task 8: Projects Pages

**Files:**
- Create: `src/components/project-card.tsx`
- Create: `src/app/projects/page.tsx`
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/components/mdx-components.tsx`

- [ ] **Step 1: Create MDX components override**

Create `src/components/mdx-components.tsx`:

```tsx
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(): MDXComponents {
  return {
    h1: (props) => (
      <h1
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: '2rem', marginTop: '0', marginBottom: '0.5em' }}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: '1.5rem', marginTop: '2em', marginBottom: '0.5em' }}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: '1.2rem', marginTop: '1.5em', marginBottom: '0.5em' }}
        {...props}
      />
    ),
    p: (props) => (
      <p style={{ color: 'var(--color-text)', lineHeight: '1.75', marginBottom: '1.25em' }} {...props} />
    ),
    a: (props) => (
      <a
        style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        target={props.href?.startsWith('http') ? '_blank' : undefined}
        rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      />
    ),
    code: (props) => (
      <code
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875em',
          backgroundColor: 'var(--color-surface)',
          padding: '0.125em 0.375em',
          borderRadius: '3px',
          border: '1px solid var(--color-border)',
        }}
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          padding: '1.25rem',
          overflowX: 'auto',
          margin: '1.5em 0',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
        }}
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        style={{
          borderLeft: '2px solid var(--color-accent)',
          paddingLeft: '1.25rem',
          marginLeft: '0',
          color: 'var(--color-muted)',
          fontStyle: 'italic',
        }}
        {...props}
      />
    ),
  };
}
```

- [ ] **Step 2: Create ProjectCard component**

Create `src/components/project-card.tsx`:

```tsx
import Link from 'next/link';
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
      className="border rounded p-6 transition-colors"
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
          <Link
            href={project.links.writeup}
            className="font-mono text-xs underline underline-offset-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-muted)' }}
          >
            read more →
          </Link>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Create Projects list page**

Create `src/app/projects/page.tsx`:

```tsx
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
          What I'm building
        </h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: '50ch' }}>
          Everything here — shipped or in progress. The point is showing what I'm working on, not
          just what's finished.
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
```

- [ ] **Step 4: Create Project detail page**

Create `src/app/projects/[slug]/page.tsx`:

```tsx
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
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: projects list and detail pages with MDX rendering"
```

---

## Task 9: Apps / Kayoon Studio Page

**Files:**
- Create: `src/components/app-card.tsx`
- Create: `src/app/apps/page.tsx`

- [ ] **Step 1: Create AppCard component**

Create `src/components/app-card.tsx`:

```tsx
interface AppCardProps {
  name: string;
  tagline: string;
  description: string;
  status: 'live' | 'coming-soon';
  appStoreUrl?: string;
  icon?: string;
}

export function AppCard({ name, tagline, description, status, appStoreUrl, icon }: AppCardProps) {
  return (
    <article
      className="border rounded p-6"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Icon placeholder */}
        <div
          className="w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 font-mono text-lg"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}
          aria-hidden="true"
        >
          {icon ?? name[0]}
        </div>

        <div>
          <h2
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-text)' }}
          >
            {name}
          </h2>
          <p className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
            {tagline}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text)' }}>
        {description}
      </p>

      <div className="flex items-center gap-4">
        {status === 'live' && appStoreUrl ? (
          <a
            href={appStoreUrl}
            className="font-mono text-xs px-3 py-1.5 rounded border transition-opacity hover:opacity-80"
            style={{
              color: 'var(--color-accent)',
              borderColor: 'var(--color-accent)',
            }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${name} on the App Store`}
          >
            App Store →
          </a>
        ) : (
          <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
            coming soon
          </span>
        )}
        <span
          className="font-mono text-xs"
          style={{ color: status === 'live' ? 'var(--color-accent)' : 'var(--color-muted)' }}
        >
          [{status === 'live' ? 'live' : 'in development'}]
        </span>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create Apps page**

Create `src/app/apps/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { AppCard } from '@/components/app-card';

export const metadata: Metadata = {
  title: 'Apps',
  description: 'Apps built under Kayoon Studio — tools for real people.',
};

const APPS = [
  {
    name: 'Darack',
    tagline: 'Media tracker',
    description:
      'Free media tracker for keeping tabs on what you\'re watching, reading, and playing. No ads, no subscription, no noise — just a clean place to log it.',
    status: 'live' as const,
    appStoreUrl: 'https://apps.apple.com/app/darack/id0000000000', // [REPLACE: actual App Store URL]
  },
  {
    name: 'ByeCycle',
    tagline: 'Mental clarity for open loops',
    description:
      'An open cycle is an unresolved thought that keeps pulling your attention. ByeCycle is a tool for surfacing, resolving, and closing them — so your focus can go to what matters.',
    status: 'coming-soon' as const,
  },
];

export default function AppsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-16">
        <span
          className="font-mono text-xs tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--color-muted)' }}
        >
          apps
        </span>
        <h1
          className="leading-tight mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-text)',
          }}
        >
          Kayoon Studio
        </h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: '52ch' }}>
          An informal publishing imprint for apps I build for real people, with real use cases.
          Small, deliberate, no filler.
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-2xl">
        {APPS.map((app) => (
          <AppCard key={app.name} {...app} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Kayoon Studio apps page with Darack and ByeCycle"
```

---

## Task 10: Blog System

**Files:**
- Create: `src/components/post-card.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create PostCard component**

Create `src/components/post-card.tsx`:

```tsx
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
            className="transition-colors group-hover:opacity-80"
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
```

- [ ] **Step 2: Create Blog list page**

Create `src/app/blog/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { getPosts } from '@/lib/posts';
import { PostCard } from '@/components/post-card';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Long-form thinking on building, engineering, and everything adjacent.',
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-16">
        <span
          className="font-mono text-xs tracking-widest uppercase mb-4 block"
          style={{ color: 'var(--color-muted)' }}
        >
          writing
        </span>
        <h1
          className="leading-tight mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-text)',
          }}
        >
          Thinking out loud
        </h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: '50ch' }}>
          No schedule, no SEO, no content machine — just things worth writing down.
        </p>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: 'var(--color-muted)' }}>First post coming soon.</p>
      ) : (
        <div className="flex flex-col divide-y" style={{ '--tw-divide-color': 'var(--color-border)' } as React.CSSProperties}>
          {posts.map((post) => (
            <div key={post.slug} className="py-8 first:pt-0">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create Blog post page**

Create `src/app/blog/[slug]/page.tsx`:

```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: blog list and post pages with MDX rendering"
```

---

## Task 11: Now Page

**Files:**
- Create: `src/app/now/page.tsx`
- Create: `content/now.mdx`

- [ ] **Step 1: Create now.mdx seed content**

Write `content/now.mdx`:

```mdx
---
updatedAt: 2026-06-02
---

## Building

Working on ByeCycle — a mobile app for resolving open cycles. The core idea: unfinished thoughts
drain attention the same way a background process drains battery. ByeCycle surfaces them, helps you
resolve or consciously close them, and gets out of the way.

Also maintaining Darack and exploring ways to make the AI dev workflow more legible via Prompt Coach.

## Reading / Watching

[REPLACE: what you're currently reading or watching]

## Thinking about

[REPLACE: current preoccupation or question you're sitting with]

## Professionally

Open to senior remote engineering contracts with western teams. Prefer product companies over
agencies; prefer ownership over task execution. → [contact](/contact)
```

- [ ] **Step 2: Create Now page**

Create `src/app/now/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { getMDXComponents } from '@/components/mdx-components';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Hayk is focused on right now.',
};

export default function NowPage() {
  const raw = readFileSync(join(process.cwd(), 'content/now.mdx'), 'utf-8');
  const { data, content } = matter(raw);

  const updatedAt = data.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="max-w-2xl">
        <div className="mb-16">
          <span
            className="font-mono text-xs tracking-widest uppercase mb-4 block"
            style={{ color: 'var(--color-muted)' }}
          >
            now
          </span>
          <h1
            className="leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-text)',
            }}
          >
            What I'm doing now
          </h1>
          {updatedAt && (
            <time
              dateTime={String(data.updatedAt)}
              className="font-mono text-xs"
              style={{ color: 'var(--color-muted)' }}
            >
              Last updated: {updatedAt}
            </time>
          )}
        </div>

        <div className="prose">
          <MDXRemote source={content} components={getMDXComponents()} />
        </div>

        <p
          className="mt-12 font-mono text-xs"
          style={{ color: 'var(--color-muted)' }}
        >
          This is a{' '}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: 'var(--color-muted)' }}
          >
            /now page
          </a>
          . Updated whenever things change.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: now page with MDX content and last-updated timestamp"
```

---

## Task 12: Contact Page

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create Contact page**

Create `src/app/contact/page.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Hayk.',
};

const LINKS = [
  {
    label: 'x / twitter',
    href: 'https://x.com/TheHaykerman',
    display: '@TheHaykerman',
    external: true,
  },
  {
    label: 'github',
    href: 'https://github.com/haykerman',
    display: 'github.com/haykerman',
    external: true,
  },
  {
    label: 'email',
    href: 'mailto:hb.saryan@gmail.com',
    display: 'hb.saryan@gmail.com',
    external: false,
  },
  {
    label: 'linkedin',
    href: 'https://linkedin.com/in/haykerman',
    display: 'linkedin.com/in/haykerman',
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="max-w-xl">
        <div className="mb-16">
          <span
            className="font-mono text-xs tracking-widest uppercase mb-4 block"
            style={{ color: 'var(--color-muted)' }}
          >
            contact
          </span>
          <h1
            className="leading-tight mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-text)',
            }}
          >
            Get in touch
          </h1>
          <p style={{ color: 'var(--color-muted)', lineHeight: '1.75' }}>
            I'm open to senior remote engineering contracts, collaborations, and conversations that
            go somewhere. X is the fastest way to reach me. For longer things, email works.
          </p>
        </div>

        <ul className="flex flex-col gap-6" role="list">
          {LINKS.map(({ label, href, display, external }) => (
            <li key={label}>
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex items-baseline gap-4 transition-opacity hover:opacity-80"
              >
                <span
                  className="font-mono text-xs tracking-widest uppercase w-20 shrink-0"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {label}
                </span>
                <span
                  className="transition-colors"
                  style={{ color: 'var(--color-text)' }}
                >
                  {display}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: contact page with direct social links"
```

---

## Task 13: RSS Feed & Sitemap

**Files:**
- Create: `src/app/feed.xml/route.ts`
- Create: `src/app/sitemap.ts`
- Create: `public/robots.txt`

- [ ] **Step 1: Create RSS feed route**

Create `src/app/feed.xml/route.ts`:

```typescript
import { getPosts } from '@/lib/posts';

const SITE_URL = 'https://haykerman.com';

export async function GET() {
  const posts = getPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hayk Martirosyan</title>
    <link>${SITE_URL}</link>
    <description>Engineer. Builder. Thinking out loud.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
```

- [ ] **Step 2: Create sitemap**

Create `src/app/sitemap.ts`:

```typescript
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
```

- [ ] **Step 3: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://haykerman.com/sitemap.xml
```

- [ ] **Step 4: Add RSS link to layout head**

In `src/app/layout.tsx`, add to the `metadata` export:

```typescript
alternates: {
  types: {
    'application/rss+xml': 'https://haykerman.com/feed.xml',
  },
},
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: RSS feed, sitemap.xml, and robots.txt"
```

---

## Task 14: Seed Content Files

The PRD requires no AI-generated copy. These files are scaffolded with the correct frontmatter shape and placeholder markers for Hayk to fill in. They ensure the content pipeline works end-to-end before launch.

- [ ] **Step 1: Create project content files**

Create `content/projects/darack.mdx`:

```mdx
---
title: Darack
status: live
description: Free media tracker. No ads, no subscription — just a clean place to log what you're watching, reading, and playing.
why: I wanted a simple media tracker that didn't require creating an account, paying a subscription, or sitting through ads. Everything else was either too heavy or wanted too much from me.
tech: [React Native, Expo, Supabase, TypeScript]
links:
  appStore: https://apps.apple.com/app/darack/id0000000000
---

[REPLACE: extended write-up about building Darack — decisions made, things that didn't work, what you'd do differently]
```

Create `content/projects/bycycle.mdx`:

```mdx
---
title: ByeCycle
status: in-development
description: Mental clarity app for resolving open loops.
why: An open cycle is any unresolved thought that keeps pulling your attention — the email you haven't replied to, the decision you haven't made, the conversation you're rehearsing. ByeCycle exists to surface them, resolve or consciously close them, and return your focus.
tech: [React Native, Expo, Supabase, TypeScript]
links: {}
---

[REPLACE: deeper write-up on the open cycle concept and how the app approaches it]
```

Create `content/projects/silly-city.mdx`:

```mdx
---
title: Silly City
status: in-development
description: Real-time 3D social neighborhood for a Discord community.
why: Built for a tight-knit Discord group that wanted a shared space that felt more like a place than a chat window.
tech: [React Three Fiber, Colyseus, Supabase, TypeScript]
links: {}
---
```

Create `content/projects/silly-quiz.mdx`:

```mdx
---
title: Silly Quiz
status: in-development
description: Self-vs-group-perception quiz.
why: Built for the same group as Silly City — the question was how well people think they know each other vs how well they actually do.
tech: [Next.js, Supabase, TypeScript]
links: {}
---
```

Create `content/projects/prompt-coach.mdx`:

```mdx
---
title: Prompt Coach
status: in-development
description: Claude Code analytics dashboard.
why: I wanted visibility into my actual Claude Code usage — which hooks fire, how long tasks take, which prompts produce useful output vs noise.
tech: [Express, SQLite, TypeScript]
links: {}
---
```

Create `content/projects/ai-dev-workflow.mdx`:

```mdx
---
title: AI Dev Workflow Automation
status: in-development
description: Intake Agent → Linear → Watcher/Executor → GitHub PRs via Claude Code SDK.
why: The overhead of moving between issue tracker, editor, and PR review was breaking my flow. This project automates the handoffs.
tech: [Claude Code SDK, Linear API, GitHub API, TypeScript]
links: {}
---
```

- [ ] **Step 2: Create seed blog posts**

Create `content/blog/open-cycles.mdx`:

```mdx
---
title: Open Cycles
date: 2026-05-20
description: Why unfinished thoughts drain attention the same way a background process drains battery — and what to do about it.
tags: [building, byecycle, thinking]
---

[REPLACE: the essay — the open cycle concept, why you're building ByeCycle around it, what you've learned]
```

Create `content/blog/building-in-public-with-ai.mdx`:

```mdx
---
title: Building in public with AI
date: 2026-04-10
description: What actually changed about my solo development workflow after integrating Claude Code end-to-end.
tags: [ai, workflow, building]
---

[REPLACE: honest account of how Claude Code changed (or didn't change) your solo dev workflow]
```

Create `content/blog/six-years-remote.mdx`:

```mdx
---
title: Six years working remotely from Yerevan
date: 2026-03-01
description: What remote work actually looks like when you're not in a timezone-convenient location, and what I've learned.
tags: [remote, work, personal]
---

[REPLACE: write the piece]
```

- [ ] **Step 3: Verify build passes with seed content**

```bash
npm run build 2>&1 | tail -30
```

Expected: build completes, all pages generated, no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seed content files for all projects and 3 blog posts"
```

---

## Task 15: E2E Smoke Tests

**Files:**
- Create: `tests/e2e/smoke.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Create Playwright config**

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
```

- [ ] **Step 2: Write smoke tests**

Create `tests/e2e/smoke.spec.ts`:

```typescript
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
    await expect(page.getByRole('heading', { name: /what i'm building/i })).toBeVisible();
  });

  test('darack project card is visible', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('article').filter({ hasText: 'Darack' })).toBeVisible();
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
  test('navigates from home to about', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();
    await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
  });
});
```

- [ ] **Step 3: Install Playwright browsers**

```bash
npx playwright install chromium
```

- [ ] **Step 4: Run smoke tests**

```bash
npx playwright test
```

Expected: all tests pass. Fix any failures before continuing.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: Playwright smoke tests for all pages and RSS feed"
```

---

## Task 16: Deploy to Vercel

**Files:**
- Create: `.env.local` (local only, not committed)
- (No vercel.json needed — Next.js is auto-detected)

- [ ] **Step 1: Install Vercel CLI (if not installed)**

```bash
npm i -g vercel
```

- [ ] **Step 2: Run production build locally to verify**

```bash
npm run build
```

Expected: `✓ Compiled successfully`, all routes shown in output, no TypeScript errors.

- [ ] **Step 3: Link project to Vercel**

```bash
vercel link
```

Follow the prompts: link to your existing Vercel account, create a new project named `haykerman`.

- [ ] **Step 4: Deploy to preview**

```bash
vercel
```

Expected: deployment URL returned (e.g., `haykerman-git-main-hayk.vercel.app`). Visit it and verify the home page loads.

- [ ] **Step 5: Set production domain**

In Vercel dashboard → Project → Settings → Domains: add `haykerman.com`. Follow DNS instructions to point the domain.

- [ ] **Step 6: Deploy to production**

```bash
vercel --prod
```

Expected: `https://haykerman.com` is live.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "chore: production deployment configured"
```

---

## Self-Review

### Spec coverage check

| PRD requirement | Covered by task |
|---|---|
| Home / hero with typewriter | Task 5 |
| Terminal status block (status, location, open to) | Task 5 |
| About page with work / builder / person / currently sections | Task 6 |
| Projects — all 6 projects, status badges, why, tech, links | Tasks 7+8+14 |
| Apps / Kayoon Studio — Darack + ByeCycle | Task 9 |
| Blog — post list, post detail, tags, reading time | Task 10 |
| Now page with updatedAt timestamp | Task 11 |
| Contact — no form, direct links (X, GitHub, LinkedIn, email) | Task 12 |
| RSS feed | Task 13 |
| Sitemap + robots.txt | Task 13 |
| Dark only, no light mode | Task 2 (globals.css) |
| Grain texture | Task 2 (globals.css `body::after`) |
| Custom cursor | Task 4 |
| DM Serif Display headings, IBM Plex body/mono | Task 2+3 |
| Amber/ochre accent `#d4a843` | Task 2 |
| Semantic HTML, WCAG AA, aria-labels | Applied in every component |
| Mobile responsive | All layouts use responsive classes |
| Vercel deployment | Task 16 |
| No AI-generated copy | About (Task 6) and content (Task 14) use `[REPLACE: ...]` markers |

### Open items for Hayk before launch

- [ ] Replace `[REPLACE: ...]` markers in `src/app/about/page.tsx` with actual bio copy
- [ ] Replace `[REPLACE: ...]` markers in all `content/blog/*.mdx` posts
- [ ] Replace `[REPLACE: ...]` in `content/now.mdx`
- [ ] Update Darack App Store URL in `src/app/apps/page.tsx` and `content/projects/darack.mdx`
- [ ] Update GitHub and LinkedIn URLs in `src/components/footer.tsx` and `src/app/contact/page.tsx` if different from `haykerman`
- [ ] Add app icons to the AppCard components (optional, has letter fallback)
- [ ] Decide: accent color confirmed as `#d4a843` (amber/ochre) or change to something else
