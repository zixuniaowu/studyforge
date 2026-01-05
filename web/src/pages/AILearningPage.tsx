import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  Cpu,
  Database,
  Lightbulb,
  BookOpen,
  Play,
  Globe,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Video,
  FileText,
  Youtube
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';

// YouTube Video Component
interface VideoCardProps {
  id: string;
  title: string;
  channel: string;
  duration?: string;
  description?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ id: videoId, title, channel, duration, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
      <div className="relative aspect-video bg-slate-800">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full group"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-600/30">
                <Play className="w-7 h-7 text-white ml-1" fill="white" />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-white text-sm leading-tight mb-1">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Youtube size={12} className="text-red-500" />
          <span>{channel}</span>
          {duration && (
            <>
              <span>·</span>
              <Clock size={12} />
              <span>{duration}</span>
            </>
          )}
        </div>
        {description && <p className="text-xs text-slate-500 mt-2 line-clamp-2">{description}</p>}
      </div>
    </div>
  );
};

// Collapsible Section Component
interface SectionProps {
  title: string;
  icon: React.FC<{ size?: number; className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 py-4 px-4 hover:bg-white/5 transition-colors text-left"
      >
        <Icon size={20} className="text-cyan-400 flex-shrink-0" />
        <span className="font-medium text-white flex-1">{title}</span>
        {isOpen ? (
          <ChevronDown size={18} className="text-slate-400" />
        ) : (
          <ChevronRight size={18} className="text-slate-400" />
        )}
      </button>
      {isOpen && <div className="pb-6 px-4">{children}</div>}
    </div>
  );
};

// Resource Link Component
interface ResourceLinkProps {
  title: string;
  url: string;
  type: 'video' | 'article' | 'course';
  source?: string;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ title, url, type, source }) => {
  const icons = {
    video: <Video size={14} className="text-red-400" />,
    article: <FileText size={14} className="text-blue-400" />,
    course: <GraduationCap size={14} className="text-purple-400" />
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-colors group"
    >
      {icons[type]}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white group-hover:text-cyan-400 truncate transition-colors">{title}</div>
        {source && <div className="text-xs text-slate-500">{source}</div>}
      </div>
      <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
    </a>
  );
};

