// Project data — verified claims only.
// Rules enforced here:
// - Team projects clearly identified; "myContribution" contains ONLY my work.
// - repositoryUrl / demoUrl / reportUrl are nullable; UI hides buttons when absent.
// - No fabricated metrics, demos, repositories or screenshots.
// - Restaurant Ordering / Feedback System is excluded (sister's work).
//
// Screenshots are real figures taken from the author's own submitted reports.
// Projects without screenshots use a category or project-specific icon cover.
import caloriesVsDuration from '../assets/images/projects/gym-calories-predictive-analysis/calories-vs-duration.png';
import knimeWorkflow from '../assets/images/projects/gym-calories-predictive-analysis/knime-preparation-workflow.png';
import trainValidation from '../assets/images/projects/gym-calories-predictive-analysis/train-validation-partition.png';
import caloriesByWorkout from '../assets/images/projects/gym-calories-predictive-analysis/calories-by-workout-type.png';
import modelComparisonChart from '../assets/images/projects/gym-calories-predictive-analysis/model-comparison.png';
import leaveSignIn from '../assets/images/projects/annual-leave/sign-in-rbac.png';
import meterwiseOverview from '../assets/images/projects/meterwise/energy-overview.jpg';
import meterwiseWorkOrders from '../assets/images/projects/meterwise/work-order-audit.jpg';
import playlistPortHome from '../assets/images/projects/playlist-port-live-home.jpg';
import scenthausOverview from '../assets/images/projects/scenthaus/admin-overview.png';
import scenthausStorefront from '../assets/images/projects/scenthaus/storefront-verified.jpg';
import scenthausQuickAdd from '../assets/images/projects/scenthaus/quick-add-verified.jpg';
import scenthausCheckout from '../assets/images/projects/scenthaus/checkout-verified.jpg';
import scenthausPayment from '../assets/images/projects/scenthaus/payment-confirmed.jpg';
import soleDistrictStorefront from '../assets/images/projects/sole-district/storefront-20261008.jpg';
import soleDistrictProduct from '../assets/images/projects/sole-district/product-20261008.jpg';
import soleDistrictCheckout from '../assets/images/projects/sole-district/checkout-20261008.jpg';

