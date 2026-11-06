import { useEffect } from 'react';
import useInView from './useInView';

let played = false;

export default function useBootSequence() {
  const sequence = useInView({ threshold: 0.25, skip: played });
  const [, state] = sequence;
  useEffect(() => {
    if (state === 'run') played = true;
  }, [state]);
  return sequence;
}
