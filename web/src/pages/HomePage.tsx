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
  Award,
  Brain,
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Boxes,
  ExternalLink,
  Rocket,
  Code2,
  Database,
  Cpu,
  Globe
} from 'lucide-react';
import { importExamFromJson } from '../lib/import';
import { useT, useLanguageStore } from '../stores/languageStore';
import { db } from '../lib/db';

// Provider configuration for certification exams
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

// Learning category configuration
const learningConfig = {
  'ai-intro': {
    name: { zh: 'AI 入门', ja: 'AI入門' },
    description: {
      zh: '面向零基础学习者的 AI 入门指南，从基础概念到实践应用',
      ja: 'ゼロから始めるAI入門ガイド、基本概念から実践応用まで'
    },
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    bgGradient: 'from-violet-50 to-purple-50',
    borderColor: 'border-violet-200',
    iconBg: 'bg-violet-500',
    hoverShadow: 'hover:shadow-violet-200/50',
    icon: Lightbulb
  },
  'ai-resources': {
    name: { zh: 'AI 资源', ja: 'AIリソース' },
    description: {
      zh: '最新 AI 框架、工具和技术资源汇总',
      ja: '最新AIフレームワーク、ツール、技術リソースまとめ'
    },
    gradient: 'from-rose-500 via-pink-500 to-red-500',
    bgGradient: 'from-rose-50 to-pink-50',
    borderColor: 'border-rose-200',
    iconBg: 'bg-rose-500',
    hoverShadow: 'hover:shadow-rose-200/50',
    icon: Boxes
  }
};

type ProviderKey = keyof typeof providerConfig;
type LearningKey = keyof typeof learningConfig;
type ViewType = ProviderKey | LearningKey | null;

