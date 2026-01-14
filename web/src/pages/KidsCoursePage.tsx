import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Trophy, Flame, ChevronRight, Lock, CheckCircle, Play, Sparkles, Home, Globe, Map, List } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useKidsProgressStore } from '../stores/kidsProgressStore';
import { kidsCourseUnits, kidsLevels } from '../data/kidsCourse';
import { KidsCourseUnit, KidsLesson } from '../types';
import { LottieCharacter } from '../components/LottieAnimations';
import { MapCanvas } from '../components/CourseMap';

// 儿童友好配色
const kidsColors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  purple: '#A78BFA',
  green: '#10B981',
  bg: '#FFF8F0',
};

// 浮动背景装饰
const FloatingDecorations = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(8)].map((_, i) => (
      <div
        key={`star-${i}`}
        className="absolute animate-float opacity-20"
        style={{
          left: `${5 + i * 12}%`,
          top: `${10 + (i % 4) * 20}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${4 + (i % 3)}s`,
        }}
      >
        <span className="text-3xl">{['⭐', '🌟', '✨', '💫', '🎈', '🎀', '🌈', '🦋'][i]}</span>
      </div>
    ))}
    {[...Array(4)].map((_, i) => (
      <div
        key={`cloud-${i}`}
        className="absolute animate-float-slow opacity-15"
        style={{
          right: `${5 + i * 20}%`,
          top: `${15 + i * 20}%`,
          animationDelay: `${i * 2}s`,
        }}
      >
        <span className="text-6xl">☁️</span>
      </div>
    ))}
  </div>
);

// 吉祥物组件 - 使用Lottie动画
const Mascot = ({ message, className = '' }: { message: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [message]);

  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div className="relative flex-shrink-0">
        <LottieCharacter type="robot" size={120} />
        {/* 小星星装饰 */}
        <span className="absolute -top-1 -right-1 text-xl animate-spin-star" style={{ animationDuration: '3s' }}>✨</span>
      </div>
      <div className="relative bg-white rounded-2xl rounded-tl-none p-5 shadow-lg border-2 border-purple-100 max-w-lg animate-slideIn">
        {/* 对话气泡箭头 */}
        <div className="absolute -left-3 top-6 w-4 h-4 bg-white border-l-2 border-b-2 border-purple-100 transform rotate-45" />
        <p className="text-lg font-medium text-gray-700 relative z-10 leading-relaxed">
          {displayedText}
          {isTyping && <span className="animate-blink ml-1">|</span>}
        </p>
        {!isTyping && (
          <div className="flex items-center gap-1 mt-3 text-purple-400">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>💜</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>💜</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💜</span>
          </div>
        )}
      </div>
    </div>
  );
};

