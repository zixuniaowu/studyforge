import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  Cpu,
  Database,
  Globe,
  Lightbulb,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Zap,
  Target,
  Layers
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

type TabType = 'overview' | 'ml' | 'dl' | 'llm';

const AILearningPage: React.FC = () => {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = {
    overview: {
      zh: { name: 'AI 概览', icon: Lightbulb },
      ja: { name: 'AI概要', icon: Lightbulb }
    },
    ml: {
      zh: { name: '机器学习', icon: Database },
      ja: { name: '機械学習', icon: Database }
    },
    dl: {
      zh: { name: '深度学习', icon: Cpu },
      ja: { name: '深層学習', icon: Cpu }
    },
    llm: {
      zh: { name: '大语言模型', icon: Brain },
      ja: { name: 'LLM', icon: Brain }
    }
  };

  const lang = language === 'ja' ? 'ja' : 'zh';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-200">
        <div className="px-6 lg:px-10 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{lang === 'ja' ? 'トップに戻る' : '返回首页'}</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
              <Lightbulb size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {lang === 'ja' ? 'AI入門ガイド' : 'AI 入门指南'}
              </h1>
              <p className="text-gray-600 mt-1">
                {lang === 'ja' ? '図解で学ぶ人工知能の基礎' : '图文并茂学习人工智能基础'}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {(Object.keys(tabs) as TabType[]).map((tab) => {
              const TabIcon = tabs[tab][lang].icon;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                      : 'bg-white text-gray-600 hover:bg-violet-100 border border-gray-200'
                  }`}
                >
                  <TabIcon size={18} />
                  {tabs[tab][lang].name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* What is AI */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-100 rounded-xl">
                  <Sparkles className="w-6 h-6 text-violet-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {lang === 'ja' ? '人工知能とは？' : '什么是人工智能？'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {lang === 'ja'
                  ? '人工知能（AI）は、通常人間の知能を必要とするタスクを実行できるコンピュータシステムです。学習、推論、問題解決、パターン認識、自然言語理解などの能力を持ちます。'
                  : '人工智能（AI）是能够执行通常需要人类智能的任务的计算机系统。它具备学习、推理、问题解决、模式识别、自然语言理解等能力。'}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: Target, title: lang === 'ja' ? '弱いAI' : '弱人工智能', desc: lang === 'ja' ? '特定タスクに特化' : '专注特定任务' },
                  { icon: Zap, title: lang === 'ja' ? '汎用AI' : '通用人工智能', desc: lang === 'ja' ? '人間レベルの知能' : '人类水平智能' },
                  { icon: Globe, title: lang === 'ja' ? '超AI' : '超级人工智能', desc: lang === 'ja' ? '人間を超える知能' : '超越人类智能' }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                    <item.icon className="w-8 h-8 text-violet-600 mb-2" />
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Timeline */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-xl">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {lang === 'ja' ? 'AI発展の歴史' : 'AI 发展历程'}
                </h2>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <AITimelineSVG className="w-full min-w-[700px] h-auto" />
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {lang === 'ja' ? '重要なマイルストーン' : '重要里程碑'}
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 1950: {lang === 'ja' ? 'チューリングテスト提唱' : '图灵测试提出'}</li>
                    <li>• 2012: AlexNet {lang === 'ja' ? '画像認識革命' : '图像识别革命'}</li>
                    <li>• 2017: Transformer {lang === 'ja' ? 'アーキテクチャ誕生' : '架构诞生'}</li>
                    <li>• 2022: ChatGPT {lang === 'ja' ? '対話AIブレイクスルー' : '对话AI突破'}</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {lang === 'ja' ? '現在のトレンド' : '当前趋势'}
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• {lang === 'ja' ? 'マルチモーダルAI' : '多模态AI融合'}</li>
                    <li>• {lang === 'ja' ? 'オープンソースモデルの台頭' : '开源模型崛起'}</li>
                    <li>• {lang === 'ja' ? '推論能力の向上' : '推理能力增强'}</li>
                    <li>• {lang === 'ja' ? 'AIエージェント' : 'AI Agent 智能体'}</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Machine Learning Tab */}
        {activeTab === 'ml' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {lang === 'ja' ? '機械学習とは？' : '什么是机器学习？'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {lang === 'ja'
                  ? '機械学習は、明示的にプログラムすることなく、データから学習し改善する能力をコンピュータに与える技術です。AIの中核技術であり、パターン認識や予測に広く使用されています。'
                  : '机器学习是让计算机能够从数据中学习和改进的技术，而无需明确编程。它是 AI 的核心技术，广泛用于模式识别和预测任务。'}
              </p>
            </section>

            {/* Three Paradigms */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Layers className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {lang === 'ja' ? '機械学習の三大パラダイム' : '机器学习三大范式'}
                </h2>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <MLTypesSVG className="w-full min-w-[700px] h-auto" />
              </div>
            </section>

            {/* ML Workflow */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {lang === 'ja' ? '機械学習のワークフロー' : '机器学习工作流程'}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {(lang === 'ja'
                  ? ['問題定義', 'データ収集', '前処理', '特徴量設計', 'モデル選択', '訓練', '評価', 'デプロイ']
                  : ['问题定义', '数据收集', '数据预处理', '特征工程', '模型选择', '模型训练', '模型评估', '部署上线']
                ).map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium text-sm shadow-md">
                      {step}
                    </div>
                    {i < 7 && <ChevronRight className="text-gray-300 self-center" />}
                  </React.Fragment>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Deep Learning Tab */}
        {activeTab === 'dl' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Cpu className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {lang === 'ja' ? '深層学習とは？' : '什么是深度学习？'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {lang === 'ja'
                  ? '深層学習は、多層のニューラルネットワークを使用してデータの複雑なパターンを学習する機械学習のサブセットです。画像認識、自然言語処理、音声認識などの分野で革命的な成果を上げています。'
                  : '深度学习是机器学习的子集，使用多层神经网络来学习数据的复杂模式。它在图像识别、自然语言处理、语音识别等领域取得了革命性的成果。'}
              </p>
            </section>

            {/* Neural Network */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <Brain className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {lang === 'ja' ? 'ニューラルネットワーク構造' : '神经网络结构'}
                </h2>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <NeuralNetworkSVG className="w-full max-w-2xl mx-auto h-auto" />
              </div>
              <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-sm text-indigo-700">
                  {lang === 'ja'
                    ? '神経ネットワークは、入力層、隠れ層、出力層で構成されています。各層のニューロンは重み付きの接続で結ばれ、活性化関数を通じて非線形変換を行います。'
                    : '神经网络由输入层、隐藏层和输出层组成。每层的神经元通过带权重的连接相连，并通过激活函数进行非线性变换。'}
                </p>
              </div>
            </section>

            {/* Transformer */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-xl">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Transformer {lang === 'ja' ? 'アーキテクチャ' : '架构'}
                </h2>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <TransformerSVG className="w-full max-w-3xl mx-auto h-auto" />
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {lang === 'ja' ? 'エンコーダー' : '编码器 Encoder'}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {lang === 'ja'
                      ? '入力シーケンスを理解し、文脈を含む表現に変換します。BERT などのモデルはエンコーダーのみを使用します。'
                      : '理解输入序列，将其转换为包含上下文信息的表示。BERT 等模型只使用编码器部分。'}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {lang === 'ja' ? 'デコーダー' : '解码器 Decoder'}
                  </h4>
                  <p className="text-sm text-green-700">
                    {lang === 'ja'
                      ? '出力シーケンスを生成します。GPT などの言語モデルはデコーダーのみを使用して、次のトークンを予測します。'
                      : '生成输出序列。GPT 等语言模型只使用解码器，通过预测下一个 token 来生成文本。'}
                  </p>
                </div>
              </div>
            </section>

            {/* Attention */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-100 rounded-xl">
                  <Target className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {lang === 'ja' ? '注意機構（Attention）' : '注意力机制'}
                </h2>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <AttentionSVG className="w-full max-w-2xl mx-auto h-auto" />
              </div>
            </section>
          </div>
        )}

        {/* LLM Tab */}
        {activeTab === 'llm' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-100 rounded-xl">
                  <Brain className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {lang === 'ja' ? '大規模言語モデル（LLM）とは？' : '什么是大语言模型？'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {lang === 'ja'
                  ? '大規模言語モデル（LLM）は、大量のテキストデータで訓練された深層学習モデルです。人間の言語を理解し生成する能力を持ち、ChatGPT、Claude、Gemini などがその代表例です。'
                  : '大语言模型（LLM）是在海量文本数据上训练的深度学习模型。它具备理解和生成人类语言的能力，ChatGPT、Claude、Gemini 等都是其代表。'}
              </p>
            </section>

            {/* LLM Workflow */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-100 rounded-xl">
                  <Zap className="w-6 h-6 text-violet-600" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  LLM {lang === 'ja' ? 'の動作原理' : '工作原理'}
                </h2>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <LLMWorkflowSVG className="w-full min-w-[700px] h-auto" />
              </div>
            </section>

            {/* Popular LLMs */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                {lang === 'ja' ? '主要なLLM' : '主流大语言模型'}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'GPT-4', company: 'OpenAI', color: 'from-green-500 to-emerald-600' },
                  { name: 'Claude', company: 'Anthropic', color: 'from-orange-500 to-amber-600' },
                  { name: 'Gemini', company: 'Google', color: 'from-blue-500 to-cyan-600' },
                  { name: 'LLaMA', company: 'Meta', color: 'from-purple-500 to-violet-600' }
                ].map((llm, i) => (
                  <div key={i} className={`p-4 bg-gradient-to-br ${llm.color} rounded-xl text-white`}>
                    <h4 className="font-bold text-lg">{llm.name}</h4>
                    <p className="text-white/80 text-sm">{llm.company}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Prompt Engineering */}
            <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 lg:p-8 border border-violet-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Prompt Engineering {lang === 'ja' ? 'のコツ' : '技巧'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: lang === 'ja' ? '明確な指示' : '明确指令', desc: lang === 'ja' ? '具体的で明確な指示を与える' : '给出具体、明确的指令' },
                  { title: lang === 'ja' ? '役割設定' : '角色设定', desc: lang === 'ja' ? 'AIに特定の役割を演じさせる' : '让 AI 扮演特定角色' },
                  { title: lang === 'ja' ? '例を提供' : '提供示例', desc: lang === 'ja' ? 'Few-shot で期待出力を示す' : '通过 Few-shot 展示期望输出' },
                  { title: lang === 'ja' ? '段階的思考' : '思维链', desc: lang === 'ja' ? 'ステップバイステップで考えさせる' : '让 AI 一步一步思考' }
                ].map((tip, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-violet-200">
                    <h4 className="font-semibold text-violet-900">{tip.title}</h4>
                    <p className="text-sm text-violet-700">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Learning Resources */}
        <section className="mt-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 lg:p-8 text-white">
          <h2 className="text-xl font-bold mb-6">
            {lang === 'ja' ? '学習リソース' : '推荐学习资源'}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Coursera ML', url: 'https://www.coursera.org/learn/machine-learning', desc: 'Andrew Ng' },
              { title: 'Fast.ai', url: 'https://www.fast.ai/', desc: lang === 'ja' ? '実践的深層学習' : '实践深度学习' },
              { title: 'Hugging Face', url: 'https://huggingface.co/learn', desc: 'NLP & Transformers' }
            ].map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
              >
                <div>
                  <h4 className="font-semibold">{resource.title}</h4>
                  <p className="text-sm text-white/70">{resource.desc}</p>
                </div>
                <ExternalLink size={20} className="text-white/50 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AILearningPage;
