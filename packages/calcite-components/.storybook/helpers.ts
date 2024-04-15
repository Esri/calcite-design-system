import * as icons from "@esri/calcite-ui-icons";

// we can get all unique icon names from all size 16 non-filled icons.
export const iconNames = Object.keys(icons)
  .filter((iconName) => iconName.endsWith("16"))
  .map((iconName) => iconName.replace("16", ""))
  .sort((a, b) => {
    const iPrefixedNumberIconNamePattern = /^i(\d)/;
    return a
      .replace(iPrefixedNumberIconNamePattern, "$1")
      .localeCompare(b.replace(iPrefixedNumberIconNamePattern, "$1"));
  });

export { boolean } from "./fake-knobs";
