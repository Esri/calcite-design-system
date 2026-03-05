# Calcite Components React

This package provides React wrappers for [Calcite components](https://developers.arcgis.com/calcite-design-system/components/). Refer to the [React example](https://github.com/Esri/calcite-design-system/tree/dev/examples/components/react-18-and-below) for a minimal application using this package.

## Deprecation Notice

> [!WARNING]
> Calcite Components React is deprecated as of v5.0.

The `@esri/calcite-components-react` package was originally developed for use with React 18 where wrappers were necessary to use custom elements. With [React 19's custom element support](https://react.dev/blog/2024/12/05/react-19#support-for-custom-elements), these wrappers are no longer needed.

Consider upgrading to React 19+ and using <code>@esri/calcite-components</code> directly.

## Installation

```sh
npm install @esri/calcite-components-react
```

This package includes the compatible version of the standard `@esri/calcite-components` package, so you do not need to install it separately.

## Choose a build

There are two builds provided by the standard components package.

### Custom Elements build

[Custom Elements](developers.arcgis.com/calcite-design-system/get-started#custom-elements) is the recommended build when using frontend frameworks, such as React. Assets from the CDN are used by default, but you can specify a local asset path with `setAssetPath`. Additional setup for using local assets will be explained in a subsequent step.

```jsx
import { setAssetPath } from "@esri/calcite-components";

setAssetPath(window.location.href);
```

Next, you need to import each component you use from the standard components package's custom elements build. This will automatically define the custom elements on the window. Then, import the same components from `@esri/calcite-components-react`.

```jsx
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-slider";
import { CalciteButton, CalciteIcon, CalciteSlider } from "@esri/calcite-components-react";
```

### Dist build

When using the [Dist](developers.arcgis.com/calcite-design-system/get-started#distribution) build, you'll need to manually define the custom elements on the window:

```jsx
import { defineCustomElements } from "@esri/calcite-components/dist/loader";

defineCustomElements();
```

Since you manually defined the custom elements on the window, you only need to import the individual components from `@esri/calcite-components-react`.

```jsx
import { CalciteButton, CalciteIcon, CalciteSlider } from "@esri/calcite-components-react";
```

## Copy Assets

Some components (icon, date-picker) rely on assets being available at a particular path. If using assets locally, you'll need to copy these over to your public folder. Something like:

```sh
cp -r node_modules/@esri/calcite-components/dist/cdn/assets/* ./public/assets/
```

## Why not just use the web components directly?

With React 19+'s native support for custom elements, you can now use <code>@esri/calcite-components</code> directly. See the [Calcite Components React Deprecation Notice](#deprecation-notice) for additional information.

React 18 and earlier versions use a synthetic event system, where the custom events emitted from Calcite Components won't function with JSX in React. For example, if using standard web components to update a value when changes occur on the `<calcite-slider>`, you will need to save a reference to the element and add a listener:

```jsx
const sliderEl = useRef(null);
const [sliderValue, setSliderValue] = useState(50);

function onUpdate(event) {
  setSliderValue(event.target.value);
}

// need to access the DOM node to set custom event listeners for props that aren't strings or numbers
// lit.dev/docs/frameworks/react#why-are-wrappers-needed
useEffect(
  (_) => {
    sliderEl.current.addEventListener("calciteSliderUpdate", onUpdate);
  },
  [sliderEl],
);
```

Using `@esri/calcite-components-react`, these events are connected for you:

```jsx
const [sliderValue, setSliderValue] = useState(50);
<CalciteSlider onCalciteSliderUpdate={(e) => setSliderValue(e.target.value)} />;
```

If you're using TypeScript, you'll also get increased type safety for your event listeners, props, etc.

## Contributing

We welcome contributions to this project. See the [CONTRIBUTING.md](https://github.com/Esri/calcite-design-system/blob/dev/CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT Esri - <https://js.arcgis.com/5.0/LICENSE.txt>

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, refer to [Calcite's licensing](https://developers.arcgis.com/calcite-design-system/resources/licensing) and contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>

## Third-party notices

See [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).
