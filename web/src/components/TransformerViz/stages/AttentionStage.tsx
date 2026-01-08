import React, { useState } from 'react';
import { Token, AttentionHead } from '../types';
import { i18n, Language } from '../i18n';
import { colorSchemes } from '../utils/sampleData';

interface AttentionStageProps {
  language: Language;
  tokens: Token[];
  attentionHeads: AttentionHead[];
  isActive: boolean;
  hoveredTokenIndex: number | null;
  onTokenHover: (index: number | null) => void;
}

export const AttentionStage: React.FC<AttentionStageProps> = ({
  language,
  tokens,
  attentionHeads,
  isActive,
  hoveredTokenIndex,
  onTokenHover,
}) => {
  const t = i18n[language];
  const [selectedHead, setSelectedHead] = useState(0);

  // Get attention weights for current head
  const currentHead = attentionHeads[selectedHead];
  const weights = currentHead?.weights || [];

  // Calculate color based on attention weight
  const getAttentionColor = (weight: number): string => {
    const { low, mid, high } = colorSchemes.attentionGradient;
    if (weight < 0.2) return low;
    if (weight < 0.5) return mid;
    return high;
  };

  // Get opacity based on weight
  const getOpacity = (weight: number): number => {
    return Math.max(0.1, Math.min(1, weight * 2));
  };

  return (
    <div className={`rounded-lg p-4 transition-all duration-500 ${
      isActive ? 'bg-blue-50 border-2 border-blue-400' : 'bg-stone-50 border border-stone-200'
    }`}>
      {/* Stage Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          isActive ? 'bg-blue-500 text-white' : 'bg-stone-300 text-stone-600'
        }`}>
          3
        </div>
        <h3 className="font-medium text-stone-800">{t.stage3}</h3>
      </div>
      <p className="text-xs text-stone-500 mb-4">{t.stage3Desc}</p>

      {/* Attention Head Selector */}
      {attentionHeads.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-stone-600">{t.headSelector}:</span>
          <div className="flex gap-1">
            {attentionHeads.map((head, index) => (
              <button
                key={index}
                onClick={() => setSelectedHead(index)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  selectedHead === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {head.label || `Head ${index + 1}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attention Heatmap */}
      <div className={`min-h-[200px] ${isActive ? 'animate-fadeIn' : ''}`}>
        {weights.length > 0 ? (
          <div className="overflow-x-auto">
            {/* Column headers (Query tokens) */}
            <div className="flex items-end mb-1 ml-16">
              {tokens.map((token, j) => (
                <div
                  key={j}
                  className="w-10 h-8 flex items-end justify-center text-xs font-medium"
                  style={{ color: colorSchemes.tokenColors[j % colorSchemes.tokenColors.length] }}
                >
                  <span className="transform -rotate-45 origin-bottom-left whitespace-nowrap">
                    {token.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="space-y-1">
              {tokens.map((token, i) => (
                <div
                  key={i}
                  className="flex items-center"
                  onMouseEnter={() => onTokenHover(i)}
                  onMouseLeave={() => onTokenHover(null)}
                >
                  {/* Row header (Key token) */}
                  <div
                    className="w-16 text-xs font-medium text-right pr-2 truncate"
                    style={{ color: colorSchemes.tokenColors[i % colorSchemes.tokenColors.length] }}
                    title={token.text}
                  >
                    {token.text}
                  </div>

                  {/* Attention cells */}
                  <div className="flex gap-0.5">
                    {weights[i]?.map((weight, j) => (
                      <div
                        key={j}
                        className={`
                          w-10 h-8 rounded-sm flex items-center justify-center
                          text-xs font-mono cursor-pointer
                          transition-all duration-200
                          ${hoveredTokenIndex === i || hoveredTokenIndex === j
                            ? 'ring-2 ring-blue-400 z-10'
                            : ''
                          }
                        `}
                        style={{
                          backgroundColor: getAttentionColor(weight),
                          opacity: getOpacity(weight),
                        }}
                        title={`${token.text} → ${tokens[j]?.text}: ${(weight * 100).toFixed(1)}%`}
                      >
                        {weight > 0 && (
                          <span className="text-stone-700">
                            {(weight * 100).toFixed(0)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
              <span>{language === 'zh' ? '注意力强度:' : '注目度:'}</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: colorSchemes.attentionGradient.low }} />
                <span>{language === 'zh' ? '低' : '低'}</span>
              </div>
              <div className="w-20 h-2 rounded" style={{
                background: `linear-gradient(to right, ${colorSchemes.attentionGradient.low}, ${colorSchemes.attentionGradient.mid}, ${colorSchemes.attentionGradient.high})`
              }} />
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: colorSchemes.attentionGradient.high }} />
                <span>{language === 'zh' ? '高' : '高'}</span>
              </div>
            </div>

            {/* Explanation */}
            <div className="mt-2 text-xs text-stone-500 bg-stone-100 p-2 rounded">
              {language === 'zh'
                ? '行表示当前 Token（Query），列表示被关注的 Token（Key）。数值表示注意力权重百分比。'
                : '行は現在のToken（Query）、列は注目先Token（Key）を表します。数値は注目度（%）です。'
              }
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-stone-400 text-sm">
            {language === 'zh' ? '等待计算注意力权重...' : '注意力の計算を待機中...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttentionStage;
