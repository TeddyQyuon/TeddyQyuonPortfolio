# Design QA

- Reference: the supplied multi-page portfolio image and the 16 page mockups prepared for this redesign (`../output/mockups/pages/`).
- Implementation: React portfolio in `src/`; real project screenshots and profile photograph retained, conceptual covers labelled.
- Browser screenshot: pending. The local preview URL `http://terminal.local:4173/` was blocked by the cloud browser (`ERR_BLOCKED_BY_CLIENT`), and this workspace could not bind a usable local preview server. The production URL must be checked after publishing.

## Surfaces to verify live

1. Desktop hero and real portrait at approximately 1440px wide.
2. Light About, Skills, Education, Academic Progress and résumé sections.
3. Dark Projects and Contact sections, including technology marks and cards.
4. All four case studies, screenshot/illustration labels, contribution and navigation.
5. Mobile hero, full-width navigation drawer and single-column project cards near 390px wide.

## Primary interactions to verify live

Navigation and deep links; project cards and case-study navigation; real external links; view/download résumé; email copy; mobile menu; missing-project state; image loads; browser console errors.

**Result: blocked** — code build and security checks passed, but visual browser QA and live-site interaction QA require a published build.
