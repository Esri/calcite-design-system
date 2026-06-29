import { boolean, optionalAttribute } from "../../../.storybook/utils";
import { iconNames } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import type { NavigationLogo } from "./navigation-logo";
const { headingLevel: headingLevelAttribute } = ATTRIBUTES;

type NavigationLogoStoryArgs = Pick<NavigationLogo, "active" | "description" | "heading" | "headingLevel" | "icon">;

export default {
  title: "Components/Navigation/Navigation Logo",
  args: {
    active: false,
    description: "City of AcmeCo",
    heading: "ArcGIS Online",
  },
  argTypes: {
    icon: {
      options: ["", ...iconNames],
      control: { type: "select" },
    },
    headingLevel: {
      options: headingLevelAttribute.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: NavigationLogoStoryArgs): string =>
  html`<calcite-navigation-logo
    ${boolean("active", args.active)}
    description="${args.description}"
    heading="${args.heading}"
    ${optionalAttribute("heading-level", args.headingLevel)}
    ${optionalAttribute("icon", args.icon)}
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const heading = (): string => html`<calcite-navigation-logo heading="ArcGIS Online" />`;

export const description = (): string =>
  html`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const thumbnail = (): string =>
  html`<calcite-navigation-logo thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const headingAndThumbnail = (): string =>
  html`<calcite-navigation-logo heading="ArcGIS Online" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const headingAndIcon = (): string => html`<calcite-navigation-logo heading="ArcGIS Online" icon="link-chart" />`;

export const descriptionAndThumbnail = (): string =>
  html`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const All = (): string =>
  html`<calcite-navigation-logo
    icon="link-chart"
    heading="ArcGIS Online"
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const slottedInNav = (): string => html`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo
      heading="ArcGIS Online"
      description="City of AcmeCo"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
      slot="logo"
    />
  </calcite-navigation>
`;

export const withHref = (): string => html`
  <calcite-navigation>
    <calcite-navigation-logo
      slot="logo"
      heading="A view of the estuary"
      icon="globe"
      href="https://www.esri.com"
      target="_blank"
      description="20 years of change where the river meets the sea"
    >
    </calcite-navigation-logo>
  </calcite-navigation>
`;

export const headingLevel = (): string => html`
  <calcite-navigation-logo
    heading="ArcGIS Online"
    heading-level="1"
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />
`;
