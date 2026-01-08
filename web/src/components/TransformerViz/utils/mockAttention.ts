// Simulated attention patterns for educational demonstration
import { Token, AttentionHead, EmbeddingVector, OutputProbability } from '../types';

/**
 * Generate realistic-looking embedding vectors
 * Uses deterministic pseudo-random based on token ID
 */
export function generateEmbeddings(tokens: Token[]): EmbeddingVector[] {
  return tokens.map((token, index) => {
    // Generate pseudo-random values based on token ID
    const seed = token.tokenId;
    const values = Array.from({ length: 8 }, (_, i) => {
      const x = Math.sin(seed * (i + 1) * 0.1) * 0.5 + 0.5;
      return Math.round(x * 100) / 100;
    });

    // Position encoding (sinusoidal pattern)
    const positionValues = Array.from({ length: 8 }, (_, i) => {
      const pos = index;
      const div = Math.pow(10000, (2 * Math.floor(i / 2)) / 8);
      const val = i % 2 === 0 ? Math.sin(pos / div) : Math.cos(pos / div);
      return Math.round(val * 100) / 100;
    });

    // Combined = token embedding + position encoding
    const combinedValues = values.map((v, i) => {
      const combined = v + positionValues[i];
      return Math.round(combined * 100) / 100;
    });

    return {
      tokenId: token.tokenId,
      values,
      positionValues,
      combinedValues,
    };
  });
}

/**
 * Generate simulated attention weights
 * Creates patterns that demonstrate key attention behaviors:
 * - Tokens attend to themselves (diagonal)
 * - Recent tokens get more attention (locality)
 * - Certain semantic relationships (subject-verb, etc.)
 */
export function generateAttentionWeights(tokens: Token[]): AttentionHead[] {
  const n = tokens.length;
  const heads: AttentionHead[] = [];

  // Head 1: Diagonal attention (self-attention pattern)
  const head1Weights = createDiagonalPattern(n);
  heads.push({
    headIndex: 0,
    weights: head1Weights,
    label: 'Self',
  });

  // Head 2: Local attention (nearby tokens)
  const head2Weights = createLocalPattern(n);
  heads.push({
    headIndex: 1,
    weights: head2Weights,
    label: 'Local',
  });

  // Head 3: Beginning attention (attend to first tokens)
  const head3Weights = createBeginningPattern(n);
  heads.push({
    headIndex: 2,
    weights: head3Weights,
    label: 'Start',
  });

  // Head 4: Mixed semantic pattern
  const head4Weights = createSemanticPattern(n, tokens);
  heads.push({
    headIndex: 3,
    weights: head4Weights,
    label: 'Semantic',
  });

  return heads;
}

function createDiagonalPattern(n: number): number[][] {
  const weights: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      if (j > i) {
        // Causal mask: can't attend to future
        row.push(0);
      } else if (i === j) {
        // High attention on self
        row.push(0.4 + Math.random() * 0.2);
      } else {
        // Low attention on others
        row.push(Math.random() * 0.15);
      }
    }
    // Normalize row to sum to 1
    const sum = row.reduce((a, b) => a + b, 0);
    weights.push(row.map(v => Math.round((v / sum) * 100) / 100));
  }
  return weights;
}

function createLocalPattern(n: number): number[][] {
  const weights: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      if (j > i) {
        row.push(0);
      } else {
        // Higher attention for nearby tokens
        const distance = i - j;
        const attention = Math.exp(-distance * 0.5) * (0.8 + Math.random() * 0.2);
        row.push(attention);
      }
    }
    const sum = row.reduce((a, b) => a + b, 0);
    weights.push(row.map(v => Math.round((v / sum) * 100) / 100));
  }
  return weights;
}

function createBeginningPattern(n: number): number[][] {
  const weights: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      if (j > i) {
        row.push(0);
      } else if (j === 0) {
        // High attention on first token
        row.push(0.5 + Math.random() * 0.2);
      } else {
        row.push(Math.random() * 0.2);
      }
    }
    const sum = row.reduce((a, b) => a + b, 0);
    weights.push(row.map(v => Math.round((v / sum) * 100) / 100));
  }
  return weights;
}

function createSemanticPattern(n: number, tokens: Token[]): number[][] {
  const weights: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      if (j > i) {
        row.push(0);
      } else {
        // Simulate semantic similarity based on token types
        let attention = 0.1 + Math.random() * 0.1;

        // Same character type gets higher attention
        const isCJK = (t: string) => /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/.test(t);
        if (isCJK(tokens[i].text) === isCJK(tokens[j].text)) {
          attention += 0.2;
        }

        row.push(attention);
      }
    }
    const sum = row.reduce((a, b) => a + b, 0);
    weights.push(row.map(v => Math.round((v / sum) * 100) / 100));
  }
  return weights;
}

/**
 * Generate MLP activations (simplified visualization)
 */
export function generateMLPActivations(embeddings: EmbeddingVector[]): number[] {
  // Simplified: show activation values per token
  return embeddings.map((emb) => {
    const avgValue = emb.combinedValues.reduce((a, b) => a + b, 0) / emb.combinedValues.length;
    // ReLU-like activation
    return Math.max(0, Math.round(avgValue * 100) / 100);
  });
}

/**
 * Generate output probabilities with temperature scaling
 */
export function generateOutputProbabilities(
  tokens: Token[],
  temperature: number,
  topK: number,
  _topP: number
): { probabilities: OutputProbability[]; predicted: string } {
  // Simulated next-token predictions based on input
  const lastToken = tokens[tokens.length - 1];

  // Pre-defined likely continuations
  const continuations: Record<string, [string, number][]> = {
    '好': [['。', 0.3], ['！', 0.2], ['的', 0.15], ['吗', 0.1], ['啊', 0.08]],
    '天气': [['很', 0.35], ['好', 0.25], ['不', 0.15], ['真', 0.1]],
    'AI': [['技术', 0.25], ['模型', 0.2], ['。', 0.15], ['的', 0.1]],
    '学习': [['AI', 0.3], ['。', 0.2], ['机器', 0.15], ['的', 0.1]],
    'いい': [['です', 0.4], ['ね', 0.25], ['。', 0.15]],
    '勉強': [['する', 0.35], ['が', 0.25], ['を', 0.15]],
    default: [['。', 0.2], ['的', 0.15], ['是', 0.1], ['了', 0.08], ['很', 0.07]],
  };

  const baseProbabilities = continuations[lastToken.text] || continuations['default'];

  // Apply temperature scaling
  let scaledProbs = baseProbabilities.map(([token, prob]): [string, number] => {
    const logit = Math.log(prob);
    const scaledLogit = logit / temperature;
    return [token, Math.exp(scaledLogit)];
  });

  // Normalize
  const sum = scaledProbs.reduce((acc, [, p]) => acc + p, 0);
  scaledProbs = scaledProbs.map(([t, p]): [string, number] => [t, p / sum]);

  // Sort by probability
  scaledProbs.sort((a, b) => b[1] - a[1]);

  // Apply top-k filtering
  const topKProbs = scaledProbs.slice(0, topK);

  // Re-normalize after top-k
  const topKSum = topKProbs.reduce((acc, [, p]) => acc + p, 0);
  const normalizedProbs = topKProbs.map(([t, p]): [string, number] => [t, p / topKSum]);

  // Convert to output format
  const probabilities: OutputProbability[] = normalizedProbs.map(([token, probability], index) => ({
    token,
    probability: Math.round(probability * 100) / 100,
    rank: index + 1,
  }));

  // Predicted token (greedy selection)
  const predicted = probabilities[0]?.token || '。';

  return { probabilities, predicted };
}
