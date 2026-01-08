import React from 'react';
import { Token } from '../types';
import { i18n, Language } from '../i18n';
import { colorSchemes } from '../utils/sampleData';

interface MLPStageProps {
  language: Language;
  tokens: Token[];
  mlpActivations: number[];
  isActive: boolean;
  hoveredTokenIndex: number | null;
  onTokenHover: (index: number | null) => void;
}

export const MLPStage: React.FC<MLPStageProps> = ({
  language,
  tokens,
  mlpActivations,
  isActive,
  hoveredTokenIndex,
  onTokenHover,
}) => {
  const t = i18n[language];

  // Calculate max activation for normalization
  const maxActivation = Math.max(...mlpActivations, 0.01);

  return (
    <div className={`rounded-lg p-4 transition-all duration-500 ${
      isActive ? 'bg-violet-50 border-2 border-violet-400' : 'bg-stone-50 border border-stone-200'
    }`}>
      {/* Stage Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          isActive ? 'bg-violet-500 text-white' : 'bg-stone-300 text-stone-600'
        }`}>
          4
        </div>
        <h3 className="font-medium text-stone-800">{t.stage4}</h3>
      </div>
      <p className="text-xs text-stone-500 mb-4">{t.stage4Desc}</p>

      {/* MLP Visualization */}
      <div className={`min-h-[150px] ${isActive ? 'animate-fadeIn' : ''}`}>
        {mlpActivations.length > 0 ? (
          <div className="space-y-4">
            {/* Network Architecture Diagram */}
            <div className="flex items-center justify-center gap-2 py-4 bg-white rounded-lg">
              {/* Input Layer */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-stone-500 mb-2">
                  {language === 'zh' ? '输入' : '入力'}
                </div>
                <div className="flex flex-col gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-4 h-4 rounded-full bg-blue-400" />
                  ))}
                  <div className="text-xs text-stone-400">...</div>
                </div>
              </div>

              {/* Arrow */}
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Hidden Layer (expanded) */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-stone-500 mb-2">
                  {language === 'zh' ? '隐藏层 (4x)' : '隠れ層 (4x)'}
                </div>
                <div className="flex flex-col gap-1">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className="w-4 h-4 rounded-full bg-violet-500" />
                  ))}
                  <div className="text-xs text-stone-400">...</div>
                </div>
              </div>

              {/* Arrow */}
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Output Layer */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-stone-500 mb-2">
                  {language === 'zh' ? '输出' : '出力'}
                </div>
                <div className="flex flex-col gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-4 h-4 rounded-full bg-emerald-400" />
                  ))}
                  <div className="text-xs text-stone-400">...</div>
                </div>
              </div>
            </div>

            {/* Activation Values per Token */}
            <div className="space-y-2">
              <div className="text-xs text-stone-600 font-medium">
                {language === 'zh' ? 'ReLU 激活值（每个 Token）:' : 'ReLU活性化値（各Token）:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center gap-2 p-2 rounded-md bg-white
                      transition-all duration-200
                      ${hoveredTokenIndex === index ? 'ring-2 ring-violet-400 shadow-md' : ''}
                    `}
                    onMouseEnter={() => onTokenHover(index)}
                    onMouseLeave={() => onTokenHover(null)}
                  >
                    {/* Token indicator */}
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-xs text-white font-medium"
                      style={{ backgroundColor: colorSchemes.tokenColors[index % colorSchemes.tokenColors.length] }}
                    >
                      {token.text.slice(0, 2)}
                    </div>

                    {/* Activation bar */}
                    <div className="w-24 h-4 bg-stone-100 rounded overflow-hidden">
                      <div
                        className="h-full bg-violet-500 transition-all duration-500"
                        style={{
                          width: `${(mlpActivations[index] / maxActivation) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Value */}
                    <span className="text-xs font-mono text-stone-600 w-10">
                      {mlpActivations[index]?.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div className="text-xs text-stone-500 bg-violet-50 p-2 rounded">
              {language === 'zh'
                ? 'MLP（多层感知机）先将维度扩展4倍，通过 ReLU 激活函数引入非线性，然后压缩回原维度。'
                : 'MLP（多層パーセプトロン）は次元を4倍に拡張し、ReLU活性化関数で非線形性を導入後、元の次元に圧縮します。'
              }
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[150px] text-stone-400 text-sm">
            {language === 'zh' ? '等待 MLP 处理...' : 'MLP処理を待機中...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default MLPStage;
