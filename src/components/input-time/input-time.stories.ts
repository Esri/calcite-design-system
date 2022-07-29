import { number, select, text } from "@storybook/addon-knobs";
import { boolean, createSteps, stepStory } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";

export default {
  title: "Components/Controls/Input Time",

  parameters: {
    notes: readme
  }
};

export const LightTheme = (): string => html`
  <calcite-input-time
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    name="${text("name", "light")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "10:37")}"
  >
  </calcite-input-time>
`;

export const DarkTheme = (): string => html`
  <calcite-input-time
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    class="calcite-theme-dark"
    name="${text("name", "dark")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "22:37")}"
  >
  </calcite-input-time>
`;

export const Placement = (): string => html`
  <calcite-input-time
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    name="${text("name", "placement-top")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "10:37")}"
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
  >
  </calcite-input-time>
`;

export const KoreanLocale = stepStory(
  (): string => html`
    <calcite-input-time
      id="reference-element"
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      name="${text("name", "light")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      step="${number("step", 1)}"
      value="${text("value", "10:37")}"
      lang="ko"
    >
    </calcite-input-time>
  `,
  createSteps("calcite-input-time").click("#reference-element").snapshot("Korean Time Input")
);

export const ArabicLocale = stepStory(
  (): string => html`
    <calcite-input-time
      id="reference-element"
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      name="${text("name", "light")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      step="${number("step", 1)}"
      value="${text("value", "10:37")}"
      lang="ar"
      dir="rtl"
    >
    </calcite-input-time>
  `,
  createSteps("calcite-input-time").click("#reference-element").snapshot("Arabic Time Input")
);

DarkTheme.parameters = { themes: themesDarkDefault };

export const disabled = (): string => html`<calcite-input-time disabled></calcite-input-time>`;
