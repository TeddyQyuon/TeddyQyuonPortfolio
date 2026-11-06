# Step 0: baseline

Recorded 2026-11-07 against application commit `d6c4f74`, before any application changes. Branch: `uiux-upgrade`. Only the supplied `UIUX_UPGRADE.md` and this baseline directory are committed for this step. No implementation step has started.

## Method and limitation

The requested Chrome DevTools Lighthouse UI could not be operated: initializing the installed Computer Use runtime succeeded, but `sky.list_apps()` returned `Computer Use native pipe is unavailable: failed to connect native pipe: The system cannot find the file specified. (os error 2)`.

The numbers below are **actual Lighthouse CLI measurements, supplemental to the unavailable DevTools baseline**. They must not be represented as DevTools runs or an exact-method pass. Lighthouse 13.6.0 was run serially, three fresh runs per route/device, with installed Chrome 156.0.8078.80 in headless mode, using the default mobile configuration and `--preset=desktop`. The raw reports retain settings, timestamps, audit details and screenshots. Measurements used the default dark theme. Mobile Lighthouse uses 412x823 emulation, simulated network throttling and 4x CPU slowdown; screenshot dimensions are separate.

The app was built with Node 24.15.0 and Vite 7.3.7 and served by `npm run preview` at `http://127.0.0.1:4174`, including production CSP headers. `npm ci` restored only existing lockfile dependencies. Lighthouse and cached Playwright 1.49.0 were used outside project dependencies; neither manifest nor lockfile changed. Playwright drove the installed Chrome for screenshots and supplemental checks.

## Lighthouse medians (three runs each)

| Route | Device | Performance | Accessibility | Best Practices | SEO | LCP ms | TBT ms | CLS |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | Mobile | 100 | 100 | 100 | 100 | 1374.68 | 5.50 | 0.000203425 |
| `/` | Desktop | 100 | 100 | 100 | 100 | 386.71 | 0 | 0.008179001 |
| `/projects/gamevault-marketplace` | Mobile | 80 | 100 | 100 | 100 | 3458.60 | 0 | 0.215666367 |
| `/projects/gamevault-marketplace` | Desktop | 92 | 100 | 100 | 100 | 828.37 | 0 | 0.172842282 |

These are baseline values, so comparison deltas are zero by definition. Existing GameVault CLS is substantial; step 0 records it without changing code. No Lighthouse runtime errors or run warnings occurred. Lighthouse's additional agentic-browsing category is retained in raw evidence but is outside the spec's four-category quality bar.

LCP elements were identical across all three runs within each group:

| Route/device | LCP selector |
|---|---|
| Home, mobile and desktop | `div.container > section#overview > div.hero-main > p.hero-intro` |
| GameVault, mobile | `main#main-content > div.container > header.panel > p.hero-role` |
| GameVault, desktop | `div.case-layout > div.case-content > section#overview > p.lead` |

The home non-composited animation audit lists the existing `.status-dot` `pulse` animation, with unsupported `box-shadow`. GameVault lists no items. Future comparisons should use these recorded elements and findings, not the spec's expected element alone.

See [lighthouse-summary.json](lighthouse-summary.json) for per-run measurements and exact settings, and `home-{mobile,desktop}-{1,2,3}.json` / `gamevault-{mobile,desktop}-{1,2,3}.json` for complete reports.

## Bundle gzip baseline

Sizes use Node `zlib.gzipSync` and 1024-byte KiB, matching the spec's calculation.

| Asset | Raw bytes | Gzip bytes | Gzip KiB |
|---|---:|---:|---:|
| `index-Be80nq9d.js` | 328211 | 111736 | 109.12 |
| `ProjectPage-BtM6etZU.js` | 7485 | 2358 | 2.30 |
| **JS total** | **335696** | **114094** | **111.42** |
| `index-DUn18CC7.css` | 25626 | 5850 | 5.71 |

JS and CSS delta: **0 bytes**. Exact data: [bundles.json](bundles.json).

## Screenshots

