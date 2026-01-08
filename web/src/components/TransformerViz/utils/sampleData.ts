// Pre-computed sample data for demonstration

export interface SampleInput {
  text: string;
  language: 'zh' | 'ja';
  description: {
    zh: string;
    ja: string;
  };
}

export const sampleInputs: SampleInput[] = [
  {
    text: '今天天气很好',
    language: 'zh',
    description: {
      zh: '简单的天气描述',
      ja: '簡単な天気の説明',
    },
  },
  {
    text: '我喜欢学习AI',
    language: 'zh',
    description: {
      zh: '学习主题',
      ja: '学習テーマ',
    },
  },
  {
    text: '机器学习很有趣',
    language: 'zh',
    description: {
      zh: '技术评价',
      ja: '技術評価',
    },
  },
  {
    text: '今日は天気がいい',
    language: 'ja',
    description: {
      zh: '日语天气描述',
      ja: '天気の説明',
    },
  },
  {
    text: 'AIを勉強する',
    language: 'ja',
    description: {
      zh: '日语学习主题',
      ja: '学習テーマ',
    },
  },
];

// Default input by language
export const defaultInputs = {
  zh: '今天天气很好',
  ja: '今日は天気がいい',
};

// Animation timing configurations (in milliseconds)
export const animationTimings = {
  slow: {
    tokenization: 800,
    embedding: 1000,
    attention: 1500,
    mlp: 800,
    output: 1000,
    tokenDelay: 200,
  },
  normal: {
    tokenization: 500,
    embedding: 700,
    attention: 1000,
    mlp: 500,
    output: 700,
    tokenDelay: 100,
  },
  fast: {
    tokenization: 300,
    embedding: 400,
    attention: 600,
    mlp: 300,
    output: 400,
    tokenDelay: 50,
  },
};

// Color schemes for visualization
export const colorSchemes = {
  // Token colors (based on position)
  tokenColors: [
    '#f59e0b', // amber-500
    '#10b981', // emerald-500
    '#3b82f6', // blue-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#f97316', // orange-500
    '#14b8a6', // teal-500
    '#6366f1', // indigo-500
  ],

  // Attention heatmap gradient
  attentionGradient: {
    low: '#fef3c7',    // amber-100
    mid: '#fbbf24',    // amber-400
    high: '#d97706',   // amber-600
  },

  // Embedding vector visualization
  embeddingPositive: '#10b981', // emerald-500
  embeddingNegative: '#ef4444', // red-500
  embeddingNeutral: '#9ca3af',  // gray-400

  // Stage backgrounds
  stageBackground: {
    idle: '#f5f5f4',       // stone-100
    active: '#fef3c7',     // amber-100
    complete: '#d1fae5',   // emerald-100
  },
};

// Explanation texts for each stage
export const stageExplanations = {
  zh: {
    tokenization: '将输入文本分割成模型可以处理的最小单位（Token）。每个 Token 都有一个唯一的 ID。',
    embedding: '每个 Token 被转换成一个数字向量（词嵌入），同时加上位置信息（位置编码）。',
    attention: '计算每个词与其他词的相关程度。颜色越深表示注意力越集中。',
    mlp: '通过前馈神经网络进行非线性变换，增强模型的表达能力。',
    output: '将最终表示转换为词汇表上的概率分布，选择概率最高的词作为预测结果。',
  },
  ja: {
    tokenization: '入力テキストをモデルが処理できる最小単位（Token）に分割します。各Tokenには固有のIDがあります。',
    embedding: '各Tokenを数値ベクトル（単語埋め込み）に変換し、位置情報（位置エンコーディング）を追加します。',
    attention: '各単語と他の単語の関連度を計算します。色が濃いほど注目度が高いことを示します。',
    mlp: 'フィードフォワードネットワークによる非線形変換で、モデルの表現力を高めます。',
    output: '最終表現を語彙上の確率分布に変換し、最も確率の高い単語を予測結果として選択します。',
  },
};
