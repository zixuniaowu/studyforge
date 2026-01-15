import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Clock,
  Target,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  BookOpen,
  Trophy,
  Zap,
  Shield,
  TrendingUp,
  Brain,
  Lightbulb
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';

type Provider = 'general' | 'aws' | 'azure' | 'gcp' | 'sap' | 'ai-ml';

interface TipSection {
  title: { zh: string; ja: string };
  icon: React.ElementType;
  color: string;
  tips: { zh: string; ja: string }[];
}

const examTipsData: Record<Provider, {
  name: { zh: string; ja: string };
  gradient: string;
  passingScore: string;
  examDuration: string;
  sections: TipSection[];
}> = {
  general: {
    name: { zh: '通用备考策略', ja: '一般的な試験対策' },
    gradient: 'from-slate-600 to-slate-800',
    passingScore: '70%',
    examDuration: '90-180分',
    sections: [
      {
        title: { zh: '考前准备', ja: '試験前の準備' },
        icon: Calendar,
        color: 'text-blue-600 bg-blue-100',
        tips: [
          { zh: '提前2-3个月开始准备，每天保持1-2小时学习时间', ja: '2-3ヶ月前から準備を開始し、毎日1-2時間の学習時間を確保' },
          { zh: '先通读官方文档，了解考试大纲和题目分布', ja: '公式ドキュメントを通読し、試験範囲と問題分布を把握' },
          { zh: '制定学习计划，按知识领域分配时间', ja: '学習計画を立て、知識領域ごとに時間を配分' },
          { zh: '收集并整理错题，考前重点复习', ja: '間違えた問題を収集・整理し、試験前に重点的に復習' }
        ]
      },
      {
        title: { zh: '答题技巧', ja: '解答テクニック' },
        icon: Target,
        color: 'text-green-600 bg-green-100',
        tips: [
          { zh: '先读问题再看选项，明确题目要求（最佳/最差/最便宜等）', ja: '選択肢を見る前に問題を読み、要求を明確に（最良/最悪/最安など）' },
          { zh: '排除法：先排除明显错误的选项，缩小范围', ja: '消去法：明らかに間違っている選択肢を先に除外し、範囲を絞る' },
          { zh: '注意关键词：always, never, only, must 等绝对词通常是陷阱', ja: 'キーワードに注意：always, never, only, must などの絶対的な言葉は通常トラップ' },
          { zh: '时间管理：不要在一道题上花太多时间，先做有把握的题', ja: '時間管理：一つの問題に時間をかけすぎず、自信のある問題から解く' }
        ]
      },
      {
        title: { zh: '考试当天', ja: '試験当日' },
        icon: Clock,
        color: 'text-purple-600 bg-purple-100',
        tips: [
          { zh: '提前15-30分钟到达考场，熟悉环境', ja: '15-30分前に会場に到着し、環境に慣れる' },
          { zh: '带好有效身份证件（两种）和确认邮件', ja: '有効な身分証明書（2種類）と確認メールを持参' },
          { zh: '考试中保持冷静，遇到难题先标记跳过', ja: '試験中は冷静を保ち、難問は先にマークしてスキップ' },
          { zh: '最后10-15分钟检查标记的题目和所有答案', ja: '最後の10-15分でマークした問題と全ての回答を確認' }
        ]
      },
      {
        title: { zh: '常见陷阱', ja: 'よくある罠' },
        icon: AlertTriangle,
        color: 'text-amber-600 bg-amber-100',
        tips: [
          { zh: '不要过度解读题目，答案通常是最直接的解决方案', ja: '問題を深読みしすぎない、答えは通常最も直接的な解決策' },
          { zh: '警惕"听起来对但不是最佳"的选项', ja: '「正しく聞こえるが最良ではない」選択肢に注意' },
          { zh: '区分"能做到"和"最佳实践"的区别', ja: '「できる」と「ベストプラクティス」の違いを区別' },
          { zh: '注意题目中的场景限制条件（成本、时间、安全等）', ja: '問題のシナリオ制約条件に注意（コスト、時間、セキュリティなど）' }
        ]
      }
    ]
  },
  aws: {
    name: { zh: 'AWS 认证备考', ja: 'AWS 認定試験対策' },
    gradient: 'from-orange-500 to-amber-600',
    passingScore: '720/1000',
    examDuration: '130-180分',
    sections: [
      {
        title: { zh: 'AWS 考试特点', ja: 'AWS 試験の特徴' },
        icon: Shield,
        color: 'text-orange-600 bg-orange-100',
        tips: [
          { zh: 'AWS 考试注重实际场景，题目通常包含详细的业务背景', ja: 'AWS試験は実際のシナリオを重視し、問題には詳細なビジネス背景が含まれる' },
          { zh: '重点掌握：EC2、S3、VPC、IAM、Lambda、RDS 这些核心服务', ja: '重点把握：EC2、S3、VPC、IAM、Lambda、RDS などのコアサービス' },
          { zh: '理解 Well-Architected Framework 的五大支柱', ja: 'Well-Architected Framework の5つの柱を理解' },
          { zh: '熟悉不同服务之间的集成方式和最佳实践', ja: '異なるサービス間の統合方法とベストプラクティスを熟知' }
        ]
      },
      {
        title: { zh: '高频考点', ja: '頻出ポイント' },
        icon: TrendingUp,
        color: 'text-orange-600 bg-orange-100',
        tips: [
          { zh: '安全性：IAM 策略、KMS 加密、Security Groups vs NACLs', ja: 'セキュリティ：IAM ポリシー、KMS 暗号化、Security Groups vs NACLs' },
          { zh: '高可用：Multi-AZ、Auto Scaling、ELB 负载均衡', ja: '高可用性：Multi-AZ、Auto Scaling、ELB ロードバランシング' },
          { zh: '成本优化：Reserved Instances、Spot Instances、S3 存储类别', ja: 'コスト最適化：Reserved Instances、Spot Instances、S3 ストレージクラス' },
          { zh: '无服务器：Lambda 冷启动、API Gateway、DynamoDB', ja: 'サーバーレス：Lambda コールドスタート、API Gateway、DynamoDB' }
        ]
      },
      {
        title: { zh: '推荐学习资源', ja: 'おすすめ学習リソース' },
        icon: BookOpen,
        color: 'text-orange-600 bg-orange-100',
        tips: [
          { zh: 'AWS Skill Builder（官方免费课程）', ja: 'AWS Skill Builder（公式無料コース）' },
          { zh: 'AWS 白皮书和最佳实践指南', ja: 'AWS ホワイトペーパーとベストプラクティスガイド' },
          { zh: '动手实验：使用免费套餐实际操作各项服务', ja: 'ハンズオン：無料利用枠で各サービスを実際に操作' },
          { zh: 'Re:Invent 和 AWS 官方 YouTube 频道', ja: 'Re:Invent と AWS 公式 YouTube チャンネル' }
        ]
      }
    ]
  },
  azure: {
    name: { zh: 'Azure 认证备考', ja: 'Azure 認定試験対策' },
    gradient: 'from-blue-500 to-cyan-600',
    passingScore: '700/1000',
    examDuration: '100-150分',
    sections: [
      {
        title: { zh: 'Azure 考试特点', ja: 'Azure 試験の特徴' },
        icon: Shield,
        color: 'text-blue-600 bg-blue-100',
        tips: [
          { zh: 'Azure 考试常有案例研究题，需要综合分析多个服务', ja: 'Azure試験にはケーススタディ問題があり、複数のサービスを総合的に分析する必要がある' },
          { zh: '可能包含实验题（Performance-based Testing），需要实际操作', ja: '実技問題（Performance-based Testing）が含まれる可能性があり、実際の操作が必要' },
          { zh: '重点：Azure AD、Virtual Networks、Storage Accounts、App Service', ja: '重点：Azure AD、Virtual Networks、Storage Accounts、App Service' },
          { zh: '理解 Azure Resource Manager (ARM) 模板和部署方式', ja: 'Azure Resource Manager (ARM) テンプレートとデプロイ方法を理解' }
        ]
      },
      {
        title: { zh: '高频考点', ja: '頻出ポイント' },
        icon: TrendingUp,
        color: 'text-blue-600 bg-blue-100',
        tips: [
          { zh: '身份管理：Azure AD、RBAC、条件访问策略', ja: 'ID管理：Azure AD、RBAC、条件付きアクセスポリシー' },
          { zh: '网络：VNet Peering、NSG、Application Gateway、Front Door', ja: 'ネットワーク：VNet Peering、NSG、Application Gateway、Front Door' },
          { zh: '监控：Azure Monitor、Log Analytics、Application Insights', ja: '監視：Azure Monitor、Log Analytics、Application Insights' },
          { zh: '混合云：Azure Arc、ExpressRoute、VPN Gateway', ja: 'ハイブリッドクラウド：Azure Arc、ExpressRoute、VPN Gateway' }
        ]
      },
      {
        title: { zh: '推荐学习资源', ja: 'おすすめ学習リソース' },
        icon: BookOpen,
        color: 'text-blue-600 bg-blue-100',
        tips: [
          { zh: 'Microsoft Learn（官方免费学习路径）', ja: 'Microsoft Learn（公式無料学習パス）' },
          { zh: 'Azure 文档和架构中心', ja: 'Azure ドキュメントとアーキテクチャセンター' },
          { zh: 'Azure Friday 视频系列', ja: 'Azure Friday ビデオシリーズ' },
          { zh: '使用 Azure 沙盒环境进行实践', ja: 'Azure サンドボックス環境で実践' }
        ]
      }
    ]
  },
  gcp: {
    name: { zh: 'GCP 认证备考', ja: 'GCP 認定試験対策' },
    gradient: 'from-green-500 to-emerald-600',
    passingScore: '70%',
    examDuration: '120分',
    sections: [
      {
        title: { zh: 'GCP 考试特点', ja: 'GCP 試験の特徴' },
        icon: Shield,
        color: 'text-green-600 bg-green-100',
        tips: [
          { zh: 'GCP 考试强调 Google 的最佳实践和设计原则', ja: 'GCP試験は Google のベストプラクティスと設計原則を強調' },
          { zh: '重点：Compute Engine、GKE、BigQuery、Cloud Storage', ja: '重点：Compute Engine、GKE、BigQuery、Cloud Storage' },
          { zh: '理解项目、文件夹、组织的层级结构和 IAM 继承', ja: 'プロジェクト、フォルダ、組織の階層構造と IAM 継承を理解' },
          { zh: '熟悉 gcloud CLI 命令和 Cloud Console 操作', ja: 'gcloud CLI コマンドと Cloud Console 操作に精通' }
        ]
      },
      {
        title: { zh: '高频考点', ja: '頻出ポイント' },
        icon: TrendingUp,
        color: 'text-green-600 bg-green-100',
        tips: [
          { zh: '数据处理：BigQuery、Dataflow、Pub/Sub、Dataproc', ja: 'データ処理：BigQuery、Dataflow、Pub/Sub、Dataproc' },
          { zh: '容器化：GKE、Cloud Run、Artifact Registry', ja: 'コンテナ化：GKE、Cloud Run、Artifact Registry' },
          { zh: '机器学习：Vertex AI、AutoML、AI Platform', ja: '機械学習：Vertex AI、AutoML、AI Platform' },
          { zh: '网络：VPC、Cloud CDN、Cloud Armor、Load Balancing', ja: 'ネットワーク：VPC、Cloud CDN、Cloud Armor、Load Balancing' }
        ]
      },
      {
        title: { zh: '推荐学习资源', ja: 'おすすめ学習リソース' },
        icon: BookOpen,
        color: 'text-green-600 bg-green-100',
        tips: [
          { zh: 'Google Cloud Skills Boost（含免费学习路径）', ja: 'Google Cloud Skills Boost（無料学習パスを含む）' },
          { zh: 'GCP 文档和解决方案架构', ja: 'GCP ドキュメントとソリューションアーキテクチャ' },
          { zh: 'Qwiklabs 实验室动手练习', ja: 'Qwiklabs ラボでのハンズオン' },
          { zh: 'Google Cloud 官方 YouTube 频道', ja: 'Google Cloud 公式 YouTube チャンネル' }
        ]
      }
    ]
  },
  sap: {
    name: { zh: 'SAP 认证备考', ja: 'SAP 認定試験対策' },
    gradient: 'from-cyan-500 to-teal-600',
    passingScore: '65-70%',
    examDuration: '180分',
    sections: [
      {
        title: { zh: 'SAP 考试特点', ja: 'SAP 試験の特徴' },
        icon: Shield,
        color: 'text-cyan-600 bg-cyan-100',
        tips: [
          { zh: 'SAP 考试注重业务流程理解，需要掌握端到端的业务场景', ja: 'SAP試験はビジネスプロセスの理解を重視し、エンドツーエンドのビジネスシナリオを把握する必要がある' },
          { zh: 'S/4HANA 考试重点：实时分析、Fiori UX、简化数据模型', ja: 'S/4HANA試験の重点：リアルタイム分析、Fiori UX、簡素化されたデータモデル' },
          { zh: 'BTP 考试重点：云原生开发、扩展应用、集成服务', ja: 'BTP試験の重点：クラウドネイティブ開発、拡張アプリケーション、統合サービス' },
          { zh: '考试语言通常为英语，注意专业术语的英文表达', ja: '試験言語は通常英語、専門用語の英語表現に注意' }
        ]
      },
      {
        title: { zh: 'S/4HANA 高频考点', ja: 'S/4HANAの頻出ポイント' },
        icon: TrendingUp,
        color: 'text-cyan-600 bg-cyan-100',
        tips: [
          { zh: '财务模块(FI/CO)：总账、应收应付、成本中心、利润中心', ja: '財務モジュール(FI/CO)：総勘定元帳、売掛金/買掛金、コストセンター、利益センター' },
          { zh: '物流模块(MM/SD)：采购流程、销售订单、库存管理', ja: '物流モジュール(MM/SD)：調達プロセス、受注、在庫管理' },
          { zh: 'Universal Journal：统一日记账的概念和优势', ja: 'Universal Journal：統合仕訳帳の概念とメリット' },
          { zh: 'Embedded Analytics：嵌入式分析和实时报表', ja: 'Embedded Analytics：組み込み分析とリアルタイムレポート' }
        ]
      },
      {
        title: { zh: 'BTP 高频考点', ja: 'BTPの頻出ポイント' },
        icon: TrendingUp,
        color: 'text-cyan-600 bg-cyan-100',
        tips: [
          { zh: 'SAP BTP 架构：Subaccount、Space、环境类型（Cloud Foundry/Kyma）', ja: 'SAP BTPアーキテクチャ：Subaccount、Space、環境タイプ（Cloud Foundry/Kyma）' },
          { zh: '开发工具：SAP Business Application Studio、CAP (Cloud Application Programming)', ja: '開発ツール：SAP Business Application Studio、CAP (Cloud Application Programming)' },
          { zh: '集成服务：SAP Integration Suite、API Management、Event Mesh', ja: '統合サービス：SAP Integration Suite、API Management、Event Mesh' },
          { zh: '扩展方式：Side-by-Side Extension、In-App Extension 的区别', ja: '拡張方式：Side-by-Side Extension、In-App Extensionの違い' }
        ]
      },
      {
        title: { zh: 'SAP AI 考点', ja: 'SAP AIの出題ポイント' },
        icon: Brain,
        color: 'text-cyan-600 bg-cyan-100',
        tips: [
          { zh: 'SAP AI Core：机器学习模型的训练和部署平台', ja: 'SAP AI Core：機械学習モデルのトレーニングとデプロイプラットフォーム' },
          { zh: 'SAP AI Business Services：文档处理、推荐引擎、预测分析', ja: 'SAP AI Business Services：ドキュメント処理、レコメンデーションエンジン、予測分析' },
          { zh: 'SAP Datasphere：数据仓库、数据建模、联邦查询', ja: 'SAP Datasphere：データウェアハウス、データモデリング、フェデレーテッドクエリ' },
          { zh: '集成场景：如何将 AI 服务与 S/4HANA 业务流程结合', ja: '統合シナリオ：AIサービスをS/4HANAビジネスプロセスと組み合わせる方法' }
        ]
      },
      {
        title: { zh: '推荐学习资源', ja: 'おすすめ学習リソース' },
        icon: BookOpen,
        color: 'text-cyan-600 bg-cyan-100',
        tips: [
          { zh: 'SAP Learning Hub（官方学习平台，需订阅）', ja: 'SAP Learning Hub（公式学習プラットフォーム、サブスクリプション必要）' },
          { zh: 'openSAP（免费 MOOC 课程，涵盖主要技术领域）', ja: 'openSAP（無料MOOCコース、主要技術領域をカバー）' },
          { zh: 'SAP Community：技术博客、问答社区、最佳实践', ja: 'SAP Community：技術ブログ、Q&Aコミュニティ、ベストプラクティス' },
          { zh: 'SAP Help Portal：官方产品文档和配置指南', ja: 'SAP Help Portal：公式製品ドキュメントと設定ガイド' },
          { zh: 'SAP BTP Trial：免费试用账户，动手实践云服务', ja: 'SAP BTP Trial：無料トライアルアカウント、クラウドサービスのハンズオン' }
        ]
      }
    ]
  },
  'ai-ml': {
    name: { zh: 'AI/ML 认证备考', ja: 'AI/ML 認定試験対策' },
    gradient: 'from-purple-500 to-violet-600',
    passingScore: '70-75%',
    examDuration: '120-180分',
    sections: [
      {
        title: { zh: 'AI/ML 认证概览', ja: 'AI/ML 認定の概要' },
        icon: Brain,
        color: 'text-purple-600 bg-purple-100',
        tips: [
          { zh: 'AWS AI Practitioner (AIF-C01)：AI 基础知识、生成式 AI 概念', ja: 'AWS AI Practitioner (AIF-C01)：AI基礎知識、生成AIの概念' },
          { zh: 'AWS ML Specialty (MLS-C01)：机器学习全流程、深度专业知识', ja: 'AWS ML Specialty (MLS-C01)：機械学習の全プロセス、深い専門知識' },
          { zh: 'Azure AI-102：Azure AI 服务部署与集成', ja: 'Azure AI-102：Azure AIサービスのデプロイと統合' },
          { zh: 'GCP ML Engineer：端到端 ML 解决方案设计', ja: 'GCP ML Engineer：エンドツーエンドのMLソリューション設計' }
        ]
      },
      {
        title: { zh: 'ML 核心概念', ja: 'MLのコア概念' },
        icon: Lightbulb,
        color: 'text-purple-600 bg-purple-100',
        tips: [
          { zh: '深刻理解监督学习、非监督学习、强化学习的区别和应用场景', ja: '教師あり学習、教師なし学習、強化学習の違いと適用シナリオを深く理解' },
          { zh: '熟悉常见算法：线性回归、决策树、神经网络、SVM、K-Means', ja: '一般的なアルゴリズムに精通：線形回帰、決定木、ニューラルネットワーク、SVM、K-Means' },
          { zh: '理解模型评估指标：Accuracy、Precision、Recall、F1、AUC-ROC', ja: 'モデル評価指標を理解：Accuracy、Precision、Recall、F1、AUC-ROC' },
          { zh: '掌握过拟合/欠拟合的识别和解决方法', ja: '過学習/学習不足の識別と解決方法を習得' },
          { zh: '了解特征工程：缺失值处理、标准化、独热编码、特征选择', ja: '特徴エンジニアリングを理解：欠損値処理、正規化、ワンホットエンコーディング、特徴選択' }
        ]
      },
      {
        title: { zh: '生成式 AI 重点', ja: '生成AIの重点' },
        icon: Zap,
        color: 'text-purple-600 bg-purple-100',
        tips: [
          { zh: '理解 Transformer 架构、Attention 机制的基本原理', ja: 'Transformerアーキテクチャ、Attentionメカニズムの基本原理を理解' },
          { zh: '熟悉大语言模型概念：Token、Context Window、Temperature、Top-p', ja: 'LLMの概念に精通：Token、Context Window、Temperature、Top-p' },
          { zh: '掌握 RAG（检索增强生成）的原理和应用场景', ja: 'RAG（検索拡張生成）の原理と適用シナリオを習得' },
          { zh: '了解 Prompt Engineering 技巧：Few-shot、Chain-of-Thought', ja: 'Prompt Engineeringテクニックを理解：Few-shot、Chain-of-Thought' },
          { zh: '理解模型微调（Fine-tuning）vs 提示工程的选择场景', ja: 'モデルファインチューニング vs プロンプトエンジニアリングの選択シナリオを理解' }
        ]
      },
      {
        title: { zh: 'ML 工程实践', ja: 'MLエンジニアリング実践' },
        icon: Target,
        color: 'text-purple-600 bg-purple-100',
        tips: [
          { zh: '熟悉 ML Pipeline：数据收集→预处理→训练→评估→部署→监控', ja: 'MLパイプラインに精通：データ収集→前処理→訓練→評価→デプロイ→監視' },
          { zh: '了解 MLOps 概念：CI/CD for ML、模型版本控制、A/B 测试', ja: 'MLOpsの概念を理解：CI/CD for ML、モデルバージョン管理、A/Bテスト' },
          { zh: '掌握模型部署选项：实时推理 vs 批量推理、边缘部署', ja: 'モデルデプロイオプションを習得：リアルタイム推論 vs バッチ推論、エッジデプロイ' },
          { zh: '理解模型监控：数据漂移、概念漂移、模型性能衰减', ja: 'モデル監視を理解：データドリフト、コンセプトドリフト、モデル性能劣化' }
        ]
      },
      {
        title: { zh: 'AI 责任与安全', ja: 'AI責任とセキュリティ' },
        icon: Shield,
        color: 'text-purple-600 bg-purple-100',
        tips: [
          { zh: '理解负责任 AI 原则：公平性、透明性、隐私保护、问责制', ja: '責任あるAI原則を理解：公平性、透明性、プライバシー保護、説明責任' },
          { zh: '了解模型偏差检测和缓解方法', ja: 'モデルバイアスの検出と軽減方法を理解' },
          { zh: '熟悉数据隐私法规（GDPR、CCPA）对 AI 的影响', ja: 'データプライバシー規制（GDPR、CCPA）がAIに与える影響に精通' },
          { zh: '掌握模型安全：对抗攻击、Prompt Injection 防护', ja: 'モデルセキュリティを習得：敵対的攻撃、Prompt Injection防御' }
        ]
      },
      {
        title: { zh: '云服务考点对比', ja: 'クラウドサービス出題ポイント比較' },
        icon: TrendingUp,
        color: 'text-purple-600 bg-purple-100',
        tips: [
          { zh: 'AWS：SageMaker、Bedrock、Rekognition、Comprehend、Lex', ja: 'AWS：SageMaker、Bedrock、Rekognition、Comprehend、Lex' },
          { zh: 'Azure：Azure ML、OpenAI Service、Cognitive Services', ja: 'Azure：Azure ML、OpenAI Service、Cognitive Services' },
          { zh: 'GCP：Vertex AI、AutoML、Document AI、Vision AI', ja: 'GCP：Vertex AI、AutoML、Document AI、Vision AI' },
          { zh: '注意各平台的服务命名差异和功能对应关系', ja: '各プラットフォームのサービス名の違いと機能の対応関係に注意' }
        ]
      },
      {
        title: { zh: '推荐学习资源', ja: 'おすすめ学習リソース' },
        icon: BookOpen,
        color: 'text-purple-600 bg-purple-100',
        tips: [
          { zh: 'Coursera: 吴恩达 Machine Learning、Deep Learning Specialization', ja: 'Coursera: Andrew Ng Machine Learning、Deep Learning Specialization' },
          { zh: 'fast.ai: Practical Deep Learning for Coders（免费实践课程）', ja: 'fast.ai: Practical Deep Learning for Coders（無料実践コース）' },
          { zh: '各云平台官方 ML 学习路径和实验室', ja: '各クラウドプラットフォーム公式ML学習パスとラボ' },
          { zh: 'Kaggle: 通过竞赛练习数据处理和模型训练', ja: 'Kaggle: コンペティションでデータ処理とモデル訓練を練習' },
          { zh: 'Hugging Face: 探索和使用开源模型', ja: 'Hugging Face: オープンソースモデルの探索と使用' }
        ]
      }
    ]
  }
};

