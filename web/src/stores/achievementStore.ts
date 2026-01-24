/**
 * 成就系统 Store
 * 管理用户成就进度和解锁
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Achievement, UserAchievement } from '../types/middleSchool';

// 成就定义
export const ACHIEVEMENTS: Achievement[] = [
  // 学习类成就
  {
    id: 'first_lesson',
    name: '初めの一歩',
    nameJa: '初めの一歩',
    description: 'Complete your first lesson',
    descriptionJa: '初めてのレッスンを完了する',
    icon: '🎯',
    category: 'learning',
    condition: { type: 'lessons_completed', target: 1 },
    points: 50,
    rarity: 'common',
  },
  {
    id: 'ten_lessons',
    name: '学習者',
    nameJa: '学習者',
    description: 'Complete 10 lessons',
    descriptionJa: '10レッスンを完了する',
    icon: '📚',
    category: 'learning',
    condition: { type: 'lessons_completed', target: 10 },
    points: 100,
    rarity: 'common',
  },
  {
    id: 'fifty_lessons',
    name: '熱心な生徒',
    nameJa: '熱心な生徒',
    description: 'Complete 50 lessons',
    descriptionJa: '50レッスンを完了する',
    icon: '🎓',
    category: 'learning',
    condition: { type: 'lessons_completed', target: 50 },
    points: 300,
    rarity: 'rare',
  },
  {
    id: 'hundred_lessons',
    name: '努力の達人',
    nameJa: '努力の達人',
    description: 'Complete 100 lessons',
    descriptionJa: '100レッスンを完了する',
    icon: '🏆',
    category: 'learning',
    condition: { type: 'lessons_completed', target: 100 },
    points: 500,
    rarity: 'epic',
  },
  {
    id: 'first_perfect',
    name: '完璧主義者',
    nameJa: '完璧主義者',
    description: 'Get 100% on a lesson',
    descriptionJa: 'レッスンで満点を取る',
    icon: '💯',
    category: 'learning',
    condition: { type: 'perfect_lessons', target: 1 },
    points: 100,
    rarity: 'common',
  },
  {
    id: 'ten_perfect',
    name: '満点コレクター',
    nameJa: '満点コレクター',
    description: 'Get 100% on 10 lessons',
    descriptionJa: '10レッスンで満点を取る',
    icon: '⭐',
    category: 'learning',
    condition: { type: 'perfect_lessons', target: 10 },
    points: 300,
    rarity: 'rare',
  },

  // 连续类成就
  {
    id: 'streak_7',
    name: '一週間の挑戦者',
    nameJa: '一週間の挑戦者',
    description: '7-day study streak',
    descriptionJa: '7日間連続で学習する',
    icon: '🔥',
    category: 'streak',
    condition: { type: 'streak_days', target: 7 },
    points: 200,
    rarity: 'common',
  },
  {
    id: 'streak_30',
    name: '継続の達人',
    nameJa: '継続の達人',
    description: '30-day study streak',
    descriptionJa: '30日間連続で学習する',
    icon: '💪',
    category: 'streak',
    condition: { type: 'streak_days', target: 30 },
    points: 500,
    rarity: 'rare',
  },
  {
    id: 'streak_100',
    name: '伝説の学習者',
    nameJa: '伝説の学習者',
    description: '100-day study streak',
    descriptionJa: '100日間連続で学習する',
    icon: '👑',
    category: 'streak',
    condition: { type: 'streak_days', target: 100 },
    points: 1000,
    rarity: 'legendary',
  },

  // 精通类成就
  {
    id: 'master_domain',
    name: '分野マスター',
    nameJa: '分野マスター',
    description: 'Achieve 90% accuracy in one domain',
    descriptionJa: '1つの分野で正答率90%以上を達成',
    icon: '🧠',
    category: 'mastery',
    condition: { type: 'domain_mastery', target: 90 },
    points: 300,
    rarity: 'rare',
  },
  {
    id: 'master_all_domains',
    name: '全分野制覇',
    nameJa: '全分野制覇',
    description: 'Achieve 90% accuracy in all domains',
    descriptionJa: '全分野で正答率90%以上を達成',
    icon: '🌟',
    category: 'mastery',
    condition: { type: 'all_domains_mastery', target: 90 },
    points: 1000,
    rarity: 'epic',
  },
  {
    id: 'challenge_master',
    name: 'チャレンジマスター',
    nameJa: 'チャレンジマスター',
    description: 'Complete 10 challenge problems',
    descriptionJa: 'チャレンジ問題を10問完了',
    icon: '🚀',
    category: 'mastery',
    condition: { type: 'challenges_completed', target: 10 },
    points: 500,
    rarity: 'epic',
  },

  // 特别成就
  {
    id: 'weekly_test_ace',
    name: '週テストエース',
    nameJa: '週テストエース',
    description: 'Score 90% or higher on a weekly test',
    descriptionJa: '週テストで90%以上を取る',
    icon: '📝',
    category: 'special',
    condition: { type: 'weekly_test_score', target: 90 },
    points: 300,
    rarity: 'rare',
  },
  {
    id: 'mock_exam_pass',
    name: '模試突破',
    nameJa: '模試突破',
    description: 'Pass a mock exam',
    descriptionJa: '模擬試験に合格する',
    icon: '🎌',
    category: 'special',
    condition: { type: 'mock_exam_pass', target: 1 },
    points: 500,
    rarity: 'rare',
  },
  {
    id: 'speed_demon',
    name: 'スピードスター',
    nameJa: 'スピードスター',
    description: 'Answer 10 questions correctly in under 5 minutes',
    descriptionJa: '5分以内に10問正解する',
    icon: '⚡',
    category: 'special',
    condition: { type: 'speed_challenge', target: 10 },
    points: 200,
    rarity: 'rare',
  },
  {
    id: 'comeback_kid',
    name: 'リベンジャー',
    nameJa: 'リベンジャー',
    description: 'Master 10 previously wrong questions',
    descriptionJa: '間違えた問題を10問克服する',
    icon: '💫',
    category: 'special',
    condition: { type: 'wrong_mastered', target: 10 },
    points: 300,
    rarity: 'rare',
  },
  {
    id: 'thousand_questions',
    name: '千問突破',
    nameJa: '千問突破',
    description: 'Answer 1000 questions',
    descriptionJa: '1000問に回答する',
    icon: '🏅',
    category: 'special',
    condition: { type: 'questions_answered', target: 1000 },
    points: 500,
    rarity: 'epic',
  },
  {
    id: 'early_bird',
    name: '朝活学習者',
    nameJa: '朝活学習者',
    description: 'Study before 7 AM for 7 days',
    descriptionJa: '7日間朝7時前に学習する',
    icon: '🌅',
    category: 'special',
    condition: { type: 'early_study', target: 7 },
    points: 200,
    rarity: 'rare',
  },
];

// 成就 Store 接口
interface AchievementState {
  userAchievements: UserAchievement[];
  totalUnlocked: number;

  // 统计数据（用于检查成就条件）
  stats: {
    lessonsCompleted: number;
    perfectLessons: number;
    currentStreak: number;
    longestStreak: number;
    questionsAnswered: number;
    questionsCorrect: number;
    challengesCompleted: number;
    wrongMastered: number;
    domainAccuracy: Record<string, number>;
    weeklyTestBestScore: number;
    mockExamsPassed: number;
    earlyStudyDays: number;
  };

  // Actions
  updateStats: (key: keyof AchievementState['stats'], value: number | Record<string, number>) => void;
  incrementStat: (key: keyof AchievementState['stats'], amount?: number) => void;
  checkAchievements: () => Achievement[];
  unlockAchievement: (achievementId: string) => boolean;
  getProgress: (achievementId: string) => UserAchievement | undefined;
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      userAchievements: ACHIEVEMENTS.map(a => ({
        achievementId: a.id,
        unlocked: false,
        progress: 0,
        currentValue: 0,
        targetValue: a.condition.target,
      })),
      totalUnlocked: 0,

      stats: {
        lessonsCompleted: 0,
        perfectLessons: 0,
        currentStreak: 0,
        longestStreak: 0,
        questionsAnswered: 0,
        questionsCorrect: 0,
        challengesCompleted: 0,
        wrongMastered: 0,
        domainAccuracy: {},
        weeklyTestBestScore: 0,
        mockExamsPassed: 0,
        earlyStudyDays: 0,
      },

      updateStats: (key, value) => {
        set(state => ({
          stats: {
            ...state.stats,
            [key]: value,
          },
        }));
        get().checkAchievements();
      },

      incrementStat: (key, amount = 1) => {
        set(state => ({
          stats: {
            ...state.stats,
            [key]: (state.stats[key] as number) + amount,
          },
        }));
        get().checkAchievements();
      },

      checkAchievements: () => {
        const { stats, userAchievements } = get();
        const newlyUnlocked: Achievement[] = [];

        const updatedAchievements = userAchievements.map(ua => {
          if (ua.unlocked) return ua;

          const achievement = ACHIEVEMENTS.find(a => a.id === ua.achievementId);
          if (!achievement) return ua;

          let currentValue = 0;
          let shouldUnlock = false;

          // 检查各种条件类型
          switch (achievement.condition.type) {
            case 'lessons_completed':
              currentValue = stats.lessonsCompleted;
              break;
            case 'perfect_lessons':
              currentValue = stats.perfectLessons;
              break;
            case 'streak_days':
              currentValue = stats.longestStreak;
              break;
            case 'questions_answered':
              currentValue = stats.questionsAnswered;
              break;
            case 'challenges_completed':
              currentValue = stats.challengesCompleted;
              break;
            case 'wrong_mastered':
              currentValue = stats.wrongMastered;
              break;
            case 'weekly_test_score':
              currentValue = stats.weeklyTestBestScore;
              break;
            case 'mock_exam_pass':
              currentValue = stats.mockExamsPassed;
              break;
            case 'early_study':
              currentValue = stats.earlyStudyDays;
              break;
            case 'domain_mastery':
              const accuracies = Object.values(stats.domainAccuracy);
              currentValue = accuracies.length > 0 ? Math.max(...accuracies) : 0;
              break;
            case 'all_domains_mastery':
              const allAccuracies = Object.values(stats.domainAccuracy);
              currentValue = allAccuracies.length > 0 ? Math.min(...allAccuracies) : 0;
              break;
          }

          shouldUnlock = currentValue >= achievement.condition.target;
          const progress = Math.min((currentValue / achievement.condition.target) * 100, 100);

          if (shouldUnlock && !ua.unlocked) {
            newlyUnlocked.push(achievement);
          }

          return {
            ...ua,
            currentValue,
            progress,
            unlocked: shouldUnlock || ua.unlocked,
            unlockedAt: shouldUnlock && !ua.unlocked ? new Date().toISOString() : ua.unlockedAt,
          };
        });

        if (newlyUnlocked.length > 0) {
          set({
            userAchievements: updatedAchievements,
            totalUnlocked: updatedAchievements.filter(a => a.unlocked).length,
          });
        }

        return newlyUnlocked;
      },

      unlockAchievement: (achievementId) => {
        const { userAchievements } = get();
        const index = userAchievements.findIndex(a => a.achievementId === achievementId);

        if (index === -1) return false;
        if (userAchievements[index].unlocked) return false;

        const updated = [...userAchievements];
        updated[index] = {
          ...updated[index],
          unlocked: true,
          unlockedAt: new Date().toISOString(),
          progress: 100,
        };

        set({
          userAchievements: updated,
          totalUnlocked: updated.filter(a => a.unlocked).length,
        });

        return true;
      },

      getProgress: (achievementId) => {
        return get().userAchievements.find(a => a.achievementId === achievementId);
      },

      getUnlockedAchievements: () => {
        const { userAchievements } = get();
        return ACHIEVEMENTS.filter(a =>
          userAchievements.find(ua => ua.achievementId === a.id && ua.unlocked)
        );
      },

      getLockedAchievements: () => {
        const { userAchievements } = get();
        return ACHIEVEMENTS.filter(a =>
          userAchievements.find(ua => ua.achievementId === a.id && !ua.unlocked)
        );
      },
    }),
    {
      name: 'studyforge-achievements',
      version: 1,
    }
  )
);

// 辅助函数：获取成就稀有度颜色
export function getAchievementRarityColor(rarity: Achievement['rarity']): string {
  const colors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500',
  };
  return colors[rarity];
}

// 辅助函数：获取成就稀有度文字
export function getAchievementRarityText(rarity: Achievement['rarity']): string {
  const texts = {
    common: 'コモン',
    rare: 'レア',
    epic: 'エピック',
    legendary: 'レジェンド',
  };
  return texts[rarity];
}
