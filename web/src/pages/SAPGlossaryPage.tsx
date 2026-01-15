import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  BookOpen,
  Search,
  Database,
  Cloud,
  Code2,
  Settings,
  Layers,
  Cpu,
  GitBranch
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';

type TermCategory = 's4hana' | 'btp' | 'abap' | 'migration' | 'integration' | 'ai-ml';

interface Term {
  term: string;
  abbr?: string;
  category: TermCategory;
  definition: { zh: string; ja: string };
  example?: { zh: string; ja: string };
}

const categoryConfig: Record<TermCategory, { name: { zh: string; ja: string }; icon: React.ElementType; color: string }> = {
  's4hana': { name: { zh: 'S/4HANA', ja: 'S/4HANA' }, icon: Database, color: 'bg-cyan-100 text-cyan-700' },
  'btp': { name: { zh: 'BTP 云平台', ja: 'BTP クラウド' }, icon: Cloud, color: 'bg-blue-100 text-blue-700' },
  'abap': { name: { zh: 'ABAP 开发', ja: 'ABAP 開発' }, icon: Code2, color: 'bg-purple-100 text-purple-700' },
  'migration': { name: { zh: '迁移', ja: '移行' }, icon: GitBranch, color: 'bg-amber-100 text-amber-700' },
  'integration': { name: { zh: '集成', ja: '統合' }, icon: Layers, color: 'bg-emerald-100 text-emerald-700' },
  'ai-ml': { name: { zh: 'SAP AI', ja: 'SAP AI' }, icon: Cpu, color: 'bg-rose-100 text-rose-700' }
};

