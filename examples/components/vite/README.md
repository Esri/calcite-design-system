# Vite and TypeScript

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/esri/calcite-design-system/tree/dev/examples/components/vite?file=README.md)

To install dependencies and start the development server, run:

```sh
npm install
npm run dev
```

## Developer info

To install `@esri/calcite-components`, run:

```sh
npm install @esri/calcite-components
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

Lastly, import the global Calcite components stylesheet (only do this once):

```js
// main.ts
import "@esri/calcite-components/dist/calcite/calcite.css";
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
