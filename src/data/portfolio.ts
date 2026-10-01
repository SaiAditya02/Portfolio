export type NavItem = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type AboutPoint = {
  id: string;
  title: string;
  description: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  duration: string;
  product: string;
  responsibilities: string[];
  testingScope: string[];
  tools: string[];
};

export type Project = {
  title: string;
  company: string;
  duration: string;
  domain: string;
  description: string;
  role: string;
  testingScope: string[];
  challenges: string[];
  approach: string[];
  tools: string[];
  edgeCases: string[];
  outcome: string;
  tags: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type QaScenario = {
  id: string;
  label: string;
  objective: string;
  input: string;
  expected: string;
  risk: string[];
  observation: string;
};

export type FlowStep = {
  title: string;
  description: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'QA LAB', href: '#qa-lab' },
  { label: 'CONTACT', href: '#contact' },
];

export const metrics: Metric[] = [
  { value: '01+', label: 'YEARS IN QA' },
  { value: '03', label: 'AI TOOLS IN DAILY USE' },
  { value: '04+', label: 'PRODUCT / SYSTEMS TESTED' },
];

export const aboutPoints: AboutPoint[] = [
  {
    id: 'understand-product',
    title: 'Understand the product',
    description: 'Map user journeys, business logic, requirements and dependencies before writing a single validation step.',
  },
  {
    id: 'understand-user',
    title: 'Understand the user',
    description: 'Challenge assumptions by testing the actual experience people face when the system is under pressure, not just the ideal path.',
  },
  {
    id: 'break-happy-path',
    title: 'Break the happy path',
    description: 'Look for where workflows fail, where inputs drift, and where edge conditions create hidden defects.',
  },
  {
    id: 'explore-edge-cases',
    title: 'Explore edge cases',
    description: 'Investigate state transitions, permissions, time-based behavior, null data and integration mismatches that rarely appear in scripted checks.',
  },
  {
    id: 'validate-system',
    title: 'Validate the system',
    description: 'Check the UI, APIs, backend data and cross-module behavior together so quality is measured as a system outcome.',
  },
  {
    id: 'automate-what-matters',
    title: 'Automate what matters',
    description: 'Focus automation on high-value repeatable checks that improve consistency and reduce manual fatigue without losing exploratory depth.',
  },
  {
    id: 'learn-from-failures',
    title: 'Learn from failures',
    description: 'Every defect is a signal: a missing requirement, a product confusion, or a weak test model that should be corrected.',
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: 'Apxor Technology Solutions',
    role: 'QA Engineer 1',
    duration: 'Jan 2025 – Aug 2025',
    product: 'FinTech + EdTech platforms',
    responsibilities: [
      'Designed and executed functional, regression and exploratory testing across multi-role user flows.',
      'Validated business logic for lending eligibility, applicant flows, institutional workflows and status transitions.',
      'Worked with product and engineering teams to identify edge cases in UI behavior, API responses and data continuity.',
    ],
    testingScope: [
      'Manual testing',
      'Functional QA',
      'Regression coverage',
      'API validation',
      'Role-based workflow QA',
      'Data consistency checks',
    ],
    tools: ['Jira', 'Confluence', 'Postman', 'Excel', 'TestRail'],
  },
  {
    company: 'Deepa AI',
    role: 'QA Engineer 1',
    duration: 'Aug 2025 – Present',
    product: 'EdTech CRM with application, loan and LMS modules',
    responsibilities: [
      'Validate cross-module workflows spanning admissions, payments, fee disbursement, enrollment and course access.',
      'Trace workflow integrity across CRM, payment gateways, LMS integrations and reconciliation logic.',
      'Support product quality by testing integrations and investigating mismatches in data, status transitions and user-visible behavior.',
    ],
    testingScope: [
      'End-to-end testing',
      'Integration validation',
      'Analytics QA',
      'UAT support',
      'Data accuracy checks',
      'Cross-module regression',
    ],
    tools: ['Jira', 'Postman', 'Razorpay', 'EaseBuzz', 'Moodle', 'Canvas'],
  },
];

