/**
 * Financial Analysis Agent for OPULENTIA
 * This agent specializes in analyzing financial data and providing insights
 */
import { FinancialDataService } from '@/lib/finance';
import { ModelProviderManager } from '@/lib/modelProviders';
import { Agent, AgentExecuteParams, AgentExecuteResult } from '@/types/agents';

export class FinancialAnalysisAgent implements Agent {
  id: string;
  name: string;
  description: string;
  specialization: string;
  abilities: string[];
  systemPrompt?: string;
  createTime: number;

  private modelManager: ModelProviderManager;
  private dataService: FinancialDataService;

  constructor() {
    this.id = 'financial-analysis-agent';
    this.name = 'Financial Analysis Agent';
    this.description = 'Specializes in analyzing financial data and providing insights';
    this.specialization = 'financial-analysis';
    this.abilities = ['data-interpretation', 'trend-analysis', 'financial-forecasting'];
    this.systemPrompt =
      'You are a financial analysis expert. Analyze financial data and provide insights. Be precise and use proper financial terminology.';
    this.createTime = Date.now();

    // Initialize dependencies
    this.modelManager = new ModelProviderManager();
    this.dataService = new FinancialDataService();
  }

  async execute(params: AgentExecuteParams): Promise<AgentExecuteResult> {
    const { task, input, context } = params;

    console.log(`FinancialAnalysisAgent executing: ${task}`);

    try {
      // Different tasks require different handling
      switch (task) {
        case 'structure': {
          return await this.structureProblem(input);
        }
        case 'define_tasks': {
          return await this.defineTasks(input);
        }
        case 'analyze': {
          return await this.analyzeFinancialData(input);
        }
        case 'consolidate': {
          return await this.consolidateResults(input, context);
        }
        case 'process': {
          return await this.processQuery(input);
        }
        default: {
          return {
            output: `I don't know how to perform the task: ${task}`,
            reasoning: `Task ${task} is not supported by the FinancialAnalysisAgent`,
          };
        }
      }
    } catch (error: any) {
      console.error(`Error executing FinancialAnalysisAgent:`, error);
      return {
        output: `An error occurred while analyzing financial data: ${error.message}`,
        reasoning: `Error in FinancialAnalysisAgent.execute: ${error.stack}`,
      };
    }
  }

  // STORM Framework Methods

  private async structureProblem(input: string): Promise<AgentExecuteResult> {
    // Use the model to structure the problem
    const prompt = `
      As a financial analyst, I need to structure the following query:
      
      "${input}"
      
      Analyze what this query is asking for in terms of:
      1. The main financial topic or concept
      2. The specific entities involved (companies, markets, etc.)
      3. The time frame (if specified)
      4. The type of analysis needed (comparative, trend, valuation, etc.)
      
      Structure this problem clearly.
    `;

    const response = await this.modelManager.complete({
      options: {
        temperature: 0.3, // Lower temperature for more deterministic response
      },
      prompt,
    });

    return {
      output: response.content,
      reasoning: `Structured the problem by identifying key financial aspects in the query`,
    };
  }

  private async defineTasks(input: string): Promise<AgentExecuteResult> {
    // Use the model to define tasks based on the structured problem
    const prompt = `
      Based on this structured problem:
      
      "${input}"
      
      Break down the financial analysis into specific tasks that need to be performed.
      For each task, specify:
      1. The task type (e.g., retrieve_data, analyze, search, etc.)
      2. A clear description of what this task should accomplish
      
      Output the tasks in a clear, structured format.
    `;

    const response = await this.modelManager.complete({
      options: {
        temperature: 0.3,
      },
      prompt,
    });

    return {
      output: response.content,
      reasoning: `Defined specific tasks based on the structured problem`,
    };
  }

