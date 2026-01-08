/**
 * TransformerExplainerV2 - 导出文件
 */

// 主组件
export { TransformerExplainerV2, default } from './TransformerExplainerV2';

// 子组件
export { EmbeddingStage } from './components/EmbeddingStage';
export { QKVStage } from './components/QKVStage';
export { AttentionStage } from './components/AttentionStage';
export { MLPStage } from './components/MLPStage';
export { OutputStage } from './components/OutputStage';
export { VectorBar, VectorBlock } from './components/VectorBar';
export { FlowLine, FlowLinesGroup, SankeyFlow, QKVSplitFlow } from './components/FlowLines';

// Hooks
export { useTransformerState } from './useTransformerState';

// 类型
export * from './types';

// Mock 数据
export { generateMockOutput, EXAMPLE_INPUTS, DEFAULT_OUTPUT } from './mockData';
