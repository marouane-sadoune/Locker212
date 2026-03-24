import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#080808',
        'bg-surface': '#111111',
        'bg-elevated': '#1A1A1A',
        'gold': '#C9A84C',
        'gold-light': '#E8C96A',
        'gold-dim': 'rgba(201,168,76,0.12)',
        'gold-border': 'rgba(201,168,76,0.25)',
        'text-primary': '#F0EDE6',
        'text-secondary': '#999990',
        'text-muted': '#555550',
        'success': '#4A7C59',
        'danger': '#7C4A4A',
        'warning': '#7C6A2A',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      borderRadius: {
        'none': '0px',
      },
    },
  },
  plugins: [],
} satisfies Config