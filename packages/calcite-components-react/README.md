# Calcite Components React

A set of React components that wrap [Calcite Components](https://developers.arcgis.com/calcite-design-system/components/). An application using this package is provided in the [`calcite-components-examples`](https://github.com/Esri/calcite-components-examples) repo.

## Installation

```sh
npm install --save @esri/calcite-components-react
```

This package includes the compatible version of the main component library as a dependency, so no need to install `@esri/calcite-components` separately.

## Choose a build

There are two builds that are provided by the standard `calcite-components` package.

### Custom Elements build

[Custom Elements](https://stenciljs.com/docs/custom-elements) is the recommended build when using frontend frameworks, such as React. To use this build, you will need to set the path to the `calcite-components` assets. You can either use local assets, which will be explained in a subsequent step, or assets hosted on a CDN.

```jsx
import { setAssetPath } from "@esri/calcite-components/dist/components";
// Local assets
setAssetPath(window.location.href);

// CDN hosted assets
// setAssetPath("https://unpkg.com/@esri/calcite-components/dist/calcite/assets");
```

Next, you need to import each component you use from the standard `calcite-component` package's custom elements build. This will automatically define the custom elements on the window. Then import the same components from `calcite-components-react`.

```jsx
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-slider";
import { CalciteButton, CalciteIcon, CalciteSlider } from "@esri/calcite-components-react";
```

### Dist build

When using the [Dist](https://stenciljs.com/docs/distribution) build, you'll need to manually define the custom elements on the window. You can also choose between local and CDN hosted assets.

```jsx
import { defineCustomElements } from "@esri/calcite-components/dist/loader";
// Local assets
defineCustomElements(window);

// CDN hosted assets
// defineCustomElements(window, {
//   resourcesUrl: "https://unpkg.com/@esri/calcite-components/dist/calcite/assets"
// });
```

Since you manually defined the custom elements on the window, you only need to import the individual components from `calcite-components-react`.

```jsx
import { CalciteButton, CalciteIcon, CalciteSlider } from "@esri/calcite-components-react";
```

## Import stylesheet

Import the global stylesheet into your app (only do this once):

```js
import "@esri/calcite-components/dist/calcite/calcite.css";
```

## Copy Assets

Some components (icon, date-picker) rely on assets being available at a particular path. If using assets locally, you'll need to copy these over to your public folder. Something like:

```sh
cp -r node_modules/@esri/calcite-components/dist/calcite/assets/* ./public/assets/
```

## Why not just use the web components directly?

Because React uses a synthetic event system, the custom events emitted from calcite components won't work with JSX in React. For example, say you want to update some value when the `calcite-slider` component changes. When using the standard web components, you need to save a ref to the element, and add a listener:

```jsx
const sliderEl = useRef(null);
const [sliderValue, setSliderValue] = useState(50);

function onUpdate(event) {
  setSliderValue(event.target.value);
}

// need to access the dom node to set custom event listeners for props that aren't strings / numbers
// https://stenciljs.com/docs/react#properties-and-events
useEffect(
  (_) => {
    sliderEl.current.addEventListener("calciteSliderUpdate", onUpdate);
  },
  [sliderEl]
);
```

Using `calcite-components-react`, these events are connected for you:

```jsx
const [sliderValue, setSliderValue] = useState(50);
<CalciteSlider onCalciteSliderUpdate={(e) => setSliderValue(e.target.value)} />;
```

If you're using TypeScript, you'll also get increased type safety for your event listeners, props, etc.

## Contributing

We welcome contributions to this project. See the main [calcite-components CONTRIBUTING.md](../../../../CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT © 2021 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>
