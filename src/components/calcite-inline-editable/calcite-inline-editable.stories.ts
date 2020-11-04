import readme from "./readme.md";
import { boolean, select, text } from "@storybook/addon-knobs";
import { darkBackground } from "../../../.storybook/utils";
import { storiesOf } from "@storybook/html";

storiesOf("Components/Inline Editable", module)
  .addParameters({ notes: readme })
  .add(
    "With label",
    (): string => `
    <div style="width:300px;max-width:100%;">
    <calcite-label
        status="${select("status", ["idle", "valid", "invalid"], "idle", "Label")}"
        scale="${select("scale", ["s", "m", "l"], "m", "Label")}"
        layout="${select("layout", ["default", "inline", "inline-space-between"], "default", "Label")}">
      ${text("label text", "My great label", "Label")}
      <calcite-inline-editable
          ${boolean("controls", false, "InlineEditable") && "controls"}
          ${boolean("editing-enabled", false, "InlineEditable") && "editing-enabled"}
          ${boolean("loading", false, "InlineEditable") && "loading"}
          ${boolean("disabled", false, "InlineEditable") && "disabled"}
          intl-cancel-editing="${text("intl-cancel-editing", "Cancelar", "InlineEditable")}"
          intl-enable-editing="${text("intl-enable-editing", "Haga clic para editar", "InlineEditable")}"
          intl-confirm-changes="${text("intl-confirm-changes", "Guardar", "InlineEditable")}">
        <calcite-input
            alignment="${select("alignment", ["start", "end"], "start", "Input")}"
            placeholder="${text("placeholder", "Placeholder text", "Input")}">
        </calcite-input>
      </calcite-inline-editable>
      <calcite-input-message
          ${boolean("active", false, "InputMessage") && "active"}
          ${boolean("icon", false, "InputMessage") && "icon"}
          type="${select("type", ["default", "floating"], "default", "InputMessage")}"
          status="${select("status", ["idle", "valid", "invalid"], "idle", "InputMessage")}">
        ${text("text", "My great input message", "InputMessage")}
      </calcite-input-message>
    </calcite-label>
    </div>
  `
  )
  .add(
    "Without Label",
    (): string => `
    <div style="width:300px;max-width:100%;">
      <calcite-inline-editable
          scale="${select("scale", ["s", "m", "l"], "m", "InlineEditable")}"
          ${boolean("controls", false, "InlineEditable") && "controls"}
          ${boolean("editing-enabled", false, "InlineEditable") && "editing-enabled"}
          ${boolean("loading", false, "InlineEditable") && "loading"}
          ${boolean("disabled", false, "InlineEditable") && "disabled"}
          intl-cancel-editing="${text("intl-cancel-editing", "Cancelar", "InlineEditable")}"
          intl-enable-editing="${text("intl-enable-editing", "Haga clic para editar", "InlineEditable")}"
          intl-confirm-changes="${text("intl-confirm-changes", "Guardar", "InlineEditable")}">
        <calcite-input
            alignment="${select("alignment", ["start", "end"], "start", "Input")}"
            placeholder="${text("placeholder", "Placeholder text", "Input")}">
        </calcite-input>
      </calcite-inline-editable>
    </div>
  `
  )
  .add(
    "Dark mode",
    (): string => `
    <div style="width:300px;max-width:100%;">
    <calcite-label
        theme="dark"
        status="${select("status", ["idle", "valid", "invalid"], "idle", "Label")}"
        scale="${select("scale", ["s", "m", "l"], "m", "Label")}"
        layout="${select("layout", ["default", "inline", "inline-space-between"], "default", "Label")}">
      ${text("label text", "My great label", "Label")}
      <calcite-inline-editable
          ${boolean("controls", false, "InlineEditable") && "controls"}
          ${boolean("editing-enabled", false, "InlineEditable") && "editing-enabled"}
          ${boolean("loading", false, "InlineEditable") && "loading"}
          ${boolean("disabled", false, "InlineEditable") && "disabled"}
          intl-cancel-editing="${text("intl-cancel-editing", "Cancelar", "InlineEditable")}"
          intl-enable-editing="${text("intl-enable-editing", "Haga clic para editar", "InlineEditable")}"
          intl-confirm-changes="${text("intl-confirm-changes", "Guardar", "InlineEditable")}">
        <calcite-input
            alignment="${select("alignment", ["start", "end"], "start", "Input")}"
            placeholder="${text("placeholder", "Placeholder text", "Input")}">
        </calcite-input>
      </calcite-inline-editable>
      <calcite-input-message
          ${boolean("active", false, "InputMessage") && "active"}
          ${boolean("icon", false, "InputMessage") && "icon"}
          type="${select("type", ["default", "floating"], "default", "InputMessage")}"
          status="${select("status", ["idle", "valid", "invalid"], "idle", "InputMessage")}">
        ${text("text", "My great input message", "InputMessage")}
      </calcite-input-message>
    </calcite-label>
    </div>
  `,
    { backgrounds: darkBackground }
  );
