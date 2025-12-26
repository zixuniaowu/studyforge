import React from 'react';

// AI发展时间线
export const AITimelineSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 800 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* 背景 */}
    <defs>
      <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="800" height="200" fill="url(#timelineGrad)" rx="10" />

    {/* 时间线主线 */}
    <line x1="50" y1="100" x2="750" y2="100" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />

    {/* 1950s */}
    <circle cx="100" cy="100" r="12" fill="#F59E0B" />
    <text x="100" y="140" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600">1950s</text>
    <text x="100" y="160" textAnchor="middle" fill="#6B7280" fontSize="10">图灵测试</text>
    <text x="100" y="175" textAnchor="middle" fill="#6B7280" fontSize="10">AI诞生</text>

    {/* 1980s */}
    <circle cx="230" cy="100" r="12" fill="#10B981" />
    <text x="230" y="140" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600">1980s</text>
    <text x="230" y="160" textAnchor="middle" fill="#6B7280" fontSize="10">专家系统</text>
    <text x="230" y="175" textAnchor="middle" fill="#6B7280" fontSize="10">神经网络</text>

    {/* 2012 */}
    <circle cx="360" cy="100" r="12" fill="#3B82F6" />
    <text x="360" y="140" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600">2012</text>
    <text x="360" y="160" textAnchor="middle" fill="#6B7280" fontSize="10">AlexNet</text>
    <text x="360" y="175" textAnchor="middle" fill="#6B7280" fontSize="10">深度学习爆发</text>

    {/* 2017 */}
    <circle cx="490" cy="100" r="12" fill="#8B5CF6" />
    <text x="490" y="140" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600">2017</text>
    <text x="490" y="160" textAnchor="middle" fill="#6B7280" fontSize="10">Transformer</text>
    <text x="490" y="175" textAnchor="middle" fill="#6B7280" fontSize="10">注意力机制</text>

    {/* 2022 */}
    <circle cx="620" cy="100" r="12" fill="#EC4899" />
    <text x="620" y="140" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600">2022</text>
    <text x="620" y="160" textAnchor="middle" fill="#6B7280" fontSize="10">ChatGPT</text>
    <text x="620" y="175" textAnchor="middle" fill="#6B7280" fontSize="10">LLM时代</text>

    {/* 2024+ */}
    <circle cx="700" cy="100" r="12" fill="#EF4444" />
    <text x="700" y="140" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600">2024+</text>
    <text x="700" y="160" textAnchor="middle" fill="#6B7280" fontSize="10">多模态</text>
    <text x="700" y="175" textAnchor="middle" fill="#6B7280" fontSize="10">AGI探索</text>

    {/* 顶部标签 */}
    <text x="100" y="60" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="500">🎯 起源</text>
    <text x="360" y="60" textAnchor="middle" fill="#3B82F6" fontSize="11" fontWeight="500">🚀 突破</text>
    <text x="620" y="60" textAnchor="middle" fill="#EC4899" fontSize="11" fontWeight="500">💡 革命</text>
  </svg>
);

