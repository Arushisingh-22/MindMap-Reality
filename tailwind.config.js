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
        brand: {
          bg: 'var(--color-bg)',
          card: 'var(--color-card)',
          elevated: 'var(--color-elevated)',
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          surface: 'var(--color-surface)',
          'surface-hover': 'var(--color-surface-hover)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          border: 'var(--color-border)',
          success: 'var(--color-success)',
          error: 'var(--color-error)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
