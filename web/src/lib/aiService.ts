/**
 * AI Service - Wrapper for AI API calls
 *
 * Supports multiple providers:
 * - OpenAI (GPT-4, GPT-3.5)
 * - Claude (Anthropic)
 * - Local LLM via Ollama
 */

export type AIProvider = 'openai' | 'claude' | 'ollama';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  error?: string;
}

// Default configurations
const DEFAULT_CONFIGS: Record<AIProvider, Partial<AIConfig>> = {
  openai: {
    model: 'gpt-4o-mini',
    baseUrl: 'https://api.openai.com/v1'
  },
  claude: {
    model: 'claude-3-sonnet-20240229',
    baseUrl: 'https://api.anthropic.com/v1'
  },
  ollama: {
    model: 'llama3.2',
    baseUrl: 'http://localhost:11434'
  }
};

// Get stored API key from localStorage
export function getStoredApiKey(provider: AIProvider): string | null {
  return localStorage.getItem(`studyforge_${provider}_api_key`);
}

// Store API key in localStorage
export function storeApiKey(provider: AIProvider, apiKey: string): void {
  localStorage.setItem(`studyforge_${provider}_api_key`, apiKey);
}

// Get stored provider
export function getStoredProvider(): AIProvider {
  return (localStorage.getItem('studyforge_ai_provider') as AIProvider) || 'openai';
}

// Store provider
export function storeProvider(provider: AIProvider): void {
  localStorage.setItem('studyforge_ai_provider', provider);
}

// Check if API is configured
export function isConfigured(provider?: AIProvider): boolean {
  const p = provider || getStoredProvider();
  if (p === 'ollama') return true; // Ollama doesn't need API key
  return !!getStoredApiKey(p);
}

// System prompt for the AI assistant
const SYSTEM_PROMPT = `你是 StudyForge 学习平台的 AI 助手。你的任务是帮助用户学习 AI、云计算和软件开发相关知识。

你的能力包括：
1. 回答技术问题（AI/ML、云计算、编程等）
2. 解释概念和代码
3. 提供学习建议和资源推荐
4. 帮助用户理解错题和复习内容

回答时请：
- 使用清晰简洁的语言
- 提供代码示例时使用正确的格式
- 根据用户的语言（中文或日语）回复
- 保持友好和鼓励的态度`;

/**
 * Send a chat message to the AI provider
 */
export async function sendMessage(
  messages: ChatMessage[],
  config?: Partial<AIConfig>
): Promise<AIResponse> {
  const provider = config?.provider || getStoredProvider();
  const apiKey = config?.apiKey || getStoredApiKey(provider);
  const defaultConfig = DEFAULT_CONFIGS[provider];
  const model = config?.model || defaultConfig.model;
  const baseUrl = config?.baseUrl || defaultConfig.baseUrl;

  // Add system prompt if not present
  const fullMessages: ChatMessage[] = messages[0]?.role === 'system'
    ? messages
    : [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

  try {
    switch (provider) {
      case 'openai':
        return await sendOpenAI(fullMessages, apiKey!, model!, baseUrl!);
      case 'claude':
        return await sendClaude(fullMessages, apiKey!, model!, baseUrl!);
      case 'ollama':
        return await sendOllama(fullMessages, model!, baseUrl!);
      default:
        return { content: '', error: 'Unknown provider' };
    }
  } catch (error) {
    console.error('AI request failed:', error);
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Request failed'
    };
  }
}

async function sendOpenAI(
  messages: ChatMessage[],
  apiKey: string,
  model: string,
  baseUrl: string
): Promise<AIResponse> {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API error');
  }

  const data = await response.json();
  return { content: data.choices[0].message.content };
}

async function sendClaude(
  messages: ChatMessage[],
  apiKey: string,
  model: string,
  baseUrl: string
): Promise<AIResponse> {
  // Extract system message
  const systemMessage = messages.find(m => m.role === 'system')?.content || '';
  const chatMessages = messages.filter(m => m.role !== 'system');

  const response = await fetch(`${baseUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      system: systemMessage,
      messages: chatMessages.map(m => ({
        role: m.role,
        content: m.content
      }))
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Claude API error');
  }

  const data = await response.json();
  return { content: data.content[0].text };
}

async function sendOllama(
  messages: ChatMessage[],
  model: string,
  baseUrl: string
): Promise<AIResponse> {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error('Ollama API error - Is Ollama running?');
  }

  const data = await response.json();
  return { content: data.message.content };
}
