import { select, text } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Radio/Radio Button Group",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-radio-button-group
    name="simple"
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
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

// We created a separate story for validation-message because it is not possible
// to set a text knob's value to undefined. Unfortunately, this makes the CSS
// attribute selector truthy, which sets "--calcite-label-margin-bottom: 0;",
// causing a Chromatic diff. See calcite-radio-button-group.scss.
export const validationMessage_NoTest = (): string => html`
  <calcite-radio-button-group
    name="simple"
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    status="${select("status", ["idle", "invalid", "valid"], "invalid")}"
    validation-icon="${select("validation-icon", ["", ...iconNames], "")}"
    validation-message="${text("validation-message", "Please fill out this field.")}"
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

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

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

export const theming_TestOnly = (): string => html`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }

    .themed {
      --calcite-radio-button-group-input-message-spacing-value: 100px;
    }
  </style>
  <div class="container">
    <calcite-radio-button-group
      layout="horizontal"
      name="validation"
      required
      scale="s"
      status="invalid"
      class="themed"
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
      class="themed"
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
      class="themed"
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
