# Task 4: filter stagger cap

Confirmed that src/styles/motion.css:21 already caps filtered cards at 5, while the spec and src/motion/tokens.js:4 still said 6. Searching src/ and tests/ found no readers of maxSteps; maxStepsBars remains 8.

Changed the JavaScript token and all five conflicting spec references (the section 3 token example and usage rule, I1 table row, section 4.2 snippet and section 9 checklist) to 5. The existing filter CSS is unchanged and agrees with the 395 ms acceptance bound. Protected files and rendered content match origin/main. All 20 tests and the production build pass.
