import { iconNames } from "../../../.storybook/helpers";
import { boolean, modesDarkDefault, optionalAttribute } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { setCSSVariables } from "../../tests/utils/cssTokenValues";
import { Icon } from "./icon";

const { scale } = ATTRIBUTES;

const sampleIcon = iconNames.find((item) => item === "arrowRight");

type IconStoryArgs = Pick<Icon, "flipRtl" | "icon" | "preload" | "scale" | "textLabel">;

export default {
  title: "Components/Icon",
  args: {
    flipRtl: false,
    icon: sampleIcon,
    preload: false,
    scale: scale.defaultValue,
    textLabel: "",
  },
  argTypes: {
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

export const simple = (args: IconStoryArgs): string => html`
  <calcite-icon
    ${boolean("flip-rtl", !!args.flipRtl)}
    ${optionalAttribute("icon", args.icon)}
    ${boolean("preload", args.preload)}
    scale="${args.scale}"
    text-label="${args.textLabel}"
  ></calcite-icon>
`;

export const customBaseFontSize = (): string => html`
  <style>
    html {
      font-size: 62.5%;
    }</style
  ><calcite-icon icon="banana" scale="s"></calcite-icon>
  <calcite-icon icon="banana" scale="m"></calcite-icon>
  <calcite-icon icon="banana" scale="l"></calcite-icon>
`;

export const darkModeRTL = (): string => html`
  <calcite-icon class="calcite-mode-dark" dir="rtl" icon="${sampleIcon}" flip-rtl></calcite-icon>
`;
darkModeRTL.parameters = { themes: modesDarkDefault };

export const theming = (): string => html`
  <style>
    .container {
        ${setCSSVariables(["--calcite-icon-color"])}
  </style>
  <div class="container">
    <calcite-icon icon="banana" scale="s"></calcite-icon>
  </div>
`;
