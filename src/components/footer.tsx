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
          © {year} Hayk Baghdasaryan
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
