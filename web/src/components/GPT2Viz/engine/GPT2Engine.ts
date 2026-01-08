/**
 * GPT-2 Inference Engine
 * Orchestrates model loading, tokenization, and inference
 */

import { ModelLoader, LoadingCallback } from './ModelLoader';
import { GPT2Tokenizer } from './Tokenizer';
import {
  TokenInfo,
  TokenPrediction,
  InferenceResult,
  InferenceState,
  InferenceStage,
  VizSettings,
  GPT2_SMALL_CONFIG,
  EmbeddingData,
  AttentionData,
  LayerOutput,
} from '../types';

export type InferenceCallback = (state: InferenceState) => void;

export class GPT2Engine {
  private static instance: GPT2Engine | null = null;
  private modelLoader: ModelLoader;
  private tokenizer: GPT2Tokenizer;
  private inferenceState: InferenceState = {
    isRunning: false,
    currentStage: 'idle',
    result: null,
  };

  private constructor() {
    this.modelLoader = ModelLoader.getInstance();
    this.tokenizer = GPT2Tokenizer.getInstance();
  }

  static getInstance(): GPT2Engine {
    if (!GPT2Engine.instance) {
      GPT2Engine.instance = new GPT2Engine();
    }
    return GPT2Engine.instance;
  }

  /**
   * Load the model and tokenizer
   */
  async loadModel(onProgress?: LoadingCallback): Promise<void> {
    await Promise.all([
      this.modelLoader.loadModel(onProgress),
      this.tokenizer.load(),
    ]);
  }

  isModelLoaded(): boolean {
    return this.modelLoader.isModelLoaded() && this.tokenizer.isLoaded();
  }

  isModelLoading(): boolean {
    return this.modelLoader.isModelLoading();
  }

  getModelLoadingState() {
    return this.modelLoader.getLoadingState();
  }

  getInferenceState(): InferenceState {
    return { ...this.inferenceState };
  }

  /**
   * Run inference on input text
   */
  async runInference(
    inputText: string,
    settings: VizSettings,
    onStageChange?: InferenceCallback
  ): Promise<InferenceResult> {
    if (!this.isModelLoaded()) {
      throw new Error('Model not loaded. Call loadModel() first.');
    }

    if (this.inferenceState.isRunning) {
      throw new Error('Inference already in progress.');
    }

    this.inferenceState = {
      isRunning: true,
      currentStage: 'idle',
      result: null,
    };

    try {
      // Stage 1: Tokenization
      this.updateStage('tokenizing', onStageChange);
      await this.delay(100); // Small delay for UI update
      const tokens = this.tokenizer.tokenize(inputText);

      // Stage 2: Embedding (simulated for visualization)
      this.updateStage('embedding', onStageChange);
      await this.delay(100);
      const embeddings = this.generateEmbeddingData(tokens);

      // Stage 3: Attention (simulated for now - will be real with custom ONNX)
      this.updateStage('attention', onStageChange);
      await this.delay(100);
      const attention = this.generateAttentionData(tokens.length);

      // Stage 4: MLP (simulated)
      this.updateStage('mlp', onStageChange);
      await this.delay(100);
      const layerOutputs = this.generateLayerOutputs(tokens.length);

      // Stage 5: Output - Real generation
      this.updateStage('output', onStageChange);

      // Generate next token using the model
      const generatedText = await this.modelLoader.generate(inputText, {
        maxNewTokens: 1,
        temperature: settings.temperature,
        topK: settings.topK,
        topP: settings.topP,
        doSample: settings.temperature > 0,
      });

      // Extract the generated token
      const generatedToken = generatedText.slice(inputText.length);

      // Get predictions (simulated logits for now)
      const predictions = this.generatePredictions(generatedToken, settings);

      // Create result
      const result: InferenceResult = {
        inputText,
        tokens,
        embeddings,
        attention,
        layerOutputs,
        logits: predictions.map(p => p.logit),
        predictions,
        generatedToken,
      };

      // Stage complete
      this.updateStage('complete', onStageChange);
      this.inferenceState.result = result;

      return result;
    } catch (error) {
      this.inferenceState.error = error instanceof Error ? error.message : 'Unknown error';
      this.updateStage('idle', onStageChange);
      throw error;
    } finally {
      this.inferenceState.isRunning = false;
    }
  }

