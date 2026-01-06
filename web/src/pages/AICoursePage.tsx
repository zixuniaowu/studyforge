import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, Brain, Check, ChevronRight, Clock,
  Code, Cpu, Database, Gamepad2, Globe, Layers, Lightbulb, MessageSquare,
  Palette, Play, Server, Shield, Sparkles, Target, Terminal, Users,
  Video, Zap, GraduationCap, Rocket, Star
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { beginnerPath, advancedPath, LearningPath, Lesson } from '../data/aiCourseContent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Icon mapping
const iconMap: { [key: string]: React.ElementType } = {
  Sparkles, Code, Terminal, Brain, Layers, Cpu, Server, Lightbulb,
  Gamepad2, MessageSquare, Palette, Shield, Database, Globe, Target, Zap
};

// Path Selection Screen
const PathSelection: React.FC<{
  onSelect: (path: LearningPath) => void;
  lang: 'zh' | 'ja';
}> = ({ onSelect, lang }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
            <GraduationCap className="text-purple-400" size={24} />
            <span className="text-white/80 font-medium">
              {lang === 'ja' ? 'AI 学習コース' : 'AI 学习课程'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {lang === 'ja' ? 'あなたに合った学習パスを選択' : '选择适合你的学习路径'}
          </h1>
          <p className="text-xl text-white/60">
            {lang === 'ja' ? '目標とスキルレベルに応じて最適なコースを' : '根据你的目标和技能水平选择最佳课程'}
          </p>
        </div>

        {/* Path Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Beginner Path */}
          <div
            onClick={() => onSelect(beginnerPath)}
            className="group cursor-pointer bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg shadow-pink-500/30">
                <Sparkles size={32} className="text-white" />
              </div>
              <div className="flex items-center gap-2 bg-pink-500/20 px-3 py-1 rounded-full">
                <Users size={14} className="text-pink-300" />
                <span className="text-pink-300 text-sm font-medium">
                  {lang === 'ja' ? '初心者向け' : '适合新手'}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              {beginnerPath.title[lang]}
            </h2>
            <p className="text-white/70 mb-6">
              {beginnerPath.description[lang]}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white/60">
                <Target size={18} className="text-pink-400" />
                <span>{beginnerPath.targetAudience[lang]}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Clock size={18} className="text-pink-400" />
                <span>{beginnerPath.duration[lang]}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <BookOpen size={18} className="text-pink-400" />
                <span>{beginnerPath.modules.length} {lang === 'ja' ? 'モジュール' : '个模块'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {beginnerPath.modules.slice(0, 3).map((m, i) => (
                <span key={i} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">
                  {m.title[lang]}
                </span>
              ))}
              {beginnerPath.modules.length > 3 && (
                <span className="text-white/50 text-sm">+{beginnerPath.modules.length - 3}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-pink-400 font-medium group-hover:text-pink-300 transition-colors">
                {lang === 'ja' ? '始める' : '开始学习'}
              </span>
              <ArrowRight className="text-pink-400 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Advanced Path */}
          <div
            onClick={() => onSelect(advancedPath)}
            className="group cursor-pointer bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/30">
                <Code size={32} className="text-white" />
              </div>
              <div className="flex items-center gap-2 bg-cyan-500/20 px-3 py-1 rounded-full">
                <Rocket size={14} className="text-cyan-300" />
                <span className="text-cyan-300 text-sm font-medium">
                  {lang === 'ja' ? '技術者向け' : '适合技术人员'}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              {advancedPath.title[lang]}
            </h2>
            <p className="text-white/70 mb-6">
              {advancedPath.description[lang]}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white/60">
                <Target size={18} className="text-cyan-400" />
                <span>{advancedPath.targetAudience[lang]}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Clock size={18} className="text-cyan-400" />
                <span>{advancedPath.duration[lang]}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <BookOpen size={18} className="text-cyan-400" />
                <span>{advancedPath.modules.length} {lang === 'ja' ? 'モジュール' : '个模块'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {advancedPath.modules.slice(0, 3).map((m, i) => (
                <span key={i} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">
                  {m.title[lang]}
                </span>
              ))}
              {advancedPath.modules.length > 3 && (
                <span className="text-white/50 text-sm">+{advancedPath.modules.length - 3}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
                {lang === 'ja' ? '始める' : '开始学习'}
              </span>
              <ArrowRight className="text-cyan-400 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated AI Concept Diagram
const AIConceptDiagram: React.FC<{ lang: 'zh' | 'ja' }> = ({ lang }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    { id: 'ai', label: lang === 'ja' ? '人工知能' : '人工智能', x: 200, y: 100, color: '#8B5CF6' },
    { id: 'ml', label: lang === 'ja' ? '機械学習' : '机器学习', x: 120, y: 200, color: '#3B82F6' },
    { id: 'dl', label: lang === 'ja' ? '深層学習' : '深度学习', x: 200, y: 280, color: '#EC4899' },
    { id: 'llm', label: lang === 'ja' ? '大規模言語モデル' : '大语言模型', x: 280, y: 200, color: '#10B981' },
  ];

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
      <h4 className="text-lg font-semibold text-white mb-4 text-center">
        {lang === 'ja' ? 'AI技術の関係図' : 'AI 技术关系图'}
      </h4>
      <svg viewBox="0 0 400 350" className="w-full max-w-md mx-auto">
        {/* Connection Lines */}
        <line x1="200" y1="130" x2="140" y2="180" stroke="#4B5563" strokeWidth="2" />
        <line x1="200" y1="130" x2="260" y2="180" stroke="#4B5563" strokeWidth="2" />
        <line x1="140" y1="220" x2="200" y2="260" stroke="#4B5563" strokeWidth="2" />
        <line x1="260" y1="220" x2="200" y2="260" stroke="#4B5563" strokeWidth="2" />

        {/* Nodes */}
        {nodes.map((node) => (
          <g
            key={node.id}
            className="cursor-pointer transition-transform hover:scale-110"
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={activeNode === node.id ? 45 : 40}
              fill={node.color}
              className="transition-all duration-300"
              style={{ filter: activeNode === node.id ? `drop-shadow(0 0 20px ${node.color})` : 'none' }}
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="500"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Labels */}
        <text x="200" y="340" textAnchor="middle" fill="#9CA3AF" fontSize="12">
          {lang === 'ja' ? 'ホバーして詳細を見る' : '悬停查看详情'}
        </text>
      </svg>
    </div>
  );
};

// Video Player Component
const VideoPlayer: React.FC<{ videoId: string; title: string }> = ({ videoId, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-white/10">
      <div className="aspect-video relative">
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
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-600/30">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

// Lesson Content Component
const LessonContent: React.FC<{
  lesson: Lesson;
  lang: 'zh' | 'ja';
}> = ({ lesson, lang }) => {
  return (
    <div className="space-y-6">
      {/* Video if available */}
      {lesson.videoId && (
        <VideoPlayer videoId={lesson.videoId} title={lesson.title[lang]} />
      )}

      {/* Diagram for AI concepts */}
      {lesson.id === 'ai-types-simple' && <AIConceptDiagram lang={lang} />}

      {/* Markdown Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-white/90 mt-6 mb-3">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-white/70 leading-relaxed mb-4">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="space-y-2 text-white/70">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-400 mt-1 flex-shrink-0" />
                <span>{children}</span>
              </li>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse bg-slate-800/50 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="bg-slate-700/50 px-4 py-3 text-left text-white font-semibold border-b border-white/10">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3 text-white/70 border-b border-white/5">
                {children}
              </td>
            ),
            code: ({ className, children }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-slate-700 px-2 py-0.5 rounded text-purple-300 text-sm">
                    {children}
                  </code>
                );
              }
              return (
                <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm text-green-300">{children}</code>
                </pre>
              );
            },
            hr: () => <hr className="border-white/10 my-6" />,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-white/60 my-4">
                {children}
              </blockquote>
            ),
          }}
        >
          {lesson.content[lang]}
        </ReactMarkdown>
      </div>
    </div>
  );
};

// Main Course Page Component
const AICoursePage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const lang = language as 'zh' | 'ja';

  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem('ai-course-progress');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.pathId) {
        const path = data.pathId === 'beginner' ? beginnerPath : advancedPath;
        setSelectedPath(path);
        setActiveModuleIndex(data.moduleIndex || 0);
        setActiveLessonIndex(data.lessonIndex || 0);
        setCompletedLessons(new Set(data.completed || []));
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (selectedPath) {
      localStorage.setItem('ai-course-progress', JSON.stringify({
        pathId: selectedPath.id,
        moduleIndex: activeModuleIndex,
        lessonIndex: activeLessonIndex,
        completed: Array.from(completedLessons)
      }));
    }
  }, [selectedPath, activeModuleIndex, activeLessonIndex, completedLessons]);

  const handleSelectPath = (path: LearningPath) => {
    setSelectedPath(path);
    setActiveModuleIndex(0);
    setActiveLessonIndex(0);
  };

  const handleBack = () => {
    if (selectedPath) {
      setSelectedPath(null);
    } else {
      navigate('/');
    }
  };

  const currentModule = selectedPath?.modules[activeModuleIndex];
  const currentLesson = currentModule?.lessons[activeLessonIndex];

  const markComplete = () => {
    if (currentLesson) {
      setCompletedLessons(prev => new Set([...prev, currentLesson.id]));
      // Auto-advance to next lesson
      if (activeLessonIndex < (currentModule?.lessons.length || 0) - 1) {
        setActiveLessonIndex(prev => prev + 1);
      } else if (activeModuleIndex < (selectedPath?.modules.length || 0) - 1) {
        setActiveModuleIndex(prev => prev + 1);
        setActiveLessonIndex(0);
      }
    }
  };

  const totalLessons = selectedPath?.modules.reduce((sum, m) => sum + m.lessons.length, 0) || 0;
  const progress = totalLessons > 0 ? (completedLessons.size / totalLessons) * 100 : 0;

  // Path Selection Screen
  if (!selectedPath) {
    return <PathSelection onSelect={handleSelectPath} lang={lang} />;
  }

  // Course Content Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">
                {lang === 'ja' ? '戻る' : '返回'}
              </span>
            </button>
            <h1 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className={`p-1.5 bg-gradient-to-br ${selectedPath.gradient} rounded-lg`}>
                <Brain size={18} className="text-white" />
              </div>
              {selectedPath.title[lang]}
            </h1>
            <div className="flex items-center gap-3">
              <div className="text-sm text-white/60">
                {Math.round(progress)}%
              </div>
              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${selectedPath.gradient} transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex">
        {/* Sidebar - Module Navigation */}
        <aside className="hidden lg:block w-72 bg-black/20 backdrop-blur-xl border-r border-white/10 h-[calc(100vh-56px)] sticky top-14 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">
              {lang === 'ja' ? 'モジュール' : '课程模块'}
            </h2>
            <nav className="space-y-2">
              {selectedPath.modules.map((module, idx) => {
                const Icon = iconMap[module.icon] || Lightbulb;
                const moduleCompleted = module.lessons.every(l => completedLessons.has(l.id));
                const isActive = idx === activeModuleIndex;

                return (
                  <button
                    key={module.id}
                    onClick={() => {
                      setActiveModuleIndex(idx);
                      setActiveLessonIndex(0);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white/10 border border-white/20'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${module.gradient}`}>
                        <Icon size={16} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium text-sm truncate">
                          {module.title[lang]}
                        </div>
                        <div className="text-white/50 text-xs">
                          {module.lessons.length} {lang === 'ja' ? '課' : '节课'}
                        </div>
                      </div>
                      {moduleCompleted && (
                        <Check size={16} className="text-green-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {currentModule && currentLesson && (
            <div className="max-w-4xl mx-auto p-6">
              {/* Module Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
                  <span>{lang === 'ja' ? 'モジュール' : '模块'} {activeModuleIndex + 1}</span>
                  <ChevronRight size={14} />
                  <span>{lang === 'ja' ? '課' : '第'} {activeLessonIndex + 1} {lang === 'ja' ? '' : '节'}</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {currentLesson.title[lang]}
                </h2>
                <div className="flex items-center gap-4 text-white/60">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{currentLesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentLesson.type === 'video' && <Video size={16} />}
                    {currentLesson.type === 'reading' && <BookOpen size={16} />}
                    {currentLesson.type === 'practice' && <Terminal size={16} />}
                    {currentLesson.type === 'interactive' && <Zap size={16} />}
                    <span className="capitalize">{currentLesson.type}</span>
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <LessonContent lesson={currentLesson} lang={lang} />

              {/* Navigation */}
              <div className="mt-12 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (activeLessonIndex > 0) {
                      setActiveLessonIndex(prev => prev - 1);
                    } else if (activeModuleIndex > 0) {
                      setActiveModuleIndex(prev => prev - 1);
                      const prevModule = selectedPath.modules[activeModuleIndex - 1];
                      setActiveLessonIndex(prevModule.lessons.length - 1);
                    }
                  }}
                  disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={18} />
                  {lang === 'ja' ? '前へ' : '上一节'}
                </button>

                <button
                  onClick={markComplete}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    completedLessons.has(currentLesson.id)
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : `bg-gradient-to-r ${selectedPath.gradient} text-white hover:shadow-lg`
                  }`}
                >
                  {completedLessons.has(currentLesson.id) ? (
                    <span className="flex items-center gap-2">
                      <Check size={18} />
                      {lang === 'ja' ? '完了' : '已完成'}
                    </span>
                  ) : (
                    lang === 'ja' ? '完了して次へ' : '完成并继续'
                  )}
                </button>

                <button
                  onClick={() => {
                    if (activeLessonIndex < currentModule.lessons.length - 1) {
                      setActiveLessonIndex(prev => prev + 1);
                    } else if (activeModuleIndex < selectedPath.modules.length - 1) {
                      setActiveModuleIndex(prev => prev + 1);
                      setActiveLessonIndex(0);
                    }
                  }}
                  disabled={
                    activeModuleIndex === selectedPath.modules.length - 1 &&
                    activeLessonIndex === currentModule.lessons.length - 1
                  }
                  className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  {lang === 'ja' ? '次へ' : '下一节'}
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Lesson List */}
              <div className="mt-12 bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {currentModule.title[lang]} - {lang === 'ja' ? '課一覧' : '课程列表'}
                </h3>
                <div className="space-y-2">
                  {currentModule.lessons.map((lesson, idx) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all ${
                        idx === activeLessonIndex
                          ? 'bg-white/10 border border-white/20'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        completedLessons.has(lesson.id)
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/10 text-white/60'
                      }`}>
                        {completedLessons.has(lesson.id) ? (
                          <Check size={16} />
                        ) : (
                          <span className="text-sm">{idx + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{lesson.title[lang]}</div>
                        <div className="text-white/50 text-sm">{lesson.duration}</div>
                      </div>
                      {idx === activeLessonIndex && (
                        <Play size={16} className="text-purple-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Practice Project */}
              {currentModule.practiceProject && (
                <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/30 rounded-lg">
                      <Star size={20} className="text-purple-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {lang === 'ja' ? '実践プロジェクト' : '实践项目'}
                    </h3>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {currentModule.practiceProject.title[lang]}
                  </h4>
                  <p className="text-white/70">
                    {currentModule.practiceProject.description[lang]}
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AICoursePage;
