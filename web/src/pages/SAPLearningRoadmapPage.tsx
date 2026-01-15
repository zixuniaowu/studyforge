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
  Star,
  ArrowRight,
  ExternalLink,
  Database,
  Cloud,
  Settings,
  Users,
  Layers,
  Zap,
  Shield,
  TrendingUp,
  GitBranch
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';

type RoadmapId = 'migration-specialist' | 'functional-consultant' | 'technical-developer';

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
    id: 'migration-specialist',
    name: { zh: 'SAP 迁移专家', ja: 'SAP 移行スペシャリスト' },
    description: { zh: '从 ECC 到 S/4HANA 的迁移全流程', ja: 'ECC から S/4HANA への移行全プロセス' },
    icon: GitBranch,
    gradient: 'from-cyan-500 to-teal-600',
    phases: [
      {
        id: 'foundation',
        name: { zh: '迁移基础', ja: '移行基礎' },
        color: 'bg-cyan-500',
        steps: [
          {
            id: 'sap-overview',
            title: { zh: 'SAP 生态系统概览', ja: 'SAP エコシステム概要' },
            description: { zh: '了解 SAP ECC/R3 到 S/4HANA 的演进历程，理解为什么要迁移', ja: 'SAP ECC/R3 から S/4HANA への進化を理解し、なぜ移行が必要かを把握' },
            duration: { zh: '1-2 周', ja: '1-2 週間' },
            skills: ['SAP History', 'ECC vs S/4HANA', 'Business Case', 'TCO Analysis'],
            resources: [
              { name: 'SAP Learning Hub - S/4HANA Overview', type: 'course' },
              { name: 'RISE with SAP 白皮书', type: 'book' }
            ]
          },
          {
            id: 'hana-basics',
            title: { zh: 'SAP HANA 基础', ja: 'SAP HANA 基礎' },
            description: { zh: '内存数据库原理、列式存储、数据压缩、HANA 架构', ja: 'インメモリデータベースの原理、カラムストレージ、データ圧縮、HANA アーキテクチャ' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['In-Memory Computing', 'Column Store', 'HANA Studio', 'SQL on HANA'],
            resources: [
              { name: 'openSAP - SAP HANA Introduction', type: 'course' },
              { name: 'HANA Academy YouTube', type: 'course' }
            ],
            certifications: ['C_HANATEC']
          },
          {
            id: 's4-architecture',
            title: { zh: 'S/4HANA 架构理解', ja: 'S/4HANA アーキテクチャ理解' },
            description: { zh: '简化数据模型、Universal Journal、Fiori UX、嵌入式分析', ja: '簡素化データモデル、Universal Journal、Fiori UX、組み込み分析' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['Simplified Data Model', 'ACDOCA', 'Fiori Launchpad', 'CDS Views'],
            resources: [
              { name: 'openSAP - S/4HANA in a Nutshell', type: 'course' },
              { name: '本站 C_TS410 题库', type: 'practice' }
            ],
            certifications: ['C_TS410']
          }
        ]
      },
      {
        id: 'migration-approach',
        name: { zh: '迁移策略', ja: '移行戦略' },
        color: 'bg-teal-500',
        steps: [
          {
            id: 'greenfield',
            title: { zh: 'Greenfield 全新实施', ja: 'Greenfield 新規導入' },
            description: { zh: '完全重新实施，重新设计业务流程，适合需要业务转型的企业', ja: '完全に再導入し、ビジネスプロセスを再設計、ビジネス変革が必要な企業に適用' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['Best Practices', 'Fit-to-Standard', 'Business Process Redesign', 'Clean Slate'],
            resources: [
              { name: 'SAP Best Practices Explorer', type: 'course' },
              { name: 'SAP Model Company', type: 'practice' }
            ]
          },
          {
            id: 'brownfield',
            title: { zh: 'Brownfield 系统转换', ja: 'Brownfield システム変換' },
            description: { zh: '保留现有配置和数据，技术升级转换，适合配置成熟的企业', ja: '既存の設定とデータを保持、技術アップグレード変換、成熟した設定を持つ企業に適用' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['System Conversion', 'SUM Tool', 'Data Migration', 'Custom Code Adaptation'],
            resources: [
              { name: 'SAP Note 2340778 - S/4HANA Conversion Guide', type: 'book' },
              { name: 'SUM (Software Update Manager)', type: 'practice' }
            ]
          },
          {
            id: 'bluefield',
            title: { zh: 'Bluefield 选择性迁移', ja: 'Bluefield 選択的移行' },
            description: { zh: '结合 Greenfield 和 Brownfield 优点，选择性迁移数据和配置', ja: 'Greenfield と Brownfield の利点を組み合わせ、データと設定を選択的に移行' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['Selective Data Transition', 'SNP CrystalBridge', 'SAP S/4HANA Migration Cockpit'],
            resources: [
              { name: 'SAP S/4HANA Migration Cockpit', type: 'course' },
              { name: 'SNP Transformation Platform', type: 'practice' }
            ]
          },
          {
            id: 'rise-grow',
            title: { zh: 'RISE/GROW with SAP', ja: 'RISE/GROW with SAP' },
            description: { zh: 'SAP 官方云转型套餐，包含 BTP、Business Network、成功服务', ja: 'SAP 公式クラウド変革パッケージ、BTP、Business Network、成功サービスを含む' },
            duration: { zh: '1-2 周', ja: '1-2 週間' },
            skills: ['RISE with SAP', 'GROW with SAP', 'PCE (Private Cloud Edition)', 'Cloud ALM'],
            resources: [
              { name: 'SAP RISE 官方文档', type: 'book' },
              { name: 'SAP Discovery Center', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 'implementation',
        name: { zh: '实施方法论', ja: '導入方法論' },
        color: 'bg-emerald-500',
        steps: [
          {
            id: 'activate',
            title: { zh: 'SAP Activate 方法论', ja: 'SAP Activate 方法論' },
            description: { zh: 'SAP 官方敏捷实施方法论：Discover、Prepare、Explore、Realize、Deploy、Run', ja: 'SAP 公式アジャイル導入方法論：Discover、Prepare、Explore、Realize、Deploy、Run' },
            duration: { zh: '3-4 周', ja: '3-4 週間' },
            skills: ['Agile/Scrum', 'Fit-to-Standard Workshops', 'Solution Manager', 'Cloud ALM'],
            resources: [
              { name: 'openSAP - SAP Activate', type: 'course' },
              { name: '本站 C_ACTIVATE 题库', type: 'practice' }
            ],
            certifications: ['C_ACTIVATE']
          },
          {
            id: 'signavio',
            title: { zh: 'SAP Signavio 流程分析', ja: 'SAP Signavio プロセス分析' },
            description: { zh: '流程挖掘、流程建模、识别优化机会、迁移前后对比', ja: 'プロセスマイニング、プロセスモデリング、最適化機会の特定、移行前後の比較' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['Process Mining', 'BPMN Modeling', 'Process Intelligence', 'Benchmarking'],
            resources: [
              { name: 'SAP Signavio Process Manager', type: 'course' },
              { name: 'Process Mining Best Practices', type: 'book' }
            ]
          },
          {
            id: 'custom-code',
            title: { zh: '自定义代码适配', ja: 'カスタムコード適応' },
            description: { zh: '使用 ATC/ABAP Test Cockpit 分析自定义代码，Clean Core 原则', ja: 'ATC/ABAP Test Cockpit でカスタムコードを分析、Clean Core 原則' },
            duration: { zh: '2-4 周', ja: '2-4 週間' },
            skills: ['ATC Checks', 'Custom Code Migration', 'Clean Core', 'Side-by-Side Extensions'],
            resources: [
              { name: 'SAP Custom Code Migration Guide', type: 'book' },
              { name: 'ABAP Test Cockpit', type: 'practice' }
            ]
          }
        ]
      },
      {
        id: 'cloud-extension',
        name: { zh: '云扩展', ja: 'クラウド拡張' },
        color: 'bg-blue-500',
        steps: [
          {
            id: 'btp-foundation',
            title: { zh: 'SAP BTP 平台基础', ja: 'SAP BTP プラットフォーム基礎' },
            description: { zh: 'BTP 账户模型、子账户、环境（Cloud Foundry/Kyma）、服务目录', ja: 'BTP アカウントモデル、サブアカウント、環境（Cloud Foundry/Kyma）、サービスカタログ' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['BTP Cockpit', 'Subaccounts', 'Entitlements', 'Service Marketplace'],
            resources: [
              { name: 'openSAP - BTP Basics', type: 'course' },
              { name: '本站 C_BTP 题库', type: 'practice' }
            ],
            certifications: ['C_BTP']
          },
          {
            id: 'integration-suite',
            title: { zh: 'SAP Integration Suite', ja: 'SAP Integration Suite' },
            description: { zh: 'Cloud Integration、API Management、Event Mesh、混合集成场景', ja: 'Cloud Integration、API Management、Event Mesh、ハイブリッド統合シナリオ' },
            duration: { zh: '3-4 周', ja: '3-4 週間' },
            skills: ['iFlows', 'API Gateway', 'Event-Driven Architecture', 'Hybrid Integration'],
            resources: [
              { name: 'SAP Integration Suite 官方文档', type: 'book' },
              { name: '本站 C_BTPINT 题库', type: 'practice' }
            ],
            certifications: ['C_BTPINT']
          }
        ]
      }
    ]
  },
  {
    id: 'functional-consultant',
    name: { zh: 'SAP 功能顾问', ja: 'SAP ファンクショナルコンサルタント' },
    description: { zh: '业务流程配置与优化专家', ja: 'ビジネスプロセス設定と最適化のエキスパート' },
    icon: Users,
    gradient: 'from-amber-500 to-orange-600',
    phases: [
      {
        id: 'erp-basics',
        name: { zh: 'ERP 基础', ja: 'ERP 基礎' },
        color: 'bg-amber-500',
        steps: [
          {
            id: 'business-process',
            title: { zh: '企业业务流程', ja: '企業ビジネスプロセス' },
            description: { zh: '采购到付款 (P2P)、订单到收款 (O2C)、记录到报告 (R2R)', ja: '調達から支払い（P2P）、受注から回収（O2C）、記録からレポート（R2R）' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['P2P', 'O2C', 'R2R', 'Business Process Mapping'],
            resources: [
              { name: 'SAP Best Practices', type: 'course' },
              { name: '企业 ERP 概论', type: 'book' }
            ]
          },
          {
            id: 's4-navigation',
            title: { zh: 'S/4HANA 导航与配置', ja: 'S/4HANA ナビゲーションと設定' },
            description: { zh: 'Fiori Launchpad、SAP GUI、IMG 配置路径、组织结构', ja: 'Fiori Launchpad、SAP GUI、IMG 設定パス、組織構造' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['Fiori Launchpad', 'SAP GUI', 'IMG', 'Organizational Structure'],
            resources: [
              { name: 'openSAP - S/4HANA Navigation', type: 'course' }
            ],
            certifications: ['C_TS410']
          }
        ]
      },
      {
        id: 'finance',
        name: { zh: '财务模块', ja: '財務モジュール' },
        color: 'bg-green-500',
        steps: [
          {
            id: 'fi-gl',
            title: { zh: '总账与财务报告', ja: '総勘定元帳と財務レポート' },
            description: { zh: 'Universal Journal (ACDOCA)、科目表、公司代码、财务报表', ja: 'Universal Journal (ACDOCA)、勘定科目表、会社コード、財務諸表' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['General Ledger', 'ACDOCA', 'Chart of Accounts', 'Financial Statements'],
            resources: [
              { name: 'openSAP - S/4HANA Finance', type: 'course' },
              { name: '本站 C_TS4FI 题库', type: 'practice' }
            ],
            certifications: ['C_TS4FI']
          },
          {
            id: 'fi-arap',
            title: { zh: '应收应付账款', ja: '売掛金・買掛金' },
            description: { zh: '客户/供应商主数据、发票处理、付款运行、信用管理', ja: '得意先/仕入先マスタデータ、請求書処理、支払実行、与信管理' },
            duration: { zh: '3-4 周', ja: '3-4 週間' },
            skills: ['Customer Master', 'Vendor Master', 'Invoice Processing', 'Payment Run'],
            resources: [
              { name: 'SAP S/4HANA Finance 配置指南', type: 'book' }
            ]
          },
          {
            id: 'co',
            title: { zh: '管理会计/成本控制', ja: '管理会計/原価管理' },
            description: { zh: '成本中心、利润中心、内部订单、产品成本核算', ja: '原価センタ、利益センタ、内部指図、製品原価計算' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['Cost Centers', 'Profit Centers', 'Internal Orders', 'Product Costing'],
            resources: [
              { name: 'openSAP - S/4HANA Management Accounting', type: 'course' },
              { name: '本站 C_TS4CO 题库', type: 'practice' }
            ],
            certifications: ['C_TS4CO']
          }
        ]
      },
      {
        id: 'logistics',
        name: { zh: '物流模块', ja: '物流モジュール' },
        color: 'bg-blue-500',
        steps: [
          {
            id: 'mm',
            title: { zh: '物料管理/采购', ja: '購買管理' },
            description: { zh: '采购申请、采购订单、货物收据、发票校验、库存管理', ja: '購買依頼、購買発注、入庫、請求書照合、在庫管理' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['Purchase Requisition', 'Purchase Order', 'Goods Receipt', 'Invoice Verification'],
            resources: [
              { name: 'openSAP - S/4HANA Sourcing & Procurement', type: 'course' },
              { name: '本站 C_TS450 题库', type: 'practice' }
            ],
            certifications: ['C_TS450']
          },
          {
            id: 'sd',
            title: { zh: '销售与分销', ja: '販売管理' },
            description: { zh: '销售订单、定价、交货、开票、可用性检查', ja: '受注、価格設定、出荷、請求、在庫確認' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['Sales Order', 'Pricing', 'Delivery', 'Billing', 'ATP Check'],
            resources: [
              { name: 'openSAP - S/4HANA Sales', type: 'course' },
              { name: '本站 C_TS460 题库', type: 'practice' }
            ],
            certifications: ['C_TS460']
          },
          {
            id: 'ewm',
            title: { zh: '扩展仓库管理', ja: '拡張倉庫管理' },
            description: { zh: 'EWM 与 S/4HANA 集成、仓储优化、RF 设备、波次管理', ja: 'EWM と S/4HANA 統合、倉庫最適化、RF デバイス、ウェーブ管理' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['Warehouse Structure', 'Putaway', 'Picking', 'Wave Management'],
            resources: [
              { name: 'SAP EWM in S/4HANA', type: 'book' },
              { name: '本站 C_S4EWM 题库', type: 'practice' }
            ],
            certifications: ['C_S4EWM']
          }
        ]
      }
    ]
  },
  {
    id: 'technical-developer',
    name: { zh: 'SAP 技术开发者', ja: 'SAP 技術開発者' },
    description: { zh: '现代 SAP 开发技术栈专家', ja: 'モダン SAP 開発技術スタックのエキスパート' },
    icon: Code2,
    gradient: 'from-violet-500 to-purple-600',
    phases: [
      {
        id: 'abap-basics',
        name: { zh: 'ABAP 基础', ja: 'ABAP 基礎' },
        color: 'bg-violet-500',
        steps: [
          {
            id: 'abap-core',
            title: { zh: 'ABAP 核心语法', ja: 'ABAP コア構文' },
            description: { zh: 'ABAP 数据类型、内表、Open SQL、模块化编程', ja: 'ABAP データ型、内部テーブル、Open SQL、モジュール化プログラミング' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['ABAP Syntax', 'Internal Tables', 'Open SQL', 'Function Modules'],
            resources: [
              { name: 'openSAP - ABAP Development', type: 'course' },
              { name: 'ABAP 官方文档', type: 'book' }
            ]
          },
          {
            id: 'abap-oo',
            title: { zh: 'ABAP 面向对象', ja: 'ABAP オブジェクト指向' },
            description: { zh: '类、接口、继承、多态、设计模式在 ABAP 中的应用', ja: 'クラス、インターフェース、継承、ポリモーフィズム、ABAP でのデザインパターン' },
            duration: { zh: '3-4 周', ja: '3-4 週間' },
            skills: ['ABAP OO', 'Classes', 'Interfaces', 'Design Patterns'],
            resources: [
              { name: 'ABAP Objects 官方指南', type: 'book' }
            ]
          }
        ]
      },
      {
        id: 'modern-abap',
        name: { zh: '现代 ABAP', ja: 'モダン ABAP' },
        color: 'bg-purple-500',
        steps: [
          {
            id: 'cds-views',
            title: { zh: 'CDS Views 核心数据服务', ja: 'CDS Views コアデータサービス' },
            description: { zh: 'ABAP CDS、注解、关联、虚拟元素、分析查询', ja: 'ABAP CDS、アノテーション、アソシエーション、仮想要素、分析クエリ' },
            duration: { zh: '3-4 周', ja: '3-4 週間' },
            skills: ['CDS Views', 'Annotations', 'Associations', 'Analytics'],
            resources: [
              { name: 'openSAP - CDS Views', type: 'course' },
              { name: 'SAP ABAP CDS 官方文档', type: 'book' }
            ]
          },
          {
            id: 'rap',
            title: { zh: 'RAP 模型 (RESTful ABAP)', ja: 'RAP モデル (RESTful ABAP)' },
            description: { zh: 'ABAP RESTful 编程模型、Behavior Definition、BOPF 替代', ja: 'ABAP RESTful プログラミングモデル、Behavior Definition、BOPF 代替' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['RAP', 'Behavior Definition', 'OData Services', 'Fiori Elements'],
            resources: [
              { name: 'openSAP - Building RAP Applications', type: 'course' },
              { name: 'SAP RAP 开发者指南', type: 'book' }
            ]
          },
          {
            id: 'abap-cloud',
            title: { zh: 'ABAP Cloud & Clean Core', ja: 'ABAP Cloud & Clean Core' },
            description: { zh: 'ABAP 云开发限制、Released APIs、扩展性设计', ja: 'ABAP クラウド開発制限、Released APIs、拡張性設計' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['ABAP Cloud', 'Released APIs', 'Clean Core', 'Extensibility'],
            resources: [
              { name: 'SAP Clean Core 白皮书', type: 'book' }
            ]
          }
        ]
      },
      {
        id: 'btp-development',
        name: { zh: 'BTP 开发', ja: 'BTP 開発' },
        color: 'bg-blue-500',
        steps: [
          {
            id: 'cap',
            title: { zh: 'CAP 框架 (Cloud Application Programming)', ja: 'CAP フレームワーク' },
            description: { zh: 'Node.js/Java CAP 开发、CDS 建模、服务定义、数据库连接', ja: 'Node.js/Java CAP 開発、CDS モデリング、サービス定義、データベース接続' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['CAP', 'CDS', 'Node.js', 'Java', 'OData V4'],
            resources: [
              { name: 'CAP 官方文档 (capire.io)', type: 'book' },
              { name: '本站 C_BTPDEV 题库', type: 'practice' }
            ],
            certifications: ['C_BTPDEV']
          },
          {
            id: 'fiori',
            title: { zh: 'SAP Fiori/SAPUI5 开发', ja: 'SAP Fiori/SAPUI5 開発' },
            description: { zh: 'Fiori Elements、SAPUI5 自由式开发、SAP Build Apps', ja: 'Fiori Elements、SAPUI5 フリースタイル開発、SAP Build Apps' },
            duration: { zh: '4-6 周', ja: '4-6 週間' },
            skills: ['SAPUI5', 'Fiori Elements', 'SAP Build Apps', 'UI5 Tooling'],
            resources: [
              { name: 'openSAP - Fiori Development', type: 'course' },
              { name: 'SAPUI5 官方文档', type: 'book' }
            ]
          },
          {
            id: 'cloud-sdk',
            title: { zh: 'SAP Cloud SDK 扩展开发', ja: 'SAP Cloud SDK 拡張開発' },
            description: { zh: '使用 Cloud SDK 开发 Side-by-Side 扩展应用', ja: 'Cloud SDK を使用した Side-by-Side 拡張アプリ開発' },
            duration: { zh: '3-4 周', ja: '3-4 週間' },
            skills: ['SAP Cloud SDK', 'Destination Service', 'Side-by-Side Extensions'],
            resources: [
              { name: 'SAP Cloud SDK 官方文档', type: 'book' },
              { name: '本站 C_S4CDK 题库', type: 'practice' }
            ],
            certifications: ['C_S4CDK']
          }
        ]
      },
      {
        id: 'ai-ml',
        name: { zh: 'SAP AI/ML', ja: 'SAP AI/ML' },
        color: 'bg-emerald-500',
        steps: [
          {
            id: 'ai-core',
            title: { zh: 'SAP AI Core', ja: 'SAP AI Core' },
            description: { zh: '机器学习模型训练、部署、推理，MLOps 最佳实践', ja: '機械学習モデルのトレーニング、デプロイ、推論、MLOps ベストプラクティス' },
            duration: { zh: '3-4 周', ja: '3-4 週間' },
            skills: ['AI Core', 'ML Pipelines', 'Model Serving', 'MLOps'],
            resources: [
              { name: 'openSAP - AI on SAP BTP', type: 'course' },
              { name: '本站 C_AICORE 题库', type: 'practice' }
            ],
            certifications: ['C_AICORE']
          },
          {
            id: 'ai-services',
            title: { zh: 'SAP AI 业务服务', ja: 'SAP AI ビジネスサービス' },
            description: { zh: '文档信息提取、业务实体识别、Generative AI Hub', ja: 'ドキュメント情報抽出、ビジネスエンティティ認識、Generative AI Hub' },
            duration: { zh: '2-3 周', ja: '2-3 週間' },
            skills: ['Document Information Extraction', 'Business Entity Recognition', 'Generative AI Hub'],
            resources: [
              { name: 'SAP AI Business Services 文档', type: 'book' },
              { name: '本站 C_AIBUS 题库', type: 'practice' }
            ],
            certifications: ['C_AIBUS']
          },
          {
            id: 'datasphere',
            title: { zh: 'SAP Datasphere 数据分析', ja: 'SAP Datasphere データ分析' },
            description: { zh: '数据仓库、数据联邦、语义模型、SAP Analytics Cloud 集成', ja: 'データウェアハウス、データフェデレーション、セマンティックモデル、SAC 統合' },
            duration: { zh: '3-4 周', ja: '3-4 週間' },
            skills: ['Datasphere', 'Data Federation', 'Semantic Layer', 'SAC Integration'],
            resources: [
              { name: 'openSAP - Datasphere', type: 'course' },
              { name: '本站 C_DATASPH 题库', type: 'practice' }
            ],
            certifications: ['C_DATASPH']
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
                  <span className="flex items-center gap-1 text-cyan-600">
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
                    <span key={i} className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded">
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

// Migration timeline component
const MigrationTimeline: React.FC<{ language: string }> = ({ language }) => {
  const milestones = [
    {
      year: '2015',
      event: { zh: 'S/4HANA 发布', ja: 'S/4HANA リリース' },
      color: 'bg-cyan-500'
    },
    {
      year: '2021',
      event: { zh: 'RISE with SAP 推出', ja: 'RISE with SAP 開始' },
      color: 'bg-teal-500'
    },
    {
      year: '2027',
      event: { zh: 'ECC 主流支持结束', ja: 'ECC メインストリームサポート終了' },
      color: 'bg-amber-500'
    },
    {
      year: '2030',
      event: { zh: 'ECC 扩展支持结束', ja: 'ECC 延長サポート終了' },
      color: 'bg-red-500'
    }
  ];

  const lang = language === 'ja' ? 'ja' : 'zh';

  return (
    <div className="bg-slate-800 rounded-xl p-6 mb-8">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <TrendingUp size={20} className="text-cyan-400" />
        {language === 'ja' ? 'SAP 移行タイムライン' : 'SAP 迁移时间线'}
      </h3>
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-600 -translate-y-1/2" />
        {milestones.map((m, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center">
            <div className={`w-4 h-4 rounded-full ${m.color}`} />
            <div className="mt-2 text-center">
              <div className="text-white font-bold text-sm">{m.year}</div>
              <div className="text-slate-400 text-xs whitespace-nowrap">{m.event[lang]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stats cards
const StatsCards: React.FC<{ language: string }> = ({ language }) => {
  const stats = [
    {
      icon: Database,
      value: '40,000+',
      label: { zh: '全球 ECC 客户需迁移', ja: 'グローバル ECC 顧客移行必要' },
      color: 'text-cyan-500',
      bg: 'bg-cyan-50'
    },
    {
      icon: Users,
      value: '100万+',
      label: { zh: 'SAP 顾问缺口', ja: 'SAP コンサルタント不足' },
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      icon: TrendingUp,
      value: '30%+',
      label: { zh: '迁移顾问薪资溢价', ja: '移行コンサルタント給与プレミアム' },
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      icon: Shield,
      value: '2027',
      label: { zh: 'ECC 支持截止', ja: 'ECC サポート終了' },
      color: 'text-red-500',
      bg: 'bg-red-50'
    }
  ];

  const lang = language === 'ja' ? 'ja' : 'zh';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className={`${stat.bg} rounded-xl p-4 text-center`}>
          <stat.icon size={24} className={`${stat.color} mx-auto mb-2`} />
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-slate-600">{stat.label[lang]}</div>
        </div>
      ))}
    </div>
  );
};

export default function SAPLearningRoadmapPage() {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapId>('migration-specialist');

  const roadmap = roadmaps.find(r => r.id === selectedRoadmap)!;
  const lang = language === 'ja' ? 'ja' : 'zh';

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
              <h1 className="text-lg font-semibold">
                {language === 'ja' ? 'SAP 移行ロードマップ' : 'SAP 迁移路线图'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={20} className="text-cyan-200" />
              <span className="font-semibold">StudyForge</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 text-white py-8">
        <div className="px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Zap size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {language === 'ja' ? 'ECC → S/4HANA 移行の波に乗る' : 'ECC → S/4HANA 迁移大潮'}
              </h2>
              <p className="text-cyan-100">
                {language === 'ja'
                  ? '史上最大の企業ソフトウェア移行に備えよう'
                  : '抓住史上最大规模企业软件迁移机遇'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="px-6 lg:px-10 py-8">
        {/* Stats */}
        <StatsCards language={language} />

        {/* Timeline */}
        <MigrationTimeline language={language} />

        {/* Roadmap Selection */}
        <div className="bg-white border border-slate-200 rounded-xl mb-8">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">
              {language === 'ja' ? '学習パスを選択' : '选择学习路径'}
            </h3>
          </div>
          <div className="flex overflow-x-auto gap-2 p-4">
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

        {/* Roadmap Overview */}
        <div className={`bg-gradient-to-r ${roadmap.gradient} rounded-xl p-6 text-white mb-8`}>
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
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">
                {roadmap.phases.reduce((sum, p) =>
                  sum + p.steps.filter(s => s.certifications).length, 0
                )}
              </div>
              <div className="text-xs text-white/80">
                {language === 'ja' ? '関連認定' : '相关认证'}
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
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-xl p-6 text-center">
          <Settings size={32} className="mx-auto text-cyan-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            {language === 'ja' ? '今すぐ SAP 学習を始めよう！' : '现在就开始 SAP 学习吧！'}
          </h3>
          <p className="text-slate-500 text-sm mb-4">
            {language === 'ja'
              ? 'StudyForge の SAP 練習問題で知識を定着させましょう'
              : '用 StudyForge 的 SAP 练习题巩固所学知识'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
          >
            {language === 'ja' ? 'SAP 練習を始める' : '开始 SAP 练习'}
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
            {language === 'ja' ? 'SAP 学習プラットフォーム' : 'SAP 学习平台'}
          </p>
        </div>
      </footer>
    </div>
  );
}
