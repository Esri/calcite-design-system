import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { defineCustomElements } from "@esri/calcite-components/dist/loader";

defineCustomElements(window, { resourcesUrl: "./assets" });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((error: Error) => console.error(error));
