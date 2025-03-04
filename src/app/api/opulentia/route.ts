/**
 * API route for OPULENTIA financial AI assistant
 */
import { NextRequest, NextResponse } from 'next/server';

import { AgentOrchestrator, ReasoningFramework } from '../../../orchestration/AgentOrchestrator';

// Initialize the orchestrator
const orchestrator = new AgentOrchestrator();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { query, primaryAgentId, supportingAgentIds, reasoningFramework, context } = body;

    // Validate request
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Use financial analysis agent as default if not specified
    const primaryAgentToUse = primaryAgentId || 'financial-analysis-agent';

    // Execute the orchestration
    const result = await orchestrator.execute({
      context: context || {},
      primaryAgentId: primaryAgentToUse,
      query,
      reasoningFramework: reasoningFramework || ReasoningFramework.STORM,
      supportingAgentIds: supportingAgentIds || [],
    });

    // Return the orchestration result
    return NextResponse.json({
      answer: result.result,
      supportingAgentIds: result.supportingAgentIds,
      trace: result.trace,
    });
  } catch (error: any) {
    console.error('Error in OPULENTIA API:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 },
    );
  }
}
