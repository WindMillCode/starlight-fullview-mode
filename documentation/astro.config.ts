import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config';
import starlightFullViewMode from 'starlight-full-view-mode';
import tailwind from "@astrojs/tailwind";
import starlightVersions from 'starlight-versions';

export default defineConfig({
  site:"https://windmillcode.github.io",
  base:"starlight-full-view-mode",
  outDir: 'docs',
  output: 'static',
  integrations: [
    starlight({
      customCss: ['./src/styles/global.css'],
      plugins: [
        starlightVersions({
          current: {
            label: '0.0.3'
          },
          versions: [
            {
              slug: '0.0.1'
            },
          ]
        }),
        starlightFullViewMode()
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ slug: 'getting-started' }],
        },
      ],
      social: {
        github: 'https://github.com/Windmillcode/starlight-full-view-mode',
      },
      title: 'Starlight Full View Mode'
    }),
    tailwind({
      applyBaseStyles: false
    })
  ]
})
