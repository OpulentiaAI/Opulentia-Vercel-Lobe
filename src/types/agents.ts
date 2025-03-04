/**
 * Agent types for the OPULENTIA platform
 */

export interface AgentConfig {
  abilities: string[];
  createTime?: number;
  description: string;
  id: string;
  name: string;
  specialization: string;
  systemPrompt?: string;
  tools?: string[];
}

export interface Agent extends AgentConfig {
  execute: (params: AgentExecuteParams) => Promise<AgentExecuteResult>;
}

export interface AgentExecuteParams {
  context?: any;
  input: string;
  task: string;
}

export interface AgentExecuteResult {
  output: string;
  reasoning?: string;
}

export interface ReasoningStep {
  action: string;
  agent: string;
  output?: string;
  reasoning: string;
}

export interface OrchestrationContext {
  financialContext?: any;
  previousResults?: any[];
  sessionId?: string;
  userPreferences?: any;
}

export interface OrchestrationParams {
  context?: OrchestrationContext;
  primaryAgentId: string;
  query: string;
  reasoningFramework?: any; // Using 'any' temporarily to avoid circular import issues
  supportingAgentIds?: string[];
}

export interface OrchestrationResult {
  result: string;
  supportingAgentIds: string[];
  trace: ReasoningStep[];
}
