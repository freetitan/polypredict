/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D0D',
        secondary: '#1A1A1A',
        accent: '#00C2CB',
        success: '#00D897',
        danger: '#FF4D4D',
        warning: '#FFB800',
        border: '#2D2D2D',
      },
    },
  },
  plugins: [],
}
