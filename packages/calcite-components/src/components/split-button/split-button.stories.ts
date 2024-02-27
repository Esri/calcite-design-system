import { text, select } from "@storybook/addon-knobs";
import { iconNames, boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Buttons/Split Button",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
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

export const allWidths_TestOnly = (): string => html`
  <div style="width:70vw;">
    <calcite-split-button primary-text="auto" width="auto">
      <calcite-dropdown-group selection-mode="none" group-title="Veggies">
        <calcite-dropdown-item>Pea</calcite-dropdown-item>
        <calcite-dropdown-item>Parsnip</calcite-dropdown-item>
        <calcite-dropdown-item>Radish</calcite-dropdown-item>
        <calcite-dropdown-item>Tomato</calcite-dropdown-item>
        <calcite-dropdown-item>Rutabaga</calcite-dropdown-item>
        <calcite-dropdown-item>Bean</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
    <calcite-split-button primary-text="half width" width="half">
      <calcite-dropdown-group selection-mode="none" group-title="Veggies">
        <calcite-dropdown-item>Pea</calcite-dropdown-item>
        <calcite-dropdown-item>Parsnip</calcite-dropdown-item>
        <calcite-dropdown-item>Radish</calcite-dropdown-item>
        <calcite-dropdown-item>Tomato</calcite-dropdown-item>
        <calcite-dropdown-item>Rutabaga</calcite-dropdown-item>
        <calcite-dropdown-item>Bean</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
    <calcite-split-button primary-text="full width" width="full">
      <calcite-dropdown-group selection-mode="none" group-title="Veggies">
        <calcite-dropdown-item>Pea</calcite-dropdown-item>
        <calcite-dropdown-item>Parsnip</calcite-dropdown-item>
        <calcite-dropdown-item>Radish</calcite-dropdown-item>
        <calcite-dropdown-item>Tomato</calcite-dropdown-item>
        <calcite-dropdown-item>Rutabaga</calcite-dropdown-item>
        <calcite-dropdown-item>Bean</calcite-dropdown-item>
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

export const disabled_TestOnly = (): string => html`
  <calcite-split-button disabled>
    <calcite-dropdown-group selection-mode="none">
      <calcite-dropdown-item>Option 2</calcite-dropdown-item>
      <calcite-dropdown-item>Option 3</calcite-dropdown-item>
      <calcite-dropdown-item>Option 4</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-split-button>
  <br />
  <calcite-split-button disabled loading>
    <calcite-dropdown-group selection-mode="none">
      <calcite-dropdown-item>Option 2</calcite-dropdown-item>
      <calcite-dropdown-item>Option 3</calcite-dropdown-item>
      <calcite-dropdown-item>Option 4</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-split-button>
`;

export const appearanceAndKindCombinations_TestOnly = (): string => html`
  <calcite-split-button primary-text="outline+brand" appearance="outline" kind="brand"></calcite-split-button>
  <calcite-split-button primary-text="outline+danger" appearance="outline" kind="danger"></calcite-split-button>
  <calcite-split-button primary-text="outline+inverse" appearance="outline" kind="inverse"></calcite-split-button>
  <calcite-split-button primary-text="outline+neutral" appearance="outline" kind="neutral"></calcite-split-button>

  <calcite-split-button primary-text="outline-fill+brand" appearance="outline-fill" kind="brand"></calcite-split-button>
  <calcite-split-button
    primary-text="outline-fill+danger"
    appearance="outline-fill"
    kind="danger"
  ></calcite-split-button>
  <calcite-split-button
    primary-text="outline-fill+inverse"
    appearance="outline-fill"
    kind="inverse"
  ></calcite-split-button>
  <calcite-split-button
    primary-text="outline-fill+neutral"
    appearance="outline-fill"
    kind="neutral"
  ></calcite-split-button>

  <calcite-split-button primary-text="solid+brand" appearance="solid" kind="brand"></calcite-split-button>
  <calcite-split-button primary-text="solid+danger" appearance="solid" kind="danger"></calcite-split-button>
  <calcite-split-button primary-text="solid+inverse" appearance="solid" kind="inverse"></calcite-split-button>
  <calcite-split-button primary-text="solid+neutral" appearance="solid" kind="neutral"></calcite-split-button>

  <calcite-split-button primary-text="transparent+brand" appearance="transparent" kind="brand"></calcite-split-button>
  <calcite-split-button primary-text="transparent+danger" appearance="transparent" kind="danger"></calcite-split-button>
  <calcite-split-button
    primary-text="transparent+inverse"
    appearance="transparent"
    kind="inverse"
  ></calcite-split-button>
  <calcite-split-button
    primary-text="transparent+neutral"
    appearance="transparent"
    kind="neutral"
  ></calcite-split-button>
`;

export const loadingAndDisabled_TestOnly = (): string => html`<calcite-button loading disabled>Test</calcite-button>`;
