import * as icons from "@esri/calcite-ui-icons";
import { boolean as booleanKnob } from "@storybook/addon-knobs";

export const darkBackground = [{ name: "Dark", value: "#202020", default: true }];

// the generated readme includes escape characters which actually get rendered, remove them
export const parseReadme = (str) => str.replace(/ \\\| /g, " | ");

// we can get all unique icon names from all size 16 non-filled icons.
export const iconNames = Object.keys(icons)
  .filter((iconName) => iconName.endsWith("16"))
  .map((iconName) => iconName.replace("16", ""));

// custom boolean will start up a knob but only add the prop if it is true
// if you'd insead like `attr="true|false" set the standalone option to false
export const boolean = (prop, value, standalone = true) => {
  const knob = booleanKnob(prop, value);
  const propValue = (standalone && knob) || !standalone ? prop : "";
  const attrValue = standalone ? "" : `="${knob}"`;
  return `${propValue}${attrValue}`;
};
