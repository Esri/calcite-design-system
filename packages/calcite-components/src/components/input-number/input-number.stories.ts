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
      validation-message="${text("validation-message", "")}"
      validation-icon="${select("validation-icon", ["", ...iconNames], "")}"
    >
    </calcite-input-number>
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
      validation-message="${text("validation-message", "")}"
      validation-icon="${select("validation-icon", ["", ...iconNames], "")}"
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
        validation-message="My great input message"
      >
      </calcite-input-number>
    </calcite-label>
  </div>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const Infinity_TestOnly = (): string => html`<calcite-input-number value="Infinity"></calcite-input-number>`;

export const mediumIconForLargeInputStyling_TestOnly = (): string => html`
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

export const validationMessageAllScales_TestOnly = (): string => html`
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
    <calcite-input-number
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input-number>
    <calcite-input-number
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input-number>
    <calcite-input-number
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="123"
    ></calcite-input-number>
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
    <calcite-input-number
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-number>
    <calcite-input-number
      scale="{scale}"
      value="123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    ></calcite-input-number>
  `);
