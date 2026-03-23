/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgBase: '#09090E',
        bgSurface: '#12121C',
        bgCard: 'rgba(26, 26, 46, 0.65)',
        primary: '#4F6EF7',
        primaryHover: '#3A56D4',
        accent: '#8B5CF6',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
        textMuted: '#64748B',
        borderDim: 'rgba(255, 255, 255, 0.08)',
        borderGlow: 'rgba(79, 110, 247, 0.4)'
      },
      fontFamily: {
        sans: ['"Cabinet Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(79, 110, 247, 0.25)',
        'hover-glow': '0 0 35px rgba(79, 110, 247, 0.45)',
        'soft-glow': '0 4px 30px rgba(0, 0, 0, 0.3)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
