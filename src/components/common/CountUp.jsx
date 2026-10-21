import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

// Counts a numeric string up from zero once it scrolls into view, keeping the
// original number of decimals. Non-numeric values render unchanged.
export default function CountUp({ value, duration = 900 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const numeric = /^\d+(\.\d+)?$/.test(String(value));
  const [shown, setShown] = useState(numeric && !reduced ? '0' : String(value));

  useEffect(() => {
    if (!numeric || reduced) {
      setShown(String(value));
      return undefined;
    }
    const target = Number(value);
    const decimals = (String(value).split('.')[1] || '').length;
    let frame = 0;
    let start = 0;

    const tick = (now) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setShown((target * eased).toFixed(decimals));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, numeric, reduced, duration]);

  // The final value is always available to assistive technology.
  return (
    <span ref={ref}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
