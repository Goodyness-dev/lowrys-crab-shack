/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF8',
          100: '#FAF6ED',
          200: '#F3EBDD',
          300: '#E7DBC7',
          DEFAULT: '#F3EBDD'
        },
        restaurant: {
          red: '#A92E26',
          redHover: '#8E251E',
          redDark: '#6D1A14',
          gold: '#E8B94F',
          turquoise: '#48A7AC',
          brown: '#34251D',
          ink: '#181614'
        },
        midnight: {
          DEFAULT: '#181614',
          pure: '#0C0A09',
          card: '#1F1B18',
          cardHover: '#2A2420',
          border: '#3D342E',
          subtle: '#4B4039',
        }
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Geist"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'thick': '0 8px 0 rgba(52, 37, 29, 0.08), 0 20px 30px -10px rgba(52, 37, 29, 0.12)',
        'thick-hover': '0 12px 0 rgba(52, 37, 29, 0.12), 0 25px 40px -10px rgba(52, 37, 29, 0.18)',
        'thick-red': '0 8px 0 rgba(169, 46, 38, 0.25), 0 20px 30px -10px rgba(169, 46, 38, 0.25)'
      }
    },
  },
  plugins: [],
}
