import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config';
import starlightFullViewMode from 'starlight-full-view-mode';
import tailwind from "@astrojs/tailwind";
import starlightVersions from 'starlight-versions';
import icon from "astro-icon";

export default defineConfig({
  site:"https://windmillcode.github.io",
  base:"starlight-full-view-mode",
  outDir: 'docs',
  output: 'static',
  integrations: [
    icon(),
    starlight({
      customCss: [
        './src/styles/global.css',
        './src/styles/donate.css',
        './src/styles/mobile-nav.css'
      ],
      plugins: [

        starlightVersions({
          current: {
            label: '0.1.0'
          },
          versions: [
            {
              slug: '0.0.1'
            },
          ]
        }),
        starlightFullViewMode(),
        {
          name:'plugin-overrides',
          hooks:{
            setup({ addIntegration, config, logger, updateConfig }) {
              const updatedConfig = {
                components: { ...config.components },
              };

              if (!updatedConfig.components) {
                updatedConfig.components = {};
              }
              updatedConfig.components.SocialIcons = './src/overrides/SocialIcons.astro';
              updateConfig(updatedConfig);
            }
          }
        }
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
