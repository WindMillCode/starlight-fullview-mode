import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config';
import starlightFullViewMode from 'starlight-fullview-mode';
import tailwind from "@astrojs/tailwind";
import starlightVersions from 'starlight-versions';
import icon from "astro-icon";
import starlightViewModes from 'starlight-view-modes';

export default defineConfig({
  site:"https://windmillcode.github.io",
  base:"starlight-fullview-mode",
  outDir: 'docs',
  output: 'static',
  integrations: [
    icon(),
    starlight({
      customCss: [
        './src/styles/global.css',
        './src/styles/donate.css',
        './src/styles/mobile-nav.css',
        './src/styles/zen-mode.css'
      ],
      components: {
        TableOfContents: "./src/components/TableOfContents.astro",
      },
      plugins: [
        starlightViewModes(),
        starlightVersions({
          current: {
            label: '0.1.1'
          },
          versions: [
            {
              slug: '0.1.0'
            },
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
        github: 'https://github.com/Windmillcode/starlight-fullview-mode',
      },
      title: 'Starlight Fullview Mode'
    }),
    tailwind({
      applyBaseStyles: false
    })
  ]
})
