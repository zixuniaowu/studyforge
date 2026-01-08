/**
 * TransformerExplainerV2 - GPT-2 Transformer 可视化
 * 纯动画演示版本，无说明文字
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTransformerState } from './useTransformerState';
import { EmbeddingStage } from './components/EmbeddingStage';
import { QKVStage } from './components/QKVStage';
import { AttentionStage } from './components/AttentionStage';
import { MLPStage } from './components/MLPStage';
import { OutputStage } from './components/OutputStage';
import { EXAMPLE_INPUTS } from './mockData';

interface TransformerExplainerV2Props {
  language?: 'zh' | 'ja';
  /** 是否显示输入控制区域 */
  showInput?: boolean;
  /** 是否显示紧凑模式（更小的间距） */
  compact?: boolean;
}

// 简化的输入选择器
const InputSelector: React.FC<{
  exampleIndex: number;
  onExampleSelect: (idx: number) => void;
  onRun: () => void;
}> = ({ exampleIndex, onExampleSelect, onRun }) => {
  return (
    <div className="flex items-center gap-3 mb-4 flex-wrap">
      <span className="text-sm text-gray-500">输入:</span>
      <div className="flex gap-2 flex-wrap">
        {EXAMPLE_INPUTS.map((example, idx) => (
          <button
            key={idx}
            onClick={() => onExampleSelect(idx)}
            className={`
              px-3 py-1.5 text-sm rounded-lg transition-all
              ${exampleIndex === idx
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
              }
            `}
          >
            {example.slice(0, 15)}...
          </button>
        ))}
      </div>
      <button
        onClick={onRun}
        className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors ml-auto"
      >
        刷新
      </button>
    </div>
  );
};

// 阶段卡片
const StageCard: React.FC<{
  children: React.ReactNode;
  expanded?: boolean;
}> = ({ children, expanded = false }) => {
  return (
    <motion.div
      className={`
        stage-card bg-white rounded-lg shadow-sm p-3 min-w-[160px]
        transition-all duration-300
        ${expanded ? 'ring-2 ring-purple-300' : ''}
      `}
      layout
    >
      {children}
    </motion.div>
  );
};

// 箭头连接符
const Arrow: React.FC = () => (
  <div className="flex items-center px-1">
    <svg className="w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

// 主组件
export const TransformerExplainerV2: React.FC<TransformerExplainerV2Props> = ({
  language = 'zh',
  showInput = true,
  compact = false,
}) => {
  const state = useTransformerState();

  // 初始化时运行模型
  useEffect(() => {
    state.runModel();
  }, []);

  return (
    <div className={`transformer-explainer-v2 ${compact ? 'p-2' : 'p-4'}`}>
      {/* 可选的输入选择器 */}
      {showInput && (
        <InputSelector
          exampleIndex={state.exampleIndex}
          onExampleSelect={state.selectExample}
          onRun={state.runModel}
        />
      )}

      {/* 流水线可视化 */}
      <div className={`pipeline bg-gray-50 rounded-xl ${compact ? 'p-3' : 'p-4'}`}>
        <div className="flex items-start gap-2 overflow-x-auto pb-2">
          {/* Embedding */}
          <StageCard expanded={state.expandedBlock === 'embedding'}>
            <EmbeddingStage
              tokens={state.modelOutput.tokens}
              expanded={state.expandedBlock === 'embedding'}
              onToggle={() => state.toggleBlock('embedding')}
              hoveredIndex={state.hoveredTokenIndex}
              onHover={state.setHoveredTokenIndex}
              language={language}
            />
          </StageCard>

          <Arrow />

          {/* QKV */}
          <StageCard expanded={state.expandedBlock === 'qkv'}>
            <QKVStage
              tokens={state.modelOutput.tokens}
              qkv={state.modelOutput.qkv}
              hoveredIndex={state.hoveredTokenIndex}
              onHover={state.setHoveredTokenIndex}
              language={language}
            />
          </StageCard>

          <Arrow />

          {/* Attention */}
          <StageCard expanded={state.expandedBlock === 'attention'}>
            <AttentionStage
              tokens={state.modelOutput.tokens}
              attentionHeads={state.modelOutput.attentionHeads}
              selectedHead={state.selectedHead}
              selectedLayer={state.selectedLayer}
              onHeadChange={state.setSelectedHead}
              onLayerChange={state.setSelectedLayer}
              hoveredIndex={state.hoveredTokenIndex}
              onHover={state.setHoveredTokenIndex}
              hoveredCell={state.hoveredMatrixCell}
              onCellHover={state.setHoveredMatrixCell}
              expanded={state.expandedBlock === 'attention'}
              onToggle={() => state.toggleBlock('attention')}
              language={language}
            />
          </StageCard>

          <Arrow />

          {/* MLP */}
          <StageCard expanded={state.expandedBlock === 'mlp'}>
            <MLPStage
              tokens={state.modelOutput.tokens}
              mlpOutput={state.modelOutput.mlpOutput}
              hoveredIndex={state.hoveredTokenIndex}
              onHover={state.setHoveredTokenIndex}
              expanded={state.expandedBlock === 'mlp'}
              onToggle={() => state.toggleBlock('mlp')}
              language={language}
            />
          </StageCard>

          <Arrow />

          {/* Output */}
          <StageCard expanded={state.expandedBlock === 'output'}>
            <OutputStage
              probabilities={state.modelOutput.probabilities}
              temperature={state.temperature}
              topK={state.topK}
              onTemperatureChange={state.setTemperature}
              onTopKChange={state.setTopK}
              expanded={state.expandedBlock === 'output'}
              onToggle={() => state.toggleBlock('output')}
              language={language}
            />
          </StageCard>
        </div>
      </div>
    </div>
  );
};

export default TransformerExplainerV2;
