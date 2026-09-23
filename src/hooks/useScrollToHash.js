import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../data/navigation';

// Keeps scroll position in sync with the route:
// - a URL hash scrolls to the matching section (in-page links and cross-page
//   navigation such as clicking "About" from a project case study)
// - an ordinary route change resets to the top, so a new page never opens
//   part-way down
//
// The homepage's incoming hash is stripped before the app mounts (see
// main.jsx), so a shared or reloaded link always opens on the hero.
export default function useScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // One frame of slack so the target section is mounted before scrolling.
      const frame = requestAnimationFrame(() => scrollToSection(hash.slice(1)));
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash]);
}
