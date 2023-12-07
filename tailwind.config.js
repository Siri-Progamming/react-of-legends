/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'BeaufortForLOL': ['BeaufortForLOL'],
        'Apercu': ['Apercu'],
        'KDA' : ['KDA'],
      },
      colors:{
        'lol-dark-brown' : '#67471f',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
