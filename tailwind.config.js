/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      boxShadow: {
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    screens: {
      'mp': {'min': '400px', 'max': '640px'}, // Custom breakpoint range
    },
  },
  },
  plugins: 
    ["tailwindcss ,autoprefixer"],
  
}

