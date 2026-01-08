import React from 'react';
import { EmbeddingVector } from '../types';
import { i18n, Language } from '../i18n';
import { colorSchemes } from '../utils/sampleData';

interface EmbeddingStageProps {
  language: Language;
  embeddings: EmbeddingVector[];
  isActive: boolean;
  hoveredTokenIndex: number | null;
  onTokenHover: (index: number | null) => void;
}

export const EmbeddingStage: React.FC<EmbeddingStageProps> = ({
  language,
  embeddings,
  isActive,
  hoveredTokenIndex,
  onTokenHover,
}) => {
  const t = i18n[language];

  // Render a single embedding vector visualization
  const renderVector = (values: number[], label: string, colorPositive: string, colorNegative: string) => (
    <div className="flex items-center gap-1">
      <span className="text-xs text-stone-500 w-12 shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {values.slice(0, 8).map((val, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-sm flex items-center justify-center text-[8px] font-mono"
            style={{
              backgroundColor: val >= 0
                ? `${colorPositive}${Math.round(Math.min(Math.abs(val), 1) * 60 + 20).toString(16)}`
                : `${colorNegative}${Math.round(Math.min(Math.abs(val), 1) * 60 + 20).toString(16)}`,
              color: Math.abs(val) > 0.5 ? 'white' : 'inherit',
            }}
            title={val.toFixed(3)}
          >
            {val.toFixed(1)}
          </div>
        ))}
        <span className="text-xs text-stone-400">...</span>
      </div>
    </div>
  );

  return (
    <div className={`rounded-lg p-4 transition-all duration-500 ${
      isActive ? 'bg-emerald-50 border-2 border-emerald-400' : 'bg-stone-50 border border-stone-200'
    }`}>
      {/* Stage Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          isActive ? 'bg-emerald-500 text-white' : 'bg-stone-300 text-stone-600'
        }`}>
          2
        </div>
        <h3 className="font-medium text-stone-800">{t.stage2}</h3>
      </div>
      <p className="text-xs text-stone-500 mb-4">{t.stage2Desc}</p>

      {/* Embeddings Display */}
      <div className="space-y-3 min-h-[120px]">
        {embeddings.map((emb, index) => (
          <div
            key={emb.tokenId}
            className={`
              p-2 rounded-md transition-all duration-300
              ${isActive ? 'animate-fadeIn' : ''}
              ${hoveredTokenIndex === index ? 'bg-emerald-100 shadow-md' : 'bg-white'}
            `}
            style={{
              animationDelay: isActive ? `${index * 150}ms` : '0ms',
              opacity: isActive ? 1 : 0.7,
            }}
            onMouseEnter={() => onTokenHover(index)}
            onMouseLeave={() => onTokenHover(null)}
          >
            {/* Token indicator */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-xs text-white font-medium"
                style={{ backgroundColor: colorSchemes.tokenColors[index % colorSchemes.tokenColors.length] }}
              >
                {index}
              </div>
              <span className="text-sm font-medium text-stone-700">
                Token ID: {emb.tokenId}
              </span>
            </div>

            {/* Embedding vectors */}
            <div className="space-y-1 ml-8">
              {renderVector(emb.values, t.tokenEmbedding.split('（')[0].slice(0, 4), colorSchemes.embeddingPositive, colorSchemes.embeddingNegative)}
              {hoveredTokenIndex === index && (
                <>
                  <div className="text-xs text-stone-400 my-1">+</div>
                  {renderVector(emb.positionValues, t.positionEncoding.split('（')[0].slice(0, 4), '#3b82f6', '#ef4444')}
                  <div className="text-xs text-stone-400 my-1">=</div>
                  {renderVector(emb.combinedValues, '合計', colorSchemes.embeddingPositive, colorSchemes.embeddingNegative)}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      {embeddings.length > 0 && (
        <div className="mt-3 flex items-center gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colorSchemes.embeddingPositive + '40' }} />
            <span>{language === 'zh' ? '正值' : '正の値'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colorSchemes.embeddingNegative + '40' }} />
            <span>{language === 'zh' ? '负值' : '負の値'}</span>
          </div>
          <span className="text-stone-400">
            {language === 'zh' ? '（悬停查看详情）' : '（ホバーで詳細表示）'}
          </span>
        </div>
      )}
    </div>
  );
};

export default EmbeddingStage;
