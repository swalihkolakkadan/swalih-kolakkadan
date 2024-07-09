/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        "custom-grey-950": "#232323",
        "custom-grey-50": "#f6f6f6",
        
      },
    },
  },
  plugins: [],
};
