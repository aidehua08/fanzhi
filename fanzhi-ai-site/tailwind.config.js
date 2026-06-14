/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Noto Sans SC"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#06101c',
        deep: '#081827',
        cyan: '#19c6c3',
        signal: '#80fff2',
        lime: '#d7ff6e',
        teal: '#08777c',
        mint: '#80fff2',
        cloud: '#d9eef4',
        paper: '#f5f9fb',
      },
    },
  },
  plugins: [],
}
