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
  TrendingUp
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';

type Provider = 'general' | 'aws' | 'azure' | 'gcp';

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
