import { boolean, storyFilters } from "../../../.storybook/helpers";
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
      sub-text="${text("sub-text", "eabbey_123")}"
      text="${text("text", "Edward Abbey")}"
      src="${text("src", "")}"
      ${boolean("active", false)}
      ${boolean("text-enabled", true)}
    />
  </calcite-nav>`;
