import type { Config } from 'tailwindcss';

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["inter", "sans-serif"],
    },
    extend: {
      spacing: {
        "2px": "2px",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.0s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
