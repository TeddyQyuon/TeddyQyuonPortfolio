Add an absolutely positioned, CSS scroll-driven reading progress bar only for known case studies. Reuse the shared IntersectionObserver scrollspy for active TOC links in desktop and chip layouts, with existing accent/text tokens and 150ms feedback.

Browser checks verify 0-to-100% progress, all eight GameVault blocks at 390px and 1440px, and hidden progress on home, both 404 paths and reduced motion. No scroll or resize listeners are introduced.
