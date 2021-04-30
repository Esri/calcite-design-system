![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square) ![npm](https://img.shields.io/npm/v/@esri/calcite-components?color=%23007ac2&style=flat-square)

# Calcite Components

Shared Web Components for Esri's Calcite design framework. To see the components in action, [view the documentation](https://esri.github.io/calcite-components/).

## Sketch library

All of the Calcite Components are available in the [calcite-sketch-library](https://github.com/Esri/calcite-sketch-libraries) with all variations and sizes.

## Installation

The simplest way to set up the components in your project is to add the following tags in the head of your HTML document:

```html
<script type="module" src="https://unpkg.com/@esri/calcite-components/dist/calcite/calcite.esm.js"></script>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@esri/calcite-components/dist/calcite/calcite.css" />
```

Once these tags are added, components can be used just like any other HTML element. Only components that are actually used will be loaded.

You can also install the components locally with NPM and update the script URLs to reference same files under `node_modules`.

```
npm install --save @esri/calcite-components
```

### Webpack

If you already have a webpack build for your project, you can use [@stencil/webpack](https://github.com/ionic-team/stencil-webpack) to add calcite-components to your bundle.

After installing `calcite-components`, install the plugin as a dev dependency:

```bash
npm install --save-dev @stencil/webpack
```

Then import and call the plugin in `webpack.config.js`:

```js
const stencil = require('@stencil/webpack');
module.exports = {
  ...
  plugins: [
    new stencil.StencilPlugin()
  ]
}
```

Lastly, add the import in your main bundle js (or ts) file:

```js
import "@esri/calcite-components/dist/calcite.js";
```

This will add the initial stencil loader to your bundle, and copy over the actual component code to the output directory you've configured for Webpack. Components will still be lazy-loaded as they are needed. _Note:_ you must use the `.js` file path for the Webpack plugin to work correctly, even if your bundle file is a TypeScript file.

## TypeScript

Stencil provides a full set of typings for all the components in this repo. To make TypeScript aware of these components, just import the library:

```ts
import "@esri/calcite-components";
```

This will provide autocomplete of component names/properties, as well as additional HTML element types:

```ts
// created elements will implicitly have the correct type already
const loader = document.createElement("calcite-loader");
document.body.appendChild(loader);
loader.isActive = true;

// you can also explicitly type an element using the generated types
// the type name will always be formatted like HTML{CamelCaseComponentName}Element
const loader = document.querySelector(".my-loader-element") as HTMLCalciteLoaderElement;
loader.isActive = true;
```

### TypeScript with Preact

For preact applications using TypeScript, you must add an additional file to your `tsconfig.json`:

```
"files": [
  "node_modules/@esri/calcite-components/dist/types/preact.d.ts"
],
```

This allows you to use custom tags and provides auto-complete for calcite-components. See the [Preact + TypeScript example](https://github.com/ArcGIS/calcite-components-examples/tree/master/preact-typescript) for more details.

## Browser Support

<table>
  <thead>
    <tr>
      <th><img src="./img/chrome.svg" alt="Google Chrome" width="80px" /><h4>Chrome</h4></th>
      <th><img src="./img/firefox.svg" alt="Mozilla Firefox" width="80px" /><h4>Firefox</h4></th>
      <th><img src="./img/safari.svg" alt="Safari" width="80px" /><h4>Safari</h4></th>
      <th><img src="./img/edge.svg" alt="Microsoft Edge" width="80px" /><h4>Edge</h4></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4">Last 2 versions ✔</td>
    </tr>
  </tbody>
</table>

## Contributing

We welcome contributions to this project. See [CONTRIBUTING.md](./CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT © 2020 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com
