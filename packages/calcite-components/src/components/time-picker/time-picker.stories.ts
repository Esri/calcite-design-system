import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";
import { locales, numberingSystems, defaultLocale, defaultNumberingSystem } from "../../utils/locale";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { TimePicker } from "./time-picker";
const { scale } = ATTRIBUTES;

interface TimePickerStoryArgs extends Pick<TimePicker, "numberingSystem" | "scale" | "step" | "value"> {
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
    name: "simple",
    numberingSystem: defaultNumberingSystem,
    placement: defaultMenuPlacement,
    scale: scale.defaultValue,
    step: 0.001,
    value: "10:37:09.023",
  },
  argTypes: {
    lang: {
      options: locales,
      control: { type: "select" },
    },
    numberingSystem: {
      options: numberingSystems,
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
  },
};

export const simple = (args: TimePickerStoryArgs): string => html`
  <calcite-time-picker
    ${boolean("disabled", args.disabled)}
    ${boolean("hidden", args.hidden)}
    lang="${args.lang}"
    name="${args.name}"
    numbering-system="${args.numberingSystem}"
    placement="${args.placement}"
    scale="${args.scale}"
    step="${args.step}"
    value="${args.value}"
  >
  </calcite-time-picker>
`;
