/**
 * OutputPanel
 * Shows the probability distribution for next token prediction
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TokenPrediction } from '../types';
import { I18nStrings } from '../i18n';

interface OutputPanelProps {
  predictions: TokenPrediction[];
  generatedToken: string;
  isActive: boolean;
  i18n: I18nStrings;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  predictions,
  generatedToken,
  isActive,
  i18n,
}) => {
  const maxProb = predictions.length > 0 ? Math.max(...predictions.map((p) => p.probability)) : 1;

  return (
    <div
      className={`
        bg-gray-800/50 rounded-xl border p-4 transition-all duration-300
        ${isActive ? 'border-green-500/50 shadow-lg shadow-green-500/10' : 'border-gray-700/50'}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
            ${isActive ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}
          `}
        >
          5
        </div>
        <div>
          <h3 className="text-white font-semibold">{i18n.stage5}</h3>
          <p className="text-gray-400 text-sm">{i18n.stage5Desc}</p>
        </div>
      </div>

      {/* Generated Token Display */}
      {generatedToken && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="text-xs text-green-400 mb-1">{i18n.nextTokenPrediction}:</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-400 font-mono">
              "{generatedToken}"
            </span>
            {predictions[0] && (
              <span className="text-sm text-gray-400">
                ({(predictions[0].probability * 100).toFixed(1)}%)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Probability Distribution */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500 mb-2">Top-K Predictions:</div>

        {predictions.length === 0 ? (
          <div className="text-gray-500 text-sm italic">
            Run inference to see predictions
          </div>
        ) : (
          predictions.slice(0, 10).map((pred, index) => (
            <motion.div
              key={`${pred.tokenId}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2"
            >
              {/* Rank */}
              <div className="w-6 text-xs text-gray-500 text-right">
                #{pred.rank}
              </div>

              {/* Token */}
              <div
                className={`
                  w-24 px-2 py-1 rounded font-mono text-sm truncate
                  ${index === 0 ? 'bg-green-500/20 text-green-300' : 'bg-gray-700/50 text-gray-300'}
                `}
              >
                "{pred.token.replace(/ /g, '␣')}"
              </div>

              {/* Probability Bar */}
              <div className="flex-1 h-6 bg-gray-900/50 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(pred.probability / maxProb) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`
                    h-full flex items-center px-2
                    ${index === 0 ? 'bg-green-500/50' : 'bg-blue-500/30'}
                  `}
                >
                  <span className="text-xs text-white whitespace-nowrap">
                    {(pred.probability * 100).toFixed(1)}%
                  </span>
                </motion.div>
              </div>

              {/* Logit */}
              <div className="w-16 text-xs text-gray-500 text-right">
                {pred.logit.toFixed(2)}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Legend */}
      {predictions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-between text-xs text-gray-500">
          <span>{i18n.probability}</span>
          <span>{i18n.logit}</span>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;
