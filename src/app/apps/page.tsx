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
      "Free media tracker for keeping tabs on what you're watching, reading, and playing. No ads, no subscription, no noise — just a clean place to log it.",
    status: 'live' as const,
    appStoreUrl: 'https://apps.apple.com/app/darack/id0000000000',
  },
  {
    name: 'ByeCycle',
    tagline: 'Mental clarity for open loops',
    description:
      "An open cycle is an unresolved thought that keeps pulling your attention. ByeCycle is a tool for surfacing, resolving, and closing them — so your focus can go to what matters.",
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
