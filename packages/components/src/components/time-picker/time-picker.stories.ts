import { defaultLocale } from "@arcgis/toolkit/intl";
import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { TimePicker } from "./time-picker";

const { hourFormat, menuPlacement, numberingSystem, scale, supportedNlsLocale } = ATTRIBUTES;

interface TimePickerStoryArgs extends Pick<TimePicker, "hourFormat" | "numberingSystem" | "scale" | "step" | "value"> {
  disabled: boolean;
  hidden: boolean;
  lang: string;
  name: string;
  placement: string;
}

export default {
  title: "Components/Controls/Time/Time Picker",
  args: {
    disabled: false,
    hidden: false,
    lang: defaultLocale,
    hourFormat: hourFormat.defaultValue,
    name: "simple",
    numberingSystem: numberingSystem.defaultValue,
    placement: menuPlacement.defaultValue,
    scale: scale.defaultValue,
    step: 0.001,
    value: "10:37:09.023",
  },
  argTypes: {
    lang: {
      options: supportedNlsLocale.values,
      control: { type: "select" },
    },
    numberingSystem: {
      options: numberingSystem.values,
      control: { type: "select" },
    },
    hourFormat: {
      options: hourFormat.values,
      control: { type: "select" },
    },
    placement: {
      options: menuPlacement.values,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: TimePickerStoryArgs): string => html`
  <calcite-time-picker
    ${boolean("disabled", args.disabled)}
    ${boolean("hidden", args.hidden)}
    lang="${args.lang}"
    hour-format="${args.hourFormat}"
    name="${args.name}"
    numbering-system="${args.numberingSystem}"
    placement="${args.placement}"
    scale="${args.scale}"
    step="${args.step}"
    value="${args.value}"
  >
  </calcite-time-picker>
`;

export const koreanLocale = (): string => html`
  <calcite-time-picker lang="ko" value="10:37" step="1"> </calcite-time-picker>
  <calcite-time-picker lang="ko" value="14:37" step="1"> </calcite-time-picker>
`;
