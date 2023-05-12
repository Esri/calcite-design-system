import { storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { select } from "@storybook/addon-knobs";

export default {
  title: "Components/Menu",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html` <calcite-menu
  layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
>
  <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
  <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
  <calcite-menu-item text="Example nav item 3" text-enabled></calcite-menu-item>
</calcite-menu>`;

export const withNesting = (): string => html`<calcite-panel>
  <calcite-menu layout="${select("layout", ["horizontal", "vertical"], "horizontal")}">
    <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example nav item 3" text-enabled>
      <calcite-menu-item slot="submenu-item" text="Example subnav item 1" text-enabled> </calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example subnav item 2" text-enabled>
        <calcite-menu-item slot="submenu-item" text="Example subnav item 1" text-enabled></calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example subnav item 2" text-enabled></calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example subnav item 3" text-enabled></calcite-menu-item>
      </calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example subnav item 3" text-enabled> </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example nav item 4" text-enabled></calcite-menu-item> </calcite-menu
></calcite-panel>`;

export const WithSubmenuOpen_TestOnly = (): string => html`<calcite-menu>
  <calcite-menu-item text="My nav item" href="#mynav" open>
    <calcite-menu-item text="item1" slot="submenu-item" active> </calcite-menu-item>
  </calcite-menu-item>
</calcite-menu>`;

export const WithSubmenuOpenInVerticalLayout_TestOnly = (): string => html` <calcite-menu layout="vertical">
  <calcite-menu-item text="My nav item" href="#mynav" open>
    <calcite-menu-item text="item1" slot="submenu-item" active> </calcite-menu-item>
  </calcite-menu-item>
</calcite-menu>`;

export const darkModeRTL_TestOnly = (): string => html`<calcite-menu dir="rtl" class="calcite-mode-dark">
  <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
  <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
  <calcite-menu-item text="Example nav item 3" text-enabled></calcite-menu-item>
</calcite-menu>`;

export const verticalLyoutInDarkModeRTL_TestOnly = (): string => html`<calcite-menu
  layout="vertical"
  dir="rtl"
  class="calcite-mode-dark"
>
  <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
  <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
  <calcite-menu-item text="Example nav item 3" text-enabled></calcite-menu-item>
</calcite-menu>`;
