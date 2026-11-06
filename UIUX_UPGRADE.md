# UIUX_UPGRADE.md: motion and presentation upgrade

Repo: `github.com/TeddyQyuon/TeddyQyuonPortfolio`, audited at `main` @ `d6c4f74` (2026-11-05). All paths are relative to the repo root. Put this file at the repo root. Implement section 8 one step at a time.

## 0. Hard rule: content lock

Content stays exactly as is. Do not change:

- any file in `src/data/`, `public/`, `index.html`, `vercel.json`;
- any rendered text in JSX: text nodes, rendered string literals, `alt`, `title`, `aria-label`, captions, `href` / `to` values;
- image files, or which image appears where;
- section order on `/` (Overview, Projects, Skills, Academics, Contact) or block order on `/projects/:slug`.

Allowed JSX edits: `className`, `style` (CSS custom properties only), `ref`, `key`, `data-motion`, `aria-current`, `aria-hidden` on new decorative elements, preload event handlers, text-free wrapper elements, empty decorative `<span>`s.

Run on every step. It must exit 0:

```
git diff --exit-code -- src/data public index.html vercel.json package.json package-lock.json
```

Then read `git diff -- src` and confirm that no changed line alters rendered text.

## 1. Current state

### Stack

- React 18.3.1, react-dom 18.3.1, react-router-dom 7.18.4 in declarative mode (`<BrowserRouter>` in `src/main.jsx`, `<Routes>` in `src/App.jsx`).
- Vite 7.3.7 with @vitejs/plugin-react 5.2.0. Node `^20.19.0 || >=22.12.0`. Every dependency is pinned to an exact version, and `tests/site.test.mjs` enforces this.
- Styling: plain global CSS, no framework, no CSS modules. Files are imported in this order in `src/main.jsx`: `src/styles/tokens.css`, `base.css`, `components.css`, `charts.css`, `sections.css`, `pages.css`, `case.css`.
- Tokens (`src/styles/tokens.css`): spacing `--space-1`…`--space-8` = 4, 8, 12, 16, 24, 32, 48, 72 px; radii 6/10/14 px; `--container: 1200px`; `--topbar-h: 64px`; one easing token, `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)`. Colours are dark by default on `:root`, with light overrides under `[data-theme='light']`.
- Theme: `public/theme-init.js` sets `data-theme` on `<html>` before first paint. `src/hooks/useTheme.js` toggles it and stores the choice in `localStorage['tq-theme']`. The switch is `src/components/common/ThemeToggle.jsx`.
- Fonts: Inter 400–800 and JetBrains Mono 400–600, loaded from Google Fonts in `index.html`.
- Icons: inline SVG and brand images in `src/components/common/Icon.jsx`. Stroke icons get the classes `icon icon-<name>` (`icon-arrowRight`, `icon-arrowLeft`, `icon-external`, …).
- Hosting: Vercel. The CSP in `vercel.json` is `script-src 'self'; style-src 'self' https://fonts.googleapis.com` with no `'unsafe-inline'`.
  - React `style` props work, because React writes them through the CSSOM.
  - Injected `<style>` elements and `setAttribute('style', …)` are blocked.
  - `npm run preview` (127.0.0.1:4174) serves the production headers (`vite.config.js`).
- Tests: `npm test` runs `node --test "tests/*.test.mjs"` (`content.test.mjs`, `site.test.mjs`, `hash.test.mjs`, helper `tests/helpers.mjs`).
- Breakpoints in use, all `max-width`: 400, 420, 520, 600, 860 (nav collapses), 960 (hero, stack, academics, contact and case layout become one column).

### Routes and sections

| Route | File | Contents |
|---|---|---|
| `/` | `src/pages/HomePage.jsx` | `HeroSection`, then `ProjectsSection`, `StackSection`, `AcademicsSection`, `ContactSection`. All but Hero are wrapped in `<Reveal>`. |
| `/projects/:slug` | `src/pages/ProjectPage.jsx` (lazy in `src/App.jsx`) | Breadcrumb, `.project-hero` panel, KPI grid, demo-notes callout, sticky `.case-toc` with `CaseStudyBody` blocks, pager |
| `*` | `src/pages/NotFoundPage.jsx` | 404 panel |

- **Shell.** `src/App.jsx` contains the skip link, `TopBar`, `<main id="main-content">`, a `Suspense` fallback `<p role="status" className="container loading">` and `Footer`. `src/hooks/useScrollToHash.js` handles hash scrolling.
- **Top bar.** `src/components/layout/TopBar.jsx` has the brand, the nav (from `sectionLinks` in `src/config/site.js`: overview, projects, stack, academics, contact), the résumé button, the theme switch, and the mobile menu toggle (below 860 px).
- **`#overview`.** `src/sections/HeroSection.jsx`.
  - `.hero-main`: eyebrow, `.status-pill`, h1, `.hero-role`, `.hero-intro`, objective, three buttons, `.hero-meta`.
  - `aside.hero-side`: `.profile-panel` with the portrait and internship window, plus a `.kpi-grid` of four `KpiCard`s.
  - Styles: `src/styles/sections.css`.
- **`#projects`.** `src/sections/ProjectsSection.jsx`: segmented filter (All / Personal / Coursework), lede, and a `.project-grid` of `src/components/projects/ProjectPanel.jsx` cards. Each card has an index, badges, thumbnail link, title, subtitle, summary, metric row, tech tags and footer links.
- **`#stack`.** `src/sections/StackSection.jsx`: a "Technology usage" `BarList` (`src/components/charts/BarList.jsx`) and "Skills by area" tag groups.
- **`#academics`.** `src/sections/AcademicsSection.jsx`.
  - GPA panel with `GpaTrendChart` (`src/components/charts/GpaTrendChart.jsx`, SVG viewBox 320×150) and highlights.
  - Module table with a semester segmented control.
  - Education timeline.
  - Styles: `pages.css`, `charts.css`.
- **`#contact`.** `src/sections/ContactSection.jsx`: résumé panel and `.channel-list`. Styles: `pages.css`.
- **Footer.** `src/components/layout/Footer.jsx`. Styles: `charts.css`.
- **Case study.** `src/components/projects/CaseStudyBody.jsx`, `CaseParts.jsx`, and `src/components/charts/ModelComparison.jsx` (which reuses `BarList`). Styles: `pages.css`, `case.css`.

### Existing motion

| # | Where | What | Problem |
|---|---|---|---|
| M1 | `src/components/common/Reveal.jsx`, `.reveal` in `src/styles/base.css` | IntersectionObserver fade + `translateY(12px)`, 0.5 s, on four home sections (`HomePage.jsx`) | Generic section fade-slide-up; deep-linked sections stay hidden until observed |
| M2 | `src/components/common/CountUp.jsx` via `KpiCard` (`src/components/common/Dashboard.jsx`) | rAF count from 0, 900 ms, easeOutCubic, on intersection; final value for reduced motion; sr-only final value | Digit count grows ("0" → "110") and shifts the unit |
| M3 | `.status-dot`, `@keyframes pulse` in `sections.css` | `box-shadow` ring, 2 s, infinite | Repaints every frame; loops forever (WCAG 2.2.2) |
| M4 | `.bar-fill`, `@keyframes grow` in `charts.css` | `scaleX` 0→1, 0.8 s on mount | Plays off-screen; finished before it is seen |
| M5 | `.project-panel:hover`, `.project-thumb img` in `sections.css` | `translateY(-2px)` lift + border; image `scale(1.03)` 0.4 s | Hover lift on every card; not gated to hover devices; no focus parity |
| M6 | `.shot a:hover img` in `case.css` | `scale(1.02)` 0.3 s | Not gated; no focus parity |
| M7 | `.theme-switch-thumb` in `components.css` | `translateX(32px)` 0.24 s | Fine |
| M8 | `.btn` in `components.css` | transitions `border-color, background, transform` 0.15 s; `:active translateY(1px)` | `background` shorthand; press reads as a shift |
| M9 | `.channel-list a` in `pages.css` | `border-color, background` 0.15 s | `background` shorthand |
| M10 | `src/hooks/useScrollToHash.js` | smooth `scrollIntoView`; `auto` under reduced motion | Fine |
| M11 | `base.css` | `prefers-reduced-motion: reduce` forces all durations to 0.01 ms | Keep |

