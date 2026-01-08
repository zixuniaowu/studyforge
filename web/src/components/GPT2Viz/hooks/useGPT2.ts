/**
 * useGPT2 Hook
 * Main hook for GPT-2 inference in React components
 */

import { useState, useCallback, useRef } from 'react';
import { GPT2Engine } from '../engine';
import { useModelLoader } from './useModelLoader';
import {
  InferenceResult,
  InferenceStage,
  VizSettings,
  DEFAULT_VIZ_SETTINGS,
} from '../types';

interface UseGPT2Return {
  // Model loading
  loadingState: ReturnType<typeof useModelLoader>['loadingState'];
  isLoaded: boolean;
  isLoading: boolean;
  loadModel: () => Promise<void>;

  // Inference
  isInferring: boolean;
  currentStage: InferenceStage;
  result: InferenceResult | null;
  error: string | null;

  // Actions
  runInference: (text: string, settings?: Partial<VizSettings>) => Promise<InferenceResult | null>;
  reset: () => void;

  // Settings
  settings: VizSettings;
  updateSettings: (updates: Partial<VizSettings>) => void;
}

export function useGPT2(): UseGPT2Return {
  const engineRef = useRef<GPT2Engine | null>(null);
  const modelLoader = useModelLoader();

  const [isInferring, setIsInferring] = useState(false);
  const [currentStage, setCurrentStage] = useState<InferenceStage>('idle');
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<VizSettings>(DEFAULT_VIZ_SETTINGS);

  // Get engine instance
  const getEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = GPT2Engine.getInstance();
    }
    return engineRef.current;
  }, []);

  // Run inference
  const runInference = useCallback(
    async (text: string, settingsOverride?: Partial<VizSettings>): Promise<InferenceResult | null> => {
      const engine = getEngine();

      if (!engine.isModelLoaded()) {
        setError('Model not loaded. Please load the model first.');
        return null;
      }

      if (isInferring) {
        return null;
      }

      const inferenceSettings = { ...settings, ...settingsOverride };

      setIsInferring(true);
      setError(null);
      setCurrentStage('idle');

      try {
        const inferenceResult = await engine.runInference(
          text,
          inferenceSettings,
          (state) => {
            setCurrentStage(state.currentStage);
            if (state.error) {
              setError(state.error);
            }
          }
        );

        setResult(inferenceResult);
        return inferenceResult;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Inference failed';
        setError(errorMessage);
        return null;
      } finally {
        setIsInferring(false);
      }
    },
    [getEngine, isInferring, settings]
  );

  // Update settings
  const updateSettings = useCallback((updates: Partial<VizSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setIsInferring(false);
    setCurrentStage('idle');
    setResult(null);
    setError(null);
    modelLoader.reset();
  }, [modelLoader]);

  return {
    // Model loading
    loadingState: modelLoader.loadingState,
    isLoaded: modelLoader.isLoaded,
    isLoading: modelLoader.isLoading,
    loadModel: modelLoader.loadModel,

    // Inference
    isInferring,
    currentStage,
    result,
    error,

    // Actions
    runInference,
    reset,

    // Settings
    settings,
    updateSettings,
  };
}

export default useGPT2;
