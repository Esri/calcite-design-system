import { select, optionsKnob } from "@storybook/addon-knobs";
import { iconNames, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import readme1 from "./readme.md";
import readme2 from "../tab/readme.md";
import readme3 from "../tab-nav/readme.md";
import readme4 from "../tab-title/readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Tabs",
  parameters: {
    notes: [readme1, readme2, readme3, readme4]
  },
  ...storyFilters()
};

export const simpleDarkThemeRTL_TestOnly = (): string => html`
  <calcite-tabs
    dir="rtl"
    class="calcite-theme-dark"
    layout="${select("layout", ["inline", "center"], "inline")}"
    position="${select("position", ["top", "bottom"], "top")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled>Disabled Tab</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;
simpleDarkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const bordered = (): string => html`
  <calcite-tabs
    layout="${select("layout", ["inline", "center"], "inline")}"
    position="${select("position", ["top", "bottom"], "top")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    bordered
  >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`;

export const borderedDarkThemeRTL_TestOnly = (): string => html`
  <calcite-tabs
    layout="inline"
    position="${select("position", ["top", "bottom"], "top")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    bordered
    dir="rtl"
    class="calcite-theme-dark"
  >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`;
borderedDarkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

const selectedIcon = iconNames[0];

export const withIcons = (): string => html`
  <calcite-tabs
    layout="${select("layout", ["inline", "center"], "inline")}"
    position="${select("position", ["top", "bottom"], "top")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected icon-start="${select("tab 1 icon-start", iconNames, selectedIcon)}"
        >Tab 1 Title</calcite-tab-title
      >
      <calcite-tab-title icon-end="${select("tab 2 icon-end", iconNames, selectedIcon)}">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title
        icon-start="${select("tab 3 icon-start", iconNames, selectedIcon)}"
        icon-end="${select("tab 3 icon-end", iconNames, selectedIcon)}"
        >Tab 3 Title</calcite-tab-title
      >
      <calcite-tab-title icon-start="${select("tab 4 icon-start", iconNames, selectedIcon)}"></calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const setWidth = (): string => html`
  <div style="width: 400px;">
    <calcite-tabs
    layout="${select("layout", ["inline", "center"], "inline")}"
    position="${select("position", ["top", "bottom"], "top")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title id="reference-element">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected>
      <p>Tab 1 Content</p><br />
    </calcite-tab>
    <calcite-tab><p>Tab 2 Content</p>
    <img src="${placeholderImage({
      width: 1000,
      height: 200
    })}"></img>
    </calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
    </calcite-tabs>
  </div>
`;

export const justTabNav = (): string => html`
  <calcite-tab-nav
    position="${select("position", ["top", "bottom"], "top")}"
    scale="${select("scale", ["s", "m", "l"], "l")}"
  >
    <calcite-tab-title>Tab 1 Title</calcite-tab-title>
    <calcite-tab-title>Tab 2 Title</calcite-tab-title>
    <calcite-tab-title>Tab 3 Title</calcite-tab-title>
    <calcite-tab-title selected>Tab 4 Title</calcite-tab-title>
  </calcite-tab-nav>
`;

export const disabledTabs_TestOnly = (): string => {
  const disabledLabel = "Disabled Tabs";
  const disabledValuesObj = {
    Tab1: "tab1",
    Tab2: "tab2",
    Tab3: "tab3"
  };
  const defaultValue = "tab2";
  const optionsKnobSelections = optionsKnob(
    disabledLabel,
    disabledValuesObj,
    defaultValue,
    { display: "multi-select" },
    "DISABLED-TABS"
  );
  const tab1disabled = optionsKnobSelections.includes(disabledValuesObj.Tab1);
  const tab2disabled = optionsKnobSelections.includes(disabledValuesObj.Tab2);
  const tab3disabled = optionsKnobSelections.includes(disabledValuesObj.Tab3);

  return `
      <calcite-tabs>
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title selected ${tab1disabled ? "disabled" : ""}>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title ${tab2disabled ? "disabled" : ""}>Tab 2 Title</calcite-tab-title>
          <calcite-tab-title ${tab3disabled ? "disabled" : ""}>Tab 3 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
        <calcite-tab><p>Tab 2 Content</p></calcite-tab>
        <calcite-tab><p>Tab 3 Content</p></calcite-tab>
      </calcite-tabs>
    `;
};

export const TabChilrenWithPercentageHeights = (): string => html`
  <calcite-tabs style="height: 250px;">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Boats</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab style="background: pink;">
      <div style="background: red; height: 100%;">Tab 1 content</div>
    </calcite-tab>
  </calcite-tabs>
`;
