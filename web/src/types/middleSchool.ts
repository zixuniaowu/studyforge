/**
 * 中学数学学习系统类型定义
 * 融合日本四大塾（SAPIX, 日能研, 四谷大塚, 早稲田アカデミー）的教学特点
 */

// ============================================
// 题目增强类型
// ============================================

/**
 * 难度分级（日能研式三级分层）
 * A - 基础：基本概念和计算
 * B - 标准：综合运用
 * C - 发展：难题和思考题
 */
export type DifficultyLevel = 'A' | 'B' | 'C';

/**
 * 思考深度等级（SAPIX式）
 * 1 - 直接应用公式
 * 2 - 简单变形
 * 3 - 综合运用
 * 4 - 多步推理
 * 5 - 创新思考
 */
export type ThinkingLevel = 1 | 2 | 3 | 4 | 5;

/**
 * 高校入试相关度
 */
export interface ExamRelevance {
  public: number;    // 公立高校 (0-100)
  private: number;   // 私立高校 (0-100)
  top: number;       // 难关校 (0-100)
}

/**
 * 增强版题目定义
 */
export interface EnhancedQuestion {
  id: number;
  domain: string;                          // 知识领域
  question: string;                        // 题目文本
  questionHtml?: string;                   // HTML格式题目（支持数学公式）
  options: { A: string; B: string; C: string; D: string };
  answer: string | string[];               // 正确答案
  answerType: 'single' | 'multiple';
  explanation: string;                     // 解析
  detailedSteps?: string[];                // 详细解题步骤

  // 新增字段 - 四大塾融合特性
  difficulty: DifficultyLevel;             // 日能研式A/B/C分级
  thinkingLevel: ThinkingLevel;            // SAPIX式思考深度
  questionType: string;                    // 题型分类
  knowledgeTags: string[];                 // 知识点标签
  expectedTime: number;                    // 预计用时(秒)
  commonMistakes?: string[];               // 常见错误
  examRelevance?: ExamRelevance;           // 高校入试相关度
  hints?: string[];                        // 提示（逐级显示）
  relatedQuestionIds?: number[];           // 相关题目ID
}

/**
 * 题库文件格式
 */
export interface EnhancedQuestionBank {
  exam: {
    id: string;
    name: string;
    subject: string;
    grade: string;
    language: string;
    description: string;
    totalQuestions: number;
    domains: {
      name: string;
      percentage: number;
    }[];
    questionTypes: {
      type: string;
      count: number;
    }[];
    difficultyDistribution: {
      A: number;
      B: number;
      C: number;
    };
  };
  questions: EnhancedQuestion[];
}

// ============================================
// 学习模式类型
// ============================================

/**
 * 五种学习模式
 */
export type LearningMode =
  | 'daily'          // 日常学習 - 配合学校进度
  | 'weekly-test'    // 週テスト - 每周定时测试
  | 'mock-exam'      // 模擬試験 - 高校入试模拟
  | 'intensive'      // 特訓モード - 弱点强化训练
  | 'challenge';     // チャレンジ - 高难度思考题

/**
 * 周测配置
 */
export interface WeeklyTestConfig {
  duration: number;         // 时长（分钟）
  questionCount: number;    // 题目数量
  difficultyMix: {
    A: number;              // A级题目占比
    B: number;              // B级题目占比
    C: number;              // C级题目占比
  };
  domains: string[];        // 涉及的知识领域
}

/**
 * 模拟考试配置
 */
export interface MockExamConfig {
  type: 'public' | 'private' | 'top';  // 公立/私立/难关校
  duration: number;                      // 时长（分钟）
  questionCount: number;
  passingScore: number;                  // 及格分数
  maxScore: number;                      // 满分
}

// ============================================
// 进度与统计类型
// ============================================

/**
 * 课时学习进度
 */
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  correctCount: number;
  totalCount: number;
  accuracy: number;           // 正确率 0-100
  attempts: number;           // 尝试次数
  bestAccuracy: number;       // 最佳正确率
  lastStudied: string;        // 最后学习时间 ISO date
  timeSpent: number;          // 累计用时（秒）
}

/**
 * 知识点掌握度
 */
export interface KnowledgeMastery {
  tag: string;                // 知识点标签
  totalQuestions: number;     // 总题数
  correctCount: number;       // 正确数
  accuracy: number;           // 正确率
  trend: 'improving' | 'stable' | 'declining';  // 趋势
  lastPracticed: string;
}

/**
 * 弱点分析结果
 */
export interface WeaknessAnalysis {
  weakPoints: {
    domain: string;
    tag: string;
    accuracy: number;
    suggestedPractice: number;  // 建议练习题数
  }[];
  strongPoints: {
    domain: string;
    tag: string;
    accuracy: number;
  }[];
  recommendedLessons: string[];  // 推荐复习的课时
}

