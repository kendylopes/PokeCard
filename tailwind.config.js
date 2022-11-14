/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily:{
        fontFamily: {
          sans: 'Roboto, sans-serif'
        },
      },
      colors: {
        'grenn-1':'#49d0b0',
        'grenn-2':'#61e1ca', 
        'gray-1':'#f6f8fc',
      },

    },
  },
  plugins: [],
}
