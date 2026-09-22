// Project data — verified claims only.
// Rules enforced here:
// - Team projects clearly identified; "myContribution" contains ONLY my work.
// - repositoryUrl / demoUrl / reportUrl are nullable; UI hides buttons when absent.
// - No fabricated metrics, demos, repositories or screenshots.
// - Restaurant Ordering / Feedback System is excluded (sister's work).
//
// Screenshots are real figures taken from the author's own submitted reports.
// No stock imagery is used, so nothing on this page implies work that was not done.
import caloriesVsDuration from '../assets/images/projects/gym-calories-predictive-analysis/calories-vs-duration.png';
import knimeWorkflow from '../assets/images/projects/gym-calories-predictive-analysis/knime-preparation-workflow.png';
import trainValidation from '../assets/images/projects/gym-calories-predictive-analysis/train-validation-partition.png';
import caloriesByWorkout from '../assets/images/projects/gym-calories-predictive-analysis/calories-by-workout-type.png';
import modelComparisonChart from '../assets/images/projects/gym-calories-predictive-analysis/model-comparison.png';
import leaveSignIn from '../assets/images/projects/annual-leave/sign-in-rbac.png';

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
    id: 3,
    slug: 'nanyang-trading-data-wrangling',
    name: 'Nanyang Trading Company Data Wrangling',
    category: 'Data Wrangling',
    role: 'Individual assignment',
    type: 'Academic data project',
    summary:
      'Integration and cleaning of four regional customer datasets into a single analysis-ready customer file with privacy handling and derived analytical variables.',
    problem:
      'Four regional files (East, North, South, West) needed to be integrated, cleaned, anonymised and transformed into one consistent customer dataset for analysis.',
    solution:
      'Built a KNIME data mashup that integrated the four files, added Region, cleaned text and names, handled duplicates and invalid values, applied privacy suppression, derived analytical fields and produced a cleaned output dataset with documentation.',
    dataset:
      'Source files: East 364 rows, North 408 rows, South 347 rows, West 387 rows. Total raw records: 1,506.',
    dataPreparation:
      'Integrated four regional datasets with Region derivation, text trimming, name splitting, 6 duplicate records removed, invalid/inconsistent values corrected (approx. 12 birth-year, 11 income, 19 purchase-count, 25 spending-value corrections — corrected, not deleted), SSN anonymised with names/birthdate suppressed where required.',
    models: null,
    results:
      'Final customer dataset: 1,500 records. Derived fields: Age, Age Group, Income Band, Credit Card Status, Average Spend per Purchase. Produced cleaned output data plus analysis/visualisations.',
    technologies: ['KNIME'],
    features: [
      'Four-region integration (1,506 raw records)',
      'Region derivation and data mashup',
      'Duplicate handling (6 removed → 1,500 final)',
      'Value corrections with audit trail',
      'Privacy: SSN anonymisation, name/birthdate suppression',
      'Derived: Age, Age Group, Income Band, Card Status, Avg Spend',
    ],
    myContribution:
      'Individually completed assignment. I built the KNIME integration/cleaning/transformation workflow, verified row counts through each stage, applied privacy steps and derived the analytical variables.',
    architecture: ['Regional Excel sources', 'KNIME mashup + clean + transform', 'Cleaned customer dataset'],
    challenges:
      'Reconciling inconsistent formats across four files while preserving a verifiable row count, and correcting invalid values without silently dropping records.',
    learnings:
      'Planning a mashup-clean-transform sequence, tracking counts at each stage, and documenting corrections and privacy decisions for reproducibility.',
    screenshots: [],
    repositoryUrl: null,
    demoUrl: null,
    reportUrl: null,
  },
  {
    id: 4,
    slug: 'full-stack-course-practical',
    name: 'Full-Stack Course Practical (Tutorials App)',
    category: 'Full-Stack',
    role: 'Individual coursework',
    type: 'Course practical',
    summary:
      'Progressive Full-Stack Development practical: a tutorial/learning application with React frontend, Express REST API, MySQL database, authentication and file upload.',
    problem:
      'Learn full-stack delivery end-to-end through guided practicals: listing, search, CRUD, authentication, ownership rules and image upload.',
    solution:
      'Built tutorial listing with search, add/retrieve-by-ID/edit/delete via dynamic React Router paths and Axios integration, Formik/Yup validation, JWT login with ownership authorization, and Multer image upload with preview and size validation.',
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'Material UI',
      'React Router',
      'Axios',
      'Formik',
      'Yup',
      'Node.js',
      'Express.js',
      'Sequelize ORM',
      'MySQL',
      'JWT',
      'bcrypt',
      'Multer',
    ],
    features: [
      'Tutorial listing with search',
      'Add / retrieve by ID / edit / delete',
      'Dynamic routes with useParams and useNavigate',
      'Formik + Yup client-side validation',
      'Registration, login and JWT auth',
      'Ownership authorization middleware',
      'React Context + Axios interceptors + localStorage tokens',
      'Image upload with preview and size validation',
    ],
    myContribution:
      'Completed as guided coursework practicals. Scope reflects module exercises I personally worked through; presented as a practical, not a large independent product.',
    architecture: [
      'React frontend',
      'REST API',
      'Node.js + Express',
      'Sequelize',
      'MySQL',
    ],
    challenges:
      'Connecting each layer correctly — routing params to API calls, validation errors to form state, and tokens to protected routes — while debugging with Postman and DevTools.',
    learnings:
      'How frontend state, REST conventions, ORM models and auth middleware fit together in one deployable CRUD system.',
    screenshots: [],
    repositoryUrl: null,
    demoUrl: null,
    reportUrl: null,
  },
];
