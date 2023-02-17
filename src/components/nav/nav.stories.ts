import { boolean, storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Nav/Nav",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string =>
  html`
    <calcite-shell>
      <calcite-nav slot="header">
        <calcite-nav-menu slot="primary-menu-center">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 3" text-enabled></calcite-nav-menu-item>
        </calcite-nav-menu>
      </calcite-nav>
    </calcite-shell>
  `;

export const allSlots = (): string =>
  html`
    <calcite-shell>
      <calcite-nav slot="header">
        <calcite-nav-menu slot="primary-menu-start">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="primary-menu-center">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="primary-menu-end">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="secondary-menu-start">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="secondary-menu-end">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="tertiary-menu-start">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="tertiary-menu-end">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
      </calcite-nav>
    </calcite-shell>
  `;
