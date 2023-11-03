import readme from "./readme.md";
import { boolean, select, text } from "@storybook/addon-knobs";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { storyFilters } from "../../../.storybook/helpers";

export default {
  title: "Components/Controls/Inline Editable",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <div style="width:300px;max-width:100%;">
    <calcite-inline-editable
      scale="${select("scale", ["s", "m", "l"], "m", "InlineEditable")}"
      ${boolean("controls", false, "InlineEditable") && "controls"}
      ${boolean("editing-enabled", false, "InlineEditable") && "editing-enabled"}
      ${boolean("loading", false, "InlineEditable") && "loading"}
      ${boolean("disabled", false, "InlineEditable") && "disabled"}
    >
      <calcite-input
        alignment="${select("alignment", ["start", "end"], "start", "Input")}"
        placeholder="${text("placeholder", "Placeholder text", "Input")}"
      >
      </calcite-input>
    </calcite-inline-editable>
  </div>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-inline-editable disabled>
    <calcite-input value="disabled"></calcite-input>
  </calcite-inline-editable>
  <br />
  <calcite-inline-editable controls disabled editing-enabled loading>
    <calcite-input value="disabled and loading"></calcite-input>
  </calcite-inline-editable>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div dir="rtl" style="width:300px;max-width:100%;">
    <calcite-label
      class="calcite-mode-dark"
      status="${select("status", ["idle", "valid", "invalid"], "idle", "Label")}"
      scale="${select("scale", ["s", "m", "l"], "m", "Label")}"
      layout="${select("layout", ["default", "inline", "inline-space-between"], "default", "Label")}"
    >
      ${text("label text", "My great label", "Label")}
      <calcite-inline-editable
        ${boolean("controls", false, "InlineEditable") && "controls"}
        ${boolean("editing-enabled", false, "InlineEditable") && "editing-enabled"}
        ${boolean("loading", false, "InlineEditable") && "loading"}
        ${boolean("disabled", false, "InlineEditable") && "disabled"}
      >
        <calcite-input
          alignment="${select("alignment", ["start", "end"], "start", "Input")}"
          placeholder="${text("placeholder", "Placeholder text", "Input")}"
        >
        </calcite-input>
      </calcite-inline-editable>
      <calcite-input-message
        ${boolean("icon", false, "InputMessage") && "icon"}
        status="${select("status", ["idle", "valid", "invalid"], "idle", "InputMessage")}"
      >
        ${text("text", "My great input message", "InputMessage")}
      </calcite-input-message>
    </calcite-label>
  </div>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const longValue_TestOnly = (): string => html`<div style="width: 300px;">
  <calcite-inline-editable>
    <calcite-input
      value="A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Angiospermae)."
      placeholder="My placeholder"
    ></calcite-input>
  </calcite-inline-editable>
</div>`;
