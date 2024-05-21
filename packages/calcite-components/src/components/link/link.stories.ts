import { modesDarkDefault } from "../../../.storybook/utils";
import * as icons from "../../../../../node_modules/@esri/calcite-ui-icons";
import { html } from "../../../support/formatting";

// we can get all unique icon names from all size 16 non-filled icons.
const iconNames = Object.keys(icons)
  .filter((iconName) => iconName.endsWith("16"))
  .map((iconName) => iconName.replace("16", ""));

interface LinkArgs {
  containingFontSize: string;
  containingFontWeight: string;
  href: string;
  disabled: boolean;
  text: string;
}

export default {
  title: "Components/Link",
  args: {
    containingFontSize: "16",
    containingFontWeight: "400",
    href: "",
    disabled: false,
    text: "link text here",
  },
  argTypes: {
    containingFontSize: {
      options: ["12", "14", "16", "18", "20", "24", "32"],
      control: { type: "select" },
    },
    containingFontWeight: {
      options: ["300", "400", "500", "700"],
      control: { type: "select" },
    },
  },
};

export const simple = (args: LinkArgs): string => html`
  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight};">
    Some wrapping text
    <calcite-link href="${args.href}" ${args.disabled ? "disabled" : ""}> ${args.text}</calcite-link>
    around the link
  </div>
`;

export const iconStart = (): string => html`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link href="" icon-start="${iconNames[0]}"> link text here</calcite-link>
    around the link
  </div>
`;

export const iconEnd = (): string => html`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link href="" icon-end="${iconNames[0]}"> link text here</calcite-link>
    around the link
  </div>
`;

export const iconStartAndIconEnd = (): string => html`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link href="" icon-start="${iconNames[0]}" icon-end="${iconNames[0]}"> link text here</calcite-link>
    around the link
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div class="calcite-mode-dark" dir="rtl" style="color: white; font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link class="calcite-mode-dark" href="">link text here</calcite-link>
    around the link
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-link disabled>disabled</calcite-link`;
