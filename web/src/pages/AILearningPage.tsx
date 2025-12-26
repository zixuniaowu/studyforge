import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  Cpu,
  Database,
  Lightbulb,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Target,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Play,
  Globe,
  Code2,
  Layers,
  Star,
  Hexagon
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import {
  AITimelineSVG,
  MLTypesSVG,
  NeuralNetworkSVG,
  TransformerSVG,
  LLMWorkflowSVG,
  AttentionSVG
} from '../components/AIIntro/SVGIllustrations';

// Animated Background Component
const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    resize();
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle());
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// Floating Hexagon Decorations
const FloatingHexagons: React.FC = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${10 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
          animationDelay: `${i * 0.5}s`,
          opacity: 0.1
        }}
      >
        <Hexagon
          size={40 + i * 20}
          className="text-violet-500"
          strokeWidth={1}
        />
      </div>
    ))}
  </div>
);

// Glassmorphism Card Component
const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  hover?: boolean;
}> = ({ children, className = '', gradient, hover = true }) => (
  <div
    className={`
      relative overflow-hidden rounded-2xl
      bg-white/70 dark:bg-gray-900/70
      backdrop-blur-xl
      border border-white/20
      shadow-[0_8px_32px_rgba(139,92,246,0.1)]
      ${hover ? 'hover:shadow-[0_8px_32px_rgba(139,92,246,0.2)] hover:border-violet-300/50 transition-all duration-300' : ''}
      ${className}
    `}
  >
    {gradient && (
      <div className={`absolute inset-0 opacity-5 ${gradient}`} />
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

// Animated Progress Ring
const ProgressRing: React.FC<{ progress: number; size?: number }> = ({ progress, size = 120 }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(139, 92, 246, 0.1)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Neon Button Component
const NeonButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}> = ({ children, onClick, variant = 'primary', disabled, className = '', icon }) => {
  const variants = {
    primary: 'from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-violet-500/25',
    secondary: 'from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 shadow-gray-500/25',
    success: 'from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-emerald-500/25'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group px-6 py-3 rounded-xl font-bold text-white
        bg-gradient-to-r ${variants[variant]}
        shadow-lg hover:shadow-xl
        transform hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        overflow-hidden
        ${className}
      `}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      <span className="relative flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  );
};

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface LessonSection {
  id: string;
  title: string;
  icon: React.FC<{ className?: string; size?: number }>;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  content: React.ReactNode;
  quiz: QuizQuestion[];
}

const AILearningPage: React.FC = () => {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const lang = language === 'ja' ? 'ja' : 'zh';

  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation on section change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [currentSection]);

  // Lesson sections with content and quizzes
  const sections: LessonSection[] = [
    {
      id: 'intro',
      title: lang === 'ja' ? 'AI とは？' : '什么是 AI？',
      icon: Lightbulb,
      color: 'violet',
      gradientFrom: 'from-violet-500',
      gradientTo: 'to-purple-600',
      content: (
        <div className="space-y-6">
          <GlassCard className="p-6" gradient="bg-gradient-to-br from-violet-500 to-purple-600">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '人工知能（AI）' : '人工智能（AI）'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'ja'
                    ? '人工知能とは、人間の知能を模倣し、学習、推論、問題解決などのタスクを実行できるコンピュータシステムです。'
                    : '人工智能是能够模拟人类智能，执行学习、推理、问题解决等任务的计算机系统。'}
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Target, title: lang === 'ja' ? '弱いAI（ANI）' : '弱人工智能', desc: lang === 'ja' ? '特定タスクに特化、現在の全てのAI' : '专注特定任务，当前所有AI', gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20' },
              { icon: Zap, title: lang === 'ja' ? '汎用AI（AGI）' : '通用人工智能', desc: lang === 'ja' ? '人間レベルの汎用知能' : '人类水平的通用智能', gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/20' },
              { icon: Globe, title: lang === 'ja' ? '超AI（ASI）' : '超级人工智能', desc: lang === 'ja' ? '人間を超える知能、理論段階' : '超越人类的智能，理论阶段', gradient: 'from-rose-500 to-pink-500', shadow: 'shadow-rose-500/20' }
            ].map((item, i) => (
              <GlassCard key={i} className="p-5 group">
                <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-500" />
              {lang === 'ja' ? 'AI発展の歴史' : 'AI 发展历程'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <AITimelineSVG className="w-full min-w-[600px] h-auto" />
            </div>
          </GlassCard>

          <GlassCard className="p-5" gradient="bg-gradient-to-r from-indigo-500 to-purple-500">
            <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              {lang === 'ja' ? 'ポイント' : '要点'}
            </h4>
            <ul className="space-y-2">
              {[
                lang === 'ja' ? 'AI = 人間の知能をシミュレートする技術' : 'AI = 模拟人类智能的技术',
                lang === 'ja' ? '現在のAIは全て「弱いAI」（特化型）' : '当前所有 AI 都是「弱人工智能」（专用型）',
                lang === 'ja' ? '2022年のChatGPT登場でAIブーム到来' : '2022年 ChatGPT 发布引爆 AI 热潮'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      ),
      quiz: lang === 'ja' ? [
        { question: '現在の全てのAIシステムはどのタイプですか？', options: ['弱いAI（ANI）', '汎用AI（AGI）', '超AI（ASI）', 'どれでもない'], answer: 0, explanation: '現在の全てのAIは特定タスクに特化した「弱いAI」です。ChatGPTも画像認識AIも全て弱いAIに分類されます。' },
        { question: 'Transformerアーキテクチャは何年に発表されましたか？', options: ['2012年', '2017年', '2020年', '2022年'], answer: 1, explanation: 'Transformerは2017年にGoogleの論文「Attention Is All You Need」で発表されました。' },
        { question: 'ChatGPTはいつ公開されましたか？', options: ['2020年', '2021年', '2022年', '2023年'], answer: 2, explanation: 'ChatGPTは2022年11月30日にOpenAIによって公開されました。' }
      ] : [
        { question: '当前所有的 AI 系统属于哪种类型？', options: ['弱人工智能（ANI）', '通用人工智能（AGI）', '超级人工智能（ASI）', '以上都不是'], answer: 0, explanation: '当前所有 AI 都是专注于特定任务的「弱人工智能」。ChatGPT、图像识别等都属于弱人工智能。' },
        { question: 'Transformer 架构是哪一年发布的？', options: ['2012年', '2017年', '2020年', '2022年'], answer: 1, explanation: 'Transformer 架构由 Google 于 2017 年在论文《Attention Is All You Need》中提出。' },
        { question: 'ChatGPT 是什么时候发布的？', options: ['2020年', '2021年', '2022年', '2023年'], answer: 2, explanation: 'ChatGPT 由 OpenAI 于 2022 年 11 月 30 日正式发布。' }
      ]
    },
    {
      id: 'ml',
      title: lang === 'ja' ? '機械学習' : '机器学习',
      icon: Database,
      color: 'blue',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-cyan-600',
      content: (
        <div className="space-y-6">
          <GlassCard className="p-6" gradient="bg-gradient-to-br from-blue-500 to-cyan-600">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                <Database className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '機械学習（Machine Learning）' : '机器学习（Machine Learning）'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'ja'
                    ? '機械学習は、明示的にプログラムすることなく、データから学習し改善する能力をコンピュータに与える技術です。'
                    : '机器学习是让计算机能够从数据中学习和改进的技术，而无需明确编程。'}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              {lang === 'ja' ? '三大パラダイム' : '三大范式'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <MLTypesSVG className="w-full min-w-[700px] h-auto" />
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Target, title: lang === 'ja' ? '教師あり学習' : '监督学习', desc: lang === 'ja' ? 'ラベル付きデータで学習' : '使用标注数据学习', example: lang === 'ja' ? '例: 画像→猫/犬' : '例: 图片→猫/狗', gradient: 'from-blue-500 to-blue-600' },
              { icon: Sparkles, title: lang === 'ja' ? '教師なし学習' : '无监督学习', desc: lang === 'ja' ? 'ラベルなしで構造発見' : '无标注数据发现结构', example: lang === 'ja' ? '例: 顧客セグメント' : '例: 客户分群', gradient: 'from-green-500 to-emerald-600' },
              { icon: Zap, title: lang === 'ja' ? '強化学習' : '强化学习', desc: lang === 'ja' ? '試行錯誤と報酬で学習' : '通过试错和奖励学习', example: lang === 'ja' ? '例: ゲームAI' : '例: 游戏AI', gradient: 'from-amber-500 to-orange-600' }
            ].map((item, i) => (
              <GlassCard key={i} className="p-5 group">
                <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                <div className="bg-gray-900/5 rounded-lg p-3 font-mono text-xs text-gray-700">
                  {item.example}
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-5" gradient="bg-gradient-to-r from-blue-500 to-cyan-500">
            <h4 className="font-semibold text-blue-900 mb-4">{lang === 'ja' ? '📊 MLワークフロー' : '📊 机器学习流程'}</h4>
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {(lang === 'ja'
                ? ['問題定義', '→', 'データ収集', '→', '前処理', '→', '特徴量', '→', '訓練', '→', '評価', '→', 'デプロイ']
                : ['定义问题', '→', '收集数据', '→', '预处理', '→', '特征工程', '→', '训练', '→', '评估', '→', '部署']
              ).map((step, i) => (
                step === '→'
                  ? <ChevronRight key={i} className="w-4 h-4 text-blue-400" />
                  : <span key={i} className="px-3 py-1.5 bg-white/80 backdrop-blur rounded-lg text-sm font-medium text-blue-700 shadow-sm border border-blue-100/50">{step}</span>
              ))}
            </div>
          </GlassCard>
        </div>
      ),
      quiz: lang === 'ja' ? [
        { question: '画像分類（猫/犬の識別）は何学習ですか？', options: ['教師あり学習', '教師なし学習', '強化学習', '半教師あり学習'], answer: 0, explanation: '画像分類はラベル付きデータ（猫、犬のタグ）を使うので教師あり学習です。' },
        { question: '顧客の購買行動でグループ分けするのは？', options: ['教師あり学習', '教師なし学習', '強化学習', '転移学習'], answer: 1, explanation: 'クラスタリング（グループ分け）はラベルなしで構造を見つけるので教師なし学習です。' },
        { question: 'AlphaGoが囲碁を学んだ方法は？', options: ['教師あり学習のみ', '教師なし学習のみ', '強化学習を含む', 'ルールベース'], answer: 2, explanation: 'AlphaGoは自己対局による強化学習で、人間を超える実力を獲得しました。' }
      ] : [
        { question: '图像分类（识别猫/狗）属于哪种学习？', options: ['监督学习', '无监督学习', '强化学习', '半监督学习'], answer: 0, explanation: '图像分类使用带标签的数据（猫、狗的标注），所以是监督学习。' },
        { question: '根据客户购买行为进行分群属于？', options: ['监督学习', '无监督学习', '强化学习', '迁移学习'], answer: 1, explanation: '聚类（分群）是在无标签数据中发现结构，属于无监督学习。' },
        { question: 'AlphaGo 学习围棋的方法是？', options: ['仅监督学习', '仅无监督学习', '包含强化学习', '规则系统'], answer: 2, explanation: 'AlphaGo 通过自我对弈的强化学习，获得了超越人类的棋艺。' }
      ]
    },
    {
      id: 'dl',
      title: lang === 'ja' ? '深層学習' : '深度学习',
      icon: Cpu,
      color: 'purple',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-pink-600',
      content: (
        <div className="space-y-6">
          <GlassCard className="p-6" gradient="bg-gradient-to-br from-purple-500 to-pink-600">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '深層学習（Deep Learning）' : '深度学习（Deep Learning）'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'ja'
                    ? '深層学習は多層のニューラルネットワークを使い、データの複雑なパターンを自動で学習します。'
                    : '深度学习使用多层神经网络自动学习数据的复杂模式。'}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              {lang === 'ja' ? 'ニューラルネットワーク構造' : '神经网络结构'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <NeuralNetworkSVG className="w-full max-w-xl mx-auto h-auto" />
            </div>
            <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
              {[
                { title: lang === 'ja' ? '入力層' : '输入层', desc: lang === 'ja' ? '特徴を受け取る' : '接收特征', color: 'blue' },
                { title: lang === 'ja' ? '隠れ層' : '隐藏层', desc: lang === 'ja' ? 'パターンを抽出' : '提取模式', color: 'purple' },
                { title: lang === 'ja' ? '出力層' : '输出层', desc: lang === 'ja' ? '予測を出力' : '输出预测', color: 'green' }
              ].map((item, i) => (
                <div key={i} className={`bg-${item.color}-50/50 backdrop-blur rounded-lg p-3 text-center border border-${item.color}-100/50`}>
                  <div className={`font-bold text-${item.color}-700`}>{item.title}</div>
                  <div className={`text-${item.color}-600`}>{item.desc}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Transformer {lang === 'ja' ? 'アーキテクチャ' : '架构'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <TransformerSVG className="w-full max-w-2xl mx-auto h-auto" />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-pink-500" />
              {lang === 'ja' ? '自己注意機構' : '自注意力机制'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <AttentionSVG className="w-full max-w-xl mx-auto h-auto" />
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-4">
            <GlassCard className="p-5" gradient="bg-gradient-to-br from-purple-500 to-pink-500">
              <h4 className="font-semibold text-purple-900 mb-3">{lang === 'ja' ? '🏗️ 代表的アーキテクチャ' : '🏗️ 代表架构'}</h4>
              <div className="space-y-2">
                {['CNN - '+(lang === 'ja' ? '画像処理' : '图像处理'), 'RNN/LSTM - '+(lang === 'ja' ? '時系列' : '时序数据'), 'Transformer - '+(lang === 'ja' ? '現代NLP/CV' : '现代NLP/CV'), 'GAN - '+(lang === 'ja' ? '画像生成' : '图像生成')].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-purple-800">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-5" gradient="bg-gradient-to-br from-amber-500 to-orange-500">
              <h4 className="font-semibold text-amber-900 mb-3">{lang === 'ja' ? '⚡ 訓練のポイント' : '⚡ 训练要点'}</h4>
              <div className="space-y-2">
                {[lang === 'ja' ? '大量のデータ' : '大量数据', lang === 'ja' ? 'GPU/TPU加速' : 'GPU/TPU 加速', lang === 'ja' ? '適切な損失関数' : '合适的损失函数', lang === 'ja' ? '正則化で過学習防止' : '正则化防过拟合'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-amber-800">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      ),
      quiz: lang === 'ja' ? [
        { question: 'ニューラルネットワークの「深さ」とは？', options: ['入力の次元', '隠れ層の数', '学習率', 'バッチサイズ'], answer: 1, explanation: '「深さ」は隠れ層の数を指します。層が多いほど「深い」ネットワークです。' },
        { question: 'Transformerの核心技術は？', options: ['畳み込み', '再帰処理', '自己注意機構', '決定木'], answer: 2, explanation: 'TransformerはSelf-Attention（自己注意機構）を核心とし、並列処理で長距離依存を捉えます。' },
        { question: 'GPT、BERT、ChatGPTのベースは？', options: ['CNN', 'RNN', 'Transformer', 'GAN'], answer: 2, explanation: 'GPT、BERT、ChatGPT全てTransformerアーキテクチャをベースにしています。' }
      ] : [
        { question: '神经网络的「深度」指的是？', options: ['输入维度', '隐藏层数量', '学习率', '批次大小'], answer: 1, explanation: '「深度」指隐藏层的数量。层数越多，网络越「深」。' },
        { question: 'Transformer 的核心技术是？', options: ['卷积', '循环', '自注意力机制', '决策树'], answer: 2, explanation: 'Transformer 以 Self-Attention（自注意力机制）为核心，能并行处理并捕捉长距离依赖。' },
        { question: 'GPT、BERT、ChatGPT 的基础架构是？', options: ['CNN', 'RNN', 'Transformer', 'GAN'], answer: 2, explanation: 'GPT、BERT、ChatGPT 都基于 Transformer 架构构建。' }
      ]
    },
    {
      id: 'llm',
      title: lang === 'ja' ? '大規模言語モデル' : '大语言模型',
      icon: Brain,
      color: 'rose',
      gradientFrom: 'from-rose-500',
      gradientTo: 'to-pink-600',
      content: (
        <div className="space-y-6">
          <GlassCard className="p-6" gradient="bg-gradient-to-br from-rose-500 to-pink-600">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-500/30">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {lang === 'ja' ? '大規模言語モデル（LLM）' : '大语言模型（LLM）'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'ja'
                    ? 'LLMは大量のテキストで訓練された巨大なニューラルネットワークで、人間のように言語を理解し生成できます。'
                    : 'LLM 是在海量文本上训练的大型神经网络，能够像人类一样理解和生成语言。'}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-rose-500" />
              LLM {lang === 'ja' ? 'の動作原理' : '工作原理'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <LLMWorkflowSVG className="w-full min-w-[600px] h-auto" />
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'GPT-4', company: 'OpenAI', gradient: 'from-emerald-500 to-green-600', features: lang === 'ja' ? '最強の推論能力' : '最强推理能力' },
              { name: 'Claude', company: 'Anthropic', gradient: 'from-orange-500 to-amber-600', features: lang === 'ja' ? '安全性重視' : '注重安全性' },
              { name: 'Gemini', company: 'Google', gradient: 'from-blue-500 to-cyan-600', features: lang === 'ja' ? 'マルチモーダル' : '多模态' },
              { name: 'LLaMA', company: 'Meta', gradient: 'from-purple-500 to-violet-600', features: lang === 'ja' ? 'オープンソース' : '开源' }
            ].map((llm, i) => (
              <GlassCard key={i} className="p-4 group overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${llm.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <h4 className="font-bold text-lg text-gray-900">{llm.name}</h4>
                <p className="text-gray-500 text-sm">{llm.company}</p>
                <p className="text-gray-600 text-xs mt-2">{llm.features}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-5" gradient="bg-gradient-to-r from-rose-500 to-pink-500">
            <h4 className="font-semibold text-rose-900 mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Prompt Engineering {lang === 'ja' ? 'テクニック' : '技巧'}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: lang === 'ja' ? '🎯 明確な指示' : '🎯 明确指令', example: lang === 'ja' ? '「100字以内で簡潔に説明して」' : '「用100字以内简洁说明」' },
                { title: lang === 'ja' ? '🎭 役割設定' : '🎭 角色设定', example: lang === 'ja' ? '「あなたはPython専門家です」' : '「你是Python专家」' },
                { title: lang === 'ja' ? '📝 例を提供' : '📝 提供示例', example: 'Few-shot: ' + (lang === 'ja' ? '入出力例を示す' : '给出输入输出示例') },
                { title: lang === 'ja' ? '🔗 段階的思考' : '🔗 思维链', example: lang === 'ja' ? '「ステップバイステップで考えて」' : '「请一步一步思考」' }
              ].map((tip, i) => (
                <div key={i} className="bg-white/60 backdrop-blur rounded-lg p-4 border border-rose-100/50">
                  <h5 className="font-semibold text-rose-900 mb-1">{tip.title}</h5>
                  <p className="text-sm text-rose-700 font-mono bg-rose-50/50 px-2 py-1 rounded">{tip.example}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5 bg-gray-900/95 border-gray-700">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
              <Code2 className="w-5 h-5 text-green-400" />
              {lang === 'ja' ? 'API使用例' : 'API 调用示例'}
            </h4>
            <pre className="text-sm overflow-x-auto bg-gray-800/50 rounded-lg p-4 text-green-300 font-mono">
{`from openai import OpenAI

client = OpenAI(api_key="your-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are helpful."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)`}
            </pre>
          </GlassCard>
        </div>
      ),
      quiz: lang === 'ja' ? [
        { question: 'LLMの「L」は何を意味しますか？', options: ['Learning', 'Large', 'Language', 'Linear'], answer: 1, explanation: 'LLM = Large Language Model（大規模言語モデル）。Largeは膨大なパラメータ数を指します。' },
        { question: 'LLMが次の単語を予測する確率分布を出力する層は？', options: ['Embedding層', 'Attention層', 'Softmax層', '全結合層'], answer: 2, explanation: 'Softmax層が各単語の確率分布を出力し、次の単語を予測します。' },
        { question: '「ステップバイステップで考えて」というPrompt技法は？', options: ['Few-shot', 'Zero-shot', 'Chain of Thought', 'Role-play'], answer: 2, explanation: 'Chain of Thought（CoT）は段階的な推論を促し、複雑な問題の精度を向上させます。' }
      ] : [
        { question: 'LLM 中的「L」代表什么？', options: ['Learning', 'Large', 'Language', 'Linear'], answer: 1, explanation: 'LLM = Large Language Model（大语言模型）。Large 指庞大的参数量。' },
        { question: 'LLM 输出下一个词概率分布的层是？', options: ['Embedding 层', 'Attention 层', 'Softmax 层', '全连接层'], answer: 2, explanation: 'Softmax 层输出每个词的概率分布，用于预测下一个词。' },
        { question: '「请一步一步思考」这种 Prompt 技巧叫？', options: ['Few-shot', 'Zero-shot', 'Chain of Thought', 'Role-play'], answer: 2, explanation: 'Chain of Thought（思维链）引导模型逐步推理，提高复杂问题的准确率。' }
      ]
    }
  ];

  const currentSectionData = sections[currentSection];
  const currentQuiz = currentSectionData.quiz;

  const handleAnswerSelect = useCallback((index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  }, [showResult]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === currentQuiz[currentQuizIndex].answer) {
      setCorrectCount(prev => prev + 1);
    }
  }, [selectedAnswer, currentQuiz, currentQuizIndex]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuizIndex < currentQuiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      setCompletedSections(prev => new Set([...prev, currentSection]));
    }
  }, [currentQuizIndex, currentQuiz.length, currentSection]);

  const handleStartQuiz = useCallback(() => {
    setShowQuiz(true);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setQuizCompleted(false);
  }, []);

  const handleRetryQuiz = useCallback(() => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setQuizCompleted(false);
  }, []);

  const handleNextSection = useCallback(() => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setShowQuiz(false);
      setQuizCompleted(false);
    }
  }, [currentSection, sections.length]);

  const handlePrevSection = useCallback(() => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setShowQuiz(false);
      setQuizCompleted(false);
    }
  }, [currentSection]);

  const progress = ((completedSections.size) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <TechBackground />
      <FloatingHexagons />

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <div className="relative z-40 bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">{lang === 'ja' ? 'トップ' : '首页'}</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="relative">
                <ProgressRing progress={progress} size={50} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">{completedSections.size}/{sections.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar - Section Navigation */}
        <div className="hidden lg:block w-72 bg-black/20 backdrop-blur-xl border-r border-white/10 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-6">
              {lang === 'ja' ? '目次' : '目录'}
            </h3>
            <nav className="space-y-2">
              {sections.map((section, index) => {
                const Icon = section.icon;
                const isCompleted = completedSections.has(index);
                const isCurrent = currentSection === index;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setCurrentSection(index);
                      setShowQuiz(false);
                      setQuizCompleted(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      isCurrent
                        ? 'bg-white/10 text-white shadow-lg shadow-purple-500/20'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30'
                        : isCurrent
                          ? `bg-gradient-to-br ${section.gradientFrom} ${section.gradientTo} shadow-lg`
                          : 'bg-white/10'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto px-4 lg:px-8 py-8">
          {/* Mobile Section Nav */}
          <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isCompleted = completedSections.has(index);
              const isCurrent = currentSection === index;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSection(index);
                    setShowQuiz(false);
                    setQuizCompleted(false);
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                    isCurrent
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  <Icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </div>

          {/* Section Header */}
          <div className={`mb-8 ${isAnimating ? 'animate-slide-up' : ''}`}>
            <div className="flex items-center gap-4 mb-2">
              <div className={`w-14 h-14 bg-gradient-to-br ${currentSectionData.gradientFrom} ${currentSectionData.gradientTo} rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow`}>
                <currentSectionData.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-sm text-white/50 font-medium">{lang === 'ja' ? 'レッスン' : '课程'} {currentSection + 1}/{sections.length}</div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {currentSectionData.title}
                </h1>
              </div>
            </div>
          </div>

          {!showQuiz ? (
            <div className={isAnimating ? 'animate-slide-up' : ''}>
              {/* Lesson Content */}
              <div className="mb-8">
                {currentSectionData.content}
              </div>

              {/* Start Quiz Button */}
              <GlassCard className="p-6 bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {lang === 'ja' ? '理解度チェック' : '检验学习成果'}
                    </h3>
                    <p className="text-white/60">
                      {currentQuiz.length} {lang === 'ja' ? '問のクイズで確認しよう' : '道题测试你的理解'}
                    </p>
                  </div>
                  <NeonButton onClick={handleStartQuiz} icon={<Play className="w-5 h-5" />}>
                    {lang === 'ja' ? 'クイズ開始' : '开始测验'}
                  </NeonButton>
                </div>
              </GlassCard>
            </div>
          ) : quizCompleted ? (
            /* Quiz Results */
            <GlassCard className="p-8 text-center">
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                correctCount === currentQuiz.length
                  ? 'bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50 animate-pulse-glow'
                  : correctCount >= currentQuiz.length / 2
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/50'
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
              }`}>
                {correctCount === currentQuiz.length ? (
                  <Trophy className="w-12 h-12 text-white" />
                ) : (
                  <Star className="w-12 h-12 text-white" />
                )}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {correctCount === currentQuiz.length
                  ? (lang === 'ja' ? 'パーフェクト！' : '满分！')
                  : correctCount >= currentQuiz.length / 2
                    ? (lang === 'ja' ? 'よくできました！' : '做得不错！')
                    : (lang === 'ja' ? 'もう一度挑戦！' : '再试一次！')}
              </h3>
              <p className="text-white/60 mb-8 text-lg">
                {lang === 'ja' ? '正解' : '正确'}: <span className="text-white font-bold">{correctCount}/{currentQuiz.length}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <NeonButton onClick={handleRetryQuiz} variant="secondary" icon={<RotateCcw className="w-5 h-5" />}>
                  {lang === 'ja' ? '再挑戦' : '重新测验'}
                </NeonButton>
                {currentSection < sections.length - 1 && (
                  <NeonButton onClick={handleNextSection} icon={<ChevronRight className="w-5 h-5" />}>
                    {lang === 'ja' ? '次のレッスン' : '下一课'}
                  </NeonButton>
                )}
              </div>
            </GlassCard>
          ) : (
            /* Quiz Question */
            <GlassCard className="overflow-hidden">
              {/* Progress */}
              <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">
                    {lang === 'ja' ? '問題' : '题目'} {currentQuizIndex + 1}/{currentQuiz.length}
                  </span>
                  <div className="flex gap-2">
                    {currentQuiz.map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i < currentQuizIndex ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : i === currentQuizIndex ? 'bg-violet-500 shadow-lg shadow-violet-500/50 scale-125' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-8">
                  {currentQuiz[currentQuizIndex].question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {currentQuiz[currentQuizIndex].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuiz[currentQuizIndex].answer;
                    const showCorrect = showResult && isCorrect;
                    const showWrong = showResult && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          showCorrect
                            ? 'border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/20'
                            : showWrong
                              ? 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/20'
                              : isSelected
                                ? 'border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20'
                                : 'border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold transition-all duration-300 ${
                          showCorrect
                            ? 'bg-emerald-500 text-white'
                            : showWrong
                              ? 'bg-red-500 text-white'
                              : isSelected
                                ? 'bg-violet-500 text-white'
                                : 'bg-white/10 text-white/60'
                        }`}>
                          {showCorrect ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : showWrong ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </div>
                        <span className={`flex-1 ${showCorrect ? 'text-emerald-100' : showWrong ? 'text-red-100' : 'text-white/80'}`}>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showResult && (
                  <GlassCard className={`p-4 mb-6 ${
                    selectedAnswer === currentQuiz[currentQuizIndex].answer
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-amber-500/10 border-amber-500/30'
                  }`}>
                    <p className={`text-sm ${
                      selectedAnswer === currentQuiz[currentQuizIndex].answer
                        ? 'text-emerald-200'
                        : 'text-amber-200'
                    }`}>
                      <span className="font-semibold">{lang === 'ja' ? '解説: ' : '解析: '}</span>
                      {currentQuiz[currentQuizIndex].explanation}
                    </p>
                  </GlassCard>
                )}

                {/* Action Button */}
                {!showResult ? (
                  <NeonButton
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="w-full"
                  >
                    {lang === 'ja' ? '回答する' : '提交答案'}
                  </NeonButton>
                ) : (
                  <NeonButton
                    onClick={handleNextQuestion}
                    className="w-full"
                    variant="success"
                  >
                    {currentQuizIndex < currentQuiz.length - 1
                      ? (lang === 'ja' ? '次の問題' : '下一题')
                      : (lang === 'ja' ? '結果を見る' : '查看结果')}
                  </NeonButton>
                )}
              </div>
            </GlassCard>
          )}

          {/* Navigation */}
          {!showQuiz && (
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevSection}
                disabled={currentSection === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  currentSection === 0
                    ? 'text-white/20 cursor-not-allowed'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                {lang === 'ja' ? '前へ' : '上一课'}
              </button>
              <button
                onClick={handleNextSection}
                disabled={currentSection === sections.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  currentSection === sections.length - 1
                    ? 'text-white/20 cursor-not-allowed'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {lang === 'ja' ? '次へ' : '下一课'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AILearningPage;
