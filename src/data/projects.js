import gameCurrent from '../assets/images/projects/current/gamevault.webp';
import soleCurrent from '../assets/images/projects/current/sole-district.webp';
import scentCurrent from '../assets/images/projects/current/scenthaus.webp';
import meterCurrent from '../assets/images/projects/current/meterwise.webp';
import playlistCurrent from '../assets/images/projects/current/playlist-port.webp';
// Project data — verified claims only.
// Rules enforced here:
// - Team projects clearly identified; "myContribution" contains ONLY my work.
// - repositoryUrl / demoUrl / reportUrl are nullable; UI hides buttons when absent.
// - No fabricated metrics, demos, repositories or screenshots.
//
// Screenshots are actual deployed app captures or figures from submitted reports.
// Projects without screenshots use a category or project-specific icon cover.
import caloriesVsDuration from '../assets/images/projects/gym-calories-predictive-analysis/calories-vs-duration.png';
import knimeWorkflow from '../assets/images/projects/gym-calories-predictive-analysis/knime-preparation-workflow.png';
import trainValidation from '../assets/images/projects/gym-calories-predictive-analysis/train-validation-partition.png';
import caloriesByWorkout from '../assets/images/projects/gym-calories-predictive-analysis/calories-by-workout-type.png';
import modelComparisonChart from '../assets/images/projects/gym-calories-predictive-analysis/model-comparison.png';
import leaveSignIn from '../assets/images/projects/annual-leave/sign-in-rbac.png';
import meterwiseWorkOrders from '../assets/images/projects/meterwise/work-order-audit.jpg';
import scenthausOverview from '../assets/images/projects/scenthaus/admin-overview.png';
import scenthausStorefront from '../assets/images/projects/scenthaus/storefront-verified.jpg';
import scenthausQuickAdd from '../assets/images/projects/scenthaus/quick-add-verified.jpg';
import scenthausCheckout from '../assets/images/projects/scenthaus/checkout-verified.jpg';
import scenthausPayment from '../assets/images/projects/scenthaus/payment-confirmed.jpg';
import soleDistrictProduct from '../assets/images/projects/sole-district/product-20261008.jpg';
import soleDistrictCheckout from '../assets/images/projects/sole-district/checkout-20261008.jpg';
import gamevaultProduct from '../assets/images/projects/gamevault/gamevault-product.jpg';
import gamevaultSubscriptions from '../assets/images/projects/gamevault/gamevault-subscriptions.jpg';

