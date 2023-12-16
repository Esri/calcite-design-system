import { number, select, text } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Input Number",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number
      scale="${select("scale", ["s", "m", "l"], "m")}"
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
    </calcite-input-number>
  </div>
`;

export const withInputMessage = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number
      id="input-with-label-and-input-message"
      status="${select("status", ["idle", "invalid", "valid"], "idle", "Input")}"
      alignment="${select("alignment", ["start", "end"], "start", "Input")}"
      number-button-type="${select("number-button-type", ["none", "horizontal", "vertical"], "horizontal", "Input")}"
      min="${number("min", 0)}"
      max="${number("max", 100)}"
      step="${number("step", 1)}"
      prefix-text="${text("prefix-text", "", "Input")}"
      suffix-text="${text("suffix-text", "", "Input")}"
      ${boolean("loading", false)}
      ${boolean("autofocus", false)}
      ${boolean("required", false)}
      value="${text("value", "", "Input")}"
      placeholder="${text("placeholder", "Placeholder text", "Input")}"
    >
    </calcite-input-number>
    <calcite-input-message ${boolean("icon", false)} icon="${select("icon", iconNames, "", "Input Message")}"
      >${text("input message text", "My great input message", "Input Message")}</calcite-input-message
    >
  </div>
`;

export const withSlottedAction = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number
      id="input-with-slotted-action"
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
      <calcite-button slot="action">${text("action button text", "Go")}</calcite-button>
    </calcite-input-number>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">
    <calcite-label
      class="calcite-mode-dark"
      status="${select("status", ["idle", "valid", "invalid"], "idle")}"
      for="input-dark-mode"
    >
      ${text("label text", "My great label")}
      <calcite-input-number
        id="input-dark-mode"
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
      </calcite-input-number>
      <calcite-input-message status="${select("input message status", ["idle", "valid", "invalid"], "idle")}"
        >${text("input message text", "My great input message")}</calcite-input-message
      >
    </calcite-label>
  </div>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const mediumIconForLargeInputStyling_TestOnly = (): string =>
  html`
    <calcite-input-number number-button-type="vertical" lang="ar-EG" value="123456" scale="l"></calcite-input-number
    ><calcite-input-number
      number-button-type="vertical"
      lang="ar-EG"
      value="123456"
      scale="l"
      icon="pen"
    ></calcite-input-number>
    <calcite-input-number number-button-type="horizontal" lang="ar-EG" value="123456" scale="l"></calcite-input-number
    ><calcite-input-number
      number-button-type="horizontal"
      lang="ar-EG"
      value="123456"
      scale="l"
      icon="pen"
    ></calcite-input-number>
  `;

export const arabicLocaleWithLatinNumberingSystem_TestOnly = (): string =>
  html`<calcite-input-number lang="ar-EG" numbering-system="latn" value="123456"></calcite-input-number>`;

export const invalidStatus_TestOnly = (): string =>
  html`<calcite-input-number status="invalid" value="54321"></calcite-input-number>`;

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
    <calcite-input-number
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-number>
    <calcite-input-number
      scale="{scale}"
      value="123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    ></calcite-input-number>
  `);