// ============================================
// 错题本类型
// ============================================

/**
 * 错误类型分类
 */
export type MistakeType =
  | 'calculation'    // 计算错误
  | 'concept'        // 概念错误
  | 'careless'       // 粗心大意
  | 'method'         // 方法/思路错误
  | 'unknown';       // 未分类

/**
 * 错题记录
 */
export interface WrongQuestionRecord {
  id: string;
  questionId: number;
  questionData: EnhancedQuestion;  // 题目完整数据
  userAnswer: string;
  correctAnswer: string;
  mistakeType: MistakeType;
  wrongCount: number;              // 错误次数
  lastWrongAt: string;
  reviewCount: number;             // 复习次数
  nextReviewAt: string;            // 下次复习时间（间隔重复）
  mastered: boolean;               // 是否已掌握
  notes?: string;                  // 用户笔记
}

/**
 * 错题本统计
 */
export interface WrongAnswerStats {
  totalWrong: number;
  byMistakeType: Record<MistakeType, number>;
  byDomain: Record<string, number>;
  byDifficulty: Record<DifficultyLevel, number>;
  pendingReview: number;           // 待复习数量
  masteredCount: number;           // 已掌握数量
}

// ============================================
// 激励系统类型
// ============================================

/**
 * 积分事件类型
 */
export type PointEventType =
  | 'question_correct'     // 答对题目
  | 'lesson_complete'      // 完成课时
  | 'weekly_test'          // 完成周测
  | 'daily_login'          // 每日登录
  | 'streak_bonus'         // 连续学习奖励
  | 'achievement'          // 成就奖励
  | 'challenge_complete';  // 完成挑战

/**
 * 积分记录
 */
export interface PointRecord {
  id: string;
  type: PointEventType;
  points: number;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * 用户积分状态
 */
export interface UserPoints {
  totalPoints: number;
  currentStreak: number;           // 当前连续学习天数
  longestStreak: number;           // 最长连续记录
  todayPoints: number;             // 今日获得积分
  weeklyPoints: number;            // 本周获得积分
  level: number;                   // 等级
  nextLevelPoints: number;         // 升级所需积分
  records: PointRecord[];          // 最近积分记录
}

/**
 * 成就定义
 */
export interface Achievement {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
  icon: string;                    // emoji 图标
  category: 'learning' | 'streak' | 'mastery' | 'special';
  condition: {
    type: string;
    target: number;
  };
  points: number;                  // 奖励积分
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

/**
 * 用户成就进度
 */
export interface UserAchievement {
  achievementId: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;                // 进度 0-100
  currentValue: number;
  targetValue: number;
}

// ============================================
// 热血消息（早稲アカ风格）
// ============================================

/**
 * 消息触发场景
 */
export type MessageTrigger =
  | 'login'              // 登录时
  | 'correct_answer'     // 答对时
  | 'wrong_answer'       // 答错时
  | 'lesson_complete'    // 完成课时
  | 'streak_continue'    // 连续学习
  | 'improvement'        // 进步时
  | 'struggling';        // 遇到困难

/**
 * 热血消息
 */
export interface EncouragementMessage {
  trigger: MessageTrigger;
  messages: string[];              // 随机选择的消息列表
}

// ============================================
// 周测与模拟考试结果
// ============================================

/**
 * 周测结果
 */
export interface WeeklyTestResult {
  id: string;
  weekNumber: number;
  date: string;
  score: number;
  maxScore: number;
  percentage: number;
  rank?: number;                   // 模拟排名
  totalParticipants?: number;
  timeSpent: number;
  byDomain: {
    domain: string;
    correct: number;
    total: number;
    accuracy: number;
  }[];
  improvement: number;             // 相比上周的提升
}

/**
 * 模拟考试结果
 */
export interface MockExamResult {
  id: string;
  type: 'public' | 'private' | 'top';
  date: string;
  score: number;
  maxScore: number;
  percentile: number;              // 百分位排名
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  passed: boolean;
  targetSchool?: string;           // 目标学校
  feedback: string;                // 综合评价
}

// ============================================
// 学习计划类型
// ============================================

/**
 * 每日学习计划
 */
export interface DailyPlan {
  date: string;
  targetMinutes: number;
  targetQuestions: number;
  lessons: {
    lessonId: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
  }[];
  reviewItems: {
    questionId: number;
    reason: string;
  }[];
}

/**
 * 周学习计划
 */
export interface WeeklyPlan {
  weekNumber: number;
  startDate: string;
  endDate: string;
  goals: string[];
  dailyPlans: DailyPlan[];
  weeklyTest?: WeeklyTestConfig;
}
