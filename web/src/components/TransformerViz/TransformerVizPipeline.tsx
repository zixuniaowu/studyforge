import React from 'react';
import { Token, EmbeddingVector, AttentionHead, OutputProbability, Stage } from './types';
import { Language } from './i18n';
import { TokenizationStage } from './stages/TokenizationStage';
import { EmbeddingStage } from './stages/EmbeddingStage';
import { AttentionStage } from './stages/AttentionStage';
import { MLPStage } from './stages/MLPStage';
import { OutputStage } from './stages/OutputStage';

interface TransformerVizPipelineProps {
  language: Language;
  currentStage: Stage;
  tokens: Token[];
  embeddings: EmbeddingVector[];
  attentionHeads: AttentionHead[];
  mlpActivations: number[];
  outputProbabilities: OutputProbability[];
  predictedToken: string;
  temperature: number;
  topK: number;
  hoveredTokenIndex: number | null;
  onTokenHover: (index: number | null) => void;
  onTokenClick: (index: number) => void;
}

// Arrow connector component
const StageArrow: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="flex justify-center py-2">
    <svg
      className={`w-6 h-8 transition-all duration-500 ${isActive ? 'text-amber-500' : 'text-stone-300'}`}
      viewBox="0 0 24 32"
      fill="none"
    >
      <path
        d="M12 4V24M12 24L6 18M12 24L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isActive ? 'animate-pulse' : ''}
      />
    </svg>
  </div>
);

// Stage order for comparison
const stageOrder: Stage[] = ['idle', 'tokenization', 'embedding', 'attention', 'mlp', 'output', 'complete'];

export const TransformerVizPipeline: React.FC<TransformerVizPipelineProps> = ({
  language,
  currentStage,
  tokens,
  embeddings,
  attentionHeads,
  mlpActivations,
  outputProbabilities,
  predictedToken,
  temperature,
  topK,
  hoveredTokenIndex,
  onTokenHover,
  onTokenClick,
}) => {
  const currentIndex = stageOrder.indexOf(currentStage);

  const isStageActive = (stage: Stage): boolean => {
    return currentStage === stage;
  };

  const isStageReached = (stage: Stage): boolean => {
    const stageIndex = stageOrder.indexOf(stage);
    return currentIndex >= stageIndex;
  };

  return (
    <div className="space-y-0">
      {/* Stage 1: Tokenization */}
      <TokenizationStage
        language={language}
        tokens={tokens}
        isActive={isStageActive('tokenization')}
        hoveredTokenIndex={hoveredTokenIndex}
        onTokenHover={onTokenHover}
        onTokenClick={onTokenClick}
      />

      <StageArrow isActive={isStageReached('embedding')} />

      {/* Stage 2: Embedding */}
      <EmbeddingStage
        language={language}
        embeddings={embeddings}
        isActive={isStageActive('embedding')}
        hoveredTokenIndex={hoveredTokenIndex}
        onTokenHover={onTokenHover}
      />

      <StageArrow isActive={isStageReached('attention')} />

      {/* Stage 3: Attention */}
      <AttentionStage
        language={language}
        tokens={tokens}
        attentionHeads={attentionHeads}
        isActive={isStageActive('attention')}
        hoveredTokenIndex={hoveredTokenIndex}
        onTokenHover={onTokenHover}
      />

      <StageArrow isActive={isStageReached('mlp')} />

      {/* Stage 4: MLP */}
      <MLPStage
        language={language}
        tokens={tokens}
        mlpActivations={mlpActivations}
        isActive={isStageActive('mlp')}
        hoveredTokenIndex={hoveredTokenIndex}
        onTokenHover={onTokenHover}
      />

      <StageArrow isActive={isStageReached('output')} />

      {/* Stage 5: Output */}
      <OutputStage
        language={language}
        probabilities={outputProbabilities}
        predictedToken={predictedToken}
        temperature={temperature}
        topK={topK}
        isActive={isStageActive('output') || isStageActive('complete')}
      />

      {/* Completion indicator */}
      {currentStage === 'complete' && (
        <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-center animate-fadeIn">
          <div className="text-emerald-700 font-medium">
            {language === 'zh' ? '✓ 生成完成！' : '✓ 生成完了！'}
          </div>
          <div className="text-xs text-emerald-600 mt-1">
            {language === 'zh'
              ? `预测的下一个 Token 是: "${predictedToken}"`
              : `予測された次のTokenは: "${predictedToken}"`
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default TransformerVizPipeline;
