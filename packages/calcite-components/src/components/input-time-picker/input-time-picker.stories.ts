import { iconNames } from "../../../.storybook/helpers";
import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { hourFormats } from "../../utils/time";
import { InputTimePicker } from "./input-time-picker";

const { scale, status } = ATTRIBUTES;

interface InputTimePickerStoryArgs
  extends Pick<
    InputTimePicker,
    | "disabled"
    | "hourFormat"
    | "name"
    | "placement"
    | "scale"
    | "status"
    | "step"
    | "validationMessage"
    | "validationIcon"
    | "value"
  > {
  hidden: boolean;
}

export default {
  title: "Components/Controls/Time/Input Time Picker",
  args: {
    disabled: false,
    hidden: false,
    hourFormat: undefined,
    name: "simple",
    placement: defaultMenuPlacement,
    scale: scale.defaultValue,
    status: status.defaultValue,
    step: 1,
    validationMessage: "",
    validationIcon: "",
    value: "10:37",
  },
  argTypes: {
    hourFormat: {
      options: hourFormats,
      control: { type: "select" },
    },
    placement: {
      options: menuPlacements,
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

export const simple = (args: InputTimePickerStoryArgs): string => html`
  <calcite-input-time-picker
    ${boolean("disabled", args.disabled)}
    ${boolean("hidden", args.hidden)}
    hour-format="${args.hourFormat}"
    name="${args.name}"
    placement="${args.placement}"
    scale="${args.scale}"
    status="${args.status}"
    step="${args.step}"
    validation-message="${args.validationMessage}"
    validation-icon="${args.validationIcon}"
    value="${args.value}"
  >
  </calcite-input-time-picker>
`;

export const deciSeconds_TestOnly = (): string => html`
  <calcite-input-time-picker step="0.1" value="10:37:09.5" open> </calcite-input-time-picker>
`;

export const centiseconds_TestOnly = (): string => html`
  <calcite-input-time-picker step="0.01" value="10:37:09.06" open> </calcite-input-time-picker>
`;

export const milliseconds_TestOnly = (): string => html`
  <calcite-input-time-picker step="0.001" value="10:37:09.023" open> </calcite-input-time-picker>
`;

export const disabled_TestOnly = (): string =>
  html`<calcite-input-time-picker disabled scale="l" icon step="1" value="01:02"></calcite-input-time-picker>`;

export const scales_TestOnly = (): string => html`
  <calcite-input-time-picker scale="s" icon value="01:02"></calcite-input-time-picker>
  <calcite-input-time-picker scale="m" icon value="01:02"></calcite-input-time-picker>
  <calcite-input-time-picker scale="l" icon value="01:02"></calcite-input-time-picker>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-input-time-picker
    class="calcite-mode-dark"
    value="22:37"
    step="1"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-input-time-picker>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const open_TestOnly = (): string => html`
  <calcite-input-time-picker value="10:37" open> </calcite-input-time-picker>
`;

export const koreanLocale_TestOnly = (): string => html`
  <calcite-input-time-picker lang="ko" value="10:37" step="1" open> </calcite-input-time-picker>
`;

export const arabicLocaleNumberingSystem_TestOnly = (): string => html`
  <calcite-input-time-picker dir="rtl" lang="ar" numbering-system="arab" step="1" value="1:33:7" open>
  </calcite-input-time-picker>
`;

export const readOnlyHasNoDropdownAffordance_TestOnly = (): string => html`
  <calcite-input-time-picker read-only value="10:37"></calcite-input-time-picker>
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
    <calcite-input-time-picker
      scale="s"
      status="invalid"
      value="13:37"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
    <calcite-input-time-picker
      scale="m"
      status="invalid"
      value="4:20"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
    <calcite-input-time-picker
      scale="l"
      status="invalid"
      value="11:11"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
  </div>
`;

export const widthSetToBreakpoints_TestOnly = (): string =>
  createBreakpointStories(html`<calcite-input-time-picker scale="{scale}" value="12:34"></calcite-input-time-picker>`);

export const Focus = (): string =>
  html`<calcite-input-time-picker></calcite-input-time-picker>
    <script type="module">
      const inputDatePicker = await document.querySelector("calcite-input-time-picker").componentOnReady();
      await inputDatePicker.setFocus();
    </script>`;
