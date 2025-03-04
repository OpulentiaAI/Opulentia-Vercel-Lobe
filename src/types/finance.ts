/**
 * Financial data types for the OPULENTIA platform
 */

export interface TimeSeriesOptions {
  endDate?: string;
  limit?: number;
  period?: string;
  startDate?: string;
}

export interface TimeSeriesDataPoint {
  close?: number;
  date: string;
  high?: number;
  low?: number;
  open?: number;
  value: number;
  volume?: number;
}

export interface CompanyFinancials {
  balanceSheet: any[];
  cashFlowStatement: any[];
  incomeStatement: any[];
  latestQuarter: string | null;
  period: 'annual' | 'quarterly' | 'ttm';
  ticker: string;
}

export interface MarketData {
  data: any[];
  metadata: {
    dataType: string;
    index?: string;
    period: string;
    sector?: string;
    timestamp: string;
  };
}

export enum FinancialDataType {
  BALANCE_SHEET = 'balance_sheet',
  CASH_FLOW = 'cash_flow',
  DIVIDENDS = 'dividends',
  EARNINGS = 'earnings',
  INCOME_STATEMENT = 'income_statement',
  INSIDER_TRADES = 'insider_trades',
  INSTITUTIONAL_OWNERSHIP = 'institutional_ownership',
  METRICS = 'metrics',
  NEWS = 'news',
  PRICE = 'price',
  RATIOS = 'ratios',
}

export interface FinancialDataSource {
  baseURL: string;
  description: string;
  id: string;
  name: string;
  supportedDataTypes: FinancialDataType[];
}

export interface FinancialAnalysisResult {
  analysisDate: string;
  metrics: Record<string, any>;
  predictions?: Record<string, any>;
  summary: string;
  ticker: string;
  trends: Record<string, any>;
}
