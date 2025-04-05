import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types'

import { z } from 'astro/zod';
import { AstroError } from 'astro/errors';
import { starlightFullViewModeIntegration } from './libs/integration';



const starlightFullViewModeConfigSchema = z
  .object({

    /**
     * Indicates if the ability to toggle the collapse expanded state of the left sidebar is enabled.
     *
     * @type {boolean}
     * @default true
     */
    leftSidebarEnabled: z.boolean().default(true),

    /**
     * Indicates if the ability to toggle the collapse expanded state of the left sidebar is enabled.
     *
     * @type {boolean}
     * @default true
     */
    rightSidebarEnabled: z.boolean().default(true),



  })
  .default({});

export type StarlightFullViewModeUserConfig = z.input<
  typeof starlightFullViewModeConfigSchema
>;
export type StarlightFullViewModeConfig = z.output<
  typeof starlightFullViewModeConfigSchema
>;


export default function starlightFullViewMode(
  userConfig?: StarlightFullViewModeUserConfig
): StarlightPlugin {

  const parsedConfig = starlightFullViewModeConfigSchema.safeParse(userConfig);

  if (!parsedConfig.success) {
    throw new AstroError(
      `The provided plugin configuration is invalid.\n${parsedConfig.error.issues
        .map((issue) => issue.message)
        .join('\n')}`,
      `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/WindMillCode/starlight-full-view-mode/issues`
    );
  }

  return {
    name: 'starlight-full-view-mode',
    hooks: {
      'config:setup'({ addIntegration, config, logger, updateConfig }) {

        const updatedConfig: Partial<StarlightUserConfig> = {
          components: { ...config.components },
          customCss: [
            'starlight-full-view-mode/styles/global.css',
            ...(config.customCss ?? [])
          ],
        };

        if (!updatedConfig.components) {
          updatedConfig.components = {};
        }

        if (config.components?.TableOfContents) {
          logger.warn(
            'It looks like you already have a `TableOfContents` component override in your Starlight configuration.\n To render `@windmillcode/starlight-full-view-mode`, remove the override for the `TableOfContents` component.\n'
          );

        } else {
          updatedConfig.components.TableOfContents =
            'starlight-full-view-mode/overrides/TableOfContents.astro';
        }

        if (config.components?.Sidebar) {
          logger.warn(
            'It looks like you already have a `Sidebar` component override in your Starlight configuration.\n To render `@windmillcode/starlight-full-view-mode`, remove the override for the `Sidebar` component.\n'
          );

        } else {
          updatedConfig.components.Sidebar =
            'starlight-full-view-mode/overrides/Sidebar.astro';
        }

        addIntegration(starlightFullViewModeIntegration(parsedConfig.data));
        updateConfig(updatedConfig);


      },
    },
  }
}
