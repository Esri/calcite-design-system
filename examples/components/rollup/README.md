# Rollup

This repo contains a bare-bones example of how to create an application using Rollup and calcite-components. It was generated with [rollup-starter-app](https://github.com/rollup/rollup-starter-lib).

To get started using this project, use:

```
npm install
npm run dev
```

This will install dependencies and then start up a development server on [localhost:5000](http://localhost:5000).

## Calcite Components with Rollup

To install calcite components, first run:

```
npm install --save @esri/calcite-components
```

After calcite-components is installed, import the components you will use in the app as well as the global CSS:

```js
// src/main.js
import { setAssetPath } from '@esri/calcite-components/dist/components';
import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-icon';
import '@esri/calcite-components/dist/components/calcite-date-picker';
import '@esri/calcite-components/dist/calcite/calcite.css';

setAssetPath(document.currentScript.src);
```

Using `setAssetPath` will ensure that calcite components look for assets like icons in the correct location (more on copying assets below).

## Configuring Rollup

There are a few more steps we need to take so that rollup can successfully bundle our application. In addition to the basic configuration provided by rollup-starter-app, we need to:

- copy over icons
- enable importing css into our bundle
- set the output format to `es`

To that end, at the top of your config, add the following imports:

```js
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import path from 'path';
```

### Set the Format to ES

For the module to bundle properly you'll need to use the `es` output format. _**Note**: This will not work if you need to support legacy browsers like IE11_. To set the output format, add the following to the `output` property:

```js
output: [{ dir: path.resolve('public'), format: 'es' }],
```

### Enable CSS Import

Simply add the postcss plugin to the plugins array:

```js
postcss({
  extensions: ['.css']
}),
```

### Copying Icons

To copy the icon assets over, you can use the `rollup-plugin-copy` package, adding it the the same plugins array:

```js
copy({
  targets: [
    {
      src: path.resolve(__dirname, 'node_modules/@esri/calcite-components/dist/calcite/assets'),
      dest: path.resolve(__dirname, 'public')
    },
  ]
}),
```
