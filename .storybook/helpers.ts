import * as icons from "@esri/calcite-ui-icons";
import { boolean as booleanKnob } from "@storybook/addon-knobs";
import { Step } from "screener-storybook/src/screener";

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

export interface Story {
  (): string;
  decorators?: ((Story: Story) => DocumentFragment)[];
}

export const stepStory = (story: Story, steps: Step[]): Story => {
  const stepsDecorator = (Story: Story) => {
    const node = document.createRange().createContextualFragment(Story());
    (node as any).steps = steps;
    return node;
  };

  if (story.decorators) {
    story.decorators.push(stepsDecorator);
  } else {
    story.decorators = [stepsDecorator];
  }

  return story;
};
