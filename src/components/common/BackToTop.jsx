import { useEffect, useState } from 'react';
import { Fab, Zoom, Tooltip, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Floating "back to top" control. Appears once the visitor has scrolled past
// the hero, so it never competes with the hero calls to action.
export default function BackToTop() {
  const [mounted, setMounted] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 600,
  });

  // Mount only after the first scroll to keep the initial DOM lean.
  useEffect(() => {
    const onScroll = () => setMounted(true);
    window.addEventListener('scroll', onScroll, { passive: true, once: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <Zoom in={mounted && trigger}>
      <Tooltip title="Back to top" placement="left">
        <Fab
          color="primary"
          size="medium"
          onClick={handleClick}
          aria-label="Back to top"
          sx={{
            position: 'fixed',
            right: { xs: 16, md: 32 },
            bottom: { xs: 16, md: 32 },
            zIndex: (theme) => theme.zIndex.speedDial,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
