import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { iconNames } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { status, width, scale } = ATTRIBUTES;

interface SelectArgs {
  selectDisabled: boolean;
  status: string;
  width: string;
  scale: string;
  validationMessage: string;
  validationIcon: string;
  optionDisabled: boolean;
  label: string;
  selected: boolean;
  value: string;
}

export default {
  title: "Components/Controls/Select",
  args: {
    selectDisabled: false,
    status: status.defaultValue,
    width: width.defaultValue,
    scale: scale.defaultValue,
    validationMessage: "",
    validationIcon: "",
    optionDisabled: false,
    label: "fancy label",
    selected: false,
    value: "",
  },
  argTypes: {
    status: {
      options: status.values,
      control: { type: "select" },
    },
    width: {
      options: width.values,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    validationIcon: {
      options: iconNames,
      control: { type: "select" },
    },
  },
};

export const simple = (args: SelectArgs): string => html`
  <div style="width:260px">
    <calcite-select
      ${args.selectDisabled ? "disabled" : ""}
      status="${args.status}"
      width="${args.width}"
      scale="${args.scale}"
      validation-message="${args.validationMessage}"
      validation-icon="${args.validationIcon}"
    >
      <calcite-option
        ${args.optionDisabled ? "disabled" : ""}
        label="${args.label}"
        ${args.selected ? "selected" : ""}
        value="${args.value}"
      ></calcite-option>
      <calcite-option
        selected
        label="some fixed option with a very long label set on it to extend past the end"
        value="some-fixed-value"
      ></calcite-option>
      <calcite-option label="another fixed option" value="another-fixed-value"></calcite-option>
    </calcite-select>
  </div>
`;

export const grouped = (): string => html`
  <calcite-select status="idle" width="auto" scale="m" validation-message="" validation-icon="">
    <calcite-option-group label="My fancy group label">
      <calcite-option label="fancy label" value="value"></calcite-option>
      <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>
      <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>
    </calcite-option-group>
    <calcite-option-group label="group B (fixed)">
      <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>
      <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>
    </calcite-option-group>
  </calcite-select>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-select
    status="idle"
    width="auto"
    scale="m"
    validation-message=""
    validation-icon=""
    dir="rtl"
    class="calcite-mode-dark"
    calcite-hydrated=""
  >
    <calcite-option-group label="My fancy group label" calcite-hydrated="">
      <calcite-option label="fancy label" value="value" selected="" calcite-hydrated=""></calcite-option>
      <calcite-option label="some fixed option (A)" value="some-fixed-value-a" calcite-hydrated=""></calcite-option>
      <calcite-option
        label="another fixed option (A)"
        value="another-fixed-value-a"
        calcite-hydrated=""
      ></calcite-option>
    </calcite-option-group>
    <calcite-option-group label="group B (fixed)" calcite-hydrated="">
      <calcite-option label="some fixed option (B)" value="some-fixed-value-b" calcite-hydrated=""></calcite-option>
      <calcite-option
        label="another fixed option (B)"
        value="another-fixed-value-b"
        calcite-hydrated=""
      ></calcite-option>
    </calcite-option-group>
  </calcite-select>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const disabledAndLargeScaleGetsMediumChevron_TestOnly = (): string => html`
  <calcite-select disabled scale="l">
    <calcite-option label="first" value="1"></calcite-option>
    <calcite-option label="second" value="2"></calcite-option>
  </calcite-select>
`;

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
    <calcite-select scale="s" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
    <calcite-select scale="m" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
    <calcite-select scale="l" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
  </div>
`;
