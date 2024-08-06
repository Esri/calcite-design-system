# Webpack

## Project setup

To install dependencies, run:

```
npm install
```

After installation, you can use `npm start` to start up a development server at `http://localhost:8080/`.

## Calcite Components with Webpack

To install calcite components, first run:

```
npm install --save @esri/calcite-components
```

After calcite-components is installed, import the components you will use in the app:

```js
// src/index.js
import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-icon';
import '@esri/calcite-components/dist/components/calcite-date-picker';
import { setAssetPath } from '@esri/calcite-components/dist/components';

setAssetPath(location.href);
```

Using `setAssetPath` will ensure that calcite components look for assets like icons in the correct location (more on copying assets below).

## Adding the CSS

The global calcite components CSS can be added by importing the `calcite.css` file. This will require you set up a css loader in your Webpack config (see [Config > CSS](#css) below):

```
import "@esri/calcite-components/dist/calcite/calcite.css";
```

## Config

Calcite components will need to be copied over to your output folder for Stencil to load them properly from the client. The easiest way to do this is to utilize the [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/). First install:

```
npm install --save-dev copy-webpack-plugin
```

Then import the plugin in your `webpack.config.js` file and call it inside the `plugins` array:

```js
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: '**',
          context: 'node_modules/@esri/calcite-components/dist/calcite/',
          to: './'
        }
      ]
    })
  ]
};
```

This will ensure the library is available to your JavaScript.

### CSS

While we imported CSS file above, we need to output a CSS file in the final bundle. To do this, you can leverage the [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/).

First, install the required plugins and loaders:

```
npm install --save-dev mini-css-extract-plugin css-loader
```

Then add them to your config:

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      }
    ]
  },
}
```

You can see this example projects [webpack.config.js](./webpack.config.js) for a complete config with dev server and html loading.
