interface StatusItem {
  key: string;
  value: string;
}

const STATUS: StatusItem[] = [
  { key: 'status', value: 'building ByeCycle' },
  { key: 'location', value: 'Yerevan, Armenia' },
];

export function StatusBlock() {
  return (
    <div
      className="inline-block border rounded px-4 py-3"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
      role="region"
      aria-label="Current status"
    >
      <pre
        className="text-xs leading-relaxed m-0"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
      >
        {STATUS.map(({ key, value }) => {
          const padding = ' '.repeat(Math.max(0, 8 - key.length));
          return (
            <div key={key}>
              <span style={{ color: 'var(--color-muted)' }}>{key}</span>
              {padding}
              <span>{'  '}</span>
              <span style={{ color: 'var(--color-text)' }}>{value}</span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
