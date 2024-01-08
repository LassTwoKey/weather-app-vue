/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      screens: {
        xl: '930px',
      },
    },
    letterSpacing: {
      wide: '.015em',
    }
  },
  plugins: [],
} 

