/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#00ff41',
        'terminal-black': '#0c0c0c',
        'blood-red': '#ff0000',
      },
      fontFamily: {
        mono: ['"VT323"', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
      },
    },
  },
  plugins: [],
}