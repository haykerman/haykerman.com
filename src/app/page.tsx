import Link from 'next/link';
import dynamic from 'next/dynamic';
import { StatusBlock } from '@/components/status-block';

const Typewriter = dynamic(
  () => import('@/components/typewriter').then((m) => ({ default: m.Typewriter })),
  {
    ssr: false,
    loading: () => <span>Hayk Baghdasaryan</span>,
  }
);

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
          <Typewriter text="Hayk Baghdasaryan" delay={60} />
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
            href="https://tidepoollabs.com"
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
          { href: '/projects', label: 'projects', desc: "what I'm building" },
          { href: '/apps', label: 'apps', desc: 'shipped to the App Store' },
          { href: '/blog', label: 'writing', desc: 'long-form thinking' },
          { href: '/now', label: 'now', desc: "what's happening" },
        ].map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="border rounded p-4 transition-colors group"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <div
              className="font-mono text-xs tracking-widest uppercase mb-1"
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
