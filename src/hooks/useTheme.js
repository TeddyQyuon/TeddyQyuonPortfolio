import { useCallback, useState } from 'react';

const KEY = 'tq-theme';
const COLORS = { dark: '#0b1120', light: '#f5f7fb' };

// The initial theme is applied by public/theme-init.js before React mounts.
export default function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark',
  );

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      document.head.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[next]);
      try {
        localStorage.setItem(KEY, next);
      } catch {
        // Storage unavailable; the choice lasts for this page view only.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
