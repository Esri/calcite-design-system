# Angular

This examples use [`@esri/calcite-components-angular`](https://www.npmjs.com/package/@esri/calcite-components-angular), which provides Angular wrappers for Calcite Components.

## Usage

### Install the package

```sh
npm install @esri/calcite-components-angular
```

This package includes the compatible version of the main component library as a dependency, so no need to install `@esri/calcite-components` separately.

### Copy local assets

Calcite Components rely on assets being available at a particular path. If using assets locally, you'll need to copy these over to your `src` directory. This example has a `copy` npm script, which will automatically run after installing dependencies.

```sh
cp -r node_modules/@esri/calcite-components/dist/calcite/assets/ ./src/assets/
```

### Import the stylesheet

Import the global stylesheet into your app (only do this once):

```css
/* src/styles.css */
@import '@esri/calcite-components/dist/calcite/calcite.css';
```

### Define the custom elements

The Angular wrapper components must use [Calcite Component's Distribution build](https://developers.arcgis.com/calcite-design-system/get-started/#distribution):

```ts
// src/main.ts
import { defineCustomElements } from '@esri/calcite-components/dist/loader';
defineCustomElements(window, { resourcesUrl: './assets' });
```

### Use the components

Add `CalciteComponentsModule` to the imports of your Angular component's module file:

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CalciteComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Calcite Components can now be used in your application like any other Angular component!

```html
<!-- app.component.html -->
<calcite-slider
  min="1"
  max="100"
  [value]="sliderValue"
  (calciteSliderInput)="onSliderInput($event)"
></calcite-slider>
```

## License

COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>
