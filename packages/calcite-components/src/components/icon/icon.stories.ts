import { iconNames } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale } = ATTRIBUTES;

const sampleIcon = iconNames.find((item) => item === "arrowRight");

interface IconArgs {
  icon: string;
  scale: string;
}

export default {
  title: "Components/Icon",
  args: {
    icon: sampleIcon,
    scale: scale.defaultValue,
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

export const simple = (args: IconArgs): string => html`
  <calcite-icon icon="${args.icon}" scale="${args.scale}"></calcite-icon>
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

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-icon class="calcite-mode-dark" dir="rtl" icon="${sampleIcon}" flip-rtl></calcite-icon>
`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
