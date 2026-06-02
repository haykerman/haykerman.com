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
