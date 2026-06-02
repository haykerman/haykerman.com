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
            I&apos;m open to senior remote engineering contracts, collaborations, and conversations
            that go somewhere. X is the fastest way to reach me. For longer things, email works.
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
