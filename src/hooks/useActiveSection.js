import { useEffect, useState } from 'react';

export default function useActiveSection(ids, { enabled = true } = {}) {
  const [active, setActive] = useState(null);
  const key = ids.join('|');
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setActive(null);
      return undefined;
    }
    const ordered = key.split('|').filter(Boolean);
    const visible = new Map(ordered.map((id) => [id, false]));
    const topbar = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h'), 10) || 64;
    let watching = true;
    const observer = new IntersectionObserver((entries) => {
      if (!watching) return;
      entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
      // A short final section cannot reach the reading line at document end.
      const last = ordered[ordered.length - 1];
      const final = document.getElementById(last);
      const shortEnd = final && document.documentElement.scrollHeight - (final.getBoundingClientRect().top + window.scrollY) < window.innerHeight - topbar - 24;
      const next = shortEnd && visible.get(last) ? last : ordered.find((id) => visible.get(id));
      if (next) setActive(next);
    }, { threshold: 0, rootMargin: `-${topbar + 24}px 0px -55% 0px` });
    ordered.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => {
      watching = false;
      observer.disconnect();
    };
  }, [key, enabled]);
  return enabled ? active : null;
}
