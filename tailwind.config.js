/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      hueRotate: {
        40: '40deg',
      },
    },
  },
  plugins: [],
}

