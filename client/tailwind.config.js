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
      colors: {
        'primary': '#B33D53',
      },
      keyframes: {
        fadeAnim: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        fadeAnim: 'fadeAnim 0.5s ease-out',
      },
      boxShadow: {
        boxshadow: '0 0 5px 3px rgba(0,0,0,.07)',
        boxshadow_2: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
      },
    },

  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
  ],
});
