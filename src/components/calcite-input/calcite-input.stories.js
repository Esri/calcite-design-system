import { storiesOf } from "@storybook/html";
import { withKnobs, select, boolean, text } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Input", module)
  .addDecorator(withKnobs)

  .add(
    "With Label",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label status="${select(
      "status",
      ["idle", "valid", "invalid"],
      "idle"
    )}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    >
    ${text("label text", "My great label")}
    <calcite-input
      type="${select(
        "type",
        [
          "text",
          "textarea",
          "email",
          "password",
          "tel",
          "number",
          "search",
          "file",
          "time",
          "date"
        ],
        "text"
      )}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      number-button-type="${select(
        "number-button-type",
        ["none", "horizontal", "vertical"],
        "horizontal"
      )}"
      min="${text("min", "")}"
      max="${text("max", "")}"
      step="${text("step", "")}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      loading="${boolean("loading", false)}"
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}">
    </calcite-input>
    <calcite-input-message
    active="${boolean("input-message-active", false)}"
    type="${select("input message type", ["default", "floating"], "default")}"
    status="${select(
      "input message status",
      ["idle", "valid", "invalid"],
      "idle"
    )}">${text(
      "input message text",
      "My great input message"
    )}</calcite-input-message>
    </calcite-label>
    </div>
  `,
    { notes }
  )
  .add(
    "With Label and Input Message",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label status="${select(
      "status",
      ["idle", "valid", "invalid"],
      "idle",
      "Label"
    )}"
    scale="${select("scale", ["s", "m", "l"], "m", "Label")}">
    ${text("label text", "My great label", "Label")}
    <calcite-input
      type="${select(
        "type",
        [
          "text",
          "textarea",
          "email",
          "password",
          "tel",
          "number",
          "search",
          "file",
          "time",
          "date"
        ],
        "text",
        "Input"
      )}"
      alignment="${select("alignment", ["start", "end"], "start", "Input")}"
      appearance="${select(
        "appearance",
        ["default", "minimal"],
        "default",
        "Input"
      )}"
      number-button-type="${select(
        "number-button-type",
        ["none", "horizontal", "vertical"],
        "horizontal",
        "Input"
      )}"
      min="${text("min", "")}"
      max="${text("max", "")}"
      step="${text("step", "")}"
      prefix-text="${text("prefix-text", "", "Input")}"
      suffix-text="${text("suffix-text", "", "Input")}"
      loading="${boolean("loading", false, "Input")}"
      autofocus="${boolean("autofocus", false, "Input")}"
      required="${boolean("required", false, "Input")}"
      value="${text("value", "", "Input")}"
      placeholder="${text("placeholder", "Placeholder text", "Input")}">
    </calcite-input>
    <calcite-input-message
    active="${boolean("active", true, "Input Message")}"
    icon="${boolean("icon", true, "Input Message")}"
    type="${select(
      "type",
      ["default", "floating"],
      "default",
      "Input Message"
    )}"
   >${text(
     "input message text",
     "My great input message",
     "Input Message"
   )}</calcite-input-message>
    </calcite-label>
    </div>
  `,
    { notes }
  )
  .add(
    "Without Label",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      scale="${select("scale", ["s", "m", "l"], "m")}"
      status="${select("status", ["idle", "valid", "invalid"], "idle")}"
      type="${select(
        "type",
        [
          "text",
          "textarea",
          "email",
          "password",
          "tel",
          "number",
          "search",
          "file",
          "time",
          "date"
        ],
        "text"
      )}"

      alignment="${select("alignment", ["start", "end"], "start")}"
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      number-button-type="${select(
        "number-button-type",
        ["none", "horizontal", "vertical"],
        "horizontal"
      )}"
      min="${text("min", "")}"
      max="${text("max", "")}"
      step="${text("step", "")}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      loading="${boolean("loading", false)}"
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}">
    </calcite-input>
    </div>
  `,
    { notes }
  )
  .add(
    "With Slotted Action",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label status="${select(
      "status",
      ["idle", "valid", "invalid"],
      "idle"
    )}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    >
    ${text("label text", "My great label")}
    <calcite-input
      type="${select(
        "type",
        [
          "text",
          "textarea",
          "email",
          "password",
          "tel",
          "number",
          "search",
          "file",
          "time",
          "date"
        ],
        "text"
      )}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      number-button-type="${select(
        "number-button-type",
        ["none", "horizontal", "vertical"],
        "horizontal"
      )}"
      min="${text("min", "")}"
      max="${text("max", "")}"
      step="${text("step", "")}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      loading="${boolean("loading", false)}"
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}">
      <calcite-button slot="input-action" width=${select(
        "button width",
        ["half", "auto"],
        "auto"
      )}">${text("action button text", "Go")}</calcite-button>
    </calcite-input>
    <calcite-input-message
    active="${boolean("input-message-active", false)}"
    type="${select("input message type", ["default", "floating"], "default")}"
    status="${select(
      "input message status",
      ["idle", "valid", "invalid"],
      "idle"
    )}">${text(
      "input message text",
      "My great input message"
    )}</calcite-input-message>
    </calcite-label>
    </div>
  `,
    { notes }
  )
  .add(
    "Textarea",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label status="${select(
      "status",
      ["idle", "valid", "invalid"],
      "idle"
    )}">
    ${text("label text", "My great label")}
    <calcite-input
      type="textarea"
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      loading="${boolean("loading", false)}"
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}">
    </calcite-input>
    <calcite-input-message
    active="${boolean("input-message-active", false)}"
    type="${select("input message type", ["default", "floating"], "default")}"
    status="${select(
      "input message status",
      ["idle", "valid", "invalid"],
      "idle"
    )}">${text(
      "input message text",
      "My great input message"
    )}</calcite-input-message>
    </calcite-label>
    </div>
  `,
    { notes }
  )
  .add(
    "Simple - Dark mode",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label theme="dark" status="${select(
      "status",
      ["idle", "valid", "invalid"],
      "idle"
    )}">
    ${text("label text", "My great label")}
    <calcite-input
      type="${select(
        "type",
        [
          "text",
          "textarea",
          "email",
          "password",
          "tel",
          "number",
          "search",
          "file",
          "time",
          "date"
        ],
        "text"
      )}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      number-button-type="${select(
        "number-button-type",
        ["none", "horizontal", "vertical"],
        "horizontal"
      )}"
      min="${text("min", "")}"
      max="${text("max", "")}"
      step="${text("step", "")}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      loading="${boolean("loading", false)}"
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}">
    </calcite-input>
    <calcite-input-message
    active="${boolean("calcite-input-message-active", false)}"
    type="${select("input message type", ["default", "floating"], "default")}"
    status="${select(
      "input message status",
      ["idle", "valid", "invalid"],
      "idle"
    )}">${text(
      "input message text",
      "My great input message"
    )}</calcite-input-message>
    </calcite-label>
    </div>
  `,
    { notes, backgrounds: darkBackground }
  );
