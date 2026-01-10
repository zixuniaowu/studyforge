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
