/**
 * 积分系统 Store
 * 管理用户积分、连续学习记录和等级
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PointEventType, PointRecord, UserPoints } from '../types/middleSchool';

// 积分规则配置
const POINT_RULES: Record<PointEventType, number> = {
  question_correct: 10,
  lesson_complete: 50,
  weekly_test: 100,
  daily_login: 20,
  streak_bonus: 5,        // 每天累加，最多30天
  achievement: 0,         // 由成就决定
  challenge_complete: 200,
};

// 等级配置
const LEVEL_THRESHOLDS = [
  0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500,
  5500, 6600, 7800, 9100, 10500, 12000, 13600, 15300, 17100, 19000,
];

const LEVEL_NAMES = [
  '見習い', '初心者', '学習者', '探求者', '挑戦者',
  '努力家', '研究者', '実践者', '達人', '名人',
  '師範', '先生', '教授', '博士', '天才',
  '賢者', '聖人', '伝説', '神話', '宇宙一',
];

interface PointState extends UserPoints {
  // Actions
  addPoints: (type: PointEventType, multiplier?: number, description?: string) => void;
  updateStreak: () => void;
  resetDailyPoints: () => void;
  resetWeeklyPoints: () => void;
  getLevel: () => { level: number; name: string; progress: number };
  getTodayLoginBonus: () => boolean;
  claimLoginBonus: () => void;
  getStreakBonus: () => number;
}

// 获取今天的日期字符串
const getTodayKey = () => new Date().toISOString().split('T')[0];

// 获取本周开始日期 - will be used for weekly reset feature
function getWeekStartKey() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  return monday.toISOString().split('T')[0];
}
// Export for testing
export { getWeekStartKey };

export const usePointStore = create<PointState>()(
  persist(
    (set, get) => ({
      // 初始状态
      totalPoints: 0,
      currentStreak: 0,
      longestStreak: 0,
      todayPoints: 0,
      weeklyPoints: 0,
      level: 1,
      nextLevelPoints: 100,
      records: [],

      // 内部状态
      _lastLoginDate: '',
      _loginBonusClaimed: false,
      _weekStartDate: '',

      // 添加积分
      addPoints: (type, multiplier = 1, description) => {
        const basePoints = POINT_RULES[type];
        let points = Math.round(basePoints * multiplier);

        // 连击奖励（连续答对）
        if (type === 'question_correct') {
          const streakBonus = Math.min(get().currentStreak, 10) * 2;
          points += streakBonus;
        }

        const record: PointRecord = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type,
          points,
          description: description || getDefaultDescription(type),
          timestamp: new Date().toISOString(),
        };

        set(state => {
          const newTotalPoints = state.totalPoints + points;
          const newLevel = calculateLevel(newTotalPoints);

          return {
            totalPoints: newTotalPoints,
            todayPoints: state.todayPoints + points,
            weeklyPoints: state.weeklyPoints + points,
            level: newLevel.level,
            nextLevelPoints: newLevel.nextLevelPoints,
            records: [record, ...state.records.slice(0, 99)], // 保留最近100条记录
          };
        });
      },

      // 更新连续学习记录
      updateStreak: () => {
        const today = getTodayKey();
        const state = get() as any;
        const lastLogin = state._lastLoginDate;

        if (lastLogin === today) {
          return; // 今天已经更新过
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().split('T')[0];

        let newStreak = state.currentStreak;

        if (lastLogin === yesterdayKey) {
          // 连续学习
          newStreak++;
        } else if (lastLogin !== today) {
          // 中断了，重新开始
          newStreak = 1;
        }

        const newLongestStreak = Math.max(newStreak, state.longestStreak);

        set({
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          _lastLoginDate: today,
        } as any);

        // 添加连续学习奖励
        if (newStreak > 1) {
          // Calculate bonus and add points
          get().addPoints('streak_bonus', 1, `${newStreak}日連続学習ボーナス！`);
        }
      },

      // 重置每日积分
      resetDailyPoints: () => {
        set({ todayPoints: 0, _loginBonusClaimed: false } as any);
      },

      // 重置每周积分
      resetWeeklyPoints: () => {
        set({ weeklyPoints: 0 });
      },

      // 获取等级信息
      getLevel: () => {
        const { totalPoints, level } = get();
        const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
        const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
        const progress = ((totalPoints - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

        return {
          level,
          name: LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)],
          progress: Math.min(progress, 100),
        };
      },

      // 检查今日是否已领取登录奖励
      getTodayLoginBonus: () => {
        const state = get() as any;
        return state._lastLoginDate === getTodayKey() && !state._loginBonusClaimed;
      },

      // 领取登录奖励
      claimLoginBonus: () => {
        const state = get() as any;
        if (state._lastLoginDate !== getTodayKey() || state._loginBonusClaimed) {
          get().updateStreak();
          get().addPoints('daily_login', 1, '今日のログインボーナス！');
          set({ _loginBonusClaimed: true } as any);
        }
      },

      // 获取连续学习奖励点数
      getStreakBonus: () => {
        const { currentStreak } = get();
        return Math.min(currentStreak, 30) * POINT_RULES.streak_bonus;
      },
    }),
    {
      name: 'studyforge-points',
      version: 1,
    }
  )
);

// 辅助函数：计算等级
function calculateLevel(totalPoints: number): { level: number; nextLevelPoints: number } {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalPoints >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  return {
    level,
    nextLevelPoints: nextThreshold - totalPoints,
  };
}

// 辅助函数：获取默认描述
function getDefaultDescription(type: PointEventType): string {
  const descriptions: Record<PointEventType, string> = {
    question_correct: '問題に正解！',
    lesson_complete: 'レッスン完了！',
    weekly_test: '週テスト完了！',
    daily_login: 'ログインボーナス',
    streak_bonus: '連続学習ボーナス',
    achievement: '実績達成！',
    challenge_complete: 'チャレンジ完了！',
  };
  return descriptions[type];
}

// 热血消息（早稲アカ风格）
export const ENCOURAGEMENT_MESSAGES = {
  login: [
    '今日も頑張ろう！君なら絶対できる！',
    'さあ、今日の挑戦を始めよう！',
    'おはよう！今日も一緒に成長しよう！',
    '新しい一日の始まりだ！全力で行こう！',
  ],
  correct_answer: [
    'すごい！正解だ！この調子で行こう！',
    '完璧！君の努力が実を結んでいる！',
    'やったね！素晴らしい理解力だ！',
    '正解！君はどんどん強くなっている！',
  ],
  wrong_answer: [
    '惜しい！でも間違いは成長のチャンス！',
    '大丈夫、ここから学べることがたくさんある！',
    'ナイストライ！次は絶対できる！',
    'この問題を克服したら、もっと強くなれる！',
  ],
  lesson_complete: [
    'レッスン完了！お疲れ様！素晴らしい集中力だ！',
    'やり遂げた！この努力は必ず実を結ぶ！',
    '一歩一歩、確実に前進している！',
    '今日の学習、最高だったよ！',
  ],
  streak_continue: [
    '連続記録更新！君の継続力は本物だ！',
    '毎日の積み重ねが大きな力になる！',
    '継続は力なり！この調子で行こう！',
    '君の努力、僕はちゃんと見てるよ！',
  ],
  improvement: [
    'すごい進歩だ！この調子で行こう！',
    '成長してる！君の努力が形になってきた！',
    'どんどん上達してるね！自分を誇りに思っていい！',
    '以前よりずっと良くなってる！最高だ！',
  ],
  struggling: [
    '難しいけど、諦めないで！一緒に乗り越えよう！',
    '苦労した分だけ、強くなれる！',
    'ゆっくりでいい、確実に理解していこう！',
    '今の苦労は、未来の君への投資だ！',
  ],
};

// 获取随机热血消息
export function getEncouragementMessage(trigger: keyof typeof ENCOURAGEMENT_MESSAGES): string {
  const messages = ENCOURAGEMENT_MESSAGES[trigger];
  return messages[Math.floor(Math.random() * messages.length)];
}
