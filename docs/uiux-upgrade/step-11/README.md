# Step 11: Theme crossfade

Validated 2026-11-07 on uiux-upgrade.

Use a 220ms native View Transition for theme changes, retaining the existing theme attribute, localStorage key and theme-color meta behavior. Apply changes synchronously inside the transition callback; reduced motion and unsupported browsers switch directly.

Browser checks exercise the real API, a reduced-motion context and a missing-API context. The stored choice survives a new page, and no console/CSP errors occur.
Both homepage devices were rechecked with five fresh runs after the initial batch's simulated-LCP variance. The five-run medians meet the baseline gates. Initial reports remain in before-five-run-check/. In those reports, observed LCP stayed near 330ms mobile/360ms desktop even when simulated LCP jumped to roughly 3200ms/830ms; no source or measurement settings were changed for the recheck.


## Validation

- All 20 repository tests and the production build pass.
- Protected-content diff against step 0 and whitespace checks pass.
- Both pages, both themes, all five viewports: 20 loads with equal clientWidth/scrollWidth and no console/page/CSP errors.
- Settled keyboard focus checks retain the 2px accent outline and 3px offset.
- Step-specific assertions passed; see feature-checks.json and feature-checks.cjs.
- Gzip change from step 0: JS 1768 bytes; CSS 1322 bytes. Both cumulative budgets pass.

## Lighthouse CLI medians

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1374.03 | 3.00 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 399.18 | 0.00 | 0.006489692 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3458.09 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 827.79 | 0.00 | 0.111059445 |

16 successful serial Lighthouse 13.6.0 runs with Chrome 156.0.8078.80 use the supplemental step 0 CLI method. Scores meet or exceed baseline, LCP elements match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared.

Existing page-load CLS remains nonzero. Native DevTools Lighthouse UI, paint flashing, and the native Layout Shifts track remain unverified as documented in step 0. CLI and browser automation evidence are supplemental.
