import * as icons from "@esri/calcite-ui-icons";

export const darkBackground = [{ name: 'Dark', value: '#202020', default: true }]

// the generated readme includes escape characters which actually get rendered, remove them
export const parseReadme = (str) => str.replace(/ \\\| /g, ' | ');

// we can get all unique icon names from all size 16 non-filled icons.
export const iconNames = Object.keys(icons)
  .filter(iconName => iconName.endsWith("16"))
  .map(iconName => iconName.replace("16", ""));
