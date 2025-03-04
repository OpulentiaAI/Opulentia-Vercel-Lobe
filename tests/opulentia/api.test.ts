/**
 * Integration tests for OPULENTIA API
 */
import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { POST } from '../../src/app/api/opulentia/route';

// Helper function to create a NextRequest with a JSON body
function createRequest(body: any): NextRequest {
  return new NextRequest('http://localhost:3000/api/opulentia', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

describe('OPULENTIA API', () => {
  it('should return a valid response for a simple query', async () => {
    const req = createRequest({
      query: 'What is the stock market outlook for tech companies?',
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('answer');
    expect(data).toHaveProperty('trace');
    expect(data).toHaveProperty('supportingAgentIds');

    // The answer should be a non-empty string
    expect(typeof data.answer).toBe('string');
    expect(data.answer.length).toBeGreaterThan(0);

    // There should be at least one trace step
    expect(Array.isArray(data.trace)).toBe(true);
    expect(data.trace.length).toBeGreaterThan(0);
  });

  it('should support specifying a primary agent', async () => {
    const req = createRequest({
      query: 'What are the key financial metrics for evaluating a tech company?',
      primaryAgentId: 'financial-analysis-agent',
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('answer');
    // The answer should relate to financial metrics
    expect(data.answer.toLowerCase()).toMatch(
      /metric|ratio|financ|valuation|earning|revenue|profit/,
    );
  });

  it('should support multiple agents and reasoning framework', async () => {
    const req = createRequest({
      query: 'Analyze AAPL stock performance over the last year',
      primaryAgentId: 'financial-analysis-agent',
      supportingAgentIds: ['data-retrieval-agent', 'search-agent'],
      reasoningFramework: 'STORM',
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('answer');
    expect(data).toHaveProperty('trace');
    expect(data).toHaveProperty('supportingAgentIds');

    // Since we specified supporting agents, they should be included
    expect(data.supportingAgentIds).toEqual(['data-retrieval-agent', 'search-agent']);

    // The trace should have multiple steps for STORM framework
    expect(data.trace.length).toBeGreaterThan(2);
  });

  it('should return error for missing query', async () => {
    const req = createRequest({
      // Missing 'query' field
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data).toHaveProperty('error');
    expect(data.error).toContain('required');
  });

  it('should handle error when primary agent is not found', async () => {
    const req = createRequest({
      query: 'Test query',
      primaryAgentId: 'non-existent-agent', // This agent doesn't exist
    });

    const response = await POST(req);
    expect(response.status).toBe(500);

    const data = await response.json();
    expect(data).toHaveProperty('error');
    expect(data.error).toContain('not found');
  });
});