// 进度条组件
const ProgressBar = ({ current, total, color = kidsColors.primary }: { current: number; total: number; color?: string }) => {
  const percentage = Math.min(100, (current / total) * 100);
  return (
    <div className="relative w-24 bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      >
        {/* 闪光效果 */}
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
        />
      </div>
      {/* 进度条上的小星星 */}
      {percentage > 10 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 text-xs"
          style={{ left: `calc(${Math.min(percentage, 95)}% - 6px)` }}
        >
          ⭐
        </div>
      )}
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

// 视图类型
type ViewMode = 'map' | 'list';

// 主页面组件
export default function KidsCoursePage() {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const [viewMode, setViewMode] = useState<ViewMode>('map'); // 默认显示地图视图
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
  // 所有单元都开放
  const isUnitUnlocked = (_unitIndex: number) => {
    return true;
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
    <div className="min-h-screen pb-20 relative" style={{ backgroundColor: kidsColors.bg }}>
      {/* 浮动背景装饰 */}
      <FloatingDecorations />

      {/* 顶部状态栏 - 全宽 */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-lg">
        <div className="w-full px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* 返回按钮 + 等级和星星 */}
            <div className="flex items-center gap-4">
              {/* 返回主页按钮 */}
              <button
                onClick={() => navigate('/')}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                <Home className="w-6 h-6" />
                <span className="font-medium hidden sm:inline">{isZh ? '主页' : 'ホーム'}</span>
              </button>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 hover:bg-white/30 transition-all cursor-default">
                <Trophy className="w-7 h-7 text-yellow-300 animate-pulse" />
                <span className="font-bold text-lg">
                  Lv.{level} {isZh ? currentLevelConfig?.title.zh : currentLevelConfig?.title.ja}
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 hover:bg-white/30 transition-all cursor-default">
                <Star className="w-7 h-7 text-yellow-300 fill-yellow-300 animate-spin-star" style={{ animationDuration: '5s' }} />
                <span className="font-bold text-lg">{totalStars}</span>
              </div>
            </div>

            {/* 连续学习 + 语言切换 */}
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 hover:bg-white/30 transition-all cursor-default">
                <Flame className="w-7 h-7 text-orange-300 animate-heartbeat" />
                <span className="font-bold text-lg">
                  {streak} {isZh ? '天' : '日'}
                </span>
              </div>
              {/* 视图切换按钮 */}
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                    viewMode === 'map'
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <Map className="w-5 h-5" />
                  <span className="font-medium hidden sm:inline">{isZh ? '地图' : 'マップ'}</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span className="font-medium hidden sm:inline">{isZh ? '列表' : 'リスト'}</span>
                </button>
              </div>
              {/* 语言切换按钮 */}
              <button
                onClick={() => useLanguageStore.getState().setLanguage(isZh ? 'ja' : 'zh')}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                <Globe className="w-6 h-6" />
                <span className="font-medium">{isZh ? '日本語' : '中文'}</span>
              </button>
            </div>
          </div>

          {/* 等级进度条 */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="flex items-center gap-1">
                <span className="animate-bounce text-sm">🚀</span>
                {isZh ? '升级进度' : 'レベルアップ進捗'}
              </span>
              <span>{levelProgress.current}/{levelProgress.next}</span>
            </div>
            <div className="relative w-full bg-white/30 rounded-full h-5 overflow-hidden">
              <div
                className="h-full bg-yellow-300 rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${levelProgress.progress}%` }}
              >
                {/* 闪光效果 */}
                <div
                  className="absolute inset-0 animate-shimmer"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  }}
                />
              </div>
              {/* 进度条上的小火箭 */}
              {levelProgress.progress > 5 && (
                <div
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `calc(${Math.min(levelProgress.progress, 97)}% - 8px)` }}
                >
                  <span className="text-sm">🚀</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 - 全宽 */}
      <div className="w-full px-6 lg:px-12 py-8">
        {/* 吉祥物欢迎 */}
        <Mascot
          message={isZh
            ? `你好！欢迎来到AI探险之旅！已完成 ${completedCount} 节课，继续加油！`
            : `こんにちは！AI冒険へようこそ！${completedCount}レッスン完了、頑張って！`
          }
          className="mb-8"
        />

        {/* 根据视图模式显示不同内容 */}
        {viewMode === 'map' ? (
          /* 地图视图 */
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              🗺️ {isZh ? '小小AI探险家课程' : '小さなAI冒険家コース'}
            </h2>
            <MapCanvas
              units={kidsCourseUnits}
              onLessonClick={handleLessonClick}
            />

            {/* 地图视图下的简化侧边栏 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <div className="text-3xl font-bold text-purple-600">{completedCount}</div>
                <div className="text-sm text-purple-500 mt-1">{isZh ? '已完成' : '完了'}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <div className="text-3xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                  {totalStars}
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-sm text-yellow-500 mt-1">{isZh ? '星星' : '星'}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <div className="text-3xl font-bold text-orange-600 flex items-center justify-center gap-1">
                  {streak}
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-sm text-orange-500 mt-1">{isZh ? '连续' : '連続'}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <div className="text-3xl font-bold text-green-600 flex items-center justify-center gap-1">
                  Lv.{level}
                  <Trophy className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-sm text-green-500 mt-1">{isZh ? '等级' : 'レベル'}</div>
              </div>
            </div>

            {/* Mini Games Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🎮 {isZh ? 'AI小游戏' : 'AIミニゲーム'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Image Classification Game */}
                <button
                  onClick={() => navigate('/kids-classify-game')}
                  className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl p-6 text-white text-left shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">🖼️</div>
                  <h4 className="text-xl font-bold mb-2">
                    {isZh ? '图片分类大师' : '画像分類マスター'}
                  </h4>
                  <p className="text-white/80 text-sm">
                    {isZh ? '像AI一样给图片分类！' : 'AIのように画像を分類しよう！'}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="bg-white/20 px-2 py-1 rounded-full">6 {isZh ? '关卡' : 'レベル'}</span>
                    <span className="bg-white/20 px-2 py-1 rounded-full">⭐ 97</span>
                  </div>
                </button>

                {/* AI Trainer */}
                <button
                  onClick={() => navigate('/kids-ai-trainer')}
                  className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl p-6 text-white text-left shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">🧠</div>
                  <h4 className="text-xl font-bold mb-2">
                    {isZh ? '训练我的AI' : '私のAIを訓練'}
                  </h4>
                  <p className="text-white/80 text-sm">
                    {isZh ? '创建你自己的AI模型！' : '自分だけのAIモデルを作ろう！'}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="bg-white/20 px-2 py-1 rounded-full">3 {isZh ? '项目' : 'プロジェクト'}</span>
                    <span className="bg-white/20 px-2 py-1 rounded-full">⭐ 60</span>
                  </div>
                </button>

                {/* Story Mode */}
                <button
                  onClick={() => navigate('/kids-story')}
                  className="bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl p-6 text-white text-left shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">📖</div>
                  <h4 className="text-xl font-bold mb-2">
                    {isZh ? '小AI的冒险' : '小さなAIの冒険'}
                  </h4>
                  <p className="text-white/80 text-sm">
                    {isZh ? '跟随小AI一起冒险！' : '小さなAIと一緒に冒険しよう！'}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="bg-white/20 px-2 py-1 rounded-full">4 {isZh ? '章节' : 'チャプター'}</span>
                    <span className="bg-white/20 px-2 py-1 rounded-full">⭐ NEW</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* 列表视图 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 课程列表 - 占 8/12 */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
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

            {/* 侧边栏 - 占 4/12 */}
            <div className="lg:col-span-4 space-y-6">
              <DailyTasks />

              {/* 学习统计 */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  📊 {isZh ? '学习统计' : '学習統計'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-2xl p-5 text-center">
                    <div className="text-4xl font-bold text-purple-600">{completedCount}</div>
                    <div className="text-sm text-purple-500 mt-2">{isZh ? '已完成课程' : '完了レッスン'}</div>
                  </div>
                  <div className="bg-yellow-50 rounded-2xl p-5 text-center">
                    <div className="text-4xl font-bold text-yellow-600">{totalStars}</div>
                    <div className="text-sm text-yellow-500 mt-2">{isZh ? '获得星星' : '獲得した星'}</div>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-5 text-center">
                    <div className="text-4xl font-bold text-orange-600">{streak}</div>
                    <div className="text-sm text-orange-500 mt-2">{isZh ? '连续天数' : '連続日数'}</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-5 text-center">
                    <div className="text-4xl font-bold text-green-600">{level}</div>
                    <div className="text-sm text-green-500 mt-2">{isZh ? '当前等级' : '現在のレベル'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