The site has no page transitions, no active nav state, no scroll progress and no mobile-menu transition. The loading fallback appears immediately.

`src/hooks/useReducedMotion.js` already exists. Reuse it.

## 2. Design direction

The site reads like an analyst's dashboard: mono labels, numbered sections ("01 Overview"), KPI cards, bar charts, a status pill, and `~/portfolio` in the brand. Motion should look like an instrument settling, not a showreel.

1. **Readout, not reel.** Motion goes where there is data: numbers count, bars fill, the GPA plot sweeps. Prose, headings and images do not animate in.
2. **Meaningful text is visible on first paint.** On initial load, never give these `opacity < 1`, clip them or offset them: the h1, `.hero-intro`, `.hero-main > .muted`, project copy, case-study text. They are the LCP candidates.
3. **One signature moment: the dashboard boot** (section 4.1, with the status-dot ping). It plays once per page load.
   - No other sequence runs longer than 950 ms.
   - Outside the boot (scan line 700 ms, ping 1600 ms × 3), no single element animates longer than 640 ms. The count-up (800 ms) is the only other exception.
4. **Precise, not playful.** Use ease-out curves. No overshoot, springs, bounce, blur or 3D. Translations stay at 8 px or less; scale stays between 0.97 and 1.03.
5. **After the boot, the user causes everything.** Motion plays only on hover, focus, click, route change, or when a data block scrolls into view. Nothing loops more than 3 times.
6. **Keyboard parity.** Every hover affordance has a `:focus-visible` or `:focus-within` twin. Hover transforms apply only under `(hover: hover) and (pointer: fine)`.
7. **The final state is the default state.** CSS describes the finished look. Motion is opt-in, inside `@media (prefers-reduced-motion: no-preference)`. If JS, IntersectionObserver or a CSS feature is missing, the content is simply there.
8. **Respect the CSP.** Styles come only from stylesheets or React `style` props. No injected `<style>`, and no library that injects one.

## 3. Motion tokens

Add these to `:root` in `src/styles/tokens.css`. They are theme-independent, so do not repeat them under `[data-theme='light']`. Replace the existing `--ease` line with the alias shown.

```css
  /* Motion */
  --dur-instant: 80ms;   /* press feedback */
  --dur-fast: 150ms;     /* hover/focus colour, icon nudges, row swap, exits */
  --dur-base: 220ms;     /* menu, route enter, filter crossfade, theme crossfade, indicators */
  --dur-slow: 420ms;     /* hero boot entrances */
  --dur-slower: 640ms;   /* data reveals: bars, GPA sweep */
  --dur-count: 800ms;    /* number roll-up */
  --dur-scan: 700ms;     /* hero scan line (signature only) */

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);    /* entering, hover */
  --ease-in: cubic-bezier(0.55, 0, 1, 0.45);     /* leaving */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* on-screen sweeps, crossfades */
  --ease: var(--ease-out);                       /* legacy alias for existing rules */

  --stagger: 60ms;        /* hero cards */
  --stagger-tight: 35ms;  /* bars, filtered cards */

  --nudge: 3px;           /* arrow icons on hover */
  --nudge-diag: 2px;      /* external-link icon, x and y */
  --rise-sm: 4px;         /* route enter */
  --rise: 8px;            /* hero boot, mobile menu */
  --press-scale: 0.97;
  --zoom: 1.03;           /* project thumbnail */
  --zoom-sm: 1.02;        /* case-study screenshot */

  --delay-loading: 300ms; /* Suspense fallback shows only after this */
```

Mirror the values for JS in a new `src/motion/tokens.js`. Use a plain `export const` so `loadDataModule` in `tests/helpers.mjs` can load it.

```js
// Keep in sync with the Motion block in src/styles/tokens.css (checked by tests/motion.test.mjs).
export const motion = {
  duration: { instant: 80, fast: 150, base: 220, slow: 420, slower: 640, count: 800, scan: 700 },
  stagger: { base: 60, tight: 35, maxSteps: 6, maxStepsBars: 8 },
  inView: { rootMargin: '0px 0px -10% 0px', threshold: 0.25 },
  boot: { cardsStart: 120, countLead: 120, scanDelay: 360, maxTotal: 1300 },
  delayLoading: 300,
};
```

Usage rules:

- **Stagger.** In CSS, use `animation-delay: calc(min(var(--i, 0), 6) * var(--stagger-tight))`. Set `--i` from React with `style={{ '--i': index }}`. React passes custom properties through unchanged, without adding `px`.
- **Fill mode.** Time-based animations use `animation-fill-mode: backwards`. Scroll-driven animations use `both`. Never use `forwards`.
- **Shorthand order.** The `animation` shorthand resets `animation-timeline`, so declare `animation-timeline` and `animation-range` after it.

## 4. Per-section spec

### 4.0 Motion budget and shared patterns

This is the complete list. Anything not in this table must not animate.

| ID | Element | Trigger | Properties | Duration / delay | Easing |
|---|---|---|---|---|---|
| S1 | Hero `.profile-panel` and four `.kpi` cards | load (in first viewport) or first time in view (≤960 px); once per page load | opacity, translateY(8px → 0) | 420 ms; panel 0 ms, cards 120 + i×60 ms | ease-out |
| S2 | Hero KPI numbers | after S1 | text (CountUp) | 800 ms; starts at card delay + 120 ms | easeOutCubic (JS) |
| S3 | Hero scan line | after S1 | opacity, translateY | 700 ms; delay 360 ms | ease-in-out |
| S4 | Status dot ping | load | opacity, scale(1 → 2.6) | 1600 ms × 3 | ease-out |
| D1 | Bar fills (Skills, model comparison) | in view, once | scaleX(0 → 1) | 640 ms; i×35 ms, capped at 8 steps | ease-out |
| D2 | GPA plot sweep | in view, once | scaleX(1 → 0) on an overlay | 640 ms | ease-in-out |
| D3 | Case-study KPI numbers | in view, once (current behaviour) | text | 800 ms | easeOutCubic |
| I1 | Project cards after a filter click | click | opacity | 220 ms; i×35 ms, capped at 6 steps | ease-out |
| I2 | Semester table rows | click | opacity | 150 ms | ease-out |
| I3 | Route enter | client-side pathname change only | opacity, translateY(4px → 0) | 220 ms | ease-out |
| I4 | Mobile menu | open / close | opacity, translateY(-8px ↔ 0), `display` (allow-discrete) | 220 ms open, 150 ms close | ease-out / ease-in |
| I5 | Menu icon swap | click | opacity, rotate(-90° → 0) | 150 ms | ease-out |
| I6 | Nav active indicator | scrollspy | scaleX(0 → 1) | 220 ms | ease-out |
| I7 | Theme crossfade | click | View Transition root crossfade | 220 ms | ease-in-out |
| I8 | Hover / focus micro-interactions | hover, focus | icon translate, thumbnail scale, colours | 150 ms; press 80 ms; thumbnail and screenshot zoom 420 ms | ease-out |
| C1 | Read progress (case study only) | scroll-linked | scaleX | n/a | linear |
| C2 | Top-bar elevation | scroll-linked (0–96 px) | opacity | n/a | linear |
| L1 | Loading fallback | Suspense pending | opacity | 220 ms after a 300 ms delay | ease-out |

**Where motion code lives.** Create `src/styles/motion.css` and import it last in `src/main.jsx`, after `case.css`.

