import React, { useState } from 'react';
import { Brain, Database, Cpu, Sparkles, Globe, Code2, Lightbulb, Zap, Target, BookOpen } from 'lucide-react';

interface MindMapNode {
  id: string;
  label: string;
  labelJa: string;
  color: string;
  icon: React.FC<{ className?: string; size?: number }>;
  x: number;
  y: number;
  children?: MindMapNode[];
}

interface AILearningMindMapProps {
  language: 'zh' | 'ja';
  onNodeClick: (nodeId: string) => void;
  activeNode?: string;
}

const AILearningMindMap: React.FC<AILearningMindMapProps> = ({ language, onNodeClick, activeNode }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Mind map structure
  const mindMapData: MindMapNode = {
    id: 'ai-center',
    label: 'AI 学习',
    labelJa: 'AI学習',
    color: '#8b5cf6',
    icon: Brain,
    x: 400,
    y: 300,
    children: [
      {
        id: 'ai-intro',
        label: '什么是 AI',
        labelJa: 'AIとは',
        color: '#f59e0b',
        icon: Lightbulb,
        x: 150,
        y: 120,
        children: [
          { id: 'ai-history', label: 'AI 发展史', labelJa: 'AI発展史', color: '#fbbf24', icon: BookOpen, x: 50, y: 50 },
          { id: 'ai-types', label: 'AI 类型', labelJa: 'AI種類', color: '#f59e0b', icon: Target, x: 50, y: 180 },
        ]
      },
      {
        id: 'ml',
        label: '机器学习',
        labelJa: '機械学習',
        color: '#3b82f6',
        icon: Database,
        x: 650,
        y: 120,
        children: [
          { id: 'ml-supervised', label: '监督学习', labelJa: '教師あり', color: '#60a5fa', icon: Target, x: 750, y: 50 },
          { id: 'ml-unsupervised', label: '无监督学习', labelJa: '教師なし', color: '#3b82f6', icon: Sparkles, x: 750, y: 180 },
        ]
      },
      {
        id: 'dl',
        label: '深度学习',
        labelJa: '深層学習',
        color: '#ec4899',
        icon: Cpu,
        x: 150,
        y: 480,
        children: [
          { id: 'dl-nn', label: '神经网络', labelJa: 'ニューラルネット', color: '#f472b6', icon: Zap, x: 50, y: 420 },
          { id: 'dl-transformer', label: 'Transformer', labelJa: 'Transformer', color: '#ec4899', icon: Code2, x: 50, y: 550 },
        ]
      },
      {
        id: 'llm',
        label: '大语言模型',
        labelJa: 'LLM',
        color: '#10b981',
        icon: Globe,
        x: 650,
        y: 480,
        children: [
          { id: 'llm-gpt', label: 'GPT/Claude', labelJa: 'GPT/Claude', color: '#34d399', icon: Sparkles, x: 750, y: 420 },
          { id: 'llm-prompt', label: 'Prompt 技巧', labelJa: 'Prompt技法', color: '#10b981', icon: Code2, x: 750, y: 550 },
        ]
      },
    ]
  };

  const renderConnection = (from: { x: number; y: number }, to: { x: number; y: number }, color: string, isActive: boolean) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const ctrlX = midX + (from.y > to.y ? 20 : -20);
    const ctrlY = midY;

    return (
      <path
        d={`M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`}
        fill="none"
        stroke={color}
        strokeWidth={isActive ? 3 : 2}
        strokeOpacity={isActive ? 0.8 : 0.4}
        strokeDasharray={isActive ? "0" : "5,5"}
        className="transition-all duration-300"
      />
    );
  };

  const renderNode = (node: MindMapNode, isChild: boolean = false) => {
    const isHovered = hoveredNode === node.id;
    const isActive = activeNode === node.id;
    const Icon = node.icon;
    const label = language === 'ja' ? node.labelJa : node.label;
    const size = isChild ? 35 : node.id === 'ai-center' ? 70 : 50;

    return (
      <g
        key={node.id}
        onClick={() => node.id !== 'ai-center' && onNodeClick(node.id)}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
        className={node.id !== 'ai-center' ? 'cursor-pointer' : ''}
        style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
      >
        {/* Glow effect */}
        <circle
          cx={0}
          cy={0}
          r={size + 10}
          fill={node.color}
          opacity={isHovered || isActive ? 0.3 : 0.1}
          className="transition-all duration-300"
        />

        {/* Main circle */}
        <circle
          cx={0}
          cy={0}
          r={size}
          fill="rgba(15, 23, 42, 0.9)"
          stroke={node.color}
          strokeWidth={isHovered || isActive ? 4 : 2}
          className="transition-all duration-300"
        />

        {/* Icon */}
        <foreignObject x={-size/2} y={-size/2 - (isChild ? 0 : 5)} width={size} height={size}>
          <div className="w-full h-full flex items-center justify-center">
            <Icon size={isChild ? 16 : size > 60 ? 32 : 24} className="text-white" />
          </div>
        </foreignObject>

        {/* Label */}
        <text
          x={0}
          y={size + 18}
          textAnchor="middle"
          fill="white"
          fontSize={isChild ? 11 : 14}
          fontWeight={isActive ? "bold" : "600"}
          className="select-none pointer-events-none"
        >
          {label}
        </text>

        {/* Click indicator for non-center nodes */}
        {node.id !== 'ai-center' && (isHovered || isActive) && (
          <circle
            cx={size - 5}
            cy={-size + 5}
            r={8}
            fill={node.color}
            className="animate-pulse"
          />
        )}
      </g>
    );
  };

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 800 600" className="w-full h-auto min-h-[500px]">
        {/* Background */}
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <circle cx="400" cy="300" r="280" fill="url(#bgGradient)" />

        {/* Connections from center to main nodes */}
        {mindMapData.children?.map(child => (
          <g key={`conn-${child.id}`}>
            {renderConnection(
              { x: mindMapData.x, y: mindMapData.y },
              { x: child.x, y: child.y },
              child.color,
              hoveredNode === child.id || activeNode === child.id
            )}
            {/* Connections to sub-nodes */}
            {child.children?.map(subChild => (
              renderConnection(
                { x: child.x, y: child.y },
                { x: subChild.x, y: subChild.y },
                subChild.color,
                hoveredNode === subChild.id || activeNode === subChild.id
              )
            ))}
          </g>
        ))}

        {/* Render sub-nodes first (behind main nodes) */}
        {mindMapData.children?.map(child =>
          child.children?.map(subChild => (
            <g key={subChild.id} transform={`translate(${subChild.x}, ${subChild.y})`}>
              {renderNode({ ...subChild, x: 0, y: 0 }, true)}
            </g>
          ))
        )}

        {/* Render main category nodes */}
        {mindMapData.children?.map(child => (
          <g key={child.id} transform={`translate(${child.x}, ${child.y})`}>
            {renderNode({ ...child, x: 0, y: 0 })}
          </g>
        ))}

        {/* Render center node last (on top) */}
        <g transform={`translate(${mindMapData.x}, ${mindMapData.y})`}>
          {renderNode({ ...mindMapData, x: 0, y: 0 })}
        </g>

        {/* Animated particles */}
        {[0, 1, 2, 3].map(i => (
          <circle key={i} r="3" fill="#8b5cf6" opacity="0.6">
            <animateMotion
              dur={`${4 + i}s`}
              repeatCount="indefinite"
              path={`M 400 300 Q ${200 + i * 100} ${150 + i * 50} ${150 + i * 150} ${120 + i * 120}`}
            />
          </circle>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
        <p className="text-xs text-white/60">
          {language === 'ja' ? 'ノードをクリックして詳細を表示' : '点击节点查看详细内容'}
        </p>
      </div>
    </div>
  );
};

export default AILearningMindMap;
