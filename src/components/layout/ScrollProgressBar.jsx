import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

/**
 * Subtle reading progress bar at the very top of the viewport.
 * Provides instant wayfinding and a psychological sense of progress
 * through long-form single-page portfolio content and case studies.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const currentProgress = (window.scrollY / scrollHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${progress}%`,
        bgcolor: 'primary.main',
        zIndex: 1400,
        transition: 'width 0.08s ease-out',
        pointerEvents: 'none',
      }}
    />
  );
}
