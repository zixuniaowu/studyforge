/**
 * GPT-2 Model Loader
 * Loads GPT-2 model using Transformers.js for browser inference
 */

import { pipeline, env, type TextGenerationPipeline } from '@huggingface/transformers';
import { ModelLoadingState } from '../types';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

// Model configuration - use the standard gpt2 model
const MODEL_ID = 'onnx-community/gpt2';

export type LoadingCallback = (state: ModelLoadingState) => void;

export class ModelLoader {
  private static instance: ModelLoader | null = null;
  private generator: TextGenerationPipeline | null = null;
  private isLoading = false;
  private loadingState: ModelLoadingState = {
    status: 'idle',
    progress: 0,
    statusText: '',
  };

  private constructor() {}

  static getInstance(): ModelLoader {
    if (!ModelLoader.instance) {
      ModelLoader.instance = new ModelLoader();
    }
    return ModelLoader.instance;
  }

  getLoadingState(): ModelLoadingState {
    return { ...this.loadingState };
  }

  isModelLoaded(): boolean {
    return this.generator !== null;
  }

  isModelLoading(): boolean {
    return this.isLoading;
  }

  getGenerator(): TextGenerationPipeline | null {
    return this.generator;
  }

  async loadModel(onProgress?: LoadingCallback): Promise<void> {
    if (this.generator) {
      // Model already loaded
      return;
    }

    if (this.isLoading) {
      // Already loading
      return;
    }

    this.isLoading = true;
    this.updateState({ status: 'loading', progress: 0, statusText: 'Initializing...' }, onProgress);

    try {
      // Load the text generation pipeline
      this.updateState({
        status: 'loading',
        progress: 10,
        statusText: 'Loading tokenizer and model...'
      }, onProgress);

      // @ts-expect-error - pipeline generic types are complex
      this.generator = await pipeline('text-generation', MODEL_ID, {
        progress_callback: (progress: { status: string; progress?: number; file?: string }) => {
          if (progress.progress !== undefined) {
            const percent = Math.round(progress.progress);
            const statusText = progress.file
              ? `Downloading ${progress.file}...`
              : `Loading... ${percent}%`;
            this.updateState({
              status: 'loading',
              progress: 10 + percent * 0.85, // Scale to 10-95%
              statusText,
            }, onProgress);
          }
        },
      });

      this.updateState({ status: 'ready', progress: 100, statusText: 'Model ready!' }, onProgress);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.updateState({
        status: 'error',
        progress: 0,
        statusText: 'Failed to load model',
        error: errorMessage,
      }, onProgress);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  private updateState(state: Partial<ModelLoadingState>, callback?: LoadingCallback): void {
    this.loadingState = { ...this.loadingState, ...state };
    callback?.(this.getLoadingState());
  }

  /**
   * Generate text using the loaded model
   */
  async generate(
    text: string,
    options: {
      maxNewTokens?: number;
      temperature?: number;
      topK?: number;
      topP?: number;
      doSample?: boolean;
    } = {}
  ): Promise<string> {
    if (!this.generator) {
      throw new Error('Model not loaded. Call loadModel() first.');
    }

    const {
      maxNewTokens = 1,
      temperature = 1.0,
      topK = 50,
      topP = 0.9,
      doSample = true,
    } = options;

    const result = await this.generator(text, {
      max_new_tokens: maxNewTokens,
      temperature,
      top_k: topK,
      top_p: topP,
      do_sample: doSample,
      return_full_text: true,
    });

    // Result is an array of generated sequences
    if (Array.isArray(result) && result.length > 0) {
      const generated = result[0] as { generated_text: string };
      return generated.generated_text;
    }

    return text;
  }

  /**
   * Dispose of the model and free memory
   */
  dispose(): void {
    this.generator = null;
    this.loadingState = { status: 'idle', progress: 0, statusText: '' };
  }
}

export default ModelLoader;
