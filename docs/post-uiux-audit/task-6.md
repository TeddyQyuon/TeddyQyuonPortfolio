# Task 6: case-study layout shift

## Investigation

Reproduced with a production build and its Vercel CSP on 127.0.0.1:4174. Lighthouse CLI 13.6.0 / Chrome 156 ran three serial navigations for each page/form factor before and after. Mobile uses Lighthouse defaults; desktop uses --preset=desktop. Compact per-run metrics, LCP identities and layout-shift audit sources are in lighthouse-before.json and lighthouse-after.json. Full raw CLI reports remain outside the repository.

The PerformanceObserver evidence contains every source node's previousRect/currentRect and hadRecentInput, for direct loads, client navigation, an 800 ms delayed route chunk and delayed Google font responses. See layout-observer-before.json and layout-observer-after.json.

| Suspect | Result |
|---|---|
| Suspense fallback replacement | Confirmed dominant cause. The short loading paragraph puts the footer at y=305.6; replacing it moves the footer out of view. Observer contribution: 0.201650 mobile, 0.102257 desktop. Delaying only the route chunk moves the same shift later. Lighthouse also names footer.footer as the dominant shifting element. |
| Unsized screenshots | Confirmed separately on scroll. Figures, captions, reflection and pager move as lazy screenshots decode: up to 0.279200 mobile / 0.122165 desktop in the controlled scroll test. Images previously had no width/height or aspect ratio. |
| Web-font swap | Confirmed small residual cause. Delayed-font tests show shifts in the breadcrumb, hero, action links, facts and downstream case layout at font-load time, around 0.000144 mobile / 0.005256 desktop after the fix. No font delivery change is needed to meet 0.1. |
| KPI grid / CountUp | No independent digit-width shift reproduced. The existing reserved ch widths work. Delayed monospace-font loading moves numeric text slightly (part of the font-swap entry); no KPI fix was needed. |
| Sticky TOC / facts wrapping | No independent sticky or wrapping shift reproduced after fonts settle. The facts and case layout participate in the small font-driven reflow. Their sticky/layout rules remain unchanged. |

Lighthouse heuristically attributed the footer shift to a brand icon even though that icon already has explicit 16×16 dimensions. The delayed-chunk/font experiments establish the fallback replacement as the dominant cause rather than relying on that heuristic attribution.

## Fix and verification

src/styles/base.css reserves one viewport minus the top bar for .route-view (vh fallback, then svh). This keeps the footer outside the initial viewport while the existing fallback loads. src/components/projects/CaseStudyBody.jsx supplies intrinsic width/height to existing screenshots from screenshotDimensions.jsx. No source image, text, target, content order, route animation or font configuration changed.

All 20 tests and the production build pass. The protected-file diff against origin/main exits 0; the AST content-lock check passes across 43 source files. Playwright checked all seven case studies at 390 and 1440 px: 42 rendered screenshots have attributes matching their natural dimensions, identical settled rectangles to baseline, and no overflow or console/CSP errors. All controlled screenshot-scroll tests now record zero shifts. Client-navigation shifts either disappeared or were within the recent-input exclusion; no counted client-navigation shift remained.

## Lighthouse medians (three runs each)

| Page / form factor | CLS before → after | LCP ms before → after | Performance before → after |
|---|---:|---:|---:|
| home mobile | 0.000010 → 0.000010 | 1377.6 → 1377.3 | 100 → 100 |
| home desktop | 0.006986 → 0.006986 | 393.7 → 385.9 | 100 → 100 |
| gamevault mobile | 0.215261 → 0.000194 | 3459.2 → 3460.7 | 80 → 91 |
| gamevault desktop | 0.105699 → 0.006619 | 824.4 → 804.8 | 96 → 100 |
| sole mobile | 0.215301 → 0.000234 | 3460.8 → 3383.2 | 80 → 91 |
| sole desktop | 0.117949 → 0.000392 | 811.7 → 766.9 | 96 → 100 |
| gym mobile | 0.215102 → 0.000036 | 3461.1 → 3460.4 | 80 → 91 |
| gym desktop | 0.101651 → 0.000392 | 965.8 → 968.7 | 96 → 99 |

All case-study medians are below 0.1, home CLS is unchanged, Performance does not fall, and LCP remains within baseline +50 ms. LCP selectors remain within the baseline identities. Gym desktop already alternated between the hero h1 and overview paragraph at baseline; that variability is recorded rather than treated as a new element.

Audit bundle growth is JS +372 bytes gzip and CSS +18 bytes gzip. Including the prior upgrade's measured step-0 deltas, cumulative growth is JS 2,139 / 3,072 bytes and CSS 1,533 / 2,560 bytes. Per-file sizes are in baseline-bundles.json and after-bundles.json.

## Existing images receiving intrinsic attributes

Every row refers to the existing img in the screenshot loop; no images were replaced. Pixel dimensions were read from the original assets and verified against browser naturalWidth/naturalHeight.

| Source asset | width | height |
|---|---:|---:|
| src/assets/images/projects/current/gamevault.webp | 1348 | 926 |
| src/assets/images/projects/gamevault/gamevault-product.jpg | 1440 | 900 |
| src/assets/images/projects/gamevault/gamevault-subscriptions.jpg | 1440 | 900 |
| src/assets/images/projects/current/sole-district.webp | 1348 | 926 |
| src/assets/images/projects/sole-district/product-20261008.jpg | 1348 | 926 |
| src/assets/images/projects/sole-district/checkout-20261008.jpg | 1348 | 926 |
| src/assets/images/projects/current/scenthaus.webp | 1348 | 926 |
| src/assets/images/projects/scenthaus/storefront-verified.jpg | 1348 | 926 |
| src/assets/images/projects/scenthaus/quick-add-verified.jpg | 1363 | 936 |
| src/assets/images/projects/scenthaus/checkout-verified.jpg | 1348 | 2053 |
| src/assets/images/projects/scenthaus/payment-confirmed.jpg | 790 | 936 |
| src/assets/images/projects/scenthaus/admin-overview.png | 1440 | 2147 |
| src/assets/images/projects/current/meterwise.webp | 1348 | 926 |
| src/assets/images/projects/meterwise/work-order-audit.jpg | 1363 | 936 |
| src/assets/images/projects/current/playlist-port.webp | 1353 | 929 |
| src/assets/images/projects/annual-leave/sign-in-rbac.png | 1400 | 788 |
| src/assets/images/projects/gym-calories-predictive-analysis/calories-vs-duration.png | 1400 | 535 |
| src/assets/images/projects/gym-calories-predictive-analysis/knime-preparation-workflow.png | 1400 | 451 |
| src/assets/images/projects/gym-calories-predictive-analysis/train-validation-partition.png | 1400 | 870 |
| src/assets/images/projects/gym-calories-predictive-analysis/calories-by-workout-type.png | 1400 | 285 |
| src/assets/images/projects/gym-calories-predictive-analysis/model-comparison.png | 1400 | 608 |

Remaining shift sources are the small existing font swaps described above; fonts and protected files were not changed.
