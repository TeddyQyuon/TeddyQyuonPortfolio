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