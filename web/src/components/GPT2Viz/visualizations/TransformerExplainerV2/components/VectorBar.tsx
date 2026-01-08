/**
 * VectorBar - 向量可视化组件
 * 用小条形图展示向量数值
 */

import React from 'react';
import { motion } from 'framer-motion';

interface VectorBarProps {
  values: number[];
  color?: string;
  colorScale?: 'gray' | 'blue' | 'red' | 'green' | 'purple' | 'diverging';
  width?: number;
  height?: number;
  barWidth?: number;
  gap?: number;
  active?: boolean;
  vertical?: boolean;
  className?: string;
}

// 颜色映射
const COLOR_MAP: Record<string, { base: string; light: string; dark: string }> = {
  gray: { base: '#9ca3af', light: '#d1d5db', dark: '#4b5563' },
  blue: { base: '#3b82f6', light: '#93c5fd', dark: '#1d4ed8' },
  red: { base: '#ef4444', light: '#fca5a5', dark: '#b91c1c' },
  green: { base: '#22c55e', light: '#86efac', dark: '#15803d' },
  purple: { base: '#8b5cf6', light: '#c4b5fd', dark: '#6d28d9' },
};

export const VectorBar: React.FC<VectorBarProps> = ({
  values,
  color,
  colorScale = 'gray',
  width,
  height = 24,
  barWidth = 3,
  gap = 1,
  active = true,
  vertical = false,
  className = ''
}) => {
  const colors = COLOR_MAP[colorScale] || COLOR_MAP.gray;

  const computedWidth = width || values.length * (barWidth + gap);

  // 生成颜色（根据值的大小）
  const getBarColor = (value: number) => {
    if (colorScale === 'diverging') {
      // 红蓝发散色阶
      const normalized = value; // 假设已经是 0-1
      if (normalized < 0.5) {
        return `rgba(239, 68, 68, ${0.3 + (0.5 - normalized) * 1.4})`; // 红色
      } else {
        return `rgba(59, 130, 246, ${0.3 + (normalized - 0.5) * 1.4})`; // 蓝色
      }
    }
    // 单色渐变
    return color || colors.base;
  };

  if (vertical) {
    return (
      <svg
        width={height}
        height={computedWidth}
        className={className}
      >
        {values.map((v, i) => (
          <motion.rect
            key={i}
            x={0}
            y={i * (barWidth + gap)}
            width={height * v}
            height={barWidth}
            fill={getBarColor(v)}
            opacity={active ? (0.3 + v * 0.7) : 0.2}
            rx={1}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.01, duration: 0.2 }}
            style={{ transformOrigin: 'left' }}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg
      width={computedWidth}
      height={height}
      className={className}
      style={{ overflow: 'visible' }}
    >
      {values.map((v, i) => (
        <motion.rect
          key={i}
          x={i * (barWidth + gap)}
          y={height * (1 - v)}
          width={barWidth}
          height={height * v}
          fill={getBarColor(v)}
          opacity={active ? (0.3 + v * 0.7) : 0.2}
          rx={1}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.01, duration: 0.2 }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}
    </svg>
  );
};

// 简化的向量块（用于不需要详细展示的场景）
export const VectorBlock: React.FC<{
  color: string;
  height?: number;
  width?: number;
  active?: boolean;
  className?: string;
}> = ({ color, height = 24, width = 12, active = false, className = '' }) => (
  <div
    className={`rounded-sm transition-all duration-200 ${className}`}
    style={{
      width,
      height,
      backgroundColor: color,
      opacity: active ? 1 : 0.5,
    }}
  />
);

export default VectorBar;
