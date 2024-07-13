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
    },
  },
  plugins: [],
};
