# Angular

This examples use [`@esri/calcite-components-angular`](https://www.npmjs.com/package/@esri/calcite-components-angular), which provides Angular wrappers for Calcite components.

To install dependencies and start the server, run:

```sh
npm install
npm start
```

## Developer info

To install `@esri/calcite-components-angular`, run:

```sh
npm install @esri/calcite-components-angular
```

This package includes the compatible version of the main component library as a dependency, so no need to install `@esri/calcite-components` separately.

### Setup components

The Angular wrapper components must use Calcite component's [distribution build](https://developers.arcgis.com/calcite-design-system/get-started/#distribution). First, define the components, specifying the path to the assets:

```ts
// src/main.ts
import { defineCustomElements } from "@esri/calcite-components/dist/loader";
defineCustomElements(window, { resourcesUrl: "./assets" });
```

To use Calcite components, add `CalciteComponentsModule` to the `imports`:

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

Calcite components can now be used in your application like any other Angular component!

```html
<!-- app.component.html -->
<calcite-slider min="1" max="100" [value]="sliderValue" (calciteSliderInput)="onSliderInput($event)"></calcite-slider>
```

Lastly, import the global Calcite components stylesheet (only do this once):

```css
/* src/styles.css */
@import "@esri/calcite-components/dist/calcite/calcite.css";
```

### Copy the assets

Calcite components' assets need to be copied to the `./public` directory when [using assets](https://developers.arcgis.com/calcite-design-system/get-started/#load-the-assets) locally. This example has a `copy` npm script, which will automatically run after installing dependencies. For example:

```sh
cp -r node_modules/@esri/calcite-components/dist/calcite/assets/ ./public
```
