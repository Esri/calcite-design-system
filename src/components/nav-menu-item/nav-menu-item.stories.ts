import { boolean, storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Nav Menu Item",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html` <calcite-nav-menu-item ${boolean("active", true)}> </calcite-nav-menu-item> `;
