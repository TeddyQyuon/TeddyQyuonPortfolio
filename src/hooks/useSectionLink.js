import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../data/navigation';

// Returns a click handler for in-page section links that works on every route.
//
// The previous implementation used bare `href="#about"` anchors, which do
// nothing on /projects/:slug because that page has no #about section. This
// handler routes back to the homepage hash first, then lets the homepage
// scroll to the target.
export default function useSectionLink() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (event, id) => {
      event.preventDefault();
      const target = `#${id}`;

      // Not on the homepage: navigate back and let the homepage handle the hash.
      if (pathname !== '/') {
        navigate(`/${target}`);
        return;
      }

      // Already on this hash, so the router would not re-run the scroll effect.
      if (hash === target) {
        scrollToSection(id);
        return;
      }

      // Update the hash (replace keeps the back button useful) and let the
      // homepage scroll effect take over.
      navigate(`/${target}`, { replace: true });
    },
    [pathname, hash, navigate]
  );
}
