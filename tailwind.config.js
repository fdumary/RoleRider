/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo
          hover: '#4338CA',
          light: '#EEF2FF',
          dark: '#3730A3',
        },
        accent: {
          DEFAULT: '#06B6D4', // Cyan
          hover: '#0891B2',
          light: '#ECFEFF',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          dark: '#0B1120',
          darkCard: '#131D31',
          darkBorder: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

