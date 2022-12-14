import { text, select } from "@storybook/addon-knobs";
import { iconNames, boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Buttons/Button",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-button
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    width="${select("width", ["auto", "half", "full"], "auto")}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

export const withIconStart = (): string => html`
  <calcite-button
    alignment="${select(
      "alignment",
      ["start", "end", "center", "space-between", "icon-start-space-between", "icon-end-space-between"],
      "center"
    )}"
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

withIconStart.storyName = "With icon-start";

export const withIconEnd = (): string => html`
  <calcite-button
    alignment="${select(
      "alignment",
      ["start", "end", "center", "space-between", "icon-start-space-between", "icon-end-space-between"],
      "center"
    )}"
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    width="${select("width", ["auto", "half", "full"], "auto")}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

withIconEnd.storyName = "With icon-end";

export const withIconStartAndIconEnd = (): string => html`
  <calcite-button
    alignment="${select(
      "alignment",
      ["start", "end", "center", "space-between", "icon-start-space-between", "icon-end-space-between"],
      "center"
    )}"
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    width="${select("width", ["auto", "half", "full"], "auto")}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

withIconStartAndIconEnd.storyName = "With icon-start and icon-end";

export const setWidthContainer = (): string => html`
  <div style="width: 480px; max-width: 100%; background-color: #fff">
    <calcite-button
      width="${select("width", ["auto", "half", "full"], "auto")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
    >
      ${text("text", "button text here")}
    </calcite-button>
  </div>
`;

export const disabled_TestOnly = (): string => html`<calcite-button disabled>disabled</calcite-button>`;

export const withIconStartEmpty_TestOnly = (): string => html` <calcite-button icon-start> Button </calcite-button>`;

withIconStartEmpty_TestOnly.storyName = "With icon-start set to empty";

export const withIconEndEmpty_TestOnly = (): string => html` <calcite-button icon-end> Button </calcite-button>`;

withIconEndEmpty_TestOnly.storyName = "With icon-end set to empty";

export const sideBySide_TestOnly = (): string => html`
  <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">
    <calcite-button
      width="half"
      appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "outline")}"
      color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    >
      ${text("text", "Back")}
    </calcite-button>
    <calcite-button
      width="half"
      appearance="${select("appearance-2", ["solid", "clear", "outline", "transparent"], "solid")}"
      color="${select("color-2", ["blue", "red", "neutral", "inverse"], "blue")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
    >
      ${text("text-2", "Some long string")}
    </calcite-button>
  </div>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <calcite-button
    class="calcite-theme-dark"
    dir="rtl"
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };
