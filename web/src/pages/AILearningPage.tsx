import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  Cpu,
  Database,
  Lightbulb,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Target,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Play,
  Globe,
  Code2,
  Layers,
  Star
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import {
  AITimelineSVG,
  MLTypesSVG,
  NeuralNetworkSVG,
  TransformerSVG,
  LLMWorkflowSVG,
  AttentionSVG
} from '../components/AIIntro/SVGIllustrations';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface LessonSection {
  id: string;
  title: string;
  icon: React.FC<{ className?: string; size?: number }>;
  color: string;
  content: React.ReactNode;
  quiz: QuizQuestion[];
}

const AILearningPage: React.FC = () => {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const lang = language === 'ja' ? 'ja' : 'zh';

  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Lesson sections with content and quizzes
  const sections: LessonSection[] = [
    {
      id: 'intro',
      title: lang === 'ja' ? 'AI とは？' : '什么是 AI？',
      icon: Lightbulb,
      color: 'violet',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-3">
              {lang === 'ja' ? '人工知能（AI）' : '人工智能（AI）'}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {lang === 'ja'
                ? '人工知能とは、人間の知能を模倣し、学習、推論、問題解決などのタスクを実行できるコンピュータシステムです。'
                : '人工智能是能够模拟人类智能，执行学习、推理、问题解决等任务的计算机系统。'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Target, title: lang === 'ja' ? '弱いAI（ANI）' : '弱人工智能', desc: lang === 'ja' ? '特定タスクに特化、現在の全てのAI' : '专注特定任务，当前所有AI', color: 'blue' },
              { icon: Zap, title: lang === 'ja' ? '汎用AI（AGI）' : '通用人工智能', desc: lang === 'ja' ? '人間レベルの汎用知能' : '人类水平的通用智能', color: 'amber' },
              { icon: Globe, title: lang === 'ja' ? '超AI（ASI）' : '超级人工智能', desc: lang === 'ja' ? '人間を超える知能、理論段階' : '超越人类的智能，理论阶段', color: 'rose' }
            ].map((item, i) => (
              <div key={i} className={`p-5 bg-${item.color}-50 rounded-xl border-2 border-${item.color}-200 hover:shadow-lg transition-all`}>
                <div className={`w-12 h-12 bg-${item.color}-500 rounded-xl flex items-center justify-center mb-3`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-500" />
              {lang === 'ja' ? 'AI発展の歴史' : 'AI 发展历程'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <AITimelineSVG className="w-full min-w-[600px] h-auto" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-3">
              {lang === 'ja' ? '💡 ポイント' : '💡 要点'}
            </h4>
            <ul className="space-y-2 text-indigo-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span>{lang === 'ja' ? 'AI = 人間の知能をシミュレートする技術' : 'AI = 模拟人类智能的技术'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span>{lang === 'ja' ? '現在のAIは全て「弱いAI」（特化型）' : '当前所有 AI 都是「弱人工智能」（专用型）'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span>{lang === 'ja' ? '2022年のChatGPT登場でAIブーム到来' : '2022年 ChatGPT 发布引爆 AI 热潮'}</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      quiz: lang === 'ja' ? [
        { question: '現在の全てのAIシステムはどのタイプですか？', options: ['弱いAI（ANI）', '汎用AI（AGI）', '超AI（ASI）', 'どれでもない'], answer: 0, explanation: '現在の全てのAIは特定タスクに特化した「弱いAI」です。ChatGPTも画像認識AIも全て弱いAIに分類されます。' },
        { question: 'Transformerアーキテクチャは何年に発表されましたか？', options: ['2012年', '2017年', '2020年', '2022年'], answer: 1, explanation: 'Transformerは2017年にGoogleの論文「Attention Is All You Need」で発表されました。' },
        { question: 'ChatGPTはいつ公開されましたか？', options: ['2020年', '2021年', '2022年', '2023年'], answer: 2, explanation: 'ChatGPTは2022年11月30日にOpenAIによって公開されました。' }
      ] : [
        { question: '当前所有的 AI 系统属于哪种类型？', options: ['弱人工智能（ANI）', '通用人工智能（AGI）', '超级人工智能（ASI）', '以上都不是'], answer: 0, explanation: '当前所有 AI 都是专注于特定任务的「弱人工智能」。ChatGPT、图像识别等都属于弱人工智能。' },
        { question: 'Transformer 架构是哪一年发布的？', options: ['2012年', '2017年', '2020年', '2022年'], answer: 1, explanation: 'Transformer 架构由 Google 于 2017 年在论文《Attention Is All You Need》中提出。' },
        { question: 'ChatGPT 是什么时候发布的？', options: ['2020年', '2021年', '2022年', '2023年'], answer: 2, explanation: 'ChatGPT 由 OpenAI 于 2022 年 11 月 30 日正式发布。' }
      ]
    },
    {
      id: 'ml',
      title: lang === 'ja' ? '機械学習' : '机器学习',
      icon: Database,
      color: 'blue',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-3">
              {lang === 'ja' ? '機械学習（Machine Learning）' : '机器学习（Machine Learning）'}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {lang === 'ja'
                ? '機械学習は、明示的にプログラムすることなく、データから学習し改善する能力をコンピュータに与える技術です。'
                : '机器学习是让计算机能够从数据中学习和改进的技术，而无需明确编程。'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              {lang === 'ja' ? '三大パラダイム' : '三大范式'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <MLTypesSVG className="w-full min-w-[700px] h-auto" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-blue-900 mb-2">{lang === 'ja' ? '教師あり学習' : '监督学习'}</h4>
              <p className="text-sm text-blue-700 mb-3">{lang === 'ja' ? 'ラベル付きデータで学習' : '使用标注数据学习'}</p>
              <div className="bg-white rounded-lg p-3 text-xs font-mono text-blue-800">
                <div>X (入力) → Y (ラベル)</div>
                <div className="text-blue-500 mt-1">{lang === 'ja' ? '例: 画像→猫/犬' : '例: 图片→猫/狗'}</div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-green-900 mb-2">{lang === 'ja' ? '教師なし学習' : '无监督学习'}</h4>
              <p className="text-sm text-green-700 mb-3">{lang === 'ja' ? 'ラベルなしで構造発見' : '无标注数据发现结构'}</p>
              <div className="bg-white rounded-lg p-3 text-xs font-mono text-green-800">
                <div>X → {lang === 'ja' ? 'パターン/クラスタ' : '模式/聚类'}</div>
                <div className="text-green-500 mt-1">{lang === 'ja' ? '例: 顧客セグメント' : '例: 客户分群'}</div>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-amber-900 mb-2">{lang === 'ja' ? '強化学習' : '强化学习'}</h4>
              <p className="text-sm text-amber-700 mb-3">{lang === 'ja' ? '試行錯誤と報酬で学習' : '通过试错和奖励学习'}</p>
              <div className="bg-white rounded-lg p-3 text-xs font-mono text-amber-800">
                <div>{lang === 'ja' ? '行動→報酬→学習' : '动作→奖励→学习'}</div>
                <div className="text-amber-500 mt-1">{lang === 'ja' ? '例: ゲームAI' : '例: 游戏AI'}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-3">{lang === 'ja' ? '📊 MLワークフロー' : '📊 机器学习流程'}</h4>
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {(lang === 'ja'
                ? ['問題定義', '→', 'データ収集', '→', '前処理', '→', '特徴量', '→', '訓練', '→', '評価', '→', 'デプロイ']
                : ['定义问题', '→', '收集数据', '→', '预处理', '→', '特征工程', '→', '训练', '→', '评估', '→', '部署']
              ).map((step, i) => (
                step === '→'
                  ? <ChevronRight key={i} className="w-4 h-4 text-blue-400" />
                  : <span key={i} className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-blue-700 shadow-sm border border-blue-100">{step}</span>
              ))}
            </div>
          </div>
        </div>
      ),
      quiz: lang === 'ja' ? [
        { question: '画像分類（猫/犬の識別）は何学習ですか？', options: ['教師あり学習', '教師なし学習', '強化学習', '半教師あり学習'], answer: 0, explanation: '画像分類はラベル付きデータ（猫、犬のタグ）を使うので教師あり学習です。' },
        { question: '顧客の購買行動でグループ分けするのは？', options: ['教師あり学習', '教師なし学習', '強化学習', '転移学習'], answer: 1, explanation: 'クラスタリング（グループ分け）はラベルなしで構造を見つけるので教師なし学習です。' },
        { question: 'AlphaGoが囲碁を学んだ方法は？', options: ['教師あり学習のみ', '教師なし学習のみ', '強化学習を含む', 'ルールベース'], answer: 2, explanation: 'AlphaGoは自己対局による強化学習で、人間を超える実力を獲得しました。' }
      ] : [
        { question: '图像分类（识别猫/狗）属于哪种学习？', options: ['监督学习', '无监督学习', '强化学习', '半监督学习'], answer: 0, explanation: '图像分类使用带标签的数据（猫、狗的标注），所以是监督学习。' },
        { question: '根据客户购买行为进行分群属于？', options: ['监督学习', '无监督学习', '强化学习', '迁移学习'], answer: 1, explanation: '聚类（分群）是在无标签数据中发现结构，属于无监督学习。' },
        { question: 'AlphaGo 学习围棋的方法是？', options: ['仅监督学习', '仅无监督学习', '包含强化学习', '规则系统'], answer: 2, explanation: 'AlphaGo 通过自我对弈的强化学习，获得了超越人类的棋艺。' }
      ]
    },
    {
      id: 'dl',
      title: lang === 'ja' ? '深層学習' : '深度学习',
      icon: Cpu,
      color: 'purple',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-3">
              {lang === 'ja' ? '深層学習（Deep Learning）' : '深度学习（Deep Learning）'}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {lang === 'ja'
                ? '深層学習は多層のニューラルネットワークを使い、データの複雑なパターンを自動で学習します。画像認識、自然言語処理などで革命的な成果を上げています。'
                : '深度学习使用多层神经网络自动学习数据的复杂模式。它在图像识别、自然语言处理等领域取得了革命性突破。'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              {lang === 'ja' ? 'ニューラルネットワーク構造' : '神经网络结构'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <NeuralNetworkSVG className="w-full max-w-xl mx-auto h-auto" />
            </div>
            <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="font-bold text-blue-700">{lang === 'ja' ? '入力層' : '输入层'}</div>
                <div className="text-blue-600">{lang === 'ja' ? '特徴を受け取る' : '接收特征'}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="font-bold text-purple-700">{lang === 'ja' ? '隠れ層' : '隐藏层'}</div>
                <div className="text-purple-600">{lang === 'ja' ? 'パターンを抽出' : '提取模式'}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="font-bold text-green-700">{lang === 'ja' ? '出力層' : '输出层'}</div>
                <div className="text-green-600">{lang === 'ja' ? '予測を出力' : '输出预测'}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Transformer {lang === 'ja' ? 'アーキテクチャ' : '架构'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <TransformerSVG className="w-full max-w-2xl mx-auto h-auto" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-pink-500" />
              {lang === 'ja' ? '自己注意機構' : '自注意力机制'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <AttentionSVG className="w-full max-w-xl mx-auto h-auto" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-3">{lang === 'ja' ? '🏗️ 代表的アーキテクチャ' : '🏗️ 代表架构'}</h4>
              <div className="space-y-2">
                {['CNN - '+( lang === 'ja' ? '画像処理' : '图像处理'), 'RNN/LSTM - '+(lang === 'ja' ? '時系列' : '时序数据'), 'Transformer - '+(lang === 'ja' ? '現代NLP/CV' : '现代NLP/CV'), 'GAN - '+(lang === 'ja' ? '画像生成' : '图像生成')].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-purple-800">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
              <h4 className="font-semibold text-amber-900 mb-3">{lang === 'ja' ? '⚡ 訓練のポイント' : '⚡ 训练要点'}</h4>
              <div className="space-y-2">
                {[lang === 'ja' ? '大量のデータ' : '大量数据', lang === 'ja' ? 'GPU/TPU加速' : 'GPU/TPU 加速', lang === 'ja' ? '適切な損失関数' : '合适的损失函数', lang === 'ja' ? '正則化で過学習防止' : '正则化防过拟合'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-amber-800">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      quiz: lang === 'ja' ? [
        { question: 'ニューラルネットワークの「深さ」とは？', options: ['入力の次元', '隠れ層の数', '学習率', 'バッチサイズ'], answer: 1, explanation: '「深さ」は隠れ層の数を指します。層が多いほど「深い」ネットワークです。' },
        { question: 'Transformerの核心技術は？', options: ['畳み込み', '再帰処理', '自己注意機構', '決定木'], answer: 2, explanation: 'TransformerはSelf-Attention（自己注意機構）を核心とし、並列処理で長距離依存を捉えます。' },
        { question: 'GPT、BERT、ChatGPTのベースは？', options: ['CNN', 'RNN', 'Transformer', 'GAN'], answer: 2, explanation: 'GPT、BERT、ChatGPT全てTransformerアーキテクチャをベースにしています。' }
      ] : [
        { question: '神经网络的「深度」指的是？', options: ['输入维度', '隐藏层数量', '学习率', '批次大小'], answer: 1, explanation: '「深度」指隐藏层的数量。层数越多，网络越「深」。' },
        { question: 'Transformer 的核心技术是？', options: ['卷积', '循环', '自注意力机制', '决策树'], answer: 2, explanation: 'Transformer 以 Self-Attention（自注意力机制）为核心，能并行处理并捕捉长距离依赖。' },
        { question: 'GPT、BERT、ChatGPT 的基础架构是？', options: ['CNN', 'RNN', 'Transformer', 'GAN'], answer: 2, explanation: 'GPT、BERT、ChatGPT 都基于 Transformer 架构构建。' }
      ]
    },
    {
      id: 'llm',
      title: lang === 'ja' ? '大規模言語モデル' : '大语言模型',
      icon: Brain,
      color: 'rose',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-3">
              {lang === 'ja' ? '大規模言語モデル（LLM）' : '大语言模型（LLM）'}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {lang === 'ja'
                ? 'LLMは大量のテキストで訓練された巨大なニューラルネットワークで、人間のように言語を理解し生成できます。ChatGPT、Claude、Geminiなどが代表例です。'
                : 'LLM 是在海量文本上训练的大型神经网络，能够像人类一样理解和生成语言。ChatGPT、Claude、Gemini 等都是其代表。'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-rose-500" />
              LLM {lang === 'ja' ? 'の動作原理' : '工作原理'}
            </h4>
            <div className="overflow-x-auto -mx-2 px-2">
              <LLMWorkflowSVG className="w-full min-w-[600px] h-auto" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'GPT-4', company: 'OpenAI', color: 'from-emerald-500 to-green-600', features: lang === 'ja' ? '最強の推論能力' : '最强推理能力' },
              { name: 'Claude', company: 'Anthropic', color: 'from-orange-500 to-amber-600', features: lang === 'ja' ? '安全性重視' : '注重安全性' },
              { name: 'Gemini', company: 'Google', color: 'from-blue-500 to-cyan-600', features: lang === 'ja' ? 'マルチモーダル' : '多模态' },
              { name: 'LLaMA', company: 'Meta', color: 'from-purple-500 to-violet-600', features: lang === 'ja' ? 'オープンソース' : '开源' }
            ].map((llm, i) => (
              <div key={i} className={`bg-gradient-to-br ${llm.color} rounded-xl p-4 text-white`}>
                <h4 className="font-bold text-lg">{llm.name}</h4>
                <p className="text-white/80 text-sm">{llm.company}</p>
                <p className="text-white/90 text-xs mt-2">{llm.features}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-5 border border-rose-100">
            <h4 className="font-semibold text-rose-900 mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Prompt Engineering {lang === 'ja' ? 'テクニック' : '技巧'}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: lang === 'ja' ? '🎯 明確な指示' : '🎯 明确指令', example: lang === 'ja' ? '「100字以内で簡潔に説明して」' : '「用100字以内简洁说明」' },
                { title: lang === 'ja' ? '🎭 役割設定' : '🎭 角色设定', example: lang === 'ja' ? '「あなたはPython専門家です」' : '「你是Python专家」' },
                { title: lang === 'ja' ? '📝 例を提供' : '📝 提供示例', example: 'Few-shot: ' + (lang === 'ja' ? '入出力例を示す' : '给出输入输出示例') },
                { title: lang === 'ja' ? '🔗 段階的思考' : '🔗 思维链', example: lang === 'ja' ? '「ステップバイステップで考えて」' : '「请一步一步思考」' }
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-rose-100">
                  <h5 className="font-semibold text-rose-900 mb-1">{tip.title}</h5>
                  <p className="text-sm text-rose-700 font-mono bg-rose-50 px-2 py-1 rounded">{tip.example}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 text-white">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-green-400" />
              {lang === 'ja' ? 'API使用例' : 'API 调用示例'}
            </h4>
            <pre className="text-sm overflow-x-auto bg-gray-800 rounded-lg p-4 text-green-300">
{`from openai import OpenAI

client = OpenAI(api_key="your-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are helpful."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)`}
            </pre>
          </div>
        </div>
      ),
      quiz: lang === 'ja' ? [
        { question: 'LLMの「L」は何を意味しますか？', options: ['Learning', 'Large', 'Language', 'Linear'], answer: 1, explanation: 'LLM = Large Language Model（大規模言語モデル）。Largeは膨大なパラメータ数を指します。' },
        { question: 'LLMが次の単語を予測する確率分布を出力する層は？', options: ['Embedding層', 'Attention層', 'Softmax層', '全結合層'], answer: 2, explanation: 'Softmax層が各単語の確率分布を出力し、次の単語を予測します。' },
        { question: '「ステップバイステップで考えて」というPrompt技法は？', options: ['Few-shot', 'Zero-shot', 'Chain of Thought', 'Role-play'], answer: 2, explanation: 'Chain of Thought（CoT）は段階的な推論を促し、複雑な問題の精度を向上させます。' }
      ] : [
        { question: 'LLM 中的「L」代表什么？', options: ['Learning', 'Large', 'Language', 'Linear'], answer: 1, explanation: 'LLM = Large Language Model（大语言模型）。Large 指庞大的参数量。' },
        { question: 'LLM 输出下一个词概率分布的层是？', options: ['Embedding 层', 'Attention 层', 'Softmax 层', '全连接层'], answer: 2, explanation: 'Softmax 层输出每个词的概率分布，用于预测下一个词。' },
        { question: '「请一步一步思考」这种 Prompt 技巧叫？', options: ['Few-shot', 'Zero-shot', 'Chain of Thought', 'Role-play'], answer: 2, explanation: 'Chain of Thought（思维链）引导模型逐步推理，提高复杂问题的准确率。' }
      ]
    }
  ];

  const currentSectionData = sections[currentSection];
  const currentQuiz = currentSectionData.quiz;

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === currentQuiz[currentQuizIndex].answer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < currentQuiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      setCompletedSections(prev => new Set([...prev, currentSection]));
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setQuizCompleted(false);
  };

  const handleRetryQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setQuizCompleted(false);
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setShowQuiz(false);
      setQuizCompleted(false);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setShowQuiz(false);
      setQuizCompleted(false);
    }
  };

  const progress = ((completedSections.size) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">{lang === 'ja' ? 'トップ' : '首页'}</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-gray-900">{completedSections.size}/{sections.length}</span>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Section Navigation */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-57px)] sticky top-[57px]">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {lang === 'ja' ? '目次' : '目录'}
            </h3>
            <nav className="space-y-1">
              {sections.map((section, index) => {
                const Icon = section.icon;
                const isCompleted = completedSections.has(index);
                const isCurrent = currentSection === index;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setCurrentSection(index);
                      setShowQuiz(false);
                      setQuizCompleted(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      isCurrent
                        ? `bg-${section.color}-100 text-${section.color}-900 font-medium`
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500'
                        : isCurrent
                          ? `bg-${section.color}-500`
                          : 'bg-gray-200'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-gray-500'}`} />
                      )}
                    </div>
                    <span className="text-sm">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto px-4 lg:px-8 py-6">
          {/* Mobile Section Nav */}
          <div className="lg:hidden mb-4 flex gap-2 overflow-x-auto pb-2">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isCompleted = completedSections.has(index);
              const isCurrent = currentSection === index;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSection(index);
                    setShowQuiz(false);
                    setQuizCompleted(false);
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                    isCurrent
                      ? 'bg-violet-100 text-violet-900 font-medium'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  <Icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </div>

          {/* Section Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 bg-gradient-to-br from-${currentSectionData.color}-500 to-${currentSectionData.color}-600 rounded-xl flex items-center justify-center`}>
                <currentSectionData.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-500">{lang === 'ja' ? 'レッスン' : '课程'} {currentSection + 1}/{sections.length}</div>
                <h1 className="text-2xl font-bold text-gray-900">{currentSectionData.title}</h1>
              </div>
            </div>
          </div>

          {!showQuiz ? (
            <>
              {/* Lesson Content */}
              <div className="mb-8">
                {currentSectionData.content}
              </div>

              {/* Start Quiz Button */}
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      {lang === 'ja' ? '理解度チェック' : '检验学习成果'}
                    </h3>
                    <p className="text-white/80">
                      {currentQuiz.length} {lang === 'ja' ? '問のクイズで確認しよう' : '道题测试你的理解'}
                    </p>
                  </div>
                  <button
                    onClick={handleStartQuiz}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-violet-600 rounded-xl font-bold hover:bg-violet-50 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    {lang === 'ja' ? 'クイズ開始' : '开始测验'}
                  </button>
                </div>
              </div>
            </>
          ) : quizCompleted ? (
            /* Quiz Results */
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                correctCount === currentQuiz.length
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                  : correctCount >= currentQuiz.length / 2
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
              }`}>
                {correctCount === currentQuiz.length ? (
                  <Trophy className="w-10 h-10 text-white" />
                ) : (
                  <Star className="w-10 h-10 text-white" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {correctCount === currentQuiz.length
                  ? (lang === 'ja' ? 'パーフェクト！' : '满分！')
                  : correctCount >= currentQuiz.length / 2
                    ? (lang === 'ja' ? 'よくできました！' : '做得不错！')
                    : (lang === 'ja' ? 'もう一度挑戦！' : '再试一次！')}
              </h3>
              <p className="text-gray-600 mb-6">
                {lang === 'ja' ? '正解' : '正确'}: {correctCount}/{currentQuiz.length}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleRetryQuiz}
                  className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  {lang === 'ja' ? '再挑戦' : '重新测验'}
                </button>
                {currentSection < sections.length - 1 && (
                  <button
                    onClick={handleNextSection}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium hover:from-violet-600 hover:to-purple-700 transition-colors"
                  >
                    {lang === 'ja' ? '次のレッスン' : '下一课'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Question */
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Progress */}
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {lang === 'ja' ? '問題' : '题目'} {currentQuizIndex + 1}/{currentQuiz.length}
                  </span>
                  <div className="flex gap-1">
                    {currentQuiz.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i < currentQuizIndex ? 'bg-green-500' : i === currentQuizIndex ? 'bg-violet-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  {currentQuiz[currentQuizIndex].question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {currentQuiz[currentQuizIndex].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuiz[currentQuizIndex].answer;
                    const showCorrect = showResult && isCorrect;
                    const showWrong = showResult && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          showCorrect
                            ? 'border-green-500 bg-green-50'
                            : showWrong
                              ? 'border-red-500 bg-red-50'
                              : isSelected
                                ? 'border-violet-500 bg-violet-50'
                                : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          showCorrect
                            ? 'bg-green-500 text-white'
                            : showWrong
                              ? 'bg-red-500 text-white'
                              : isSelected
                                ? 'bg-violet-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}>
                          {showCorrect ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : showWrong ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </div>
                        <span className={`flex-1 ${showCorrect ? 'text-green-900' : showWrong ? 'text-red-900' : 'text-gray-700'}`}>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showResult && (
                  <div className={`p-4 rounded-xl mb-6 ${
                    selectedAnswer === currentQuiz[currentQuizIndex].answer
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-amber-50 border border-amber-200'
                  }`}>
                    <p className={`text-sm ${
                      selectedAnswer === currentQuiz[currentQuizIndex].answer
                        ? 'text-green-800'
                        : 'text-amber-800'
                    }`}>
                      <span className="font-semibold">{lang === 'ja' ? '解説: ' : '解析: '}</span>
                      {currentQuiz[currentQuizIndex].explanation}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                {!showResult ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      selectedAnswer === null
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700'
                    }`}
                  >
                    {lang === 'ja' ? '回答する' : '提交答案'}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold hover:from-violet-600 hover:to-purple-700 transition-all"
                  >
                    {currentQuizIndex < currentQuiz.length - 1
                      ? (lang === 'ja' ? '次の問題' : '下一题')
                      : (lang === 'ja' ? '結果を見る' : '查看结果')}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          {!showQuiz && (
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevSection}
                disabled={currentSection === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentSection === 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                {lang === 'ja' ? '前へ' : '上一课'}
              </button>
              <button
                onClick={handleNextSection}
                disabled={currentSection === sections.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentSection === sections.length - 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {lang === 'ja' ? '次へ' : '下一课'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AILearningPage;