const projectData = [
  {
    id: 9,
    projectGroup: 'personal',
    displayOrder: 0,
    displayName: 'GameVault',
    cardSubtitle: "Responsive digital marketplace, product rails & Stripe checkout",
    cardSummary: "A redesigned digital marketplace with 37 published products, prominent autocomplete search, category menus and compact product rails. Responsive filters, a sliding cart and clear region and delivery details connect browsing to server-priced Stripe Checkout.",
    cardContribution: 'Full-stack architecture, storefront UI/UX redesign, sliding cart drawer, Vercel serverless API, Express REST backend, Sequelize MySQL schema, Stripe Checkout integration, and release verification with AI assistance.',
    cardTechnologies: ['React', 'Node.js', 'Vercel', 'Stripe', 'Express.js', 'MySQL', 'Sequelize ORM'],
    cardNote: 'Storefront & Vercel API deployed · 37 live products · Stripe Checkout ready.',
    slug: 'gamevault-marketplace',
    name: 'GameVault — Digital Game Subscriptions & Gift Cards Marketplace',
    category: 'Full-Stack',
    type: 'Personal commerce portfolio project',
    role: 'AI-assisted personal project',
    summary: 'A responsive full-stack digital marketplace built with React/Vite, Vercel Serverless Functions, Node.js/Express, and MySQL/Sequelize. Features 37 verified products across 15 game subscriptions, 8 gift cards, and 14 digital games with deduplicated editions, authentic vector platform branding, instant service tile routing, live autocomplete search, sliding interactive cart drawer with GAMER10 promo code math, server-priced Stripe Checkout, webhook signature verification, and a staff-managed 1-hour manual email delivery operations queue.',
    problem: 'Gamers and digital subscription buyers need transparent regional eligibility, instant access to pricing, and reliable delivery without confusing redirects or unverified third-party keys.',
    solution: 'GameVault provides a verified catalogue where each product displays exact supported regions, terms, and delivery assurances. Direct purchase buttons route instantly from brand tiles to product pages with sliding cart drawers. Serverless Vercel endpoints and the Express backend enforce server-owned pricing, prevent live sales of unverified demo listings, verify signed Stripe webhook events idempotently, and route paid orders into a staff fulfillment queue for manual email delivery.',
    dataset: '37 verified digital products: 15 popular subscriptions (Xbox Game Pass, PlayStation Plus, Nintendo Switch Online, EA Play, Discord Nitro, Spotify, Netflix, NordVPN), 8 digital gift cards (Steam, PlayStation, Xbox, Nintendo, Apple, Google Play, Roblox, Razer Gold), and 14 digital game titles. Product variants are fully deduplicated across catalogue and detail views; activation terms, prices, and regional restrictions are documented; demo listings are guarded from live transactions.',
    results: "The 31 October production release refreshed the marketplace with a light storefront, prominent search, product rails, responsive categories, self-hosted fonts, local artwork and split route bundles. A fresh 4 November API check returned 37 published products, and the public storefront was captured for this case study. The earlier implementation passed 76 automated tests; that historical count is not a claim that every redesign check passed. The source README records unresolved legacy path, manifest and artwork assertions. No live payment was made during this portfolio update.",
    technologies: ['React', 'Vite', 'JavaScript', 'Node.js', 'Vercel', 'Stripe', 'Express.js', 'Sequelize ORM', 'MySQL', 'Tailwind CSS'],
    features: [
      "Light storefront redesign with dense product rails and prominent search",
      "Responsive category navigation, browsing filters and clear region/delivery guidance",
      "Self-hosted fonts, local product artwork, lazy route bundles and PWA update handling",

      'Responsive light marketplace storefront with local platform artwork and product rails',
      'Curated catalogue with 37 verified products across 15 popular subscriptions, 8 digital gift cards, and 14 PC/console games',
      'Deduplicated product variants and editions across catalogue grid, search autocomplete, and detail views',
      'Direct service tile routing linking brand badges (NordVPN, Game Pass, PS Plus) straight to dedicated purchase pages',
      'Live autocomplete search dropdown with instant pricing, badge indicators, and product thumbnails',
      'Interactive sliding cart drawer with real-time subtotal math, quantity clamps (1..5), and GAMER10 promo code validation',
      'Product detail page with immediate Buy Now CTA, Add to Cart drawer, and delivery guarantees',
      'Stripe-hosted Checkout with payment method trust badges (Visa, Mastercard, Apple Pay, Google Pay, Stripe)',
      'Vercel Serverless Functions (/api/checkout/sessions, /api/health, /api/orders/[id], /api/products, /api/promos/validate) powering live edge checkout',
      'Server-owned price validation and anti-tampering guards ensuring client prices cannot be manipulated',
      'Signature-verified Stripe webhook handling with an idempotent event ledger preventing duplicate order fulfillment',
      'Safety guard preventing live Stripe checkout sessions for demo listings or unstocked inventory',
      'Manual 1-hour email fulfillment workflow with staff management queue and customer order tracking',
      'Protected staff console for catalogue publishing, order processing, and fulfillment dispatch',
      'Comprehensive 76-test automated test suite covering live guards, pricing calculations, webhooks, cart drawer, and catalogue deduplication',
    ],
    myContribution: 'I scoped and built the GameVault marketplace, directed the gaming brand identity and high-converting UI/UX overhaul, built the interactive sliding cart drawer and promo code logic, implemented the Vercel serverless API and Express/Sequelize backend, integrated Stripe Checkout and webhook verification, created the 37-product deduplicated catalogue, and verified the production Vercel release with AI assistance.',
    architecture: [
      'React 18 + Vite storefront with Tailwind CSS, interactive Cart Drawer, and responsive SPA routing',
      'Vercel Serverless Functions API (/api/*) handling edge checkout session creation, order lookups, and promo validation',
      'Node.js + Express REST API with cookie sessions, input validation, CSRF defense headers, and role-based guards',
      'Sequelize ORM with MySQL schema migrations covering products, orders, customers, and webhook ledgers',
      'Stripe Checkout Session API and cryptographic webhook signature verification with idempotent event ledger',
      'Manual 1-hour email fulfillment operational workflow and staff order queue',
      'Vercel production hosting with vercel.json SPA rewrites, static caching, and edge serverless deployment',
    ],
    challenges: 'Ensuring bulletproof separation between live and test checkout modes, guarding against demo listings being purchased with real money, guaranteeing webhook idempotency against duplicate delivery, fixing navigation paths so brand badges take shoppers directly to buying pages, and deduplicating subscription tier variants across catalogue and detail selectors.',
    learnings: 'How serverless edge APIs, server-authoritative pricing, payment gateway webhooks, digital fulfillment lifecycles, and e-commerce UX connect end-to-end in a deployed application.',
    screenshots: [
      {
        src: gameCurrent,
        alt: "GameVault redesigned light marketplace with prominent search, category menus and product rails.",
        caption: "Live marketplace captured on 4 November 2026. The October redesign adds a light storefront, product rails and clearer discovery and delivery guidance.",
      },
      {
        src: gamevaultProduct,
        alt: 'GameVault NordVPN product details page showing instant Buy Now CTA, pricing, and 1-hour email delivery assurance.',
        caption: 'Dedicated product purchase view with prominent Buy Now and Add to Cart actions, regional terms, and customer delivery guarantees.',
      },
      {
        src: gamevaultSubscriptions,
        alt: 'GameVault subscriptions collection showcasing game, entertainment, and software memberships.',
        caption: 'Subscriptions directory with platform badges, direct pricing, and one-click purchase routing across 15 popular services.',
      },
    ],
    repositoryUrl: 'https://github.com/TeddyQyuon/gamevault',
    demoUrl: 'https://gamevault-alpha-ten.vercel.app/',
    apiUrl: 'https://gamevault-alpha-ten.vercel.app/api/health',
    demoLabel: 'Live storefront',
    demoAccessNote: "Public storefront and Vercel API with 37 published products, autocomplete search, product rails and cart drawer. Stripe session creation uses server-owned prices; paid status depends on signed webhooks. Listings and delivery terms should be reviewed before any purchase. This portfolio update did not submit a payment.",
    reportUrl: null,
  },
  {
    id: 8,
    projectGroup: 'personal',
    displayOrder: 1,
    displayName: 'SOLE DISTRICT',
    cardSubtitle: "175-piece streetwear catalogue, editorial motion & Django commerce",
    cardSummary: "An editorial sneakers and streetwear storefront with 175 catalogue pieces, brand navigation, quick size selection, persistent bag and wishlist. The latest release adds clothing and accessories, reduced-motion support and Singapore address validation over a Django/PostgreSQL commerce backend.",
    cardContribution: 'Product direction, storefront, Django commerce workflows, AI assistant integration and release verification with AI assistance.',
    cardTechnologies: ['React', 'Python', 'Django', 'Stripe', 'PostgreSQL'],
    cardNote: 'Storefront and API deployed · Illustrative catalogue · Stripe checkout configured.',
    slug: 'sole-district',
    name: 'SOLE DISTRICT — Streetwear Commerce Platform',
    category: 'Full-Stack',
    type: 'Personal commerce portfolio project',
    role: 'AI-assisted personal project',
    summary: "A React/Vite storefront and Python/Django commerce system for one curated streetwear retailer, deployed together on Vercel with a dedicated Neon PostgreSQL database in Singapore. The public preview now presents 175 catalogue pieces with brand and category navigation, editorial motion, quick size selection, wishlist, a browser-persistent bag and account/recovery screens. Source includes scoped guest-order links, supplier evidence reviews, product editing, stock reservations, tracking, returns, operational reports, Gemini 3.8 Flash style advice, and server-priced Stripe Checkout with signature-verified webhooks.",
    problem: 'A streetwear retailer needs a coherent customer journey together with size-level stock control, fulfilment and reporting in one system.',
    solution: "The storefront connects to server-owned SKU prices, stock reservations, historic order snapshots and role-protected merchant workflows. Single-use email tokens and a durable outbox support accounts and order access. Stripe events match the order, amount, currency and mode; pending payments keep stock reserved and pending refunds do not restock items. Gemini 3.8 Flash powers AI styling assistance, and approved store policies govern launch readiness.",
    dataset: "The November catalogue contains 175 pieces across sneakers, clothing and accessories, with 21 labels represented in the storefront. Catalogue records, prices and stock are portfolio data; supplier authenticity and physical inventory have not been independently verified. No commercial performance is claimed.",
    results: "The November release expanded the preview to 175 pieces and added editorial motion, Singapore address validation and batched catalogue seeding. Earlier verification: all 42 backend checks passed on PostgreSQL 16 in GitHub Actions, including two buyers racing for the last unit, concurrent paid events consuming stock once and first-owner bootstrap safeguards. The production frontend build, four Sites packaging checks and migration consistency checks passed. Hosted verification confirms PostgreSQL health, the catalogue API, secure HttpOnly session cookies, CSRF rejection, protected merchant endpoints, admin assets and account/recovery screens. Redeployment preserved the database schema. Storefront checks cover size selection, sold-out states, wishlist, bag quantities, SGD totals, reload persistence and checkout flow. Live Stripe credentials, webhook verification and email transport are configured in production hosting.",
    technologies: ['React', 'Vite', 'JavaScript', 'CSS', 'Python', 'Django', 'PostgreSQL', 'SQLite', 'Stripe', 'Vercel'],
    features: [
      "Expanded 175-piece catalogue across sneakers, heavyweight clothing and accessories",
      "Brand mega menus, predictive search, quick size selection and category browsing",
      "Editorial motion and scroll progress with reduced-motion support",
      "Singapore postal, unit and phone validation with address lookup guidance",
      "Batched catalogue seeding reduces database round trips during deployment",

      'Editorial storefront, category and brand browsing, product search and product detail pages',
      'SKU-specific size and colour selection, sold-out states and product image enlargement',
      'Browser-persistent wishlist and bag with quantity controls and SGD totals',
      'Server-priced Stripe Checkout with Singapore SGD delivery policies and atomic stock reservations',
      'AI styling and customer concierge assistant powered by Gemini 3.8 Flash',
      'Email verification, password reset, single-use guest-order links and durable notifications',
      'Django sessions, CSRF checks, shared rate limits and staff-role permissions',
      'Private supplier evidence reviews, product galleries, SKU pricing and cost editing',
      'Fulfilment tracking, customer-visible updates and reviewed store policy pages',
      'Variant-level inventory, stock reservations and immutable order price snapshots',
      'Stripe-hosted Checkout and signature-verified webhook workflows implemented in the backend',
      'Refund reconciliation and inspected-return restocking only after confirmed success',
      'Live-only sales reports with losses, brand performance and return/repeat customer summaries',
      'Merchant inventory, order, return and analytics views with a deployed protected API and operational store policies',
    ],
    myContribution: 'I defined the SOLE DISTRICT brand and single-retailer scope, directed the customer-first design and React/Python stack, and developed the storefront, AI styling and commerce workflows with AI assistance. Release evidence distinguishes implemented backend functionality from features currently available on the public preview.',
    architecture: [
      'React 19 + Vite storefront and merchant interface',
      'Python 3.12 + Django JSON endpoints with session authentication, CSRF and role checks',
      'Dedicated Neon PostgreSQL production database in Singapore; PostgreSQL 16 in disposable CI and SQLite for local development',
      'Server-owned prices, variant stock, reservations and order snapshots',
      'Stripe-hosted Checkout and signature-verified webhook pipeline with atomic inventory reservations',
      'Gemini 3.8 Flash assistant integration with timeout and model fallback safeguards',
      'Vercel Services hosts React and Django together with same-origin API routing and serialized database migrations',
    ],
    challenges: "Protecting stock across delayed or uncertain payments, avoiding duplicate refunds and restocking, preserving customer access across session changes, keeping supplier evidence private and separating Stripe test orders from live sales reports.",
    learnings: "How PostgreSQL row locks, idempotent payment events, single-use account links, queued notifications, staff permissions and reviewed merchant records fit into a retail application, while separating implementation and test evidence from commercial readiness.",
    screenshots: [{
      src: soleCurrent,
      alt: "SOLE DISTRICT updated streetwear storefront with brand navigation, 175 catalogue pieces and editorial hero.",
      caption: "Live storefront captured on 4 November 2026 after the expanded catalogue release. Catalogue and inventory are portfolio data; purchases remain disabled.",
    }, {
      src: soleDistrictProduct,
      alt: 'SOLE DISTRICT New Balance 2002R product page with UK size eight and wishlist selected.',
      caption: 'Historical 8 October product capture with explicit size selection, disabled sold-out sizes and a wishlist control. Product imagery and stock are preview data.',
    }, {
      src: soleDistrictCheckout,
      alt: 'SOLE DISTRICT preview checkout with two UK size eight items, a 458 Singapore dollar total and payment disabled.',
      caption: 'Historical 8 October bag and preview checkout: two items total S$458, with the payment action disabled. No payment or order was created.',
    }],
    repositoryUrl: 'https://github.com/TeddyQyuon/sole-district',
    demoUrl: 'https://sole-district-green.vercel.app/',
    demoLabel: 'Live storefront',
    demoAccessNote: "Public React storefront and Django API with PostgreSQL. The expanded preview catalogue contains 175 pieces. Browse brands, clothing and sneakers, try size selection and save items to the bag or wishlist. The live footer identifies a preview catalogue with purchases disabled. No real purchase or fulfilment is claimed.",
    reportUrl: null,
  },
  {
    id: 7,
    projectGroup: 'personal',
    displayOrder: 2,
    displayName: 'SCENTHAUS Intelligence',
    cardSubtitle: 'Fragrance discovery, secure Stripe checkout and ML',
    cardSummary: "An editorial fragrance storefront with 35 houses and 150 product references. Search names, houses and notes; browse scent families; choose sizes with Quick add. Responsive WebP images, local fonts and on-demand search and checkout bundles reduce loading work.",
    cardContribution: 'Project scope, full-stack integration, ML pipelines and validation with AI assistance.',
    cardTechnologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Stripe'],
    cardNote: 'Deployed · Stripe checkout configured · 35 fragrance houses.',
    slug: 'scenthaus-intelligence',
    name: 'SCENTHAUS Intelligence — Fragrance Shop and ML Pipeline',
    category: 'Full-Stack',
    type: 'Personal ML portfolio project',
    role: 'AI-assisted personal project',
    summary: 'A React/Vite and Python FastAPI fragrance shop backed by PostgreSQL. The public catalogue renders independently of account initialization, with a mobile-friendly storefront, searchable 35-house directory, ml-and-quantity Quick add, persistent wishlist and bag, server-priced Stripe checkout supporting test and commercial live keys, signed payment confirmations, account security, recommendations, forecasts and a protected admin dashboard.',
    problem: 'A new fragrance shop needs a way to help customers discover suitable scents and plan inventory before it has real order history.',
    solution: 'An ML pipeline built on simulated historical behaviour compares content, collaborative, basket and quiz-based recommendations with seasonal-naive, LightGBM, LSTM and N-BEATS SKU forecasts. Secure checkout extends the existing FastAPI architecture: database prices in SGD cents, atomic inventory reservations, stable payment idempotency and signature-verified Stripe webhooks. Vercel Services hosts the React/Vite storefront and API with separate Neon PostgreSQL databases.',
    dataset: '2,000 simulated users, 78 weeks of history, 150 fragrance product references across 35 brands and 297 size variants. Historical orders, browsing activity and demand are simulated; new checkout orders use Stripe test payments; product authenticity and availability are not verified. No real customer history or commercial uplift is claimed.',
    dataPreparation: 'Training gates check nulls, duplicate order lines, invalid prices/quantities and outliers. Evaluation uses temporal cutoffs, excludes previously bought scents, and keeps an untouched forecasting holdout.',
    models: 'Popularity, item-item CF, hybrid and two-tower recommender variants; BM25/dense/hybrid search on 60 unreviewed draft labels; seasonal-naive, LightGBM, LSTM and N-BEATS forecasts evaluated across three origins.',
    results: 'The 4 November storefront refresh passed 22 unit tests and a production build. Hosted checks covered search, scent-family filtering, Quick add, bag totals, Stripe test-mode checkout and collection expansion from 24 to 48 of 150 products. The first 24 product images total 409,916 bytes at 640px WebP versus 3,871,537 bytes in original formats (89.4% smaller); this is an asset measurement, not field Core Web Vitals. Earlier pipeline verification: Historical simulated-data evaluation reports item-item CF NDCG@10 of 0.13731, full two-tower 0.13405 and popularity 0.10609; the BPR variant scores 0.14087. LSTM SKU WAPE averages 86.70% and MASE 0.795 across three seeds and three test origins. Hybrid search MRR@10 is 0.95278 on 60 rule-generated labels with none human-reviewed. Scores vary with each trained deployment. The checkout release passed 119 backend tests, 15 frontend unit tests and 12 browser journeys, including desktop and mobile checkout. A real Stripe sandbox payment on the deployed site confirmed a single numbered order for S$193.01; refreshing and three genuine-event webhook replays preserved it. Tests cover client price manipulation, duplicate requests, concurrent signed confirmations, declined/async payments, cancellation, stock recovery, refunds, ownership and CSRF. The storefront preserves authenticator 2FA, recovery codes, session revocation and data exports without authentication secrets. Results measure pipelines on simulated data, not real-market performance.',
    technologies: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'scikit-learn', 'LightGBM', 'MLflow', 'Vercel', 'pytest', 'Stripe'],
    features: [
      "Ivory and forest-green storefront with four scent-family discovery paths",
      "Accessible search dialog for fragrance names, houses and notes, with URL-preserved filters",
      "Collection starts with 24 of 150 products and loads 24 more per request",
      "Responsive WebP product images, self-hosted fonts and on-demand search/checkout bundles",
      "Transform/opacity motion with reduced-motion support and accessible mobile filters",

      'Public home and catalogue render without waiting for account, bag or optional recommendation requests',
      'Mobile-friendly navigation, searchable directory of 35 fragrance houses and direct brand filters',
      'Quick add with explicit ml selection, quantity controls, exact totals and current stock limits',
      'Atomic bag additions, duplicate-submit protection and accessible dialog focus restoration',
      'Authenticator-based two-factor authentication, recovery codes, password changes and device-session controls',
      'Session login and last-active times, device/browser, IP and approximate location; revoke one or all other sessions',
      'Security event history and personal data export without authentication secrets',
      'Premium contact/delivery checkout and Stripe-hosted card/eligible payment methods configured with dual test and commercial live-mode readiness',
      'Server-owned SGD pricing, immutable numbered orders and webhook-only payment confirmation',
      'Idempotent sessions, stock reservations, declined-payment retries, cancellation and refunds',
      'Quiz profiles and persistent wishlist/cart',
      'Content, collaborative and basket recommendations with explanations',
      'Budget, size, season and stock filters; diversity and substitutes',
      'SKU/brand/category forecasts with P10–P90 uncertainty bands',
      'Protected sales, inventory, customer segments and model-health panels',
      'Default-off personalization, withdrawal, model cards and human overrides',
      'Vercel Services deployment configuration, authenticated maintenance and an opt-in weekly training workflow',
    ],
    myContribution: 'I chose the fragrance-shop scope and the React/Vite frontend with a Python backend, directed implementation with AI assistance, and reviewed the pipeline and test evidence. Historical data is simulated and experimental models are clearly separated from validated baselines.',
    architecture: [
      'React + Vite storefront and admin interface',
      'FastAPI session authentication, enforced second factors, CSRF and role-protected REST API',
      'PostgreSQL customer state, revocable sessions, encrypted authenticator secrets, hashed recovery codes and atomic bag updates',
      'Stripe-hosted Checkout; signature-verified webhooks update existing orders exactly once',
      'Security events retained for 90 days independently of personalization consent',
      'Precomputed recommendation/forecast artifacts; separate batch training and MLflow tracking',
      'Vercel Services storefront/API with separate Preview and Production Neon databases',
    ],
    challenges: 'Avoiding temporal leakage, handling sparse/new SKUs, preserving stock and checkout consistency, separating heavy training from the serving runtime, and removing account initialization from the public rendering path while retaining consented event tracking.',
    learnings: 'How recommendation evaluation, forecast uncertainty, inventory planning, accessible shopping flows, secure payment boundaries and account security fit into a complete application, while reporting simulation limits honestly.',
    screenshots: [{
      src: scentCurrent,
      alt: "SCENTHAUS refreshed editorial homepage with ivory navigation, forest-green accents and fragrance hero photography.",
      caption: "Live homepage captured on 4 November 2026. The refresh adds scent-family discovery, accessible search, responsive product imagery and reduced-motion support; prices and stock remain simulated.",
    }, {
      src: scenthausStorefront,
      alt: 'SCENTHAUS updated fragrance storefront with compact navigation and a searchable product catalogue.',
      caption: 'Updated storefront captured during hosted verification. The hero artwork uses a WebP file approximately 92% smaller than the original. Prices and stock remain seeded portfolio data; Stripe checkout runs in test mode.',
    }, {
      src: scenthausQuickAdd,
      alt: 'SCENTHAUS Quick add dialog with ml size selection, quantity controls and a precise bag total.',
      caption: 'Live Quick add flow: choose a bottle size and quantity, review the exact total and add to the persistent bag.',
    }, {
      src: scenthausCheckout,
      alt: 'SCENTHAUS Singapore checkout with contact and delivery fields beside the server-priced SGD order summary.',
      caption: 'Deployed checkout: the selected 100 ml bottle, S$193.01 total and complimentary Singapore delivery match the amount sent to Stripe. Test mode only.',
    }, {
      src: scenthausPayment,
      alt: 'SCENTHAUS successful Stripe test payment confirmation for order SCENT-2026-000002.',
      caption: 'Actual hosted Stripe sandbox payment confirmed by the deployed signed webhook. Refreshing and three event replays kept the same order. No real charge or dispatch.',
    }, {
      src: scenthausOverview,
      alt: 'SCENTHAUS protected admin dashboard showing sales, forecast intervals and inventory indicators on simulated data.',
      caption: 'Admin interface captured during browser verification. Sales and demand are simulated.',
    }],
    repositoryUrl: 'https://github.com/TeddyQyuon/scenthaus-intelligence/tree/complete-phases-real-catalog',
    demoUrl: 'https://scenthaus-intelligence.vercel.app/',
    demoLabel: 'Live demo',
    demoAccessNote: 'The live demo includes 35 fragrance houses, 150 product references and Quick add. Create an account to try authenticator 2FA, recovery codes and session controls. Locations are approximate; older sessions may have no recorded metadata. Prices and stock are seeded portfolio data. Checkout is powered by a server-priced Stripe Checkout pipeline with signature-verified webhooks and live/test mode readiness. Supplier authenticity, live inventory, and physical dispatch require merchant operations setup before public fulfillment.',
    reportUrl: null,
  },
  {
    id: 1,
    projectGroup: 'school',
    displayOrder: 1,
    cardSummary: 'A staff leave system with two-stage approval, delegated approvers, notifications and an auditable request history.',
    cardContribution: 'Member 3: approval workflows, delegation, audit history and notifications.',
    cardTechnologies: ['React', 'Node.js', 'Express.js', 'MySQL'],
    slug: 'annual-leave-management',
    name: 'Annual Leave Management System',
    category: 'Full-Stack',
    type: 'Team Full-Stack project',
    // Stated directly in myContribution below — not an inference.
    role: 'Team member (Member 3)',
    summary:
      'A web application for managing staff annual leave requests, with a Supervisor → Manager approval workflow, acting/delegated approvers, leave balance deduction and audit history.',
    problem:
      'Leave requests were handled manually, making it hard to track approvals, delegate approvers during absences, keep an audit trail and keep leave balances accurate.',
    solution:
      'A Full-Stack web application where employees submit leave requests, supervisors review and approve or reject them with comments, managers give final approval, and approved leave automatically deducts from the leave balance. Delegation allows an acting approver to handle requests, and every action is recorded in an audit timeline. Frontend deployed on Vercel; REST API deployed on Vercel with database hosted on TiDB Cloud (MySQL-compatible).',
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'Node.js',
      'Express.js',
      'Sequelize ORM',
      'MySQL',
      'REST APIs',
    ],
    features: [
      'Leave request submission with validation',
      'Supervisor → Manager two-stage approval workflow',
      'Approval comments and rejection reasons',
      'Acting / delegated approvers with time-window logic',
      'Audit history and request timeline',
      'Leave deduction only after final approval',
      'In-app and email notifications with reminders and escalation',
      'Coverage exception acknowledgement',
    ],
    myContribution:
      'Team project — Member 3. My documented work focused on the two-stage Supervisor → Manager approval flow, leave deduction only after final approval, coverage exception acknowledgement, delegation / acting approvers, comments and rejection reasons, audit timeline/history, in-app and email notifications with ~24-hour reminder/escalation logic, and related integration/debugging (including preventing duplicate rapid submissions).',
    architecture: [
      'React frontend',
      'REST API',
      'Node.js + Express',
      'Sequelize',
      'MySQL',
    ],
    challenges:
      'Coordinating the multi-level approval flow so a request moves correctly between supervisor and manager, handling delegated approvers without breaking ownership rules, and making sure leave balances are only deducted once at final approval.',
    learnings:
      'Working as part of a team on a shared codebase, designing state transitions for an approval workflow, enforcing authorization on the server, and keeping an audit trail consistent with the actual state changes.',
    // Screenshot of the deployed application's sign-in screen, which lists the
    // role-based demo accounts and states the RBAC enforcement.
    screenshots: [
      {
        src: leaveSignIn,
        alt: 'Sign-in screen of the deployed leave management application listing the role-based demo accounts',
        caption:
          'Deployed application sign-in — one account per role, with access enforced by JWT and server-side RBAC.',
      },
    ],
    repositoryUrl: null,
    demoUrl: 'https://innovare-leave-client.vercel.app/',
    apiUrl: 'https://innovare-leave.vercel.app/',
    reportUrl: null,
  },
  {
    id: 2,
    projectGroup: 'school',
    displayOrder: 2,
    cardSummary: 'Prepared 950 valid gym records and compared four regression models to predict calories burned on a consistent validation split.',
    cardContribution: 'Individual project: data preparation, modelling, evaluation and the report.',
    cardTechnologies: ['KNIME', 'SAS Viya'],
    slug: 'gym-calories-predictive-analysis',
    name: 'Gym Calories Predictive Analysis',
    category: 'Predictive Analytics',
    type: 'Academic analytics project',
    role: 'Individual project',
    summary:
      'Predictive analysis of gym exercise data to model Calories_Burned, using KNIME for data preparation and SAS Viya for modelling and comparison.',
    problem:
      'Given fitness / gym member exercise data, build and compare regression models that predict calories burned from workout and member attributes.',
    solution:
      'Cleaned and validated the dataset in KNIME, then partitioned the cleaned data 70% training / 30% validation in SAS Viya and compared Linear Regression, Decision Tree, Random Forest and Gradient Boosting using validation ASE.',
    dataset:
      'Fitness / gym member exercise data. Raw: 4,865 observations across 15 variables. Target variable: Calories_Burned.',
    dataPreparation:
      'Data quality checking in KNIME: 3,892 exact duplicate rows removed (973 unique observations remained), 23 records violating heart-rate consistency rules removed, BMI independently recalculated and checked. Final cleaned dataset: 950 observations.',
    models:
      'SAS Viya partition: 665 training (70%) / 285 validation (30%). Models: Linear Regression, Decision Tree, Random Forest, Gradient Boosting — compared on the same partition using validation ASE.',
    results:
      'Validation ASE on same 285-row validation set: Gradient Boosting 431.8658 (RMSE 20.78, champion), Linear Regression 1469.6926 (RMSE 38.34, R² approx. 0.979686), Forest 4982.7305 (RMSE 70.59), Decision Tree 6457.5496 (RMSE 80.36). Champion 70.6% lower ASE than Linear Regression.',
    // Structured form of the same numbers so the case study can render a
    // comparison table instead of a paragraph. Lower ASE is better.
    modelComparison: {
      metric: 'Validation ASE',
      secondaryMetric: 'RMSE',
      lowerIsBetter: true,
      validationRows: 285,
      rows: [
        { model: 'Gradient Boosting', ase: 431.8658, rmse: 20.78, champion: true },
        { model: 'Linear Regression', ase: 1469.6926, rmse: 38.34, note: 'R² ≈ 0.980' },
        { model: 'Random Forest', ase: 4982.7305, rmse: 70.59 },
        { model: 'Decision Tree', ase: 6457.5496, rmse: 80.36 },
      ],
    },
    technologies: ['KNIME', 'SAS Viya'],
    features: [
      'Duplicate detection and removal (3,892 rows)',
      'Heart-rate consistency validation (23 records removed)',
      'BMI recalculation and validation',
      'Final cleaned dataset: 950 observations',
      '70/30 training/validation partition (665 / 285)',
      'Four-model comparison on validation ASE',
    ],
    myContribution:
      'Individually completed academic project. I performed the KNIME data-quality and preparation work, the SAS Viya partitioning and modelling, and the model comparison and findings write-up.',
    architecture: ['KNIME preparation', 'SAS Viya modelling', 'Validation ASE comparison'],
    challenges:
      'Separating true duplicates from valid repeated measurements, defining defensible heart-rate validation rules, and avoiding leakage between preparation and validation.',
    learnings:
      'Systematic data-quality checking before modelling, keeping a reproducible preparation workflow, and comparing models on a consistent validation partition with a single metric.',
    // Figures from the submitted report, used as the case-study visuals.
    // Captions describe what each figure actually shows.
    screenshots: [
      {
        src: caloriesVsDuration,
        alt: 'Scatter plot of calories burned against exercise duration',
        caption: 'Calories burned vs exercise duration — the strongest single predictor.',
      },
      {
        src: knimeWorkflow,
        alt: 'KNIME workflow used for data quality checking and preparation',
        caption: 'KNIME workflow: duplicate removal, heart-rate validation and BMI recalculation.',
      },
      {
        src: trainValidation,
        alt: '70% training and 30% validation partition diagram',
        caption: '70/30 training and validation partition applied before modelling.',
      },
      {
        src: caloriesByWorkout,
        alt: 'Box plots of calories burned grouped by workout type',
        caption: 'Calories burned by workout type, with HIIT showing the widest spread.',
      },
      {
        src: modelComparisonChart,
        alt: 'Comparison of the four candidate models for calories burned',
        caption: 'Champion model selection across the four candidates.',
      },
    ],
    repositoryUrl: null,
    demoUrl: null,
    reportUrl: '/reports/IT2214_Gym_Predictive_Analysis_WaiYanHponeLat.pdf',
  },
  {
    id: 5,
    projectGroup: 'personal',
    displayOrder: 4,
    displayName: 'Playlist Port',
    cardSubtitle: "Spotify transfers, album imports & compact queue",
    cardSummary: "Copy Spotify playlists and album links into private playlists with preserved track order. A searchable, paginated transfer queue keeps progress and Cancel within reach; empty playlists are skipped so the queue keeps moving.",
    cardContribution: 'Project scope, transfer flow and full-stack development with AI assistance.',
    cardTechnologies: ['React', 'Vite', 'Node.js', 'Express.js', 'Spotify Web API'],
    cardNote: 'Free & Premium accounts · Spotify developer allowlist required.',
    slug: 'playlist-port-spotify-mover',
    results: "The 4 November release passed 55 automated tests and a production build. Regression coverage includes empty-playlist completion, large queue navigation and album-link validation. The deployed homepage exposes playlist and album inputs; authenticated transfers require approved Spotify accounts.",
    demoAccessNote: "Spotify-to-Spotify transfers support Free and Premium accounts on the Development Mode allowlist. Albums become new private playlists. Local and unavailable items are skipped; other music services are planned.",
    name: 'Playlist Port — Spotify Playlist Mover',
    category: 'Full-Stack',
    type: 'Personal MVP',
    role: 'Personal project (AI-assisted MVP)',
    summary: "A React and Express app for copying Spotify playlists between the same or two accounts, and importing album share links into new private playlists. The November update adds a compact, collapsible queue, search and status filters, 6 items per page, sticky progress controls and reliable empty-playlist handling. Spotify sign-in requires the app’s Development Mode allowlist; Free and Premium accounts are supported.",
    problem:
      'Moving playlists between Spotify accounts takes manual re-creation, and large playlists are easy to copy incompletely or out of order.',
    solution: "Connect Spotify through OAuth, choose playlists or paste a supported playlist or album URL, then select a destination account. Paginated reads and batched writes preserve item order. Empty sources are marked Skipped, unsupported links show clear guidance, and verified results distinguish completed, partial and skipped transfers.",
    technologies: ['React', 'Vite', 'JavaScript', 'Node.js', 'Express.js', 'Spotify Web API', 'REST APIs'],
    features: [
      "Spotify album share links load metadata and copy tracks in order into a new private playlist",
      "Collapsible transfer queue with search, status filters and 6 items per page",
      "Sticky progress and Cancel controls with confirmed transfer counts",
      "Empty playlists are marked Skipped and the remaining queue continues",
      "Responsive pasted-link validation and guidance for unsupported Spotify URLs",

      'Spotify OAuth connection for source and optional destination account',
      'Owned and collaborative playlist selection with pagination',
      'Playlist copies hidden from the public profile, with ordered tracks and episodes',
      'Destination playlist item count and order verification',
      'Skipped-item and partial-transfer reporting',
      'Encrypted HttpOnly session cookies for serverless hosting',
    ],
    myContribution:
      'I chose the first-release scope and shaped the Spotify-to-Spotify transfer flow from my React and JavaScript learning. I developed this MVP with AI assistance and am validating it against Spotify developer-account limits.',
    architecture: ['React + Vite frontend', 'Express REST API', 'Spotify OAuth + Web API'],
    challenges: "Keeping long transfer queues manageable, cancelling safely, skipping empty sources without hanging, and handling paginated album tracks while preserving order and Spotify session state.",
    learnings: "How OAuth, paginated third-party APIs, cancellation and explicit transfer states support a reliable music-library workflow.",
    screenshots: [{
      src: playlistCurrent,
      alt: "Playlist Port homepage with playlist and album link input, Free and Premium account support and private-copy preview.",
      caption: "Live homepage captured on 4 November 2026. Album import is available after Spotify sign-in; other music services remain on the roadmap.",
    }],
    repositoryUrl: 'https://github.com/TeddyQyuon/playlist-port',
    demoUrl: 'https://playlist-port-nine.vercel.app/',
    reportUrl: null,
  },
  {
    id: 6,
    projectGroup: 'personal',
    displayOrder: 3,
    displayName: 'MeterWise',
    cardSubtitle: "Estate energy operations, guided workflows & Python analytics",
    cardSummary: "A responsive Singapore estate dashboard with town and block filters, data-quality repair, maintenance workflows and expandable insights. Combined startup requests and lazy panels reduce initial JavaScript by 16.6%; live ML is currently unavailable and demonstration insights are labelled.",
    cardContribution: 'Project direction, Python 3.12 / FastAPI ML architecture, LightGBM forecasting, Isolation Forest anomaly triage, and estate energy workflows, with AI assistance.',
    cardTechnologies: ['React', 'Python', 'FastAPI', 'scikit-learn', 'LightGBM', 'Vercel', 'SQL'],
    cardNote: "Live operations demo · Simulated meter data · Demonstration insights labelled.",
    slug: 'meterwise-building-energy-analytics',
    name: 'MeterWise — Singapore Estate Energy Operations & Python ML Platform',
    category: 'Python / ML & Analytics',
    type: 'Independent public-housing ML & operations pilot',
    role: 'AI-assisted personal project',
    summary: "An independent estate energy operations pilot combining public HDB building metadata with simulated meter readings and maintenance records. The November refresh improves responsive navigation, reporting filters, expandable insights and a quick guide. Combined estate startup data and deferred secondary panels reduce initial JavaScript. Python forecasting and anomaly-detection pipelines remain in the source; the hosted demo currently labels demonstration insights because live ML is unavailable.",
    problem:
      'Estate facility teams need to predict upcoming lighting, lift and water pump loads, anticipate rooftop solar generation, and detect equipment faults early (like stuck pump float switches or photosensor overrides) without mistaking normal diurnal variance for hardware failures or letting anomalies trigger unverified contractor dispatches.',
    solution: "A React dashboard and Python/FastAPI API bring together six blocks, 24 service meters, data-quality checks and evidence-based maintenance. Missing readings withhold derived grid, cost and carbon estimates. Town, block and reporting-period filters keep the workflow focused, while combined startup data and lazy panels reduce loading work. Forecasting and anomaly insights clearly disclose their current demonstration status.",
    dataset:
      'Six real public HDB Property Information records from data.gov.sg cover Ang Mo Kio, Bishan and Tampines, totalling 620 dwelling units. The snapshot records source IDs, licence and retrieval date. All meter installations, electricity readings and maintenance records are simulated. UTC intervals are grouped in Asia/Singapore. S$0.285/kWh is illustrative, and the 0.402 kg CO₂/kWh factor is explicitly the historical EMA 2024 grid factor. No resident details or live agency systems are used.',
    dataPreparation:
      'Public building metadata is kept separate from simulated operational records. Time-series feature engineering extracts harmonic Fourier cyclics (hour/day-of-week sine/cosine), Singapore equatorial solar elevation and temperature proxies, time-series lag features (1h, 2h, 3h, 24h, 48h), rolling statistics (6h, 24h), and block structural metadata. CSV validation checks registered assets, completed intervals, non-negative consumption, the fourteen-day demo window and duplicates. Missing intervals withhold derived grid, export, cost and carbon estimates.',
    models: "The source includes LightGBM with HistGradientBoosting fallback for 24–48h demand and solar forecasts, plus Isolation Forest and contextual residual anomaly detection. Historical local evaluation reported 0.14 kWh load MAE and 0.27 kWh solar MAE on simulated data. These are local model results; the current hosted ML service is unavailable and its example insights are explicitly labelled.",
    results: "The 4 November workspace release passed 86 tests and a production build. Initial JavaScript was reduced by 16.6% through combined authenticated startup data and lazy secondary panels. Hosted verification confirms responsive estate navigation, reporting filters, data-quality guidance and expandable insights across 6 blocks. The live ML service remains unavailable; demonstration cases are labelled and are not presented as live model output.",
    technologies: [
      'React', 'JavaScript', 'Vite', 'Tailwind CSS', 'Python', 'FastAPI',
      'scikit-learn', 'LightGBM', 'SQL', 'SQLite', 'Vercel', 'Turso / libSQL', 'pytest',
    ],
    features: [
      "Responsive estate navigation, reporting-period/town/block filters and an in-app quick guide",
      "Combined authenticated estate startup response and lazy secondary panels",
      "Expandable demonstration insights with explicit live-ML availability labels",

      'Python/FastAPI source pipelines for 24–48h demand and solar forecasting; live ML currently unavailable',
      'Isolation Forest and contextual anomaly pipelines in source; hosted examples labelled as demonstrations',
      'Inspection work orders with assignment, evidence and verification; demonstration anomaly cases remain labelled',
      'Real HDB public inventory: six blocks, three towns and 620 dwelling units with per-block hourly energy balance',
      'Missing-data safeguards, CSV gap repairs, duplicate handling and persistent import history',
      'Assigned inspection workflow with evidence, verification and concurrent-update protection',
      'Server-enforced area views and separate visitor workspaces',
      'Traceable block CSV reports, historical carbon assumptions and a lighting-load scenario',
      'Accessible chart tables, keyboard-operable dialogs and responsive navigation',
    ],
    myContribution:
      'I selected the project and directed its expansion from a building dashboard into a Singapore public-housing operations and Python ML analytics platform. I built and validated the ML forecasting models, anomaly detection heuristics, automated triage and estate workflows with AI assistance, and verified the deployment with automated test suites. This is an independent portfolio project, not commissioned work for HDB or a Town Council.',
    architecture: [
      'React (JavaScript) + Vite dashboard with interactive Recharts forecast curves and anomaly triage panels',
      'Python 3.12 + FastAPI REST API with modular ML pipeline (features, LightGBM forecasting, Isolation Forest anomalies)',
      'Pydantic v2 schemas for typed forecast and anomaly request/response contracts',
      'Vercel Python ASGI function + persistent Turso/libSQL HTTPS storage',
      'Python SQLite development adapter, idempotent SQL migrations and pytest contract/security checks',
    ],
    challenges:
      'Distinguishing real public inventory from simulated equipment, multi-step rolling forecasting without data leakage, balancing Isolation Forest sensitivity against false alarms, matching solar and load without netting unrelated intervals, and preventing competing maintenance updates from creating false audit evidence.',
    learnings:
      'How energy forecasting, anomaly detection, automated facilities triage, source provenance, data quality, area permissions and maintenance evidence fit into an estate operations workflow, and how to validate ML deployment behaviour without claiming real government integration.',
    screenshots: [
      {
        src: meterCurrent,
        alt: "MeterWise refreshed estate overview with reporting filters, energy metrics, data-quality warning and sidebar navigation.",
        caption: "Live dashboard captured on 4 November 2026. Public building metadata is real; meter readings and maintenance are simulated. Missing intervals withhold derived totals.",
      },
      {
        src: meterwiseWorkOrders,
        alt: 'MeterWise maintenance queue showing a simulated pump inspection with verified status, an assigned review team and four workflow stages.',
        caption: 'A simulated inspection records evidence through assignment, completion and a separate verification step. No real contractor is dispatched.',
      },
    ],
    repositoryUrl: 'https://github.com/TeddyQyuon/meterwise',
    demoUrl: 'https://meterwise-kappa.vercel.app/',
    demoLabel: 'Live demo',
    demoAccessNote: "Independent pilot; not affiliated with HDB, a Town Council or the Singapore Government. Public building metadata is real; meter readings and maintenance are simulated. Each browser has a separate demo workspace. Live ML is currently unavailable; demonstration forecasts and insights are labelled. Use sample data only.",
    reportUrl: null,
  },
];

// Shared explicit order for the homepage and previous/next case-study navigation.
export const projects = [...projectData].sort((a, b) => {
  const groupOrder = { personal: 0, school: 1 };
  return groupOrder[a.projectGroup] - groupOrder[b.projectGroup] || a.displayOrder - b.displayOrder;
});
