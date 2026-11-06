# Step 5: Top bar navigation and motion

Validated 2026-11-07 on uiux-upgrade.

﻿Add a shared observer-based scrollspy, desktop active indicators, progressive mobile menu transitions, keyed icon swaps, and scroll-linked top-bar elevation. Escape restores focus to the toggle. Reduced motion and missing starting-style support retain instant menu behavior.

The final short section gets priority within the activation band when it cannot physically reach the reading line at document end; this keeps Contact active without adding scroll listeners. One observer and the specified root margin are retained. Browser assertions cover all five active states, no case-page nav indicator, 220ms open/150ms close, 150ms icon swap, focus restoration, elevation at 96px, and both fallback paths.


## Validation

- All 20 repository tests and the production build pass.
- Protected-content diff against step 0 and whitespace checks pass.
- Both pages, both themes, all five viewports: 20 loads with equal clientWidth/scrollWidth and no console/page/CSP errors.
- Settled keyboard focus checks retain the 2px accent outline and 3px offset.
- Step-specific assertions passed; see feature-checks.json and feature-checks.cjs.
- Gzip change from step 0: JS 1037 bytes; CSS 851 bytes. Both cumulative budgets pass.

## Lighthouse CLI medians

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1385.73 | 2.50 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 386.07 | 0.00 | 0.006489692 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3458.33 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 824.29 | 0.00 | 0.111059445 |

Twelve successful serial Lighthouse 13.6.0 runs with Chrome 156.0.8078.80 use the supplemental step 0 CLI method. Scores meet or exceed baseline, LCP selectors match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared.

Existing page-load CLS remains nonzero. Native DevTools Lighthouse UI, paint flashing, and the native Layout Shifts track remain unverified as documented in step 0. CLI and browser automation evidence are supplemental.
