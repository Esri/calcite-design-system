import { storyFilters } from "../../../.storybook/helpers";
import { text } from "@storybook/addon-knobs";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Nav/Nav User",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string =>
  html`<calcite-nav>
    <calcite-nav-user
      slot="user"
      full-name="${text("full-name", "Edward Abbey")}"
      username="${text("text", "eabbey_123")}"
      thumbnail="${text("thumbnail", "")}"
    />
  </calcite-nav>`;
