import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A2A44',
        ochre: '#DAA520',
        teal: '#26A69A',
        warmGray: '#B0A999',
        charcoal: '#36454F',
      },
    },
  },
  plugins: [],
};
export default config;