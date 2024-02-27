import { select, text } from "@storybook/addon-knobs";
import { userEvent, waitFor } from "@storybook/testing-library";
import { screen, within } from "shadow-dom-testing-library";
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
      validation-message="${text("validation-message", "")}"
      validation-icon="${select("validation-icon", ["", ...iconNames], "")}"
    >
    </calcite-input-text>
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
      validation-message="${text("validation-message", "")}"
      validation-icon="${select("validation-icon", ["", ...iconNames], "")}"
    >
      <calcite-button slot="action">${text("action button text", "Go")}</calcite-button>
    </calcite-input-text>
  </div>
`;

withSlottedAction.play = async () => {
  const element = document.querySelector("div > calcite-input-text") || new Element();
  await waitFor(() => {
    userEvent.click(element);
  });
  const inputWrapper = await screen.findByPlaceholderText("Placeholder text");
  const input = await within(inputWrapper).findAllByShadowPlaceholderText("Placeholder text");
  await userEvent.type(input[0], " Replacing the placeholder text", {
    delay: 100,
  });
  const button = await within(inputWrapper).findByShadowRole("button");
  await userEvent.click(button);
};

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
      validation-message="This should not appear because the status is not 'invalid'"
    >
    </calcite-input-text>
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
    <calcite-input-text
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input-text>
    <calcite-input-text
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input-text>
    <calcite-input-text
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
      value="test"
    ></calcite-input-text>
  </div>
`;
