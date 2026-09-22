// NYP academic results — verified module grades with credit weights.
// 3.00 / 2.80 / 3.70 are calculated semester GPAs from these modules.
// 3.18 is the current official GPA shown on the NYP result statement.

export const currentGpa = '3.18';

export const semesterResults = [
  {
    id: 'y1s1',
    label: 'Year 1 Semester 1',
    academicYear: '2025/2026 Semester 1',
    gpa: '3.00',
    gpaNote: 'Calculated from modules below',
    modules: [
      { name: 'Applied Mathematics in Computing', grade: 'B', credits: 2 },
      { name: 'Business Innovation & Enterprise', grade: 'C+', credits: 4 },
      { name: 'Network Technologies', grade: 'B+', credits: 4 },
      { name: 'Programming', grade: 'B+', credits: 4 },
      { name: 'UX Design in Web Development', grade: 'C+', credits: 4 },
    ],
  },
  {
    id: 'y1s2',
    label: 'Year 1 Semester 2',
    academicYear: '2025/2026 Semester 2',
    gpa: '2.80',
    gpaNote: 'Calculated from modules below',
    modules: [
      { name: 'AI & Data Analytics', grade: 'C+', credits: 4 },
      { name: 'Cybersecurity Technologies & Ethics', grade: 'B', credits: 4 },
      { name: 'Database Design & Administration', grade: 'B', credits: 4 },
      { name: 'Statistical Research Methods', grade: 'C+', credits: 4 },
      { name: 'Web Development Project', grade: 'B', credits: 4 },
    ],
  },
  {
    id: 'y2s1',
    label: 'Year 2 Semester 1',
    academicYear: '2026/2027 Semester 1',
    gpa: '3.70',
    gpaNote: 'Calculated from modules below',
    modules: [
      { name: 'Data Structures & Algorithms', grade: 'B', credits: 4 },
      { name: 'Data Wrangling', grade: 'A', credits: 4 },
      { name: 'Full Stack Application Development', grade: 'A', credits: 4 },
      { name: 'Predictive Analytics & Forecasting', grade: 'A', credits: 4 },
      { name: 'Responsible AI for Sustainability', grade: 'B+', credits: 4 },
    ],
  },
];

export const recentHighlights = [
  {
    module: 'Data Wrangling',
    grade: 'A',
    evidence: 'Data Wrangling project',
    href: '/projects/nanyang-trading-data-wrangling',
  },
  {
    module: 'Full Stack Application Development',
    grade: 'A',
    evidence: 'Full-Stack project experience',
    href: '/projects/annual-leave-management',
  },
  {
    module: 'Predictive Analytics & Forecasting',
    grade: 'A',
    evidence: 'Gym Calories Predictive Analysis',
    href: '/projects/gym-calories-predictive-analysis',
  },
];
