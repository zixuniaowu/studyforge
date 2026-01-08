import React from 'react';
import { Token } from '../types';
import { i18n, Language } from '../i18n';
import { colorSchemes } from '../utils/sampleData';
import { formatTokenDisplay } from '../utils/mockTokenizer';

interface TokenizationStageProps {
  language: Language;
  tokens: Token[];
  isActive: boolean;
  hoveredTokenIndex: number | null;
  onTokenHover: (index: number | null) => void;
  onTokenClick: (index: number) => void;
}

export const TokenizationStage: React.FC<TokenizationStageProps> = ({
  language,
  tokens,
  isActive,
  hoveredTokenIndex,
  onTokenHover,
  onTokenClick,
}) => {
  const t = i18n[language];

  return (
    <div className={`rounded-lg p-4 transition-all duration-500 ${
      isActive ? 'bg-amber-50 border-2 border-amber-400' : 'bg-stone-50 border border-stone-200'
    }`}>
      {/* Stage Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          isActive ? 'bg-amber-500 text-white' : 'bg-stone-300 text-stone-600'
        }`}>
          1
        </div>
        <h3 className="font-medium text-stone-800">{t.stage1}</h3>
      </div>
      <p className="text-xs text-stone-500 mb-4">{t.stage1Desc}</p>

      {/* Tokens Display */}
      <div className="flex flex-wrap gap-2 min-h-[60px]">
        {tokens.map((token, index) => (
          <div
            key={token.id}
            className={`
              relative px-3 py-2 rounded-md cursor-pointer
              transition-all duration-300 transform
              ${isActive ? 'animate-slideIn' : ''}
              ${hoveredTokenIndex === index ? 'scale-110 shadow-lg z-10' : 'hover:scale-105'}
            `}
            style={{
              backgroundColor: colorSchemes.tokenColors[index % colorSchemes.tokenColors.length],
              animationDelay: isActive ? `${index * 100}ms` : '0ms',
              opacity: isActive ? 1 : 0.7,
            }}
            onMouseEnter={() => onTokenHover(index)}
            onMouseLeave={() => onTokenHover(null)}
            onClick={() => onTokenClick(index)}
          >
            <span className="text-white font-medium text-sm">
              {formatTokenDisplay(token)}
            </span>
            {/* Token ID tooltip */}
            {hoveredTokenIndex === index && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-stone-800 text-white text-xs rounded whitespace-nowrap z-20">
                ID: {token.tokenId}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Token count */}
      {tokens.length > 0 && (
        <div className="mt-3 text-xs text-stone-500">
          {language === 'zh' ? `共 ${tokens.length} 个 Token` : `${tokens.length} トークン`}
        </div>
      )}
    </div>
  );
};

export default TokenizationStage;
