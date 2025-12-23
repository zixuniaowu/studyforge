import { useState, useEffect } from 'react';
import { db } from '../lib/db';
import { useLanguageStore } from '../stores/languageStore';

export interface StudyStats {
  totalSessions: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  unmasteredWrong: number;
  recentSessions: number;
  studyDays: number;
}

export function useStats() {
  const [stats, setStats] = useState<StudyStats>({
    totalSessions: 0,
    totalQuestions: 0,
    correctCount: 0,
    wrongCount: 0,
    accuracy: 0,
    unmasteredWrong: 0,
    recentSessions: 0,
    studyDays: 0,
  });
  const [loading, setLoading] = useState(true);
  const language = useLanguageStore(state => state.language);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Get all completed sessions
        const sessions = await db.quizSessions.toArray();
        const completedSessions = sessions.filter(s => s.completed);

        // Get exams for current language
        const langCode = language === 'ja' ? 'ja' : 'zh-CN';
        const exams = await db.exams.where('language').equals(langCode).toArray();
        const examIds = new Set(exams.map(e => e.id));

        // Filter sessions by current language exams
        const langSessions = completedSessions.filter(s => examIds.has(s.examId));

        // Calculate stats
        let totalQuestions = 0;
        let correctCount = 0;
        const studyDaysSet = new Set<string>();

        for (const session of langSessions) {
          const questionCount = session.questions.length;
          totalQuestions += questionCount;

          // Calculate correct answers from score
          if (session.score !== undefined) {
            correctCount += Math.round((session.score / 100) * questionCount);
          }

          // Track study days
          const date = session.startTime.split('T')[0];
          studyDaysSet.add(date);
        }

        const wrongCount = totalQuestions - correctCount;
        const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

        // Get unmastered wrong answers for current language
        const wrongAnswers = await db.wrongAnswers.toArray();
        const unmasteredWrong = wrongAnswers.filter(w => !w.mastered && examIds.has(w.examId)).length;

        // Recent sessions (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentSessions = langSessions.filter(
          s => new Date(s.startTime) >= sevenDaysAgo
        ).length;

        setStats({
          totalSessions: langSessions.length,
          totalQuestions,
          correctCount,
          wrongCount,
          accuracy,
          unmasteredWrong,
          recentSessions,
          studyDays: studyDaysSet.size,
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [language]);

  return { stats, loading };
}
