/ /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#78C0E0', // biru muda (harapan)
          DEFAULT: '#4BA3C3',
          dark: '#2B7A8A',
        },
        health: '#2ECC71', // hijau (kesehatan)
        energy: '#FF8C42', // oranye (semangat)
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
};
