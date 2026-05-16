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
        earth: {
          green: {
            deep: '#1B4332',
            DEFAULT: '#2D6A4F',
            soft: '#74C69D',
            glow: 'rgba(116, 198, 157, 0.15)',
          },
          blue: '#1D3557',
        },
        neutral: {
          bg: '#FAFAFA',
          gray: '#EDEDED',
          text: '#1A1A1A',
          'text-secondary': '#6B6B6B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        card: '14px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
    },
  },
  plugins: [],
};
