import { iconNames } from "../../../.storybook/helpers";
import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { InputNumber } from "./input-number";

const { scale, status, alignment, layout } = ATTRIBUTES;

type InputNumberStoryArgs = Pick<
  InputNumber,
  | "scale"
  | "status"
  | "alignment"
  | "numberButtonType"
  | "min"
  | "max"
  | "step"
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
  title: "Components/Controls/Input Number",
  args: {
    scale: scale.defaultValue,
    status: status.defaultValue,
    alignment: alignment.defaultValue,
    numberButtonType: layout.defaultValue,
    min: 0,
    max: 100,
    step: 1,
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
      options: alignment.values,
      control: { type: "select" },
    },
    numberButtonType: {
      options: layout.values.filter(
        (option) =>
          option !== "grid" &&
          option !== "inline" &&
          option !== "center" &&
          option !== "auto" &&
          option !== "fixed" &&
          option !== "horizontal-single",
      ),
      control: { type: "select" },
    },
    validationIcon: {
      options: iconNames,
      control: { type: "select" },
    },
  },
};

export const simple = (args: InputNumberStoryArgs): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number
      scale="${args.scale}"
      status="${args.status}"
      alignment="${args.alignment}"
      number-button-type="${args.numberButtonType}"
      min="${args.min}"
      max="${args.max}"
      step="${args.step}"
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
    </calcite-input-number>
  </div>
`;

export const internalLabel = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number placeholder="Placeholder" scale="m" value="123" step="1" label-text="Label text" required>
      <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
    </calcite-input-number>
  </div>
`;

export const withSlottedAction = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number
      id="input-with-slotted-action"
      status="idle"
      alignment="start"
      number-button-type="horizontal"
      min="0"
      max="100"
      step="1"
      placeholder="Placeholder text"
    >
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input-number>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">
    <calcite-label class="calcite-mode-dark" status="idle" for="input-dark-mode">
      My great label
      <calcite-input-number
        id="input-dark-mode"
        status="idle"
        alignment="start"
        number-button-type="horizontal"
        min="0"
        max="100"
        step="1"
        placeholder="Placeholder text"
        validation-message="This should not appear because the status is not 'invalid'"
      >
      </calcite-input-number>
    </calcite-label>
  </div>
`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

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

export const fontSizeSetAtRoot = (): string =>
  html` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input-number placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input-number>`;

export const alignmentAllOptions = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input-number alignment="start" placeholder="Placeholder text"></calcite-input-number>
    <br />
    <calcite-input-number alignment="center" placeholder="Placeholder text"></calcite-input-number>
    <br />
    <calcite-input-number alignment="end" placeholder="Placeholder text"></calcite-input-number>
  </div>
`;
