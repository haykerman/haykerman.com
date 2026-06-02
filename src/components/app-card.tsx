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
