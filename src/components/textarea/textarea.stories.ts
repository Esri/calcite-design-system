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
    <calcite-textarea
      scale="${select("scale", ["s", "m", "l"], "m")}"
      placeholder="${text("placeholder", "Add Notes")}"
      ${boolean("disabled", false)}
      cols="${number("cols", 20)}"
      rows="${number("rows", 2)}"
      ${boolean("resize-disabled", true)}
      ${boolean("horizantal-resize-disabled", false)}
      ${boolean("vertical-resize-disabled", false)}
      ${boolean("required", false)}
      ${boolean("readonly", false)}
      label="${text("label", "")}"
      name="${text("name", "")}"
    >
    </calcite-textarea>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width:300px;text-align:center;">
    <calcite-textarea dir="rtl" class="calcite-mode-dark"> </calcite-textarea>
  </div>
`;

export const withSlottedElements = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
placeholder="${text("placeholder", "Add Notes")}"
maxlength="${number("maxlength", 50)}"
scale="${select("scale", ["s", "m", "l"], "m")}"
 placeholder="${text("placeholder", "Add Notes")}"
${boolean("disabled", false)}
cols="${number("cols", 20)}"
rows="${number("rows", 2)}"
${boolean("resize-disabled", true)}
${boolean("horizantal-resize-disabled", false)}
${boolean("vertical-resize-disabled", false)}
${boolean("required", false)}
${boolean("readonly", false)}
label="${text("label", "")}"
name="${text("name", "")}"
>
<calcite-button  slot="${text("slot", "footer-start")}">RESET</calcite-button>
<calcite-action  icon="code" slot="${text("slot", "footer-end")}"></calcite-action>
</caclite-textarea>
</div>`;

export const withSlottedElementsDarkModeRTL_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
maxlength="50"
placeholder= "Add Notes"
>
<calcite-button  slot="${text("slot", "footer-start")}">RESET</calcite-button>
<calcite-action  icon="code" slot="${text("slot", "footer-end")}"></calcite-action>
</caclite-textarea>
</div>`;

export const disabled_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
disabled
>
</caclite-textarea>
</div>`;

export const readonly_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
readonly
>
</caclite-textarea>
</div>`;

export const resizeDisabled_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
resize-disabled
>
</caclite-textarea>
</div>`;

export const withLabel_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-label> Add Notes
<calcite-textarea
>
</caclite-textarea>
</calcite-label>
</div>`;

export const groupSeparator_TestOnly = (): string => html`<div style="width:300px;text-align:center;">
  <calcite-textarea value="Rocky Mountains National Park" lang="fr" maxlength="123456" group-separator>
  </calcite-textarea>
</div>`;

export const exceedingMaxlength_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
value="Rocky Mountains National Park"
maxlength="10"
>
</caclite-textarea>
</div>`;

export const chineseLangNumberingSystem_TestOnly = (): string => html`div style="width:300px;text-align:center;">
<calcite-textarea value="
  Rocky Mountains National Park"
 lang="zh-cn" numbering-system="hanidec" group-separator max-length="654321" > </calcite-textarea>
</div>`;
