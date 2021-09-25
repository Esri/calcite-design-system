import { boolean as storybookBoolean, select, text } from "@storybook/addon-knobs";
import { html } from "../../tests/utils";
import { boolean, createSteps, stepStory, setTheme, setKnobs } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";

export default {
  title: "Components/Buttons/Action",
  parameters: {
    notes: readme
  }
};

const { appearance, scale } = ATTRIBUTES;

export const Default = stepStory(
  (): string => html`
    <calcite-action
      active="${boolean("active", false)}"
      disabled="${boolean("disabled", false)}"
      icon="${text("icon", "beaker")}"
      indicator="${boolean("indicator", false)}"
      label="${text("label", "Label")}"
      loading="${storybookBoolean("loading", false)}"
      placement="${select("placement", appearance.values, appearance.defaultValue)}"
      scale="${select("scale", scale.values, scale.defaultValue)}"
      text="${text("text", "Text")}"
      text-enabled="${boolean("text-enabled", false)}"
    >
    </calcite-action>
  `,
  createSteps("calcite-action")
    // Default
    .snapshot("Default")
);
