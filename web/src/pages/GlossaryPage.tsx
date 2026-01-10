import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  BookOpen,
  Search,
  Brain,
  Cloud,
  Database,
  Code2,
  Shield
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';

type TermCategory = 'ai-ml' | 'cloud' | 'data' | 'security' | 'devops';

interface Term {
  term: string;
  abbr?: string;
  category: TermCategory;
  definition: { zh: string; ja: string };
  example?: { zh: string; ja: string };
}

const categoryConfig: Record<TermCategory, { name: { zh: string; ja: string }; icon: React.ElementType; color: string }> = {
  'ai-ml': { name: { zh: 'AI/机器学习', ja: 'AI/機械学習' }, icon: Brain, color: 'bg-purple-100 text-purple-700' },
  'cloud': { name: { zh: '云计算', ja: 'クラウド' }, icon: Cloud, color: 'bg-cyan-100 text-cyan-700' },
  'data': { name: { zh: '数据工程', ja: 'データエンジニアリング' }, icon: Database, color: 'bg-emerald-100 text-emerald-700' },
  'security': { name: { zh: '安全', ja: 'セキュリティ' }, icon: Shield, color: 'bg-red-100 text-red-700' },
  'devops': { name: { zh: 'DevOps', ja: 'DevOps' }, icon: Code2, color: 'bg-orange-100 text-orange-700' }
};

