# 交互式教育可视化设计原则

基于 [transformer-explainer](https://github.com/poloclub/transformer-explainer) 的设计模式总结。

## 核心理念

> **让抽象概念变得可触摸** - 通过交互让用户亲身体验数据如何流动和变换

---

## 1. 渐进式披露 (Progressive Disclosure)

### 原则
- 先展示全局概览，允许用户深入探索细节
- 不要一次性展示所有信息，避免认知过载
- 用展开/折叠控制信息密度

### 实现方式
```tsx
// 可展开面板
<ExpandableSection title="自注意力" expanded={expanded} onToggle={toggle}>
  <DetailedView /> {/* 只在展开时渲染 */}
</ExpandableSection>
```

### 层级结构
```
Level 1: 概览（流程图、关键数字）
Level 2: 详情（向量可视化、矩阵）
Level 3: 深度（具体数值、公式推导）
```

---

## 2. 视觉数据流 (Visual Data Flow)

### 原则
- 用从左到右（或从上到下）的布局展示数据变换过程
- 用流线（Sankey）连接各阶段，暗示数据流动
- 每个阶段用不同颜色区分

### 标准颜色方案
```typescript
const COLORS = {
  // 阶段颜色
  tokenize: '#8b5cf6',    // 紫色 - 分词
  embedding: '#3b82f6',   // 蓝色 - 嵌入
  attention: '#a855f7',   // 紫色 - 注意力
  mlp: '#f59e0b',         // 琥珀色 - MLP
  output: '#10b981',      // 绿色 - 输出

  // QKV标准色（ML约定）
  query: '#3b82f6',       // 蓝色
  key: '#ef4444',         // 红色
  value: '#22c55e',       // 绿色

  // 流线
  flowLine: '#c4b5fd',    // 淡紫色
};
```

### Sankey流线实现
```typescript
// 使用D3.js绘制贝塞尔曲线
const path = d3.path();
path.moveTo(startX, startY);
path.bezierCurveTo(midX, startY, midX, endY, endX, endY);
```

---

## 3. 同步交互 (Synchronized Interactions)

### 原则
- 悬停一个元素时，所有相关元素同时高亮
- 展示数据在各阶段的对应关系
- 用状态管理协调跨组件交互

### 实现方式
```tsx
// 全局hover状态
const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

// 传递给所有子组件
<TokenColumn hoveredIdx={hoveredIdx} onHover={setHoveredIdx} />
<EmbeddingColumn hoveredIdx={hoveredIdx} onHover={setHoveredIdx} />
<AttentionMatrix hoveredIdx={hoveredIdx} onHover={setHoveredIdx} />
// ...所有组件共享同一个hover状态
```

### 高亮样式
```tsx
className={hoveredIdx === idx
  ? 'ring-2 ring-purple-400 bg-purple-50 scale-105'
  : 'hover:bg-gray-50'
}
```

---

## 4. 真实数据表示 (Real Data Representation)

### 原则
- 用向量条形图展示实际数值（不是抽象示意图）
- 注意力矩阵用真实热力图
- 概率分布显示实际百分比

### 向量可视化
```tsx
// 每个维度一个小条，高度表示数值
const VectorBar = ({ values, color }) => (
  <svg>
    {values.map((v, i) => (
      <rect
        x={i * barWidth}
        y={(1 - v) * height}
        height={v * height}
        fill={color}
        opacity={0.4 + v * 0.6}
      />
    ))}
  </svg>
);
```

### 注意力热力图
```tsx
// 使用D3颜色比例尺
const colorScale = d3.scaleSequential(d3.interpolatePurples).domain([0, 1]);

// 矩阵单元格
style={{ backgroundColor: colorScale(attentionWeight) }}
```

---

## 5. 上下文标签 (Contextual Labels)

### 原则
- 每个阶段有清晰的标题和副标题
- 适当使用数学符号（QK/√d）
- 悬停显示详细数值的tooltip

### 标签结构
```tsx
<div className="text-center">
  <div className="font-semibold text-purple-600">自注意力</div>
  <div className="text-xs text-gray-400">Softmax(QK/√d)·V</div>
</div>
```

### Tooltip实现
```tsx
title={`${tokens[i].text} → ${tokens[j].text}: ${(val * 100).toFixed(1)}%`}
```

---

## 6. 流畅动画 (Smooth Animations)

### 原则
- 复杂过渡用GSAP/Framer Motion
- 简单悬停用CSS transitions
- 使用错开动画(stagger)增加层次感

### CSS过渡
```css
.element {
  transition: all 0.3s ease;
}
```

### GSAP动画（复杂场景）
```typescript
gsap.timeline()
  .to(element, { scale: 1.4, opacity: 0, duration: 0.5 })
  .to(cards, { y: -20, stagger: 0.06 })
```

---

## 7. 卡片堆叠效果 (Stacked Cards)

### 原则
- 用3D变换创造深度感
- 逐层缩放和透明度递减
- 前后导航动画

### 实现
```typescript
const headStyles = heads.map((_, index) => ({
  transform: `translate(${index * 4}px, ${index * 4}px) scale(${1 - index * 0.05})`,
  zIndex: heads.length - index,
  opacity: Math.max(0.2, 1 - index * 0.15)
}));
```

---

## 应用场景

这套设计原则适用于：

1. **神经网络架构** - CNN卷积过程、RNN时序展开
2. **算法流程** - 排序算法、搜索算法
3. **数据处理管道** - ETL流程、特征工程
4. **数学概念** - 矩阵运算、梯度下降
5. **系统架构** - 微服务调用、消息队列

---

## 组件清单

可复用的基础组件：

| 组件 | 用途 |
|-----|------|
| `VectorBar` | 向量数值可视化 |
| `HeatmapMatrix` | 注意力/相关性矩阵 |
| `FlowLines` | Sankey流线连接 |
| `ExpandableSection` | 可展开面板 |
| `ProbabilityBars` | 概率分布 |
| `StackedCards` | 卡片堆叠选择器 |
| `StepIndicator` | 步骤/阶段指示器 |

---

## 参考项目

- [transformer-explainer](https://github.com/poloclub/transformer-explainer) - Svelte + D3
- [CNN Explainer](https://github.com/poloclub/cnn-explainer) - 卷积网络可视化
- [GAN Lab](https://github.com/poloclub/ganlab) - GAN训练可视化
- [TensorFlow Playground](https://playground.tensorflow.org/) - 神经网络实验
