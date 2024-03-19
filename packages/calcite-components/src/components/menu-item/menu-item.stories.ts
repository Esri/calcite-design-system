import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { select, text } from "@storybook/addon-knobs";

export default {
  title: "Components/Menu Item",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string =>
  html`<calcite-menu>
    <calcite-menu-item
      text="${text("text", "Menu item")}"
      src="${text("src", "")}"
      href="${text("href", "")}"
      rel="${text("rel", "")}"
      target="${text("target", "")}"
      label="${text("label", "")}"
      ${boolean("active", false)}
      ${boolean("breadcrumb", false)}
    />
  </calcite-menu>`;

export const iconStart = (): string =>
  html`<calcite-menu>
    <calcite-menu-item
      text="${text("text", "Menu item")}"
      src="${text("src", "")}"
      href="${text("href", "")}"
      rel="${text("rel", "")}"
      target="${text("target", "")}"
      label="${text("label", "")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
      ${boolean("active", false)}
      ${boolean("breadcrumb", false)}
    />
  </calcite-menu>`;

export const iconEnd = (): string =>
  html`<calcite-menu>
    <calcite-menu-item
      text="${text("text", "Menu item")}"
      src="${text("src", "")}"
      href="${text("href", "")}"
      rel="${text("rel", "")}"
      target="${text("target", "")}"
      label="${text("label", "")}"
      icon-end="${select("icon-end", iconNames, iconNames[0])}"
      ${boolean("active", false)}
      ${boolean("breadcrumb", false)}
    />
  </calcite-menu>`;

export const iconsBoth = (): string =>
  html`<calcite-menu>
    <calcite-menu-item
      text="${text("text", "Menu item")}"
      src="${text("src", "")}"
      href="${text("href", "")}"
      rel="${text("rel", "")}"
      target="${text("target", "")}"
      label="${text("label", "")}"
      icon-end="${select("icon-end", iconNames, iconNames[0])}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
      ${boolean("active", false)}
      ${boolean("breadcrumb", false)}
    />
  </calcite-menu>`;

export const allIconsAndSubMenu_TestOnly = (): string =>
  html`<calcite-menu>
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item
  ></calcite-menu>`;

export const allIconsAndSubMenuVertical_TestOnly = (): string =>
  html`<calcite-menu layout="vertical">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item>
  </calcite-menu>`;

export const darkModeRTL_TestOnly = (): string =>
  html`<calcite-menu-item
    text="Menu item"
    active
    dir="rtl"
    class="calcite-mode-dark"
    icon-start="layer"
    icon-end="layer"
  />`;
