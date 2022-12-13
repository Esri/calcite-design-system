import * as icons from "@esri/calcite-ui-icons";
import { boolean as booleanKnob } from "@storybook/addon-knobs";
import { THEMES } from "../src/utils/resources";
import { ThemeName } from "../src/components/interfaces";
import { Parameters } from "@storybook/api";

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

export interface Story {
  (): string;
  decorators?: ((Story: Story) => DocumentFragment)[];
  parameters?: Parameters;
}

export const setKnobs = ({ story, knobs }: { story: string; knobs: { name: string; value: string }[] }) => {
  return `window.location.href = "?path=/story/${story}${knobs
    .map(({ name, value }) => `&knob-${name}=${value}`)
    .join("")}"`;
};

export const setTheme = (value: ThemeName) => `${THEMES.map(
  (theme) => `document.body.classList.toggle('${theme.className}', ${(theme.name === value).toString()});`
).join("")}
`;

export const toggleCentered: string = `document.body.classList.toggle('sb-main-centered');`;

/**
 * This helps create different storybook builds for internal and screenshot test environments
 */
export function storyFilters(): {
  excludeStories: RegExp | string[];
} {
  return {
    excludeStories: process.env.STORYBOOK_SCREENSHOT_TEST_BUILD ? /.*_NoTest$/ : /.*_TestOnly$/
  };
}
