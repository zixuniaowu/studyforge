// Cloud Certification Data for AWS, Azure, and GCP

// Official certification providers (with real exams)
export type Provider = 'AWS' | 'Azure' | 'GCP' | 'SAP';
// AI tool providers (practice questions, not official certifications)
export type AIToolProvider = 'n8n' | 'Dify';
// All providers (for exam data storage)
export type AllProvider = Provider | AIToolProvider;

export type Level = 'foundational' | 'associate' | 'professional' | 'specialty' | 'expert';
export type Category = 'cloud' | 'architecture' | 'developer' | 'devops' | 'data' | 'ai' | 'security' | 'networking' | 'database' | 'sap' | 'automation' | 'llmops';

export interface Certification {
  id: string;
  code: string;
  provider: AllProvider;
  name: { zh: string; ja: string };
  fullName: { zh: string; ja: string };
  level: Level;
  category: Category;
  examDuration: number; // minutes
  questionCount: number;
  passingScore: number;
  prerequisites: string[];
  hasExamData: boolean;
  description: { zh: string; ja: string };
}

export interface CareerPath {
  id: string;
  name: { zh: string; ja: string };
  description: { zh: string; ja: string };
  certifications: { provider: Provider; certId: string }[];
}

// AWS Certifications
export const awsCertifications: Certification[] = [
  // Foundational
  {
    id: 'aws-clf-c02',
    code: 'CLF-C02',
    provider: 'AWS',
    name: { zh: '云从业者', ja: 'クラウドプラクティショナー' },
    fullName: { zh: 'AWS Certified Cloud Practitioner', ja: 'AWS 認定クラウドプラクティショナー' },
    level: 'foundational',
    category: 'cloud',
    examDuration: 90,
    questionCount: 65,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'AWS 云基础知识入门认证', ja: 'AWS クラウドの基礎知識を証明する認定' }
  },
  {
    id: 'aws-aif-c01',
    code: 'AIF-C01',
    provider: 'AWS',
    name: { zh: 'AI 从业者', ja: 'AI プラクティショナー' },
    fullName: { zh: 'AWS Certified AI Practitioner', ja: 'AWS 認定 AI プラクティショナー' },
    level: 'foundational',
    category: 'ai',
    examDuration: 90,
    questionCount: 65,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'AWS AI/ML 基础知识认证', ja: 'AWS AI/ML の基礎知識を証明する認定' }
  },
  // Associate
  {
    id: 'aws-saa-c03',
    code: 'SAA-C03',
    provider: 'AWS',
    name: { zh: '解决方案架构师助理', ja: 'ソリューションアーキテクト アソシエイト' },
    fullName: { zh: 'AWS Certified Solutions Architect - Associate', ja: 'AWS 認定ソリューションアーキテクト - アソシエイト' },
    level: 'associate',
    category: 'architecture',
    examDuration: 130,
    questionCount: 65,
    passingScore: 72,
    prerequisites: ['aws-clf-c02'],
    hasExamData: true,
    description: { zh: '设计分布式系统的能力认证', ja: '分散システムの設計能力を証明する認定' }
  },
  {
    id: 'aws-dva-c02',
    code: 'DVA-C02',
    provider: 'AWS',
    name: { zh: '开发者助理', ja: 'デベロッパー アソシエイト' },
    fullName: { zh: 'AWS Certified Developer - Associate', ja: 'AWS 認定デベロッパー - アソシエイト' },
    level: 'associate',
    category: 'developer',
    examDuration: 130,
    questionCount: 65,
    passingScore: 72,
    prerequisites: ['aws-clf-c02'],
    hasExamData: true,
    description: { zh: 'AWS 应用开发能力认证', ja: 'AWS アプリケーション開発能力を証明する認定' }
  },
  {
    id: 'aws-soa-c02',
    code: 'SOA-C02',
    provider: 'AWS',
    name: { zh: 'SysOps 管理员助理', ja: 'SysOps アドミニストレーター アソシエイト' },
    fullName: { zh: 'AWS Certified SysOps Administrator - Associate', ja: 'AWS 認定 SysOps アドミニストレーター - アソシエイト' },
    level: 'associate',
    category: 'devops',
    examDuration: 130,
    questionCount: 65,
    passingScore: 72,
    prerequisites: ['aws-clf-c02'],
    hasExamData: true,
    description: { zh: 'AWS 系统运维管理能力认证', ja: 'AWS システム運用管理能力を証明する認定' }
  },
  {
    id: 'aws-mla-c01',
    code: 'MLA-C01',
    provider: 'AWS',
    name: { zh: '机器学习工程师助理', ja: '機械学習エンジニア アソシエイト' },
    fullName: { zh: 'AWS Certified Machine Learning Engineer - Associate', ja: 'AWS 認定機械学習エンジニア - アソシエイト' },
    level: 'associate',
    category: 'ai',
    examDuration: 130,
    questionCount: 65,
    passingScore: 72,
    prerequisites: ['aws-aif-c01'],
    hasExamData: true,
    description: { zh: 'AWS ML 工程实践能力认证', ja: 'AWS ML エンジニアリング能力を証明する認定' }
  },
  {
    id: 'aws-dea-c01',
    code: 'DEA-C01',
    provider: 'AWS',
    name: { zh: '数据工程师助理', ja: 'データエンジニア アソシエイト' },
    fullName: { zh: 'AWS Certified Data Engineer - Associate', ja: 'AWS 認定データエンジニア - アソシエイト' },
    level: 'associate',
    category: 'data',
    examDuration: 130,
    questionCount: 65,
    passingScore: 72,
    prerequisites: ['aws-clf-c02'],
    hasExamData: true,
    description: { zh: 'AWS 数据工程能力认证', ja: 'AWS データエンジニアリング能力を証明する認定' }
  },
  // Professional
  {
    id: 'aws-sap-c02',
    code: 'SAP-C02',
    provider: 'AWS',
    name: { zh: '解决方案架构师专业', ja: 'ソリューションアーキテクト プロフェッショナル' },
    fullName: { zh: 'AWS Certified Solutions Architect - Professional', ja: 'AWS 認定ソリューションアーキテクト - プロフェッショナル' },
    level: 'professional',
    category: 'architecture',
    examDuration: 180,
    questionCount: 75,
    passingScore: 75,
    prerequisites: ['aws-saa-c03'],
    hasExamData: true,
    description: { zh: '高级架构设计能力认证', ja: '高度なアーキテクチャ設計能力を証明する認定' }
  },
  {
    id: 'aws-dop-c02',
    code: 'DOP-C02',
    provider: 'AWS',
    name: { zh: 'DevOps 工程师专业', ja: 'DevOps エンジニア プロフェッショナル' },
    fullName: { zh: 'AWS Certified DevOps Engineer - Professional', ja: 'AWS 認定 DevOps エンジニア - プロフェッショナル' },
    level: 'professional',
    category: 'devops',
    examDuration: 180,
    questionCount: 75,
    passingScore: 75,
    prerequisites: ['aws-dva-c02', 'aws-soa-c02'],
    hasExamData: true,
    description: { zh: '高级 DevOps 能力认证', ja: '高度な DevOps 能力を証明する認定' }
  },
  // Specialty
  {
    id: 'aws-mls-c01',
    code: 'MLS-C01',
    provider: 'AWS',
    name: { zh: '机器学习专家', ja: '機械学習 スペシャリティ' },
    fullName: { zh: 'AWS Certified Machine Learning - Specialty', ja: 'AWS 認定機械学習 - スペシャリティ' },
    level: 'specialty',
    category: 'ai',
    examDuration: 180,
    questionCount: 65,
    passingScore: 75,
    prerequisites: ['aws-mla-c01'],
    hasExamData: true,
    description: { zh: 'AWS 机器学习专家认证', ja: 'AWS 機械学習の専門知識を証明する認定' }
  },
  {
    id: 'aws-scs-c02',
    code: 'SCS-C02',
    provider: 'AWS',
    name: { zh: '安全专家', ja: 'セキュリティ スペシャリティ' },
    fullName: { zh: 'AWS Certified Security - Specialty', ja: 'AWS 認定セキュリティ - スペシャリティ' },
    level: 'specialty',
    category: 'security',
    examDuration: 170,
    questionCount: 65,
    passingScore: 75,
    prerequisites: ['aws-saa-c03'],
    hasExamData: true,
    description: { zh: 'AWS 安全专家认证', ja: 'AWS セキュリティの専門知識を証明する認定' }
  },
  {
    id: 'aws-ans-c01',
    code: 'ANS-C01',
    provider: 'AWS',
    name: { zh: '高级网络专家', ja: 'アドバンストネットワーキング スペシャリティ' },
    fullName: { zh: 'AWS Certified Advanced Networking - Specialty', ja: 'AWS 認定アドバンストネットワーキング - スペシャリティ' },
    level: 'specialty',
    category: 'networking',
    examDuration: 170,
    questionCount: 65,
    passingScore: 75,
    prerequisites: ['aws-saa-c03'],
    hasExamData: true,
    description: { zh: 'AWS 网络专家认证', ja: 'AWS ネットワークの専門知識を証明する認定' }
  },
  {
    id: 'aws-dbs-c01',
    code: 'DBS-C01',
    provider: 'AWS',
    name: { zh: '数据库专家', ja: 'データベース スペシャリティ' },
    fullName: { zh: 'AWS Certified Database - Specialty', ja: 'AWS 認定データベース - スペシャリティ' },
    level: 'specialty',
    category: 'database',
    examDuration: 180,
    questionCount: 65,
    passingScore: 75,
    prerequisites: ['aws-saa-c03'],
    hasExamData: true,
    description: { zh: 'AWS 数据库专家认证', ja: 'AWS データベースの専門知識を証明する認定' }
  }
];

