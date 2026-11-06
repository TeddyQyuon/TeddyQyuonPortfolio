# Step 1: motion tokens

Validated 2026-11-07 on branch uiux-upgrade, against step 0 commit f205a3e.

The interrupted implementation was already present. src/styles/tokens.css and src/motion/tokens.js match the token blocks in section 3 of UIUX_UPGRADE.md exactly. The existing --ease token now aliases --ease-out. No JSX, rendered text, colors, dependencies, or protected content files changed.

Validation:

- npm.cmd test: 14 passed, 0 failed.
- npm.cmd run build: passed with Vite 7.3.7.
- Protected-file diff and git diff --check: passed.
- CSS and JS token blocks: exact spec match; duration parity passed through loadDataModule.
- Production preview: HTTP 200, production CSP headers present.
- 20 browser loads: both pages, both themes, all five required viewport sizes; no console/page errors and no horizontal overflow.
- Keyboard checks: 67 home and 35 case-study non-body focus observations, all with the required 2px outline and 3px offset. Same computed-style scope as baseline.
- Reduced-motion checks: no running animations after load; final KPI values and fully drawn bars. This does not add first-paint or complete interaction verification beyond the step 0 method.
- Eight settled screenshots: five pixel-identical to baseline; the remaining three differ only within the pre-existing pulsing status dot (at most 88 pixels). See screenshot-comparison.json.
- Gzip bundle growth: JavaScript +1 byte; CSS +161 bytes. See bundles.json.

Lighthouse 13.6.0 with Chrome 156.0.8078.80, three fresh serial CLI runs per route/device, same settings as the step 0 supplemental baseline:

| Route/device | Performance | Accessibility | Best practices | SEO | LCP ms | LCP delta ms | TBT ms | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Home mobile | 100 | 100 | 100 | 100 | 1378.83 | +4.15 | 7 | 0.000203425 |
| Home desktop | 100 | 100 | 100 | 100 | 384.68 | -2.03 | 0 | 0.004318221 |
| GameVault mobile | 80 | 100 | 100 | 100 | 3459.71 | +1.11 | 0 | 0.215666367 |
| GameVault desktop | 92 | 100 | 100 | 100 | 823.44 | -4.92 | 0 | 0.172842282 |

All four score medians match baseline. LCP and TBT deltas meet the spec allowances; CLS is unchanged or lower. All LCP selectors match baseline. No Lighthouse run warnings or new non-composited animations were found. See lighthouse-comparison.json, lighthouse-summary.json, and the 12 raw reports.

Method limitation carried from step 0: these are supplemental Lighthouse CLI measurements. Native DevTools UI measurements, paint flashing, and the native Layout Shifts track remain unverified. Existing GameVault CLS is baseline debt and is not fixed in step 1.

The initial sandboxed browser checks blocked external Google Fonts, so those measurements and screenshots were discarded and replaced with a complete unrestricted rerun. No application code was changed to work around the environment.

Only the two step 1 source files are committed. Step 2 has not started.
