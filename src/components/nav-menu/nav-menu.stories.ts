import { storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { select } from "@storybook/addon-knobs";

export default {
  title: "Components/Nav/Nav Menu",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-nav>
    <calcite-nav-menu slot="primary-content-center" layout="${select(
      "layout",
      ["horizontal", "vertical"],
      "horizontal"
    )}">
      <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
      <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
      <calcite-nav-menu-item
        text="Example nav item 3"
        text-enabled
      ></calcite-nav-menu-item> </calcite-nav-menu></calcite-nav
></calcite-nav>`;

export const withNesting = (): string => html`<calcite-panel>
  <calcite-nav-menu layout="${select("layout", ["horizontal", "vertical"], "horizontal")}">
    <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
    <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
    <calcite-nav-menu-item text="Example nav item 3" text-enabled>
      <calcite-nav-menu-item slot="menu-item-dropdown" text="Example subnav item 1" text-enabled>
      </calcite-nav-menu-item>
      <calcite-nav-menu-item slot="menu-item-dropdown" text="Example subnav item 2" text-enabled>
        <calcite-nav-menu-item
          slot="menu-item-dropdown"
          text="Example subnav item 1"
          text-enabled
        ></calcite-nav-menu-item>
        <calcite-nav-menu-item
          slot="menu-item-dropdown"
          text="Example subnav item 2"
          text-enabled
        ></calcite-nav-menu-item>
        <calcite-nav-menu-item
          slot="menu-item-dropdown"
          text="Example subnav item 3"
          text-enabled
        ></calcite-nav-menu-item>
      </calcite-nav-menu-item>
      <calcite-nav-menu-item slot="menu-item-dropdown" text="Example subnav item 3" text-enabled>
      </calcite-nav-menu-item>
    </calcite-nav-menu-item>
    <calcite-nav-menu-item text="Example nav item 4" text-enabled></calcite-nav-menu-item> </calcite-nav-menu
></calcite-panel>`;
