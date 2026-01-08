/**
 * GPT-2 Tokenizer Wrapper
 * Provides detailed tokenization with byte-level information
 */

import { AutoTokenizer, type PreTrainedTokenizer } from '@huggingface/transformers';
import { TokenInfo } from '../types';

const MODEL_ID = 'Xenova/gpt2';

export class GPT2Tokenizer {
  private static instance: GPT2Tokenizer | null = null;
  private tokenizer: PreTrainedTokenizer | null = null;
  private isLoading = false;

  private constructor() {}

  static getInstance(): GPT2Tokenizer {
    if (!GPT2Tokenizer.instance) {
      GPT2Tokenizer.instance = new GPT2Tokenizer();
    }
    return GPT2Tokenizer.instance;
  }

  isLoaded(): boolean {
    return this.tokenizer !== null;
  }

  async load(): Promise<void> {
    if (this.tokenizer) return;
    if (this.isLoading) return;

    this.isLoading = true;
    try {
      this.tokenizer = await AutoTokenizer.from_pretrained(MODEL_ID);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Tokenize text and return detailed token information
   */
  tokenize(text: string): TokenInfo[] {
    if (!this.tokenizer) {
      throw new Error('Tokenizer not loaded. Call load() first.');
    }

    // Encode the text
    const encoded = this.tokenizer.encode(text);
    const tokenIds = Array.from(encoded);

    // Decode each token individually
    const tokens: TokenInfo[] = tokenIds.map((tokenId, index) => {
      // Decode single token
      const decoded = this.tokenizer!.decode([tokenId], { skip_special_tokens: false });

      return {
        id: index,
        text: decoded,
        tokenId: tokenId,
      };
    });

    return tokens;
  }

  /**
   * Encode text to token IDs
   */
  encode(text: string): number[] {
    if (!this.tokenizer) {
      throw new Error('Tokenizer not loaded. Call load() first.');
    }
    return Array.from(this.tokenizer.encode(text));
  }

  /**
   * Decode token IDs to text
   */
  decode(tokenIds: number[]): string {
    if (!this.tokenizer) {
      throw new Error('Tokenizer not loaded. Call load() first.');
    }
    return this.tokenizer.decode(tokenIds, { skip_special_tokens: false });
  }

  /**
   * Decode a single token ID
   */
  decodeToken(tokenId: number): string {
    if (!this.tokenizer) {
      throw new Error('Tokenizer not loaded. Call load() first.');
    }
    return this.tokenizer.decode([tokenId], { skip_special_tokens: false });
  }

  /**
   * Get vocabulary size
   */
  getVocabSize(): number {
    if (!this.tokenizer) {
      throw new Error('Tokenizer not loaded. Call load() first.');
    }
    // GPT-2 vocab size is 50257
    return 50257;
  }

  /**
   * Convert logits to top-k predictions
   */
  getTopKPredictions(
    logits: number[],
    k: number = 10,
    temperature: number = 1.0
  ): Array<{ token: string; tokenId: number; probability: number; logit: number; rank: number }> {
    if (!this.tokenizer) {
      throw new Error('Tokenizer not loaded. Call load() first.');
    }

    // Apply temperature
    const scaledLogits = logits.map(l => l / temperature);

    // Softmax
    const maxLogit = Math.max(...scaledLogits);
    const expLogits = scaledLogits.map(l => Math.exp(l - maxLogit));
    const sumExp = expLogits.reduce((a, b) => a + b, 0);
    const probs = expLogits.map(e => e / sumExp);

    // Get top-k indices
    const indexed = probs.map((p, i) => ({ prob: p, index: i, logit: logits[i] }));
    indexed.sort((a, b) => b.prob - a.prob);
    const topK = indexed.slice(0, k);

    return topK.map((item, rank) => ({
      token: this.decodeToken(item.index),
      tokenId: item.index,
      probability: item.prob,
      logit: item.logit,
      rank: rank + 1,
    }));
  }

  dispose(): void {
    this.tokenizer = null;
  }
}

export default GPT2Tokenizer;
