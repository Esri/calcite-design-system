import "./style/index.css";
import App from "./components/app";
import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components";
import { defineCustomElements } from "@esri/calcite-components/dist/loader";

defineCustomElements();

export default App;
