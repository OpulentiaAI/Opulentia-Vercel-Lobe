/**
 * Agent Orchestrator for the OPULENTIA platform
 * Coordinates the execution of multiple agents to fulfill user requests
 */
import { AgentRegistry } from '../agents/registry/AgentRegistry';
import { Agent, OrchestrationParams, OrchestrationResult, ReasoningStep } from '../types/agents';

export enum ReasoningFramework {
  // Structure, Task, Objective, Reasoning, Method
  PEER = 'PEER',
  STORM = 'STORM', // Plan, Execute, Evaluate, Reflect
  Standard = 'Standard',
}

// Session class to manage orchestration state
class OrchestrationSession {
  primaryAgent: Agent;
  supportingAgents: Agent[];
  query: string;
  context: any;
  reasoningFramework: ReasoningFramework;
  trace: ReasoningStep[] = [];

  constructor(options: {
    context: any;
    primaryAgent: Agent;
    query: string;
    reasoningFramework: ReasoningFramework;
    supportingAgents: Agent[];
  }) {
    this.primaryAgent = options.primaryAgent;
    this.supportingAgents = options.supportingAgents;
    this.query = options.query;
    this.context = options.context;
    this.reasoningFramework = options.reasoningFramework;
  }

  addToTrace(step: ReasoningStep): void {
    this.trace.push(step);
  }
}

export class AgentOrchestrator {
  private registry: AgentRegistry;

  constructor() {
    this.registry = new AgentRegistry();
  }

  async execute({
    query,
    primaryAgentId,
    supportingAgentIds = [],
    reasoningFramework = ReasoningFramework.STORM,
    context = {},
  }: OrchestrationParams): Promise<OrchestrationResult> {
    // Log orchestration start
    console.log(`Starting orchestration with primary agent ${primaryAgentId}`);

    // Get the primary agent
    const primaryAgent = this.registry.getAgent(primaryAgentId);
    if (!primaryAgent) {
      throw new Error(`Primary agent ${primaryAgentId} not found`);
    }

    // Get supporting agents
    const supportingAgents = supportingAgentIds.map((id) => {
      const agent = this.registry.getAgent(id);
      if (!agent) {
        throw new Error(`Supporting agent ${id} not found`);
      }
      return agent;
    });

    // Initialize the orchestration session
    const session = new OrchestrationSession({
      context,
      primaryAgent,
      query,
      reasoningFramework,
      supportingAgents,
    });

    // Start the orchestration process based on reasoning framework
    let result: OrchestrationResult;

    switch (session.reasoningFramework) {
      case ReasoningFramework.STORM: {
        result = await this.executeSTORMFramework(session);
        break;
      }
      case ReasoningFramework.PEER: {
        result = await this.executePEERFramework(session);
        break;
      }
      default: {
        result = await this.executeStandardFramework(session);
      }
    }

    // Log completion
    console.log(`Orchestration complete with ${result.trace.length} steps`);

    return result;
  }

  private async executeSTORMFramework(session: OrchestrationSession): Promise<OrchestrationResult> {
    // STORM = Structure, Task, Objective, Reasoning, Method
    const trace: ReasoningStep[] = [];

    // Step 1: Structure the problem
    const structureResult = await session.primaryAgent.execute({
      context: session.context,
      input: session.query,
      task: 'structure',
    });

    trace.push({
      action: 'structure',
      agent: session.primaryAgent.id,
      output: structureResult.output,
      reasoning: structureResult.reasoning || 'Structuring the problem',
    });

    // Step 2: Define task decomposition
    const taskDefinitionResult = await session.primaryAgent.execute({
      context: {
        ...session.context,
        problem_structure: structureResult.output,
      },
      input: structureResult.output,
      task: 'define_tasks',
    });

    trace.push({
      action: 'define_tasks',
      agent: session.primaryAgent.id,
      output: taskDefinitionResult.output,
      reasoning: taskDefinitionResult.reasoning || 'Defining subtasks',
    });

    // Mock task parsing for now
    // In a full implementation, this would parse JSON from the LLM
    const tasks = [
      {
        description: `Get financial data for the query: ${session.query}`,
        type: 'retrieve_data',
      },
      {
        description: `Analyze the financial data related to: ${session.query}`,
        type: 'analyze',
      },
    ];

    // Step 3: For each task, identify the objective and execute
    const taskResults = await Promise.all(
      tasks.map(async (task) => {
        // Identify the best agent for this task
        const assignedAgent = this.assignTaskToAgent(task, [
          session.primaryAgent,
          ...session.supportingAgents,
        ]);

        // Execute the task with the assigned agent
        const taskResult = await assignedAgent.execute({
          context: {
            ...session.context,
            previousSteps: trace,
          },
          input: task.description,
          task: task.type,
        });

        trace.push({
          action: task.type,
          agent: assignedAgent.id,
          output: taskResult.output,
          reasoning: taskResult.reasoning || `Executing task: ${task.type}`,
        });

        return {
          agent: assignedAgent,
          result: taskResult,
          task,
        };
      }),
    );

    // Step 4: Consolidate results with primary agent
    const consolidationResult = await session.primaryAgent.execute({
      context: {
        ...session.context,
        taskResults: taskResults.map((tr) => ({
          agent: tr.agent.id,
          output: tr.result.output,
          task: tr.task,
        })),
        trace,
      },
      input: session.query,
      task: 'consolidate',
    });

    trace.push({
      action: 'consolidate',
      agent: session.primaryAgent.id,
      output: consolidationResult.output,
      reasoning: consolidationResult.reasoning || 'Consolidating results',
    });

    // Return the final result
    return {
      result: consolidationResult.output,
      supportingAgentIds: session.supportingAgents.map((a) => a.id),
      trace,
    };
  }

