# React 18 and below with TypeScript

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/esri/calcite-design-system/tree/dev/examples/components/react-18-and-below?file=README.md)

This example was bootstrapped with [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project). The example uses [`@esri/calcite-components-react`](https://www.npmjs.com/package/@esri/calcite-components-react), which provides React wrappers for Calcite components.

To install dependencies and start the development server, run:

```sh
npm install
npm run dev
```

## Deprecation Notice

> [!WARNING]
> Calcite Components React is deprecated as of v5.0.

The `@esri/calcite-components-react` package was originally developed for use with React 18 where wrappers were necessary to use custom elements. With React 19's custom element support, these wrappers are no longer needed.

Consider upgrading to React 19+ and using <code>@esri/calcite-components</code> directly. For specific implementation details, refer to the [React 19+ example](../react-19-and-above/README.md).

## Developer info

To install `@esri/calcite-components-react`, run:

```sh
npm install @esri/calcite-components-react
```

This package includes the compatible version of the main component library as a dependency, so no need to install `@esri/calcite-components` separately.

### Setup components

By default, Calcite components use assets hosted on a CDN. If you are hosting assets locally, you can import and use `setAssetPath`. This ensures that translations, icons, and other required assets are available to Calcite components. (More on copying assets below.)

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

// import the React wrapper components
import { CalciteButton, CalciteIcon, CalciteSlider } from "@esri/calcite-components-react";
```

### Copy the assets

Calcite components' assets need to be copied from `node_modules` to your application (unless you use a CDN). This example leverages the [`vite-plugin-static-copy`](https://github.com/sapphi-red/vite-plugin-static-copy) package. Alternatively, you could use a CLI tool to copy the assets on `postinstall`. For example:

```sh
cp -r node_modules/@esri/calcite-components/dist/cdn/assets/* ./public
```

## Why not use the web components directly?

With React 19+'s native support for custom elements, you can now use <code>@esri/calcite-components</code> directly. For specific implementation details, refer to the [React 19+ example](../react-19-and-above/README.md).

React 18 and earlier versions use a synthetic event system, where the custom events emitted from Calcite Components won't function with JSX in React. For example, if using standard web components to update a value when changes occur on the `<calcite-slider>`, you will need to save a reference to the element and add a listener:

```jsx
const sliderEl = useRef(null);
const [sliderValue, setSliderValue] = useState(50);

function onUpdate(event) {
  setSliderValue(event.target.value);
}

useEffect(() => {
  sliderEl.current.addEventListener("calciteSliderUpdate", onUpdate);
}, [sliderEl]);
```

Using `@esri/calcite-components-react`, these events are connected for you:

```jsx
const [sliderValue, setSliderValue] = useState(50);
<CalciteSlider onCalciteSliderUpdate={(e) => setSliderValue(e.target.value)} />;
```
