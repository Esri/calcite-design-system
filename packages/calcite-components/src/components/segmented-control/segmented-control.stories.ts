import { iconNames } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { layout, appearance, scale, width, status } = ATTRIBUTES;

interface SegmentedControl {
  layout: string;
  appearance: string;
  scale: string;
  width: string;
  disabled: boolean;
  status: string;
  validationIcon: string;
  validationMessage: string;
}

export default {
  title: "Components/Controls/Radio/Segmented Control",
  args: {
    layout: layout.defaultValue,
    appearance: appearance.defaultValue,
    scale: scale.defaultValue,
    width: width.defaultValue,
    disabled: false,
    status: status.defaultValue,
    validationIcon: "",
    validationMessage: "",
  },
  argTypes: {
    layout: {
      options: layout.values.filter(
        (option) =>
          option !== "grid" &&
          option !== "inline" &&
          option !== "center" &&
          option !== "auto" &&
          option !== "fixed" &&
          option !== "none" &&
          option !== "horizontal-single",
      ),
      control: { type: "select" },
    },
    appearance: {
      options: appearance.values.filter((option) => option !== "transparent"),
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    width: {
      options: width.values.filter((option) => option !== "half"),
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

export const simple = (args: SegmentedControl): string => html`
  <calcite-segmented-control
    layout="${args.layout}"
    appearance="${args.appearance}"
    scale="${args.scale}"
    width="${args.width}"
    ${args.disabled ? "disabled" : ""}
    status="${args.status}"
    validation-icon="${args.validationIcon}"
    validation-message="${args.validationMessage}"
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
`;

export const fullWidthWithIcons = (): string => html`
  <div style="width:33vw;">
    <calcite-label scale="m">
      My great segmented control
      <calcite-segmented-control
        layout="horizontal"
        appearance="solid"
        width="full"
        status="idle"
        validation-icon=""
        validation-message=""
      >
        <calcite-segmented-control-item icon-start="car" value="car" checked>Car</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="plane" value="plane">Plane</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="biking" value="bicycle">Bicycle</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-segmented-control
    class="calcite-mode-dark"
    dir="rtl"
    validation-message="This should not appear because the status is not 'invalid'"
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const disabled_TestOnly = (): string =>
  html`<calcite-segmented-control disabled>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>`;

export const WithIconStartAndEnd = (): string =>
  html` <calcite-segmented-control scale="s">
    <calcite-segmented-control-item icon-start="car" icon-end="car" value="car" checked
      >Car</calcite-segmented-control-item
    >
    <calcite-segmented-control-item icon-start="plane" icon-end="plane" value="plane"
      >Plane</calcite-segmented-control-item
    >
    <calcite-segmented-control-item icon-start="biking" icon-end="biking" value="bicycle"
      >Bicycle</calcite-segmented-control-item
    >
    <calcite-segmented-control-item value="nothing">Nothing</calcite-segmented-control-item>
  </calcite-segmented-control>`;

export const validationMessage_TestOnly = (): string => html`
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
    <calcite-segmented-control
      name="validation"
      required
      scale="s"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="s" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="s" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>

    <calcite-segmented-control
      name="validation"
      required
      scale="m"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="m" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="m" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>

    <calcite-segmented-control
      name="validation"
      required
      scale="l"
      status="invalid"
      validation-icon
      validation-message="Please select an item."
    >
      <calcite-segmented-control-item scale="l" value="react" checked>React</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="ember">Ember</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="angular">Angular</calcite-segmented-control-item>
      <calcite-segmented-control-item scale="l" value="vue">Vue</calcite-segmented-control-item>
    </calcite-segmented-control>
  </div>
`;
