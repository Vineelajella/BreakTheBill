/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
  extend: {
    colors: {
      accent: '#00FF84',
      accentDark: '#00C97F',
      secondary: '#1DBE6A',
      background: '#0D0D0D',
      grayText: '#CCCCCC',
      grayMuted: '#888888',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
  },
}
};
