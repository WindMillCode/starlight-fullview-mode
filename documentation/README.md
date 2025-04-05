# Starlight Full View Mode

A minimalist plugin that collapses Starlight&#39;s sidebars and expands the main content to full width, creating a distraction-free, fullscreen-like reading experience. Toggle with a single click to focus purely on your content. [Learn more](https://windmillcode.github.io/starlight-full-view-mode/getting-started/)


## License

Licensed under the MIT License, Copyright © Windmillcode.

See [LICENSE](https://github.com/Windmillcode/starlight-full-view-mode/blob/main/LICENSE) for more information.

Prerequisites
-------------

You will need to have a Starlight website set up. If you don’t have one yet, you can follow the [“Getting Started”](https://starlight.astro.build/getting-started) guide in the Starlight docs to create one.

Installation
------------

1.  `starlight-full-view-mode` is a Starlight [plugin](https://starlight.astro.build/reference/plugins/). Install it by running the following command in your terminal:


    NPM

        npm install starlight-full-view-mode

    PNPM

        pnpm add starlight-full-view-mode

    YARN

        yarn add starlight-full-view-mode

2.  Configure the plugin in your Starlight [configuration](https://starlight.astro.build/reference/configuration/#plugins) in the `astro.config.mjs` file.


```js
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightFullViewMode from 'starlight-full-view-mode'

export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightFullViewMode({
           // Configuration options go here.
        })
       ],
      title: 'My Docs',
    }),
  ],
})
```


Configuration
-------------

The plugin accepts the following configuration options:

### `leftSidebarEnabled`

*   **Type:** `boolean`
*   **Default:** `true`
*   **Description:** Controls whether the left sidebar can be toggled between collapsed and expanded states.

### `rightSidebarEnabled`

*   **Type:** `boolean`
*   **Default:** `true`
*   **Description:** Controls whether the right sidebar (table of contents) can be toggled between collapsed and expanded states.

#### Examples

Enable the left sidebar and disable the right sidebar:

    starlightFullViewMode({
      leftSidebarEnabled: true,
      rightSidebarEnabled: false
    })

Enable the right sidebar and disable the left sidebar:

    starlightFullViewMode({
      leftSidebarEnabled: false,
      rightSidebarEnabled: true
    })
