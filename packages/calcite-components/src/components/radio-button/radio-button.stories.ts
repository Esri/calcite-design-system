import { select, text } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Radio/Radio Button",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-label layout="inline">
    <calcite-radio-button
      ${boolean("checked", false)}
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      ${boolean("focused", false)}
      name="simple"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="value"
    ></calcite-radio-button>
    ${text("label", "Radio Button")}
  </calcite-label>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-label layout="inline" class="calcite-mode-dark" dir="rtl">
    <calcite-radio-button
      ${boolean("checked", false)}
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      ${boolean("focused", false)}
      name="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="value"
    >
    </calcite-radio-button>
    ${text("label", "Radio Button")}
  </calcite-label>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-radio-button checked disabled></calcite-radio-button>`;

export const theming_TestOnly = (): string =>
  html`<style>
      calcite-radio-button {
        --calcite-radio-button-background-color: orange;
        --calcite-radio-button-border-radius: 50%;
        --calcite-radio-focus-outline-color: red;
        --calcite-radio-button-shadow: 0 0 0 2px blue;
        --calcite-radio-button-size: 20px;
      }
    </style>
    <div>
      <calcite-radio-button></calcite-radio-button>
    </div>
    <div>
      <calcite-radio-button checked></calcite-radio-button>
    </div>
    <div>
      <calcite-radio-button checked disabled></calcite-radio-button>
    </div>
    <div>
      <calcite-radio-button checked focused></calcite-radio-button>
    </div> `;
