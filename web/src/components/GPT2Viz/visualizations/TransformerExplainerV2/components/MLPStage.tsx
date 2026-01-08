/**
 * MLPStage - MLP 前馈网络可视化
 * 展示 FFN: Linear → GELU → Linear
 * GPT-2: 768 → 3072 → 768 (4x expansion)
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenData, COLORS } from '../types';
import { VectorBlock } from './VectorBar';

interface MLPStageProps {
  tokens: TokenData[];
  mlpOutput: number[][];
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  expanded: boolean;
  onToggle: () => void;
  language: 'zh' | 'ja';
}

// GELU 激活函数可视化
const GELUVisualization: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 80, height = 40 }) => {
  // GELU 曲线路径
  const points: string[] = [];
  for (let i = 0; i <= 20; i++) {
    const x = (i / 20) * width;
    const inputX = (i / 20) * 6 - 3; // -3 to 3
    // GELU approximation: 0.5 * x * (1 + tanh(sqrt(2/π) * (x + 0.044715 * x³)))
    const gelu = 0.5 * inputX * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (inputX + 0.044715 * Math.pow(inputX, 3))));
    const y = height - ((gelu + 1.5) / 5) * height; // Normalize to canvas
    points.push(`${x},${y}`);
  }

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* 坐标轴 */}
      <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="#e5e7eb" strokeWidth={1} />
      <line x1={width / 2} y1={0} x2={width / 2} y2={height} stroke="#e5e7eb" strokeWidth={1} />

      {/* GELU 曲线 */}
      <motion.polyline
        points={points.join(' ')}
        fill="none"
        stroke={COLORS.mlp}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
    </svg>
  );
};

// 神经元层可视化
const NeuronLayer: React.FC<{
  count: number;
  maxDisplay?: number;
  color: string;
  label?: string;
  highlighted?: boolean;
}> = ({ count, maxDisplay = 8, color, label, highlighted = false }) => {
  const displayCount = Math.min(count, maxDisplay);
  const hasMore = count > maxDisplay;

  return (
    <div className="flex flex-col items-center gap-1">
      {label && (
        <div className="text-xs text-gray-400 mb-1">{label}</div>
      )}
      <div className="flex flex-col gap-0.5">
        {Array.from({ length: displayCount }, (_, i) => (
          <motion.div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: 6,
              height: 6,
              backgroundColor: color,
              opacity: highlighted ? 1 : 0.5,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.03 }}
          />
        ))}
        {hasMore && (
          <div className="text-gray-300 text-xs leading-none">⋮</div>
        )}
      </div>
      <div className="text-xs text-gray-400 mt-1">{count}</div>
    </div>
  );
};

// 连接线（神经网络风格）
const ConnectionLines: React.FC<{
  leftCount: number;
  rightCount: number;
  highlighted?: boolean;
}> = ({ leftCount, rightCount, highlighted = false }) => {
  const leftDisplay = Math.min(leftCount, 8);
  const rightDisplay = Math.min(rightCount, 8);
  const lineHeight = leftDisplay * 6.5;

  return (
    <svg width={30} height={lineHeight} className="overflow-visible">
      {Array.from({ length: leftDisplay }, (_, i) =>
        Array.from({ length: Math.min(3, rightDisplay) }, (_, j) => {
          const y1 = i * 6.5 + 3;
          const y2 = (j * (lineHeight / Math.min(3, rightDisplay))) + 3;
          return (
            <motion.line
              key={`${i}-${j}`}
              x1={0}
              y1={y1}
              x2={30}
              y2={y2}
              stroke={COLORS.mlp}
              strokeWidth={0.5}
              opacity={highlighted ? 0.4 : 0.15}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: (i + j) * 0.01, duration: 0.3 }}
            />
          );
        })
      )}
    </svg>
  );
};

export const MLPStage: React.FC<MLPStageProps> = ({
  tokens,
  mlpOutput,
  hoveredIndex,
  onHover,
  expanded,
  onToggle,
  language,
}) => {
  const labels = {
    zh: {
      title: 'MLP',
      subtitle: '前馈网络',
      input: '输入',
      hidden: '隐藏层',
      output: '输出',
      gelu: 'GELU',
      expansion: '4x 扩展',
      clickToExpand: '点击展开详情',
    },
    ja: {
      title: 'MLP',
      subtitle: 'フィードフォワード',
      input: '入力',
      hidden: '隠れ層',
      output: '出力',
      gelu: 'GELU',
      expansion: '4x 拡張',
      clickToExpand: 'クリックで詳細表示',
    },
  };

  const t = labels[language];

  return (
    <div
      className={`mlp-stage relative transition-all duration-300 ${
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
              className="expanded-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 网络结构可视化 */}
              <div className="network-structure bg-gray-50 rounded-lg p-4 mb-4">
                <div className="text-xs text-gray-500 mb-3">{t.subtitle}</div>

                <div className="flex items-center justify-center gap-2">
                  {/* 输入层 (768) */}
                  <NeuronLayer
                    count={768}
                    color={COLORS.embedding}
                    label={t.input}
                    highlighted={hoveredIndex !== null}
                  />

                  {/* 连接线 */}
                  <ConnectionLines
                    leftCount={768}
                    rightCount={3072}
                    highlighted={hoveredIndex !== null}
                  />

                  {/* 隐藏层 (3072) + GELU */}
                  <div className="flex flex-col items-center">
                    <NeuronLayer
                      count={3072}
                      color={COLORS.mlp}
                      label={t.hidden}
                      highlighted={hoveredIndex !== null}
                    />
                    <div className="mt-2 flex flex-col items-center">
                      <div className="text-xs text-orange-500 mb-1">{t.gelu}</div>
                      <GELUVisualization />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{t.expansion}</div>
                  </div>

                  {/* 连接线 */}
                  <ConnectionLines
                    leftCount={3072}
                    rightCount={768}
                    highlighted={hoveredIndex !== null}
                  />

                  {/* 输出层 (768) */}
                  <NeuronLayer
                    count={768}
                    color={COLORS.embedding}
                    label={t.output}
                    highlighted={hoveredIndex !== null}
                  />
                </div>
              </div>

              {/* Token 输出列表 */}
              <div className="token-outputs flex flex-col gap-2">
                {tokens.map((token, idx) => (
                  <div
                    key={idx}
                    className={`
                      flex items-center gap-2 p-1 rounded transition-all cursor-pointer
                      ${hoveredIndex === idx ? 'bg-orange-50 ring-1 ring-orange-200' : 'hover:bg-gray-50'}
                    `}
                    onMouseEnter={() => onHover(idx)}
                    onMouseLeave={() => onHover(null)}
                  >
                    <span className="text-xs text-gray-500 w-12 truncate">{token.text}</span>
                    <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                      <motion.div
                        className="h-full rounded"
                        style={{ backgroundColor: COLORS.mlp }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(mlpOutput[idx]?.[0] || 0.5) * 100}%` }}
                        transition={{ delay: idx * 0.05 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            // 折叠时显示简化视图
            <motion.div
              className="collapsed-content flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* 简化的 token 输出 */}
              {tokens.map((_, idx) => (
                <div
                  key={idx}
                  className={`
                    h-6 flex items-center
                    ${hoveredIndex === idx ? 'ring-2 ring-orange-300 rounded' : ''}
                  `}
                  onMouseEnter={() => onHover(idx)}
                  onMouseLeave={() => onHover(null)}
                >
                  <VectorBlock
                    color={COLORS.mlp}
                    height={20}
                    width={12}
                    active={hoveredIndex === idx}
                  />
                </div>
              ))}
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

export default MLPStage;
