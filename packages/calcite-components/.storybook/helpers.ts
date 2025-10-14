import * as icons from "@esri/calcite-ui-icons";
import { IconName } from "../src/components/icon/interfaces";

// we can get all unique icon names from all size 16 non-filled icons.
export const iconNames: IconName[] = Object.keys(icons)
  .filter((iconName) => iconName.endsWith("16"))
  .map((iconName) => iconName.replace("16", "") as IconName)
  .sort((a, b) => {
    const iPrefixedNumberIconNamePattern = /^i(\d)/;
    return a
      .replace(iPrefixedNumberIconNamePattern, "$1")
      .localeCompare(b.replace(iPrefixedNumberIconNamePattern, "$1"));
  });