- It holds every `@keyframes`, every `animation` declaration, all `[data-motion]` rules, hover transforms, scroll-driven rules and `::view-transition` rules.
- Other CSS files contain only static styles and the allowed `transition`s (section 7).
- Delete `@keyframes pulse` from `sections.css`. Move `@keyframes grow` out of `charts.css`, and remove `animation: grow …` from `.bar-fill` there.

Keyframes for `src/styles/motion.css`:

```css
@keyframes rise-in  { from { opacity: 0; transform: translateY(var(--rise)); } }
@keyframes route-in { from { opacity: 0; transform: translateY(var(--rise-sm)); } }
@keyframes fade-in  { from { opacity: 0; } }
@keyframes grow     { from { transform: scaleX(0); } }
@keyframes sweep    { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@keyframes scan     { 0% { opacity: 0; transform: translateY(-100%); } 15%, 85% { opacity: 1; } 100% { opacity: 0; transform: translateY(290%); } }
@keyframes ping     { 0% { opacity: 0.55; transform: scale(1); } 80%, 100% { opacity: 0; transform: scale(2.6); } }
@keyframes icon-in  { from { opacity: 0; transform: rotate(-90deg); } }
@keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes elevate  { from { opacity: 0; } to { opacity: 1; } }
```

**The `data-motion` state pattern** (used by S1, D1, D2):

- `'pending'`: JS will animate this element. CSS shows the start state, inside the no-preference media query only.
- `'run'`: the element has been seen. CSS plays the animation.
- `'done'` or absent: final state, no animation. Used for reduced motion, missing IntersectionObserver, and repeat visits.

**New hook `src/hooks/useInView.js`.** It replaces the observer code in `Reveal.jsx` and returns `[ref, state]`.

- The initial state is `'done'` if `useReducedMotion()` is true, `typeof IntersectionObserver === 'undefined'`, or `options.skip` is true. Otherwise it is `'pending'`.
- It observes with the `motion.inView` defaults (overridable). On the first intersection it sets `'run'` and disconnects.
- If reduced motion turns on while the state is `'pending'`, it sets `'done'`.
- It disconnects on unmount.

### 4.1 Hero, `#overview` (signature moment: dashboard boot)

**Files:** `src/sections/HeroSection.jsx`, `src/components/common/Dashboard.jsx`, `src/components/common/CountUp.jsx`, new `src/hooks/useBootSequence.js`, `src/styles/sections.css`, `src/styles/motion.css`.

**What changes**

- **`.hero-main` stays static.** Its eyebrow, status-pill text, h1, role, intro, objective, buttons and meta get no entrance animation.
- **`useBootSequence()`** returns `useInView({ threshold: 0.25, skip: played })`. `played` is a module-level `let played = false`, set to `true` when the state becomes `'run'`. Leaving for a case study and coming back does not replay the boot.
- **The aside** becomes `<aside className="hero-side" ref={ref} data-motion={state} …>`. Keep its existing `aria-label`.
- **`KpiCard`** (`Dashboard.jsx`) gets optional props `index`, `start` and `countDelay`.
  - It sets `style={{ '--i': index }}` on `.kpi` and forwards `start` and `delay={countDelay}` to `CountUp`.
  - The hero passes:
    - `index` 0–3;
    - `start={state !== 'pending'}`;
    - `countDelay={motion.boot.cardsStart + index * motion.stagger.base + motion.boot.countLead}`, which gives 240, 300, 360 and 420 ms.
  - `ProjectPage` passes none of these, so the case-study KPI behaviour is unchanged.
- **`CountUp`** gets two props:
  - `start`: `undefined` keeps today's IntersectionObserver trigger; `false` holds at `0`; `true` starts after `delay`.
  - `delay`: in ms, default 0.
  - The duration default becomes `motion.duration.count` (800).
  - Keep the easeOutCubic curve, the `sr-only` final value and the reduced-motion behaviour.
  - Give the `aria-hidden` span `className="count-up"` and this style:

    ```jsx
    style={{ minWidth: `${String(value).length}ch` }}
    ```

  - Add `.count-up { display: inline-block; text-align: end; }` to `components.css`. KPI values use JetBrains Mono, so `ch` is exact and the unit never moves.
- **Scan line.** Add to `sections.css`:

  ```css
  .hero-side .kpi-grid { position: relative; overflow: clip; }
  .hero-side .kpi-grid::after { content: ''; position: absolute; inset-inline: 0; top: 0; height: 35%; pointer-events: none; opacity: 0; background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--accent) 14%, transparent) 60%, transparent); }
  ```

- **Status dot.** Remove `animation: pulse 2s infinite`. Add `.status-dot { position: relative; }` and `.status-dot::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: currentColor; opacity: 0; }`.
- **KPI polish.** Add `.kpi-grid { grid-auto-rows: 1fr; }` so cards with wrapping hints match in height.

**Trigger:** on load when `.hero-side` is in the first viewport (above 960 px). At 960 px and below it stacks under `.hero-main`, so it plays when 25% of it first scrolls into view.

**Timeline** (t = 0 when the state becomes `'run'`):

| t (ms) | Event |
|---|---|
| 0 | `.profile-panel` rise-in, 420 ms |
| 120 / 180 / 240 / 300 | KPI cards 0–3 rise-in, 420 ms each |
| 240 / 300 / 360 / 420 | CountUp 0–3 start, 800 ms each |
| 360 → 1060 | Scan line passes top to bottom once |
| ≤ 1220 | Done (budget: `motion.boot.maxTotal` = 1300) |

The status dot pings 3 times from page load (4.8 s total, inside the 5 s limit of WCAG 2.2.2).

```css
@media (prefers-reduced-motion: no-preference) {
  .hero-side[data-motion='pending'] :is(.profile-panel, .kpi) { opacity: 0; transform: translateY(var(--rise)); }
  .hero-side[data-motion='run'] :is(.profile-panel, .kpi) { animation: rise-in var(--dur-slow) var(--ease-out) backwards; }
  .hero-side[data-motion='run'] .kpi { animation-delay: calc(120ms + var(--i, 0) * var(--stagger)); }
  .hero-side[data-motion='run'] .kpi-grid::after { animation: scan var(--dur-scan) var(--ease-in-out) 360ms backwards; }
  .status-dot::after { animation: ping 1600ms var(--ease-out) 3; }
}
```

**Hover / focus:** buttons follow section 5.2. KPI cards, the profile panel and the meta list are not interactive, so they get no hover styles.

**LCP guard:** Lighthouse must report the same LCP element as the baseline (expected: inside `.hero-main`). If it reports `.profile-photo`, remove `.profile-panel` from S1 and leave it static.

### 4.2 Projects, `#projects`

**Files:** `src/sections/ProjectsSection.jsx`, `src/components/projects/ProjectPanel.jsx`, `src/styles/sections.css`, `src/styles/motion.css`.

**What changes**

- **No section entrance** (Reveal is removed in step 3).
- **Filter crossfade.**
  - Add `const [filtered, setFiltered] = useState(false)`. A filter click calls `setFilter(f.id)` and `setFiltered(true)`.
  - Render `<div className="project-grid" key={filter} data-motion={filtered ? 'swap' : undefined}>`.
  - Pass `motionIndex={i}` (the position in `visible`) to `ProjectPanel`, which sets `style={{ '--i': motionIndex }}` on its `<article>`.
  - Keep the existing `index` prop (the "01"–"07" numbering), the card order and the `aria-live` line exactly as they are.
