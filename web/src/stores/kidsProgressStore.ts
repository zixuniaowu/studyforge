import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KidsProgress, KidsAchievement, KidsDailyTask, DailyTaskItem, KidsLesson } from '../types';
import { kidsDB } from '../lib/db';
import { kidsCourseUnits, kidsLevels, dailyTaskTemplates, getNextLesson, getAllLessons } from '../data/kidsCourse';

interface KidsProgressStore {
  // 状态
  progress: Record<string, KidsProgress>;
  achievement: KidsAchievement | null;
  dailyTasks: KidsDailyTask | null;
  currentLesson: KidsLesson | null;
  isLoading: boolean;

  // 初始化
  initialize: () => Promise<void>;

  // 进度操作
  loadProgress: () => Promise<void>;
  startLesson: (lesson: KidsLesson) => void;
  completeLesson: (lessonId: string, starsEarned: number, timeSpent: number) => Promise<void>;
  getLessonStatus: (lessonId: string) => 'locked' | 'available' | 'in-progress' | 'completed';

  // 成就操作
  loadAchievement: () => Promise<void>;
  addStars: (stars: number) => Promise<void>;
  addBadge: (badgeId: string) => Promise<void>;
  updateStreak: () => Promise<void>;
  checkLevelUp: () => Promise<{ leveledUp: boolean; newLevel: number }>;
  checkBadgeUnlock: (lessonId: string) => Promise<string[]>;

  // 每日任务
  loadDailyTasks: () => Promise<void>;
  updateDailyTaskProgress: (taskType: 'lesson' | 'exercise' | 'review' | 'quiz') => Promise<void>;

  // 统计
  getTotalStars: () => number;
  getCompletedLessonsCount: () => number;
  getCurrentStreak: () => number;
  getLevel: () => number;
  getLevelProgress: () => { current: number; next: number; progress: number };
}

