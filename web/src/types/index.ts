// 考试定义
export interface Exam {
  id: string;
  name: string;
  code: string;
  provider: string;
  language: string;
  description?: string;
  totalQuestions: number;
  passingScore: number;
  examTime: number;
  domains: Domain[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// 领域/章节
export interface Domain {
  id: number;
  name: string;
  nameLocalized?: string;
  weight: number;
  questionCount?: number;
}

// 题目
export interface Question {
  id: string;
  examId: string;
  setNumber: number;
  domain: number;
  question: string;
  questionHtml?: string;
  options: Record<string, string>;
  answer: string | string[];
  answerType: 'single' | 'multiple';
  explanation: string;
  explanationHtml?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

// 用户答题记录
export interface QuizSession {
  id: string;
  odId: string;
  examId: string;
  mode: 'practice' | 'exam';
  questions: string[];
  answers: Record<string, string | string[]>;
  startTime: string;
  endTime?: string;
  score?: number;
  completed: boolean;
}

// 错题记录
export interface WrongAnswer {
  id: string;
  odId: string;
  examId: string;
  questionId: string;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  wrongCount: number;
  lastWrongAt: string;
  mastered: boolean;
}

// 用户信息
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google';
  createdAt: string;
}

// 导入的题库数据格式
export interface ExamImportData {
  exam: Omit<Exam, 'createdAt' | 'updatedAt'>;
  questions: Omit<Question, 'examId'>[];
}
