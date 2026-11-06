// Keep in sync with the Motion block in src/styles/tokens.css (checked by tests/motion.test.mjs).
export const motion = {
  duration: { instant: 80, fast: 150, base: 220, slow: 420, slower: 640, count: 800, scan: 700 },
  stagger: { base: 60, tight: 35, maxSteps: 6, maxStepsBars: 8 },
  inView: { rootMargin: '0px 0px -10% 0px', threshold: 0.25 },
  boot: { cardsStart: 120, countLead: 120, scanDelay: 360, maxTotal: 1300 },
  delayLoading: 300,
};
