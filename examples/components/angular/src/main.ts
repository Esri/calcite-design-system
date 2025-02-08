import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { setAssetPath } from '@esri/calcite-components/dist/components';

setAssetPath(window.location.href);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
