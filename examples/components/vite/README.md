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
// src/main.ts
import { setAssetPath } from "@esri/calcite-components/dist/components";

setAssetPath(location.href);
```

Next, import the components used in your application:

```js
// src/components/HelloWorld.vue
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-date-picker";
```

Lastly, import the global Calcite components stylesheet (only do this once):

```js
import "@esri/calcite-components/dist/calcite/calcite.css";
```

### Copy the assets

You can use the `rollup-plugin-copy` package to copy Calcite components' assets to your application:

```ts
import { defineConfig } from "vite";
import copy from "rollup-plugin-copy";

export default defineConfig({
  plugins: [
    copy({
      targets: [
        {
          src: "node_modules/@esri/calcite-components/dist/calcite/assets/",
          dest: "public/",
        },
      ],
    }),
  ],
});
```
