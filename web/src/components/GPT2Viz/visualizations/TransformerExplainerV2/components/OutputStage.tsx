/**
 * OutputStage - 输出阶段可视化
 * 展示 Softmax 概率分布、温度控制、Top-K 采样
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProbabilityItem } from '../types';

interface OutputStageProps {
  probabilities: ProbabilityItem[];
  temperature: number;
  topK: number;
  onTemperatureChange: (temp: number) => void;
  onTopKChange: (k: number) => void;
  expanded: boolean;
  onToggle: () => void;
  language: 'zh' | 'ja';
}

// 概率条形图
const ProbabilityBar: React.FC<{
  item: ProbabilityItem;
  maxProb: number;
  rank: number;
  isTopK: boolean;
  onHover: (item: ProbabilityItem | null) => void;
}> = ({ item, maxProb, rank, isTopK, onHover }) => {
  const barWidth = (item.probability / maxProb) * 100;

  return (
    <motion.div
      className={`
        flex items-center gap-2 p-1 rounded cursor-pointer transition-all
        ${isTopK ? 'bg-green-50' : 'bg-gray-50'}
      `}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* 排名 */}
      <span className="text-xs text-gray-400 w-4">{rank + 1}</span>

      {/* Token 文本 */}
      <span
        className={`
          text-sm font-mono w-20 truncate
          ${isTopK ? 'text-green-700 font-medium' : 'text-gray-600'}
        `}
      >
        {item.token}
      </span>

      {/* 概率条 */}
      <div className="flex-1 h-5 bg-gray-200 rounded overflow-hidden relative">
        <motion.div
          className={`h-full rounded ${isTopK ? 'bg-green-500' : 'bg-gray-400'}`}
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 0.3, delay: rank * 0.03 }}
        />
        <span
          className={`
            absolute right-1 top-1/2 -translate-y-1/2 text-xs
            ${barWidth > 50 ? 'text-white' : 'text-gray-600'}
          `}
        >
          {(item.probability * 100).toFixed(1)}%
        </span>
      </div>
    </motion.div>
  );
};

