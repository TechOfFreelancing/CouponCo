/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
    extend: {
      keyframes: {
        fadeAnim: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        fadeAnim: 'fadeAnim 0.5s ease-out',
      },
    },

  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
  ],
});
