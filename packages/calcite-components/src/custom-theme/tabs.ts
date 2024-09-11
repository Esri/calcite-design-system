import { html } from "../../support/formatting";

export const tabsTokens = {
  calciteTabsBackgroundColor: "",
  calciteTabsBorderColor: "",
};

export const tabs = html`
  <calcite-tabs bordered layout="bottom">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2" selected>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2" selected>Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
  </calcite-tabs>
`;
