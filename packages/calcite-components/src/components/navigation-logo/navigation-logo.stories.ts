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

export const simple = (args: NavigationLogoStoryArgs): string =>
  html`<calcite-navigation-logo
    description="${args.description}"
    heading="${args.heading}"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
    ${boolean("active", args.active)}
  />`;

export const heading_TestOnly = (): string => html`<calcite-navigation-logo heading="ArcGIS Online" />`;

export const description_TestOnly = (): string =>
  html`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const thumbnail_TestOnly = (): string =>
  html`<calcite-navigation-logo thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const headingAndThumbnail_TestOnly = (): string =>
  html`<calcite-navigation-logo heading="ArcGIS Online" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const headingAndIcon_TestOnly = (): string =>
  html`<calcite-navigation-logo heading="ArcGIS Online" icon="link-chart" />`;

export const descriptionAndThumbnail_TestOnly = (): string =>
  html`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const All_TestOnly = (): string =>
  html`<calcite-navigation-logo
    icon="link-chart"
    heading="ArcGIS Online"
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const slottedInNav_TestOnly = (): string => html`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo
      heading="ArcGIS Online"
      description="City of AcmeCo"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
      slot="logo"
    />
  </calcite-navigation>
`;

export const withHref_TestOnly = (): string => html`
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

export const headingLevel_TestOnly = (): string => html`
  <calcite-navigation-logo
    heading="ArcGIS Online"
    heading-level="1"
    description="City of AcmeCo"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />
`;
