import { create } from 'zustand';
import { Exam, Question } from '../types';
import { examDB } from '../lib/db';

interface ExamState {
  exams: Exam[];
  currentExam: Exam | null;
  questions: Question[];
  loading: boolean;
  error: string | null;

  loadExams: () => Promise<void>;
  selectExam: (examId: string) => Promise<void>;
  loadQuestions: (examId: string) => Promise<void>;
  deleteExam: (examId: string) => Promise<void>;
  clearError: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
  exams: [],
  currentExam: null,
  questions: [],
  loading: false,
  error: null,

  loadExams: async () => {
    set({ loading: true, error: null });
    try {
      const exams = await examDB.getAllExams();
      set({ exams, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  selectExam: async (examId: string) => {
    set({ loading: true, error: null });
    try {
      const exam = await examDB.getExam(examId);
      if (exam) {
        const questions = await examDB.getQuestions(examId);
        set({ currentExam: exam, questions, loading: false });
      } else {
        set({ error: 'Exam not found', loading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  loadQuestions: async (examId: string) => {
    try {
      const questions = await examDB.getQuestions(examId);
      set({ questions });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteExam: async (examId: string) => {
    set({ loading: true, error: null });
    try {
      await examDB.deleteExam(examId);
      const { exams, currentExam } = get();
      set({
        exams: exams.filter(e => e.id !== examId),
        currentExam: currentExam?.id === examId ? null : currentExam,
        loading: false
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
