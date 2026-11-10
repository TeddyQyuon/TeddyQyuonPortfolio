# Task 7: SEO/social previews on current main

Branch seo/social-preview-v2 was created directly from origin/main at 8b6423e, after Tasks 1–6 were reported in [PR #3](https://github.com/TeddyQyuon/TeddyQyuonPortfolio/pull/3). PR #2 and its branch were read but never changed.

The requested `git fetch origin seo/social-preview-project-metadata` and `git diff 0be07d9 28de339` were run. That exact comparison contains 15 files, +574/−33 (rather than the earlier review's 14-file count), including an unrelated mobile-layout change. The SEO functionality was reapplied to the current plain-CSS React site; its older MUI layout edit and older project-copy additions were not carried forward.

## Reconciliation

- Extended the existing src/hooks/useDocumentMeta.js; no second hook. Shared src/utils/seo.js provides the same static/client metadata. Existing project titles and card summaries remain the source, avoiding stale new claims in src/data/.
- scripts/generate-seo.mjs generates seven dist/projects/<slug>/index.html files and one dist/sitemap.xml after Vite. The manual public/sitemap.xml was removed. Project slugs are the single sitemap source, and the content test now checks the generator plus absence of the old file. A generation integration test verifies the exact seven directories and eight unique sitemap URLs. Build time is not presented as a content last-modified date.
- Existing public/robots.txt and public/og-image.png were already suitable and remain unchanged. index.html adds author, robots and Twitter image-alt tags; the built homepage is normalized through the same helper as client navigation.
- vercel.json adds only the two project rewrites before the SPA fallback. The entire headers block, including CSP, is byte-for-byte identical to main. vite.config.js mirrors project HTML lookup in local preview; without this, slashless project URLs returned the SPA homepage even though the generated file existed. An HTTP integration test covers slashless, trailing-slash and query-string forms.
- No styles, components, RouteView, project data, dependency versions or lockfile changed. No inline script/style was introduced. The generated pages retain exactly the homepage's hashed external asset references and body.

## Verification

- npm ci: 70 packages installed, 0 reported vulnerabilities. npm test: **30 tests, 30 pass, 0 fail**, including the ported SEO tests, escaping/asset preservation, generation and real preview HTTP checks. npm run build: **7 project pages and sitemap.xml generated**.
- curl.exe http://127.0.0.1:4174/projects/gamevault-marketplace returned HTTP 200 with title `GameVault | Wai Yan Hpone Lat`, the existing GameVault card summary as description, canonical `https://teddy-qyuon-portfolio.vercel.app/projects/gamevault-marketplace`, matching Open Graph tags and the production security headers. The captured HTML is in curl-gamevault.html.
- Static inspection verifies seven pages, one sitemap, identical hashed asset references, unchanged body markup and no inline code. See static-checks.json. The headers block was compared as raw text against main.
- Playwright checked all seven direct routes at 390/1440 px under normal/reduced motion (28 direct loads), then client navigation, unknown slugs, noindex and canonical restoration in all four contexts. Direct loads have no route-enter class; client navigation retains route-in for normal motion and none for reduced motion. No overflow, page errors or console/CSP errors. See browser-checks.json.
- The existing feature-checks.cjs passed in Chrome 156.0.8078.80 and Edge 157.0.4341.42: seven project routes per browser, 16 theme/width/motion interaction contexts, filters, semester controls, Escape/menu focus, theme changes, one-time boot, contrast and no errors. See feature-checks.json.
- Source AST comparison confirms all rendered JSX text/attributes remain unchanged across 43 source files. The intentional Task 7 changes to index.html, package build script, sitemap and rewrites were checked separately. React 18.3.1, router 7.18.4, Vite 7.3.7 and plugin-react 5.2.0 remain pinned.
- Gzip assets: index-Cdi5-Usk.js 114,051 bytes; ProjectPage-CYfn5igv.js 2,411 bytes; index-D1gf22O7.css 7,365 bytes. SEO adds 601 JS bytes gzip versus main and no CSS. Together with the audit's 372 bytes and the prior upgrade's 1,767 bytes, measured growth sums to 2,740 / 3,072 JS bytes. CSS growth sums to 1,533 / 2,560 bytes. The combined merge build has not been run; these PRs intentionally have independent main bases.

No merge or live-main deployment was performed. PR #2 remains for the owner to close after reviewing the replacement. Historical credential exposure and approval-only remediation are documented in PR #3.
