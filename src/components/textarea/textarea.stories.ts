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
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-textarea
      scale="${select("scale", ["s", "m", "l"], "m")}"
      placeholder="${text("placeholder", "Add Notes")}"
      ${boolean("footer", false)}
      ${boolean("disabled", false)}
      cols="${number("cols", 20)}"
      rows="${number("rows", 2)}"
      ${boolean("resize-disabled", true)}
      ${boolean("horizantal-resize-disabled", false)}
      ${boolean("vertical-resize-disabled", false)}
      ${boolean("required", false)}
      ${boolean("hidden", false)}
      ${boolean("invalid", false)}
      label="${text("label", "")}"
      form="${text("form", "")}"
      name="${text("name", "")}"
    >
    </calcite-textarea>
  </div>
`;

export const withSlottedElements = (): string => html`<div style="width:300px;max-width:100%;">
<calcite-textarea
scale="${select("scale", ["s", "m", "l"], "m")}"
placeholder="${text("placeholder", "Add Notes")}"
${boolean("footer", true)}
maxlength="${number("maxlength", 50)}"
>
<calcite-button  slot="${text("slot", "footer-leading")}">RESET</calcite-button>
</caclite-textarea>
</div>`;
