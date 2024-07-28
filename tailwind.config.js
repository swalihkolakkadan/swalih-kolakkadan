/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
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
