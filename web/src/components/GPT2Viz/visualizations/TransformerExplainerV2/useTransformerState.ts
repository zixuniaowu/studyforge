/**
 * useTransformerState - 状态管理 Hook
 * 管理所有可视化状态和交互逻辑
 */

import { useState, useCallback } from 'react';
import { ExpandedBlock, ModelOutput } from './types';
import { generateMockOutput, EXAMPLE_INPUTS, DEFAULT_OUTPUT } from './mockData';

export interface TransformerState {
  // 输入
  inputText: string;
  setInputText: (text: string) => void;
  exampleIndex: number;
  setExampleIndex: (idx: number) => void;

  // 模型输出
  modelOutput: ModelOutput;

  // 展开状态
  expandedBlock: ExpandedBlock;
  setExpandedBlock: (block: ExpandedBlock) => void;
  toggleBlock: (block: ExpandedBlock) => void;

  // 注意力头选择
  selectedHead: number;
  setSelectedHead: (head: number) => void;

  // 层选择
  selectedLayer: number;
  setSelectedLayer: (layer: number) => void;

  // Hover 状态
  hoveredTokenIndex: number | null;
  setHoveredTokenIndex: (idx: number | null) => void;
  hoveredMatrixCell: { row: number; col: number } | null;
  setHoveredMatrixCell: (cell: { row: number; col: number } | null) => void;

  // 温度和采样
  temperature: number;
  setTemperature: (temp: number) => void;
  topK: number;
  setTopK: (k: number) => void;

  // 操作
  runModel: () => void;
  selectExample: (idx: number) => void;
}

export const useTransformerState = (): TransformerState => {
  // 输入状态
  const [inputText, setInputText] = useState(EXAMPLE_INPUTS[0]);
  const [exampleIndex, setExampleIndex] = useState(0);

  // 模型输出
  const [modelOutput, setModelOutput] = useState<ModelOutput>(DEFAULT_OUTPUT);

  // 展开状态
  const [expandedBlock, setExpandedBlock] = useState<ExpandedBlock>(null);

  // 注意力头和层选择
  const [selectedHead, setSelectedHead] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState(0);

  // Hover 状态
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState<number | null>(null);
  const [hoveredMatrixCell, setHoveredMatrixCell] = useState<{ row: number; col: number } | null>(null);

  // 温度和采样
  const [temperature, setTemperature] = useState(0.8);
  const [topK, setTopK] = useState(5);

  // 切换展开状态
  const toggleBlock = useCallback((block: ExpandedBlock) => {
    setExpandedBlock(prev => prev === block ? null : block);
  }, []);

  // 运行模型（生成新的输出）
  const runModel = useCallback(() => {
    const output = generateMockOutput(inputText);
    setModelOutput(output);
  }, [inputText]);

  // 选择示例
  const selectExample = useCallback((idx: number) => {
    setExampleIndex(idx);
    const text = EXAMPLE_INPUTS[idx];
    setInputText(text);
    const output = generateMockOutput(text);
    setModelOutput(output);
  }, []);

  return {
    inputText,
    setInputText,
    exampleIndex,
    setExampleIndex,
    modelOutput,
    expandedBlock,
    setExpandedBlock,
    toggleBlock,
    selectedHead,
    setSelectedHead,
    selectedLayer,
    setSelectedLayer,
    hoveredTokenIndex,
    setHoveredTokenIndex,
    hoveredMatrixCell,
    setHoveredMatrixCell,
    temperature,
    setTemperature,
    topK,
    setTopK,
    runModel,
    selectExample,
  };
};
