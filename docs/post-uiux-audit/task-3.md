# Task 3: README clone URL

Confirmed the clone command in README.md:38 pointed to the older duplicate. It now points to `https://github.com/TeddyQyuon/TeddyQyuonPortfolio.git`; the repository was successfully cloned from that URL during baseline setup.

A search of README.md and docs/ found one other pre-existing reference, docs/security-release-2026-11-05.md:3. That reference explicitly describes the older repository and is correct. The Task 1 report also names the duplicate intentionally.

Validation: protected-file diff against origin/main exits 0; 20 tests pass; production build passes; src/ is unchanged for this task. No rendered text or link targets in the application changed.
