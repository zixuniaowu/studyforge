/**
 * TransformerFlowViz
 * Educational visualization showing the complete Transformer computation flow
 * Similar to transformer-explainer's main visualization
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransformerFlowVizProps {
  language: 'zh' | 'ja';
}

// Simulated token data
interface Token {
  text: string;
  id: number;
  embedding: number[];
  position: number[];
}

// Color utilities
const getTokenColor = (index: number) => {
  const colors = [
    '#60a5fa', '#a78bfa', '#34d399', '#fbbf24', '#f87171',
    '#2dd4bf', '#fb923c', '#e879f9', '#38bdf8', '#4ade80',
  ];
  return colors[index % colors.length];
};

// Generate deterministic pseudo-random number
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate embedding vector visualization
const generateEmbedding = (tokenId: number, dim: number = 8): number[] => {
  return Array.from({ length: dim }, (_, i) =>
    Math.sin(tokenId * 0.5 + i * 0.3) * 0.8 + seededRandom(tokenId * 100 + i) * 0.4 - 0.2
  );
};

// Generate position encoding
const generatePositionEncoding = (position: number, dim: number = 8): number[] => {
  return Array.from({ length: dim }, (_, i) => {
    const angle = position / Math.pow(10000, (2 * Math.floor(i / 2)) / dim);
    return i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
  });
};

// Sample vocabulary for demo
const VOCAB: Record<string, number> = {
  'The': 464, 'quick': 2068, 'brown': 5765, 'fox': 22084, 'jumps': 22496,
  'over': 961, 'the': 262, 'lazy': 15018, 'dog': 3290, '.': 13,
  'Data': 6601, 'is': 318, 'new': 649, 'oil': 3050,
  ' ': 220, 'a': 64, 'A': 32, 'I': 40, 'love': 1842, 'AI': 9552,
};

// Tokenize text (simplified)
const tokenize = (text: string): Token[] => {
  const words = text.split(/(\s+)/);
  return words.filter(w => w).map((word, idx) => {
    const tokenId = VOCAB[word] ?? (word.charCodeAt(0) * 100 + idx);
    return {
      text: word,
      id: tokenId,
      embedding: generateEmbedding(tokenId),
      position: generatePositionEncoding(idx),
    };
  });
};

// Generate attention matrix
const generateAttention = (tokens: Token[], headSeed: number): number[][] => {
  const n = tokens.length;
  const matrix: number[][] = [];

  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    let sum = 0;
    for (let j = 0; j < n; j++) {
      if (j <= i) {
        // Causal attention: can only attend to previous tokens
        const score = Math.abs(seededRandom(headSeed * 1000 + i * 100 + j)) + 0.1;
        row.push(score);
        sum += score;
      } else {
        row.push(0);
      }
    }
    // Normalize (softmax approximation)
    matrix.push(row.map(v => v / sum));
  }
  return matrix;
};

// Generate output probabilities
const generateOutputProbs = (_tokens: Token[]): { token: string; prob: number }[] => {
  const candidates = [
    { token: 'jumps', prob: 0.35 },
    { token: 'runs', prob: 0.22 },
    { token: 'leaps', prob: 0.15 },
    { token: 'walks', prob: 0.10 },
    { token: 'sits', prob: 0.08 },
    { token: 'sleeps', prob: 0.05 },
    { token: 'eats', prob: 0.03 },
    { token: 'plays', prob: 0.02 },
  ];
  return candidates;
};

// Vector visualization component
const VectorViz: React.FC<{
  values: number[];
  label?: string;
  color?: string;
  height?: number;
}> = ({ values, label, color = '#60a5fa', height = 40 }) => (
  <div className="flex flex-col items-center">
    {label && <div className="text-xs text-gray-500 mb-1">{label}</div>}
    <div className="flex gap-0.5">
      {values.map((v, i) => (
        <div
          key={i}
          className="w-2 rounded-sm transition-all duration-300"
          style={{
            height: `${Math.abs(v) * height}px`,
            minHeight: '4px',
            backgroundColor: v >= 0 ? color : '#f87171',
            opacity: 0.3 + Math.abs(v) * 0.7,
          }}
        />
      ))}
    </div>
  </div>
);

// Mini attention heatmap
const AttentionMiniMap: React.FC<{
  matrix: number[][];
  tokens: Token[];
  selectedRow?: number;
  onHover?: (row: number | null) => void;
}> = ({ matrix, tokens, selectedRow, onHover }) => {
  const size = Math.min(tokens.length, 8);
  const cellSize = 16;

  return (
    <div className="inline-block">
      <div
        className="grid gap-0.5"
        style={{ gridTemplateColumns: `repeat(${size}, ${cellSize}px)` }}
      >
        {matrix.slice(0, size).map((row, i) => (
          row.slice(0, size).map((val, j) => (
            <motion.div
              key={`${i}-${j}`}
              className={`rounded-sm cursor-pointer transition-all ${
                selectedRow === i ? 'ring-1 ring-white' : ''
              }`}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: j <= i
                  ? `rgba(139, 92, 246, ${val})`
                  : 'rgba(31, 41, 55, 0.5)',
              }}
              onMouseEnter={() => onHover?.(i)}
              onMouseLeave={() => onHover?.(null)}
              whileHover={{ scale: 1.2 }}
            />
          ))
        ))}
      </div>
    </div>
  );
};

export const TransformerFlowViz: React.FC<TransformerFlowVizProps> = ({ language }) => {
  const [inputText, setInputText] = useState('The quick brown fox');
  const [temperature, setTemperature] = useState(1.0);
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [selectedHead, setSelectedHead] = useState(0);
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Process tokens
  const tokens = useMemo(() => tokenize(inputText), [inputText]);

  // Generate attention for current head
  const attention = useMemo(
    () => generateAttention(tokens, selectedLayer * 12 + selectedHead),
    [tokens, selectedLayer, selectedHead]
  );

  // Generate output probabilities
  const outputProbs = useMemo(() => generateOutputProbs(tokens), [tokens]);

  // Animation steps
  const steps = [
    { id: 'input', label: language === 'zh' ? '输入文本' : '入力テキスト' },
    { id: 'tokenize', label: language === 'zh' ? '分词' : 'トークン化' },
    { id: 'embed', label: language === 'zh' ? '嵌入' : '埋め込み' },
    { id: 'attention', label: language === 'zh' ? '注意力' : 'アテンション' },
    { id: 'mlp', label: 'MLP' },
    { id: 'output', label: language === 'zh' ? '输出' : '出力' },
  ];

  // Auto-animate through steps
  const runAnimation = useCallback(() => {
    setIsAnimating(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [steps.length]);

  // Labels
  const labels = {
    zh: {
      title: 'Transformer 工作原理可视化',
      subtitle: '观察 GPT-2 如何处理文本并预测下一个词',
      inputPlaceholder: '输入文本...',
      run: '运行',
      running: '处理中...',
      step: '步骤',
      tokenId: 'Token ID',
      embedding: '词嵌入',
      position: '位置编码',
      combined: '合并',
      qkv: 'Q·K·V',
      attentionWeights: '注意力权重',
      layer: '层',
      head: '头',
      prediction: '预测',
      probability: '概率',
    },
    ja: {
      title: 'Transformer 動作原理の可視化',
      subtitle: 'GPT-2がテキストを処理し次の単語を予測する様子を観察',
      inputPlaceholder: 'テキストを入力...',
      run: '実行',
      running: '処理中...',
      step: 'ステップ',
      tokenId: 'Token ID',
      embedding: '単語埋め込み',
      position: '位置エンコーディング',
      combined: '結合',
      qkv: 'Q·K·V',
      attentionWeights: 'アテンション重み',
      layer: '層',
      head: 'ヘッド',
      prediction: '予測',
      probability: '確率',
    },
  };

  const t = labels[language];

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 p-4 border-b border-gray-700">
        <h3 className="text-xl font-bold text-white mb-1">{t.title}</h3>
        <p className="text-gray-400 text-sm">{t.subtitle}</p>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-gray-800 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.inputPlaceholder}
          className="flex-1 min-w-[200px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                     text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={runAnimation}
          disabled={isAnimating}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            isAnimating
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {isAnimating ? t.running : t.run}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Temperature:</span>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-20 accent-blue-500"
          />
          <span className="text-sm text-white w-8">{temperature.toFixed(1)}</span>
        </div>
      </div>

      {/* Step Progress */}
      <div className="px-4 py-3 border-b border-gray-800 bg-gray-800/30">
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center gap-2 ${idx <= currentStep ? 'text-blue-400' : 'text-gray-600'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${idx < currentStep ? 'bg-blue-500 text-white' :
                    idx === currentStep ? 'bg-blue-500/50 text-white ring-2 ring-blue-400' :
                    'bg-gray-700 text-gray-500'}`}>
                  {idx + 1}
                </div>
                <span className="text-xs hidden sm:inline">{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 ${idx < currentStep ? 'bg-blue-500' : 'bg-gray-700'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="p-4 overflow-x-auto">
        <div className="min-w-[900px] flex gap-4">

          {/* Step 1 & 2: Input & Tokenization */}
          <div className={`flex-shrink-0 w-40 transition-opacity duration-300 ${currentStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 h-full">
              <div className="text-xs text-gray-500 mb-3 text-center">1. {t.step}: {steps[1].label}</div>
              <div className="space-y-2">
                <AnimatePresence>
                  {tokens.map((token, idx) => (
                    <motion.div
                      key={`token-${idx}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                        hoveredToken === idx ? 'scale-105 ring-2 ring-white' : ''
                      }`}
                      style={{
                        backgroundColor: `${getTokenColor(idx)}20`,
                        borderColor: `${getTokenColor(idx)}50`,
                      }}
                      onMouseEnter={() => setHoveredToken(idx)}
                      onMouseLeave={() => setHoveredToken(null)}
                    >
                      <div className="text-sm font-mono" style={{ color: getTokenColor(idx) }}>
                        "{token.text === ' ' ? '␣' : token.text}"
                      </div>
                      <div className="text-xs text-gray-500">ID: {token.id}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Step 3: Embedding */}
          <div className={`flex-shrink-0 w-48 transition-opacity duration-300 ${currentStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 h-full">
              <div className="text-xs text-gray-500 mb-3 text-center">2. {t.step}: {steps[2].label}</div>
              <div className="space-y-3">
                {tokens.slice(0, 5).map((token, idx) => (
                  <motion.div
                    key={`embed-${idx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentStep >= 2 ? 1 : 0.3 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-2 rounded-lg bg-gray-900/50 ${
                      hoveredToken === idx ? 'ring-1 ring-blue-400' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono" style={{ color: getTokenColor(idx) }}>
                        {token.text === ' ' ? '␣' : token.text.slice(0, 4)}
                      </span>
                    </div>
                    <div className="flex gap-2 items-end">
                      <VectorViz values={token.embedding} label={t.embedding} color={getTokenColor(idx)} height={24} />
                      <span className="text-gray-600 text-lg">+</span>
                      <VectorViz values={token.position} label={t.position} color="#94a3b8" height={24} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Attention */}
          <div className={`flex-shrink-0 w-56 transition-opacity duration-300 ${currentStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 h-full">
              <div className="text-xs text-gray-500 mb-3 text-center">3. {t.step}: {steps[3].label}</div>

              {/* Layer/Head selector */}
              <div className="flex gap-2 mb-3 justify-center">
                <select
                  value={selectedLayer}
                  onChange={(e) => setSelectedLayer(Number(e.target.value))}
                  className="bg-gray-700 text-gray-300 text-xs rounded px-2 py-1"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>{t.layer} {i}</option>
                  ))}
                </select>
                <select
                  value={selectedHead}
                  onChange={(e) => setSelectedHead(Number(e.target.value))}
                  className="bg-gray-700 text-gray-300 text-xs rounded px-2 py-1"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>{t.head} {i}</option>
                  ))}
                </select>
              </div>

              {/* Q K V visualization */}
              <div className="mb-3 p-2 bg-gray-900/50 rounded-lg">
                <div className="text-xs text-gray-500 mb-2 text-center">{t.qkv}</div>
                <div className="flex justify-center gap-4">
                  {['Q', 'K', 'V'].map((name) => (
                    <div key={name} className="text-center">
                      <div className="w-8 h-8 rounded bg-purple-500/30 flex items-center justify-center text-purple-300 text-xs font-bold mb-1">
                        {name}
                      </div>
                      <div className="text-[10px] text-gray-500">[{tokens.length}×64]</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attention heatmap */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-2">{t.attentionWeights}</div>
                <AttentionMiniMap
                  matrix={attention}
                  tokens={tokens}
                  selectedRow={hoveredToken ?? undefined}
                  onHover={setHoveredToken}
                />
                {/* Legend */}
                <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-500">
                  <span>0%</span>
                  <div className="w-16 h-2 rounded bg-gradient-to-r from-gray-800 to-purple-500" />
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: MLP */}
          <div className={`flex-shrink-0 w-40 transition-opacity duration-300 ${currentStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 h-full">
              <div className="text-xs text-gray-500 mb-3 text-center">4. {t.step}: MLP</div>

              {/* MLP architecture */}
              <div className="flex flex-col items-center gap-2">
                {/* Input layer */}
                <div className="flex gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={`in-${i}`}
                      className="w-3 h-3 rounded-full bg-blue-500/60"
                      animate={{ scale: currentStep >= 4 ? [1, 1.2, 1] : 1 }}
                      transition={{ delay: i * 0.1, repeat: currentStep >= 4 ? Infinity : 0, repeatDelay: 2 }}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-gray-500">768</div>

                {/* Arrow */}
                <div className="text-gray-600">↓</div>
                <div className="text-[10px] text-gray-500">GELU</div>

                {/* Hidden layer */}
                <div className="flex flex-wrap gap-0.5 justify-center max-w-[100px]">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={`hidden-${i}`}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: `rgba(250, 204, 21, ${0.3 + seededRandom(i) * 0.7})` }}
                      animate={{ opacity: currentStep >= 4 ? [0.5, 1, 0.5] : 0.5 }}
                      transition={{ delay: i * 0.05, repeat: currentStep >= 4 ? Infinity : 0, repeatDelay: 1 }}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-gray-500">3072</div>

                {/* Arrow */}
                <div className="text-gray-600">↓</div>

                {/* Output layer */}
                <div className="flex gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={`out-${i}`}
                      className="w-3 h-3 rounded-full bg-green-500/60"
                      animate={{ scale: currentStep >= 4 ? [1, 1.2, 1] : 1 }}
                      transition={{ delay: 0.5 + i * 0.1, repeat: currentStep >= 4 ? Infinity : 0, repeatDelay: 2 }}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-gray-500">768</div>
              </div>

              {/* ×12 layers indicator */}
              <div className="mt-4 text-center text-xs text-gray-500 border-t border-gray-700 pt-2">
                × 12 {t.layer}s
              </div>
            </div>
          </div>

          {/* Step 6: Output */}
          <div className={`flex-shrink-0 w-44 transition-opacity duration-300 ${currentStep >= 5 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 h-full">
              <div className="text-xs text-gray-500 mb-3 text-center">5. {t.step}: {steps[5].label}</div>

              <div className="text-xs text-gray-500 mb-2 text-center">{t.prediction}</div>

              {/* Output probabilities */}
              <div className="space-y-2">
                {outputProbs.slice(0, 6).map((item, idx) => (
                  <motion.div
                    key={item.token}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: currentStep >= 5 ? 1 : 0.3, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-14 text-xs font-mono text-gray-300 truncate">
                      {item.token}
                    </div>
                    <div className="flex-1 h-4 bg-gray-700 rounded overflow-hidden">
                      <motion.div
                        className={`h-full ${idx === 0 ? 'bg-green-500' : 'bg-blue-500/50'}`}
                        initial={{ width: 0 }}
                        animate={{ width: currentStep >= 5 ? `${item.prob * 100}%` : 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                      />
                    </div>
                    <div className="w-10 text-xs text-gray-400 text-right">
                      {(item.prob * 100).toFixed(0)}%
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Selected output */}
              {currentStep >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-center"
                >
                  <div className="text-xs text-green-400 mb-1">→ {t.prediction}</div>
                  <div className="text-lg font-bold text-green-300">"{outputProbs[0].token}"</div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="px-4 py-3 border-t border-gray-800 bg-gray-800/30 flex justify-between text-xs text-gray-500">
        <div>GPT-2 Small: 12 layers × 12 heads × 768 dim</div>
        <div>
          {language === 'zh' ? '悬停 Token 查看注意力分布' : 'トークンにホバーしてアテンションを確認'}
        </div>
      </div>
    </div>
  );
};

export default TransformerFlowViz;
