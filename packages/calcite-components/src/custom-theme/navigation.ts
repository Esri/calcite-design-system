import { html } from "../../support/formatting";

export const navigationTokens = {
  calciteNavigationBackgroundColor: "",
  calciteNavigationBorderColor: "",
  calciteNavigationWidth: "",
  calciteNavigationBackground: "",
};
export const navigation = html`<calcite-navigation>
  <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" icon="layers" slot="logo">
  </calcite-navigation-logo>
  <calcite-navigation-user slot="user" full-name="Walt McChipson" username="waltChip"> </calcite-navigation-user>
  <calcite-navigation slot="navigation-secondary">
    <calcite-menu slot="content-start">
      <calcite-menu-item breadcrumb text="All Routes" icon-start="book" text-enabled></calcite-menu-item>
    </calcite-menu>
  </calcite-navigation>
  <calcite-navigation slot="navigation-tertiary">
    <calcite-menu slot="content-end">
      <calcite-menu-item breadcrumb text="All Routes" icon-start="book" text-enabled></calcite-menu-item>
    </calcite-menu>
  </calcite-navigation>
</calcite-navigation>`;
