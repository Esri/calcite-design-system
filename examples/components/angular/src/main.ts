import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { setAssetPath } from '@esri/calcite-components';

setAssetPath(window.location.href);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
