/**
 * TokenizationPanel
 * Visualizes the BPE tokenization process
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenInfo } from '../types';
import { I18nStrings } from '../i18n';

interface TokenizationPanelProps {
  tokens: TokenInfo[];
  inputText: string;
  isActive: boolean;
  i18n: I18nStrings;
}

// Color palette for tokens (consistent colors based on token ID)
const TOKEN_COLORS = [
  'bg-blue-500/20 border-blue-500/50 text-blue-300',
  'bg-purple-500/20 border-purple-500/50 text-purple-300',
  'bg-green-500/20 border-green-500/50 text-green-300',
  'bg-orange-500/20 border-orange-500/50 text-orange-300',
  'bg-pink-500/20 border-pink-500/50 text-pink-300',
  'bg-cyan-500/20 border-cyan-500/50 text-cyan-300',
  'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
  'bg-red-500/20 border-red-500/50 text-red-300',
  'bg-indigo-500/20 border-indigo-500/50 text-indigo-300',
  'bg-teal-500/20 border-teal-500/50 text-teal-300',
];

function getTokenColor(tokenId: number): string {
  return TOKEN_COLORS[tokenId % TOKEN_COLORS.length];
}

// Format token text for display (handle special characters)
function formatTokenText(text: string): string {
  // Replace special BPE markers
  let formatted = text.replace(/Ġ/g, '␣'); // Space marker
  formatted = formatted.replace(/Ċ/g, '↵'); // Newline marker

  // Show spaces explicitly
  if (formatted === ' ') {
    formatted = '␣';
  }

  return formatted;
}

export const TokenizationPanel: React.FC<TokenizationPanelProps> = ({
  tokens,
  inputText,
  isActive,
  i18n,
}) => {
  const [hoveredToken, setHoveredToken] = React.useState<number | null>(null);

  return (
    <div
      className={`
        bg-gray-800/50 rounded-xl border p-4 transition-all duration-300
        ${isActive ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-gray-700/50'}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
            ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}
          `}
        >
          1
        </div>
        <div>
          <h3 className="text-white font-semibold">{i18n.stage1}</h3>
          <p className="text-gray-400 text-sm">{i18n.stage1Desc}</p>
        </div>
      </div>

      {/* Input Text */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Input:</div>
        <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-sm text-gray-300">
          "{inputText || '...'}"
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center my-2">
        <svg
          className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-600'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Tokens */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">
          Tokens ({tokens.length}):
        </div>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {tokens.map((token, index) => (
              <motion.div
                key={`${token.id}-${token.tokenId}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 200,
                }}
                className={`
                  relative px-3 py-1.5 rounded-lg border font-mono text-sm
                  cursor-pointer transition-all duration-200
                  ${getTokenColor(token.tokenId)}
                  ${hoveredToken === index ? 'scale-110 z-10' : ''}
                `}
                onMouseEnter={() => setHoveredToken(index)}
                onMouseLeave={() => setHoveredToken(null)}
              >
                {/* Token text */}
                <span className="relative z-10">
                  {formatTokenText(token.text)}
                </span>

                {/* Tooltip on hover */}
                {hoveredToken === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                               bg-gray-900 border border-gray-700 rounded-lg p-2
                               shadow-xl min-w-[120px] z-20"
                  >
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Position:</span>
                        <span className="text-white">{token.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Token ID:</span>
                        <span className="text-white">{token.tokenId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Text:</span>
                        <span className="text-white font-mono">
                          "{token.text}"
                        </span>
                      </div>
                    </div>
                    {/* Tooltip arrow */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full
                                  border-4 border-transparent border-t-gray-700"
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {tokens.length === 0 && (
            <div className="text-gray-500 text-sm italic">
              Enter text to see tokenization
            </div>
          )}
        </div>
      </div>

      {/* Token IDs */}
      {tokens.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="text-xs text-gray-500 mb-2">Token IDs:</div>
          <div className="bg-gray-900/50 rounded-lg p-2 font-mono text-xs text-gray-400 overflow-x-auto">
            [{tokens.map((t) => t.tokenId).join(', ')}]
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenizationPanel;
