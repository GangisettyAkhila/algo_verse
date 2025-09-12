/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* white-10 */
        input: 'var(--color-input)', /* elevated-dark-gray */
        ring: 'var(--color-ring)', /* electric-cyan */
        background: 'var(--color-background)', /* near-black */
        foreground: 'var(--color-foreground)', /* white */
        primary: {
          DEFAULT: 'var(--color-primary)', /* electric-cyan */
          foreground: 'var(--color-primary-foreground)', /* near-black */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* rich-purple */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* vibrant-red */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* elevated-dark-gray */
          foreground: 'var(--color-muted-foreground)', /* mid-tone-gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* energetic-orange-red */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* elevated-dark-gray */
          foreground: 'var(--color-popover-foreground)', /* white */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* elevated-dark-gray */
          foreground: 'var(--color-card-foreground)', /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* bright-green */
          foreground: 'var(--color-success-foreground)', /* near-black */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* golden-yellow */
          foreground: 'var(--color-warning-foreground)', /* near-black */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* vibrant-red */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        surface: 'var(--color-surface)', /* elevated-dark-gray */
        'text-primary': 'var(--color-text-primary)', /* white */
        'text-secondary': 'var(--color-text-secondary)', /* mid-tone-gray */
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      boxShadow: {
        'gaming-sm': '0 2px 4px rgba(0, 212, 255, 0.1)',
        'gaming-md': '0 4px 8px rgba(0, 212, 255, 0.1)',
        'gaming-lg': '0 8px 16px rgba(0, 212, 255, 0.1)',
        'neumorphic': 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'balance-glow': 'balanceGlow 300ms ease-in-out',
        'win-pulse': 'winPulse 600ms ease-in-out',
      },
      keyframes: {
        balanceGlow: {
          '0%': { boxShadow: '0 0 0 rgba(0, 212, 255, 0)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 0 rgba(0, 212, 255, 0)' },
        },
        winPulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
  safelist: ['duration-[3000ms]'],
}