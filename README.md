# Portfolio Website

Personal portfolio for **Wai Yan Hpone Lat** — Full-Stack Development student seeking a 1-year internship.

## Purpose

A recruiter-focused portfolio that presents verified skills, real project work (with team contributions clearly separated from personal contributions), education, résumé access and contact links.

## Technology Stack

- **React 18** — frontend library
- **Vite 7** — build tool and dev server
- **Material UI v5** — UI component system and theming
- **React Router v7** — routing and dynamic project URLs (`/projects/:slug`)
- **JavaScript** — no TypeScript

No backend and no database are required for this version. All content is stored in structured JavaScript data files, and the résumé is a static PDF.

## Main Features

- Single-page homepage with Hero, Projects, About, Skills, Education, Academic Progress, Resume and Contact sections
- Dynamic project detail pages (`/projects/:slug`) with case-study content
- Responsive navigation with mobile menu
- Real technology logos from Devicon for verified technologies; concepts without a brand icon remain text
- Real project screenshots where available and clearly labelled illustrative covers for projects without screenshots
- A thumbnail rendered from the actual résumé PDF, with links to view or download that same static PDF
- Contact via email, GitHub, LinkedIn and WhatsApp (no contact form backend)
- Custom 404 page and project-not-found state
- Defensive rendering: buttons hidden when repository/demo URLs are missing

## Project Structure

```
portfolio/
├── public/
│   └── resume/                  # Résumé PDF
├── src/
│   ├── assets/images/           # Profile, project evidence, illustrative covers, résumé thumbnail, logos
│   ├── components/
│   │   ├── layout/              # Navbar, Footer
│   │   ├── common/              # SectionHeading, SkillChip, TechnologyLogo, BackToTop
│   │   └── projects/            # ProjectCard, ProjectGallery
│   ├── data/                    # personalInfo, skills, projects, education
│   ├── pages/                   # HomePage, ProjectDetailPage, NotFoundPage
│   ├── sections/                # Homepage sections
│   ├── theme/                   # MUI theme
│   ├── App.jsx                  # Routes
│   ├── main.jsx                 # Entry point
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── vercel.json                  # SPA rewrite for React Router direct URLs
```

## Local Setup

Use Node.js 22.12+ (tested with Node.js 24). Node.js 20.19+ also satisfies the toolchain's minimum requirements.

```bash
npm ci
```

## Run Instructions

```bash
npm run dev
```

Open the local development URL shown in the terminal.

## Production Build

```bash
npm run build
npm run preview
```

The build outputs to `dist/`. `npm run preview` is for local validation of the production build only.

## Security checks

```bash
npm run test:security
npm audit --offline=false
```

The security tests exercise Vite's file-access protections with disposable dummy files, including the Windows alternate-path and source-map traversal regressions. Run them on Windows to cover both issues; the Windows-only check is skipped on other systems.

Development and preview bind to `127.0.0.1`. Avoid exposing them to untrusted networks. Production serves only `dist/`.

`vercel.json` defines the production Content Security Policy, and local preview uses the same headers. Scripts are restricted to the site's own origin; inline scripts and evaluation are blocked. Inline styles remain permitted for MUI/Emotion, with Google Fonts explicitly allowed. Check the homepage, project pages and mobile navigation in preview after changing the policy.

## Deployment

Deployed on **Vercel** (hosting platform only — not presented as a development skill):

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Build command: `npm run build`, output directory: `dist`.
4. `vercel.json` rewrites non-file routes to `index.html` so React Router direct URLs (e.g. `/projects/annual-leave-management`) work after refresh.

## Asset provenance

The React, Node.js and other technology marks are original Devicon SVGs; their source is recorded in `src/assets/images/technology/README.md`. The two conceptual project covers are labelled as illustrations on cards and detail pages. Actual project screenshots are kept separate. The résumé thumbnail is rendered from the same public PDF that the buttons open and download.

## Portfolio redesign — October 2026

Personal projects lead the homepage and case-study navigation: MeterWise, then
Playlist Port. The two school projects follow: Annual Leave Management and
Gym Calories Predictive Analysis. Explicit projectGroup and displayOrder fields
in src/data/projects.js control this order. Full project descriptions, ownership
and AI-assistance notes remain in the case studies.

The layout uses a shared restrained theme, smaller corner radii, compact skill
groups with the original technology logos, and responsive project previews.
The Playlist Port preview is a real screenshot from the deployed app; provenance
is recorded in src/assets/images/projects/playlist-port-source.md.
