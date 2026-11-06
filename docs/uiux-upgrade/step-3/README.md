# Step 3: static sections and shared in-view hook

Validated 2026-11-07 on branch uiux-upgrade, following step 2 commit 598025b. Step 4 has not started.

HomePage now renders Hero, Projects, Stack, Academics, and Contact directly in the same order. The generic section wrapper component and all of its CSS, including the reduced-motion override, are removed. No Reveal references or .reveal selectors remain under src. Section text is opaque and untransformed from the first sampled frame, including direct /#contact visits.

The new useInView hook returns [ref, state], uses the shared rootMargin and 0.25 threshold defaults, accepts native observer option overrides, and runs once. Skip, reduced motion, and missing IntersectionObserver return done. A live preference/skip change settles pending blocks, observers disconnect, and late callbacks after cleanup are ignored. The callback also checks the normalized native threshold so an initially partial intersection below 25% does not start motion. This hook is prepared for subsequent data/hero integration and is tested through an isolated production React fixture with production CSP.

## Font-loading reservation

Removing the hidden section wrappers exposed an existing font-load movement: the hero introduction shrinks from four fallback-font lines to three Inter lines, moving the now-visible Projects section. The initial desktop CLS was 0.019782005 versus baseline 0.008179001.

base.css now reserves four line-heights for the desktop hero introduction at min-width 961px, the complement of the existing 960px layout breakpoint. It preserves the fonts and meaningful text visibility, keeps the original LCP element, and prevents that section movement. The intentional settled layout adjustment is approximately one line of reserved space in the desktop introduction. Mobile layout and existing breakpoints are unchanged. See before-layout-reservation/ for initial measurements and hero-reserved-desktop.json for the targeted check.

## Validation

- npm.cmd test: 20/20 passed. Existing tests were unchanged.
- npm.cmd run build: passed, Vite 7.3.7.
- Content lock against step 0 and git diff --check: passed. Data, public files, rendered copy, images, link targets, dependencies, section order, and color tokens are unchanged.
- Responsive matrix: both pages, both themes, all five required viewport sizes; 20 successful loads, equal document clientWidth/scrollWidth, no console/page/CSP errors. Normal scrollbars are enabled as in step 2 so the stable gutter is measured correctly. See browser-checks.json.
- Settled keyboard checks: 67 home and 35 case-study non-body focus observations meet the 2px accent outline and 3px offset requirements, sampled after 100ms and two rendered frames. This retains the baseline computed-style verification scope.
- Direct /#contact: both themes, 390x844 and 1440x900, reduced and normal motion; all eight visits land on a visible contact heading. All five sections are opaque and untransformed on the first sampled frame and stay in the original order. Missing-observer contact navigation also passes. See step3-checks.json and the four contact screenshots.
- Hook probes: default/overridden options, false intersection, below-threshold intersection, exact threshold, one-time run, disconnect, initial/live skip, initial/live reduced motion, missing observer, cleanup with queued callbacks, and native browser intersection all pass. Native and simulated checks confirm that 10% visibility stays pending and 25% triggers run.
- Gzip delta from step 0: JavaScript -35 bytes; CSS +276 bytes. See bundles.json. The hook is not yet imported by production components, so current JS shrinks after removing the old wrapper.

## Lighthouse CLI medians

Lighthouse 13.6.0, Chrome 156.0.8078.80; three successful serial runs per page/device, using the supplemental step 0 CLI method.

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | LCP delta ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1372.93 | -1.75 | 1.00 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 386.22 | -0.50 | 0.00 | 0.006813705 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3461.92 | 3.31 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 825.02 | -3.35 | 0.00 | 0.111059445 |

All four category medians meet or exceed baseline, all LCP selectors match, LCP/TBT stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared. See lighthouse-summary.json, lighthouse-comparison.json, and the 12 raw reports.

Existing page-load CLS is not zero. The comparison meets the baseline bar; font and lazy case-study loading debt remains. Native DevTools Lighthouse UI runs, paint flashing, and the native Layout Shifts track remain unverified, as recorded in step 0. CLI and PerformanceObserver evidence are supplemental.
