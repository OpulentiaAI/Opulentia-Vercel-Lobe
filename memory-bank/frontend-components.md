# OPULENTIA Frontend Components

This document outlines the frontend components that will be needed for the OPULENTIA financial AI assistant. These components will be built on top of the existing LobeChat UI structure, with customizations specific to financial data visualization and interaction.

## Financial Data Visualization Components

1. **FinancialTimeSeriesChart**

   - Interactive price chart for stocks and indices
   - Support for different time periods (1D, 1W, 1M, 3M, 6M, 1Y, YTD, All)
   - Options for display types (line, candle, OHLC)
   - Technical indicators (optional)
   - Comparison with benchmarks
   - Date range selection

2. **FinancialMetricsTable**

   - Tabular display of financial metrics
   - Sortable columns
   - Highlighting for important values
   - Period-over-period comparison
   - Conditional formatting (green for positive, red for negative)

3. **FinancialStatementViewer**

   - Income statement display
   - Balance sheet display
   - Cash flow statement display
   - Ratio analysis
   - Drill-down capabilities for detailed exploration

4. **FinancialDataDashboard**
   - Summary view of key financial metrics
   - Mini-charts for quick visualization
   - Key performance indicators
   - Risk metrics
   - Alert indicators

## Agent Interaction Components

1. **AgentThoughtProcess**

   - Visual representation of agent reasoning steps
   - Collapsible sections for detailed inspection
   - Timeline of agent interactions
   - Visualization of decision trees or reasoning paths

2. **ContextualSuggestions**

   - Suggested follow-up questions based on current context
   - Quick action buttons for common financial queries
   - Ticker suggestion chips
   - Time period selection options

3. **MultiAgentCollaboration**
   - Visual representation of multiple agents working together
   - Agent-specific contribution highlighting
   - Detailed view of sub-tasks and their assignments
   - Progress indicators for complex queries

## UI Enhancements

1. **FinancialTheme**

   - Dark mode with financial terminal-like appearance
   - Color scheme optimized for financial data (green/red for up/down)
   - Typography suitable for financial information display
   - Iconography specific to financial concepts

2. **SearchResultCard**

   - Display search results from knowledge base
   - Source attribution
   - Relevance score visualization
   - Quote extraction with highlighting
   - Link to source documents

3. **FinancialEntityChip**

   - Compact display of financial entities (companies, indices)
   - Ticker symbol with icon
   - Quick price display
   - Change percentage indicator
   - Click for more details

4. **NotificationBanner**
   - Market alerts or important notifications
   - Breaking financial news
   - Data freshness indicators
   - Status messages for long-running operations

## Integration Points with LobeChat

1. **Message Extensions**

   - Extend LobeChat's message component to handle financial visualizations
   - Add support for interactive financial charts within message bubbles
   - Implement special message types for financial analyses

2. **Tool Integration**

   - Add financial-specific tools to LobeChat's tool palette
   - Implement tool calling for retrieving financial data
   - Create specialized renderers for financial tool outputs

3. **UI Theme Overrides**
   - Define OPULENTIA-specific theme overrides for LobeChat
   - Implement a theme switch for toggling between standard and financial modes
   - Ensure consistent styling across the application

## Implementation Priority

1. **First Phase**

   - FinancialTimeSeriesChart (essential for price visualization)
   - FinancialEntityChip (for easy entity recognition)
   - FinancialTheme (establishes visual identity)
   - AgentThoughtProcess (shows transparency in reasoning)

2. **Second Phase**

   - FinancialMetricsTable (for detailed financial data)
   - ContextualSuggestions (improves user experience)
   - SearchResultCard (enhances knowledge retrieval)
   - Message Extensions (enables rich visualization in conversations)

3. **Third Phase**
   - FinancialStatementViewer (deeper financial analysis)
   - FinancialDataDashboard (summarized view)
   - MultiAgentCollaboration (visualization of complex reasoning)
   - NotificationBanner (keeps users informed of important events)

## Design Guidelines

- Use consistent color coding (green for positive, red for negative)
- Provide appropriate context for all financial numbers (currency symbols, units, time periods)
- Ensure that charts and visualizations are accessible and include alternative text
- Use tooltips to explain financial terminology
- Implement responsive designs that work well on both desktop and mobile
- Maintain a clean, professional appearance suitable for financial analysis
