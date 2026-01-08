// Types for Transformer Visualization Component

export interface Token {
  id: number;
  text: string;
  tokenId: number; // Simulated vocabulary ID
}

export interface EmbeddingVector {
  tokenId: number;
  values: number[]; // Simplified to 8 dimensions for visualization
  positionValues: number[];
  combinedValues: number[];
}

export interface AttentionHead {
  headIndex: number;
  weights: number[][]; // n x n matrix
  label: string;
}

export interface OutputProbability {
  token: string;
  probability: number;
  rank: number;
}

export type Stage = 'idle' | 'tokenization' | 'embedding' | 'attention' | 'mlp' | 'output' | 'complete';

export type SamplingMethod = 'greedy' | 'topk' | 'topp';

export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export interface TransformerVizState {
  // User inputs
  inputText: string;
  temperature: number;
  topK: number;
  topP: number;
  samplingMethod: SamplingMethod;

  // Visualization state
  currentStage: Stage;
  isAnimating: boolean;
  animationSpeed: AnimationSpeed;

  // Processed data
  tokens: Token[];
  embeddings: EmbeddingVector[];
  attentionHeads: AttentionHead[];
  mlpActivations: number[];
  outputProbabilities: OutputProbability[];
  predictedToken: string;

  // Interaction state
  hoveredTokenIndex: number | null;
  selectedTokenIndex: number | null;
  hoveredAttentionCell: [number, number] | null;
  selectedAttentionHead: number;
}

export type TransformerVizAction =
  | { type: 'SET_INPUT_TEXT'; payload: string }
  | { type: 'SET_TEMPERATURE'; payload: number }
  | { type: 'SET_TOP_K'; payload: number }
  | { type: 'SET_TOP_P'; payload: number }
  | { type: 'SET_SAMPLING_METHOD'; payload: SamplingMethod }
  | { type: 'SET_ANIMATION_SPEED'; payload: AnimationSpeed }
  | { type: 'START_ANIMATION' }
  | { type: 'SET_STAGE'; payload: Stage }
  | { type: 'SET_TOKENS'; payload: Token[] }
  | { type: 'SET_EMBEDDINGS'; payload: EmbeddingVector[] }
  | { type: 'SET_ATTENTION'; payload: AttentionHead[] }
  | { type: 'SET_MLP_ACTIVATIONS'; payload: number[] }
  | { type: 'SET_OUTPUT'; payload: { probabilities: OutputProbability[]; predicted: string } }
  | { type: 'SET_HOVERED_TOKEN'; payload: number | null }
  | { type: 'SET_SELECTED_TOKEN'; payload: number | null }
  | { type: 'SET_HOVERED_ATTENTION_CELL'; payload: [number, number] | null }
  | { type: 'SET_SELECTED_ATTENTION_HEAD'; payload: number }
  | { type: 'RESET' };

export interface TransformerVizProps {
  language: 'zh' | 'ja';
  className?: string;
}
