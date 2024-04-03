import { storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { select } from "@storybook/addon-knobs";

export default {
  title: "Components/Menu",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string =>
  html`<calcite-menu layout="${select("layout", ["horizontal", "vertical"], "horizontal")}">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>`;

export const iconsAndBreadcrumb = (): string =>
  html`<calcite-menu>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>`;

export const iconsAndBreadcrumbVertical_TestOnly = (): string =>
  html`<calcite-menu layout="vertical">
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>`;

export const withNesting = (): string =>
  html`<calcite-panel>
    <calcite-menu layout="${select("layout", ["horizontal", "vertical"], "horizontal")}">
      <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
      <calcite-menu-item text="Example item 3" text-enabled open>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
      </calcite-menu-item>
      <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item></calcite-menu
  ></calcite-panel>`;

export const WithSubmenuOpen_TestOnly = (): string =>
  html`<calcite-menu>
    <calcite-menu-item text="Item" href="#item" open>
      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>
      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>
    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>
  </calcite-menu>`;

export const WithSubmenuOpenInVerticalLayout_TestOnly = (): string =>
  html`<calcite-menu layout="vertical">
    <calcite-menu-item text="Item" href="#item" open>
      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>
      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>
    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>
  </calcite-menu>`;

export const darkModeRTL_TestOnly = (): string =>
  html`<calcite-menu dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>`;

export const verticalComplexUseCase_TestOnly = (): string =>
  html`<calcite-shell-panel width-scale="l">
    <calcite-panel heading="Extreme nested vertical menu">
      <calcite-menu layout="vertical">
        <calcite-menu-item icon-start="layer" icon-end="layer" text="Home"></calcite-menu-item>
        <calcite-menu-item
          icon-start="layer"
          icon-end="layer"
          href="#"
          text="Example nested"
          icon-start="layer"
          breadcrumb
        >
          <calcite-menu-item icon-end="layer" icon-start="layer" slot="submenu-item" text="Capabilities">
          </calcite-menu-item>
          <calcite-menu-item icon-start="layer" slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities">
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item text="Example nested" icon-start="layer" icon-end="layer" breadcrumb open>
          <calcite-menu-item slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" breadcrumb>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Capabilities" open>
              <calcite-menu-item slot="submenu-item" text="Capabilities" icon-end="layer"></calcite-menu-item>
              <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Something else"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Another thing">
              <calcite-menu-item slot="submenu-item" text="Great examples">
                <calcite-menu-item slot="submenu-item" text="Great examples" breadcrumb></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#" slot="submenu-item" text="It's stupendous" open>
            <calcite-menu-item slot="submenu-item" text="Very nice example"></calcite-menu-item>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Short one" open>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Another thing" open>
                <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" open>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                </calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        <calcite-menu-item text="Reference" active></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
      </calcite-menu>
    </calcite-panel>
  </calcite-shell-panel>`;

export const verticalLayoutInDarkModeRTL_TestOnly = (): string =>
  html`<calcite-menu layout="vertical" dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>`;
