export type Category =
  | 'Everyday Science'
  | 'Technology'
  | 'Engineering'
  | 'Health and Nutrition'
  | 'Environment'
  | 'Economics and Money'
  | 'Society and Human Behaviour'
  | 'Art and Design';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Subject {
  id: string;
  name: string;
  iconName: string;
  description: string;
  topics: string[];
  conceptCount: number;
  color?: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface WorkedExample {
  problem: string;
  solution: string;
  steps: string[];
}

export interface RealWorldExample {
  title: string;
  context: string;
  whyItMatters: string;
  badge?: string;
}

export interface ApplyOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface Concept {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  category: Category;
  difficulty: Difficulty;
  readingTime: string;
  shortDescription: string;
  learn: {
    definition: string;
    textbookExplanation: string;
    keyTerms: KeyTerm[];
    formula?: string;
    formulaExplanation?: string;
    workedExample?: WorkedExample;
    keyTakeaways: string[];
  };
  connect: {
    realWorldSummary: string;
    examples: RealWorldExample[];
    diagramType?: string;
  };
  apply: {
    problemStatement: string;
    scenario: string;
    questionType: 'multiple-choice' | 'calculation';
    options?: ApplyOption[];
    explanation: string;
  };
  simulationId?: 'ohms-law' | 'mechanical-lever' | 'probability' | 'energy-calc';
  relatedConceptIds: string[];
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  topic: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  realWorldContext?: string;
}

export interface QuizAttempt {
  id: string;
  userId?: string;
  subjectId: string;
  topic: string;
  score: number;
  totalQuestions: number;
  incorrectQuestionIds: string[];
  completedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface UserProgress {
  completedConceptIds: string[];
  bookmarkedConceptIds: string[];
  quizAttempts: QuizAttempt[];
  lastActiveAt: string;
}
