/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#020818',
          900: '#050e2a',
          800: '#091535',
          700: '#0d1c42',
          600: '#122354',
        },
        gold: {
          300: '#f5d78e',
          400: '#e8c35a',
          500: '#d4a820',
          600: '#b8900f',
        },
      },
    },
  },
  plugins: [],
}
