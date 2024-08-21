/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  fontFamily: {
    sans: ['"Inter"', ..._fontFamily.sans],
    mono: ['"JetBrains Mono"', ..._fontFamily.mono],
  },
  /* https://raw.githubusercontent.com/luisiacc/gruvbox-baby/main/extras/media/palettes/medium.svg */
  colors: {
    'gruvbox-dark': '#242424',
    'gruvbox-gray': '#665c54',
    'gruvbox-milk': '#e7d7ad',
    'gruvbox-red': '#fb4934',
    'gruvbox-green': '#98971a',
    'gruvbox-yellow': '#fabd2f',
  },
  extend: {},
};
export const plugins = [];