export const HomePage: React.FC = () => {
  const { exams, loading, error, loadExams, deleteExam } = useExamStore();
  const [importing, setImporting] = useState(false);
  const [selectedView, setSelectedView] = useState<ViewType>(null);
  const [stats, setStats] = useState({ totalQuestions: 0, totalExams: 0, wrongCount: 0 });
  const t = useT();
  const language = useLanguageStore(state => state.language);
  const location = useLocation();

  // Reset view when clicking header logo
  useEffect(() => {
    setSelectedView(null);
  }, [location.key]);

  useEffect(() => {
    const init = async () => {
      await loadExams();
      const wrongCount = await db.wrongAnswers.count();
      setStats(prev => ({ ...prev, wrongCount }));
    };
    init();
  }, [loadExams]);

  const langCode = language === 'ja' ? 'ja' : 'zh-CN';
  const languageFilteredExams = useMemo(() => {
    return exams.filter(exam => exam.language === langCode);
  }, [exams, langCode]);

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

  const filteredExams = useMemo(() => {
    if (!selectedView || selectedView in learningConfig) return [];
    return languageFilteredExams.filter(exam => exam.provider === selectedView);
  }, [languageFilteredExams, selectedView]);

  useEffect(() => {
    const totalQuestions = languageFilteredExams.reduce((sum, e) => sum + e.totalQuestions, 0);
    setStats(prev => ({ ...prev, totalQuestions, totalExams: languageFilteredExams.length }));
  }, [languageFilteredExams]);

  useEffect(() => {
    const autoImport = async () => {
      if (!loading && languageFilteredExams.length === 0 && !importing) {
        setImporting(true);
        try {
          const langSuffix = language === 'ja' ? '-ja' : '';
          const examFiles = [
            'aws-aif-c01-set1', 'aws-aif-c01-set2', 'aws-aif-c01-set3',
            'azure-ai-102-set1', 'azure-ai-102-set2', 'azure-ai-102-set3',
            'gcp-ml-engineer-set1', 'gcp-ml-engineer-set2', 'gcp-ml-engineer-set3'
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
    const confirmMsg = language === 'ja' ? 'すべてのデータをリセットしますか？' : '确定要重置所有数据吗？';
    if (window.confirm(confirmMsg)) {
      setImporting(true);
      try {
        await db.exams.clear();
        await db.questions.clear();
        await db.quizSessions.clear();
        await db.wrongAnswers.clear();
        const examFiles = [
          'aws-aif-c01-set1', 'aws-aif-c01-set2', 'aws-aif-c01-set3',
          'azure-ai-102-set1', 'azure-ai-102-set2', 'azure-ai-102-set3',
          'gcp-ml-engineer-set1', 'gcp-ml-engineer-set2', 'gcp-ml-engineer-set3'
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
  if (selectedView && selectedView in providerConfig) {
    const config = providerConfig[selectedView as ProviderKey];
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className={`bg-gradient-to-r ${config.bgGradient} border-b ${config.borderColor}`}>
          <div className="px-6 lg:px-10 py-6">
            <button
              onClick={() => setSelectedView(null)}
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
                    {providerStats[selectedView]?.examCount || 0} {language === 'ja' ? 'セット' : '套题库'} · {providerStats[selectedView]?.questionCount || 0} {language === 'ja' ? '問' : '题'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleReset} disabled={importing} className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-xl transition-colors" title={language === 'ja' ? 'リセット' : '重置数据'}>
                  <RefreshCw size={20} />
                </button>
                <ImportExam onImportSuccess={loadExams} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 lg:px-10 py-8">
          {error && <div className="mb-5 p-4 bg-red-50 text-red-700 rounded-xl text-base border border-red-100">{error}</div>}
          {filteredExams.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="inline-flex p-4 bg-gray-100 rounded-2xl mb-5"><BookOpen size={48} className="text-gray-400" /></div>
              <h3 className="text-xl font-semibold text-gray-600 mb-3">{language === 'ja' ? 'この認定の試験がありません' : '暂无此认证的题库'}</h3>
              <p className="text-base text-gray-500">{language === 'ja' ? '試験をインポートしてください' : '请导入题库'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredExams.map(exam => <ExamCard key={exam.id} exam={exam} onDelete={handleDelete} />)}
            </div>
          )}
        </div>
      </div>
    );
  }

  // AI Introduction view
  if (selectedView === 'ai-intro') {
    const config = learningConfig['ai-intro'];
    const introContent = {
      zh: {
        title: 'AI 入门指南',
        subtitle: '从零开始学习人工智能',
        sections: [
          {
            title: '什么是人工智能？',
            icon: Brain,
            content: '人工智能（AI）是计算机科学的一个分支，致力于创建能够执行通常需要人类智能的任务的系统。这包括学习、推理、问题解决、感知和语言理解等能力。'
          },
          {
            title: '机器学习基础',
            icon: Database,
            content: '机器学习是 AI 的核心技术，让计算机能够从数据中学习，而不需要明确编程。主要类型包括：监督学习、无监督学习和强化学习。'
          },
          {
            title: '深度学习入门',
            icon: Cpu,
            content: '深度学习是机器学习的子集，使用多层神经网络来学习数据的复杂模式。它是图像识别、自然语言处理等领域突破的关键技术。'
          },
          {
            title: '大语言模型（LLM）',
            icon: Globe,
            content: '大语言模型如 GPT、Claude 等，通过在海量文本数据上训练，能够理解和生成人类语言。它们正在改变我们与技术交互的方式。'
          }
        ],
        resources: [
          { title: 'Coursera - 机器学习课程', url: 'https://www.coursera.org/learn/machine-learning', desc: 'Andrew Ng 的经典入门课程' },
          { title: 'Fast.ai - 深度学习实践', url: 'https://www.fast.ai/', desc: '实践导向的深度学习课程' },
          { title: 'Hugging Face 教程', url: 'https://huggingface.co/learn', desc: 'NLP 和 Transformers 入门' }
        ]
      },
      ja: {
        title: 'AI入門ガイド',
        subtitle: 'ゼロから始める人工知能学習',
        sections: [
          {
            title: '人工知能とは？',
            icon: Brain,
            content: '人工知能（AI）は、通常人間の知能を必要とするタスクを実行できるシステムの作成を目指すコンピュータサイエンスの分野です。学習、推論、問題解決、知覚、言語理解などの能力が含まれます。'
          },
          {
            title: '機械学習の基礎',
            icon: Database,
            content: '機械学習はAIの核心技術であり、明示的にプログラムすることなく、データから学習することを可能にします。主な種類には、教師あり学習、教師なし学習、強化学習があります。'
          },
          {
            title: 'ディープラーニング入門',
            icon: Cpu,
            content: 'ディープラーニングは機械学習のサブセットで、多層ニューラルネットワークを使用してデータの複雑なパターンを学習します。画像認識や自然言語処理などの分野でのブレークスルーの鍵となる技術です。'
          },
          {
            title: '大規模言語モデル（LLM）',
            icon: Globe,
            content: 'GPT、Claudeなどの大規模言語モデルは、大量のテキストデータで訓練され、人間の言語を理解し生成できます。私たちとテクノロジーとの対話方法を変革しています。'
          }
        ],
        resources: [
          { title: 'Coursera - 機械学習コース', url: 'https://www.coursera.org/learn/machine-learning', desc: 'Andrew Ngの定番入門コース' },
          { title: 'Fast.ai - 深層学習実践', url: 'https://www.fast.ai/', desc: '実践重視の深層学習コース' },
          { title: 'Hugging Face チュートリアル', url: 'https://huggingface.co/learn', desc: 'NLPとTransformers入門' }
        ]
      }
    };
    const content = introContent[language === 'ja' ? 'ja' : 'zh'];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className={`bg-gradient-to-r ${config.bgGradient} border-b ${config.borderColor}`}>
          <div className="px-6 lg:px-10 py-6">
            <button onClick={() => setSelectedView(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
              <ArrowLeft size={20} />
              <span>{language === 'ja' ? 'トップに戻る' : '返回首页'}</span>
            </button>
            <div className="flex items-center gap-4">
              <div className={`p-3 ${config.iconBg} rounded-2xl shadow-lg`}>
                <Lightbulb size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{content.title}</h1>
                <p className="text-gray-600 mt-1">{content.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 lg:px-10 py-8 max-w-5xl mx-auto">
          <div className="grid gap-6 mb-12">
            {content.sections.map((section, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} flex-shrink-0`}>
                    <section.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Rocket className="text-violet-600" />
              {language === 'ja' ? '学習リソース' : '学习资源'}
            </h2>
            <div className="grid gap-4">
              {content.resources.map((resource, i) => (
                <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-all group">
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{resource.title}</h4>
                    <p className="text-sm text-gray-500">{resource.desc}</p>
                  </div>
                  <ExternalLink size={20} className="text-gray-400 group-hover:text-violet-600 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI Resources view
  if (selectedView === 'ai-resources') {
    const config = learningConfig['ai-resources'];
    const resourcesContent = {
      zh: {
        title: 'AI 资源汇总',
        subtitle: '最新框架、工具和技术',
        categories: [
          {
            title: 'AI 框架',
            icon: Code2,
            items: [
              { name: 'PyTorch', desc: 'Facebook 开源的深度学习框架', url: 'https://pytorch.org/' },
              { name: 'TensorFlow', desc: 'Google 开源的机器学习平台', url: 'https://www.tensorflow.org/' },
              { name: 'JAX', desc: 'Google 的高性能数值计算库', url: 'https://github.com/google/jax' },
              { name: 'Hugging Face', desc: 'NLP 模型和数据集中心', url: 'https://huggingface.co/' }
            ]
          },
          {
            title: 'LLM 工具',
            icon: Brain,
            items: [
              { name: 'LangChain', desc: 'LLM 应用开发框架', url: 'https://www.langchain.com/' },
              { name: 'LlamaIndex', desc: 'LLM 数据连接框架', url: 'https://www.llamaindex.ai/' },
              { name: 'Ollama', desc: '本地运行 LLM', url: 'https://ollama.ai/' },
              { name: 'vLLM', desc: '高性能 LLM 推理引擎', url: 'https://vllm.ai/' }
            ]
          },
          {
            title: 'AI 平台',
            icon: Globe,
            items: [
              { name: 'OpenAI', desc: 'GPT 系列模型提供商', url: 'https://openai.com/' },
              { name: 'Anthropic', desc: 'Claude AI 开发商', url: 'https://www.anthropic.com/' },
              { name: 'Google AI', desc: 'Gemini 等模型', url: 'https://ai.google/' },
              { name: 'AWS Bedrock', desc: '托管 AI 服务', url: 'https://aws.amazon.com/bedrock/' }
            ]
          }
        ]
      },
      ja: {
        title: 'AIリソースまとめ',
        subtitle: '最新フレームワーク、ツール、技術',
        categories: [
          {
            title: 'AIフレームワーク',
            icon: Code2,
            items: [
              { name: 'PyTorch', desc: 'Facebookのオープンソース深層学習フレームワーク', url: 'https://pytorch.org/' },
              { name: 'TensorFlow', desc: 'Googleのオープンソース機械学習プラットフォーム', url: 'https://www.tensorflow.org/' },
              { name: 'JAX', desc: 'Googleの高性能数値計算ライブラリ', url: 'https://github.com/google/jax' },
              { name: 'Hugging Face', desc: 'NLPモデルとデータセットのハブ', url: 'https://huggingface.co/' }
            ]
          },
          {
            title: 'LLMツール',
            icon: Brain,
            items: [
              { name: 'LangChain', desc: 'LLMアプリ開発フレームワーク', url: 'https://www.langchain.com/' },
              { name: 'LlamaIndex', desc: 'LLMデータ接続フレームワーク', url: 'https://www.llamaindex.ai/' },
              { name: 'Ollama', desc: 'ローカルでLLMを実行', url: 'https://ollama.ai/' },
              { name: 'vLLM', desc: '高性能LLM推論エンジン', url: 'https://vllm.ai/' }
            ]
          },
          {
            title: 'AIプラットフォーム',
            icon: Globe,
            items: [
              { name: 'OpenAI', desc: 'GPTシリーズモデル提供', url: 'https://openai.com/' },
              { name: 'Anthropic', desc: 'Claude AI開発元', url: 'https://www.anthropic.com/' },
              { name: 'Google AI', desc: 'Geminiなどのモデル', url: 'https://ai.google/' },
              { name: 'AWS Bedrock', desc: 'マネージドAIサービス', url: 'https://aws.amazon.com/bedrock/' }
            ]
          }
        ]
      }
    };
    const content = resourcesContent[language === 'ja' ? 'ja' : 'zh'];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className={`bg-gradient-to-r ${config.bgGradient} border-b ${config.borderColor}`}>
          <div className="px-6 lg:px-10 py-6">
            <button onClick={() => setSelectedView(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
              <ArrowLeft size={20} />
              <span>{language === 'ja' ? 'トップに戻る' : '返回首页'}</span>
            </button>
            <div className="flex items-center gap-4">
              <div className={`p-3 ${config.iconBg} rounded-2xl shadow-lg`}>
                <Boxes size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{content.title}</h1>
                <p className="text-gray-600 mt-1">{content.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {content.categories.map((category, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${config.gradient}`}>
                    <category.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.items.map((item, j) => (
                    <a key={j} href={item.url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 group-hover:text-rose-600 transition-colors">{item.name}</span>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-rose-600 transition-colors" />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Cover page view (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative px-6 lg:px-10 py-12 lg:py-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-200/50 mb-6">
              <Award className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                {language === 'ja' ? 'AI学習・認定試験プラットフォーム' : 'AI 学习与认证考试平台'}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              {language === 'ja' ? '効率的に学習、確実に合格' : '高效学习，稳过考试'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'ja'
                ? 'AI入門から認定試験対策まで、あなたの学習をサポートします'
                : '从 AI 入门到认证考试，全方位支持你的学习之旅'
              }
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-indigo-100 rounded-lg"><BookOpen className="w-5 h-5 text-indigo-600" /></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalExams}</div>
                <div className="text-xs text-gray-500">{language === 'ja' ? '試験セット' : '套题库'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-green-100 rounded-lg"><Target className="w-5 h-5 text-green-600" /></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalQuestions}</div>
                <div className="text-xs text-gray-500">{language === 'ja' ? '問題' : '道题目'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 bg-amber-100 rounded-lg"><Trophy className="w-5 h-5 text-amber-600" /></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.wrongCount}</div>
                <div className="text-xs text-gray-500">{language === 'ja' ? '要復習' : '待复习'}</div>
              </div>
            </div>
          </div>

          {/* Certification Exams Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-center text-xl font-bold text-gray-800 mb-2">
              {language === 'ja' ? '認定試験' : '认证考试'}
            </h2>
            <p className="text-center text-gray-500 mb-8">
              {language === 'ja' ? 'クラウドAI認定試験の対策' : '云厂商 AI 认证考试备考'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.keys(providerConfig) as ProviderKey[]).map((provider) => {
                const config = providerConfig[provider];
                const pStats = providerStats[provider] || { examCount: 0, questionCount: 0 };
                return (
                  <button
                    key={provider}
                    onClick={() => setSelectedView(provider)}
                    className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl ${config.hoverShadow} transition-all duration-300 border-2 ${config.borderColor} hover:border-transparent overflow-hidden text-left`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${config.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <GraduationCap size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{config.shortName}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{config.description[language === 'ja' ? 'ja' : 'zh']}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-2.5 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">{pStats.examCount} {language === 'ja' ? 'セット' : '套'}</span>
                      <span className="px-2.5 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">{pStats.questionCount} {language === 'ja' ? '問' : '题'}</span>
                    </div>
                    <ChevronRight size={20} className="absolute bottom-6 right-6 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Learning Section */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-xl font-bold text-gray-800 mb-2">
              {language === 'ja' ? 'AI学習' : 'AI 学习'}
            </h2>
            <p className="text-center text-gray-500 mb-8">
              {language === 'ja' ? '入門から最新技術まで' : '从入门到最新技术'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(Object.keys(learningConfig) as LearningKey[]).map((key) => {
                const config = learningConfig[key];
                const IconComponent = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedView(key)}
                    className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl ${config.hoverShadow} transition-all duration-300 border-2 ${config.borderColor} hover:border-transparent overflow-hidden text-left`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${config.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{config.name[language === 'ja' ? 'ja' : 'zh']}</h3>
                    <p className="text-sm text-gray-500">{config.description[language === 'ja' ? 'ja' : 'zh']}</p>
                    <ChevronRight size={20} className="absolute bottom-6 right-6 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 bg-white/50">
        <div className="text-center">
          <p className="text-gray-500">
            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">StudyForge</span>
            <span className="mx-2">·</span>
            {language === 'ja' ? 'AI学習プラットフォーム' : 'AI 学习平台'}
          </p>
        </div>
      </footer>
    </div>
  );
};
