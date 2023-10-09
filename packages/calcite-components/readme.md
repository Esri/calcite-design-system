[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com/)
[![npm package](https://img.shields.io/npm/v/@esri/calcite-components?style=flat-square&color=007AC2)](https://www.npmjs.com/package/@esri/calcite-components)
[![minified size](https://img.shields.io/bundlephobia/min/@esri/calcite-components?style=flat-square&color=D83020)](https://bundlephobia.com/package/@esri/calcite-components)
[![downloads per month](https://img.shields.io/npm/dm/@esri/calcite-components?style=flat-square&color=35AC46)](https://www.npmjs.com/package/@esri/calcite-components)
[![commits per month](https://img.shields.io/github/commit-activity/m/esri/calcite-components?style=flat-square&color=EDD317)](https://github.com/Esri/calcite-design-system/graphs/contributors)

# Calcite Components

Calcite Components, part of Esri's Calcite Design System, is a rich library of flexible, framework-agnostic web components for building applications. View the [documentation](https://developers.arcgis.com/calcite-design-system/components/) for component descriptions, examples, and API reference, which includes properties, slots, styles, and theming.

## Use the CDN

The most common approach for loading Calcite Components is to use the version hosted on the CDN. The components can be loaded via `<script>` and `<link>` tags in the head of your HTML document:

<!-- x-release-please-start-version -->

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@esri/calcite-components@1.9.1/dist/calcite/calcite.esm.js"
></script>
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.jsdelivr.net/npm/@esri/calcite-components@1.9.1/dist/calcite/calcite.css"
/>
```

<!-- x-release-please-end -->

Once these tags are added, components can be used like any other HTML element. Only components that are used in the application will be loaded.

## Use the NPM package

Calcite Components is also provided as an [NPM package](https://www.npmjs.com/package/@esri/calcite-components). To get started, first install the package, then follow the steps below. Alternatively, you can find examples using different frameworks and build tools [here](https://github.com/Esri/calcite-components-examples).

```sh
npm install @esri/calcite-components
```

### 1. Build

Choose one of the two builds provided by Calcite Components.

#### Custom Elements

[Custom Elements](https://stenciljs.com/docs/custom-elements) is the recommended build when leveraging a frontend framework. To use this build, you will need to set the path to Calcite Components' assets. You can either use local assets, which will be explained in a subsequent step, or assets hosted on the CDN.

```jsx
import { setAssetPath } from "@esri/calcite-components/dist/components";
// CDN hosted assets
setAssetPath("https://cdn.jsdelivr.net/npm/@esri/calcite-components/dist/calcite/assets");

// Local assets
// setAssetPath(PATH); // PATH depends on framework, more info below
```

Next, you need to import each component you use from the custom elements build. This will automatically define the custom elements on the window.

```jsx
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-slider";
```

#### Distribution

When using the [Distribution](https://stenciljs.com/docs/distribution) build, you'll need to define the custom elements on the window. You can also choose between local and CDN hosted assets.

```jsx
import { defineCustomElements } from "@esri/calcite-components/dist/loader";
// CDN hosted assets
defineCustomElements(window, {
  resourcesUrl: "https://cdn.jsdelivr.net/npm/@esri/calcite-components/dist/calcite/assets",
});

// Local assets
// defineCustomElements(window);
```

Since you defined the custom elements on the window, you do not need to import individual components.

### 2. Assets

Some components, such as `calcite-icon` and `calcite-date-picker`, rely on assets being available at a particular path. As mentioned, with the NPM package you have the option to provide a local path or the URL to the assets hosted on the CDN. Using the CDN hosted assets can help decrease on disk build size.

To use the assets locally, they need to be copied using a build tool or NPM script. The directory for the local assets must be named `assets`, which eases the copying process. For example, `/public/calcite/assets` will work, however `/public/calcite-assets` will not.

The Calcite Components [examples repo](https://github.com/Esri/calcite-components-examples) demonstrates using local assets in a variety of JavaScript frameworks and build tools. Each example has a README with a framework or build tool specific explanation.

```sh
cp -r node_modules/@esri/calcite-components/dist/calcite/assets/* ./public/assets/
```

### 3. Styles

Finally, load the Cascading Style Sheet (CSS). This is also dependent on your framework or build tool, however in many cases it can be imported in JavaScript:

```js
import "@esri/calcite-components/dist/calcite/calcite.css";
```

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
loader.active = true;

// you can also explicitly type an element using the generated types
// the type name will always be formatted like HTML{CamelCaseComponentName}Element
const loader = document.querySelector(".my-loader-element") as HTMLCalciteLoaderElement;
loader.active = true;
```

## `@stencil/core` Version

When using Stencil, make sure the `@stencil/core` version in your project matches the one used by Calcite Components. You may run into type errors if the `@stencil/core` versions are different. You can install the same Stencil version used by `@esri/calcite-components`:

```bash
npm install @stencil/core@$(npm view @esri/calcite-components dependencies["@stencil/core"])
```

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

COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>
