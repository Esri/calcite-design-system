import { iconNames } from "../../../.storybook/helpers";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { alignment, buttonType, width } = ATTRIBUTES;

interface TileSelectArgs {
  checked: boolean;
  description: string;
  disabled: boolean;
  heading: string;
  hidden: boolean;
  icon: string;
  inputAlignment: string;
  inputEnabled: boolean;
  type: string;
  value: string;
  width: string;
}

export default {
  title: "Components/Tiles/Tile Select",
  args: {
    checked: false,
    description: "",
    disabled: false,
    heading: "",
    hidden: false,
    icon: "",
    inputAlignment: alignment.defaultValue,
    inputEnabled: false,
    type: buttonType.defaultValue,
    value: "one",
    width: width.defaultValue,
  },
  argTypes: {
    icon: {
      options: iconNames,
      control: { type: "select" },
    },
    inputAlignment: {
      options: alignment.values.filter((option) => option !== "center"),
      control: { type: "select" },
    },
    type: {
      options: buttonType.values,
      control: { type: "select" },
    },
    width: {
      options: width.values.filter((option) => option !== "half"),
      control: { type: "select" },
    },
  },
};

export const simple = (args: TileSelectArgs): string => html`
  <calcite-tile-select
    ${args.checked ? "checked" : ""}
    description="${args.description}"
    ${args.disabled ? "disabled" : ""}
    heading="${args.heading}"
    ${args.hidden ? "hidden" : ""}
    icon="${args.icon}"
    input-alignment="${args.inputAlignment}"
    ${args.inputEnabled ? "input-enabled" : ""}
    type="${args.type}"
    value="${args.value}"
    width="${args.width}"
  ></calcite-tile-select>
`;

export const checkbox_TestOnly = (): string =>
  html`<calcite-tile-select icon="check" heading="test" value="one" type="checkbox"></calcite-tile-select>`;

export const radio_TestOnly = (): string =>
  html`<calcite-tile-select icon="list-radio" heading="test" value="one" type="radio"></calcite-tile-select>`;

export const checkboxDarkModeRTL_TestOnly = (): string =>
  html`<calcite-tile-select
    class="calcite-mode-dark"
    dir="rtl"
    icon="check"
    heading="test"
    value="one"
    type="checkbox"
  ></calcite-tile-select>`;

export const radioDarkModeRTL_TestOnly = (): string =>
  html`<calcite-tile-select
    class="calcite-mode-dark"
    dir="rtl"
    icon="list-radio"
    heading="test"
    value="one"
    type="radio"
  ></calcite-tile-select>`;

export const checkboxWidthFull_TestOnly = (): string =>
  html`<calcite-tile-select
    icon="check"
    heading="test"
    value="one"
    type="checkbox"
    width="full"
  ></calcite-tile-select>`;

export const radioWidthFull_TestOnly = (): string =>
  html`<calcite-tile-select
    icon="list-radio"
    heading="test"
    value="one"
    type="radio"
    width="full"
  ></calcite-tile-select>`;
