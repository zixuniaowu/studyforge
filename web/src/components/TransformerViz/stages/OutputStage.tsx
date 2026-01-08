import React from 'react';
import { OutputProbability } from '../types';
import { i18n, Language } from '../i18n';

interface OutputStageProps {
  language: Language;
  probabilities: OutputProbability[];
  predictedToken: string;
  temperature: number;
  topK: number;
  isActive: boolean;
}

export const OutputStage: React.FC<OutputStageProps> = ({
  language,
  probabilities,
  predictedToken,
  temperature,
  topK,
  isActive,
}) => {
  const t = i18n[language];

  // Color gradient for probability bars
  const getBarColor = (rank: number): string => {
    const colors = ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7'];
    return colors[Math.min(rank - 1, colors.length - 1)];
  };

  return (
    <div className={`rounded-lg p-4 transition-all duration-500 ${
      isActive ? 'bg-rose-50 border-2 border-rose-400' : 'bg-stone-50 border border-stone-200'
    }`}>
      {/* Stage Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          isActive ? 'bg-rose-500 text-white' : 'bg-stone-300 text-stone-600'
        }`}>
          5
        </div>
        <h3 className="font-medium text-stone-800">{t.stage5}</h3>
      </div>
      <p className="text-xs text-stone-500 mb-4">{t.stage5Desc}</p>

      {/* Output Visualization */}
      <div className={`min-h-[180px] ${isActive ? 'animate-fadeIn' : ''}`}>
        {probabilities.length > 0 ? (
          <div className="space-y-4">
            {/* Predicted Token Display */}
            <div className="flex items-center justify-center gap-3 py-4 bg-white rounded-lg">
              <span className="text-sm text-stone-600">
                {language === 'zh' ? '预测的下一个 Token:' : '予測された次のToken:'}
              </span>
              <div className="px-4 py-2 bg-amber-500 text-white rounded-lg font-bold text-lg animate-pulse">
                {predictedToken}
              </div>
            </div>

            {/* Probability Distribution */}
            <div className="space-y-2">
              <div className="text-xs text-stone-600 font-medium">
                {t.probabilityDist} (Top-{topK}, T={temperature}):
              </div>

              <div className="space-y-2">
                {probabilities.map((prob) => (
                  <div key={prob.token} className="flex items-center gap-2">
                    {/* Rank */}
                    <span className="text-xs text-stone-400 w-4">#{prob.rank}</span>

                    {/* Token */}
                    <div className="w-12 text-sm font-medium text-stone-700 text-center">
                      {prob.token || '␣'}
                    </div>

                    {/* Probability Bar */}
                    <div className="flex-1 h-6 bg-stone-100 rounded overflow-hidden">
                      <div
                        className="h-full transition-all duration-700 flex items-center px-2"
                        style={{
                          width: `${prob.probability * 100}%`,
                          backgroundColor: getBarColor(prob.rank),
                        }}
                      >
                        {prob.probability > 0.1 && (
                          <span className="text-xs font-medium text-stone-700">
                            {(prob.probability * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Percentage */}
                    <span className="text-xs text-stone-500 w-12 text-right">
                      {(prob.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parameter Effects Explanation */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded border border-stone-200">
                <div className="font-medium text-stone-700 mb-1">
                  {t.temperature} = {temperature}
                </div>
                <div className="text-stone-500">
                  {temperature < 0.5
                    ? (language === 'zh' ? '低温：更确定、更保守' : '低温：より確実、保守的')
                    : temperature > 1.5
                    ? (language === 'zh' ? '高温：更随机、更多样' : '高温：よりランダム、多様')
                    : (language === 'zh' ? '中等温度：平衡确定性和多样性' : '中温：確実性と多様性のバランス')
                  }
                </div>
              </div>
              <div className="bg-white p-2 rounded border border-stone-200">
                <div className="font-medium text-stone-700 mb-1">
                  Top-K = {topK}
                </div>
                <div className="text-stone-500">
                  {language === 'zh'
                    ? `只从概率最高的 ${topK} 个 Token 中选择`
                    : `確率上位 ${topK} 個のTokenから選択`
                  }
                </div>
              </div>
            </div>

            {/* Softmax Formula */}
            <div className="text-xs text-stone-500 bg-rose-50 p-2 rounded font-mono">
              <span className="text-rose-600">softmax</span>(z<sub>i</sub>/T) = exp(z<sub>i</sub>/T) / Σexp(z<sub>j</sub>/T)
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[180px] text-stone-400 text-sm">
            {language === 'zh' ? '等待生成概率分布...' : '確率分布の生成を待機中...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputStage;
