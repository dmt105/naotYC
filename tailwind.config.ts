import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        //couleur de base du Logo Youth Computing
        ycBlue: '#010b40',
        ycFuchsia: '#f13544',
        ycGray: '#999999',
      },
      //Font Youth computing
      fontFamily: {
        ubuntu: ['"Ubuntu"', 'sans-serif'],
        century: ['"Century Gothic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config