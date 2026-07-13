/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: { 50:'#FFF8F0', 100:'#FFEDD5', 200:'#FED7AA', 300:'#FDBA74', 400:'#FB923C', 500:'#E8650A', 600:'#C2410C', 700:'#9A3412', 800:'#7C2D12', 900:'#431407' },
        maroon: { 50:'#FEF2F2', 100:'#FEE2E2', 200:'#FECACA', 500:'#DC2626', 600:'#B91C1C', 700:'#991B1B', 800:'#7F1D1D', 900:'#450A0A' },
        cream: { 50:'#FFFCF5', 100:'#FFFBF0', 200:'#FEF3C7', 300:'#FDE68A' },
        bark: { 50:'#4A3828', 100:'#3D2E22', 200:'#2D2018', 300:'#1C1410', 400:'#0F0A07' },
        gold: { 400:'#EAB308', 500:'#D4A017', 600:'#B8860B' },
      },
      fontFamily: {
        display: ['"Yatra One"', 'cursive'],
        body: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        pulseGlow: { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '0.8' } },
        slideUp: { '0%': { transform: 'translateY(30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}