All eight are viewport screenshots at device scale factor 1 after load settles. Theme was set using the existing `tq-theme` storage key before page scripts ran, and the resulting `data-theme` was asserted. All eight images were visually inspected.

| Route | Dark mobile | Light mobile | Dark desktop | Light desktop |
|---|---|---|---|---|
| Home | [390x844](home-dark-390x844.png) | [390x844](home-light-390x844.png) | [1440x900](home-dark-1440x900.png) | [1440x900](home-light-1440x900.png) |
| GameVault | [390x844](gamevault-dark-390x844.png) | [390x844](gamevault-light-390x844.png) | [1440x900](gamevault-dark-1440x900.png) | [1440x900](gamevault-light-1440x900.png) |

## Acceptance and quality checks

- **Numbers written down: pass**, with the DevTools-method limitation above.
- **Screenshots: pass**, two pages x two sizes x two themes.
- **Content lock: pass.** `git diff --exit-code -- src/data public index.html vercel.json package.json package-lock.json` exited 0; `git diff -- src` was empty. Rendered text and application files were untouched.
- **Tests: pass**, 14/14 after restoring dependencies; [tests.txt](tests.txt).
- **Production build: pass**; [build.txt](build.txt).
- **CSP: pass for observed loads**, production headers recorded in [preview-headers.txt](preview-headers.txt); no console errors or page errors across the 20 route/theme/viewport loads.
- **Responsive overflow: pass for observed loads**, `scrollWidth === clientWidth` for both routes, both themes, at 360x740, 390x844, 768x1024, 1280x800 and 1440x900.
- **Reduced motion: partial verification.** At 1440x900 on both routes with emulated reduce, no running animations remained after load; final KPI values were present and all home bars had identity transforms. KPI text in raw evidence includes both visible and sr-only copies. This does not prove first-paint values, every interaction path, or zero motion during the initial load. The GPA, filter, semester, route and theme interaction requirements were not exhaustively exercised in step 0.
- **Keyboard focus: computed-style pass at desktop.** Automated Tab traversal on both pages at 1440x900, with a 50 ms render settle after each Tab, produced 67 home and 35 case-study non-body focus observations (including wraparound). All had the 2 px accent outline and 3 px offset. Skip-link focused top was 12 px (0.75rem). This is not a full visual focus, mobile menu, occlusion or hover-parity audit. Initial immediate post-Tab sampling read stale styles; only settled rerun results are retained.
- **CLS: recorded, not zero.** See medians above and supplemental PerformanceObserver entries. The native DevTools Layout Shifts track and paint flashing were not available. Application changes contribute zero because no application code changed.
- **Lighthouse: supplemental measurements complete**, 12 successful CLI runs; exact requested DevTools method unverified.
- **Bundle delta: zero.** No runtime dependency added.

Supplemental browser evidence: [browser-checks.json](browser-checks.json). The initial build/test attempts before `npm ci` failed because `node_modules` was missing; the recorded validation logs are the successful post-install runs.

## Reproduction

From the repository root, restore the existing lockfile with `npm ci`, then run `npm test`, `npm run build` and `npm run preview` in a separate terminal. Keep other browser workloads idle while measuring.

- Run `powershell -File docs/uiux-baseline/lighthouse.ps1` for the supplemental CLI measurements and summary. This uses external npm cache Lighthouse 13.6.0.
- Run `node docs/uiux-baseline/capture.cjs` for screenshots and supplemental browser checks. Its external cached Playwright path is explicit and may need adjustment on another machine; do not add it to project dependencies.
- Run `node docs/uiux-baseline/summarize.cjs` to regenerate medians from existing reports.
- Bundle command from the spec: `node -e "const fs=require('fs'),z=require('zlib');for(const f of fs.readdirSync('dist/assets'))if(/\.(js|css)$/.test(f))console.log(f,(z.gzipSync(fs.readFileSync('dist/assets/'+f)).length/1024).toFixed(2)+' KB')"`.

**Deviation from the spec:** CLI Lighthouse supplied as supplemental evidence because native DevTools control was unavailable. No implementation deviation or source change. Exact DevTools baseline remains unverified. Stop here; step 1 requires the user's next instruction.
