# React and TypeScript

This project was bootstrapped with [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

To start the development server, run the following commands from the example's directory:

```sh
npm install
npm run dev
```

## Calcite Components with React

To install [`@esri/calcite-components-react`](https://www.npmjs.com/package/@esri/calcite-components-react), run:

```sh
npm install @esri/calcite-components-react
```

This package includes the compatible version of the main component library as a dependency, so no need to install `@esri/calcite-components` separately.

## Use

[Custom Elements](https://stenciljs.com/docs/custom-elements) is the recommended build when using frontend frameworks, such as React. To use this build, you will need to set the path to the `calcite-components` assets. You can either use local assets, which will be explained in a subsequent step, or assets hosted on a CDN. This example uses local assets.

```jsx
import { setAssetPath } from "@esri/calcite-components/dist/components";
// Local assets
setAssetPath(window.location.href);

// CDN hosted assets
// setAssetPath("https://unpkg.com/@esri/calcite-components/dist/calcite/assets");
```

Next, import the components used in your application:

```jsx
// define the custom elements on the browser
import "@esri/calcite-components/dist/components/calcite-button.js";
import "@esri/calcite-components/dist/components/calcite-icon.js";
import "@esri/calcite-components/dist/components/calcite-slider.js";
// import the React wrapper components
import {
  CalciteButton,
  CalciteIcon,
  CalciteSlider,
} from "@esri/calcite-components-react";
```

### Import stylesheet

Import the global stylesheet into your app (only do this once):

```js
import "@esri/calcite-components/dist/calcite/calcite.css";
```

### Copy local assets

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