// 机器学习三大范式
export const MLTypesSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 800 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="supervisedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="unsupervisedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="rlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    {/* 监督学习 */}
    <g transform="translate(50, 30)">
      <rect x="0" y="0" width="200" height="240" rx="15" fill="url(#supervisedGrad)" opacity="0.1" stroke="#3B82F6" strokeWidth="2" />
      <rect x="0" y="0" width="200" height="50" rx="15" fill="url(#supervisedGrad)" />
      <text x="100" y="32" textAnchor="middle" fill="white" fontSize="16" fontWeight="600">监督学习</text>

      {/* 示意图 */}
      <g transform="translate(20, 70)">
        {/* 输入数据 */}
        <rect x="0" y="0" width="60" height="30" rx="5" fill="#DBEAFE" stroke="#3B82F6" />
        <text x="30" y="20" textAnchor="middle" fill="#1E40AF" fontSize="10">输入 X</text>
        {/* 标签 */}
        <rect x="0" y="40" width="60" height="30" rx="5" fill="#DBEAFE" stroke="#3B82F6" />
        <text x="30" y="60" textAnchor="middle" fill="#1E40AF" fontSize="10">标签 Y</text>
        {/* 箭头 */}
        <path d="M 70 35 L 100 35" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
        {/* 模型 */}
        <rect x="110" y="10" width="50" height="50" rx="8" fill="#3B82F6" />
        <text x="135" y="40" textAnchor="middle" fill="white" fontSize="10">模型</text>
      </g>

      {/* 应用场景 */}
      <text x="100" y="160" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="500">应用场景</text>
      <text x="100" y="180" textAnchor="middle" fill="#6B7280" fontSize="10">• 图像分类</text>
      <text x="100" y="195" textAnchor="middle" fill="#6B7280" fontSize="10">• 垃圾邮件检测</text>
      <text x="100" y="210" textAnchor="middle" fill="#6B7280" fontSize="10">• 房价预测</text>
    </g>

    {/* 无监督学习 */}
    <g transform="translate(300, 30)">
      <rect x="0" y="0" width="200" height="240" rx="15" fill="url(#unsupervisedGrad)" opacity="0.1" stroke="#10B981" strokeWidth="2" />
      <rect x="0" y="0" width="200" height="50" rx="15" fill="url(#unsupervisedGrad)" />
      <text x="100" y="32" textAnchor="middle" fill="white" fontSize="16" fontWeight="600">无监督学习</text>

      {/* 示意图 - 聚类 */}
      <g transform="translate(40, 70)">
        <circle cx="30" cy="20" r="8" fill="#34D399" />
        <circle cx="50" cy="35" r="8" fill="#34D399" />
        <circle cx="25" cy="45" r="8" fill="#34D399" />
        <circle cx="90" cy="25" r="8" fill="#F472B6" />
        <circle cx="110" cy="40" r="8" fill="#F472B6" />
        <circle cx="95" cy="55" r="8" fill="#F472B6" />
        {/* 聚类圈 */}
        <ellipse cx="35" cy="35" rx="35" ry="40" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5,3" />
        <ellipse cx="98" cy="40" rx="35" ry="40" fill="none" stroke="#EC4899" strokeWidth="2" strokeDasharray="5,3" />
      </g>

      {/* 应用场景 */}
      <text x="100" y="160" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="500">应用场景</text>
      <text x="100" y="180" textAnchor="middle" fill="#6B7280" fontSize="10">• 客户分群</text>
      <text x="100" y="195" textAnchor="middle" fill="#6B7280" fontSize="10">• 异常检测</text>
      <text x="100" y="210" textAnchor="middle" fill="#6B7280" fontSize="10">• 数据降维</text>
    </g>

    {/* 强化学习 */}
    <g transform="translate(550, 30)">
      <rect x="0" y="0" width="200" height="240" rx="15" fill="url(#rlGrad)" opacity="0.1" stroke="#F59E0B" strokeWidth="2" />
      <rect x="0" y="0" width="200" height="50" rx="15" fill="url(#rlGrad)" />
      <text x="100" y="32" textAnchor="middle" fill="white" fontSize="16" fontWeight="600">强化学习</text>

      {/* 示意图 - Agent Environment */}
      <g transform="translate(30, 65)">
        <rect x="0" y="20" width="50" height="35" rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
        <text x="25" y="42" textAnchor="middle" fill="#92400E" fontSize="10">Agent</text>

        <rect x="90" y="20" width="50" height="35" rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
        <text x="115" y="42" textAnchor="middle" fill="#92400E" fontSize="10">环境</text>

        {/* 循环箭头 */}
        <path d="M 55 30 Q 70 10 90 30" fill="none" stroke="#F59E0B" strokeWidth="2" />
        <text x="70" y="15" textAnchor="middle" fill="#D97706" fontSize="8">动作</text>
        <path d="M 90 45 Q 70 65 55 45" fill="none" stroke="#10B981" strokeWidth="2" />
        <text x="70" y="70" textAnchor="middle" fill="#059669" fontSize="8">奖励</text>
      </g>

      {/* 应用场景 */}
      <text x="100" y="160" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="500">应用场景</text>
      <text x="100" y="180" textAnchor="middle" fill="#6B7280" fontSize="10">• 游戏 AI</text>
      <text x="100" y="195" textAnchor="middle" fill="#6B7280" fontSize="10">• 机器人控制</text>
      <text x="100" y="210" textAnchor="middle" fill="#6B7280" fontSize="10">• 自动驾驶</text>
    </g>
  </svg>
);

