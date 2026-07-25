export const designTokens = {
  brand: {
    primary: '#2563EB',
    secondary: '#1D4ED8',
    background: '#F8FAFC',
    card: '#FFFFFF',
  },
  radius: {
    card: 16,
    control: 14,
    pill: 9999,
  },
  shadows: {
    soft: '0 8px 24px rgba(15, 23, 42, 0.08)',
    card: '0 18px 40px rgba(37, 99, 235, 0.10)',
    lift: '0 24px 60px rgba(15, 23, 42, 0.12)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },
  typography: {
    display: {
      fontFamily: 'Manrope, Inter, ui-sans-serif, system-ui, sans-serif',
      letterSpacing: '-0.04em',
      fontWeight: 700,
    },
    heading: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      letterSpacing: '-0.02em',
      fontWeight: 600,
    },
    body: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      letterSpacing: '0',
      fontWeight: 400,
    },
    mono: {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      letterSpacing: '0',
      fontWeight: 500,
    },
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  status: {
    success: '#16A34A',
    warning: '#F59E0B',
    danger: '#DC2626',
    info: '#0EA5E9',
    neutral: '#64748B',
  },
  chartPalette: ['#2563EB', '#1D4ED8', '#0EA5E9', '#22C55E', '#F59E0B', '#DC2626'],
} as const;

export type DesignTokens = typeof designTokens;