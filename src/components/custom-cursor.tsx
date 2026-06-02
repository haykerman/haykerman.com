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
