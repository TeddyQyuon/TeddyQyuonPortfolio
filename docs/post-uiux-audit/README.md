# Post-UI/UX audit

Audited 2026-11-10 on fix/post-uiux-audit, created from origin/main at 8b6423ee40f513de88138ef9da82bfe0ca07da97. SEO work is isolated on a separate branch from origin/main.

## Baseline

Node 24.15.0; npm ci succeeded with 0 reported vulnerabilities. Untouched main: 20 tests, 20 passed, 0 failed; Vite production build succeeded. The section 7.8 gzip command reported:

| File in dist/assets | gzip bytes | KiB |
|---|---:|---:|
| index-CsZh1_gh.js | 113456 | 110.80 |
| ProjectPage-hZ0s6Ji2.js | 2405 | 2.35 |
| index-D1gf22O7.css | 7365 | 7.19 |

## Findings and changes

| Task | Status | Evidence / change | Commit |
|---|---|---|---|
| 1 | Report only; leak confirmed in both repos | [Masked findings and remediation](task-1.md); complete commit/line evidence in secret-findings.json | f8fe254 |
| 2 | Fixed | components.css:36; base nav rule transitions both colours. Production browser check: 150 ms on hover-out and scrollspy; reduced motion 0.01 ms | bf4b7b4 |
| 3 | Fixed | README.md:38 clone URL; the older-repository reference in the security release note is intentional | f98dc7e |
| 4 | Fixed | motion/tokens.js:4 and all five contradictory spec references now use 5; bars remain 8 | 5354252 |
| 5 | Fixed | Thirteen JSON evidence path strings and three script/README path references made portable; measurements unchanged | 2b83ec7 |
| 6 | Fixed; small font-swap residuals remain | [Investigation, before/after medians and every image attribute](task-6.md) | Commit containing this report |
| 8 | Report only | [Branch counts, dates, recommendations and owner-confirmed description](task-8.md) | 9f7b8be |

All 20 tests and the production build were run after each completed task. Every protected-file diff against origin/main exited 0. Source diffs were reviewed; the AST content-lock check additionally verified unchanged rendered content across 43 files after Task 6. The broad username search still finds intentional public contact text in browser evidence, as explained in task-5.md; machine-specific paths are gone.

Task 1 requires credential rotation before repository cleanup. Both new branches inherit main's historical exposure until that separately approved cleanup occurs. No credentials were rotated, no history rewritten, no branches or repositories deleted, no existing PR changed and no repository settings changed.

## Reproducing browser measurements

Use external Playwright and Lighthouse installations; no application dependency is added. Example paths below are placeholders. Start the production preview in another terminal first.

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run build
npm.cmd run preview
# Another terminal:
$env:PLAYWRIGHT_MODULE = 'D:\tools\node_modules\playwright'
$env:LIGHTHOUSE_CLI = 'D:\tools\node_modules\lighthouse\cli\index.js'
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:QA_OUTPUT = Join-Path $env:TEMP 'portfolio-post-uiux-audit'
node docs/post-uiux-audit/scripts/observe-layout.cjs recheck --experiments
node docs/post-uiux-audit/scripts/lighthouse-batch.cjs recheck
node docs/uiux-upgrade/scripts/content-lock.cjs origin/main
```

The Lighthouse runner executes the CLI serially, three times each for home, GameVault, Sole District and the gym analysis, with default mobile settings and --preset=desktop. It records raw JSON and medians under QA_OUTPUT. The observer captures direct and client navigation, delayed route chunks/fonts and lazy screenshot scrolling with each source's previous/current rectangle. These are local lab measurements, not field Core Web Vitals.

Task-specific reports contain the proposed commands requiring approval. The owner will review the new SEO PR and close PR #2 themselves.
