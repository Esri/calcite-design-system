# React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

```sh
npm install
npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Calcite Components with React

To install [`calcite-components-react`](https://www.npmjs.com/package/@esri/calcite-components-react), run:

```sh
npm install --save @esri/calcite-components-react
```

This package includes the compatible version of the main component library as a dependency, so no need to install `@esri/calcite-components` separately.

## Use

[Custom Elements](https://stenciljs.com/docs/custom-elements) is the recommended build when using frontend frameworks, such as React. To use this build, you will need to set the path to the `calcite-components` assets. You can either use local assets, which will be explained in a subsequent step, or assets hosted on a CDN. This example uses local assets.

```jsx
import { setAssetPath } from '@esri/calcite-components/dist/components';
// Local assets
setAssetPath(window.location.href);

// CDN hosted assets
// setAssetPath("https://unpkg.com/@esri/calcite-components/dist/calcite/assets");
```

Next, you need to import each component you use from `calcite-components-react`. This will automatically define the custom elements on the browser.

```jsx
import {
  CalciteButton,
  CalciteIcon,
  CalciteSlider
} from '@esri/calcite-components-react';
```

### Import stylesheet

Import the global stylesheet into your app (only do this once):

```js
import '@esri/calcite-components/dist/calcite/calcite.css';
```

### Copy local assets

Some components (icon, date-picker) rely on assets being available at a particular path. If using assets locally, you'll need to copy these over to your public folder. This example has a `copy` npm script which will automatically run after the `install` script.

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
    sliderEl.current.addEventListener('calciteSliderUpdate', onUpdate);
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
