/**
 * GPT2VizMain
 * Main container component for GPT-2 visualization
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGPT2 } from './hooks';
import { TokenizationPanel, OutputPanel, AttentionHeatmap, PipelineView } from './visualizations';
import { i18n, I18nStrings } from './i18n';
import { Language, GPT2_SMALL_CONFIG } from './types';

interface GPT2VizMainProps {
  language?: Language;
}

export const GPT2VizMain: React.FC<GPT2VizMainProps> = ({ language = 'zh' }) => {
  const strings: I18nStrings = i18n[language];

  const {
    loadingState,
    isLoaded,
    isLoading,
    loadModel,
    isInferring,
    currentStage,
    result,
    error,
    runInference,
    settings,
    updateSettings,
  } = useGPT2();

  const [inputText, setInputText] = useState('The quick brown fox');
  const [generatedText, setGeneratedText] = useState('');

  // Handle generate button click
  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) return;

    const inferenceResult = await runInference(inputText);
    if (inferenceResult) {
      setGeneratedText(inputText + inferenceResult.generatedToken);
    }
  }, [inputText, runInference]);

  // Handle model load
  const handleLoadModel = useCallback(async () => {
    await loadModel();
  }, [loadModel]);

  // Handle reset
  const handleReset = useCallback(() => {
    setInputText('The quick brown fox');
    setGeneratedText('');
  }, []);

  // Get current attention head
  const currentAttentionHead = result?.attention?.layers?.[settings.selectedLayer]?.[settings.selectedHead] ?? null;

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 border-b border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{strings.title}</h2>
        <p className="text-gray-400">{strings.subtitle}</p>
      </div>

      {/* Model Loading Section */}
      {!isLoaded && (
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLoadModel}
              disabled={isLoading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${
                  isLoading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }
              `}
            >
              {isLoading ? strings.loadingModel : strings.loadModel}
            </button>

            {isLoading && (
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm text-gray-400">{loadingState.statusText}</div>
                  <div className="text-sm text-blue-400">{Math.round(loadingState.progress)}%</div>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingState.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {loadingState.error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {strings.modelError}: {loadingState.error}
            </div>
          )}
        </div>
      )}

      {/* Model Info Badge */}
      {isLoaded && (
        <div className="px-6 py-3 border-b border-gray-800 flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {strings.modelReady}
          </span>
          <span className="text-gray-500">
            GPT-2 Small • {GPT2_SMALL_CONFIG.nLayer} {strings.layers} • {GPT2_SMALL_CONFIG.nHead} {strings.heads}
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {/* Input Controls */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={strings.inputPlaceholder}
              disabled={!isLoaded || isInferring}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg
                         text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none
                         disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleGenerate}
              disabled={!isLoaded || isInferring || !inputText.trim()}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${
                  !isLoaded || isInferring || !inputText.trim()
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-500 text-white'
                }
              `}
            >
              {isInferring ? strings.generating : strings.generate}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-all"
            >
              {strings.reset}
            </button>
          </div>

          {/* Settings */}
          <div className="flex flex-wrap gap-6">
            {/* Temperature */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">{strings.temperature}:</label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={settings.temperature}
                onChange={(e) => updateSettings({ temperature: parseFloat(e.target.value) })}
                className="w-24 accent-blue-500"
              />
              <span className="text-sm text-white w-8">{settings.temperature.toFixed(1)}</span>
            </div>

            {/* Top-K */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">{strings.topK}:</label>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={settings.topK}
                onChange={(e) => updateSettings({ topK: parseInt(e.target.value) })}
                className="w-24 accent-blue-500"
              />
              <span className="text-sm text-white w-8">{settings.topK}</span>
            </div>

            {/* Top-P */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">{strings.topP}:</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={settings.topP}
                onChange={(e) => updateSettings({ topP: parseFloat(e.target.value) })}
                className="w-24 accent-blue-500"
              />
              <span className="text-sm text-white w-8">{settings.topP.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Generated Text Display */}
        {generatedText && (
          <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-2">Generated:</div>
            <div className="text-lg text-white font-mono">
              {generatedText}
              <span className="animate-pulse">|</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="text-red-400">{strings.error}: {error}</div>
          </div>
        )}

        {/* Main Pipeline Visualization - transformer-explainer style */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <PipelineView
                tokens={result?.tokens ?? []}
                predictions={result?.predictions ?? []}
                attentionHead={currentAttentionHead}
                currentStage={currentStage}
                selectedLayer={settings.selectedLayer}
                selectedHead={settings.selectedHead}
                onLayerChange={(layer) => updateSettings({ selectedLayer: layer })}
                onHeadChange={(head) => updateSettings({ selectedHead: head })}
                isActive={currentStage !== 'idle'}
                i18n={strings}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detailed Panels - Collapsible */}
        {result && (
          <details className="group">
            <summary className="cursor-pointer text-gray-400 hover:text-white transition-colors mb-4 flex items-center gap-2">
              <span className="text-sm">详细视图 / Detailed Views</span>
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Tokenization Panel */}
              <TokenizationPanel
                tokens={result?.tokens ?? []}
                inputText={inputText}
                isActive={currentStage === 'tokenizing' || currentStage === 'complete'}
                i18n={strings}
              />

              {/* Attention Heatmap */}
              <AttentionHeatmap
                attentionHead={currentAttentionHead}
                tokens={result?.tokens ?? []}
                selectedLayer={settings.selectedLayer}
                selectedHead={settings.selectedHead}
                onLayerChange={(layer) => updateSettings({ selectedLayer: layer })}
                onHeadChange={(head) => updateSettings({ selectedHead: head })}
                isActive={currentStage === 'attention' || currentStage === 'complete'}
                i18n={strings}
              />

              {/* Output Panel - Full Width */}
              <div className="lg:col-span-2">
                <OutputPanel
                  predictions={result?.predictions ?? []}
                  generatedToken={result?.generatedToken ?? ''}
                  isActive={currentStage === 'output' || currentStage === 'complete'}
                  i18n={strings}
                />
              </div>
            </motion.div>
          </details>
        )}

        {/* Stage Indicator */}
        {isInferring && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
            <span className="text-gray-400">
              {currentStage === 'tokenizing' && strings.stage1}
              {currentStage === 'embedding' && strings.stage2}
              {currentStage === 'attention' && strings.stage3}
              {currentStage === 'mlp' && strings.stage4}
              {currentStage === 'output' && strings.stage5}
            </span>
          </div>
        )}
      </div>

      {/* Model Info Footer */}
      <div className="px-6 py-4 border-t border-gray-800 bg-gray-900/50">
        <div className="flex justify-between text-xs text-gray-500">
          <div>
            {strings.modelInfo}: GPT-2 Small ({strings.parameters}: 124M)
          </div>
          <div>
            {strings.embeddingDim}: {GPT2_SMALL_CONFIG.nEmbd} • {strings.vocabSize}: {GPT2_SMALL_CONFIG.vocabSize.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPT2VizMain;
