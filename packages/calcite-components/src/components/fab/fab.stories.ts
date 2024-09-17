import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Fab } from "./fab";
import { ICONS } from "./resources";
const { appearance, scale } = ATTRIBUTES;

type FabStoryArgs = Pick<
  Fab,
  "appearance" | "disabled" | "icon" | "label" | "loading" | "text" | "textEnabled" | "scale"
>;

export default {
  title: "Components/Buttons/FAB",
  args: {
    appearance: appearance.values[2],
    disabled: false,
    icon: ICONS.plus,
    label: "Label",
    loading: false,
    text: "Text",
    textEnabled: true,
    scale: scale.defaultValue,
  },
  argTypes: {
    appearance: {
      options: appearance.values.filter((option) => option !== "outline" && option !== "transparent"),
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: FabStoryArgs): string => html`
  <calcite-fab
    appearance="${args.appearance}"
    ${boolean("disabled", args.disabled)}
    icon="${args.icon}"
    label="${args.label}"
    ${boolean("loading", args.loading)}
    text="${args.text}"
    ${boolean("text-enabled", args.textEnabled)}
    scale="${args.scale}"
  ></calcite-fab>
`;
export const disabled_TestOnly = (): string => html`
  <calcite-fab disabled icon="plus"></calcite-fab>
  <br />
  <calcite-fab disabled loading icon="plus"></calcite-fab>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-fab
    appearance="outline-fill"
    icon="plus"
    label="Label"
    text="Text"
    text-enabled
    scale="m"
    dir="rtl"
    class="calcite-mode-dark"
  ></calcite-fab>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
