import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Returns the id of the section currently in view so navigation can highlight
// it. Uses scroll position rather than IntersectionObserver because the
// sections vary wildly in height (the hero alone is a full viewport).
//
// When none of the sections exist on the page (for example on a project detail
// route) the active id stays empty and nothing is highlighted.
export default function useScrollSpy(sectionIds, offset = 96) {
  const [activeId, setActiveId] = useState('');
  // The navbar does not remount between routes, so the pathname is a required
  // dependency: without it this effect would keep the result of the first page
  // it ever rendered on and never highlight anything afterwards.
  const { pathname } = useLocation();

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // Routes without sections (project case studies) clear any stale highlight.
    if (elements.length === 0) {
      setActiveId('');
      return undefined;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      let current = '';
      for (const element of elements) {
        // The last section whose top has passed the offset is the active one.
        if (element.getBoundingClientRect().top - offset <= 0) {
          current = element.id;
        }
      }
      // React bails out when the value is unchanged, so this cannot loop.
      setActiveId(current);
    };

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [sectionIds, offset, pathname]);

  return activeId;
}
