import { iconNames } from "../../../.storybook/helpers";
import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { InputText } from "./input-text";

const { scale, status, alignment } = ATTRIBUTES;

type InputTextStoryArgs = Pick<
  InputText,
  | "scale"
  | "status"
  | "alignment"
  | "prefixText"
  | "suffixText"
  | "loading"
  | "clearable"
  | "disabled"
  | "value"
  | "placeholder"
  | "validationMessage"
  | "validationIcon"
>;

export default {
  title: "Components/Controls/Input Text",
  args: {
    scale: scale.defaultValue,
    status: status.defaultValue,
    alignment: alignment.defaultValue,
    prefixText: "",
    suffixText: "",
    loading: false,
    clearable: false,
    disabled: false,
    value: "",
    placeholder: "Placeholder text",
    validationMessage: "",
    validationIcon: "",
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    status: {
      options: status.values,
      control: { type: "select" },
    },
    alignment: {
      options: alignment.values.filter((option) => option !== "center"),
      control: { type: "select" },
    },
    validationIcon: {
      options: iconNames,
      control: { type: "select" },
    },
  },
};

export const simple = (args: InputTextStoryArgs): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      scale="${args.scale}"
      status="${args.status}"
      alignment="${args.alignment}"
      prefix-text="${args.prefixText}"
      suffix-text="${args.suffixText}"
      ${boolean("loading", args.loading)}
      ${boolean("clearable", args.clearable)}
      ${boolean("disabled", args.disabled)}
      value="${args.value}"
      placeholder="${args.placeholder}"
      validation-message="${args.validationMessage}"
      validation-icon="${args.validationIcon}"
    >
    </calcite-input-text>
  </div>
`;

export const internalLabel = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text placeholder="Placeholder" scale="m" label-text="Label text" required>
      <calcite-icon slot="internal-label-content" icon="banana" scale="m"></calcite-icon>
    </calcite-input-text>
  </div>
`;

export const withSlottedAction = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text id="input-with-slotted-action" status="idle" alignment="start" placeholder="Placeholder text">
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input-text>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-text
      id="input-dark-mode"
      status="idle"
      alignment="start"
      placeholder="Placeholder text"
      validation-message="This should not appear because the status is not 'invalid'"
    >
    </calcite-input-text>
  </div>
`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

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

export const fontSizeSetAtRoot = (): string =>
  html` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-text placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-text>`;
