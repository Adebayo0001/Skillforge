import { CourseCategory, CourseFormat, CourseLevel, Course, Instructor, Review, OutcomeCard } from './types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'tunde-lambo',
    name: 'Tunde Lambo',
    title: 'Principal Software Architect',
    company: 'Flutterwave',
    bio: 'Tunde has spent nearly a decade building and scaling payments infrastructure in Africa. He specializes in distributed systems, API cloud architecture, and high-performance engineering teams.',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face',
    experienceText: '8 years engineering leadership at Flutterwave',
    isFeatured: true,
    courseCount: 4,
  },
  {
    id: 'chioma-nduka',
    name: 'Chioma Nduka',
    title: 'Lead Data Strategist',
    company: 'Sterling Bank',
    bio: 'Chioma is a seasoned data scientist and business strategist who translates complex database pipelines into high-impact business solutions. She has trained over 1,500 analytics professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    experienceText: '10 years fintech & database design leadership',
    isFeatured: true,
    courseCount: 3,
  },
  {
    id: 'oluwaseun-alabi',
    name: 'Oluwaseun Alabi',
    title: 'Principal Product Designer',
    company: 'Paystack',
    bio: 'Seun is a pioneer in digital interface design in West Africa. He is focused on making complex payment systems intuitive, interactive, and beautifully simple. Former design lead at absolute startups.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    experienceText: '7 years lead product design at Paystack',
    isFeatured: true,
    courseCount: 5,
  }
];

export const OUTCOME_CARDS: OutcomeCard[] = [
  {
    id: 'adaeze',
    studentName: 'Adaeze',
    quote: 'I went from entry-level administrative tasks to building dashboard pipelines that the bank board looks at daily. The live cohort forced me to keep up, and the feedback from coaches was instantaneous and practical. I feel like a high-value expert today.',
    outcomeText: 'Got promoted to Senior Data Analyst at Access Bank',
    relativeTimeText: '3 months after completing Data Analysis with Python',
    courseName: 'Data Analysis with Python',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=face'
  },
  {
    id: 'emeka',
    studentName: 'Emeka',
    quote: 'The curriculum is 100% focused on real execution. None of that typical academic theory. I prepared my PM launch portfolio during the course, which directly landed me my startup role. My salary literally doubled.',
    outcomeText: 'Landed a product manager role at a Series B startup',
    relativeTimeText: '6 months after completing Product Management Fundamentals',
    courseName: 'Product Management Fundamentals',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face'
  },
  {
    id: 'funmilayo',
    studentName: 'Funmilayo',
    quote: 'I was designing basic social media flyers before. Now I design full high-fidelity mobile apps for overseas SaaS clients. The payment in US dollars is literally life-changing, to be honest. It has unlocked self-reliance for me.',
    outcomeText: 'Started freelancing and tripled her income',
    relativeTimeText: '2 months after completing UI/UX Design Masterclass',
    courseName: 'UI/UX Design Masterclass',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&crop=face'
  }
];