// Azure Certifications
export const azureCertifications: Certification[] = [
  // Fundamentals
  {
    id: 'azure-az-900',
    code: 'AZ-900',
    provider: 'Azure',
    name: { zh: 'Azure 基础', ja: 'Azure 基礎' },
    fullName: { zh: 'Microsoft Azure Fundamentals', ja: 'Microsoft Azure Fundamentals' },
    level: 'foundational',
    category: 'cloud',
    examDuration: 85,
    questionCount: 50,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'Azure 云基础知识认证', ja: 'Azure クラウドの基礎知識を証明する認定' }
  },
  {
    id: 'azure-ai-900',
    code: 'AI-900',
    provider: 'Azure',
    name: { zh: 'AI 基础', ja: 'AI 基礎' },
    fullName: { zh: 'Microsoft Azure AI Fundamentals', ja: 'Microsoft Azure AI Fundamentals' },
    level: 'foundational',
    category: 'ai',
    examDuration: 85,
    questionCount: 50,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'Azure AI 基础知识认证', ja: 'Azure AI の基礎知識を証明する認定' }
  },
  {
    id: 'azure-dp-900',
    code: 'DP-900',
    provider: 'Azure',
    name: { zh: '数据基础', ja: 'データ基礎' },
    fullName: { zh: 'Microsoft Azure Data Fundamentals', ja: 'Microsoft Azure Data Fundamentals' },
    level: 'foundational',
    category: 'data',
    examDuration: 85,
    questionCount: 50,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'Azure 数据基础知识认证', ja: 'Azure データの基礎知識を証明する認定' }
  },
  {
    id: 'azure-sc-900',
    code: 'SC-900',
    provider: 'Azure',
    name: { zh: '安全基础', ja: 'セキュリティ基礎' },
    fullName: { zh: 'Microsoft Security Fundamentals', ja: 'Microsoft Security Fundamentals' },
    level: 'foundational',
    category: 'security',
    examDuration: 85,
    questionCount: 50,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'Microsoft 安全基础认证', ja: 'Microsoft セキュリティの基礎知識を証明する認定' }
  },
  // Associate
  {
    id: 'azure-az-104',
    code: 'AZ-104',
    provider: 'Azure',
    name: { zh: 'Azure 管理员', ja: 'Azure 管理者' },
    fullName: { zh: 'Microsoft Azure Administrator', ja: 'Microsoft Azure Administrator' },
    level: 'associate',
    category: 'cloud',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-az-900'],
    hasExamData: true,
    description: { zh: 'Azure 管理员认证', ja: 'Azure 管理者認定' }
  },
  {
    id: 'azure-az-204',
    code: 'AZ-204',
    provider: 'Azure',
    name: { zh: 'Azure 开发者', ja: 'Azure 開発者' },
    fullName: { zh: 'Microsoft Azure Developer', ja: 'Microsoft Azure Developer' },
    level: 'associate',
    category: 'developer',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-az-900'],
    hasExamData: true,
    description: { zh: 'Azure 开发者认证', ja: 'Azure 開発者認定' }
  },
  {
    id: 'azure-az-500',
    code: 'AZ-500',
    provider: 'Azure',
    name: { zh: 'Azure 安全工程师', ja: 'Azure セキュリティエンジニア' },
    fullName: { zh: 'Microsoft Azure Security Engineer', ja: 'Microsoft Azure Security Engineer' },
    level: 'associate',
    category: 'security',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-az-104'],
    hasExamData: true,
    description: { zh: 'Azure 安全工程师认证', ja: 'Azure セキュリティエンジニア認定' }
  },
  {
    id: 'azure-az-700',
    code: 'AZ-700',
    provider: 'Azure',
    name: { zh: 'Azure 网络工程师', ja: 'Azure ネットワークエンジニア' },
    fullName: { zh: 'Microsoft Azure Network Engineer', ja: 'Microsoft Azure Network Engineer' },
    level: 'associate',
    category: 'networking',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-az-104'],
    hasExamData: true,
    description: { zh: 'Azure 网络工程师认证', ja: 'Azure ネットワークエンジニア認定' }
  },
  {
    id: 'azure-ai-102',
    code: 'AI-102',
    provider: 'Azure',
    name: { zh: 'AI 工程师', ja: 'AI エンジニア' },
    fullName: { zh: 'Microsoft Azure AI Engineer', ja: 'Microsoft Azure AI Engineer' },
    level: 'associate',
    category: 'ai',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-ai-900'],
    hasExamData: true,
    description: { zh: 'Azure AI 工程师认证', ja: 'Azure AI エンジニア認定' }
  },
  {
    id: 'azure-dp-100',
    code: 'DP-100',
    provider: 'Azure',
    name: { zh: '数据科学家', ja: 'データサイエンティスト' },
    fullName: { zh: 'Microsoft Azure Data Scientist', ja: 'Microsoft Azure Data Scientist' },
    level: 'associate',
    category: 'ai',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-dp-900'],
    hasExamData: true,
    description: { zh: 'Azure 数据科学家认证', ja: 'Azure データサイエンティスト認定' }
  },
  {
    id: 'azure-dp-300',
    code: 'DP-300',
    provider: 'Azure',
    name: { zh: '数据库管理员', ja: 'データベース管理者' },
    fullName: { zh: 'Microsoft Azure Database Administrator', ja: 'Microsoft Azure Database Administrator' },
    level: 'associate',
    category: 'database',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-dp-900'],
    hasExamData: true,
    description: { zh: 'Azure 数据库管理员认证', ja: 'Azure データベース管理者認定' }
  },
  // Expert
  {
    id: 'azure-az-305',
    code: 'AZ-305',
    provider: 'Azure',
    name: { zh: 'Azure 解决方案架构师专家', ja: 'Azure ソリューションアーキテクト エキスパート' },
    fullName: { zh: 'Microsoft Azure Solutions Architect Expert', ja: 'Microsoft Azure Solutions Architect Expert' },
    level: 'expert',
    category: 'architecture',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-az-104'],
    hasExamData: true,
    description: { zh: 'Azure 解决方案架构师专家认证', ja: 'Azure ソリューションアーキテクト エキスパート認定' }
  },
  {
    id: 'azure-az-400',
    code: 'AZ-400',
    provider: 'Azure',
    name: { zh: 'Azure DevOps 工程师专家', ja: 'Azure DevOps エンジニア エキスパート' },
    fullName: { zh: 'Microsoft Azure DevOps Engineer Expert', ja: 'Microsoft Azure DevOps Engineer Expert' },
    level: 'expert',
    category: 'devops',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-az-104', 'azure-az-204'],
    hasExamData: true,
    description: { zh: 'Azure DevOps 工程师专家认证', ja: 'Azure DevOps エンジニア エキスパート認定' }
  },
  // Additional Fundamentals
  {
    id: 'azure-pl-900',
    code: 'PL-900',
    provider: 'Azure',
    name: { zh: 'Power Platform 基础', ja: 'Power Platform 基礎' },
    fullName: { zh: 'Microsoft Power Platform Fundamentals', ja: 'Microsoft Power Platform Fundamentals' },
    level: 'foundational',
    category: 'developer',
    examDuration: 60,
    questionCount: 45,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'Power Platform 低代码平台基础认证', ja: 'Power Platform ローコードプラットフォーム基礎認定' }
  },
  // Additional Associate - Security
  {
    id: 'azure-sc-200',
    code: 'SC-200',
    provider: 'Azure',
    name: { zh: '安全运营分析师', ja: 'セキュリティ運用アナリスト' },
    fullName: { zh: 'Microsoft Security Operations Analyst', ja: 'Microsoft Security Operations Analyst' },
    level: 'associate',
    category: 'security',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-sc-900'],
    hasExamData: true,
    description: { zh: 'Microsoft Sentinel 和 Defender 安全运营认证', ja: 'Microsoft Sentinel と Defender セキュリティ運用認定' }
  },
  {
    id: 'azure-sc-300',
    code: 'SC-300',
    provider: 'Azure',
    name: { zh: '身份和访问管理员', ja: 'ID とアクセス管理者' },
    fullName: { zh: 'Microsoft Identity and Access Administrator', ja: 'Microsoft Identity and Access Administrator' },
    level: 'associate',
    category: 'security',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-sc-900'],
    hasExamData: true,
    description: { zh: 'Azure AD 身份和访问管理认证', ja: 'Azure AD ID とアクセス管理認定' }
  },
  // Additional Associate - Data
  {
    id: 'azure-dp-203',
    code: 'DP-203',
    provider: 'Azure',
    name: { zh: '数据工程师', ja: 'データエンジニア' },
    fullName: { zh: 'Azure Data Engineer Associate', ja: 'Azure Data Engineer Associate' },
    level: 'associate',
    category: 'data',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-dp-900'],
    hasExamData: true,
    description: { zh: 'Azure 数据工程和 ETL 管道认证', ja: 'Azure データエンジニアリングと ETL パイプライン認定' }
  },
  // Additional Associate - Virtual Desktop
  {
    id: 'azure-az-140',
    code: 'AZ-140',
    provider: 'Azure',
    name: { zh: '虚拟桌面专家', ja: 'バーチャルデスクトップスペシャリスト' },
    fullName: { zh: 'Azure Virtual Desktop Specialty', ja: 'Azure Virtual Desktop Specialty' },
    level: 'associate',
    category: 'cloud',
    examDuration: 150,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['azure-az-104'],
    hasExamData: true,
    description: { zh: 'Azure 虚拟桌面部署和管理认证', ja: 'Azure Virtual Desktop のデプロイと管理認定' }
  }
];

