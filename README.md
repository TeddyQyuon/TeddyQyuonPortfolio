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

- Single-page homepage with Hero, About, Skills, Projects, Education, Resume and Contact sections
- Dynamic project detail pages (`/projects/:slug`) with case-study content
- Responsive navigation with mobile menu
- Résumé viewing and download (static PDF)
- Contact via email, GitHub and LinkedIn (no contact form backend)
- Custom 404 page and project-not-found state
- Defensive rendering: buttons hidden when repository/demo URLs are missing

## Project Structure

```
portfolio/
├── public/
│   └── resume/                  # Résumé PDF
├── src/
│   ├── assets/images/           # Profile and project screenshots
│   ├── components/
│   │   ├── layout/              # Navbar, Footer
│   │   ├── common/              # SectionHeading, SkillChip, ExternalLinkButton
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
