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
      label="${text("label", "")}"
      name="${text("name", "")}"
    >
    </calcite-textarea>
  </div>
`;

export const withSlottedElements = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
scale="${select("scale", ["s", "m", "l"], "m")}"
placeholder="${text("placeholder", "Add Notes")}"
maxlength="${number("maxlength", 50)}"
>
<calcite-button  slot="${text("slot", "footer-leading")}">RESET</calcite-button>
</caclite-textarea>
</div>`;

export const disabled = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
disabled
>
</caclite-textarea>
</div>`;

export const readonly = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
readonly
>
</caclite-textarea>
</div>`;

export const resizeDisabled = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
resize-disabled
>
</caclite-textarea>
</div>`;

export const withLabel = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-label> Add Notes
<calcite-textarea
>
</caclite-textarea>
</calcite-label>
</div>`;

export const arabicLang_TestOnly = (): string => html`<div style="width:300px;text-align:center;">
  <calcite-textarea value="${text("placeholder", "Rocky Mountains National Park")}" lang="ar"> </calcite-textarea>
</div>`;

export const exceedingMaxlength_TestOnly = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
value="${text("placeholder", "Rocky Mountains National Park")}"
maxlength="${number("maxlength", 10)}"
>
</caclite-textarea>
</div>`;

export const chineseLangNumberingSystem_TestOnly = (): string => html`div style="width:300px;text-align:center;">
<calcite-textarea value="${text(
  "placeholder",
  "Rocky Mountains National Park"
)}" lang="zh-cn" numbering-system="hans"> </calcite-textarea>
</div>`;
