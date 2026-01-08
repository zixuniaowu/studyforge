/**
 * AttentionViz - 自注意力机制 交互式可视化
 *
 * 展示 Self-Attention 的计算过程：
 * 1. Q、K、V 向量生成
 * 2. 注意力分数计算 (QK^T / √d)
 * 3. Softmax 归一化
 * 4. 加权求和
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AttentionVizProps {
  language: 'zh' | 'ja';
}

// 颜色方案（ML约定）
const COLORS = {
  query: '#3b82f6',   // 蓝色 - Query
  key: '#ef4444',     // 红色 - Key
  value: '#22c55e',   // 绿色 - Value
  attention: '#8b5cf6', // 紫色 - Attention
  output: '#f59e0b',  // 琥珀色 - Output
};

// 示例句子和预计算的注意力权重
const exampleSentences = {
  zh: ['我', '喜欢', '学习', '人工', '智能'],
  ja: ['私', 'は', 'AI', 'を', '学ぶ']
};

// 模拟的注意力矩阵（每个 token 对其他 token 的注意力）
const mockAttentionMatrix = [
  [0.65, 0.15, 0.10, 0.05, 0.05],
  [0.30, 0.40, 0.15, 0.10, 0.05],
  [0.15, 0.25, 0.35, 0.15, 0.10],
  [0.10, 0.15, 0.20, 0.40, 0.15],
  [0.08, 0.12, 0.20, 0.25, 0.35],
];

// 生成模拟向量
const generateMockVector = (seed: number, dim: number = 8): number[] => {
  return Array.from({ length: dim }, (_, i) =>
    Math.abs(Math.sin(seed * 0.5 + i * 0.7)) * 0.8 + 0.2
  );
};

// 向量可视化组件（水平条形）
const VectorDisplay: React.FC<{
  values: number[];
  color: string;
  label: string;
  highlighted?: boolean;
}> = ({ values, color, label, highlighted }) => (
  <div className={`flex items-center gap-2 p-2 rounded transition-all ${highlighted ? 'bg-gray-100 ring-2' : ''}`}
       style={{ '--tw-ring-color': highlighted ? color : 'transparent' } as React.CSSProperties}>
    <span className="text-xs font-mono w-8 text-gray-500">{label}</span>
    <div className="flex gap-0.5">
      {values.map((v, i) => (
        <div
          key={i}
          className="w-2 rounded-sm transition-all"
          style={{
            height: `${v * 24}px`,
            backgroundColor: color,
            opacity: 0.4 + v * 0.6
          }}
        />
      ))}
    </div>
  </div>
);

// 注意力热力图单元格
const AttentionCell: React.FC<{
  value: number;
  isHighlighted: boolean;
  rowToken: string;
  colToken: string;
  onHover: () => void;
  onLeave: () => void;
}> = ({ value, isHighlighted, rowToken, colToken, onHover, onLeave }) => {
  // 使用紫色渐变
  const backgroundColor = `rgba(139, 92, 246, ${value * 0.9})`;

  return (
    <motion.div
      className={`
        w-10 h-10 flex items-center justify-center text-xs cursor-pointer
        transition-all duration-200 rounded
        ${isHighlighted ? 'ring-2 ring-purple-500 scale-110 z-10' : ''}
      `}
      style={{ backgroundColor }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.1 }}
      title={`${rowToken} → ${colToken}: ${(value * 100).toFixed(1)}%`}
    >
      <span className={value > 0.4 ? 'text-white' : 'text-gray-700'}>
        {(value * 100).toFixed(0)}
      </span>
    </motion.div>
  );
};

// 公式显示组件
const FormulaDisplay: React.FC<{
  step: number;
  language: 'zh' | 'ja';
}> = ({ step, language }) => {
  const formulas = [
    {
      formula: 'Q = X · W_Q, K = X · W_K, V = X · W_V',
      zh: '计算 Query、Key、Value 向量',
      ja: 'Query、Key、Valueベクトルを計算'
    },
    {
      formula: 'Score = Q · K^T',
      zh: '计算注意力分数（点积）',
      ja: 'アテンションスコアを計算（ドット積）'
    },
    {
      formula: 'Score = Score / √d_k',
      zh: '缩放（防止梯度消失）',
      ja: 'スケーリング（勾配消失防止）'
    },
    {
      formula: 'Attention = Softmax(Score)',
      zh: 'Softmax 归一化',
      ja: 'Softmax正規化'
    },
    {
      formula: 'Output = Attention · V',
      zh: '加权求和得到输出',
      ja: '重み付き和で出力を取得'
    }
  ];

  const current = formulas[step] || formulas[0];

  return (
    <motion.div
      className="bg-gray-900 rounded-lg p-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={step}
    >
      <div className="font-mono text-lg text-purple-400 mb-2">
        {current.formula}
      </div>
      <div className="text-sm text-gray-400">
        {current[language]}
      </div>
    </motion.div>
  );
};

// 主组件
export const AttentionViz: React.FC<AttentionVizProps> = ({ language }) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedToken, setSelectedToken] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showQKV, setShowQKV] = useState(false);

  const tokens = exampleSentences[language];

  const labels = {
    zh: {
      title: '自注意力机制可视化',
      subtitle: '探索 Transformer 的核心组件',
      heatmapTitle: '注意力权重热力图',
      qkvTitle: 'Q、K、V 向量',
      steps: ['生成 QKV', '计算分数', '缩放', 'Softmax', '加权求和'],
      tip: '悬停热力图单元格查看注意力权重，点击 token 查看其注意力模式',
      showQKV: '显示 QKV 向量',
      hideQKV: '隐藏 QKV 向量',
      rowLabel: '查询 (Query)',
      colLabel: '键 (Key)',
      explanation: '每行表示一个 token 对其他所有 token 的注意力分布。数值越高，表示该 token 越关注对应位置。'
    },
    ja: {
      title: 'セルフアテンション機構の可視化',
      subtitle: 'Transformerのコアコンポーネントを探索',
      heatmapTitle: 'アテンション重みヒートマップ',
      qkvTitle: 'Q、K、V ベクトル',
      steps: ['QKV生成', 'スコア計算', 'スケーリング', 'Softmax', '重み付き和'],
      tip: 'ヒートマップのセルにホバーでアテンション重みを確認、トークンをクリックでパターンを表示',
      showQKV: 'QKVベクトルを表示',
      hideQKV: 'QKVベクトルを非表示',
      rowLabel: 'クエリ (Query)',
      colLabel: 'キー (Key)',
      explanation: '各行は1つのトークンが他のすべてのトークンに対するアテンション分布を表します。値が高いほど、そのトークンが対応する位置に注目しています。'
    }
  };

  const t = labels[language];

  // 生成 QKV 向量
  const qkvVectors = useMemo(() => {
    return tokens.map((_, i) => ({
      q: generateMockVector(i * 3),
      k: generateMockVector(i * 3 + 1),
      v: generateMockVector(i * 3 + 2)
    }));
  }, [tokens]);

  // 处理 token 点击
  const handleTokenClick = useCallback((index: number) => {
    setSelectedToken(selectedToken === index ? null : index);
  }, [selectedToken]);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-white/80 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Step Progress */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {t.steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`
                px-3 py-1 text-sm rounded-full transition-all
                ${currentStep === i
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }
              `}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Formula */}
        <FormulaDisplay step={currentStep} language={language} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Left: Attention Heatmap */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">{t.heatmapTitle}</h3>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              {/* Column Labels (Keys) */}
              <div className="flex items-center mb-2 pl-12">
                <div className="text-xs text-red-500 font-medium mb-1 w-full text-center">
                  {t.colLabel}
                </div>
              </div>
              <div className="flex items-center mb-2 pl-12">
                {tokens.map((token, i) => (
                  <div
                    key={i}
                    className={`
                      w-10 text-center text-sm cursor-pointer transition-all
                      ${selectedToken === i ? 'text-purple-600 font-bold' : 'text-gray-600'}
                      ${hoveredCell?.col === i ? 'text-red-500 font-semibold' : ''}
                    `}
                    onClick={() => handleTokenClick(i)}
                  >
                    {token}
                  </div>
                ))}
              </div>

              {/* Heatmap Grid */}
              <div className="flex">
                {/* Row Labels (Queries) */}
                <div className="flex flex-col mr-2">
                  <div className="text-xs text-blue-500 font-medium mb-1 transform -rotate-90 origin-center whitespace-nowrap h-12 flex items-center">
                    {t.rowLabel}
                  </div>
                  {tokens.map((token, i) => (
                    <div
                      key={i}
                      className={`
                        h-10 flex items-center justify-end pr-2 text-sm cursor-pointer transition-all
                        ${selectedToken === i ? 'text-purple-600 font-bold' : 'text-gray-600'}
                        ${hoveredCell?.row === i ? 'text-blue-500 font-semibold' : ''}
                      `}
                      onClick={() => handleTokenClick(i)}
                    >
                      {token}
                    </div>
                  ))}
                </div>

                {/* Matrix */}
                <div className="flex flex-col gap-1">
                  {mockAttentionMatrix.map((row, i) => (
                    <div key={i} className="flex gap-1">
                      {row.map((value, j) => (
                        <AttentionCell
                          key={j}
                          value={value}
                          isHighlighted={
                            (hoveredCell?.row === i && hoveredCell?.col === j) ||
                            selectedToken === i
                          }
                          rowToken={tokens[i]}
                          colToken={tokens[j]}
                          onHover={() => setHoveredCell({ row: i, col: j })}
                          onLeave={() => setHoveredCell(null)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center mt-4 gap-4">
                <span className="text-xs text-gray-500">0%</span>
                <div className="w-32 h-3 rounded-full"
                     style={{
                       background: 'linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.9))'
                     }}
                />
                <span className="text-xs text-gray-500">100%</span>
              </div>
            </div>

            {/* Explanation */}
            <p className="text-sm text-gray-500 mt-3">
              {t.explanation}
            </p>
          </div>

          {/* Right: QKV Vectors */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">{t.qkvTitle}</h3>
              <button
                onClick={() => setShowQKV(!showQKV)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                {showQKV ? t.hideQKV : t.showQKV}
              </button>
            </div>

            <AnimatePresence>
              {showQKV && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-xl p-4 shadow-sm space-y-4"
                >
                  {tokens.map((token, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg transition-all ${
                        selectedToken === i ? 'bg-purple-50 ring-2 ring-purple-300' : 'bg-gray-50'
                      }`}
                      onClick={() => handleTokenClick(i)}
                    >
                      <div className="font-medium text-gray-700 mb-2 cursor-pointer">
                        Token: "{token}"
                      </div>
                      <div className="space-y-1">
                        <VectorDisplay
                          values={qkvVectors[i].q}
                          color={COLORS.query}
                          label="Q"
                          highlighted={selectedToken === i || hoveredCell?.row === i}
                        />
                        <VectorDisplay
                          values={qkvVectors[i].k}
                          color={COLORS.key}
                          label="K"
                          highlighted={selectedToken === i || hoveredCell?.col === i}
                        />
                        <VectorDisplay
                          values={qkvVectors[i].v}
                          color={COLORS.value}
                          label="V"
                          highlighted={selectedToken === i}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Attention Pattern for Selected Token */}
            {selectedToken !== null && (
              <motion.div
                className="mt-4 bg-white rounded-xl p-4 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-medium text-gray-700 mb-3">
                  "{tokens[selectedToken]}" {language === 'zh' ? '的注意力分布' : 'のアテンション分布'}
                </h4>
                <div className="space-y-2">
                  {mockAttentionMatrix[selectedToken].map((value, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-12">{tokens[i]}</span>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: COLORS.attention }}
                          initial={{ width: 0 }}
                          animate={{ width: `${value * 100}%` }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12 text-right">
                        {(value * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tip */}
        <div className="mt-6 text-center text-sm text-gray-400">
          💡 {t.tip}
        </div>
      </div>
    </div>
  );
};

export default AttentionViz;
