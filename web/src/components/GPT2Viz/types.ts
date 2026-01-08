// GPT-2 Visualization Types

// GPT-2 Small Configuration
export interface GPT2Config {
  vocabSize: number;        // 50257
  nLayer: number;           // 12 (GPT-2 Small)
  nHead: number;            // 12
  nEmbd: number;            // 768
  blockSize: number;        // 1024
}

export const GPT2_SMALL_CONFIG: GPT2Config = {
  vocabSize: 50257,
  nLayer: 12,
  nHead: 12,
  nEmbd: 768,
  blockSize: 1024,
};

// Token Information
export interface TokenInfo {
  id: number;               // Position in sequence
  text: string;             // Decoded text
  tokenId: number;          // Vocabulary ID
  bytes?: number[];         // Raw byte representation
}

// Embedding Data
export interface EmbeddingData {
  tokenId: number;
  tokenEmbedding: number[];      // [768]
  positionEmbedding: number[];   // [768]
  combined: number[];            // [768]
}

// Attention Data for a single head
export interface AttentionHead {
  layer: number;
  head: number;
  weights: number[][];  // [seq_len, seq_len]
}

// Complete Attention Data for all layers
export interface AttentionData {
  layers: AttentionHead[][];  // [12 layers][12 heads]
}

// Layer Output Data
export interface LayerOutput {
  layer: number;
  attentionOutput: number[];
  mlpInput: number[];
  mlpOutput: number[];
  residualOutput: number[];
}

// Token Prediction
export interface TokenPrediction {
  token: string;
  tokenId: number;
  probability: number;
  logit: number;
  rank: number;
}

// Complete Inference Result
export interface InferenceResult {
  inputText: string;
  tokens: TokenInfo[];
  embeddings: EmbeddingData[];
  attention: AttentionData;
  layerOutputs: LayerOutput[];
  logits: number[];
  predictions: TokenPrediction[];
  generatedToken: string;
}

// Model Loading State
export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface ModelLoadingState {
  status: ModelStatus;
  progress: number;         // 0-100
  statusText: string;
  error?: string;
  modelSize?: number;       // bytes
  downloadedSize?: number;  // bytes
}

// Inference State
export interface InferenceState {
  isRunning: boolean;
  currentStage: InferenceStage;
  result: InferenceResult | null;
  error?: string;
}

export type InferenceStage =
  | 'idle'
  | 'tokenizing'
  | 'embedding'
  | 'attention'
  | 'mlp'
  | 'output'
  | 'complete';

// Visualization Settings
export interface VizSettings {
  temperature: number;      // 0.1 - 2.0
  topK: number;             // 1 - 100
  topP: number;             // 0.0 - 1.0
  selectedLayer: number;    // 0 - 11
  selectedHead: number;     // 0 - 11
  showAllHeads: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
}

export const DEFAULT_VIZ_SETTINGS: VizSettings = {
  temperature: 1.0,
  topK: 10,
  topP: 0.9,
  selectedLayer: 0,
  selectedHead: 0,
  showAllHeads: false,
  animationSpeed: 'normal',
};

// Language
export type Language = 'zh' | 'ja';
