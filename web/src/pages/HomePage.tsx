import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useExamStore } from '../stores/examStore';
import { ExamCard } from '../components/Exam/ExamCard';
import { ImportExam } from '../components/Exam/ImportExam';
import {
  BookOpen,
  Loader2,
  RefreshCw,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Award,
  Brain,
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { importExamFromJson } from '../lib/import';
import { useT, useLanguageStore } from '../stores/languageStore';
import { db } from '../lib/db';

// Provider configuration with enhanced details
const providerConfig = {
  AWS: {
    name: { zh: 'Amazon Web Services', ja: 'Amazon Web Services' },
    shortName: 'AWS',
    description: {
      zh: 'AWS 云认证考试，包括 AI 从业者、解决方案架构师等',
      ja: 'AWS クラウド認定試験、AI Practitioner、ソリューションアーキテクトなど'
    },
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    bgGradient: 'from-orange-50 to-amber-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-500',
    hoverShadow: 'hover:shadow-orange-200/50'
  },
  Azure: {
    name: { zh: 'Microsoft Azure', ja: 'Microsoft Azure' },
    shortName: 'Azure',
    description: {
      zh: 'Azure 云认证考试，包括 AI-102、AZ-900 等',
      ja: 'Azure クラウド認定試験、AI-102、AZ-900など'
    },
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-500',
    hoverShadow: 'hover:shadow-blue-200/50'
  },
  GCP: {
    name: { zh: 'Google Cloud Platform', ja: 'Google Cloud Platform' },
    shortName: 'GCP',
    description: {
      zh: 'GCP 云认证考试，包括机器学习工程师、云架构师等',
      ja: 'GCP クラウド認定試験、MLエンジニア、クラウドアーキテクトなど'
    },
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    bgGradient: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-500',
    hoverShadow: 'hover:shadow-green-200/50'
  }
};

type ProviderKey = keyof typeof providerConfig;

export const HomePage: React.FC = () => {
  const { exams, loading, error, loadExams, deleteExam } = useExamStore();
  const [importing, setImporting] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProviderKey | null>(null);
  const [stats, setStats] = useState({ totalQuestions: 0, totalExams: 0, wrongCount: 0 });
  const t = useT();
  const language = useLanguageStore(state => state.language);
  const location = useLocation();

  // Reset selectedProvider when clicking header logo (triggers new navigation)
  useEffect(() => {
    setSelectedProvider(null);
  }, [location.key]);

  useEffect(() => {
    const init = async () => {
      await loadExams();
      const wrongCount = await db.wrongAnswers.count();
      setStats(prev => ({ ...prev, wrongCount }));
    };
    init();
  }, [loadExams]);

  // 根据语言筛选考试
  const langCode = language === 'ja' ? 'ja' : 'zh-CN';
  const languageFilteredExams = useMemo(() => {
    return exams.filter(exam => exam.language === langCode);
  }, [exams, langCode]);

  // Get provider stats
  const providerStats = useMemo(() => {
    const stats: Record<string, { examCount: number; questionCount: number }> = {};
    for (const provider of Object.keys(providerConfig)) {
      const providerExams = languageFilteredExams.filter(e => e.provider === provider);
      stats[provider] = {
        examCount: providerExams.length,
        questionCount: providerExams.reduce((sum, e) => sum + e.totalQuestions, 0)
      };
    }
    return stats;
  }, [languageFilteredExams]);

  // Filter by selected provider
  const filteredExams = useMemo(() => {
    if (!selectedProvider) return [];
    return languageFilteredExams.filter(exam => exam.provider === selectedProvider);
  }, [languageFilteredExams, selectedProvider]);

  // Update stats when exams change
  useEffect(() => {
    const totalQuestions = languageFilteredExams.reduce((sum, e) => sum + e.totalQuestions, 0);
    setStats(prev => ({ ...prev, totalQuestions, totalExams: languageFilteredExams.length }));
  }, [languageFilteredExams]);

  // Auto-import sample data if no exams for current language
  useEffect(() => {
    const autoImport = async () => {
      if (!loading && languageFilteredExams.length === 0 && !importing) {
        setImporting(true);
        try {
          const langSuffix = language === 'ja' ? '-ja' : '';
          const examFiles = [
            'aws-aif-c01-set1',
            'aws-aif-c01-set2',
            'aws-aif-c01-set3',
            'azure-ai-102-set1',
            'azure-ai-102-set2',
            'azure-ai-102-set3',
            'gcp-ml-engineer-set1',
            'gcp-ml-engineer-set2',
            'gcp-ml-engineer-set3'
          ];
          for (const examFile of examFiles) {
            try {
              const res = await fetch(`./sample-data/${examFile}${langSuffix}.json`);
              if (res.ok) {
                const data = await res.json();
                await importExamFromJson(data);
              }
            } catch (e) {
              console.error(`Failed to import ${examFile}:`, e);
            }
          }
          await loadExams();
        } catch (e) {
          console.error('Auto-import failed:', e);
        } finally {
          setImporting(false);
        }
      }
    };
    autoImport();
  }, [loading, languageFilteredExams.length, importing, loadExams, language]);

  const handleDelete = async (examId: string) => {
    if (window.confirm(t.home.deleteConfirm)) {
      await deleteExam(examId);
    }
  };

  const handleReset = async () => {
    const confirmMsg = language === 'ja'
      ? 'すべてのデータをリセットしますか？'
      : '确定要重置所有数据吗？';
    if (window.confirm(confirmMsg)) {
      setImporting(true);
      try {
        await db.exams.clear();
        await db.questions.clear();
        await db.quizSessions.clear();
        await db.wrongAnswers.clear();

        const examFiles = [
          'aws-aif-c01-set1',
          'aws-aif-c01-set2',
          'aws-aif-c01-set3',
          'azure-ai-102-set1',
          'azure-ai-102-set2',
          'azure-ai-102-set3',
          'gcp-ml-engineer-set1',
          'gcp-ml-engineer-set2',
          'gcp-ml-engineer-set3'
        ];
        const languages = ['', '-ja'];
        for (const suffix of languages) {
          for (const examFile of examFiles) {
            try {
              const res = await fetch(`./sample-data/${examFile}${suffix}.json`);
              if (res.ok) {
                const data = await res.json();
                await importExamFromJson(data);
              }
            } catch (e) {
              console.error(`Failed to import ${examFile}${suffix}:`, e);
            }
          }
        }
        await loadExams();
      } catch (e) {
        console.error('Reset failed:', e);
      } finally {
        setImporting(false);
      }
    }
  };

  // Loading state
  if (loading || importing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
          <Loader2 size={48} className="relative animate-spin text-indigo-600" />
        </div>
        <p className="mt-5 text-lg text-gray-600">
          {importing ? (language === 'ja' ? 'データを読み込み中...' : '正在加载题库...') : (language === 'ja' ? '読み込み中...' : '加载中...')}
        </p>
      </div>
    );
  }

  // Exam list view (when provider is selected)
  if (selectedProvider) {
    const config = providerConfig[selectedProvider];
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.bgGradient} border-b ${config.borderColor}`}>
          <div className="px-6 lg:px-10 py-6">
            <button
              onClick={() => setSelectedProvider(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{language === 'ja' ? 'トップに戻る' : '返回首页'}</span>
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 ${config.iconBg} rounded-2xl shadow-lg`}>
                  <GraduationCap size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {config.shortName} {language === 'ja' ? '認定試験' : '认证考试'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {providerStats[selectedProvider]?.examCount || 0} {language === 'ja' ? 'セット' : '套题库'} · {providerStats[selectedProvider]?.questionCount || 0} {language === 'ja' ? '問' : '题'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  disabled={importing}
                  className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-xl transition-colors"
                  title={language === 'ja' ? 'リセット' : '重置数据'}
                >
                  <RefreshCw size={20} />
                </button>
                <ImportExam onImportSuccess={loadExams} />
              </div>
            </div>
          </div>
        </div>

        {/* Exam Grid */}
        <div className="px-6 lg:px-10 py-8">
          {error && (
            <div className="mb-5 p-4 bg-red-50 text-red-700 rounded-xl text-base border border-red-100">
              {error}
            </div>
          )}

          {filteredExams.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="inline-flex p-4 bg-gray-100 rounded-2xl mb-5">
                <BookOpen size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-3">
                {language === 'ja' ? 'この認定の試験がありません' : '暂无此认证的题库'}
              </h3>
              <p className="text-base text-gray-500">
                {language === 'ja' ? '試験をインポートしてください' : '请导入题库'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredExams.map(exam => (
                <ExamCard key={exam.id} exam={exam} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Cover page view (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative px-6 lg:px-10 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-200/50 mb-6">
              <Award className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                {language === 'ja' ? 'クラウド認定試験対策プラットフォーム' : '云认证考试备考平台'}
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              {language === 'ja' ? '効率的に学習\n確実に合格' : '高效学习\n稳过考试'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {language === 'ja'
                ? 'AWS、Azure、GCP の認定試験対策。練習モードと模擬試験で効果的に学習しましょう。'
                : '支持 AWS、Azure、GCP 云认证考试。通过练习模式和模拟考试高效备考。'
              }
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl shadow-md border border-gray-100">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalExams}</div>
                <div className="text-sm text-gray-500">{language === 'ja' ? '試験セット' : '套题库'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl shadow-md border border-gray-100">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalQuestions}</div>
                <div className="text-sm text-gray-500">{language === 'ja' ? '問題' : '道题目'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl shadow-md border border-gray-100">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.wrongCount}</div>
                <div className="text-sm text-gray-500">{language === 'ja' ? '要復習' : '待复习'}</div>
              </div>
            </div>
          </div>

          {/* Provider Cards */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center text-lg font-medium text-gray-500 mb-8">
              {language === 'ja' ? '認定試験を選択' : '选择认证考试'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.keys(providerConfig) as ProviderKey[]).map((provider) => {
                const config = providerConfig[provider];
                const stats = providerStats[provider] || { examCount: 0, questionCount: 0 };

                return (
                  <button
                    key={provider}
                    onClick={() => setSelectedProvider(provider)}
                    className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl ${config.hoverShadow} transition-all duration-300 border-2 ${config.borderColor} hover:border-transparent overflow-hidden text-left`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${config.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <GraduationCap size={32} className="text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${config.gradient}">
                      {config.shortName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                      {config.description[language === 'ja' ? 'ja' : 'zh']}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-700 font-medium">
                        {stats.examCount} {language === 'ja' ? 'セット' : '套'}
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-700 font-medium">
                        {stats.questionCount} {language === 'ja' ? '問' : '题'}
                      </span>
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={24} className="text-gray-400" />
                    </div>

                    {/* Sparkle effect */}
                    <Sparkles className="absolute top-6 right-6 w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-10 py-16 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-12">
            {language === 'ja' ? '学習機能' : '学习功能'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: language === 'ja' ? 'AI認定試験' : 'AI认证考试',
                desc: language === 'ja' ? '最新の問題' : '最新题目',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Zap,
                title: language === 'ja' ? '即座フィードバック' : '即时反馈',
                desc: language === 'ja' ? '練習モード' : '练习模式',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Target,
                title: language === 'ja' ? '弱点克服' : '错题追踪',
                desc: language === 'ja' ? '誤答管理' : '智能复习',
                color: 'from-pink-500 to-rose-500'
              },
              {
                icon: TrendingUp,
                title: language === 'ja' ? '本番形式' : '模拟考试',
                desc: language === 'ja' ? 'タイマー付き' : '计时测试',
                color: 'from-green-500 to-emerald-500'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 bg-white/50">
        <div className="text-center">
          <p className="text-gray-500">
            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">StudyForge</span>
            <span className="mx-2">·</span>
            {language === 'ja' ? 'クラウド認定試験対策ツール' : '云认证考试备考工具'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            AWS · Azure · GCP
          </p>
        </div>
      </footer>
    </div>
  );
};