- **Remove the hover lift.** In `.project-panel`, change `transition: border-color 0.2s, transform 0.2s` to `transition: border-color var(--dur-fast) var(--ease-out)`, and delete `transform: translateY(-2px)` from `.project-panel:hover`.
- **Card state.** Add `.project-panel:hover, .project-panel:focus-within { border-color: var(--border-strong); }`.
- **Thumbnail zoom.** Remove the transform rule from `sections.css` (`.project-panel:hover .project-thumb img`) and re-add it in `motion.css` with gating and focus parity (section 5.3). Keep `transition: transform var(--dur-slow) var(--ease-out)` on `.project-thumb img`.
- **Intent preload** (section 5.8). Add `onPointerEnter={loadProjectPage}` and `onFocus={loadProjectPage}` on the `<article>`.

**Triggers:** click (filter), hover and focus (card).

```css
@media (prefers-reduced-motion: no-preference) {
  .project-grid[data-motion='swap'] > .project-panel {
    animation: fade-in var(--dur-base) var(--ease-out) backwards;
    animation-delay: calc(min(var(--i, 0), 6) * var(--stagger-tight));
  }
}
```

Opacity only: no translate, no layout morph. Nothing animates on first load.

**Hover / focus:**

- Title link colour turns `--accent` (existing).
- The "Case study" arrow and the "Live demo" external icon nudge (section 5.4).
- Filter buttons follow section 5.5.

### 4.3 Skills, `#stack`

**Files:** `src/components/charts/BarList.jsx`, `src/styles/charts.css`, `src/styles/motion.css`. `src/sections/StackSection.jsx` is unchanged.

**What changes**

- `BarList` calls `const [ref, state] = useInView()` and renders `<ul className="bar-list" ref={ref} data-motion={state} …>`. Each `<li>` gets `style={{ '--i': index }}`. The existing width style stays on `.bar-fill`.
- In `charts.css`, `.bar-fill` keeps `transform-origin: left` and loses its `animation`.
- `.bar-value` numbers and labels never animate, so values stay readable throughout.
- The change also applies to `ModelComparison` on the gym case study, which reuses `BarList`.

**Trigger:** the list first scrolls into view.

```css
@media (prefers-reduced-motion: no-preference) {
  .bar-list[data-motion='pending'] .bar-fill { transform: scaleX(0); }
  .bar-list[data-motion='run'] .bar-fill {
    animation: grow var(--dur-slower) var(--ease-out) backwards;
    animation-delay: calc(min(var(--i, 0), 8) * var(--stagger-tight));
  }
}
```

The longest sequence is 8 × 35 + 640 = 920 ms.

**Hover / focus:** none. Bars, tags and skill groups are not interactive.

### 4.4 Academics, `#academics`

**Files:** `src/components/charts/GpaTrendChart.jsx`, `src/sections/AcademicsSection.jsx`, `src/styles/charts.css`, `src/styles/motion.css`.

**What changes**

- **GPA plot sweep (D2).** The chart is revealed left to right, like a plot being drawn. No SVG attribute animates.
  - Wrap the `<svg>` in `<div className="gpa-chart-wrap" ref={ref} data-motion={state}>`.
  - Add `<span className="gpa-chart-sweep" aria-hidden="true" />` after the svg.
  - Move `margin-block: var(--space-4)` from `.gpa-chart` to `.gpa-chart-wrap`.
  - Add to `charts.css`:

    ```css
    .gpa-chart-wrap { position: relative; }
    .gpa-chart-sweep { position: absolute; top: 0; bottom: 19%; left: 8%; right: -2px; background: var(--surface); transform-origin: right center; transform: scaleX(0); pointer-events: none; }
    ```

  - The overlay leaves the y-axis labels (left 9.4% of the viewBox) and the x-axis labels (bottom 18.7%) visible. It covers the grid, area, line, dots and value labels.
- **Semester swap (I2).**
  - Add `const [swapped, setSwapped] = useState(false)`. A semester click calls `setActive(s.id)` and `setSwapped(true)`.
  - Render `<tbody key={semester.id} className={swapped ? 'is-swapped' : undefined}>`, and do the same on `<tfoot>`, which holds the semester GPA.
  - The `<caption>` text is unchanged.
- **Education timeline:** no motion.
- **Recent A grades links:** add `onPointerEnter` / `onFocus` → `loadProjectPage` (section 5.8).

**Triggers:** chart in view (sweep), click (semester).

```css
@media (prefers-reduced-motion: no-preference) {
  .gpa-chart-wrap[data-motion='pending'] > .gpa-chart-sweep { transform: scaleX(1); }
  .gpa-chart-wrap[data-motion='run'] > .gpa-chart-sweep { animation: sweep var(--dur-slower) var(--ease-in-out) backwards; }
  .data-table :is(tbody, tfoot).is-swapped > tr { animation: fade-in var(--dur-fast) var(--ease-out) backwards; }
}
```

**Hover / focus:**

- Table rows keep their existing `tbody tr:hover` background (instant, no transition).
- Semester buttons follow section 5.5.
- Highlight links follow section 5.4 (links).

### 4.5 Contact, `#contact`

**Files:** `src/styles/pages.css`, `src/styles/motion.css`. `ContactSection.jsx` is unchanged.

**What changes**

- No entrance.
- `.channel-list a`: change the transition to `border-color var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)`.
- Extend the `:hover` styles to `:hover, :focus-visible`.

**Triggers:** hover, focus.

**Hover / focus:**

- Border turns `--accent`, background `--surface-2`, text `--text` (existing, now with focus parity).
- The trailing icon nudges: `.icon-arrowRight` moves `translateX(var(--nudge))` on the email row; `.icon-external` moves `translate(var(--nudge-diag), calc(var(--nudge-diag) * -1))` on external rows.
- The résumé buttons follow section 5.2.

### 4.6 Footer

**Files:** `src/styles/charts.css` (the `.footer` rules live there). `Footer.jsx` is unchanged.

- No motion.
- Change `.footer-links a:hover { … text-decoration: underline; }` to also match `:focus-visible`.

### 4.7 Case study, `/projects/:slug`

**Files:** `src/pages/ProjectPage.jsx`, `src/components/projects/CaseParts.jsx`, `src/styles/pages.css`, `src/styles/case.css`, `src/styles/motion.css`. The route enter, read progress and loading state are in section 5.

**What changes**

- **Hero panel, callout, blocks, features, pipeline:** no entrance beyond the route enter (I3).
- **KPI grid:** CountUp keeps working as today (D3), using the new 800 ms default and the min-width fix.
- **TOC active state.**
  - `const active = useActiveSection(toc.map((s) => s.id))` (hook in section 5.1).
  - Each TOC `<Link>` gets `aria-current={active === s.id ? 'true' : undefined}`.
  - CSS in `pages.css`:

    ```css
    .case-toc a { transition: color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out); }
    .case-toc a[aria-current='true'] { color: var(--text); border-left-color: var(--accent); }
    ```

  - At 960 px and below (chip layout), also add `.case-toc a[aria-current='true'] { border-color: var(--accent); }`.
- **Screenshots.** Move the hover zoom from `case.css` (`.shot a:hover img`) into `motion.css`, with gating and focus parity (section 5.3). `.shot img` keeps `transition: transform var(--dur-slow) var(--ease-out)`.
- **Pager.** `.pager-link:hover` becomes `:hover, :focus-visible` with border `--accent`. The `.icon-arrowLeft` nudges `translateX(calc(var(--nudge) * -1))` and the `.icon-arrowRight` nudges `translateX(var(--nudge))`.
- **`ExternalButton`** (`CaseParts.jsx`) needs no JSX change. Its `.icon-external` nudges via section 5.2.
- **Breadcrumb links:** colour change only (section 5.4).

**Triggers:** scroll (TOC state), hover, focus.

### 4.8 404, `*`

**Files:** none beyond the shared rules.

It gets the route enter (I3) when reached by client navigation. The "Back to overview" `.icon-arrowLeft` nudges left on hover and focus (section 5.2).

## 5. Interaction polish

### 5.1 Nav and top bar

**Files:** `src/components/layout/TopBar.jsx`, new `src/hooks/useActiveSection.js`, `src/styles/components.css`, `src/styles/motion.css`.

