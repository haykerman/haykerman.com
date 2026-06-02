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
