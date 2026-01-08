import React, { useState, useCallback, useRef } from 'react';
import {
  Token,
  EmbeddingVector,
  AttentionHead,
  OutputProbability,
  Stage,
  SamplingMethod,
  AnimationSpeed,
} from './types';
import { Language } from './i18n';
import { TransformerVizControls } from './TransformerVizControls';
import { TransformerVizPipeline } from './TransformerVizPipeline';
import { tokenize } from './utils/mockTokenizer';
import {
  generateEmbeddings,
  generateAttentionWeights,
  generateMLPActivations,
  generateOutputProbabilities,
} from './utils/mockAttention';
import { animationTimings, defaultInputs } from './utils/sampleData';

interface TransformerVizProps {
  language?: Language;
}

export const TransformerViz: React.FC<TransformerVizProps> = ({
  language = 'zh',
}) => {
  // State
  const [inputText, setInputText] = useState(defaultInputs[language]);
  const [temperature, setTemperature] = useState(1.0);
  const [topK, setTopK] = useState(5);
  const [topP, setTopP] = useState(0.9);
  const [samplingMethod, setSamplingMethod] = useState<SamplingMethod>('greedy');
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('normal');
  const [isAnimating, setIsAnimating] = useState(false);

  // Stage data
  const [currentStage, setCurrentStage] = useState<Stage>('idle');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [embeddings, setEmbeddings] = useState<EmbeddingVector[]>([]);
  const [attentionHeads, setAttentionHeads] = useState<AttentionHead[]>([]);
  const [mlpActivations, setMLPActivations] = useState<number[]>([]);
  const [outputProbabilities, setOutputProbabilities] = useState<OutputProbability[]>([]);
  const [predictedToken, setPredictedToken] = useState('');

  // Interaction state
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState<number | null>(null);

  // Animation control
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get timing based on animation speed
  const getTiming = useCallback(() => {
    return animationTimings[animationSpeed];
  }, [animationSpeed]);

  // Clear all data
  const clearData = useCallback(() => {
    setTokens([]);
    setEmbeddings([]);
    setAttentionHeads([]);
    setMLPActivations([]);
    setOutputProbabilities([]);
    setPredictedToken('');
    setCurrentStage('idle');
  }, []);

  // Reset handler
  const handleReset = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setIsAnimating(false);
    clearData();
  }, [clearData]);

  // Generate handler with step-by-step animation
  const handleGenerate = useCallback(() => {
    if (!inputText.trim() || isAnimating) return;

    // Clear previous data
    clearData();
    setIsAnimating(true);

    const timing = getTiming();

    // Step 1: Tokenization
    setCurrentStage('tokenization');
    const newTokens = tokenize(inputText);
    setTokens(newTokens);

    // Step 2: Embedding (after tokenization completes)
    animationRef.current = setTimeout(() => {
      setCurrentStage('embedding');
      const newEmbeddings = generateEmbeddings(newTokens);
      setEmbeddings(newEmbeddings);

      // Step 3: Attention (after embedding completes)
      animationRef.current = setTimeout(() => {
        setCurrentStage('attention');
        const newAttentionHeads = generateAttentionWeights(newTokens);
        setAttentionHeads(newAttentionHeads);

        // Step 4: MLP (after attention completes)
        animationRef.current = setTimeout(() => {
          setCurrentStage('mlp');
          const newMLPActivations = generateMLPActivations(newEmbeddings);
          setMLPActivations(newMLPActivations);

          // Step 5: Output (after MLP completes)
          animationRef.current = setTimeout(() => {
            setCurrentStage('output');
            const { probabilities, predicted } = generateOutputProbabilities(
              newTokens,
              temperature,
              topK,
              topP
            );
            setOutputProbabilities(probabilities);
            setPredictedToken(predicted);

            // Complete
            animationRef.current = setTimeout(() => {
              setCurrentStage('complete');
              setIsAnimating(false);
            }, timing.output);
          }, timing.mlp);
        }, timing.attention);
      }, timing.embedding);
    }, timing.tokenization);
  }, [inputText, isAnimating, temperature, topK, topP, getTiming, clearData]);

  // Token interaction handlers
  const handleTokenHover = useCallback((index: number | null) => {
    setHoveredTokenIndex(index);
  }, []);

  const handleTokenClick = useCallback((index: number) => {
    // Could implement token detail view or highlighting
    console.log('Token clicked:', tokens[index]);
  }, [tokens]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          {language === 'zh' ? 'Transformer 可视化演示' : 'Transformer可視化デモ'}
        </h2>
        <p className="text-amber-100 text-sm mt-1">
          {language === 'zh'
            ? '逐步观察 Transformer 如何处理文本并预测下一个 Token'
            : 'Transformerがテキストを処理し次のTokenを予測する過程を段階的に観察'}
        </p>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-stone-200">
        <TransformerVizControls
          language={language}
          inputText={inputText}
          temperature={temperature}
          topK={topK}
          topP={topP}
          samplingMethod={samplingMethod}
          animationSpeed={animationSpeed}
          isAnimating={isAnimating}
          onInputChange={setInputText}
          onTemperatureChange={setTemperature}
          onTopKChange={setTopK}
          onTopPChange={setTopP}
          onSamplingMethodChange={setSamplingMethod}
          onAnimationSpeedChange={setAnimationSpeed}
          onGenerate={handleGenerate}
          onReset={handleReset}
        />
      </div>

      {/* Pipeline Visualization */}
      <div className="p-4 bg-stone-100">
        <TransformerVizPipeline
          language={language}
          currentStage={currentStage}
          tokens={tokens}
          embeddings={embeddings}
          attentionHeads={attentionHeads}
          mlpActivations={mlpActivations}
          outputProbabilities={outputProbabilities}
          predictedToken={predictedToken}
          temperature={temperature}
          topK={topK}
          hoveredTokenIndex={hoveredTokenIndex}
          onTokenHover={handleTokenHover}
          onTokenClick={handleTokenClick}
        />
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500">
        {language === 'zh'
          ? '注：这是一个教学演示，使用模拟数据展示 Transformer 的工作原理。实际模型的计算过程更加复杂。'
          : '注：これは教育用デモで、シミュレーションデータでTransformerの動作原理を示しています。実際のモデルの計算はより複雑です。'
        }
      </div>
    </div>
  );
};

export default TransformerViz;
