/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f7f5f0',
        foreground: '#1a1a1a',
        primary: {
          DEFAULT: '#4a6741',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#8b7355',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f0ebe3',
          foreground: '#6b6b6b',
        },
        accent: {
          DEFAULT: '#d4c5b5',
          foreground: '#1a1a1a',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1a1a1a',
        },
        border: '#e5e0d8',
        input: '#e5e0d8',
        ring: '#4a6741',
      },
      fontFamily: {
        sans: ['Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
