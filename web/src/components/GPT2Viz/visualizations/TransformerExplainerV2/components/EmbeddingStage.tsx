/**
 * EmbeddingStage - 嵌入层可视化
 * 展示：Token → Token Embedding + Position Encoding → Combined Embedding
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenData, COLORS } from '../types';
import { VectorBar, VectorBlock } from './VectorBar';

interface EmbeddingStageProps {
  tokens: TokenData[];
  expanded: boolean;
  onToggle: () => void;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  language: 'zh' | 'ja';
}

export const EmbeddingStage: React.FC<EmbeddingStageProps> = ({
  tokens,
  expanded,
  onToggle,
  hoveredIndex,
  onHover,
  language
}) => {
  const labels = {
    zh: {
      title: 'Embedding',
      tokenization: '分词',
      tokenEmbedding: 'Token 嵌入',
      positionEncoding: '位置编码',
      combined: '组合嵌入',
      id: 'ID',
      position: '位置',
      clickToExpand: '点击展开详情'
    },
    ja: {
      title: 'Embedding',
      tokenization: 'トークン化',
      tokenEmbedding: 'トークン埋め込み',
      positionEncoding: '位置エンコーディング',
      combined: '組合せ埋め込み',
      id: 'ID',
      position: '位置',
      clickToExpand: 'クリックで詳細表示'
    }
  };

  const t = labels[language];

  return (
    <div
      className={`embedding-stage relative transition-all duration-300 ${
        expanded ? 'z-20' : 'z-10'
      }`}
      onClick={onToggle}
    >
      {/* 标题 */}
      <div
        className={`
          title text-sm font-medium mb-4 cursor-pointer
          flex items-center gap-2 transition-colors
          ${expanded ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'}
        `}
      >
        <span>{t.title}</span>
        <motion.svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          animate={{ rotate: expanded ? 90 : 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      </div>

      {/* 内容区域 */}
      <div className="content flex gap-4">
        {/* Token 列表 */}
        <div className="token-column flex flex-col gap-2">
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="text-xs text-gray-400 mb-1 text-right pr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {t.tokenization}
              </motion.div>
            )}
          </AnimatePresence>
          {tokens.map((token, idx) => (
            <motion.div
              key={idx}
              className={`
                token-cell h-6 flex items-center justify-end pr-2
                cursor-pointer transition-colors rounded
                ${hoveredIndex === idx ? 'bg-purple-50' : 'hover:bg-gray-50'}
              `}
              onMouseEnter={() => onHover(idx)}
              onMouseLeave={() => onHover(null)}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm text-gray-700 font-mono truncate max-w-20">
                {token.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 展开时显示详细信息 */}
        <AnimatePresence>
          {expanded && (
            <>
              {/* Token Embedding */}
              <motion.div
                className="token-embedding-column flex flex-col gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs text-gray-400 mb-1 text-center">
                  {t.tokenEmbedding}
                </div>
                {tokens.map((token, idx) => (
                  <div
                    key={idx}
                    className={`
                      h-6 flex items-center gap-2
                      ${hoveredIndex === idx ? 'ring-2 ring-purple-300 rounded' : ''}
                    `}
                    onMouseEnter={() => onHover(idx)}
                    onMouseLeave={() => onHover(null)}
                  >
                    <span className="text-xs text-gray-400 w-8">
                      {idx === 0 && <span className="text-gray-300">{t.id}</span>}
                      {idx === 0 && <br />}
                      {token.id}
                    </span>
                    <div className="flex items-center">
                      <svg className="w-6 h-3 text-gray-300" viewBox="0 0 24 12">
                        <path
                          fill="currentColor"
                          d="M0 6h20l-4-4v3H0v2h16v3l4-4H0z"
                        />
                      </svg>
                    </div>
                    <VectorBar
                      values={token.embedding}
                      colorScale="gray"
                      height={20}
                      barWidth={2}
                      gap={1}
                      active={hoveredIndex === idx}
                    />
                  </div>
                ))}
              </motion.div>

              {/* + 符号 */}
              <motion.div
                className="plus-column flex flex-col gap-2 items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-xs text-transparent mb-1">+</div>
                {tokens.map((_, idx) => (
                  <div key={idx} className="h-6 flex items-center text-gray-400">
                    +
                  </div>
                ))}
              </motion.div>

              {/* Position Encoding */}
              <motion.div
                className="position-encoding-column flex flex-col gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-xs text-gray-400 mb-1 text-center">
                  {t.positionEncoding}
                </div>
                {tokens.map((token, idx) => (
                  <div
                    key={idx}
                    className={`
                      h-6 flex items-center gap-2
                      ${hoveredIndex === idx ? 'ring-2 ring-purple-300 rounded' : ''}
                    `}
                    onMouseEnter={() => onHover(idx)}
                    onMouseLeave={() => onHover(null)}
                  >
                    <VectorBar
                      values={token.positionEncoding}
                      colorScale="diverging"
                      height={20}
                      barWidth={2}
                      gap={1}
                      active={hoveredIndex === idx}
                    />
                    <span className="text-xs text-gray-400 w-8">
                      {idx === 0 && <span className="text-gray-300">{t.position}</span>}
                      {idx === 0 && <br />}
                      {idx}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* = 符号 */}
              <motion.div
                className="equals-column flex flex-col gap-2 items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-xs text-transparent mb-1">=</div>
                {tokens.map((_, idx) => (
                  <div key={idx} className="h-6 flex items-center text-gray-400">
                    =
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 输出向量列 */}
        <div className="output-column flex flex-col gap-2">
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="text-xs text-gray-400 mb-1 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {t.combined}
              </motion.div>
            )}
          </AnimatePresence>
          {tokens.map((_, idx) => (
            <div
              key={idx}
              className={`
                h-6 flex items-center
                ${hoveredIndex === idx ? 'ring-2 ring-purple-300 rounded' : ''}
              `}
              onMouseEnter={() => onHover(idx)}
              onMouseLeave={() => onHover(null)}
            >
              <VectorBlock
                color={COLORS.embedding}
                height={20}
                width={12}
                active={hoveredIndex === idx || expanded}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hover 提示 */}
      {!expanded && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
            {t.clickToExpand}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbeddingStage;
