# Wai Yan Hpone Lat · Portfolio

I’m an Applied AI & Analytics student at Nanyang Polytechnic. This portfolio presents my projects, skills, academic results and résumé, with contributions and verification limits explained in each case study.

**[teddy-qyuon-portfolio.vercel.app](https://teddy-qyuon-portfolio.vercel.app)**

![Portfolio homepage in dark mode, showing the introduction, navigation and project dashboard](.github/preview.png)

## Highlights

- Project case studies with screenshots and filters for personal projects and coursework.
- Skills charts, semester results and a GPA trend chart.
- Persistent light and dark themes across desktop and mobile layouts.
- Keyboard navigation, screen-reader labels and reduced-motion support.
- A strict Content Security Policy, applied to production and local preview.
- Automated checks for content, asset references, routing, security headers and motion.

Personal projects are AI-assisted. The case studies distinguish my contributions, historical measurements and current verification limits.

## Tech stack

React 18, React Router, Vite, plain CSS with design tokens, the Node test runner and Vercel.

## Run locally

Use Node.js 20.19 or later within 20.x, or Node.js 22.12 or later.

```bash
git clone https://github.com/TeddyQyuon/TeddyQyuonPortfolio.git
cd TeddyQyuonPortfolio
npm ci
npm run dev
```

Run checks and create the production bundle:

```bash
npm test
npm run build
```

`npm run preview` serves the production build with the production security headers.
Production builds also generate project HTML and the sitemap from project metadata.
To regenerate the social preview image on Windows, run `powershell -File scripts/build-og-image.ps1`.

## Project structure

```text
src/
  assets/       Project screenshots, portraits and icons
  components/   Shared UI, charts and case-study components
  config/       Metadata and navigation
  data/         Personal, project, skills and academic content
  hooks/        Theme, navigation, metadata and motion
  lib/          Project helpers and route preloading
  motion/       Shared JavaScript motion tokens
  pages/        Home, case studies and not-found page
  sections/     Homepage sections
  styles/       Design tokens, layouts, components and motion
```

## Contact

[GitHub](https://github.com/TeddyQyuon) · [LinkedIn](https://www.linkedin.com/in/waiyanhponelat) · [Email](mailto:waiyanhponelat.eduvalor.2024g@gmail.com)
