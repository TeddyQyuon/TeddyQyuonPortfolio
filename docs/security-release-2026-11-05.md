# Security release verification, 5 November 2026

The six original security PRs are merged and closed: GameVault #1, MeterWise #4, Playlist Port #3, SCENTHAUS #1, SOLE DISTRICT #1 and the older portfolio #1. Their fixes are on each repository's main branch. The active portfolio is TeddyQyuonPortfolio; the older TeddyQyuonPortfolio-main repository has no linked Vercel project in the connected account.

## Confirmed production releases

| Application | Verified source | Evidence |
| --- | --- | --- |
| GameVault | `504db76` (documentation follow-up to security fix `00fec6d`) | Vercel ready; public health succeeds, catalogue returns 37 products, public coder execution rejects POST with 404 / NOT_FOUND |
| MeterWise | `5437f7d` | Vercel ready; health reports FastAPI 2.1.0 and Turso |
| Playlist Port | `e13cacb` | Vercel ready; public homepage and health endpoint succeed with browser security headers |
| SOLE DISTRICT | `dbd31d2` | Production and preview ready; production uses PostgreSQL, mobile browser has no horizontal overflow or broken images |

The SOLE preview uses the separate free-plan Neon resource `sole-district-preview` in Singapore. It is attached only to Preview. The existing `sole-district-production` resource remains attached only to Production. Preview health reports PostgreSQL and checkout disabled, its catalogue returns 175 products, and an unauthenticated merchant dashboard request is rejected. Temporary automation credentials used to inspect protected deployments were revoked. Deployment protection remains enabled.

The latest SOLE native PostgreSQL/frontend CI check passed. Local builds and four packaging tests passed. GameVault passed 45 frontend and 65 backend tests; its optional live MySQL suite was not run. MeterWise passed 91 backend tests. Playlist Port passed 55 tests after building its static frontend. Nine JavaScript dependency audits and the three installed Python serving environments were clean. MeterWise's older ML files still have unrelated lint findings; its changed security files pass lint.

## SCENTHAUS release held for broader CI diagnosis

SCENTHAUS production tracks `complete-phases-real-catalog`. Commit `a2c9c03` backports dependency maintenance to that single-store branch. It retains the current storefront and excludes main's larger multi-tenant schema release. The PyTorch CPU bootstrap fix is also on main at `9f3f3d4`.

Vercel candidate `dpl_8j3y7twYbEWNT5MKg7exyE19DYZ1` is READY. Authenticated candidate checks confirm healthy serving models, 150 catalogue products, semantic search results and a protected forecast endpoint. The canonical public alias was not moved to the candidate.

Checks passed:

- 22 frontend unit tests and frontend production build.
- 53 native PostgreSQL startup, authentication, payment and concurrency tests on a disposable local database.
- Twelve pure ML tests with PyTorch 2.13.0+cpu. The broader local ML selection requires seeded data/trained artifacts and was not represented as passing.
- Frontend dependency audit and installed training-environment advisory checks. The CPU wheel's local version is not listed by PyPI; the corresponding base torch==2.13.0 advisory check separately passed.

The full native CI run failed at pytest; subsequent browser/lint/build steps in that job were skipped. Its exact failure is unresolved. Run: https://github.com/TeddyQyuon/scenthaus-intelligence/actions/runs/41949907344

The runtime blocks GitHub's log download host. `results-receiver.actions.githubusercontent.com` was added to the saved environment-network draft, preserving the existing allowlist. Apply that setting to retrieve the failure logs, diagnose/fix the remaining check, then verify and promote the candidate. A ready Vercel build and passing selected tests are not a claim that full native CI passed.

No real payment was submitted, production data was not reset, and production database credentials were not copied into preview.
