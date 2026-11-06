# Step 4: Hero dashboard boot

Validated 2026-11-07 on uiux-upgrade.

﻿Run the hero dashboard boot once per document, triggered by its first in-view intersection. Preserve static reading text; stagger the profile/KPIs and scan using the shared tokens. Hero counters show final values immediately on reduced-motion, missing-observer, and return visits. The status ping also stays settled on return visits.

The browser trace confirms the 420ms entrances, 120/180/240/300ms card delays, 240/300/360/420ms count timers, 700ms scan at 360ms, completion within 1300ms, mobile scroll trigger, and no replay after case-study navigation. A zero-duration counter path supports the settled state without flashing zero. See feature-checks.json.


## Validation

- All 20 repository tests and the production build pass.
- Protected-content diff against step 0 and whitespace checks pass.
- Both pages, both themes, all five viewports: 20 loads with equal clientWidth/scrollWidth and no console/page/CSP errors.
- Settled keyboard focus checks retain the 2px accent outline and 3px offset.
- Step-specific assertions passed; see feature-checks.json and feature-checks.cjs.
- Gzip change from step 0: JS 574 bytes; CSS 491 bytes. Both cumulative budgets pass.

## Lighthouse CLI medians

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1376.75 | 0.50 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 388.88 | 0.00 | 0.006489692 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3464.16 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 823.41 | 0.00 | 0.111059445 |

Twelve successful serial Lighthouse 13.6.0 runs with Chrome 156.0.8078.80 use the supplemental step 0 CLI method. Scores meet or exceed baseline, LCP selectors match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared.

Existing page-load CLS remains nonzero. Native DevTools Lighthouse UI, paint flashing, and the native Layout Shifts track remain unverified as documented in step 0. CLI and browser automation evidence are supplemental.