  private async analyzeFinancialData(input: string): Promise<AgentExecuteResult> {
    // Extract ticker from input if present
    const tickerMatch = input.match(/[A-Z]{1,5}/);
    const ticker = tickerMatch ? tickerMatch[0] : null;

    let analysisInput = input;
    let dataContext = '';

    // Fetch financial data if we have a ticker
    if (ticker) {
      // Get time series data (stock price)
      const timeSeriesData = await this.dataService.fetchTimeSeries(ticker, {});
      if (!('type' in timeSeriesData)) {
        // Check if it's not an error
        dataContext += `Recent price data for ${ticker}:\n`;
        dataContext += JSON.stringify(timeSeriesData.slice(0, 5), null, 2) + '\n\n';
      }

      // Get financial statements
      const financials = await this.dataService.fetchFinancialStatements(ticker);
      if (!('type' in financials)) {
        // Check if it's not an error
        dataContext += `Financial statements for ${ticker}:\n`;
        dataContext += `Income Statement: ${JSON.stringify(financials.incomeStatement[0], null, 2)}\n\n`;
        dataContext += `Balance Sheet: ${JSON.stringify(financials.balanceSheet[0], null, 2)}\n\n`;
      }

      analysisInput = `${input}\n\nFinancial Data:\n${dataContext}`;
    }

    // Use the model to analyze the data
    const prompt = `
      As a financial analyst, analyze the following data and provide insights:
      
      ${analysisInput}
      
      Provide a clear and insightful analysis. Include:
      1. Key observations
      2. Notable trends
      3. Potential implications
      4. Any relevant risk factors
    `;

    const response = await this.modelManager.complete({
      options: {
        temperature: 0.5,
      },
      prompt,
    });

    return {
      output: response.content,
      reasoning: `Analyzed financial data ${ticker ? `for ${ticker}` : ''} and provided insights`,
    };
  }

  private async consolidateResults(input: string, context: any): Promise<AgentExecuteResult> {
    // Extract previous task results from context
    const taskResults = context.taskResults || [];
    const taskOutputs = taskResults.map((tr: any) => tr.output).join('\n\n');

    // Use the model to consolidate the results
    const prompt = `
      As a financial analyst, consolidate the following analysis results into a comprehensive response.
      
      Original query: "${input}"
      
      Analysis results:
      ${taskOutputs}
      
      Provide a clear, concise, and comprehensive response that addresses the original query.
      Make sure the response is well-structured and uses appropriate financial terminology.
    `;

    const response = await this.modelManager.complete({
      options: {
        temperature: 0.5,
      },
      prompt,
    });

    return {
      output: response.content,
      reasoning: `Consolidated multiple analysis results into a comprehensive response`,
    };
  }

  // Standard Framework Methods

  private async processQuery(input: string): Promise<AgentExecuteResult> {
    // This is a simpler approach for direct processing

    // Extract ticker from input if present
    const tickerMatch = input.match(/[A-Z]{1,5}/);
    const ticker = tickerMatch ? tickerMatch[0] : null;

    let analysisInput = input;
    let dataContext = '';

    // Fetch financial data if we have a ticker
    if (ticker) {
      // Get time series data (stock price)
      const timeSeriesData = await this.dataService.fetchTimeSeries(ticker, {});
      if (!('type' in timeSeriesData)) {
        // Check if it's not an error
        dataContext += `Recent price data for ${ticker}:\n`;
        dataContext += JSON.stringify(timeSeriesData.slice(0, 5), null, 2) + '\n\n';
      }

      // Get financial statements
      const financials = await this.dataService.fetchFinancialStatements(ticker);
      if (!('type' in financials)) {
        // Check if it's not an error
        dataContext += `Financial statements for ${ticker}:\n`;
        dataContext += `Income Statement: ${JSON.stringify(financials.incomeStatement[0], null, 2)}\n\n`;
        dataContext += `Balance Sheet: ${JSON.stringify(financials.balanceSheet[0], null, 2)}\n\n`;
      }

      analysisInput = `${input}\n\nFinancial Data:\n${dataContext}`;
    }

    // Use the model to process the query directly
    const prompt = `
      As a financial analyst, respond to the following query with a clear and comprehensive analysis:
      
      ${analysisInput}
      
      Provide a detailed response that addresses all aspects of the query. If financial data is provided,
      analyze it thoroughly and provide insights. Use proper financial terminology and structure your response well.
    `;

    const response = await this.modelManager.complete({
      options: {
        temperature: 0.5,
      },
      prompt,
    });

    return {
      output: response.content,
      reasoning: `Processed the financial query directly and provided a comprehensive response`,
    };
  }
}