**Scrollspy hook.** `useActiveSection(ids, { enabled = true } = {})` returns the active id or `null`.

- Use one IntersectionObserver with `threshold: 0` and this root margin:

  ```js
  const topbar = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h'), 10);
  const rootMargin = `-${topbar + 16}px 0px -55% 0px`;
  ```

- Keep a `Map` of id → isIntersecting. The active id is the first id, in `ids` order, that is intersecting.
- If none are intersecting, keep the previous id.
- Disconnect on unmount or when `enabled` turns false.
- Do not add a scroll listener.

**Active link (I6).**

- `TopBar` calls `useActiveSection(sectionLinks.map((s) => s.id), { enabled: location.pathname === '/' })`. Case-study pages also have an `#overview` block, so the spy must stay off there.
- The active `<Link>` gets `aria-current="true"`.
- Desktop (min-width 861 px) indicator in `components.css`:

  ```css
  .nav a { position: relative; transition: color var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out); }
  .nav a[aria-current='true'] { color: var(--text); }
  @media (min-width: 861px) {
    .nav a::after { content: ''; position: absolute; left: 0.75rem; right: 0.75rem; bottom: 0.2rem; height: 2px; border-radius: 1px; background: var(--accent); transform: scaleX(0); transition: transform var(--dur-base) var(--ease-out); }
    .nav a[aria-current='true']::after { transform: scaleX(1); }
  }
  @media (max-width: 860px) { .nav a[aria-current='true'] { background: var(--surface-2); } }
  ```

**Mobile menu (I4).** Below 860 px, `.nav` toggles between `display: none` and `.is-open { display: block; }` today. Add to `motion.css`:

```css
@media (max-width: 860px) and (prefers-reduced-motion: no-preference) {
  .nav { opacity: 0; transform: translateY(calc(var(--rise) * -1)); transition: opacity var(--dur-fast) var(--ease-in), transform var(--dur-fast) var(--ease-in), display var(--dur-fast) allow-discrete; }
  .nav.is-open { opacity: 1; transform: none; transition-duration: var(--dur-base); transition-timing-function: var(--ease-out); }
  @starting-style { .nav.is-open { opacity: 0; transform: translateY(calc(var(--rise) * -1)); } }
}
```

Escape, close-on-navigation and the `aria-expanded` / `aria-controls` wiring stay as they are. Browsers without `@starting-style` show and hide instantly.

**Menu icon (I5).**

- Render `<Icon key={open ? 'close' : 'menu'} name={open ? 'close' : 'menu'} />` so the icon remounts on toggle.
- Add `const [touched, setTouched] = useState(false)`. The click handler calls `setTouched(true)`. Put `data-touched={touched || undefined}` on the button.
- In `motion.css` (no-preference): `.menu-toggle[data-touched] .icon { animation: icon-in var(--dur-fast) var(--ease-out) backwards; }`. Nothing animates on page load.

**Top-bar elevation (C2).**

- Add to `components.css`:

  ```css
  .topbar::after { content: ''; position: absolute; left: 0; right: 0; top: 100%; height: 12px; pointer-events: none; opacity: 0; background: linear-gradient(to bottom, rgba(0, 0, 0, 0.28), transparent); }
  [data-theme='light'] .topbar::after { background: linear-gradient(to bottom, rgba(15, 23, 42, 0.08), transparent); }
  ```

- Add the scroll-driven rule in section 5.6.

**Brand link:** no motion.

### 5.2 Buttons (`.btn`, `.btn-primary`, `.btn-ghost`, `.btn-small`, `.icon-button`, `.theme-switch`)

**File:** `src/styles/components.css`, with hover transforms in `src/styles/motion.css`.

- **`.btn` transition:** `transform var(--dur-instant) var(--ease-out), background-color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)`. This replaces the `background` shorthand.
- **Press:** `.btn:active { transform: scale(var(--press-scale)); }` replaces `translateY(1px)`. `.icon-button:active` gets the same rule.
- **Hover and focus colours:** existing colours apply to both `:hover` and `:focus-visible`.
- **Icon nudges.** Give `.icon` `transition: transform var(--dur-fast) var(--ease-out)`. Add the rules in section 5.3.
- **`.theme-switch-thumb`:** `transition: transform var(--dur-base) var(--ease-out)` (was 0.24 s).
- **Focus:** keep the global `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }` in `base.css`. Never set `outline: none` on a button.

### 5.3 Hover transforms (all in `src/styles/motion.css`)

```css
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  :is(.btn, .link-strong, .link-muted, .pager-link, .channel-list a):is(:hover, :focus-visible) .icon-arrowRight { transform: translateX(var(--nudge)); }
  :is(.btn, .pager-link):is(:hover, :focus-visible) .icon-arrowLeft { transform: translateX(calc(var(--nudge) * -1)); }
  :is(.btn, .link-muted, .channel-list a):is(:hover, :focus-visible) .icon-external { transform: translate(var(--nudge-diag), calc(var(--nudge-diag) * -1)); }
  .project-panel:is(:hover, :focus-within) .project-thumb img { transform: scale(var(--zoom)); }
  .shot a:is(:hover, :focus-visible) img { transform: scale(var(--zoom-sm)); }
}
```

Keyboard users on touch-first devices still get the colour and border focus states. Transforms are hover-device-only by design.

### 5.4 Cards and links

- **Cards** (`.project-panel`, `.pager-link`, `.channel-list a`):
  - The border changes on hover and focus (sections 4.2, 4.5, 4.7).
  - No lift, no shadow change, no tilt.
  - Non-interactive panels (`.panel`, `.kpi`, `.tech-tag`, `.badge`, `.metric-row`) get no hover style.
- **Inline text links** (`.highlight-list a`, `.breadcrumb a`, `.case-block a`):

  ```css
  a { text-decoration-color: color-mix(in srgb, currentColor 45%, transparent); transition: color var(--dur-fast) var(--ease-out), text-decoration-color var(--dur-fast) var(--ease-out); }
  a:is(:hover, :focus-visible) { text-decoration-color: currentColor; }
  ```

  Put this in `base.css`. Button-styled links have `text-decoration: none`, so it does not affect them.

### 5.5 Segmented controls (project filter, semester picker)

**File:** `src/styles/components.css`.

- `.segmented button` gets `transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)`.
- No sliding thumb: button widths differ, and animating width is not allowed.
- The pressed state stays `aria-pressed='true'` with the existing colours.
- Focus uses the global outline.

### 5.6 Scroll progress (case study only, C1) and scroll-linked rules

**Files:** `src/components/layout/TopBar.jsx`, `src/styles/components.css`, `src/styles/motion.css`.

- **Where it renders.** TopBar renders `<span className="read-progress" aria-hidden="true" />` inside `<header className="topbar">`, only when `/^\/projects\/([^/]+)$/` matches `location.pathname` and the captured slug exists in `projects` (`src/data/projects.js`, already in the main chunk).
- **Why the top bar.** It is outside the route wrapper, so the transform in I3 never affects its positioning.
- **Base CSS** (`components.css`): `.topbar { position: sticky; … }` already exists. Add `.read-progress { display: none; }`.
- **`motion.css`:**

  ```css
  @supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
      .read-progress { display: block; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--accent); transform-origin: 0 50%; transform: scaleX(0); z-index: 1;
        animation: progress linear both; animation-timeline: scroll(root block); }
      .topbar::after { animation: elevate linear both; animation-timeline: scroll(root block); animation-range: 0 96px; }
    }
  }
  ```

- **Browser support.** Firefox turned scroll-driven animations on by default in version 159 (27 Oct 2026; [MDN release notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/159)). Older browsers show no bar and no elevation, with no JS fallback.
- No scroll listeners anywhere.

### 5.7 Page transitions (I3)

**Files:** new `src/components/layout/RouteView.jsx`, `src/App.jsx`, `src/styles/motion.css`.

