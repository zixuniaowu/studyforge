/**
 * Mock Data Generator
 * 生成模拟的 GPT-2 推理数据用于可视化
 */

import { TokenData, QKVData, AttentionHead, ProbabilityItem, ModelOutput, MODEL_META } from './types';

// 生成随机向量（用于模拟嵌入）
const generateVector = (dim: number, seed: number = 0): number[] => {
  return Array.from({ length: dim }, (_, i) =>
    Math.abs(Math.sin(seed * 0.1 + i * 0.3 + Math.random() * 0.1)) * 0.8 + 0.2
  );
};

// 生成位置编码（正弦/余弦模式）
const generatePositionEncoding = (position: number, dim: number): number[] => {
  return Array.from({ length: dim }, (_, i) => {
    const angle = position / Math.pow(10000, (2 * Math.floor(i / 2)) / dim);
    return i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
  }).map(v => (v + 1) / 2); // 归一化到 [0, 1]
};

// 预定义的示例句子（与原版一致）
export const EXAMPLE_INPUTS = [
  'Data visualization empowers users to',
  'Artificial Intelligence is transforming the',
  'The weather today is very',
  'Machine learning models can',
  'Deep neural networks are'
];

// 模拟分词结果
export const tokenize = (text: string): string[] => {
  // 简化的 BPE 分词模拟
  const words = text.trim().split(/\s+/);
  const tokens: string[] = [];

  for (const word of words) {
    // 模拟 BPE：大部分词保持完整，某些长词拆分
    if (word.length > 8) {
      tokens.push(word.slice(0, 4));
      tokens.push(word.slice(4));
    } else {
      tokens.push(word);
    }
  }

  return tokens;
};

// 生成注意力矩阵（因果掩码）
const generateAttentionMatrix = (seqLen: number, headIdx: number): number[][] => {
  const matrix: number[][] = [];

  for (let i = 0; i < seqLen; i++) {
    const row: number[] = [];
    let sum = 0;

    // 因果掩码：只能看到当前及之前的位置
    for (let j = 0; j < seqLen; j++) {
      if (j <= i) {
        // 生成一些有意义的注意力模式
        let weight = Math.random() * 0.5;

        // 对角线附近权重更高（自注意）
        if (i === j) weight += 0.3;
        // 最近的 token 权重较高
        if (i - j <= 2) weight += 0.2;
        // 添加一些 head 特定的模式
        if (headIdx % 3 === 0 && j === 0) weight += 0.4; // 某些 head 关注开头

        row.push(weight);
        sum += weight;
      } else {
        row.push(0); // 未来位置设为 0
      }
    }

    // Softmax 归一化
    matrix.push(row.map(w => w / sum));
  }

  return matrix;
};

// 生成概率分布
const generateProbabilities = (): ProbabilityItem[] => {
  const candidates = [
    { token: 'the', base: 0.15 },
    { token: 'a', base: 0.12 },
    { token: 'their', base: 0.08 },
    { token: 'new', base: 0.07 },
    { token: 'world', base: 0.06 },
    { token: 'better', base: 0.05 },
    { token: 'more', base: 0.05 },
    { token: 'future', base: 0.04 },
    { token: 'understand', base: 0.04 },
    { token: 'explore', base: 0.03 },
    { token: 'create', base: 0.03 },
    { token: 'discover', base: 0.02 },
    { token: 'make', base: 0.02 },
    { token: 'see', base: 0.02 },
    { token: 'find', base: 0.02 },
  ];

  // 添加随机噪声并归一化
  let total = 0;
  const probs = candidates.map(c => {
    const logit = Math.log(c.base) + (Math.random() - 0.5) * 2;
    const prob = Math.exp(logit);
    total += prob;
    return { ...c, logit, prob };
  });

  return probs
    .map((p, idx) => ({
      token: p.token,
      tokenId: 1000 + idx,
      logit: p.logit,
      scaledLogit: p.logit / 0.8, // temperature = 0.8
      probability: p.prob / total,
      rank: idx
    }))
    .sort((a, b) => b.probability - a.probability)
    .map((p, idx) => ({ ...p, rank: idx }));
};

// 生成完整的模型输出
export const generateMockOutput = (inputText: string): ModelOutput => {
  const tokenTexts = tokenize(inputText);
  const seqLen = tokenTexts.length;

  // 生成 Token 数据
  const tokens: TokenData[] = tokenTexts.map((text, idx) => ({
    text,
    id: 1000 + idx * 100 + Math.floor(Math.random() * 100),
    embedding: generateVector(24, idx), // 简化为 24 维展示
    positionEncoding: generatePositionEncoding(idx, 24)
  }));

  // 生成 QKV 数据
  const qkv: QKVData[] = tokens.map((_, idx) => ({
    query: generateVector(24, idx * 3),
    key: generateVector(24, idx * 3 + 1),
    value: generateVector(24, idx * 3 + 2)
  }));

  // 生成注意力头数据（为前几层生成数据）
  const numLayersToGenerate = Math.min(6, MODEL_META.numLayers); // 简化：只生成前6层
  const attentionHeads: AttentionHead[] = [];
  for (let layerIdx = 0; layerIdx < numLayersToGenerate; layerIdx++) {
    for (let headIdx = 0; headIdx < MODEL_META.numHeads; headIdx++) {
      attentionHeads.push({
        layerIndex: layerIdx,
        headIndex: headIdx,
        weights: generateAttentionMatrix(seqLen, headIdx + layerIdx * 10),
        output: generateVector(24, headIdx * 100 + layerIdx * 1000)
      });
    }
  }

  // 生成 MLP 输出
  const mlpOutput = tokens.map((_, idx) => generateVector(24, idx * 50));

  // 生成概率分布
  const probabilities = generateProbabilities();

  return {
    tokens,
    qkv,
    attentionHeads,
    mlpOutput,
    probabilities,
    predictedToken: probabilities[0].token
  };
};

// 默认示例数据
export const DEFAULT_OUTPUT = generateMockOutput(EXAMPLE_INPUTS[0]);
