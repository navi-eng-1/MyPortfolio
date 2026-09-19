/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#020305',
          900: '#06080c',
          850: '#0a0d14',
          800: '#0f141d',
          700: '#171e2b',
        },
        cyber: {
          cyan: '#00e5ff',
          mutedCyan: '#1fe0d4',
          dim: 'rgba(0, 229, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        widestx: '0.25em',
        ultra: '0.35em',
      }
    },
  },
  plugins: [],
}
