# Calcite Components React

A set of React components that wrap [Calcite Components](https://esri.github.io/calcite-components/).

## Installation

```
npm install --save @esri/calcite-components-react
```

This package includes the compatible version of the main component library as a dependency, so no need to install `@esri/calcite-components` separately.

## Use

Much like using the standard calcite-components package, you'll need to define the elements on the window first:

```jsx
import { applyPolyfills, defineCustomElements } from "@esri/calcite-components/dist/loader";

// if you're supporting older browsers, apply polyfills
applyPolyfills().then(() => {
  // define the custom tags on the window
  defineCustomElements(window);
  // after these are defined, render your app as you would normally
  ReactDOM.render(<App />, document.getElementById("root"));
});
```

To ensure the theme works, import the global stylesheet into your app (only do this once):

```js
import "@esri/calcite-components/dist/calcite/calcite.css";
```

Then import any components you'd like to use:

```js
import { CalciteAvatar, CalciteButton, CalciteIcon, CalciteSlider } from "@esri/calcite-components-react";
```

## Static Assets

Some components (icon, date-picker) rely on assets being available at a particular path. You'll need to copy these over to your public folder for them to work properly. Something like:

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

// need to access the dom node to set custom event listeners or props that aren't strings / numbers
// https://stenciljs.com/docs/react#properties-and-events
useEffect(
  (_) => {
    sliderEl.current.addEventListener("calciteSliderUpdate", onUpdate);
  },
  [sliderEl]
);
```

Using calcite-components-react, these events are connected for you:

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

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com
