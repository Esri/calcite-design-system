import { boolean, storyFilters } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { text } from "@storybook/addon-knobs";

export default {
  title: "Components/Nav/Nav Logo",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string =>
  html`<calcite-nav-logo
    sub-text="${text("sub-text", "City of AcmeCo")}"
    text="${text("text", "ArcGIS Online")}"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
    ${boolean("active", false)}
    ${boolean("text-enabled", true)}
  />`;

export const text_TestOnly = (): string => html`<calcite-nav-logo text="ArcGIS Online" text-enabled />`;

export const subText_TestOnly = (): string =>
  html`<calcite-nav-logo
    sub-text="City of AcmeCo"
    text-enabled
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const thumbnail_TestOnly = (): string =>
  html`<calcite-nav-logo thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const textAndThumbnail_TestOnly = (): string => html`<calcite-nav-logo
  text="ArcGIS Online"
  thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  text-enabled
/>`;

export const subTextAndThumbnail_TestOnly = (): string => html`<calcite-nav-logo
  sub-text="City of AcmeCo"
  thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  text-enabled
/>`;

export const All_TestOnly = (): string => html`<calcite-nav-logo
  text="ArcGIS Online"
  sub-text="City of AcmeCo"
  thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  text-enabled
/>`;