const glossaryTerms: Term[] = [
  // AI/ML Terms
  {
    term: 'Artificial Intelligence',
    abbr: 'AI',
    category: 'ai-ml',
    definition: {
      zh: '人工智能，指计算机系统模拟人类智能的能力，包括学习、推理、问题解决和语言理解。',
      ja: '人工知能。人間の知能をシミュレートするコンピュータシステムの能力で、学習、推論、問題解決、言語理解を含む。'
    }
  },
  {
    term: 'Machine Learning',
    abbr: 'ML',
    category: 'ai-ml',
    definition: {
      zh: '机器学习，AI 的子领域，让计算机从数据中学习模式，而无需明确编程。',
      ja: '機械学習。AIのサブフィールドで、明示的にプログラムすることなくデータからパターンを学習させる。'
    }
  },
  {
    term: 'Deep Learning',
    abbr: 'DL',
    category: 'ai-ml',
    definition: {
      zh: '深度学习，使用多层神经网络的机器学习方法，擅长处理图像、语音、自然语言等复杂任务。',
      ja: 'ディープラーニング。多層ニューラルネットワークを使用する機械学習手法で、画像、音声、自然言語などの複雑なタスクに優れる。'
    }
  },
  {
    term: 'Large Language Model',
    abbr: 'LLM',
    category: 'ai-ml',
    definition: {
      zh: '大语言模型，在海量文本数据上训练的深度学习模型，能够理解和生成自然语言。如 GPT-4、Claude、LLaMA。',
      ja: '大規模言語モデル。大量のテキストデータで訓練された深層学習モデルで、自然言語を理解・生成できる。GPT-4、Claude、LLaMAなど。'
    }
  },
  {
    term: 'Transformer',
    category: 'ai-ml',
    definition: {
      zh: 'Transformer 架构，2017 年提出的神经网络架构，使用自注意力机制处理序列数据，是现代 LLM 的基础。',
      ja: 'Transformerアーキテクチャ。2017年に提案されたニューラルネットワーク構造で、自己注意機構を使用してシーケンスデータを処理。現代LLMの基盤。'
    }
  },
  {
    term: 'Attention Mechanism',
    category: 'ai-ml',
    definition: {
      zh: '注意力机制，让模型在处理输入时能够关注最相关的部分，是 Transformer 的核心组件。',
      ja: '注意機構。モデルが入力を処理する際に最も関連性の高い部分に注目できるようにする。Transformerのコアコンポーネント。'
    }
  },
  {
    term: 'Retrieval-Augmented Generation',
    abbr: 'RAG',
    category: 'ai-ml',
    definition: {
      zh: '检索增强生成，结合信息检索和文本生成的技术，让 LLM 能够访问外部知识库，减少幻觉。',
      ja: '検索拡張生成。情報検索とテキスト生成を組み合わせた技術で、LLMが外部知識ベースにアクセスし、ハルシネーションを低減。'
    }
  },
  {
    term: 'Fine-tuning',
    category: 'ai-ml',
    definition: {
      zh: '微调，在预训练模型基础上，使用特定领域数据继续训练，使模型适应特定任务。',
      ja: 'ファインチューニング。事前学習済みモデルを基に、特定ドメインのデータで追加訓練し、特定タスクに適応させる。'
    }
  },
  {
    term: 'Prompt Engineering',
    category: 'ai-ml',
    definition: {
      zh: '提示工程，设计和优化输入提示词以获得 AI 模型更好输出的技术和方法。',
      ja: 'プロンプトエンジニアリング。AIモデルからより良い出力を得るために入力プロンプトを設計・最適化する技術と手法。'
    }
  },
  {
    term: 'Embedding',
    category: 'ai-ml',
    definition: {
      zh: '嵌入/向量化，将文本、图像等数据转换为高维向量表示，使计算机能够理解语义相似性。',
      ja: 'エンベディング/ベクトル化。テキストや画像などのデータを高次元ベクトル表現に変換し、コンピュータが意味的類似性を理解できるようにする。'
    }
  },
  {
    term: 'Hallucination',
    category: 'ai-ml',
    definition: {
      zh: '幻觉，LLM 生成看似合理但实际上虚假或不准确信息的现象。',
      ja: 'ハルシネーション。LLMがもっともらしく見えるが実際には虚偽または不正確な情報を生成する現象。'
    }
  },
  {
    term: 'Token',
    category: 'ai-ml',
    definition: {
      zh: 'Token，LLM 处理文本的基本单位，可以是单词、子词或字符。Token 数量影响处理成本和上下文长度。',
      ja: 'トークン。LLMがテキストを処理する基本単位で、単語、サブワード、文字のいずれか。トークン数は処理コストとコンテキスト長に影響。'
    }
  },
  {
    term: 'Vector Database',
    category: 'ai-ml',
    definition: {
      zh: '向量数据库，专门用于存储和检索高维向量的数据库，支持语义搜索。如 Pinecone、ChromaDB、Milvus。',
      ja: 'ベクトルデータベース。高次元ベクトルの保存と検索に特化したデータベースで、セマンティック検索をサポート。Pinecone、ChromaDB、Milvusなど。'
    }
  },
  {
    term: 'Agent',
    category: 'ai-ml',
    definition: {
      zh: 'AI Agent，能够自主规划、决策和执行任务的 AI 系统，通常可以调用工具和 API。',
      ja: 'AIエージェント。自律的に計画、意思決定、タスク実行ができるAIシステムで、通常ツールやAPIを呼び出せる。'
    }
  },
  {
    term: 'Model Context Protocol',
    abbr: 'MCP',
    category: 'ai-ml',
    definition: {
      zh: 'MCP 协议，Anthropic 提出的开放协议，标准化 AI 应用与外部工具/数据源的连接方式。',
      ja: 'MCPプロトコル。Anthropicが提案したオープンプロトコルで、AIアプリケーションと外部ツール/データソースの接続方法を標準化。'
    }
  },

  // Cloud Terms
  {
    term: 'Infrastructure as a Service',
    abbr: 'IaaS',
    category: 'cloud',
    definition: {
      zh: '基础设施即服务，提供虚拟化的计算资源（服务器、存储、网络），用户管理操作系统及以上层。',
      ja: 'サービスとしてのインフラストラクチャ。仮想化されたコンピューティングリソース（サーバー、ストレージ、ネットワーク）を提供。ユーザーはOSより上位層を管理。'
    },
    example: { zh: 'AWS EC2、Azure VMs、GCE', ja: 'AWS EC2、Azure VMs、GCE' }
  },
  {
    term: 'Platform as a Service',
    abbr: 'PaaS',
    category: 'cloud',
    definition: {
      zh: '平台即服务，提供应用运行环境，用户只需管理应用代码和数据，无需管理底层基础设施。',
      ja: 'サービスとしてのプラットフォーム。アプリケーション実行環境を提供。ユーザーはアプリコードとデータのみ管理し、基盤インフラは不要。'
    },
    example: { zh: 'AWS Elastic Beanstalk、Azure App Service、Google App Engine', ja: 'AWS Elastic Beanstalk、Azure App Service、Google App Engine' }
  },
  {
    term: 'Software as a Service',
    abbr: 'SaaS',
    category: 'cloud',
    definition: {
      zh: '软件即服务，通过互联网直接提供完整应用程序，用户无需安装或维护任何软件。',
      ja: 'サービスとしてのソフトウェア。インターネット経由で完全なアプリケーションを直接提供。ユーザーはソフトウェアのインストールやメンテナンス不要。'
    },
    example: { zh: 'Gmail、Salesforce、Microsoft 365', ja: 'Gmail、Salesforce、Microsoft 365' }
  },
  {
    term: 'Availability Zone',
    abbr: 'AZ',
    category: 'cloud',
    definition: {
      zh: '可用区，云厂商区域内的独立数据中心，具有独立的电力、网络和冷却系统。多 AZ 部署可提高可用性。',
      ja: 'アベイラビリティゾーン。クラウドベンダーのリージョン内の独立したデータセンターで、独自の電源、ネットワーク、冷却システムを持つ。マルチAZデプロイで可用性向上。'
    }
  },
  {
    term: 'Region',
    category: 'cloud',
    definition: {
      zh: '区域，云厂商的地理位置概念，每个区域包含多个可用区。选择区域应考虑延迟、合规和成本。',
      ja: 'リージョン。クラウドベンダーの地理的な位置の概念で、各リージョンには複数のAZが含まれる。リージョン選択はレイテンシ、コンプライアンス、コストを考慮。'
    }
  },
  {
    term: 'Virtual Private Cloud',
    abbr: 'VPC',
    category: 'cloud',
    definition: {
      zh: '虚拟私有云，云中的逻辑隔离网络环境，用户可自定义 IP 地址范围、子网、路由表和网关。',
      ja: '仮想プライベートクラウド。クラウド内の論理的に分離されたネットワーク環境で、IPアドレス範囲、サブネット、ルートテーブル、ゲートウェイをカスタマイズ可能。'
    }
  },
  {
    term: 'Auto Scaling',
    category: 'cloud',
    definition: {
      zh: '自动伸缩，根据负载或预定义规则自动调整计算资源数量，确保性能和成本优化。',
      ja: 'オートスケーリング。負荷や事前定義ルールに基づいてコンピューティングリソース数を自動調整し、パフォーマンスとコストを最適化。'
    }
  },
  {
    term: 'Load Balancer',
    category: 'cloud',
    definition: {
      zh: '负载均衡器，将流量分发到多个后端实例，提高可用性和性能。分为 L4（网络）和 L7（应用）两种。',
      ja: 'ロードバランサー。トラフィックを複数のバックエンドインスタンスに分散し、可用性とパフォーマンスを向上。L4（ネットワーク）とL7（アプリケーション）の2種類。'
    }
  },
  {
    term: 'Serverless',
    category: 'cloud',
    definition: {
      zh: '无服务器架构，用户只需编写代码，云厂商自动管理服务器、扩展和运维。按实际使用量计费。',
      ja: 'サーバーレスアーキテクチャ。ユーザーはコードを書くだけで、クラウドベンダーがサーバー、スケーリング、運用を自動管理。実際の使用量に基づいて課金。'
    },
    example: { zh: 'AWS Lambda、Azure Functions、Cloud Functions', ja: 'AWS Lambda、Azure Functions、Cloud Functions' }
  },
  {
    term: 'Content Delivery Network',
    abbr: 'CDN',
    category: 'cloud',
    definition: {
      zh: '内容分发网络，通过全球分布的边缘节点缓存内容，加速内容交付并降低延迟。',
      ja: 'コンテンツデリバリーネットワーク。グローバルに分散したエッジノードでコンテンツをキャッシュし、コンテンツ配信を高速化してレイテンシを低減。'
    },
    example: { zh: 'CloudFront、Azure CDN、Cloud CDN', ja: 'CloudFront、Azure CDN、Cloud CDN' }
  },

  // Data Terms
  {
    term: 'Extract, Transform, Load',
    abbr: 'ETL',
    category: 'data',
    definition: {
      zh: '数据抽取、转换、加载，将数据从源系统提取、清洗转换后加载到目标数据仓库的过程。',
      ja: 'データの抽出、変換、ロード。ソースシステムからデータを抽出し、クレンジング・変換してターゲットデータウェアハウスにロードするプロセス。'
    }
  },
  {
    term: 'Data Lake',
    category: 'data',
    definition: {
      zh: '数据湖，存储原始格式数据的大规模存储库，支持结构化、半结构化和非结构化数据。',
      ja: 'データレイク。生のフォーマットでデータを保存する大規模リポジトリで、構造化、半構造化、非構造化データをサポート。'
    }
  },
  {
    term: 'Data Warehouse',
    category: 'data',
    definition: {
      zh: '数据仓库，存储经过清洗和组织的结构化数据的系统，优化用于分析查询。',
      ja: 'データウェアハウス。クレンジングされ組織化された構造化データを保存するシステムで、分析クエリ用に最適化。'
    },
    example: { zh: 'Redshift、BigQuery、Snowflake', ja: 'Redshift、BigQuery、Snowflake' }
  },
  {
    term: 'Apache Spark',
    category: 'data',
    definition: {
      zh: '分布式大数据处理引擎，支持批处理和流处理，比传统 MapReduce 快 100 倍。',
      ja: '分散ビッグデータ処理エンジン。バッチ処理とストリーム処理をサポートし、従来のMapReduceより100倍高速。'
    }
  },
  {
    term: 'Apache Kafka',
    category: 'data',
    definition: {
      zh: '分布式事件流平台，用于构建实时数据管道和流处理应用，具有高吞吐量和容错性。',
      ja: '分散イベントストリーミングプラットフォーム。リアルタイムデータパイプラインとストリーム処理アプリの構築に使用、高スループットと耐障害性を持つ。'
    }
  },

  // Security Terms
  {
    term: 'Identity and Access Management',
    abbr: 'IAM',
    category: 'security',
    definition: {
      zh: '身份和访问管理，控制用户和服务对云资源的访问权限，遵循最小权限原则。',
      ja: 'IDおよびアクセス管理。ユーザーとサービスのクラウドリソースへのアクセス権限を制御し、最小権限の原則に従う。'
    }
  },
  {
    term: 'Multi-Factor Authentication',
    abbr: 'MFA',
    category: 'security',
    definition: {
      zh: '多因素认证，要求用户提供两种或以上身份验证因素（知道的、拥有的、是什么）才能访问系统。',
      ja: '多要素認証。システムアクセスに2つ以上の認証要素（知っているもの、持っているもの、本人であること）を要求。'
    }
  },
  {
    term: 'Encryption at Rest',
    category: 'security',
    definition: {
      zh: '静态加密，对存储在磁盘或数据库中的数据进行加密，防止未授权访问。',
      ja: '保存時の暗号化。ディスクやデータベースに保存されているデータを暗号化し、不正アクセスを防止。'
    }
  },
  {
    term: 'Encryption in Transit',
    category: 'security',
    definition: {
      zh: '传输加密，对网络传输中的数据进行加密（如 TLS/SSL），防止中间人攻击。',
      ja: '転送時の暗号化。ネットワーク転送中のデータを暗号化（TLS/SSLなど）し、中間者攻撃を防止。'
    }
  },
  {
    term: 'Zero Trust',
    category: 'security',
    definition: {
      zh: '零信任安全模型，"永不信任，始终验证"，不论请求来源，都需要验证身份和权限。',
      ja: 'ゼロトラストセキュリティモデル。「決して信頼せず、常に検証」、リクエストの発信元に関わらず、IDと権限を検証。'
    }
  },

  // DevOps Terms
  {
    term: 'Continuous Integration',
    abbr: 'CI',
    category: 'devops',
    definition: {
      zh: '持续集成，开发人员频繁将代码合并到主分支，每次合并触发自动构建和测试。',
      ja: '継続的インテグレーション。開発者が頻繁にコードをメインブランチにマージし、各マージで自動ビルドとテストをトリガー。'
    }
  },
  {
    term: 'Continuous Deployment',
    abbr: 'CD',
    category: 'devops',
    definition: {
      zh: '持续部署，代码通过所有测试后自动部署到生产环境，实现快速交付。',
      ja: '継続的デプロイメント。コードが全テストを通過後、自動的に本番環境にデプロイし、迅速な配信を実現。'
    }
  },
  {
    term: 'Infrastructure as Code',
    abbr: 'IaC',
    category: 'devops',
    definition: {
      zh: '基础设施即代码，通过代码文件定义和管理基础设施，实现版本控制和自动化部署。',
      ja: 'コードとしてのインフラストラクチャ。コードファイルでインフラを定義・管理し、バージョン管理と自動デプロイを実現。'
    },
    example: { zh: 'Terraform、CloudFormation、Pulumi', ja: 'Terraform、CloudFormation、Pulumi' }
  },
  {
    term: 'Kubernetes',
    abbr: 'K8s',
    category: 'devops',
    definition: {
      zh: '容器编排平台，自动化容器应用的部署、扩展和管理，是云原生应用的事实标准。',
      ja: 'コンテナオーケストレーションプラットフォーム。コンテナアプリのデプロイ、スケーリング、管理を自動化。クラウドネイティブアプリのデファクトスタンダード。'
    }
  },
  {
    term: 'Container',
    category: 'devops',
    definition: {
      zh: '容器，轻量级的应用打包和运行环境，包含应用及其所有依赖，保证在任何环境中一致运行。',
      ja: 'コンテナ。軽量なアプリパッケージングと実行環境で、アプリとその全依存関係を含み、あらゆる環境での一貫した動作を保証。'
    }
  },
  {
    term: 'Docker',
    category: 'devops',
    definition: {
      zh: '容器化平台，简化应用的构建、分发和运行。使用 Dockerfile 定义镜像，Docker Hub 分发镜像。',
      ja: 'コンテナ化プラットフォーム。アプリのビルド、配布、実行を簡素化。Dockerfileでイメージを定義、Docker Hubでイメージを配布。'
    }
  },
  {
    term: 'Microservices',
    category: 'devops',
    definition: {
      zh: '微服务架构，将应用拆分为小型独立服务，每个服务负责单一功能，可独立部署和扩展。',
      ja: 'マイクロサービスアーキテクチャ。アプリを小規模な独立サービスに分割し、各サービスは単一機能を担当、独立してデプロイ・スケール可能。'
    }
  },
  {
    term: 'GitOps',
    category: 'devops',
    definition: {
      zh: 'GitOps，以 Git 仓库为唯一真相来源，通过 PR 和合并来管理基础设施和应用配置。',
      ja: 'GitOps。Gitリポジトリを唯一の真実の源とし、PRとマージでインフラとアプリ設定を管理。'
    }
  }
];

