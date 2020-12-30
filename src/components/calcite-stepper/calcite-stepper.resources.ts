import * as CSS from "csstype";

const STYLES: CSS.Properties = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  width: "100%",
  minWidth: "100%"
};

export const IESTYLES = JSON.stringify(STYLES)
  .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
  .replace(/[,]/g, ";")
  .replace(/["{}]/g, "")
  .toLowerCase();
