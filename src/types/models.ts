/**
 * Model provider types for the OPULENTIA platform
 */

export interface ModelProvider {
  apiKey?: string;
  baseURL?: string;
  description: string;
  id: string;
  models: string[];
  name: string;
}

export interface ModelRequest {
  messages?: Array<{
    content: string;
    role: 'system' | 'user' | 'assistant';
  }>;
  options?: {
    fallback?: string;
    functions?: any[];
    maxTokens?: number;
    model?: string;
    preferences?: {
      provider?: string;
    };
    stream?: boolean;
    temperature?: number;
    topP?: number;
  };
  prompt?: string;
  providerKey?: string;
}

export interface ModelResponse {
  content: string;
  modelUsed: string;
  provider: string;
  usage?: {
    completionTokens: number;
    promptTokens: number;
    totalTokens: number;
  };
}

export enum ModelCapability {
  AUDIO = 'audio',
  CHAT = 'chat',
  EMBEDDING = 'embedding',
  FUNCTION_CALLING = 'function_calling',
  IMAGE = 'image',
  REASONING = 'reasoning',
  TEXT = 'text',
  VISION = 'vision',
}
