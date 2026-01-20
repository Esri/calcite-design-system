# Webpack

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/esri/calcite-design-system/tree/dev/examples/components/webpack?file=README.md)

To install dependencies and start the development server, run:

```sh
pnpm install
pnpm start
```

## Developer info

To install `@esri/calcite-components`, run:

```sh
pnpm install @esri/calcite-components
```

### Setup components

Import and call `setAssetPath`, which ensures translations, icons, and other required assets are available to Calcite components (more on copying assets below).

```js
import { setAssetPath } from "@esri/calcite-components/dist/components";

setAssetPath(location.href);
```

Next, import the components used in your application:

```js
// src/index.js
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-date-picker";
```

### Configure Webpack

Calcite components need to be copied to your output directory so they can be loaded from the client. The easiest way to do this is with [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/). First, install the package:

```sh
pnpm install -D copy-webpack-plugin
```

Then, import the package in `webpack.config.js` and set it up in the `plugins` section:

```js
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "**",
          context: "node_modules/@esri/calcite-components/dist/cdn/",
          to: "./",
        },
      ],
    }),
  ],
};
```

This will ensure the library is available to your application.

#### Add CSS loader

To output a CSS file in the final bundle, you can leverage [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/).

First, install the required plugin and loader packages:

```sh
pnpm install -D mini-css-extract-plugin css-loader
```

Then, add them to your config:

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

You can see this example project's [webpack.config.js](./webpack.config.js) for a complete setup with a dev server and html loading.
