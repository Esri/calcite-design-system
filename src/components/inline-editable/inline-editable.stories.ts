import readme from "./readme.md";
import { boolean, select, text } from "@storybook/addon-knobs";
import { themesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../tests/utils";

export default {
  title: "Components/Controls/Inline Editable",

  parameters: {
    notes: readme
  }
};

export const WithLabel = (): string => html`
  <div style="width:300px;max-width:100%;">
    <calcite-label
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
        intl-cancel-editing="${text("intl-cancel-editing", "Cancelar", "InlineEditable")}"
        intl-enable-editing="${text("intl-enable-editing", "Haga clic para editar", "InlineEditable")}"
        intl-confirm-changes="${text("intl-confirm-changes", "Guardar", "InlineEditable")}"
      >
        <calcite-input
          alignment="${select("alignment", ["start", "end"], "start", "Input")}"
          placeholder="${text("placeholder", "Placeholder text", "Input")}"
        >
        </calcite-input>
      </calcite-inline-editable>
      <calcite-input-message
        ${boolean("active", false, "InputMessage") && "active"}
        ${boolean("icon", false, "InputMessage") && "icon"}
        status="${select("status", ["idle", "valid", "invalid"], "idle", "InputMessage")}"
      >
        ${text("text", "My great input message", "InputMessage")}
      </calcite-input-message>
    </calcite-label>
  </div>
`;

WithLabel.storyName = "With label";

export const WithoutLabel = (): string => html`
  <div style="width:300px;max-width:100%;">
    <calcite-inline-editable
      scale="${select("scale", ["s", "m", "l"], "m", "InlineEditable")}"
      ${boolean("controls", false, "InlineEditable") && "controls"}
      ${boolean("editing-enabled", false, "InlineEditable") && "editing-enabled"}
      ${boolean("loading", false, "InlineEditable") && "loading"}
      ${boolean("disabled", false, "InlineEditable") && "disabled"}
      intl-cancel-editing="${text("intl-cancel-editing", "Cancelar", "InlineEditable")}"
      intl-enable-editing="${text("intl-enable-editing", "Haga clic para editar", "InlineEditable")}"
      intl-confirm-changes="${text("intl-confirm-changes", "Guardar", "InlineEditable")}"
    >
      <calcite-input
        alignment="${select("alignment", ["start", "end"], "start", "Input")}"
        placeholder="${text("placeholder", "Placeholder text", "Input")}"
      >
      </calcite-input>
    </calcite-inline-editable>
  </div>
`;

export const WithoutLabelRTL = (): string => html`
  <div style="width:300px;max-width:100%;" dir="rtl">
    <calcite-inline-editable
      scale="${select("scale", ["s", "m", "l"], "m", "InlineEditable")}"
      ${boolean("controls", false, "InlineEditable") && "controls"}
      ${boolean("editing-enabled", false, "InlineEditable") && "editing-enabled"}
      ${boolean("loading", false, "InlineEditable") && "loading"}
      ${boolean("disabled", false, "InlineEditable") && "disabled"}
      intl-cancel-editing="${text("intl-cancel-editing", "Cancelar", "InlineEditable")}"
      intl-enable-editing="${text("intl-enable-editing", "Haga clic para editar", "InlineEditable")}"
      intl-confirm-changes="${text("intl-confirm-changes", "Guardar", "InlineEditable")}"
    >
      <calcite-input
        alignment="${select("alignment", ["start", "end"], "start", "Input")}"
        placeholder="${text("placeholder", "Placeholder text", "Input")}"
      >
      </calcite-input>
    </calcite-inline-editable>
  </div>
`;

export const DarkMode = (): string => html`
  <div style="width:300px;max-width:100%;">
    <calcite-label
      class="calcite-theme-dark"
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
        intl-cancel-editing="${text("intl-cancel-editing", "Cancelar", "InlineEditable")}"
        intl-enable-editing="${text("intl-enable-editing", "Haga clic para editar", "InlineEditable")}"
        intl-confirm-changes="${text("intl-confirm-changes", "Guardar", "InlineEditable")}"
      >
        <calcite-input
          alignment="${select("alignment", ["start", "end"], "start", "Input")}"
          placeholder="${text("placeholder", "Placeholder text", "Input")}"
        >
        </calcite-input>
      </calcite-inline-editable>
      <calcite-input-message
        ${boolean("active", false, "InputMessage") && "active"}
        ${boolean("icon", false, "InputMessage") && "icon"}
        status="${select("status", ["idle", "valid", "invalid"], "idle", "InputMessage")}"
      >
        ${text("text", "My great input message", "InputMessage")}
      </calcite-input-message>
    </calcite-label>
  </div>
`;

DarkMode.storyName = "Dark mode";
DarkMode.parameters = { themes: themesDarkDefault };
