import { select, text, number } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Textarea",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <div style="width:300px;text-align:center;">
    <calcite-text-area
      scale="${select("scale", ["s", "m", "l"], "m")}"
      placeholder="${text("placeholder", "Add Notes")}"
      ${boolean("disabled", false)}
      columns="${number("columns", 20)}"
      rows="${number("rows", 2)}"
      ${boolean("resize-disabled", true)}
      ${boolean("horizontal-resize-disabled", false)}
      ${boolean("vertical-resize-disabled", false)}
      ${boolean("required", false)}
      ${boolean("readonly", false)}
      label="${text("label", "")}"
      name="${text("name", "")}"
    >
    </calcite-text-area>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width:300px;text-align:center;">
    <calcite-text-area dir="rtl" class="calcite-mode-dark"> </calcite-text-area>
  </div>
`;

export const withSlottedElements = (): string => html`<div style="width:300px;max-width:100%;">
  <calcite-text-area
    placeholder="${text("placeholder", "Add Notes")}"
    max-length="${number("max-length", 50)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    placeholder="${text("placeholder", "Add Notes")}"
    ${boolean("disabled", false)}
    columns="${number("columns", 20)}"
    rows="${number("rows", 2)}"
    ${boolean("resize-disabled", true)}
    ${boolean("horizontal-resize-disabled", false)}
    ${boolean("vertical-resize-disabled", false)}
    ${boolean("required", false)}
    ${boolean("readonly", false)}
    label="${text("label", "")}"
    name="${text("name", "")}"
  >
    <calcite-button slot="${text("slot", "footer-start")}">RESET</calcite-button>
    <calcite-action icon="code" slot="${text("slot", "footer-end")}"></calcite-action>
  </calcite-text-area>
</div>`;

export const withSlottedElementsDarkModeRTL_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
  <calcite-text-area max-length="50" placeholder="Add Notes">
    <calcite-button slot="${text("slot", "footer-start")}">RESET</calcite-button>
    <calcite-action icon="code" slot="${text("slot", "footer-end")}"></calcite-action>
  </calcite-text-area>
</div>`;

export const disabled_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
  <calcite-text-area disabled> </calcite-text-area>
</div>`;

export const readonly_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
  <calcite-text-area readonly> </calcite-text-area>
</div>`;

export const resizeDisabled_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
  <calcite-text-area resize-disabled> </calcite-text-area>
</div>`;

export const withLabel_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
  <calcite-label>
    Add Notes
    <calcite-text-area> </calcite-text-area>
  </calcite-label>
</div>`;

export const groupSeparator_TestOnly = (): string => html`<div style="width:300px;text-align:center;">
  <calcite-text-area value="Rocky Mountains National Park" lang="fr" max-length="123456" group-separator>
  </calcite-text-area>
</div>`;

export const exceedingMaxlength_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
  <calcite-text-area value="Rocky Mountains National Park" max-length="10"> </calcite-text-area>
</div>`;

export const chineseLangNumberingSystem_TestOnly = (): string => html`<div style="width:300px;text-align:center;">
  <calcite-text-area
    value="
  Rocky Mountains National Park"
    lang="zh-cn"
    numbering-system="hanidec"
    group-separator
    max-length="654321"
  >
  </calcite-text-area>
</div>`;
