# Step 6: Shared micro-interactions

Validated 2026-11-07 on uiux-upgrade.

﻿Give button, link, card, segmented-control, contact, footer, and pager hover feedback matching keyboard focus states. Add tokenized arrow/external icon nudges, 80ms button press scaling, and the 220ms theme-thumb transition. Hover transforms remain gated to fine pointers and normal motion preferences.

Browser checks compare 12 sets of hover/focus computed styles, validate a 3px icon nudge and 0.97 press scale, and verify that touch/reduced-motion contexts retain untransformed hover affordances. Existing labels, images, targets, and layouts remain unchanged.


## Validation

- All 20 repository tests and the production build pass.
- Protected-content diff against step 0 and whitespace checks pass.
- Both pages, both themes, all five viewports: 20 loads with equal clientWidth/scrollWidth and no console/page/CSP errors.
- Settled keyboard focus checks retain the 2px accent outline and 3px offset.
- Step-specific assertions passed; see feature-checks.json and feature-checks.cjs.
- Gzip change from step 0: JS 1037 bytes; CSS 994 bytes. Both cumulative budgets pass.

## Lighthouse CLI medians

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1375.43 | 1.00 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 386.37 | 0.00 | 0.006489692 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3458.10 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 820.33 | 0.00 | 0.111059445 |

Twelve successful serial Lighthouse 13.6.0 runs with Chrome 156.0.8078.80 use the supplemental step 0 CLI method. Scores meet or exceed baseline, LCP selectors match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared.

Existing page-load CLS remains nonzero. Native DevTools Lighthouse UI, paint flashing, and the native Layout Shifts track remain unverified as documented in step 0. CLI and browser automation evidence are supplemental.