  private async executePEERFramework(session: OrchestrationSession): Promise<OrchestrationResult> {
    // PEER = Plan, Execute, Evaluate, Reflect
    const trace: ReasoningStep[] = [];

    // Step 1: Plan - Break down the query into a plan of action
    const planResult = await session.primaryAgent.execute({
      context: session.context,
      input: session.query,
      task: 'plan',
    });

    trace.push({
      action: 'plan',
      agent: session.primaryAgent.id,
      output: planResult.output,
      reasoning: planResult.reasoning || 'Planning approach to the query',
    });

    // Step 2: Execute - Carry out the plan using appropriate agents
    // For simplicity, we'll just use the primary agent here
    const executeResult = await session.primaryAgent.execute({
      context: {
        ...session.context,
        plan: planResult.output,
      },
      input: planResult.output,
      task: 'execute',
    });

    trace.push({
      action: 'execute',
      agent: session.primaryAgent.id,
      output: executeResult.output,
      reasoning: executeResult.reasoning || 'Executing the plan',
    });

    // Step 3: Evaluate - Assess the execution results
    const evaluateResult = await session.primaryAgent.execute({
      context: {
        ...session.context,
        execution: executeResult.output,
        plan: planResult.output,
      },
      input: executeResult.output,
      task: 'evaluate',
    });

    trace.push({
      action: 'evaluate',
      agent: session.primaryAgent.id,
      output: evaluateResult.output,
      reasoning: evaluateResult.reasoning || 'Evaluating the execution results',
    });

    // Step 4: Reflect - Draw conclusions and generate final response
    const reflectResult = await session.primaryAgent.execute({
      context: {
        ...session.context,
        evaluation: evaluateResult.output,
        execution: executeResult.output,
        plan: planResult.output,
      },
      input: `${session.query}\n\nExecution results: ${executeResult.output}\n\nEvaluation: ${evaluateResult.output}`,
      task: 'reflect',
    });

    trace.push({
      action: 'reflect',
      agent: session.primaryAgent.id,
      output: reflectResult.output,
      reasoning: reflectResult.reasoning || 'Reflecting on results and generating response',
    });

    // Return the final result
    return {
      result: reflectResult.output,
      supportingAgentIds: session.supportingAgents.map((a) => a.id),
      trace,
    };
  }

  private async executeStandardFramework(
    session: OrchestrationSession,
  ): Promise<OrchestrationResult> {
    // Simple framework: just use the primary agent
    const trace: ReasoningStep[] = [];

    const result = await session.primaryAgent.execute({
      context: session.context,
      input: session.query,
      task: 'process',
    });

    trace.push({
      action: 'process',
      agent: session.primaryAgent.id,
      output: result.output,
      reasoning: result.reasoning || 'Processing query',
    });

    return {
      result: result.output,
      supportingAgentIds: session.supportingAgents.map((a) => a.id),
      trace,
    };
  }

  private assignTaskToAgent(task: any, agents: Agent[]): Agent {
    // Logic to match task to the most suitable agent
    // Simple implementation: find agent with matching specialization
    switch (task.type) {
      case 'retrieve_data': {
        const dataAgent = agents.find((agent) => agent.specialization === 'data-retrieval');
        if (dataAgent) return dataAgent;

        break;
      }
      case 'analyze': {
        const analysisAgent = agents.find((agent) => agent.specialization === 'financial-analysis');
        if (analysisAgent) return analysisAgent;

        break;
      }
      case 'search': {
        const searchAgent = agents.find((agent) => agent.specialization === 'search');
        if (searchAgent) return searchAgent;

        break;
      }
      // No default
    }

    // Fallback to primary agent
    return agents[0];
  }
}