export const useKidsProgressStore = create<KidsProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},
      achievement: null,
      dailyTasks: null,
      currentLesson: null,
      isLoading: false,

      initialize: async () => {
        set({ isLoading: true });
        try {
          // 初始化成就
          await kidsDB.initAchievement();

          // 加载所有数据
          await get().loadProgress();
          await get().loadAchievement();
          await get().loadDailyTasks();

          // 初始化第一课为可用状态
          const firstLesson = kidsCourseUnits[0]?.lessons[0];
          if (firstLesson) {
            const status = get().getLessonStatus(firstLesson.id);
            if (status === 'locked') {
              await kidsDB.unlockLesson(firstLesson.id);
              await get().loadProgress();
            }
          }
        } catch (error) {
          console.error('Failed to initialize kids progress:', error);
        }
        set({ isLoading: false });
      },

      loadProgress: async () => {
        try {
          const progressList = await kidsDB.getAllProgress();
          const progressMap: Record<string, KidsProgress> = {};
          progressList.forEach(p => {
            progressMap[p.lessonId] = p;
          });
          set({ progress: progressMap });
        } catch (error) {
          console.error('Failed to load progress:', error);
        }
      },

      startLesson: (lesson) => {
        set({ currentLesson: lesson });
        kidsDB.updateProgress(lesson.id, { status: 'in-progress' });
      },

      completeLesson: async (lessonId, starsEarned, timeSpent) => {
        try {
          // 更新课程进度
          await kidsDB.completeLesson(lessonId, starsEarned, timeSpent);
          await kidsDB.markLessonCompleted(lessonId);

          // 添加星星
          await get().addStars(starsEarned);

          // 更新连续学习
          await get().updateStreak();

          // 解锁下一课
          const next = getNextLesson(lessonId);
          if (next) {
            await kidsDB.unlockLesson(next.lesson.id);
          }

          // 更新每日任务
          await get().updateDailyTaskProgress('lesson');

          // 检查是否解锁徽章
          await get().checkBadgeUnlock(lessonId);

          // 检查升级
          await get().checkLevelUp();

          // 重新加载数据
          await get().loadProgress();
          await get().loadAchievement();

          set({ currentLesson: null });
        } catch (error) {
          console.error('Failed to complete lesson:', error);
        }
      },

      getLessonStatus: (lessonId) => {
        const { progress } = get();
        const lessonProgress = progress[lessonId];

        if (lessonProgress) {
          return lessonProgress.status;
        }

        // 检查是否是第一课
        const allLessons = getAllLessons();
        const lessonIndex = allLessons.findIndex(l => l.lesson.id === lessonId);

        if (lessonIndex === 0) {
          return 'available';
        }

        // 检查前一课是否完成
        if (lessonIndex > 0) {
          const prevLessonId = allLessons[lessonIndex - 1].lesson.id;
          const prevProgress = progress[prevLessonId];
          if (prevProgress?.status === 'completed') {
            return 'available';
          }
        }

        return 'locked';
      },

      loadAchievement: async () => {
        try {
          const achievement = await kidsDB.getAchievement();
          set({ achievement: achievement || null });
        } catch (error) {
          console.error('Failed to load achievement:', error);
        }
      },

      addStars: async (stars) => {
        await kidsDB.addStars(stars);
        await get().loadAchievement();
      },

      addBadge: async (badgeId) => {
        await kidsDB.addBadge(badgeId);
        await get().loadAchievement();
      },

      updateStreak: async () => {
        await kidsDB.updateStreak();
        await get().loadAchievement();
      },

      checkLevelUp: async () => {
        const { achievement } = get();
        if (!achievement) return { leveledUp: false, newLevel: 1 };

        const currentLevel = achievement.level;
        let newLevel = 1;

        for (const level of kidsLevels) {
          if (achievement.totalStars >= level.requiredStars) {
            newLevel = level.level;
          }
        }

        if (newLevel > currentLevel) {
          await kidsDB.updateAchievement({ level: newLevel });
          await get().loadAchievement();
          return { leveledUp: true, newLevel };
        }

        return { leveledUp: false, newLevel: currentLevel };
      },

      checkBadgeUnlock: async (lessonId) => {
        const { achievement } = get();
        if (!achievement) return [];

        const unlockedBadges: string[] = [];

        // 检查是否是第一课完成
        if (lessonId === 'lesson-1' && !achievement.badges.includes('first-step')) {
          await get().addBadge('first-step');
          unlockedBadges.push('first-step');
        }

        // 检查单元完成徽章
        for (let i = 0; i < kidsCourseUnits.length; i++) {
          const unit = kidsCourseUnits[i];
          const badgeId = `unit-${i + 1}-complete`;

          if (!achievement.badges.includes(badgeId)) {
            const allCompleted = unit.lessons.every(lesson =>
              achievement.completedLessons.includes(lesson.id)
            );

            if (allCompleted) {
              await get().addBadge(badgeId);
              unlockedBadges.push(badgeId);
            }
          }
        }

        // 检查连续学习徽章
        const streak = achievement.currentStreak;
        if (streak >= 3 && !achievement.badges.includes('streak-3')) {
          await get().addBadge('streak-3');
          unlockedBadges.push('streak-3');
        }
        if (streak >= 7 && !achievement.badges.includes('streak-7')) {
          await get().addBadge('streak-7');
          unlockedBadges.push('streak-7');
        }

        // 检查毕业证书
        if (!achievement.badges.includes('graduate')) {
          const allLessons = getAllLessons();
          const allCompleted = allLessons.every(l =>
            achievement.completedLessons.includes(l.lesson.id)
          );

          if (allCompleted) {
            await get().addBadge('graduate');
            unlockedBadges.push('graduate');
          }
        }

        return unlockedBadges;
      },

      loadDailyTasks: async () => {
        try {
          const today = new Date().toISOString().split('T')[0];
          let dailyTasks = await kidsDB.getDailyTasks(today);

          if (!dailyTasks) {
            // 创建今日任务
            const tasks: DailyTaskItem[] = dailyTaskTemplates.map(template => ({
              id: template.id,
              type: template.type,
              title: template.title,
              target: template.target,
              progress: 0,
              stars: template.stars,
              completed: false
            }));

            dailyTasks = {
              id: `daily-${today}`,
              date: today,
              tasks
            };

            await kidsDB.createDailyTasks(dailyTasks);
          }

          set({ dailyTasks });
        } catch (error) {
          console.error('Failed to load daily tasks:', error);
        }
      },

      updateDailyTaskProgress: async (taskType) => {
        const { dailyTasks } = get();
        if (!dailyTasks) return;

        const task = dailyTasks.tasks.find(t => t.type === taskType);
        if (task && !task.completed) {
          await kidsDB.updateDailyTask(dailyTasks.date, task.id, task.progress + 1);

          // 如果任务完成，添加星星
          if (task.progress + 1 >= task.target) {
            await get().addStars(task.stars);
          }

          await get().loadDailyTasks();
        }
      },

      getTotalStars: () => {
        return get().achievement?.totalStars || 0;
      },

      getCompletedLessonsCount: () => {
        return get().achievement?.completedLessons.length || 0;
      },

      getCurrentStreak: () => {
        return get().achievement?.currentStreak || 0;
      },

      getLevel: () => {
        return get().achievement?.level || 1;
      },

      getLevelProgress: () => {
        const { achievement } = get();
        const stars = achievement?.totalStars || 0;
        const currentLevel = achievement?.level || 1;

        const currentLevelConfig = kidsLevels.find(l => l.level === currentLevel);
        const nextLevelConfig = kidsLevels.find(l => l.level === currentLevel + 1);

        if (!nextLevelConfig) {
          return { current: stars, next: stars, progress: 100 };
        }

        const currentRequired = currentLevelConfig?.requiredStars || 0;
        const nextRequired = nextLevelConfig.requiredStars;
        const progress = Math.min(100, ((stars - currentRequired) / (nextRequired - currentRequired)) * 100);

        return { current: stars, next: nextRequired, progress };
      }
    }),
    {
      name: 'kids-progress-store',
      partialize: (_state) => ({
        // 只持久化简单状态，复杂状态从 IndexedDB 加载
      })
    }
  )
);
