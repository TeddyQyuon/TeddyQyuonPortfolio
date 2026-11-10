# Task 5: portable documentation paths

Replaced thirteen raw-evidence path strings in docs/uiux-upgrade/summary.json with `$env:TEMP\portfolio-uiux-stepN` placeholders. Replaced the cache-specific Playwright example and raw-evidence location in docs/uiux-upgrade/README.md. The older docs/uiux-baseline/capture.cjs now uses PLAYWRIGHT_MODULE (or module resolution), matching the newer capture script.

A parsed before/after comparison confirms that only path strings changed in the JSON; every measurement and other value is identical. No machine-specific home/cache path remains in the Markdown, JSON or CommonJS documentation. Broad username-substring searches still match the intentional public email address and LinkedIn handle in captured page text. Those are site-content evidence, not local paths, and were preserved.
