/**
 * RAGPipelineViz - RAG 检索增强生成 交互式可视化
 *
 * 设计原则：
 * 1. 渐进式披露 - 先展示全局流程，点击深入细节
 * 2. 视觉数据流 - 从左到右展示数据变换过程
 * 3. 同步交互 - 悬停时所有相关元素同时高亮
 * 4. 真实数据表示 - 用向量条形图展示嵌入
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RAGPipelineVizProps {
  language: 'zh' | 'ja';
}

// 颜色方案（遵循设计原则）
const COLORS = {
  query: '#8b5cf6',      // 紫色 - 用户查询
  embedding: '#3b82f6',  // 蓝色 - 嵌入
  retrieval: '#f59e0b',  // 琥珀色 - 检索
  context: '#10b981',    // 绿色 - 上下文
  llm: '#ef4444',        // 红色 - LLM
  output: '#6366f1',     // 靛蓝色 - 输出
  flowLine: '#c4b5fd',   // 淡紫色 - 流线
};

// 模拟嵌入向量（真实数据表示）
const generateMockEmbedding = (seed: number): number[] => {
  return Array.from({ length: 24 }, (_, i) =>
    Math.abs(Math.sin(seed * 0.1 + i * 0.3)) * 0.8 + 0.2
  );
};

// 模拟文档数据
const mockDocuments = [
  { id: 1, title: 'Transformer原理', score: 0.92, snippet: 'Self-attention机制是Transformer的核心...' },
  { id: 2, title: 'GPT架构详解', score: 0.85, snippet: 'GPT使用仅解码器的Transformer架构...' },
  { id: 3, title: '注意力计算', score: 0.78, snippet: 'Query、Key、Value三个矩阵的计算...' },
];

// 向量条形图组件
const VectorBar: React.FC<{
  values: number[];
  color: string;
  height?: number;
  animated?: boolean;
}> = ({ values, color, height = 40, animated = true }) => {
  const barWidth = 4;
  const gap = 1;
  const totalWidth = values.length * (barWidth + gap);

  return (
    <svg width={totalWidth} height={height} className="overflow-visible">
      {values.map((v, i) => (
        <motion.rect
          key={i}
          x={i * (barWidth + gap)}
          y={height * (1 - v)}
          width={barWidth}
          height={height * v}
          fill={color}
          opacity={0.4 + v * 0.6}
          rx={1}
          initial={animated ? { scaleY: 0 } : false}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.02, duration: 0.3 }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}
    </svg>
  );
};

// 阶段卡片组件
const StageCard: React.FC<{
  title: string;
  subtitle?: string;
  color: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  expandable?: boolean;
}> = ({ title, subtitle, color, children, isActive, onClick, expandable }) => (
  <motion.div
    className={`
      rounded-xl border-2 p-4 transition-all duration-300 cursor-pointer
      ${isActive ? 'shadow-lg scale-105' : 'shadow-sm hover:shadow-md'}
    `}
    style={{
      borderColor: isActive ? color : '#e5e7eb',
      backgroundColor: isActive ? `${color}08` : 'white'
    }}
    onClick={onClick}
    whileHover={{ scale: expandable ? 1.02 : 1 }}
  >
    <div className="flex items-center gap-2 mb-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="font-semibold text-gray-800 text-sm">{title}</span>
    </div>
    {subtitle && (
      <div className="text-xs text-gray-500 mb-2">{subtitle}</div>
    )}
    <div>{children}</div>
  </motion.div>
);

// 主组件
export const RAGPipelineViz: React.FC<RAGPipelineVizProps> = ({ language }) => {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [hoveredDoc, setHoveredDoc] = useState<number | null>(null);
  const [userQuery, setUserQuery] = useState(language === 'zh' ? 'Transformer是如何工作的？' : 'Transformerはどのように動作しますか？');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const labels = {
    zh: {
      title: 'RAG 检索增强生成 可视化',
      subtitle: '交互式探索 RAG 的工作流程',
      stages: {
        query: '用户查询',
        embedding: '查询嵌入',
        retrieval: '向量检索',
        context: '上下文组装',
        llm: 'LLM 生成',
        output: '最终回答'
      },
      queryPlaceholder: '输入你的问题...',
      run: '运行 RAG',
      running: '处理中...',
      reset: '重置',
      docTitle: '相关文档',
      similarity: '相似度',
      result: 'Transformer是一种基于自注意力机制的神经网络架构，它通过并行处理序列数据，能够捕捉长距离依赖关系...',
      tip: '点击各阶段查看详细说明，悬停文档查看相关性'
    },
    ja: {
      title: 'RAG 検索拡張生成 可視化',
      subtitle: 'RAGのワークフローをインタラクティブに探索',
      stages: {
        query: 'ユーザークエリ',
        embedding: 'クエリ埋め込み',
        retrieval: 'ベクトル検索',
        context: 'コンテキスト組立',
        llm: 'LLM 生成',
        output: '最終回答'
      },
      queryPlaceholder: '質問を入力...',
      run: 'RAG実行',
      running: '処理中...',
      reset: 'リセット',
      docTitle: '関連ドキュメント',
      similarity: '類似度',
      result: 'Transformerは自己注意力機構に基づくニューラルネットワークアーキテクチャで、シーケンスデータを並列処理し、長距離依存関係を捉えることができます...',
      tip: '各ステージをクリックして詳細を確認、ドキュメントにホバーで関連性を表示'
    }
  };

  const t = labels[language];

  // 模拟嵌入向量
  const queryEmbedding = useMemo(() => generateMockEmbedding(userQuery.length), [userQuery]);
  const docEmbeddings = useMemo(() => mockDocuments.map((_, i) => generateMockEmbedding(i * 10)), []);

  // 运行 RAG 流程动画
  const runRAG = useCallback(() => {
    setIsProcessing(true);
    setShowResult(false);
    setActiveStage('query');

    const stages = ['query', 'embedding', 'retrieval', 'context', 'llm', 'output'];
    stages.forEach((stage, i) => {
      setTimeout(() => {
        setActiveStage(stage);
        if (stage === 'output') {
          setIsProcessing(false);
          setShowResult(true);
        }
      }, i * 800);
    });
  }, []);

  const reset = useCallback(() => {
    setActiveStage(null);
    setShowResult(false);
    setIsProcessing(false);
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-white/80 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Input Section */}
        <div className="mb-6 flex gap-4 items-center">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder={t.queryPlaceholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isProcessing}
          />
          <button
            onClick={runRAG}
            disabled={isProcessing}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? t.running : t.run}
          </button>
          {showResult && (
            <button
              onClick={reset}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t.reset}
            </button>
          )}
        </div>

        {/* Pipeline Visualization */}
        <div className="relative">
          {/* SVG Flow Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={COLORS.query} />
                <stop offset="50%" stopColor={COLORS.retrieval} />
                <stop offset="100%" stopColor={COLORS.output} />
              </linearGradient>
            </defs>
          </svg>

          {/* Pipeline Grid */}
          <div className="grid grid-cols-6 gap-4">
            {/* Stage 1: Query */}
            <StageCard
              title={t.stages.query}
              color={COLORS.query}
              isActive={activeStage === 'query'}
              onClick={() => setActiveStage('query')}
              expandable
            >
              <div className="bg-purple-50 rounded-lg p-3 text-sm text-gray-700 min-h-[60px]">
                {userQuery}
              </div>
            </StageCard>

            {/* Stage 2: Embedding */}
            <StageCard
              title={t.stages.embedding}
              subtitle="768-dim"
              color={COLORS.embedding}
              isActive={activeStage === 'embedding'}
              onClick={() => setActiveStage('embedding')}
              expandable
            >
              <div className="flex items-center justify-center py-2">
                <VectorBar
                  values={queryEmbedding}
                  color={COLORS.embedding}
                  animated={activeStage === 'embedding'}
                />
              </div>
            </StageCard>

            {/* Stage 3: Retrieval */}
            <StageCard
              title={t.stages.retrieval}
              subtitle="Top-3"
              color={COLORS.retrieval}
              isActive={activeStage === 'retrieval'}
              onClick={() => setActiveStage('retrieval')}
              expandable
            >
              <div className="space-y-2">
                {mockDocuments.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    className={`text-xs p-2 rounded cursor-pointer transition-all ${
                      hoveredDoc === i ? 'bg-amber-100 ring-2 ring-amber-400' : 'bg-amber-50'
                    }`}
                    onMouseEnter={() => setHoveredDoc(i)}
                    onMouseLeave={() => setHoveredDoc(null)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="font-medium text-gray-700">{doc.title}</div>
                    <div className="text-amber-600">{t.similarity}: {(doc.score * 100).toFixed(0)}%</div>
                  </motion.div>
                ))}
              </div>
            </StageCard>

            {/* Stage 4: Context */}
            <StageCard
              title={t.stages.context}
              color={COLORS.context}
              isActive={activeStage === 'context'}
              onClick={() => setActiveStage('context')}
              expandable
            >
              <div className="text-xs space-y-1">
                <div className="text-gray-500">Query + Documents</div>
                <div className="bg-green-50 rounded p-2 text-gray-600 truncate">
                  {mockDocuments.map(d => d.title).join(' + ')}
                </div>
              </div>
            </StageCard>

            {/* Stage 5: LLM */}
            <StageCard
              title={t.stages.llm}
              subtitle="GPT-4 / Claude"
              color={COLORS.llm}
              isActive={activeStage === 'llm'}
              onClick={() => setActiveStage('llm')}
              expandable
            >
              <div className="flex items-center justify-center py-3">
                {activeStage === 'llm' && (
                  <motion.div
                    className="flex space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-red-500"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                )}
                {activeStage !== 'llm' && (
                  <div className="text-2xl">🤖</div>
                )}
              </div>
            </StageCard>

            {/* Stage 6: Output */}
            <StageCard
              title={t.stages.output}
              color={COLORS.output}
              isActive={activeStage === 'output'}
              onClick={() => setActiveStage('output')}
              expandable
            >
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    className="text-xs text-gray-700 bg-indigo-50 rounded p-2 max-h-[80px] overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0 }}
                  >
                    {t.result}
                  </motion.div>
                )}
              </AnimatePresence>
            </StageCard>
          </div>
        </div>

        {/* Detailed View for Active Stage */}
        <AnimatePresence>
          {activeStage && (
            <motion.div
              className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {activeStage === 'embedding' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {language === 'zh' ? '查询向量化' : 'クエリのベクトル化'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-2">
                        {language === 'zh' ? '原始文本' : '元テキスト'}
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">{userQuery}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-2">
                        {language === 'zh' ? '嵌入向量 (768维，展示24维)' : '埋め込みベクトル (768次元、24次元表示)'}
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <VectorBar values={queryEmbedding} color={COLORS.embedding} height={50} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStage === 'retrieval' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {language === 'zh' ? '向量相似度检索' : 'ベクトル類似度検索'}
                  </h3>
                  <div className="space-y-3">
                    {mockDocuments.map((doc, i) => (
                      <div
                        key={doc.id}
                        className={`p-3 rounded-lg border transition-all ${
                          hoveredDoc === i ? 'border-amber-400 bg-amber-50' : 'border-gray-200 bg-gray-50'
                        }`}
                        onMouseEnter={() => setHoveredDoc(i)}
                        onMouseLeave={() => setHoveredDoc(null)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">{doc.title}</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${doc.score * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-amber-600 font-medium">
                              {(doc.score * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-xs text-gray-500">
                            {language === 'zh' ? '文档向量:' : 'ドキュメントベクトル:'}
                          </div>
                          <VectorBar
                            values={docEmbeddings[i]}
                            color={COLORS.retrieval}
                            height={20}
                            animated={false}
                          />
                        </div>
                        <div className="text-sm text-gray-600 mt-2">{doc.snippet}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStage === 'context' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {language === 'zh' ? 'Prompt 组装' : 'Prompt組立'}
                  </h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="text-gray-500">{`# System Prompt`}</div>
                    <div>{language === 'zh' ? '你是一个AI助手，根据以下文档回答问题。' : 'あなたはAIアシスタントです。以下のドキュメントに基づいて質問に答えてください。'}</div>
                    <br />
                    <div className="text-gray-500">{`# Retrieved Documents`}</div>
                    {mockDocuments.map((doc, i) => (
                      <div key={i} className="text-yellow-400">
                        [{i + 1}] {doc.title}: {doc.snippet}
                      </div>
                    ))}
                    <br />
                    <div className="text-gray-500">{`# User Query`}</div>
                    <div className="text-cyan-400">{userQuery}</div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip */}
        <div className="mt-4 text-center text-sm text-gray-400">
          💡 {t.tip}
        </div>
      </div>
    </div>
  );
};

export default RAGPipelineViz;
