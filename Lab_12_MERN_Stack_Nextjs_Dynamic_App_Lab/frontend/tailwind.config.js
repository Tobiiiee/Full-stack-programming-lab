/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange:     { DEFAULT: '#F16E10', light: '#f9a05a', dark: '#c45608' },
        charcoal:   '#333333',
        softgray:   '#777777',
        footerbg:   '#555555',
      },
      fontFamily: {
        serif:  ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans:   ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
