# Step 7: Project filter crossfade

Validated 2026-11-07 on uiux-upgrade.

﻿Crossfade project cards only after a filter click, with opacity-only entrances and tokenized timing. Preserve focus, original card numbering/order, and the existing live-region string. Initial page load does not animate cards; reduced motion changes filters instantly.

The stagger is capped at five delayed steps so all seven cards finish within the specified 395ms acceptance bound. Browser assertions cover Personal, Coursework, and All in normal and reduced-motion modes, preserving the original project indices and captions.


## Validation

- All 20 repository tests and the production build pass.
- Protected-content diff against step 0 and whitespace checks pass.
- Both pages, both themes, all five viewports: 20 loads with equal clientWidth/scrollWidth and no console/page/CSP errors.
- Settled keyboard focus checks retain the 2px accent outline and 3px offset.
- Step-specific assertions passed; see feature-checks.json and feature-checks.cjs.
- Gzip change from step 0: JS 1114 bytes; CSS 1041 bytes. Both cumulative budgets pass.

## Lighthouse CLI medians

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1375.15 | 2.00 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 384.75 | 0.00 | 0.006489692 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3458.42 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 827.93 | 0.00 | 0.111059445 |

Twelve successful serial Lighthouse 13.6.0 runs with Chrome 156.0.8078.80 use the supplemental step 0 CLI method. Scores meet or exceed baseline, LCP selectors match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared.

Existing page-load CLS remains nonzero. Native DevTools Lighthouse UI, paint flashing, and the native Layout Shifts track remain unverified as documented in step 0. CLI and browser automation evidence are supplemental.