// GCP Certifications (Official: 2 Foundational + 3 Associate + 9 Professional = 14 total)
export const gcpCertifications: Certification[] = [
  // ========== Foundational (2) ==========
  {
    id: 'gcp-cdl',
    code: 'CDL',
    provider: 'GCP',
    name: { zh: '云数字领导者', ja: 'Cloud Digital Leader' },
    fullName: { zh: 'Google Cloud Digital Leader', ja: 'Google Cloud Digital Leader' },
    level: 'foundational',
    category: 'cloud',
    examDuration: 90,
    questionCount: 50,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: '云概念和 Google Cloud 产品服务基础知识认证', ja: 'クラウドの概念と Google Cloud 製品・サービスの基礎知識認定' }
  },
  {
    id: 'gcp-gail',
    code: 'GAIL',
    provider: 'GCP',
    name: { zh: '生成式 AI 领导者', ja: 'Generative AI Leader' },
    fullName: { zh: 'Google Cloud Generative AI Leader', ja: 'Google Cloud Generative AI Leader' },
    level: 'foundational',
    category: 'ai',
    examDuration: 90,
    questionCount: 50,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'Google Cloud AI 工具和 GenAI 解决方案基础知识认证', ja: 'Google Cloud AI ツールと GenAI ソリューションの基礎知識認定' }
  },
  // ========== Associate (3) ==========
  {
    id: 'gcp-ace',
    code: 'ACE',
    provider: 'GCP',
    name: { zh: '云工程师助理', ja: 'Associate Cloud Engineer' },
    fullName: { zh: 'Google Cloud Associate Cloud Engineer', ja: 'Google Cloud Associate Cloud Engineer' },
    level: 'associate',
    category: 'cloud',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-cdl'],
    hasExamData: true,
    description: { zh: '部署应用、监控运维、管理 GCP 企业解决方案', ja: 'アプリのデプロイ、運用監視、GCP 企業ソリューションの管理' }
  },
  {
    id: 'gcp-adp',
    code: 'ADP',
    provider: 'GCP',
    name: { zh: '数据从业者助理', ja: 'Associate Data Practitioner' },
    fullName: { zh: 'Google Cloud Associate Data Practitioner', ja: 'Google Cloud Associate Data Practitioner' },
    level: 'associate',
    category: 'data',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-cdl'],
    hasExamData: true,
    description: { zh: '数据准备、摄取、分析和管理，BigQuery 查询', ja: 'データの準備・取り込み・分析・管理、BigQuery クエリ' }
  },
  {
    id: 'gcp-awa',
    code: 'AWA',
    provider: 'GCP',
    name: { zh: 'Workspace 管理员助理', ja: 'Associate Google Workspace Administrator' },
    fullName: { zh: 'Google Cloud Associate Google Workspace Administrator', ja: 'Google Cloud Associate Google Workspace Administrator' },
    level: 'associate',
    category: 'cloud',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-cdl'],
    hasExamData: true,
    description: { zh: 'Google Workspace 环境管理、AI 助手配置', ja: 'Google Workspace 環境管理、AI アシスタント設定' }
  },
  // ========== Professional (9) ==========
  {
    id: 'gcp-pca',
    code: 'PCA',
    provider: 'GCP',
    name: { zh: '云架构师专业', ja: 'Professional Cloud Architect' },
    fullName: { zh: 'Google Cloud Professional Cloud Architect', ja: 'Google Cloud Professional Cloud Architect' },
    level: 'professional',
    category: 'architecture',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-ace'],
    hasExamData: true,
    description: { zh: '设计、开发和管理安全可扩展的云解决方案', ja: 'セキュアでスケーラブルなクラウドソリューションの設計・開発・管理' }
  },
  {
    id: 'gcp-pcdev',
    code: 'PCDev',
    provider: 'GCP',
    name: { zh: '云开发者专业', ja: 'Professional Cloud Developer' },
    fullName: { zh: 'Google Cloud Professional Cloud Developer', ja: 'Google Cloud Professional Cloud Developer' },
    level: 'professional',
    category: 'developer',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-ace'],
    hasExamData: true,
    description: { zh: '构建可扩展、高可用的云原生应用', ja: 'スケーラブルで高可用性のクラウドネイティブアプリケーション構築' }
  },
  {
    id: 'gcp-pde',
    code: 'PDE',
    provider: 'GCP',
    name: { zh: '数据工程师专业', ja: 'Professional Data Engineer' },
    fullName: { zh: 'Google Cloud Professional Data Engineer', ja: 'Google Cloud Professional Data Engineer' },
    level: 'professional',
    category: 'data',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-ace'],
    hasExamData: true,
    description: { zh: '设计和构建数据处理系统、部署 ML 模型', ja: 'データ処理システムの設計・構築、ML モデルのデプロイ' }
  },
  {
    id: 'gcp-pdevops',
    code: 'PDevOps',
    provider: 'GCP',
    name: { zh: '云 DevOps 工程师专业', ja: 'Professional Cloud DevOps Engineer' },
    fullName: { zh: 'Google Cloud Professional Cloud DevOps Engineer', ja: 'Google Cloud Professional Cloud DevOps Engineer' },
    level: 'professional',
    category: 'devops',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-ace'],
    hasExamData: true,
    description: { zh: '实施 DevOps 流程、平衡可靠性与交付速度', ja: 'DevOps プロセスの実装、信頼性とデリバリー速度のバランス' }
  },
  {
    id: 'gcp-pse',
    code: 'PSE',
    provider: 'GCP',
    name: { zh: '云安全工程师专业', ja: 'Professional Cloud Security Engineer' },
    fullName: { zh: 'Google Cloud Professional Cloud Security Engineer', ja: 'Google Cloud Professional Cloud Security Engineer' },
    level: 'professional',
    category: 'security',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-ace'],
    hasExamData: true,
    description: { zh: '管理访问控制、组织策略和网络安全', ja: 'アクセス制御、組織ポリシー、ネットワークセキュリティの管理' }
  },
  {
    id: 'gcp-pne',
    code: 'PNE',
    provider: 'GCP',
    name: { zh: '云网络工程师专业', ja: 'Professional Cloud Network Engineer' },
    fullName: { zh: 'Google Cloud Professional Cloud Network Engineer', ja: 'Google Cloud Professional Cloud Network Engineer' },
    level: 'professional',
    category: 'networking',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-ace'],
    hasExamData: true,
    description: { zh: '混合连接、网络服务和网络架构安全', ja: 'ハイブリッド接続、ネットワークサービス、ネットワークアーキテクチャセキュリティ' }
  },
  {
    id: 'gcp-ml-engineer',
    code: 'PMLE',
    provider: 'GCP',
    name: { zh: '机器学习工程师专业', ja: 'Professional Machine Learning Engineer' },
    fullName: { zh: 'Google Cloud Professional Machine Learning Engineer', ja: 'Google Cloud Professional Machine Learning Engineer' },
    level: 'professional',
    category: 'ai',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-ace'],
    hasExamData: true,
    description: { zh: '设计、构建和生产化 ML 模型', ja: 'ML モデルの設計・構築・本番化' }
  },
  {
    id: 'gcp-pwa',
    code: 'PWA',
    provider: 'GCP',
    name: { zh: 'Workspace 管理员专业', ja: 'Professional Google Workspace Administrator' },
    fullName: { zh: 'Google Cloud Professional Google Workspace Administrator', ja: 'Google Cloud Professional Google Workspace Administrator' },
    level: 'professional',
    category: 'cloud',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-awa'],
    hasExamData: true,
    description: { zh: 'Workspace 策略、安全和协作配置', ja: 'Workspace ポリシー、セキュリティ、コラボレーション設定' }
  },
  {
    id: 'gcp-pdba',
    code: 'PDBA',
    provider: 'GCP',
    name: { zh: '云数据库工程师专业', ja: 'Professional Cloud Database Engineer' },
    fullName: { zh: 'Google Cloud Professional Cloud Database Engineer', ja: 'Google Cloud Professional Cloud Database Engineer' },
    level: 'professional',
    category: 'database',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['gcp-ace'],
    hasExamData: true,
    description: { zh: '设计和管理 Cloud SQL、Spanner、Bigtable 等数据库', ja: 'Cloud SQL、Spanner、Bigtable などのデータベース設計・管理' }
  }
];