// 温度滑块
const TemperatureSlider: React.FC<{
  value: number;
  onChange: (value: number) => void;
  language: 'zh' | 'ja';
}> = ({ value, onChange, language }) => {
  const labels = {
    zh: {
      temperature: '温度',
      low: '确定性',
      high: '随机性',
    },
    ja: {
      temperature: '温度',
      low: '確定的',
      high: 'ランダム',
    },
  };
  const t = labels[language];

  return (
    <div className="temperature-control">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">{t.temperature}</span>
        <span className="text-xs text-gray-700 font-medium">{value.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-blue-500">{t.low}</span>
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <span className="text-xs text-red-500">{t.high}</span>
      </div>
    </div>
  );
};

// Top-K 选择器
const TopKSelector: React.FC<{
  value: number;
  onChange: (value: number) => void;
  language: 'zh' | 'ja';
}> = ({ value, onChange, language }) => {
  const labels = {
    zh: { topK: 'Top-K', all: '全部' },
    ja: { topK: 'Top-K', all: 'すべて' },
  };
  const t = labels[language];
  const options = [1, 3, 5, 10, 20];

  return (
    <div className="topk-control">
      <div className="text-xs text-gray-500 mb-1">{t.topK}</div>
      <div className="flex gap-1">
        {options.map((k) => (
          <button
            key={k}
            className={`
              px-2 py-1 text-xs rounded transition-all
              ${value === k
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-green-100'
              }
            `}
            onClick={() => onChange(k)}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
};

// Softmax 公式可视化
const SoftmaxFormula: React.FC<{ language: 'zh' | 'ja' }> = ({ language }) => {
  const labels = {
    zh: { formula: 'Softmax 公式' },
    ja: { formula: 'Softmax 式' },
  };

  return (
    <div className="softmax-formula bg-gray-50 rounded p-2 text-center">
      <div className="text-xs text-gray-400 mb-1">{labels[language].formula}</div>
      <div className="font-mono text-sm text-gray-700">
        P(i) = exp(z<sub>i</sub>/T) / Σ exp(z<sub>j</sub>/T)
      </div>
    </div>
  );
};

// 温度效果预览（小图表）
const TemperatureEffectPreview: React.FC<{
  temperature: number;
}> = ({ temperature }) => {
  // 模拟不同温度下的概率分布
  const bars = useMemo(() => {
    const base = [0.6, 0.25, 0.1, 0.03, 0.02];
    const adjusted = base.map((p) => Math.pow(p, 1 / temperature));
    const sum = adjusted.reduce((a, b) => a + b, 0);
    return adjusted.map((p) => (p / sum) * 100);
  }, [temperature]);

  return (
    <div className="flex items-end gap-1 h-12">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-3 bg-purple-400 rounded-t"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  );
};

export const OutputStage: React.FC<OutputStageProps> = ({
  probabilities,
  temperature,
  topK,
  onTemperatureChange,
  onTopKChange,
  expanded,
  onToggle,
  language,
}) => {
  const labels = {
    zh: {
      title: 'Output',
      subtitle: '输出概率',
      nextToken: '下一个词预测',
      clickToExpand: '点击展开详情',
      sampledToken: '采样结果',
    },
    ja: {
      title: 'Output',
      subtitle: '出力確率',
      nextToken: '次の単語予測',
      clickToExpand: 'クリックで詳細表示',
      sampledToken: 'サンプル結果',
    },
  };

  const t = labels[language];

  // 应用温度调整的概率
  const adjustedProbabilities = useMemo(() => {
    const logits = probabilities.map((p) => Math.log(p.probability + 1e-10));
    const adjusted = logits.map((l) => Math.exp(l / temperature));
    const sum = adjusted.reduce((a, b) => a + b, 0);
    return probabilities.map((item, i) => ({
      ...item,
      probability: adjusted[i] / sum,
    }));
  }, [probabilities, temperature]);

  // 排序并取 top
  const sortedProbabilities = useMemo(() => {
    return [...adjustedProbabilities].sort((a, b) => b.probability - a.probability);
  }, [adjustedProbabilities]);

  const maxProb = sortedProbabilities[0]?.probability || 1;

  // State for future hover tooltip functionality
  const [, setHoveredItem] = React.useState<ProbabilityItem | null>(null);

  return (
    <div
      className={`output-stage relative transition-all duration-300 ${
        expanded ? 'z-20' : 'z-10'
      }`}
    >
      {/* 标题 */}
      <div
        className={`
          title text-sm font-medium mb-4 cursor-pointer
          flex items-center gap-2 transition-colors
          ${expanded ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'}
        `}
        onClick={onToggle}
      >
        <span>{t.title}</span>
        <motion.svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          animate={{ rotate: expanded ? 90 : 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      </div>

      {/* 内容区域 */}
      <div className="content">
        <AnimatePresence>
          {expanded ? (
            <motion.div
              className="expanded-content flex flex-col gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 控制面板 */}
              <div className="controls grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                <div>
                  <TemperatureSlider
                    value={temperature}
                    onChange={onTemperatureChange}
                    language={language}
                  />
                  <div className="mt-2">
                    <TemperatureEffectPreview temperature={temperature} />
                  </div>
                </div>
                <div>
                  <TopKSelector value={topK} onChange={onTopKChange} language={language} />
                  <div className="mt-3">
                    <SoftmaxFormula language={language} />
                  </div>
                </div>
              </div>

              {/* 概率分布 */}
              <div className="probability-distribution">
                <div className="text-xs text-gray-500 mb-2">{t.nextToken}</div>
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                  {sortedProbabilities.slice(0, 20).map((item, idx) => (
                    <ProbabilityBar
                      key={item.token}
                      item={item}
                      maxProb={maxProb}
                      rank={idx}
                      isTopK={idx < topK}
                      onHover={setHoveredItem}
                    />
                  ))}
                </div>
              </div>

              {/* 采样结果 */}
              {sortedProbabilities.length > 0 && (
                <div className="sampled-result bg-green-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">{t.sampledToken}</div>
                  <motion.div
                    className="text-lg font-mono text-green-700 font-bold"
                    key={sortedProbabilities[0].token}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    "{sortedProbabilities[0].token}"
                  </motion.div>
                  <div className="text-xs text-gray-500 mt-1">
                    {(sortedProbabilities[0].probability * 100).toFixed(1)}%
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            // 折叠时显示简化视图
            <motion.div
              className="collapsed-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* 迷你概率条 */}
              <div className="flex items-end gap-0.5 h-8">
                {sortedProbabilities.slice(0, 10).map((item, idx) => (
                  <motion.div
                    key={item.token}
                    className={`w-2 rounded-t ${idx < topK ? 'bg-green-500' : 'bg-gray-300'}`}
                    style={{ height: `${item.probability * 100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${item.probability * 100}%` }}
                    transition={{ delay: idx * 0.03 }}
                  />
                ))}
              </div>
              {/* 预测词 */}
              <div className="text-xs text-green-600 font-mono mt-1 truncate">
                → {sortedProbabilities[0]?.token}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover 提示 */}
      {!expanded && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
            {t.clickToExpand}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputStage;