export const projects: Project[] = [
  {
    title: 'Multi-Loan Vendor Indication System',
    company: 'Apxor Technology Solutions',
    duration: 'Mar – Aug 2025',
    domain: 'FinTech Product',
    description:
      'A FinTech platform connecting students with financial institutions through multi-vendor loan indication, verification and status tracking.',
    role: 'QA Engineer',
    testingScope: [
      'Application submission',
      'Eligibility logic',
      'Multi-vendor routing',
      'College verification',
      'Vendor review workflows',
      'Real-time status updates',
      'Applicant workflows',
      'College workflows',
      'Vendor workflows',
      'Role-based behavior',
      'Edge cases',
    ],
    challenges: [
      'Matching lender eligibility across multiple vendors without breaking the application lifecycle.',
      'Tracking status changes consistently across distinct roles and workflow transitions.',
      'Uncovering edge cases where routing logic or status integrity could break the applicant experience.',
    ],
    approach: [
      'Mapped the loan lifecycle across applicant, college and vendor portals.',
      'Traced business logic and user journeys before validating the full end-to-end flow.',
      'Covered role-based permissions, submission checks and state transitions during regression passes.',
    ],
    tools: ['Jira', 'Postman', 'Excel', 'Functional QA', 'Regression Testing'],
    edgeCases: [
      'Eligibility edge cases across vendor matching rules',
      'Partial application and state transition mismatch',
      'Status drift between applicant and vendor views',
      'Role-based permission enforcement',
    ],
    outcome:
      'Strengthened confidence in the vendor indication flow and helped maintain accuracy across applicant, college and vendor-facing views.',
    tags: ['FinTech', 'Multi-Vendor', 'Loan Lifecycle', 'E2E Testing', 'Multi-role', 'Edge Cases'],
  },
  {
    title: 'Question & Answer Platform',
    company: 'Apxor Technology Solutions',
    duration: 'Jan – Mar 2025',
    domain: 'EdTech / Community',
    description:
      'A Quora-style knowledge platform for university students, enabling peer Q&A, faculty engagement and institutional knowledge sharing across engineering colleges.',
    role: 'QA Engineer',
    testingScope: [
      'Truecaller phone verification',
      'Google OAuth',
      'Posts',
      'Questions',
      'Answers',
      'Voting',
      'Tagging',
      'Following',
      'Feed behavior',
      'Relevance',
      'Network conditions',
      'Device conditions',
    ],
    challenges: [
      'Validating auth flows across device and network conditions without missing onboarding blockers.',
      'Checking relevance and feed behavior when content, votes and follows update dynamically.',
      'Regression coverage around core Q&A workflows without losing exploratory investigation.',
    ],
    approach: [
      'Validated onboarding flows and social functionality across multiple traffic and device conditions.',
      'Tested real-world user behavior around posting, voting, tagging and following to uncover hidden friction.',
      'Used regression and exploratory checks to cover frequent use patterns and risk-heavy interactions.',
    ],
    tools: ['Jira', 'Postman', 'Google OAuth', 'Truecaller', 'Exploratory QA'],
    edgeCases: [
      'OAuth failure handling',
      'Verification retry scenarios',
      'Feed freshness and visibility logic',
      'Regression risk in voting and tag interactions',
    ],
    outcome:
      'Improved confidence in onboarding and core community workflows while identifying and validating issues that could affect real user engagement.',
    tags: ['EdTech', 'Community', 'Auth', 'Q&A', 'Regression', 'Network Variants'],
  },
  {
    title: 'EdTech CRM',
    company: 'Deepa AI',
    duration: 'Aug 2025 – Present',
    domain: 'EdTech Platform',
    description:
      'An end-to-end student lifecycle platform consolidating application management, multi-loan management and learning management under a single CRM.',
    role: 'QA Engineer',
    testingScope: [
      'Lead capture',
      'Admission pipeline',
      'Form workflows',
      'Status tracking',
      'Razorpay payment flows',
      'EaseBuzz payment flows',
      'Multi-vendor fee disbursement',
      'Repayment validation',
      'Reconciliation',
      'Fee collection workflows',
      'Moodle integration',
      'Canvas integration',
      'Enrollment synchronization',
      'Course access',
      'Grade data integrity',
      'Cross-module consistency',
    ],
    challenges: [
      'Maintaining data integrity across CRM, payment integrations and LMS modules.',
      'Validating multi-step processes where one module’s status or data affects another.',
      'Checking end-to-end workflow quality across payments, access controls and grade syncs.',
    ],
    approach: [
      'Mapped critical transitions from lead capture through admissions, financial operations and learning access.',
      'Validated integration points and workflow continuity rather than treating each module in isolation.',
      'Focused on reconciliation, enrollment and access logic where data mismatches become visible to users.',
    ],
    tools: ['Jira', 'Postman', 'Razorpay', 'EaseBuzz', 'Moodle', 'Canvas', 'Excel'],
    edgeCases: [
      'Failed payment reconciliation',
      'Enrollment sync delays',
      'Course access gating mismatches',
      'Grade and student record integrity issues',
    ],
    outcome:
      'Supported quality across a multi-module student lifecycle system by validating data integrity, integration behavior and operational transitions.',
    tags: ['CRM', 'Payments', 'LMS Integration', 'Moodle', 'Canvas', 'E2E Testing'],
  },
  {
    title: 'Analytics Dashboard',
    company: 'Deepa AI',
    duration: '2025',
    domain: 'Internal BI Tool',
    description:
      'Validated the business intelligence layer surfaced to stakeholders, covering dashboards, conversions and revenue-related reporting.',
    role: 'QA Engineer',
    testingScope: [
      'Funnel conversion rates',
      'Retention curves',
      'MAU breakdowns',
      'Revenue performance charts',
      'Analytics metrics',
      'Dashboard behavior',
      'Backend data validation',
      'Data accuracy',
      'Visualization behavior',
    ],
    challenges: [
      'Ensuring the dashboard reflected accurate business metrics rather than visually correct but data-inaccurate reports.',
      'Checking how values flowed from UI through API to backend data and visualization logic.',
      'Testing chart behavior for inconsistent or delayed data conditions.',
    ],
    approach: [
      'Validated the data path end-to-end: UI → API → backend → database → analytics layer.',
      'Checked both the visible dashboard output and the underlying metric integrity behind it.',
      'Used analytics QA to look for mismatches in calculations, segmentation and time-based reporting.',
    ],
    tools: ['Jira', 'Postman', 'Excel', 'Analytics QA', 'Data Validation'],
    edgeCases: [
      'Metric drift across filters and time ranges',
      'Visualization mismatch from backend values',
      'MAU and funnel anomalies',
      'Revenue chart errors caused by delayed or inconsistent data',
    ],
    outcome:
      'Helped validate that stakeholder-facing metrics were consistent, interpretable and grounded in system data rather than presentation alone.',
    tags: ['Analytics QA', 'Data Accuracy', 'Revenue Charts', 'MAU Metrics', 'Funnel Validation', 'Dashboard QA'],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'TESTING',
    items: ['Manual Testing', 'Exploratory QA', 'Regression Testing', 'UAT', 'Functional QA'],
  },
  {
    title: 'APIs & INTEGRATIONS',
    items: ['Postman', 'Razorpay', 'EaseBuzz', 'Google OAuth', 'Truecaller'],
  },
  {
    title: 'WORKFLOW & TRACKING',
    items: ['Jira', 'Confluence', 'TestRail', 'Excel', 'Agile / Scrum'],
  },
  {
    title: 'AI TOOLS · DAILY USE',
    items: ['ChatGPT', 'Claude', 'Gemini'],
  },
  {
    title: 'AI USE CASES',
    items: [
      'Test case generation',
      'Edge case brainstorming',
      'Bug report drafting',
      'Documentation',
      'Code understanding',
    ],
  },
];

