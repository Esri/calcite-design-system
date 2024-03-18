import { boolean, storyFilters } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { text } from "@storybook/addon-knobs";

export default {
  title: "Components/Navigation/Navigation Logo",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
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

export const theming_TestOnly = (): string => html`
  <style>
    calcite-navigation-logo {
      --calcite-navigation-logo-background-color: green;
      --calcite-navigation-logo-border-color: pink;
      --calcite-navigation-logo-heading-text-color: red;
      --calcite-navigation-logo-description-text-color: yellow;
    }

    calcite-navigation-logo[active] {
      --calcite-navigation-logo-border-color: yellow;
    }
  </style>
  <calcite-navigation-logo
    slot="logo"
    heading="A view of the estuary"
    icon="globe"
    href="https://www.esri.com"
    target="_blank"
    description="20 years of change where the river meets the sea"
  >
  </calcite-navigation-logo>

  <calcite-navigation-logo
    active
    slot="logo"
    heading="A view of the estuary"
    icon="globe"
    href="https://www.esri.com"
    target="_blank"
    description="Active Logo"
  >
  </calcite-navigation-logo>
`;
