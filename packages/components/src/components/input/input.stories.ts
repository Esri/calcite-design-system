import { iconNames } from "../../../.storybook/helpers";
import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Input } from "./input";

const { textType, alignment, layout, scale, status } = ATTRIBUTES;

type InputStoryArgs = Pick<
  Input,
  | "type"
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
  | "scale"
  | "status"
  | "placeholder"
  | "validationMessage"
  | "validationIcon"
>;

export default {
  title: "Components/Controls/Input",
  args: {
    type: textType.defaultValue,
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
    scale: scale.defaultValue,
    status: status.defaultValue,
    placeholder: "Placeholder text",
    validationMessage: "",
    validationIcon: "",
  },
  argTypes: {
    type: {
      options: textType.values,
      control: { type: "select" },
    },
    alignment: {
      options: alignment.values.filter((option) => option !== "center"),
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
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    status: {
      options: status.values,
      control: { type: "select" },
    },
    validationIcon: {
      options: iconNames,
      control: { type: "select" },
    },
  },
};

export const simple = (args: InputStoryArgs): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-label"
      type="${args.type}"
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
      scale="${args.scale}"
      status="${args.status}"
      placeholder="${args.placeholder}"
      validation-message="${args.validationMessage}"
      validation-icon="${args.validationIcon}"
    ></calcite-input>
  </div>
`;

export const withSlottedAction = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-slotted-action"
      type="text"
      alignment="start"
      number-button-type="horizontal"
      min="0"
      max="100"
      step="1"
      placeholder="Placeholder text"
      scale="m"
      status="idle"
    >
      <calcite-button slot="action">Go</calcite-button>
    </calcite-input>
  </div>
`;

export const textarea_TestOnly = (): string => html`
  <div style="width:300px;max-width:100%;text-align:center;">
    <calcite-input
      id="input-with-text-area"
      type="textarea"
      scale="m"
      status="idle"
      placeholder="Placeholder text"
      validation-message="My great input message"
    >
    </calcite-input>
  </div>
`;

export const disabled_TestOnly = (): string => html`<calcite-input disabled value="disabled"></calcite-input>`;

export const darkModeRTL_TestOnly = (): string => html`
  <div dir="rtl" style="width:300px;max-width:100%;text-align:center;">
    <calcite-label class="calcite-mode-dark" status="idle" for="input-dark-mode">
      My great label
      <calcite-input
        id="input-dark-mode"
        type="text"
        status="idle"
        alignment="start"
        number-button-type="horizontal"
        min="0"
        max="100"
        step="1"
        placeholder="Placeholder text"
        validation-message="This should not appear because the status is not 'invalid'"
      >
      </calcite-input>
    </calcite-label>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const negativeInfinity_TestOnly = (): string =>
  html` <calcite-input type="number" value="-Infinity"></calcite-input>`;

export const arabicLocaleWithLatinNumberingSystem_TestOnly = (): string =>
  html` <calcite-input type="number" lang="ar-EG" value="123456"></calcite-input>`;

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
    <calcite-input
      type="number"
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input>
    <calcite-input
      type="number"
      scale="m"
      status="invalid"
      validation-message="Value must be greater than 1337"
      validation-icon
      value="420"
    ></calcite-input>
    <calcite-input
      type="number"
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 2 characters"
      validation-icon
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

export const shrinkingInputDoesNotObscureCalendarIcon = (): string => html`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      background: #abcdef;
      padding: 8px;
      width: 200px;
    }
  </style>
  <div class="container">
    <calcite-input
      clearable
      icon="date-time"
      step=".001"
      type="datetime-local"
      value="2024-05-09T12:00:00.000"
    ></calcite-input>
  </div>
`;

export const fontSizeSetAtRoot = (): string =>
  html` <style>
      :root {
        font-size: 60px;
      }
    </style>
    <calcite-input placeholder="Placeholder" prefix-text="Prefix" suffix-text="Suffix" type="text" icon="search">
      <calcite-button slot="action"> Search </calcite-button>
    </calcite-input>`;

export const overlayDoesNotObscureIcon = (): string =>
  html` <style>
      .overlay {
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: 0.75;
      }
    </style>
    <calcite-input icon="check-square-f"></calcite-input>
    <div class="overlay"></div>`;
