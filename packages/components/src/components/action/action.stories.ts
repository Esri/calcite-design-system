import { without } from "es-toolkit";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { iconNames } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Action } from "./action";

const { alignment, appearance, scale, selectionAppearance } = ATTRIBUTES;

const menuItems = html`
  <calcite-action slot="menu-actions" text="Edit" text-enabled></calcite-action>
  <calcite-action slot="menu-actions" text="Duplicate" text-enabled></calcite-action>
  <calcite-action-group slot="menu-actions">
    <calcite-action text="Delete" text-enabled></calcite-action>
  </calcite-action-group>
`;

type ActionStoryArgs = Pick<
  Action,
  | "active"
  | "alignment"
  | "appearance"
  | "buttonType"
  | "disabled"
  | "icon"
  | "indicator"
  | "label"
  | "loading"
  | "scale"
  | "text"
  | "textEnabled"
  | "selectionAppearance"
>;

export default {
  title: "Components/Buttons/Action",
  args: {
    active: false,
    alignment: alignment.defaultValue,
    appearance: appearance.defaultValue,
    buttonType: undefined,
    disabled: false,
    icon: "banana",
    indicator: false,
    label: "Label",
    loading: false,
    scale: scale.defaultValue,
    selectionAppearance: selectionAppearance.values[2],
    text: "",
    textEnabled: true,
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
    buttonType: {
      options: [undefined, "overflow", "split", "menu"],
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    selectionAppearance: {
      options: without(selectionAppearance.values, "icon", "border"),
      control: { type: "select" },
    },
  },
};

export const simple = (args: ActionStoryArgs): string => html`
  <div>
    <calcite-action
      ${boolean("active", args.active)}
      alignment="${args.alignment}"
      appearance="${args.appearance}"
      ${args.buttonType ? `button-type="${args.buttonType}"` : ""}
      ${boolean("disabled", args.disabled)}
      icon="${args.icon}"
      ${boolean("indicator", args.indicator)}
      label="${args.label}"
      ${boolean("loading", args.loading)}
      scale="${args.scale}"
      selection-appearance="${args.selectionAppearance}"
      text="${args.text}"
      ${boolean("text-enabled style", args.textEnabled)}
    >
      <calcite-action slot="menu-actions" text="Item 1" text-enabled></calcite-action>
      <calcite-action slot="menu-actions" text="Item 2" text-enabled></calcite-action>
    </calcite-action>
  </div>
`;

export const splitWithMenu = (): string => html`
  <calcite-action button-type="split" icon="banana" text="Action" text-enabled>
    <calcite-action slot="menu-actions" text="Edit" text-enabled></calcite-action>
    <calcite-action slot="menu-actions" text="Duplicate" text-enabled></calcite-action>
  </calcite-action>
`;

export const overflowWithMenu = (): string => html`
  <calcite-action button-type="overflow" text="Action" text-enabled>
    <calcite-action slot="menu-actions" text="Edit" text-enabled></calcite-action>
    <calcite-action slot="menu-actions" text="Duplicate" text-enabled></calcite-action>
  </calcite-action>
`;

export const menuWithMenu = (): string => html`
  <calcite-action button-type="menu" icon="banana" text="Action" text-enabled>
    <calcite-action slot="menu-actions" text="Edit" text-enabled></calcite-action>
    <calcite-action slot="menu-actions" text="Duplicate" text-enabled></calcite-action>
  </calcite-action>
`;

export const disabledAndTextOnly = (): string => html`
  <div>
    <calcite-action
      alignment="start"
      appearance="solid"
      disabled
      icon="banana"
      text-enabled
      text="Text"
    ></calcite-action>
    <calcite-action
      active
      alignment="start"
      appearance="solid"
      disabled
      icon="banana"
      text-enabled
      text="Text"
    ></calcite-action>
    <calcite-action
      alignment="start"
      appearance="solid"
      disabled
      icon="banana"
      loading
      text-enabled
      text="Text"
    ></calcite-action>
  </div>
`;

export const loading = (): string => html`
  <div>
    <calcite-action icon="banana" loading text-enabled text="Text"></calcite-action>
    <calcite-action active icon="banana" loading text-enabled text="Text"></calcite-action>
  </div>
`;

export const activeAndAppearanceTransparent = (): string => html`
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

export const alignmentEndAndSmallScaleAndIndicator = (): string => html`
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

export const alignmentStartAndLargeScaleAndTextOverflow = (): string => html`
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

export const indicatorTextEnabled = (): string => html`
  <calcite-action
    appearance="solid"
    indicator
    scale="m"
    active
    text="click-me"
    text-enabled
    icon="gear"
  ></calcite-action>
`;

export const indicatorTextEnabledNoIcon = (): string => html`
  <calcite-action indicator scale="m" active text="click-me" text-enabled></calcite-action>
`;

export const indicatorNoTextEnabledNoIcon = (): string => html`
  <calcite-action indicator active text="click-me"></calcite-action>
`;

export const noTextHeight = (): string => html`
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

export const arabicLocale = (): string => html`
  <calcite-action
    dir="rtl"
    icon="banana"
    lang="ar"
    lang="ar-EG"
    text="لكن لا بد أن أوضح لك أن كل"
    text-enabled
  ></calcite-action>
`;

export const darkModeRTL = (): string => html`
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

darkModeRTL.parameters = { themes: modesDarkDefault };

export const multipleActionsWithMenus = (): string => html`
  <style>
    .multiple-actions-grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 16px;
    }
    .multiple-actions-row {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }
    .multiple-actions-label {
      font-family: sans-serif;
      font-size: 12px;
      color: #555;
      margin-block-end: 8px;
    }
  </style>
  <div class="multiple-actions-grid">
    <div>
      <div class="multiple-actions-label">Small</div>
      <div class="multiple-actions-row">
        <calcite-action button-type="menu" icon="plus" scale="s" text="Add" text-enabled> ${menuItems} </calcite-action>
        <calcite-action button-type="menu" icon="pencil" scale="s" text="Edit" text-enabled>
          ${menuItems}
        </calcite-action>
        <calcite-action button-type="split" icon="trash" scale="s" text="Delete" text-enabled>
          ${menuItems}
        </calcite-action>
        <calcite-action button-type="overflow" scale="s" text="More" text-enabled> ${menuItems} </calcite-action>
      </div>
    </div>
    <div>
      <div class="multiple-actions-label">Medium</div>
      <div class="multiple-actions-row">
        <calcite-action button-type="menu" icon="plus" scale="m" text="Add" text-enabled> ${menuItems} </calcite-action>
        <calcite-action button-type="menu" icon="pencil" scale="m" text="Edit" text-enabled>
          ${menuItems}
        </calcite-action>
        <calcite-action button-type="split" icon="trash" scale="m" text="Delete" text-enabled>
          ${menuItems}
        </calcite-action>
        <calcite-action button-type="overflow" scale="m" text="More" text-enabled> ${menuItems} </calcite-action>
      </div>
    </div>
    <div>
      <div class="multiple-actions-label">Large</div>
      <div class="multiple-actions-row">
        <calcite-action button-type="menu" icon="plus" scale="l" text="Add" text-enabled> ${menuItems} </calcite-action>
        <calcite-action button-type="menu" icon="pencil" scale="l" text="Edit" text-enabled>
          ${menuItems}
        </calcite-action>
        <calcite-action button-type="split" icon="trash" scale="l" text="Delete" text-enabled>
          ${menuItems}
        </calcite-action>
        <calcite-action button-type="overflow" scale="l" text="More" text-enabled> ${menuItems} </calcite-action>
      </div>
    </div>
  </div>
`;
