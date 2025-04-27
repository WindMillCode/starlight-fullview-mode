/** @type {import('tailwindcss').Config} */
import starlightPlugin from '@astrojs/starlight-tailwind';

let darkAmber= {
  '50': '#f3d3bb',
  '100': '#e5a87a',
  '200': '#d88c4d',
  '300': '#cb7033',
  '400': '#b85b1d',
  '500': '#944713',
  '600': '#74390e',
  '700': '#562b0a',
  '800': '#3a1d06',
  '900': '#231102',
  '950': '#110800',
}



export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [starlightPlugin()],
}
