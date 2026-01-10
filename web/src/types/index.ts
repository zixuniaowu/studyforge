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

// 学习笔记
export interface Note {
  id: string;
  pageId: string;       // 关联页面路径
  examId?: string;      // 可选：关联考试
  questionId?: string;  // 可选：关联题目
  title: string;
  content: string;      // Markdown 内容
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// 闪卡卡组
export interface FlashcardDeck {
  id: string;
  name: string;
  description?: string;
  category?: string;
  color: string;        // 卡组颜色主题
  cardCount: number;
  createdAt: string;
  updatedAt: string;
}

// 闪卡
export interface Flashcard {
  id: string;
  deckId: string;
  front: string;        // 问题面
  back: string;         // 答案面
  tags: string[];
  createdAt: string;
}

// 闪卡复习记录 (SM-2 算法)
export interface FlashcardReview {
  id: string;
  cardId: string;
  easeFactor: number;   // 难度因子，初始 2.5
  interval: number;     // 间隔天数
  repetitions: number;  // 连续正确次数
  nextReview: string;   // 下次复习时间
  lastReview?: string;  // 上次复习时间
}

// AI 聊天会话
export interface ChatSession {
  id: string;
  title: string;
  pageContext?: string; // 关联页面上下文
  createdAt: string;
  updatedAt: string;
}

// AI 聊天消息
export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
