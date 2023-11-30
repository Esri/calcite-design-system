import { number, select, text } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Input",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-label"
      type="${select(
        "type",
        ["text", "textarea", "email", "password", "tel", "number", "search", "file", "time", "date"],
        "text"
      )}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      number-button-type="${select("number-button-type", ["none", "horizontal", "vertical"], "horizontal")}"
      min="${number("min", 0)}"
      max="${number("max", 100)}"
      step="${number("step", 1)}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      ${boolean("loading", false)}
      ${boolean("clearable", false)}
      ${boolean("disabled", false)}
      value="${text("value", "")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      status="${select("status", ["idle", "invalid", "valid"], "idle")}"
      placeholder="${text("placeholder", "Placeholder text")}"
      message-text="${text("message-text", "")}"
      message-icon="${select("message-icon", ["", ...iconNames], "")}"
    ></calcite-input>
  </div>
`;

export const withSlottedAction = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-slotted-action"
      type="${select(
        "type",
        ["text", "textarea", "email", "password", "tel", "number", "search", "file", "time", "date"],
        "text"
      )}"
      status="${select("status", ["idle", "invalid", "valid"], "idle")}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      number-button-type="${select("number-button-type", ["none", "horizontal", "vertical"], "horizontal")}"
      min="${number("min", 0)}"
      max="${number("max", 100)}"
      step="${number("step", 1)}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      ${boolean("loading", false)}
      ${boolean("clearable", false)}
      ${boolean("disabled", false)}
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      status="${select("status", ["idle", "invalid", "valid"], "idle")}"
      message-text="${text("message-text", "")}"
      message-icon="${select("message-icon", ["", ...iconNames], "")}"
    >
      <calcite-button slot="action">${text("action button text", "Go")}</calcite-button>
    </calcite-input>
  </div>
`;

export const textarea = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-text-area"
      type="textarea"
      ${boolean("loading", false)}
      ${boolean("clearable", false)}
      ${boolean("disabled", false)}
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      value="${text("value", "")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      status="${select("status", ["idle", "invalid", "valid"], "idle")}"
      placeholder="${text("placeholder", "Placeholder text")}"
      message-text="${text("message-text", "My great input message")}"
      message-icon="${select("message-icon", ["", ...iconNames], "")}"
    >
    </calcite-input>
  </div>
`;

export const disabled_TestOnly = (): string => html`<calcite-input disabled value="disabled"></calcite-input>`;

export const darkModeRTL_TestOnly = (): string => html`
  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">
    <calcite-label
      class="calcite-mode-dark"
      status="${select("status", ["idle", "valid", "invalid"], "idle")}"
      for="input-dark-mode"
    >
      ${text("label text", "My great label")}
      <calcite-input
        id="input-dark-mode"
        type="${select(
          "type",
          ["text", "textarea", "email", "password", "tel", "number", "search", "file", "time", "date"],
          "text"
        )}"
        status="${select("status", ["idle", "invalid", "valid"], "idle")}"
        alignment="${select("alignment", ["start", "end"], "start")}"
        number-button-type="${select("number-button-type", ["none", "horizontal", "vertical"], "horizontal")}"
        min="${number("min", 0)}"
        max="${number("max", 100)}"
        step="${number("step", 1)}"
        prefix-text="${text("prefix-text", "")}"
        suffix-text="${text("suffix-text", "")}"
        ${boolean("loading", false)}
        ${boolean("clearable", false)}
        ${boolean("disabled", false)}
        value="${text("value", "")}"
        placeholder="${text("placeholder", "Placeholder text")}"
      >
      </calcite-input>
      <calcite-input-message status="${select("input message status", ["idle", "valid", "invalid"], "idle")}"
        >${text("input message text", "My great input message")}</calcite-input-message
      >
    </calcite-label>
  </div>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const hebrewNumberingSystem_TestOnly = (): string =>
  html` <calcite-input type="number" lang="ar-EG" numbering-system="hebr" value="123456"></calcite-input>`;

export const arabicLocaleWithLatinNumberingSystem_TestOnly = (): string =>
  html` <calcite-input type="number" lang="ar-EG" value="123456"></calcite-input>`;

export const validationMessageAllScales_TestOnly = (): string =>
  html`
    <style>
      .container {
        display: flex;
        flex-direction: column;
        width: 400px;
        height: 200px;
        gap: 20px;
      }
    </style>
    <div class="container">
      <calcite-input
        type="number"
        scale="s"
        status="invalid"
        message-text="This field is required."
        message-icon="frown"
      ></calcite-input>
      <calcite-input
        type="number"
        scale="m"
        status="invalid"
        message-text="Value must be greater than 1337"
        message-icon
        value="420"
      ></calcite-input>
      <calcite-input
        type="number"
        scale="l"
        status="invalid"
        message-text="Exceeds the maximum length of 2 characters"
        message-icon
        value="123"
      ></calcite-input>
    </div>
  `;

export const widthSetToBreakpoints_TestOnly = (): string =>
  createBreakpointStories(html`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
      }
      .breakpoint-story-container > * {
        flex-basis: 100%;
      }
    </style>
    <calcite-input
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input>
    <calcite-input
      scale="{scale}"
      value="Value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input>
  `);
