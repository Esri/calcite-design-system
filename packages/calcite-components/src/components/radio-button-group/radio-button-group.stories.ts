import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { RadioButtonGroup } from "./radio-button-group";

const { layout, scale } = ATTRIBUTES;

interface RadioButtonGroupStoryArgs extends Pick<RadioButtonGroup, "disabled" | "layout" | "scale"> {
  hidden: boolean;
}

export default {
  title: "Components/Controls/Radio/Radio Button Group",
  args: {
    disabled: false,
    hidden: false,
    layout: layout.defaultValue,
    scale: scale.defaultValue,
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
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: RadioButtonGroupStoryArgs): string => html`
  <calcite-radio-button-group
    name="simple"
    ${boolean("disabled", args.disabled)}
    ${boolean("hidden", args.hidden)}
    layout="${args.layout}"
    scale="${args.scale}"
  >
    <calcite-label layout="inline">
      <calcite-radio-button value="react"></calcite-radio-button>
      React
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="ember"></calcite-radio-button>
      Ember
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="angular"></calcite-radio-button>
      Angular
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="vue"></calcite-radio-button>
      Vue
    </calcite-label>
  </calcite-radio-button-group>
`;

export const internalLabel = (): string => html`
  <calcite-radio-button-group scale="m" name="def-h-m" label-text="Label text" required>
    <calcite-radio-button value="stencil-def-m" checked label-text="Stencil"></calcite-radio-button>

    <calcite-radio-button value="react-def-m" label-text="React"></calcite-radio-button>

    <calcite-radio-button value="ember-def-m" label-text="Ember"></calcite-radio-button>

    <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
  </calcite-radio-button-group>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-radio-button-group
    class="calcite-mode-dark"
    dir="rtl"
    name="dark"
    layout="vertical"
    validation-icon
    validation-message="This should not appear because the status is not 'invalid'"
  >
    <calcite-label layout="inline">
      <calcite-radio-button value="react" checked></calcite-radio-button>
      React
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="ember"></calcite-radio-button>
      Ember
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="angular"></calcite-radio-button>
      Angular
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="vue"></calcite-radio-button>
      Vue
    </calcite-label>
  </calcite-radio-button-group>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

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
    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="s"
      status="invalid"
      validation-icon
      validation-message="Please select an option."
    >
      <calcite-label layout="inline" scale="s">
        <calcite-radio-button value="one" scale="s"></calcite-radio-button>
        One
      </calcite-label>
      <calcite-label layout="inline" scale="s">
        <calcite-radio-button value="two" scale="s"></calcite-radio-button>
        Two
      </calcite-label>
      <calcite-label layout="inline" scale="s">
        <calcite-radio-button value="three" scale="s"></calcite-radio-button>
        Three
      </calcite-label>
    </calcite-radio-button-group>

    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="m"
      status="invalid"
      validation-icon
      validation-message="Please select an option."
    >
      <calcite-label layout="inline" scale="m">
        <calcite-radio-button value="one" scale="m"></calcite-radio-button>
        One
      </calcite-label>
      <calcite-label layout="inline" scale="m">
        <calcite-radio-button value="two" scale="m"></calcite-radio-button>
        Two
      </calcite-label>
      <calcite-label layout="inline" scale="m">
        <calcite-radio-button value="three" scale="m"></calcite-radio-button>
        Three
      </calcite-label>
    </calcite-radio-button-group>

    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="l"
      status="invalid"
      validation-icon
      validation-message="Please select an option."
    >
      <calcite-label layout="inline" scale="l">
        <calcite-radio-button value="one" scale="l"></calcite-radio-button>
        One
      </calcite-label>
      <calcite-label layout="inline" scale="l">
        <calcite-radio-button value="two" scale="l"></calcite-radio-button>
        Two
      </calcite-label>
      <calcite-label layout="inline" scale="l">
        <calcite-radio-button value="three" scale="l"></calcite-radio-button>
        Three
      </calcite-label>
    </calcite-radio-button-group>
  </div>
`;
