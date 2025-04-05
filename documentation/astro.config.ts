import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightFullViewMode from 'starlight-full-view-mode'


export default defineConfig({
  site:"https://windmillcode.github.io",
  base:"starlight-full-view-mode",
  outDir: 'docs',
  integrations: [
    starlight({
      plugins: [starlightFullViewMode()],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ slug: 'getting-started' }],
        },
      ],
      social: {
        github: 'https://github.com/Windmillcode/starlight-full-view-mode',
      },
      title: 'Starlight Full View Mode',
    }),
  ],
})
