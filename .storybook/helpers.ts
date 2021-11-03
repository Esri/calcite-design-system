import * as icons from "@esri/calcite-ui-icons";
import { boolean as booleanKnob } from "@storybook/addon-knobs";
import { Steps } from "screener-storybook/src/screener";
import { THEMES } from "../src/utils/resources";
import { ThemeName } from "../src/components/interfaces";

// we can get all unique icon names from all size 16 non-filled icons.
export const iconNames = Object.keys(icons)
  .filter((iconName) => iconName?.endsWith("16"))
  .map((iconName) => iconName?.replace("16", ""));

// custom boolean will start up a knob but only add the prop if it is true
// if you'd insead like `attr="true|false" set the standalone option to false
export const boolean = (prop, value, standalone = true) => {
  const knob = booleanKnob(prop, value);
  const propValue = (standalone && knob) || !standalone ? prop : "";
  const attrValue = standalone ? "" : `="${knob}"`;
  return `${propValue}${attrValue}`;
};

export interface Story {
  (): string;
  decorators?: ((Story: Story) => DocumentFragment)[];
}

export const setKnobs = ({ story, knobs }: { story: string; knobs: { name: string; value: string }[] }) => {
  return knobs
    ? `window.location.href = "?path=/story/${story}${knobs
        .filter((theme) => theme.name && theme.value !== undefined)
        .map(({ name, value }) => `&knob-${name}=${value}`)
        .join("")}"`
    : "";
};

export const setTheme = (value: ThemeName) => `${
  THEMES
    ? THEMES.filter((theme) => theme.name && theme.className)
        .map((theme) => `document.body.classList.toggle('${theme.className}', ${(theme.name === value).toString()});`)
        .join("")
    : ""
}
`;

export const createSteps = (componentSelector: string): Steps => {
  return new Steps().wait(`${componentSelector}[calcite-hydrated]`);
};

export const stepStory = (story: Story, steps: Steps): Story => {
  const stepsDecorator = (Story: Story) => {
    const node = document.createRange().createContextualFragment(Story());
    (node as any).steps = steps.end();
    return node;
  };

  if (story.decorators) {
    story.decorators.push(stepsDecorator);
  } else {
    story.decorators = [stepsDecorator];
  }

  return story;
};
