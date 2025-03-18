# Angular and TypeScript

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/esri/calcite-design-system/tree/dev/examples/components/angular?file=README.md)

To install dependencies and start the server, run:

```sh
npm install
npm start
```

## Developer info

To install `@esri/calcite-components`, run:

```sh
npm install @esri/calcite-components
```

### Setup components

Import and call `setAssetPath`, which ensures translations, icons, and other required assets are available to Calcite components (more on copying assets below).

```ts
// src/main.ts
import { setAssetPath } from "@esri/calcite-components/dist/components";

setAssetPath(location.href);
```

Next, import the components used in your application:

```ts
// src/app/app.component.ts
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-loader";
import "@esri/calcite-components/dist/components/calcite-slider";
```

Then, import the global Calcite components stylesheet (only do this once):

```css
/* src/styles.css */
@import "@esri/calcite-components/dist/calcite/calcite.css";
```

To use Calcite components in Angular, you **must** add CUSTOM_ELEMENTS_SCHEMA to the `schemas` property:

```ts
// src/app/app.component.ts
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
```

Calcite components can now be used in your application like any other Angular component!

```html
<!-- src/app/app.component.html -->
<calcite-slider min="1" max="100" [value]="sliderValue" (calciteSliderInput)="onSliderInput($event)"></calcite-slider>
```

### Copy the assets

Calcite components' assets need to be copied to the `./public` directory when [using assets](https://developers.arcgis.com/calcite-design-system/get-started/#load-the-assets) locally. This example has a `copy` npm script, which will automatically run after installing dependencies. For example:

```sh
cp -r node_modules/@esri/calcite-components/dist/calcite/assets/ ./public
```
