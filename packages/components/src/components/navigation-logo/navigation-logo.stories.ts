import { boolean } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { CalciteNavigationLogo } from "./navigation-logo";

type NavigationLogoStoryArgs = Pick<CalciteNavigationLogo, "description" | "heading" | "active">;

export default {
  title: "Components/Navigation/Navigation Logo",
  args: {
    description: "City of AcmeCo",
    heading: "ArcGIS Online",
    active: false,
  },
};

export const Simple = (args: NavigationLogoStoryArgs): string =>
  html`<calcite-navigation-logo
    description="${args.description}"
    heading="${args.heading}"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
    ${boolean("active", args.active)}
  />`;

export const Heading = (): string => html`<calcite-navigation-logo heading="ArcGIS Online" />`;

export const Description = (): string =>
  html`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const Thumbnail = (): string =>
  html`<calcite-navigation-logo thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const HeadingAndThumbnail = (): string =>
  html`<calcite-navigation-logo heading="ArcGIS Online" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const HeadingAndIcon = (): string => html`<calcite-navigation-logo heading="ArcGIS Online" icon="link-chart" />`;

export const DescriptionAndThumbnail = (): string =>
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

export const SlottedInNav = (): string => html`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo
      heading="ArcGIS Online"
      description="City of AcmeCo"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
      slot="logo"
    />
  </calcite-navigation>
`;

export const WithHref = (): string => html`
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

export const HeadingLevel = (): string => html`
  <calcite-navigation-logo
    heading="ArcGIS Online"
    heading-level="1"
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />
`;
