/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'glass': 'rgba(255,255,255,0.15)',
        'glass-dark': 'rgba(30,41,59,0.25)',
      },
      backdropBlur: {
        'glass': '8px',
        'glass-lg': '16px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.13)',
      },
      borderColor: {
        'glass': 'rgba(255,255,255,0.24)'
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
