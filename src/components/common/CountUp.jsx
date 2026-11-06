import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import { motion } from '../../motion/tokens';

// Counts a numeric string up from zero once it scrolls into view, keeping the
// original number of decimals. Non-numeric values render unchanged.
export default function CountUp({ value, duration = motion.duration.count, start, delay = 0 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const numeric = /^\d+(\.\d+)?$/.test(String(value));
  const animate = numeric && !reduced && typeof IntersectionObserver !== 'undefined';
  const [shown, setShown] = useState(animate ? '0' : String(value));

  useEffect(() => {
    if (!animate) return undefined;
    setShown('0');
    if (start === false) return undefined;
    const target = Number(value);
    const decimals = (String(value).split('.')[1] || '').length;
    let frame = 0;
    let startedAt;
    let timer;
    let observer;

    const tick = (now) => {
      if (startedAt === undefined) startedAt = now;
      const t = duration > 0 ? Math.min(1, (now - startedAt) / duration) : 1;
      const eased = 1 - (1 - t) ** 3;
      setShown((target * eased).toFixed(decimals));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const begin = () => {
      timer = setTimeout(() => {
        frame = requestAnimationFrame(tick);
      }, delay);
    };

    if (start === true) {
      begin();
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          begin();
        }
      });
      observer.observe(ref.current);
    }
    return () => {
      observer?.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, animate, duration, start, delay]);

  // Remount only the decorative readout at digit boundaries so right-aligned
  // text updates do not register as inline layout shifts.
  const display = animate ? (start === false ? '0' : shown) : String(value);

  // The final value is always available to assistive technology.
  return (
    <span ref={ref}>
      <span key={display.length} className="count-up" aria-hidden="true" style={{ minWidth: `${String(value).length}ch` }}>
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
