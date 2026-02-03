import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import * as icons from "../../../../../node_modules/@esri/calcite-ui-icons";
import { html } from "../../../support/formatting";
import { Link } from "./link";

// we can get all unique icon names from all size 16 non-filled icons.
const iconNames = Object.keys(icons)
  .filter((iconName) => iconName.endsWith("16"))
  .map((iconName) => iconName.replace("16", ""));

interface LinkStoryArgs extends Pick<Link, "href" | "disabled"> {
  containingFontSize: string;
  containingFontWeight: string;
  text: string;
  longText: string;
}

export default {
  title: "Components/Link",
  args: {
    containingFontSize: "16",
    containingFontWeight: "400",
    href: "http://www.esri.com",
    disabled: false,
    text: "link text here",
    longText:
      "Lorem ipsum odor amet, consectetur adipiscing elit. Egestas magnis porta tristique magnis justo tincidunt. Lacinia et euismod massa aliquam venenatis sem arcu tellus.",
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

export const simple = (args: LinkStoryArgs): string => html`
  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight};">
    Some wrapping text
    <calcite-link href="${args.href}" ${boolean("disabled", args.disabled)}>${args.text}</calcite-link>
    around the link
  </div>
`;

export const asButton = (): string => html`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link>link text here</calcite-link>
    around the link
  </div>
`;

export const iconStart = (): string => html`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="${iconNames[0]}">link text here</calcite-link>
    around the link
  </div>
`;

export const iconEnd = (): string => html`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-end="${iconNames[0]}">link text here</calcite-link>
    around the link
  </div>
`;

export const iconStartAndIconEnd = (): string => html`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link icon-start="${iconNames[0]}" icon-end="${iconNames[0]}">link text here</calcite-link>
    around the link
  </div>
`;

export const multiLine = (args: LinkStoryArgs): string => html`
  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight}; max-width: 400px;">
    Some wrapping text
    <calcite-link href="${args.href}" ${boolean("disabled", args.disabled)}>${args.longText}</calcite-link>
    around the link
  </div>
`;

export const multiLineWithIcons = (args: LinkStoryArgs): string => html`
  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight}; max-width: 400px;">
    Some wrapping text
    <calcite-link
      icon-start="${iconNames[0]}"
      icon-end="${iconNames[0]}"
      href="${args.href}"
      ${boolean("disabled", args.disabled)}
    >
      ${args.longText}</calcite-link
    >
    around the link
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div class="calcite-mode-dark" dir="rtl" style="color: white; font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link class="calcite-mode-dark">link text here</calcite-link>
    around the link
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-link disabled>disabled</calcite-link`;
