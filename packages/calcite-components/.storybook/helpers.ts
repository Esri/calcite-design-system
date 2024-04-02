import * as icons from "@esri/calcite-ui-icons";
import { boolean as booleanKnob } from "./fake-knobs";

// we can get all unique icon names from all size 16 non-filled icons.
export const iconNames = Object.keys(icons)
  .filter((iconName) => iconName.endsWith("16"))
  .map((iconName) => iconName.replace("16", ""));

// custom boolean will start up a knob but only add the prop if it is true
// if you'd instead like `attr="true|false" set the standalone option to false
export const boolean = (prop, value, standalone = true) => {
  const knob = booleanKnob(prop, value);
  const propValue = (standalone && knob) || !standalone ? prop : "";
  const attrValue = standalone ? "" : `="${knob}"`;
  return `${propValue}${attrValue}`;
};

/**
 * This helps create different storybook builds for internal and screenshot test environments
 */
export function storyFilters(): {
  excludeStories: RegExp | string[];
} {
  return {
    // allow all for now as Storybook v8 does not support dynamic story filtering
    excludeStories: [],
  };
}
