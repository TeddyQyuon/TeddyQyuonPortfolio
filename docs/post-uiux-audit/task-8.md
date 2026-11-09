# Task 8: housekeeping (report only)

Inspected remote refs on 2026-11-10. `git branch -r --merged origin/main` lists uiux-upgrade and codex/mockup-upgrade. Counts below are from `git rev-list --count origin/main..origin/<branch>`. Dates are Asia/Singapore.

| Branch | Merged into main | Last commit | Last commit date | Commits absent from main | Recommendation |
|---|---|---|---|---:|---|
| uiux-upgrade | Yes | 5c08ba2 | 2026-11-07 07:33:34 | 0 | Delete after approval; implementation is preserved in main |
| codex/mockup-upgrade | Yes | a2e4351 | 2026-09-24 01:49:59 | 0 | Delete after approval |
| codex/portfolio-redesign-20261004 | No | af8e38e | 2026-10-04 06:47:49 | 11 | Keep until the unmerged work is reviewed |
| seo/social-preview-project-metadata | No | 28de339 | 2026-10-21 12:28:25 | 1 | Keep while PR #2 and its replacement are reviewed; owner will close PR #2 |

The public GitHub About description was confirmed to say “Full-Stack Development student seeking a 1-year internship.” The owner confirmed in chat that “Applied AI & Analytics student at Nanyang Polytechnic” is correct. These commands are proposals only; no branch or repository setting was changed:

```powershell
git push origin --delete uiux-upgrade codex/mockup-upgrade
gh repo edit TeddyQyuon/TeddyQyuonPortfolio --description "Personal portfolio for Wai Yan Hpone Lat — Applied AI & Analytics student at Nanyang Polytechnic."
```

Branch deletion and the description update require explicit approval under the audit prompt. Closing or editing PR #2 is reserved for the owner.
