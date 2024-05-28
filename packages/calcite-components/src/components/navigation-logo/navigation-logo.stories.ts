import { boolean } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { html } from "../../../support/formatting";
import { text } from "../../../.storybook/fake-knobs";

export default {
  title: "Components/Navigation/Navigation Logo",
};

export const simple = (): string =>
  html`<calcite-navigation-logo
    description="${text("description", "City of AcmeCo")}"
    heading="${text("heading", "ArcGIS Online")}"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
    ${boolean("active", false)}
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
