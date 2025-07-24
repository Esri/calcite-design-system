import { boolean } from "../../../.storybook/utils";
import { iconNames } from "../../../.storybook/helpers";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { TextArea } from "./text-area";

const { scale, status } = ATTRIBUTES;

type TextAreaStoryArgs = Pick<
  TextArea,
  | "scale"
  | "status"
  | "placeholder"
  | "disabled"
  | "columns"
  | "resize"
  | "rows"
  | "label"
  | "name"
  | "validationMessage"
  | "validationIcon"
>;

export default {
  title: "Components/TextArea",
  args: {
    scale: scale.defaultValue,
    status: status.defaultValue,
    placeholder: "Add Notes",
    disabled: false,
    columns: 20,
    resize: "both",
    rows: 2,
    label: "",
    name: "",
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
    validationIcon: {
      options: iconNames,
      control: { type: "select" },
    },
  },
};

export const simple = (args: TextAreaStoryArgs): string => html`
  <calcite-text-area
    scale="${args.scale}"
    status="${args.status}"
    placeholder="${args.placeholder}"
    ${boolean("disabled", args.disabled)}
    columns="${args.columns}"
    resize="${args.resize}"
    rows="${args.rows}"
    label="${args.label}"
    name="${args.name}"
    validation-message="${args.validationMessage}"
    validation-icon="${args.validationIcon}"
  >
  </calcite-text-area>
`;

export const internalLabel = (): string => html`
  <calcite-text-area placeholder="add notes" scale="m" label-text="Label text" required>
    <calcite-icon slot="internal-label-content" icon="banana" scale="m"></calcite-icon>
  </calcite-text-area>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-text-area
    dir="rtl"
    class="calcite-mode-dark"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-text-area>
`;

export const withSlottedElements = (): string => html`
  <calcite-text-area placeholder="Add Notes" max-length="50" scale="m" placeholder="Add Notes" columns="20" rows="2">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
`;

export const withSlottedElementsDarkModeRTL_TestOnly = (): string => html`
  <calcite-text-area max-length="50" placeholder="Add Notes" dir="rtl" class="calcite-mode-dark">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
`;

export const disabled_TestOnly = (): string => html` <calcite-text-area disabled> </calcite-text-area> `;

export const readonly_TestOnly = (): string => html` <calcite-text-area readonly> </calcite-text-area> `;

export const resizeDisabled_TestOnly = (): string => html` <calcite-text-area resize="none"> </calcite-text-area> `;

export const groupSeparator_TestOnly = (): string => html`
  <calcite-text-area value="Rocky Mountains National Park" lang="fr" max-length="123456" group-separator>
  </calcite-text-area>
`;

export const exceedingMaxLength_TestOnly = (): string => html`
  <calcite-text-area value="Rocky Mountains National Park" max-length="10"> </calcite-text-area>
`;

export const chineseLang_TestOnly = (): string => html`
  <calcite-text-area value="Rocky Mountains National Park" lang="zh-cn" group-separator max-length="654321">
  </calcite-text-area>
`;

export const insideContainerWithHeightAndWidth_TestOnly = (): string =>
  html`<div style="width:500px;height:500px"><calcite-text-area></calcite-text-area></div>`;

/** Adds explicit height/width for components using position:fixed per Chromatic doc <https://www.chromatic.com/docs/snapshots/#why-isn%E2%80%99t-my-modal-or-dialog-captured>. */
const wrapperStyles = html`
  <style>
    .wrapper {
      display: flex;
      width: 800px;
      height: 250px;
      padding: 64px;
      gap: 10px;
    }
  </style>
`;

export const validationMessageAllScales_TestOnly = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-text-area
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-text-area>
    <calcite-text-area
      scale="m"
      status="invalid"
      validation-message="Less than the minimum length of 6 characters"
      validation-icon
      value="Hi"
    ></calcite-text-area>
    <calcite-text-area
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 9 characters"
      validation-icon
      value="Lorem ipsum"
    ></calcite-text-area>
  </div>
`;
