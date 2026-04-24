/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Proporciona utilidades `animate-in`, `fade-in`, `slide-in-from-*` usadas en la UI.
    require('tailwindcss-animate'),
  ],
};
