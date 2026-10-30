# Vite and TypeScript

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Esri/calcite-design-system/tree/dev/examples/components/vite?configPath=examples/components/vite)

To install dependencies and start the development server, run:

```sh
pnpm install --ignore-workspace --lockfile=false
pnpm dev
```

## Developer info

To install `@esri/calcite-components`, run:

```sh
pnpm add @esri/calcite-components --ignore-workspace --lockfile=false
```

### Setup components

Import and call `setAssetPath`, which ensures translations, icons, and other required assets are available to Calcite components (more on copying assets below).

```js
// main.ts
import { setAssetPath } from "@esri/calcite-components/dist/components";

setAssetPath(location.href);
```

Next, import the components used in your application:

```js
// main.ts
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-date-picker";
import "@esri/calcite-components/dist/components/calcite-loader";
```

### Copy the assets

You can use the `vite-plugin-static-copy` package to copy Calcite components' assets to your application:

```ts
import { resolve } from "node:path";
import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve("node_modules", "@esri", "calcite-components", "dist", "cdn", "assets")),
          dest: normalizePath("."),
        },
      ],
    }),
  ],
});
```

### Avoid the Vite/LightningCSS `light-dark()` issue

Vite 8 enabled Lightning CSS for minification by default, which has a [known issue](https://github.com/parcel-bundler/lightningcss/issues/821) with its polyfill for the [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) CSS function. The issue results in Calcite's color CSS variables to be set incorrectly, causing components to appear as transparent or without background colors, etc.

To avoid this issue, disable Lightning CSS for the `light-dark()` function with the below Vite config. If importing Lightning CSS directly is undesired, use the corresponding number for `LightDark` from the package's [`flags.js`](https://cdn.jsdelivr.net/npm/lightningcss@latest/node/flags.js) file.

```ts
import { defineConfig } from "vite";
import { Features } from "lightningcss";

export default defineConfig({
  ...
  css: {
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
});
```