const glossaryTerms: Term[] = [
  // S/4HANA Core Terms
  {
    term: 'SAP S/4HANA',
    category: 's4hana',
    definition: {
      zh: 'SAP 的新一代智能 ERP 套件，基于 SAP HANA 内存数据库构建，于 2015 年发布，是 SAP ECC 的后继产品。',
      ja: 'SAP HANAインメモリデータベース上に構築された次世代インテリジェントERPスイート。2015年リリース、SAP ECCの後継製品。'
    }
  },
  {
    term: 'SAP HANA',
    category: 's4hana',
    definition: {
      zh: 'High-Performance Analytic Appliance，SAP 的内存数据库和应用平台，提供实时分析和事务处理能力。',
      ja: 'High-Performance Analytic Appliance。SAP のインメモリデータベースおよびアプリケーションプラットフォーム、リアルタイム分析とトランザクション処理を提供。'
    }
  },
  {
    term: 'SAP ECC',
    abbr: 'ECC',
    category: 's4hana',
    definition: {
      zh: 'SAP ERP Central Component，SAP 传统 ERP 系统，基于 R/3 架构，主流支持将于 2027 年结束。',
      ja: 'SAP ERP Central Component。SAP の従来型 ERP システム、R/3 アーキテクチャに基づく。メインストリームサポートは 2027 年に終了。'
    }
  },
  {
    term: 'Universal Journal',
    abbr: 'ACDOCA',
    category: 's4hana',
    definition: {
      zh: 'S/4HANA 中的统一日记账表，合并了财务、管理会计、资产会计等多个子分类账，实现单一真实数据源。',
      ja: 'S/4HANA の統合仕訳帳テーブル。財務、管理会計、資産会計など複数の補助元帳を統合し、単一の真実のソースを実現。'
    }
  },
  {
    term: 'Simplified Data Model',
    category: 's4hana',
    definition: {
      zh: 'S/4HANA 的简化数据模型，通过消除冗余表和聚合表，减少数据库表数量，提高实时分析性能。',
      ja: 'S/4HANA の簡素化データモデル。冗長テーブルと集計テーブルを排除し、データベーステーブル数を削減、リアルタイム分析性能を向上。'
    }
  },
  {
    term: 'SAP Fiori',
    category: 's4hana',
    definition: {
      zh: 'SAP 的现代用户体验设计系统，提供基于角色的、响应式的 Web 应用界面，替代传统 SAP GUI。',
      ja: 'SAP のモダンユーザーエクスペリエンス設計システム。ロールベースでレスポンシブな Web アプリインターフェースを提供、従来の SAP GUI を代替。'
    }
  },
  {
    term: 'Fiori Launchpad',
    abbr: 'FLP',
    category: 's4hana',
    definition: {
      zh: 'SAP Fiori 的入口门户，提供个性化的应用瓷砖布局，是用户访问 S/4HANA 应用的统一入口。',
      ja: 'SAP Fiori のエントリーポータル。パーソナライズされたアプリタイルレイアウトを提供、S/4HANA アプリへのユニファイドエントリーポイント。'
    }
  },
  {
    term: 'SAP GUI',
    category: 's4hana',
    definition: {
      zh: 'SAP Graphical User Interface，SAP 传统桌面客户端，用于访问 ECC 和 S/4HANA 的后台功能。',
      ja: 'SAP Graphical User Interface。SAP 従来型デスクトップクライアント、ECC と S/4HANA のバックエンド機能にアクセス。'
    }
  },
  {
    term: 'Transaction Code',
    abbr: 'T-Code',
    category: 's4hana',
    definition: {
      zh: '事务码，SAP 系统中快速访问特定功能的短代码，如 VA01 (创建销售订单)、ME21N (创建采购订单)。',
      ja: 'トランザクションコード。SAP システムで特定機能に素早くアクセスするためのショートコード。例：VA01（受注登録）、ME21N（購買発注登録）。'
    }
  },
  {
    term: 'IMG',
    abbr: 'IMG',
    category: 's4hana',
    definition: {
      zh: 'Implementation Guide，SAP 系统配置的结构化路径，包含所有自定义设置的入口，事务码 SPRO。',
      ja: 'Implementation Guide。SAP システム設定の構造化パス、すべてのカスタマイズ設定へのエントリーを含む。トランザクションコード SPRO。'
    }
  },

  // BTP Terms
  {
    term: 'SAP BTP',
    abbr: 'BTP',
    category: 'btp',
    definition: {
      zh: 'SAP Business Technology Platform，SAP 的云平台即服务 (PaaS)，提供应用开发、集成、数据管理和 AI 服务。',
      ja: 'SAP Business Technology Platform。SAP のクラウド PaaS、アプリ開発、統合、データ管理、AI サービスを提供。'
    }
  },
  {
    term: 'Cloud Foundry',
    abbr: 'CF',
    category: 'btp',
    definition: {
      zh: 'BTP 上的开源 PaaS 运行环境，支持多种编程语言，是部署 CAP 应用的主要环境。',
      ja: 'BTP 上のオープンソース PaaS ランタイム環境。複数のプログラミング言語をサポート、CAP アプリをデプロイする主要環境。'
    }
  },
  {
    term: 'Kyma',
    category: 'btp',
    definition: {
      zh: 'BTP 上的 Kubernetes 运行环境，支持容器化应用和微服务架构，提供 Serverless 能力。',
      ja: 'BTP 上の Kubernetes ランタイム環境。コンテナ化アプリとマイクロサービスアーキテクチャをサポート、Serverless 機能を提供。'
    }
  },
  {
    term: 'Subaccount',
    category: 'btp',
    definition: {
      zh: 'BTP 中的子账户，是资源管理和权限隔离的基本单位，属于全局账户下的逻辑分区。',
      ja: 'BTP のサブアカウント。リソース管理と権限分離の基本単位、グローバルアカウント配下の論理パーティション。'
    }
  },
  {
    term: 'Entitlement',
    category: 'btp',
    definition: {
      zh: 'BTP 中的服务配额，定义了子账户可以使用的服务和数量限制。',
      ja: 'BTP のサービス割当。サブアカウントが使用できるサービスと数量制限を定義。'
    }
  },
  {
    term: 'Service Marketplace',
    category: 'btp',
    definition: {
      zh: 'BTP Cockpit 中的服务目录，列出所有可订阅的服务，如 SAP HANA Cloud、Integration Suite 等。',
      ja: 'BTP Cockpit のサービスカタログ。SAP HANA Cloud、Integration Suite など、サブスクライブ可能なすべてのサービスを一覧表示。'
    }
  },
  {
    term: 'Destination',
    category: 'btp',
    definition: {
      zh: 'BTP 中的连接配置，存储访问外部系统的 URL、认证信息等，供应用安全调用后端服务。',
      ja: 'BTP の接続設定。外部システムへの URL、認証情報などを保存、アプリがバックエンドサービスを安全に呼び出すために使用。'
    }
  },

  // ABAP Development Terms
  {
    term: 'ABAP',
    abbr: 'ABAP',
    category: 'abap',
    definition: {
      zh: 'Advanced Business Application Programming，SAP 专有的第四代编程语言，用于开发 SAP 应用程序。',
      ja: 'Advanced Business Application Programming。SAP 専用の第4世代プログラミング言語、SAP アプリケーション開発に使用。'
    }
  },
  {
    term: 'CDS Views',
    category: 'abap',
    definition: {
      zh: 'Core Data Services 视图，ABAP 中定义数据模型的声明式语言，是 S/4HANA 开发的核心技术。',
      ja: 'Core Data Services ビュー。ABAP でデータモデルを定義する宣言型言語、S/4HANA 開発の中核技術。'
    }
  },
  {
    term: 'RAP',
    abbr: 'RAP',
    category: 'abap',
    definition: {
      zh: 'RESTful ABAP Programming Model，现代 ABAP 开发框架，支持创建 OData 服务和 Fiori 应用。',
      ja: 'RESTful ABAP Programming Model。モダン ABAP 開発フレームワーク、OData サービスと Fiori アプリの作成をサポート。'
    }
  },
  {
    term: 'CAP',
    abbr: 'CAP',
    category: 'abap',
    definition: {
      zh: 'Cloud Application Programming Model，SAP 云应用开发框架，支持 Node.js 和 Java，使用 CDS 建模。',
      ja: 'Cloud Application Programming Model。SAP クラウドアプリ開発フレームワーク、Node.js と Java をサポート、CDS でモデリング。'
    }
  },
  {
    term: 'SAPUI5',
    category: 'abap',
    definition: {
      zh: 'SAP UI Development Toolkit for HTML5，用于构建企业级 Web 应用的 JavaScript 框架。',
      ja: 'SAP UI Development Toolkit for HTML5。エンタープライズ級 Web アプリを構築するための JavaScript フレームワーク。'
    }
  },
  {
    term: 'Fiori Elements',
    category: 'abap',
    definition: {
      zh: '基于模板的 Fiori 应用开发方式，通过注解自动生成标准 UI，减少前端代码编写。',
      ja: 'テンプレートベースの Fiori アプリ開発方式。アノテーションにより標準 UI を自動生成、フロントエンドコードを削減。'
    }
  },
  {
    term: 'OData',
    category: 'abap',
    definition: {
      zh: 'Open Data Protocol，RESTful API 标准，SAP 系统对外提供数据服务的主要方式。',
      ja: 'Open Data Protocol。RESTful API 標準、SAP システムが外部にデータサービスを提供する主要な方式。'
    }
  },
  {
    term: 'BAPI',
    abbr: 'BAPI',
    category: 'abap',
    definition: {
      zh: 'Business Application Programming Interface，SAP 业务对象的标准化 API，用于系统集成。',
      ja: 'Business Application Programming Interface。SAP ビジネスオブジェクトの標準化 API、システム統合に使用。'
    }
  },
  {
    term: 'RFC',
    abbr: 'RFC',
    category: 'abap',
    definition: {
      zh: 'Remote Function Call，SAP 系统间远程调用 ABAP 函数的协议。',
      ja: 'Remote Function Call。SAP システム間で ABAP 関数をリモート呼び出しするプロトコル。'
    }
  },
  {
    term: 'ABAP Cloud',
    category: 'abap',
    definition: {
      zh: 'S/4HANA Cloud 中受限的 ABAP 开发环境，只能使用白名单 API，确保升级兼容性。',
      ja: 'S/4HANA Cloud の制限付き ABAP 開発環境。ホワイトリスト API のみ使用可能、アップグレード互換性を保証。'
    }
  },
  {
    term: 'Clean Core',
    category: 'abap',
    definition: {
      zh: 'SAP 推荐的开发原则，保持核心系统干净，将自定义代码移至 BTP 或使用标准扩展点。',
      ja: 'SAP 推奨の開発原則。コアシステムをクリーンに保ち、カスタムコードを BTP に移動するか標準拡張ポイントを使用。'
    }
  },

  // Migration Terms
  {
    term: 'Greenfield',
    category: 'migration',
    definition: {
      zh: '全新实施方式，从零开始部署 S/4HANA，重新设计业务流程，不迁移历史数据和配置。',
      ja: '新規導入アプローチ。S/4HANA をゼロからデプロイ、ビジネスプロセスを再設計、履歴データと設定を移行しない。'
    }
  },
  {
    term: 'Brownfield',
    category: 'migration',
    definition: {
      zh: '系统转换方式，在现有 ECC 系统基础上直接升级到 S/4HANA，保留现有配置和数据。',
      ja: 'システム変換アプローチ。既存 ECC システム上で直接 S/4HANA にアップグレード、既存の設定とデータを保持。'
    }
  },
  {
    term: 'Bluefield',
    category: 'migration',
    definition: {
      zh: '选择性迁移方式，结合 Greenfield 和 Brownfield 优点，选择性地迁移数据和配置。',
      ja: '選択的移行アプローチ。Greenfield と Brownfield の利点を組み合わせ、データと設定を選択的に移行。'
    }
  },
  {
    term: 'RISE with SAP',
    category: 'migration',
    definition: {
      zh: 'SAP 的企业云转型套餐，包含 S/4HANA Cloud、BTP、Business Network 和转型服务。',
      ja: 'SAP の企業クラウド変革パッケージ。S/4HANA Cloud、BTP、Business Network、変革サービスを含む。'
    }
  },
  {
    term: 'GROW with SAP',
    category: 'migration',
    definition: {
      zh: '面向中小企业的云 ERP 套餐，提供预配置的 S/4HANA Cloud Public Edition。',
      ja: '中小企業向けクラウド ERP パッケージ。事前設定済み S/4HANA Cloud Public Edition を提供。'
    }
  },
  {
    term: 'SAP Activate',
    category: 'migration',
    definition: {
      zh: 'SAP 官方敏捷实施方法论，包含 Discover、Prepare、Explore、Realize、Deploy、Run 六个阶段。',
      ja: 'SAP 公式アジャイル導入方法論。Discover、Prepare、Explore、Realize、Deploy、Run の6フェーズを含む。'
    }
  },
  {
    term: 'Fit-to-Standard',
    category: 'migration',
    definition: {
      zh: '适配标准工作坊，分析现有业务流程与 SAP 标准的差距，推动采用 SAP 最佳实践。',
      ja: 'Fit-to-Standard ワークショップ。既存ビジネスプロセスと SAP 標準の差分を分析、SAP ベストプラクティスの採用を推進。'
    }
  },
  {
    term: 'SUM',
    abbr: 'SUM',
    category: 'migration',
    definition: {
      zh: 'Software Update Manager，SAP 系统升级和迁移工具，用于 Brownfield 方式的技术转换。',
      ja: 'Software Update Manager。SAP システムのアップグレードと移行ツール、Brownfield アプローチの技術変換に使用。'
    }
  },
  {
    term: 'SAP Readiness Check',
    category: 'migration',
    definition: {
      zh: 'S/4HANA 迁移准备度检查工具，分析现有系统的自定义代码、数据量和简化项。',
      ja: 'S/4HANA 移行準備度チェックツール。既存システムのカスタムコード、データ量、簡素化項目を分析。'
    }
  },
  {
    term: 'Custom Code Migration',
    category: 'migration',
    definition: {
      zh: '自定义代码迁移，使用 ATC 检查和适配 ABAP 自定义代码以兼容 S/4HANA。',
      ja: 'カスタムコード移行。ATC を使用して ABAP カスタムコードを S/4HANA 互換にチェック・適応。'
    }
  },

  // Integration Terms
  {
    term: 'SAP Integration Suite',
    category: 'integration',
    definition: {
      zh: 'SAP 的云集成平台，包含 Cloud Integration、API Management、Event Mesh 等服务。',
      ja: 'SAP のクラウド統合プラットフォーム。Cloud Integration、API Management、Event Mesh などのサービスを含む。'
    }
  },
  {
    term: 'Cloud Integration',
    abbr: 'CI',
    category: 'integration',
    definition: {
      zh: '前身为 SAP CPI，提供 iFlow 设计器用于构建集成流程，连接云端和本地系统。',
      ja: '旧称 SAP CPI。iFlow デザイナーで統合フローを構築、クラウドとオンプレミスシステムを接続。'
    }
  },
  {
    term: 'iFlow',
    category: 'integration',
    definition: {
      zh: 'Integration Flow，Cloud Integration 中定义的集成流程，包含发送方、接收方、映射和路由。',
      ja: 'Integration Flow。Cloud Integration で定義する統合フロー、送信者、受信者、マッピング、ルーティングを含む。'
    }
  },
  {
    term: 'API Management',
    category: 'integration',
    definition: {
      zh: 'SAP 的 API 网关服务，提供 API 代理、安全策略、流量控制和开发者门户。',
      ja: 'SAP の API ゲートウェイサービス。API プロキシ、セキュリティポリシー、トラフィック制御、開発者ポータルを提供。'
    }
  },
  {
    term: 'Event Mesh',
    category: 'integration',
    definition: {
      zh: 'SAP 的企业消息服务，支持事件驱动架构，实现系统间的异步通信。',
      ja: 'SAP のエンタープライズメッセージングサービス。イベント駆動アーキテクチャをサポート、システム間の非同期通信を実現。'
    }
  },
  {
    term: 'IDoc',
    abbr: 'IDoc',
    category: 'integration',
    definition: {
      zh: 'Intermediate Document，SAP 系统间交换业务数据的标准格式，用于 EDI 和 ALE 场景。',
      ja: 'Intermediate Document。SAP システム間でビジネスデータを交換する標準フォーマット、EDI と ALE シナリオに使用。'
    }
  },

  // SAP AI/ML Terms
  {
    term: 'SAP AI Core',
    category: 'ai-ml',
    definition: {
      zh: 'SAP 的机器学习运维平台，提供模型训练、部署和推理的托管环境。',
      ja: 'SAP の機械学習運用プラットフォーム。モデルのトレーニング、デプロイ、推論のマネージド環境を提供。'
    }
  },
  {
    term: 'SAP AI Launchpad',
    category: 'ai-ml',
    definition: {
      zh: 'AI Core 的管理界面，用于管理 AI 场景、配置和模型部署。',
      ja: 'AI Core の管理インターフェース。AI シナリオ、設定、モデルデプロイを管理。'
    }
  },
  {
    term: 'Generative AI Hub',
    category: 'ai-ml',
    definition: {
      zh: 'SAP AI Core 中的生成式 AI 服务，提供对 GPT、Claude 等大语言模型的访问。',
      ja: 'SAP AI Core の生成 AI サービス。GPT、Claude などの大規模言語モデルへのアクセスを提供。'
    }
  },
  {
    term: 'Document Information Extraction',
    abbr: 'DIE',
    category: 'ai-ml',
    definition: {
      zh: 'SAP 的文档信息提取服务，使用 ML 从发票、采购订单等文档中自动提取数据。',
      ja: 'SAP の文書情報抽出サービス。ML を使用して請求書、発注書などのドキュメントからデータを自動抽出。'
    }
  },
  {
    term: 'Business Entity Recognition',
    abbr: 'BER',
    category: 'ai-ml',
    definition: {
      zh: 'SAP 的业务实体识别服务，从非结构化文本中识别业务相关实体。',
      ja: 'SAP のビジネスエンティティ認識サービス。非構造化テキストからビジネス関連エンティティを認識。'
    }
  },
  {
    term: 'SAP Datasphere',
    category: 'ai-ml',
    definition: {
      zh: 'SAP 的数据仓库和数据联邦平台，支持语义模型和多源数据整合。',
      ja: 'SAP のデータウェアハウスとデータフェデレーションプラットフォーム。セマンティックモデルと複数ソースのデータ統合をサポート。'
    }
  },
  {
    term: 'SAP Analytics Cloud',
    abbr: 'SAC',
    category: 'ai-ml',
    definition: {
      zh: 'SAP 的云端 BI 和规划平台，提供仪表板、报表和预测分析功能。',
      ja: 'SAP のクラウド BI および計画プラットフォーム。ダッシュボード、レポート、予測分析機能を提供。'
    }
  },
  {
    term: 'Joule',
    category: 'ai-ml',
    definition: {
      zh: 'SAP 的生成式 AI 助手，集成在 S/4HANA 和 SuccessFactors 中，提供自然语言交互。',
      ja: 'SAP の生成 AI アシスタント。S/4HANA と SuccessFactors に統合、自然言語インタラクションを提供。'
    }
  }
];

