/**
 * Tests for OPULENTIA Agent Orchestration
 */
import { beforeEach, describe, expect, it } from 'vitest';

import { AgentOrchestrator, ReasoningFramework } from '../../src/orchestration/AgentOrchestrator';

describe('OPULENTIA Agent Orchestration', () => {
  let orchestrator: AgentOrchestrator;

  beforeEach(() => {
    // Initialize a fresh orchestrator for each test
    orchestrator = new AgentOrchestrator();
  });

  it('should initialize the orchestrator with default agents', async () => {
    // Verify that the orchestrator was created successfully
    expect(orchestrator).toBeDefined();
  });

  it('should execute a simple query with the Standard framework', async () => {
    const result = await orchestrator.execute({
      query: 'What is the current stock market outlook?',
      primaryAgentId: 'financial-analysis-agent',
      reasoningFramework: ReasoningFramework.Standard,
    });

    // Verify that the result has the expected structure
    expect(result).toHaveProperty('result');
    expect(result).toHaveProperty('trace');
    expect(result).toHaveProperty('supportingAgentIds');

    // Verify that the trace contains at least one step
    expect(result.trace.length).toBeGreaterThan(0);
    expect(result.trace[0]).toHaveProperty('agent');
    expect(result.trace[0]).toHaveProperty('action');
    expect(result.trace[0]).toHaveProperty('reasoning');
  });

  it('should execute with the STORM framework and multiple agents', async () => {
    const result = await orchestrator.execute({
      query: 'Analyze AAPL stock performance over the last year',
      primaryAgentId: 'financial-analysis-agent',
      supportingAgentIds: ['data-retrieval-agent', 'search-agent'],
      reasoningFramework: ReasoningFramework.STORM,
    });

    // Verify that the result has the expected structure
    expect(result).toHaveProperty('result');
    expect(result).toHaveProperty('trace');
    expect(result).toHaveProperty('supportingAgentIds');

    // With STORM, we should have multiple steps in the trace
    expect(result.trace.length).toBeGreaterThan(2);

    // The first step should be 'structure'
    expect(result.trace[0].action).toBe('structure');

    // There should be a 'consolidate' step at the end
    const lastStep = result.trace[result.trace.length - 1];
    expect(lastStep.action).toBe('consolidate');
  });

  it('should execute with the PEER framework', async () => {
    const result = await orchestrator.execute({
      query: 'What are the key financial metrics for evaluating a company?',
      primaryAgentId: 'financial-analysis-agent',
      reasoningFramework: ReasoningFramework.PEER,
    });

    // Verify that the result has the expected structure
    expect(result).toHaveProperty('result');
    expect(result).toHaveProperty('trace');
    expect(result).toHaveProperty('supportingAgentIds');

    // With PEER, we should have 4 steps in the trace (plan, execute, evaluate, reflect)
    expect(result.trace.length).toBe(4);
    expect(result.trace[0].action).toBe('plan');
    expect(result.trace[1].action).toBe('execute');
    expect(result.trace[2].action).toBe('evaluate');
    expect(result.trace[3].action).toBe('reflect');
  });

  it('should handle errors gracefully when an agent is not found', async () => {
    try {
      await orchestrator.execute({
        query: 'Test query',
        primaryAgentId: 'non-existent-agent', // This agent doesn't exist
      });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.message).toContain('not found');
    }
  });
});
