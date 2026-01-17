import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Professional nature-inspired palette for rural Bangladesh
        primary: {
          DEFAULT: '#16a34a', // Fresh green
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16'
        },
        secondary: {
          DEFAULT: '#0891b2', // Calm teal
          50: '#ecfeff',
          100: '#cffafe',
          600: '#0891b2',
          700: '#0e7490'
        },
        accent: {
          DEFAULT: '#f59e0b', // Warm amber
          50: '#fffbeb',
          100: '#fef3c7',
          600: '#f59e0b',
          700: '#d97706'
        },
        earth: {
          50: '#fdfcf9',
          100: '#f7f4ed',
          200: '#ebe5d6',
          300: '#d9cdb4',
          400: '#c4b094',
          500: '#a89176',
        },
        surface: {
          light: '#ffffff',
          dark: '#0f1419',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

export default config;
