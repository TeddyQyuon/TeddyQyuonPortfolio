# Step 12: Type and layout polish

Validated 2026-11-07 on uiux-upgrade.

Map stylesheet sizes to the specified type tokens while preserving SVG viewBox sizes and the KPI unit exception. Balance headings and use pretty wrapping on prose. Keep existing colors, breakpoints and content intact.

Computed-style checks verify the mapped sizes and wrapping at 360px and 1440px. Every stylesheet font-size now uses a type token or one of the documented exceptions; color tokens match step 0 exactly.
The first mapped-type batch exposed font-swap wrapping shifts. Reserve the hero's wrapped intro/objective, the narrow status pill and the desktop project introduction, and keep case-study facts in one column through the existing 420px breakpoint. These static reservations retain visible text and final typography while avoiding the newly exposed shifts. Initial measurements are retained in before-layout-reservation/.
Also reserve the primary hero CTA width using spacing tokens. This prevents its font-loading expansion from moving the adjacent resume button. The intermediate reports remain in before-cta-width-reservation/.


## Validation

- All 20 repository tests and the production build pass.
- Protected-content diff against step 0 and whitespace checks pass.
- Both pages, both themes, all five viewports: 20 loads with equal clientWidth/scrollWidth and no console/page/CSP errors.
- Settled keyboard focus checks retain the 2px accent outline and 3px offset.
- Step-specific assertions passed; see feature-checks.json and feature-checks.cjs.
- Gzip change from step 0: JS 1767 bytes; CSS 1515 bytes. Both cumulative budgets pass.

## Lighthouse CLI medians

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1374.09 | 3.50 | 0.000010138 |
| home desktop | 100 | 100 | 100 | 100 | 388.77 | 0.00 | 0.006986194 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3459.24 | 0.00 | 0.215260638 |
| gamevault desktop | 96 | 100 | 100 | 100 | 826.83 | 0.00 | 0.105698909 |

12 successful serial Lighthouse 13.6.0 runs with Chrome 156.0.8078.80 use the supplemental step 0 CLI method. Scores meet or exceed baseline, LCP elements match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared.

Existing page-load CLS remains nonzero. Native DevTools Lighthouse UI, paint flashing, and the native Layout Shifts track remain unverified as documented in step 0. CLI and browser automation evidence are supplemental.
