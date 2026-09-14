import { boolean, modesDarkDefault, optionalAttribute } from "../../../.storybook/utils";
import * as icons from "../../../../../node_modules/@esri/calcite-ui-icons";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Link } from "./link";
import "./link"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

// we can get all unique icon names from all size 16 non-filled icons.
const iconNames = Object.keys(icons)
  .filter((iconName) => iconName.endsWith("16"))
  .map((iconName) => iconName.replace("16", ""));

const { fontSize, fontWeight } = ATTRIBUTES;

interface LinkStoryArgs extends Pick<
  Link,
  "disabled" | "download" | "href" | "iconEnd" | "iconFlipRtl" | "iconStart" | "rel" | "target"
> {
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
    download: false,
    iconEnd: "",
    iconFlipRtl: false,
    iconStart: "",
    rel: "",
    target: "",
    text: "link text here",
    longText:
      "Lorem ipsum odor amet, consectetur adipiscing elit. Egestas magnis porta tristique magnis justo tincidunt. Lacinia et euismod massa aliquam venenatis sem arcu tellus.",
  },
  argTypes: {
    containingFontSize: {
      options: fontSize.values,
      control: { type: "select" },
    },
    containingFontWeight: {
      options: fontWeight.values,
      control: { type: "select" },
    },
    iconStart: {
      options: ["", ...iconNames],
      control: { type: "select" },
    },
    iconEnd: {
      options: ["", ...iconNames],
      control: { type: "select" },
    },
  },
};

export const simple = (args: LinkStoryArgs): string => html`
  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight};">
    Some wrapping text
    <calcite-link
      ${boolean("download", !!args.download)}
      href="${args.href}"
      ${optionalAttribute("icon-start", args.iconStart)}
      ${optionalAttribute("icon-end", args.iconEnd)}
      ${boolean("icon-flip-rtl", !!args.iconFlipRtl)}
      rel="${args.rel}"
      target="${args.target}"
      >${args.text}</calcite-link
    >
    around the link
  </div>
`;

export const simpleNoWrappingText = (args: LinkStoryArgs): string => html`
  <div
    style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight}; width: 300px; border: 1px solid black;"
  >
    <calcite-link href="${args.href}" ${boolean("disabled", args.disabled)}>${args.text}</calcite-link>
  </div>
`;

export const noHref = (): string => html`
  <div style="font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link>link text here</calcite-link>
    around the link
  </div>
`;

export const noHrefNoWrappingText = (): string => html`
  <div style="font-size: 16px; font-weight: 400; width: 300px; border: 1px solid black;">
    <calcite-link>link text here</calcite-link>
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

export const multiLineNoWrappingText = (args: LinkStoryArgs): string => html`
  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight}; max-width: 400px;">
    <calcite-link href="${args.href}" ${boolean("disabled", args.disabled)}>${args.longText}</calcite-link>
  </div>
`;

export const multiLineNoWrappingTextNoHref = (args: LinkStoryArgs): string => html`
  <div style="font-size: ${args.containingFontSize}px; font-weight: ${args.containingFontWeight}; max-width: 400px;">
    <calcite-link ${boolean("disabled", args.disabled)}>${args.longText}</calcite-link>
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

export const darkModeRTL = (): string => html`
  <div class="calcite-mode-dark" dir="rtl" style="color: white; font-size: 16px; font-weight: 400;">
    Some wrapping text
    <calcite-link class="calcite-mode-dark">link text here</calcite-link>
    around the link
  </div>
`;

darkModeRTL.parameters = { themes: modesDarkDefault };

export const disabled = (): string => html`<calcite-link disabled>disabled</calcite-link>`;
