import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  ChevronDown,
  MapPin,
  Circle,
  Target,
  BookOpen,
  Code2,
  Brain,
  Cloud,
  Database,
  Rocket,
  Star,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';

type RoadmapId = 'ai-engineer' | 'cloud-architect' | 'data-engineer';

interface RoadmapStep {
  id: string;
  title: { zh: string; ja: string };
  description: { zh: string; ja: string };
  duration: { zh: string; ja: string };
  skills: string[];
  resources: { name: string; url?: string; type: 'course' | 'book' | 'cert' | 'practice' }[];
  certifications?: string[];
}

interface RoadmapPhase {
  id: string;
  name: { zh: string; ja: string };
  color: string;
  steps: RoadmapStep[];
}

interface Roadmap {
  id: RoadmapId;
  name: { zh: string; ja: string };
  description: { zh: string; ja: string };
  icon: React.ElementType;
  gradient: string;
  phases: RoadmapPhase[];
}

const roadmaps: Roadmap[] = [
  {
    id: 'ai-engineer',
    name: { zh: 'AI 工程师', ja: 'AIエンジニア' },
    description: { zh: '从零基础到 AI 应用开发专家', ja: 'ゼロからAIアプリ開発のエキスパートへ' },
    icon: Brain,
    gradient: 'from-purple-500 to-violet-600',
    phases: [
      {
        id: 'foundation',
        name: { zh: '基础阶段', ja: '基礎段階' },
        color: 'bg-blue-500',
        steps: [
          {
            id: 'python',
            title: { zh: 'Python 编程基础', ja: 'Python プログラミング基礎' },
            description: { zh: '掌握 Python 语法、数据结构、面向对象编程', ja: 'Python の構文、データ構造、オブジェクト指向プログラミングを習得' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['Python', 'Data Structures', 'OOP', 'File I/O'],
            resources: [
              { name: 'Python 官方教程', type: 'course' },
              { name: 'LeetCode Python 练习', type: 'practice' }
            ]
          },
          {
            id: 'math',
            title: { zh: '数学基础', ja: '数学基礎' },
            description: { zh: '线性代数、概率统计、微积分基础', ja: '線形代数、確率統計、微積分の基礎' },
            duration: { zh: '4-8 周', ja: '4-8 週間' },
            skills: ['Linear Algebra', 'Statistics', 'Calculus'],
            resources: [
              { name: '3Blue1Brown 线性代数', type: 'course' },
              { name: 'Khan Academy 统计学', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 'ml-basics',
        name: { zh: '机器学习入门', ja: '機械学習入門' },
        color: 'bg-green-500',
        steps: [
          {
            id: 'ml-fundamentals',
            title: { zh: '机器学习基础', ja: '機械学習基礎' },
            description: { zh: '监督学习、无监督学习、模型评估', ja: '教師あり学習、教師なし学習、モデル評価' },
            duration: { zh: '6-8 周', ja: '6-8 週間' },
            skills: ['Scikit-learn', 'Regression', 'Classification', 'Clustering'],
            resources: [
              { name: 'Coursera - 机器学习 (Andrew Ng)', type: 'course' },
              { name: 'Kaggle 入门竞赛', type: 'practice' }
            ],
            certifications: ['AWS-AIF-C01']
          },
          {
            id: 'deep-learning',
            title: { zh: '深度学习基础', ja: 'ディープラーニング基礎' },
            description: { zh: '神经网络、CNN、RNN、Transformer', ja: 'ニューラルネットワーク、CNN、RNN、Transformer' },
            duration: { zh: '8-12 周', ja: '8-12 週間' },
            skills: ['PyTorch', 'TensorFlow', 'Neural Networks', 'Backpropagation'],
            resources: [
              { name: 'Fast.ai 深度学习课程', type: 'course' },
              { name: '动手学深度学习 (d2l.ai)', type: 'book' }
            ],
            certifications: ['AWS-MLA-C01']
          }
        ]
      },
      {
        id: 'llm-advanced',
        name: { zh: 'LLM 进阶', ja: 'LLM 上級' },
        color: 'bg-purple-500',
        steps: [
          {
            id: 'llm-basics',
            title: { zh: 'LLM 应用开发', ja: 'LLM アプリ開発' },
            description: { zh: 'Prompt Engineering、LangChain、API 调用', ja: 'プロンプトエンジニアリング、LangChain、API 呼び出し' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['OpenAI API', 'LangChain', 'Prompt Engineering', 'Ollama'],
            resources: [
              { name: 'LangChain 官方文档', type: 'course' },
              { name: 'OpenAI Cookbook', type: 'practice' }
            ]
          },
          {
            id: 'rag',
            title: { zh: 'RAG 系统构建', ja: 'RAG システム構築' },
            description: { zh: '向量数据库、检索增强生成、知识库问答', ja: 'ベクトルデータベース、検索拡張生成、知識ベースQ&A' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['ChromaDB', 'Pinecone', 'Embeddings', 'Semantic Search'],
            resources: [
              { name: 'RAG From Scratch (LangChain)', type: 'course' },
              { name: '本站 AI 代码实战', type: 'practice' }
            ]
          },
          {
            id: 'agents',
            title: { zh: 'AI Agent 开发', ja: 'AI Agent 開発' },
            description: { zh: '自主决策 Agent、多 Agent 系统、工具调用', ja: '自律型 Agent、マルチ Agent システム、ツール呼び出し' },
            duration: { zh: '6-8 周', ja: '6-8 週間' },
            skills: ['LangGraph', 'Function Calling', 'Multi-Agent', 'MCP'],
            resources: [
              { name: 'LangGraph 教程', type: 'course' },
              { name: 'Claude Code MCP 实践', type: 'practice' }
            ]
          }
        ]
      },
      {
        id: 'production',
        name: { zh: '生产部署', ja: '本番デプロイ' },
        color: 'bg-orange-500',
        steps: [
          {
            id: 'mlops',
            title: { zh: 'MLOps 实践', ja: 'MLOps 実践' },
            description: { zh: '模型部署、监控、CI/CD、特征工程', ja: 'モデルデプロイ、モニタリング、CI/CD、特徴量エンジニアリング' },
            duration: { zh: '6-8 周', ja: '6-8 週間' },
            skills: ['Docker', 'Kubernetes', 'MLflow', 'SageMaker'],
            resources: [
              { name: 'MLOps Zoomcamp', type: 'course' },
              { name: 'Made With ML', type: 'course' }
            ],
            certifications: ['AWS-MLS-C01']
          }
        ]
      }
    ]
  },
  {
    id: 'cloud-architect',
    name: { zh: '云架构师', ja: 'クラウドアーキテクト' },
    description: { zh: '掌握多云架构设计与最佳实践', ja: 'マルチクラウドアーキテクチャ設計とベストプラクティスを習得' },
    icon: Cloud,
    gradient: 'from-cyan-500 to-blue-600',
    phases: [
      {
        id: 'cloud-foundation',
        name: { zh: '云基础', ja: 'クラウド基礎' },
        color: 'bg-cyan-500',
        steps: [
          {
            id: 'cloud-basics',
            title: { zh: '云计算入门', ja: 'クラウドコンピューティング入門' },
            description: { zh: '云服务模型 (IaaS/PaaS/SaaS)、虚拟化、网络基础', ja: 'クラウドサービスモデル（IaaS/PaaS/SaaS）、仮想化、ネットワーク基礎' },
            duration: { zh: '2-4 周', ja: '2-4 週間' },
            skills: ['IaaS', 'PaaS', 'SaaS', 'Networking'],
            resources: [
              { name: 'AWS Cloud Practitioner Essentials', type: 'course' }
            ],
            certifications: ['AWS-CLF-C02', 'AZ-900']
          },
          {
            id: 'linux',
            title: { zh: 'Linux 系统管理', ja: 'Linux システム管理' },
            description: { zh: 'Shell 脚本、文件系统、进程管理、网络配置', ja: 'シェルスクリプト、ファイルシステム、プロセス管理、ネットワーク設定' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['Bash', 'SSH', 'System Admin', 'Networking'],
            resources: [
              { name: 'Linux Journey', type: 'course' },
              { name: 'LPIC-1 学习指南', type: 'book' }
            ]
          }
        ]
      },
      {
        id: 'aws-path',
        name: { zh: 'AWS 专精', ja: 'AWS 専門' },
        color: 'bg-orange-500',
        steps: [
          {
            id: 'aws-saa',
            title: { zh: 'AWS 解决方案架构师', ja: 'AWS ソリューションアーキテクト' },
            description: { zh: 'EC2、S3、VPC、RDS、Lambda、高可用架构设计', ja: 'EC2、S3、VPC、RDS、Lambda、高可用性アーキテクチャ設計' },
            duration: { zh: '8-12 周', ja: '8-12 週間' },
            skills: ['EC2', 'S3', 'VPC', 'RDS', 'Lambda', 'CloudFormation'],
            resources: [
              { name: 'A Cloud Guru SAA', type: 'course' },
              { name: '本站 AWS 题库', type: 'practice' }
            ],
            certifications: ['AWS-SAA-C03']
          },
          {
            id: 'aws-sap',
            title: { zh: 'AWS 专业级架构师', ja: 'AWS プロフェッショナルアーキテクト' },
            description: { zh: '企业级架构、混合云、迁移策略、成本优化', ja: 'エンタープライズアーキテクチャ、ハイブリッドクラウド、移行戦略、コスト最適化' },
            duration: { zh: '12-16 周', ja: '12-16 週間' },
            skills: ['Enterprise Architecture', 'Hybrid Cloud', 'Migration', 'Cost Optimization'],
            resources: [
              { name: 'AWS Well-Architected Framework', type: 'book' },
              { name: '本站 SAP 题库', type: 'practice' }
            ],
            certifications: ['AWS-SAP-C02']
          }
        ]
      },
      {
        id: 'multi-cloud',
        name: { zh: '多云进阶', ja: 'マルチクラウド上級' },
        color: 'bg-purple-500',
        steps: [
          {
            id: 'azure',
            title: { zh: 'Azure 架构', ja: 'Azure アーキテクチャ' },
            description: { zh: 'Azure 核心服务、与 AWS 对比、混合云方案', ja: 'Azure コアサービス、AWS との比較、ハイブリッドクラウドソリューション' },
            duration: { zh: '6-8 周', ja: '6-8 週間' },
            skills: ['Azure VMs', 'Azure Storage', 'Azure AD', 'ARM Templates'],
            resources: [
              { name: 'Microsoft Learn', type: 'course' },
              { name: '本站 Azure 题库', type: 'practice' }
            ],
            certifications: ['AZ-104', 'AZ-305']
          },
          {
            id: 'gcp',
            title: { zh: 'GCP 架构', ja: 'GCP アーキテクチャ' },
            description: { zh: 'GCP 核心服务、BigQuery、Kubernetes Engine', ja: 'GCP コアサービス、BigQuery、Kubernetes Engine' },
            duration: { zh: '6-8 周', ja: '6-8 週間' },
            skills: ['Compute Engine', 'BigQuery', 'GKE', 'Cloud Functions'],
            resources: [
              { name: 'Google Cloud Skills Boost', type: 'course' },
              { name: '本站 GCP 题库', type: 'practice' }
            ],
            certifications: ['GCP-ACE', 'GCP-PCA']
          }
        ]
      }
    ]
  },
  {
    id: 'data-engineer',
    name: { zh: '数据工程师', ja: 'データエンジニア' },
    description: { zh: '构建可扩展的数据管道与平台', ja: 'スケーラブルなデータパイプラインとプラットフォームの構築' },
    icon: Database,
    gradient: 'from-emerald-500 to-teal-600',
    phases: [
      {
        id: 'data-foundation',
        name: { zh: '数据基础', ja: 'データ基礎' },
        color: 'bg-emerald-500',
        steps: [
          {
            id: 'sql',
            title: { zh: 'SQL 与数据库', ja: 'SQL とデータベース' },
            description: { zh: 'SQL 高级查询、数据库设计、索引优化', ja: 'SQL 高度なクエリ、データベース設計、インデックス最適化' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['SQL', 'PostgreSQL', 'MySQL', 'Database Design'],
            resources: [
              { name: 'Mode SQL Tutorial', type: 'course' },
              { name: 'LeetCode SQL 练习', type: 'practice' }
            ]
          },
          {
            id: 'python-data',
            title: { zh: 'Python 数据处理', ja: 'Python データ処理' },
            description: { zh: 'Pandas、NumPy、数据清洗与转换', ja: 'Pandas、NumPy、データクレンジングと変換' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['Pandas', 'NumPy', 'Data Wrangling', 'ETL'],
            resources: [
              { name: 'Kaggle Learn - Pandas', type: 'course' },
              { name: 'Python for Data Analysis', type: 'book' }
            ]
          }
        ]
      },
      {
        id: 'big-data',
        name: { zh: '大数据技术', ja: 'ビッグデータ技術' },
        color: 'bg-blue-500',
        steps: [
          {
            id: 'spark',
            title: { zh: 'Apache Spark', ja: 'Apache Spark' },
            description: { zh: 'Spark Core、Spark SQL、PySpark、性能优化', ja: 'Spark Core、Spark SQL、PySpark、パフォーマンス最適化' },
            duration: { zh: '6-8 周', ja: '6-8 週間' },
            skills: ['PySpark', 'Spark SQL', 'Distributed Computing'],
            resources: [
              { name: 'Databricks Academy', type: 'course' },
              { name: 'Learning Spark', type: 'book' }
            ]
          },
          {
            id: 'streaming',
            title: { zh: '流处理技术', ja: 'ストリーム処理技術' },
            description: { zh: 'Kafka、Flink、实时数据管道', ja: 'Kafka、Flink、リアルタイムデータパイプライン' },
            duration: { zh: '6-8 周', ja: '6-8 週間' },
            skills: ['Kafka', 'Spark Streaming', 'Flink', 'Real-time Processing'],
            resources: [
              { name: 'Confluent Kafka 101', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 'cloud-data',
        name: { zh: '云数据平台', ja: 'クラウドデータプラットフォーム' },
        color: 'bg-orange-500',
        steps: [
          {
            id: 'aws-data',
            title: { zh: 'AWS 数据服务', ja: 'AWS データサービス' },
            description: { zh: 'Redshift、Glue、Athena、EMR、数据湖架构', ja: 'Redshift、Glue、Athena、EMR、データレイクアーキテクチャ' },
            duration: { zh: '8-10 周', ja: '8-10 週間' },
            skills: ['Redshift', 'Glue', 'Athena', 'EMR', 'Lake Formation'],
            resources: [
              { name: 'AWS Data Analytics Specialty', type: 'course' },
              { name: '本站 DEA 题库', type: 'practice' }
            ],
            certifications: ['AWS-DEA-C01']
          },
          {
            id: 'dbt',
            title: { zh: '现代数据栈', ja: 'モダンデータスタック' },
            description: { zh: 'dbt、Airflow、数据建模、数据质量', ja: 'dbt、Airflow、データモデリング、データ品質' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['dbt', 'Airflow', 'Data Modeling', 'Data Quality'],
            resources: [
              { name: 'dbt Learn', type: 'course' },
              { name: 'Airflow Tutorial', type: 'course' }
            ]
          }
        ]
      }
    ]
  }
];

const StepCard: React.FC<{
  step: RoadmapStep;
  language: string;
  phaseColor: string;
  isLast: boolean;
}> = ({ step, language, phaseColor, isLast }) => {
  const [expanded, setExpanded] = useState(false);
  const lang = language === 'ja' ? 'ja' : 'zh';

  const resourceTypeIcons = {
    course: BookOpen,
    book: BookOpen,
    cert: Star,
    practice: Code2
  };

  return (
    <div className="relative">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-slate-200" />
      )}

      <div className="flex gap-4">
        {/* Timeline dot */}
        <div className={`w-10 h-10 rounded-full ${phaseColor} flex items-center justify-center flex-shrink-0 z-10`}>
          <Circle size={16} className="text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm mb-4 overflow-hidden">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div>
              <h4 className="font-semibold text-slate-800">{step.title[lang]}</h4>
              <p className="text-sm text-slate-500 mt-1">{step.description[lang]}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Target size={12} />
                  {step.duration[lang]}
                </span>
                {step.certifications && (
                  <span className="flex items-center gap-1 text-amber-600">
                    <Star size={12} />
                    {step.certifications.join(', ')}
                  </span>
                )}
              </div>
            </div>
            <ChevronDown
              size={20}
              className={`text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>

          {expanded && (
            <div className="px-4 pb-4 border-t border-slate-100 pt-4">
              {/* Skills */}
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                  {language === 'ja' ? 'スキル' : '技能点'}
                </h5>
                <div className="flex flex-wrap gap-1">
                  {step.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h5 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                  {language === 'ja' ? '学習リソース' : '学习资源'}
                </h5>
                <div className="space-y-2">
                  {step.resources.map((resource, i) => {
                    const Icon = resourceTypeIcons[resource.type];
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Icon size={14} className="text-slate-400" />
                        <span className="text-slate-600">{resource.name}</span>
                        {resource.url && (
                          <ExternalLink size={12} className="text-cyan-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AILearningRoadmapPage() {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapId>('ai-engineer');

  const roadmap = roadmaps.find(r => r.id === selectedRoadmap)!;
  const lang = language === 'ja' ? 'ja' : 'zh';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-800 text-white sticky top-0 z-50">
        <div className="px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Home size={20} />
                <span className="hidden sm:inline">{language === 'ja' ? 'ホーム' : '首页'}</span>
              </button>
              <ChevronRight size={16} className="text-slate-500" />
              <h1 className="text-lg font-semibold">
                {language === 'ja' ? '学習ロードマップ' : '学习路线图'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-slate-400" />
              <span className="font-semibold">StudyForge</span>
            </div>
          </div>
        </div>
      </header>

      {/* Roadmap Selection */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 lg:px-10">
          <div className="flex overflow-x-auto gap-2 py-4">
            {roadmaps.map((rm) => {
              const Icon = rm.icon;
              const isActive = selectedRoadmap === rm.id;
              return (
                <button
                  key={rm.id}
                  onClick={() => setSelectedRoadmap(rm.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${rm.gradient} text-white shadow-lg`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={20} />
                  <div className="text-left">
                    <div className="font-semibold">{rm.name[lang]}</div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                      {rm.description[lang]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Roadmap Content */}
      <main className="px-6 lg:px-10 py-8">
        {/* Overview */}
        <div className={`bg-gradient-to-r ${roadmap.gradient} rounded-lg p-6 text-white mb-8`}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <roadmap.icon size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{roadmap.name[lang]}</h2>
              <p className="text-white/80">{roadmap.description[lang]}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">
                {roadmap.phases.reduce((sum, p) => sum + p.steps.length, 0)}
              </div>
              <div className="text-xs text-white/80">
                {language === 'ja' ? 'ステップ' : '个步骤'}
              </div>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{roadmap.phases.length}</div>
              <div className="text-xs text-white/80">
                {language === 'ja' ? 'フェーズ' : '个阶段'}
              </div>
            </div>
          </div>
        </div>

        {/* Phases */}
        {roadmap.phases.map((phase, phaseIndex) => (
          <div key={phase.id} className="mb-8">
            {/* Phase Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-lg ${phase.color} flex items-center justify-center text-white font-bold text-sm`}>
                {phaseIndex + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{phase.name[lang]}</h3>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Steps */}
            <div className="ml-4">
              {phase.steps.map((step, stepIndex) => (
                <StepCard
                  key={step.id}
                  step={step}
                  language={language}
                  phaseColor={phase.color}
                  isLast={stepIndex === phase.steps.length - 1}
                />
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-slate-100 rounded-lg p-6 text-center">
          <Rocket size={32} className="mx-auto text-emerald-500 mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {language === 'ja' ? '今すぐ学習を始めよう！' : '现在就开始学习吧！'}
          </h3>
          <p className="text-slate-500 text-sm mb-4">
            {language === 'ja'
              ? 'StudyForge の練習問題で知識を定着させましょう'
              : '用 StudyForge 的练习题巩固所学知识'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
          >
            {language === 'ja' ? '練習を始める' : '开始练习'}
            <ArrowRight size={16} />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-4 mt-auto">
        <div className="px-6 lg:px-10 text-center">
          <p className="text-slate-300 text-sm">
            <span className="font-semibold text-white">StudyForge</span>
            <span className="mx-2">·</span>
            {language === 'ja' ? 'AI学習プラットフォーム' : 'AI 学习平台'}
          </p>
        </div>
      </footer>
    </div>
  );
}
