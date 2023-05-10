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
  html`<calcite-nav>
    <calcite-nav-logo
      slot="logo"
      sub-text="${text("sub-text", "City of AcmeCo")}"
      text="${text("text", "ArcGIS Online")}"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
      ${boolean("active", false)}
      ${boolean("text-enabled", true)}
    />
  </calcite-nav-logo></calcite-nav>`;

export const text_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-logo slot="logo" text="ArcGIS Online" text-enabled />
  </calcite-nav>
</calcite-shell>`;

export const subText_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-logo slot="logo" sub-text="City of AcmeCo" text-enabled />
  </calcite-nav>
</calcite-shell>`;

export const thumbnail_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-logo slot="logo" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />
  </calcite-nav>
</calcite-shell>`;

export const textAndThumbnail_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-logo
      slot="logo"
      text="ArcGIS Online"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
      text-enabled
    />
  </calcite-nav>
</calcite-shell>`;

export const subTextAndThumbnail_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-logo
      slot="logo"
      sub-text="City of AcmeCo"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
      text-enabled
    />
  </calcite-nav>
</calcite-shell>`;

export const All_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-logo
      slot="logo"
      text="ArcGIS Online"
      sub-text="City of AcmeCo"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
      text-enabled
    />
  </calcite-nav>
</calcite-shell>`;
