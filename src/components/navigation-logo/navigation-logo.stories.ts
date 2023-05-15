import { boolean, storyFilters } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { text } from "@storybook/addon-knobs";

export default {
  title: "Components/Navigation/Navigation Logo",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string =>
  html`<calcite-navigation-logo
    subtext="${text("subtext", "City of AcmeCo")}"
    text="${text("text", "ArcGIS Online")}"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
    ${boolean("active", false)}
    ${boolean("text-enabled", true)}
  />`;

export const text_TestOnly = (): string => html`<calcite-navigation-logo text="ArcGIS Online" text-enabled />`;

export const subtext_TestOnly = (): string =>
  html`<calcite-navigation-logo
    subtext="City of AcmeCo"
    text-enabled
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const thumbnail_TestOnly = (): string =>
  html`<calcite-navigation-logo thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const textAndThumbnail_TestOnly = (): string => html`<calcite-navigation-logo
  text="ArcGIS Online"
  thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  text-enabled
/>`;

export const subtextAndThumbnail_TestOnly = (): string => html`<calcite-navigation-logo
  subtext="City of AcmeCo"
  thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  text-enabled
/>`;

export const All_TestOnly = (): string => html`<calcite-navigation-logo
  text="ArcGIS Online"
  subtext="City of AcmeCo"
  thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  text-enabled
/>`;