export default function SAPGlossaryPage() {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TermCategory | 'all'>('all');

  const lang = language === 'ja' ? 'ja' : 'zh';

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = searchTerm === '' ||
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (term.abbr && term.abbr.toLowerCase().includes(searchTerm.toLowerCase())) ||
        term.definition[lang].toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, lang]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, Term[]> = {};
    filteredTerms.forEach(term => {
      const firstLetter = term.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredTerms]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-700 to-teal-700 text-white sticky top-0 z-50">
        <div className="px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-cyan-100 hover:text-white transition-colors"
              >
                <Home size={20} />
                <span className="hidden sm:inline">{language === 'ja' ? 'ホーム' : '首页'}</span>
              </button>
              <ChevronRight size={16} className="text-cyan-300" />
              <h1 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen size={20} />
                {language === 'ja' ? 'SAP 用語集' : 'SAP 技术词汇表'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Settings size={20} className="text-cyan-200" />
              <span className="font-semibold">StudyForge</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-10 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'ja' ? '用語を検索...' : '搜索术语...'}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {language === 'ja' ? 'すべて' : '全部'}
              </button>
              {(Object.entries(categoryConfig) as [TermCategory, typeof categoryConfig[TermCategory]][]).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === key
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Icon size={16} />
                    {config.name[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            <span>{filteredTerms.length} {language === 'ja' ? '件の用語' : '个术语'}</span>
            <span>•</span>
            <span>{Object.keys(categoryConfig).length} {language === 'ja' ? 'カテゴリ' : '个分类'}</span>
          </div>
        </div>

        {/* Terms List */}
        <div className="space-y-8">
          {groupedTerms.map(([letter, terms]) => (
            <div key={letter}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold">
                  {letter}
                </div>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="grid gap-4">
                {terms.map((term, index) => {
                  const config = categoryConfig[term.category];
                  const Icon = config.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-800">
                              {term.term}
                            </h3>
                            {term.abbr && (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-sm rounded font-mono">
                                {term.abbr}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {term.definition[lang]}
                          </p>
                          {term.example && (
                            <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                              <span className="text-xs font-semibold text-slate-500 uppercase">
                                {language === 'ja' ? '例' : '示例'}
                              </span>
                              <p className="text-sm text-slate-600 mt-1">{term.example[lang]}</p>
                            </div>
                          )}
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                          <Icon size={14} />
                          {config.name[lang]}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              {language === 'ja' ? '用語が見つかりませんでした' : '未找到相关术语'}
            </h3>
            <p className="text-slate-500">
              {language === 'ja' ? '検索条件を変更してください' : '请尝试其他搜索条件'}
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
            {language === 'ja' ? 'SAP 学習プラットフォーム' : 'SAP 学习平台'}
          </p>
        </div>
      </footer>
    </div>
  );
}
