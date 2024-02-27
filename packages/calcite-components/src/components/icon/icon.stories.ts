import { select } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Icon",
  parameters: { notes: readme },
  ...storyFilters(),
};

const sampleIcon = iconNames.find((item) => item === "arrowRight");

export const simple = (): string => html`
  <calcite-icon
    icon="${select("icon", iconNames, sampleIcon)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-icon>
`;

export const customBaseFontSize = (): string => html`
  <style>
    html {
      font-size: 62.5%;
    }</style
  ><calcite-icon icon="banana" scale="s"></calcite-icon>
  <calcite-icon icon="banana" scale="m"></calcite-icon>
  <calcite-icon icon="banana" scale="l"></calcite-icon>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-icon
    class="calcite-mode-dark"
    dir="rtl"
    icon="${select("icon", iconNames, sampleIcon)}"
    ${boolean("flip-rtl", true)}
  ></calcite-icon>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
