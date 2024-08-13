# Rollup

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/esri/calcite-design-system/tree/dev/examples/components/rollup?file=README.md)

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

setAssetPath(document.currentScript.src);
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

### Configure Rollup

There are a few more steps required so that rollup can successfully bundle our application:

- copy over the assets
- enable importing CSS into our bundle
- set the output format to `es`

First, add the following imports to your config:

```js
// rollup.config.js
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import path from "path";
```

#### Set the format to ES

For the module to bundle properly, you'll need to use the `es` output format:

```js
// rollup.config.js
output: [{ dir: path.resolve('public'), format: 'es' }],
```

> [!WARNING]
> This will not work if you need to support legacy browsers like IE11

#### Enable CSS import

Add the `postcss` to the plugins array in your config:

```js
// rollup.config.js
plugins: [
  postcss({
    extensions: ['.css']
  }),
],
```

#### Copy the assets

You can use the `rollup-plugin-copy` package to copy Calcite components' assets to your application:

```js
// rollup.config.js
plugins: [
  copy({
    targets: [
      {
        src: path.resolve(__dirname, 'node_modules/@esri/calcite-components/dist/calcite/assets'),
        dest: path.resolve(__dirname, 'public')
      },
    ],
  }),
],
```
