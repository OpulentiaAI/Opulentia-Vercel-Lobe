/**
 * Financial data service for the OPULENTIA platform
 * Connects to FinancialDatasets.ai API to retrieve financial information
 */

import { TimeSeriesOptions, CompanyFinancials, MarketData, FinancialDataType } from '@/types/finance';

// Error types for structured error handling
export enum ErrorType {
  NetworkError = 'network_error',
  APIRateLimit = 'api_rate_limit',
  FinancialDataError = 'financial_data_error',
  ValidationError = 'validation_error',
  AuthenticationError = 'authentication_error',
}

export interface StructuredError {
  type: ErrorType;
  message: string;
  code: string;
  retry?: boolean;
  fallbackAvailable?: boolean;
  details?: any;
}

export class FinancialDataService {
  private apiKey: string;
  private baseUrl: string;
  private cacheTTL: number; // Cache time-to-live in seconds
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  
  constructor() {
    this.apiKey = process.env.FIN_DATASETS_API_KEY || '';
    this.baseUrl = 'https://api.financialdatasets.ai';
    this.cacheTTL = 60; // Default 60 seconds cache for price data
  }
  
  /**
   * Fetch time series data for a stock
   */
  async fetchTimeSeries(
    ticker: string,
    options: TimeSeriesOptions
  ): Promise<any[] | StructuredError> {
    const cacheKey = `timeseries:${ticker}:${JSON.stringify(options)}`;
    
    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;
    
    try {
      // In a real implementation, we would make an actual API call
      // For now, mock the data with realistic values
      console.log(`Fetching time series data for ${ticker}`, options);
      
      // Generate mock data
      const data = this.generateMockTimeSeriesData(ticker, options);
      
      // Store in cache
      this.addToCache(cacheKey, data);
      
      return data;
    } catch (error: any) {
      console.error(`Error fetching time series data for ${ticker}:`, error);
      
      // Return a structured error
      return {
        type: ErrorType.FinancialDataError,
        message: error.message || 'Unknown error fetching financial data',
        code: 'unknown_error',
        retry: false
      };
    }
  }
  
  /**
   * Fetch company financial statements
   */
  async fetchFinancialStatements(
    ticker: string,
    period: 'annual' | 'quarterly' | 'ttm' = 'annual'
  ): Promise<CompanyFinancials | StructuredError> {
    const cacheKey = `financials:${ticker}:${period}`;
    
    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;
    
    try {
      console.log(`Fetching financial statements for ${ticker}`, { period });
      
      // Generate mock financial statements
      const financials: CompanyFinancials = {
        ticker,
        incomeStatement: this.generateMockIncomeStatement(ticker, period),
        balanceSheet: this.generateMockBalanceSheet(ticker, period),
        cashFlowStatement: this.generateMockCashFlowStatement(ticker, period),
        period,
        latestQuarter: '2023-Q4'
      };
      
      // Store in cache (longer TTL for financial statements)
      this.addToCache(cacheKey, financials, 3600); // 1 hour cache
      
      return financials;
    } catch (error: any) {
      console.error(`Error fetching financial statements for ${ticker}:`, error);
      
      return {
        type: ErrorType.FinancialDataError,
        message: error.message || 'Unknown error fetching financial statements',
        code: 'unknown_error',
        retry: false
      };
    }
  }
  
  /**
   * Fetch market data (indices, sectors, etc.)
   */
  async fetchMarketData(options: {
    index?: string;
    sector?: string;
    dataType: string;
    period: string;
  }): Promise<MarketData | StructuredError> {
    const cacheKey = `market:${JSON.stringify(options)}`;
    
    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;
    
    try {
      console.log('Fetching market data', options);
      
      // Generate mock market data
      const marketData: MarketData = {
        data: this.generateMockMarketData(options),
        metadata: {
          dataType: options.dataType,
          period: options.period,
          index: options.index,
          sector: options.sector,
          timestamp: new Date().toISOString()
        }
      };
      
      // Store in cache
      this.addToCache(cacheKey, marketData, 300); // 5 minutes cache
      
      return marketData;
    } catch (error: any) {
      console.error('Error fetching market data:', error);
      
      return {
        type: ErrorType.FinancialDataError,
        message: error.message || 'Unknown error fetching market data',
        code: 'unknown_error',
        retry: false
      };
    }
  }
  
