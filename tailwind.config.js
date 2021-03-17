module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    scrollbar: ['rounded', "dark"],
    extend: {
      opacity: ['disabled']
    },
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
