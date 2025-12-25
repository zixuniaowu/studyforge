import React, { useEffect, useState, useMemo } from 'react';
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
  Cloud,
  Layers,
  Filter
} from 'lucide-react';
import { importExamFromJson } from '../lib/import';
import { useT, useLanguageStore } from '../stores/languageStore';
import { db } from '../lib/db';

// Provider/Category configuration
const providerConfig = {
  all: {
    name: { zh: '全部', ja: 'すべて' },
    icon: Layers,
    color: 'from-gray-600 to-slate-600',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700'
  },
  AWS: {
    name: { zh: 'AWS', ja: 'AWS' },
    icon: Cloud,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700'
  },
  Azure: {
    name: { zh: 'Azure', ja: 'Azure' },
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700'
  },
  GCP: {
    name: { zh: 'GCP', ja: 'GCP' },
    icon: Cloud,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700'
  },
  Microsoft: {
    name: { zh: 'Microsoft', ja: 'Microsoft' },
    icon: Cloud,
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700'
  },
  Google: {
    name: { zh: 'Google', ja: 'Google' },
    icon: Cloud,
    color: 'from-red-500 to-yellow-500',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700'
  }
};

type ProviderKey = keyof typeof providerConfig;

export const HomePage: React.FC = () => {
  const { exams, loading, error, loadExams, deleteExam } = useExamStore();
  const [importing, setImporting] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProviderKey>('all');
  const [stats, setStats] = useState({ totalQuestions: 0, totalExams: 0, wrongCount: 0 });
  const t = useT();
  const language = useLanguageStore(state => state.language);

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

  // Get available providers from exams
  const availableProviders = useMemo(() => {
    const providers = new Set(languageFilteredExams.map(e => e.provider));
    return ['all', ...Array.from(providers)] as ProviderKey[];
  }, [languageFilteredExams]);

  // Filter by selected provider
  const filteredExams = useMemo(() => {
    if (selectedProvider === 'all') return languageFilteredExams;
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
          // Import all exam sets: AWS (3 sets), Azure (3 sets), GCP (3 sets)
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

  const features = [
    {
      icon: Brain,
      title: language === 'ja' ? 'AI認定試験' : 'AI认证考试',
      desc: language === 'ja' ? 'AWS/Azure/GCP' : 'AWS/Azure/GCP',
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative px-6 lg:px-10 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-200/50 mb-6">
              <Award className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                {language === 'ja' ? 'クラウド認定試験対策プラットフォーム' : '云认证考试备考平台'}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              {language === 'ja' ? '効率的に学習、確実に合格' : '高效学习，稳过考试'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'ja'
                ? 'AWS、Azure、GCPなどのクラウド認定試験に対応。AI、アーキテクト、DevOpsなど様々な認定に挑戦しましょう。'
                : '支持 AWS、Azure、GCP 等云厂商认证考试。涵盖 AI、架构师、DevOps 等多种认证类型。'
              }
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-3`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalExams}</div>
                <div className="text-xs text-gray-500">{language === 'ja' ? '試験セット' : '套题库'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalQuestions}</div>
                <div className="text-xs text-gray-500">{language === 'ja' ? '問題数' : '道题目'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Trophy className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.wrongCount}</div>
                <div className="text-xs text-gray-500">{language === 'ja' ? '要復習' : '待复习'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Filter & Exams Section */}
      <section className="px-6 lg:px-10 pb-12">
        {/* Section Header with Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t.home.title}</h2>
              <p className="text-sm text-gray-500">
                {language === 'ja' ? 'クラウドプロバイダーで絞り込み' : '按云厂商筛选题库'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              disabled={importing}
              className="flex items-center gap-2 p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              title={language === 'ja' ? 'リセット' : '重置数据'}
            >
              <RefreshCw size={20} className={importing ? 'animate-spin' : ''} />
            </button>
            <ImportExam onImportSuccess={loadExams} />
          </div>
        </div>

        {/* Provider Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-2 bg-gray-100/80 rounded-2xl">
          {availableProviders.map((provider) => {
            const config = providerConfig[provider] || providerConfig.all;
            const isActive = selectedProvider === provider;
            const count = provider === 'all'
              ? languageFilteredExams.length
              : languageFilteredExams.filter(e => e.provider === provider).length;

            return (
              <button
                key={provider}
                onClick={() => setSelectedProvider(provider)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200
                  ${isActive
                    ? `bg-white shadow-md text-gray-900`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }
                `}
              >
                {isActive && (
                  <div className={`p-1 rounded-lg bg-gradient-to-br ${config.color}`}>
                    <config.icon size={14} className="text-white" />
                  </div>
                )}
                <span>{config.name[language === 'ja' ? 'ja' : 'zh']}</span>
                <span className={`
                  px-2 py-0.5 text-xs rounded-full
                  ${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-600'}
                `}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="mb-5 p-4 bg-red-50 text-red-700 rounded-xl text-base border border-red-100">
            {error}
          </div>
        )}

        {loading || importing ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <Loader2 size={48} className="relative animate-spin text-indigo-600" />
            </div>
            {importing && <p className="mt-5 text-lg text-gray-600">{t.home.loadingSample}</p>}
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="inline-flex p-4 bg-gray-100 rounded-2xl mb-5">
              <Filter size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-3">
              {selectedProvider === 'all' ? t.home.noExams : (
                language === 'ja'
                  ? `${providerConfig[selectedProvider]?.name.ja || selectedProvider} の試験がありません`
                  : `暂无 ${providerConfig[selectedProvider]?.name.zh || selectedProvider} 考试`
              )}
            </h3>
            <p className="text-base text-gray-500">
              {language === 'ja' ? '他のプロバイダーを選択するか、試験をインポートしてください' : '请选择其他厂商或导入新的题库'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="text-center">
          <p className="text-gray-500">
            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">StudyForge</span>
            <span className="mx-2">·</span>
            {language === 'ja' ? 'クラウド認定試験対策ツール' : '云认证考试备考工具'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            AWS · Azure · GCP · {language === 'ja' ? 'その他多数' : '更多认证'}
          </p>
        </div>
      </footer>
    </div>
  );
};
