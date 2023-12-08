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
        'primary' : '#c4b998',
        'secondary' : '#937341',
        'white' : '#f9f9f9',
        'bg-cards-color' : '#0a0a0c',


      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
