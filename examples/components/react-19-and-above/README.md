# React 19+ and TypeScript

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/esri/calcite-design-system/tree/dev/examples/components/react-19-and-above?file=README.md)

This example was bootstrapped with [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project). The example uses [`@esri/calcite-components`](https://www.npmjs.com/package/@esri/calcite-components).

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

By default, Calcite components use assets hosted on a CDN. If you are hosting assets locally, you can copy your assets to a project directory and set the asset path in your app with `setAssetPath`. This ensures that translations, icons, and other required assets are available to Calcite components:

```ts
import { setAssetPath } from "@esri/calcite-components/dist/components";

// Local assets
setAssetPath(window.location.href);
```

Next, import the components used in your application:

```tsx
// define the custom elements on the browser
import "@esri/calcite-components/components/calcite-button";
import "@esri/calcite-components/components/calcite-icon";
import "@esri/calcite-components/components/calcite-slider";
```

### Copy the assets

Calcite components' assets need to be copied from `node_modules` to your application (unless you use a CDN). This example leverages the [`vite-plugin-static-copy`](https://github.com/sapphi-red/vite-plugin-static-copy) package. Alternatively, you could use a CLI tool to copy the assets on `postinstall`. For example:

```sh
cp -r node_modules/@esri/calcite-components/dist/cdn/assets/* ./public
```
