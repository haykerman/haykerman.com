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
