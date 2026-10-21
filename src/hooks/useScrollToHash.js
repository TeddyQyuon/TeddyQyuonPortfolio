import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to #hash targets after navigation (retrying briefly for lazily
// rendered pages) and resets to the top on plain route changes.
export default function useScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let tries = 0;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      if (tries++ < 30) frame = requestAnimationFrame(attempt);
    };
    attempt();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
}
