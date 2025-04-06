import type { AstroIntegration } from 'astro';

import type { StarlightFullViewModeConfig } from '..';
import { vitePluginStarlightFullViewModeConfig } from './vite';

export function starlightFullViewModeIntegration(
  config: StarlightFullViewModeConfig
): AstroIntegration {
  return {
    name: 'starlight-view-modes-integration',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [vitePluginStarlightFullViewModeConfig(config)],
          },
        });
      },
    },
  };
}
