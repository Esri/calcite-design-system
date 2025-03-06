import "./style/index.css";
import App from "./components/app";
import "@esri/calcite-components/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components";
import { defineCustomElements } from "@esri/calcite-components/loader";

setAssetPath(window.location.href);
defineCustomElements();

export default App;
