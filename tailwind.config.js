/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      interLight: ["inter-light", "sans-serif"],
      interSemibold: ["inter-semibold"],
      interRegular: ["inter-regular"],
      interMedium: ["inter-medium"],
      interBold: ["inter-bold"],
    },
    extend: {
      colors: {},
      spacing: {
        "2px": "2px",
      },
      fontFamily: {
        inter: ["inter"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.0s ease-out forwards",
      },
    },
  },
  plugins: [],
};
