import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Cloud,
  Brain,
  Database,
  CheckCircle2,
  Lightbulb,
  Star
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';

type Category = 'cloud-general' | 'aws' | 'azure' | 'ai-ml' | 'system-design' | 'behavioral';

interface Question {
  id: string;
  question: { zh: string; ja: string };
  answer: { zh: string; ja: string };
  tips?: { zh: string; ja: string };
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

interface CategoryData {
  name: { zh: string; ja: string };
  description: { zh: string; ja: string };
  icon: React.ElementType;
  gradient: string;
  questions: Question[];
}

const interviewData: Record<Category, CategoryData> = {
  'cloud-general': {
    name: { zh: '云计算基础', ja: 'クラウド基礎' },
    description: { zh: '云计算核心概念和架构问题', ja: 'クラウドコンピューティングの基本概念とアーキテクチャ' },
    icon: Cloud,
    gradient: 'from-cyan-500 to-blue-600',
    questions: [
      {
        id: 'cg-1',
        question: {
          zh: '什么是云计算？请解释 IaaS、PaaS、SaaS 的区别。',
          ja: 'クラウドコンピューティングとは何ですか？IaaS、PaaS、SaaSの違いを説明してください。'
        },
        answer: {
          zh: `**云计算**是通过互联网提供计算资源（服务器、存储、数据库、网络等）的服务模式。

**三种服务模型：**
- **IaaS (基础设施即服务)**：提供虚拟机、存储、网络等基础设施。用户管理操作系统及以上层。例：EC2、Azure VMs
- **PaaS (平台即服务)**：提供运行时环境、数据库等平台服务。用户只管理应用和数据。例：Elastic Beanstalk、App Service
- **SaaS (软件即服务)**：提供完整的应用程序。用户直接使用。例：Gmail、Salesforce

**责任划分**：IaaS 用户责任最大，SaaS 最小。`,
          ja: `**クラウドコンピューティング**は、インターネットを通じてコンピューティングリソース（サーバー、ストレージ、データベース、ネットワークなど）を提供するサービスモデルです。

**3つのサービスモデル：**
- **IaaS (Infrastructure as a Service)**：仮想マシン、ストレージ、ネットワークなどの基盤を提供。ユーザーはOSより上位層を管理。例：EC2、Azure VMs
- **PaaS (Platform as a Service)**：ランタイム環境、データベースなどのプラットフォームサービスを提供。ユーザーはアプリとデータのみ管理。例：Elastic Beanstalk、App Service
- **SaaS (Software as a Service)**：完全なアプリケーションを提供。ユーザーはそのまま使用。例：Gmail、Salesforce

**責任分担**：IaaSはユーザー責任が最大、SaaSは最小。`
        },
        tips: {
          zh: '回答时可以画一个责任分层图，直观展示不同模型的区别',
          ja: '回答時に責任分担の図を描くと、各モデルの違いを視覚的に示せます'
        },
        difficulty: 'easy',
        tags: ['Cloud Basics', 'IaaS', 'PaaS', 'SaaS']
      },
      {
        id: 'cg-2',
        question: {
          zh: '什么是高可用性（HA）？如何在云上实现？',
          ja: '高可用性（HA）とは何ですか？クラウドでどのように実現しますか？'
        },
        answer: {
          zh: `**高可用性**指系统能够在预定时间内持续运行的能力，通常用"几个9"表示（如 99.99% = 年停机 52 分钟）。

**实现策略：**
1. **多可用区部署**：将资源分布在多个 AZ，单个 AZ 故障不影响服务
2. **负载均衡**：使用 ELB/ALB 分发流量，自动剔除故障实例
3. **自动伸缩**：配置 Auto Scaling 自动替换故障实例
4. **数据冗余**：使用 Multi-AZ RDS、S3 跨区域复制
5. **健康检查**：配置健康检查自动发现和处理故障
6. **故障转移**：使用 Route 53 DNS 故障转移

**关键指标**：RTO（恢复时间目标）、RPO（恢复点目标）`,
          ja: `**高可用性**とは、システムが所定の時間内に継続的に稼働できる能力を指し、通常「ナイン」で表します（例：99.99% = 年間ダウンタイム52分）。

**実現戦略：**
1. **マルチAZデプロイ**：リソースを複数のAZに分散、単一AZ障害でもサービス継続
2. **ロードバランシング**：ELB/ALBでトラフィック分散、障害インスタンスを自動除外
3. **オートスケーリング**：Auto Scalingで障害インスタンスを自動置換
4. **データ冗長性**：Multi-AZ RDS、S3クロスリージョンレプリケーション
5. **ヘルスチェック**：ヘルスチェックで障害を自動検知・処理
6. **フェイルオーバー**：Route 53 DNSフェイルオーバー

**重要指標**：RTO（目標復旧時間）、RPO（目標復旧時点）`
        },
        difficulty: 'medium',
        tags: ['High Availability', 'Architecture', 'Disaster Recovery']
      },
      {
        id: 'cg-3',
        question: {
          zh: '解释一下 CAP 定理，以及它在分布式系统设计中的应用。',
          ja: 'CAP定理を説明し、分散システム設計での適用について教えてください。'
        },
        answer: {
          zh: `**CAP 定理**：分布式系统不可能同时满足以下三个特性，最多只能满足两个：

- **C (Consistency)** 一致性：所有节点同一时刻看到相同数据
- **A (Availability)** 可用性：每个请求都能得到响应
- **P (Partition Tolerance)** 分区容错：网络分区时系统仍能运行

**实际应用（必须选择 P）：**
- **CP 系统**：选择一致性，牺牲可用性。例：ZooKeeper、HBase、银行转账
- **AP 系统**：选择可用性，允许最终一致性。例：DynamoDB、Cassandra、社交媒体

**设计建议**：
1. 根据业务场景选择：金融选 CP，社交选 AP
2. 使用最终一致性时，明确一致性窗口
3. 考虑使用 PACELC 扩展理论（无分区时 Latency vs Consistency）`,
          ja: `**CAP定理**：分散システムは以下の3つの特性を同時に満たすことができず、最大2つまでしか満たせません：

- **C (Consistency)** 一貫性：全ノードが同時刻に同じデータを参照
- **A (Availability)** 可用性：すべてのリクエストに応答できる
- **P (Partition Tolerance)** 分断耐性：ネットワーク分断時もシステムが動作

**実際の適用（Pは必須）：**
- **CPシステム**：一貫性を選択、可用性を犠牲に。例：ZooKeeper、HBase、銀行送金
- **APシステム**：可用性を選択、結果整合性を許容。例：DynamoDB、Cassandra、SNS

**設計アドバイス**：
1. ビジネス要件で選択：金融はCP、SNSはAP
2. 結果整合性使用時は整合性ウィンドウを明確に
3. PACELC拡張理論も考慮（非分断時のLatency vs Consistency）`
        },
        difficulty: 'hard',
        tags: ['CAP', 'Distributed Systems', 'Database']
      }
    ]
  },
  'aws': {
    name: { zh: 'AWS 专项', ja: 'AWS 専門' },
    description: { zh: 'AWS 服务和架构面试题', ja: 'AWSサービスとアーキテクチャの面接問題' },
    icon: Cloud,
    gradient: 'from-orange-500 to-amber-600',
    questions: [
      {
        id: 'aws-1',
        question: {
          zh: 'S3 有哪些存储类别？如何选择？',
          ja: 'S3にはどのようなストレージクラスがありますか？どのように選択しますか？'
        },
        answer: {
          zh: `**S3 存储类别（按访问频率和成本排序）：**

| 类别 | 用途 | 最低存储时间 | 检索费用 |
|------|------|-------------|---------|
| **Standard** | 频繁访问数据 | 无 | 无 |
| **Intelligent-Tiering** | 访问模式不确定 | 无 | 无 |
| **Standard-IA** | 不频繁访问（月级） | 30天 | 有 |
| **One Zone-IA** | 非关键不频繁访问 | 30天 | 有 |
| **Glacier Instant** | 归档但需即时访问 | 90天 | 有 |
| **Glacier Flexible** | 归档数据（分钟-小时） | 90天 | 有 |
| **Glacier Deep Archive** | 长期归档（12小时+） | 180天 | 有 |

**选择建议**：
- 热数据 → Standard
- 访问模式不确定 → Intelligent-Tiering
- 备份/日志 → Standard-IA 或 Glacier
- 合规归档 → Glacier Deep Archive`,
          ja: `**S3ストレージクラス（アクセス頻度とコスト順）：**

| クラス | 用途 | 最小保存期間 | 取得料金 |
|------|------|-------------|---------|
| **Standard** | 頻繁アクセスデータ | なし | なし |
| **Intelligent-Tiering** | アクセスパターン不明 | なし | なし |
| **Standard-IA** | 低頻度アクセス（月単位） | 30日 | あり |
| **One Zone-IA** | 非重要低頻度アクセス | 30日 | あり |
| **Glacier Instant** | アーカイブ即時アクセス | 90日 | あり |
| **Glacier Flexible** | アーカイブ（分〜時間） | 90日 | あり |
| **Glacier Deep Archive** | 長期アーカイブ（12時間+） | 180日 | あり |

**選択アドバイス**：
- ホットデータ → Standard
- アクセスパターン不明 → Intelligent-Tiering
- バックアップ/ログ → Standard-IA または Glacier
- コンプライアンスアーカイブ → Glacier Deep Archive`
        },
        difficulty: 'medium',
        tags: ['S3', 'Storage', 'Cost Optimization']
      },
      {
        id: 'aws-2',
        question: {
          zh: 'Lambda 冷启动是什么？如何优化？',
          ja: 'Lambdaのコールドスタートとは何ですか？どのように最適化しますか？'
        },
        answer: {
          zh: `**冷启动**：Lambda 函数首次调用或长时间未调用后，需要初始化执行环境的过程，导致延迟增加。

**冷启动流程**：
1. 下载代码包
2. 启动执行环境
3. 初始化运行时
4. 执行初始化代码（handler 外的代码）

**优化策略**：
1. **Provisioned Concurrency**：预热实例，消除冷启动（有成本）
2. **减小包大小**：移除不需要的依赖，使用 Lambda Layers
3. **选择合适运行时**：Python/Node.js 比 Java/.NET 启动快
4. **增加内存**：内存越大，CPU 分配越多，启动越快
5. **保持函数"温暖"**：定时触发（不推荐，有成本）
6. **优化初始化代码**：懒加载、连接池复用
7. **使用 SnapStart**（Java）：快照启动，减少初始化时间

**典型冷启动时间**：
- Python/Node.js: 100-300ms
- Java: 1-3s（无 SnapStart）`,
          ja: `**コールドスタート**：Lambda関数の初回呼び出し、または長時間未使用後に実行環境を初期化するプロセスで、レイテンシが増加します。

**コールドスタートの流れ**：
1. コードパッケージのダウンロード
2. 実行環境の起動
3. ランタイムの初期化
4. 初期化コードの実行（handler外のコード）

**最適化戦略**：
1. **Provisioned Concurrency**：インスタンスを予熱、コールドスタート排除（コストあり）
2. **パッケージサイズ削減**：不要な依存関係を削除、Lambda Layers使用
3. **適切なランタイム選択**：Python/Node.jsはJava/.NETより高速起動
4. **メモリ増加**：メモリが多いほどCPU割当増、起動高速化
5. **関数を「ウォーム」維持**：定期トリガー（非推奨、コストあり）
6. **初期化コード最適化**：遅延ロード、接続プール再利用
7. **SnapStart使用**（Java）：スナップショット起動で初期化時間短縮

**典型的なコールドスタート時間**：
- Python/Node.js: 100-300ms
- Java: 1-3s（SnapStartなし）`
        },
        difficulty: 'medium',
        tags: ['Lambda', 'Serverless', 'Performance']
      },
      {
        id: 'aws-3',
        question: {
          zh: 'VPC 中 Security Group 和 NACL 有什么区别？',
          ja: 'VPCでSecurity GroupとNACLの違いは何ですか？'
        },
        answer: {
          zh: `**Security Group vs NACL 对比：**

| 特性 | Security Group | NACL |
|------|---------------|------|
| **作用层级** | 实例级别 | 子网级别 |
| **状态** | 有状态（自动允许返回流量） | 无状态（需明确配置出入规则） |
| **规则类型** | 仅允许规则 | 允许和拒绝规则 |
| **规则评估** | 评估所有规则 | 按规则编号顺序评估 |
| **默认行为** | 拒绝所有入站，允许所有出站 | 默认允许所有 |
| **关联** | 关联到 ENI | 关联到子网 |

**使用场景**：
- **Security Group**：实例级访问控制，如允许 80/443 端口
- **NACL**：子网级防护，如阻止特定 IP 段

**最佳实践**：
1. SG 作为主要访问控制（更灵活）
2. NACL 作为额外防护层（子网边界）
3. 遵循最小权限原则`,
          ja: `**Security Group vs NACL 比較：**

| 特性 | Security Group | NACL |
|------|---------------|------|
| **適用レベル** | インスタンスレベル | サブネットレベル |
| **状態** | ステートフル（戻りトラフィック自動許可） | ステートレス（入出力ルール明示必要） |
| **ルールタイプ** | 許可ルールのみ | 許可と拒否ルール |
| **ルール評価** | 全ルール評価 | ルール番号順に評価 |
| **デフォルト動作** | 全インバウンド拒否、全アウトバウンド許可 | デフォルト全許可 |
| **関連付け** | ENIに関連付け | サブネットに関連付け |

**使用シナリオ**：
- **Security Group**：インスタンスレベルアクセス制御、例：80/443ポート許可
- **NACL**：サブネットレベル防御、例：特定IPレンジをブロック

**ベストプラクティス**：
1. SGを主要アクセス制御として使用（より柔軟）
2. NACLを追加防御層として使用（サブネット境界）
3. 最小権限の原則に従う`
        },
        difficulty: 'easy',
        tags: ['VPC', 'Security', 'Networking']
      }
    ]
  },
  'azure': {
    name: { zh: 'Azure 专项', ja: 'Azure 専門' },
    description: { zh: 'Azure 服务和架构面试题', ja: 'Azureサービスとアーキテクチャの面接問題' },
    icon: Cloud,
    gradient: 'from-blue-500 to-indigo-600',
    questions: [
      {
        id: 'az-1',
        question: {
          zh: 'Azure 中 Resource Group 的作用是什么？',
          ja: 'AzureでResource Groupの役割は何ですか？'
        },
        answer: {
          zh: `**Resource Group** 是 Azure 中的逻辑容器，用于组织和管理相关资源。

**核心特点**：
1. **生命周期管理**：删除 RG 会删除其中所有资源
2. **访问控制**：可在 RG 级别设置 RBAC 权限
3. **成本管理**：按 RG 查看和分析成本
4. **标签管理**：统一打标签便于管理
5. **部署单元**：ARM 模板以 RG 为部署目标

**最佳实践**：
- 按应用/环境/生命周期组织资源
- 同一 RG 内资源应有相同生命周期
- 使用命名约定：\`rg-<app>-<env>-<region>\`
- 不同环境（dev/staging/prod）使用不同 RG

**注意**：RG 有区域属性，但可包含其他区域的资源（元数据存储位置）`,
          ja: `**Resource Group** は、関連リソースを整理・管理するためのAzureの論理コンテナです。

**主な特徴**：
1. **ライフサイクル管理**：RG削除で中の全リソースが削除される
2. **アクセス制御**：RGレベルでRBAC権限を設定可能
3. **コスト管理**：RG単位でコストを表示・分析
4. **タグ管理**：統一タグ付けで管理を効率化
5. **デプロイ単位**：ARMテンプレートのデプロイ先

**ベストプラクティス**：
- アプリ/環境/ライフサイクルでリソースを整理
- 同一RG内のリソースは同じライフサイクルに
- 命名規則を使用：\`rg-<app>-<env>-<region>\`
- 異なる環境（dev/staging/prod）は異なるRGを使用

**注意**：RGにはリージョン属性があるが、他リージョンのリソースも含められる（メタデータの保存場所）`
        },
        difficulty: 'easy',
        tags: ['Azure', 'Resource Group', 'Management']
      },
      {
        id: 'az-2',
        question: {
          zh: 'Azure 中实现高可用的 Web 应用架构是什么？',
          ja: 'Azureで高可用性Webアプリのアーキテクチャはどうなりますか？'
        },
        answer: {
          zh: `**Azure 高可用 Web 应用架构**：

\`\`\`
用户 → Traffic Manager (DNS负载均衡)
         ↓
    Application Gateway (L7负载均衡，WAF)
         ↓
    App Service (多实例，Auto-scale)
         ↓
    Azure SQL (Geo-replication)
         ↓
    Blob Storage (RA-GRS)
\`\`\`

**关键组件**：
1. **Traffic Manager**：DNS 级别全球负载均衡，故障转移
2. **Application Gateway**：区域内 L7 负载均衡，WAF 防护
3. **App Service**：至少 2 个实例，配置自动缩放
4. **Availability Zones**：跨可用区部署
5. **Azure SQL**：启用 Geo-replication 或 Failover Groups
6. **Blob Storage**：使用 RA-GRS 实现读取访问异地冗余

**SLA 计算**：
- App Service: 99.95%
- SQL Database: 99.99%
- 组合 SLA ≈ 99.94%`,
          ja: `**Azure 高可用性Webアプリアーキテクチャ**：

\`\`\`
ユーザー → Traffic Manager (DNSロードバランシング)
         ↓
    Application Gateway (L7ロードバランシング，WAF)
         ↓
    App Service (複数インスタンス，Auto-scale)
         ↓
    Azure SQL (Geo-replication)
         ↓
    Blob Storage (RA-GRS)
\`\`\`

**主要コンポーネント**：
1. **Traffic Manager**：DNSレベルのグローバルロードバランシング、フェイルオーバー
2. **Application Gateway**：リージョン内L7ロードバランシング、WAF防御
3. **App Service**：最低2インスタンス、オートスケール設定
4. **Availability Zones**：複数AZにまたがるデプロイ
5. **Azure SQL**：Geo-replicationまたはFailover Groupsを有効化
6. **Blob Storage**：RA-GRSで読み取りアクセス地理冗長性を実現

**SLA計算**：
- App Service: 99.95%
- SQL Database: 99.99%
- 組み合わせSLA ≈ 99.94%`
        },
        difficulty: 'medium',
        tags: ['Azure', 'High Availability', 'Architecture']
      }
    ]
  },
  'ai-ml': {
    name: { zh: 'AI/ML 面试', ja: 'AI/ML 面接' },
    description: { zh: '人工智能和机器学习面试题', ja: '人工知能と機械学習の面接問題' },
    icon: Brain,
    gradient: 'from-purple-500 to-violet-600',
    questions: [
      {
        id: 'ai-1',
        question: {
          zh: '什么是过拟合？如何解决？',
          ja: '過学習とは何ですか？どのように解決しますか？'
        },
        answer: {
          zh: `**过拟合**：模型在训练集上表现很好，但在测试集/新数据上表现差，即模型"记住"了训练数据的噪声而非学习一般规律。

**识别方法**：
- 训练误差低，验证误差高
- 训练/验证损失曲线分叉
- 模型复杂度过高

**解决方案**：
1. **数据层面**
   - 增加训练数据
   - 数据增强（图像：旋转、翻转等）
   - 清理标签噪声

2. **模型层面**
   - 简化模型结构
   - 添加正则化（L1/L2）
   - Dropout
   - Early Stopping
   - Batch Normalization

3. **训练层面**
   - 交叉验证
   - 减小学习率
   - 集成学习（Bagging/Boosting）

**常用指标对比**：训练集准确率 vs 验证集准确率`,
          ja: `**過学習**：モデルが訓練データでは高性能だが、テストデータ/新データでは性能が低い状態。モデルが訓練データのノイズを「記憶」し、一般的なパターンを学習していない。

**識別方法**：
- 訓練誤差が低く、検証誤差が高い
- 訓練/検証損失曲線の乖離
- モデル複雑度が高すぎる

**解決策**：
1. **データ面**
   - 訓練データの増加
   - データ拡張（画像：回転、反転など）
   - ラベルノイズのクリーニング

2. **モデル面**
   - モデル構造の簡略化
   - 正則化の追加（L1/L2）
   - Dropout
   - Early Stopping
   - Batch Normalization

3. **訓練面**
   - 交差検証
   - 学習率の低減
   - アンサンブル学習（Bagging/Boosting）

**よく使う指標比較**：訓練セット精度 vs 検証セット精度`
        },
        difficulty: 'easy',
        tags: ['ML Basics', 'Overfitting', 'Regularization']
      },
      {
        id: 'ai-2',
        question: {
          zh: '解释 Transformer 架构中的 Self-Attention 机制。',
          ja: 'TransformerアーキテクチャのSelf-Attention機構を説明してください。'
        },
        answer: {
          zh: `**Self-Attention** 允许序列中的每个位置关注序列中的所有其他位置，捕获长距离依赖。

**核心公式**：
\`\`\`
Attention(Q, K, V) = softmax(QK^T / √d_k) V
\`\`\`

**计算步骤**：
1. **生成 Q、K、V**：输入 X 分别乘以权重矩阵 W_Q、W_K、W_V
2. **计算注意力分数**：Q 和 K 的点积，除以 √d_k（缩放防止梯度消失）
3. **Softmax 归一化**：得到注意力权重
4. **加权求和**：用注意力权重对 V 加权

**Multi-Head Attention**：
- 并行运行多个注意力头
- 每个头学习不同的表示子空间
- 最后拼接并线性变换

**优势**：
- 并行计算（相比 RNN）
- 直接建模长距离依赖
- 可解释性（注意力权重可视化）`,
          ja: `**Self-Attention** は、シーケンス内の各位置が他のすべての位置に注目でき、長距離依存関係を捉えます。

**コア公式**：
\`\`\`
Attention(Q, K, V) = softmax(QK^T / √d_k) V
\`\`\`

**計算ステップ**：
1. **Q、K、V生成**：入力Xに重み行列W_Q、W_K、W_Vをそれぞれ乗算
2. **注意スコア計算**：QとKの内積、√d_kで除算（スケーリングで勾配消失防止）
3. **Softmax正規化**：注意重みを取得
4. **加重和**：注意重みでVを加重

**Multi-Head Attention**：
- 複数の注意ヘッドを並列実行
- 各ヘッドが異なる表現部分空間を学習
- 最後に連結して線形変換

**利点**：
- 並列計算（RNNと比較）
- 長距離依存関係の直接モデル化
- 解釈可能性（注意重みの可視化）`
        },
        difficulty: 'hard',
        tags: ['Transformer', 'Attention', 'Deep Learning']
      },
      {
        id: 'ai-3',
        question: {
          zh: '什么是 RAG（检索增强生成）？为什么需要它？',
          ja: 'RAG（Retrieval-Augmented Generation）とは何ですか？なぜ必要ですか？'
        },
        answer: {
          zh: `**RAG (Retrieval-Augmented Generation)** 是一种结合检索系统和生成模型的技术，让 LLM 能够访问外部知识。

**为什么需要 RAG**：
1. **知识更新**：LLM 训练数据有截止日期，RAG 可访问最新信息
2. **减少幻觉**：基于真实文档生成，提高准确性
3. **领域知识**：接入私有/专业知识库
4. **成本效益**：比微调 LLM 更便宜
5. **可追溯性**：可以引用来源

**RAG 流程**：
\`\`\`
用户问题 → 向量化 → 向量数据库检索
    ↓
相关文档 + 原始问题 → LLM → 生成答案
\`\`\`

**关键组件**：
- **Embedding Model**：将文本转为向量
- **Vector Database**：存储和检索向量（Pinecone、ChromaDB）
- **LLM**：基于检索结果生成答案

**优化方向**：检索质量、chunk 策略、重排序、混合检索`,
          ja: `**RAG (Retrieval-Augmented Generation)** は、検索システムと生成モデルを組み合わせた技術で、LLMが外部知識にアクセスできるようにします。

**なぜRAGが必要か**：
1. **知識更新**：LLMの訓練データには期限があり、RAGで最新情報にアクセス可能
2. **ハルシネーション削減**：実際のドキュメントに基づいて生成、精度向上
3. **ドメイン知識**：プライベート/専門知識ベースに接続
4. **コスト効率**：LLMのファインチューニングより安価
5. **追跡可能性**：ソースを引用可能

**RAGフロー**：
\`\`\`
ユーザー質問 → ベクトル化 → ベクトルDB検索
    ↓
関連ドキュメント + 元の質問 → LLM → 回答生成
\`\`\`

**主要コンポーネント**：
- **Embedding Model**：テキストをベクトルに変換
- **Vector Database**：ベクトルの保存と検索（Pinecone、ChromaDB）
- **LLM**：検索結果に基づいて回答生成

**最適化方向**：検索品質、チャンク戦略、リランキング、ハイブリッド検索`
        },
        difficulty: 'medium',
        tags: ['RAG', 'LLM', 'Vector Database']
      },
      {
        id: 'ai-4',
        question: {
          zh: '解释 Fine-tuning 和 Prompt Engineering 的区别，什么时候用哪个？',
          ja: 'Fine-tuningとPrompt Engineeringの違いを説明し、どのような場合にどちらを使うべきですか？'
        },
        answer: {
          zh: `**Prompt Engineering（提示工程）**：
- 通过设计输入提示词来引导模型输出
- 不修改模型权重
- 优点：快速、无需训练、成本低
- 缺点：上下文长度限制、不稳定

**Fine-tuning（微调）**：
- 在预训练模型基础上，用特定数据继续训练
- 修改模型权重
- 优点：更好的任务适应性、更稳定的输出
- 缺点：需要标注数据、训练成本高

**选择指南**：
| 场景 | 推荐方法 |
|------|---------|
| 快速原型 | Prompt Engineering |
| 通用任务 | Prompt Engineering |
| 特定领域/风格 | Fine-tuning |
| 敏感数据 | Fine-tuning (本地部署) |
| 高性能要求 | Fine-tuning |

**混合方案**：
- 先用 Prompt Engineering 验证可行性
- 效果不够再考虑 Fine-tuning
- 可以两者结合使用`,
          ja: `**Prompt Engineering（プロンプトエンジニアリング）**：
- 入力プロンプトの設計でモデル出力を誘導
- モデル重みは変更しない
- 利点：高速、訓練不要、低コスト
- 欠点：コンテキスト長制限、不安定

**Fine-tuning（ファインチューニング）**：
- 事前学習モデルをベースに特定データで追加訓練
- モデル重みを変更
- 利点：タスク適応性向上、安定した出力
- 欠点：ラベル付きデータが必要、訓練コスト高

**選択ガイド**：
| シナリオ | 推奨方法 |
|---------|---------|
| 高速プロトタイプ | Prompt Engineering |
| 汎用タスク | Prompt Engineering |
| 特定ドメイン/スタイル | Fine-tuning |
| 機密データ | Fine-tuning (ローカルデプロイ) |
| 高性能要件 | Fine-tuning |

**ハイブリッド方式**：
- まずPrompt Engineeringで実現可能性を検証
- 効果不十分ならFine-tuningを検討
- 両方を組み合わせて使用可能`
        },
        difficulty: 'medium',
        tags: ['Fine-tuning', 'Prompt Engineering', 'LLM']
      },
      {
        id: 'ai-5',
        question: {
          zh: '什么是 Gradient Descent？解释 SGD、Mini-batch GD、Adam 的区别。',
          ja: 'Gradient Descentとは何ですか？SGD、Mini-batch GD、Adamの違いを説明してください。'
        },
        answer: {
          zh: `**梯度下降（Gradient Descent）**：
通过计算损失函数对参数的梯度，沿梯度反方向更新参数以最小化损失。

**更新公式**：θ = θ - α × ∇L(θ)

**三种变体**：

**1. Batch GD（批量梯度下降）**：
- 使用全部数据计算梯度
- 优点：稳定收敛
- 缺点：计算慢，内存大

**2. SGD（随机梯度下降）**：
- 每次用一个样本更新
- 优点：速度快，可跳出局部最优
- 缺点：噪声大，收敛不稳定

**3. Mini-batch GD**：
- 使用一小批数据（如 32/64/128）
- 平衡了效率和稳定性
- 最常用的方法

**Adam 优化器**：
- 结合 Momentum 和 RMSprop
- 自适应学习率
- 对超参数不敏感
- 公式：m_t = β₁m_{t-1} + (1-β₁)g_t
        v_t = β₂v_{t-1} + (1-β₂)g_t²

**选择建议**：
- 通用任务：Adam
- 图像任务：SGD + Momentum
- 需要泛化：SGD 通常比 Adam 更好`,
          ja: `**勾配降下法（Gradient Descent）**：
損失関数のパラメータに対する勾配を計算し、勾配の逆方向にパラメータを更新して損失を最小化。

**更新式**：θ = θ - α × ∇L(θ)

**3つの変種**：

**1. Batch GD（バッチ勾配降下）**：
- 全データで勾配を計算
- 利点：安定した収束
- 欠点：計算が遅い、メモリ大

**2. SGD（確率的勾配降下）**：
- 1サンプルずつ更新
- 利点：高速、局所最適から脱出可能
- 欠点：ノイズ大、収束不安定

**3. Mini-batch GD**：
- 小バッチデータを使用（32/64/128など）
- 効率と安定性のバランス
- 最も一般的な方法

**Adamオプティマイザ**：
- MomentumとRMSpropを組み合わせ
- 適応的学習率
- ハイパーパラメータに対して堅牢
- 公式：m_t = β₁m_{t-1} + (1-β₁)g_t
        v_t = β₂v_{t-1} + (1-β₂)g_t²

**選択の目安**：
- 汎用タスク：Adam
- 画像タスク：SGD + Momentum
- 汎化性能重視：SGDがAdamより良い場合が多い`
        },
        difficulty: 'medium',
        tags: ['Optimization', 'SGD', 'Adam', 'Deep Learning']
      },
      {
        id: 'ai-6',
        question: {
          zh: '什么是 Tokenization？比较 BPE、WordPiece、SentencePiece。',
          ja: 'Tokenizationとは何ですか？BPE、WordPiece、SentencePieceを比較してください。'
        },
        answer: {
          zh: `**Tokenization（分词）**：
将文本切分成模型可处理的基本单元（token）的过程。

**三种主流算法**：

**1. BPE (Byte Pair Encoding)**：
- 从字符开始，迭代合并最频繁的相邻对
- 用于：GPT 系列、LLaMA
- 优点：有效处理未知词、压缩效率高
- 示例："lowest" → ["low", "est"]

**2. WordPiece**：
- 类似 BPE，但用似然度选择合并
- 用于：BERT、DistilBERT
- 使用 "##" 标记词内部分词
- 示例："playing" → ["play", "##ing"]

**3. SentencePiece**：
- 直接在原始文本上训练，不需预分词
- 语言无关，支持中日韩等语言
- 用于：T5、ALBERT、mBART
- 使用 "▁" 表示空格

**对比总结**：
| 特性 | BPE | WordPiece | SentencePiece |
|-----|-----|-----------|---------------|
| 预分词 | 需要 | 需要 | 不需要 |
| 语言 | 英语为主 | 英语为主 | 多语言 |
| 代表模型 | GPT | BERT | T5 |`,
          ja: `**Tokenization（トークン化）**：
テキストをモデルが処理できる基本単位（トークン）に分割するプロセス。

**3つの主要アルゴリズム**：

**1. BPE (Byte Pair Encoding)**：
- 文字から開始し、最頻出の隣接ペアを反復的に結合
- 使用：GPTシリーズ、LLaMA
- 利点：未知語の効果的処理、高い圧縮効率
- 例："lowest" → ["low", "est"]

**2. WordPiece**：
- BPEに類似、尤度で結合を選択
- 使用：BERT、DistilBERT
- "##" で単語内分割を示す
- 例："playing" → ["play", "##ing"]

**3. SentencePiece**：
- 生テキストで直接訓練、前処理不要
- 言語非依存、中日韓語に対応
- 使用：T5、ALBERT、mBART
- "▁" でスペースを表現

**比較まとめ**：
| 特性 | BPE | WordPiece | SentencePiece |
|-----|-----|-----------|---------------|
| 前処理 | 必要 | 必要 | 不要 |
| 言語 | 英語中心 | 英語中心 | 多言語 |
| 代表モデル | GPT | BERT | T5 |`
        },
        difficulty: 'medium',
        tags: ['NLP', 'Tokenization', 'BPE', 'LLM']
      },
      {
        id: 'ai-7',
        question: {
          zh: '什么是 LoRA？它如何实现高效微调？',
          ja: 'LoRAとは何ですか？どのように効率的なファインチューニングを実現しますか？'
        },
        answer: {
          zh: `**LoRA (Low-Rank Adaptation)**：
一种参数高效的微调方法，通过低秩矩阵分解大幅减少可训练参数。

**核心思想**：
- 冻结预训练权重 W
- 添加低秩分解 ΔW = BA
- 其中 B ∈ R^(d×r), A ∈ R^(r×k), r << min(d, k)

**前向传播**：
\`\`\`
h = Wx + BAx = Wx + ΔWx
\`\`\`

**优势**：
1. **参数效率**：r=8 时，参数量减少 10000+ 倍
2. **内存效率**：只需存储小矩阵
3. **无推理延迟**：可合并回原权重
4. **可组合**：多个 LoRA 可切换/组合

**超参数**：
- **rank (r)**：通常 4-64，越大容量越大
- **alpha**：缩放因子，通常等于 rank
- **target_modules**：q_proj, v_proj, k_proj, o_proj

**变体**：
- **QLoRA**：结合 4-bit 量化，进一步降低内存
- **AdaLoRA**：自适应分配秩

**代码示例**：
\`\`\`python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=8, lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.1
)
model = get_peft_model(base_model, config)
\`\`\``,
          ja: `**LoRA (Low-Rank Adaptation)**：
低ランク行列分解により訓練可能パラメータを大幅削減する、パラメータ効率の良いファインチューニング手法。

**コアアイデア**：
- 事前学習済み重みWを凍結
- 低ランク分解 ΔW = BA を追加
- B ∈ R^(d×r), A ∈ R^(r×k), r << min(d, k)

**順伝播**：
\`\`\`
h = Wx + BAx = Wx + ΔWx
\`\`\`

**利点**：
1. **パラメータ効率**：r=8で10000倍以上削減
2. **メモリ効率**：小さな行列のみ保存
3. **推論遅延なし**：元の重みにマージ可能
4. **組み合わせ可能**：複数LoRAの切替/組合せ

**ハイパーパラメータ**：
- **rank (r)**：通常4-64、大きいほど容量大
- **alpha**：スケーリング係数、通常rankと同じ
- **target_modules**：q_proj, v_proj, k_proj, o_proj

**変種**：
- **QLoRA**：4-bit量子化と組み合わせ、さらにメモリ削減
- **AdaLoRA**：適応的にランクを割り当て

**コード例**：
\`\`\`python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=8, lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.1
)
model = get_peft_model(base_model, config)
\`\`\``
        },
        difficulty: 'hard',
        tags: ['LoRA', 'PEFT', 'Fine-tuning', 'LLM']
      },
      {
        id: 'ai-8',
        question: {
          zh: '解释 Batch Normalization 的原理和作用。',
          ja: 'Batch Normalizationの原理と効果を説明してください。'
        },
        answer: {
          zh: `**Batch Normalization**：
对每一层的输入进行归一化，使其均值为0、方差为1，然后通过可学习参数缩放和平移。

**公式**：
\`\`\`
μ = mean(x)           # batch均值
σ² = var(x)           # batch方差
x̂ = (x - μ) / √(σ² + ε)  # 标准化
y = γx̂ + β           # 缩放和平移
\`\`\`

**作用**：
1. **加速训练**：允许更高学习率
2. **减轻梯度问题**：缓解梯度消失/爆炸
3. **正则化效果**：batch 采样引入噪声
4. **减少初始化敏感性**

**训练 vs 推理**：
- 训练时：使用当前 batch 统计量
- 推理时：使用训练时累积的 running mean/var

**Layer Norm vs Batch Norm**：
| 特性 | Batch Norm | Layer Norm |
|-----|------------|------------|
| 归一化维度 | batch | feature |
| batch依赖 | 是 | 否 |
| 适用场景 | CNN | Transformer/RNN |
| 序列长度 | 固定 | 可变 |

**常见问题**：
- 小 batch 时效果差 → 用 Group Norm
- RNN/Transformer → 用 Layer Norm`,
          ja: `**Batch Normalization**：
各層の入力を正規化し、平均0・分散1にした後、学習可能パラメータでスケーリングとシフト。

**公式**：
\`\`\`
μ = mean(x)           # batch平均
σ² = var(x)           # batch分散
x̂ = (x - μ) / √(σ² + ε)  # 標準化
y = γx̂ + β           # スケーリングとシフト
\`\`\`

**効果**：
1. **訓練高速化**：より高い学習率が使用可能
2. **勾配問題緩和**：勾配消失/爆発を軽減
3. **正則化効果**：batchサンプリングがノイズを導入
4. **初期化への感度低減**

**訓練 vs 推論**：
- 訓練時：現在のbatch統計量を使用
- 推論時：訓練中に蓄積したrunning mean/varを使用

**Layer Norm vs Batch Norm**：
| 特性 | Batch Norm | Layer Norm |
|-----|------------|------------|
| 正規化次元 | batch | feature |
| batch依存 | あり | なし |
| 適用場面 | CNN | Transformer/RNN |
| 系列長 | 固定 | 可変 |

**よくある問題**：
- 小batchで効果低下 → Group Normを使用
- RNN/Transformer → Layer Normを使用`
        },
        difficulty: 'medium',
        tags: ['Batch Norm', 'Normalization', 'Deep Learning']
      },
      {
        id: 'ai-9',
        question: {
          zh: '什么是 LLM 幻觉（Hallucination）？如何减轻？',
          ja: 'LLMのハルシネーション（幻覚）とは何ですか？どのように軽減しますか？'
        },
        answer: {
          zh: `**LLM 幻觉**：
模型生成看似合理但实际错误或无中生有的内容。

**类型**：
1. **事实性幻觉**：生成错误的事实
2. **忠实性幻觉**：与输入/上下文矛盾
3. **无关幻觉**：生成与任务无关的内容

**产生原因**：
- 训练数据中的错误或偏差
- 模型过度泛化
- 知识截止日期限制
- 解码策略（高温度）

**缓解策略**：

**1. 检索增强（RAG）**：
- 引入外部知识源
- 基于真实文档生成

**2. 提示工程**：
- 明确指示"如果不确定就说不知道"
- 要求提供来源引用

**3. 模型层面**：
- RLHF 训练减少幻觉
- 事实核查模型
- Self-consistency 解码

**4. 后处理**：
- 输出验证和过滤
- 人工审核关键内容

**5. 系统设计**：
- 限制输出范围
- 多步验证流程
- 置信度评估`,
          ja: `**LLMハルシネーション**：
モデルが一見合理的だが実際には誤りや根拠のない内容を生成すること。

**種類**：
1. **事実ハルシネーション**：誤った事実を生成
2. **忠実性ハルシネーション**：入力/コンテキストと矛盾
3. **無関係ハルシネーション**：タスクと無関係な内容

**原因**：
- 訓練データの誤りやバイアス
- モデルの過度な汎化
- 知識カットオフの制限
- デコード戦略（高温度）

**軽減策**：

**1. 検索拡張（RAG）**：
- 外部知識ソースを導入
- 実際のドキュメントに基づいて生成

**2. プロンプトエンジニアリング**：
- 「不確かな場合は分からないと言う」と明示
- ソース引用を要求

**3. モデルレベル**：
- RLHFでハルシネーション削減
- ファクトチェックモデル
- Self-consistencyデコード

**4. 後処理**：
- 出力の検証とフィルタリング
- 重要コンテンツの人間レビュー

**5. システム設計**：
- 出力範囲の制限
- 多段階検証フロー
- 信頼度評価`
        },
        difficulty: 'medium',
        tags: ['Hallucination', 'LLM', 'RAG', 'Safety']
      },
      {
        id: 'ai-10',
        question: {
          zh: '解释 CNN 中的卷积操作和池化层的作用。',
          ja: 'CNNにおける畳み込み操作とプーリング層の役割を説明してください。'
        },
        answer: {
          zh: `**卷积操作（Convolution）**：
使用滤波器（kernel）在输入上滑动，执行点积运算，提取局部特征。

**核心概念**：
- **Kernel Size**：滤波器大小（如 3×3）
- **Stride**：滑动步长
- **Padding**：边缘填充（same/valid）
- **Channels**：输入/输出通道数

**输出尺寸计算**：
\`\`\`
output_size = (input_size - kernel_size + 2*padding) / stride + 1
\`\`\`

**卷积的优势**：
1. **参数共享**：同一滤波器在整个输入上滑动
2. **局部连接**：只关注局部区域
3. **平移不变性**：特征位置不影响检测

**池化层（Pooling）**：
降低特征图尺寸，保留重要信息。

**类型**：
- **Max Pooling**：取最大值，保留最强特征
- **Average Pooling**：取平均值，更平滑
- **Global Pooling**：整个特征图压缩为一个值

**池化的作用**：
1. 减少参数量和计算量
2. 增加感受野
3. 提供一定的平移不变性
4. 防止过拟合

**现代趋势**：
- 使用 stride>1 的卷积代替池化
- 全卷积网络（FCN）`,
          ja: `**畳み込み操作（Convolution）**：
フィルタ（カーネル）を入力上でスライドさせ、内積を計算し、局所特徴を抽出。

**コア概念**：
- **Kernel Size**：フィルタサイズ（例：3×3）
- **Stride**：スライドステップ
- **Padding**：エッジパディング（same/valid）
- **Channels**：入力/出力チャンネル数

**出力サイズ計算**：
\`\`\`
output_size = (input_size - kernel_size + 2*padding) / stride + 1
\`\`\`

**畳み込みの利点**：
1. **パラメータ共有**：同じフィルタが入力全体をスライド
2. **局所接続**：局所領域のみに注目
3. **平行移動不変性**：特徴位置が検出に影響しない

**プーリング層（Pooling）**：
特徴マップサイズを削減し、重要情報を保持。

**種類**：
- **Max Pooling**：最大値を取得、最強特徴を保持
- **Average Pooling**：平均値を取得、より滑らか
- **Global Pooling**：特徴マップ全体を1値に圧縮

**プーリングの役割**：
1. パラメータと計算量の削減
2. 受容野の拡大
3. 平行移動不変性の提供
4. 過学習の防止

**現代のトレンド**：
- stride>1の畳み込みでプーリングを代替
- 全畳み込みネットワーク（FCN）`
        },
        difficulty: 'easy',
        tags: ['CNN', 'Convolution', 'Pooling', 'Deep Learning']
      },
      {
        id: 'ai-11',
        question: {
          zh: '什么是 Agent？如何设计一个 LLM Agent 系统？',
          ja: 'Agentとは何ですか？LLM Agentシステムをどのように設計しますか？'
        },
        answer: {
          zh: `**LLM Agent**：
具有自主决策能力的 AI 系统，能够感知环境、规划行动、执行任务并学习改进。

**核心组件**：

**1. 规划（Planning）**：
- 任务分解（Task Decomposition）
- 反思与改进（Self-reflection）
- 示例：ReAct、Chain-of-Thought

**2. 记忆（Memory）**：
- 短期记忆：上下文窗口
- 长期记忆：向量数据库
- 工作记忆：当前任务状态

**3. 工具使用（Tool Use）**：
- API 调用
- 代码执行
- 数据库查询
- 网络搜索

**4. 行动（Action）**：
- 执行工具调用
- 与环境交互
- 生成输出

**设计模式**：
\`\`\`
while not task_complete:
    1. 观察环境状态
    2. 思考下一步（LLM推理）
    3. 选择并执行工具
    4. 获取反馈
    5. 更新记忆
    6. 检查任务是否完成
\`\`\`

**关键框架**：
- LangChain Agents
- AutoGPT / BabyAGI
- CrewAI（多 Agent 协作）

**挑战**：
- 循环/卡住处理
- 成本控制
- 安全边界
- 评估困难`,
          ja: `**LLM Agent**：
自律的な意思決定能力を持つAIシステム。環境を感知し、行動を計画し、タスクを実行し、学習・改善できる。

**コアコンポーネント**：

**1. 計画（Planning）**：
- タスク分解（Task Decomposition）
- 反省と改善（Self-reflection）
- 例：ReAct、Chain-of-Thought

**2. 記憶（Memory）**：
- 短期記憶：コンテキストウィンドウ
- 長期記憶：ベクトルデータベース
- ワーキングメモリ：現在のタスク状態

**3. ツール使用（Tool Use）**：
- API呼び出し
- コード実行
- データベースクエリ
- Web検索

**4. 行動（Action）**：
- ツール呼び出しの実行
- 環境との相互作用
- 出力の生成

**設計パターン**：
\`\`\`
while not task_complete:
    1. 環境状態を観察
    2. 次のステップを思考（LLM推論）
    3. ツールを選択・実行
    4. フィードバックを取得
    5. 記憶を更新
    6. タスク完了を確認
\`\`\`

**主要フレームワーク**：
- LangChain Agents
- AutoGPT / BabyAGI
- CrewAI（マルチAgent協調）

**課題**：
- ループ/スタック処理
- コスト管理
- 安全境界
- 評価の困難さ`
        },
        difficulty: 'hard',
        tags: ['Agent', 'LLM', 'Tool Use', 'Architecture']
      },
      {
        id: 'ai-12',
        question: {
          zh: '什么是混合精度训练（Mixed Precision Training）？',
          ja: '混合精度訓練（Mixed Precision Training）とは何ですか？'
        },
        answer: {
          zh: `**混合精度训练**：
同时使用 FP32（32位浮点）和 FP16/BF16（16位浮点）进行训练，以加速计算并减少内存使用。

**工作原理**：
1. **主权重**：FP32 存储（保持精度）
2. **前向/反向传播**：FP16 计算（加速）
3. **梯度累积**：FP32（防止下溢）

**关键技术**：

**1. Loss Scaling**：
- 问题：FP16 梯度可能下溢（接近0）
- 解决：将 loss 乘以 scale factor，反向传播后除回

**2. 动态 Loss Scaling**：
- 自动调整 scale factor
- 遇到 NaN/Inf 时减小
- 训练稳定时增大

**优势**：
- 2-3x 加速（Tensor Cores）
- 内存减半
- 更大 batch size

**BF16 vs FP16**：
| 特性 | FP16 | BF16 |
|-----|------|------|
| 指数位 | 5 | 8 |
| 尾数位 | 10 | 7 |
| 动态范围 | 小 | 与FP32相同 |
| 精度 | 高 | 低 |
| Loss Scaling | 需要 | 通常不需要 |

**PyTorch 示例**：
\`\`\`python
scaler = torch.cuda.amp.GradScaler()
with torch.cuda.amp.autocast():
    output = model(input)
    loss = criterion(output, target)
scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()
\`\`\``,
          ja: `**混合精度訓練**：
FP32（32ビット浮動小数点）とFP16/BF16（16ビット）を同時に使用し、計算を高速化しメモリ使用量を削減。

**動作原理**：
1. **マスター重み**：FP32で保存（精度維持）
2. **順伝播/逆伝播**：FP16で計算（高速化）
3. **勾配累積**：FP32（アンダーフロー防止）

**キーテクニック**：

**1. Loss Scaling**：
- 問題：FP16勾配がアンダーフロー（0に近づく）
- 解決：lossにscale factorを乗算、逆伝播後に除算

**2. 動的Loss Scaling**：
- scale factorを自動調整
- NaN/Inf発生時に減少
- 訓練安定時に増加

**利点**：
- 2-3倍高速化（Tensor Cores）
- メモリ半減
- より大きなbatch size

**BF16 vs FP16**：
| 特性 | FP16 | BF16 |
|-----|------|------|
| 指数ビット | 5 | 8 |
| 仮数ビット | 10 | 7 |
| ダイナミックレンジ | 小 | FP32と同等 |
| 精度 | 高 | 低 |
| Loss Scaling | 必要 | 通常不要 |

**PyTorch例**：
\`\`\`python
scaler = torch.cuda.amp.GradScaler()
with torch.cuda.amp.autocast():
    output = model(input)
    loss = criterion(output, target)
scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()
\`\`\``
        },
        difficulty: 'hard',
        tags: ['Mixed Precision', 'Training', 'Optimization', 'GPU']
      }
    ]
  },
  'system-design': {
    name: { zh: '系统设计', ja: 'システム設計' },
    description: { zh: '大规模系统设计面试题', ja: '大規模システム設計の面接問題' },
    icon: Database,
    gradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'sd-1',
        question: {
          zh: '设计一个 URL 短链接服务（如 bit.ly）',
          ja: 'URL短縮サービス（bit.lyのような）を設計してください'
        },
        answer: {
          zh: `**功能需求**：
- 生成短链接
- 重定向到原始 URL
- 可选：自定义短链、过期时间、统计

**非功能需求**：
- 高可用、低延迟（<100ms）
- 每天 1 亿次读取，1000 万次写入

**系统设计**：

\`\`\`
客户端 → 负载均衡 → API 服务器
                    ↓
              短链生成器 → 数据库 (短链 → 长链映射)
                    ↓
                 缓存层 (Redis)
\`\`\`

**核心算法 - Base62 编码**：
- 使用自增 ID 或分布式 ID（如 Snowflake）
- Base62 编码：[0-9a-zA-Z]，7 位可表示 62^7 ≈ 3.5 万亿

**数据库设计**：
\`\`\`sql
CREATE TABLE urls (
  id BIGINT PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE,
  long_url TEXT,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
\`\`\`

**优化**：
- Redis 缓存热门短链
- 数据库分片（按 short_code 哈希）
- CDN 加速重定向`,
          ja: `**機能要件**：
- 短縮リンク生成
- 元のURLへリダイレクト
- オプション：カスタム短縮、有効期限、統計

**非機能要件**：
- 高可用性、低レイテンシ（<100ms）
- 1日1億回の読み取り、1000万回の書き込み

**システム設計**：

\`\`\`
クライアント → ロードバランサー → APIサーバー
                    ↓
              短縮リンク生成器 → データベース (短縮 → 元URL)
                    ↓
                 キャッシュ層 (Redis)
\`\`\`

**コアアルゴリズム - Base62エンコーディング**：
- 自動増分IDまたは分散ID（Snowflakeなど）を使用
- Base62エンコーディング：[0-9a-zA-Z]、7桁で62^7 ≈ 3.5兆

**データベース設計**：
\`\`\`sql
CREATE TABLE urls (
  id BIGINT PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE,
  long_url TEXT,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
\`\`\`

**最適化**：
- Redisで人気短縮リンクをキャッシュ
- データベースシャーディング（short_codeハッシュ）
- CDNでリダイレクトを高速化`
        },
        difficulty: 'hard',
        tags: ['System Design', 'URL Shortener', 'Scalability']
      }
    ]
  },
  'behavioral': {
    name: { zh: '行为面试', ja: '行動面接' },
    description: { zh: 'STAR 方法行为面试问题', ja: 'STAR法による行動面接問題' },
    icon: MessageCircle,
    gradient: 'from-rose-500 to-pink-600',
    questions: [
      {
        id: 'bh-1',
        question: {
          zh: '讲一个你解决复杂技术问题的经历。',
          ja: '複雑な技術的問題を解決した経験を教えてください。'
        },
        answer: {
          zh: `**STAR 方法回答框架**：

**Situation（情境）**：
"在之前的项目中，我们的微服务系统在高峰期出现了严重的性能问题，API 响应时间从 200ms 飙升到 5s，影响了 30% 的用户。"

**Task（任务）**：
"作为技术负责人，我需要在 48 小时内定位并解决问题，同时不影响正常业务。"

**Action（行动）**：
1. "首先，我使用 APM 工具分析调用链，发现数据库查询是瓶颈"
2. "然后，我检查了慢查询日志，发现一个 N+1 查询问题"
3. "我优化了查询逻辑，添加了索引，并引入了 Redis 缓存"
4. "同时，我配置了熔断器防止级联故障"

**Result（结果）**：
"优化后，API 响应时间降到 100ms，系统吞吐量提升 3 倍。这个经验让我建立了系统的性能监控流程。"`,
          ja: `**STAR法回答フレームワーク**：

**Situation（状況）**：
「以前のプロジェクトで、マイクロサービスシステムがピーク時に深刻なパフォーマンス問題を発生。API応答時間が200msから5sに急上昇し、30%のユーザーに影響。」

**Task（課題）**：
「技術リーダーとして、48時間以内に問題を特定・解決し、通常業務に影響を与えないようにする必要がありました。」

**Action（行動）**：
1. 「まず、APMツールでコールチェーンを分析し、データベースクエリがボトルネックと判明」
2. 「次に、スロークエリログを確認し、N+1クエリ問題を発見」
3. 「クエリロジックを最適化し、インデックスを追加、Redisキャッシュを導入」
4. 「同時に、サーキットブレーカーを設定してカスケード障害を防止」

**Result（結果）**：
「最適化後、API応答時間は100msに低下、システムスループットは3倍向上。この経験から体系的なパフォーマンス監視フローを確立しました。」`
        },
        tips: {
          zh: '准备 3-5 个 STAR 故事，涵盖领导力、冲突解决、失败教训等主题',
          ja: '3-5個のSTARストーリーを準備。リーダーシップ、対立解決、失敗からの学びなどのテーマをカバー'
        },
        difficulty: 'medium',
        tags: ['Behavioral', 'STAR', 'Problem Solving']
      }
    ]
  }
};

