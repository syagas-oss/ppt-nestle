
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0a1210',
          primary: '#2dd4bf', // Teal 400
          secondary: '#fb7185', // Rose 400
          accent: '#fbbf24', // Amber 400
        }
      },
    },
  },
  plugins: [],
}
