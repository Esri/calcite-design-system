# Calcite Components Angular

A set of Angular components that wrap [Calcite Components](https://developers.arcgis.com/calcite-design-system/components/). An application using this package is provided in the [`calcite-components-examples`](https://github.com/Esri/calcite-components-examples) repo.

## Usage

The following is an outline of the steps required to use `@esri/calcite-components-angular` in an application. See the [example](https://github.com/Esri/calcite-components-examples/tree/main/angular) for a complete application.

### Install the packages

Install the Angular components along with [`@esri/calcite-components`](https://www.npmjs.com/package/@esri/calcite-components):

```sh
npm install @esri/calcite-components @esri/calcite-components-angular
```

Make sure the versions of the two packages remain the same when updating your dependencies.

### Copy local assets

Calcite Components rely on assets being available at a particular path. If using assets locally, you'll need to copy these over to your `src` directory. This example has a `copy` npm script, which will automatically run after installing dependencies.

```sh
cp -r node_modules/@esri/calcite-components/dist/calcite/assets/ ./src/assets/
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

Add `CalciteComponentsModule` to the imports of your Angular component's module file:

```ts
// src/app/app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CalciteComponentsModule } from "@esri/calcite-components-angular";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CalciteComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Calcite Components can now be used in your application like any other Angular component!

```html
<!-- app.component.html -->
<calcite-slider min="1" max="100" [value]="sliderValue" (calciteSliderInput)="onSliderInput($event)"></calcite-slider>
```

## Contributing

We welcome contributions to this project. See the main [calcite-components CONTRIBUTING.md](../../../../CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT © 2021 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>
