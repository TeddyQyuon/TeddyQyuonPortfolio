# Step 2: motion guardrails and existing motion cleanup

Validated 2026-11-07 on branch uiux-upgrade, following step 1 commit cf7387a. Step 3 has not started.

Implemented the six required motion guardrails in tests/motion.test.mjs. They cover keyframe location and animated properties, allowed transition properties, will-change, the reduced-motion override, complete CSS/JS duration parity (including duplicate and non-ms overrides), and CSP-sensitive style creation.

Existing animations now live in motion.css, imported last. The status dot uses a transform/opacity ping lasting 1600 ms for three cycles. Cards keep their position on hover; thumbnail/screenshot zoom has keyboard parity and is gated to fine hover pointers and no-preference motion. Buttons scale on press, and feedback transitions use explicit background-color. The page reserves its scrollbar gutter.

CountUp now reserves its final width, defaults to 800 ms, supports controlled start/delay, cancels timers and animation frames, and renders final values immediately for reduced motion or missing IntersectionObserver. Its assistive-text value is unchanged. The decorative span is keyed by displayed character count: right-aligned digit-boundary updates initially caused +0.000279 mobile CLS despite a fixed outer width. Remounting only that span removes the internal glyph shift without changing digits, alignment, or the screen-reader node. All three final GameVault mobile Lighthouse runs contain no count-up shift entries. Earlier evidence is retained under before-counter-fix/.

## Validation

- npm.cmd test: 20/20 passed, including all six motion guardrail tests.
- npm.cmd run build: passed, Vite 7.3.7.
- Protected-content diff against step 0 and git diff --check: passed. No existing tests, dependencies, copy, images, routes, section order, breakpoints, or color tokens changed.
- Production preview serves the configured CSP. Browser checks recorded no console or page errors.
- Responsive matrix: both pages, both themes, 360x740, 390x844, 768x1024, 1280x800, and 1440x900. All 20 document clientWidth/scrollWidth pairs are equal. See browser-checks.json.
- Scrollbar method: the matrix uses normal scrollbar behavior by removing Playwright's --hide-scrollbars default. With that default, a reserved 15px gutter makes scrollWidth smaller than clientWidth, despite no horizontal overflow. Those initial observations are retained in browser-checks-hidden-scrollbars.json. Viewport screenshots include the scrollbar and expected gutter-related layout differences from step 0.
- Keyboard: 67 home and 35 case-study non-body focus observations pass the 2px accent outline and 3px offset checks after 100 ms plus two rendered frames. The skip-link and focus order remain unchanged. This is computed-style verification, not a complete native visual audit.
- Reduced motion: final KPI values were present on the first sampled animation frame on both routes, no running animations remained, and bars were fully drawn. Live preference changes also settle counters immediately. See motion-checks.json.
- Runtime tests: explicit hold, delayed start, 800ms completion, decimals, non-numeric values, pending-timer cancellation, running-frame cancellation, unmount cleanup, missing-observer fallback, fixed counter widths and unit positions, three-cycle ping, no card lift, keyboard zoom parity, and no touch hover transforms passed. The production React CountUp module was also tested in an isolated fixture with the production CSP.
- Bundle growth from step 0: JavaScript +121 bytes gzip; CSS +291 bytes gzip. See bundles.json.

## Lighthouse CLI medians

Lighthouse 13.6.0, Chrome 156.0.8078.80, three successful serial CLI runs per route/device with the same Lighthouse settings as the supplemental step 0 baseline.

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | LCP delta ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| home mobile | 100 | 100 | 100 | 100 | 1374.31 | -0.37 | 6.00 | 0.000203425 |
| home desktop | 100 | 100 | 100 | 100 | 389.01 | 2.30 | 0.00 | 0.003672477 |
| gamevault mobile | 80 | 100 | 100 | 100 | 3457.31 | -1.29 | 0.00 | 0.215666367 |
| gamevault desktop | 96 | 100 | 100 | 100 | 826.16 | -2.21 | 0.00 | 0.111059445 |

All score medians meet or improve on baseline. LCP selectors are unchanged, LCP/TBT deltas stay within allowances, CLS is unchanged or lower, and no new non-composited animations or run warnings appeared. GameVault desktop performance improves from 92 to 96. See lighthouse-comparison.json, lighthouse-summary.json, and the 12 raw reports.

Existing page-load shifts from the lazy case-study load and fonts remain: whole-page CLS is not zero. This step removes the new counter shifts and meets the no-regression comparison; it does not claim to fix that baseline debt. Native DevTools Lighthouse UI runs, paint flashing, and the native Layout Shifts track remain unverified, as recorded in step 0. CLI and PerformanceObserver evidence are supplemental.
