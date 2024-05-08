import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { iconNames } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { alignment, scale } = ATTRIBUTES;

interface Args {
  alignment: string;
  appearance: string;
  icon: string;
  label: string;
  scale: string;
  text: string;
}

export default {
  title: "Components/Buttons/Action",
  args: {
    alignment: alignment.defaultValue,
    appearance: "solid",
    icon: "banana",
    label: "Label",
    scale: scale.defaultValue,
    text: "",
  },
  argTypes: {
    alignment: {
      options: alignment.values,
      control: { type: "select" },
    },
    appearance: {
      options: ["solid", "transparent"],
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
  },
};

export const simple = (args: Args): string => html`
  <div>
    <calcite-action
      alignment="${args.alignment}"
      appearance="${args.appearance}"
      icon="${args.icon}"
      label="${args.label}"
      scale="${args.scale}"
      text-enabled
      text="${args.text}"
    ></calcite-action>
  </div>
`;

export const disabledAndCompactAndTextOnly_TestOnly = (): string => html`
  <div>
    <calcite-action
      icon="banana"
      alignment="start"
      label="Label"
      compact
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
      active
      appearance="transparent"
      text="Text"
      text-enabled
    ></calcite-action>
  </div>
`;

export const alignmentEndAndSmallScaleAndIndicator_TestOnly = (): string => html`
  <div style="width: 300px">
    <calcite-action
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
  <calcite-action indicator scale="m" active text="click-me" text-enabled icon="gear"></calcite-action>
`;

export const indicatorTextEnabledNoIcon_TestOnly = (): string => html`
  <calcite-action indicator scale="m" active text="click-me" text-enabled></calcite-action>
`;

export const indicatorNoTextEnabledNoIcon_TestOnly = (): string => html`
  <calcite-action indicator active text="click-me"></calcite-action>
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
