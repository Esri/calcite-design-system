import { select, text } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Input Text",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      scale="${select("scale", ["s", "m", "l"], "m")}"
      status="${select("status", ["idle", "valid", "invalid"], "idle")}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      ${boolean("loading", false)}
      ${boolean("clearable", false)}
      ${boolean("disabled", false)}
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}"
    >
    </calcite-input-text>
  </div>
`;

export const withInputMessage = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      id="input-with-label-and-input-message"
      status="${select("status", ["idle", "invalid", "valid"], "idle", "Input")}"
      alignment="${select("alignment", ["start", "end"], "start", "Input")}"
      prefix-text="${text("prefix-text", "", "Input")}"
      suffix-text="${text("suffix-text", "", "Input")}"
      ${boolean("loading", false)}
      ${boolean("autofocus", false)}
      ${boolean("required", false)}
      value="${text("value", "", "Input")}"
      placeholder="${text("placeholder", "Placeholder text", "Input")}"
    >
    </calcite-input-text>
    <calcite-input-message
      ${boolean("active", true)}
      ${boolean("icon", false)}
      icon="${select("icon", iconNames, "", "Input Message")}"
      >${text("input message text", "My great input message", "Input Message")}</calcite-input-message
    >
  </div>
`;

export const withSlottedAction = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      id="input-with-slotted-action"
      status="${select("status", ["idle", "invalid", "valid"], "idle")}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      ${boolean("loading", false)}
      ${boolean("clearable", false)}
      ${boolean("disabled", false)}
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}"
    >
      <calcite-button slot="action">${text("action button text", "Go")}</calcite-button>
    </calcite-input-text>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      id="input-dark-mode"
      status="${select("status", ["idle", "invalid", "valid"], "idle")}"
      alignment="${select("alignment", ["start", "end"], "start")}"
      prefix-text="${text("prefix-text", "")}"
      suffix-text="${text("suffix-text", "")}"
      ${boolean("loading", false)}
      ${boolean("clearable", false)}
      ${boolean("disabled", false)}
      value="${text("value", "")}"
      placeholder="${text("placeholder", "Placeholder text")}"
    >
    </calcite-input-text>
    <calcite-input-message status="${select("input message status", ["idle", "valid", "invalid"], "idle")}"
      >${text("input message text", "My great input message")}</calcite-input-message
    >
  </div>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const mediumIconForLargeScaleStyling_TestOnly = (): string => html`
  <calcite-label scale="l">
    Input Label
    <calcite-input-text placeholder="Placeholder" scale="l"></calcite-input-text>
    <calcite-input-text
      placeholder="Placeholder"
      scale="l"
      icon="search"
      clearable
      value="sample input to show x"
    ></calcite-input-text>
  </calcite-label>
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
    <calcite-input-text
      scale="{scale}"
      placeholder="Placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-text>
    <calcite-input-text
      scale="{scale}"
      value="Value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor eu augue. Rhoncus dolor purus non enim praesent elementum facilisis."
    ></calcite-input-text>
  `);
