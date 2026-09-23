# Design QA

- Reference: the original portfolio UI (git `main`) plus the supplied technology brand marks.
- Implementation: React portfolio in `src/`. The earlier mockup-driven redesign was reverted; the original UI is restored and enhanced only with verified Devicon technology logos and the two labelled illustrative project covers.
- Browser screenshot: captured locally with the headless harness `node artifacts/ui-review/browser.mjs after` (Vite preview on `127.0.0.1:4173` + headless Chrome via CDP). Captures are written to `artifacts/ui-review/after-*.png`.

## Surfaces to verify live

1. Desktop hero and real portrait at approximately 1440px wide.
2. Light About, Skills, Education, Academic Progress and résumé sections.
3. Dark Projects and Contact sections, including technology marks and cards.
4. All four case studies, screenshot/illustration labels, contribution and navigation.
5. Mobile hero, navigation drawer and single-column project cards near 390px wide.

## Primary interactions to verify live

Navigation and deep links; project cards and case-study navigation; real external links; view/download résumé; email copy; mobile menu; missing-project state; image loads; browser console errors.

## Local verification result

- `npm run build` — passed.
- `npm run test:security` — 5/5 passed.
- Headless UI review — no runtime exceptions, no horizontal overflow at 1440px or 390px, no CSP violations.
- Technology brand logos render in skill chips, project cards and case-study technology lists (28 on the homepage).
- The two projects without screenshots use their labelled illustrative covers; the rest keep real report figures.

**Result: local QA passed.** Live-site interaction QA (external links, résumé download, email copy) still requires a published build.
