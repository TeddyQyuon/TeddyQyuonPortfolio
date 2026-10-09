# Portfolio and project startup performance — 9 October 2026

Scope: portfolio, SOLE District, SCENTHAUS, MeterWise and Playlist Port. Existing content, genuine technology logos, security policies and checkout behavior are preserved.

## Changes

| Site | Verified cause and fix | Initial minified JavaScript before → after |
| --- | --- | --- |
| Portfolio | Load the case-study page on navigation; run hash scrolling once it has loaded. | 567,940 → 538,565 bytes (5.2% smaller) |
| SOLE District | Separate the management UI and product editor from storefront startup. | 402,790 → 321,634 bytes (20.1% smaller) |
| MeterWise | Separate chart code; estate sessions no longer seed the separate building demo or request its full session data. Building data is seeded when opened. | 617,894 → 252,334 bytes (59.2% smaller) |
| SCENTHAUS | Defer scientific imports and model artifacts until ML requests. Replace the second full-catalogue serialization with a distinct brand query. Load account-security UI on demand. | 390,179 → 378,967 bytes (2.9% smaller) |
| Playlist Port | Add a root rewrite to static output. Apply encrypted-session processing only to API routes, avoiding session work for page requests. | 169,282 bytes, unchanged |

These are startup download reductions, not claimed reductions in wall-clock page load or Core Web Vitals. Deferred features still download their chunks when used. Browser navigation timing and mobile emulation are unavailable in the provided cloud-browser API. Initial direct HTTP samples included several seconds of network/proxy overhead on every site and are not a reliable estimate of a Singapore visitor’s experience.

## Checks

- All five production frontend builds pass.
- Portfolio security suite: 4 pass, 1 Windows-specific skip.
- SOLE District Sites routing/package suite: 4 pass.
- MeterWise: TypeScript check, Ruff and all 46 Python tests pass. New regression verifies estate startup avoids building rows, tenant scope stays enforced, and opening the building demo provisions its normal data.
- SCENTHAUS: 15 frontend component tests, 2 focused Python startup/catalogue regressions and changed-file Ruff pass. The new catalogue test proves startup and ordinary browsing do not load ML artifacts and use three queries. The subprocess import check covers the mounted Vercel entrypoint and proves scientific serving/training modules are not imported at startup. The exported lifespan hook remains available to that entrypoint and performs no eager model loading. The full PostgreSQL/model-training suite was not run locally for this focused change. Local Playwright tests could not launch because the browser executable is absent; no pass is claimed for those tests.
- Playlist Port: all 34 Node tests pass, including OAuth, permissions, encrypted sessions, Free/Premium transfer fixtures and stale-document protection.

## Measurement files

`bundle-before.json` contains the previous local build outputs (including any retained duplicate hashes). `bundle-after.json` identifies initial assets from each generated index.html and records split chunks separately. Byte comparisons above use the matching prior production entry bundle rather than summing retained artifacts.

## Deployment verification

All five public releases are verified:

| Site | Source commit | Vercel deployment | Observed result |
| --- | --- | --- | --- |
| Portfolio | `9a990f357b415fa29672480ec36ee91ecdd846fb` | `dpl_BuLxsWEYHKFT92SqSbmCW5d2tjA7` | Homepage and deferred SOLE case study render. Direct `#features` navigation scrolls the section to 88px from the viewport top. |
| SOLE District | `310cf7ee884b8737aa9f49e486aa413b7e99137f` | `dpl_8EzJcQxLtNuqxVhgDUktSD9gEHTX` | Storefront renders; deferred management module reaches its staff sign-in screen. |
| MeterWise | `4203fa070fd779570d382d2cde4eeb8391e51b4a` | `dpl_AGiNyJeSZhKft1DGHUHb94AybFd4` | Estate metrics and split chart render; separate building dashboard and chart render on navigation. |
| Playlist Port | `f9ccc41ac037685b66361859a6cc521c2c3aa400` | `dpl_B68HgYy9fsQQvS9CcmsZwgWJAMRU` | Landing page renders and the Connect control becomes enabled after the session check. |
| SCENTHAUS | `4231ea2674a2b438c2d36998a46b236d4ad26b13` | `dpl_5n1YV3PEQ3BRg6THAEeWSfFmmNeU` | Public API returns 200 with 150 products and 35 brands. Catalogue and intelligence metrics render, including the new model version. Product details and both recommendation sections load after ML is deferred. |

Live verification caught a missing SCENTHAUS lifespan export used by backend/main.py. The public alias was restored to the previous working deployment while the export was retained as a lightweight context manager. The regression now tests the mounted production entrypoint. The corrected release is READY, is assigned to the public alias, and returns successful API responses.

`live-http.json` records public document and initial-script HTTP responses for all five verified releases. Browser extension metadata errors were excluded from app checks; no application console error was observed on those three static browsing flows. Browser session checks and screenshots do not constitute a new real Spotify transfer, a real purchase or an authenticated merchant-operation test.


## Remaining performance limits

SCENTHAUS catalogue response timing reported 5,367.6 ms of server processing in the final sample, compared with 5,882 ms in the earlier sample. This is a small sample, not evidence of a sustained latency improvement; backend and database latency still need monitoring. Browser/API traffic is subject to network overhead. The root Playlist response keeps `no-store` and reported a Vercel cache MISS, so this report does not claim an edge-cache hit or a measured cold-start reduction.
