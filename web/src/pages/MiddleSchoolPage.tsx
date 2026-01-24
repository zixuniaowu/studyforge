import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  BookOpen,
  Lightbulb,
  Flame,
  Play,
  Calendar,
  Sun,
  Moon,
  Home,
  Sparkles,
  Coffee,
  Bot,
  X,
  Loader2,
  BookMarked,
  Star,
  TrendingUp,
  Camera,
  FlaskConical,
  Zap,
  Droplets,
  Award,
  FileText,
  Trophy,
  Medal,
} from 'lucide-react';
import { AIPhotoSolver } from '../components/AIPhotoSolver';
import { ChemistryLab } from '../components/ChemistryLab';
import { PhysicsLab } from '../components/PhysicsLab';
import { LiquidFunLab } from '../components/LiquidFunLab';
import { WeeklyTest } from '../components/WeeklyTest';
import { WrongAnswerNotebook } from '../components/WrongAnswerNotebook';
import {
  allCurriculums,
  getSubjectCurriculum,
  getGradeCurriculum,
  calculateStats
} from '../data/curriculumIndex';
import { usePointStore, getEncouragementMessage } from '../stores/pointStore';
import { useAchievementStore, ACHIEVEMENTS } from '../stores/achievementStore';
import type { EnhancedQuestion, WrongQuestionRecord, MistakeType, WeeklyTestResult } from '../types/middleSchool';

// ============ Types ============
interface Question {
  id: number;
  domain: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: string;
  answerType: string;
  explanation: string;
  detailedSteps?: string[];
}

interface QuestionBank {
  exam: {
    id: string;
    name: string;
    subject: string;
    grade: string;
  };
  questions: Question[];
}

interface LessonProgress {
  completed: boolean;
  correct: number;
  total: number;
  lastStudied?: string;
}

interface CourseProgress {
  [lessonId: string]: LessonProgress;
}

interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  totalStudyDays: number;
  todayMinutes: number;
}

// ============ View Types ============
type ViewType =
  | 'dashboard'
  | 'subjects'
  | 'grades'
  | 'terms'
  | 'units'
  | 'lessons'
  | 'quiz'
  | 'results'
  | 'ai-solver'
  | 'chemistry-lab'
  | 'physics-lab'
  | 'liquidfun-lab'
  | 'weekly-test'
  | 'wrong-notebook'
  | 'achievements';

// ============ Grade Config ============
const grades = [
  { id: '1', name: '中学1年', nameJa: '中学1年', color: 'blue' },
  { id: '2', name: '中学2年', nameJa: '中学2年', color: 'green' },
  { id: '3', name: '中学3年', nameJa: '中学3年', color: 'purple' },
];

// ============ Utility Functions ============
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'おはようございます', icon: Sun, period: '朝' };
  if (hour < 17) return { text: 'こんにちは', icon: Coffee, period: '昼' };
  return { text: 'こんばんは', icon: Moon, period: '夜' };
};

const getTodayKey = () => new Date().toISOString().split('T')[0];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'basic': return 'bg-green-100 text-green-700 border-green-200';
    case 'standard': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'advanced': return 'bg-purple-100 text-purple-700 border-purple-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getDifficultyLabel = (difficulty: string) => {
  switch (difficulty) {
    case 'basic': return '基礎';
    case 'standard': return '標準';
    case 'advanced': return '発展';
    default: return difficulty;
  }
};

// ============ Storage Functions ============
const PROGRESS_KEY = 'middle-school-progress-v2';
const STREAK_KEY = 'middle-school-streak-v2';

const loadProgress = (): CourseProgress => {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const saveProgress = (progress: CourseProgress) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

const loadStreak = (): StudyStreak => {
  try {
    const data = localStorage.getItem(STREAK_KEY);
    if (data) {
      const streak = JSON.parse(data);
      const today = getTodayKey();
      const lastDate = streak.lastStudyDate;

      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().split('T')[0];

        if (lastDate !== yesterdayKey) {
          streak.currentStreak = 0;
        }
        streak.todayMinutes = 0;
      }
      return streak;
    }
  } catch {}

  return {
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
    totalStudyDays: 0,
    todayMinutes: 0
  };
};

const saveStreak = (streak: StudyStreak) => {
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
};

const updateStreak = (minutes: number): StudyStreak => {
  const streak = loadStreak();
  const today = getTodayKey();

  if (streak.lastStudyDate !== today) {
    streak.currentStreak++;
    streak.totalStudyDays++;
    if (streak.currentStreak > streak.longestStreak) {
      streak.longestStreak = streak.currentStreak;
    }
  }

  streak.lastStudyDate = today;
  streak.todayMinutes += minutes;
  saveStreak(streak);
  return streak;
};

