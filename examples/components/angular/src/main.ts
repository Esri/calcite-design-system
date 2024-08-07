import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@esri/calcite-components/dist/loader';

defineCustomElements(window, {
  resourcesUrl: 'https://js.arcgis.com/calcite-components/2.11.1/assets',
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
