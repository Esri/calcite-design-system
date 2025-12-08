import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-date-picker";
import { setAssetPath } from "@esri/calcite-components";

setAssetPath(location.href);

document.getElementById("test").innerHTML = "<div><calcite-date-picker></calcite-date-picker></div>";
