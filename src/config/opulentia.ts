/**
 * Configuration for the OPULENTIA platform
 */

export const opulentiaConfig = {
  // Agent configuration
  agents: {
    defaultPrimaryAgent: 'financial-analysis-agent',
    defaultReasoningFramework: 'STORM',
  },

  // API Keys
  apiKeys: {
    anthropic: process.env.ANTHROPIC_API_KEY,
    financialDatasets: process.env.FIN_DATASETS_API_KEY,
    jina: process.env.JINA_API_KEY,
    openai: process.env.OPENAI_API_KEY,
    xai: process.env.XAI_API_KEY,
  },

  // Financial data configuration
  financialData: {
    baseURL: 'https://api.financialdatasets.ai',
    defaultCacheTTL: 60, // 60 seconds for price data
    financialStatementsCacheTTL: 3600, // 1 hour for financial statements
    marketDataCacheTTL: 300, // 5 minutes for market data
  },

  // Model configuration
  models: {
    anthropic: {
      model: 'claude-3-opus',
    },
    defaultProvider: process.env.DEFAULT_PROVIDER || 'openai',
    openai: {
      baseURL: process.env.OPENAI_API_URL,
      model: 'gpt-4',
    },
    temperature: 0.7,
    xai: {
      model: 'grok-1',
    },
  },

  // Search configuration
  search: {
    confidenceThreshold: 0.7,
    jinaCollection: process.env.JINA_COLLECTION || 'financial-knowledge',
    jinaEndpoint: process.env.JINA_ENDPOINT || 'https://api.jina.ai/v1',
    maxHops: 3,
  },

  // Version information
  version: process.env.OPULENTIA_VERSION || '1.0.0',
};

export default opulentiaConfig;
