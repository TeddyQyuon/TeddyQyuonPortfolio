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
import meterwiseImports from '../assets/images/projects/meterwise/csv-validation.jpg';

export const projects = [
  {
    id: 1,
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
    screenshots: [],
    repositoryUrl: 'https://github.com/TeddyQyuon/playlist-port',
    demoUrl: 'https://playlist-port-nine.vercel.app/',
    reportUrl: null,
  },
  {
    id: 6,
    slug: 'meterwise-building-energy-analytics',
    name: 'MeterWise — Building Energy Analytics',
    category: 'Full-Stack',
    type: 'Personal portfolio MVP',
    role: 'AI-assisted personal project',
    summary:
      'A building electricity dashboard for understanding consumption, estimated costs, missing readings and tenant meter mappings, with validated CSV imports and an investigation queue.',
    problem:
      'Meter readings spread across files make it difficult to compare tenant consumption, distinguish missing intervals from real zero usage, and track follow-up on unusual readings.',
    solution:
      'A React dashboard connects hourly electricity readings to registered meters and tenants. Facilities managers can validate CSV files, review consumption and coverage, investigate rule-based alerts, and export daily reports. A read-only tenant demo shows the server-enforced view boundaries.',
    dataset:
      'Synthetic hourly electricity readings for six meters, three tenants and shared building areas. Timestamps are stored in UTC and grouped in Asia/Singapore. The configured S$0.285/kWh tariff is fictional; costs exclude taxes and other fees. No employer, client or live building data is used.',
    dataPreparation:
      'CSV validation checks registered meter IDs, valid timezone-aware timestamps, completed hourly intervals, non-negative consumption and duplicate meter/timestamp pairs. Missing readings remain visible rather than being estimated.',
    results:
      'Version 1.2 is live on Vercel with persistent Turso storage. All 14 automated calculation, workflow and security tests, frontend and NodeNext server TypeScript checks, and the production build passed. Ten live HTTP checks verified remote imports, reports, saved edits, tenant restrictions and separate visitor workspaces. Cloud-browser checks confirmed import history survives reload, coverage reaches 100%, CSV reports contain 42 daily meter rows, and tenant views expose two assigned meters. The npm audit reported zero known dependency vulnerabilities. Earlier local checks covered 390 px/768 px layouts; live MySQL and real meter hardware were not tested.',
    technologies: [
      'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js',
      'SQL', 'SQLite', 'Vercel', 'Turso / libSQL', 'Sequelize ORM', 'MySQL',
    ],
    features: [
      'Consumption and estimated-cost charts with equal-length period comparisons',
      'Meter directory, tenant mappings and received-versus-expected interval coverage',
      'CSV preview with row-specific errors, duplicate handling and import history',
      'Rule-based consumption and missing-data alerts with investigation notes',
      'Daily CSV reports and a read-only tenant demo view',
      'Responsive navigation with keyboard focus handling and accessible chart data tables',
      'Bounded JSON uploads, workspace-scoped database queries and security response headers',
    ],
    myContribution:
      'I selected this personal portfolio project and directed its building-energy workflow, UI improvements and security review. I built and validated the MVP with AI assistance, including cloud-browser checks and automated tests. This is a synthetic learning project, not a deployed client system.',
    architecture: [
      'React + Vite dashboard with shared TypeScript analytics and validation',
      'Shared REST API with workspace scope and manager/tenant demo checks',
      'Vercel Node API + persistent Turso/libSQL storage; local Express + SQLite demo',
      'Optional Sequelize/MySQL adapter supplied; live MySQL integration not tested',
    ],
    challenges:
      'Keeping Singapore reporting dates consistent with UTC readings, counting expected intervals accurately, handling repeated imports safely, and making filter/loading states clear enough to prevent exporting stale totals.',
    learnings:
      'How data quality, tenant scope, timestamp rules and accessible dashboard states fit together in an energy analytics workflow, and how to document security fixes with repeatable tests.',
    screenshots: [
      {
        src: meterwiseOverview,
        alt: 'MeterWise energy overview showing synthetic electricity consumption, estimated SGD cost, data coverage and a daily chart.',
        caption: 'Version 1.2 on Vercel — real screenshot after importing eight missing readings into the synthetic workspace.',
      },
      {
        src: meterwiseImports,
        alt: 'MeterWise CSV validation preview with one valid reading, two duplicate rows and one invalid meter ID.',
        caption: 'Live Vercel validation separates one new reading, two duplicate intervals and one invalid meter before import.',
      },
    ],
    repositoryUrl: null,
    demoUrl: 'https://meterwise-kappa.vercel.app/',
    demoLabel: 'Live demo',
    demoAccessNote: 'Public Vercel demo with a separate synthetic workspace for each browser. The manager/tenant switch demonstrates server-enforced permissions; it is not real tenant authentication. Use sample data only.',
    reportUrl: null,
  },
];
