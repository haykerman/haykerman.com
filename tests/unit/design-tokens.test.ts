import { readFileSync } from 'fs';
import { join } from 'path';

describe('Design tokens', () => {
  const css = readFileSync(join(process.cwd(), 'src/styles/globals.css'), 'utf-8');

  it('defines background color token', () => {
    expect(css).toContain('--color-bg');
  });

  it('defines accent color token', () => {
    expect(css).toContain('--color-accent');
  });

  it('defines display font token', () => {
    expect(css).toContain('--font-display');
  });
});
