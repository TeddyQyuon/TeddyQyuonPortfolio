import { useEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion';
import { motion } from '../motion/tokens';

// Opt data blocks into motion once, while preserving static fallbacks.
export default function useInView({
  root = null,
  rootMargin = motion.inView.rootMargin,
  threshold = motion.inView.threshold,
  skip = false,
} = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const disabled = reduced || skip || typeof IntersectionObserver === 'undefined';
  const [state, setState] = useState(() => disabled ? 'done' : 'pending');

  useEffect(() => {
    if (reduced && state === 'run') {
      setState('done');
      return undefined;
    }
    if (state !== 'pending') return undefined;
    if (disabled) {
      setState('done');
      return undefined;
    }
    if (!ref.current) return undefined;

    let active = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (!active || !entry.isIntersecting || entry.intersectionRatio < observer.thresholds[0]) return;
      active = false;
      observer.disconnect();
      setState('run');
    }, { root, rootMargin, threshold });
    observer.observe(ref.current);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [disabled, reduced, root, rootMargin, threshold, state]);

  return [ref, state];
}
