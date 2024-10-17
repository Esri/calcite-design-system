import { html } from "../../support/formatting";

export const tabsTokens = {
  calciteTabsBackgroundColor: "",
  calciteTabsBorderColor: "",
  calciteTabAccentColorSelected: "",
  calciteTabBackgroundColorHover: "",
  calciteTabBackgroundColor: "",
  calciteTabContentSpaceY: "",
  calciteTabIconColor: "",
  calciteTabTextColorSelected: "",
  calciteTabTextColor: "",
};

export const tabs = html`
  <calcite-tabs>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right" selected
        >Tab 1 Title
      </calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>Tab 1 content</calcite-tab>
    <calcite-tab>Tab 2 Content</calcite-tab>
    <calcite-tab>Tab 3 Content</calcite-tab>
    <calcite-tab>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`;

export const tabsBordered = html` <calcite-tabs bordered>
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right" selected>Tab 1 Title </calcite-tab-title>
    <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 2 Title</calcite-tab-title>
    <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
    <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 4 Title</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab selected>Tab 1 content</calcite-tab>
  <calcite-tab>Tab 2 Content</calcite-tab>
  <calcite-tab>Tab 3 Content</calcite-tab>
  <calcite-tab>Tab 4 Content</calcite-tab>
</calcite-tabs>`;
