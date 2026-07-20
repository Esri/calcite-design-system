import { iconNames } from "../../../.storybook/helpers";
import { boolean, createBreakpointStories, modesDarkDefault, optionalAttribute } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Input } from "./input";
import "./input"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

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
  | "icon"
  | "iconFlipRtl"
  | "value"
  | "readOnly"
  | "required"
  | "scale"
  | "status"
  | "placeholder"
  | "validationIcon"
  | "inlineEditable"
  | "inlineEditableControls"
  | "validationMessage"
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
    icon: "",
    iconFlipRtl: false,
    value: "",
    readOnly: false,
    required: false,
    scale: scale.defaultValue,
    status: status.defaultValue,
    placeholder: "Placeholder text",
    validationMessage: "",
    validationIcon: "",
    inlineEditable: false,
    inlineEditableControls: false,
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
    icon: {
      options: ["", ...iconNames],
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
      ${optionalAttribute("icon", args.icon)}
      ${boolean("icon-flip-rtl", args.iconFlipRtl)}
      value="${args.value}"
      ${boolean("read-only", args.readOnly)}
      ${boolean("required", args.required)}
      scale="${args.scale}"
      status="${args.status}"
      placeholder="${args.placeholder}"
      validation-message="${args.validationMessage}"
      ${boolean("inline-editable", args.inlineEditable)}
      ${boolean("inline-editable-controls", args.inlineEditableControls)}
      ${optionalAttribute("validation-icon", args.validationIcon)}
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

export const disabled = (): string => html`<calcite-input disabled value="disabled"></calcite-input>`;

export const darkModeRTL = (): string => html`
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

darkModeRTL.parameters = { themes: modesDarkDefault };

export const negativeInfinity = (): string => html` <calcite-input type="number" value="-Infinity"></calcite-input>`;

export const arabicLocaleWithLatinNumberingSystem = (): string =>
  html` <calcite-input type="number" lang="ar-EG" value="123456"></calcite-input>`;

export const validationMessageAllScales = (): string => html`
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

export const widthSetToBreakpoints = (): string =>
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

export const numberHorizontal = (): string => html`
  <calcite-input type="number" number-button-type="horizontal" value="123" clearable> </calcite-input>
`;

export const inlineEditable = (): string => html`
  <div>
    <calcite-input inline-editable inline-editable-controls value="Editable value"></calcite-input>
  </div>
`;
