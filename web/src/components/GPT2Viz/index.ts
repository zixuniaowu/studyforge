/**
 * GPT-2 Visualization Component
 *
 * A complete interactive visualization of GPT-2 inference process.
 * Features real browser-based inference using Transformers.js.
 */

export { GPT2VizMain } from './GPT2VizMain';

// Hooks
export { useGPT2, useModelLoader } from './hooks';

// Engine
export { GPT2Engine, ModelLoader, GPT2Tokenizer } from './engine';

// Visualizations
export {
  TokenizationPanel,
  OutputPanel,
  AttentionHeatmap,
  TransformerFlowViz,
  TransformerExplainer,
  TransformerExplainerV2,
  RAGPipelineViz,
  AgentLoopViz,
  AttentionViz
} from './visualizations';

// Types
export * from './types';

// i18n
export { i18n } from './i18n';
export type { I18nStrings } from './i18n';
