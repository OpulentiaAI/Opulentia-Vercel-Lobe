/**
 * OPULENTIA financial theme
 */

export const opulentiaDarkTheme = {
  // Border radius
  borderRadius: {
    circle: '50%',
    lg: '12px',
    md: '8px',
    sm: '4px',
  },

  colors: {
    // Base colors
    background: '#121212',
    border: '#2A2A2A',
    chartAxis: '#A0A0A0',
    chartGrid: '#2A2A2A',
    chartTooltip: '#1E1E1E',
    chatInput: '#1E1E1E',
    error: '#FF6B6B',
    focusRing: '0 0 0 2px rgba(10,186,181,0.5)',
    messageHover: 'rgba(10,186,181,0.05)',
    negative: '#FF6B6B',
    neutral: '#A0A0A0',
    overlay: 'rgba(0,0,0,0.6)',
    positive: '#3FB980',
    primary: '#0ABAB5',
    primaryActive: '#2F91AE',
    primaryHover: '#15DDD8',
    selectedItem: '#0ABAB5',
    success: '#3FB980',
    surface: '#1E1E1E',
    textPrimary: '#ECECEC',
    textSecondary: '#A0A0A0',
    warning: '#F9D53E',
  },

  name: 'opulentia-dark',

  // Shadows
  shadows: {
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },

  // Spacing values
  spacing: {
    lg: '24px',
    md: '16px',
    sm: '8px',
    xl: '32px',
    xs: '4px',
    xxl: '48px',
  },

  // Transitions
  transitions: {
    default: '0.2s ease',
    fast: '0.1s ease',
    slow: '0.3s ease',
  },

  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSize: {
      base: '14px',
      h1: '24px',
      h2: '20px',
      h3: '18px',
      small: '12px',
    },
    fontWeight: {
      medium: 500,
      normal: 400,
      semibold: 600,
    },
  },

  // Z-index values
  zIndex: {
    base: 1,
    dropdown: 100,
    modal: 200,
    tooltip: 300,
  },
};

export const opulentiaLightTheme = {
  // Border radius - same across themes
  borderRadius: {
    circle: '50%',
    lg: '12px',
    md: '8px',
    sm: '4px',
  },

  colors: {
    // Base colors
    background: '#F5F5F5',
    border: '#E0E0E0',
    chartAxis: '#9E9E9E',
    chartGrid: '#E0E0E0',
    chartTooltip: '#FFFFFF',
    chatInput: '#FFFFFF',
    error: '#D32F2F',
    focusRing: '0 0 0 2px rgba(10,186,181,0.5)',
    messageHover: 'rgba(10,186,181,0.05)',
    negative: '#D32F2F',
    neutral: '#757575',
    overlay: 'rgba(0,0,0,0.4)',
    positive: '#2E7D52',
    primary: '#0ABAB5',
    primaryActive: '#067F7A',
    primaryHover: '#08A09B',
    selectedItem: '#0ABAB5',
    success: '#2E7D52',
    surface: '#FFFFFF',
    textPrimary: '#212121',
    textSecondary: '#757575',
    warning: '#F5A623',
  },

  name: 'opulentia-light',

  // Shadows - slightly different for light theme
  shadows: {
    lg: '0 10px 20px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
  },

  // Spacing values - same across themes
  spacing: {
    lg: '24px',
    md: '16px',
    sm: '8px',
    xl: '32px',
    xs: '4px',
    xxl: '48px',
  },

  // Transitions - same across themes
  transitions: {
    default: '0.2s ease',
    fast: '0.1s ease',
    slow: '0.3s ease',
  },

  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSize: {
      base: '14px',
      h1: '24px',
      h2: '20px',
      h3: '18px',
      small: '12px',
    },
    fontWeight: {
      medium: 500,
      normal: 400,
      semibold: 600,
    },
  },

  // Z-index values - same across themes
  zIndex: {
    base: 1,
    dropdown: 100,
    modal: 200,
    tooltip: 300,
  },
};

// Export the default theme
export default opulentiaDarkTheme;
