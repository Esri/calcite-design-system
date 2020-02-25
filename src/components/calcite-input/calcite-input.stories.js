import { storiesOf } from "@storybook/html";
import { withKnobs, select, boolean, text } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Input", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label status="${select(
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
      readonly="${boolean("readonly", false)}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      number-button-type="${select(
        "number-button-type",
        ["none", "horizontal", "vertical"],
        "horizontal"
      )}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      loading="${boolean("loading", false)}"
      autofocus="${boolean("autofocus", false)}"
      required="${boolean("required", false)}"
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
    "With Slotted Action",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-label status="${select(
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
      readonly="${boolean("readonly", false)}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      number-button-type="${select(
        "number-button-type",
        ["none", "horizontal", "vertical"],
        "horizontal"
      )}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      loading="${boolean("loading", false)}"
      autofocus="${boolean("autofocus", false)}"
      required="${boolean("required", false)}"
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
      autofocus="${boolean("autofocus", false)}"
      required="${boolean("required", false)}"
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}">
    </calcite-input>
    <calcite-input-message
    readonly="${boolean("readonly", false)}"
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
      readonly="${boolean("readonly", false)}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      number-button-type="${select(
        "number-button-type",
        ["none", "horizontal", "vertical"],
        "horizontal"
      )}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      loading="${boolean("loading", false)}"
      autofocus="${boolean("autofocus", false)}"
      required="${boolean("required", false)}"
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}">
    </calcite-input>
    <calcite-input-message
    active="${boolean("calcite-input-message:active", false)}"
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