// 神经网络结构图
export const NeuralNetworkSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 600 350" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="hiddenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="outputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>

    {/* 背景装饰 */}
    <rect x="0" y="0" width="600" height="350" fill="#F8FAFC" rx="15" />

    {/* 输入层 */}
    <g>
      {[70, 130, 190, 250].map((y, i) => (
        <g key={`input-${i}`}>
          <circle cx="80" cy={y} r="22" fill="url(#inputGrad)" />
          <text x="80" y={y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="500">x{i + 1}</text>
        </g>
      ))}
      <text x="80" y="300" textAnchor="middle" fill="#3B82F6" fontSize="13" fontWeight="600">输入层</text>
    </g>

    {/* 隐藏层1 */}
    <g>
      {[55, 115, 175, 235, 295].map((y, i) => (
        <circle key={`h1-${i}`} cx="220" cy={y} r="18" fill="url(#hiddenGrad)" />
      ))}
      <text x="220" y="330" textAnchor="middle" fill="#8B5CF6" fontSize="13" fontWeight="600">隐藏层 1</text>
    </g>

    {/* 隐藏层2 */}
    <g>
      {[85, 145, 205, 265].map((y, i) => (
        <circle key={`h2-${i}`} cx="360" cy={y} r="18" fill="url(#hiddenGrad)" />
      ))}
      <text x="360" y="330" textAnchor="middle" fill="#8B5CF6" fontSize="13" fontWeight="600">隐藏层 2</text>
    </g>

    {/* 输出层 */}
    <g>
      {[130, 190].map((y, i) => (
        <g key={`output-${i}`}>
          <circle cx="500" cy={y} r="22" fill="url(#outputGrad)" />
          <text x="500" y={y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="500">y{i + 1}</text>
        </g>
      ))}
      <text x="500" y="300" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="600">输出层</text>
    </g>

    {/* 连接线 - 输入到隐藏层1 */}
    {[70, 130, 190, 250].map((y1, i) =>
      [55, 115, 175, 235, 295].map((y2, j) => (
        <line
          key={`l1-${i}-${j}`}
          x1="102" y1={y1}
          x2="202" y2={y2}
          stroke="#CBD5E1"
          strokeWidth="1"
          opacity="0.5"
        />
      ))
    )}

    {/* 连接线 - 隐藏层1到隐藏层2 */}
    {[55, 115, 175, 235, 295].map((y1, i) =>
      [85, 145, 205, 265].map((y2, j) => (
        <line
          key={`l2-${i}-${j}`}
          x1="238" y1={y1}
          x2="342" y2={y2}
          stroke="#CBD5E1"
          strokeWidth="1"
          opacity="0.5"
        />
      ))
    )}

    {/* 连接线 - 隐藏层2到输出 */}
    {[85, 145, 205, 265].map((y1, i) =>
      [130, 190].map((y2, j) => (
        <line
          key={`l3-${i}-${j}`}
          x1="378" y1={y1}
          x2="478" y2={y2}
          stroke="#CBD5E1"
          strokeWidth="1"
          opacity="0.5"
        />
      ))
    )}

    {/* 标注 */}
    <g transform="translate(80, 20)">
      <rect x="-30" y="-10" width="60" height="25" rx="12" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1" />
      <text x="0" y="7" textAnchor="middle" fill="#1D4ED8" fontSize="10" fontWeight="500">特征输入</text>
    </g>
    <g transform="translate(500, 20)">
      <rect x="-30" y="-10" width="60" height="25" rx="12" fill="#ECFDF5" stroke="#10B981" strokeWidth="1" />
      <text x="0" y="7" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="500">预测输出</text>
    </g>
  </svg>
);

// Transformer架构简化图
export const TransformerSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 700 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="encoderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="decoderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="attentionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    {/* 背景 */}
    <rect x="0" y="0" width="700" height="400" fill="#FAFAFA" rx="15" />

    {/* 输入 */}
    <g transform="translate(50, 340)">
      <rect x="0" y="0" width="120" height="40" rx="8" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
      <text x="60" y="25" textAnchor="middle" fill="#4338CA" fontSize="12" fontWeight="500">输入文本</text>
    </g>

    {/* Embedding */}
    <g transform="translate(50, 270)">
      <rect x="0" y="0" width="120" height="50" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <text x="60" y="20" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="500">Embedding</text>
      <text x="60" y="38" textAnchor="middle" fill="#92400E" fontSize="9">+ 位置编码</text>
    </g>
    <line x1="110" y1="340" x2="110" y2="320" stroke="#6366F1" strokeWidth="2" markerEnd="url(#arrow)" />

    {/* 编码器 */}
    <g transform="translate(30, 50)">
      <rect x="0" y="0" width="160" height="200" rx="12" fill="url(#encoderGrad)" opacity="0.1" stroke="#3B82F6" strokeWidth="2" />
      <rect x="0" y="0" width="160" height="35" rx="12" fill="url(#encoderGrad)" />
      <text x="80" y="23" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">编码器 Encoder</text>

      {/* Multi-Head Attention */}
      <rect x="15" y="50" width="130" height="45" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="80" y="70" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="500">Multi-Head</text>
      <text x="80" y="85" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="500">Self-Attention</text>

      {/* Add & Norm */}
      <rect x="15" y="105" width="130" height="25" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1" />
      <text x="80" y="122" textAnchor="middle" fill="#4338CA" fontSize="9">Add & Norm</text>

      {/* Feed Forward */}
      <rect x="15" y="140" width="130" height="30" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="80" y="160" textAnchor="middle" fill="#1D4ED8" fontSize="10" fontWeight="500">Feed Forward</text>

      {/* Add & Norm */}
      <rect x="15" y="180" width="130" height="20" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1" />
      <text x="80" y="194" textAnchor="middle" fill="#4338CA" fontSize="9">Add & Norm</text>
    </g>
    <line x1="110" y1="270" x2="110" y2="250" stroke="#F59E0B" strokeWidth="2" />

    {/* N× 标注 */}
    <g transform="translate(195, 130)">
      <text x="0" y="0" fill="#3B82F6" fontSize="14" fontWeight="600">× N</text>
    </g>

    {/* 解码器 */}
    <g transform="translate(260, 30)">
      <rect x="0" y="0" width="180" height="260" rx="12" fill="url(#decoderGrad)" opacity="0.1" stroke="#10B981" strokeWidth="2" />
      <rect x="0" y="0" width="180" height="35" rx="12" fill="url(#decoderGrad)" />
      <text x="90" y="23" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">解码器 Decoder</text>

      {/* Masked Multi-Head Attention */}
      <rect x="15" y="45" width="150" height="40" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="90" y="62" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="500">Masked Multi-Head</text>
      <text x="90" y="77" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="500">Self-Attention</text>

      {/* Add & Norm */}
      <rect x="15" y="95" width="150" height="20" rx="4" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
      <text x="90" y="109" textAnchor="middle" fill="#047857" fontSize="9">Add & Norm</text>

      {/* Cross Attention */}
      <rect x="15" y="125" width="150" height="40" rx="6" fill="url(#attentionGrad)" />
      <text x="90" y="142" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Cross-Attention</text>
      <text x="90" y="157" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">(Encoder-Decoder)</text>

      {/* Add & Norm */}
      <rect x="15" y="175" width="150" height="20" rx="4" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
      <text x="90" y="189" textAnchor="middle" fill="#047857" fontSize="9">Add & Norm</text>

      {/* Feed Forward */}
      <rect x="15" y="205" width="150" height="30" rx="6" fill="#A7F3D0" stroke="#10B981" strokeWidth="1.5" />
      <text x="90" y="225" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="500">Feed Forward</text>

      {/* Add & Norm */}
      <rect x="15" y="245" width="150" height="20" rx="4" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
      <text x="90" y="259" textAnchor="middle" fill="#047857" fontSize="9">Add & Norm</text>
    </g>

    {/* N× 标注 */}
    <g transform="translate(445, 150)">
      <text x="0" y="0" fill="#10B981" fontSize="14" fontWeight="600">× N</text>
    </g>

    {/* 编码器到解码器的连接 */}
    <path d="M 190 150 Q 230 150 260 155" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,3" />

    {/* 输出层 */}
    <g transform="translate(500, 50)">
      <rect x="0" y="0" width="150" height="100" rx="10" fill="#F3E8FF" stroke="#A855F7" strokeWidth="2" />
      <text x="75" y="25" textAnchor="middle" fill="#7C3AED" fontSize="11" fontWeight="600">输出层</text>

      <rect x="15" y="40" width="120" height="25" rx="5" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1" />
      <text x="75" y="57" textAnchor="middle" fill="#6D28D9" fontSize="10">Linear</text>

      <rect x="15" y="70" width="120" height="25" rx="5" fill="#C4B5FD" stroke="#8B5CF6" strokeWidth="1" />
      <text x="75" y="87" textAnchor="middle" fill="#6D28D9" fontSize="10">Softmax</text>
    </g>
    <line x1="440" y1="100" x2="500" y2="100" stroke="#A855F7" strokeWidth="2" />

    {/* 输出 */}
    <g transform="translate(500, 170)">
      <rect x="0" y="0" width="150" height="40" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <text x="75" y="25" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="500">输出概率</text>
    </g>
    <line x1="575" y1="150" x2="575" y2="170" stroke="#10B981" strokeWidth="2" />

    {/* 标题 */}
    <text x="350" y="385" textAnchor="middle" fill="#4B5563" fontSize="14" fontWeight="600">Transformer 架构</text>
  </svg>
);

