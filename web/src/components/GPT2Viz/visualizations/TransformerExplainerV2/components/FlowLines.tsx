/**
 * FlowLines - Sankey 风格流线组件
 * 连接不同阶段的数据流
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../types';

interface FlowLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  strokeWidth?: number;
  highlighted?: boolean;
  animated?: boolean;
  opacity?: number;
}

// 单条流线
export const FlowLine: React.FC<FlowLineProps> = ({
  startX,
  startY,
  endX,
  endY,
  color = COLORS.flowLine,
  strokeWidth = 2,
  highlighted = false,
  animated = true,
  opacity = 0.4
}) => {
  // 计算贝塞尔曲线控制点
  const midX = (startX + endX) / 2;
  const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

  return (
    <motion.path
      d={path}
      fill="none"
      stroke={highlighted ? COLORS.flowLineActive : color}
      strokeWidth={highlighted ? strokeWidth + 1 : strokeWidth}
      opacity={highlighted ? 1 : opacity}
      initial={animated ? { pathLength: 0 } : false}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    />
  );
};

interface FlowLinesGroupProps {
  startPoints: { x: number; y: number }[];
  endPoints: { x: number; y: number }[];
  colors?: string[];
  highlightedIndex?: number | null;
  strokeWidth?: number;
}

// 流线组（多条流线）
export const FlowLinesGroup: React.FC<FlowLinesGroupProps> = ({
  startPoints,
  endPoints,
  colors,
  highlightedIndex = null,
  strokeWidth = 2
}) => {
  const lines = useMemo(() => {
    const count = Math.min(startPoints.length, endPoints.length);
    return Array.from({ length: count }, (_, i) => ({
      start: startPoints[i],
      end: endPoints[i],
      color: colors?.[i] || COLORS.flowLine
    }));
  }, [startPoints, endPoints, colors]);

  return (
    <g className="flow-lines-group">
      {lines.map((line, i) => (
        <FlowLine
          key={i}
          startX={line.start.x}
          startY={line.start.y}
          endX={line.end.x}
          endY={line.end.y}
          color={line.color}
          strokeWidth={strokeWidth}
          highlighted={highlightedIndex === i}
          animated={false}
        />
      ))}
    </g>
  );
};

interface SankeyFlowProps {
  tokenCount: number;
  startX: number;
  endX: number;
  topY: number;
  rowHeight: number;
  gap: number;
  color?: string;
  highlightedIndex?: number | null;
  splitRatio?: number; // 用于 QKV 分裂效果
}

// Sankey 流图（用于 Token 流动）
export const SankeyFlow: React.FC<SankeyFlowProps> = ({
  tokenCount,
  startX,
  endX,
  topY,
  rowHeight,
  gap,
  color = COLORS.flowLine,
  highlightedIndex = null,
}) => {
  const paths = useMemo(() => {
    return Array.from({ length: tokenCount }, (_, i) => {
      const y = topY + i * (rowHeight + gap) + rowHeight / 2;
      return {
        startX,
        startY: y,
        endX,
        endY: y,
      };
    });
  }, [tokenCount, startX, endX, topY, rowHeight, gap]);

  return (
    <g className="sankey-flow">
      {paths.map((p, i) => (
        <FlowLine
          key={i}
          {...p}
          color={color}
          highlighted={highlightedIndex === i}
          animated={false}
          opacity={0.3}
        />
      ))}
    </g>
  );
};

// QKV 分裂流线（一条线分成三条）
export const QKVSplitFlow: React.FC<{
  tokenIndex: number;
  startX: number;
  endX: number;
  startY: number;
  qEndY: number;
  kEndY: number;
  vEndY: number;
  highlighted?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ tokenIndex: _tokenIndex, startX, endX, startY, qEndY, kEndY, vEndY, highlighted }) => {
  const midX = (startX + endX) / 2;

  // Query 路径
  const qPath = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${qEndY}, ${endX} ${qEndY}`;
  // Key 路径
  const kPath = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${kEndY}, ${endX} ${kEndY}`;
  // Value 路径
  const vPath = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${vEndY}, ${endX} ${vEndY}`;

  const baseOpacity = highlighted ? 0.8 : 0.3;
  const strokeWidth = highlighted ? 3 : 2;

  return (
    <g className="qkv-split-flow">
      <motion.path
        d={qPath}
        fill="none"
        stroke={COLORS.query}
        strokeWidth={strokeWidth}
        opacity={baseOpacity}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.path
        d={kPath}
        fill="none"
        stroke={COLORS.key}
        strokeWidth={strokeWidth}
        opacity={baseOpacity}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      />
      <motion.path
        d={vPath}
        fill="none"
        stroke={COLORS.value}
        strokeWidth={strokeWidth}
        opacity={baseOpacity}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </g>
  );
};

export default FlowLine;
