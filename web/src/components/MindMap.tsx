import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MindMapNode {
  id: string;
  label: string;
  color: string;
  icon?: React.ReactNode;
  link?: string;
  onClick?: () => void;
  children?: MindMapNode[];
}

interface MindMapProps {
  data: MindMapNode;
  className?: string;
}

const MindMap: React.FC<MindMapProps> = ({ data, className = '' }) => {
  const navigate = useNavigate();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleNodeClick = (node: MindMapNode) => {
    if (node.onClick) {
      node.onClick();
    } else if (node.link) {
      if (node.link.startsWith('http')) {
        window.open(node.link, '_blank');
      } else {
        navigate(node.link);
      }
    }
  };

  // Calculate positions for nodes
  const centerX = 400;
  const centerY = 250;
  const radiusX = 280;
  const radiusY = 180;

  const children = data.children || [];
  const angleStep = (Math.PI * 2) / children.length;
  const startAngle = -Math.PI / 2; // Start from top

  return (
    <div className={`relative w-full overflow-x-auto ${className}`}>
      <svg viewBox="0 0 800 500" className="w-full min-w-[600px] h-auto">
        {/* Background glow */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6"/>
          </linearGradient>
        </defs>

        {/* Connection lines */}
        {children.map((child, index) => {
          const angle = startAngle + index * angleStep;
          const x = centerX + Math.cos(angle) * radiusX;
          const y = centerY + Math.sin(angle) * radiusY;

          // Curved path
          const midX = centerX + Math.cos(angle) * (radiusX * 0.5);
          const midY = centerY + Math.sin(angle) * (radiusY * 0.5);

          return (
            <g key={`line-${child.id}`}>
              <path
                d={`M ${centerX} ${centerY} Q ${midX} ${midY} ${x} ${y}`}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray={hoveredNode === child.id ? "0" : "5,5"}
                className="transition-all duration-300"
                style={{
                  opacity: hoveredNode === child.id ? 1 : 0.5,
                }}
              />
              {/* Animated dot on line */}
              <circle r="3" fill="#8b5cf6" className="animate-pulse">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={`M ${centerX} ${centerY} Q ${midX} ${midY} ${x} ${y}`}
                />
              </circle>
            </g>
          );
        })}

        {/* Child nodes */}
        {children.map((child, index) => {
          const angle = startAngle + index * angleStep;
          const x = centerX + Math.cos(angle) * radiusX;
          const y = centerY + Math.sin(angle) * radiusY;
          const isHovered = hoveredNode === child.id;
          const hasLink = child.link || child.onClick;

          return (
            <g
              key={child.id}
              onClick={() => handleNodeClick(child)}
              onMouseEnter={() => setHoveredNode(child.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={hasLink ? 'cursor-pointer' : ''}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {/* Node background glow */}
              <circle
                cx={0}
                cy={0}
                r={isHovered ? 55 : 50}
                fill={child.color}
                opacity={isHovered ? 0.3 : 0.15}
                filter="url(#glow)"
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className="transition-all duration-300"
              />
              {/* Node circle */}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 48 : 45}
                fill="rgba(15, 23, 42, 0.8)"
                stroke={child.color}
                strokeWidth={isHovered ? 3 : 2}
                className="transition-all duration-300"
              />
              {/* Node label */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={isHovered ? 13 : 12}
                fontWeight="600"
                className="transition-all duration-300 select-none pointer-events-none"
              >
                {child.label.length > 10 ? (
                  <>
                    <tspan x={x} dy="-0.5em">{child.label.slice(0, Math.ceil(child.label.length / 2))}</tspan>
                    <tspan x={x} dy="1.2em">{child.label.slice(Math.ceil(child.label.length / 2))}</tspan>
                  </>
                ) : (
                  child.label
                )}
              </text>
              {/* Click indicator */}
              {hasLink && (
                <circle
                  cx={x + 35}
                  cy={y - 35}
                  r={10}
                  fill={isHovered ? child.color : 'rgba(255,255,255,0.2)'}
                  className="transition-all duration-300"
                />
              )}
              {hasLink && (
                <text
                  x={x + 35}
                  y={y - 35}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="10"
                  className="select-none pointer-events-none"
                >
                  +
                </text>
              )}
            </g>
          );
        })}

        {/* Center node */}
        <g
          onClick={() => handleNodeClick(data)}
          onMouseEnter={() => setHoveredNode(data.id)}
          onMouseLeave={() => setHoveredNode(null)}
          className={data.link || data.onClick ? 'cursor-pointer' : ''}
        >
          {/* Center glow */}
          <circle
            cx={centerX}
            cy={centerY}
            r={hoveredNode === data.id ? 75 : 70}
            fill={data.color}
            opacity={0.3}
            filter="url(#glow)"
            className="transition-all duration-300"
          />
          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={hoveredNode === data.id ? 68 : 65}
            fill="rgba(15, 23, 42, 0.9)"
            stroke={data.color}
            strokeWidth="3"
            className="transition-all duration-300"
          />
          {/* Animated ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={75}
            fill="none"
            stroke={data.color}
            strokeWidth="1"
            strokeDasharray="10,5"
            opacity="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${centerX} ${centerY}`}
              to={`360 ${centerX} ${centerY}`}
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Center label */}
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="16"
            fontWeight="bold"
            className="select-none pointer-events-none"
          >
            {data.label}
          </text>
        </g>
      </svg>
    </div>
  );
};

// AI Learning Path Mind Map Data
export const getAILearningMindMap = (language: 'zh' | 'ja', onNavigate?: (section: number) => void): MindMapNode => ({
  id: 'ai-learning',
  label: language === 'ja' ? 'AI学習' : 'AI 学习',
  color: '#8b5cf6',
  children: [
    {
      id: 'ai-intro',
      label: language === 'ja' ? 'AIとは' : '什么是AI',
      color: '#f59e0b',
      onClick: () => onNavigate?.(0),
    },
    {
      id: 'ml',
      label: language === 'ja' ? '機械学習' : '机器学习',
      color: '#3b82f6',
      onClick: () => onNavigate?.(1),
    },
    {
      id: 'dl',
      label: language === 'ja' ? '深層学習' : '深度学习',
      color: '#ec4899',
      onClick: () => onNavigate?.(2),
    },
    {
      id: 'llm',
      label: language === 'ja' ? 'LLM' : '大语言模型',
      color: '#10b981',
      onClick: () => onNavigate?.(3),
    },
  ],
});

// AI Resources Mind Map Data
export const getAIResourcesMindMap = (language: 'zh' | 'ja', onCategoryClick?: (index: number) => void): MindMapNode => ({
  id: 'ai-resources',
  label: language === 'ja' ? 'AIリソース' : 'AI 资源',
  color: '#ec4899',
  children: [
    {
      id: 'frameworks',
      label: language === 'ja' ? 'フレームワーク' : 'AI 框架',
      color: '#3b82f6',
      onClick: () => onCategoryClick?.(0),
    },
    {
      id: 'llm-tools',
      label: language === 'ja' ? 'LLMツール' : 'LLM 工具',
      color: '#8b5cf6',
      onClick: () => onCategoryClick?.(1),
    },
    {
      id: 'platforms',
      label: language === 'ja' ? 'プラットフォーム' : 'AI 平台',
      color: '#10b981',
      onClick: () => onCategoryClick?.(2),
    },
    {
      id: 'datasets',
      label: language === 'ja' ? 'データセット' : '数据集',
      color: '#f59e0b',
      onClick: () => onCategoryClick?.(3),
    },
    {
      id: 'courses',
      label: language === 'ja' ? 'コース' : '在线课程',
      color: '#ef4444',
      onClick: () => onCategoryClick?.(4),
    },
    {
      id: 'community',
      label: language === 'ja' ? 'コミュニティ' : '社区',
      color: '#6366f1',
      onClick: () => onCategoryClick?.(5),
    },
  ],
});

export default MindMap;
