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
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          subtle: 'var(--accent-subtle)',
          hover: 'var(--accent-hover)',
        },
        base: 'var(--bg-base)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
