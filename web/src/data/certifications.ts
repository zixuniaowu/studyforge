// Cloud Certification Data for AWS, Azure, and GCP

export type Provider = 'AWS' | 'Azure' | 'GCP';
export type Level = 'foundational' | 'associate' | 'professional' | 'specialty' | 'expert';
export type Category = 'cloud' | 'architecture' | 'developer' | 'devops' | 'data' | 'ai' | 'security' | 'networking' | 'database' | 'sap';

export interface Certification {
  id: string;
  code: string;
  provider: Provider;
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

// All certifications
export const allCertifications = [...awsCertifications, ...azureCertifications, ...gcpCertifications];

// Get certifications by provider
export const getCertificationsByProvider = (provider: Provider): Certification[] => {
  switch (provider) {
    case 'AWS': return awsCertifications;
    case 'Azure': return azureCertifications;
    case 'GCP': return gcpCertifications;
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
  }
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
  sap: { zh: 'SAP', ja: 'SAP' }
};
