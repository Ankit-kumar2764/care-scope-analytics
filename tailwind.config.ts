import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: 'rgb(var(--ds-background) / <alpha-value>)',
        foreground: 'rgb(var(--ds-foreground) / <alpha-value>)',
        card: 'rgb(var(--ds-card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--ds-card-foreground) / <alpha-value>)',
        primary: 'rgb(var(--ds-primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--ds-primary-foreground) / <alpha-value>)',
        secondary: 'rgb(var(--ds-secondary) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--ds-secondary-foreground) / <alpha-value>)',
        muted: 'rgb(var(--ds-muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--ds-muted-foreground) / <alpha-value>)',
        accent: 'rgb(var(--ds-accent) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--ds-accent-foreground) / <alpha-value>)',
        border: 'rgb(var(--ds-border) / <alpha-value>)',
        input: 'rgb(var(--ds-input) / <alpha-value>)',
        ring: 'rgb(var(--ds-ring) / <alpha-value>)',
        success: 'rgb(var(--ds-success) / <alpha-value>)',
        'success-foreground': 'rgb(var(--ds-success-foreground) / <alpha-value>)',
        warning: 'rgb(var(--ds-warning) / <alpha-value>)',
        'warning-foreground': 'rgb(var(--ds-warning-foreground) / <alpha-value>)',
        danger: 'rgb(var(--ds-danger) / <alpha-value>)',
        'danger-foreground': 'rgb(var(--ds-danger-foreground) / <alpha-value>)',
        info: 'rgb(var(--ds-info) / <alpha-value>)',
        'info-foreground': 'rgb(var(--ds-info-foreground) / <alpha-value>)',
      },
      borderRadius: {
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.08)',
        card: '0 18px 40px rgba(37, 99, 235, 0.10)',
        lift: '0 24px 60px rgba(15, 23, 42, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        4.5: '1.125rem',
        18: '4.5rem',
        22: '5.5rem',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(37, 99, 235, 0.16), rgba(29, 78, 216, 0.04))',
        'surface-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 1))',
        'brand-radial': 'radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 45%)',
      },
    },
  },
  plugins: [],
};

export default config;