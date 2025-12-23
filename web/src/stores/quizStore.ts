import { create } from 'zustand';
import { Question, QuizSession, WrongAnswer } from '../types';
import { sessionDB, wrongDB } from '../lib/db';

interface QuizState {
  mode: 'practice' | 'exam' | null;
  sessionId: string | null;
  examId: string | null;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string | string[]>;
  markedQuestions: Set<string>;
  startTime: Date | null;
  timeRemaining: number;
  showResult: boolean;

  startQuiz: (
    mode: 'practice' | 'exam',
    examId: string,
    questions: Question[],
    timeLimit?: number
  ) => void;
  answerQuestion: (questionId: string, answer: string | string[]) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  toggleMark: (questionId: string) => void;
  submitQuiz: () => Promise<QuizResult>;
  resetQuiz: () => void;
  tick: () => void;
}

export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  score: number;
  wrongAnswers: WrongAnswer[];
  timeSpent: number;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function isAnswerCorrect(userAnswer: string | string[], correctAnswer: string | string[]): boolean {
  if (Array.isArray(correctAnswer)) {
    if (!Array.isArray(userAnswer)) return false;
    if (userAnswer.length !== correctAnswer.length) return false;
    const sortedUser = [...userAnswer].sort();
    const sortedCorrect = [...correctAnswer].sort();
    return sortedUser.every((a, i) => a === sortedCorrect[i]);
  }
  return userAnswer === correctAnswer;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  mode: null,
  sessionId: null,
  examId: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  markedQuestions: new Set(),
  startTime: null,
  timeRemaining: 0,
  showResult: false,

  startQuiz: (mode, examId, questions, timeLimit) => {
    const sessionId = generateId();
    const startTime = new Date();

    const session: QuizSession = {
      id: sessionId,
      odId: generateId(),
      examId,
      mode,
      questions: questions.map(q => q.id),
      answers: {},
      startTime: startTime.toISOString(),
      completed: false
    };

    sessionDB.createSession(session);

    set({
      mode,
      sessionId,
      examId,
      questions,
      currentIndex: 0,
      answers: {},
      markedQuestions: new Set(),
      startTime,
      timeRemaining: timeLimit ? timeLimit * 60 : 0,
      showResult: false
    });
  },

  answerQuestion: (questionId, answer) => {
    set(state => ({
      answers: { ...state.answers, [questionId]: answer }
    }));
  },

  goToQuestion: (index) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set({ currentIndex: index });
    }
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  toggleMark: (questionId) => {
    set(state => {
      const newMarked = new Set(state.markedQuestions);
      if (newMarked.has(questionId)) {
        newMarked.delete(questionId);
      } else {
        newMarked.add(questionId);
      }
      return { markedQuestions: newMarked };
    });
  },

  submitQuiz: async () => {
    const { sessionId, examId, questions, answers, startTime } = get();
    const endTime = new Date();
    const timeSpent = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0;

    let correctCount = 0;
    const wrongAnswersList: WrongAnswer[] = [];

    for (const question of questions) {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer && isAnswerCorrect(userAnswer, question.answer);

      if (isCorrect) {
        correctCount++;
      } else if (userAnswer) {
        const wrongAnswer: WrongAnswer = {
          id: generateId(),
          odId: generateId(),
          examId: examId!,
          questionId: question.id,
          userAnswer,
          correctAnswer: question.answer,
          wrongCount: 1,
          lastWrongAt: endTime.toISOString(),
          mastered: false
        };
        wrongAnswersList.push(wrongAnswer);
        await wrongDB.addWrongAnswer(wrongAnswer);
      }
    }

    const score = Math.round((correctCount / questions.length) * 100);

    if (sessionId) {
      await sessionDB.updateSession(sessionId, {
        answers,
        endTime: endTime.toISOString(),
        score,
        completed: true
      });
    }

    set({ showResult: true });

    return {
      totalQuestions: questions.length,
      correctCount,
      wrongCount: wrongAnswersList.length,
      score,
      wrongAnswers: wrongAnswersList,
      timeSpent
    };
  },

  resetQuiz: () => {
    set({
      mode: null,
      sessionId: null,
      examId: null,
      questions: [],
      currentIndex: 0,
      answers: {},
      markedQuestions: new Set(),
      startTime: null,
      timeRemaining: 0,
      showResult: false
    });
  },

  tick: () => {
    set(state => ({
      timeRemaining: Math.max(0, state.timeRemaining - 1)
    }));
  }
}));
