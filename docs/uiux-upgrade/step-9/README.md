# Step 9: Route enter loading and preload

Validated 2026-11-07 on uiux-upgrade.

Add a 220ms client-side pathname entrance while keeping direct visits and hash-only navigation static. Preload the existing case-study chunk on card/highlight hover and focus, and delay the unchanged Suspense fallback by 300ms.

All route/preload/loading browser checks pass, including a held chunk response and reduced motion. RouteView adds a text-free ancestor to the mobile case-study LCP selector; the same paragraph, text, snippet and closest three selector segments match the baseline. Raw selectors remain in the comparison evidence.


## Validation

- All 20 repository tests and the production build pass.
- Protected-content diff against step 0 and whitespace checks pass.
- Both pages, both themes, all five viewports: 20 loads with equal clientWidth/scrollWidth and no console/page/CSP errors.
- Settled keyboard focus checks retain the 2px accent outline and 3px offset.
- Step-specific assertions passed; see feature-checks.json and feature-checks.cjs.
- Gzip change from step 0: JS 1439 bytes; CSS 1198 bytes. Both cumulative budgets pass.

## Lighthouse CLI medians

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1383.95 | 6.00 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 386.67 | 0.00 | 0.006489692 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3458.94 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 819.21 | 0.00 | 0.111059445 |

12 successful serial Lighthouse 13.6.0 runs with Chrome 156.0.8078.80 use the supplemental step 0 CLI method. Scores meet or exceed baseline, LCP elements match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared.

Existing page-load CLS remains nonzero. Native DevTools Lighthouse UI, paint flashing, and the native Layout Shifts track remain unverified as documented in step 0. CLI and browser automation evidence are supplemental.