export const ExamTipsPage: React.FC = () => {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const [selectedProvider, setSelectedProvider] = useState<Provider>('general');
  const lang = language === 'ja' ? 'ja' : 'zh';

  const currentData = examTipsData[selectedProvider];

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
                {language === 'ja' ? '試験対策ガイド' : '考试技巧指南'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-6">
        {/* Provider Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(examTipsData) as Provider[]).map((provider) => {
            const data = examTipsData[provider];
            const isSelected = selectedProvider === provider;
            return (
              <button
                key={provider}
                onClick={() => setSelectedProvider(provider)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isSelected
                    ? `bg-gradient-to-r ${data.gradient} text-white shadow-lg`
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {data.name[lang]}
              </button>
            );
          })}
        </div>

        {/* Header Card */}
        <div className={`bg-gradient-to-r ${currentData.gradient} rounded-lg p-6 mb-6 text-white`}>
          <h2 className="text-2xl font-bold mb-2">{currentData.name[lang]}</h2>
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Trophy size={16} />
              <span>{language === 'ja' ? '合格ライン' : '及格分数'}: {currentData.passingScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{language === 'ja' ? '試験時間' : '考试时长'}: {currentData.examDuration}</span>
            </div>
          </div>
        </div>

        {/* Tips Sections */}
        <div className="grid gap-6">
          {currentData.sections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${section.color}`}>
                    <section.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{section.title[lang]}</h3>
                </div>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{tip[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips Banner */}
        <div className="mt-6 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                {language === 'ja' ? '💡 最後のアドバイス' : '💡 最后的建议'}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {language === 'ja'
                  ? '試験は知識だけでなく、問題を読む能力と時間管理も重要です。落ち着いて、自信を持って臨みましょう。わからない問題があっても焦らず、マークして後で戻りましょう。'
                  : '考试不仅考察知识，还考察阅读理解能力和时间管理。保持冷静，自信应考。遇到不会的题不要慌，标记后继续做其他题目，最后再回来思考。'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTipsPage;
