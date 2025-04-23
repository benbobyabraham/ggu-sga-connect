/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gguBlue: '#003057',
        lightBlue: '#004F8C',
        bgWhite: '#F8FAFC',
      },
    },
  },
  plugins: [],
}
