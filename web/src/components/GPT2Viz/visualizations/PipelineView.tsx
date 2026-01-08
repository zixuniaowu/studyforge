/**
 * PipelineView
 * Main visualization showing the Transformer pipeline from input to output
 * Similar to transformer-explainer's main view
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenInfo, TokenPrediction, InferenceStage, AttentionHead } from '../types';
import { I18nStrings } from '../i18n';

interface PipelineViewProps {
  tokens: TokenInfo[];
  predictions: TokenPrediction[];
  attentionHead: AttentionHead | null;
  currentStage: InferenceStage;
  selectedLayer: number;
  selectedHead: number;
  onLayerChange: (layer: number) => void;
  onHeadChange: (head: number) => void;
  isActive: boolean;
  i18n: I18nStrings;
}

// Color utilities
const getTokenColor = (index: number) => {
  const colors = [
    '#60a5fa', '#a78bfa', '#34d399', '#fbbf24', '#f87171',
    '#2dd4bf', '#fb923c', '#e879f9', '#38bdf8', '#4ade80',
  ];
  return colors[index % colors.length];
};

// Stage configuration
const STAGES = [
  { id: 'input', label: 'Input', labelZh: '输入', labelJa: '入力' },
  { id: 'tokenize', label: 'Tokenize', labelZh: '分词', labelJa: 'トークン化' },
  { id: 'embed', label: 'Embed', labelZh: '嵌入', labelJa: '埋め込み' },
  { id: 'attention', label: 'Attention', labelZh: '注意力', labelJa: 'アテンション' },
  { id: 'mlp', label: 'MLP', labelZh: 'MLP', labelJa: 'MLP' },
  { id: 'output', label: 'Output', labelZh: '输出', labelJa: '出力' },
];

export const PipelineView: React.FC<PipelineViewProps> = ({
  tokens,
  predictions,
  attentionHead,
  currentStage,
  selectedLayer,
  selectedHead,
  onLayerChange,
  onHeadChange,
  isActive,
  i18n,
}) => {
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);
  const [selectedToken, setSelectedToken] = useState<number | null>(null);

  // Determine which stage is active based on currentStage
  const activeStageIndex = useMemo(() => {
    switch (currentStage) {
      case 'tokenizing': return 1;
      case 'embedding': return 2;
      case 'attention': return 3;
      case 'mlp': return 4;
      case 'output':
      case 'complete': return 5;
      default: return 0;
    }
  }, [currentStage]);

  // Get attention weights for selected token
  const getAttentionWeights = (tokenIndex: number) => {
    if (!attentionHead || tokenIndex < 0) return [];
    return attentionHead.weights[tokenIndex] || [];
  };

  const attentionWeights = selectedToken !== null ? getAttentionWeights(selectedToken) : [];

  return (
    <div className={`
      bg-gray-900 rounded-2xl border-2 p-6 transition-all duration-300 overflow-x-auto
      ${isActive ? 'border-blue-500/50 shadow-xl shadow-blue-500/10' : 'border-gray-700/50'}
    `}>
      {/* Stage Labels */}
      <div className="flex justify-between mb-4 min-w-[800px]">
        {STAGES.map((stage, index) => (
          <div
            key={stage.id}
            className={`
              flex-1 text-center text-sm font-medium transition-all
              ${index <= activeStageIndex ? 'text-blue-400' : 'text-gray-600'}
            `}
          >
            {stage.labelZh}
          </div>
        ))}
      </div>

      {/* Main Pipeline Visualization */}
      <div className="relative min-w-[800px] h-[400px]">
        {/* Connection Lines Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Draw connection lines between stages */}
          {tokens.length > 0 && (
            <>
              {/* Stage connectors */}
              {[0, 1, 2, 3, 4].map((stageIdx) => (
                <line
                  key={`connector-${stageIdx}`}
                  x1={`${(stageIdx + 0.5) * (100 / 6) + 8}%`}
                  y1="50%"
                  x2={`${(stageIdx + 1.5) * (100 / 6) - 8}%`}
                  y2="50%"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray={stageIdx < activeStageIndex ? "0" : "5,5"}
                />
              ))}

              {/* Attention connections */}
              {selectedToken !== null && attentionWeights.length > 0 && (
                <>
                  {attentionWeights.map((weight, idx) => {
                    if (weight < 0.05 || idx > selectedToken) return null;
                    const startY = 80 + selectedToken * 40;
                    const endY = 80 + idx * 40;
                    const opacity = Math.min(weight * 2, 1);
                    return (
                      <motion.path
                        key={`attn-${idx}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity }}
                        d={`M ${50 * (100/6)}% ${startY} Q ${55 * (100/6)}% ${(startY + endY) / 2} ${50 * (100/6)}% ${endY}`}
                        fill="none"
                        stroke={getTokenColor(idx)}
                        strokeWidth={Math.max(1, weight * 8)}
                        strokeOpacity={opacity}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </svg>

        {/* Stage Columns */}
        <div className="relative flex h-full">
          {/* Input Stage */}
          <div className="flex-1 flex flex-col items-center justify-center p-2">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 w-full max-w-[120px]">
              <div className="text-xs text-gray-500 mb-2 text-center">Text</div>
              <div className="text-white text-sm font-mono text-center break-all">
                {tokens.length > 0
                  ? tokens.map(t => t.text).join('').slice(0, 20) + (tokens.map(t => t.text).join('').length > 20 ? '...' : '')
                  : '...'}
              </div>
            </div>
          </div>

          {/* Tokenize Stage */}
          <div className="flex-1 flex flex-col items-center justify-start p-2 pt-8 overflow-y-auto max-h-full">
            <AnimatePresence>
              {tokens.map((token, idx) => (
                <motion.div
                  key={`token-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`
                    px-3 py-1.5 mb-2 rounded-lg text-sm font-mono cursor-pointer
                    transition-all duration-200 border
                    ${selectedToken === idx
                      ? 'ring-2 ring-white scale-110 z-10'
                      : hoveredToken === idx
                        ? 'scale-105'
                        : ''}
                  `}
                  style={{
                    backgroundColor: `${getTokenColor(idx)}20`,
                    borderColor: `${getTokenColor(idx)}50`,
                    color: getTokenColor(idx),
                  }}
                  onMouseEnter={() => setHoveredToken(idx)}
                  onMouseLeave={() => setHoveredToken(null)}
                  onClick={() => setSelectedToken(selectedToken === idx ? null : idx)}
                >
                  {token.text.replace(/ /g, '␣') || '␣'}
                </motion.div>
              ))}
            </AnimatePresence>
            {tokens.length === 0 && (
              <div className="text-gray-600 text-sm">...</div>
            )}
          </div>

          {/* Embed Stage */}
          <div className="flex-1 flex flex-col items-center justify-start p-2 pt-8">
            {tokens.map((_, idx) => (
              <motion.div
                key={`embed-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 + 0.2 }}
                className="mb-2 flex gap-0.5"
              >
                {/* Mini embedding vector visualization */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const value = Math.sin((idx + 1) * (i + 1) * 0.5);
                  return (
                    <div
                      key={i}
                      className="w-2 h-6 rounded-sm"
                      style={{
                        backgroundColor: value > 0
                          ? `rgba(96, 165, 250, ${Math.abs(value)})`
                          : `rgba(248, 113, 113, ${Math.abs(value)})`,
                      }}
                    />
                  );
                })}
              </motion.div>
            ))}
            {tokens.length > 0 && (
              <div className="text-xs text-gray-500 mt-2">768-dim</div>
            )}
          </div>

          {/* Attention Stage */}
          <div className="flex-1 flex flex-col items-center justify-center p-2">
            {tokens.length > 0 && attentionHead && (
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/50">
                {/* Mini attention heatmap */}
                <div className="grid gap-0.5" style={{
                  gridTemplateColumns: `repeat(${Math.min(tokens.length, 6)}, 1fr)`
                }}>
                  {attentionHead.weights.slice(0, 6).map((row, i) => (
                    row.slice(0, 6).map((weight, j) => (
                      <motion.div
                        key={`${i}-${j}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (i * 6 + j) * 0.01 }}
                        className={`w-4 h-4 rounded-sm ${
                          selectedToken === i ? 'ring-1 ring-white' : ''
                        }`}
                        style={{
                          backgroundColor: j <= i
                            ? `rgba(139, 92, 246, ${weight})`
                            : 'transparent',
                        }}
                      />
                    ))
                  ))}
                </div>

                {/* Layer/Head selector */}
                <div className="mt-3 flex gap-2 text-xs">
                  <select
                    value={selectedLayer}
                    onChange={(e) => onLayerChange(Number(e.target.value))}
                    className="bg-gray-700 text-gray-300 rounded px-2 py-1"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>L{i}</option>
                    ))}
                  </select>
                  <select
                    value={selectedHead}
                    onChange={(e) => onHeadChange(Number(e.target.value))}
                    className="bg-gray-700 text-gray-300 rounded px-2 py-1"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>H{i}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {tokens.length === 0 && (
              <div className="text-gray-600 text-sm">...</div>
            )}
          </div>

          {/* MLP Stage */}
          <div className="flex-1 flex flex-col items-center justify-center p-2">
            {tokens.length > 0 && (
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/50">
                {/* MLP visualization - show neuron activations */}
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-gray-500 text-center">FFN</div>
                  <div className="flex gap-1 justify-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={`mlp-in-${i}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="w-3 h-3 rounded-full bg-blue-500/50"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center">↓</div>
                  <div className="flex gap-1 justify-center flex-wrap max-w-[80px]">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={`mlp-hidden-${i}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.03 }}
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: `rgba(250, 204, 21, ${0.3 + Math.random() * 0.7})`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center">↓</div>
                  <div className="flex gap-1 justify-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={`mlp-out-${i}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="w-3 h-3 rounded-full bg-green-500/50"
                      />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  768→3072→768
                </div>
              </div>
            )}
          </div>

          {/* Output Stage */}
          <div className="flex-1 flex flex-col items-center justify-center p-2">
            {predictions.length > 0 && (
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/50 w-full max-w-[140px]">
                <div className="text-xs text-gray-500 mb-2 text-center">
                  {i18n.nextTokenPrediction}
                </div>
                {predictions.slice(0, 5).map((pred, idx) => (
                  <motion.div
                    key={`pred-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 mb-1"
                  >
                    <div className="flex-1 h-4 bg-gray-700 rounded overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pred.probability * 100}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`h-full ${idx === 0 ? 'bg-green-500' : 'bg-blue-500/50'}`}
                      />
                    </div>
                    <span className={`text-xs font-mono truncate w-12 ${
                      idx === 0 ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {pred.token.slice(0, 4)}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
            {predictions.length === 0 && (
              <div className="text-gray-600 text-sm">...</div>
            )}
          </div>
        </div>
      </div>

      {/* Legend / Info */}
      <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-between items-center text-xs text-gray-500">
        <div>
          {i18n.tipClick}: Token を選択して Attention を確認
        </div>
        <div>
          GPT-2 Small: 12 {i18n.layers} × 12 {i18n.heads}
        </div>
      </div>
    </div>
  );
};

export default PipelineView;