export const qaScenarios: QaScenario[] = [
  {
    id: 'happy-path',
    label: 'HAPPY PATH',
    objective: 'Verify the expected login flow succeeds with valid credentials and the session is created correctly.',
    input: 'Valid username + valid password',
    expected: 'Authentication should succeed, redirect to the correct dashboard and reveal the expected account state.',
    risk: ['Session creation issues', 'Incorrect redirect routes', 'Account state mismatch'],
    observation: 'The primary goal is to confirm the intended flow works before probing failure states and edge conditions.',
  },
  {
    id: 'negative-test',
    label: 'NEGATIVE TEST',
    objective: 'Confirm the system behaves correctly when credentials are invalid or a user attempts unauthorized access.',
    input: 'Invalid password or locked account',
    expected: 'Authentication should fail and a meaningful error should be displayed without exposing sensitive account details.',
    risk: ['Account lockout behavior', 'Incorrect error messaging', 'Information leakage', 'Retry handling'],
    observation: 'Negative tests often reveal product assumptions and security-sensitive edge cases that happy-path validation misses.',
  },
  {
    id: 'boundary-test',
    label: 'BOUNDARY TEST',
    objective: 'Check system behavior at the threshold of valid input lengths, constraints and retry limits.',
    input: 'Minimum / maximum password length, maximum failed attempts',
    expected: 'The system should enforce the correct boundary rules and respond consistently without surprising state transitions.',
    risk: ['Off-by-one validation bugs', 'Retry limit inconsistencies', 'Blocked account states'],
    observation: 'Boundary checks are useful because logic often fails at the edges, not in the middle of the valid range.',
  },
  {
    id: 'edge-case',
    label: 'EDGE CASE',
    objective: 'Probe unusual or uncommon user states that are likely to fail in production-like conditions.',
    input: 'Password with special characters, session expiration, concurrent login attempts',
    expected: 'The application should remain stable, display predictable messaging and preserve correct security behavior.',
    risk: ['Session confusion', 'Unexpected token invalidation', 'Cross-device lock problems'],
    observation: 'High-risk defects frequently originate from transitions or states the product team does not explicitly test during normal flows.',
  },
  {
    id: 'api-validation',
    label: 'API VALIDATION',
    objective: 'Verify the auth endpoint returns expected status codes, payloads and error semantics for valid and invalid requests.',
    input: 'HTTP request payloads for login attempts',
    expected: 'The API should return accurate responses and provide the UI with consistent signals for success and failure.',
    risk: ['Response mismatch', 'Unhandled API errors', 'Auth token expiration handling'],
    observation: 'The most important question is whether the API contract supports the product behavior under real-world conditions.',
  },
  {
    id: 'exploratory-test',
    label: 'EXPLORATORY TEST',
    objective: 'Investigate the flow like a user would, looking for friction, unexpected states and inconsistent system behavior.',
    input: 'Unscripted user interactions combined with product assumptions',
    expected: 'The system should behave predictably even when the journey deviates from the ideal path.',
    risk: ['Hidden workflow breaks', 'Unclear status messaging', 'Subtle usability issues'],
    observation: 'Exploration catches issues that production users hit long before formal testers write a test for them.',
  },
];

