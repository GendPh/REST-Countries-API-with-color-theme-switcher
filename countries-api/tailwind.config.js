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
          light: {
            primary: "#FAFAFA",
            secondary: "#ffffff",
          },
          dark: {
            primary: "#202C36",
            secondary: "#2B3844",
          }
        },
        shadow: "rgba(0, 0, 0, 0.562)",
      },
      keyframes: {
        "fade-in-out": {
          "0%": { opacity: 0.3 },
          "50%": { opacity: 0.6 },
          "100%": { opacity: 0.3 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "ping": {
          "75%, 100%": { transform: "scale(1.4)", opacity: 0 }
        }
      },
      animation: {
        "fade-in-out": 'fade-in-out 1s linear infinite',
        "fade-in": 'fade-in 0.3s linear',
        "ping": 'ping 0.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}