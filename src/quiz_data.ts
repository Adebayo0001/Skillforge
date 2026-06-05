export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseSlug: string;
  lessonId: string;
  questions: QuizQuestion[];
  passPercentage: number;
}

export const QUIZZES: Quiz[] = [
  // Data Analysis with Python - Lesson 1
  {
    id: "da-q1",
    title: "Python Syntax & Dynamic Variables Quiz",
    courseSlug: "data-analysis-python",
    lessonId: "da-l1",
    passPercentage: 70,
    questions: [
      {
        id: "da-q1-1",
        text: "Which of the following is an invalid variable name in Python?",
        options: ["_employee_age", "employeeId_7", "7_employeeName", "EMPLOYEE_ROLE"],
        correctIndex: 2,
        explanation: "In Python, variable names cannot start with numbers. Starting a variable name with '7' results in a SyntaxError."
      },
      {
        id: "da-q1-2",
        text: "How do you check the data type of a variable x in Python?",
        options: ["type(x)", "typeof(x)", "x.dataType()", "printType(x)"],
        correctIndex: 0,
        explanation: "The built-in function type() is used in Python to return the class or data type of the passed object."
      },
      {
        id: "da-q1-3",
        text: "What is the output of print(type(12.5)) in Python?",
        options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'decimal'>"],
        correctIndex: 1,
        explanation: "Numbers with a decimal point in Python are represented as floating-point numbers of the 'float' class."
      }
    ]
  },
  // Data Analysis with Python - Lesson 2
  {
    id: "da-q2",
    title: "Data Structures & Loops Quiz",
    courseSlug: "data-analysis-python",
    lessonId: "da-l2",
    passPercentage: 70,
    questions: [
      {
        id: "da-q2-1",
        text: "Which Python data structure is mutable and uses square brackets []?",
        options: ["Tuple", "Dictionary", "Set", "List"],
        correctIndex: 3,
        explanation: "Lists are mutable, ordered collection structures in Python declared using square brackets []."
      },
      {
        id: "da-q2-2",
        text: "How do you add a new item 'Lagos' to an existing list named sales_cities?",
        options: ["sales_cities.add('Lagos')", "sales_cities.push('Lagos')", "sales_cities.append('Lagos')", "sales_cities.insertElement('Lagos')"],
        correctIndex: 2,
        explanation: "The append() method is used to add an item to the end of a list in Python."
      }
    ]
  },
  // Product Management Fundamentals - Lesson 1
  {
    id: "pm-q1",
    title: "Fintech PM Role & Agile Discovery Quiz",
    courseSlug: "product-management-fundamentals",
    lessonId: "pm-l1",
    passPercentage: 80,
    questions: [
      {
        id: "pm-q1-1",
        text: "What does PRD stand for in Product Management?",
        options: ["Project Requirement Database", "Product Requirement Document", "Performance Review Dashboard", "Pricing Rationalization Details"],
        correctIndex: 1,
        explanation: "A PRD is a 'Product Requirement Document' that details the scope, value proposition, and requirements of a feature or product."
      },
      {
        id: "pm-q1-2",
        text: "Which metric is most critical for assessing user lifecycle value?",
        options: ["NPS (Net Promoter Score)", "DAU (Daily Active Users)", "LTV (Customer Lifetime Value)", "Bounce Rate"],
        correctIndex: 2,
        explanation: "LTV represents the total revenue a business can expect to earn from a customer over the duration of their relationship, making it essential for assessing unit economics."
      }
    ]
  },
  // UI/UX Design Masterclass - Lesson 1
  {
    id: "ui-q1",
    title: "Hierarchy, Positive Space & Layout Quiz",
    courseSlug: "ui-ux-design-masterclass",
    lessonId: "ui-l1",
    passPercentage: 70,
    questions: [
      {
        id: "ui-q1-1",
        text: "Which Tailwind utility class is used to establish negative space between items in a Flexbox column layout?",
        options: ["space-x-4", "gap-y-4", "padding-col-4", "flex-spacing-4"],
        correctIndex: 1,
        explanation: "In Tailwind CSS, gap-y-4 applies spacing along the vertical axis between adjacent items in a flex or grid layout."
      },
      {
        id: "ui-q1-2",
        text: "What is the primary advantage of utilizing high negative space (white space) in digital forms?",
        options: ["It reduces server cognitive load", "It increases conversion rates by decreasing visual clutter", "It reduces download size", "It guarantees multi-browser compatibility"],
        correctIndex: 1,
        explanation: "Negative space isolates elements and coordinates reading flow, which reduces cognitive strain and uplifts usability on transaction forms."
      }
    ]
  },
  // Frontend Web Development with React - Lesson 1
  {
    id: "fe-q1",
    title: "Promises & Async/Await Routing Quiz",
    courseSlug: "frontend-web-dev",
    lessonId: "fe-l1",
    passPercentage: 70,
    questions: [
      {
        id: "fe-q1-1",
        text: "Which array method returns a brand new array modified by a mapping function?",
        options: ["forEach()", "map()", "filter()", "reduce()"],
        correctIndex: 1,
        explanation: "The map() method creates a new array populated with the results of calling a provided function on every element in the calling array."
      },
      {
        id: "fe-q1-2",
        text: "What state is a JS Promise in initially during an api fetch call?",
        options: ["Resolved", "Pending", "Rejected", "Settled"],
        correctIndex: 1,
        explanation: "Initially, a Promise is in the 'pending' state until it either resolves (succeeds) or rejects (fails)."
      }
    ]
  }
];

// Helper to generate a default fallback quiz for any lesson
export function getOrCreateLessonQuiz(courseSlug: string, lessonId: string, lessonTitle: string): Quiz {
  const existing = QUIZZES.find(q => q.courseSlug === courseSlug && q.lessonId === lessonId);
  if (existing) return existing;

  // Generate deterministic fun questions based on the lesson title
  return {
    id: `quiz-gen-${lessonId}`,
    title: `${lessonTitle} Practice Assessment`,
    courseSlug,
    lessonId,
    passPercentage: 75,
    questions: [
      {
        id: `q-gen-${lessonId}-1`,
        text: `What is the primary objective of understanding ${lessonTitle}?`,
        options: [
          "To automate mechanical processes and upgrade career efficiency",
          "To memorize static definitions for academic examinations",
          "To comply with outdated regulatory standards",
          "To replicate generic templates without contextual adaptations"
        ],
        correctIndex: 0,
        explanation: `Mastering ${lessonTitle} enables high-performance professional execution and career mobility in modern workspaces.`
      },
      {
        id: `q-gen-${lessonId}-2`,
        text: `Which of the following represents an industry-standard best practice associated with ${lessonTitle}?`,
        options: [
          "Avoiding standard tools and writing all frameworks from raw code",
          "Rigorous testing, dynamic feedback logging, and human-centric feedback loops",
          "Conducting sprints without setting baseline performance criteria",
          "De-prioritizing documentation for rapid code releases"
        ],
        correctIndex: 1,
        explanation: "Human-centric feedback, peer validations, and telemetry logs provide high quality and long-term stability in technical outputs."
      },
      {
        id: `q-gen-${lessonId}-3`,
        text: `How should a practitioner approach scaling skills learned in ${lessonTitle}?`,
        options: [
          "By remaining in single-user setups indefinitely",
          "By studying theories alone and avoiding hand-on sandbox executions",
          "By building real portfolio trackers, seeking peer reviews, and configuring durable tools",
          "By relying solely on default settings without optimizing classes"
        ],
        correctIndex: 2,
        explanation: "Hands-on projects and peer synchronization logs are the single fastest route to enterprise competence."
      }
    ]
  };
}
