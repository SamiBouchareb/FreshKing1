/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-300px * 14 - 1.5rem * 14))' } // Adjust based on card width and gap
        }
      },
      animation: {
        scroll: 'scroll 60s linear infinite'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.pause-animation': {
          'animation-play-state': 'paused'
        }
      })
    }
  ],
}