const projectData = [
  {
    id: 8,
    projectGroup: 'personal',
    displayOrder: 0,
    displayName: 'SOLE DISTRICT',
    cardSubtitle: 'Streetwear storefront and Django merchant workspace',
    cardSummary: 'An editorial streetwear storefront with size selection, wishlist and a persistent bag. The Django commerce API and merchant workspace are implemented; hosted accounts and payments await activation.',
    cardContribution: 'Product direction, storefront, Django commerce workflows and release verification with AI assistance.',
    cardTechnologies: ['React', 'Python', 'Django', 'Stripe'],
    cardNote: 'Live storefront preview · Illustrative catalogue · Payments disabled.',
    slug: 'sole-district',
    name: 'SOLE DISTRICT — Streetwear Commerce Platform',
    category: 'Full-Stack',
    type: 'Personal commerce portfolio project',
    role: 'AI-assisted personal project',
    summary: 'A React/Vite storefront and Python/Django commerce system for one curated streetwear retailer. The live preview supports product browsing, size selection, wishlist and a browser-persistent bag. Protected merchant workflows, size-level inventory, orders, returns, analytics and Stripe Checkout are implemented in the source. Hosted accounts and the merchant API await a dedicated production database, and purchases remain disabled.',
    problem: 'A streetwear retailer needs a coherent customer journey together with size-level stock control, fulfilment and reporting in one system.',
    solution: 'An off-white, black and acid-yellow storefront connects the retail experience to a Django model for variant SKUs, stock reservations, order price snapshots, role-protected JSON endpoints and signed Stripe webhooks. The published preview returns a clear activation message for unavailable account and merchant requests.',
    dataset: 'Six illustrative products across sneakers, clothing and accessories, with generated product imagery and preview stock. Supplier authenticity, brand authorisation and real stock availability have not been verified. No real customer history or commercial performance is claimed.',
    results: 'The release passed 10 Django tests, four storefront packaging checks, the frontend production build and migration consistency checks. Desktop verification on the deployed storefront covered enabled and sold-out sizes, wishlist selection, bag quantities, SGD totals, reload persistence and the disabled payment action. Stripe calls in the backend tests are mocked; no real payment, refund, hosted webhook or production database verification is claimed.',
    technologies: ['React', 'Vite', 'JavaScript', 'CSS', 'Python', 'Django', 'SQLite', 'Stripe', 'Vercel'],
    features: [
      'Editorial storefront, category and brand browsing, product search and product detail pages',
      'Explicit UK size selection, unavailable-size states and product image enlargement',
      'Browser-persistent wishlist and bag with quantity controls and SGD totals',
      'Preview checkout with payment disabled until sourcing, stock and payment setup are complete',
      'Django session authentication, CSRF checks and role-protected merchant endpoints',
      'Variant-level inventory, stock reservations and immutable order price snapshots',
      'Stripe-hosted Checkout and signature-verified webhook workflows implemented in the backend',
      'Merchant inventory, order, return and analytics views implemented; hosted access awaits database activation',
    ],
    myContribution: 'I defined the SOLE DISTRICT brand and single-retailer scope, directed the customer-first design and React/Python stack, and developed the storefront and commerce workflows with AI assistance. Release evidence distinguishes implemented backend functionality from features currently available on the public preview.',
    architecture: [
      'React 19 + Vite storefront and merchant interface',
      'Python 3.12 + Django JSON endpoints with session authentication, CSRF and role checks',
      'SQLite verified locally; PostgreSQL is the intended production database and is not yet provisioned',
      'Server-owned prices, variant stock, reservations and order snapshots',
      'Stripe-hosted Checkout and signed webhook code; payments are not activated',
      'Vercel hosts the live storefront; account and merchant API routes return an activation notice',
    ],
    challenges: 'Separating illustrative catalogue data from sellable inventory, maintaining stock and order consistency, and presenting the release limits clearly while preserving a usable browsing experience.',
    learnings: 'How retail interaction design, variant data modelling, Django access controls and payment boundaries fit together, and how to distinguish source implementation, automated checks and live verification.',
    screenshots: [{
      src: soleDistrictStorefront,
      alt: 'SOLE DISTRICT live storefront with its editorial streetwear hero and illustrative preview banner.',
      caption: 'Actual Vercel storefront captured during desktop verification. The imagery and catalogue are illustrative, and purchases are disabled.',
    }, {
      src: soleDistrictProduct,
      alt: 'SOLE DISTRICT New Balance 2002R product page with UK size eight and wishlist selected.',
      caption: 'Live product flow with explicit size selection, disabled sold-out sizes and a wishlist control. Product imagery and stock are preview data.',
    }, {
      src: soleDistrictCheckout,
      alt: 'SOLE DISTRICT preview checkout with two UK size eight items, a 458 Singapore dollar total and payment disabled.',
      caption: 'Live bag and preview checkout: two items total S$458, with the payment action disabled. No payment or order was created.',
    }],
    repositoryUrl: null,
    demoUrl: 'https://sole-district-green.vercel.app/',
    demoLabel: 'Live storefront',
    demoAccessNote: 'Public storefront preview with generated sample imagery and a browser-local bag and wishlist. Hosted accounts and merchant access await database activation. Payments are disabled, and source is private. Commercial launch requires verified sourcing and stock, approved store policies and Stripe setup.',
    reportUrl: null,
  },
  {
    id: 7,
    projectGroup: 'personal',
    displayOrder: 1,
    displayName: 'SCENTHAUS Intelligence',
    cardSubtitle: 'Fragrance discovery, secure Stripe checkout and ML',
    cardSummary: 'A responsive fragrance storefront with 35 houses, 150 product references, size-and-quantity Quick add, secure accounts, Stripe checkout, explainable recommendations and demand forecasts. Payments run in test mode.',
    cardContribution: 'Project scope, full-stack integration, ML pipelines and validation with AI assistance.',
    cardTechnologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Stripe'],
    cardNote: 'Deployed · Stripe test checkout · 35 fragrance houses.',
    slug: 'scenthaus-intelligence',
    name: 'SCENTHAUS Intelligence — Fragrance Shop and ML Pipeline',
    category: 'Full-Stack',
    type: 'Personal ML portfolio project',
    role: 'AI-assisted personal project',
    summary: 'A React/Vite and Python FastAPI fragrance shop backed by PostgreSQL. The public catalogue renders independently of account initialization, with a mobile-friendly storefront, searchable 35-house directory, ml-and-quantity Quick add, persistent wishlist and bag, server-priced Stripe checkout, signed payment confirmations, account security, recommendations, forecasts and a protected admin dashboard.',
    problem: 'A new fragrance shop needs a way to help customers discover suitable scents and plan inventory before it has real order history.',
    solution: 'An ML pipeline built on simulated historical behaviour compares content, collaborative, basket and quiz-based recommendations with seasonal-naive, LightGBM, LSTM and N-BEATS SKU forecasts. Secure checkout extends the existing FastAPI architecture: database prices in SGD cents, atomic inventory reservations, stable payment idempotency and signature-verified Stripe webhooks. Vercel Services hosts the React/Vite storefront and API with separate Neon PostgreSQL databases.',
    dataset: '2,000 simulated users, 78 weeks of history, 150 fragrance product references across 35 brands and 297 size variants. Historical orders, browsing activity and demand are simulated; new checkout orders use Stripe test payments; product authenticity and availability are not verified. No real customer history or commercial uplift is claimed.',
    dataPreparation: 'Training gates check nulls, duplicate order lines, invalid prices/quantities and outliers. Evaluation uses temporal cutoffs, excludes previously bought scents, and keeps an untouched forecasting holdout.',
    models: 'Popularity, item-item CF, hybrid and two-tower recommender variants; BM25/dense/hybrid search on 60 unreviewed draft labels; seasonal-naive, LightGBM, LSTM and N-BEATS forecasts evaluated across three origins.',
    results: 'Historical simulated-data evaluation reports item-item CF NDCG@10 of 0.13731, full two-tower 0.13405 and popularity 0.10609; the BPR variant scores 0.14087. LSTM SKU WAPE averages 86.70% and MASE 0.795 across three seeds and three test origins. Hybrid search MRR@10 is 0.95278 on 60 rule-generated labels with none human-reviewed. Scores vary with each trained deployment. The checkout release passed 119 backend tests, 15 frontend unit tests and 12 browser journeys, including desktop and mobile checkout. A real Stripe sandbox payment on the deployed site confirmed a single numbered order for S$193.01; refreshing and three genuine-event webhook replays preserved it. Tests cover client price manipulation, duplicate requests, concurrent signed confirmations, declined/async payments, cancellation, stock recovery, refunds, ownership and CSRF. The storefront preserves authenticator 2FA, recovery codes, session revocation and data exports without authentication secrets. Results measure pipelines on simulated data, not real-market performance.',
    technologies: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'scikit-learn', 'LightGBM', 'MLflow', 'Vercel', 'pytest', 'Stripe'],
    features: [
      'Public home and catalogue render without waiting for account, bag or optional recommendation requests',
      'Mobile-friendly navigation, searchable directory of 35 fragrance houses and direct brand filters',
      'Quick add with explicit ml selection, quantity controls, exact totals and current stock limits',
      'Atomic bag additions, duplicate-submit protection and accessible dialog focus restoration',
      'Authenticator-based two-factor authentication, recovery codes, password changes and device-session controls',
      'Session login and last-active times, device/browser, IP and approximate location; revoke one or all other sessions',
      'Security event history and personal data export without authentication secrets',
      'Premium contact/delivery checkout and Stripe-hosted card/eligible payment methods in test mode',
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
    demoAccessNote: 'The live demo includes 35 fragrance houses, 150 product references and Quick add. Create an account to try authenticator 2FA, recovery codes and session controls. Locations are approximate; older sessions may have no recorded metadata. Prices and stock are seeded portfolio data. Checkout uses Stripe test payments: no real charge or dispatch. Supplier authenticity, live inventory, tax/shipping policies and fulfilment require merchant review before launch.',
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
    displayOrder: 3,
    displayName: 'Playlist Port',
    cardSubtitle: 'Spotify playlist transfer',
    cardSummary: 'Copy Spotify playlists between accounts with OAuth sign-in, preserved track order and transfer verification.',
    cardContribution: 'Project scope, transfer flow and full-stack development with AI assistance.',
    cardTechnologies: ['React', 'Vite', 'Node.js', 'Express.js', 'Spotify Web API'],
    cardNote: 'Free & Premium accounts · Spotify developer allowlist required.',
    slug: 'playlist-port-spotify-mover',
    name: 'Playlist Port — Spotify Playlist Mover',
    category: 'Full-Stack',
    type: 'Personal MVP',
    role: 'Personal project (AI-assisted MVP)',
    summary:
      'A React and Express app that copies an owned or collaborative Spotify playlist to a new playlist in the same account or a second account. Copies stay off the destination\'s public profile. Spotify sign-in is available to accounts on the app\'s Development Mode allowlist.',
    problem:
      'Moving playlists between Spotify accounts takes manual re-creation, and large playlists are easy to copy incompletely or out of order.',
    solution:
      'Connect a source account through Spotify OAuth, select a playlist, choose the same or a second destination account, and create a new copy. The app reads every playlist page, keeps item order, writes in Spotify-sized batches, and reports items that cannot be copied. Restrict link access by choosing Make private in Spotify.',
    technologies: ['React', 'Vite', 'JavaScript', 'Node.js', 'Express.js', 'Spotify Web API', 'REST APIs'],
    features: [
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
    challenges:
      'Handling two account connections, Spotify playlist pagination and write limits, and preserving sign-in state across serverless requests.',
    learnings:
      'How an OAuth flow, protected API routes and paginated third-party data fit together in a full-stack app.',
    screenshots: [{
      src: playlistPortHome,
      alt: 'Live Playlist Port interface with Spotify service selection and playlist transfer introduction.',
      caption: 'Public interface captured from the deployed Vercel app on 4 October 2026. Spotify is available; other music services are marked as coming later.',
    }],
    repositoryUrl: 'https://github.com/TeddyQyuon/playlist-port',
    demoUrl: 'https://playlist-port-nine.vercel.app/',
    reportUrl: null,
  },
  {
    id: 6,
    projectGroup: 'personal',
    displayOrder: 2,
    displayName: 'MeterWise',
    cardSubtitle: 'Singapore estate energy operations',
    cardSummary: 'An estate energy dashboard connecting public HDB building data, simulated meter readings and an evidence-based maintenance workflow.',
    cardContribution: 'Project direction, energy workflows, data validation and deployment, with AI assistance.',
    cardTechnologies: ['React', 'Python', 'FastAPI', 'Vercel', 'SQL'],
    cardNote: 'Independent pilot · operational data is simulated.',
    slug: 'meterwise-building-energy-analytics',
    name: 'MeterWise — Singapore Estate Energy Operations',
    category: 'Full-Stack',
    type: 'Independent public-housing pilot',
    role: 'AI-assisted personal project',
    summary:
      'A Singapore estate operations pilot that combines real HDB building metadata with simulated common-service energy, solar accounting, CSV repairs and evidence-based maintenance.',
    problem:
      'Estate teams need to compare lighting, lift and pump consumption across blocks, account for daytime solar, and follow up on exceptions without treating missing readings as zero usage or unverified alerts as equipment faults.',
    solution:
      'A React dashboard with a Python/FastAPI backend models six HDB blocks and 24 simulated service meters. Managers filter by town and block, repair missing CSV intervals, match solar and load for each block and hour, and assign inspections through completion and verification. An area-viewer preview is restricted by the server to two Ang Mo Kio blocks. The workflow is informed by public HDB Green Towns and SolarNova materials; it is not an official government project.',
    dataset:
      'Six real public HDB Property Information records from data.gov.sg cover Ang Mo Kio, Bishan and Tampines, totalling 620 dwelling units. The snapshot records source IDs, licence and retrieval date. All meter installations, electricity readings and maintenance records are simulated. UTC intervals are grouped in Asia/Singapore. S$0.285/kWh is illustrative, and the 0.402 kg CO₂/kWh factor is explicitly the historical EMA 2024 grid factor. No resident details or live agency systems are used.',
    dataPreparation:
      'Public building metadata is kept separate from simulated operational records. CSV validation checks registered assets, timezone-aware completed hourly intervals, non-negative consumption, the fourteen-day demo window and duplicate meter/timestamp pairs. Missing intervals withhold derived grid, export, cost and carbon estimates. Solar surplus in one block or hour cannot cancel imports elsewhere.',
    results:
      'Version 2.1 runs a Python 3.12/FastAPI backend on Vercel with persistent Turso storage. All 45 pytest cases, Ruff, the frontend TypeScript check and the production build passed; Python and npm audits reported zero known dependency advisories. Tests compare the new API with the original TypeScript responses and verify old cookies, saved data, bounded imports, role restrictions, atomic audit events and competing writes. Production cloud-browser checks confirmed that repaired readings, 100% coverage, import history and a verified work order with its audit timeline survived the Python deployment. The live CSV preview identified duplicates and the area-viewer UI restricted access to two blocks. Eleven production HTTP checks verified repairs, traceable six-block reports, maintenance evidence, stale-write rejection and visitor/area isolation. Real meter hardware, agency authentication and actual emissions reporting remain outside this pilot. The former Node/Express, MySQL and Worker adapters were retired.',
    technologies: [
      'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Python', 'FastAPI',
      'SQL', 'SQLite', 'Vercel', 'Turso / libSQL', 'pytest',
    ],
    features: [
      'Real HDB public inventory: six blocks, three towns and 620 dwelling units',
      'Simulated lighting, lift, water-pump and solar assets with per-block hourly energy balance',
      'Missing-data safeguards, CSV gap repairs, duplicate handling and persistent import history',
      'Assigned inspection workflow with evidence, verification and concurrent-update protection',
      'Server-enforced area views and separate visitor workspaces',
      'Traceable block CSV reports, historical carbon assumptions and a lighting-load scenario',
      'Accessible chart tables, keyboard-operable dialogs and responsive navigation',
    ],
    myContribution:
      'I selected the project and directed its expansion from a building dashboard into a Singapore public-housing operations pilot. I built and validated the workflows with AI assistance, researched public government sources, and used automated and cloud-browser checks. This is an independent portfolio project, not commissioned work for HDB or a Town Council.',
    architecture: [
      'React + Vite dashboard; TypeScript is used for the frontend only',
      'Python 3.12 + FastAPI REST API with workspace/area controls and version-checked audit events',
      'Vercel Python ASGI function + persistent Turso/libSQL HTTPS storage',
      'Python SQLite development adapter, idempotent SQL migrations and pytest contract/security checks',
    ],
    challenges:
      'Distinguishing real public inventory from simulated equipment, matching solar and load without netting unrelated intervals, withholding incomplete estimates, and preventing competing maintenance updates from creating false audit evidence.',
    learnings:
      'How energy accounting, source provenance, data quality, area permissions and maintenance evidence fit into an estate operations workflow, and how to validate deployment behaviour without claiming real government integration.',
    screenshots: [
      {
        src: meterwiseOverview,
        alt: 'MeterWise Singapore estate dashboard showing common-service load, rooftop solar, derived grid import and meter coverage.',
        caption: 'Version 2.0 on Vercel — real HDB building metadata with clearly labelled simulated estate energy.',
      },
      {
        src: meterwiseWorkOrders,
        alt: 'MeterWise maintenance queue showing a simulated pump inspection with verified status, an assigned review team and four workflow stages.',
        caption: 'A simulated inspection records evidence through assignment, completion and a separate verification step. No real contractor is dispatched.',
      },
    ],
    repositoryUrl: null,
    demoUrl: 'https://meterwise-kappa.vercel.app/',
    demoLabel: 'Live demo',
    demoAccessNote: 'Independent pilot; not affiliated with HDB, any Town Council or the Singapore Government. Public building metadata is real; meters, readings and maintenance are simulated. Each browser has a separate demo workspace. The role switch previews area permissions, not real agency authentication. Use sample data only.',
    reportUrl: null,
  },
];

// Shared explicit order for the homepage and previous/next case-study navigation.
export const projects = [...projectData].sort((a, b) => {
  const groupOrder = { personal: 0, school: 1 };
  return groupOrder[a.projectGroup] - groupOrder[b.projectGroup] || a.displayOrder - b.displayOrder;
});
