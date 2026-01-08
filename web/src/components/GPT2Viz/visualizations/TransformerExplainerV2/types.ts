/**
 * TransformerExplainerV2 Types
 * 数据类型定义
 */

// Token 数据
export interface TokenData {
  text: string;
  id: number;
  embedding: number[];       // 768 维嵌入向量（简化展示）
  positionEncoding: number[]; // 位置编码
}

// QKV 数据
export interface QKVData {
  query: number[];  // 768 维
  key: number[];
  value: number[];
}

// 注意力头数据
export interface AttentionHead {
  layerIndex: number;  // 层索引
  headIndex: number;   // 头索引
  weights: number[][]; // [seq_len, seq_len] 注意力矩阵
  output: number[];    // 输出向量
}

// 概率分布数据
export interface ProbabilityItem {
  token: string;
  tokenId: number;
  logit: number;
  scaledLogit: number;
  probability: number;
  rank: number;
}

// 模型输出数据
export interface ModelOutput {
  tokens: TokenData[];
  qkv: QKVData[];           // 每个 token 的 QKV
  attentionHeads: AttentionHead[];
  mlpOutput: number[][];    // MLP 输出
  probabilities: ProbabilityItem[];
  predictedToken: string;
}

// 展开状态
export type ExpandedBlock = 'embedding' | 'qkv' | 'attention' | 'mlp' | 'output' | null;

// 颜色方案
export const COLORS = {
  // 阶段颜色
  embedding: '#9ca3af',     // 灰色
  query: '#3b82f6',         // 蓝色
  key: '#ef4444',           // 红色
  value: '#22c55e',         // 绿色
  attention: '#a855f7',     // 紫色
  mlp: '#f59e0b',           // 琥珀色
  output: '#8b5cf6',        // 紫色

  // 流线
  flowLine: '#c4b5fd',      // 淡紫色
  flowLineActive: '#8b5cf6', // 深紫色

  // 交互
  hover: '#fef3c7',         // 淡黄色高亮
  selected: '#ddd6fe',      // 淡紫色选中
};

// 模型元数据
export const MODEL_META = {
  name: 'GPT-2 Small',
  numLayers: 12,
  numHeads: 12,
  hiddenSize: 768,
  headDimension: 64, // 768 / 12
  vocabSize: 50257,
  mlpExpansion: 4,  // 768 * 4 = 3072
};
