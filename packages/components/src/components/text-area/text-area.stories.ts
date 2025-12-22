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

export const Simple = (args: TextAreaStoryArgs): string => html`
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

export const DarkModeRTL = (): string => html`
  <calcite-text-area
    dir="rtl"
    class="calcite-mode-dark"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-text-area>
`;

export const WithSlottedElements = (): string => html`
  <calcite-text-area placeholder="Add Notes" max-length="50" scale="m" placeholder="Add Notes" columns="20" rows="2">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
`;

export const WithSlottedElementsDarkModeRTL = (): string => html`
  <calcite-text-area max-length="50" placeholder="Add Notes" dir="rtl" class="calcite-mode-dark">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
`;

export const Disabled = (): string => html` <calcite-text-area disabled> </calcite-text-area> `;

export const Readonly = (): string => html` <calcite-text-area readonly> </calcite-text-area> `;

export const ResizeDisabled = (): string => html` <calcite-text-area resize="none"> </calcite-text-area> `;

export const GroupSeparator = (): string => html`
  <calcite-text-area value="Rocky Mountains National Park" lang="fr" max-length="123456" group-separator>
  </calcite-text-area>
`;

export const ExceedingMaxLength = (): string => html`
  <calcite-text-area value="Rocky Mountains National Park" max-length="10"> </calcite-text-area>
`;

export const ChineseLang = (): string => html`
  <calcite-text-area value="Rocky Mountains National Park" lang="zh-cn" group-separator max-length="654321">
  </calcite-text-area>
`;

export const InsideContainerWithHeightAndWidth = (): string =>
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

export const ValidationMessageAllScales = (): string => html`
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