// LLM工作原理图
export const LLMWorkflowSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 800 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="llmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>

    {/* 背景 */}
    <rect x="0" y="0" width="800" height="250" fill="#FAFAFA" rx="15" />

    {/* 输入 */}
    <g transform="translate(30, 80)">
      <rect x="0" y="0" width="120" height="80" rx="12" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
      <text x="60" y="30" textAnchor="middle" fill="#4338CA" fontSize="12" fontWeight="600">用户输入</text>
      <text x="60" y="50" textAnchor="middle" fill="#6366F1" fontSize="10">"帮我写一首"</text>
      <text x="60" y="65" textAnchor="middle" fill="#6366F1" fontSize="10">"关于春天的诗"</text>
    </g>

    {/* 箭头 */}
    <g transform="translate(160, 115)">
      <line x1="0" y1="0" x2="40" y2="0" stroke="#6366F1" strokeWidth="3" />
      <polygon points="40,0 30,-8 30,8" fill="#6366F1" />
    </g>

    {/* Tokenization */}
    <g transform="translate(210, 70)">
      <rect x="0" y="0" width="100" height="100" rx="12" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <text x="50" y="25" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="600">分词</text>
      <text x="50" y="42" textAnchor="middle" fill="#B45309" fontSize="9">Tokenization</text>
      <g transform="translate(10, 55)">
        <rect x="0" y="0" width="25" height="18" rx="3" fill="#FDE68A" />
        <text x="12" y="13" textAnchor="middle" fill="#78350F" fontSize="8">帮</text>
        <rect x="28" y="0" width="25" height="18" rx="3" fill="#FDE68A" />
        <text x="40" y="13" textAnchor="middle" fill="#78350F" fontSize="8">我</text>
        <rect x="56" y="0" width="25" height="18" rx="3" fill="#FDE68A" />
        <text x="68" y="13" textAnchor="middle" fill="#78350F" fontSize="8">写</text>
      </g>
    </g>

    {/* 箭头 */}
    <g transform="translate(320, 115)">
      <line x1="0" y1="0" x2="40" y2="0" stroke="#F59E0B" strokeWidth="3" />
      <polygon points="40,0 30,-8 30,8" fill="#F59E0B" />
    </g>

    {/* LLM 模型 */}
    <g transform="translate(370, 50)">
      <rect x="0" y="0" width="140" height="140" rx="15" fill="url(#llmGrad)" />
      <text x="70" y="35" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">LLM</text>
      <text x="70" y="55" textAnchor="middle" fill="white" fontSize="10" opacity="0.9">大语言模型</text>

      {/* 内部结构示意 */}
      <rect x="20" y="70" width="100" height="55" rx="8" fill="white" opacity="0.2" />
      <text x="70" y="90" textAnchor="middle" fill="white" fontSize="9">Transformer</text>
      <text x="70" y="105" textAnchor="middle" fill="white" fontSize="9">× N 层</text>
      <text x="70" y="120" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">数十亿参数</text>
    </g>

    {/* 箭头 */}
    <g transform="translate(520, 115)">
      <line x1="0" y1="0" x2="40" y2="0" stroke="#EC4899" strokeWidth="3" />
      <polygon points="40,0 30,-8 30,8" fill="#EC4899" />
    </g>

    {/* Token 生成 */}
    <g transform="translate(570, 70)">
      <rect x="0" y="0" width="100" height="100" rx="12" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2" />
      <text x="50" y="25" textAnchor="middle" fill="#9D174D" fontSize="11" fontWeight="600">生成</text>
      <text x="50" y="42" textAnchor="middle" fill="#BE185D" fontSize="9">逐词预测</text>
      <g transform="translate(10, 55)">
        <rect x="0" y="0" width="25" height="18" rx="3" fill="#FBCFE8" />
        <text x="12" y="13" textAnchor="middle" fill="#9D174D" fontSize="8">春</text>
        <rect x="28" y="0" width="25" height="18" rx="3" fill="#FBCFE8" />
        <text x="40" y="13" textAnchor="middle" fill="#9D174D" fontSize="8">风</text>
        <rect x="56" y="0" width="25" height="18" rx="3" fill="#F9A8D4" />
        <text x="68" y="13" textAnchor="middle" fill="#9D174D" fontSize="8">...</text>
      </g>
    </g>

    {/* 箭头 */}
    <g transform="translate(680, 115)">
      <line x1="0" y1="0" x2="30" y2="0" stroke="#10B981" strokeWidth="3" />
      <polygon points="30,0 20,-8 20,8" fill="#10B981" />
    </g>

    {/* 输出 */}
    <g transform="translate(720, 75)">
      <rect x="0" y="0" width="70" height="90" rx="10" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
      <text x="35" y="25" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="600">输出</text>
      <text x="35" y="45" textAnchor="middle" fill="#059669" fontSize="9">完整</text>
      <text x="35" y="60" textAnchor="middle" fill="#059669" fontSize="9">诗歌</text>
      <text x="35" y="80" textAnchor="middle" fill="#10B981" fontSize="14">📝</text>
    </g>

    {/* 底部说明 */}
    <text x="400" y="230" textAnchor="middle" fill="#6B7280" fontSize="11">
      LLM 通过预测下一个最可能的 token，逐步生成完整的回复
    </text>
  </svg>
);

