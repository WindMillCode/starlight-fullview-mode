import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types'

import { z } from 'astro/zod';
import { AstroError } from 'astro/errors';
import { starlightFullViewModeIntegration } from './libs/integration';



const starlightFullViewModeConfigSchema = z
  .object({
    /**
     * Whether the left sidebar is enabled and can be toggled.
     *
     * @default true
     */
    leftSidebarEnabled: z.boolean().default(true),

    /**
     * Whether the right sidebar is enabled and can be toggled.
     *
     * @default true
     */
    rightSidebarEnabled: z.boolean().default(true),

    /**
     * CSS width value applied when the left sidebar is expanded.
     *
     * @default null
     */
    leftSidebarExpandedWidth: z.string().nullable().default(null),

    /**
     * CSS width value applied when the right sidebar is expanded.
     *
     * @default null
     */
    rightSidebarExpandedWidth: z.string().nullable().default(null),

    /**
     * CSS width value applied when the left sidebar is collapsed.
     *
     * @default 50px
     */
    leftSidebarCollapsedWidth: z.string().default("50px"),

    /**
     * CSS width value applied when the right sidebar is collapsed.
     *
     * @default 50px
     */
    rightSidebarCollapsedWidth: z.string().default("50px"),
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
      `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/WindMillCode/starlight-fullview-mode/issues`
    );
  }

  return {
    name: 'starlight-fullview-mode',
    hooks: {
      'config:setup'({ addIntegration, config, logger, updateConfig }) {

        const updatedConfig: Partial<StarlightUserConfig> = {
          components: { ...config.components },
          customCss: [
            'starlight-fullview-mode/styles/global.css',
            ...(config.customCss ?? [])
          ],
        };

        if (!updatedConfig.components) {
          updatedConfig.components = {};
        }

        if(parsedConfig.data.leftSidebarEnabled){
          if (config.components?.Sidebar) {
            logger.warn(
              'It looks like you already have a `Sidebar` component override in your Starlight configuration.\n To render `@windmillcode/starlight-fullview-mode`, remove the override for the `Sidebar` component.\n'
            );

          } else {
            updatedConfig.components.Sidebar =
              'starlight-fullview-mode/overrides/Sidebar.astro';
          }
        }

        if (parsedConfig.data.rightSidebarEnabled) {
          if (config.components?.TableOfContents ) {
            logger.warn(
              'It looks like you already have a `TableOfContents` component override in your Starlight configuration.\n To render `@windmillcode/starlight-fullview-mode`, remove the override for the `TableOfContents` component.\n'
            );

          } else {
            updatedConfig.components.TableOfContents =
              'starlight-fullview-mode/overrides/TableOfContents.astro';
          }
        }

        addIntegration(starlightFullViewModeIntegration(parsedConfig.data));
        updateConfig(updatedConfig);


      },
    },
  }
}
