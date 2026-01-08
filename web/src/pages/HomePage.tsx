import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useExamStore } from '../stores/examStore';
import { ExamCard } from '../components/Exam/ExamCard';
import { ImportExam } from '../components/Exam/ImportExam';
import {
  BookOpen,
  Loader2,
  RefreshCw,
  Trophy,
  Target,
  Brain,
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Boxes,
  Rocket,
  Code2,
  Database,
  Cpu,
  Globe,
  Map,
  Building2,
  Cog,
  Shield,
  Network,
  HardDrive,
  Sparkles,
  Users,
  LucideIcon,
  Clock,
  BarChart3,
  Award,
  Play,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { importExamFromJson } from '../lib/import';
import { useT, useLanguageStore } from '../stores/languageStore';
import { db } from '../lib/db';
import { careerPaths } from '../data/certifications';

// Career icons mapping
const careerIcons: Record<string, LucideIcon> = {
  'cloud-architect': Building2,
  'ai-engineer': Brain,
  'genai-engineer': Sparkles,
  'data-engineer': Database,
  'devops-engineer': Cog,
  'security-engineer': Shield,
  'network-engineer': Network,
  'database-engineer': HardDrive,
  'cloud-developer': Code2,
  'enterprise-admin': Users
};

// Career gradient colors
const careerGradients: Record<string, string> = {
  'cloud-architect': 'from-blue-500 to-indigo-600',
  'ai-engineer': 'from-purple-500 to-pink-600',
  'genai-engineer': 'from-violet-500 to-fuchsia-600',
  'data-engineer': 'from-emerald-500 to-teal-600',
  'devops-engineer': 'from-orange-500 to-red-600',
  'security-engineer': 'from-slate-500 to-zinc-700',
  'network-engineer': 'from-cyan-500 to-blue-600',
  'database-engineer': 'from-amber-500 to-orange-600',
  'cloud-developer': 'from-green-500 to-emerald-600',
  'enterprise-admin': 'from-rose-500 to-pink-600'
};

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
  'cert-path': {
    name: { zh: '认证路径', ja: '認定パス' },
    description: {
      zh: 'AWS、Azure、GCP 云认证学习路径图谱，包含依赖关系和职业建议',
      ja: 'AWS、Azure、GCPクラウド認定学習パス、依存関係とキャリアアドバイス'
    },
    gradient: 'from-cyan-500 via-teal-500 to-emerald-500',
    bgGradient: 'from-cyan-50 to-teal-50',
    borderColor: 'border-cyan-200',
    iconBg: 'bg-cyan-500',
    hoverShadow: 'hover:shadow-cyan-200/50',
    icon: Map
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
  const [certCodeFilter, setCertCodeFilter] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalQuestions: 0, totalExams: 0, wrongCount: 0 });
  const [learningStats, setLearningStats] = useState({
    // Overall stats
    totalAnswered: 0,
    overallCorrectRate: 0,
    studyDays: 0,
    // Practice mode stats
    practiceQuestions: 0,
    practiceCorrectRate: 0,
    // Exam mode stats
    examCount: 0,
    examAvgScore: 0,
    examPassRate: 0,
    // Per-certification stats
    certStats: [] as { certCode: string; provider: string; questionsAnswered: number; correctRate: number; bestScore: number }[],
    // Recent sessions
    recentSessions: [] as { examName: string; score: number; date: string; mode: string }[]
  });
  const t = useT();
  const language = useLanguageStore(state => state.language);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation: read provider and certCode from state or reset view
  useEffect(() => {
    const state = location.state as { provider?: string; certCode?: string } | null;
    if (state?.provider && ['AWS', 'Azure', 'GCP'].includes(state.provider)) {
      setSelectedView(state.provider as ProviderKey);
      setCertCodeFilter(state.certCode || null);
      // Clear the state so it doesn't persist on refresh
      window.history.replaceState({}, document.title);
    } else {
      // Reset view when clicking header logo (no provider state)
      setSelectedView(null);
      setCertCodeFilter(null);
    }
  }, [location.key, location.state]);

  useEffect(() => {
    const init = async () => {
      await loadExams();
      const wrongAnswers = await db.wrongAnswers.filter(w => !w.mastered).toArray();
      const wrongCount = wrongAnswers.length;
      setStats(prev => ({ ...prev, wrongCount }));

      // Load learning stats from quiz sessions
      const sessions = await db.quizSessions.toArray();
      const completedSessions = sessions.filter(s => s.completed && s.score !== undefined);

      if (completedSessions.length > 0) {
        // Overall stats
        const totalAnswered = completedSessions.reduce((sum, s) => sum + s.questions.length, 0);
        const overallCorrectRate = Math.round(
          completedSessions.reduce((sum, s) => sum + (s.score || 0), 0) / completedSessions.length
        );

        // Study days (unique dates)
        const studyDates = new Set(
          completedSessions.map(s => (s.endTime || s.startTime).split('T')[0])
        );
        const studyDays = studyDates.size;

        // Practice mode stats
        const practiceSessions = completedSessions.filter(s => s.mode === 'practice');
        const practiceQuestions = practiceSessions.reduce((sum, s) => sum + s.questions.length, 0);
        const practiceCorrectRate = practiceSessions.length > 0
          ? Math.round(practiceSessions.reduce((sum, s) => sum + (s.score || 0), 0) / practiceSessions.length)
          : 0;

        // Exam mode stats
        const examSessions = completedSessions.filter(s => s.mode === 'exam');
        const examCount = examSessions.length;
        const examAvgScore = examCount > 0
          ? Math.round(examSessions.reduce((sum, s) => sum + (s.score || 0), 0) / examCount)
          : 0;
        const examPassRate = examCount > 0
          ? Math.round((examSessions.filter(s => (s.score || 0) >= 70).length / examCount) * 100)
          : 0;

        // Per-certification stats
        type CertData = { questions: number; totalScore: number; count: number; bestScore: number; provider: string };
        const certMap: Record<string, CertData> = {};
        completedSessions.forEach(s => {
          // Extract cert code from examId (e.g., "aws-aif-c01-set1-ja" -> "AWS-AIF-C01")
          const parts = s.examId.split('-');
          const provider = parts[0].toUpperCase();
          const certCode = parts.slice(0, 3).join('-').toUpperCase();

          if (!certMap[certCode]) {
            certMap[certCode] = { questions: 0, totalScore: 0, count: 0, bestScore: 0, provider };
          }
          certMap[certCode].questions += s.questions.length;
          certMap[certCode].totalScore += s.score || 0;
          certMap[certCode].count += 1;
          certMap[certCode].bestScore = Math.max(certMap[certCode].bestScore, s.score || 0);
        });

        const certStats = Object.entries(certMap).map(([certCode, data]) => ({
          certCode,
          provider: data.provider,
          questionsAnswered: data.questions,
          correctRate: Math.round(data.totalScore / data.count),
          bestScore: data.bestScore
        })).sort((a, b) => b.questionsAnswered - a.questionsAnswered);

        // Recent sessions (last 5)
        const recentSessions = completedSessions
          .sort((a, b) => new Date(b.endTime || b.startTime).getTime() - new Date(a.endTime || a.startTime).getTime())
          .slice(0, 5)
          .map(s => ({
            examName: s.examId.split('-').slice(0, 3).join('-').toUpperCase(),
            score: s.score || 0,
            date: s.endTime || s.startTime,
            mode: s.mode
          }));

        setLearningStats({
          totalAnswered,
          overallCorrectRate,
          studyDays,
          practiceQuestions,
          practiceCorrectRate,
          examCount,
          examAvgScore,
          examPassRate,
          certStats,
          recentSessions
        });
      }
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
    let result = languageFilteredExams.filter(exam => exam.provider === selectedView);
    // If certCode filter is set, filter by exam ID containing the cert code
    if (certCodeFilter) {
      result = result.filter(exam =>
        exam.id.toLowerCase().includes(certCodeFilter.toLowerCase())
      );
    }
    return result;
  }, [languageFilteredExams, selectedView, certCodeFilter]);

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
            // AWS
            'aws-aif-c01-set1', 'aws-aif-c01-set2', 'aws-aif-c01-set3',
            'aws-ans-c01-set1', 'aws-ans-c01-set2', 'aws-ans-c01-set3',
            'aws-clf-c02-set1', 'aws-clf-c02-set2', 'aws-clf-c02-set3',
            'aws-dbs-c01-set1', 'aws-dbs-c01-set2', 'aws-dbs-c01-set3',
            'aws-dea-c01-set1', 'aws-dea-c01-set2', 'aws-dea-c01-set3',
            'aws-dop-c02-set1', 'aws-dop-c02-set2', 'aws-dop-c02-set3',
            'aws-dva-c02-set1', 'aws-dva-c02-set2', 'aws-dva-c02-set3',
            'aws-mla-c01-set1', 'aws-mla-c01-set2', 'aws-mla-c01-set3',
            'aws-mls-c01-set1', 'aws-mls-c01-set2', 'aws-mls-c01-set3',
            'aws-saa-c03-set1', 'aws-saa-c03-set2', 'aws-saa-c03-set3',
            'aws-sap-c02-set1', 'aws-sap-c02-set2', 'aws-sap-c02-set3',
            'aws-scs-c02-set1', 'aws-scs-c02-set2',
            'aws-soa-c02-set1', 'aws-soa-c02-set2', 'aws-soa-c02-set3',
            // Azure
            'azure-ai-102-set1', 'azure-ai-102-set2', 'azure-ai-102-set3',
            'azure-ai-900-set1', 'azure-ai-900-set2', 'azure-ai-900-set3',
            'azure-az-104-set1', 'azure-az-104-set2', 'azure-az-104-set3',
            'azure-az-140-set1', 'azure-az-140-set2', 'azure-az-140-set3',
            'azure-az-204-set1', 'azure-az-204-set2', 'azure-az-204-set3',
            'azure-az-305-set1', 'azure-az-305-set2', 'azure-az-305-set3',
            'azure-az-400-set1', 'azure-az-400-set2', 'azure-az-400-set3',
            'azure-az-500-set1', 'azure-az-500-set2', 'azure-az-500-set3',
            'azure-az-700-set1', 'azure-az-700-set2', 'azure-az-700-set3',
            'azure-az-900-set1', 'azure-az-900-set2', 'azure-az-900-set3',
            'azure-dp-100-set1', 'azure-dp-100-set2', 'azure-dp-100-set3',
            'azure-dp-203-set1', 'azure-dp-203-set2', 'azure-dp-203-set3',
            'azure-dp-300-set1', 'azure-dp-300-set2', 'azure-dp-300-set3',
            'azure-dp-900-set1', 'azure-dp-900-set2', 'azure-dp-900-set3',
            'azure-pl-900-set1', 'azure-pl-900-set2', 'azure-pl-900-set3',
            'azure-sc-200-set1', 'azure-sc-200-set2', 'azure-sc-200-set3',
            'azure-sc-300-set1', 'azure-sc-300-set2', 'azure-sc-300-set3',
            'azure-sc-900-set1', 'azure-sc-900-set2', 'azure-sc-900-set3',
            // GCP
            'gcp-ace-set1', 'gcp-ace-set2', 'gcp-ace-set3',
            'gcp-adp-set1', 'gcp-adp-set2', 'gcp-adp-set3',
            'gcp-awa-set1', 'gcp-awa-set2', 'gcp-awa-set3',
            'gcp-cdl-set1', 'gcp-cdl-set2', 'gcp-cdl-set3',
            'gcp-gail-set1', 'gcp-gail-set2', 'gcp-gail-set3',
            'gcp-ml-engineer-set1', 'gcp-ml-engineer-set2', 'gcp-ml-engineer-set3',
            'gcp-pca-set1', 'gcp-pca-set2', 'gcp-pca-set3',
            'gcp-pcdev-set1', 'gcp-pcdev-set2', 'gcp-pcdev-set3',
            'gcp-pdba-set1', 'gcp-pdba-set2', 'gcp-pdba-set3',
            'gcp-pde-set1', 'gcp-pde-set2', 'gcp-pde-set3',
            'gcp-pdevops-set1', 'gcp-pdevops-set2', 'gcp-pdevops-set3',
            'gcp-pne-set1', 'gcp-pne-set2', 'gcp-pne-set3',
            'gcp-pse-set1', 'gcp-pse-set2', 'gcp-pse-set3',
            'gcp-pwa-set1', 'gcp-pwa-set2', 'gcp-pwa-set3'
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
          // AWS
          'aws-aif-c01-set1', 'aws-aif-c01-set2', 'aws-aif-c01-set3',
          'aws-ans-c01-set1', 'aws-ans-c01-set2', 'aws-ans-c01-set3',
          'aws-clf-c02-set1', 'aws-clf-c02-set2', 'aws-clf-c02-set3',
          'aws-dbs-c01-set1', 'aws-dbs-c01-set2', 'aws-dbs-c01-set3',
          'aws-dea-c01-set1', 'aws-dea-c01-set2', 'aws-dea-c01-set3',
          'aws-dop-c02-set1', 'aws-dop-c02-set2', 'aws-dop-c02-set3',
          'aws-dva-c02-set1', 'aws-dva-c02-set2', 'aws-dva-c02-set3',
          'aws-mla-c01-set1', 'aws-mla-c01-set2', 'aws-mla-c01-set3',
          'aws-mls-c01-set1', 'aws-mls-c01-set2', 'aws-mls-c01-set3',
          'aws-saa-c03-set1', 'aws-saa-c03-set2', 'aws-saa-c03-set3',
          'aws-sap-c02-set1', 'aws-sap-c02-set2', 'aws-sap-c02-set3',
          'aws-scs-c02-set1', 'aws-scs-c02-set2',
          'aws-soa-c02-set1', 'aws-soa-c02-set2', 'aws-soa-c02-set3',
          // Azure
          'azure-ai-102-set1', 'azure-ai-102-set2', 'azure-ai-102-set3',
          'azure-ai-900-set1', 'azure-ai-900-set2', 'azure-ai-900-set3',
          'azure-az-104-set1', 'azure-az-104-set2', 'azure-az-104-set3',
          'azure-az-140-set1', 'azure-az-140-set2', 'azure-az-140-set3',
          'azure-az-204-set1', 'azure-az-204-set2', 'azure-az-204-set3',
          'azure-az-305-set1', 'azure-az-305-set2', 'azure-az-305-set3',
          'azure-az-400-set1', 'azure-az-400-set2', 'azure-az-400-set3',
          'azure-az-500-set1', 'azure-az-500-set2', 'azure-az-500-set3',
          'azure-az-700-set1', 'azure-az-700-set2', 'azure-az-700-set3',
          'azure-az-900-set1', 'azure-az-900-set2', 'azure-az-900-set3',
          'azure-dp-100-set1', 'azure-dp-100-set2', 'azure-dp-100-set3',
          'azure-dp-203-set1', 'azure-dp-203-set2', 'azure-dp-203-set3',
          'azure-dp-300-set1', 'azure-dp-300-set2', 'azure-dp-300-set3',
          'azure-dp-900-set1', 'azure-dp-900-set2', 'azure-dp-900-set3',
          'azure-pl-900-set1', 'azure-pl-900-set2', 'azure-pl-900-set3',
          'azure-sc-200-set1', 'azure-sc-200-set2', 'azure-sc-200-set3',
          'azure-sc-300-set1', 'azure-sc-300-set2', 'azure-sc-300-set3',
          'azure-sc-900-set1', 'azure-sc-900-set2', 'azure-sc-900-set3',
          // GCP
          'gcp-ace-set1', 'gcp-ace-set2', 'gcp-ace-set3',
          'gcp-adp-set1', 'gcp-adp-set2', 'gcp-adp-set3',
          'gcp-awa-set1', 'gcp-awa-set2', 'gcp-awa-set3',
          'gcp-cdl-set1', 'gcp-cdl-set2', 'gcp-cdl-set3',
          'gcp-gail-set1', 'gcp-gail-set2', 'gcp-gail-set3',
          'gcp-ml-engineer-set1', 'gcp-ml-engineer-set2', 'gcp-ml-engineer-set3',
          'gcp-pca-set1', 'gcp-pca-set2', 'gcp-pca-set3',
          'gcp-pcdev-set1', 'gcp-pcdev-set2', 'gcp-pcdev-set3',
          'gcp-pdba-set1', 'gcp-pdba-set2', 'gcp-pdba-set3',
          'gcp-pde-set1', 'gcp-pde-set2', 'gcp-pde-set3',
          'gcp-pdevops-set1', 'gcp-pdevops-set2', 'gcp-pdevops-set3',
          'gcp-pne-set1', 'gcp-pne-set2', 'gcp-pne-set3',
          'gcp-pse-set1', 'gcp-pse-set2', 'gcp-pse-set3',
          'gcp-pwa-set1', 'gcp-pwa-set2', 'gcp-pwa-set3'
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
          <div className="px-3 lg:px-6 py-4">
            <button
              onClick={() => { setSelectedView(null); setCertCodeFilter(null); }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              <span>{language === 'ja' ? 'トップに戻る' : '返回首页'}</span>
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${config.iconBg} rounded-xl shadow-lg`}>
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {config.shortName} {certCodeFilter ? certCodeFilter.toUpperCase() : (language === 'ja' ? '認定試験' : '认证考试')}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {filteredExams.length} {language === 'ja' ? 'セット' : '套题库'}
                    {certCodeFilter && (
                      <button
                        onClick={() => setCertCodeFilter(null)}
                        className="ml-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        {language === 'ja' ? 'すべて表示' : '显示全部'}
                      </button>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleReset} disabled={importing} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg transition-colors" title={language === 'ja' ? 'リセット' : '重置数据'}>
                  <RefreshCw size={18} />
                </button>
                <ImportExam onImportSuccess={loadExams} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 lg:px-6 py-6">
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
          { title: 'Coursera - 机器学习课程', desc: 'Andrew Ng 经典入门课程，系统学习ML基础' },
          { title: 'Fast.ai - 深度学习实践', desc: '实践导向，Top-down教学，快速上手' },
          { title: 'Hugging Face 教程', desc: 'NLP 和 Transformers 入门，免费开源' }
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
          { title: 'Coursera - 機械学習コース', desc: 'Andrew Ng経典入門コース、ML基礎を体系学習' },
          { title: 'Fast.ai - 深層学習実践', desc: '実践重視、トップダウン教授法、すぐに始められる' },
          { title: 'Hugging Face チュートリアル', desc: 'NLPとTransformers入門、無料オープンソース' }
        ]
      }
    };
    const content = introContent[language === 'ja' ? 'ja' : 'zh'];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className={`bg-gradient-to-r ${config.bgGradient} border-b ${config.borderColor}`}>
          <div className="px-3 lg:px-6 py-4">
            <button onClick={() => setSelectedView(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors text-sm">
              <ArrowLeft size={16} />
              <span>{language === 'ja' ? 'トップに戻る' : '返回首页'}</span>
            </button>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${config.iconBg} rounded-xl shadow-lg`}>
                <Lightbulb size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{content.title}</h1>
                <p className="text-gray-600 text-sm">{content.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 lg:px-6 py-6 max-w-5xl mx-auto">
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
                <div key={i} className="flex items-center p-4 bg-white rounded-xl hover:shadow-md transition-all group">
                  <div>
                    <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                    <p className="text-sm text-gray-500">{resource.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cover page view (default)
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Main Content Section */}
      <section className="relative">

        <div className="relative px-3 lg:px-6 py-6 lg:py-8">
          {/* Centered Hero Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-5xl font-bold text-stone-800 mb-2">
              {language === 'ja' ? '効率的に学習、確実に合格' : '高效学习，稳过考试'}
            </h1>
            <p className="text-lg text-stone-500">
              {language === 'ja' ? 'AWS・Azure・GCP クラウド認定試験対策' : 'AWS・Azure・GCP 云认证考试备考'}
            </p>
            {/* Stats Row */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm">
                <BookOpen className="w-5 h-5 text-cyan-600" />
                <span className="text-lg font-semibold text-stone-800">{stats.totalExams}</span>
                <span className="text-sm text-stone-500">{language === 'ja' ? 'セット' : '套'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm">
                <Target className="w-5 h-5 text-emerald-600" />
                <span className="text-lg font-semibold text-stone-800">{stats.totalQuestions}</span>
                <span className="text-sm text-stone-500">{language === 'ja' ? '問' : '题'}</span>
              </div>
              {stats.wrongCount > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-200">
                  <Trophy className="w-5 h-5 text-amber-600" />
                  <span className="text-lg font-semibold text-amber-700">{stats.wrongCount}</span>
                  <span className="text-sm text-amber-600">{language === 'ja' ? '要復習' : '待复习'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Career Path Recommendation Section */}
          <div className="mb-8">
            <h2 className="text-center text-xl font-bold text-stone-800 mb-1">
              {language === 'ja' ? 'キャリアパスで選ぶ' : '按职业路径选择'}
            </h2>
            <p className="text-center text-stone-500 text-base mb-4">
              {language === 'ja' ? '目標のキャリアに合った認定資格を探す' : '找到适合你职业目标的认证资格'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {careerPaths.map((path) => {
                const IconComponent = careerIcons[path.id] || Building2;
                const gradient = careerGradients[path.id] || 'from-gray-500 to-gray-600';
                return (
                  <button
                    key={path.id}
                    onClick={() => navigate(`/certification-path?career=${path.id}`)}
                    className="group relative bg-white rounded-xl p-4 border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-stone-700 group-hover:text-stone-900 transition-colors leading-tight">
                        {path.name[language === 'ja' ? 'ja' : 'zh']}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => navigate('/certification-path')}
                className="inline-flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
              >
                {language === 'ja' ? 'すべての認定資格を見る' : '查看全部认证'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Certification Exams Section */}
          <div className="mb-8">
            <h2 className="text-center text-2xl font-bold text-stone-800 mb-1">
              {language === 'ja' ? '認定試験' : '认证考试'}
            </h2>
            <p className="text-center text-stone-500 text-lg mb-4">
              {language === 'ja' ? 'クラウドAI認定試験の対策' : '云厂商 AI 认证考试备考'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.keys(providerConfig) as ProviderKey[]).map((provider) => {
                const config = providerConfig[provider];
                const pStats = providerStats[provider] || { examCount: 0, questionCount: 0 };
                return (
                  <button
                    key={provider}
                    onClick={() => setSelectedView(provider)}
                    className="group relative bg-white rounded-xl p-5 border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-300 text-left"
                  >
                    <div className="relative flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <GraduationCap size={26} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-stone-800">{config.shortName}</h3>
                        <p className="text-base text-stone-500 truncate">{config.description[language === 'ja' ? 'ja' : 'zh']}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-stone-100 rounded-full text-stone-600">{pStats.examCount}{language === 'ja' ? 'セット' : '套'}</span>
                        <span className="px-3 py-1 bg-stone-100 rounded-full text-stone-600">{pStats.questionCount}{language === 'ja' ? '問' : '题'}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Learning Dashboard Section */}
          <div>
            <h2 className="text-center text-2xl font-bold text-stone-800 mb-1">
              {language === 'ja' ? '学習ダッシュボード' : '学习仪表盘'}
            </h2>
            <p className="text-center text-stone-500 text-lg mb-4">
              {language === 'ja' ? '学習進捗とリソース' : '学习进度与资源'}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Overall Stats Card */}
              <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
                <h3 className="text-base font-semibold text-stone-600 mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-cyan-600" />
                  {language === 'ja' ? '総合統計' : '总体统计'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-500">{language === 'ja' ? '総回答数' : '总答题数'}</span>
                    <span className="text-xl font-bold text-cyan-600">{learningStats.totalAnswered}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-500">{language === 'ja' ? '総正解率' : '总正确率'}</span>
                    <span className="text-xl font-bold text-emerald-600">{learningStats.overallCorrectRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-500">{language === 'ja' ? '学習日数' : '学习天数'}</span>
                    <span className="text-xl font-bold text-purple-600">{learningStats.studyDays}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-500">{language === 'ja' ? '要復習' : '待复习'}</span>
                    <span className={`text-xl font-bold ${stats.wrongCount > 0 ? 'text-amber-600' : 'text-stone-400'}`}>{stats.wrongCount}</span>
                  </div>
                </div>
              </div>

              {/* Practice & Exam Mode Stats */}
              <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
                <h3 className="text-base font-semibold text-stone-600 mb-4 flex items-center gap-2">
                  <Target size={18} className="text-emerald-600" />
                  {language === 'ja' ? 'モード別統計' : '模式统计'}
                </h3>
                <div className="space-y-3">
                  {/* Practice Mode */}
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Play size={14} className="text-green-600" />
                      <span className="text-sm text-green-700 font-medium">{language === 'ja' ? '練習モード' : '练习模式'}</span>
                    </div>
                    <div className="flex items-center justify-between text-base">
                      <span className="text-stone-500">{learningStats.practiceQuestions}{language === 'ja' ? '問' : '题'}</span>
                      <span className="font-semibold text-green-600">{learningStats.practiceCorrectRate}%</span>
                    </div>
                  </div>
                  {/* Exam Mode */}
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      <FileCheck size={14} className="text-red-600" />
                      <span className="text-sm text-red-700 font-medium">{language === 'ja' ? '模擬試験' : '模拟考试'}</span>
                    </div>
                    <div className="flex items-center justify-between text-base">
                      <span className="text-stone-500">{learningStats.examCount}{language === 'ja' ? '回' : '次'}</span>
                      <span className="font-semibold text-red-600">{learningStats.examAvgScore}%</span>
                    </div>
                    {learningStats.examCount > 0 && (
                      <div className="text-sm text-stone-500 mt-1">
                        {language === 'ja' ? '合格率' : '通过率'}: {learningStats.examPassRate}%
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Sessions Card */}
              <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
                <h3 className="text-base font-semibold text-stone-600 mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-purple-600" />
                  {language === 'ja' ? '最近の学習' : '最近学习'}
                </h3>
                {learningStats.recentSessions.length > 0 ? (
                  <div className="space-y-2">
                    {learningStats.recentSessions.slice(0, 4).map((session, i) => (
                      <div key={i} className="flex items-center justify-between text-base">
                        <div className="flex items-center gap-2">
                          {session.mode === 'exam' ? (
                            <FileCheck size={12} className="text-red-500" />
                          ) : (
                            <Play size={12} className="text-green-500" />
                          )}
                          <span className="text-stone-600 text-sm">{session.examName}</span>
                        </div>
                        <span className={`font-semibold text-sm ${session.score >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {session.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-base text-stone-400 py-4">
                    {language === 'ja' ? 'まだ学習記録がありません' : '暂无学习记录'}
                  </div>
                )}
              </div>

              {/* Quick Links Card */}
              <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm">
                <h3 className="text-base font-semibold text-stone-600 mb-4 flex items-center gap-2">
                  <Rocket size={18} className="text-rose-500" />
                  {language === 'ja' ? 'クイックリンク' : '快捷入口'}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/ai-book/beginner')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors text-left group"
                  >
                    <div className="p-2 bg-violet-100 rounded-lg group-hover:bg-violet-200 transition-colors">
                      <Lightbulb size={18} className="text-violet-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-medium text-stone-800">{language === 'ja' ? 'AI入門ガイド' : 'AI 入门指南'}</div>
                      <div className="text-xs text-stone-500">{language === 'ja' ? '5章・基礎概念' : '5章・基础概念'}</div>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate('/ai-book/advanced')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors text-left group"
                  >
                    <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                      <Rocket size={18} className="text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-medium text-stone-800">{language === 'ja' ? 'AI実践上級編' : 'AI 进阶实战'}</div>
                      <div className="text-xs text-stone-500">{language === 'ja' ? '3章・Prompt/Agent/RAG' : '3章・提示词/Agent/RAG'}</div>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate('/ai-resources')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors text-left group"
                  >
                    <div className="p-2 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                      <Boxes size={18} className="text-rose-500" />
                    </div>
                    <div className="text-base font-medium text-stone-800">{language === 'ja' ? 'AIリソース' : 'AI 资源'}</div>
                  </button>
                  {stats.wrongCount > 0 && (
                    <button
                      onClick={() => navigate('/wrong-answers')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors text-left group"
                    >
                      <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                        <AlertCircle size={18} className="text-amber-600" />
                      </div>
                      <div className="text-base font-medium text-stone-800">
                        {language === 'ja' ? '復習する' : '去复习'} ({stats.wrongCount})
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Per-Certification Progress (show if has data) */}
            {learningStats.certStats.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-stone-600 mb-3 flex items-center gap-2">
                  <Award size={16} className="text-yellow-500" />
                  {language === 'ja' ? '認定別進捗' : '认证进度'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {learningStats.certStats.slice(0, 6).map((cert, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-stone-200 shadow-sm">
                      <div className="text-xs font-bold text-stone-800 mb-1">{cert.certCode}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-500">{cert.questionsAnswered}{language === 'ja' ? '問' : '题'}</span>
                        <span className={`font-semibold ${cert.correctRate >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {cert.correctRate}%
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-1">
                        {language === 'ja' ? '最高' : '最高'}: {cert.bestScore}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer - Compact */}
      <footer className="relative z-10 py-4 border-t border-stone-200">
        <div className="text-center">
          <p className="text-stone-500 text-base">
            <span className="font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">StudyForge</span>
            <span className="mx-2">·</span>
            {language === 'ja' ? 'AI学習プラットフォーム' : 'AI 学习平台'}
          </p>
        </div>
      </footer>
    </div>
  );
};
