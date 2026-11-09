# Task 2: nav colour transition

Reproduced at src/styles/components.css:36,45. `git log -S "nav a:is(:hover, :focus-visible) { transition"` traces the hover-only rule to 02998c1. Neither that commit nor the step 5/6 reports records a reason for it.

Moved both colour and background-colour transitions to the base rule and removed the redundant hover-only declaration. Nothing else in the stylesheet changed for this task.

On the production-CSP preview at 127.0.0.1:4174, Playwright recorded no colour transition on baseline hover-out or scrollspy activation. After the fix, both have a 150 ms colour transition. Reduced motion produces no visible transition (the existing 0.01 ms override). All 20 tests, including the transition allowlist, and the build pass. Protected files and the 42-file rendered-content snapshot match origin/main.
