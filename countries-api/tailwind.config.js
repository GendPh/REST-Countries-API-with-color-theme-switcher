/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          light: "#111517",
          dark: "#ffffff",
        },
        bg: {
          light: "#ffffff",
          dark: {
            primary: "#202C36",
            secondary: "#2B3844",
          }
        },
        shadow: "rgba(0, 0, 0, 0.562)",
      }
    },
  },
  plugins: [],
}