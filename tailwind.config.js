/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '5xl': '60rem', 
        '6xl': '72rem', 
        '7xl': '84rem', 
      },
    },
  },
  plugins: [],
}