// 注意力机制可视化
export const AttentionSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="attGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    {/* 背景 */}
    <rect x="0" y="0" width="600" height="300" fill="#FAFAFA" rx="15" />

    {/* 标题 */}
    <text x="300" y="30" textAnchor="middle" fill="#374151" fontSize="16" fontWeight="700">Self-Attention 自注意力机制</text>

    {/* 输入序列 */}
    <g transform="translate(50, 60)">
      <text x="0" y="0" fill="#6B7280" fontSize="12" fontWeight="500">输入序列:</text>
      {['我', '喜欢', '学习', 'AI'].map((word, i) => (
        <g key={i} transform={`translate(${i * 80 + 80}, -15)`}>
          <rect x="0" y="0" width="60" height="35" rx="8" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5" />
          <text x="30" y="23" textAnchor="middle" fill="#4338CA" fontSize="13" fontWeight="500">{word}</text>
        </g>
      ))}
    </g>

    {/* 注意力权重可视化 */}
    <g transform="translate(50, 120)">
      <text x="0" y="0" fill="#6B7280" fontSize="12" fontWeight="500">注意力权重 (对于 "AI"):</text>

      {/* 权重条 */}
      {[
        { word: '我', weight: 0.15, color: '#C4B5FD' },
        { word: '喜欢', weight: 0.2, color: '#A78BFA' },
        { word: '学习', weight: 0.35, color: '#8B5CF6' },
        { word: 'AI', weight: 0.9, color: '#7C3AED' }
      ].map((item, i) => (
        <g key={i} transform={`translate(${i * 120 + 80}, 20)`}>
          <text x="40" y="0" textAnchor="middle" fill="#4B5563" fontSize="11">{item.word}</text>
          <rect x="0" y="10" width="80" height="25" rx="5" fill="#F3F4F6" stroke="#E5E7EB" />
          <rect x="0" y="10" width={80 * item.weight} height="25" rx="5" fill={item.color} />
          <text x="40" y="27" textAnchor="middle" fill="#1F2937" fontSize="10" fontWeight="500">{(item.weight * 100).toFixed(0)}%</text>
        </g>
      ))}
    </g>

    {/* 公式 */}
    <g transform="translate(50, 200)">
      <rect x="0" y="0" width="500" height="70" rx="10" fill="#F3E8FF" stroke="#A855F7" strokeWidth="1.5" />
      <text x="250" y="25" textAnchor="middle" fill="#6D28D9" fontSize="13" fontWeight="600">注意力计算公式</text>
      <text x="250" y="50" textAnchor="middle" fill="#7C3AED" fontSize="14" fontFamily="monospace">
        Attention(Q, K, V) = softmax(QK^T / √d) × V
      </text>
    </g>

    {/* Q K V 说明 */}
    <g transform="translate(50, 280)">
      <text x="0" y="0" fill="#6B7280" fontSize="10">Q=Query(查询) K=Key(键) V=Value(值) d=维度</text>
    </g>
  </svg>
);

export default {
  AITimelineSVG,
  MLTypesSVG,
  NeuralNetworkSVG,
  TransformerSVG,
  LLMWorkflowSVG,
  AttentionSVG
};