  // Cache management methods
  private getFromCache(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check if the entry is still valid
    const now = Date.now();
    if (now - entry.timestamp > this.cacheTTL * 1000) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  private addToCache(key: string, data: any, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    // Schedule cache entry deletion after TTL
    if (ttl) {
      setTimeout(() => {
        this.cache.delete(key);
      }, ttl * 1000);
    }
  }
  
  // Helper methods for formatting currency values
  private formatCurrency(value: number): string {
    if (Math.abs(value) >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (Math.abs(value) >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else if (Math.abs(value) >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  }
  
  // Mock data generators
  private generateMockTimeSeriesData(ticker: string, options: TimeSeriesOptions): any[] {
    const data = [];
    const endDate = options.endDate ? new Date(options.endDate) : new Date();
    const startDate = options.startDate 
      ? new Date(options.startDate) 
      : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // Default 30 days
    
    let currentDate = new Date(startDate);
    let basePrice = ticker === 'AAPL' ? 180 : ticker === 'MSFT' ? 400 : 100;
    
    while (currentDate <= endDate) {
      // Skip weekends
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        continue;
      }
      
      // Add some random variation
      const randomFactor = 0.98 + Math.random() * 0.04; // 0.98 to 1.02
      basePrice = basePrice * randomFactor;
      
      const open = basePrice * (0.99 + Math.random() * 0.02);
      const high = basePrice * (1.01 + Math.random() * 0.02);
      const low = basePrice * (0.98 + Math.random() * 0.01);
      const close = basePrice;
      const volume = Math.floor(1000000 + Math.random() * 9000000);
      
      data.push({
        date: currentDate.toISOString().split('T')[0],
        open,
        high,
        low,
        close,
        volume
      });
      
      // Move to next day
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    
    return data;
  }
  
  private generateMockIncomeStatement(ticker: string, period: string): any[] {
    // Generate mock income statements for the last 4 periods
    const statements = [];
    const baseRevenue = ticker === 'AAPL' ? 100000000000 : ticker === 'MSFT' ? 50000000000 : 10000000000;
    
    for (let i = 0; i < 4; i++) {
      const year = 2024 - i;
      const quarter = period === 'quarterly' ? i % 4 + 1 : null;
      const periodLabel = period === 'quarterly' ? `Q${quarter}-${year}` : `FY${year}`;
      
      // Add some year-over-year growth
      const growthFactor = 1 + (0.05 + Math.random() * 0.1); // 5% to 15% growth
      const revenue = baseRevenue * Math.pow(growthFactor, i);
      const costOfRevenue = revenue * (0.35 + Math.random() * 0.1);
      const grossProfit = revenue - costOfRevenue;
      const operatingExpenses = grossProfit * (0.4 + Math.random() * 0.1);
      const operatingIncome = grossProfit - operatingExpenses;
      const netIncome = operatingIncome * (0.7 + Math.random() * 0.1);
      const eps = netIncome / (period === 'quarterly' ? 4 : 1) / 15000000000; // Approximate EPS
      
      statements.push({
        period: periodLabel,
        year,
        quarter,
        revenue: this.formatCurrency(revenue),
        costOfRevenue: this.formatCurrency(costOfRevenue),
        grossProfit: this.formatCurrency(grossProfit),
        operatingExpenses: this.formatCurrency(operatingExpenses),
        operatingIncome: this.formatCurrency(operatingIncome),
        netIncome: this.formatCurrency(netIncome),
        eps: eps.toFixed(2)
      });
    }
    
    return statements;
  }
  
  private generateMockBalanceSheet(ticker: string, period: string): any[] {
    // Generate mock balance sheets for the last 4 periods
    const statements = [];
    const baseAssets = ticker === 'AAPL' ? 350000000000 : ticker === 'MSFT' ? 300000000000 : 50000000000;
    
    for (let i = 0; i < 4; i++) {
      const year = 2024 - i;
      const quarter = period === 'quarterly' ? i % 4 + 1 : null;
      const periodLabel = period === 'quarterly' ? `Q${quarter}-${year}` : `FY${year}`;
      
      // Add some year-over-year growth
      const growthFactor = 1 + (0.02 + Math.random() * 0.08); // 2% to 10% growth
      const totalAssets = baseAssets * Math.pow(growthFactor, i);
      const cashAndEquivalents = totalAssets * (0.15 + Math.random() * 0.1);
      const shortTermInvestments = totalAssets * (0.1 + Math.random() * 0.05);
      const longTermInvestments = totalAssets * (0.2 + Math.random() * 0.1);
      const totalLiabilities = totalAssets * (0.4 + Math.random() * 0.1);
      const longTermDebt = totalLiabilities * (0.5 + Math.random() * 0.2);
      const shortTermDebt = totalLiabilities * (0.1 + Math.random() * 0.05);
      const totalEquity = totalAssets - totalLiabilities;
      
      statements.push({
        period: periodLabel,
        year,
        quarter,
        totalAssets: this.formatCurrency(totalAssets),
        cashAndEquivalents: this.formatCurrency(cashAndEquivalents),
        shortTermInvestments: this.formatCurrency(shortTermInvestments),
        longTermInvestments: this.formatCurrency(longTermInvestments),
        totalLiabilities: this.formatCurrency(totalLiabilities),
        shortTermDebt: this.formatCurrency(shortTermDebt),
        longTermDebt: this.formatCurrency(longTermDebt),
        totalEquity: this.formatCurrency(totalEquity)
      });
    }
    
    return statements;
  }
  
  private generateMockCashFlowStatement(ticker: string, period: string): any[] {
    // Generate mock cash flow statements for the last 4 periods
    const statements = [];
    const baseOperatingCashFlow = ticker === 'AAPL' ? 90000000000 : ticker === 'MSFT' ? 70000000000 : 8000000000;
    
    for (let i = 0; i < 4; i++) {
      const year = 2024 - i;
      const quarter = period === 'quarterly' ? i % 4 + 1 : null;
      const periodLabel = period === 'quarterly' ? `Q${quarter}-${year}` : `FY${year}`;
      
      // Add some year-over-year growth
      const growthFactor = 1 + (0.03 + Math.random() * 0.07); // 3% to 10% growth
      const operatingCashFlow = baseOperatingCashFlow * Math.pow(growthFactor, i);
      const capitalExpenditures = -operatingCashFlow * (0.1 + Math.random() * 0.05);
      const investingCashFlow = capitalExpenditures - operatingCashFlow * (0.1 + Math.random() * 0.1);
      const financingCashFlow = -operatingCashFlow * (0.2 + Math.random() * 0.1);
      const freeCashFlow = operatingCashFlow + capitalExpenditures;
      
      statements.push({
        period: periodLabel,
        year,
        quarter,
        operatingCashFlow: this.formatCurrency(operatingCashFlow),
        investingCashFlow: this.formatCurrency(investingCashFlow),
        financingCashFlow: this.formatCurrency(financingCashFlow),
        capitalExpenditures: this.formatCurrency(capitalExpenditures),
        freeCashFlow: this.formatCurrency(freeCashFlow)
      });
    }
    
    return statements;
  }
  
  private generateMockMarketData(options: any): any[] {
    // Generate mock market data based on options
    const data = [];
    
    if (options.dataType === 'index_performance') {
      // Generate mock index performance
      const indices = options.index 
        ? [options.index] 
        : ['S&P 500', 'NASDAQ', 'Dow Jones', 'Russell 2000'];
      
      for (const index of indices) {
        data.push({
          name: index,
          change: (Math.random() * 4 - 2).toFixed(2) + '%',
          ytd: (Math.random() * 20 - 5).toFixed(2) + '%',
          value: index === 'Dow Jones' 
            ? Math.floor(34000 + Math.random() * 2000)
            : index === 'S&P 500'
              ? Math.floor(4500 + Math.random() * 200)
              : index === 'NASDAQ'
                ? Math.floor(14000 + Math.random() * 1000)
                : Math.floor(2000 + Math.random() * 200)
        });
      }
    } else if (options.dataType === 'sector_performance') {
      // Generate mock sector performance
      const sectors = options.sector
        ? [options.sector]
        : ['Technology', 'Healthcare', 'Financials', 'Consumer Discretionary', 'Energy', 'Utilities'];
      
      for (const sector of sectors) {
        data.push({
          name: sector,
          change: (Math.random() * 4 - 2).toFixed(2) + '%',
          ytd: (Math.random() * 30 - 10).toFixed(2) + '%',
          momentum: Math.random() > 0.5 ? 'Positive' : 'Negative'
        });
      }
    }
    
    return data;
  }
}