export const COURSES: Course[] = [
  {
    id: 'data-analysis-python',
    title: 'Data Analysis with Python',
    slug: 'data-analysis-python',
    subtitle: 'Learn to manipulate, analyze and visualize complex company datasets to drive strategic commercial decisions.',
    description: 'Transform raw company data into clean, dynamic dashboards and premium projections using Python, Pandas, and Seaborn. This live cohort training guides you from basic syntax to full predictive analysis, backed by Access Bank and MTN standards.',
    rating: 4.9,
    reviewCount: 142,
    enrolledCount: 412,
    category: CourseCategory.DATA,
    level: CourseLevel.INTERMEDIATE,
    format: CourseFormat.COHORT,
    price: 95000,
    oldPrice: 130000,
    durationHours: 36,
    durationWeeks: 6,
    cohortDates: ['July 5, 2026', 'August 15, 2026'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    isFeatured: true,
    learningOutcomes: [
      'Write clean, modular Python scripts to clean and manipulate noisy datasets.',
      'Construct executive-ready visual dashboards with Seaborn and Matplotlib.',
      'Deploy exploratory data analysis frameworks to identify cost savings and trends.',
      'Query SQL databases directly using Python script integrations.',
      'Build basic linear predictive algorithms for sales and resource planning.',
      'Build a capstone industry portfolio validated by enterprise bankers.'
    ],
    targetAudience: [
      'Accountants, Business Analysts, and Operations Officers wanting to automate Excel.',
      'Junior data engineers seeking formal cohort training.',
      'Ambitious professionals aiming for data positions in banking/fintech.'
    ],
    instructorId: 'chioma-nduka',
    syllabus: [
      {
        id: 'da-m1',
        title: 'Module 1: Foundations of Python for Analysts',
        lessons: [
          { id: 'da-l1', title: 'Python Syntax & Dynamic Variables', duration: '45 mins', isPreview: true },
          { id: 'da-l2', title: 'Data Structures: Lists, Dicts & Loops', duration: '60 mins' },
          { id: 'da-l3', title: 'Writing Your First Commercial Function', duration: '50 mins' }
        ]
      },
      {
        id: 'da-m2',
        title: 'Module 2: Wrangling Data with Pandas',
        lessons: [
          { id: 'da-l4', title: 'Reading Multi-source Spreadsheets & CSVs', duration: '75 mins' },
          { id: 'da-l5', title: 'Cleaning Null Values & Groupby Filtering', duration: '90 mins' },
          { id: 'da-l6', title: 'Merging Commercial Transactions Databases', duration: '60 mins' }
        ]
      },
      {
        id: 'da-m3',
        title: 'Module 3: Beautiful Visual Reporting',
        lessons: [
          { id: 'da-l7', title: 'Seaborn Charts for Boardroom Presentations', duration: '80 mins' },
          { id: 'da-l8', title: 'Interactive Matplotlib Dashboards', duration: '120 mins' }
        ]
      }
    ]
  },
  {
    id: 'product-management-fundamentals',
    title: 'Product Management Fundamentals',
    slug: 'product-management-fundamentals',
    subtitle: 'From feature idea to successful launch. Learn how to draft PRDs, lead agile engineering squads, and track key metrics.',
    description: 'Learn the exact operational playbooks used by Paystack, Flutterwave, and top international startups to map product strategies, create wireframes, prioritize engineering tickets, and drive customer retention.',
    rating: 4.8,
    reviewCount: 120,
    enrolledCount: 389,
    category: CourseCategory.BUSINESS,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.COHORT,
    price: 110000,
    oldPrice: 150000,
    durationHours: 30,
    durationWeeks: 6,
    cohortDates: ['July 10, 2026', 'August 20, 2026'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop',
    isFeatured: true,
    learningOutcomes: [
      'Write clear, rigorous Product Requirement Documents (PRDs) for engineering.',
      'Run seamless agile sprint ceremonies, standups, and backlog groomings.',
      'Calculate unit economics, customer acquisition cost, and cohort retention rates.',
      'Create click-through wireframes in Figma to align executive stakeholders.',
      'Negotiate engineering trade-offs and balance feature roadmaps under constraints.',
      'Draft a functional Launch Plan tailored to the Nigerian and pan-African market.'
    ],
    targetAudience: [
      'Engineers wanting to transition into client-facing strategy positions.',
      'Customer success or operations leads looking to pivot into product design.',
      'Founders wanting to learn standard agile development cycles for their tech startups.'
    ],
    instructorId: 'oluwaseun-alabi',
    syllabus: [
      {
        id: 'pm-m1',
        title: 'Module 1: The Lifecycle of a Product',
        lessons: [
          { id: 'pm-l1', title: 'Role of PM in Africa Fintech startups', duration: '40 mins', isPreview: true },
          { id: 'pm-l2', title: 'User Research & Problem-Fit Discovery', duration: '70 mins' }
        ]
      },
      {
        id: 'pm-m2',
        title: 'Module 2: Documenting Product Scope',
        lessons: [
          { id: 'pm-l3', title: 'How to Write an Elite PRD', duration: '85 mins' },
          { id: 'pm-l4', title: 'UX Wireframing & User Flows', duration: '60 mins' }
        ]
      },
      {
        id: 'pm-m3',
        title: 'Module 3: Sprints, Metrics & Growth',
        lessons: [
          { id: 'pm-l5', title: 'Scrum Methodologies & Agile Planning', duration: '90 mins' },
          { id: 'pm-l6', title: 'Cohort Retention Sheets & Pirate Metrics (AARRR)', duration: '110 mins' }
        ]
      }
    ]
  },
  {
    id: 'ui-ux-design-masterclass',
    title: 'UI/UX Design Masterclass',
    slug: 'ui-ux-design-masterclass',
    subtitle: 'Master Figma wireframing, interactive prototyping, and deep user psychology to build industry-ready products.',
    description: 'Learn the principles of user-centered design. Master user journeys, typography, color theories, spacing, UI kits, interactive component architectures, and responsive micro-layouts.',
    rating: 4.9,
    reviewCount: 98,
    enrolledCount: 367,
    category: CourseCategory.CREATIVE,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.SELF_PACED,
    price: 85000,
    oldPrice: 110000,
    durationHours: 40,
    durationWeeks: 8,
    thumbnailUrl: 'https://images.unsplash.com/photo-1541462608141-2c093aee5978?w=800&auto=format&fit=crop',
    isFeatured: true,
    learningOutcomes: [
      'Formulate beautiful typography structures using Inter, Outfit, and Space Grotesk.',
      'Configure auto-layouts and pixel-perfect grids for web, tablet, and mobile screens.',
      'Examine high-fidelity interactive prototypes with complex micro-interactions in Figma.',
      'Execute descriptive qualitative user research tests and user personas.',
      'Coordinate developers handoffs cleanly using structured design tokens and components.',
      'Launch a modern 3-project online PM/Designer portfolio with feedback loops.'
    ],
    targetAudience: [
      'Graphic designers who want to transition into high-paying fintech UI/UX.',
      'Frontend developers wanting to build a robust design eye for their layouts.',
      'Freelancers wanting to offer premium end-to-end consulting services.'
    ],
    instructorId: 'oluwaseun-alabi',
    syllabus: [
      {
        id: 'ui-m1',
        title: 'Module 1: Visual Design Principles',
        lessons: [
          { id: 'ui-l1', title: 'Hierarchy, Positive Space & Grid Layouts', duration: '50 mins', isPreview: true },
          { id: 'ui-l2', title: 'Dynamic Typography & Color Vibratures', duration: '65 mins' }
        ]
      },
      {
        id: 'ui-m2',
        title: 'Module 2: Figma Mastery & Micro-layouts',
        lessons: [
          { id: 'ui-l3', title: 'Figma Auto-Layout 5.0 deep-dive', duration: '120 mins' },
          { id: 'ui-l4', title: 'Component Variations & Global Design Libraries', duration: '90 mins' }
        ]
      },
      {
        id: 'ui-m3',
        title: 'Module 3: Prototyping & Usability Evaluation',
        lessons: [
          { id: 'ui-l5', title: 'Interactive Prototype Hooks and Transitions', duration: '80 mins' },
          { id: 'ui-l6', title: 'Conducting Live User Tests & Mapping heatmaps', duration: '75 mins' }
        ]
      }
    ]
  },
  {
    id: 'frontend-web-dev',
    title: 'Frontend Web Development with React',
    slug: 'frontend-web-dev',
    subtitle: 'Build modern, fast, and scalable web applications in React, TypeScript and Tailwind CSS.',
    description: 'Master frontend engineering. Go from JavaScript basics to component structures, custom hook architectures, API calls, global state management, and high-performance server side deployments.',
    rating: 4.7,
    reviewCount: 95,
    enrolledCount: 320,
    category: CourseCategory.TECHNOLOGY,
    level: CourseLevel.INTERMEDIATE,
    format: CourseFormat.COHORT,
    price: 120000,
    oldPrice: 160000,
    durationHours: 48,
    durationWeeks: 8,
    cohortDates: ['July 1, 2026', 'August 12, 2026'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    isFeatured: true,
    learningOutcomes: [
      'Write robust, type-safe React components with absolute confidence.',
      'Incorporate beautiful interactive animations using the motion/react engine.',
      'Style interfaces rapidly using utility and responsive Tailwind CSS classes.',
      'Integrate third-party REST and GraphQL APIs using async hooks.',
      'Manage routing dynamics and client cache systems.',
      'Deploy compiled projects on production-ready Vercel or Netlify layers.'
    ],
    targetAudience: [
      'Junior web developers looking to upgrade their raw HTML/CSS skills into React.',
      'Backend developers looking to become full-stack software professionals.',
      'Self-taught programmers seeking mentoring and feedback with cohort accountability.'
    ],
    instructorId: 'tunde-lambo',
    syllabus: [
      {
        id: 'fe-m1',
        title: 'Module 1: JavaScript ES6 & TypeScript Foundations',
        lessons: [
          { id: 'fe-l1', title: 'Promises, Async/Await and Array Maps', duration: '60 mins', isPreview: true },
          { id: 'fe-l2', title: 'TypeScript Types, Interfaces, and Generics', duration: '90 mins' }
        ]
      },
      {
        id: 'fe-m2',
        title: 'Module 2: React Core & Component Arch',
        lessons: [
          { id: 'fe-l3', title: 'Hooks: useState, useEffect and useRef', duration: '110 mins' },
          { id: 'fe-l4', title: 'Dynamic Props, Reusability, and List Keys', duration: '80 mins' }
        ]
      },
      {
        id: 'fe-m3',
        title: 'Module 3: Styling and Global Data Pipelines',
        lessons: [
          { id: 'fe-l5', title: 'Vite Setup & CSS Postprocessing with Tailwind', duration: '95 mins' },
          { id: 'fe-l6', title: 'State management and API Proxy structures', duration: '120 mins' }
        ]
      }
    ]
  },
  {
    id: 'growth-marketing-sales',
    title: 'Growth Marketing & Tech Sales',
    slug: 'growth-marketing-sales',
    subtitle: 'Scale SaaS apps and enterprise services. Master Google Analytics, cold outbound systems, and sales negotiations.',
    description: 'Learn how modern high-growth tech companies find, convert, and retain millions of customers. Understand SEO strategies, running performance ad grids, email automation, B2B pipelines, and corporate pitching.',
    rating: 4.8,
    reviewCount: 88,
    enrolledCount: 295,
    category: CourseCategory.BUSINESS,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.SELF_PACED,
    price: 75000,
    oldPrice: 100000,
    durationHours: 24,
    durationWeeks: 4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    isFeatured: true,
    learningOutcomes: [
      'Formulate organic SEO campaigns that rank high database clicks.',
      'Configure optimized meta, search and social networks performance advertising.',
      'Engineer outbound email grids that convert leads at triple the market average.',
      'Map full inbound customer customer acquisition funnels.',
      'Pitch SaaS solutions with confidence to senior C-suite tech buyers.',
      'Review and scale budgets based on customer lifetime value (LTV).'
    ],
    targetAudience: [
      'Business developers, salespeople, and digital marketers seeking tech-industry updates.',
      'Founders seeking immediate inbound customers for their startups.',
      'Freelancers wishing to build highly optimized agency sales templates.'
    ],
    instructorId: 'chioma-nduka',
    syllabus: [
      {
        id: 'gm-m1',
        title: 'Module 1: Modern Digital Growth Architecture',
        lessons: [
          { id: 'gm-l1', title: 'SEO Keyword Strategies & Competitive Intelligence', duration: '45 mins', isPreview: true },
          { id: 'gm-l2', title: 'Paid Channels: Budgeting, Bidding & Conversion Optimization', duration: '75 mins' }
        ]
      },
      {
        id: 'gm-m2',
        title: 'Module 2: B2B Technology Sales Outbound',
        lessons: [
          { id: 'gm-l3', title: 'Constructing Targeted Corporate Lead Lists', duration: '60 mins' },
          { id: 'gm-l4', title: 'The Cold Outreach Framework that Wins Calls', duration: '80 mins' }
        ]
      }
    ]
  },
  {
    id: 'data-engineering',
    title: 'Advanced Data Engineering & Pipelines',
    slug: 'data-engineering',
    subtitle: 'Architect warehouse systems. Master ETL pipeline scripting, Apache Spark, Airflow routing, and Postgres optimization.',
    description: 'Build robust pipelines. Go beyond simple databases to architect scalable data storage systems, scale high-performance computing, clean extreme structured tables, and schedule automated engineering processes on Cloud.',
    rating: 4.9,
    reviewCount: 74,
    enrolledCount: 245,
    category: CourseCategory.DATA,
    level: CourseLevel.ADVANCED,
    format: CourseFormat.COHORT,
    price: 130000,
    oldPrice: 180000,
    durationHours: 40,
    durationWeeks: 8,
    cohortDates: ['July 18, 2026', 'September 1, 2026'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop',
    isFeatured: true,
    learningOutcomes: [
      'Design relational and modern non-relational database architectures with precision.',
      'Implement structured ETL (Extract, Transform, Load) pipelines to databases.',
      'Schedule cron and complex DAG dependencies in Apache Airflow.',
      'Coordinate distributed computation jobs inside Apache Spark architectures.',
      'Implement indexing and optimization queries for PostgreSQL schemas.',
      'Deploy persistent Cloud SQL warehouses linked to real-time visualizers.'
    ],
    targetAudience: [
      'Experienced backend engineers pivoting into Big Data roles.',
      'Core business analysts wanting to master robust cloud warehousing systems.',
      'Database administrators looking to automate manual migration tasks.'
    ],
    instructorId: 'chioma-nduka',
    syllabus: [
      {
        id: 'de-m1',
        title: 'Module 1: Relational Modeling & Schema Design',
        lessons: [
          { id: 'de-l1', title: 'Multi-table Normalization & Postgres Indexes', duration: '70 mins', isPreview: true },
          { id: 'de-l2', title: 'Designing Star and Snowflake Schemas', duration: '90 mins' }
        ]
      },
      {
        id: 'de-m2',
        title: 'Module 2: Big Data Operations with Spark',
        lessons: [
          { id: 'de-l3', title: 'Batch Wrangling with PySpark in the Cloud', duration: '110 mins' },
          { id: 'de-l4', title: 'Designing DAGs and Pipelines with Airflow', duration: '85 mins' }
        ]
      }
    ]
  },
  {
    id: 'devops-cloud-aws',
    title: 'DevOps & Cloud Engineering (AWS)',
    slug: 'devops-cloud-aws',
    subtitle: 'Deploy highly resilient applications. Master Terraform scripting, Docker containers, IAM, and GitHub CI/CD webhooks.',
    description: 'Scale systems with confidence. Learn practical infra-as-code scripting to instantiate server stacks, optimize container footprints, deploy continuous code checks, protect microservices, and limit cost overheads.',
    rating: 4.8,
    reviewCount: 65,
    enrolledCount: 180,
    category: CourseCategory.TECHNOLOGY,
    level: CourseLevel.ADVANCED,
    format: CourseFormat.COHORT,
    price: 140000,
    oldPrice: 190000,
    durationHours: 36,
    durationWeeks: 6,
    cohortDates: ['July 22, 2026'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop',
    isFeatured: false,
    learningOutcomes: [
      'Provision multi-region server arrays on AWS through code.',
      'Containerize applications using lightweight Dockerfiles.',
      'Design fully continuous delivery pipelines (GitHub Actions).',
      'Secure web ingress channels using SSL certification.',
      'Integrate automatic resource scaling and health telemetry.'
    ],
    targetAudience: [
      'Backend developers looking to master advanced hosting automation.',
      'System administrators wanting to transition into high-paying DevOps salaries.',
      'Tech leads looking to build secure, cloud-native deployments for their startups.'
    ],
    instructorId: 'tunde-lambo',
    syllabus: [
      {
        id: 'do-m1',
        title: 'Module 1: Compute & Containers',
        lessons: [
          { id: 'do-l1', title: 'Virtual Computing on AWS & VPC setups', duration: '60 mins', isPreview: true },
          { id: 'do-l2', title: 'Dockerizing Express APIs & React SPAs', duration: '80 mins' }
        ]
      }
    ]
  },
  {
    id: 'backend-api-nodejs',
    title: 'Backend API Development with Node.js',
    slug: 'backend-api-nodejs',
    subtitle: 'Develop blazing fast REST & GraphQL APIs to handle scalable authentication, database pipelines, and background queues.',
    description: 'Master backend software design. Understand server routing, write secure database queries, set up token login systems, write middle functions, and manage background systems.',
    rating: 4.8,
    reviewCount: 55,
    enrolledCount: 155,
    category: CourseCategory.TECHNOLOGY,
    level: CourseLevel.INTERMEDIATE,
    format: CourseFormat.SELF_PACED,
    price: 90000,
    oldPrice: 120000,
    durationHours: 32,
    durationWeeks: 6,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop',
    isFeatured: false,
    learningOutcomes: [
      'Develop modular Web servers using Express and NestJS formats.',
      'Execute database migrations with security and type definitions.',
      'Implement JWT token authentication & encrypt passwords.',
      'Coordinate real-time integrations using socket routers.',
      'Write comprehensive software suites to test APIs before deployment.'
    ],
    targetAudience: [
      'Frontend developers wanting to control full-stack server state.',
      'Junior database developers wanting to expand into backend scripting.',
      'Software engineering students seeking real-world software templates.'
    ],
    instructorId: 'tunde-lambo',
    syllabus: [
      {
        id: 'be-m1',
        title: 'Module 1: Server Architecture in Node',
        lessons: [
          { id: 'be-l1', title: 'Node Event Loop & Non-blocking I/O', duration: '45 mins', isPreview: true },
          { id: 'be-l2', title: 'Express Routing & Middlewares', duration: '70 mins' }
        ]
      }
    ]
  },
  {
    id: 'digital-product-strategy',
    title: 'Digital Product Strategy',
    slug: 'digital-product-strategy',
    subtitle: 'Scale commercial impact. Learn how to map markets, draft roadmaps, and navigate organizational complexity.',
    description: 'Build strategic products. Discover how to identify commercial opportunities, align stakeholders, design high-impact experimentation, and drive customer delight.',
    rating: 4.7,
    reviewCount: 41,
    enrolledCount: 120,
    category: CourseCategory.BUSINESS,
    level: CourseLevel.ADVANCED,
    format: CourseFormat.COHORT,
    price: 115000,
    oldPrice: 160000,
    durationHours: 24,
    durationWeeks: 4,
    cohortDates: ['August 5, 2026'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
    isFeatured: false,
    learningOutcomes: [
      'Formulate comprehensive product roadmaps tied to commercial growth objectives.',
      'Determine user onboarding optimization plans.',
      'Integrate design frameworks with market constraints.',
      'Lead cross-functional engineering and commercial alignments.'
    ],
    targetAudience: [
      'Mid-level Product Managers preparing for Director roles.',
      'Management Consultants seeking tech-industry updates.',
      'Enterprise product strategists.'
    ],
    instructorId: 'oluwaseun-alabi',
    syllabus: [
      {
        id: 'ps-m1',
        title: 'Module 1: Commercial Product Strategy',
        lessons: [
          { id: 'ps-l1', title: 'Evaluating Market Sizes & White Spaces', duration: '55 mins', isPreview: true },
          { id: 'ps-l2', title: 'Stakeholder Alignment Frameworks', duration: '80 mins' }
        ]
      }
    ]
  },
  {
    id: 'mobile-flutter',
    title: 'Mobile App Development with Flutter',
    slug: 'mobile-flutter',
    subtitle: 'Author natively compiled cross-platform iOS and Android mobile software from a single codebase using Dart.',
    description: 'Learn modern mobile UI engineering. Go from zero Dart code to complete mobile layouts, customized navigation, offline storage integrations, notifications, and store uploads.',
    rating: 4.6,
    reviewCount: 38,
    enrolledCount: 98,
    category: CourseCategory.TECHNOLOGY,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.SELF_PACED,
    price: 80000,
    oldPrice: 110000,
    durationHours: 36,
    durationWeeks: 6,
    thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop',
    isFeatured: false,
    learningOutcomes: [
      'Write Dart programs with robust types and list loops.',
      'Build responsive mobile screen variations for phone and tab layout designs.',
      'Manage global mobile states utilizing lightweight managers.',
      'Secure and cache customer profile data on local mobile files.',
      'Publish compiled packages to Apple App Store and Google Play Store.'
    ],
    targetAudience: [
      'Frontend designers wanted to build high-performance native apps.',
      'SaaS Founders wanting to launch native phone interfaces.',
      'Creative individuals seeking cross-platform programming skills.'
    ],
    instructorId: 'tunde-lambo',
    syllabus: [
      {
        id: 'fl-m1',
        title: 'Module 1: Dart Programming Core',
        lessons: [
          { id: 'fl-l1', title: 'Dart syntax, Class models & Interfaces', duration: '50 mins', isPreview: true },
          { id: 'fl-l2', title: 'Stateful vs Stateless Widgets in Flutter', duration: '75 mins' }
        ]
      }
    ]
  },
  {
    id: 'nocode-saas',
    title: 'No-Code SaaS Building & Automation',
    slug: 'nocode-saas',
    subtitle: 'Build fully custom databases and launch workflows without code. Master Bubble, Zapier, Webflow, and Airtable systems.',
    description: 'Learn logic and data management without code. Build robust customer web portals, schedule operational workflows, automate daily notifications, and integrate live payment systems.',
    rating: 4.8,
    reviewCount: 29,
    enrolledCount: 85,
    category: CourseCategory.CREATIVE,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.SELF_PACED,
    price: 65000,
    oldPrice: 90000,
    durationHours: 20,
    durationWeeks: 4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop',
    isFeatured: false,
    learningOutcomes: [
      'Design fully relational backends and databases inside Airtable.',
      'Create custom visual client interfaces on Softr and Flutterflow platforms.',
      'Engineer automated server background triggers inside Zapier and Make.',
      'Collect secure local payments linking Paystack to no-code web checkouts.',
      'Deploy custom responsive websites on Webflow with complete SEO.'
    ],
    targetAudience: [
      'Non-technical founders looking to validate ideas in weeks, not years.',
      'Product designers wishing to deliver fully active web platforms.',
      'Operations directors looking to automate repetitive data syncing tasks.'
    ],
    instructorId: 'oluwaseun-alabi',
    syllabus: [
      {
        id: 'nc-m1',
        title: 'Module 1: Database Logic & Data Syncs',
        lessons: [
          { id: 'nc-l1', title: 'Relational Airtable Database structures', duration: '50 mins', isPreview: true },
          { id: 'nc-l2', title: 'Zapier Automations: Trigger, Action, Filter paths', duration: '60 mins' }
        ]
      }
    ]
  },
  {
    id: 'brand-storytelling',
    title: 'Brand Storytelling & Copywriting',
    slug: 'brand-storytelling',
    subtitle: 'Write high-converting website headers, click-worthy email courses, and high-impact LinkedIn lead content.',
    description: 'Learn the principles of modern copywriting. Drive customer conversions by utilizing clear language, narrative hooks, call-to-actions, and professional brand stories.',
    rating: 4.9,
    reviewCount: 22,
    enrolledCount: 74,
    category: CourseCategory.CREATIVE,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.SELF_PACED,
    price: 55000,
    oldPrice: 75000,
    durationHours: 18,
    durationWeeks: 4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop',
    isFeatured: false,
    learningOutcomes: [
      'Write highly readable, high-converting hooks for web structures.',
      'Design comprehensive automated cold and warm business email sequences.',
      'Formulate authority-building professional articles for LinkedIn.',
      'Structure memorable brand messaging kits for startups.'
    ],
    targetAudience: [
      'Digital marketers, visual designers, and PR specialists.',
      'Freelancers wanting to command higher pricing for copywriting consulting.',
      'Founders wanting to pitch their startup story clearly to clients and investors.'
    ],
    instructorId: 'oluwaseun-alabi',
    syllabus: [
      {
        id: 'bs-m1',
        title: 'Module 1: Writing for the Digital Attention Span',
        lessons: [
          { id: 'bs-l1', title: 'The AIDA Formula (Attention, Interest, Desire, Action)', duration: '40 mins', isPreview: true },
          { id: 'bs-l2', title: 'Headline Framing & Avoiding Jargon Clutter', duration: '50 mins' }
        ]
      }
    ]
  }
];

export const TESTIMONIALS: { quote: string; name: string; profession: string; company: string; imageUrl: string }[] = [
  {
    quote: "SkillForge gave me the structural discipline I needed while balancing my full-time role at Access Bank. The coaches are actual industry heads, not just talking slides.",
    name: "Azeez Adekoya",
    profession: "Senior Data Analytics Associate",
    company: "Access Bank",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
  },
  {
    quote: "I was super skeptical about online cohorts in Nigeria due to power and internet, but everything is optimized! Sessions are recorded, the community Discord/WhatsApp is highly engaging, and the schedules are very respectful of work meetings.",
    name: "Bolaji Ogunlesi",
    profession: "Associate Product Lead",
    company: "MTN",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face"
  },
  {
    quote: "The UX Design training directly upgraded my agency's capabilities. I could literally justify our new and higher service fees to our clients within one month of applying Seun's Figma playbooks.",
    name: "Kelechi Okafor",
    profession: "Creative Director",
    company: "Spire Studio",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face"
  }
];

export const FAQS = [
  {
    question: "Can I pay in instalments?",
    answer: "Yes. To help working professionals easily budget their learning, we offer a straightforward 50/50 split payment schedule on any course priced above ₦80,000. You pay half during enrolment to lock your seat, and the remaining half at the midpoint of your course schedule."
  },
  {
    question: "Is there a refund policy?",
    answer: "Absolutely. We are highly committed to practical quality. You can request a full, 100% money-back refund within 7 days of course commencement, provided you have completed less than 20% of the active modules."
  },
  {
    question: "Do I get lifetime access?",
    answer: "Yes! Once you enrol and pay for any course, you get complete, uninterrupted lifetime access to all core curriculum videos, files, templates, worksheets, and updates — even after you graduate."
  },
  {
    question: "Are certificates recognised by employers?",
    answer: "Yes, our certificates are heavily recognized. SkillForge graduates work at Nigeria's top fintechs, banks, and consultancies (like Flutterwave, Access Bank, MTN, and PwC). We co-develop our curricula directly alongside these major hiring partners to ensure our grading is practical and industry-trusted."
  }
];
