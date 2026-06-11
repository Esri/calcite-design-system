import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { iconNames } from "../../../.storybook/helpers";
import { Fab } from "./fab";
import { ICONS } from "./resources";

const { appearance, kind, scale } = ATTRIBUTES;

type FabStoryArgs = Pick<
  Fab,
  "appearance" | "disabled" | "icon" | "iconFlipRtl" | "kind" | "label" | "loading" | "text" | "textEnabled" | "scale"
>;

export default {
  title: "Components/Buttons/FAB",
  args: {
    appearance: appearance.values[2],
    disabled: false,
    icon: ICONS.plus,
    iconFlipRtl: false,
    kind: kind.defaultValue,
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
    icon: {
      options: iconNames,
      control: { type: "select" },
    },
    kind: {
      options: kind.values,
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
    ${boolean("icon-flip-rtl", args.iconFlipRtl)}
    kind="${args.kind}"
    label="${args.label}"
    ${boolean("loading", args.loading)}
    text="${args.text}"
    ${boolean("text-enabled", args.textEnabled)}
    scale="${args.scale}"
  ></calcite-fab>
`;
export const disabled = (): string => html`
  <calcite-fab disabled icon="plus"></calcite-fab>
  <br />
  <calcite-fab disabled loading icon="plus"></calcite-fab>
`;

export const darkModeRTL = (): string => html`
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

darkModeRTL.parameters = { themes: modesDarkDefault };
