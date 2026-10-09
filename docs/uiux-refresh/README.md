# October 2026 portfolio and personal-site refresh

The portfolio now includes the current project information, internship window, education, coursework, skills, HackIT 2026 prototype work and a regenerated two-page résumé. Technology marks are actual brand assets; their provenance is documented in `src/assets/images/technology/README.md`. Project claims distinguish implemented code, verified public features and remaining setup.

## Published personal sites

| Site | Published source commit | Verified changes |
| --- | --- | --- |
| SOLE DISTRICT | `098bb02fd6e208237a706ad48bf76d4ed57dd54a` | Larger wishlist, size and shopping controls; bordered filters; responsive toolbar and sticky desktop purchase panel |
| SCENTHAUS | `4d1acff02f828b2809ff16eb8630a6d974464c3a` | Removable active filters, Clear all, announced results, clearer natural-language search and larger touch controls |
| MeterWise | `2e1a83220412b5dd1898421ddd02f0d93d5fff50` | Keyboard-accessible scrolling table regions, 44 px filters, readable metrics and mobile table guidance |
| Playlist Port | `ab3aa3fdb04db119498edda53e4d804ee16f64a5` | Start with Spotify, four-step progress, destination guidance, authentic service colours and keyboard focus |

SCENTHAUS documentation subsequently changed in `635169ee762f8b1dda2d1f1f7251501be778395b`; the public alias serves the verified runtime commit above.

## Validation

- All five production builds passed.
- Portfolio security checks: 4 passed, 1 platform-specific Windows check skipped on Linux.
- SOLE DISTRICT Sites checks: 4 passed.
- SCENTHAUS storefront and checkout unit checks: 15 passed.
- Playlist Port API and transfer checks: 34 passed.
- MeterWise Python checks: 45 passed; TypeScript and Ruff checks passed.
- Public production URLs were opened and their new UI verified. SCENTHAUS filter removal and Clear all, MeterWise town filtering and table focus regions, SOLE DISTRICT filter opening and 44 px wishlist controls, and Playlist Port start/destination guidance were checked live.
- Responsive CSS was reviewed. A separate mobile viewport was unavailable in this browser environment; mobile browser testing remains unverified.
- Authenticated playlist transfers, live commercial payments and private merchant administration were outside this UI refresh verification. Existing demo limitations remain visible on the portfolio.

`portfolio-desktop.jpg` is an actual capture of the published portfolio hero. The refreshed personal-site captures in `src/assets/images/projects` are also actual browser screenshots, not generated mockups.

## 9 October follow-up (Singapore time)

The follow-up source and live DOM review found 36 px social links, 34.5 px footer links and 40 px icon controls. They now have a minimum 44 px touch target. Narrow grid columns can shrink safely and technology labels can wrap.

Each case-study screenshot now has its own `figure` and `figcaption`. Previously one figure contained all six SCENTHAUS screenshot captions. The new structure keeps each image and description associated for assistive technology while preserving the full-size image link.

The production build and whitespace checks passed. Mobile emulation remains unavailable in the cloud browser, so this is a source review and live desktop verification, not a completed mobile-browser test.

Live verification confirmed all seven social links, the footer links and three footer icon buttons at 44 px high, plus six separate SCENTHAUS figures with one image and caption each. `portfolio-accessibility-followup.jpg` captures the published contact and footer view.
