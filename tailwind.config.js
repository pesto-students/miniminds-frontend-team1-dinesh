/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ['"Inter"'],
    },
    extend: {
      colors: {
        primary: '#19B03D',
        primary_black: '#2A2A2A',
        primary_gray: '#555555',
        link: 'rgb(37 99 235)',
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
