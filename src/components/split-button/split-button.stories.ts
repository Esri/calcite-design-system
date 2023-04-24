import { text, select } from "@storybook/addon-knobs";
import { iconNames, boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Buttons/Split Button",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      active
      appearance="${select("appearance", ["solid", "outline", "clear", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
      scale="${select("size", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      ${boolean("loading", false)}
      ${boolean("disabled", false)}
      primary-icon-start="${select("primary-icon-start", iconNames, iconNames[0])}"
      primary-text="${text("primary-text", "Primary Option")}"
      primary-label="${text("primary-label", "Primary Option")}"
      dropdown-label="${text("dropdown-label", "Additional Options")}"
      dropdown-icon-type="${select("dropdown-icon-type", ["chevron", "caret", "ellipsis", "overflow"], "chevron")}"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

export const iconEnd_TestOnly = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
      scale="${select("size", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      ${boolean("loading", false)}
      ${boolean("disabled", false)}
      primary-icon-end="${select("primary-icon-end", iconNames, iconNames[0])}"
      primary-text="${text("primary-text", "Primary Option")}"
      primary-label="${text("primary-label", "Primary Option")}"
      dropdown-label="${text("dropdown-label", "Additional Options")}"
      dropdown-icon-type="${select("dropdown-icon-type", ["chevron", "caret", "ellipsis", "overflow"], "chevron")}"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

export const iconStartAndIconEnd = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
      scale="${select("size", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      ${boolean("loading", false)}
      ${boolean("disabled", false)}
      primary-icon-start="${select("primary-icon-end", iconNames, iconNames[0])}"
      primary-icon-end="${select("primary-icon-end", iconNames, iconNames[0])}"
      primary-text="${text("primary-text", "Primary Option")}"
      primary-label="${text("primary-label", "Primary Option")}"
      dropdown-label="${text("dropdown-label", "Additional Options")}"
      dropdown-icon-type="${select("dropdown-icon-type", ["chevron", "caret", "ellipsis", "overflow"], "chevron")}"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      appearance="${select("appearance", ["solid", "outline", "clear", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
      scale="${select("size", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      ${boolean("loading", false)}
      ${boolean("disabled", false)}
      primary-icon-start="${select("primary-icon-start", iconNames, iconNames[0])}"
      primary-text="${text("primary-text", "Primary Option")}"
      dropdown-label="${text("dropdown-label", "Additional Options")}"
      dropdown-icon-type="${select("dropdown-icon-type", ["chevron", "caret", "ellipsis", "overflow"], "chevron")}"
      class="calcite-theme-dark"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-split-button disabled>
  <calcite-dropdown-group selection-mode="none">
    <calcite-dropdown-item>Option 2</calcite-dropdown-item>
    <calcite-dropdown-item>Option 3</calcite-dropdown-item>
    <calcite-dropdown-item>Option 4</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-split-button>`;