export const flowSteps: FlowStep[] = [
  { title: 'UNDERSTAND', description: 'Understand the product, users, requirements and business flow.' },
  { title: 'EXPLORE', description: 'Look beyond predefined tests and investigate unexpected behavior.' },
  { title: 'PLAN', description: 'Build a clear test strategy around risk, user impact and dependency mapping.' },
  { title: 'TEST', description: 'Validate the expected behavior against real flows across the product surface.' },
  { title: 'BREAK', description: 'Challenge assumptions and deliberately search for failure points.' },
  { title: 'VALIDATE', description: 'Verify behavior across UI, API, integrations and data.' },
  { title: 'AUTOMATE', description: 'Automate repeatable validation where automation adds measurable value.' },
  { title: 'REPORT', description: 'Communicate findings with clarity, reproduction steps and business impact.' },
  { title: 'VERIFY', description: 'Confirm the fix, test the regression and ensure the system behaves as intended.' },
];

export const techStack = [
  'TESTING',
  'AUTOMATION',
  'API',
  'PERFORMANCE',
  'DEVELOPMENT',
  'VERSION CONTROL',
  'AI',
  'PROJECT MANAGEMENT',
];

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email', href: 'mailto:saiaditya.qa@example.com' },
  { label: 'Resume', href: '/resume.pdf' },
];