export default function GlossaryPage() {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TermCategory | 'all'>('all');

  const lang = language === 'ja' ? 'ja' : 'zh';

  const filteredTerms = useMemo(() => {
    return glossaryTerms
      .filter(term => {
        const matchesSearch = searchQuery === '' ||
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (term.abbr && term.abbr.toLowerCase().includes(searchQuery.toLowerCase())) ||
          term.definition[lang].toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory, lang]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
                {language === 'ja' ? '用語集' : '术语词典'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-slate-400" />
              <span className="font-semibold">StudyForge</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 lg:px-10 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={language === 'ja' ? '用語を検索...' : '搜索术语...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-1 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-teal-100 text-teal-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {language === 'ja' ? 'すべて' : '全部'}
              </button>
              {(Object.keys(categoryConfig) as TermCategory[]).map((cat) => {
                const Icon = categoryConfig[cat].icon;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-teal-100 text-teal-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{categoryConfig[cat].name[lang]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 lg:px-10 py-8 flex-1">
        <div className="text-sm text-slate-500 mb-4">
          {filteredTerms.length} {language === 'ja' ? '件の用語' : '个术语'}
        </div>

        <div className="space-y-4">
          {filteredTerms.map((term, index) => {
            const catConfig = categoryConfig[term.category];
            const Icon = catConfig.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">
                      {term.term}
                      {term.abbr && (
                        <span className="ml-2 text-teal-600 font-medium">({term.abbr})</span>
                      )}
                    </h3>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${catConfig.color}`}>
                    <Icon size={12} />
                    {catConfig.name[lang]}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed">{term.definition[lang]}</p>

                {term.example && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400 font-medium">
                      {language === 'ja' ? '例：' : '例如：'}
                    </span>
                    <span className="text-sm text-slate-500 ml-1">{term.example[lang]}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">
              {language === 'ja' ? '該当する用語が見つかりません' : '未找到匹配的术语'}
            </p>
          </div>
        )}
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
