# Angular

This examples use [`@esri/calcite-components-angular`](https://www.npmjs.com/package/@esri/calcite-components-angular), which provides Angular wrappers for Calcite components.

## Usage

### Install the package

```sh
npm install @esri/calcite-components-angular
```

This package includes the compatible version of the main component library as a dependency, so no need to install `@esri/calcite-components` separately.

### Copy local assets

Calcite components' assets need to be copied to the `./public` directory when [using assets](https://developers.arcgis.com/calcite-design-system/get-started/#load-the-assets) locally. This example has a `copy` npm script, which will automatically run after installing dependencies. For example:

```sh
cp -r node_modules/@esri/calcite-components/dist/calcite/assets/ ./public
```

### Import the stylesheet

Import the global stylesheet into your app (only do this once):

```css
/* src/styles.css */
@import "@esri/calcite-components/dist/calcite/calcite.css";
```

### Define the custom elements

The Angular wrapper components must use [Calcite Component's Distribution build](https://developers.arcgis.com/calcite-design-system/get-started/#distribution):

```ts
// src/main.ts
import { defineCustomElements } from "@esri/calcite-components/dist/loader";
defineCustomElements(window, { resourcesUrl: "./assets" });
```

### Use the components

Add `CalciteComponentsModule` to the imports of the Angular component file:

```ts
// src/app/app.component.ts
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, CalciteComponentsModule, RouterOutlet],
  styleUrls: ['./app.component.css'],
})
```

Calcite Components can now be used in your application like any other Angular component!

```html
<!-- app.component.html -->
<calcite-slider min="1" max="100" [value]="sliderValue" (calciteSliderInput)="onSliderInput($event)"></calcite-slider>
```

## License

COPYRIGHT © 2023-2024 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>
