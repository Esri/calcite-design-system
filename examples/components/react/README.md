# React and TypeScript

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/esri/calcite-design-system/tree/dev/examples/components/react?file=README.md)

This example was bootstrapped with [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project). The example uses [`@esri/calcite-components-react`](https://www.npmjs.com/package/@esri/calcite-components-react), which provides React wrappers for Calcite components.

To install dependencies and start the development server, run:

```sh
npm install
npm run dev
```

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

// CDN hosted assets
// setAssetPath("https://unpkg.com/@esri/calcite-components/dist/calcite/assets");
```

Next, import the components used in your application:

```tsx
// define the custom elements on the browser
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-slider";

// import the React wrapper components
import { CalciteButton, CalciteIcon, CalciteSlider } from "@esri/calcite-components-react";
```

Lastly, import the global Calcite components stylesheet (only do this once):

```ts
import "@esri/calcite-components/dist/calcite/calcite.css";
```

### Copy the assets

Calcite components' assets need to be copied from `node_modules` to your application (unless you use a CDN). This example leverages the [`vite-plugin-static-copy`](https://github.com/sapphi-red/vite-plugin-static-copy) package. Alternatively, you could use a CLI tool to copy the assets on `postinstall`. For example:

```sh
cp -r node_modules/@esri/calcite-components/dist/calcite/assets/* ./public
```

## Why not use the web components directly?

The React wrappers improve the developer experience in TypeScript projects because you'll benefit from code completion, go to definition, increased type safety, and more.

Additionally, React [lacked support](https://github.com/facebook/react/issues/11347) for custom elements until `v19`. For example, with `v18` or below, updating the value of `calcite-slider` on change required saving a ref to the element and adding a listener:

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