**Why not View Transitions.** React Router's `viewTransition` prop does not work with `<BrowserRouter>` ([remix-run/react-router#12792](https://github.com/remix-run/react-router/issues/12792)), and it is now deprecated in favour of React's `<ViewTransition>` ([docs](https://reactrouter.com/how-to/view-transitions)). That component is not in React 18.3.1. Do not upgrade React or switch to `createBrowserRouter`. Use an enter-only CSS animation instead.

`RouteView.jsx`:

```jsx
let hasMounted = false;
export default function RouteView({ children }) {
  const [enter] = useState(() => { const e = hasMounted; hasMounted = true; return e; });
  return <div className={enter ? 'route-view route-enter' : 'route-view'}>{children}</div>;
}
```

In `App.jsx`, call `const location = useLocation();` and wrap the `Suspense` element inside `<main>` with `<RouteView key={location.pathname}>…</RouteView>`.

- The first document load does not animate. This protects LCP on direct visits to `/projects/:slug`.
- Hash-only changes (`/#projects`) do not remount, so they do not animate.
- In dev, StrictMode double-invokes the initializer, so the first load may animate. Verify on `npm run preview`.
- `motion.css` (no-preference): `.route-enter { animation: route-in var(--dur-base) var(--ease-out) backwards; }`.
- No exit animation.
- Never put `position: fixed` elements inside `.route-view`.
- `useScrollToHash` stays as is.

### 5.8 Loading state and chunk preload (L1)

**Files:** new `src/lib/loadProjectPage.js`, `src/App.jsx`, `src/components/projects/ProjectPanel.jsx`, `src/sections/AcademicsSection.jsx`, `src/styles/motion.css`.

- `src/lib/loadProjectPage.js`: `export const loadProjectPage = () => import('../pages/ProjectPage');`
- `src/App.jsx`: `const ProjectPage = lazy(loadProjectPage);`. Keep the comment and the fallback markup and text unchanged.
- Call `loadProjectPage` on `pointerenter` and `focus` of project cards (section 4.2) and of the "Recent A grades" links (section 4.4). Repeated calls reuse the cached module promise.
- **Delayed fallback.** Fast loads never flash the text. Add this outside any media query; it is the only `animation` outside `no-preference`, and it is opacity-only:

  ```css
  .loading { animation: fade-in var(--dur-base) var(--ease-out) var(--delay-loading) backwards; }
  ```

### 5.9 Theme switch crossfade (I7)

**Files:** `src/hooks/useTheme.js`, `src/styles/motion.css`.

- Move the body of `toggle` into an inner `apply()`, unchanged.
- Then:

  ```js
  import { flushSync } from 'react-dom';
  const toggle = useCallback(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduced) { apply(); return; }
    document.startViewTransition(() => flushSync(apply));
  }, []);
  ```

- `motion.css` (no-preference):

  ```css
  ::view-transition-old(root), ::view-transition-new(root) { animation-duration: var(--dur-base); animation-timing-function: var(--ease-in-out); }
  ```

- View Transitions do not inject styles, so the CSP is unaffected.
- The `tq-theme` storage key and the theme-color meta update stay as they are.

## 6. Libraries

- **Installed:** react 18.3.1, react-dom 18.3.1, react-router-dom 7.18.4, vite 7.3.7, @vitejs/plugin-react 5.2.0. There is no animation library.
- **Reuse:**
  - `src/hooks/useReducedMotion.js`;
  - `src/components/common/CountUp.jsx` (extended);
  - the IntersectionObserver logic from `Reveal.jsx` (moved into `useInView.js`);
  - CSS transitions and keyframes.
- **Platform features:**
  - `@starting-style` and `transition-behavior: allow-discrete` (mobile menu);
  - scroll-driven animations (`animation-timeline: scroll()`; read progress and top-bar elevation);
  - same-document View Transitions (theme switch only).

  Each one is feature-detected or wrapped in `@supports`.
- **Add: none.** Every effect here is CSS or a few lines of IntersectionObserver. Motion and GSAP would only add JS weight, and Motion's `AnimatePresence mode="popLayout"` injects a `<style>` element that this CSP (`style-src 'self'`) blocks.
- If a future change truly needs a library, it must be pinned to an exact version (`tests/site.test.mjs`) and approved first. It is out of scope for this spec.

## 7. Quality bar

Every step must meet all of these. Measure on `npm run build && npm run preview` (http://127.0.0.1:4174, production CSP), not the dev server.

1. **Reduced motion.**
   - **Setup:** DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", then reload `/` and a case study.
   - **What must hold:**
     - Nothing moves.
     - KPI values show their final numbers on first paint.
     - Bars and the GPA plot are fully drawn.
     - Filter, semester and route changes are instant.
     - The theme switches without a crossfade.
     - The read-progress bar is hidden.
   - **How it is guaranteed:** every new `animation` and every hover transform sits inside `@media (prefers-reduced-motion: no-preference)` (the only exception is `.loading`, which is opacity-only). JS paths check `useReducedMotion()` or `matchMedia`. Keep the existing reduce block in `base.css`.
2. **Transform and opacity only.**
   - `@keyframes` may set only `transform` and `opacity`.
   - `transition` may list only `transform`, `opacity`, `color`, `background-color`, `border-color`, `text-decoration-color`, and `display` with `allow-discrete`. Colour transitions are state feedback of 150 ms or less on single elements.
   - Never animate or transition `width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow`, `filter`, `clip-path`, `stroke-*` or `background-position`.
   - No `transition: all`. No `will-change` in stylesheets.
   - The count-up text update is an existing, accepted repaint.
   - **Check:** DevTools → Rendering → Paint flashing. During the hero boot, only the counting digits flash.
3. **Mobile-first and responsive.**
   - Write new rules for the smallest screen first, and use `min-width` for wider-screen additions (for example, the nav indicator at `min-width: 861px`).
   - Do not change existing breakpoints.
   - Test at 360×740, 390×844, 768×1024, 1280×800 and 1440×900, in both themes.
   - `document.documentElement.scrollWidth === document.documentElement.clientWidth` at every size.
4. **Visible keyboard focus.**
   - Tab through `/` and one case study. Every focusable element shows the 2 px `--accent` outline at a 3 px offset.
   - Focus order is unchanged.
   - Every hover effect has a focus equivalent (sections 5.3, 5.4).
   - The skip link still appears at `top: 0.75rem` on focus.
5. **WCAG AA contrast.**
   - Text needs 4.5:1, or 3:1 at 24 px+ (18.66 px+ bold). UI parts and focus rings need 3:1.
   - Use only existing colour tokens. The new accent indicators and progress bar use `--accent` on `--bg` or `--surface`.
   - Pairs at the limit, which you must not darken or lighten:
     - dark `--text-faint` #7d8ba6 on `--surface-2` #17223a, ≈4.6:1;
     - light `--text-faint` #5b6b82 on `--surface-2` #f1f4f9, ≈4.9:1;
     - light `--accent` #0e7490 on `--bg` #f5f7fb, ≈5.0:1.
   - The scan overlay is 14% accent and lasts 700 ms. No overlay may reduce text contrast for longer.
6. **No layout shift.**
   - CLS ≤ baseline on both pages, and new code contributes 0. Check the DevTools Performance "Layout shifts" track.
   - Reserve space for count-ups (`min-width: Nch`).
   - Add `html { scrollbar-gutter: stable; }` in `base.css` so filtering cards never moves the page sideways.
   - Use no element that pushes content when it appears. The progress bar is absolutely positioned.
7. **No Lighthouse regression.**
   - **Baseline (step 0):** Chrome DevTools Lighthouse, mobile and desktop, for `/` and `/projects/gamevault-marketplace`. Take the median of 3 runs.
   - **Pass for each step:**
     - Performance, Accessibility, Best Practices and SEO medians ≥ baseline. If one is lower by 1–2, re-run 5 times; a confirmed drop blocks the step.
     - LCP ≤ baseline + 50 ms, with the same LCP element.
     - TBT ≤ baseline + 20 ms.
     - The "Avoid non-composited animations" audit lists nothing new.
8. **Bundle budget.** Totals across all steps: JS gzip +3 KB at most, CSS gzip +2.5 KB at most. Measure after `npm run build`:

   ```
   node -e "const fs=require('fs'),z=require('zlib');for(const f of fs.readdirSync('dist/assets'))if(/\.(js|css)$/.test(f))console.log(f,(z.gzipSync(fs.readFileSync('dist/assets/'+f)).length/1024).toFixed(2)+' KB')"
   ```

9. **CSP clean.** No "Refused to apply inline style" or other CSP messages in the console on the preview server.
10. **Tests.** `npm test` passes, including the new `tests/motion.test.mjs` (step 2).

## 8. Implementation steps

Each step is a separate commit that can ship on its own. After every step, run the section 0 check, `npm test`, `npm run build`, and the section 7 checks relevant to it.

**Step 0: Baseline (no code).**
- Record Lighthouse medians (section 7.7), the bundle sizes (7.8), the LCP element for both pages, and screenshots at 390×844 and 1440×900 in both themes for `/` and `/projects/gamevault-marketplace`.
- Keep these outside the repo, or in `docs/uiux-baseline/`, which is not deployed.
- **Accept:** numbers are written down.

**Step 1: Motion tokens.**
- **Files:** `src/styles/tokens.css`, new `src/motion/tokens.js`.
- **Accept:** build passes. The only visual change is the slightly different `--ease` curve on existing transitions.

**Step 2: Guardrail test and existing motion debt.**
- **Files:** new `tests/motion.test.mjs`, new `src/styles/motion.css` and its import in `src/main.jsx`, `src/styles/sections.css`, `src/styles/charts.css`, `src/styles/components.css`, `src/styles/pages.css`, `src/styles/case.css`, `src/styles/base.css`, `src/components/common/CountUp.jsx`.
- **The test** uses `node:test` and the `read` / `loadDataModule` helpers. It asserts:
  1. `@keyframes` appear only in `src/styles/motion.css`, and their bodies set only `transform` and `opacity`;
  2. every `transition` / `transition-property` value in `src/styles/*.css` uses only the section 7.2 allowlist, and none says `all`;
  3. no `will-change` in `src/styles`;
  4. `base.css` still contains `prefers-reduced-motion: reduce`;
  5. the `--dur-*` values in `tokens.css` equal `motion.duration` in `src/motion/tokens.js`;
  6. no file under `src/` contains `createElement('style')` or `setAttribute('style'`.
- **Fixes:**
  - status-dot ping (S4) replaces the box-shadow pulse;
  - remove the project-card lift;
  - `.btn`, `.channel-list a` and `.theme-switch` transitions use `background-color` instead of the `background` shorthand;
  - `.btn:active` uses scale;
  - move `grow` to `motion.css`, with bars still animating on mount for now under no-preference;
  - move the thumbnail and screenshot zoom into the gated hover block (section 5.3);
  - CountUp gets `min-width`, `start`, `delay`, and the 800 ms default;
  - add `scrollbar-gutter: stable`.
- **Accept:**
  - the test passes;
  - the dot pings 3 times and then stays still;
  - cards no longer lift;
  - on `/projects/gamevault-marketplace` the "110" KPI unit does not move while counting;
  - zero layout shifts.

**Step 3: Remove the generic section reveal.**
- **Files:** `src/pages/HomePage.jsx` (render the four sections without `<Reveal>`), new `src/hooks/useInView.js`, delete `src/components/common/Reveal.jsx`, remove the `.reveal` rules from `src/styles/base.css` (including the `.reveal` line in the reduce block).
- **Accept:**
  - sections no longer fade in;
  - loading `/#contact` lands on visible content;
  - section order is unchanged;
  - `grep -r "Reveal" src` finds nothing.

**Step 4: Hero dashboard boot (signature).**
- **Files:** new `src/hooks/useBootSequence.js`, `src/sections/HeroSection.jsx`, `src/components/common/Dashboard.jsx`, `src/styles/sections.css`, `src/styles/motion.css`.
- **Accept:**
  - at 1440×900, a Performance recording matches the 4.1 timeline within ±50 ms;
  - going to a case study and back does not replay;
  - at 390×844 it plays when the aside scrolls into view;
  - under reduced motion, final values show at once;
  - same LCP element, LCP ≤ baseline + 50 ms;
  - CLS unchanged.

**Step 5: Top bar.**
- **Files:** new `src/hooks/useActiveSection.js`, `src/components/layout/TopBar.jsx`, `src/styles/components.css`, `src/styles/motion.css`.
- **Scope:** scrollspy with `aria-current`, desktop indicator, mobile menu transition, icon swap, elevation.
- **Accept:**
  - scrolling `/` moves the indicator section by section, with exactly one link `aria-current` at a time;
  - no indicator on case pages;
  - the mobile menu opens in 220 ms and closes in 150 ms;
  - Escape closes it and focus stays on the toggle;
  - no icon animation on page load;
  - elevation appears by 96 px of scroll in Chrome, Safari and Firefox 159+.

**Step 6: Micro-interactions.**
- **Files:** `src/styles/components.css`, `src/styles/sections.css`, `src/styles/pages.css`, `src/styles/case.css`, `src/styles/base.css`, `src/styles/motion.css`.
- **Scope:** sections 5.2–5.5, 4.5, 4.6, and the pager in 4.7.
- **Accept:**
  - every hover state has a keyboard twin;
  - in DevTools device emulation (touch), tapping causes no transforms;
  - no transition is longer than its I8 entry in the budget table.

**Step 7: Project filter crossfade.**
- **Files:** `src/sections/ProjectsSection.jsx`, `src/components/projects/ProjectPanel.jsx`, `src/styles/motion.css`.
- **Accept:**
  - first load shows no card animation;
  - each filter click crossfades in ≤ 220 + 5×35 = 395 ms;
  - focus stays on the clicked button;
  - card numbering and the `aria-live` text are unchanged.

**Step 8: Data reveals.**
- **Files:** `src/components/charts/BarList.jsx`, `src/components/charts/GpaTrendChart.jsx`, `src/sections/AcademicsSection.jsx`, `src/styles/charts.css`, `src/styles/motion.css`.
- **Accept:**
  - bars grow only when they enter view, on `/#stack` and on `/projects/gym-calories-predictive-analysis` (model comparison);
  - bar values are readable throughout;
  - the GPA sweep runs once in 640 ms, and the axis labels never hide;
  - switching semesters fades rows in 150 ms;
  - the table caption is unchanged.

**Step 9: Route enter, loading delay and preload.**
- **Files:** new `src/components/layout/RouteView.jsx`, new `src/lib/loadProjectPage.js`, `src/App.jsx`, `src/components/projects/ProjectPanel.jsx`, `src/sections/AcademicsSection.jsx`, `src/styles/motion.css`.
- **Accept:**
  - a direct load of `/projects/sole-district` does not animate;
  - clicking a card from `/` plays a 220 ms enter;
  - a hash link on `/` does not animate;
  - hovering a card fetches the `ProjectPage` chunk (Network panel), so no "Loading project…" appears;
  - with "Slow 4G" and no hover, the fallback appears only after 300 ms.

**Step 10: Case-study reading aids.**
- **Files:** `src/components/layout/TopBar.jsx` (read progress), `src/pages/ProjectPage.jsx` (TOC `aria-current`), `src/styles/pages.css`, `src/styles/components.css`, `src/styles/motion.css`.
- **Accept:**
  - the bar tracks scroll from 0 to 100% and is absent on `/`, the 404 page, and under reduced motion;
  - the TOC highlights the block under the top bar on desktop and in chip layout.

**Step 11: Theme crossfade.**
- **Files:** `src/hooks/useTheme.js`, `src/styles/motion.css`.
- **Accept:**
  - the crossfade takes 220 ms where `document.startViewTransition` exists, and is instant elsewhere and under reduced motion;
  - the choice persists after reload;
  - no CSP messages.

**Step 12: Type and layout polish.**
- **Files:** `src/styles/tokens.css`, and every file in `src/styles/` for the font-size mapping.
- **Add tokens:**

  ```css
  --fs-12: 0.75rem; --fs-13: 0.8125rem; --fs-14: 0.875rem; --fs-15: 0.9375rem;
  --fs-16: 1rem; --fs-18: 1.125rem; --fs-20: 1.25rem;
  --fs-kpi: clamp(1.6rem, 3vw, 2rem); --fs-h2: clamp(1.6rem, 3.2vw, 2.2rem);
  --fs-h1: clamp(2rem, 4.5vw, 3rem); --fs-hero: clamp(2.3rem, 5.5vw, 3.6rem); --fs-stat: 3rem;
  ```

- **Mapping:**

  | Existing `font-size` | New token |
  |---|---|
  | 0.75rem | `--fs-12` |
  | 0.78rem, 0.8rem, 0.82rem | `--fs-13` |
  | 0.85rem, 0.875rem, 0.88rem | `--fs-14` |
  | 0.9rem, 0.92rem, 0.95rem | `--fs-15` |
  | 1rem | `--fs-16` |
  | 1.05rem, 1.1rem, 1.15rem | `--fs-18` |
  | 1.2rem | `--fs-20` |
  | Each `clamp()` above, and `.gpa-value` 3rem | Its matching display token |
  | `.not-found h1` 2.2rem | `--fs-h2` |

- **Leave alone:** the SVG `font-size` in `.gpa-chart` (10px, 11px, which are viewBox units), `.kpi-unit`'s `max(0.55em, 0.75rem)`, and the ≤420 px `.metric-row dd` override (map 1rem to `--fs-16`).
- **Also:**
  - `text-wrap: balance` on `h1, h2, .panel-title, .project-panel h3`;
  - `text-wrap: pretty` on `.hero-intro, .section-lede, .project-summary, .case-block p, .shot figcaption`.
- **Accept:**
  - screenshots match the baseline except for the mapped size changes (≤ 1.6 px each);
  - no new horizontal overflow at 360 px;
  - Lighthouse holds.

**Step 13: Final QA.**
- Run all of section 7 on both pages, both themes, all five viewports, and with reduced motion.
- Compare against the step 0 numbers.
- Confirm the section 0 check against the step 0 commit: `git diff --exit-code <step0-sha> -- src/data public index.html vercel.json`.

## 9. UIUX skills checklist

The implementer must follow every rule.

**Motion timing**
- [ ] Press 80 ms; hover and focus feedback 150 ms; small UI enter 220 ms; exits about 70% of the enter (150 ms); entrances 420 ms; data reveals 640 ms; count-up 800 ms.
- [ ] No single element animates longer than 640 ms, except the count-up (800 ms), the scan line (700 ms) and the status ping (1600 ms × 3).
- [ ] No sequence runs longer than 950 ms, except the hero boot at 1300 ms or less.
- [ ] Stagger is 35 or 60 ms, capped at 6 steps (8 for bars).
- [ ] Use tokens only; no literal durations in new CSS. The only allowed literals are `1600ms` (ping), and `120ms` and `360ms` (boot offsets).

**Easing**
- [ ] Entering and hover: `--ease-out`.
- [ ] Leaving: `--ease-in`.
- [ ] Movement that starts and ends on screen (sweep, crossfade): `--ease-in-out`.
- [ ] Scroll-linked: `linear`.
- [ ] Never use `linear` for time-based UI motion.
- [ ] No overshoot, spring, bounce, or steps().

**Distance and scale**
- [ ] Translate ≤ 8 px (nudges 2–3 px).
- [ ] Scale 0.97–1.03.
- [ ] No rotation except the 150 ms menu-icon swap.

**Hierarchy**
- [ ] Reading order is name → intro → primary CTA. Nothing moves near the h1 or the "View projects" button on load.
- [ ] At most one animated group in view at a time (the boot, or one data block).
- [ ] Motion never competes with the primary button.
- [ ] Heading structure stays as is: one h1 per page, h2 for sections, h3 for panels, h4 for groups.

**Spacing scale**
- [ ] New spacing uses only `--space-1` to `--space-8` (4, 8, 12, 16, 24, 32, 48, 72 px).
- [ ] Do not change existing micro-paddings on badges and tags.

**Type scale**
- [ ] After step 12, font sizes use only the `--fs-*` tokens.
- [ ] Body line-height 1.6, headings 1.2 (existing).
- [ ] Prose width stays 60–70ch (existing `max-width`s).
- [ ] Mono font only for labels, indices, numbers and code-like text (existing usage).

**Accessibility**
- [ ] The final state is the CSS default; motion lives inside `prefers-reduced-motion: no-preference`.
- [ ] JS motion checks `useReducedMotion()`.
- [ ] Every hover has a `:focus-visible` or `:focus-within` twin. Never remove an outline without a replacement.
- [ ] No information is conveyed by motion alone. Values are always present in text and in `sr-only` copies.
- [ ] Nothing flashes more than 3 times per second. Nothing auto-moves for more than 5 s (the ping stops at 4.8 s).
- [ ] New decorative elements get `aria-hidden="true"`. Active nav and TOC links get `aria-current="true"`.
- [ ] Touch targets stay ≥ 24×24 px (WCAG 2.5.8). Do not shrink existing ones.
- [ ] Hover transforms only under `(hover: hover) and (pointer: fine)`.

**Implementation hygiene**
- [ ] CSS first. JS only switches `data-motion` states, observes intersection, preloads, or starts a View Transition.
- [ ] Styles come only from stylesheets or React `style` custom properties. No injected `<style>`.
- [ ] Every observer is disconnected and every rAF cancelled on unmount.
- [ ] No scroll or resize listeners.
- [ ] No `position: fixed` inside `.route-view`.

## 10. Do-not list

- **Content changes:** any edit to `src/data/*`, `public/*`, `index.html`, JSX text, `alt`, `title`, `aria-label`, captions, link targets, images, project names, or section and block order.
- **New sections, panels, badges, tooltips, lightboxes, modals, or any new visible text.**
- **Heavy dependencies:** Motion / Framer Motion, GSAP, Lottie, AOS, Three.js, Locomotive / Lenis, react-spring, anime.js, or any icon or CSS framework.
- **Platform changes:** upgrading React or React Router, switching to `createBrowserRouter`, or adding SSR.
- **Scroll-jacking:** wheel or touch hijacking, smooth-scroll libraries, CSS `scroll-snap` on the page, pinned or sticky storytelling sections, or scroll-scrubbed content reveals. The only scroll-linked effects are C1 and C2.
- **Autoplay media:** video or animated backgrounds, GIFs, looping animations, marquee or ticker effects.
- **Parallax** of any kind, including background-position and mouse-follow.
- **Gimmicks:** custom or follower cursors, magnetic buttons, typewriter or scrambled text, per-letter or per-word splitting, 3D tilt, hover lift on cards, glow or blur effects, confetti, gradient-shift backgrounds.
- **Generic entrances:** fade-slide-up on every section, block, card or heading.
- **Disallowed animated properties:** layout or paint properties (`width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow`, `filter`, `clip-path`, `stroke-dashoffset`).
- **Protected files and settings:** `vercel.json` (CSP and headers), breakpoints, colour token values, existing tests (adding `tests/motion.test.mjs` is the only test change).
- **Disallowed CSS:** `!important` outside the existing reduced-motion block, permanent `will-change`, and `transition: all`.
