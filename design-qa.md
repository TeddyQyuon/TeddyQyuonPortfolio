# Design QA

- Reference: the supplied multi-page portfolio image and the 16 page mockups prepared for this redesign (`../output/mockups/pages/`).
- Implementation: React portfolio in `src/`; real project screenshots and profile photograph retained, conceptual covers labelled.
- Browser screenshot: captured locally with the headless harness `node artifacts/ui-review/browser.mjs after` (Vite preview on `127.0.0.1:4173` + headless Chrome via CDP). Captures are written to `artifacts/ui-review/after-*.png`.

## Surfaces to verify live

1. Desktop hero and real portrait at approximately 1440px wide.
2. Light About, Skills, Education, Academic Progress and résumé sections.
3. Dark Projects and Contact sections, including technology marks and cards.
4. All four case studies, screenshot/illustration labels, contribution and navigation.
5. Mobile hero, full-width navigation drawer and single-column project cards near 390px wide.

## Primary interactions to verify live

Navigation and deep links; project cards and case-study navigation; real external links; view/download résumé; email copy; mobile menu; missing-project state; image loads; browser console errors.

## Local verification result

- `npm run build` — passed.
- `npm run test:security` — 5/5 passed.
- Headless UI review — no runtime exceptions, no horizontal overflow at 1440px or 390px, no CSP violations.
- Desktop hero, projects, and case-study views match the mockups.
- Mobile: the section links and Resume button now collapse into the full-screen drawer behind a menu toggle (previously the desktop nav overflowed the bar at 390px). Drawer close control uses an X icon to match the mockup.

**Result: local QA passed.** Live-site interaction QA (external links, résumé download, email copy) still requires a published build.
