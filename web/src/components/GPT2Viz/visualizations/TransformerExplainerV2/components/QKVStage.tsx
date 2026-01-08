/**
 * QKVStage - Query/Key/Value 阶段可视化
 * 展示嵌入向量分裂成 Q、K、V 三个向量
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TokenData, QKVData, COLORS } from '../types';
import { VectorBlock } from './VectorBar';

interface QKVStageProps {
  tokens: TokenData[];
  qkv: QKVData[];
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  language: 'zh' | 'ja';
}

export const QKVStage: React.FC<QKVStageProps> = ({
  tokens,
  qkv,
  hoveredIndex,
  onHover,
  language: _language
}) => {

  return (
    <div className="qkv-stage relative">
      {/* 输入向量列 */}
      <div className="flex gap-4">
        <div className="input-column flex flex-col gap-2">
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
                active={hoveredIndex === idx}
              />
            </div>
          ))}
        </div>

        {/* QKV 输出列 */}
        <div className="qkv-output flex flex-col gap-2">
          {qkv.map((_, idx) => (
            <motion.div
              key={idx}
              className={`
                h-6 flex items-center gap-0.5
                ${hoveredIndex === idx ? 'ring-2 ring-purple-300 rounded px-1' : ''}
              `}
              onMouseEnter={() => onHover(idx)}
              onMouseLeave={() => onHover(null)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Query */}
              <div className="relative group">
                <VectorBlock
                  color={COLORS.query}
                  height={20}
                  width={12}
                  active={hoveredIndex === idx}
                />
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-blue-500 font-medium whitespace-nowrap"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Q
                  </motion.span>
                )}
              </div>

              {/* Key */}
              <div className="relative group">
                <VectorBlock
                  color={COLORS.key}
                  height={20}
                  width={12}
                  active={hoveredIndex === idx}
                />
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-red-500 font-medium whitespace-nowrap"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    K
                  </motion.span>
                )}
              </div>

              {/* Value */}
              <div className="relative group">
                <VectorBlock
                  color={COLORS.value}
                  height={20}
                  width={12}
                  active={hoveredIndex === idx}
                />
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-green-500 font-medium whitespace-nowrap"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    V
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QKVStage;