  private updateStage(stage: InferenceStage, callback?: InferenceCallback): void {
    this.inferenceState.currentStage = stage;
    callback?.(this.getInferenceState());
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate embedding data for visualization
   * Note: These are simulated values for visualization purposes
   * Real embeddings would require custom ONNX model with intermediate outputs
   */
  private generateEmbeddingData(tokens: TokenInfo[]): EmbeddingData[] {
    const { nEmbd } = GPT2_SMALL_CONFIG;

    return tokens.map((token, position) => {
      // Generate simulated embedding vectors
      const tokenEmbedding = this.generateEmbeddingVector(token.tokenId, nEmbd);
      const positionEmbedding = this.generatePositionEmbedding(position, nEmbd);
      const combined = tokenEmbedding.map((v, i) => v + positionEmbedding[i]);

      return {
        tokenId: token.tokenId,
        tokenEmbedding,
        positionEmbedding,
        combined,
      };
    });
  }

  private generateEmbeddingVector(tokenId: number, dim: number): number[] {
    // Deterministic pseudo-random based on tokenId for consistency
    const vector: number[] = [];
    let seed = tokenId;
    for (let i = 0; i < dim; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      vector.push((seed / 0x7fffffff) * 2 - 1); // [-1, 1]
    }
    return vector;
  }

  private generatePositionEmbedding(position: number, dim: number): number[] {
    // Sinusoidal position encoding (like original Transformer)
    const vector: number[] = [];
    for (let i = 0; i < dim; i++) {
      const angle = position / Math.pow(10000, (2 * Math.floor(i / 2)) / dim);
      vector.push(i % 2 === 0 ? Math.sin(angle) : Math.cos(angle));
    }
    return vector;
  }

  /**
   * Generate attention data for visualization
   * Note: Simulated for now - will be replaced with real attention weights
   */
  private generateAttentionData(seqLen: number): AttentionData {
    const { nLayer, nHead } = GPT2_SMALL_CONFIG;

    const layers = Array.from({ length: nLayer }, (_, layerIdx) => {
      return Array.from({ length: nHead }, (_, headIdx) => {
        // Generate causal attention pattern
        const weights = this.generateCausalAttention(seqLen, layerIdx, headIdx);
        return {
          layer: layerIdx,
          head: headIdx,
          weights,
        };
      });
    });

    return { layers };
  }

  private generateCausalAttention(seqLen: number, layer: number, head: number): number[][] {
    const weights: number[][] = [];

    for (let i = 0; i < seqLen; i++) {
      const row: number[] = [];
      let sum = 0;

      // Generate raw scores (causal: can only attend to previous tokens)
      for (let j = 0; j < seqLen; j++) {
        if (j <= i) {
          // Different patterns for different heads
          const seed = (layer * 12 + head) * 1000 + i * 100 + j;
          const score = Math.abs(Math.sin(seed) * Math.cos(seed * 0.7));
          row.push(score);
          sum += score;
        } else {
          row.push(0); // Causal mask
        }
      }

      // Normalize to sum to 1
      weights.push(row.map(v => v / sum));
    }

    return weights;
  }

  /**
   * Generate layer outputs for visualization
   */
  private generateLayerOutputs(seqLen: number): LayerOutput[] {
    const { nLayer, nEmbd } = GPT2_SMALL_CONFIG;

    return Array.from({ length: nLayer }, (_, layerIdx) => {
      return {
        layer: layerIdx,
        attentionOutput: this.generateRandomVector(nEmbd * seqLen),
        mlpInput: this.generateRandomVector(nEmbd * seqLen),
        mlpOutput: this.generateRandomVector(nEmbd * seqLen),
        residualOutput: this.generateRandomVector(nEmbd * seqLen),
      };
    });
  }

  private generateRandomVector(dim: number): number[] {
    return Array.from({ length: Math.min(dim, 100) }, () => Math.random() * 2 - 1);
  }

  /**
   * Generate predictions based on the generated token
   */
  private generatePredictions(generatedToken: string, settings: VizSettings): TokenPrediction[] {
    // Create predictions with the generated token as top prediction
    const predictions: TokenPrediction[] = [];

    // Add the actual generated token as rank 1
    const mainTokenId = this.tokenizer.encode(generatedToken)[0] || 0;
    predictions.push({
      token: generatedToken || ' ',
      tokenId: mainTokenId,
      probability: 0.3 + Math.random() * 0.4, // 30-70%
      logit: 5 + Math.random() * 3,
      rank: 1,
    });

    // Generate additional candidate tokens
    const candidateTokens = [' the', ' a', ' to', ' and', ' of', ' is', ' in', ' that', ' it'];
    let remainingProb = 1 - predictions[0].probability;

    for (let i = 0; i < Math.min(settings.topK - 1, candidateTokens.length); i++) {
      const prob = remainingProb * (0.5 * Math.pow(0.6, i));
      predictions.push({
        token: candidateTokens[i],
        tokenId: 100 + i,
        probability: prob,
        logit: predictions[0].logit - (i + 1) * 0.5,
        rank: i + 2,
      });
      remainingProb -= prob;
    }

    return predictions;
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.modelLoader.dispose();
    this.tokenizer.dispose();
    this.inferenceState = {
      isRunning: false,
      currentStage: 'idle',
      result: null,
    };
  }
}

export default GPT2Engine;
