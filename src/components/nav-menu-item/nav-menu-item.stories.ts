import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { select, text } from "@storybook/addon-knobs";

export default {
  title: "Components/Nav/Nav Menu Item",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`<calcite-nav
  ><calcite-nav-menu slot="primary-content-center">
    <calcite-nav-menu-item
      text="${text("text", "My nav item")}"
      src="${text("src", "")}"
      href="${text("href", "")}"
      rel="${text("rel", "")}"
      target="${text("target", "")}"
      ${boolean("active", false)}
      ${boolean("breadcrumb", false)}
      ${boolean("editable", false)}
      ${boolean("text-enabled", true)}
    /> </calcite-nav-menu
></calcite-nav>`;

export const iconStart = (): string => html`<calcite-nav
  ><calcite-nav-menu slot="primary-content-center">
    <calcite-nav-menu-item
      text="${text("text", "My nav item")}"
      src="${text("src", "")}"
      href="${text("href", "")}"
      rel="${text("rel", "")}"
      target="${text("target", "")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
      ${boolean("active", false)}
      ${boolean("breadcrumb", false)}
      ${boolean("editable", false)}
      ${boolean("text-enabled", true)}
    /> </calcite-nav-menu
></calcite-nav>`;

export const iconEnd = (): string => html`<calcite-nav
  ><calcite-nav-menu slot="primary-content-center">
    <calcite-nav-menu-item
      text="${text("text", "My nav item")}"
      src="${text("src", "")}"
      href="${text("href", "")}"
      rel="${text("rel", "")}"
      target="${text("target", "")}"
      icon-end="${select("icon-end", iconNames, iconNames[0])}"
      ${boolean("active", false)}
      ${boolean("breadcrumb", false)}
      ${boolean("editable", false)}
      ${boolean("text-enabled", true)}
    /> </calcite-nav-menu
></calcite-nav>`;

export const iconsBoth = (): string => html`<calcite-nav
  ><calcite-nav-menu slot="primary-content-center">
    <calcite-nav-menu-item
      text="${text("text", "My nav item")}"
      src="${text("src", "")}"
      href="${text("href", "")}"
      rel="${text("rel", "")}"
      target="${text("target", "")}"
      icon-end="${select("icon-end", iconNames, "")}"
      icon-start="${select("icon-start", iconNames, "")}"
      ${boolean("active", false)}
      ${boolean("breadcrumb", false)}
      ${boolean("editable", false)}
      ${boolean("text-enabled", true)}
    /> </calcite-nav-menu
></calcite-nav>`;
