import React from 'react';
import { Play, RotateCcw, Zap } from 'lucide-react';
import { i18n, Language } from './i18n';
import { SamplingMethod, AnimationSpeed } from './types';
import { sampleInputs } from './utils/sampleData';

interface TransformerVizControlsProps {
  language: Language;
  inputText: string;
  temperature: number;
  topK: number;
  topP: number;
  samplingMethod: SamplingMethod;
  animationSpeed: AnimationSpeed;
  isAnimating: boolean;
  onInputChange: (text: string) => void;
  onTemperatureChange: (value: number) => void;
  onTopKChange: (value: number) => void;
  onTopPChange: (value: number) => void;
  onSamplingMethodChange: (method: SamplingMethod) => void;
  onAnimationSpeedChange: (speed: AnimationSpeed) => void;
  onGenerate: () => void;
  onReset: () => void;
}

export const TransformerVizControls: React.FC<TransformerVizControlsProps> = ({
  language,
  inputText,
  temperature,
  topK,
  topP: _topP,
  samplingMethod: _samplingMethod,
  animationSpeed,
  isAnimating,
  onInputChange,
  onTemperatureChange,
  onTopKChange,
  onTopPChange: _onTopPChange,
  onSamplingMethodChange: _onSamplingMethodChange,
  onAnimationSpeedChange,
  onGenerate,
  onReset,
}) => {
  const t = i18n[language];
  const relevantSamples = sampleInputs.filter(s => s.language === language);

  return (
    <div className="bg-stone-50 rounded-lg p-4 space-y-4 border border-stone-200">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          {t.inputPlaceholder}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="flex-1 px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-900"
            disabled={isAnimating}
          />
          <button
            onClick={onGenerate}
            disabled={isAnimating || !inputText.trim()}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            {t.generate}
          </button>
          <button
            onClick={onReset}
            disabled={isAnimating}
            className="px-3 py-2 border border-stone-300 rounded-md hover:bg-stone-100 disabled:opacity-50 transition-colors"
            title={t.reset}
          >
            <RotateCcw className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* Sample Inputs */}
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs text-stone-500">{t.exampleLabel}:</span>
          {relevantSamples.map((sample, index) => (
            <button
              key={index}
              onClick={() => onInputChange(sample.text)}
              disabled={isAnimating}
              className="text-xs px-2 py-1 bg-stone-200 hover:bg-stone-300 rounded text-stone-700 disabled:opacity-50 transition-colors"
            >
              {sample.text}
            </button>
          ))}
        </div>
      </div>

      {/* Parameters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-stone-200">
        {/* Temperature */}
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            {t.temperature}: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
            disabled={isAnimating}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-50"
          />
          <p className="text-xs text-stone-500 mt-1">{t.temperatureDesc}</p>
        </div>

        {/* Top-K */}
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            {t.topK}: {topK}
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={topK}
            onChange={(e) => onTopKChange(parseInt(e.target.value))}
            disabled={isAnimating}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-50"
          />
          <p className="text-xs text-stone-500 mt-1">{t.topKDesc}</p>
        </div>

        {/* Animation Speed */}
        <div>
          <label className="block text-xs font-medium text-stone-600 mb-1">
            {t.animationSpeed}
          </label>
          <div className="flex gap-1">
            {(['slow', 'normal', 'fast'] as AnimationSpeed[]).map((speed) => (
              <button
                key={speed}
                onClick={() => onAnimationSpeedChange(speed)}
                disabled={isAnimating}
                className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                  animationSpeed === speed
                    ? 'bg-amber-500 text-white'
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                } disabled:opacity-50`}
              >
                {speed === 'slow' && <span className="flex items-center justify-center gap-1"><Zap className="w-3 h-3" />{t.slow}</span>}
                {speed === 'normal' && t.normal}
                {speed === 'fast' && <span className="flex items-center justify-center gap-1"><Zap className="w-3 h-3" /><Zap className="w-3 h-3" /></span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformerVizControls;
