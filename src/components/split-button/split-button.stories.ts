import { text, select } from "@storybook/addon-knobs";
import { iconNames, boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
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
      appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
      kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
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
      appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
      kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
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
      appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
      kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
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

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button
      appearance="${select("appearance", ["solid", "outline", "outline-fill", "transparent"], "solid")}"
      kind="${select("kind", ["brand", "danger", "inverse", "neutral"], "brand")}"
      scale="${select("size", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      ${boolean("loading", false)}
      ${boolean("disabled", false)}
      primary-icon-start="${select("primary-icon-start", iconNames, iconNames[0])}"
      primary-text="${text("primary-text", "Primary Option")}"
      dropdown-label="${text("dropdown-label", "Additional Options")}"
      dropdown-icon-type="${select("dropdown-icon-type", ["chevron", "caret", "ellipsis", "overflow"], "chevron")}"
      class="calcite-mode-dark"
    >
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  </div>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-split-button disabled>
  <calcite-dropdown-group selection-mode="none">
    <calcite-dropdown-item>Option 2</calcite-dropdown-item>
    <calcite-dropdown-item>Option 3</calcite-dropdown-item>
    <calcite-dropdown-item>Option 4</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-split-button>`;
