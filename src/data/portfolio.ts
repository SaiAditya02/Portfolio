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
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'QA Lab', href: '#qa-lab' },
  { label: 'How I test', href: '#how-i-test' },
  { label: 'QA × AI', href: '#qa-ai' },
  { label: 'Contact', href: '#contact' },
];

// Proof values from the resume.
export const metrics: Metric[] = [
  { value: '1.5+', label: 'years in QA' },
  { value: '3', label: 'AI tools in daily use' },
  { value: '4+', label: 'products tested in production' },
  { value: '40%', label: 'fewer bug escapes' },
  { value: '50+', label: 'payment scenarios validated' },
  { value: '10,000+', label: 'students a year covered' },
];

// Page copy carried over from the old-theme portfolio.
export const copy = {
  role: 'QA Engineer 1',
  company: 'Deepta AI',
  microcopy: 'QA Engineer 1 · AI-assisted builder · Hyderabad, India · 2026',
  eyebrow: 'QA engineer × product thinking × AI-assisted testing',
  manifesto: ['I test systems.', 'I build with AI.', 'I ship quality.'],
  lead: 'QA Engineer focused on understanding how products behave, finding what breaks, and using AI to build smarter testing workflows.',
  aboutTitle: ["I don't just test features.", 'I investigate systems.'],
  aboutIntro:
    'I work across manual testing, functional validation, regression coverage, exploratory investigation, UAT, API testing, automation, performance checks, analytics QA and integration testing. My focus is on how the full product behaves as a system, not just whether a single screen looks correct.',
  projectsTitle: "Systems I've tested.",
  aiTitle: ["AI doesn't replace QA thinking.", 'It amplifies it.'],
  aiIntro:
    'I use AI as a force multiplier for speed, breadth, exploration, reasoning support, documentation and test scenario thinking. It helps me expand coverage quickly, draft bug reports, reason through requirements and challenge assumptions. Human QA judgment, product understanding and critical validation remain essential.',
  contactTitle: 'Have a system worth breaking?',
  contactIntro: "Let's talk about the product, the problem, or the edge case nobody thought about.",
  footerLine: 'Built with curiosity. Tested with intent.',
};

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
    company: 'Deepta AI',
    role: 'QA Engineer 1',
    duration: 'Aug 2025 – Present',
    product: 'EdTech CRM with application, loan and LMS modules',
    responsibilities: [
      'Validated end-to-end payment gateway integrations, confirming 99.9% financial data accuracy.',
      'Tested the complete student lifecycle across CRM, admissions, and academics for 10,000+ students annually.',
      'Razorpay & EaseBuzz payment flow validation across 50+ scenarios.',
      'Cross-module data consistency testing: CRM → Admissions → Academics.',
      'Analytics dashboard data accuracy & funnel conversion validation.',
      'Sprint reviews, UAT coordination, and stakeholder bug reporting.',
    ],
    testingScope: [
      'End-to-end testing',
      'Integration validation',
      'Analytics QA',
      'UAT support',
      'Data accuracy checks',
      'Cross-module regression',
      'Payment gateway testing',
    ],
    tools: ['Jira', 'Postman', 'Razorpay', 'EaseBuzz', 'Moodle', 'Canvas'],
  },
  {
    company: 'Apxor Technology Solutions',
    role: 'Associate QA Engineer',
    duration: 'Jan 2025 – Aug 2025',
    product: 'FinTech + EdTech platforms',
    responsibilities: [
      'Built 15 regression suites cutting bug escapes by 40%.',
      'Led UAT across 3+ product cycles and automated test scripts for 6 key features.',
      'OAuth & Truecaller integration testing across device/network conditions.',
      '6 automated test scripts for high-risk feature paths.',
      'UAT lead across 3 product cycles with direct stakeholder coordination.',
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
];

export const projects: Project[] = [
  {
    title: 'Analytics Dashboard',
    company: 'Deepta AI',
    duration: '2025',
    domain: 'Internal BI Tool',
    description:
      'Validated the business intelligence layer surfaced to stakeholders — funnel conversion rates, retention curves, MAU breakdowns, and revenue performance charts. Tested every data point against backend sources to ensure what decision-makers saw was exactly what was happening in the product.',
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
  {
    title: 'EdTech CRM',
    company: 'Deepta AI',
    duration: 'Aug 2025 – Present',
    domain: 'EdTech Platform',
    description:
      'An end-to-end student lifecycle platform consolidating Application Management, Multi Loan Management, and Learning Management (Moodle & Canvas integrations) under a single CRM. Validated the complete pipeline from lead capture to enrollment — testing Razorpay and EaseBuzz payment flows, cross-module data consistency, fee collection workflows, and LMS sync accuracy across 10,000+ students annually.',
    role: 'QA Engineer 1',
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
      "Validating multi-step processes where one module's status or data affects another.",
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
    tags: ['CRM', 'Payments', 'LMS Integration', 'Moodle', 'Canvas', 'E2E Testing', '10K+ Students'],
  },
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
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Testing',
    items: ['Manual Testing', 'Exploratory QA', 'Regression Testing', 'UAT', 'Functional QA'],
  },
  {
    title: 'APIs & integrations',
    items: ['Postman', 'Razorpay', 'EaseBuzz', 'Google OAuth', 'Truecaller'],
  },
  {
    title: 'Workflow & tracking',
    items: ['Jira', 'Confluence', 'TestRail', 'Excel', 'Agile / Scrum'],
  },
  {
    title: 'AI tools in daily use',
    items: ['ChatGPT', 'Claude', 'Gemini'],
  },
  {
    title: 'AI use cases',
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
    label: 'Happy path',
    objective: 'Verify the expected login flow succeeds with valid credentials and the session is created correctly.',
    input: 'Valid username + valid password',
    expected: 'Authentication should succeed, redirect to the correct dashboard and reveal the expected account state.',
    risk: ['Session creation issues', 'Incorrect redirect routes', 'Account state mismatch'],
    observation: 'The primary goal is to confirm the intended flow works before probing failure states and edge conditions.',
  },
  {
    id: 'negative-test',
    label: 'Negative test',
    objective: 'Confirm the system behaves correctly when credentials are invalid or a user attempts unauthorized access.',
    input: 'Invalid password or locked account',
    expected: 'Authentication should fail and a meaningful error should be displayed without exposing sensitive account details.',
    risk: ['Account lockout behavior', 'Incorrect error messaging', 'Information leakage', 'Retry handling'],
    observation: 'Negative tests often reveal product assumptions and security-sensitive edge cases that happy-path validation misses.',
  },
  {
    id: 'boundary-test',
    label: 'Boundary test',
    objective: 'Check system behavior at the threshold of valid input lengths, constraints and retry limits.',
    input: 'Minimum / maximum password length, maximum failed attempts',
    expected: 'The system should enforce the correct boundary rules and respond consistently without surprising state transitions.',
    risk: ['Off-by-one validation bugs', 'Retry limit inconsistencies', 'Blocked account states'],
    observation: 'Boundary checks are useful because logic often fails at the edges, not in the middle of the valid range.',
  },
  {
    id: 'edge-case',
    label: 'Edge case',
    objective: 'Probe unusual or uncommon user states that are likely to fail in production-like conditions.',
    input: 'Password with special characters, session expiration, concurrent login attempts',
    expected: 'The application should remain stable, display predictable messaging and preserve correct security behavior.',
    risk: ['Session confusion', 'Unexpected token invalidation', 'Cross-device lock problems'],
    observation: 'High-risk defects frequently originate from transitions or states the product team does not explicitly test during normal flows.',
  },
  {
    id: 'api-validation',
    label: 'API validation',
    objective: 'Verify the auth endpoint returns expected status codes, payloads and error semantics for valid and invalid requests.',
    input: 'HTTP request payloads for login attempts',
    expected: 'The API should return accurate responses and provide the UI with consistent signals for success and failure.',
    risk: ['Response mismatch', 'Unhandled API errors', 'Auth token expiration handling'],
    observation: 'The most important question is whether the API contract supports the product behavior under real-world conditions.',
  },
  {
    id: 'exploratory-test',
    label: 'Exploratory test',
    objective: 'Investigate the flow like a user would, looking for friction, unexpected states and inconsistent system behavior.',
    input: 'Unscripted user interactions combined with product assumptions',
    expected: 'The system should behave predictably even when the journey deviates from the ideal path.',
    risk: ['Hidden workflow breaks', 'Unclear status messaging', 'Subtle usability issues'],
    observation: 'Exploration catches issues that production users hit long before formal testers write a test for them.',
  },
];

export const flowSteps: FlowStep[] = [
  { title: 'Understand', description: 'Understand the product, users, requirements and business flow.' },
  { title: 'Explore', description: 'Look beyond predefined tests and investigate unexpected behavior.' },
  { title: 'Plan', description: 'Build a clear test strategy around risk, user impact and dependency mapping.' },
  { title: 'Test', description: 'Validate the expected behavior against real flows across the product surface.' },
  { title: 'Break', description: 'Challenge assumptions and deliberately search for failure points.' },
  { title: 'Validate', description: 'Verify behavior across UI, API, integrations and data.' },
  { title: 'Automate', description: 'Automate repeatable validation where automation adds measurable value.' },
  { title: 'Report', description: 'Communicate findings with clarity, reproduction steps and business impact.' },
  { title: 'Verify', description: 'Confirm the fix, test the regression and ensure the system behaves as intended.' },
];

export const techStack = [
  'Testing',
  'Automation',
  'API',
  'Performance',
  'Development',
  'Version control',
  'AI',
  'Project management',
];

export const aiTools = ['ChatGPT', 'Claude', 'Gemini'];

export const aiUseCases = [
  'Test case generation',
  'Edge case brainstorming',
  'Requirement analysis',
  'Bug report drafting',
  'Documentation',
  'Code understanding',
  'Test scenario exploration',
  'Test data ideas',
];

export const contact = {
  email: 'sapgarimella@gmail.com',
  phone: '+91 93817 36720',
  location: 'Hyderabad, India',
};

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/SaiAditya02' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-aditya-garimella-93aa282b3' },
  { label: 'Email', href: `mailto:${contact.email}` },
  { label: 'Resume', href: '/SaiAdityaResume.pdf' },
];
