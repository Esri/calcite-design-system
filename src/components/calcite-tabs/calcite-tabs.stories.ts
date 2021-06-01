import { select, optionsKnob } from "@storybook/addon-knobs";
import { iconNames } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme1 from "./readme.md";
import readme2 from "../calcite-tab/readme.md";
import readme3 from "../calcite-tab-nav/readme.md";
import readme4 from "../calcite-tab-title/readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Tabs",

  parameters: {
    notes: [readme1, readme2, readme3, readme4]
  }
};

export const Simple = (): string => html`
  <calcite-tabs
    layout="${select("layout", ["inline", "center"], "inline")}"
    position="${select("position", ["above", "below"], "above")}"
  >
    <calcite-tab-nav slot="tab-nav">
      <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab active><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;

export const WithIcons = (): string => html`
  <calcite-tabs
    layout="${select("layout", ["inline", "center"], "inline")}"
    position="${select("position", ["above", "below"], "above")}"
  >
    <calcite-tab-nav slot="tab-nav">
      <calcite-tab-title active icon-start="${select("tab 1 icon-start", iconNames, iconNames[0])}"
        >Tab 1 Title</calcite-tab-title
      >
      <calcite-tab-title icon-end="${select("tab 2 icon-end", iconNames, iconNames[0])}">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title
        icon-start="${select("tab 3 icon-start", iconNames, iconNames[0])}"
        icon-end="${select("tab 3 icon-end", iconNames, iconNames[0])}"
        >Tab 3 Title</calcite-tab-title
      >
      <calcite-tab-title icon-start="${select("tab 4 icon-start", iconNames, iconNames[0])}"></calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab active><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;

WithIcons.story = {
  name: "With icons"
};

export const DarkMode = (): string => html`
  <calcite-tabs
    theme="dark"
    layout="${select("layout", ["inline", "center"], "inline")}"
    position="${select("position", ["above", "below"], "above")}"
  >
    <calcite-tab-nav slot="tab-nav">
      <calcite-tab-title active>Icon 1</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
  </calcite-tabs>
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};

export const DisabledTabs = (): string => {
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
        <calcite-tab-nav slot="tab-nav">
          <calcite-tab-title active ${tab1disabled ? "disabled" : ""}>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title ${tab2disabled ? "disabled" : ""}>Tab 2 Title</calcite-tab-title>
          <calcite-tab-title ${tab3disabled ? "disabled" : ""}>Tab 3 Title</calcite-tab-title>
        </calcite-tab-nav>

        <calcite-tab active><p>Tab 1 Content</p></calcite-tab>
        <calcite-tab><p>Tab 2 Content</p></calcite-tab>
        <calcite-tab><p>Tab 3 Content</p></calcite-tab>
      </calcite-tabs>
    `;
};

DisabledTabs.story = {
  name: "Disabled tabs"
};

export const RTL = (): string => html`
  <calcite-tabs
    dir="rtl"
    layout="${select("layout", ["inline", "center"], "inline")}"
    position="${select("position", ["above", "below"], "above")}"
  >
    <calcite-tab-nav slot="tab-nav">
      <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab active><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;
