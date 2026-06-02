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
            Hayk Baghdasaryan
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
            <p style={{ color: 'var(--color-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>
              [REPLACE: 2–3 paragraphs about 9 years full-stack, 6 at Tidepool Labs, technical leadership. Core stack: React Native, Next.js, Supabase, Tailwind, Claude API. Direct voice, no buzzwords.]
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
            <p style={{ color: 'var(--color-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>
              [REPLACE: Kayoon Studio, Darack, ByeCycle, the pattern — building things that reduce friction so attention goes back to what matters.]
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
            <p style={{ color: 'var(--color-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>
              [REPLACE: Yerevan, guitar (acoustic, learning electric), analytical engagement with film and anime, how you think, the human details.]
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
            for what I&apos;m focused on right now.
          </p>
        </section>
      </div>
    </div>
  );
}
