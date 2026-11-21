/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aws: {
          charcoal: '#161C25',
          surface: '#1B222C',
          grid: '#515963',
          blue: '#40B4F5',
          darkBlueText: '#15212C',
          textPrimary: '#FFFFFF',
          textSecondary: '#C4CBD3',
          muted: '#8A95A3',
        },
        genesis: {
          midnight: '#161C25',
          dark: '#1B222C',
          card: '#1B222C',
          surface: '#1B222C',
          electric: '#40B4F5',
          cyan: '#55C5FF',
          muted: '#C4CBD3',
          accent: '#40B4F5',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'aws-blue': '0 0 20px rgba(64, 180, 245, 0.35)',
        'aws-glow': '0 0 30px rgba(64, 180, 245, 0.45)',
      }
    },
  },
  plugins: [],
}
