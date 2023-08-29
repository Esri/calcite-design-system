import { number, select, text } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";

export default {
  title: "Components/Controls/Time/Input Time Picker",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-input-time-picker
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    name="${text("name", "simple")}"
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "10:37")}"
  >
  </calcite-input-time-picker>
`;

export const disabled_TestOnly = (): string =>
  html`<calcite-input-time-picker disabled scale="l" icon step="1" value="01:02"></calcite-input-time-picker>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-input-time-picker
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    class="calcite-mode-dark"
    name="${text("name", "dark")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "22:37")}"
  >
  </calcite-input-time-picker>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const open_TestOnly = (): string => html`
  <calcite-input-time-picker
    name="${text("name", "placement-top")}"
    value="${text("value", "10:37")}"
    ${boolean("open", true)}
  >
  </calcite-input-time-picker>
`;

export const koreanLocale_TestOnly = (): string => html`
  <calcite-input-time-picker
    id="reference-element"
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    name="${text("name", "light")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "10:37")}"
    lang="ko"
    open
  >
  </calcite-input-time-picker>
`;

export const arabicLocaleNumberingSystem_TestOnly = (): string => html`
  <calcite-input-time-picker
    id="reference-element"
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    name="${text("name", "light")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "1:33:7")}"
    lang="ar"
    numbering-system="arab"
    dir="rtl"
    open
  >
  </calcite-input-time-picker>
`;

export const readOnlyHasNoDropdownAffordance_TestOnly = (): string => html`
  <calcite-input-time-picker read-only value="10:37"></calcite-input-time-picker>
`;
