/**
 * AttentionStage - 自注意力阶段可视化
 * 展示注意力矩阵热力图和多头注意力选择
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenData, AttentionHead, MODEL_META } from '../types';

interface AttentionStageProps {
  tokens: TokenData[];
  attentionHeads: AttentionHead[];
  selectedHead: number;
  selectedLayer: number;
  onHeadChange: (head: number) => void;
  onLayerChange: (layer: number) => void;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  hoveredCell: { row: number; col: number } | null;
  onCellHover: (cell: { row: number; col: number } | null) => void;
  expanded: boolean;
  onToggle: () => void;
  language: 'zh' | 'ja';
}

// 注意力矩阵热力图
const AttentionMatrix: React.FC<{
  matrix: number[][];
  tokens: TokenData[];
  hoveredCell: { row: number; col: number } | null;
  onCellHover: (cell: { row: number; col: number } | null) => void;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  cellSize?: number;
}> = ({ matrix, tokens, hoveredCell, onCellHover, hoveredIndex, onHover, cellSize = 24 }) => {
  const size = tokens.length;

  // 获取颜色强度
  const getColor = (value: number) => {
    // 使用紫色渐变
    const intensity = Math.min(value, 1);
    return `rgba(139, 92, 246, ${0.1 + intensity * 0.9})`;
  };

  return (
    <div className="attention-matrix">
      {/* 列标签（源 token） */}
      <div className="flex ml-16 mb-1">
        {tokens.map((token, i) => (
          <div
            key={i}
            className={`
              text-xs text-center truncate cursor-pointer transition-colors
              ${hoveredCell?.col === i || hoveredIndex === i ? 'text-purple-600 font-medium' : 'text-gray-400'}
            `}
            style={{ width: cellSize }}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
          >
            {token.text.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* 行标签（目标 token） */}
        <div className="flex flex-col mr-1">
          {tokens.map((token, i) => (
            <div
              key={i}
              className={`
                w-14 text-xs text-right pr-1 truncate cursor-pointer transition-colors flex items-center justify-end
                ${hoveredCell?.row === i || hoveredIndex === i ? 'text-purple-600 font-medium' : 'text-gray-400'}
              `}
              style={{ height: cellSize }}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
            >
              {token.text.slice(0, 4)}
            </div>
          ))}
        </div>

        {/* 矩阵网格 */}
        <div
          className="grid gap-px bg-gray-100 p-px rounded"
          style={{
            gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
          }}
        >
          {matrix.map((row, rowIdx) =>
            row.map((value, colIdx) => {
              const isHighlighted =
                hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;
              const isRowHighlighted = hoveredCell?.row === rowIdx || hoveredIndex === rowIdx;
              const isColHighlighted = hoveredCell?.col === colIdx || hoveredIndex === colIdx;

              return (
                <motion.div
                  key={`${rowIdx}-${colIdx}`}
                  className={`
                    relative cursor-pointer transition-all
                    ${isHighlighted ? 'ring-2 ring-purple-500 z-10' : ''}
                    ${isRowHighlighted || isColHighlighted ? 'brightness-110' : ''}
                  `}
                  style={{
                    backgroundColor: getColor(value),
                    width: cellSize,
                    height: cellSize,
                  }}
                  onMouseEnter={() => onCellHover({ row: rowIdx, col: colIdx })}
                  onMouseLeave={() => onCellHover(null)}
                  whileHover={{ scale: 1.1 }}
                >
                  {isHighlighted && (
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {(value * 100).toFixed(1)}%
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

// 注意力头选择器
const HeadSelector: React.FC<{
  numHeads: number;
  numLayers: number;
  selectedHead: number;
  selectedLayer: number;
  onHeadChange: (head: number) => void;
  onLayerChange: (layer: number) => void;
  language: 'zh' | 'ja';
}> = ({ numHeads, numLayers, selectedHead, selectedLayer, onHeadChange, onLayerChange, language }) => {
  const labels = {
    zh: { layer: '层', head: '头' },
    ja: { layer: 'レイヤー', head: 'ヘッド' }
  };
  const t = labels[language];

  return (
    <div className="head-selector flex flex-col gap-3 p-3 bg-gray-50 rounded-lg">
      {/* 层选择 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 w-16">{t.layer}</span>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: Math.min(numLayers, 6) }, (_, i) => (
            <button
              key={i}
              className={`
                w-6 h-6 text-xs rounded transition-all
                ${selectedLayer === i
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-purple-100'
                }
              `}
              onClick={() => onLayerChange(i)}
            >
              {i + 1}
            </button>
          ))}
          {numLayers > 6 && (
            <span className="text-xs text-gray-400 flex items-center">...</span>
          )}
        </div>
      </div>

      {/* 头选择 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 w-16">{t.head}</span>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: Math.min(numHeads, 6) }, (_, i) => (
            <button
              key={i}
              className={`
                w-6 h-6 text-xs rounded transition-all
                ${selectedHead === i
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-100'
                }
              `}
              onClick={() => onHeadChange(i)}
            >
              {i + 1}
            </button>
          ))}
          {numHeads > 6 && (
            <span className="text-xs text-gray-400 flex items-center">...</span>
          )}
        </div>
      </div>
    </div>
  );
};

// 注意力模式描述
const AttentionPatternDescription: React.FC<{
  selectedHead: number;
  selectedLayer: number;
  language: 'zh' | 'ja';
}> = ({ selectedHead, selectedLayer, language }) => {
  // 模拟不同头的注意力模式描述
  const patterns = {
    zh: [
      '关注前一个词',
      '关注句子开头',
      '关注标点符号',
      '关注相似词性',
      '关注语义相关',
      '全局注意力',
    ],
    ja: [
      '前の単語に注目',
      '文の先頭に注目',
      '句読点に注目',
      '品詞が類似する語に注目',
      '意味的に関連する語に注目',
      'グローバルな注意',
    ],
  };

  const patternIdx = (selectedHead + selectedLayer) % patterns[language].length;

  return (
    <motion.div
      className="text-xs text-gray-500 mt-2"
      key={`${selectedHead}-${selectedLayer}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {patterns[language][patternIdx]}
    </motion.div>
  );
};

export const AttentionStage: React.FC<AttentionStageProps> = ({
  tokens,
  attentionHeads,
  selectedHead,
  selectedLayer,
  onHeadChange,
  onLayerChange,
  hoveredIndex,
  onHover,
  hoveredCell,
  onCellHover,
  expanded,
  onToggle,
  language,
}) => {
  const labels = {
    zh: {
      title: 'Self-Attention',
      subtitle: '自注意力机制',
      clickToExpand: '点击展开详情',
      attentionWeights: '注意力权重',
    },
    ja: {
      title: 'Self-Attention',
      subtitle: '自己注意機構',
      clickToExpand: 'クリックで詳細表示',
      attentionWeights: '注意重み',
    },
  };

  const t = labels[language];

  // 获取当前选中的注意力头的矩阵
  const currentMatrix = useMemo(() => {
    const head = attentionHeads.find(
      (h) => h.headIndex === selectedHead && h.layerIndex === selectedLayer
    );
    return head?.weights || [];
  }, [attentionHeads, selectedHead, selectedLayer]);

  return (
    <div
      className={`attention-stage relative transition-all duration-300 ${
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
              {/* 头选择器 */}
              <HeadSelector
                numHeads={MODEL_META.numHeads}
                numLayers={MODEL_META.numLayers}
                selectedHead={selectedHead}
                selectedLayer={selectedLayer}
                onHeadChange={onHeadChange}
                onLayerChange={onLayerChange}
                language={language}
              />

              {/* 注意力矩阵 */}
              <div className="matrix-container">
                <div className="text-xs text-gray-400 mb-2">{t.attentionWeights}</div>
                {currentMatrix.length > 0 && (
                  <AttentionMatrix
                    matrix={currentMatrix}
                    tokens={tokens}
                    hoveredCell={hoveredCell}
                    onCellHover={onCellHover}
                    hoveredIndex={hoveredIndex}
                    onHover={onHover}
                    cellSize={Math.min(24, 200 / tokens.length)}
                  />
                )}
              </div>

              {/* 模式描述 */}
              <AttentionPatternDescription
                selectedHead={selectedHead}
                selectedLayer={selectedLayer}
                language={language}
              />
            </motion.div>
          ) : (
            // 折叠时显示简化视图
            <motion.div
              className="collapsed-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* 迷你热力图预览 */}
              <div
                className="mini-heatmap grid gap-px bg-gray-100 p-1 rounded cursor-pointer"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(tokens.length, 8)}, 8px)`,
                  gridTemplateRows: `repeat(${Math.min(tokens.length, 8)}, 8px)`,
                }}
                onClick={onToggle}
              >
                {currentMatrix.slice(0, 8).map((row, rowIdx) =>
                  row.slice(0, 8).map((value, colIdx) => (
                    <div
                      key={`mini-${rowIdx}-${colIdx}`}
                      className="rounded-sm"
                      style={{
                        backgroundColor: `rgba(139, 92, 246, ${0.1 + value * 0.9})`,
                        width: 8,
                        height: 8,
                      }}
                    />
                  ))
                )}
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

export default AttentionStage;
