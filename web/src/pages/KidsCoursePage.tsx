import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Trophy, Flame, ChevronRight, Lock, CheckCircle, Play, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useKidsProgressStore } from '../stores/kidsProgressStore';
import { kidsCourseUnits, kidsLevels } from '../data/kidsCourse';
import { KidsCourseUnit, KidsLesson } from '../types';

// 儿童友好配色
const kidsColors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  purple: '#A78BFA',
  green: '#10B981',
  bg: '#FFF8F0',
};

// 吉祥物组件
const Mascot = ({ message, className = '' }: { message: string; className?: string }) => (
  <div className={`flex items-start gap-3 ${className}`}>
    <div className="text-5xl animate-bounce">🤖</div>
    <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-lg border-2 border-gray-100 max-w-xs">
      <p className="text-lg font-medium text-gray-700">{message}</p>
    </div>
  </div>
);

// 进度条组件
const ProgressBar = ({ current, total, color = kidsColors.primary }: { current: number; total: number; color?: string }) => {
  const percentage = Math.min(100, (current / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
};

// 单元卡片组件
const UnitCard = ({
  unit,
  index,
  isUnlocked,
  completedCount,
  onLessonClick
}: {
  unit: KidsCourseUnit;
  index: number;
  isUnlocked: boolean;
  completedCount: number;
  onLessonClick: (lesson: KidsLesson) => void;
}) => {
  const { language } = useLanguageStore();
  const isZh = language === 'zh';
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <div
      className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300"
      style={{ borderLeft: `8px solid ${unit.color}` }}
    >
      {/* 单元标题 */}
      <button
        onClick={() => isUnlocked && setIsExpanded(!isExpanded)}
        className={`w-full p-6 flex items-center justify-between ${
          isUnlocked ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-60'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
            style={{ backgroundColor: `${unit.color}20` }}
          >
            {isUnlocked ? unit.icon : <Lock className="w-8 h-8 text-gray-400" />}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-800">
              {isZh ? unit.title.zh : unit.title.ja}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {completedCount}/{unit.lessons.length} {isZh ? '课已完成' : 'レッスン完了'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar
            current={completedCount}
            total={unit.lessons.length}
            color={unit.color}
          />
          <ChevronRight
            className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {/* 课程列表 */}
      {isExpanded && isUnlocked && (
        <div className="px-6 pb-6">
          <div className="space-y-3">
            {unit.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                unitColor={unit.color}
                onClick={() => onLessonClick(lesson)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 课程项组件
const LessonItem = ({
  lesson,
  unitColor,
  onClick
}: {
  lesson: KidsLesson;
  unitColor: string;
  onClick: () => void;
}) => {
  const { language } = useLanguageStore();
  const { getLessonStatus } = useKidsProgressStore();
  const isZh = language === 'zh';
  const status = getLessonStatus(lesson.id);

  const statusIcon = {
    locked: <Lock className="w-5 h-5 text-gray-400" />,
    available: <Play className="w-5 h-5 text-white" />,
    'in-progress': <Play className="w-5 h-5 text-white" />,
    completed: <CheckCircle className="w-5 h-5 text-white" />
  };

  const lessonTypeIcon = {
    video: '🎬',
    reading: '📖',
    interactive: '🎮',
    quiz: '📝',
    project: '🛠️'
  };

  return (
    <button
      onClick={onClick}
      disabled={status === 'locked'}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
        status === 'locked'
          ? 'bg-gray-100 cursor-not-allowed'
          : 'bg-gray-50 hover:bg-gray-100 hover:scale-[1.02] cursor-pointer'
      }`}
    >
      {/* 序号/状态图标 */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
        style={{ backgroundColor: status === 'locked' ? '#D1D5DB' : (status === 'completed' ? kidsColors.green : unitColor) }}
      >
        {statusIcon[status]}
      </div>

      {/* 课程信息 */}
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className="text-lg">{lessonTypeIcon[lesson.type]}</span>
          <h4 className="font-semibold text-gray-800">
            {isZh ? lesson.title.zh : lesson.title.ja}
          </h4>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {lesson.duration} {isZh ? '分钟' : '分'} · {lesson.starsReward}
          <Star className="w-4 h-4 inline ml-1 text-yellow-400 fill-yellow-400" />
        </p>
      </div>

      {/* 状态标签 */}
      {status === 'completed' && (
        <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full font-medium">
          {isZh ? '已完成' : '完了'}
        </span>
      )}
      {status === 'in-progress' && (
        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full font-medium">
          {isZh ? '学习中' : '学習中'}
        </span>
      )}
    </button>
  );
};

// 每日任务组件
const DailyTasks = () => {
  const { language } = useLanguageStore();
  const { dailyTasks } = useKidsProgressStore();
  const isZh = language === 'zh';

  if (!dailyTasks) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-yellow-500" />
        {isZh ? '今日任务' : '今日のタスク'}
      </h3>
      <div className="space-y-3">
        {dailyTasks.tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-xl ${
              task.completed ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
              )}
              <span className={task.completed ? 'text-green-600 line-through' : 'text-gray-700'}>
                {isZh ? task.title.zh : task.title.ja}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {task.progress}/{task.target}
              </span>
              <span className="flex items-center text-yellow-500">
                +{task.stars}
                <Star className="w-4 h-4 ml-0.5 fill-yellow-400" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 主页面组件
export default function KidsCoursePage() {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const {
    initialize,
    isLoading,
    getTotalStars,
    getLevel,
    getLevelProgress,
    getCurrentStreak,
    getCompletedLessonsCount,
    getLessonStatus,
    progress
  } = useKidsProgressStore();

  const isZh = language === 'zh';

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLessonClick = (lesson: KidsLesson) => {
    const status = getLessonStatus(lesson.id);
    if (status !== 'locked') {
      navigate(`/kids-course/${lesson.id}`);
    }
  };

  const totalStars = getTotalStars();
  const level = getLevel();
  const levelProgress = getLevelProgress();
  const streak = getCurrentStreak();
  const completedCount = getCompletedLessonsCount();
  const currentLevelConfig = kidsLevels.find(l => l.level === level);

  // 计算每个单元的完成数量
  const getUnitCompletedCount = (unit: KidsCourseUnit) => {
    return unit.lessons.filter(lesson => progress[lesson.id]?.status === 'completed').length;
  };

  // 检查单元是否解锁
  const isUnitUnlocked = (unitIndex: number) => {
    if (unitIndex === 0) return true;
    const prevUnit = kidsCourseUnits[unitIndex - 1];
    return prevUnit.lessons.every(lesson => progress[lesson.id]?.status === 'completed');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: kidsColors.bg }}>
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🤖</div>
          <p className="text-xl text-gray-600">{isZh ? '加载中...' : '読み込み中...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: kidsColors.bg }}>
      {/* 顶部状态栏 */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* 等级和星星 */}
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-300" />
              <span className="font-bold">
                Lv.{level} {isZh ? currentLevelConfig?.title.zh : currentLevelConfig?.title.ja}
              </span>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <span className="font-bold">{totalStars}</span>
            </div>
          </div>

          {/* 连续学习 */}
          <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-300" />
            <span className="font-bold">
              {streak} {isZh ? '天' : '日'}
            </span>
          </div>
        </div>

        {/* 等级进度条 */}
        <div className="max-w-4xl mx-auto mt-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>{isZh ? '升级进度' : 'レベルアップ進捗'}</span>
            <span>{levelProgress.current}/{levelProgress.next}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="h-full bg-yellow-300 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-4xl mx-auto p-6">
        {/* 吉祥物欢迎 */}
        <Mascot
          message={isZh
            ? `你好！欢迎来到AI探险之旅！已完成 ${completedCount} 节课，继续加油！`
            : `こんにちは！AI冒険へようこそ！${completedCount}レッスン完了、頑張って！`
          }
          className="mb-8"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 课程列表 */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              📚 {isZh ? '小小AI探险家课程' : '小さなAI冒険家コース'}
            </h2>

            {kidsCourseUnits.map((unit, index) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                index={index}
                isUnlocked={isUnitUnlocked(index)}
                completedCount={getUnitCompletedCount(unit)}
                onLessonClick={handleLessonClick}
              />
            ))}
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            <DailyTasks />

            {/* 学习统计 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📊 {isZh ? '学习统计' : '学習統計'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600">{completedCount}</div>
                  <div className="text-sm text-purple-500 mt-1">{isZh ? '已完成课程' : '完了レッスン'}</div>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600">{totalStars}</div>
                  <div className="text-sm text-yellow-500 mt-1">{isZh ? '获得星星' : '獲得した星'}</div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600">{streak}</div>
                  <div className="text-sm text-orange-500 mt-1">{isZh ? '连续天数' : '連続日数'}</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">{level}</div>
                  <div className="text-sm text-green-500 mt-1">{isZh ? '当前等级' : '現在のレベル'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