// Main Page Component
const AILearningPage: React.FC = () => {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const lang = language === 'ja' ? 'ja' : 'zh';

  const [activeModule, setActiveModule] = useState(0);

  // Curriculum Structure (based on Andrew Ng's approach)
  const curriculum = [
    {
      id: 'intro',
      title: lang === 'ja' ? 'モジュール 1: AI入門' : '模块 1: AI 入门',
      icon: Lightbulb,
      gradient: 'from-amber-500 to-orange-500',
      description: lang === 'ja' ? 'AIとは何か、なぜ今重要なのかを理解する' : '理解什么是 AI，为什么现在如此重要',
      lessons: [
        { title: lang === 'ja' ? 'AIとは何か' : '什么是人工智能', duration: '15分' },
        { title: lang === 'ja' ? 'AIの歴史と発展' : 'AI 的历史与发展', duration: '20分' },
        { title: lang === 'ja' ? '現代AIの応用' : '现代 AI 的应用', duration: '15分' },
      ],
      videos: [
        { id: 'aircAruvnKk', title: 'But what is a Neural Network?', channel: '3Blue1Brown', duration: '19:13' },
        { id: 'JMUxmLyrhSk', title: 'What is AI? (Artificial Intelligence)', channel: 'CrashCourse', duration: '11:46' },
      ],
      resources: [
        { title: 'AI For Everyone - Andrew Ng', url: 'https://www.coursera.org/learn/ai-for-everyone', type: 'course' as const, source: 'Coursera' },
        { title: 'Introduction to AI - MIT', url: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/', type: 'course' as const, source: 'MIT OpenCourseWare' },
      ],
      content: {
        overview: lang === 'ja'
          ? '人工知能（AI）は、人間の知能を模倣するコンピュータシステムです。学習、推論、問題解決、言語理解などの能力を持ちます。'
          : '人工智能（AI）是模拟人类智能的计算机系统，具备学习、推理、问题解决、语言理解等能力。',
        keyPoints: lang === 'ja'
          ? ['AI ≠ ロボット：AIはソフトウェア（脳）、ロボットはハードウェア（体）', '現在のAIはすべて「弱いAI」（特定タスク専門）', 'ChatGPT、Siri、自動運転はすべてAI技術']
          : ['AI ≠ 机器人：AI是软件（大脑），机器人是硬件（身体）', '当前所有AI都是「弱AI」（专注特定任务）', 'ChatGPT、Siri、自动驾驶都是AI技术']
      }
    },
    {
      id: 'ml',
      title: lang === 'ja' ? 'モジュール 2: 機械学習の基礎' : '模块 2: 机器学习基础',
      icon: Database,
      gradient: 'from-blue-500 to-cyan-500',
      description: lang === 'ja' ? 'データから学習する仕組みを理解する' : '理解机器如何从数据中学习',
      lessons: [
        { title: lang === 'ja' ? '機械学習とは' : '什么是机器学习', duration: '20分' },
        { title: lang === 'ja' ? '教師あり学習' : '监督学习', duration: '25分' },
        { title: lang === 'ja' ? '教師なし学習' : '无监督学习', duration: '20分' },
        { title: lang === 'ja' ? '強化学習' : '强化学习', duration: '20分' },
      ],
      videos: [
        { id: 'ukzFI9rgwfU', title: 'A Gentle Introduction to Machine Learning', channel: 'StatQuest', duration: '7:12' },
        { id: 'IHZwWFHWa-w', title: 'Gradient Descent - How Neural Networks Learn', channel: '3Blue1Brown', duration: '21:01' },
        { id: 'nKW8Ndu7Mjw', title: 'The Math Behind Neural Networks', channel: 'Veritasium', duration: '23:45' },
      ],
      resources: [
        { title: 'Machine Learning - Stanford (Andrew Ng)', url: 'https://www.coursera.org/learn/machine-learning', type: 'course' as const, source: 'Coursera' },
        { title: 'StatQuest ML Playlist', url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF', type: 'video' as const, source: 'YouTube' },
      ],
      content: {
        overview: lang === 'ja'
          ? '機械学習は、明示的にプログラムすることなく、データからパターンを学習する技術です。「データ」と「正解」から「ルール」を自動で発見します。'
          : '机器学习是让计算机从数据中自动发现规律的技术。从「数据」和「答案」中自动发现「规则」。',
        keyPoints: lang === 'ja'
          ? ['教師あり学習：ラベル付きデータで学習（画像分類、スパム検出）', '教師なし学習：ラベルなしでパターン発見（クラスタリング）', '強化学習：試行錯誤で最適な行動を学習（AlphaGo）']
          : ['监督学习：用带标签的数据学习（图像分类、垃圾邮件检测）', '无监督学习：无标签发现模式（聚类）', '强化学习：通过试错学习最优策略（AlphaGo）']
      }
    },
    {
      id: 'dl',
      title: lang === 'ja' ? 'モジュール 3: 深層学習' : '模块 3: 深度学习',
      icon: Cpu,
      gradient: 'from-pink-500 to-rose-500',
      description: lang === 'ja' ? 'ニューラルネットワークの仕組みを理解する' : '理解神经网络的工作原理',
      lessons: [
        { title: lang === 'ja' ? 'ニューラルネットワーク入門' : '神经网络入门', duration: '25分' },
        { title: lang === 'ja' ? '前向き伝播と逆伝播' : '前向传播与反向传播', duration: '30分' },
        { title: lang === 'ja' ? 'CNN：画像認識' : 'CNN：图像识别', duration: '25分' },
        { title: lang === 'ja' ? 'Transformer入門' : 'Transformer 入门', duration: '30分' },
      ],
      videos: [
        { id: 'Ilg3gGewQ5U', title: 'What is Backpropagation Really Doing?', channel: '3Blue1Brown', duration: '13:54' },
        { id: 'tIeHLnjs5U8', title: 'Backpropagation Calculus', channel: '3Blue1Brown', duration: '10:17' },
        { id: 'wjZofJX0v4M', title: 'Transformers, the tech behind LLMs', channel: '3Blue1Brown', duration: '27:14' },
      ],
      resources: [
        { title: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', type: 'course' as const, source: 'DeepLearning.AI' },
        { title: 'Neural Networks: Zero to Hero', url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ', type: 'video' as const, source: 'Andrej Karpathy' },
      ],
      content: {
        overview: lang === 'ja'
          ? '深層学習は、多層のニューラルネットワークを使用して複雑なパターンを学習する技術です。画像認識、音声認識、自然言語処理で革命を起こしました。'
          : '深度学习使用多层神经网络学习复杂模式。在图像识别、语音识别、自然语言处理领域引发革命。',
        keyPoints: lang === 'ja'
          ? ['ニューロン：入力を重み付けして活性化関数を適用', '層の深さ：2-3層は浅い、10層以上は深い、GPT-4は96層以上', 'CNN：画像処理専用、局所的特徴を検出', 'Transformer：2017年登場、現代LLMの基盤']
          : ['神经元：对输入加权求和后应用激活函数', '层的深度：2-3层算浅，10层以上算深，GPT-4有96层以上', 'CNN：图像处理专用，检测局部特征', 'Transformer：2017年发布，现代LLM的基础']
      }
    },
    {
      id: 'llm',
      title: lang === 'ja' ? 'モジュール 4: 大規模言語モデル' : '模块 4: 大语言模型',
      icon: Globe,
      gradient: 'from-emerald-500 to-teal-500',
      description: lang === 'ja' ? 'ChatGPTなどのLLMの仕組みを理解する' : '理解 ChatGPT 等 LLM 的工作原理',
      lessons: [
        { title: lang === 'ja' ? 'LLMとは' : '什么是大语言模型', duration: '20分' },
        { title: lang === 'ja' ? 'トークン化と埋め込み' : '分词与词向量', duration: '25分' },
        { title: lang === 'ja' ? '注意機構' : '注意力机制', duration: '30分' },
        { title: lang === 'ja' ? 'プロンプトエンジニアリング' : 'Prompt 工程', duration: '25分' },
      ],
      videos: [
        { id: 'LPZh9BOjkQs', title: 'Large Language Models Explained Briefly', channel: '3Blue1Brown', duration: '5:42' },
        { id: 'eMlx5fFNoYc', title: 'Attention in Transformers, Step-by-Step', channel: '3Blue1Brown', duration: '26:44' },
        { id: 'zjkBMFhNj_g', title: 'Intro to Large Language Models', channel: 'Andrej Karpathy', duration: '59:47' },
      ],
      resources: [
        { title: 'ChatGPT Prompt Engineering for Developers', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', type: 'course' as const, source: 'DeepLearning.AI' },
        { title: 'Generative AI with LLMs', url: 'https://www.coursera.org/learn/generative-ai-with-llms', type: 'course' as const, source: 'Coursera' },
      ],
      content: {
        overview: lang === 'ja'
          ? '大規模言語モデル（LLM）は、大量のテキストで訓練された巨大なニューラルネットワークです。「次の単語を予測する」という単純なタスクを極限まで拡大することで、驚くべき能力を獲得しました。'
          : '大语言模型（LLM）是在海量文本上训练的巨大神经网络。通过将「预测下一个词」这个简单任务扩展到极致，获得了惊人的能力。',
        keyPoints: lang === 'ja'
          ? ['本質は「超高度な自動補完」', 'GPT-3: 1750億パラメータ、GPT-4: 約1.8兆パラメータ', '訓練：事前訓練 → ファインチューニング → RLHF', 'プロンプト設計で出力品質が大きく変わる']
          : ['本质是「超级自动补全」', 'GPT-3: 1750亿参数，GPT-4: 约1.8万亿参数', '训练：预训练 → 微调 → RLHF', 'Prompt设计对输出质量影响巨大']
      }
    }
  ];

  const currentModule = curriculum[activeModule];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="px-3 lg:px-6">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">{lang === 'ja' ? 'ホーム' : '首页'}</span>
            </button>
            <h1 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                <Brain size={18} className="text-white" />
              </div>
              {lang === 'ja' ? 'AI 学習コース' : 'AI 学习课程'}
            </h1>
            <div className="text-sm text-slate-400">
              {lang === 'ja' ? 'Andrew Ng スタイル' : '参考 Andrew Ng'}
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 px-3 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Course Navigation */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 sticky top-20">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-cyan-400" />
                {lang === 'ja' ? 'コース目次' : '课程目录'}
              </h2>
              <nav className="space-y-1">
                {curriculum.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(index)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                      activeModule === index
                        ? 'bg-white/10 border border-white/20'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${module.gradient} flex-shrink-0`}>
                      <module.icon size={14} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className={`font-medium text-sm truncate ${activeModule === index ? 'text-white' : 'text-slate-300'}`}>
                        {module.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {module.lessons.length} {lang === 'ja' ? 'レッスン' : '节课'}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Recommended Channels */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-sm font-medium text-slate-400 mb-3">
                  {lang === 'ja' ? 'おすすめチャンネル' : '推荐频道'}
                </h3>
                <div className="space-y-2 text-sm">
                  <a href="https://www.youtube.com/@3blue1brown" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                    <Youtube size={14} className="text-red-500" />
                    3Blue1Brown
                    <ExternalLink size={12} className="ml-auto opacity-50" />
                  </a>
                  <a href="https://www.youtube.com/@statquest" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                    <Youtube size={14} className="text-red-500" />
                    StatQuest
                    <ExternalLink size={12} className="ml-auto opacity-50" />
                  </a>
                  <a href="https://www.youtube.com/@Deeplearningai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                    <Youtube size={14} className="text-red-500" />
                    DeepLearning.AI
                    <ExternalLink size={12} className="ml-auto opacity-50" />
                  </a>
                  <a href="https://www.youtube.com/@AndrejKarpathy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                    <Youtube size={14} className="text-red-500" />
                    Andrej Karpathy
                    <ExternalLink size={12} className="ml-auto opacity-50" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
              {/* Module Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentModule.gradient} flex items-center justify-center shadow-lg`}>
                    <currentModule.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{currentModule.title}</h2>
                    <p className="text-slate-400 mt-1">{currentModule.description}</p>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="divide-y divide-white/10">
                {/* Overview */}
                <Section title={lang === 'ja' ? '概要' : '概述'} icon={FileText}>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 leading-relaxed">{currentModule.content.overview}</p>
                    <div className="mt-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-400 mb-2">{lang === 'ja' ? '重要ポイント' : '要点'}</h4>
                      <ul className="space-y-2">
                        {currentModule.content.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="text-cyan-400 mt-0.5">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Section>

                {/* Lessons */}
                <Section title={lang === 'ja' ? 'レッスン' : '课时'} icon={GraduationCap}>
                  <div className="space-y-2">
                    {currentModule.lessons.map((lesson, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 bg-gradient-to-br ${currentModule.gradient} rounded-full flex items-center justify-center text-xs font-bold text-white`}>
                            {i + 1}
                          </div>
                          <span className="text-slate-200">{lesson.title}</span>
                        </div>
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock size={14} />
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Videos */}
                <Section title={lang === 'ja' ? '推奨動画' : '推荐视频'} icon={Video}>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {currentModule.videos.map((video, i) => (
                      <VideoCard key={i} {...video} />
                    ))}
                  </div>
                </Section>

                {/* Resources */}
                <Section title={lang === 'ja' ? '参考資料' : '学习资源'} icon={BookOpen}>
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentModule.resources.map((resource, i) => (
                      <ResourceLink key={i} {...resource} />
                    ))}
                  </div>
                </Section>
              </div>

              {/* Navigation */}
              <div className="p-6 border-t border-white/10 flex justify-between">
                <button
                  onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                  disabled={activeModule === 0}
                  className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 rounded-lg hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  {lang === 'ja' ? '前のモジュール' : '上一模块'}
                </button>
                <button
                  onClick={() => setActiveModule(Math.min(curriculum.length - 1, activeModule + 1))}
                  disabled={activeModule === curriculum.length - 1}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  {lang === 'ja' ? '次のモジュール' : '下一模块'}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Sources Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-8 py-8">
        <div className="px-3 lg:px-6">
          <h3 className="font-semibold text-white mb-4">{lang === 'ja' ? '参考ソース' : '参考来源'}</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-slate-300 mb-2">{lang === 'ja' ? 'コース' : '课程'}</h4>
              <ul className="space-y-1 text-slate-500">
                <li><a href="https://www.coursera.org/specializations/deep-learning" className="hover:text-cyan-400 transition-colors">Deep Learning Specialization - Andrew Ng</a></li>
                <li><a href="https://www.coursera.org/learn/machine-learning" className="hover:text-cyan-400 transition-colors">Machine Learning - Stanford</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-300 mb-2">YouTube</h4>
              <ul className="space-y-1 text-slate-500">
                <li><a href="https://www.3blue1brown.com/topics/neural-networks" className="hover:text-cyan-400 transition-colors">3Blue1Brown - Neural Networks</a></li>
                <li><a href="https://statquest.org/video-index/" className="hover:text-cyan-400 transition-colors">StatQuest - ML Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-300 mb-2">{lang === 'ja' ? 'リソース' : '资源'}</h4>
              <ul className="space-y-1 text-slate-500">
                <li><a href="https://github.com/dair-ai/ML-YouTube-Courses" className="hover:text-cyan-400 transition-colors">ML YouTube Courses - GitHub</a></li>
                <li><a href="https://www.deeplearning.ai/" className="hover:text-cyan-400 transition-colors">DeepLearning.AI</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AILearningPage;
