import { createApp } from "vue";
import { setAssetPath } from "@esri/calcite-components";
import App from "./App.vue";

setAssetPath(location.href);

createApp(App).mount("#app");
