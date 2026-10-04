# Portfolio Content Inventory

Source-of-truth checklist before any content goes live. Every public claim must have a source that can be explained in an interview.

## Status legend

- ✅ Verified and usable
- ⚠️ Needs confirmation
- ❌ Excluded

## Personal information

| Item | Status | Notes |
| --- | --- | --- |
| Name: Wai Yan Hpone Lat | ✅ | |
| Professional introduction | ✅ | Factual, based on coursework + projects |
| 1-year internship objective | ⚠️ | Confirm exact wording against finalized résumé |
| Course / institution wording | ⚠️ | Must come from finalized résumé — do not guess |
| Email | ⚠️ | Placeholder in `src/data/personalInfo.js` — replace |
| GitHub URL | ⚠️ | Placeholder — replace with real profile URL |
| LinkedIn URL | ⚠️ | Placeholder — replace with real profile URL |
| Résumé PDF | ⚠️ | Place current PDF at `public/resume/Wai_Yan_Hpone_Lat_Resume.pdf` |

## Skills

All skills listed in `src/data/skills.js` map to coursework or project work:

- Frontend: JavaScript, React, Hooks, Router, Vite, MUI ✅
- Backend: Node.js, Express, REST APIs, middleware ✅
- Database: MySQL, Sequelize, CRUD, associations ✅
- Integration: HTTP methods, Axios, env-based API config ✅
- Auth: JWT, bcrypt, token validation, authorization middleware, Bearer tokens, React Context, interceptors ✅
- Validation: Yup, Formik, input validation, sanitization concepts ✅
- Tooling: npm, VS Code, Postman, DevTools, MySQL Workbench ✅
- Version control: Git, GitHub ✅

Excluded: PostgreSQL/SQLite (unless personally completed and comfortable explaining), percentage bars, any skill not covered above.

## Projects

### Annual Leave Management System

- Type: **Team Full-Stack project** — my role: Member 3 ✅
- My contribution: Supervisor → Manager approval workflow, acting/delegated approvers, comments/rejection reasons, audit history/timeline, final-approval leave deduction, coverage-related workflow, notification/reminder/escalation work ✅
- Overall features described separately from my contribution ✅
- Repository URL: ⚠️ add real URL when confirmed
- Demo URL: ⚠️ only if genuinely available
- Screenshots: ⚠️ add real screenshots to `src/assets/images/projects/annual-leave/`

### Excluded projects

- ❌ Restaurant Ordering/Feedback System (not my work — do not include)
- ❌ Any other person's project

## Explicitly excluded claims

- ❌ Invented internship experience
- ❌ Invented deployment experience, user counts, business impact, performance numbers, awards
- ❌ Fabricated metrics ("improved efficiency by 80%")
- ❌ "Full-Stack Engineer" as employment experience
- ❌ Technologies not actually used (Docker, Kubernetes, CI/CD, microservices, cloud)
- ❌ Fake testimonials or skill percentages

## Before launch checklist

1. Replace all ⚠️ placeholders in `src/data/personalInfo.js`
2. Confirm education wording from finalized résumé in `src/data/education.js`
3. Add real repository URL (and demo if it exists) in `src/data/projects.js`
4. Add real screenshots with alt text
5. Place résumé PDF in `public/resume/`
6. Add `public/favicon.png`

## MeterWise addition — 3 October 2026

- Personal, AI-assisted portfolio MVP with synthetic electricity data; no employer/client dataset or fabricated business impact.
- Source and evidence: the private MeterWise GitHub repository, `VERIFICATION.md`, `SECURITY.md`, and real version 1.2 screenshots captured from the public Vercel app.
- Version 1.2: 14 automated tests, frontend/NodeNext TypeScript checks and build pass; npm audit reports 0 known dependency vulnerabilities. Ten production HTTP checks and cloud-browser imports, reload persistence, report downloads, tenant views and CSV validation use the live Vercel/Turso deployment. The case study distinguishes earlier local responsive checks and the untested live MySQL adapter/hardware.
- Interactive demo is public at https://meterwise-kappa.vercel.app/ and is labelled Live demo. The access note explains synthetic per-browser workspaces and the demo role switch. The private source repository remains unlinked for public visitors.
- Existing Annual Leave, Gym analysis and Playlist Port entries remain in place. Project-specific technologies do not automatically add unverified personal skills to the global skills list.


## MeterWise Singapore estate upgrade — 3 October 2026 UTC

- Version 2.0 is an independent public-housing operations pilot, not commissioned work or an official government service.
- Six public HDB Property Information records cover 620 dwelling units in Ang Mo Kio, Bishan and Tampines. Equipment installations, hourly readings, work orders and response targets are simulated.
- The case study documents per-block hourly solar accounting, missing-data safeguards, CSV repair, maintenance evidence, optimistic concurrency and server-enforced area permissions.
- Historical EMA 2024 emissions factor and illustrative tariff are explicit; no real savings, bill reductions, hardware integration or verified carbon performance are claimed.
- Nineteen automated tests and both TypeScript checks pass; browser evidence comes from the Vercel deployment. Live API evidence is retained with the private project repository.
- AI assistance is disclosed and the existing project URL remains stable. Other portfolio entries and global personal skills are preserved.

## MeterWise Python migration — 4 October 2026 SGT

- The existing MeterWise entry now describes a Python 3.12/FastAPI API on Vercel with persistent Turso storage. TypeScript remains frontend-only; Node/Express, Sequelize/MySQL and Worker runtime adapters are retired.
- All 45 pytest cases, Ruff, frontend checking and the Vite build pass; Python and npm dependency audits report zero known advisories. The suite compares the original TypeScript API contract and checks old cookie identity, saved windows/imports, body/CSV limits, roles, workspace isolation and atomic audit events.
- Current live verification is retained in the private MeterWise repository. The existing screenshots are labelled as version 2.0 UI evidence; backend migration does not change that interface.
- Stable case-study/demo URLs, private-source status, AI-assistance disclosure, personal-project order, school projects and global personal skills remain unchanged.