// SAP Certifications (15 total: 8 S/4HANA + 4 BTP + 3 AI/ML)
export const sapCertifications: Certification[] = [
  // ========== S/4HANA Series (8) ==========
  {
    id: 'sap-c-ts4fi',
    code: 'C_TS4FI',
    provider: 'SAP',
    name: { zh: 'S/4HANA 财务', ja: 'S/4HANA Finance' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Cloud Finance', ja: 'SAP 認定アソシエイト - SAP S/4HANA Cloud Finance' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'S/4HANA 云财务模块认证，覆盖总账、应收应付、资产会计等', ja: 'S/4HANA Cloud財務モジュール認定、総勘定元帳、売掛金・買掛金、資産会計など' }
  },
  {
    id: 'sap-c-ts4co',
    code: 'C_TS4CO',
    provider: 'SAP',
    name: { zh: 'S/4HANA 成本控制', ja: 'S/4HANA Controlling' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Cloud Controlling', ja: 'SAP 認定アソシエイト - SAP S/4HANA Cloud Controlling' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-ts4fi'],
    hasExamData: true,
    description: { zh: 'S/4HANA 云成本控制模块认证，包含成本中心、利润中心、产品成本', ja: 'S/4HANA Cloud管理会計モジュール認定、原価センタ、利益センタ、製品原価' }
  },
  {
    id: 'sap-c-ts410',
    code: 'C_TS410',
    provider: 'SAP',
    name: { zh: 'S/4HANA 集成业务流程', ja: 'S/4HANA 統合ビジネスプロセス' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Integrated Business Processes', ja: 'SAP 認定アソシエイト - SAP S/4HANA 統合ビジネスプロセス' },
    level: 'foundational',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'S/4HANA 端到端业务流程入门认证，覆盖采购、销售、生产、财务集成', ja: 'S/4HANA エンドツーエンドビジネスプロセス入門認定、調達、販売、生産、財務統合' }
  },
  {
    id: 'sap-c-ts450',
    code: 'C_TS450',
    provider: 'SAP',
    name: { zh: 'S/4HANA 采购', ja: 'S/4HANA 調達' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Sourcing and Procurement', ja: 'SAP 認定アソシエイト - SAP S/4HANA 調達' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: ['sap-c-ts410'],
    hasExamData: true,
    description: { zh: 'S/4HANA 采购和寻源认证，包含采购订单、货物收据、发票验证', ja: 'S/4HANA 調達・購買認定、購買発注、入庫、請求書検証' }
  },
  {
    id: 'sap-c-ts460',
    code: 'C_TS460',
    provider: 'SAP',
    name: { zh: 'S/4HANA 销售', ja: 'S/4HANA 販売' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Sales', ja: 'SAP 認定アソシエイト - SAP S/4HANA 販売' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: ['sap-c-ts410'],
    hasExamData: true,
    description: { zh: 'S/4HANA 销售和分销认证，包含销售订单、定价、交货、开票', ja: 'S/4HANA 販売・流通認定、受注、価格設定、出荷、請求' }
  },
  {
    id: 'sap-c-ts4h',
    code: 'C_TS4H',
    provider: 'SAP',
    name: { zh: 'S/4HANA 技术基础', ja: 'S/4HANA 技術基盤' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Technology Foundation', ja: 'SAP 認定アソシエイト - SAP S/4HANA 技術基盤' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'S/4HANA 系统管理和技术基础认证，包含系统配置、用户管理、传输', ja: 'S/4HANA システム管理・技術基盤認定、システム設定、ユーザー管理、移送' }
  },
  {
    id: 'sap-c-s4ewm',
    code: 'C_S4EWM',
    provider: 'SAP',
    name: { zh: 'S/4HANA 仓库管理', ja: 'S/4HANA 倉庫管理' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Extended Warehouse Management', ja: 'SAP 認定アソシエイト - SAP S/4HANA 拡張倉庫管理' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: ['sap-c-ts410'],
    hasExamData: true,
    description: { zh: 'S/4HANA 扩展仓库管理认证，包含库存管理、货物移动、仓储优化', ja: 'S/4HANA 拡張倉庫管理認定、在庫管理、入出庫、倉庫最適化' }
  },
  {
    id: 'sap-c-s4cdk',
    code: 'C_S4CDK',
    provider: 'SAP',
    name: { zh: 'S/4HANA Cloud SDK 开发者', ja: 'S/4HANA Cloud SDK Developer' },
    fullName: { zh: 'SAP Certified Development Associate - SAP S/4HANA Cloud SDK Developer', ja: 'SAP 認定開発アソシエイト - SAP S/4HANA Cloud SDK Developer' },
    level: 'professional',
    category: 'developer',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-ts4h'],
    hasExamData: true,
    description: { zh: 'S/4HANA Cloud 扩展开发认证，使用 CAP 和 SAP Cloud SDK', ja: 'S/4HANA Cloud 拡張開発認定、CAP と SAP Cloud SDK 使用' }
  },

  // ========== BTP Series (4) ==========
  {
    id: 'sap-c-btp',
    code: 'C_BTP',
    provider: 'SAP',
    name: { zh: 'BTP 基础', ja: 'BTP 基礎' },
    fullName: { zh: 'SAP Certified Associate - SAP BTP Foundation', ja: 'SAP 認定アソシエイト - SAP BTP 基礎' },
    level: 'foundational',
    category: 'cloud',
    examDuration: 90,
    questionCount: 60,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Business Technology Platform 基础知识认证', ja: 'SAP Business Technology Platform 基礎知識認定' }
  },
  {
    id: 'sap-c-btpadm',
    code: 'C_BTPADM',
    provider: 'SAP',
    name: { zh: 'BTP 管理员', ja: 'BTP 管理者' },
    fullName: { zh: 'SAP Certified Associate - SAP BTP Administrator', ja: 'SAP 認定アソシエイト - SAP BTP 管理者' },
    level: 'associate',
    category: 'cloud',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-btp'],
    hasExamData: true,
    description: { zh: 'SAP BTP 平台管理和运维认证，账户模型、身份认证、授权管理', ja: 'SAP BTP プラットフォーム管理・運用認定、アカウントモデル、認証、権限管理' }
  },
  {
    id: 'sap-c-btpdev',
    code: 'C_BTPDEV',
    provider: 'SAP',
    name: { zh: 'BTP 开发者', ja: 'BTP 開発者' },
    fullName: { zh: 'SAP Certified Development Associate - SAP BTP Developer', ja: 'SAP 認定開発アソシエイト - SAP BTP 開発者' },
    level: 'associate',
    category: 'developer',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-btp'],
    hasExamData: true,
    description: { zh: 'SAP BTP 应用开发认证，CAP 框架、Fiori Elements、SAPUI5', ja: 'SAP BTP アプリケーション開発認定、CAP フレームワーク、Fiori Elements、SAPUI5' }
  },
  {
    id: 'sap-c-btpint',
    code: 'C_BTPINT',
    provider: 'SAP',
    name: { zh: 'BTP 集成', ja: 'BTP 統合' },
    fullName: { zh: 'SAP Certified Associate - SAP BTP Integration', ja: 'SAP 認定アソシエイト - SAP BTP 統合' },
    level: 'associate',
    category: 'devops',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-btp'],
    hasExamData: true,
    description: { zh: 'SAP Integration Suite 和 API 管理认证', ja: 'SAP Integration Suite と API 管理認定' }
  },

  // ========== AI/ML Series (3) ==========
  {
    id: 'sap-c-aicore',
    code: 'C_AICORE',
    provider: 'SAP',
    name: { zh: 'SAP AI Core', ja: 'SAP AI Core' },
    fullName: { zh: 'SAP Certified Associate - SAP AI Core', ja: 'SAP 認定アソシエイト - SAP AI Core' },
    level: 'associate',
    category: 'ai',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-btp'],
    hasExamData: true,
    description: { zh: 'SAP AI Core 机器学习运维认证，模型训练、部署和推理', ja: 'SAP AI Core 機械学習運用認定、モデル訓練、デプロイ、推論' }
  },
  {
    id: 'sap-c-aibus',
    code: 'C_AIBUS',
    provider: 'SAP',
    name: { zh: 'SAP AI 业务服务', ja: 'SAP AI ビジネスサービス' },
    fullName: { zh: 'SAP Certified Associate - SAP AI Business Services', ja: 'SAP 認定アソシエイト - SAP AI ビジネスサービス' },
    level: 'associate',
    category: 'ai',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-btp'],
    hasExamData: true,
    description: { zh: 'SAP 文档信息提取和业务实体识别认证', ja: 'SAP ドキュメント情報抽出・ビジネスエンティティ認識認定' }
  },
  {
    id: 'sap-c-datasph',
    code: 'C_DATASPH',
    provider: 'SAP',
    name: { zh: 'SAP Datasphere', ja: 'SAP Datasphere' },
    fullName: { zh: 'SAP Certified Associate - SAP Datasphere', ja: 'SAP 認定アソシエイト - SAP Datasphere' },
    level: 'associate',
    category: 'data',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-btp'],
    hasExamData: true,
    description: { zh: 'SAP 数据仓库和数据分析平台认证', ja: 'SAP データウェアハウス・分析プラットフォーム認定' }
  },

  // ========== Implementation/Methodology (1) ==========
  {
    id: 'sap-c-activate',
    code: 'C_ACTIVATE',
    provider: 'SAP',
    name: { zh: 'SAP Activate 方法论', ja: 'SAP Activate 方法論' },
    fullName: { zh: 'SAP Certified Associate - SAP Activate Project Manager', ja: 'SAP 認定アソシエイト - SAP Activate プロジェクトマネージャー' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP 官方敏捷实施方法论认证，S/4HANA 迁移项目必备', ja: 'SAP 公式アジャイル導入方法論認定、S/4HANA 移行プロジェクトに必須' }
  },

  // ========== Additional SAP Certifications (5) ==========
  {
    id: 'sap-c-hanaimp',
    code: 'C_HANAIMP',
    provider: 'SAP',
    name: { zh: 'SAP HANA 实施', ja: 'SAP HANA 導入' },
    fullName: { zh: 'SAP Certified Technology Associate - SAP HANA 2.0 SPS06', ja: 'SAP 認定テクノロジーアソシエイト - SAP HANA 2.0 SPS06' },
    level: 'associate',
    category: 'database',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP HANA 内存数据库安装、配置和管理认证', ja: 'SAP HANA インメモリデータベースのインストール・設定・管理認定' }
  },
  {
    id: 'sap-c-s4cpr',
    code: 'C_S4CPR',
    provider: 'SAP',
    name: { zh: 'S/4HANA Cloud 实施', ja: 'S/4HANA Cloud 導入' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Cloud Private Edition Implementation', ja: 'SAP 認定アソシエイト - SAP S/4HANA Cloud Private Edition 導入' },
    level: 'professional',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-ts410', 'sap-c-activate'],
    hasExamData: true,
    description: { zh: 'S/4HANA Cloud 私有版实施认证，覆盖迁移、配置、Go-Live', ja: 'S/4HANA Cloud Private Edition 導入認定、移行・設定・Go-Live' }
  },
  {
    id: 'sap-c-fiord',
    code: 'C_FIORD',
    provider: 'SAP',
    name: { zh: 'SAP Fiori 开发', ja: 'SAP Fiori 開発' },
    fullName: { zh: 'SAP Certified Development Associate - SAP Fiori Application Developer', ja: 'SAP 認定開発アソシエイト - SAP Fiori アプリケーション開発者' },
    level: 'associate',
    category: 'developer',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-btp'],
    hasExamData: true,
    description: { zh: 'SAP Fiori/SAPUI5 前端开发认证，Fiori Elements 和自定义应用', ja: 'SAP Fiori/SAPUI5 フロントエンド開発認定、Fiori Elements とカスタムアプリ' }
  },
  {
    id: 'sap-c-s4cs',
    code: 'C_S4CS',
    provider: 'SAP',
    name: { zh: 'S/4HANA Cloud 销售', ja: 'S/4HANA Cloud 販売' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Cloud Sales Implementation', ja: 'SAP 認定アソシエイト - SAP S/4HANA Cloud 販売導入' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: ['sap-c-ts460'],
    hasExamData: true,
    description: { zh: 'S/4HANA Cloud 销售模块实施认证，公有云销售流程配置', ja: 'S/4HANA Cloud 販売モジュール導入認定、パブリッククラウド販売プロセス設定' }
  },
  {
    id: 'sap-c-bowi',
    code: 'C_BOWI',
    provider: 'SAP',
    name: { zh: 'SAP BusinessObjects BI', ja: 'SAP BusinessObjects BI' },
    fullName: { zh: 'SAP Certified Associate - SAP BusinessObjects Web Intelligence', ja: 'SAP 認定アソシエイト - SAP BusinessObjects Web Intelligence' },
    level: 'associate',
    category: 'data',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP BI 报表工具认证，Web Intelligence 报表设计和数据分析', ja: 'SAP BI レポートツール認定、Web Intelligence レポート設計・データ分析' }
  },

  // ========== S/4HANA Additional Modules (4) ==========
  {
    id: 'sap-c-ts4mm',
    code: 'C_TS4MM',
    provider: 'SAP',
    name: { zh: 'S/4HANA 物料管理', ja: 'S/4HANA 購買・在庫管理' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Materials Management', ja: 'SAP 認定アソシエイト - SAP S/4HANA 購買・在庫管理' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: ['sap-c-ts410'],
    hasExamData: true,
    description: { zh: 'S/4HANA 物料管理认证，包含采购、库存管理、物料主数据', ja: 'S/4HANA 購買・在庫管理認定、調達、在庫管理、品目マスタ' }
  },
  {
    id: 'sap-c-ts4pp',
    code: 'C_TS4PP',
    provider: 'SAP',
    name: { zh: 'S/4HANA 生产计划', ja: 'S/4HANA 生産計画' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Production Planning', ja: 'SAP 認定アソシエイト - SAP S/4HANA 生産計画' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: ['sap-c-ts410'],
    hasExamData: true,
    description: { zh: 'S/4HANA 生产计划认证，包含MRP、生产订单、能力计划', ja: 'S/4HANA 生産計画認定、MRP、製造指図、能力計画' }
  },
  {
    id: 'sap-c-ts4qm',
    code: 'C_TS4QM',
    provider: 'SAP',
    name: { zh: 'S/4HANA 质量管理', ja: 'S/4HANA 品質管理' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Quality Management', ja: 'SAP 認定アソシエイト - SAP S/4HANA 品質管理' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: ['sap-c-ts410'],
    hasExamData: true,
    description: { zh: 'S/4HANA 质量管理认证，包含质量检验、质量通知、质量证书', ja: 'S/4HANA 品質管理認定、品質検査、品質通知、品質証明書' }
  },
  {
    id: 'sap-c-ts4pm',
    code: 'C_TS4PM',
    provider: 'SAP',
    name: { zh: 'S/4HANA 工厂维护', ja: 'S/4HANA プラント保全' },
    fullName: { zh: 'SAP Certified Associate - SAP S/4HANA Plant Maintenance', ja: 'SAP 認定アソシエイト - SAP S/4HANA プラント保全' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: ['sap-c-ts410'],
    hasExamData: true,
    description: { zh: 'S/4HANA 工厂维护认证，包含设备管理、预防性维护、工单管理', ja: 'S/4HANA プラント保全認定、設備管理、予防保全、作業指図管理' }
  },

  // ========== SuccessFactors (HCM/HR) Series (8) ==========
  {
    id: 'sap-c-thr-ec',
    code: 'C_THR_EC',
    provider: 'SAP',
    name: { zh: 'SuccessFactors 员工中心', ja: 'SuccessFactors Employee Central' },
    fullName: { zh: 'SAP Certified Associate - SAP SuccessFactors Employee Central', ja: 'SAP 認定アソシエイト - SAP SuccessFactors Employee Central' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SuccessFactors 核心人力资源认证，员工主数据、组织架构、工作流', ja: 'SuccessFactors コア人事認定、従業員マスタ、組織構造、ワークフロー' }
  },
  {
    id: 'sap-c-thr-rcm',
    code: 'C_THR_RCM',
    provider: 'SAP',
    name: { zh: 'SuccessFactors 招聘', ja: 'SuccessFactors 採用管理' },
    fullName: { zh: 'SAP Certified Associate - SAP SuccessFactors Recruiting', ja: 'SAP 認定アソシエイト - SAP SuccessFactors 採用管理' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SuccessFactors 招聘管理认证，职位发布、候选人管理、面试流程', ja: 'SuccessFactors 採用管理認定、求人掲載、候補者管理、面接プロセス' }
  },
  {
    id: 'sap-c-thr-onb',
    code: 'C_THR_ONB',
    provider: 'SAP',
    name: { zh: 'SuccessFactors 入职', ja: 'SuccessFactors オンボーディング' },
    fullName: { zh: 'SAP Certified Associate - SAP SuccessFactors Onboarding', ja: 'SAP 認定アソシエイト - SAP SuccessFactors オンボーディング' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-thr-ec'],
    hasExamData: true,
    description: { zh: 'SuccessFactors 入职管理认证，新员工入职流程、文档管理', ja: 'SuccessFactors オンボーディング認定、新入社員プロセス、文書管理' }
  },
  {
    id: 'sap-c-thr-pms',
    code: 'C_THR_PMS',
    provider: 'SAP',
    name: { zh: 'SuccessFactors 绩效与目标', ja: 'SuccessFactors 業績・目標管理' },
    fullName: { zh: 'SAP Certified Associate - SAP SuccessFactors Performance and Goals', ja: 'SAP 認定アソシエイト - SAP SuccessFactors 業績・目標管理' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-thr-ec'],
    hasExamData: true,
    description: { zh: 'SuccessFactors 绩效管理认证，目标设定、绩效评估、360度反馈', ja: 'SuccessFactors 業績管理認定、目標設定、業績評価、360度フィードバック' }
  },
  {
    id: 'sap-c-thr-cmp',
    code: 'C_THR_CMP',
    provider: 'SAP',
    name: { zh: 'SuccessFactors 薪酬', ja: 'SuccessFactors 報酬管理' },
    fullName: { zh: 'SAP Certified Associate - SAP SuccessFactors Compensation', ja: 'SAP 認定アソシエイト - SAP SuccessFactors 報酬管理' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-thr-ec'],
    hasExamData: true,
    description: { zh: 'SuccessFactors 薪酬管理认证，薪资规划、奖金计算、股权激励', ja: 'SuccessFactors 報酬管理認定、給与計画、賞与計算、株式報酬' }
  },
  {
    id: 'sap-c-thr-lms',
    code: 'C_THR_LMS',
    provider: 'SAP',
    name: { zh: 'SuccessFactors 学习', ja: 'SuccessFactors 学習管理' },
    fullName: { zh: 'SAP Certified Associate - SAP SuccessFactors Learning', ja: 'SAP 認定アソシエイト - SAP SuccessFactors 学習管理' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SuccessFactors 学习管理认证，课程管理、学习路径、认证追踪', ja: 'SuccessFactors 学習管理認定、コース管理、学習パス、認定追跡' }
  },
  {
    id: 'sap-c-thr-wfa',
    code: 'C_THR_WFA',
    provider: 'SAP',
    name: { zh: 'SuccessFactors 人力分析', ja: 'SuccessFactors ワークフォース分析' },
    fullName: { zh: 'SAP Certified Associate - SAP SuccessFactors Workforce Analytics', ja: 'SAP 認定アソシエイト - SAP SuccessFactors ワークフォース分析' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-thr-ec'],
    hasExamData: true,
    description: { zh: 'SuccessFactors 人力资源分析认证，员工数据分析、报表、仪表盘', ja: 'SuccessFactors 人事分析認定、従業員データ分析、レポート、ダッシュボード' }
  },
  {
    id: 'sap-c-thr-tal',
    code: 'C_THR_TAL',
    provider: 'SAP',
    name: { zh: 'SuccessFactors 人才管理', ja: 'SuccessFactors タレント管理' },
    fullName: { zh: 'SAP Certified Associate - SAP SuccessFactors Succession and Development', ja: 'SAP 認定アソシエイト - SAP SuccessFactors 後継者・育成計画' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: ['sap-c-thr-ec'],
    hasExamData: true,
    description: { zh: 'SuccessFactors 继任与发展认证，人才盘点、继任计划、职业发展', ja: 'SuccessFactors 後継者・育成認定、タレントレビュー、後継者計画、キャリア開発' }
  },

  // ========== Customer Experience (CX) Series (4) ==========
  {
    id: 'sap-c-c4h',
    code: 'C_C4H',
    provider: 'SAP',
    name: { zh: 'SAP Commerce Cloud', ja: 'SAP Commerce Cloud' },
    fullName: { zh: 'SAP Certified Associate - SAP Commerce Cloud', ja: 'SAP 認定アソシエイト - SAP Commerce Cloud' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Commerce Cloud 电商平台认证，产品目录、订单管理、促销', ja: 'SAP Commerce Cloud Eコマース認定、商品カタログ、注文管理、プロモーション' }
  },
  {
    id: 'sap-c-c4c-sales',
    code: 'C_C4C_SALES',
    provider: 'SAP',
    name: { zh: 'SAP Sales Cloud', ja: 'SAP Sales Cloud' },
    fullName: { zh: 'SAP Certified Associate - SAP Sales Cloud', ja: 'SAP 認定アソシエイト - SAP Sales Cloud' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Sales Cloud 销售云认证，商机管理、报价、销售预测', ja: 'SAP Sales Cloud 認定、商談管理、見積、販売予測' }
  },
  {
    id: 'sap-c-c4c-service',
    code: 'C_C4C_SERVICE',
    provider: 'SAP',
    name: { zh: 'SAP Service Cloud', ja: 'SAP Service Cloud' },
    fullName: { zh: 'SAP Certified Associate - SAP Service Cloud', ja: 'SAP 認定アソシエイト - SAP Service Cloud' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Service Cloud 服务云认证，工单管理、知识库、客户服务', ja: 'SAP Service Cloud 認定、チケット管理、ナレッジベース、カスタマーサービス' }
  },
  {
    id: 'sap-c-c4c-marketing',
    code: 'C_C4C_MKT',
    provider: 'SAP',
    name: { zh: 'SAP Marketing Cloud', ja: 'SAP Marketing Cloud' },
    fullName: { zh: 'SAP Certified Associate - SAP Marketing Cloud', ja: 'SAP 認定アソシエイト - SAP Marketing Cloud' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Marketing Cloud 营销云认证，营销活动、客户细分、营销分析', ja: 'SAP Marketing Cloud 認定、マーケティングキャンペーン、顧客セグメント、分析' }
  },

  // ========== Supply Chain Series (5) ==========
  {
    id: 'sap-c-ibp',
    code: 'C_IBP',
    provider: 'SAP',
    name: { zh: 'SAP IBP 集成业务计划', ja: 'SAP IBP 統合ビジネス計画' },
    fullName: { zh: 'SAP Certified Associate - SAP Integrated Business Planning', ja: 'SAP 認定アソシエイト - SAP 統合ビジネス計画' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP IBP 供应链计划认证，需求计划、供应计划、库存优化', ja: 'SAP IBP サプライチェーン計画認定、需要計画、供給計画、在庫最適化' }
  },
  {
    id: 'sap-c-tm',
    code: 'C_TM',
    provider: 'SAP',
    name: { zh: 'SAP 运输管理', ja: 'SAP 輸送管理' },
    fullName: { zh: 'SAP Certified Associate - SAP Transportation Management', ja: 'SAP 認定アソシエイト - SAP 輸送管理' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP TM 运输管理认证，运输计划、运费计算、承运商管理', ja: 'SAP TM 輸送管理認定、輸送計画、運賃計算、運送業者管理' }
  },
  {
    id: 'sap-c-ariba-proc',
    code: 'C_ARIBA_PROC',
    provider: 'SAP',
    name: { zh: 'SAP Ariba 采购', ja: 'SAP Ariba 調達' },
    fullName: { zh: 'SAP Certified Associate - SAP Ariba Procurement', ja: 'SAP 認定アソシエイト - SAP Ariba 調達' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Ariba 采购认证，采购申请、采购订单、供应商协作', ja: 'SAP Ariba 調達認定、購買依頼、発注、サプライヤー協業' }
  },
  {
    id: 'sap-c-ariba-src',
    code: 'C_ARIBA_SRC',
    provider: 'SAP',
    name: { zh: 'SAP Ariba 寻源', ja: 'SAP Ariba ソーシング' },
    fullName: { zh: 'SAP Certified Associate - SAP Ariba Sourcing', ja: 'SAP 認定アソシエイト - SAP Ariba ソーシング' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Ariba 寻源认证，招标、竞价、合同管理', ja: 'SAP Ariba ソーシング認定、入札、オークション、契約管理' }
  },
  {
    id: 'sap-c-ariba-sup',
    code: 'C_ARIBA_SUP',
    provider: 'SAP',
    name: { zh: 'SAP Ariba 供应商管理', ja: 'SAP Ariba サプライヤー管理' },
    fullName: { zh: 'SAP Certified Associate - SAP Ariba Supplier Management', ja: 'SAP 認定アソシエイト - SAP Ariba サプライヤー管理' },
    level: 'associate',
    category: 'sap',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Ariba 供应商管理认证，供应商注册、绩效评估、风险管理', ja: 'SAP Ariba サプライヤー管理認定、サプライヤー登録、実績評価、リスク管理' }
  },

  // ========== Analytics Series (2) ==========
  {
    id: 'sap-c-sac',
    code: 'C_SAC',
    provider: 'SAP',
    name: { zh: 'SAP Analytics Cloud', ja: 'SAP Analytics Cloud' },
    fullName: { zh: 'SAP Certified Associate - SAP Analytics Cloud', ja: 'SAP 認定アソシエイト - SAP Analytics Cloud' },
    level: 'associate',
    category: 'data',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Analytics Cloud 认证，数据可视化、计划、预测分析', ja: 'SAP Analytics Cloud 認定、データ可視化、計画、予測分析' }
  },
  {
    id: 'sap-c-lumira',
    code: 'C_LUMIRA',
    provider: 'SAP',
    name: { zh: 'SAP Lumira', ja: 'SAP Lumira' },
    fullName: { zh: 'SAP Certified Associate - SAP Lumira Designer', ja: 'SAP 認定アソシエイト - SAP Lumira Designer' },
    level: 'associate',
    category: 'data',
    examDuration: 180,
    questionCount: 80,
    passingScore: 63,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP Lumira 数据可视化认证，仪表盘设计、数据故事', ja: 'SAP Lumira データ可視化認定、ダッシュボード設計、データストーリー' }
  },

  // ========== Governance & Compliance Series (3) ==========
  {
    id: 'sap-c-grc-ac',
    code: 'C_GRC_AC',
    provider: 'SAP',
    name: { zh: 'SAP GRC 访问控制', ja: 'SAP GRC アクセス制御' },
    fullName: { zh: 'SAP Certified Associate - SAP Access Control', ja: 'SAP 認定アソシエイト - SAP アクセス制御' },
    level: 'associate',
    category: 'security',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP GRC 访问控制认证，职责分离、紧急访问、用户访问审计', ja: 'SAP GRC アクセス制御認定、職務分掌、緊急アクセス、ユーザーアクセス監査' }
  },
  {
    id: 'sap-c-grc-pc',
    code: 'C_GRC_PC',
    provider: 'SAP',
    name: { zh: 'SAP GRC 流程控制', ja: 'SAP GRC プロセス制御' },
    fullName: { zh: 'SAP Certified Associate - SAP Process Control', ja: 'SAP 認定アソシエイト - SAP プロセス制御' },
    level: 'associate',
    category: 'security',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP GRC 流程控制认证，内部控制、风险评估、合规监控', ja: 'SAP GRC プロセス制御認定、内部統制、リスク評価、コンプライアンス監視' }
  },
  {
    id: 'sap-c-mdg',
    code: 'C_MDG',
    provider: 'SAP',
    name: { zh: 'SAP 主数据治理', ja: 'SAP マスターデータガバナンス' },
    fullName: { zh: 'SAP Certified Associate - SAP Master Data Governance', ja: 'SAP 認定アソシエイト - SAP マスターデータガバナンス' },
    level: 'associate',
    category: 'data',
    examDuration: 180,
    questionCount: 80,
    passingScore: 65,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'SAP MDG 主数据治理认证，数据质量、数据标准化、变更管理', ja: 'SAP MDG マスターデータガバナンス認定、データ品質、標準化、変更管理' }
  }
];

// n8n Certifications (Workflow Automation)
export const n8nCertifications: Certification[] = [
  {
    id: 'n8n-fundamentals',
    code: 'N8N-FUND',
    provider: 'n8n',
    name: { zh: 'n8n 基础', ja: 'n8n 基礎' },
    fullName: { zh: 'n8n Workflow Automation Fundamentals', ja: 'n8n ワークフロー自動化基礎' },
    level: 'foundational',
    category: 'automation',
    examDuration: 60,
    questionCount: 50,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'n8n 工作流自动化平台基础知识，节点操作和基本流程设计', ja: 'n8n ワークフロー自動化プラットフォームの基礎、ノード操作と基本フロー設計' }
  },
  {
    id: 'n8n-advanced',
    code: 'N8N-ADV',
    provider: 'n8n',
    name: { zh: 'n8n 高级工作流', ja: 'n8n 高度なワークフロー' },
    fullName: { zh: 'n8n Advanced Workflow Development', ja: 'n8n 高度なワークフロー開発' },
    level: 'associate',
    category: 'automation',
    examDuration: 90,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['n8n-fundamentals'],
    hasExamData: true,
    description: { zh: 'n8n 高级工作流设计，错误处理、子工作流、自定义节点开发', ja: 'n8n 高度なワークフロー設計、エラー処理、サブワークフロー、カスタムノード開発' }
  },
  {
    id: 'n8n-integration',
    code: 'N8N-INT',
    provider: 'n8n',
    name: { zh: 'n8n 集成开发', ja: 'n8n 統合開発' },
    fullName: { zh: 'n8n Integration and API Development', ja: 'n8n 統合と API 開発' },
    level: 'professional',
    category: 'automation',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['n8n-advanced'],
    hasExamData: true,
    description: { zh: 'n8n API 集成、Webhook、数据库连接、AI 集成和企业部署', ja: 'n8n API 統合、Webhook、データベース接続、AI 統合と企業デプロイ' }
  }
];

// Dify Certifications (AI Application Development)
export const difyCertifications: Certification[] = [
  {
    id: 'dify-fundamentals',
    code: 'DIFY-FUND',
    provider: 'Dify',
    name: { zh: 'Dify 基础', ja: 'Dify 基礎' },
    fullName: { zh: 'Dify AI Application Platform Fundamentals', ja: 'Dify AI アプリケーションプラットフォーム基礎' },
    level: 'foundational',
    category: 'llmops',
    examDuration: 60,
    questionCount: 50,
    passingScore: 70,
    prerequisites: [],
    hasExamData: true,
    description: { zh: 'Dify AI 应用开发平台基础，Prompt 工程和基础应用构建', ja: 'Dify AI アプリ開発プラットフォームの基礎、プロンプトエンジニアリングと基本アプリ構築' }
  },
  {
    id: 'dify-app-builder',
    code: 'DIFY-APP',
    provider: 'Dify',
    name: { zh: 'Dify 应用构建', ja: 'Dify アプリ構築' },
    fullName: { zh: 'Dify AI Application Builder', ja: 'Dify AI アプリケーションビルダー' },
    level: 'associate',
    category: 'llmops',
    examDuration: 90,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['dify-fundamentals'],
    hasExamData: true,
    description: { zh: 'Dify 聊天机器人、Agent、工作流和知识库应用开发', ja: 'Dify チャットボット、Agent、ワークフローとナレッジベースアプリ開発' }
  },
  {
    id: 'dify-llmops',
    code: 'DIFY-OPS',
    provider: 'Dify',
    name: { zh: 'Dify LLMOps', ja: 'Dify LLMOps' },
    fullName: { zh: 'Dify LLMOps and Enterprise Deployment', ja: 'Dify LLMOps と企業デプロイメント' },
    level: 'professional',
    category: 'llmops',
    examDuration: 120,
    questionCount: 50,
    passingScore: 70,
    prerequisites: ['dify-app-builder'],
    hasExamData: true,
    description: { zh: 'Dify 企业部署、模型管理、RAG 优化和生产运维', ja: 'Dify 企業デプロイメント、モデル管理、RAG 最適化と本番運用' }
  }
];

// All certifications (official + AI tools)
export const allCertifications = [...awsCertifications, ...azureCertifications, ...gcpCertifications, ...sapCertifications, ...n8nCertifications, ...difyCertifications];

// Official certifications only
export const officialCertifications = [...awsCertifications, ...azureCertifications, ...gcpCertifications, ...sapCertifications];

// AI tool practice questions only
export const aiToolPractice = [...n8nCertifications, ...difyCertifications];

// Get certifications by official provider
export const getCertificationsByProvider = (provider: Provider): Certification[] => {
  switch (provider) {
    case 'AWS': return awsCertifications;
    case 'Azure': return azureCertifications;
    case 'GCP': return gcpCertifications;
    case 'SAP': return sapCertifications;
  }
};

// Get AI tool practice by provider
export const getAIToolPracticeByProvider = (provider: AIToolProvider): Certification[] => {
  switch (provider) {
    case 'n8n': return n8nCertifications;
    case 'Dify': return difyCertifications;
  }
};

// Career Paths
export const careerPaths: CareerPath[] = [
  {
    id: 'cloud-architect',
    name: { zh: '云架构师', ja: 'クラウドアーキテクト' },
    description: { zh: '设计和实施云解决方案的专家', ja: 'クラウドソリューションの設計と実装の専門家' },
    certifications: [
      { provider: 'AWS', certId: 'aws-clf-c02' },
      { provider: 'AWS', certId: 'aws-saa-c03' },
      { provider: 'AWS', certId: 'aws-sap-c02' },
      { provider: 'Azure', certId: 'azure-az-900' },
      { provider: 'Azure', certId: 'azure-az-104' },
      { provider: 'Azure', certId: 'azure-az-305' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-ace' },
      { provider: 'GCP', certId: 'gcp-pca' }
    ]
  },
  {
    id: 'ai-engineer',
    name: { zh: 'AI 工程师', ja: 'AI エンジニア' },
    description: { zh: '构建和部署 AI/ML 解决方案的专家', ja: 'AI/ML ソリューションの構築とデプロイの専門家' },
    certifications: [
      { provider: 'AWS', certId: 'aws-aif-c01' },
      { provider: 'AWS', certId: 'aws-mla-c01' },
      { provider: 'AWS', certId: 'aws-mls-c01' },
      { provider: 'Azure', certId: 'azure-ai-900' },
      { provider: 'Azure', certId: 'azure-ai-102' },
      { provider: 'Azure', certId: 'azure-dp-100' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-ace' },
      { provider: 'GCP', certId: 'gcp-ml-engineer' }
    ]
  },
  {
    id: 'genai-engineer',
    name: { zh: '生成式 AI 工程师', ja: '生成 AI エンジニア' },
    description: { zh: '专注于大语言模型和生成式 AI 应用开发', ja: 'LLM と生成 AI アプリケーション開発の専門家' },
    certifications: [
      { provider: 'AWS', certId: 'aws-aif-c01' },
      { provider: 'AWS', certId: 'aws-mla-c01' },
      { provider: 'AWS', certId: 'aws-mls-c01' },
      { provider: 'Azure', certId: 'azure-ai-900' },
      { provider: 'Azure', certId: 'azure-ai-102' },
      { provider: 'Azure', certId: 'azure-dp-100' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-gail' },
      { provider: 'GCP', certId: 'gcp-ml-engineer' }
    ]
  },
  {
    id: 'data-engineer',
    name: { zh: '数据工程师', ja: 'データエンジニア' },
    description: { zh: '构建和维护数据管道和基础设施', ja: 'データパイプラインとインフラの構築と維持' },
    certifications: [
      { provider: 'AWS', certId: 'aws-clf-c02' },
      { provider: 'AWS', certId: 'aws-dea-c01' },
      { provider: 'Azure', certId: 'azure-dp-900' },
      { provider: 'Azure', certId: 'azure-dp-203' },
      { provider: 'Azure', certId: 'azure-dp-300' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-ace' },
      { provider: 'GCP', certId: 'gcp-pde' }
    ]
  },
  {
    id: 'devops-engineer',
    name: { zh: 'DevOps 工程师', ja: 'DevOps エンジニア' },
    description: { zh: '自动化部署和运维流程的专家', ja: 'デプロイと運用プロセスの自動化の専門家' },
    certifications: [
      { provider: 'AWS', certId: 'aws-clf-c02' },
      { provider: 'AWS', certId: 'aws-soa-c02' },
      { provider: 'AWS', certId: 'aws-dva-c02' },
      { provider: 'AWS', certId: 'aws-dop-c02' },
      { provider: 'Azure', certId: 'azure-az-900' },
      { provider: 'Azure', certId: 'azure-az-204' },
      { provider: 'Azure', certId: 'azure-az-400' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-ace' },
      { provider: 'GCP', certId: 'gcp-pdevops' }
    ]
  },
  {
    id: 'security-engineer',
    name: { zh: '安全工程师', ja: 'セキュリティエンジニア' },
    description: { zh: '保护云环境和应用安全的专家', ja: 'クラウド環境とアプリケーションのセキュリティの専門家' },
    certifications: [
      { provider: 'AWS', certId: 'aws-clf-c02' },
      { provider: 'AWS', certId: 'aws-saa-c03' },
      { provider: 'AWS', certId: 'aws-scs-c02' },
      { provider: 'Azure', certId: 'azure-sc-900' },
      { provider: 'Azure', certId: 'azure-az-500' },
      { provider: 'Azure', certId: 'azure-sc-200' },
      { provider: 'Azure', certId: 'azure-sc-300' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-ace' },
      { provider: 'GCP', certId: 'gcp-pse' }
    ]
  },
  {
    id: 'network-engineer',
    name: { zh: '网络工程师', ja: 'ネットワークエンジニア' },
    description: { zh: '设计和管理云网络架构的专家', ja: 'クラウドネットワークアーキテクチャの設計と管理の専門家' },
    certifications: [
      { provider: 'AWS', certId: 'aws-clf-c02' },
      { provider: 'AWS', certId: 'aws-saa-c03' },
      { provider: 'AWS', certId: 'aws-ans-c01' },
      { provider: 'Azure', certId: 'azure-az-900' },
      { provider: 'Azure', certId: 'azure-az-104' },
      { provider: 'Azure', certId: 'azure-az-700' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-ace' },
      { provider: 'GCP', certId: 'gcp-pne' }
    ]
  },
  {
    id: 'database-engineer',
    name: { zh: '数据库工程师', ja: 'データベースエンジニア' },
    description: { zh: '设计和管理云数据库系统的专家', ja: 'クラウドデータベースシステムの設計と管理の専門家' },
    certifications: [
      { provider: 'AWS', certId: 'aws-clf-c02' },
      { provider: 'AWS', certId: 'aws-saa-c03' },
      { provider: 'AWS', certId: 'aws-dbs-c01' },
      { provider: 'Azure', certId: 'azure-dp-900' },
      { provider: 'Azure', certId: 'azure-dp-300' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-ace' },
      { provider: 'GCP', certId: 'gcp-pdba' }
    ]
  },
  {
    id: 'cloud-developer',
    name: { zh: '云开发者', ja: 'クラウド開発者' },
    description: { zh: '开发云原生应用和服务的专家', ja: 'クラウドネイティブアプリとサービス開発の専門家' },
    certifications: [
      { provider: 'AWS', certId: 'aws-clf-c02' },
      { provider: 'AWS', certId: 'aws-dva-c02' },
      { provider: 'Azure', certId: 'azure-az-900' },
      { provider: 'Azure', certId: 'azure-pl-900' },
      { provider: 'Azure', certId: 'azure-az-204' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-ace' },
      { provider: 'GCP', certId: 'gcp-pcdev' }
    ]
  },
  {
    id: 'enterprise-admin',
    name: { zh: '企业协作管理员', ja: 'エンタープライズ管理者' },
    description: { zh: '管理企业级云协作平台和虚拟桌面', ja: 'エンタープライズクラウドコラボレーションと仮想デスクトップの管理' },
    certifications: [
      { provider: 'AWS', certId: 'aws-clf-c02' },
      { provider: 'AWS', certId: 'aws-soa-c02' },
      { provider: 'Azure', certId: 'azure-az-900' },
      { provider: 'Azure', certId: 'azure-az-104' },
      { provider: 'Azure', certId: 'azure-az-140' },
      { provider: 'GCP', certId: 'gcp-cdl' },
      { provider: 'GCP', certId: 'gcp-pwa' }
    ]
  },
  // SAP Career Paths
  {
    id: 'sap-consultant',
    name: { zh: 'SAP 功能顾问', ja: 'SAP 機能コンサルタント' },
    description: { zh: 'SAP 业务流程实施和配置专家', ja: 'SAP ビジネスプロセス導入・設定の専門家' },
    certifications: [
      { provider: 'SAP', certId: 'sap-c-ts410' },
      { provider: 'SAP', certId: 'sap-c-ts4fi' },
      { provider: 'SAP', certId: 'sap-c-ts4co' },
      { provider: 'SAP', certId: 'sap-c-ts450' },
      { provider: 'SAP', certId: 'sap-c-ts460' },
      { provider: 'SAP', certId: 'sap-c-s4cs' },
      { provider: 'SAP', certId: 'sap-c-activate' }
    ]
  },
  {
    id: 'sap-developer',
    name: { zh: 'SAP 技术开发者', ja: 'SAP 技術開発者' },
    description: { zh: 'SAP 平台开发和扩展专家', ja: 'SAP プラットフォーム開発・拡張の専門家' },
    certifications: [
      { provider: 'SAP', certId: 'sap-c-btp' },
      { provider: 'SAP', certId: 'sap-c-btpdev' },
      { provider: 'SAP', certId: 'sap-c-s4cdk' },
      { provider: 'SAP', certId: 'sap-c-btpint' },
      { provider: 'SAP', certId: 'sap-c-fiord' },
      { provider: 'SAP', certId: 'sap-c-hanaimp' }
    ]
  },
  {
    id: 'sap-data-analyst',
    name: { zh: 'SAP 数据分析师', ja: 'SAP データアナリスト' },
    description: { zh: 'SAP 数据平台和 AI 服务专家', ja: 'SAP データプラットフォームと AI サービスの専門家' },
    certifications: [
      { provider: 'SAP', certId: 'sap-c-btp' },
      { provider: 'SAP', certId: 'sap-c-datasph' },
      { provider: 'SAP', certId: 'sap-c-aicore' },
      { provider: 'SAP', certId: 'sap-c-aibus' },
      { provider: 'SAP', certId: 'sap-c-bowi' },
      { provider: 'SAP', certId: 'sap-c-hanaimp' }
    ]
  },
  {
    id: 'sap-implementation',
    name: { zh: 'SAP 实施顾问', ja: 'SAP 導入コンサルタント' },
    description: { zh: 'SAP S/4HANA 项目实施和迁移专家', ja: 'SAP S/4HANA プロジェクト導入・移行の専門家' },
    certifications: [
      { provider: 'SAP', certId: 'sap-c-ts410' },
      { provider: 'SAP', certId: 'sap-c-activate' },
      { provider: 'SAP', certId: 'sap-c-s4cpr' },
      { provider: 'SAP', certId: 'sap-c-ts4h' },
      { provider: 'SAP', certId: 'sap-c-hanaimp' }
    ]
  },
  {
    id: 'sap-hr-consultant',
    name: { zh: 'SAP HR 顾问', ja: 'SAP HR コンサルタント' },
    description: { zh: 'SAP SuccessFactors 人力资源管理专家', ja: 'SAP SuccessFactors 人事管理の専門家' },
    certifications: [
      { provider: 'SAP', certId: 'sap-c-thr-ec' },
      { provider: 'SAP', certId: 'sap-c-thr-rcm' },
      { provider: 'SAP', certId: 'sap-c-thr-onb' },
      { provider: 'SAP', certId: 'sap-c-thr-pms' },
      { provider: 'SAP', certId: 'sap-c-thr-cmp' },
      { provider: 'SAP', certId: 'sap-c-thr-lms' },
      { provider: 'SAP', certId: 'sap-c-thr-wfa' },
      { provider: 'SAP', certId: 'sap-c-thr-tal' }
    ]
  },
  {
    id: 'sap-supply-chain',
    name: { zh: 'SAP 供应链顾问', ja: 'SAP サプライチェーンコンサルタント' },
    description: { zh: 'SAP 供应链和采购管理专家', ja: 'SAP サプライチェーン・調達管理の専門家' },
    certifications: [
      { provider: 'SAP', certId: 'sap-c-ts4mm' },
      { provider: 'SAP', certId: 'sap-c-ts450' },
      { provider: 'SAP', certId: 'sap-c-s4ewm' },
      { provider: 'SAP', certId: 'sap-c-ibp' },
      { provider: 'SAP', certId: 'sap-c-tm' },
      { provider: 'SAP', certId: 'sap-c-ariba-proc' },
      { provider: 'SAP', certId: 'sap-c-ariba-src' },
      { provider: 'SAP', certId: 'sap-c-ariba-sup' }
    ]
  },
  {
    id: 'sap-cx-consultant',
    name: { zh: 'SAP 客户体验顾问', ja: 'SAP CX コンサルタント' },
    description: { zh: 'SAP 客户体验和电商平台专家', ja: 'SAP カスタマーエクスペリエンス・EC の専門家' },
    certifications: [
      { provider: 'SAP', certId: 'sap-c-c4h' },
      { provider: 'SAP', certId: 'sap-c-c4c-sales' },
      { provider: 'SAP', certId: 'sap-c-c4c-service' },
      { provider: 'SAP', certId: 'sap-c-c4c-marketing' },
      { provider: 'SAP', certId: 'sap-c-ts460' }
    ]
  },
  {
    id: 'sap-manufacturing',
    name: { zh: 'SAP 制造业顾问', ja: 'SAP 製造業コンサルタント' },
    description: { zh: 'SAP 生产计划和质量管理专家', ja: 'SAP 生産計画・品質管理の専門家' },
    certifications: [
      { provider: 'SAP', certId: 'sap-c-ts4pp' },
      { provider: 'SAP', certId: 'sap-c-ts4qm' },
      { provider: 'SAP', certId: 'sap-c-ts4pm' },
      { provider: 'SAP', certId: 'sap-c-ts4mm' },
      { provider: 'SAP', certId: 'sap-c-s4ewm' }
    ]
  },
  {
    id: 'sap-governance',
    name: { zh: 'SAP 治理与合规顾问', ja: 'SAP ガバナンス・コンプライアンスコンサルタント' },
    description: { zh: 'SAP 数据治理和风险合规专家', ja: 'SAP データガバナンス・リスク管理の専門家' },
    certifications: [
      { provider: 'SAP', certId: 'sap-c-grc-ac' },
      { provider: 'SAP', certId: 'sap-c-grc-pc' },
      { provider: 'SAP', certId: 'sap-c-mdg' },
      { provider: 'SAP', certId: 'sap-c-sac' },
      { provider: 'SAP', certId: 'sap-c-bowi' }
    ]
  }
  // Note: n8n and Dify are not included in career paths as they are not official certifications
  // They are available as practice questions in the "AI Tools Practice" section
];

// Level display names
export const levelNames = {
  foundational: { zh: '入门级', ja: '入門レベル' },
  associate: { zh: '助理级', ja: 'アソシエイト' },
  professional: { zh: '专业级', ja: 'プロフェッショナル' },
  specialty: { zh: '专家级', ja: 'スペシャリティ' },
  expert: { zh: '专家级', ja: 'エキスパート' }
};

// Category display names
export const categoryNames = {
  cloud: { zh: '云基础', ja: 'クラウド基礎' },
  architecture: { zh: '架构', ja: 'アーキテクチャ' },
  developer: { zh: '开发', ja: '開発' },
  devops: { zh: 'DevOps', ja: 'DevOps' },
  data: { zh: '数据', ja: 'データ' },
  ai: { zh: 'AI/ML', ja: 'AI/ML' },
  security: { zh: '安全', ja: 'セキュリティ' },
  networking: { zh: '网络', ja: 'ネットワーク' },
  database: { zh: '数据库', ja: 'データベース' },
  sap: { zh: 'SAP', ja: 'SAP' },
  automation: { zh: '工作流自动化', ja: 'ワークフロー自動化' },
  llmops: { zh: 'LLMOps', ja: 'LLMOps' }
};
