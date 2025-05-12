import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { iconNames } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Action } from "./action";

const { alignment, appearance, scale } = ATTRIBUTES;

type ActionStoryArgs = Pick<
  Action,
  | "active"
  | "pressed"
  | "expanded"
  | "type"
  | "alignment"
  | "appearance"
  | "disabled"
  | "icon"
  | "indicator"
  | "label"
  | "loading"
  | "scale"
  | "text"
  | "textEnabled"
>;

export default {
  title: "Components/Buttons/Action",
  args: {
    active: false,
    alignment: alignment.defaultValue,
    appearance: appearance.defaultValue,
    disabled: false,
    expanded: false,
    icon: "banana",
    indicator: false,
    label: "Label",
    loading: false,
    pressed: false,
    scale: scale.defaultValue,
    text: "",
    textEnabled: true,
    type: "button",
  },
  argTypes: {
    alignment: {
      options: alignment.values,
      control: { type: "select" },
    },
    appearance: {
      options: appearance.values.filter((option) => option !== "outline" && option !== "outline-fill"),
      control: { type: "select" },
    },
    icon: {
      options: iconNames,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    type: {
      options: ["button", "toggle", "expand-toggle"],
      control: { type: "select" },
    },
  },
};

export const simple = (args: ActionStoryArgs): string => html`
  <div>
    <calcite-action
      ${boolean("active", args.active)}
      ${boolean("disabled", args.disabled)}
      ${boolean("expanded", args.expanded)}
      ${boolean("indicator", args.indicator)}
      ${boolean("loading", args.loading)}
      ${boolean("pressed", args.pressed)}
      ${boolean("text-enabled style", args.textEnabled)}
      alignment="${args.alignment}"
      appearance="${args.appearance}"
      icon="${args.icon}"
      label="${args.label}"
      scale="${args.scale}"
      text="${args.text}"
      type="${args.type}"
    ></calcite-action>
  </div>
`;

export const disabledAndTextOnly_TestOnly = (): string => html`
  <div>
    <calcite-action
      icon="banana"
      alignment="start"
      appearance="solid"
      label="Label"
      scale="m"
      disabled
      text="Text"
      text-enabled
    ></calcite-action>
    <calcite-action
      pressed
      icon="banana"
      alignment="start"
      appearance="solid"
      label="Label"
      scale="m"
      disabled
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`;

export const activeAndAppearanceTransparent_TestOnly = (): string => html`
  <div>
    <calcite-action
      icon="banana"
      alignment="start"
      label="Label"
      scale="m"
      pressed
      appearance="transparent"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`;

export const alignmentEndAndSmallScaleAndIndicator_TestOnly = (): string => html`
  <div style="width: 300px">
    <calcite-action
      appearance="solid"
      icon="banana"
      alignment="end"
      label="Label"
      indicator
      scale="s"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`;

export const alignmentStartAndLargeScaleAndTextOverflow_TestOnly = (): string => html`
  <div style="width: 150px">
    <calcite-action
      appearance="solid"
      icon="banana"
      alignment="start"
      label="Label"
      scale="l"
      text="Blah blah blah blah blah blah blah blah blah blah"
      text-enabled
    ></calcite-action>
  </div>
`;

export const indicatorTextEnabled_TestOnly = (): string => html`
  <calcite-action
    appearance="solid"
    indicator
    scale="m"
    pressed
    text="click-me"
    text-enabled
    icon="gear"
  ></calcite-action>
`;

export const indicatorTextEnabledNoIcon_TestOnly = (): string => html`
  <calcite-action indicator scale="m" pressed text="click-me" text-enabled></calcite-action>
`;

export const indicatorNoTextEnabledNoIcon_TestOnly = (): string => html`
  <calcite-action indicator pressed text="click-me"></calcite-action>
`;

export const noTextHeight_TestOnly = (): string => html`
  <h2>All actions should be the same height</h2>
  <div style="width: min-content">
    <div style="border: solid 1px">
      <calcite-action text="hello" text-enabled icon="home" scale="s"></calcite-action>
    </div>
    <div style="border: solid 1px">
      <calcite-action text="hello" icon="home" scale="s"></calcite-action>
    </div>
    <div style="border: solid 1px">
      <calcite-action icon="home" scale="s"></calcite-action>
    </div>
  </div>
`;

export const arabicLocale_TestOnly = (): string => html`
  <calcite-action
    dir="rtl"
    icon="banana"
    lang="ar"
    lang="ar-EG"
    text="لكن لا بد أن أوضح لك أن كل"
    text-enabled
  ></calcite-action>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div>
    <calcite-action
      appearance="solid"
      label="Label"
      scale="m"
      icon="banana"
      alignment="start"
      class="calcite-mode-dark"
      dir="rtl"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
