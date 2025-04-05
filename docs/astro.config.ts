import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightFullViewMode from 'starlight-full-view-mode'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/Windmillcode/starlight-full-view-mode/edit/main/docs/',
      },
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
      title: 'starlight-full-view-mode',
    }),
  ],
})
