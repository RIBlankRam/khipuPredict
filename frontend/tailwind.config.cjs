/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  safelist: [
    "w-[400px]",
    "w-[300px]",
    "w-[40px]",
    "w-[calc(100%-700px)]",
    "w-[calc(100%-400px)]",
    "w-[calc(100%-300px)]",
  ]
};
