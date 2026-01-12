import Dexie, { Table } from 'dexie';
import {
  Exam,
  Question,
  QuizSession,
  WrongAnswer,
  User,
  Note,
  FlashcardDeck,
  Flashcard,
  FlashcardReview,
  ChatSession,
  ChatMessage,
  KidsProgress,
  KidsAchievement,
  KidsDailyTask
} from '../types';

export class StudyForgeDB extends Dexie {
  exams!: Table<Exam>;
  questions!: Table<Question>;
  quizSessions!: Table<QuizSession>;
  wrongAnswers!: Table<WrongAnswer>;
  users!: Table<User>;
  // 笔记、闪卡、聊天表
  notes!: Table<Note>;
  flashcardDecks!: Table<FlashcardDeck>;
  flashcards!: Table<Flashcard>;
  flashcardReviews!: Table<FlashcardReview>;
  chatSessions!: Table<ChatSession>;
  chatMessages!: Table<ChatMessage>;
  // 儿童课程表
  kidsProgress!: Table<KidsProgress>;
  kidsAchievements!: Table<KidsAchievement>;
  kidsDailyTasks!: Table<KidsDailyTask>;

  constructor() {
    super('StudyForgeDB');

    this.version(1).stores({
      exams: 'id, provider, language, code',
      questions: 'id, examId, domain, setNumber, [examId+domain], [examId+setNumber]',
      quizSessions: 'id, odId, examId, startTime',
      wrongAnswers: 'id, odId, examId, questionId, [examId+odId]',
      users: 'id, email'
    });

    // 版本2：添加笔记、闪卡、聊天表
    this.version(2).stores({
      exams: 'id, provider, language, code',
      questions: 'id, examId, domain, setNumber, [examId+domain], [examId+setNumber]',
      quizSessions: 'id, odId, examId, startTime',
      wrongAnswers: 'id, odId, examId, questionId, [examId+odId]',
      users: 'id, email',
      notes: 'id, pageId, examId, questionId, *tags, createdAt, updatedAt',
      flashcardDecks: 'id, category, createdAt',
      flashcards: 'id, deckId, *tags, createdAt',
      flashcardReviews: 'id, cardId, nextReview',
      chatSessions: 'id, pageContext, createdAt',
      chatMessages: 'id, sessionId, role, timestamp'
    });

    // 版本3：添加儿童课程表
    this.version(3).stores({
      exams: 'id, provider, language, code',
      questions: 'id, examId, domain, setNumber, [examId+domain], [examId+setNumber]',
      quizSessions: 'id, odId, examId, startTime',
      wrongAnswers: 'id, odId, examId, questionId, [examId+odId]',
      users: 'id, email',
      notes: 'id, pageId, examId, questionId, *tags, createdAt, updatedAt',
      flashcardDecks: 'id, category, createdAt',
      flashcards: 'id, deckId, *tags, createdAt',
      flashcardReviews: 'id, cardId, nextReview',
      chatSessions: 'id, pageContext, createdAt',
      chatMessages: 'id, sessionId, role, timestamp',
      // 儿童课程进度
      kidsProgress: 'id, lessonId, status',
      kidsAchievements: 'id, level, totalStars',
      kidsDailyTasks: 'id, date'
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

// 笔记相关操作
export const noteDB = {
  async createNote(note: Note): Promise<string> {
    return db.notes.add(note);
  },

  async updateNote(id: string, updates: Partial<Note>): Promise<void> {
    await db.notes.update(id, { ...updates, updatedAt: new Date().toISOString() });
  },

  async deleteNote(id: string): Promise<void> {
    await db.notes.delete(id);
  },

  async getNote(id: string): Promise<Note | undefined> {
    return db.notes.get(id);
  },

  async getAllNotes(): Promise<Note[]> {
    return db.notes.orderBy('updatedAt').reverse().toArray();
  },

  async getNotesByPage(pageId: string): Promise<Note[]> {
    return db.notes.where('pageId').equals(pageId).toArray();
  },

  async getNotesByExam(examId: string): Promise<Note[]> {
    return db.notes.where('examId').equals(examId).toArray();
  },

  async searchNotes(query: string): Promise<Note[]> {
    const lowerQuery = query.toLowerCase();
    return db.notes.filter(note =>
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery)
    ).toArray();
  }
};

// 闪卡卡组相关操作
export const deckDB = {
  async createDeck(deck: FlashcardDeck): Promise<string> {
    return db.flashcardDecks.add(deck);
  },

  async updateDeck(id: string, updates: Partial<FlashcardDeck>): Promise<void> {
    await db.flashcardDecks.update(id, { ...updates, updatedAt: new Date().toISOString() });
  },

  async deleteDeck(id: string): Promise<void> {
    await db.transaction('rw', [db.flashcardDecks, db.flashcards, db.flashcardReviews], async () => {
      // 删除卡组下的所有卡片和复习记录
      const cards = await db.flashcards.where('deckId').equals(id).toArray();
      for (const card of cards) {
        await db.flashcardReviews.where('cardId').equals(card.id).delete();
      }
      await db.flashcards.where('deckId').equals(id).delete();
      await db.flashcardDecks.delete(id);
    });
  },

  async getDeck(id: string): Promise<FlashcardDeck | undefined> {
    return db.flashcardDecks.get(id);
  },

  async getAllDecks(): Promise<FlashcardDeck[]> {
    return db.flashcardDecks.orderBy('createdAt').reverse().toArray();
  },

  async updateCardCount(deckId: string): Promise<void> {
    const count = await db.flashcards.where('deckId').equals(deckId).count();
    await db.flashcardDecks.update(deckId, { cardCount: count });
  }
};

// 闪卡相关操作
export const flashcardDB = {
  async createCard(card: Flashcard): Promise<string> {
    const id = await db.flashcards.add(card);
    await deckDB.updateCardCount(card.deckId);
    // 创建初始复习记录
    await db.flashcardReviews.add({
      id: `review-${id}`,
      cardId: id,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReview: new Date().toISOString()
    });
    return id;
  },

  async updateCard(id: string, updates: Partial<Flashcard>): Promise<void> {
    await db.flashcards.update(id, updates);
  },

  async deleteCard(id: string): Promise<void> {
    const card = await db.flashcards.get(id);
    if (card) {
      await db.flashcardReviews.where('cardId').equals(id).delete();
      await db.flashcards.delete(id);
      await deckDB.updateCardCount(card.deckId);
    }
  },

  async getCard(id: string): Promise<Flashcard | undefined> {
    return db.flashcards.get(id);
  },

  async getCardsByDeck(deckId: string): Promise<Flashcard[]> {
    return db.flashcards.where('deckId').equals(deckId).toArray();
  },

  async getDueCards(deckId?: string): Promise<Flashcard[]> {
    const now = new Date().toISOString();
    const dueReviews = await db.flashcardReviews
      .where('nextReview')
      .belowOrEqual(now)
      .toArray();

    const cardIds = dueReviews.map(r => r.cardId);
    let cards = await db.flashcards.where('id').anyOf(cardIds).toArray();

    if (deckId) {
      cards = cards.filter(c => c.deckId === deckId);
    }

    return cards;
  },

  async getReview(cardId: string): Promise<FlashcardReview | undefined> {
    return db.flashcardReviews.where('cardId').equals(cardId).first();
  },

  async updateReview(cardId: string, updates: Partial<FlashcardReview>): Promise<void> {
    const review = await db.flashcardReviews.where('cardId').equals(cardId).first();
    if (review) {
      await db.flashcardReviews.update(review.id, updates);
    }
  }
};

// 聊天相关操作
export const chatDB = {
  async createSession(session: ChatSession): Promise<string> {
    return db.chatSessions.add(session);
  },

  async updateSession(id: string, updates: Partial<ChatSession>): Promise<void> {
    await db.chatSessions.update(id, { ...updates, updatedAt: new Date().toISOString() });
  },

  async deleteSession(id: string): Promise<void> {
    await db.transaction('rw', [db.chatSessions, db.chatMessages], async () => {
      await db.chatMessages.where('sessionId').equals(id).delete();
      await db.chatSessions.delete(id);
    });
  },

  async getSession(id: string): Promise<ChatSession | undefined> {
    return db.chatSessions.get(id);
  },

  async getAllSessions(): Promise<ChatSession[]> {
    return db.chatSessions.orderBy('updatedAt').reverse().toArray();
  },

  async addMessage(message: ChatMessage): Promise<string> {
    const id = await db.chatMessages.add(message);
    await db.chatSessions.update(message.sessionId, { updatedAt: new Date().toISOString() });
    return id;
  },

  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    return db.chatMessages.where('sessionId').equals(sessionId).sortBy('timestamp');
  },

  async deleteMessage(id: string): Promise<void> {
    await db.chatMessages.delete(id);
  }
};

// 儿童课程进度相关操作
export const kidsDB = {
  // 进度操作
  async getProgress(lessonId: string): Promise<KidsProgress | undefined> {
    return db.kidsProgress.where('lessonId').equals(lessonId).first();
  },

  async getAllProgress(): Promise<KidsProgress[]> {
    return db.kidsProgress.toArray();
  },

  async updateProgress(lessonId: string, updates: Partial<KidsProgress>): Promise<void> {
    const existing = await db.kidsProgress.where('lessonId').equals(lessonId).first();
    if (existing) {
      await db.kidsProgress.update(existing.id, updates);
    } else {
      await db.kidsProgress.add({
        id: `progress-${lessonId}`,
        lessonId,
        status: 'available',
        starsEarned: 0,
        timeSpent: 0,
        ...updates
      });
    }
  },

  async completeLesson(lessonId: string, starsEarned: number, timeSpent: number): Promise<void> {
    await this.updateProgress(lessonId, {
      status: 'completed',
      starsEarned,
      timeSpent,
      completedAt: new Date().toISOString()
    });
  },

  async unlockLesson(lessonId: string): Promise<void> {
    await this.updateProgress(lessonId, { status: 'available' });
  },

  // 成就操作
  async getAchievement(): Promise<KidsAchievement | undefined> {
    return db.kidsAchievements.toCollection().first();
  },

  async initAchievement(): Promise<KidsAchievement> {
    const existing = await this.getAchievement();
    if (existing) return existing;

    const achievement: KidsAchievement = {
      id: 'main-achievement',
      totalStars: 0,
      level: 1,
      currentStreak: 0,
      badges: [],
      completedLessons: [],
      lastLearningDate: ''
    };
    await db.kidsAchievements.add(achievement);
    return achievement;
  },

  async updateAchievement(updates: Partial<KidsAchievement>): Promise<void> {
    const achievement = await this.getAchievement();
    if (achievement) {
      await db.kidsAchievements.update(achievement.id, updates);
    }
  },

  async addStars(stars: number): Promise<void> {
    const achievement = await this.getAchievement();
    if (achievement) {
      await db.kidsAchievements.update(achievement.id, {
        totalStars: achievement.totalStars + stars
      });
    }
  },

  async addBadge(badgeId: string): Promise<void> {
    const achievement = await this.getAchievement();
    if (achievement && !achievement.badges.includes(badgeId)) {
      await db.kidsAchievements.update(achievement.id, {
        badges: [...achievement.badges, badgeId]
      });
    }
  },

  async markLessonCompleted(lessonId: string): Promise<void> {
    const achievement = await this.getAchievement();
    if (achievement && !achievement.completedLessons.includes(lessonId)) {
      await db.kidsAchievements.update(achievement.id, {
        completedLessons: [...achievement.completedLessons, lessonId]
      });
    }
  },

  async updateStreak(): Promise<void> {
    const achievement = await this.getAchievement();
    if (!achievement) return;

    const today = new Date().toISOString().split('T')[0];
    const lastDate = achievement.lastLearningDate;

    if (lastDate === today) {
      // 今天已经学习过
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === yesterdayStr) {
      // 连续学习
      await db.kidsAchievements.update(achievement.id, {
        currentStreak: achievement.currentStreak + 1,
        lastLearningDate: today
      });
    } else {
      // 中断，重新开始
      await db.kidsAchievements.update(achievement.id, {
        currentStreak: 1,
        lastLearningDate: today
      });
    }
  },

  // 每日任务操作
  async getDailyTasks(date?: string): Promise<KidsDailyTask | undefined> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return db.kidsDailyTasks.where('date').equals(targetDate).first();
  },

  async createDailyTasks(tasks: KidsDailyTask): Promise<void> {
    const existing = await this.getDailyTasks(tasks.date);
    if (existing) {
      await db.kidsDailyTasks.update(existing.id, { tasks: tasks.tasks, date: tasks.date });
    } else {
      await db.kidsDailyTasks.add(tasks);
    }
  },

  async updateDailyTask(date: string, taskId: string, progress: number): Promise<void> {
    const dailyTask = await this.getDailyTasks(date);
    if (dailyTask) {
      const updatedTasks = dailyTask.tasks.map(task => {
        if (task.id === taskId) {
          const newProgress = Math.min(task.target, progress);
          return {
            ...task,
            progress: newProgress,
            completed: newProgress >= task.target
          };
        }
        return task;
      });
      await db.kidsDailyTasks.update(dailyTask.id, { tasks: updatedTasks });
    }
  },

  // 重置所有进度
  async resetAllProgress(): Promise<void> {
    await db.transaction('rw', [db.kidsProgress, db.kidsAchievements, db.kidsDailyTasks], async () => {
      await db.kidsProgress.clear();
      await db.kidsAchievements.clear();
      await db.kidsDailyTasks.clear();
    });
  }
};
