# Step 8: Data reveals

Validated 2026-11-07 on uiux-upgrade.

﻿Trigger bar fills and the GPA plot sweep once on entering view. Keep values and axis labels readable, use the shared 640ms data duration, cap bar stagger at 280ms, and fade keyed semester rows in 150ms without moving focus or changing captions.

Reduced-motion and missing-observer contexts show fully drawn charts immediately. The shared observer hook now settles a running effect when reduced motion is enabled so preference changes cannot replay completed hero/data sequences. Browser checks cover Skills, the gym model comparison, GPA, semester focus/caption, no replay on re-entry, and both static fallbacks.
Home desktop was rechecked with five fresh runs after an initial one-point variance; its five-run median meets the baseline. The initial measurements remain under before-five-run-check/.


## Validation

- All 20 repository tests and the production build pass.
- Protected-content diff against step 0 and whitespace checks pass.
- Both pages, both themes, all five viewports: 20 loads with equal clientWidth/scrollWidth and no console/page/CSP errors.
- Settled keyboard focus checks retain the 2px accent outline and 3px offset.
- Step-specific assertions passed; see feature-checks.json and feature-checks.cjs.
- Gzip change from step 0: JS 1197 bytes; CSS 1166 bytes. Both cumulative budgets pass.

## Lighthouse CLI medians

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1372.05 | 2.50 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 385.04 | 0.00 | 0.006489692 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3458.16 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 827.78 | 0.00 | 0.111059445 |

14 successful serial Lighthouse 13.6.0 runs with Chrome 156.0.8078.80 use the supplemental step 0 CLI method. Scores meet or exceed baseline, LCP selectors match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared.

Existing page-load CLS remains nonzero. Native DevTools Lighthouse UI, paint flashing, and the native Layout Shifts track remain unverified as documented in step 0. CLI and browser automation evidence are supplemental.
