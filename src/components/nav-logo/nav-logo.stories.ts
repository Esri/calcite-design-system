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
      sub-text="${text("sub-text", "ArcGIS Online")}"
      text="${text("text", "City of AcmeCo")}"
      src="${placeholderImage({ width: 50, height: 50 })}"
      ${boolean("active", false)}
      ${boolean("text-enabled", true)}
    />
  </calcite-logo>`;
