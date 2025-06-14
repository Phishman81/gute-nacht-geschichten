/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-orange': '#FF6B35',
        'warm-yellow': '#F7931E',
        'warm-red': '#E74C3C',
        'soft-pink': '#FFB6C1',
        'soft-peach': '#FFDAB9',
        'warm-brown': '#8B4513',
        'cream': '#FFF8DC',
        'night-blue': '#2C3E50'
      },
      fontFamily: {
        'kid': ['Comic Neue', 'Comic Sans MS', 'cursive'],
        'story': ['Quicksand', 'Arial Rounded MT', 'sans-serif']
      },
      animation: {
        'drive': 'drive 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        drive: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    },
  },
  plugins: [],
}
