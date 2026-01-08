/**
 * useModelLoader Hook
 * Manages GPT-2 model loading state in React
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { GPT2Engine } from '../engine';
import { ModelLoadingState } from '../types';

interface UseModelLoaderReturn {
  loadingState: ModelLoadingState;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  loadModel: () => Promise<void>;
  reset: () => void;
}

export function useModelLoader(): UseModelLoaderReturn {
  const engineRef = useRef<GPT2Engine | null>(null);
  const [loadingState, setLoadingState] = useState<ModelLoadingState>({
    status: 'idle',
    progress: 0,
    statusText: '',
  });

  // Initialize engine reference
  useEffect(() => {
    engineRef.current = GPT2Engine.getInstance();

    // Check if model is already loaded
    if (engineRef.current.isModelLoaded()) {
      setLoadingState({
        status: 'ready',
        progress: 100,
        statusText: 'Model ready!',
      });
    }

    return () => {
      // Don't dispose on unmount - model should persist
    };
  }, []);

  const loadModel = useCallback(async () => {
    if (!engineRef.current) {
      engineRef.current = GPT2Engine.getInstance();
    }

    if (engineRef.current.isModelLoaded()) {
      setLoadingState({
        status: 'ready',
        progress: 100,
        statusText: 'Model ready!',
      });
      return;
    }

    if (engineRef.current.isModelLoading()) {
      return; // Already loading
    }

    try {
      await engineRef.current.loadModel((state) => {
        setLoadingState(state);
      });
    } catch (error) {
      setLoadingState({
        status: 'error',
        progress: 0,
        statusText: 'Failed to load model',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, []);

  const reset = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.dispose();
    }
    setLoadingState({
      status: 'idle',
      progress: 0,
      statusText: '',
    });
  }, []);

  return {
    loadingState,
    isLoaded: loadingState.status === 'ready',
    isLoading: loadingState.status === 'loading',
    error: loadingState.error || null,
    loadModel,
    reset,
  };
}

export default useModelLoader;
