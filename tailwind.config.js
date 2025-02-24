/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gguBlue: "#003467",
        lightBlue: "#005A9C",
        bgWhite: "#F8F9FA",
      },
    },
  },
  plugins: [],
};