// ============ Main Component ============
const MiddleSchoolPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation state
  const [view, setView] = useState<ViewType>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  // Data state
  const [progress, setProgress] = useState<CourseProgress>(loadProgress);
  const [streak, setStreak] = useState<StudyStreak>(loadStreak);

  // Quiz state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  // AI Analysis state
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [aiAnalysisContent, setAIAnalysisContent] = useState('');
  const [aiAnalysisLoading, setAIAnalysisLoading] = useState(false);

  // Wrong answers state
  const [wrongRecords, setWrongRecords] = useState<WrongQuestionRecord[]>(() => {
    try {
      const data = localStorage.getItem('studyforge-wrong-records');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // Weekly test state
  const [weeklyTestQuestions, setWeeklyTestQuestions] = useState<EnhancedQuestion[]>([]);
  const [previousWeeklyResult, setPreviousWeeklyResult] = useState<WeeklyTestResult | undefined>();

  // Encouragement message state
  const [_showEncouragement, setShowEncouragement] = useState(false);
  const [_encouragementMsg, setEncouragementMsg] = useState('');

  // Point and Achievement stores
  const pointStore = usePointStore();
  const achievementStore = useAchievementStore();

  // Save wrong records to localStorage
  useEffect(() => {
    localStorage.setItem('studyforge-wrong-records', JSON.stringify(wrongRecords));
  }, [wrongRecords]);

  // Show encouragement message
  const showEncouragementMessage = (trigger: 'login' | 'correct_answer' | 'wrong_answer' | 'lesson_complete' | 'streak_continue' | 'improvement' | 'struggling') => {
    setEncouragementMsg(getEncouragementMessage(trigger));
    setShowEncouragement(true);
    setTimeout(() => setShowEncouragement(false), 3000);
  };

  // Add wrong record function - exported for use in quiz mode
  const addWrongRecord = useCallback((question: EnhancedQuestion, userAnswer: string) => {
    const existingIndex = wrongRecords.findIndex(r => r.questionId === question.id);

    if (existingIndex >= 0) {
      // Update existing record
      const updated = [...wrongRecords];
      updated[existingIndex] = {
        ...updated[existingIndex],
        userAnswer,
        wrongCount: updated[existingIndex].wrongCount + 1,
        lastWrongAt: new Date().toISOString(),
        mastered: false,
      };
      setWrongRecords(updated);
    } else {
      // Create new record
      const newRecord: WrongQuestionRecord = {
        id: `wrong-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        questionId: question.id,
        questionData: question,
        userAnswer,
        correctAnswer: question.answer as string,
        mistakeType: 'unknown',
        wrongCount: 1,
        lastWrongAt: new Date().toISOString(),
        reviewCount: 0,
        nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        mastered: false,
      };
      setWrongRecords(prev => [...prev, newRecord]);
    }
  }, [wrongRecords]);


  // Mark wrong record as mastered
  const handleMarkMastered = (recordId: string) => {
    setWrongRecords(prev =>
      prev.map(r =>
        r.id === recordId ? { ...r, mastered: true } : r
      )
    );
    showEncouragementMessage('improvement');
  };

  // Delete wrong record
  const handleDeleteRecord = (recordId: string) => {
    setWrongRecords(prev => prev.filter(r => r.id !== recordId));
  };

  // Update mistake type
  const handleUpdateMistakeType = (recordId: string, type: MistakeType) => {
    setWrongRecords(prev =>
      prev.map(r =>
        r.id === recordId ? { ...r, mistakeType: type } : r
      )
    );
  };

  // Review question from wrong notebook
  const handleReviewQuestion = (questionId: number) => {
    // TODO: Navigate to quiz with this specific question
    console.log('Review question:', questionId);
  };

  // Start weekly test
  const startWeeklyTest = async () => {
    setLoading(true);
    try {
      // Load questions for weekly test
      const response = await fetch(`./sample-data/middle-school/math-1.json`);
      if (!response.ok) throw new Error('Failed to load questions');
      const data = await response.json();

      // Select random questions for weekly test
      const shuffled = [...data.questions].sort(() => Math.random() - 0.5);
      setWeeklyTestQuestions(shuffled.slice(0, 20) as EnhancedQuestion[]);
      setView('weekly-test');
    } catch (err) {
      setError('週テストの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // Handle weekly test completion
  const handleWeeklyTestComplete = (result: WeeklyTestResult) => {
    setPreviousWeeklyResult(result);
    // Save result to localStorage
    const results = JSON.parse(localStorage.getItem('studyforge-weekly-results') || '[]');
    results.push(result);
    localStorage.setItem('studyforge-weekly-results', JSON.stringify(results));

    if (result.percentage >= 90) {
      showEncouragementMessage('improvement');
    } else if (result.percentage >= 60) {
      showEncouragementMessage('lesson_complete');
    } else {
      showEncouragementMessage('struggling');
    }
  };

  // Get current curriculum data
  const currentSubject = selectedSubject ? getSubjectCurriculum(selectedSubject) : null;
  const currentGrade = selectedSubject && selectedGrade
    ? getGradeCurriculum(selectedSubject, selectedGrade) : null;
  const currentTerm = currentGrade?.terms.find(t => t.id === selectedTerm);
  const currentUnit = currentTerm?.units.find(u => u.id === selectedUnit);
  const currentLesson = currentUnit?.lessons.find(l => l.id === selectedLesson);

  // Navigation handlers
  const goBack = () => {
    if (view === 'results') setView('lessons');
    else if (view === 'quiz') setView('lessons');
    else if (view === 'lessons') setView('units');
    else if (view === 'units') setView('terms');
    else if (view === 'terms') setView('grades');
    else if (view === 'grades') setView('subjects');
    else if (view === 'subjects') setView('dashboard');
    else if (view === 'weekly-test') setView('dashboard');
    else if (view === 'wrong-notebook') setView('dashboard');
    else if (view === 'achievements') setView('dashboard');
    else navigate('/');
  };

  const selectSubject = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setView('grades');
  };

  const selectGrade = (gradeId: string) => {
    setSelectedGrade(gradeId);
    setView('terms');
  };

  const selectTerm = (termId: string) => {
    setSelectedTerm(termId);
    setView('units');
  };

  const selectUnit = (unitId: string) => {
    setSelectedUnit(unitId);
    setView('lessons');
  };

  const startLesson = async (lessonId: string) => {
    setSelectedLesson(lessonId);
    setLoading(true);
    setError(null);
    setStartTime(Date.now());

    try {
      // Load questions from JSON file
      const response = await fetch(`./sample-data/middle-school/${selectedSubject}-${selectedGrade}.json`);
      if (!response.ok) throw new Error('Failed to load questions');

      const data: QuestionBank = await response.json();
      const lesson = currentUnit?.lessons.find(l => l.id === lessonId);

      // Get questions for this lesson (random selection based on questionCount)
      const shuffled = [...data.questions].sort(() => Math.random() - 0.5);
      const count = lesson?.questionCount || 10;
      setQuestions(shuffled.slice(0, Math.min(count, shuffled.length)));

      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setCorrectCount(0);
      setView('quiz');
    } catch (err) {
      setError('問題の読み込みに失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Quiz handlers
  const handleSelectAnswer = (option: string) => {
    if (showAnswer) return;
    setSelectedAnswer(option);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || !questions[currentIndex]) return;

    const question = questions[currentIndex];
    const isCorrect = selectedAnswer === question.answer;

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      // Add points for correct answer
      pointStore.addPoints('question_correct');
    } else {
      // Track wrong answer
      addWrongRecord(question as EnhancedQuestion, selectedAnswer);
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setShowAIAnalysis(false);
    } else {
      // Quiz completed
      const minutes = Math.round((Date.now() - startTime) / 60000);
      const newStreak = updateStreak(minutes);
      setStreak(newStreak);

      // Update progress
      if (selectedLesson) {
        const newProgress = { ...progress };
        newProgress[selectedLesson] = {
          completed: true,
          correct: correctCount,
          total: questions.length,
          lastStudied: getTodayKey()
        };
        setProgress(newProgress);
        saveProgress(newProgress);
      }

      setView('results');
    }
  };

  // AI Analysis
  const generateAIAnalysis = async () => {
    if (!questions[currentIndex] || !selectedAnswer) return;

    setAIAnalysisLoading(true);
    setShowAIAnalysis(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const question = questions[currentIndex];
    const isCorrect = selectedAnswer === question.answer;

    const subjectTips: { [key: string]: string[] } = {
      math: ['計算ミスがないか確認しましょう。', '公式を正しく使えているか見直しましょう。', '図を描いて考えると分かりやすくなります。'],
      english: ['文法ルールを確認しましょう。', '単語の意味と使い方を復習しましょう。', '例文を音読して覚えましょう。'],
      japanese: ['文脈をよく読み取りましょう。', '筆者の主張を整理しましょう。', '接続詞に注目して文の流れを追いましょう。'],
      science: ['実験の原理を理解しましょう。', '図や表を使って整理しましょう。', '身近な例と結びつけて考えましょう。'],
      social: ['年表で時代の流れを確認しましょう。', '地図を見ながら覚えましょう。', 'なぜそうなったか理由を考えましょう。']
    };

    const tips = subjectTips[selectedSubject || 'math'] || subjectTips.math;
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    const analysis = `## 🤖 AI分析レポート

### 問題の分析
${isCorrect ? '✅ 正解です！素晴らしいですね。' : '❌ 惜しい！もう少しで正解です。'}

### あなたの解答
**選択**: ${selectedAnswer}
**正解**: ${question.answer}

### 解説
${question.explanation}

${question.detailedSteps ? `
### 詳しい解き方
${question.detailedSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}
` : ''}

### 💡 学習アドバイス
${randomTip}

### 📚 関連トピック
この問題は「${question.domain}」の分野です。同じ分野の問題を繰り返し解くことで理解が深まります。`;

    setAIAnalysisContent(analysis);
    setAIAnalysisLoading(false);
  };

  // ============ Render Functions ============

  // Dashboard View
  const renderDashboard = () => {
    const greeting = getGreeting();
    const stats = calculateStats();
    const Icon = greeting.icon;

    // Calculate overall progress
    const completedLessons = Object.keys(progress).filter(k => progress[k].completed).length;
    const progressPercent = Math.round((completedLessons / stats.totalLessons) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
          <div className="w-full px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigate('/')} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Home size={24} />
              </button>
              <div className="flex items-center gap-2">
                <Flame className="text-orange-300" size={24} />
                <span className="text-xl font-bold">{streak.currentStreak}日連続</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <Icon size={32} className="text-yellow-300" />
              <h1 className="text-2xl font-bold">{greeting.text}！</h1>
            </div>
            <p className="text-white/80">今日も一緒に勉強しましょう</p>
          </div>
        </div>

        <div className="w-full px-6 py-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <BookOpen size={18} />
                <span className="text-xs">学習進捗</span>
              </div>
              <p className="text-2xl font-bold">{progressPercent}%</p>
              <p className="text-xs text-gray-500">{completedLessons}/{stats.totalLessons}課</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Flame size={18} />
                <span className="text-xs">連続記録</span>
              </div>
              <p className="text-2xl font-bold">{streak.longestStreak}日</p>
              <p className="text-xs text-gray-500">最長記録</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <Clock size={18} />
                <span className="text-xs">今日の学習</span>
              </div>
              <p className="text-2xl font-bold">{streak.todayMinutes}分</p>
              <p className="text-xs text-gray-500">累計{streak.totalStudyDays}日</p>
            </div>
          </div>

          {/* Points & Level */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Medal size={24} />
                <div>
                  <p className="text-xs text-white/80">レベル {pointStore.getLevel().level}</p>
                  <p className="font-bold">{pointStore.getLevel().name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/80">総ポイント</p>
                <p className="text-xl font-bold">{pointStore.totalPoints.toLocaleString()}</p>
              </div>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 mb-1">
              <div
                className="h-2 rounded-full bg-white transition-all"
                style={{ width: `${Math.min(pointStore.getLevel().progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-white/80 text-right">
              次のレベルまで {pointStore.nextLevelPoints} pt
            </p>
          </div>

          {/* Test & Review Section */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Trophy className="text-yellow-500" size={22} />
              テスト＆復習
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {/* Weekly Test */}
              <button
                onClick={startWeeklyTest}
                disabled={loading}
                className="p-4 rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white hover:border-indigo-400 hover:shadow-md transition-all text-left"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-2">
                  <FileText size={20} />
                </div>
                <h3 className="font-bold text-gray-800 text-sm">週テスト</h3>
                <p className="text-xs text-gray-500">実力を試そう</p>
              </button>

              {/* Wrong Answer Notebook */}
              <button
                onClick={() => setView('wrong-notebook')}
                className="p-4 rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white hover:border-red-400 hover:shadow-md transition-all text-left relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center text-white mb-2">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-gray-800 text-sm">間違いノート</h3>
                <p className="text-xs text-gray-500">復習しよう</p>
                {wrongRecords.filter(r => !r.mastered).length > 0 && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wrongRecords.filter(r => !r.mastered).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Award className="text-purple-600" size={22} />
                実績
              </h2>
              <button
                onClick={() => setView('achievements')}
                className="text-sm text-indigo-600 flex items-center gap-1"
              >
                すべて見る <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {achievementStore.getUnlockedAchievements().slice(0, 5).map(achievement => (
                <div
                  key={achievement.id}
                  className="flex-shrink-0 w-16 text-center"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-2xl mb-1 shadow-md">
                    {achievement.icon}
                  </div>
                  <p className="text-xs text-gray-600 truncate">{achievement.nameJa}</p>
                </div>
              ))}
              {achievementStore.getUnlockedAchievements().length === 0 && (
                <div className="text-center w-full py-4 text-gray-400">
                  <Award size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">まだ実績がありません</p>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500">解除済み: {achievementStore.totalUnlocked}/{ACHIEVEMENTS.length}</span>
              <div className="w-24 bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: `${(achievementStore.totalUnlocked / ACHIEVEMENTS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Course Overview */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <GraduationCap className="text-indigo-600" size={22} />
                私塾カリキュラム
              </h2>
              <span className="text-sm text-gray-500">{stats.totalLessons}課 / {stats.totalQuestions}問</span>
            </div>

            <div className="space-y-3 mb-4">
              {allCurriculums.map(subject => {
                const Icon = subject.icon;

                return (
                  <button
                    key={subject.id}
                    onClick={() => selectSubject(subject.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-${subject.color}-300 hover:bg-${subject.color}-50/50 transition-all`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center text-white`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-gray-800">{subject.nameJa}</h3>
                      <p className="text-sm text-gray-500">3年間のカリキュラム</p>
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Learning Tools */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Sparkles className="text-purple-600" size={22} />
              学習ツール
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* AI Photo Solver */}
              <button
                onClick={() => setView('ai-solver')}
                className="p-4 rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white hover:border-purple-400 hover:shadow-md transition-all text-left"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-3">
                  <Camera size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">AI 問題解答</h3>
                <p className="text-sm text-gray-500">写真を撮ってAIに解いてもらおう</p>
              </button>

              {/* Chemistry Lab */}
              <button
                onClick={() => setView('chemistry-lab')}
                className="p-4 rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white hover:border-teal-400 hover:shadow-md transition-all text-left"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white mb-3">
                  <FlaskConical size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">化学実験室</h3>
                <p className="text-sm text-gray-500">薬品を混ぜて反応を観察</p>
              </button>

              {/* Physics/Math Lab */}
              <button
                onClick={() => setView('physics-lab')}
                className="p-4 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:border-amber-400 hover:shadow-md transition-all text-left"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white mb-3">
                  <Zap size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">理科・数学ラボ</h3>
                <p className="text-sm text-gray-500">物理・数学をビジュアルで学習</p>
              </button>

              {/* LiquidFun Physics Lab */}
              <button
                onClick={() => setView('liquidfun-lab')}
                className="p-4 rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:border-blue-400 hover:shadow-md transition-all text-left"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white mb-3">
                  <Droplets size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">物理シミュレーター</h3>
                <p className="text-sm text-gray-500">流体・剛体・弾性体の物理実験</p>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <TrendingUp size={20} />
              学習統計
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/70">総学習時間</p>
                <p className="text-xl font-bold">{stats.totalHours}時間</p>
              </div>
              <div>
                <p className="text-white/70">総問題数</p>
                <p className="text-xl font-bold">{stats.totalQuestions.toLocaleString()}問</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Subject Selection View (showing grades for selected subject)
  const renderGrades = () => {
    if (!currentSubject) return null;
    const Icon = currentSubject.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className={`bg-gradient-to-r ${currentSubject.gradient} text-white`}>
          <div className="w-full px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={goBack} className="p-2 hover:bg-white/20 rounded-lg">
                <ArrowLeft size={24} />
              </button>
              <Icon size={28} />
              <h1 className="text-2xl font-bold">{currentSubject.nameJa}</h1>
            </div>
            <p className="text-white/80">学年を選んでください</p>
          </div>
        </div>

        <div className="w-full px-6 py-6 space-y-4">
          {grades.map(grade => {
            const gradeCurriculum = getGradeCurriculum(currentSubject.id, grade.id);
            const totalLessons = gradeCurriculum?.terms.reduce((sum, t) =>
              sum + t.units.reduce((usum, u) => usum + u.lessons.length, 0), 0) || 0;

            return (
              <button
                key={grade.id}
                onClick={() => selectGrade(grade.id)}
                className="w-full bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${grade.color}-500 to-${grade.color}-600 flex items-center justify-center text-white text-xl font-bold`}>
                      {grade.id}年
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{grade.nameJa}</h3>
                      <p className="text-sm text-gray-500">{gradeCurriculum?.terms.length || 0}学期 · {totalLessons}レッスン</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={24} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Terms View
  const renderTerms = () => {
    if (!currentSubject || !currentGrade) return null;
    const Icon = currentSubject.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className={`bg-gradient-to-r ${currentSubject.gradient} text-white`}>
          <div className="w-full px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={goBack} className="p-2 hover:bg-white/20 rounded-lg">
                <ArrowLeft size={24} />
              </button>
              <Icon size={28} />
              <div>
                <h1 className="text-xl font-bold">{currentSubject.nameJa}</h1>
                <p className="text-white/80 text-sm">{currentGrade.gradeNameJa}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 py-6 space-y-4">
          {currentGrade.terms.map((term) => {
            const totalLessons = term.units.reduce((sum, u) => sum + u.lessons.length, 0);
            const completedLessons = term.units.reduce((sum, u) =>
              sum + u.lessons.filter(l => progress[l.id]?.completed).length, 0);
            const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

            const termColors: { [key: string]: string } = {
              'term1': 'from-pink-500 to-rose-500',
              'summer': 'from-orange-500 to-amber-500',
              'term2': 'from-cyan-500 to-blue-500',
              'winter': 'from-blue-500 to-indigo-500',
              'term3': 'from-green-500 to-emerald-500',
              'spring': 'from-purple-500 to-violet-500'
            };

            return (
              <button
                key={term.id}
                onClick={() => selectTerm(term.id)}
                className="w-full bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${termColors[term.id] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white`}>
                    <Calendar size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-800">{term.nameJa}</h3>
                      <span className="text-sm text-gray-500">{term.period}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{term.units.length}単元 · {totalLessons}レッスン</p>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${termColors[term.id] || 'from-gray-500 to-gray-600'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Units View
  const renderUnits = () => {
    if (!currentSubject || !currentGrade || !currentTerm) return null;
    const Icon = currentSubject.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className={`bg-gradient-to-r ${currentSubject.gradient} text-white`}>
          <div className="w-full px-6 py-6">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={goBack} className="p-2 hover:bg-white/20 rounded-lg">
                <ArrowLeft size={24} />
              </button>
              <Icon size={24} />
              <div>
                <h1 className="text-lg font-bold">{currentGrade.gradeNameJa} · {currentTerm.nameJa}</h1>
                <p className="text-white/80 text-sm">{currentTerm.period}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 py-6 space-y-4">
          {currentTerm.units.map((unit, index) => {
            const completedLessons = unit.lessons.filter(l => progress[l.id]?.completed).length;
            const percent = Math.round((completedLessons / unit.lessons.length) * 100);

            return (
              <button
                key={unit.id}
                onClick={() => selectUnit(unit.id)}
                className="w-full bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{unit.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{unit.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {unit.lessons.length}レッスン
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={14} className="text-green-500" />
                        {completedLessons}完了
                      </span>
                    </div>
                    {percent > 0 && (
                      <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${percent}%` }} />
                      </div>
                    )}
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Lessons View
  const renderLessons = () => {
    if (!currentSubject || !currentGrade || !currentTerm || !currentUnit) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className={`bg-gradient-to-r ${currentSubject.gradient} text-white`}>
          <div className="w-full px-6 py-6">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={goBack} className="p-2 hover:bg-white/20 rounded-lg">
                <ArrowLeft size={24} />
              </button>
              <BookMarked size={24} />
              <div>
                <h1 className="text-lg font-bold">{currentUnit.name}</h1>
                <p className="text-white/80 text-sm">{currentUnit.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 py-6 space-y-3">
          {currentUnit.lessons.map((lesson, index) => {
            const lessonProgress = progress[lesson.id];
            const isCompleted = lessonProgress?.completed;

            return (
              <button
                key={lesson.id}
                onClick={() => startLesson(lesson.id)}
                disabled={loading}
                className={`w-full bg-white rounded-xl p-4 shadow-sm border transition-all text-left ${
                  isCompleted
                    ? 'border-green-200 bg-green-50/50'
                    : 'border-gray-100 hover:shadow-md hover:border-indigo-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={18} /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-800">{lesson.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${getDifficultyColor(lesson.difficulty)}`}>
                        {getDifficultyLabel(lesson.difficulty)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{lesson.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {lesson.duration}分
                      </span>
                      <span className="flex items-center gap-1">
                        <Target size={12} />
                        {lesson.questionCount}問
                      </span>
                      {lessonProgress && (
                        <span className="flex items-center gap-1 text-green-600">
                          <Star size={12} />
                          {lessonProgress.correct}/{lessonProgress.total}正解
                        </span>
                      )}
                    </div>
                  </div>
                  <Play className={isCompleted ? 'text-green-500' : 'text-indigo-500'} size={20} />
                </div>
              </button>
            );
          })}
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 flex items-center gap-3">
              <Loader2 className="animate-spin text-indigo-600" size={24} />
              <span>問題を読み込み中...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => setError(null)}
                className="w-full py-2 bg-gray-100 rounded-lg"
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Quiz View
  const renderQuiz = () => {
    if (!questions.length || !currentLesson) return null;

    const question = questions[currentIndex];
    const isCorrect = selectedAnswer === question.answer;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="w-full px-6 py-3">
            <div className="flex items-center justify-between mb-2">
              <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} className="text-gray-600" />
              </button>
              <span className="font-medium text-gray-800">{currentLesson.name}</span>
              <span className="text-sm text-gray-500">{currentIndex + 1}/{questions.length}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="w-full px-6 py-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">
                {question.domain}
              </span>
            </div>
            <h2 className="text-lg font-medium text-gray-800 leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {Object.entries(question.options).map(([key, value]) => {
              const isSelected = selectedAnswer === key;
              const isAnswer = question.answer === key;

              let optionClass = 'bg-white border-gray-200 hover:border-indigo-300';
              if (showAnswer) {
                if (isAnswer) optionClass = 'bg-green-50 border-green-500 text-green-800';
                else if (isSelected && !isAnswer) optionClass = 'bg-red-50 border-red-500 text-red-800';
              } else if (isSelected) {
                optionClass = 'bg-indigo-50 border-indigo-500';
              }

              return (
                <button
                  key={key}
                  onClick={() => handleSelectAnswer(key)}
                  disabled={showAnswer}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionClass}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      showAnswer && isAnswer ? 'bg-green-500 text-white' :
                      showAnswer && isSelected && !isAnswer ? 'bg-red-500 text-white' :
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {key}
                    </span>
                    <span className="flex-1 pt-1">{value}</span>
                    {showAnswer && isAnswer && <CheckCircle2 className="text-green-500" size={24} />}
                    {showAnswer && isSelected && !isAnswer && <XCircle className="text-red-500" size={24} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showAnswer && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2 text-amber-800">
                <Lightbulb size={20} />
                <span className="font-medium">解説</span>
              </div>
              <p className="text-amber-900">{question.explanation}</p>
              {question.detailedSteps && (
                <div className="mt-3 space-y-1">
                  {question.detailedSteps.map((step, i) => (
                    <p key={i} className="text-sm text-amber-800">{step}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI Analysis Button */}
          {showAnswer && !isCorrect && (
            <button
              onClick={generateAIAnalysis}
              className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              <Bot size={20} />
              AIに分析してもらう
              <Sparkles size={16} />
            </button>
          )}

          {/* Action Button */}
          {!showAnswer ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={!selectedAnswer}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                selectedAnswer
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:opacity-90'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              解答を確認
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:opacity-90 transition-all"
            >
              {currentIndex < questions.length - 1 ? '次の問題へ' : '結果を見る'}
            </button>
          )}
        </div>

        {/* AI Analysis Modal */}
        {showAIAnalysis && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Bot className="text-purple-600" size={24} />
                  <span className="font-bold">AI分析</span>
                </div>
                <button onClick={() => setShowAIAnalysis(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                {aiAnalysisLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="animate-spin text-purple-600 mb-3" size={40} />
                    <p className="text-gray-600">分析中...</p>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    {aiAnalysisContent.split('\n').map((line, i) => {
                      if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold mt-4 mb-2">{line.slice(3)}</h2>;
                      if (line.startsWith('### ')) return <h3 key={i} className="text-md font-bold mt-3 mb-1">{line.slice(4)}</h3>;
                      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold">{line.slice(2, -2)}</p>;
                      if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.slice(2)}</li>;
                      if (line.match(/^\d+\. /)) return <li key={i} className="ml-4">{line}</li>;
                      if (line.trim()) return <p key={i} className="my-1">{line}</p>;
                      return <br key={i} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Results View
  const renderResults = () => {
    const percent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const grade = percent >= 90 ? 'S' : percent >= 80 ? 'A' : percent >= 70 ? 'B' : percent >= 60 ? 'C' : 'D';
    const gradeColors: { [key: string]: string } = {
      'S': 'from-yellow-400 to-amber-500',
      'A': 'from-green-400 to-emerald-500',
      'B': 'from-blue-400 to-indigo-500',
      'C': 'from-orange-400 to-amber-500',
      'D': 'from-red-400 to-pink-500'
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
          <div className="text-center mb-6">
            <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${gradeColors[grade]} flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg`}>
              {grade}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">お疲れ様でした！</h2>
            <p className="text-gray-500">{currentLesson?.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{correctCount}</p>
              <p className="text-sm text-green-700">正解</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-red-600">{questions.length - correctCount}</p>
              <p className="text-sm text-red-700">不正解</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">正答率</span>
              <span className="text-2xl font-bold text-gray-800">{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${gradeColors[grade]}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-orange-600 mb-6">
            <Flame size={24} />
            <span className="font-bold text-lg">{streak.currentStreak}日連続学習中！</span>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setShowAnswer(false);
                setCorrectCount(0);
                setStartTime(Date.now());
                setView('quiz');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              もう一度チャレンジ
            </button>
            <button
              onClick={() => setView('lessons')}
              className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium"
            >
              レッスン一覧に戻る
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Achievements View
  const renderAchievements = () => {
    const unlockedAchievements = achievementStore.getUnlockedAchievements();
    const lockedAchievements = achievementStore.getLockedAchievements();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="px-6 py-6">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => setView('dashboard')} className="p-2 hover:bg-white/20 rounded-lg">
                <ArrowLeft size={24} />
              </button>
              <Award size={28} />
              <h1 className="text-2xl font-bold">実績</h1>
            </div>
            <p className="text-white/80">
              {achievementStore.totalUnlocked}/{ACHIEVEMENTS.length} 解除済み
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Unlocked */}
          {unlockedAchievements.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={20} />
                解除済み ({unlockedAchievements.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {unlockedAchievements.map(achievement => {
                  return (
                    <div
                      key={achievement.id}
                      className="bg-white rounded-xl p-4 shadow-sm border border-green-200 text-center"
                    >
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-3xl mb-2 shadow-lg">
                        {achievement.icon}
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm">{achievement.nameJa}</h3>
                      <p className="text-xs text-gray-500 mt-1">{achievement.descriptionJa}</p>
                      <p className="text-xs text-green-600 mt-2">+{achievement.points} pt</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Locked */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Target className="text-gray-400" size={20} />
              未解除 ({lockedAchievements.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {lockedAchievements.map(achievement => {
                const progress = achievementStore.getProgress(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center opacity-70"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl mb-2 grayscale">
                      {achievement.icon}
                    </div>
                    <h3 className="font-bold text-gray-600 text-sm">{achievement.nameJa}</h3>
                    <p className="text-xs text-gray-400 mt-1">{achievement.descriptionJa}</p>
                    {progress && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-purple-500"
                            style={{ width: `${progress.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {progress.currentValue}/{progress.targetValue}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  switch (view) {
    case 'dashboard': return renderDashboard();
    case 'subjects': return renderDashboard(); // subjects is shown in dashboard
    case 'grades': return renderGrades();
    case 'terms': return renderTerms();
    case 'units': return renderUnits();
    case 'lessons': return renderLessons();
    case 'quiz': return renderQuiz();
    case 'results': return renderResults();
    case 'ai-solver': return <AIPhotoSolver onClose={() => setView('dashboard')} subject={selectedSubject || 'math'} />;
    case 'chemistry-lab': return <ChemistryLab onClose={() => setView('dashboard')} />;
    case 'physics-lab': return <PhysicsLab onClose={() => setView('dashboard')} />;
    case 'liquidfun-lab': return <LiquidFunLab onClose={() => setView('dashboard')} />;
    case 'weekly-test':
      return (
        <WeeklyTest
          questions={weeklyTestQuestions as EnhancedQuestion[]}
          testConfig={{
            duration: 30,
            questionCount: 20,
            title: '数学 総合テスト',
            weekNumber: Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)),
          }}
          previousResult={previousWeeklyResult}
          onClose={() => setView('dashboard')}
          onComplete={handleWeeklyTestComplete}
        />
      );
    case 'wrong-notebook':
      return (
        <WrongAnswerNotebook
          wrongRecords={wrongRecords}
          onClose={() => setView('dashboard')}
          onReviewQuestion={handleReviewQuestion}
          onMarkMastered={handleMarkMastered}
          onDeleteRecord={handleDeleteRecord}
          onUpdateMistakeType={handleUpdateMistakeType}
        />
      );
    case 'achievements':
      return renderAchievements();
    default: return renderDashboard();
  }
};

export default MiddleSchoolPage;
