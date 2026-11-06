# Step 10: Case study reading aids

Validated 2026-11-07 on uiux-upgrade.

Add an absolutely positioned, CSS scroll-driven reading progress bar only for known case studies. Reuse the shared IntersectionObserver scrollspy for active TOC links in desktop and chip layouts, with existing accent/text tokens and 150ms feedback.

Browser checks verify 0-to-100% progress, all eight GameVault blocks at 390px and 1440px, and hidden progress on home, both 404 paths and reduced motion. No scroll or resize listeners are introduced.


## Validation

- All 20 repository tests and the production build pass.
- Protected-content diff against step 0 and whitespace checks pass.
- Both pages, both themes, all five viewports: 20 loads with equal clientWidth/scrollWidth and no console/page/CSP errors.
- Settled keyboard focus checks retain the 2px accent outline and 3px offset.
- Step-specific assertions passed; see feature-checks.json and feature-checks.cjs.
- Gzip change from step 0: JS 1700 bytes; CSS 1288 bytes. Both cumulative budgets pass.

## Lighthouse CLI medians

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1409.25 | 2.00 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 388.20 | 0.00 | 0.006489692 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3459.36 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 807.52 | 0.00 | 0.111059445 |

12 successful serial Lighthouse 13.6.0 runs with Chrome 156.0.8078.80 use the supplemental step 0 CLI method. Scores meet or exceed baseline, LCP elements match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared.

Existing page-load CLS remains nonzero. Native DevTools Lighthouse UI, paint flashing, and the native Layout Shifts track remain unverified as documented in step 0. CLI and browser automation evidence are supplemental.
