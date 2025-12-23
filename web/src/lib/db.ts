import Dexie, { Table } from 'dexie';
import { Exam, Question, QuizSession, WrongAnswer, User } from '../types';

export class StudyForgeDB extends Dexie {
  exams!: Table<Exam>;
  questions!: Table<Question>;
  quizSessions!: Table<QuizSession>;
  wrongAnswers!: Table<WrongAnswer>;
  users!: Table<User>;

  constructor() {
    super('StudyForgeDB');

    this.version(1).stores({
      exams: 'id, provider, language, code',
      questions: 'id, examId, domain, setNumber, [examId+domain], [examId+setNumber]',
      quizSessions: 'id, odId, examId, startTime',
      wrongAnswers: 'id, odId, examId, questionId, [examId+odId]',
      users: 'id, email'
    });
  }
}

export const db = new StudyForgeDB();

// 考试相关操作
export const examDB = {
  async getAllExams(): Promise<Exam[]> {
    return db.exams.toArray();
  },

  async getExam(id: string): Promise<Exam | undefined> {
    return db.exams.get(id);
  },

  async importExam(exam: Exam, questions: Question[]): Promise<void> {
    await db.transaction('rw', [db.exams, db.questions], async () => {
      await db.exams.put(exam);
      await db.questions.bulkPut(questions);
    });
  },

  async getQuestions(examId: string): Promise<Question[]> {
    return db.questions.where('examId').equals(examId).toArray();
  },

  async getQuestionsBySet(examId: string, setNumber: number): Promise<Question[]> {
    return db.questions.where({ examId, setNumber }).toArray();
  },

  async getQuestionsByDomain(examId: string, domain: number): Promise<Question[]> {
    return db.questions.where({ examId, domain }).toArray();
  },

  async deleteExam(examId: string): Promise<void> {
    await db.transaction('rw', [db.exams, db.questions, db.wrongAnswers, db.quizSessions], async () => {
      await db.exams.delete(examId);
      await db.questions.where('examId').equals(examId).delete();
      await db.wrongAnswers.where('examId').equals(examId).delete();
      await db.quizSessions.where('examId').equals(examId).delete();
    });
  }
};

// 错题相关操作
export const wrongDB = {
  async addWrongAnswer(wrong: WrongAnswer): Promise<void> {
    const existing = await db.wrongAnswers
      .where({ examId: wrong.examId, questionId: wrong.questionId })
      .first();

    if (existing) {
      await db.wrongAnswers.update(existing.id, {
        wrongCount: existing.wrongCount + 1,
        lastWrongAt: new Date().toISOString(),
        userAnswer: wrong.userAnswer
      });
    } else {
      await db.wrongAnswers.add(wrong);
    }
  },

  async getWrongAnswers(examId: string): Promise<WrongAnswer[]> {
    return db.wrongAnswers.where('examId').equals(examId).toArray();
  },

  async getUnmasteredWrongAnswers(examId: string): Promise<WrongAnswer[]> {
    return db.wrongAnswers
      .where('examId')
      .equals(examId)
      .filter(w => !w.mastered)
      .toArray();
  },

  async markMastered(id: string): Promise<void> {
    await db.wrongAnswers.update(id, { mastered: true });
  },

  async deleteWrongAnswer(id: string): Promise<void> {
    await db.wrongAnswers.delete(id);
  }
};

// 答题会话相关操作
export const sessionDB = {
  async createSession(session: QuizSession): Promise<void> {
    await db.quizSessions.add(session);
  },

  async updateSession(id: string, updates: Partial<QuizSession>): Promise<void> {
    await db.quizSessions.update(id, updates);
  },

  async getSession(id: string): Promise<QuizSession | undefined> {
    return db.quizSessions.get(id);
  },

  async getSessionsByExam(examId: string): Promise<QuizSession[]> {
    return db.quizSessions.where('examId').equals(examId).toArray();
  }
};
