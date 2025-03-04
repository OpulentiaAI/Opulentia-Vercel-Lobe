/**
 * Agent registry for the OPULENTIA platform
 */
import { v4 as uuidv4 } from 'uuid';

import { Agent, AgentConfig } from '../../types/agents';

export class AgentRegistry {
  private agents: Map<string, Agent> = new Map();

  constructor() {
    // Initialize with default agents
    this.registerDefaultAgents();
  }

  register(config: AgentConfig): Agent {
    // Create agent instance from configuration
    const agent: Agent = {
      ...config,
      createTime: config.createTime || Date.now(),
      execute: async (params) => {
        // Implementation of agent execution logic
        // Typically involves calling an LLM with appropriate context
        return await this.executeAgent(config.id, params);
      },
      id: config.id || uuidv4(),
    };

    // Register agent
    this.agents.set(agent.id, agent);

    console.log(`Agent registered: ${agent.id} (${agent.name})`);
    return agent;
  }

  getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  getAgentsBySpecialization(specialization: string): Agent[] {
    return this.getAllAgents().filter((agent) => agent.specialization === specialization);
  }

  private async executeAgent(agentId: string, params: any): Promise<any> {
    // Actual implementation of agent execution
    // This would call the LLM with the appropriate context
    // and handle any tool calls

    // For now, return a placeholder
    // In a full implementation, this would call the ModelProviderManager
    return {
      output: `This is a placeholder response from agent ${agentId}. Task: ${params.task}, Input: ${params.input}`,
      reasoning: `Agent ${agentId} is processing ${params.task} with input "${params.input}"`,
    };
  }

  private registerDefaultAgents(): void {
    // Register some default agents for the system

    // Financial Analysis Agent
    this.register({
      abilities: ['data-interpretation', 'trend-analysis', 'financial-forecasting'],
      description: 'Specializes in analyzing financial data and providing insights',
      id: 'financial-analysis-agent',
      name: 'Financial Analysis Agent',
      specialization: 'financial-analysis',
      systemPrompt:
        'You are a financial analysis expert. Analyze financial data and provide insights. Be precise and use proper financial terminology.',
    });

    // Data Retrieval Agent
    this.register({
      abilities: ['stock-price-lookup', 'financial-statement-retrieval', 'market-data-retrieval'],
      description: 'Specializes in retrieving financial data from various sources',
      id: 'data-retrieval-agent',
      name: 'Data Retrieval Agent',
      specialization: 'data-retrieval',
      systemPrompt:
        'You are a financial data retrieval specialist. Retrieve accurate financial data from available sources.',
    });

    // Search Agent
    this.register({
      abilities: ['semantic-search', 'multi-hop-search', 'document-retrieval'],
      description: 'Specializes in searching financial knowledge bases and documents',
      id: 'search-agent',
      name: 'Search Agent',
      specialization: 'search',
      systemPrompt:
        'You are a search specialist. Find relevant financial information from knowledge bases and documents.',
    });

    // Planning Agent (for complex queries)
    this.register({
      abilities: ['task-decomposition', 'query-analysis', 'step-planning'],
      description: 'Specializes in breaking down complex queries into sub-tasks',
      id: 'planning-agent',
      name: 'Planning Agent',
      specialization: 'planning',
      systemPrompt:
        'You are a planning specialist. Break down complex queries into manageable sub-tasks and coordinate their execution.',
    });
  }
}