const QuestionCard: React.FC<{
  question: Question;
  language: string;
  index: number;
}> = ({ question, language, index }) => {
  const [expanded, setExpanded] = useState(false);
  const lang = language === 'ja' ? 'ja' : 'zh';

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700'
  };

  const difficultyLabels = {
    easy: { zh: '简单', ja: '易' },
    medium: { zh: '中等', ja: '中' },
    hard: { zh: '困难', ja: '難' }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-slate-800 pr-8">{question.question[lang]}</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`px-2 py-0.5 text-xs font-medium rounded ${difficultyColors[question.difficulty]}`}>
                {difficultyLabels[question.difficulty][lang]}
              </span>
              {question.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <ChevronDown
            size={20}
            className={`text-slate-400 transition-transform flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-100">
          <div className="pt-4 prose prose-sm max-w-none">
            <div className="flex items-center gap-2 text-emerald-600 font-medium mb-2">
              <CheckCircle2 size={16} />
              <span>{language === 'ja' ? '参考回答' : '参考答案'}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">
              {question.answer[lang]}
            </div>
          </div>

          {question.tips && (
            <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <Lightbulb size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <span className="font-medium">{language === 'ja' ? 'ヒント：' : '提示：'}</span>
                {question.tips[lang]}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function InterviewQuestionsPage() {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const [selectedCategory, setSelectedCategory] = useState<Category>('cloud-general');

  const category = interviewData[selectedCategory];
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
                {language === 'ja' ? '面接問題集' : '面试题库'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-slate-400" />
              <span className="font-semibold">StudyForge</span>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 lg:px-10">
          <div className="flex overflow-x-auto gap-1 py-2">
            {(Object.keys(interviewData) as Category[]).map((cat) => {
              const Icon = interviewData[cat].icon;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-rose-100 text-rose-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{interviewData[cat].name[lang]}</span>
                  <span className="text-xs bg-slate-200 px-1.5 py-0.5 rounded">
                    {interviewData[cat].questions.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 lg:px-10 py-8">
        {/* Category Header */}
        <div className={`bg-gradient-to-r ${category.gradient} rounded-lg p-6 text-white mb-6`}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <category.icon size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{category.name[lang]}</h2>
              <p className="text-white/80 text-sm">{category.description[lang]}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/20 rounded-lg px-3 py-1.5 text-sm">
              <Star size={14} className="inline mr-1" />
              {category.questions.length} {language === 'ja' ? '問' : '题'}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {category.questions.map((q, index) => (
            <QuestionCard key={q.id} question={q} language={language} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-4 mt-8">
        <div className="px-6 lg:px-10">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">StudyForge</span>
            <span className="text-slate-400">{language === 'ja' ? 'AI学習プラットフォーム' : 'AI 学习平台'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
