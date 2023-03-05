import { storyFilters } from "../../../.storybook/helpers";
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
        <calcite-nav-menu slot="primary-content-center">
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
        <calcite-nav-menu slot="primary-content-start">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="primary-content-center">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="primary-content-end">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="secondary-content-start">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="secondary-content-end">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="tertiary-content-start">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
        <calcite-nav-menu slot="tertiary-content-end">
          <calcite-nav-menu-item text="Example nav item 1" text-enabled></calcite-nav-menu-item>
          <calcite-nav-menu-item text="Example nav item 2" text-enabled active></calcite-nav-menu-item>
        </calcite-nav-menu>
      </calcite-nav>
    </calcite-shell>
  `;
